---
id: kwak26_interspeech
category: enhancement-separation
institutions: ["Korea Advanced Institute of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-706
pdf: https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.pdf
---

# Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction

*Doyeop Kwak, Suyeon Lee, Joon Son Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-706)

**Category:** `enhancement-separation`

**TL;DR** — Plug-and-Steer decouples audio-visual target speaker extraction by freezing a high-fidelity audio-only separation backbone and using a minimalist linear Latent Steering Matrix (LSM) controlled by a visual module to route the target speaker to a designated channel, achieving comparable perceptual quality to studio-trained models without fidelity degradation.

## Key contributions

- Analyzed the latent structural properties of diverse AOSS architectures, demonstrating that speaker identity is permutable via a simple linear transformation at the feature level.
- Proposed Plug-and-Steer to decouple separation from selection, preserving the high-fidelity acoustic priors of frozen AOSS models trained on clean data.
- Introduced the Latent Steering Matrix (LSM) as a C x C residual feature-level transformation to re-route latent features across output channels.
- Demonstrated that internal feature-level steering achieves 99.93% routing accuracy with lower computational overhead (256.82 GFLOPs, RTF 0.147) than post-hoc SyncNet-based selection.

## Problem

Conventional audio-visual target speaker extraction (AV-TSE) systems deeply integrate audio and visual features via cross-attention, concatenation, or joint multi-modal fusion to learn separation and target selection simultaneously. However, large-scale audio-visual datasets collected in the wild (such as LRS2 and VoxCeleb2) contain intrinsic noise and reverberation, causing full-parameter training to act as a fidelity ceiling that degrades acoustic output quality compared to studio-trained audio-only speech separation (AOSS) models. Furthermore, audio-only models suffer from permutation ambiguity because they are blind to the target speaker's identity. This work addresses the gap by asking whether forcing visual cues to refine acoustic separation—a task AOSS models already perform proficiently—always yields a net gain, and proposes decoupling the two tasks.

## Method

The methodology treats the pre-trained AOSS backbone as a frozen high-fidelity engine steered by visual cues. Given an intermediate audio feature $f_i \in \mathbb{R}^{C \times T_a}$ from the $i$-th separator block, a residual Latent Steering Matrix $W \in \mathbb{R}^{C \times C}$ is applied via the operation $f_i' = f_i + g \cdot W f_i$, where $g \in \{0, 1\}$ is a binary gate. When $g=1$, $W$ induces a latent speaker swap. The LSM is first trained under a forced-swap condition ($g=1$) using the negative Scale-Invariant Signal-to-Noise Ratio (SI-SNR) loss against permuted reference signals for 10k steps on NVIDIA RTX 4090 GPUs.

To control the gate dynamically based on visual cues, a lightweight visual steering module is learned while keeping the AOSS backbone and LSM frozen. Video frames are processed by a visual lip encoder to produce embeddings $v \in \mathbb{R}^{T_v \times C_v}$, which are temporally interpolated to match $T_a$ and concatenated with $f_i$ along the channel dimension. A modified Temporal Convolutional Network (TCN) consisting of 2 blocks (each with 3 convolutional layers) processes the joint feature, followed by a sigmoid-activated gate head that predicts frame-wise gate values $g_t \in [0, 1]$. For 2D latent spaces (DPRNN, TF-GridNet), channels are projected to a reduced space $C_r = 16$ and non-temporal dimensions are flattened.

The visual steering module is trained for 100k steps (with 1k warmup steps) using a combined loss: $\mathcal{L}_{total} = \mathcal{L}_{BCE} + \lambda \mathcal{L}_{SI-SNR}$, where $\lambda = 0.1$, $\mathcal{L}_{BCE}$ is binary cross-entropy against pseudo-labels derived from backbone permutations, and $\mathcal{L}_{SI-SNR}$ is the negative total SI-SNR between steered outputs and reference signals. During inference, a threshold $\tau = 0.5$ is applied to the averaged gate value.

## Experimental setup

Experiments are conducted on LRS2-2mix, a two-speaker dataset partitioned into 20k training samples (~23 hours), 5k validation, and 3k test samples, created by mixing utterances with random SNRs in [-5, 5] dB. Audio is sampled at 16 kHz in mono (3-second random crops during training), and visual inputs are 25 FPS grayscale sequences center-cropped from 224x224 to 112x112. Baselines include Conv-TasNet (5.1M params), DPRNN (2.6M params), TF-GridNet (14.4M params), and MossFormer2 (55.7M params), alongside established AV-TSE counterparts (AV-ConvTasNet, AV-DPRNN, AV-TFGridNet, AV-MossFormer2). Metrics include SI-SDRi (dB), DNSMOS, and NISQA for perceptual quality. Models are optimized using Adam with a cosine annealing scheduler.

## Results

When pre-trained on clean Libri2Mix data (~58 hours) and evaluated on LRS2-2mix, applying LSM at the final layer preserves 96.22% performance for Conv-TasNet (6.82 dB SI-SDRi), 99.67% for DPRNN (7.74 dB SI-SDRi), 99.91% for TF-GridNet (14.79 dB SI-SDRi, 2.79 DNSMOS, 4.29 NISQA), and 99.43% for MossFormer2 (12.65 dB SI-SDRi, 2.79 DNSMOS, 3.47 NISQA). In contrast, conventional residual fine-tuning improves SI-SDRi (e.g., 11.72 dB for Conv-TasNet) but harms perceptual metrics like DNSMOS and NISQA due to noisy AV ground-truth supervision.

When integrated with a powerful MossFormer2 backbone pre-trained on a 107-hour high-fidelity corpus (VCTK, LibriTTS, internal TTS), Plug-and-Steer achieves 15.40 dB SI-SDRi with high perceptual quality (2.88 DNSMOS, 3.87 NISQA), whereas conventional fine-tuning boosts SI-SDRi to 17.11 dB but degrades DNSMOS to 2.53 and NISQA to 3.28.

| System | SI-SDRi (dB) | DNSMOS | NISQA |
|---|---|---|---|
| Libri2Mix GT (Clean) | - | 3.16 | 3.93 |
| LRS2-2mix GT (Wild) | - | 2.38 | 3.19 |
| TF-GridNet (AO Baseline) | 14.81 | 2.80 | 4.32 |
| TF-GridNet + Residual (Unfrozen) | 13.38 | 2.36 | 3.17 |
| TF-GridNet + LSM (Ours, Frozen) | 14.79 | 2.79 | 4.29 |
| AV-TFGridNet (Jointly Trained) | 15.10 | 2.51 | 3.53 |

## Limitations

The framework assumes the pre-trained audio-only backbone is already capable of clean separation, meaning backbone separation quality acts as both a performance floor and ceiling. The evaluation is restricted to 2-speaker mixtures in English using the LRS2-2mix benchmark, leaving multi-speaker (>2) scenarios, diverse acoustic environments, and multilingual generalization unexplored. The visual steering module relies on clean lip motion tracking and resolution alignment, which could degrade under severe visual occlusion or extreme head poses.

## Why read this

Speech and ML researchers working on speech separation or multi-modal extraction should read this paper to learn how to adapt frozen studio-quality audio backbones into target speaker extractors without suffering the perceptual degradation caused by noisy audio-visual training sets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time audiovisual target speaker extraction for video conferencing, hearing aids, and smart devices operating in noisy cocktail-party environments.

## Institutions / 機構

Korea Advanced Institute of Science and Technology

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- [TGTSE: Token-Guided Target Speaker Extraction with Visual Cue](ling26_interspeech.md) — same problem · relatedness 2.9/3
- [AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching](tipaksorn26_interspeech.md) — same problem · relatedness 2.9/3
- [Multi-View Based Audio Visual Target Speaker Extraction](yang26m_interspeech.md) — same problem · relatedness 2.9/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.9/3
- [MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow](shimizu26_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
