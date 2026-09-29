---
id: shen26c_interspeech
category: enhancement-separation
labels: [efficient-on-device, self-supervised, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1972
pdf: https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.pdf
---

# Parallel Time-Band Mixing with Learned Observation-Adding for Robust ASR Front-Ends

*Xingyu Shen, Runze Wang, Wei-Ping Zhu, Benoit Champagne*

[PDF](https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1972)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces a sequence-parallel band-split speech enhancement front-end built on Parallel Time-Band Mixer (PTBM) blocks and learned Observation-Adding (LOA), reducing Word Error Rate (WER) across DNS Challenge and CHiME-4 using frozen Whisper back-ends while maintaining a lightweight footprint of 0.96M parameters and 0.58 GMAC/s.

## Key contributions

- Develops the Parallel Time-Band Mixer (PTBM) block, replacing recurrent unrolling with intra-band temporal convolutional mixing (TCM) and per-frame cross-band self-attention (CBA) in a sequence-parallel architecture.
- Introduces learned Observation-Adding (LOA), a lightweight MLP that predicts utterance-level blending weights from energy and spectral difference statistics to suppress ASR-sensitive artifacts without validation-set tuning.
- Achieves consistent WER reductions compared to recurrent band-split baselines (BSRNN and Zhao et al.) across both synthetic DNS datasets and real-recorded CHiME-4 development/evaluation sets.
- Demonstrates exceptional computational efficiency, requiring only 0.96M parameters and 0.58 GMAC/s for the enhancement front-end.

## Problem

Robust automatic speech recognition (ASR) under real-world noise and reverberation typically relies on speech enhancement front-ends, but prior architectures like Band-split RNN (BSRNN) use recurrent temporal and cross-band modules that introduce sequential dependencies and limit parallel efficiency. Furthermore, standard enhancement models often introduce artifacts that degrade downstream ASR performance, while tuning artifact-mitigation blending weights requires tedious development-set searches. These limitations make traditional front-ends computationally heavy and poorly aligned with fixed, downstream ASR objectives.

## Method

The single-channel input waveform is transformed via STFT and partitioned into $K=23$ non-overlapping sub-bands using the V4 configuration, forming a real-valued embedding representation $Z^{(0)} \in \mathbb{R}^{B \times K \times T \times C}$ with $C=128$. This representation passes through a stack of $L=12$ Parallel Time-Band Mixer (PTBM) blocks. Each PTBM block operates via two parallel branches: a Temporal ConvMixer (TCM) branch utilizing layer normalization, bottleneck projections to $C_b=48$, gated dilated depthwise 1D convolutions (kernel size 3, dilations {1, 2, 4, 8}) along the time axis, and a point-wise projection back to $C$; and a Cross-Band Attention Mixer (CBA) branch utilizing multi-head self-attention ($H=4$) independently across the $K$ sub-band tokens per time frame. The branch outputs are fused via an element-wise gating mechanism with a block-level residual connection.

The final layer features prediction heads mapping the outputs to a complex mask and complex residual to reconstruct the enhanced spectrum via a mask-plus-residual interface. To mitigate enhancement artifacts, the Learned Observation-Adding (LOA) module uses a 2-layer MLP (hidden dimension 64, ReLU activation, sigmoid output) that takes summary statistics—specifically a log-energy ratio and the mean/variance of log-magnitude spectral differences—to predict a single utterance-level blending weight $\omega \in [0, 1]$ combining the original noisy input and the enhanced estimate. The system is trained in two stages: first minimizing a weighted combination of a multi-resolution STFT magnitude loss and negative SI-SNR ($\lambda = 1.0$) using Adam (learning rate $2 \times 10^{-4}$), and second freezing the SE network to train the LOA MLP via $\ell_2$ regression against oracle blending weights acquired through grid search.

## Experimental setup

Evaluated on the 100-hour DNS Challenge synthetic corpus (with and without reverberation) and the single-channel CHiME-4 dataset (using real-recorded development set dt05_real and evaluation set et05_real). Compared against noisy inputs, DPARN, BSRNN, and the lightweight front-end by Zhao et al. The primary metric is Word Error Rate (WER) using frozen Whisper back-ends (Tiny, Medium, and Large), alongside front-end parameter count and MACs.

## Results

On the DNS Challenge without reverberation using Whisper Large, the proposed model achieves a WER of 4.17%, outperforming the noisy input (4.80%), BSRNN (4.23%), and Zhao et al. (4.40%), while requiring only 0.96M parameters and 0.58 GMAC/s. On the challenging CHiME-4 evaluation set (et05_real) with Whisper Large, it achieves 6.24% WER, beating BSRNN (6.36%) and Zhao et al. (6.40%). Ablations show that removing cross-band attention (w/o CBA) or temporal mixing (w/o TCM) degrades WER to 4.62% and 5.08% respectively on DNS w/o Rev, confirming the necessity of both paths within PTBM.

| System | Params (M) | MACs (GMAC/s) | DNS w/o Rev (Large) | DNS w/ Rev (Large) | CHiME-4 Eval (Large) |
|---|---|---|---|---|---|
| Noisy | - | - | 4.80 | 10.94 | 6.69 |
| BSRNN [11] | 2.60 | 1.84 | 4.23 | 10.29 | 6.36 |
| Zhao et al. [12] | 1.55 | 0.62 | 4.40 | 10.90 | 6.40 |
| Ours (Full) | 0.96 | 0.58 | 4.17 | 10.06 | 6.24 |

## Limitations

The current LOA formulation operates at the utterance level by computing summary statistics across the full-length test recording, meaning it is not fully streaming or causal during inference. Additionally, evaluations are constrained to English benchmarks (DNS and CHiME-4) with fixed Whisper recognizers, leaving multilingual generalization and integration with jointly-trained or streaming ASR back-ends open for future work.

## Why read this

Speech and ML engineers looking to deploy ultra-lightweight, parallelizable enhancement front-ends for fixed ASR back-ends should read this to see how sequence-parallel mixer blocks can replace recurrent band-split models without sacrificing WER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust on-device automatic speech recognition, far-field smart speakers, and voice interfaces operating in noisy and reverberant environments.

## Institutions / 機構

Concordia University, McGill University, Shenzhen University of Advanced Technology

## Related

- (link related pages by id as the wiki grows)
