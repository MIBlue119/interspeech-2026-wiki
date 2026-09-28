---
id: huang26m_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1796
pdf: https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.pdf
---

# On the Robustness of Speaker Embeddings for Cross-Domain Speaker Retrieval

*Chuanqi Huang, Wei Xie, Xilu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1796)

**TL;DR** — This paper investigates the cross-domain robustness of six pre-trained speaker embedding models for large-scale speaker retrieval (SR) and demonstrates that a training-free Adaptive Symmetric Normalization (ASN) backend successfully restores ranking consistency.

## Key contributions

- Establishes a rigorous evaluation framework for speaker retrieval simulating large-scale out-of-set distractor galleries across diverse domain mismatches.
- Compares six supervised and self-supervised architectures (CAM++, ECAPA-TDNN, ERes2Net, x-vector, RDINO, SDPN) across channel, acoustic, linguistic, and age mismatches.
- Analyzes how supervised multi-scale models resist channel filtering and biological aging, while unmasking their vulnerability to language-specific phonetic over-fitting.
- Leverages Adaptive Symmetric Normalization (ASN) as a training-free backend post-processing strategy to normalize global score shifts without model fine-tuning.

## Problem

Real-world speaker retrieval relies on pre-trained embedding models funneled into high-throughput vector databases, but existing literature focuses almost exclusively on binary verification metrics like EER rather than global 1:N ranking stability. Domain shifts such as telephone transmission codecs, room reverberation, cross-lingual queries, and decades-long biological aging trigger feature drift, compress angular margins, and cause severe rank inversion. Because most models are optimized using classification losses without explicit global distance topology constraints, their well-separated local clusters collapse when projected into unconstrained search spaces.

## Method

The paper evaluates six pre-trained models from the 3D-Speaker Toolkit (CAM++, ECAPA-TDNN, ERes2Net, x-vector, RDINO, SDPN), all originally pre-trained on VoxCeleb2 and frozen without target-domain adaptation. Embeddings are L2-normalized, and global similarity matrices are computed via dense matrix multiplication of query vectors against galleries contaminated by out-of-set distractor speakers.

To mitigate domain-induced score distortions without parameter updates, the authors employ Adaptive Symmetric Normalization (ASN) as a non-parametric backend strategy. ASN dynamically selects a speaker- and test-dependent cohort of top-scoring background pseudo-impostor utterances relative to the query and gallery vectors. This localized cohort statistics estimation centers and scales the cosine similarity scores onto a unified distribution, correcting global shifts and preserving rank order.

## Experimental setup

Evaluated on four datasets representing specific shifts: VoxCeleb2 (channel mismatch via G.711 codecs, 36,237 utterances), VOiCES (acoustic environment mismatch with clean-to-far-field spatial variations, 19,200 utterances), TidyVoice (language mismatch with cross-lingual English/non-English splits, 205,773 utterances), and voxAging (longitudinal age mismatch across decades, 357,529 utterances). Evaluation protocols randomly select 100 target speakers (10 query utterances, 10 gallery utterances per speaker) combined with all remaining dataset speakers as out-of-set distractors. Metrics reported are Precision@10 (P@10) for local retrieval capacity and Mean Average Precision (mAP) for global ranking stability.

## Results

Supervised multi-scale systems like ERes2Net dominate under channel and temporal mismatches, achieving 62.96% mAP under telephone-to-original channel mismatch compared to 17.81% for x-vector. In clean-to-noisy acoustic environments on VOiCES, global ranking remains remarkably stable with all models exceeding 95% mAP, where self-supervised RDINO (74.03% P@10) outperforms the supervised x-vector (71.79% P@10). Under language mismatch, English queries cause a sharp drop in retrieval precision due to dataset bias toward English phonetic variations (e.g., RDINO drops to 25.66% P@10 in English-to-non-English tasks).

Applying the training-free ASN calibration strategy yields universal improvements across all models; under telephone-to-network mismatch, ERes2Net P@10 increases from 40.70% to 43.76% and mAP from 60.53% to 63.62%, while self-supervised SDPN sees its mAP jump from 17.48% to 28.59%.

| System / Condition | P@10 Before | P@10 After (ASN) | mAP Before | mAP After (ASN) |
|---|---|---|---|---|
| CAM++ (T->N) | 26.88 | 31.31 | 44.84 | 49.87 |
| ECAPA-TDNN (T->N) | 28.28 | 35.00 | 44.81 | 52.28 |
| ERes2Net (T->N) | 40.70 | 43.76 | 60.53 | 63.62 |
| x-vector (T->N) | 7.77 | 12.70 | 16.43 | 24.82 |
| RDINO (T->N) | 15.99 | 21.23 | 30.02 | 38.51 |
| SDPN (T->N) | 8.04 | 13.88 | 17.48 | 28.59 |

## Limitations

The study is scoped to pre-trained models sourced from a single training distribution (VoxCeleb2), limiting conclusions regarding models trained on massive multi-source web corpora. The evaluation evaluates fixed open-set distractor scales per dataset rather than scaling gallery size to millions of speakers. Furthermore, the linguistic mismatch evaluation is constrained by the available language pairs in TidyVoice.

## Why read this

Speech and ML engineers deploying speaker retrieval systems into production databases without compute budgets for fine-tuning will learn how to leverage training-free backend calibration to fix rank inversions caused by domain drift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Large-scale audio archive indexing, forensic voice tracking, personalized media services, and high-throughput vector database search.

## Related

- (link related pages by id as the wiki grows)
