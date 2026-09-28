---
id: kirby26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2409
pdf: https://www.isca-archive.org/interspeech_2026/kirby26_interspeech.pdf
---

# Perceptual compensation for tonal context in self-supervised speech models

[PDF](https://www.isca-archive.org/interspeech_2026/kirby26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kirby26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2409)

**TL;DR** — This study evaluates whether self-supervised and fine-tuned wav2vec2.0 models exhibit human-like perceptual compensation for tonal context in Mandarin Chinese, finding no evidence of compensation in purely pre-trained embedding similarities and only weak effects in supervised setups.

## Problem

Prior work suggests that purely self-supervised pre-trained (PT) models can implicitly learn phonological context and structure without explicit supervision, mirroring human perceptual compensation. However, it remains unclear whether these emergent properties extend to suprasegmental features like lexical tone, where acoustic realizations are highly variable and influenced by coarticulation. Testing this helps determine if unsupervised pre-training alone is sufficient for abstracting phonological regularities or if explicit supervision is required.

## Method

The authors perform a computational pseudo-replication of a psycholinguistic Mandarin tone study using roughly 13,700 synthesized disyllable continua (approx. 192,000 stimuli) varying across a 14-step T4-T3 target trajectory with various preceding tone contexts (T1, T2, T4) or in isolation. These are processed through two wav2vec2.0 checkpoints: a PT model (1,000 hours of untranscribed Mandarin) and a fine-tuned (FT) model for Mandarin ASR (178 hours of transcribed speech). Representations from the 7-layer CNN feature encoder and 12 Transformer layers are analyzed using cosine embedding similarities modeled via generalized additive mixed models (GAMMs), alongside linear binary logistic regression probing classifiers trained on AISHELL-3 data to predict T3/T4 labels.

## Results

Embedding similarities from the PT model showed zero evidence of sensitivity to tonal context across all layers, whereas the FT model exhibited mild context sensitivity in later layers (though qualitatively misaligned with human data, grouping T2 and T4 together against T1). Probing classifiers demonstrated enhanced endpoint sensitivity and context effects in mid-to-late Transformer layers (peaking around layer 8 for the FT model), but failed to yield the expected sigmoidal response curves on isolated no-context syllables, showing a strong artificial bias for T4 responses regardless of F0 contour.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers analyzing the linguistic interpretability of self-supervised representations and evaluating how faithfully speech foundation models mirror human phonetic perception.

## Limitations

Probes were trained on utterance-level embeddings containing rich contextual cues but tested on isolated syllables, which may have introduced a frequency-based T4 bias.

## Related

- (link related pages by id as the wiki grows)
