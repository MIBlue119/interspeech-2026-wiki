---
id: murugaiyan26_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3236
pdf: https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.pdf
---

# WhiSSDapt: Adaptive Fusion of Whisper Layer Embeddings for Sentence Stress Detection

[PDF](https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3236)

**TL;DR** — WhiSSDapt improves sentence stress detection by adaptively fusing layer embeddings from a frozen Whisper encoder and decoder, yielding relative F1 gains of up to 4.48% on naturally spoken data and 6.09% on synthetic speech over single-layer baselines.

## Problem

Sentence stress and word prominence depend on both local acoustic cues and higher-level contextual structure, making single-layer representations from pre-trained models insufficient. Prior systems either rely on rigid handcrafted prosodic features or extract embeddings from a single fixed layer of models like Whisper, ignoring how acoustic and linguistic properties distribute hierarchically across layers.

## Method

The proposed WhiSSDapt framework freezes a Whisper-small backbone and introduces learnable scalar weights across all encoder and decoder layers, normalized via a temperature-scaled softmax to compute an optimal weighted layer combination. The aggregated representations pass through an additional decoder block via cross-attention and a two-layer feed-forward classification head for token-level binary stress prediction using weighted cross-entropy loss. Hyperparameters include learning rate 5e-4, batch size 24, AdamW optimization, and temperature values of tau=0.1 for ISLE and EmphAsses and tau=0.01 for TinyStress-15k.

## Results

Evaluated on ISLE (German and Italian non-native speech), TinyStress-15k, and EmphAsses datasets using word-level F1-score. WhiSSDapt outperforms the fixed-layer baseline WhiStress, achieving relative improvements of up to 4.48% on naturally spoken speech and 6.09% on synthetic data, and surpasses SupraDoRAL by up to 9.12% on German ISLE and 3.16% on Italian ISLE. Layer weight analysis reveals that decoder Layer 9 and encoder Layer 12 consistently emerge as the most informative anchor points across datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building spoken language understanding, computer-assisted pronunciation training (CAPT) systems, and expressive Human-Computer Interaction (HCI) interfaces.

## Related

- (link related pages by id as the wiki grows)
