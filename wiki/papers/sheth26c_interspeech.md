---
id: sheth26c_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.pdf
---

# ELSI: An Interface for Standardizing Child-Centered Datasets, Applying Machine Learning Models, and Extracting Metrics

*Kaveri K. Sheth, Loann Peurey, Sho Tsuji, Alejandrina Cristia*

[PDF](https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheth26c_interspeech.html)

**TL;DR** — ELSI is a web-based, open-source interface that standardizes child-centered long-form audio recordings and enables non-technical researchers to run machine learning models and extract developmental metrics. It bridges the gap between complex naturalistic audio pipelines and developmental psychology labs.

## Key contributions

- Automates corpus standardization for heterogeneous long-form child-centered audio datasets through a browser interface.
- Provides a no-code wrapper around advanced open-source models like the Voice Type Classifier (VTC) and ALICE for phoneme estimation.
- Extracts standardized developmental metrics including vocalization counts, conversational turns, and linguistic units into exportable CSVs.
- Offloads computationally intensive audio inference to a centralized institutional server, removing local hardware and programming barriers.

## Problem

Developmental psychologists and linguists frequently analyze long-form recordings (LFRs) of child-centered audio, but face three core bottlenecks: corpus heterogeneity (inconsistent directory structures, file naming, and metadata schemas across datasets), tool accessibility (state-of-the-art models like VTC and ALICE require command-line or Python expertise, while dominant commercial tools like LENA are closed-source), and metric reliability (quantifying outcomes depends heavily on underlying model quality without systematic ways to compare them). These barriers disproportionately affect underresourced labs and prevent collaborative, cross-corpus science on diverse linguistic communities.

## Method

ELSI is architected as a web-based interface powered by a Python back end that implements the ChildProject API for underlying corpus standardization. Users upload data through a browser, bypassing local installation requirements and command-line interactions.

The pipeline integrates established open-source models: the Voice Type Classifier (VTC) performs speaker diarization to segment audio into categories such as key child, other child, adult female, and adult male, while the Automatic LInguistic Unit Count Estimator (ALICE) uses voice activity detection and acoustic modeling to estimate adult-uttered phonemes without requiring full transcriptions. Computationally heavy inference tasks are handled remotely on a dedicated server hosted at Ecole Normale Supérieure.

From these model inferences, the back end automatically computes downstream metrics—such as child and adult vocalization counts, conversational turns, and phoneme, syllable, or word counts—and compiles them into standardized CSV files for export, facilitating secure data archiving and participation in multi-site research consortia.

## Experimental setup

The platform is implemented as a web interface accessible via any browser (hosted at https://elsi-lscp.ddns.net). It relies on the ChildProject framework for data standardization and offloads heavy processing to a centralized École Normale Supérieure institutional server. The system is validated through pilot deployments backed by an ERC grant and collaborative corpus integrations.

## Results

Because ELSI functions as an integration and standardization interface rather than a novel standalone model, standard benchmark comparisons against baseline architectures are not applicable. Instead, its utility is demonstrated through an end-to-end walkthrough showing successful corpus standardization, remote VTC and ALICE model execution, and exportable metric generation for non-technical users. The interface effectively replaces manual command-line execution and bridges closed-source commercial tools like LENA with open-source alternatives.

## Limitations

The current infrastructure relies on a single dedicated institutional server at École Normale Supérieure for heavy computations, which may pose scalability or data privacy concerns as user adoption grows. The platform is currently tailored specifically to child-centered naturalistic audio corpora and depends on the continuous maintenance and expansion of underlying open-source models like VTC and ALICE. Broader multi-site deployment will require decentralized hosting solutions or sustainable funding models for server maintenance.

## Why read this

Speech engineers and researchers building tools for naturalistic or developmental audio should read this to understand how to package complex ML pipelines into accessible infrastructure for domain scientists. It highlights the practical requirements of translating cutting-edge speech models into usable, no-code web interfaces for non-technical research communities.

## Code

- https://elsi-lscp.ddns.net

## Applications

Analyzing naturalistic child-language acquisition corpora, automated developmental metric extraction, and multi-site collaborative speech data standardization.

## Related

- (link related pages by id as the wiki grows)
