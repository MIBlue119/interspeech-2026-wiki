---
id: li26h_interspeech
category: tts
labels: [multilingual, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-615
pdf: https://www.isca-archive.org/interspeech_2026/li26h_interspeech.pdf
---

# SRF-SVB: Style-Consistent Singing Voice Beautifying via Rectified Flow

*Wenhui Li, Biao Dong, Liwei Hu, Jiqing Han, Yongjun He*

[PDF](https://www.isca-archive.org/interspeech_2026/li26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-615)

**Category:** `tts` · **Labels:** `multilingual`, `generative-model`

**TL;DR** — SRF-SVB is the first rectified flow-based singing voice beautifying framework that corrects pitch and rhythm while preserving the amateur singer's unique timbre and expressive style through a context-guided masked mel-spectrogram inpainting mechanism, achieving an English SECS of 0.85 and a Chinese SECS of 0.82.

## Key contributions

- Proposes SRF-SVB, pioneering the integration of rectified flow into singing voice beautifying (SVB) for high-fidelity and efficient correction of pitch and rhythm.
- Designs a context-guided masked mel-spectrogram inpainting mechanism that randomly masks regions and reconstructs them using decoupled features and surrounding spectral context to preserve the amateur singer's style.
- Deploys acoustic condition composition by combining amateur context features with professional pitch, aligned content features via Dynamic Time Warping (DTW), and amateur timbre features.
- Validates superior performance across English and Chinese test sets, demonstrating notable improvements in timbre similarity (SECS) and subjective naturalness (MOS-S) over baseline models.

## Problem

Singing voice beautifying (SVB) requires correcting pitch and rhythm while elevating vocal quality without altering the amateur's original lyrics or timbre. Prior automatic pitch correction tools like KaraTuner and Diff-Pitcher adjust pitch alone while neglecting rhythm and expressiveness, whereas general generative SVB models like NSVB rely heavily on scarce parallel amateur-professional training pairs and sacrifice the singer's individual identity. Diffusion-based non-parallel models like CONTUNER struggle to achieve high generation quality alongside efficient inference. These gaps matter because over-beautification strips away distinct realism and makes amateur singing sound generic and robotic.

## Method

SRF-SVB adopts a rectified flow generative backbone based on a Diffusion Transformer (DiT) to transport noise distributions to mel-spectrogram data distributions along straight trajectories. First, acoustic features are decoupled using RMVPE for pitch (fp), CAM++ for timbre (ft), and a Conformer-based PPG extractor for content (fc), alongside a valid frame mask (u) to filter silence. These are concatenated, normalized, and mapped to a hidden dimension H to form fcond.

During training, a mel-spectrogram x1 has a consecutive segment of length L = alpha * T (with alpha = 0.5) masked out. The masked mel-spectrogram xmask and binary indicator b are concatenated to form the mask-aware condition xcond. The DiT backbone consists of 12 Transformer blocks with hidden dimension 512 and 8 attention heads per layer, conditioned on time step t via an MLP and adaptive layer normalization. The conditional flow matching objective is optimized solely over masked regions.

During inference, the input constructs a temporal sequence where the first Ta frames act as an amateur context region, and the subsequent Tp frames act as the generation target. Content features are aligned to the professional time axis using Dynamic Time Warping (DTW) on pitch curves. Starting from Gaussian noise, Euler's method solves the ODE over 10 sampling steps, and the final Tp frames are converted to waveforms via a pre-trained NSF-HiFiGAN vocoder.

## Experimental setup

Evaluated on ~160 hours of training data pooled from PopBuTFy, GTSinger, OpenSinger, Opencpop, PopCS, and M4Singer. Tested on an English set of 617 paired segments (PopBuTFy) and a Chinese set of 874 paired segments (CCMusic, Opencpop, OpenSinger). Compared against Diff-Pitcher and NSVB. Metrics include Raw Pitch Accuracy (RPA), Character Error Rate (CER), Speaker Embedding Cosine Similarity (SECS), Quality MOS (MOS-Q), Similarity MOS (MOS-S), and CMOS. Implemented with PyTorch on a single NVIDIA RTX 4090 GPU (24GB), trained for 500k steps using AdamW optimizer with a linear warm-up to 2.5e-4 and exponential decay to 1e-4.

## Results

SRF-SVB achieves an English RPA of 0.57, SECS of 0.85, MOS-Q of 3.91, and MOS-S of 4.47, outperforming Diff-Pitcher (RPA 0.48, SECS 0.68, MOS-Q 2.45, MOS-S 3.44) and NSVB (RPA 0.57, SECS 0.58, MOS-Q 3.76, MOS-S 3.83). On the Chinese test set, it scores an RPA of 0.50, CER of 0.04, SECS of 0.82, MOS-Q of 3.62, and MOS-S of 4.06, surpassing Diff-Pitcher (RPA 0.37, SECS 0.80, MOS-Q 1.96, MOS-S 2.72) and matching NSVB in quality while dominating in timbre similarity (NSVB SECS 0.40, MOS-S 3.18). Ablations show consecutive masking with alpha=0.5 outperforms alpha=0.2 (English SECS 0.77, CMOS-Q -0.53) and random masking (English SECS 0.76, CMOS-Q -0.87). It shows a slight CER penalty on English (0.24 vs Diff-Pitcher's 0.20) due to full generative reconstruction over pitch-only manipulation.

| System | RPA ↑ | CER ↓ | SECS ↑ | MOS-Q ↑ | MOS-S ↑ |
|---|---|---|---|---|---|
| Amateur (Eng) | 0.40 | 0.22 | - | 3.60 | - |
| Diff-Pitcher (Eng) | 0.48 | 0.20 | 0.68 | 2.45 | 3.44 |
| NSVB (Eng) | 0.57 | 0.23 | 0.58 | 3.76 | 3.83 |
| SRF-SVB (Eng) | 0.57 | 0.24 | 0.85 | 3.91 | 4.47 |
| SRF-SVB (Chi) | 0.50 | 0.04 | 0.82 | 3.62 | 4.06 |

## Limitations

The generative inpainting process can occasionally impact pronunciation clarity, resulting in slightly higher Character Error Rates compared to pitch-only editors. The approach requires paired amateur and professional content or robust DTW alignment during inference, and evaluation is constrained to Chinese and English datasets.

## Why read this

Audio and speech engineers looking to deploy high-efficiency, style-preserving singing voice correction systems via rectified flow will find a complete DiT-based inpainting recipe and concrete hyperparameter choices that surpass traditional CVAE and diffusion baselines.

## Code

- https://mrwho729.github.io/SRF-SVB/

## Applications

Online karaoke applications, professional music production, and real-time live streaming vocal enhancement.

## Institutions / 機構

Harbin Institute of Technology

## Related

- (link related pages by id as the wiki grows)
