---
id: huang26_interspeech
category: speech-llm-dialogue
institutions: ["University of Shanghai for Science and Technology", "Chinese Academy of Sciences", "University of Minnesota", "University of Leeds"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-267
pdf: https://www.isca-archive.org/interspeech_2026/huang26_interspeech.pdf
---

# MVCL-DAF++: Enhancing Multimodal Intent Recognition via Prototype-Aware Contrastive Alignment and Coarse-to-Fine Dynamic Attention Fusion

*Haofeng Huang, Bin Li, Yifei Han, Long Zhang, Yangfan He, Yaxin Xue*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-267)

**Category:** `speech-llm-dialogue`

**TL;DR** — MVCL-DAF++ is a multimodal intent recognition framework combining prototype-aware contrastive alignment with coarse-to-fine dynamic attention fusion, achieving a new state-of-the-art weighted F1 score of 75.66% on MIntRec and 59.23% on MIntRec2.0.

## Key contributions

- Prototype-aware contrastive alignment: Introduces class-level semantic prototypes as explicit anchors within an InfoNCE formulation to improve robustness against noise and long-tailed classes.
- Coarse-to-fine dynamic attention fusion: Utilizes a modality-aware Transformer encoder to distill global summaries from textual queries, visual similarity spaces, and acoustic cues, dynamically blending them with token-level representations.
- Empirical advancements: Sets new performance highs across accuracy, weighted precision, recall, and weighted F1 metrics on both MIntRec and MIntRec2.0 benchmark datasets.

## Problem

Multimodal intent recognition (MMIR) models such as MulT, MAG-BERT, TCL-MAP, and MVCL-DAF frequently stumble in real-world scenarios characterized by class imbalance, noisy inputs, and open-intent distributions. Prior contrastive techniques operate strictly at the instance level, leaving models vulnerable to semantic ambiguity without explicit global grounding. Additionally, existing attention fusions treat heterogeneous modalities as flat token sequences, discarding hierarchical structures and failing to manage acoustic and visual redundancies effectively.

## Method

The architecture builds on MVCL-DAF by retaining its CTC align module, audio BiPeephole LSTM, and BERT pooling decoders while adding novel hierarchical alignment components. Multi-view inputs from text (masked and labeled), visual streams, and acoustic streams are first encoded into low-level representations (E_a, E_v, E_tm, E_tl) and contextualized into feature matrices (M_a, M_v, M_tm, M_l). A modality-aware Transformer encoder then derives a coarse global representation (M_c) where textual tokens act as semantic queries, visual features govern relevance matching, and acoustic tokens supply contextual supplements.

To align features semantically, class-level prototypes r_c are computed per mini-batch by averaging instance embeddings belonging to each intent category and applying L2 normalization. A prototype-aware InfoNCE loss regularizes instance-to-prototype distances using a temperature hyperparameter tau = 0.1. Simultaneously, standard instance-level InfoNCE and cross-entropy losses are optimized.

The coarse global summary M_c is integrated back with token-level features via dual Dynamic Attention Fusion (DAF) modules, generating fine-grained representations (M_f) for contrastive learning and coarse-enhanced representations (M_cf) for final classification via linear projection.

## Experimental setup

Evaluated on MIntRec 1.0 (2,224 samples, 20 classes) and MIntRec2.0 (15,040 samples, 30 classes, long-tailed and open-intent setups). Compared against baselines MulT, MAG-BERT, TCL-MAP, and MVCL-DAF. Metrics include Accuracy (Acc), Recall (R), Weighted Precision (WP), and Weighted F1-score (WF1). Implemented using AdamW with a learning rate of 2e-5, weight decay of 0.2, batch size 32, temperature tau = 0.1, and maximum 100 epochs with early stopping patience of 10 epochs on a single NVIDIA A100-40GB GPU.

## Results

MVCL-DAF++ achieves state-of-the-art performance, outperforming the previous best MVCL-DAF baseline on MIntRec with an accuracy of 76.18% (+1.46%) and WF1 of 75.66% (+1.05%). On the much harder MIntRec2.0 benchmark, it yields an accuracy of 60.40% (+2.60%) and a massive jump in WF1 to 59.23% (+4.18%), with rare-class recognition improving by +4.18% WF1 and overall recall reaching 53.96% (+11.93%).

Ablation studies confirm that removing either the prototype alignment or the coarse-to-fine fusion drops performance across all criteria, with MIntRec accuracy sliding to roughly 75.17% and 75.06% respectively. Loss function ablations show that classification loss alone results in weaker generalization (59.47% ACC on MIntRec2.0), while combining classification, contrastive, and prototype losses achieves peak metrics.

| Systems/Conditions | ACC (%) | WF1 (%) | WP (%) | R (%) |
|---|---|---|---|---|
| MulT [8] (MIntRec) | 72.52 | 71.80 | 72.60 | 67.44 |
| MVCL-DAF [9] (MIntRec) | 74.72 | 74.61 | 75.07 | 71.94 |
| MVCL-DAF++ (MIntRec) | 76.18 | 75.66 | 76.17 | 74.39 |
| MulT [8] (MIntRec2.0) | 56.95 | 54.26 | 54.49 | 40.65 |
| MVCL-DAF [9] (MIntRec2.0) | 57.80 | 55.05 | 55.82 | 42.03 |
| MVCL-DAF++ (MIntRec2.0) | 60.40 | 59.23 | 60.51 | 53.96 |

## Limitations

The evaluation is bounded by the scale of current multimodal benchmarks like MIntRec and MIntRec2.0, which are limited in language scope and conversational domain diversity. The prototype computation strategy relies heavily on mini-batch sample distributions, which may introduce instability or poor prototype estimates under extremely small or unrepresentative batch sizes.

## Why read this

Researchers building robust conversational agents or multi-modal fusion architectures should read this paper to see how prototype-anchored contrastive alignment corrects for instance-level noise and long-tailed intent imbalances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Intelligent conversational agents, virtual assistants, and human-centered AI systems requiring robust multimodal intent understanding.

## Institutions / 機構

University of Shanghai for Science and Technology, Chinese Academy of Sciences, University of Minnesota, University of Leeds

**Funding / 經費:** Shenzhen Medical Research Fund, National Key Laboratory of the CAS on Medical Imaging Science and Technology System, Key Research and Development Program of Guangdong Province, Shenzhen STIB programs, Xisike Clinical Oncology Research Foundation

## Related

- [Distilling Structured Reasoning into SpeechLLMs for Spoken Language Understanding](tsukagoshi26_interspeech.md) — same problem · relatedness 1.9/3
- [TinyGiantALM: A Compact Audio-Language Model for Intent-Aware Reasoning under Resource Constraints](ly26_interspeech.md) — same problem · relatedness 1.8/3
- [MAC-SLU: Multi-Intent Automotive Cabin Spoken Language Understanding Benchmark](peng26d_interspeech.md) — same problem · relatedness 1.8/3
- [SFL-MTSC: Leveraging Semantic Frame-Level Multi-Task Self-Consistency for Robust Multi-Intent Spoken Language Understanding](chen26ea_interspeech.md) — same problem · relatedness 1.8/3
- [ML-KD-DRI-GAN: Teacher-Guided Denoising and Triplet-Adversarial Training for Robust Spoken Language Understanding](kumar26b_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
