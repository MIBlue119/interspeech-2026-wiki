---
id: wu26c_interspeech
category: asr
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-856
pdf: https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.pdf
---

# SEA-MDD: Self-adapting Mispronunciation Detection and Diagnosis Models via Test-Time Training

*Minglin Wu, Helen Meng*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-856)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — SEA-MDD introduces a self-adapting mispronunciation detection and diagnosis framework via Test-Time Training (TTT), dynamically updating model weights on a single test sentence to achieve an 8.03% phoneme error rate and an 81.54% F1 score on L2 English speech.

## Key contributions

- Proposes SEA-MDD, integrating multilayer perceptron (MLP)-based Test-Time Training (TTT) modules into wav2vec 2.0 Transformer blocks for single-utterance speech adaptation.
- Eliminates the heavy data requirements of prior meta-learning adaptation methods, adapting successfully using only a single incoming test sentence.
- Achieves consistent performance gains over wav2vec2-CTC and MAML baselines, yielding a lower phoneme error rate (8.03%) and higher F1 score (81.54%).
- Provides extensive empirical ablations over TTT module positions (early vs. late layers) and architectures (Linear vs. MLP).

## Problem

Mispronunciation detection and diagnosis (MDD) systems for second language (L2) learners suffer from severe performance degradation when exposed to speakers and error types that diverge from fixed training distributions. Collecting and annotating large-scale L2 corpora covering all possible mispronunciation variations is prohibitively expensive. Prior adaptation approaches like model-agnostic meta-learning (MAML) require substantial target-speaker adaptation data (e.g., hours of speech), leading to a secondary data scarcity bottleneck.

## Method

The SEA-MDD framework builds on the wav2vec 2.0 base model, which features 12 Transformer blocks (768 model dimension, 3072 feed-forward dimension, 8 attention heads) processing latent features from a 7-layer temporal convolutional encoder. A TTT module is inserted into the Transformer blocks prior to the feed-forward sub-layer. The TTT module is implemented as either a single linear layer (TTT-Linear) or a two-layer MLP with a GELU activation in between (TTT-MLP), followed by layer normalization, a residual connection, and a learnable gating mechanism ($Gate(x) = \tanh(\alpha) \odot x$). 

During both training and test time, the parameters $W$ of the TTT module undergo an inner-loop update via a single gradient descent step on a self-supervised reconstruction task. The input speech representation $x_t$ is projected via $\theta_K$ into keys and via $\theta_V$ into reconstruction targets, while a query projection $\theta_Q$ is applied to compute the output. The self-supervised loss $\mathcal{L}$ minimizes the squared error between the MLP output and the reconstruction target $\theta_V x_t$, with a learning rate $\eta = 1\text{e}-3$. A mini-batch strategy ($b=32$) is used along the temporal dimension for efficiency. The outer loop optimizes initial parameters $W_0$ and all other network weights using CTC loss, the tri-stage learning rate schedule (peak lr $5\text{e}-4$), the Adam optimizer, for 20,000 updates on two NVIDIA H100 GPUs.

At inference time, the model executes only the inner-loop weight update using the current test sentence, allowing zero-shot dynamic adaptation without auxiliary target-speaker datasets. Triton kernels, data loading-computation asynchrony, and sequence-dimension gradient checkpointing are utilized to maintain low adaptation latency.

## Experimental setup

Evaluated on the CU-CHLOE L2 English dataset (34.6 hours total across 210 Cantonese and Mandarin speakers, split into 24 hours training, 3.6 hours validation, and 7 hours test). Compared against non-adaptable wav2vec2-CTC and speaker-adaptable wav2vec2-MAML (which requires 2 hours of target-speaker adaptation data). Metrics include Phoneme Error Rate (PER), False Rejection Rate (FRR), False Acceptance Rate (FAR), Precision, Recall, F1 score, and Diagnosis Accuracy (DIAA).

## Results

SEA-MDD-MLP (All blocks) achieves the headline performance with a PER of 8.03%, FRR of 4.40%, FAR of 19.62%, Precision of 82.72%, Recall of 80.38%, F1 score of 81.54%, and DIAA of 94.06%, outperforming the wav2vec2-CTC baseline (PER 8.53%, F1 80.40%) and wav2vec2-MAML (PER 8.46%, F1 80.67%). Inserting TTT modules into all 12 blocks outperforms single-block insertion (e.g., SEA-MDD-MLP 1st block yields 8.18% PER and 81.18% F1), and MLP variants consistently outperform Linear variants.

In computational overhead comparisons, wav2vec2-MAML demands 94.4M parameters, 30 minutes of latency, and 2 hours of data, whereas SEA-MDD-MLP (1st block) uses only 3.0M parameters, 5 ms latency, and a single sentence. However, placing TTT modules deeper than layer index 5 shows diminishing returns, indicating that early-layer feature adaptation is crucial.

| Systems | PER (%) ↓ | FRR (%) ↓ | FAR (%) ↓ | Precision (%) ↑ | Recall (%) ↑ | F1 (%) ↑ | DIAA (%) ↑ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| wav2vec2-CTC | 8.53 | 4.59 | 20.97 | 81.82 | 79.03 | 80.40 | 93.71 |
| wav2vec2-MAML | 8.46 | 4.57 | 20.63 | 82.01 | 79.37 | 80.67 | 93.63 |
| SEA-MDD-Linear (1st block) | 8.26 | 4.43 | 20.50 | 82.62 | 79.50 | 81.03 | 93.83 |
| SEA-MDD-Linear (All blocks) | 8.13 | 4.41 | 20.02 | 82.62 | 79.98 | 81.28 | 93.87 |
| SEA-MDD-MLP (1st block) | 8.18 | 4.45 | 20.08 | 82.48 | 79.92 | 81.18 | 93.89 |
| SEA-MDD-MLP (All blocks) | 8.03 | 4.40 | 19.62 | 82.72 | 80.38 | 81.54 | 94.06 |

## Limitations

The evaluation is restricted to L2 English speech from Cantonese and Mandarin native speakers within a single dataset (CU-CHLOE). The approach has not yet been validated across broader L1 accent backgrounds, varying noise or recording conditions, or larger foundation speech models beyond wav2vec 2.0 base.

## Why read this

Speech researchers and engineers working on computer-assisted pronunciation training will learn how test-time training can eliminate multi-speaker fine-tuning data bottlenecks for mispronunciation detection and diagnosis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) software, automated pronunciation scoring and tutoring systems, and real-time L2 speech feedback tools.

## Institutions / 機構

Chinese University of Hong Kong

**Funding / 經費:** Centre for Perceptual and Interactive Intelligence, Innovation and Technology Commission of the Hong Kong Special Administrative Region Government

## Related

- (link related pages by id as the wiki grows)
