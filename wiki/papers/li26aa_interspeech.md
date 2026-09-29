---
id: li26aa_interspeech
category: asr
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1767
pdf: https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.pdf
---

# Weakly Masked Residual Reliability Learning for Unsupervised Domain Adaptation in Speech Models

*Yuan Li, Yonghe Wang, Zhenjie Gao, Feilong Bao, Xiaodong Yang, Bo Pang, Yandong Guo*

[PDF](https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1767)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — The paper introduces Weakly Masked Residual Reliability Learning (WMR²L), an unsupervised domain adaptation framework that couples token-level residual dispersion confidence weighting with weak confidence masking and multi-perturbation consistency regularization to improve speech models in unseen domains. It achieves relative WER reductions of 13.8% on CHiME-4, 25.0% on SLURP, and 15.7% on CORAAL.

## Key contributions

- Proposed WMR²L, combining prediction confidence and non-maximum class residual dispersion to assign token-level weights that separate reliable predictions from overconfident ones.
- Introduced a weak confidence masking strategy that mildly masks high-confidence tokens to prevent supervision bias and encourage contextual learning in complex regions.
- Designed a multi-perturbation consistency regularization approach incorporating time-frequency masking, random resize crop, and parametric equalization to filter low-quality pseudo-labels via hypothesis diversity and WER scoring.

## Problem

End-to-end ASR models suffer severe performance degradation when exposed to unseen domain shifts such as acoustic noise, human-machine interaction scenarios, or regional accents. While pseudo-labeling and consistency regularization are common remedies, standard methods rely on fixed thresholds or simple confidence scores that fail under model overconfidence, causing models to collapse onto overly confident tokens while neglecting complex decision boundaries. Prior consistency techniques also rely mostly on model-level perturbations (e.g., Gaussian noise) rather than comprehensive speech-level transformations.

## Method

The framework operates on unlabeled target speech inputs $x_i \in \mathbb{R}^T$ with pseudo-labels $\hat{y} \in \mathbb{R}^{L \times V}$. For each token position $i$, the maximum prediction confidence $c_i = \max_v p_i(v)$ is computed, alongside the mean non-maximum class probability $d_i = \frac{1}{V-1} \sum_{v \neq \text{argmax}} p_i(v)$, which acts as the residual dispersion to reveal the structural spread of alternative classes. Both metrics are utterance-level normalized into $\mu_c, \sigma_c$ and $\mu_d, \sigma_d$, and combined via a Gaussian kernel controlled by smoothness parameter $\alpha = 2$ to yield token reliability weights.

To address the risk of starving decision boundaries of training signals, a weak confidence masking strategy applies a random masking variable $R_i$ with masking ratio $r = 0.6$ on high-confidence regions, scaling down their loss contribution by factor $\lambda = 0.2$ instead of dropping them entirely. For consistency regularization, $K = M \times n$ trials are generated using $M = 3$ speech perturbation types (time-frequency masking, random resize crop, and parametric EQ) with $n = 3$ trials each. A consistency score $S$ combining hypothesis count $l$ and Word Error Rate is used to select the top $\tau = 80\%$ cleanest pseudo-labels for training.

The models are optimized using the Adam optimizer with a learning rate of $1 \times 10^{-5}$, batch size 1, gradient accumulation of 16, and trained for 2 epochs. The primary base architecture evaluated is Whisper-medium, with additional scalability tests performed on Whisper-Large-v3.

## Experimental setup

Evaluated on CHiME-4 (noisy channel 1 train set; evaluated on real/simulated dev/test), CORAAL (3,000 African American English utterances split 2000/500/500), SLURP (spoken human-machine interaction commands), and CoVoST2 (multilingual speech translation for Estonian, Indonesian, and Welsh). Compared against baselines including unadapted Whisper, self-training, STAR, Confidence+MP, Margin+MP, Entropy+MP, and various WMR²L variants utilizing sampling, beam search, or lightweight neural uncertainty estimators (UA). Metrics used are Word Error Rate (WER % $\downarrow$) and BLEU ($\uparrow$). Models are implemented on Whisper-medium and Whisper-Large-v3.

## Results

WMR²L+MP consistently outperforms all baselines, achieving a relative WER reduction of 13.8% on CHiME-4 real-test (8.1% vs 9.4% baseline), 25.0% on SLURP test (12.6% vs 16.8% baseline), and 15.7% on CORAAL test (15.0% vs 17.8% baseline). When scaled to Whisper-Large-v3 on SLURP test, it lowers WER from 14.9% (zero-shot) and 13.5% (self-train) down to 12.0%. On the CoVoST2 speech translation task, WMR²L+MP achieves BLEU scores of 10.5 on Estonian, 41.8 on Indonesian, and 13.6 on Welsh. Ablations demonstrate that strong masking (SMR²L) hurts performance, while weak masking (WMR²L) combined with multi-perturbations (time-frequency masking, random resize crop, and EQ) yields the optimal WER.

| System / Condition | CHiME-4 (real-test) | SLURP (test) | CORAAL (test) |
|---|---|---|---|
| Base: Whisper-medium | 9.4 | 16.8 | 17.8 |
| Self-train | 9.4 | 15.7 | 17.2 |
| STAR [24] | 8.9 | 15.1 | 16.8 |
| Margin+MP [26] | 8.5 | 13.6 | 15.9 |
| Entropy+MP [31] | 8.3 | 13.2 | 16.5 |
| WMR²L+MP (Ours) | **8.1** | **12.6** | **15.0** |

## Limitations

The framework relies on offline pseudo-label generation stages requiring multi-perturbation decoding passes which add upfront computational overhead during data preparation. The hyperparameter choices (such as masking ratio $r$, threshold $\tau$, and loss scale $\lambda$) were tuned on specific corpora and may require recalibration for highly domain-divergent extreme acoustic environments or tonal languages.

## Why read this

Speech and ML researchers working on unsupervised domain adaptation will appreciate how WMR²L mathematically separates true confidence from overconfidence via residual dispersion, serving as a blueprint for robust pseudo-labeling without manual target annotations.

## Code

- https://anonymous.4open.science/status/Speech-Model-Adaptation-8D45

## Applications

Unsupervised domain adaptation for robust automatic speech recognition in noisy environments, accented speech, and voice-controlled human-machine interaction systems.

## Institutions / 機構

Inner Mongolia University, National Computer Network Emergency Response Technical Team Coordination Center

**Funding / 經費:** National Natural Science Foundation of China, Science and Technology Major Project of Inner Mongolia, Natural Science Foundation of Inner Mongolia, Science and Technology Program of Inner Mongolia, Inner Mongolia Autonomous Region First-Class Discipline Research Special Project

## Related

- (link related pages by id as the wiki grows)
