---
id: bai26_interspeech
category: tts
labels: [low-resource, dataset-or-benchmark-release, generative-model]
institutions: ["Xiamen University", "Alibaba Group"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-131
pdf: https://www.isca-archive.org/interspeech_2026/bai26_interspeech.pdf
---

# Towards Chinese Yue Opera Singing Voice Synthesis: A Benchmark with Dataset, Data Augmentation and Baseline Model

*Peng Bai, Chenyang Lyu, Yue Zhou, Wujin Sun, Longyue Wang, Weihua Luo, Xiaodong Shi*

[PDF](https://www.isca-archive.org/interspeech_2026/bai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-131)

**Category:** `tts` · **Labels:** `low-resource`, `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — This paper establishes the first benchmark for Chinese Yue Opera Singing Voice Synthesis (SVS) by introducing the Yue Opera Audio-Text (YOAT) dataset, three targeted data augmentation strategies, and YueOpera-Singer, a conditional flow-matching baseline model achieving a subjective MOS of 3.92.

## Key contributions

- Constructed the Yue Opera Audio-Text (YOAT) dataset, comprising 565 studio recordings (1.35 hours) from a professional Xiaosheng actress with precise phoneme, duration, and pitch annotations.
- Proposed three data augmentation methods from pronunciation and pitch perspectives, incorporating authentic recitations (DA1), dictionary-based synthesized recitations (DA2 up to 8 hours), and cross-genre Gezi Opera data (DA3, 4.5 hours).
- Developed YueOpera-Singer, a conditional flow-matching-based SVS baseline model featuring a U-Net decoder and Transformer encoder.
- Validated the benchmark through comprehensive objective (F0 RMSE) and subjective (MOS-N, MOS-P) evaluations against standard SVS baselines.

## Problem

Traditional Chinese opera genres are rapidly disappearing, making digital preservation via singing voice synthesis vital, yet Yue Opera (Wu dialect) has been completely unexplored in prior SVS research. Existing SVS approaches suffer from severe low-resource bottlenecks: scarce professional performers drive up studio costs, standard electronic musical scores are non-existent, and small dataset scales prevent training reliable automatic forced aligners (like Montreal Forced Aligner), necessitating tedious manual annotation. Furthermore, general-purpose source separation models fail to cleanly extract Wu dialect opera vocals from accompaniments.

## Method

The YueOpera-Singer architecture consists of an acoustic model and a vocoder (HiFi-GAN singing model). The acoustic model integrates lyric phonemes and singer identity embeddings via a Transformer encoder, which passes through a length regulator to expand sequences to the frame level using pre-aligned musical score durations. Fused pitch embeddings and positional encodings create the input representation mu, which feeds into a U-Net decoder built on Optimal Transport Conditional Flow Matching (OTCFM). The U-Net decoder uses 4-layer Transformer blocks, convolutional residual blocks, and downsampling/upsampling modules (N=4, M1=M2=M3=2). The time-dependent mel-spectrogram xt is interpolated between standard Gaussian noise x0 and ground-truth mel-spectrogram x1 using time step t ~ U(0, 1).

The model is trained using the AdamW optimizer (learning rate 1e-4, beta1=0.9, beta2=0.98) with a 24kHz sampling rate, 512 FFT window length, 128 hop length, and 80 mel-bins. Training runs for a maximum of 100,000 steps on a single NVIDIA A40 GPU with sigma_min set to 1e-4. Inference employs the Euler ordinary differential equation (ODE) solver, configured to 10 steps as the optimal trade-off.

## Experimental setup

Evaluated on the YOAT dataset (543 training samples, 22 test samples) alongside augmentation subsets (1 hour DA1, up to 8 hours DA2, and 4.5 hours Gezi Opera DA3). Compared against FFT-Singer, DiffSinger, and FT-GAN, all utilizing the same pretrained HiFi-GAN vocoder. Metrics include F0 RMSE (objective pitch accuracy), MOS-N (naturalness), MOS-P (pronunciation), model parameter size (Million), GPU memory (GM in MB), and Real-Time Factor (RTF). Evaluated using ten Yue Opera professionals.

## Results

YueOpera-Singer-10 achieves an F0 RMSE of 0.2133 and an MOS-N of 3.92 +/- 0.07, outperforming baseline models FFT-Singer (F0 RMSE 0.2309, MOS-N 3.41), DiffSinger (F0 RMSE 0.2195, MOS-N 3.69), and FT-GAN (F0 RMSE 0.2322, MOS-N 3.81). YueOpera-Singer maintains a compact size of 24.68M parameters and the lowest GPU memory footprint of 1296 MB, while operating at an RTF of 0.0364.

Ablations on inference steps show that increasing steps from 1 to 10 improves MOS-N from 3.83 to 3.92. Data augmentation ablations reveal that cross-genre pitch augmentation using Gezi Opera data (DA3) yields the largest performance jump, reducing F0 RMSE to 0.1834 and raising MOS-N to 4.01, significantly outperforming text-recitation augmentations (DA1 and DA2) which have narrower pitch distributions.

| System / Condition | F0 RMSE ↓ | MOS-N ↑ | Size (M) ↓ | GM (MB) ↓ | RTF ↓ |
|---|---|---|---|---|---|
| Ground Truth | - | 4.42 | - | - | - |
| FFT-Singer | 0.2309 | 3.41 | 24.26 | 1498 | 0.0193 |
| DiffSinger | 0.2195 | 3.69 | 39.35 | 1742 | 0.0842 |
| FT-GAN | 0.2322 | 3.81 | 57.80 | 3692 | 0.0213 |
| YueOpera-Singer-10 | 0.2133 | 3.92 | 24.68 | 1296 | 0.0364 |

## Limitations

The dataset is restricted to a single female professional actress performing the Xiaosheng role from a limited repertoire of three arias, constraining speaker diversity, stylistic range, and acoustic variability. The approach relies heavily on manually labeled phoneme boundaries and Parselmouth pitch annotations due to the absence of automated forced aligners for Wu dialect opera. Additionally, data augmentations rely on cross-genre opera data or auxiliary recitations, which may not fully capture nuanced operatic vocal ornamentations.

## Why read this

Speech and ML researchers working on low-resource singing voice synthesis, traditional culture preservation, or conditional flow-matching applications should read this to see how domain-specific data augmentation (especially cross-genre transfer) can compensate for extremely small proprietary datasets.

## Code

- https://anonymous.4open.science/api/repo/YueOpera_Benchmark-6914/file/index.html

## Applications

Digital preservation of endangered traditional operas, interactive cultural heritage entertainment systems, and localized Wu dialect singing voice generation.

## Institutions / 機構

Xiamen University, Alibaba Group

**Funding / 經費:** Major Scientific Research Project of the State Language Commission in the 13th Five-Year Plan

## Related

- (link related pages by id as the wiki grows)
