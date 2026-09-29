---
id: ibrahimov26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1071
pdf: https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.pdf
---

# On the Role of the Tongue Region in Ultrasound-to-Acoustic Mapping

*Ibrahim Ibrahimov, Gábor Gosztolya, Csaba Zainkó*

[PDF](https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1071)

**Category:** `applications-other`

**TL;DR** — This paper investigates the core assumption of silent speech interfaces that tongue motion is the primary driver in ultrasound-to-acoustic mapping, revealing via input manipulation and cross-attention architectures that single-frame CNNs do not critically rely on tongue-region pixels for reconstruction accuracy.

## Key contributions

- Proposed an automatic tongue region extraction pipeline combining adaptive Gaussian thresholding, morphological operations, and temporal stabilization (IoU and centroid displacement thresholds).
- Performed controlled input manipulation by zeroing out or replacing tongue pixels with background distribution, proving that removing the tongue causes no statistically significant MSE degradation.
- Introduced a dual-encoder architecture with cross-attention gating and global average pooling to explicitly inject binary tongue masks as spatial priors.
- Demonstrated via Grad-CAM that while standard 2D-CNNs scatter activations over background artifacts, the cross-attention mechanism successfully focuses models on anatomically valid tongue regions without sacrificing baseline error levels.

## Problem

Ultrasound tongue imaging (UTI) is a leading modality for silent speech interfaces, yet synthesized speech quality remains low and architectures show only incremental gains over standard CNNs. Prior work assumes that frame-by-frame mapping models directly exploit tongue shape and dynamics, but ultrasound frames contain extensive surrounding tissue, acoustic shadows, and imaging artifacts. It remains untested whether current models genuinely leverage the tongue region or merely exploit broader, uninterpretable frame-level pixel statistics.

## Method

The baseline is a 4-layer 2D-CNN mapping resized $64 \times 128$ ultrasound scanlines to 80-dimensional mel-spectrograms using $13 \times 13$ kernels and a 1000-unit dense layer. The proposed dual-encoder architecture processes full frames through a broad stream ($13 \times 13$ kernels) and binary masks through a lightweight stream ($3 \times 3$ kernels) in parallel across four progressive stages. At stages 2 and 4, $2 \times 2$ max pooling is applied. Cross-attention gates use a two-layer $1 \times 1$ conv network on mask features with sigmoid activation to yield spatial attention maps, which are applied via element-wise multiplication and combined with full-image features using residual connections.

Global Average Pooling (GAP) is applied to gated outputs at all four stages to create stage-level descriptors of dimensions 30, 60, 90, and 120, which are concatenated into a 300-dimensional vector. This vector passes through a 1000-unit dense layer with Swish activation, $L_1$ regularization ($\lambda = 5 \times 10^{-6}$), and 0.2 dropout. Models were trained for a maximum of 50 epochs with batch size 128 using SGD (initial lr = 0.1), reduce-on-plateau scheduling, and early stopping based on validation MSE. Synthesized speech was generated from predicted mel-spectrograms using a pre-trained multi-speaker HiFi-GAN (VCTK V1 vocoder).

## Experimental setup

Evaluated on data from 4 speakers (2 female, 2 male) from the UltraSuite-TaL80 corpus containing synchronized ultrasound and audio at 81.5 fps (118 to 181 utterances per speaker). Ten shared read sentences were reserved for testing, with the remaining data split 9:1 for training and development. Metrics include Mean Squared Error (MSE) for mel-spectrograms, Mel Cepstral Distortion (MCD), Perceptual Evaluation of Speech Quality (PESQ), and MOSnet scores for synthesized audio. Implemented in TensorFlow 2.20.0 on an NVIDIA A100 GPU (40GB VRAM).

## Results

Across all four speakers, removing the tongue region from input frames produced no statistically significant MSE degradation ($p > 0.05$, e.g., speaker 01fi original MSE $0.3521$ vs no-tongue $0.3919$, $p=0.1041$). Similarly, the proposed cross-attention dual encoder showed no significant MSE or perceptual gains over the standard 2D-CNN baseline, with baseline occasionally outperforming it (e.g., speaker 01fi baseline MSE $0.3521$ vs proposed $0.4341$, $p=0.0113$). Objective speech synthesis metrics (MCD, PESQ, MOSnet) confirmed parity between systems, while all models lagged far behind the vocoded original upper bound.

Grad-CAM visualizations proved that the proposed dual-encoder successfully focused its activations tightly on the tongue region, whereas the baseline scattered activations across background tissue and shadows.

| System | Speaker | MSE $\downarrow$ | MCD (dB) $\downarrow$ | PESQ $\uparrow$ | MOSnet $\uparrow$ |
|---|---|---|---|---|---|
| Baseline | 01fi | 0.3521 | 563.18 | 1.482 | 1.395 |
| Proposed | 01fi | 0.4341 | 547.40 | 1.391 | 1.418 |
| Baseline | 02fe | 0.4513 | 521.27 | 1.507 | 1.510 |
| Proposed | 02fe | 0.4816 | 493.78 | 1.340 | 1.182 |
| Vocoded Original | 01fi | - | 637.65 | 2.786 | 3.366 |

## Limitations

The study is scoped to a small cohort of 4 speakers from a single English corpus (UltraSuite-TaL80). It evaluates only a frame-by-frame 2D-CNN architecture without temporal modeling (such as recurrent networks or transformers), leaving open whether tongue dynamics matter in temporal contexts. Furthermore, automatic mask extraction parameters were tuned empirically via visual inspection.

## Why read this

Researchers building ultrasound-based silent speech interfaces should read this to challenge assumptions about feature reliance in frame-level mappings and to see how cross-attention mechanisms can enforce anatomical interpretability without degrading acoustic performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Silent speech interfaces, augmentative and alternative communication (AAC) devices for laryngectomees or speech-impaired individuals, and silent communication in noisy or sound-sensitive environments.

## Institutions / 機構

Budapest University of Technology and Economics, HUN-REN-SZTE Research Group on Artificial Intelligence, University of Szeged

**Funding / 經費:** Ministry of Culture and Innovation of Hungary, National Research, Development and Innovation Fund

## Related

- (link related pages by id as the wiki grows)
