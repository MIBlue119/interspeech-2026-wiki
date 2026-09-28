---
id: gaughan26_interspeech
category: multilingual
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2418
pdf: https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.pdf
---

# Do speech representational spaces encode language family structures?

[PDF](https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2418)

**TL;DR** — This paper evaluates whether learned multilingual speech representations encode hierarchical language family structures, finding that they capture significantly less phylogenetic structure than linguistic lexicostatistical baselines.

## Problem

Although large multilingual speech models perform better when trained across diverse language families, it remains unclear whether these models actually internalize meaningful language family structures and evolutionary relationships. Standard evaluation methods like visual inspection and supervised probing classifiers fail to capture internal hierarchy and can be misleading due to task-specific bias. Understanding this gap is crucial for building future-proof models that can generalize effectively to low-resource languages and unseen regional variants.

## Method

The authors evaluate six multilingual speech encoders (Whisper, XLS-R, XEUS, mHubert-147) and two spoken language identification models (Whisper-LID, ECAPA-LID) using representations extracted from the middle layer across 230 languages from Common Voice. Mean-pooled frame representations per language are used to compute pairwise cosine distances, from which phylogenetic trees are constructed via agglomerative clustering with WPGMC linkage. These predicted trees are compared against gold-standard Glottolog historical-comparative classifications using six tree distance metrics adapted from evolutionary biology (Partition distance, Path distance, Quartet distance, Nye distance, and phylogeny-adjusted variants P-RF and P-Q_uartet). Results are contextualized against a lexicostatistical top-line tree derived from ASJP phonetic edit distances (LDND) and traditional probing classifiers (logistic regression, k-NN, LDA).

## Results

Evaluations on 230 languoids across 26 language families reveal that spoken language identification models (such as Whisper-LID) organize representational spaces with closer alignment to true language family structures than general speech encoders like XEUS. Tree-based comparison methods expose hierarchical relationships more reliably than probing classifiers, which achieve high balanced accuracies (e.g., up to 0.993) despite underlying representational spaces lacking deep phylogenetic organization. Across all evaluated metrics, neural speech representations consistently underperform compared to the lexicostatistical LDND baseline, indicating that massive pre-training data volume and broad language coverage alone do not naturally yield structured language family trees.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing massively multilingual speech models, low-resource automatic speech recognition, and cross-lingual transfer learning architectures.

## Limitations

The analysis is restricted to the middlemost layer of each model and relies on scripted speech test sets from Common Voice, which exhibit varying recording conditions and demographic coverage across languages.

## Related

- (link related pages by id as the wiki grows)
