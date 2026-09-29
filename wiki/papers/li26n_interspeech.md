---
id: li26n_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
institutions: ["Inner Mongolia University", "Lenovo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-948
pdf: https://www.isca-archive.org/interspeech_2026/li26n_interspeech.pdf
---

# Online Audio-Visual Target Speaker Extraction with Viseme-Guided Lightweight Visual Pretraining

*Zixuan Li, Xueliang Zhang, Lei Miao, Zhipeng Yan, Ying Sun, Chong Zhu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-948)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — This paper introduces an online audio-visual target speaker extraction system guided by viseme representations obtained via lightweight cross-modal distillation, achieving top-tier separation quality at the lowest computational cost (7.7G MACs total).

## Key contributions

- Systematically investigates viseme-recognition pretraining as a visual cue for online audio-visual target speaker extraction.
- Proposes a fully causal, video-only student viseme recognizer optimized via cross-modal distillation from a non-causal audio-visual teacher.
- Enhances the TF-SkiMNet separator backbone by replacing the convolutional Local-T module with a channel-wise LSTM to better model long-range temporal dependencies for speaker consistency.
- Achieves a superior trade-off between separation quality and computational complexity (7.7G MACs) compared to prior mouth-cue and VSR-based baselines.

## Problem

Existing audio-visual target speaker extraction systems often rely on non-causal architectures and high-compute visual encoders like full VSR models (e.g., ResNet-18) or jointly learned mouth cues, making them unsuitable for real-time edge streaming. While prior work tried reducing compute via lighter backbones or visual voice activity detection (VVAD), VVAD fails under fully overlapped speech, and VSR encoders carry excessive complexity. This paper addresses the gap by engineering a low-latency, highly informative, and lightweight visual cue specifically tailored for causal streaming extraction.

## Method

The visual front-end uses a ShuffleNetV2 backbone with causal padding and an Emformer streaming Transformer (with 40 frames left context and a memory bank) to output frame-level viseme embeddings. A non-causal audio-visual teacher (ResNet18 + Conformer) trained on LRS2 with joint CTC/attention supervision provides posterior targets for the causal video-only student. The distillation loss combines temperature-scaled Kullback-Leibler divergence on both CTC and attention decoder outputs with a distillation weight of $\lambda_{KD} = 0.3$ and $T = 2$.

In the separation stage, mixture STFT features pass through a 1D convolution and are concatenated with upsampled viseme embeddings processed via temporal convolutional networks (TCNs). The combined features feed into 6 modified TF-SkiMNet blocks where the original convolutional Local-T module is replaced by a channel-wise LSTM (hidden size 32) to better maintain target-speaker consistency across long-range temporal contexts. The network is trained using a composite loss of magnitude-spectrum reconstruction and time-domain SI-SNR.

## Experimental setup

Experiments use LRS2 (11h train, 3h val), LRS3 (28h train, 3h val), and VoxCeleb2 (56h train, 3h val) datasets, mixed at 2-second segments with SIR uniformly sampled from [-5, 5] dB. Baselines include Baseline-1 (Mouth + SkiM, 7.9G MACs), Baseline-2 (Viseme + SkiM, 9.1G MACs), and Baseline-3 (VSR + TF-SkiMNet, 11.3G MACs). Metrics include SI-SNR, PESQ, ESTOI, and Viseme Error Rate (VER). The proposed model totals 7.7G MACs (3.3G visual frontend + 3.4G separator).

## Results

On in-domain LRS2-Mix, the proposed system achieves an SI-SNR of 10.07 dB, PESQ of 2.07, and ESTOI of 0.81, outperforming Baseline-1 (7.17 dB / 1.61 / 0.71) and Baseline-3 (8.88 dB / 1.91 / 0.77). On LRS3-Mix, it hits 10.78 dB SI-SNR, 2.18 PESQ, and 0.82 ESTOI, securing the best numbers across all evaluated metrics. Cross-domain evaluation trained on Vox2-Mix and tested on LRS2-Mix shows the proposed system leading with 7.41 dB SI-SNR, 1.76 PESQ, and 0.72 ESTOI. Ablation demonstrates that cross-modal distillation drops student VER from 33.93% down to 28.90%, and swapping the TF-SkiMNet local module improves LRS2-Mix SI-SNR from 9.39 dB to 10.07 dB.

| System | Visual Frontend MACs | Separator MACs | Total MACs | LRS2-Mix SI-SNR | LRS2-Mix PESQ |
|---|---|---|---|---|---|
| Baseline-1 (Mouth+SkiM) | 2.1 G | 5.8 G | 7.9 G | 7.17 | 1.61 |
| Baseline-2 (Viseme+SkiM) | 3.3 G | 5.8 G | 9.1 G | 7.84 | 1.67 |
| Baseline-3 (VSR+TF-SkiMNet) | 7.9 G | 3.4 G | 11.3 G | 8.88 | 1.91 |
| Proposed (Viseme+TF-SkiMNet) | 3.3 G | 3.4 G | 7.7 G | 10.07 | 2.07 |

## Limitations

The viseme front-end is pretrained exclusively on LRS2, which creates a visual domain shift when applied directly to LRS3 and Vox2-Mix datasets, resulting in slightly smaller performance gains or competitive ties on non-LRS2 datasets. Additionally, performance heavily relies on accurate visual tracking of the mouth region without severe occlusion or extreme lighting variations.

## Why read this

Speech and ML engineers building real-time, low-latency audio-visual target speaker extraction systems for edge devices should read this to learn how viseme-level cross-modal distillation can replace heavy VSR front-ends without sacrificing separation performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication tools, smart-home speaker identification, hearing assistive devices, and multi-speaker video conferencing systems.

## Institutions / 機構

Inner Mongolia University, Lenovo

**Funding / 經費:** Inner Mongolia Natural Science Foundation, Hohhot R&D Investment Incentive Program, Inner Mongolia Postgraduate Research Project, CCF-Lenovo Research Fund

## Related

- [Online Audiovisual Speaker Separation Using Efficient Visual Knowledge Distillation](yu26e_interspeech.md) — same problem · relatedness 3.0/3
- [TGTSE: Token-Guided Target Speaker Extraction with Visual Cue](ling26_interspeech.md) — same problem · relatedness 3.0/3
- [AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching](tipaksorn26_interspeech.md) — same problem · relatedness 2.9/3
- [Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction](kwak26_interspeech.md) — same problem · relatedness 2.9/3
- [Multi-View Based Audio Visual Target Speaker Extraction](yang26m_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
