---
id: shen26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1972
pdf: https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.pdf
---

# Parallel Time-Band Mixing with Learned Observation-Adding for Robust ASR Front-Ends

[PDF](https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1972)

**TL;DR** — The paper introduces a sequence-parallel band-split speech enhancement front-end using Parallel Time-Band Mixer (PTBM) blocks and learned observation-adding (LOA), reducing Word Error Rate (WER) on DNS Challenge and CHiME-4 relative to recurrent baselines with only 0.96M parameters.

## Problem

Standard recurrent speech enhancement front-ends for robust ASR introduce sequential dependencies that hurt parallel efficiency, while enhancement artifacts can inadvertently degrade ASR accuracy even if perceptual speech quality improves. Furthermore, traditional observation-adding (OA) techniques require tedious development-set tuning of blending weights to suppress these ASR-sensitive artifacts. This work addresses the need for a lightweight, highly parallelizable front-end architecture that eliminates recurrent unrolling and dynamically blends signals without manual tuning.

## Method

The proposed architecture partitions complex STFT spectra into 23 non-overlapping sub-bands using a V4 band partition, followed by a stack of L=12 Parallel Time-Band Mixer (PTBM) blocks. Each PTBM block operates in parallel via two branches: a Temporal ConvMixer (TCM) branch utilizing gated dilated depthwise 1D convolutions for intra-band temporal mixing, and a Cross-Band Attention Mixer (CBA) branch performing multi-head self-attention across sub-band tokens per time frame. A gating-based interaction module fuses the two branches, and two prediction heads yield a mask-plus-residual reconstruction interface. Additionally, a lightweight two-layer MLP implements learned Observation-Adding (LOA) to predict utterance-level blending weights from log-energy ratio and log-magnitude spectral difference statistics. The SE network is trained using a multi-resolution STFT magnitude loss and negative SI-SNR objective, followed by a second-stage regression training for LOA using oracle grid-search weights.

## Results

Evaluated on the DNS Challenge (with and without reverberation) and CHiME-4 (dt05 real and et05 real sets) using frozen Whisper back-ends (Tiny, Medium, Large), the front-end consistently outperforms noisy inputs and recurrent baselines like BSRNN and Zhao et al. On Whisper Large, the proposed model achieves a WER of 4.17% on DNS without reverb, 10.06% with reverb, and 6.24% on CHiME-4 evaluation data, using only 0.96M parameters and 0.58 GMAC/s. Ablation studies confirm that removing either TCM, CBA, or LOA degrades WER, and that the 12-block depth strikes an optimal balance between accuracy and computational overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying robust automatic speech recognition (ASR) pipelines in noisy, reverberant real-world environments with frozen or unretrainable ASR back-ends.

## Limitations

The current LOA formulation operates at the utterance-level during inference by computing input statistics over all STFT frames of a recording, meaning it is not fully streaming.

## Related

- (link related pages by id as the wiki grows)
