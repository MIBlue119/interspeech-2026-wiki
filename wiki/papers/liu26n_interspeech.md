---
id: liu26n_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1747
pdf: https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.pdf
---

# Learning Contextualized Tonal Contours from F0: A Core-Auxiliary Branched Transformer for Mandarin Tone Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1747)

**TL;DR** — This paper proposes a core-auxiliary branched Transformer framework for Mandarin tone recognition that relies solely on suprasegmental F0 and duration information, achieving an accuracy of 97.5%.

## Problem

Mandarin tone recognition traditionally relies on spectral features like MFCCs or high-resource acoustic models, whereas lighter suprasegmental approaches often lack contextual sensitivity across varying linguistic structures. Capturing fine-grained pitch contours and rhythmic variability is crucial for building robust computer-assisted pronunciation training and mispronunciation diagnosis systems for second-language learners. Without proper architectural design, modeling these prosodic features either incurs heavy computational overhead during inference or fails to capture multi-scale contextual dependencies.

## Method

The framework features a core Contour Network (C-Net) and a Rhythm Network (R-Net) combined in a core-auxiliary branched architecture. C-Net takes log-scaled, normalized F0 sequences augmented with learnable BERT-style input embeddings across syllable, word, and chunk granularities. R-Net extracts durational variability measures across three intervals (SYL, FINAL, V) to model rhythmic patterns. During training, auxiliary branches provide additional gradient pathways via cross-attention and layer-specific attention pooling (LSAP), which aggregates intermediate Transformer layers using a two-layer feed-forward network with tanh activation. The auxiliary branches are detached during inference, leaving a lightweight single-branch C-Net for efficient scoring.

## Results

Evaluated on the FCU-VOICE-360 dataset comprising 380,383 syllables across 360 speakers, the proposed v2-m3 model (utilizing syllable and word granularities with an R-Net auxiliary branch) achieves a tone recognition accuracy of 97.5% and F1 scores ranging from 0.964 to 0.983 across tones T1-T5. This outperforms the single-branch TNet-Full baseline (which scores 96.1% accuracy). Ablation studies demonstrate that adding chunk-level embeddings further boosts standalone C-Net accuracy to 96.1%, while training with either C-Net or R-Net auxiliary branches consistently lifts performance across all embedding configurations. Efficiency measurements show that the pruned v2-m3 inference model requires only 353.0M MACs and an inference latency of 0.417 ms per tone, compared to 374.3M MACs and 0.696 ms per tone for TNet-Full.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing computer-assisted pronunciation training (CAPT), second-language (L2) Mandarin learning systems, and tone mispronunciation detection and diagnosis tools.

## Limitations

Evaluated exclusively on read speech from the FCU-VOICE-360 corpus with utterances up to 21 syllables, potentially limiting direct generalization to highly spontaneous or conversational speech.

## Related

- (link related pages by id as the wiki grows)
