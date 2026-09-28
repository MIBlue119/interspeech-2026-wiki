---
id: wei26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-77
pdf: https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.pdf
---

# Speaker Identity in Non-Verbal Vocalizations: Conditional Distillation and Mixture of Experts Approach

[PDF](https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-77)

**TL;DR** — This paper proposes a mixture-of-experts and conditional knowledge distillation framework for speaker verification across non-verbal vocalizations, reducing cross-domain equal error rate from 38.93% to 22.66%.

## Problem

Modern text-to-speech and voice conversion systems increasingly generate non-verbal vocalizations like laughter and breathing, but existing speaker verification models generalize poorly to these sounds. Naive fine-tuning on non-verbal datasets leads to catastrophic forgetting of normal speech verification performance due to the acoustic heterogeneity across domains. Addressing this gap is critical for scalable, objective evaluation of identity consistency in expressive synthetic speech.

## Method

The framework uses a frozen Data2Vec self-supervised front-end paired with an ECAPA-TDNN backend, enhanced with a Mixture of Experts (MoE) module featuring learned domain-aware routing. Specifically, Inter-Layer Residual MoE (IRMoE) adapters are inserted after each frozen transformer block with 4 experts and top-2 gating. Training incorporates a conditional knowledge distillation loss using a pretrained WavLM teacher to preserve speech accuracy, combined with a supervised contrastive loss to bridge the speech-NVV domain gap and event-guided routing constraints to prevent collapse.

## Results

Evaluated on the NonverbalTTS dataset across 10 non-verbal vocalization types spanning 17 hours, the system reduces the speech-NVV equal error rate (EER) from the pretrained baseline of 38.93% down to 22.66%. With conditional distillation, the normal speech EER (SvS) is simultaneously improved from 13.17% to 9.24%. Ablation studies confirm that using 4 IR-MoE experts optimizes cross-domain performance, and the proposed conditional loss is necessary to mitigate catastrophic forgetting.

## Code

- https://github.com/wiizzz/nonverbal-sv

## Applications

Speech and machine learning engineers developing expressive text-to-speech or voice conversion systems who need to objectively evaluate speaker identity consistency across both verbal and non-verbal segments.

## Limitations

The evaluation relies on a dataset where samples are heavily imbalanced across non-verbal categories, with breath sounds comprising over 67% of all non-verbal entries.

## Related

- (link related pages by id as the wiki grows)
