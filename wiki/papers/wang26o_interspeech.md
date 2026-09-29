---
id: wang26o_interspeech
category: asr
labels: [low-resource, self-supervised]
institutions: ["University of California, Los Angeles"]
code: https://github.com/Zilai-WANG/Gumbel_Beard
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-825
pdf: https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.pdf
---

# Gumbel-BEARD: Automatic Layer Selection for Self-Supervised Adaptation of Whisper in Low-Resource Domains

*Zilai Wang, Natarajan Balaji Shankar, Mohan Shi, Kaiyuan Zhang, Abeer Alwan*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-825)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — Gumbel-BEARD is a domain adaptation framework for Whisper that automates intermediate encoder layer selection via a hard Gumbel-Softmax estimator for self-supervised BEST-RQ training, achieving state-of-the-art Word Error Rates (WER) of 8.21% on the MyST child speech corpus using Whisper-medium.

## Key contributions

- Proposes Gumbel-BEARD, replacing heuristic or manually searched fixed prediction layers with an end-to-end trainable hard Gumbel-Softmax layer selector.
- Eliminates the expensive brute-force layer search of prior BEARD frameworks, reducing adaptation computational cost to ~1 GPU-hour on Whisper-small.
- Establishes new state-of-the-art WERs of 8.21% on MyST (Whisper-medium) and 11.06% on OGI Spontaneous (Whisper-small).
- Demonstrates cross-domain and cross-task generalizability, achieving up to 6% relative WER reduction on adult dialectal speech (CORAAL).

## Problem

Speech foundation models such as Whisper degrade severely in low-resource or mismatched domains (like child speech or non-standard dialects) due to acoustic variability, shorter vocal tracts, and data scarcity. While Unsupervised Domain Adaptation (UDA) methods like BEARD use self-supervised learning (SSL) targets (such as BEST-RQ) at an intermediate encoder layer, picking that prediction layer is computationally prohibitive via brute-force search or sub-optimal via heuristic guessing. Weighted sums (soft layer mixing) blur abstractions, whereas child ASR and dialectal shifts require dynamic, context-aware feature extraction without requiring massive annotated target datasets.

## Method

Gumbel-BEARD builds on the two-stage BEARD architecture (unsupervised encoder adaptation using BEST-RQ and dual distillation, followed by joint supervised fine-tuning with the decoder). Instead of a fixed prediction layer $L$, it introduces a learnable logit vector $\alpha \in \mathbb{R}^N$ representing unnormalized selection probabilities over the $N$ encoder layers. Discrete selection is achieved via the hard Gumbel-Softmax estimator: soft probabilities $y_i$ are calculated with Gumbel noise $g_i \sim \text{Gumbel}(0, 1)$ and temperature $\tau$, and a hard argmax yields a one-hot selection vector $\hat{\mathbf{H}}_S$, with gradients flowing through the soft probabilities via the Straight-Through Estimator (STE).

The training objective combines the BEST-RQ vector quantization loss $\mathcal{L}_q^L$ at the dynamically chosen layer, alongside an inner distillation loss ($\mathcal{L}_d^L$, cosine similarity between the selected student representation and a frozen teacher encoder state) and an output distillation loss ($\mathcal{L}_d^{N}$, at the final encoder layer). Temperature $\tau$ governs exploration-exploitation: it initializes at $\tau = 5.0$ to ensure uniform early exploration across all encoder layers, and anneals linearly to $\tau = 0.1$ to concentrate selection on optimal layers.

During self-supervised adaptation, the decoder is frozen and only the encoder updates over 1 epoch with a batch size of 32, learning rate $1 \times 10^{-4}$, codebook size 2048, $\lambda = 0.5$, and $\beta = 0.1$ on a single NVIDIA RTX 5090 GPU. The selected encoder is then coupled with the original decoder for full supervised fine-tuning on limited labeled data.

## Experimental setup

Evaluated on three primary corpora: MyST (133/21/25 h train/dev/test splits, with 208 h untranscribed audio for SSL adaptation), OGI Kids/Spontaneous (22 h spontaneous training, 48 h scripted, total 70 h adaptation), and CORAAL (137 h training split across six African American Language sub-corpora, with ROC and VLD as dev/test splits). Backbone models are Whisper-small (244M params, 12 layers) and Whisper-medium (769M params, 24 layers). Baselines include supervised fine-tuning (SFT) without SSL adaptation, standard BEARD with manual fixed-layer search, and pseudo-labeling (PL) using Whisper-large-v3. Metrics include Word Error Rate (WER) evaluated via NIST SCTK MAPSSWE ($p < 0.05$) and Projection-Weighted CCA (PWCCA) for representational similarity.

## Results

On the MyST test set with Whisper-small, hard Gumbel-BEARD achieves a WER of 10.18% (1 h data), 9.35% (10 h data, nearly matching the fully-supervised SFT baseline trained on the full 133 h set at 9.34%), and 8.51% (full data), outperforming standard BEARD (8.73%) and soft selection (8.76%). With Whisper-medium on MyST full data, Gumbel-BEARD reaches 8.21% WER, beating the previous SFT baseline (8.86%) and larger 1.1B parameter models. On OGI Spontaneous, in-domain adaptation achieves 11.06% WER, while cross-domain adaptation using MyST unlabeled data attains 11.15% WER (outperforming the 11.57% SFT baseline). On CORAAL, Whisper-medium Gumbel-BEARD reduces test WER from 9.81% (SFT) to 9.25%. Soft layer selection consistently underperforms hard selection due to gradient interference caused by mixing abstraction levels.

| System / Condition | 1 h Labeled | 10 h Labeled | Full Labeled |
| :--- | :--- | :--- | :--- |
| SFT Baseline (Whisper-small, MyST) | 10.64% | 9.94% | 9.34% |
| Standard BEARD (Whisper-small, MyST) | 10.31% | 9.44% | 8.73% |
| Gumbel-Soft Soft Selection (MyST) | 10.65% | 9.62% | 8.76% |
| Gumbel-BEARD Hard Selection (MyST) | **10.18%** | **9.35%** | **8.51%** |
| SFT Baseline (Whisper-medium, MyST) | 9.56% | 9.19% | 8.86% |
| Gumbel-BEARD (Whisper-medium, MyST) | **9.15%** | **8.88%** | **8.21%** |

## Limitations

The framework assumes availability of unlabelled target domain audio for the self-supervised adaptation stage, which might be exceptionally scarce in true zero-data edge scenarios. Evaluations are primarily focused on child speech (MyST, OGI) and specific dialectal English (CORAAL), meaning cross-lingual scaling and highly tonal language performance remain under-explored in this exact configuration. Furthermore, Whisper-large architectures were omitted from primary adaptation runs due to compute budgets and overfitting risks on tiny child datasets.

## Why read this

Speech researchers and ML engineers looking to adapt large pre-trained encoder-decoder architectures (like Whisper or Canary) to low-resource domains without expensive hyperparameter searches for intermediate distillation layers should adopt this technique. It provides a drop-in, end-to-end trainable alternative to fixed-layer SSL adaptation that preserves pre-trained knowledge better while drastically cutting down compute costs.

## Code

- https://github.com/Zilai-WANG/Gumbel_Beard

## Applications

Automated domain adaptation for low-resource automatic speech recognition systems, child speech educational technology, and dialect-robust sociolinguistic transcription tools.

## Institutions / 機構

University of California, Los Angeles

**Funding / 經費:** National Science Foundation, Institute of Education Sciences, U.S. Department of Education

## Related

- (link related pages by id as the wiki grows)
