---
id: kang26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3192
pdf: https://www.isca-archive.org/interspeech_2026/kang26_interspeech.pdf
---

# Beyond Short Segments : Expanding Speaker Embeddings with Vector Archives

[PDF](https://www.isca-archive.org/interspeech_2026/kang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3192)

**TL;DR** — The proposed VAM-ECAPA system enhances short-utterance speaker verification by mapping sparse frame-level features against a learnable vector archive of canonical speaker traits, achieving an Equal Error Rate of 8.334% on 1-second VoxCeleb1 test segments (a 54.8% relative error reduction over the baseline).

## Problem

State-of-the-art speaker verification systems suffer severe performance degradation when processing short utterances under three seconds due to a lack of sufficient coarticulatory cues and prosodic contours. This performance drop severely limits practical deployment in real-time scenarios like voice-activated commands and phone-based authentication. Existing work either requires multiple utterances at inference time or fails to directly enrich information-scarce frame-level representations.

## Method

The VAM-ECAPA system utilizes a three-stage architecture combining a pre-trained WavLM feature extractor, a novel Transformer-based Vector Archive Mapping with Statistical Pooling (TVAMSP) module, and an ECAPA-TDNN backend encoder. The TVAMSP module processes input features through a Transformer layer, maps them against a learnable Vector Archive library (consisting of G=4 archives with conceptual length l2=149 corresponding to 3 seconds of speech) via cross-attention-like scoring, and applies Attentive Statistics Pooling for global feature augmentation. The model is trained on the VoxCeleb2 development set using standard data augmentations and AAM Softmax loss through a multi-stage training recipe.

## Results

Evaluated on the VoxCeleb1 test set across official trial lists (Vox1-O, Vox1-E, and Vox1-H), VAM-ECAPA achieves an EER of 8.334% and MinDCF of 0.536 on 1-second segments of Vox1-O, compared to 18.437% EER for the standard WavLM+ECAPA-TDNN baseline. On the challenging 1-second Vox1-H trial list, the system lowers the EER from 20.449% down to 14.571%, representing a 28.7% relative improvement. Ablations confirm that the gains originate from both short-segment fine-tuning recipes and the archive-based feature compensation mechanism itself.

## Code

- https://github.com/slp-lab-research/vam_ecapa

## Applications

Speech engineers and developers building voice-activated assistants, smart home devices, and telephone-based biometric authentication systems where user commands are typically very short.

## Limitations

The approach relies on a fixed set of learnable vector archives whose size and number require empirical tuning.

## Related

- (link related pages by id as the wiki grows)
