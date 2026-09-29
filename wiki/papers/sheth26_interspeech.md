---
id: sheth26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release, robustness-noise]
institutions: ["PSL University", "CNRS", "EHESS", "ENS", "Universite Aix-Marseille", "Tampere University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2363
pdf: https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.pdf
---

# Deriving Benchmarking Datasets from Long-Form Recordings: Challenges and Opportunities

*Kaveri K. Sheth, Lawrence Borst, Tarek Kunze, Marvin Lavechin, Okko Räsänen, Sho Tsuji, Loann Peurey, Alix Bourree, Alejandrina Cristia*

[PDF](https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2363)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — This paper presents an integrated framework to solve cross-corpus heterogeneity, benchmark scarcity, and privacy constraints in child-centered long-form audio recordings (LFRs), demonstrated through a 27-dataset collection, replicable evaluation pipelines, and a role-based governance ecosystem (ELSI).

## Key contributions

- Standardization of 27 child-centered datasets (spanning 18+ languages, 14 countries, and 8,462 annotated clips) using DataLad and ChildProject.
- A replicable pipeline to derive four standardized speech-processing benchmarks: Voice Type Classification (VTC), Addressee Classification, Vocal Maturity (VCM) Classification, and Orthographic Transcription.
- ELSI (ExELang Legacy Support Interface), a role-based access governance ecosystem separating raw audio custodians, tool creators, and analysts to protect sensitive child speech while enabling ML development.
- A voice type classification case study demonstrating that models retrained on the full private-plus-public collection match or exceed state-of-the-art performance (e.g., 73.4% vs 70.0% F1 on key child) compared to poor performance when limited to public data alone (44.4% average F1).

## Problem

Long-form recordings (LFRs) of child-centered naturalistic audio provide unmatched ecological validity for language acquisition research, but three major obstacles prevent their effective use in ML. First, cross-corpus heterogeneity across independently collected datasets (inconsistent formats, metadata conventions, and directory structures) makes joint training non-trivial and prone to errors. Second, the complete absence of shared, multilingual benchmarks makes it impossible to systematically compare models or evaluate true generalization outside English-dominant populations. Third, standard ML workflows lack governance for privacy-sensitive child speech, exposing researchers to legal and ethical risks regarding participant consent and data memorization. Because these three challenges are mutually dependent—standardization enables benchmarking, governance enables benchmark distribution, and both require uniform data organization—addressing only one leaves tools siloed and ungeneralizable.

## Method

The framework integrates three open-source and governance pillars: DataLad (providing Git-based version control and Git-annex for large audio files) and ChildProject (enforcing a unified organizational schema with three-tier metadata at the child, recording, and annotation levels). The collection aggregates 27 corpora containing human-annotated clips mapped to unified label schemas for four tasks: Voice Type Classification (VTC, 4 speaker types), Addressee Classification (target-child, adult, other), Vocal Maturity (crying, laughing, canonical/non-canonical babbling), and Orthographic Transcription. All benchmark splits are child-disjoint to prevent data leakage across recordings of the same speaker.

For the Voice Type Classification case study, the authors adapt VTC 2.0, which extracts BabyHuBERT representations and passes them to four independent binary classification heads for multi-label prediction. The model is fine-tuned using the AdamW optimizer with a batch size of 256 and a learning rate of 1e-5 until convergence. Training is executed separately on a restricted public subset (6 corpora) versus the full private collection (21 additional corpora under access control).

The ELSI governance layer underpins inference and data sharing by dividing users into three distinct roles: Custodians (who control raw audio access and enforce consent protocols), Tool Creators (who access raw audio to train and version models), and Analysts (who work exclusively with de-identified derived metrics and automated annotations without raw audio access). This matches data access permissions directly to privacy sensitivity.

## Experimental setup

The collection spans 27 child-centered datasets with 8,462 total annotated clips covering 18,249 minutes of human-annotated audio, 232,106 VTC utterances, 120,634 addressee utterances, 92,613 vocal maturity utterances, and 159,953 transcription utterances across 18+ languages and 14 countries. The public benchmark subset comprises 6 corpora (1,155 clips, 167,912 minutes, 1,103,767 VTC utterances) primarily from English and Minnan/Ticuna. The private subset contains 21 corpora (8,462 clips, 18,249 minutes) across diverse indigenous and under-resourced languages. Baselines include the state-of-the-art VTC 2.0 model and human annotators, evaluated using multi-class F1-scores on child-disjoint hold-out test sets.

## Results

Retraining VTC 2.0 solely on the limited public corpus subset results in a severe performance drop, achieving an average F1-score of only 44.4% compared to 65.1% for the original VTC 2.0 model. However, retraining on the comprehensive private collection recovers performance to 62.2% average F1, while outperforming the state-of-the-art on specific classes: achieving 73.4% F1 vs 70.0% for Key Child (KCHI) and 68.8% F1 vs 65.1% for Male Adults (MAL). Human annotators on the test set achieve an upper-bound average F1 of 69.8%. 

The experiments show that public datasets alone are inadequate for training robust child speech models, and access to protected multi-corpus data via governance is essential for cross-linguistic generalizability.

| Model | KCHI F1 | OCH F1 | MAL F1 | FEM F1 | Average F1 |
|---|---|---|---|---|---|
| VTC-2.0 (Original) | 70.0 | 50.9 | 65.1 | 74.3 | 65.1 |
| VTC-2.0 (Retrain Public) | 48.0 | 26.8 | 56.3 | 42.4 | 44.4 |
| VTC-2.0 (Retrain Private) | 73.4 | 34.2 | 68.8 | 72.2 | 62.2 |
| Human Annotators | 79.7 | 60.4 | 67.6 | 71.5 | 69.8 |

## Limitations

The framework relies heavily on collaborating research teams maintaining active data custodianship, and onboarding new corpora requires manual mapping of heterogeneous annotation labels to shared schemas. While the collection covers 18+ languages, many non-public corpora remain restricted to specific institutional access tiers, limiting frictionless global downloading. Furthermore, certain tasks like Vocal Maturity and Addressee classification lack sufficient public open-source data, restricting community training entirely to the ELSI-governed access path.

## Why read this

Speech and ML researchers building tools for naturalistic, low-resource, or sensitive audio environments should read this paper to learn how to operationalize cross-corpus standardization and ethical tiered-access governance without sacrificing model performance.

## Code

- https://github.com/LAAC-LSCP/benchmarking-dataset-factory

## Applications

Automated child speech processing, early language acquisition tracking, developmental psychology research, and privacy-preserving ML pipelines for wearable sensor data.

## Institutions / 機構

PSL University, CNRS, EHESS, ENS, Universite Aix-Marseille, Tampere University

**Funding / 經費:** Agence Nationale de la Recherche, PSL, J. S. McDonnell Foundation, European Research Council, Simons Foundation International

## Related

- (link related pages by id as the wiki grows)
