---
id: silva26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1120
pdf: https://www.isca-archive.org/interspeech_2026/silva26_interspeech.pdf
---

# NeuroMultiSpEx: Neuro-Guided Target Speaker Extraction for Multi-Speaker Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/silva26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/silva26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1120)

**TL;DR** — NeuroMultiSpEx is a neuro-guided speaker extraction framework that uses wearable ear-EEG to isolate an attended speaker in 4-speaker cocktail party environments, achieving an SI-SDR improvement of 9.613 dB.

## Problem

Prior neuro-guided speech extraction methods are restricted to binary 2-speaker scenarios and largely rely on high-density scalp-EEG (64+ channels), which is impractical for everyday use. Scaling to multi-speaker environments introduces severe permutation ambiguity and makes single-cue guidance insufficient because temporal envelope cues degrade under high speaker overlap. Solving this with wearable, low-density ear-EEG is crucial for realizing practical, brain-informed hearing aids that function in realistic, crowded acoustic settings.

## Method

The system processes 20-channel ear-EEG (cEEGrid) through two parallel branches: an EEG-Envelope Encoder combining self-attention and temporal convolutional networks to capture temporal cues supervised by a Pearson correlation coefficient loss, and an EEG-Speaker Encoder using graph convolutional networks and cross-attention (XAGnet style) for speaker identity supervised by cross-entropy loss. A gated fusion mechanism adaptively weights these temporal ('when') and identity ('who') cues depending on context. The fused reference conditions a modified Conv-TasNet target speaker extraction network via cross-modal attention. The entire architecture is trained end-to-end using a joint multi-task loss.

## Results

Evaluated on the PKU 4-speaker ear-EEG dataset (16 participants, 4-second windows), NeuroMultiSpEx achieves 9.613 dB SI-SDRi, 10.171 dB SDRi, 2.08 PESQ, 0.708 STOI, and an auxiliary AAD classification accuracy of 82.4%. It significantly outperforms prior baselines including BISS, NeuroHeed, NeuroHeed+, NeuroSpEx, and NeuroSpEx+ across all signal quality and intelligibility metrics (p < 0.01 or p < 0.05).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing wearable neural hearing aids, smart ear-wearables, and brain-computer interfaces for complex multi-talker auditory environments.

## Related

- (link related pages by id as the wiki grows)
