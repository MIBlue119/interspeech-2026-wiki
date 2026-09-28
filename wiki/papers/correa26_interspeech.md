---
id: correa26_interspeech
category: speech-driven-facial-animation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1397
pdf: https://www.isca-archive.org/interspeech_2026/correa26_interspeech.pdf
---

# From Tokens to Faces: Investigating Discrete Speech Representations for 3D Facial Animation

[PDF](https://www.isca-archive.org/interspeech_2026/correa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/correa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1397)

**TL;DR** — This paper evaluates four speech representation families across different decoders for speech-driven 3D facial animation, demonstrating that models encoding phonetic classes yield superior articulatory accuracy and enabling a joint text-to-speech and facial animation pipeline.

## Problem

Current 3D facial animation systems rely heavily on diverse intermediate speech representations ranging from continuous self-supervised features to acoustic neural codecs, yet it remains unclear which underlying phonetic or acoustic properties are truly essential for natural animation. Without this understanding, optimizing representation bottlenecks for simultaneous speech and facial synthesis is difficult. Investigating this helps engineers choose appropriate representations and unlocks unified audio-visual generation architectures.

## Method

The study benchmarks four speech encoders: HuBERT (semantic SSL), SpeechTokenizer (hybrid semantic-acoustic), WavTokenizer (acoustic), and CosyVoice2 (supervised label-based). Each encoder is paired with either a frame-by-frame Gated Recurrent Unit (GRU) or a non-causal Transformer decoder mapping speech features to 51-dimensional ARKit blendshapes. Pre-trained, frozen encoders are trained on the BEAT2 dataset (approx. 27 hours across 25 speakers) using L1 reconstruction loss along with velocity and acceleration smoothing losses. Probing analyses utilize normalized entropy co-occurrence statistics against phonemes and clustered visemes, as well as Ridge regression to predict continuous blendshape values.

## Results

Evaluated on the BEAT2 dataset containing 265 test stimuli, HuBERT-based models achieve higher lips and mouth reconstruction accuracy (LVE), though the label-based CosyVoice2 paired with a Transformer closely follows. In perceptual MUSHRA evaluations with 30 participants, the CosyVoice2-Transformer variant performs comparably to the FaceDiffuser baseline while significantly outperforming standard Transformer setups. Bilabial Closure Score (BCS) evaluations reveal that lip closure metrics correlate much more strongly with human perceptual preferences than traditional reconstruction errors like LVE. Transformers universally improve jitter scores across all speech representations compared to GRUs.

## Code

- https://github.com/uuembodiedsocialai/FaceDiffuser

## Applications

Engineers and researchers building virtual avatars, talking heads, and audio-visual text-to-speech systems for interactive characters and digital assistants.

## Limitations

The study focuses primarily on English monologues and specific backbone architectures, which may limit generalizability to highly expressive, conversational, or multilingual cross-domain setups.

## Related

- (link related pages by id as the wiki grows)
