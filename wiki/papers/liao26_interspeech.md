---
id: liao26_interspeech
category: speaker
labels: [low-resource, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-155
pdf: https://www.isca-archive.org/interspeech_2026/liao26_interspeech.pdf
---

# Role-Aware Semi-Supervised Domain Adaptation for Teacher-Student Speaker Diarization

*Zhen Liao, Gaole Dai, Weiwei Jiang, Mengting Wang, Wei Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/liao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-155)

**Category:** `speaker` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — This paper introduces a Mean Teacher-based semi-supervised domain adaptation framework for classroom speaker diarization, tackling role-based segregation and data scarcity with a new Mandarin dataset (TSSD) and a Role-Aware Union Loss. It achieves a Diarization Error Rate (DER) of 16.95%, substantially outperforming off-the-shelf pipelines.

## Key contributions

- Released TSSD, a real-world Mandarin teacher-student speaker diarization dataset comprising 26.57 hours across 45 annotated sessions and 110.20 hours of unlabeled audio.
- Proposed a Mean Teacher semi-supervised domain adaptation framework leveraging large-scale generic source pre-training and target-domain unlabeled data to bridge the domain gap.
- Introduced Role-Aware Union Loss, which treats the collective student label as a logical union of latent streams to induce channel specialization and resolve overlaps without explicit IDs.
- Adopted PIT-MSE consistency loss to ensure permutation-invariant alignment between student and teacher models, preventing mode collapse during semi-supervised adaptation.

## Problem

Generic speaker diarization models struggle in educational settings due to extreme domain shifts (far-field reverberation, complex noise), severe annotation scarcity driven by privacy and cost, and a fundamental task mismatch. While standard diarization separates distinct individuals, classroom analysis requires mapping multiple student identities into a collective social role («many-to-one» mapping). Existing models like PyAnnote and standard EEND fail to decouple these overlapping group sources without fine-grained identity supervision, resulting in high error rates in educational environments.

## Method

The framework utilizes a DSE-CBM backbone architecture consisting of a frozen WavLM encoder feeding into 7 ConBiMamba layers with feature fusion over the last three layers. It is first pre-trained on a 3,536-hour simulated LibriSpeech dataset plus 8 public real-world corpora (including AISHELL-4, AliMeeting, and AMI) using a batch size of 16 and the C-AdamW optimizer. During domain adaptation, the model adopts a Mean Teacher structure where student weights are updated via back-propagation and teacher weights are updated via Exponential Moving Average (EMA) with a smoothing coefficient alpha of 0.999.

The overall objective combines a supervised segmentation loss (Role-Aware Union Loss) and an unsupervised consistency loss (PIT-MSE). The Role-Aware Union Loss handles the many-to-one ambiguity by evaluating all hypothesis channel-role assignments through a Permutation Invariant Training (PIT) strategy; the teacher role matches a specific channel, while all remaining channels are modeled as a logical union using a max operator over probabilities to represent student voices, sending gradients only to the winning channel. The PIT-MSE consistency loss resolves permutation ambiguity between student and teacher outputs by evaluating mean squared error across all channel permutations and optimizing solely the minimum distance permutation.

For inference, audio chunks of 20 seconds are processed through a 4-channel output head with a maximum of 2 simultaneous speakers. Teacher model weights from the last three epochs are averaged, local speaker embeddings are extracted using ECAPA-TDNN via SpeechBrain, and Agglomerative Hierarchical Clustering with centroid linkage (threshold 0.75, minimum cluster size 30) is applied.

## Experimental setup

Evaluated on the TSSD test set (Mandarin teacher-student classrooms, 26.57 hours total annotated duration, 3.44% overlap ratio). Compared against open-source systems including PyAnnote Community-1 and PyAnnote Segmentation combined with VBx clustering, as well as supervised baselines (scratch training and zero-shot pre-trained DSE-CBM). Metrics reported are False Alarm + Miss (%), Speaker Confusion (%), and Diarization Error Rate (DER %) evaluated at collars of 0s and 0.25s.

## Results

The proposed method achieves a headline DER of 16.95% (0s collar) / 12.67% (0.25s collar), vastly outperforming PyAnnote Community-1 (34.88% DER), PyAnnote+VBx (26.45% DER), and zero-shot pre-trained DSE-CBM (30.35% DER). Ablation studies show that adding the Role-Aware Union Loss drops speaker confusion from 5.20% (Base Mean Teacher) down to 2.70%, while introducing PIT-MSE drops DER to 17.80%; combining both yields the optimal 16.95% DER. Performance peaks at a labeled-to-unlabeled ratio of 1.0, while significantly lower ratios suffer from gradient instability due to supervision signal dilution.

| System | Seg. Loss | Cons. Loss | FA + Miss (%) | Confusion (%) | DER (%) |
|---|---|---|---|---|---|
| PyAnnote Community-1 | - | - | 25.71 (21.72) | 9.17 (8.88) | 34.88 (30.60) |
| PyAnnote Seg. + VBx | - | - | 20.58 (16.43) | 5.87 (5.36) | 26.45 (21.79) |
| Pre-trained (Zero-shot) | PIT | - | 22.30 (18.44) | 8.05 (8.12) | 30.35 (26.56) |
| Supervised FT | PIT | - | 15.19 (11.37) | 6.23 (6.21) | 21.42 (17.58) |
| Mean Teacher (Base) | PIT | MSE | 14.57 (10.62) | 5.20 (5.12) | 19.77 (15.74) |
| Proposed Method (Ours) | Role-Aware Union | PIT-MSE | 14.42 (10.28) | 2.53 (2.39) | 16.95 (12.67) |

## Limitations

The evaluation is restricted to Mandarin-language classroom data (TSSD), leaving cross-lingual and multilingual generalizability untested. The framework assumes a binary role distinction (one dominant teacher versus multiple students) and fixes the maximum simultaneous speakers to 2, which may constrain scaling to larger, highly interactive group discussions or multi-teacher environments. Furthermore, performance is highly sensitive to the labeled-to-unlabeled data ratio during semi-supervised training.

## Why read this

Researchers tackling speaker diarization or conversational analysis in settings with semantic role aggregation (such as education, meetings, or medical interviews) should read this paper to learn how to adapt models using unlabeled data and coarse group labels via logical union loss formulations.

## Code

- https://github.com/lz-hust/TSSD

## Applications

Automated classroom discourse analysis, educational meeting transcription, and role-based conversational audio mining.

## Institutions / 機構

Huazhong University of Science and Technology

**Funding / 經費:** National Key Research and Development Program of China

## Related

- (link related pages by id as the wiki grows)
