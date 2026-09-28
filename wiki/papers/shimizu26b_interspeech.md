---
id: shimizu26b_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-250
pdf: https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.pdf
---

# Auditory Contrast Network for Text-Free Prominence Detection

[PDF](https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-250)

**TL;DR** — The Auditory Contrast Network uses a micro-architecture of just 202 to 238 parameters to encode psychoacoustic principles for word-level prominence detection, matching a 94.6M-parameter wav2vec2 baseline while achieving 120 times lower latency.

## Problem

Current prominence detectors rely on generic, high-capacity architectures like mel-spectrogram CNNs or self-supervised models that treat prominence as a black-box regression target without accounting for relational auditory contrast. Perceived prominence is shaped not just by absolute acoustic properties, but by how a word sounds relative to its neighbours and its lexical predictability. This lack of structural transparency makes existing models computationally heavy and ill-suited for resource-constrained, real-time applications where text may be unavailable.

## Method

The Auditory Contrast Network processes input using two main stages: per-cue contrast and multi-cue aggregation. For each of the three acoustic cues—log duration, mean energy (MFCC0), and spectral variability (MFCC2)—a two-layer MLP calculates pairwise nonlinear contrast scores between a target word and its adjacent words using boundary masks, while learned softmax weights balance directional bias. These contrast scores, absolute cue values, and optional n-gram surprisal text features are concatenated and fed into a second ReLU-activated MLP to predict scalar prominence. The model contains up to 238 trainable parameters (202 for acoustic-only) and is trained by minimizing mean squared error on continuous wavelet transform labels from the Helsinki Prosody Corpus.

## Results

Evaluated on cross-corpus transfer from Helsinki Prosody to Emphases comprising 69,714 words across 17 speakers, the acoustic-only ACN achieves a Pearson r of 0.412, matching a frozen 94.6M-parameter wav2vec2 baseline at r = 0.409. Adding text features (unigram and bigram surprisal) raises ACN's performance to r = 0.451, comparable to a Gated Student baseline at 0.449 and outperforming a same-input logistic regression at 0.444. Ablations demonstrate that the contrast mechanism provides a substantial boost in the acoustic-only setting (dropping to r = 0.371 without it) and that the learned weights exhibit extreme forward dominance with over 96% attention assigned to preceding context.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device speech applications where text is unavailable or compute is severely limited, such as hearing aids, real-time pronunciation monitoring, lightweight TTS frontends, and real-time subtitle prosody markup.

## Limitations

Evaluated exclusively on read English across a single corpus pair, relies on external word boundaries from forced alignment, and uses simplified summary features that may underrepresent complex pitch-accent contours.

## Related

- (link related pages by id as the wiki grows)
