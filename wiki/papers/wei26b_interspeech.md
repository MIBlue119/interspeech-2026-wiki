---
id: wei26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-77
---

# Speaker Identity in Non-Verbal Vocalizations: Conditional Distillation and Mixture of Experts Approach

**TL;DR** — A Mixture-of-Experts speaker verification system, trained with conditional distillation to avoid forgetting normal speech, nearly halves the error rate on verifying identity across laughs, sighs, and other non-verbal vocalizations.

## Problem

Expressive TTS/VC systems increasingly generate non-verbal vocalizations (NVVs) like laughs or sighs to sound more natural, but current speaker verification (SV) systems generalize poorly to NVVs, and simply fine-tuning on NVV data causes catastrophic forgetting of normal speech performance.

## Method

The authors present the first systematic study across 10 NVV types and propose a framework combining frozen Data2Vec self-supervised features with ECAPA-TDNN, enhanced by a Mixture of Experts (MoE) module with learned domain-aware routing, using a conditional distillation loss from a pretrained teacher on speech inputs to retain speech-to-speech accuracy, and a contrastive loss to bridge the speech-NVV domain gap.

## Results

The method reduces speech-NVV EER from 38.93% to 22.66% over a pretrained baseline, and also improves speech-only EER from 13.17% to 9.24% via the distillation component.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker-identity verification for expressive TTS/VC quality control, ensuring generated non-verbal vocalizations stay consistent with the target speaker.

## Related

- (link related pages by id as the wiki grows)
