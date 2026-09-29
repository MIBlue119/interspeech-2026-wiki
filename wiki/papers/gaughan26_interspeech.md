---
id: gaughan26_interspeech
category: speaker
labels: [multilingual, self-supervised]
institutions: ["University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2418
pdf: https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.pdf
---

# Do speech representational spaces encode language family structures?

*Emily Gaughan, Peter Bell*

[PDF](https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gaughan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2418)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper evaluates whether multilingual speech representation spaces encode meaningful language family structures (phylogenetic trees) compared to the Glottolog gold standard. It demonstrates that tree-based comparison methods capture hierarchical language relationships better than traditional probing classifiers, and finds that speech encoders (especially Whisper-LID) preserve family structures better than massive-coverage models like XEUS.

## Key contributions

- Adapts six evolutionary biology tree distance metrics (PARTITION, QUARTET, PATH, NYE, P-RF, P-QUARTET) to evaluate speech representational spaces against linguistic phylogenies.
- Compares six prominent speech models and LID systems (XLS-R, Whisper, XEUS, mHubert-147, ECAPA-LID, Whisper-LID) against a lexicostatistical topline (ASJP LDND).
- Reveals that supervised probing classifiers fail to capture hierarchical language family relationships consistently compared to tree-based metrics.
- Demonstrates that sheer scale and language coverage (e.g., XEUS with 4,057 languages) do not guarantee phylogenetic structure if training objectives optimize away cues of language change.

## Problem

Modern multilingual speech models often struggle to generalize to low-resource languages and unseen dialectal variants. While prior work shows that language family information aids cross-lingual transfer, it remains unclear how much of this hierarchical phylogenetic structure is actually encoded in neural speech representations. Existing evaluation methods rely either on subjective visual clustering or discriminative probing classifiers, both of which operate at a single flat level of categorization rather than capturing multi-level evolutionary relationships.

## Method

The authors extract frame-level hidden states from the middlemost layer (determined via a 25%, 50%, 70%, 100% layer sweep showing stable rankings) of four speech encoders (XLS-R, Whisper, XEUS, mHubert-147) and two LID models (ECAPA-LID, Whisper-LID). For each of the 230 evaluated languoids from Common Voice, representations are mean-pooled across frames and averaged over up to 100 utterances per language. Pairwise cosine distances between language average representations are then computed to construct hierarchical trees via agglomerative clustering with Weighted Pair Group Method Centroid (WPGMC) linkage criteria.

To evaluate these predicted trees against the Glottolog reference tree, six tree distance metrics are employed: Partition (Robinson-Foulds) distance, Path distance, Quartet distance, Nye distance, and historical-linguistic adaptations P-RF and P-QUARTET. These metrics quantify topological disagreement, edge bipartitions, and subtree similarities. The approach is designed to systematically evaluate structural fidelity to historical language divergence patterns without the distortions introduced by flat supervised classifiers.

## Experimental setup

Evaluations are performed on scripted speech test sets from Common Voice v23.0 covering 230 languoids across 26 language families (after filtering out variants with fewer than 5 utterances or missing Glottolog/ASJP mappings). Baselines include a lexicostatistical topline using Levenshtein Distance Normalised Divided (LDND) on ASJP wordlists, alongside supervised probing classifiers (logistic regression, k-NN, LDA) trained to predict top-level language families. Models evaluated span sizes from 90,430 hours (mHubert-147) to 680,000 hours (Whisper) and 1 million+ hours (XEUS).

## Results

When combining z-score normalized tree metrics, Whisper-LID achieves the strongest alignment with the Glottolog tree (Avg. Tree Dist -0.80), followed by ECAPA-LID (0.01) and Whisper (0.15). Conversely, XEUS performs the worst (1.14), underperforming despite covering over 4,000 training languages. Probing classifiers give conflicting and misleading signals, ranking mHubert-147 highest in balanced accuracy (52.3% logistic regression) despite its intermediate tree-distance performance, highlighting the inadequacy of flat probes for hierarchical structures. In seen-versus-unseen language analyses, models like XLS-R (r=0.62) and mHubert-147 (r=0.58) exhibit higher tree errors when including more seen training languages, whereas Whisper and Whisper-LID maintain stable performance.

| System | Avg. Tree Dist (↓) | PARTITION | QUARTET | PATH | NYE | Log Reg Acc (↑) |
|---|---|---|---|---|---|---|
| LDND (Topline) | -1.99 | 314 | 0.668 | 32.02 | 0.517 | - |
| Whisper-LID | -0.80 | 354 | 0.713 | 10.23 | 0.675 | 26.2 |
| ECAPA-LID | 0.01 | 366 | 0.737 | 11.34 | 0.736 | 32.4 |
| Whisper | 0.15 | 366 | 0.761 | 9.72 | 0.742 | 17.6 |
| XLS-R | 0.02 | 362 | 0.751 | 12.47 | 0.723 | 48.1 |
| XEUS | 1.14 | 366 | 0.781 | 26.66 | 0.775 | 5.9 |

## Limitations

The study is restricted to analyzing a single middle layer from each speech model, which may not capture layer-wise representational dynamics. Common Voice test data introduces recording condition and demographic imbalances across languages. The analysis is also scoped to 230 languoids with available Glottolog/ASJP metadata, leaving extremely low-resource languages without standardized classifications out of scope.

## Why read this

Speech researchers and engineers working on multilingual or low-resource speech models should read this paper to understand how well current architectures implicitly capture language relationships. It provides a rigorous methodological framework using evolutionary tree distances instead of flawed flat probes, guiding future work on explicitly injecting phylogenetic knowledge into model pre-training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving cross-lingual transfer, phone inventory induction, and data augmentation for low-resource speech recognition and text-to-speech systems.

## Institutions / 機構

University of Edinburgh

**Funding / 經費:** UK Research and Innovation

## Related

- (link related pages by id as the wiki grows)
