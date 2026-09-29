---
id: jeong26b_interspeech
category: health-clinical
labels: [low-resource, multilingual]
institutions: ["Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2697
pdf: https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.pdf
---

# Cross-lingual Retrieval-Augmented Classification for Dysarthria Severity Assessment

*Taeyoung Jeong, Insung Lee, Du-Seong Chang, Myoung-Wan Koo*

[PDF](https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2697)

**Category:** `health-clinical` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — The paper introduces Cross-lingual Retrieval-Augmented Classification (CRAC) to tackle severe low-resource data scarcity in dysarthria severity assessment, using an align-retrieve-fuse pipeline to leverage labeled pathological speech from a different language. CRAC achieves balanced accuracies of 87.3% on Korean and 86.7% on Italian, outperforming monolingual baselines by up to 20 percentage points.

## Key contributions

- Proposes the Cross-lingual Retrieval-Augmented Classification (CRAC) framework, mimicking the comparative reasoning process of speech-language pathologists (SLPs).
- Implements an align-retrieve-fuse pipeline combining supervised contrastive learning (SupCon), FAISS-based vector database lookup from cross-lingual speech, and cross-attention feature fusion.
- Demonstrates that structured cross-lingual retrieval vastly outperforms naive multilingual data pooling, which can introduce harmful language-specific noise.
- Performs rigorous speaker-independent evaluations across diverse languages and underlying pathologies (Korean post-stroke and Italian ALS datasets).

## Problem

Automatic dysarthria severity assessment is severely hindered by a scarcity of labeled pathological speech data within any single language or clinical etiology, since public corpora like UA-Speech and TORGO contain limited speakers. While cross-lingual adaptation could help bridge this gap, naive data pooling causes models to overfit to language-specific acoustic variations rather than true severity markers. Furthermore, practical constraints like dataset imbalance and limited clinical supervision make training robust classifiers directly from scratch or via standard fine-tuning highly unreliable.

## Method

CRAC operates in four sequential phases built on top of a frozen Whisper-small encoder (extracting 768-dimensional content features e). In Phase 1 (Contrastive Alignment), a trainable projection head consisting of two linear layers with ReLU activation maps e to a 128-dimensional compact search vector z, which is L2-normalized. This projection head is optimized using a supervised contrastive (SupCon) loss with class-balanced sampling across mixed-language mini-batches (temperature tau = 0.15) to pull same-severity samples together regardless of language while freezing the backbone. In Phase 2, a vector database is built using the entire training split of the opposite language, storing z as keys for fast FAISS cosine-similarity search and high-dimensional content features e as values.

In Phase 3 (Retrieval-Augmented Classification), for a given target-language input, the top-k (k=5) references are retrieved from the opposite-language database using their search vectors. A multi-head cross-attention module (8 heads) uses the input content feature as the query and the retrieved content features as both keys and values to generate a context vector c. This context vector is concatenated with the input content feature to form a fused representation f = [e; c] in R^(2d), which is passed through an MLP classifier (hidden dimensions [512, 256], dropout 0.3) optimized via cross-entropy loss with inverse-frequency class weights.

In Phase 4 (Subject-Level Inference), each subject's six evaluation tasks (three sustained MPT vowels /a/, /i/, /u/ and three DDK syllables /pa/, /ta/, /ka/) are processed independently to yield softmax vectors, and subject-level predictions are derived via argmax over averaged probabilities across all tasks.

## Experimental setup

Evaluated on a Korean (KR) post-stroke dysarthria dataset (276 train subjects, 35 validation, 35 test) and an Italian (IT) Amyotrophic Lateral Sclerosis (ALS) dysarthria dataset (219 train subjects, 31 validation, 22 test), both divided into Healthy Control, Mild-to-Moderate, and Severe classes under a strict speaker-independent protocol. Baselines include Baseline 1 (Monolingual Whisper-small + MLP) and Baseline 2 (Pooled multilingual training without alignment/retrieval). Evaluated primarily using balanced accuracy (to handle class imbalance), alongside macro-F1 and micro-F1. Implementation details include the AdamW optimizer (learning rate 5e-5 for Phase 1 projection head, 1e-4 for Phase 3 classifier; weight decay 1e-4), batch size 256 for contrastive alignment, and batch size 32 for classifier training.

## Results

CRAC achieved a balanced accuracy of 87.3% on the Korean dataset, outperforming Baseline 1 (78.9%) by 8.4 pp and Baseline 2 (76.4%) by 10.9 pp. On the Italian dataset, CRAC achieved 86.7% balanced accuracy, yielding a dramatic 20.0 pp improvement over Baseline 1 (66.7%) and outperforming Baseline 2 (80.0%). Notably, naive data pooling (Baseline 2) degraded performance compared to the monolingual baseline in the Korean setting, proving that raw data scaling fails without structural alignment. Ablation studies confirmed that neither contrastive alignment alone (Bal-ACC 70.6% KR / 73.3% IT) nor retrieval alone (Bal-ACC 59.7% KR / 66.7% IT) suffices; only full CRAC achieves peak performance. Top-k sensitivity analysis established that k=5 yields optimal results, while k=10 degrades performance due to noise injection from irrelevant neighborhood samples.

| System | Target Language | Retrieval DB | Balanced Accuracy | Macro-F1 | Micro-F1 |
|---|---|---|---|---|---|
| Baseline 1 (Monolingual) | Korean | - | 0.789 | 0.800 | 0.886 |
| Baseline 2 (Pooled) | Korean | - | 0.764 | 0.762 | 0.857 |
| CRAC (Ours) | Korean | Italian | 0.873 | 0.870 | 0.914 |
| Baseline 1 (Monolingual) | Italian | - | 0.667 | 0.619 | 0.773 |
| Baseline 2 (Pooled) | Italian | - | 0.800 | 0.770 | 0.864 |
| CRAC (Ours) | Italian | Korean | 0.867 | 0.896 | 0.909 |

## Limitations

The evaluation is restricted to only two languages (Korean and Italian) and two specific clinical etiologies (post-stroke and ALS), leaving broader multi-language and cross-pathology generalizability unverified. The framework relies on a fixed frozen Whisper-small feature extractor and pre-segmented speech tasks (MPT and DDK), meaning it has not been tested on continuous, unconstrained conversational speech. Furthermore, retrieval effectiveness is sensitive to database size and hyperparameter choices like top-k.

## Why read this

Speech and ML researchers tackling low-resource medical audio classification should read this paper to understand how cross-lingual retrieval augmentation and supervised contrastive alignment can successfully substitute for large in-domain datasets. It offers a blueprint for replacing naive multilingual data pooling with structured clinical-analogy-inspired inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools, computer-aided longitudinal monitoring for motor speech disorders, and speech therapy assistive software.

## Institutions / 機構

Sogang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
