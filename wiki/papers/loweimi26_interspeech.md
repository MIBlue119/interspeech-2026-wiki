---
id: loweimi26_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-790
pdf: https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.pdf
---

# To Be Multimodal or Not to Be: Query-Adaptive Audio-Visual Person Retrieval via Active Modality Detection

*Erfan Loweimi, Mengjie Qian, Kate Knill, Guanfeng Wu, Chi-Ho Chan, Abbas Haider, Muhammad Awan, Josef Kittler, Hui Wang, Mark Gales*

[PDF](https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-790)

**Category:** `speaker`

**TL;DR** — This paper proposes a query-adaptive audio-visual person retrieval framework that detects active modalities using cross-modal score consistency before applying score-level fusion. On the BBC Rewind corpus, it achieves 94.2% P@1, outperforming fixed fusion (90.0%) and recovering 64% of the performance gap to an oracle with ground-truth modality labels.

## Key contributions

- Formulates and addresses the modality-absence problem in uncurated broadcast archives, showing that blind multimodal fusion underperforms unimodal systems.
- Introduces a novel feature design combining within-modal score distributions and cross-modal cosine similarity scores to detect active modalities.
- Demonstrates that inter-modal consistency (evaluating one modality's retrieval set through the other) acts as a robust diagnostic for presence types.
- Achieves 89.1% presence-type classification accuracy and 94.2% P@1 retrieval performance on the challenging BBC Rewind corpus using leave-one-speaker-out cross-validation.

## Problem

Standard person retrieval benchmarks like VoxCeleb are curated such that targets are always both seen and heard. In contrast, real-world broadcast archives like the BBC Rewind corpus feature three distinct presence types: audio-visual (AVP), audio-only (AoP), and visual-only (VoP). When fusing modalities blindly, an absent modality encodes an unrelated identity that injects noise and rank perturbations, causing fixed-weight fusion to score worse than the best unimodal system. Prior multimodal video search frameworks (MVSE) assumed both modalities are always available, failing to handle uninformative or missing data.

## Method

The pipeline extracts speaker embeddings using an ECAPA-TDNN model trained on VoxCeleb 1&2 with AMSoftmax loss, and face embeddings using a ResNet-400 backbone trained on WebFace42M, both used zero-shot. For a query video, cosine similarity compares query embeddings against archive files, and the max similarity per file selects the best-matching identity. A modality combination module then classifies the query into AoP, VoP, or AVP to set the late-fusion weight lambda (1, 0, or 0.5, respectively).

Active modality detection relies on feature vectors extracted from the top-n (n=10) retrieved files. Within-modal scores capture peaked versus flat score distributions, while cross-modal scores (evaluating speaker-retrieved files with face scores and vice versa) capture inter-modal consistency. Summary statistics (mean and standard deviation across four score vectors) are concatenated to form a 48-dimensional feature vector. Classifiers including logistic regression, SVMs, and decision trees learn decision boundaries to route queries to the correct fusion weight.

## Experimental setup

Evaluated on the BBC Rewind corpus comprising 12,594 video files (409 hours) spanning 1948–1979, with a query set of 523 video files (21.1 hours) from 38 politicians (425 AVP, 72 VoP, 26 AoP). Compared against speaker-only (ECAPA-TDNN), face-only (ResNet-400), fixed-weight fusion (lambda = 0.5), and an oracle with ground-truth modality labels. Metrics include Precision@K (P@1, P@3, P@5, P@10) and leave-one-speaker-out cross-validation (LoSoCV) accuracy for modality detection.

## Results

The adaptive system achieves 94.2% P@1, outperforming speaker-only (82.9%), face-only (93.4%), and fixed fusion (90.0%). Adding cross-modal features to within-modal base features improves classification accuracy from 82.7% to 87.9%-88.8% and retrieval P@1 from 92.1% to 94.2%. For audio-only and visual-only queries, the adaptive system recovers full unimodal performance (matching the oracle at 80.8% and 93.4% P@1 respectively), avoiding the 3.9 to 4.9 pp degradation suffered by fixed fusion. The remaining 1.4 pp gap to the oracle (95.5% vs 96.9% on AVP) stems from query misclassifications.

| System | P@1 (%) | P@3 (%) | P@5 (%) | P@10 (%) |
| --- | --- | --- | --- | --- |
| Speaker | 82.9 | 80.7 | 78.3 | 74.3 |
| Face | 93.4 | 88.6 | 86.3 | 81.6 |
| Fixed | 90.0 | 88.6 | 87.0 | 83.3 |
| Adaptive | 94.2 | 90.4 | 88.0 | 84.1 |
| Oracle | 96.6 | 91.8 | 89.3 | 85.2 |

## Limitations

The evaluation is constrained to a single historical archive (BBC Rewind) and a specific demographic of 38 prominent politicians, potentially limiting generalizability to broader populations or modern video conditions. The system relies on a fixed top-n parameter (n=10), which assumes target presence across at least n files. Furthermore, errors in modality detection can cause misclassification cascades, particularly when missing-modality queries are falsely classified as multimodal.

## Why read this

Speech and ML researchers working on real-world multimodal retrieval should read this to understand why naive score fusion fails in uncurated archives and how cross-modal consistency can dynamically regulate modality reliance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Journalistic archives, historical media indexing, legal forensics, and large-scale video retrieval systems.

## Institutions / 機構

University of Cambridge, Queen's University Belfast, University of Surrey, Cisco, Southwest Jiaotong University, Teesside University

**Funding / 經費:** Engineering and Physical Sciences Research Council, Cambridge University Press & Assessment

## Related

- (link related pages by id as the wiki grows)
