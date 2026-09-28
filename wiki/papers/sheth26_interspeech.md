---
id: sheth26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2363
pdf: https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.pdf
---

# Deriving Benchmarking Datasets from Long-Form Recordings: Challenges and Opportunities

[PDF](https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheth26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2363)

**TL;DR** — This paper presents a standardized, multi-corpus framework comprising 27 child-centered datasets, four reproducible speech processing benchmarks, and an ethical governance ecosystem for long-form audio recordings.

## Problem

Long-form child-centered audio recordings offer high ecological validity for studying early language development, but three core issues prevent their broader utilization in speech technology. First, independent corpora exhibit widespread heterogeneity in annotation formats, metadata schemata, and consent structures. Second, the lack of standardized, cross-linguistic evaluation benchmarks hinders model comparison and generalization tracking. Third, standard machine learning pipelines lack governance for privacy-sensitive child speech, exposing researchers to compliance risks regarding participant consent and data leakage.

## Method

The framework integrates DataLad for git-based version control and large-file management with the ChildProject package to enforce a unified three-level organizational structure (child, recording, and annotation metadata) across independent corpora. It aggregates 27 child-centered datasets spanning over 18 languages and 14 countries, incorporating 6 public and 21 access-controlled sources. Using this standardized repository, a replicable DataLad pipeline derives four distinct speech processing benchmarks using child-disjoint data splits to prevent speaker leakage. Additionally, the framework introduces ELSI, a role-based access ecosystem designed to embed ethical governance and automated provenance tracking directly into downstream machine learning workflows.

## Results

The pooled collection comprises 1,155 annotated clips totaling 167,912 minutes of audio across the 27 datasets. The framework successfully establishes four standardized benchmarking tasks: Voice Type Classification (utilizing all 27 corpora with 1,103,767 utterances), Addressee Classification (13 corpora with 5,832 utterances), Vocal Maturity Classification (11 non-public corpora with 1,332,124 utterances), and Orthographic Transcription (13 corpora spanning public and private sources). Child-disjoint partitioning ensures recordings from any single child remain isolated within a single split across all tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers, developmental psychologists, and linguists working on child-centered audio analysis, automated diarization, and cross-lingual speech evaluation.

## Limitations

The dataset collection heavily relies on access-controlled repositories for non-English and non-WEIRD populations, making automated pipeline execution dependent on institutional authorization and ethical governance clearance.

## Related

- (link related pages by id as the wiki grows)
