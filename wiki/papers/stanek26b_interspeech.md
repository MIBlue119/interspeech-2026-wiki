---
id: stanek26b_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-124
pdf: https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.pdf
---

# Ethical and Technical Limits of Deepfake Speech Datasets

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-124)

**TL;DR** — This paper conducts a comprehensive dataset-level audit of 39 deepfake speech corpora, revealing widespread demographic metadata gaps and heavy reliance on overlapping source speech that undermines cross-dataset evaluation validity.

## Problem

Real-world deployment of speech deepfake detectors demands not only high detection accuracy, but also robustness, fairness, and transparency under emerging regulations like the EU AI Act. However, current detection benchmarks were primarily built for model accuracy rather than demographic bias assessment. Consequently, missing metadata obstructs subgroup fairness evaluation, while widespread reuse of identical bona fide source corpora across different datasets introduces data leakage and overstates cross-dataset generalization claims.

## Method

The authors perform a structured audit of 39 peer-reviewed deepfake speech datasets spanning 2016 to 2025. They manually analyze and categorize key attributes including public accessibility, licensing constraints, dataset scale (utterance and speaker counts), synthesis tools (TTS and VC architectures), language coverage, and documentation quality. Additionally, they map the provenance networks and lineage of underlying bona fide source speech corpora to trace data dependencies across benchmarks.

## Results

The audit reveals that 64% (25/39) of evaluated datasets are monolingual (predominantly English or Chinese), only 49% (19/39) report speaker counts alongside both male and female metadata labels, and detailed demographic attributes such as age, accent, ethnicity, or disability are virtually absent. Furthermore, the provenance mapping shows that a large fraction of deepfake datasets repeatedly relies on the same small subset of foundational bona fide corpora—such as LJSpeech, VCTK, AISHELL, and LibriVox derivatives—risking artificially inflated cross-dataset generalization metrics due to models exploiting corpus-specific acoustic artifacts. Access constraints also limit reproducibility, with 15% of audited datasets restricted or partially unavailable.

## Code

- https://security-fit.github.io/deepfake_speech_datasets_app/

## Applications

Speech and machine learning engineers, security researchers, and policymakers building or evaluating deepfake detection systems, fairness monitors, and audit-ready datasets for high-stakes forensic applications.

## Limitations

Precise quantification of source corpus overlap remains constrained because many datasets lack explicit documentation regarding exact speaker splits, filtering steps, or synthesis integration protocols.

## Related

- (link related pages by id as the wiki grows)
