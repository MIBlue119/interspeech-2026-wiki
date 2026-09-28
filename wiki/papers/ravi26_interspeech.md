---
id: ravi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1355
pdf: https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.pdf
---

# Rank-Distance Based Confidence Estimation for ASR

*Nagarathna Ravi, Madduri Aiswarya Lakshmi, Ragesh M, Rajalakshmi Elangovan*

[PDF](https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1355)

**TL;DR** — The paper introduces RanD, a continuous target score for ASR confidence estimation that combines probability rank and distribution distance to prevent the probability-collapse issues seen in prior true-class methods. Evaluated across CTC, RNN-T, TDT, and AED architectures on Hindi and English datasets, RanD-CEM consistently outperforms state-of-the-art baselines under both in-domain and out-of-domain evaluation conditions.

## Key contributions

- Identifies and explains the true-class probability collapse phenomenon in deep ASR decoders, where incorrect token probabilities diminish toward zero as vocabulary size grows.
- Proposes RanD, a novel continuous confidence score combining a normalized rank score ($s_{\text{rank}}$) of the true class and a normalized Euclidean distance ($s_{\text{dis}}$) between predicted and actual posterior distributions.
- Implements and evaluates RanD-CEM across four distinct ASR backends: CTC, RNN-T, TDT, and AED, showcasing a unified confidence estimation recipe.
- Demonstrates robust generalizability on mismatched/out-of-domain evaluation data (e.g., NPTEL, Svarah, PB Hindi) without architecture-specific manual temporal alignments.

## Problem

Maximum class probabilities and entropy transformations fail to yield reliable confidence scores because overconfident deep ASR decoders output highly skewed distributions. Existing trainable auxiliary Confidence Estimation Models (CEMs) either rely on binary targets—which completely miss partial correctness (treating substituted/inserted tokens uniformly as zero)—or continuous targets like TeLeS and TruCLeS that suffer from brittle temporal alignment propagation or probability collapse in large vocabularies. This lack of robust calibration hinders safe error correction and downstream cascading systems.

## Method

The framework extracts word-level representations from trained ASR models and aligns hypothesis and reference transcripts via edit-distance. For each predicted token $c'_j$ aligned with reference $c_j$, the posterior probability vector $\mathbf{p}_{j'}$ and one-hot target vector $\mathbf{q}_{j'}$ are analyzed. The normalized rank score is computed as $s_{\text{rank}} = 1 - \frac{r(c_j)-1}{|C|-1}$, and the normalized distribution distance score as $s_{\text{dis}} = 1 - \frac{\|\mathbf{p}_{j'} - \mathbf{q}_{j'}\|_2}{\sqrt{2}}$. The final token-level score blends them with $\alpha=0.5$: $s = \alpha s_{\text{rank}} + (1-\alpha)s_{\text{dis}}$, and word-level scores ($s_{w'}$) average the underlying token scores.

For CTC, the CEM takes encoder hidden states, decoder softmax outputs, and posteriors and uses fully connected layers (512-256-128 neurons) with ReLU. For RNN-T and TDT, the auxiliary model uses two bidirectional LSTM layers (512 hidden units) followed by a 1024-neuron fully connected layer. For AED, it uses a 256-neuron feedforward network. All CEM architectures are trained for 50 epochs using the Adam optimizer (learning rate $10^{-4}$), shrinkage loss, and time/frequency masking augmentation.

## Experimental setup

Evaluated using pre-trained models from the NeMo framework: Hindi Conformer-CTC (trained on KB Hindi, tested on PB Hindi), Conformer-RNN-T, Parakeet-TDT, and Canary-Flash AED (the latter three trained on LibriSpeech and tested on NPTEL and Svarah Indian English datasets). Performance is measured using MAE, KLD, JSD, NCE, ECE, AUROC, and AUPRC.

## Results

RanD-CEM consistently outperforms MCP, entropy-baseline, binary CEM, and prior continuous targets (TeLeS/TruCLeS) across most metrics and domains. For instance, on CTC-ASR with the KB dataset, RanD achieves an MAE of 0.0570 and NCE of 0.3886, compared to TruCLeS (MAE 0.0870, NCE 0.2971) and MCP (MAE 0.1343). On challenging mismatched domains like NPTEL and Svarah, RanD preserves low MAE and high AUPRC (e.g., reaching 0.9355 AUPRC on NPTEL for RNN-T), whereas baseline methods experience sharp degradations.

| System / Condition | MAE (↓) | KLD (↓) | JSD (↓) | NCE (↑) | ECE (↓) | AUROC (↑) |
|---|---|---|---|---|---|---|
| MCP (CTC / KB) | 0.1343 | 0.4995 | 0.2792 | -0.2823 | 0.2703 | 0.7616 |
| TeLeS (CTC / KB) | 0.1078 | 0.1498 | 0.0430 | 0.1408 | 0.0524 | 0.8155 |
| TruCLeS (CTC / KB) | 0.0870 | 0.1093 | 0.0278 | 0.2971 | **0.0107** | 0.8578 |
| **RanD (CTC / KB)** | **0.0570** | **0.1028** | **0.0181** | **0.3886** | 0.0473 | **0.8669** |

## Limitations

The current formulation requires access to rich internal token posterior distributions and intermediate representations from the parent ASR, limiting its plug-and-play usage on black-box or API-based speech models. Additionally, the approach currently struggles to natively predict completely deleted words (insertions/substitutions are modeled, but deletions require context-window expansion around gaps).

## Why read this

Researchers and engineers building confidence-aware speech transcription pipelines or downstream error-correction modules should read this paper to adopt a robust, architecture-agnostic continuous confidence scoring function that bypasses fragile temporal alignments and overconfidence collapse.

## Code

- https://github.com/Nagarathna-R/2026_RanDiS_Interspeech

## Applications

Automated ASR error correction, selective downstream ingestion for speech translation, disfluency detection, and voice assistant safety filtering.

## Related

- (link related pages by id as the wiki grows)
