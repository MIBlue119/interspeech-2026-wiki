---
id: silva26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1120
pdf: https://www.isca-archive.org/interspeech_2026/silva26_interspeech.pdf
---

# NeuroMultiSpEx: Neuro-Guided Target Speaker Extraction for Multi-Speaker Scenarios

*Dashanka De Silva, Saurav Pahuja, Siqi Cai, Tanja Schultz, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/silva26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/silva26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1120)

**TL;DR** — NeuroMultiSpEx is the first neuro-guided target speaker extraction system designed for 4-speaker scenarios using wearable 20-channel ear-EEG, achieving a headline 9.613 dB SI-SDRi by adaptively fusing temporal synchronization and speaker identity cues.

## Key contributions

- Scales neuro-guided target speaker extraction to multi-speaker (4-speaker) environments, eliminating the strict binary 2-speaker limitation of all prior work.
- Proposes a dual-encoder architecture that jointly extracts fine-grained temporal synchronization ('when') and explicit speaker identity ('who') from the same ear-EEG signal.
- Introduces a soft Gated Fusion mechanism that dynamically weights temporal vs. identity cues based on context, replacing static feature concatenation.
- Validates that wearable 20-channel ear-EEG (cEEGrid) carries sufficient spatial and temporal neural information for complex 4-way auditory attention tracking and extraction.

## Problem

Real-world cocktail party environments routinely involve three or more concurrent talkers, yet all prior neuro-guided speaker extraction techniques (such as BISS, NeuroHeed, and NeuroSpEx) are restricted to binary 2-speaker scenarios. Multi-class attention detection is fundamentally harder due to combinatorial permutation ambiguity, where simple envelope tracking fails during high temporal overlap. Furthermore, previous systems rely either on high-density scalp-EEG (64+ channels), which is impractical for daily wear, or isolated cues that cannot resolve multi-speaker confusions.

## Method

The architecture takes a 4-speaker audio mixture and 20-channel ear-EEG (cEEGrid) and feeds them into two parallel branches. The EEG-Envelope Encoder processes raw EEG via a pre-conv layer followed by 4 stacked blocks combining 2-head Self-Attention and dilated Temporal Convolutional Networks (TCNs with dilation {1, 2, 4, 8}) to capture global and local temporal dynamics, supervised by a Pearson Correlation Coefficient (PCC) loss. Simultaneously, the EEG-Speaker Encoder uses an XAGnet backbone with bilateral Graph Convolutional Networks (GCNs) for intra-ear dependencies and 2-head Cross-Attention for inter-hemispheric communication, producing a 4-way speaker probability distribution via Cross-Entropy loss and a time-aligned sequence via a Multi-Head Attention (MHA) Adapter. A Gated Fusion module computes an element-wise sigmoid gate over the concatenated envelope and speaker features to adaptively weight 'when' versus 'who' guidance depending on temporal overlap. The fused reference sequence ($H_{Ref}$) acts as the Query in a cross-modal attention block inside a modified Conv-TasNet extraction network ($n=4$ speaker extractor blocks), where Keys and Values come from the audio mixture latent representation. The network is trained end-to-end via a joint multi-task loss minimizing Scale-Invariant Signal-to-Distortion Ratio ($L_{SI-SDR}$), Cross-Entropy ($L_{CE}$), and PCC loss ($L_{PCC}$) with weights $\lambda_1 = 0.84$ and $\lambda_2 = 0.62$.

Inference operates on 4-second sliding windows with a 1-second hop. The model maps the acoustic mixture and concurrent ear-EEG streams directly to the clean time-domain waveform of the attended speaker.

## Experimental setup

Evaluated on the PKU Ear-EEG Dataset comprising 16 native Mandarin participants (19-27 years old) completing 40 one-minute trials each (640 total segments) at 0 dB SNR with speakers at $\pm 30^{\circ}$ and $\pm 90^{\circ}$. Data uses a trial-independent split (80% train, 10% validation, 10% test yielding 64 test trials across subjects). EEG is recorded via 20-channel cEEGrid arrays, sampled at 500 Hz, downsampled to 128 Hz, bandpass filtered (1-40 Hz), and common-average referenced. Baselines compared include BISS, NeuroHeed, NeuroHeed+, NeuroSpEx, and NeuroSpEx+. Implemented in PyTorch 2.0+ on 4$\times$ NVIDIA RTX A6000 GPUs using Adam (LR = $10^{-4}$, batch size 16) with early stopping and learning rate halving.

## Results

NeuroMultiSpEx achieves a headline 9.613 dB SI-SDRi and 10.171 dB SDRi, outperforming the strongest baseline (NeuroSpEx+) by 0.71 dB in SI-SDRi, and vastly exceeding foundational BISS (2.174 dB SI-SDRi). Perceptually, it attains a PESQ of 2.08 and STOI of 0.708 (a 3.7% improvement over NeuroSpEx+). In auxiliary metrics, it reaches 82.4% 4-way AAD accuracy (vs 74.6% for NeuroHeed+) and an envelope PCC of 0.023. Ablations confirm that removing the EEG-Speaker Encoder causes the largest performance drop (-0.407 dB SI-SDRi), highlighting that identity cues are critical in multi-speaker conditions. Replacing Gated Fusion with simple concatenation drops SI-SDRi by 0.202 dB, confirming the necessity of adaptive weighting.

| System | SI-SDRi (dB) | SDRi (dB) | PESQ | STOI | AAD Acc (%) |
|---|---|---|---|---|---|
| BISS [7] | 2.174 | 2.822 | 1.16 | 0.182 | N/A |
| NeuroHeed [8] | 7.682 | 8.353 | 1.43 | 0.643 | N/A |
| NeuroHeed+ [12] | 8.194 | 8.824 | 1.55 | 0.657 | 74.6 |
| NeuroSpEx [9] | 8.618 | 9.188 | 1.78 | 0.664 | N/A |
| NeuroSpEx+ [10] | 8.904 | 9.525 | 1.84 | 0.683 | N/A |
| **NeuroMultiSpEx** | **9.613** | **10.171** | **2.08** | **0.708** | **82.4** |

## Limitations

Evaluated exclusively on clean-condition lab data with native Mandarin speakers using fixed spatial coordinates, leaving cross-subject generalization, reverberant environments, and hearing-impaired users unvalidated. The dataset scale is relatively small (16 subjects, 640 total segments), and envelope PCC values remain low (0.023) due to the inherent constraints of low-density wearable ear-EEG channels compared to high-density scalp configurations.

## Why read this

Speech and ML engineers building wearable, brain-informed hearing assistance will find this paper essential reading for its novel blueprint on scaling neuro-guided extraction beyond binary scenarios using wearable ear-EEG and gated cross-modal fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Brain-computer interface-enhanced hearing aids, wearable cocktail-party noise suppression systems, and cognitive attention-aware speech separation devices.

## Related

- (link related pages by id as the wiki grows)
