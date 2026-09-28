---
id: stanek26b_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-124
pdf: https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.pdf
---

# Ethical and Technical Limits of Deepfake Speech Datasets

*Vojtěch Staněk, Eva Trnovská, Kamil Malinka, Anton Firc*

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-124)

**TL;DR** — A comprehensive dataset-level audit of 39 deepfake speech datasets reveals that widespread demographic metadata omission prevents fairness evaluation, and heavy reliance on shared underlying source corpora undermines true cross-dataset generalization claims.

## Key contributions

- Compiled and structured an audit of 39 peer-reviewed deepfake speech datasets across accessibility, scale, language, and documentation.
- Mapped bona fide source corpus overlaps to uncover data leakage risks in cross-dataset evaluation.
- Quantified gender and language metadata availability, revealing that over half of the datasets lack balanced or complete demographic labels.
- Released an interactive web browser for ongoing community inspection of dataset provenance and properties.

## Problem

Real-world deployment of deepfake speech detectors requires robustness and fairness, yet current research prioritizes benchmarking accuracy on static resources. This creates a severe mismatch because existing datasets frequently omit crucial demographic metadata, making bias and subgroup evaluation impossible beyond basic gender or language checks. Furthermore, standard evaluation practices test generalization by training on one dataset and testing on another, but many datasets repackage the exact same underlying bona fide corpora (such as LJSpeech, VCTK, and AISHELL). Detectors can easily exploit these shared source-corpus artifacts rather than learning genuine deepfake cues, leading to dangerously overstated robustness claims.

## Method

The authors performed a systematic manual curation and metadata extraction of 39 deepfake speech datasets reported in literature from 2016 onward, filtering out resources with fewer than 1,000 samples or those predating modern neural synthesizers. Each dataset was evaluated across seven dimensions: accessibility and licensing, synthesis tools and documentation, language coverage, dataset scale (utterance and speaker counts), publication year, underlying bona fide speech sources, and demographic metadata annotation. Provenance mapping was constructed by tracking which open-source corpora (e.g., LibriVox-derived resources, AISHELL, VCTK) served as the foundation for both the real speech and the training data of synthesis engines across the 39 benchmarks.

By analyzing these axes in tandem, the audit exposes structural flaws in how audio deepfake datasets are built and consumed. The key design choices of the audit framework—such as focusing on provenance overlap and metadata availability—were chosen to illuminate why models often fail catastrophically when deployed in the wild. The resulting interactive browser codifies these findings into an inspectable graph to help researchers navigate dataset dependencies.

## Experimental setup

The study evaluates 39 deepfake speech datasets published between 2016 and 2025, encompassing over 3 million total utterances and spanning diverse text-to-speech (TTS) and voice conversion (VC) tools. No new neural models were trained; instead, the work analyzes metadata availability, license types (e.g., CC BY, ODC-By, proprietary), and source-corpus overlap across these 39 resources.

## Results

The audit reveals that only 19 out of 39 datasets (49%) report speaker counts and metadata labels for both male and female speakers, while other demographic attributes such as age, accent, ethnicity, or disability are virtually absent. Regarding language representation, 64% (25/39) of the datasets are strictly monolingual (primarily English or Chinese), with multilingual corpora emerging only recently. In terms of access and legal compliance, 15% (6/39) of datasets are restricted or unobtainable, and 21% lack a clear license. Crucially, the provenance mapping demonstrates that a small pool of source corpora—specifically LJSpeech, VCTK, AISHELL, and LibriVox derivatives—underpins a vast majority of disparate deepfake benchmarks, invalidating naive cross-dataset generalization claims.

| Dataset Metric Category | Audited Scope | Key Finding / Percentage |
|---|---|---|
| Total Audited Datasets | 39 datasets | Published between 2016–2025 |
| Gender Metadata Reported | 39 datasets | 19 datasets (49%) report both M+F labels |
| Language Diversity | 39 datasets | 25 monolingual (64%), 8 multilingual (21%) |
| Public Access & Licensing | 39 datasets | 6 restricted/missing (15%), 8 unlicenced (21%) |

## Limitations

The audit relies on publicly available documentation, repository readmes, and accompanying papers; where dataset creators omitted synthesis details or speaker distributions, exact quantification of data overlap remains an approximation. The study does not retrain or benchmark downstream detectors directly to measure the exact quantitative drop caused by source leakage, leaving empirical degradation bounds to future work.

## Why read this

Speech and ML researchers building deepfake detectors or evaluation benchmarks must read this to understand why cross-dataset testing often yields false confidence and how missing metadata prevents reliable fairness auditing.

## Code

- https://security-fit.github.io/deepfake_speech_datasets_app/

## Applications

Auditing and designing robust, unbiased deepfake speech detection systems for digital forensics, speaker verification security, and regulatory compliance.

## Related

- (link related pages by id as the wiki grows)
