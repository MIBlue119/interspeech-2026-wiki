---
id: rahman26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf
---

# Voice Privacy from an Attribute-based Perspective

[PDF](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html)

**TL;DR** — This paper proposes an attribute-based perspective for evaluating voice privacy by measuring speaker uniqueness and re-identification risks using categorical speaker profiles rather than traditional signal-to-signal comparisons.

## Problem

Current voice privacy benchmarks evaluate protection exclusively through signal-to-signal comparisons, completely ignoring categorical attribute profiles such as gender, age, accent, and profession. Because data protection regulations like the GDPR identify "singling out" as a major privacy risk, overlooking attribute-level inference leaves a critical gap in understanding whether anonymized speech still exposes individuals.

## Method

The authors extract 192-dimensional speaker embeddings using a pre-trained ECAPA-TDNN encoder and train lightweight multi-layer perceptrons (MLPs) as attribute classifiers for gender, age, accent, and profession on the VoxCeleb2 development set. They analyze speaker uniqueness using k-anonymity metrics across speaker-level profiles (aggregated over multiple utterances) and utterance-level profiles. Additionally, they execute a re-identification attack by matching attribute profiles inferred from a single target utterance against reference speaker profiles.

## Results

Evaluating on subsets of VoxCeleb2 test speakers with up to 24,588 utterances and standard Voice Privacy Challenge 2024 baselines (McAdams, STTTS, NAC, ASRBN), the authors find that speaker-level uniqueness based on inferred attributes identifies 31.9% of speakers as entirely unique (k=1). Despite inference errors, attribute-based profiles continue to expose speakers to substantial re-identification risks even after standard speech anonymization.

## Code

- https://github.com/Mehtab9/Voice-Privacy-from-an-Attribute-based-Perspective

## Applications

Security and privacy engineers, auditors, and regulators evaluating speech anonymization tools and voice data protection compliance under frameworks like the GDPR.

## Limitations

The evaluation relies on a limited set of 72 fully annotated test speakers where all four attributes are available, and assumes the attacker does not have access to the specific anonymization system used.

## Related

- (link related pages by id as the wiki grows)
