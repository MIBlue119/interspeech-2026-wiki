---
id: sheth26c_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.pdf
---

# ELSI: An Interface for Standardizing Child-Centered Datasets, Applying Machine Learning Models, and Extracting Metrics

[PDF](https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.html)

**TL;DR** — ELSI is an open-source web interface that standardizes child-centered audio datasets, executes machine learning models for speaker diarization and linguistic unit estimation, and extracts metrics like vocalization counts and conversational turns without requiring programming skills.

## Problem

Naturalistic long-form recordings of children suffer from severe corpus heterogeneity in file formats and metadata, creating high technical barriers for developmental researchers who lack Python or command-line expertise. Furthermore, reliance on closed-source commercial software limits transparency, while existing open-source pipelines lack unified frameworks for systematic metric evaluation and cross-corpus comparison.

## Method

ELSI uses a Python-based web architecture built on top of the ChildProject API to handle dataset standardization and metadata validation through a browser interface. For heavy computational tasks, the platform integrates open-source models such as the Voice Type Classifier (VTC) for speaker segmentation and the Automatic Linguistic Unit Count Estimator (ALICE) for phoneme estimation. Model executions are hosted on a centralized institutional server at the Ecole Normale Supérieure, sparing end users from needing local GPUs or command-line tools. Processed outputs and derived behavioral metrics are automatically compiled into exportable CSV formats.

## Results

The paper does not present empirical performance metrics, accuracy benchmarks, or comparative evaluations of the underlying models. Instead, it describes a functional software demonstration featuring automated corpus standardization, execution of VTC and ALICE pipelines, and exportable CSV metric generation.

## Code

- https://elsi-lscp.ddns.net

## Applications

Developmental psychologists and linguists studying early language acquisition can use this tool to process large-scale naturalistic child recordings and extract standard interaction metrics without engineering support.

## Limitations

The current platform relies on a dedicated institutional server at Ecole Normale Supérieure to host computationally intensive tasks like VTC rather than local or decentralized execution.

## Related

- (link related pages by id as the wiki grows)
