---
id: arefeen26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3094
pdf: https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.pdf
---

# DAST: A Dual-Stream Voice Anonymization Attacker with Staged Training

[PDF](https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3094)

**TL;DR** — The paper introduces DAST, a dual-stream voice anonymization attacker that combines spectral and self-supervised learning features with a three-stage training strategy to outperform current state-of-the-art attribution models.

## Problem

Voice anonymization models mask vocal traits to protect speaker identity, but privacy protections are often overestimated due to weak evaluation baselines. Existing attacker models typically suffer from poor cross-system generalization, failing to maintain high identification accuracy when deployed on unseen anonymization techniques. Developing robust attackers is crucial for uncovering residual identity leaks and establishing rigorous privacy benchmarks.

## Method

DAST employs a dual-stream architecture that processes Mel-filterbank and WavLM self-supervised features through separate ECAPA-TDNN frame encoders, combining them via mid-level Hadamard product fusion before Attentive Statistics Pooling and AAM-Softmax classification. The training strategy follows three stages: Stage I pre-trains speaker foundation representations on clean VoxCeleb2 data; Stage II trains on large-scale voice-converted data from the Source Speaker Tracing Challenge to learn anonymization-invariant representations; and Stage III fine-tunes the network on target anonymized data from the VoicePrivacy Attacker Challenge. The network uses a 1,024-channel ECAPA-TDNN backbone, SpecAugment, and is optimized using AdamW alongside the Muon optimizer in Stage II.

## Results

Evaluated on the VoicePrivacy Attacker Challenge dataset across seven anonymization systems (B3, B4, B5, T8-5, T10-2, T12-5, and T25-1), DAST demonstrates that Stage II diversity-driven training is the primary driver of strong cross-system generalization without target adaptation. With Stage III lightweight fine-tuning using only 10% of the target anonymization dataset, the model surpasses existing state-of-the-art attackers in equal error rate (EER), with full-dataset fine-tuning yielding further improvements. Ablation studies confirm that mid-level fusion outperforms early fusion and single-stream counterparts.

## Code

- https://github.com/monkeyDarefeen/DAST

## Applications

Privacy auditors and security engineers evaluating speech anonymization systems against re-identification attacks.

## Limitations

Requires multi-domain training data including large-scale voice conversion corpora to achieve robust cross-system generalization.

## Related

- (link related pages by id as the wiki grows)
