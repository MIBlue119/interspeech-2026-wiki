---
id: wu26n_interspeech
category: deepfake-security
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3212
pdf: https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.pdf
---

# Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection

*Jinyang Wu, Zihan Pan, Qiquan Zhang, Sailor Hardik, Soumik Mondal*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3212)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper proposes a quantizer-aware representation learning framework that leverages the residual vector quantization (RVQ) hierarchy of neural audio codecs for speech deepfake detection, achieving relative EER reductions of 46.2% on ASVspoof 2019 and 13.9% on ASVspoof 5 while keeping the SSL backbone frozen.

## Key contributions

- Introduces Quantizer-Aware Static Fusion (QAF-Static), a dimension-wise static reweighting mechanism that models the coarse-to-fine RVQ hierarchy of neural audio codecs for forensic tasks.
- Demonstrates parameter-efficient adaptation by keeping the WavLM-Large backbone frozen while updating only ~4.4% additional parameters from the neural codec branch.
- Achieves new competitive/state-of-the-art results, recording a 0.35% EER on ASVspoof 2019 LA and 5.68% EER on ASVspoof 5 Track 1.
- Evaluates cross-codec robustness using the CodecFake benchmark, showing robust generalization across varying neural codec architectures and bitrates.

## Problem

While self-supervised learning (SSL) speech encoders like WavLM provide strong contextual abstractions, their high-level representations often smooth out fine-grained acoustic transients, over-smoothed spectral details, and locally distributed artifacts indicative of speech synthesis. Existing deepfake detectors either rely purely on continuous SSL features, treat neural audio codec outputs as unstructured flat embeddings, or apply uniform averaging across quantization levels. This ignores the coarse-to-fine residual hierarchy of residual vector quantization (RVQ), where forensic artifacts concentrate unevenly across specific residual levels. Addressing this gap requires a lightweight fusion strategy that aligns discrete codec hierarchical representations with continuous SSL encoders without high computational overhead.

## Method

The architecture combines a frozen WavLM-Large speech encoder backbone with an EnCodec neural audio codec branch. WavLM multi-layer representations are aggregated via Attentive Merging (AttM) across the first 12 transformer layers, yielding continuous frame-level features $H^{\text{ssl}} \in \mathbb{R}^{B \times T \times d_{\text{model}}}$. The EnCodec stream utilizes $Q=8$ residual vector quantization (RVQ) codebooks, each with a codebook size of 1024 and an embedding dimension of $D=128$, mapping discrete indices to trainable embeddings $H_q \in \mathbb{R}^{B \times T \times D}$. 

To aggregate these codebooks without assuming uniform importance, the method introduces Quantizer-Aware Static Fusion (QAF-Static). It applies a dimension-wise static reweighting matrix $\mathbf{W} \in \mathbb{R}^{Q \times D}$, normalizing weights across codebooks via a temperature-scaled softmax ($\tau$) to obtain channel-wise soft attention weights. This formulation allows each embedding dimension to independently select informative quantization groups based on a learned global prior, preserving RVQ structural bias without the optimization instability of fully dynamic input-dependent gating.

The temporally aligned codec representations $\tilde{H}^{\text{c}}$ are fused with the SSL features via late concatenation followed by a linear projection. The combined sequence is subsequently fed into a lightweight single-layer LSTM module followed by a linear classification head. Models are trained using the Adam optimizer with early stopping based on validation set EER under two distinct settings: codecF (codec branch frozen, updating only fusion/aggregation/classification layers) and codecT (codec branch fine-tuned alongside downstream modules while WavLM remains strictly frozen).

## Experimental setup

Evaluated on ASVspoof 2019 Logical Access (19LA) using official train/dev/eval splits and ASVspoof 5 Track 1 using standard partitions. Evaluated against public baselines (Wav2Vec2-AASIST-KAN, SEMAA-1, AASIST-CAM++, WavLM FT-DA, challenge best systems, HuBERT-XL, W2V2-DARTS) and the Attentive Merging (AttM) baseline. The primary evaluation metric is Equal Error Rate (EER, %). Notable setup details include a frozen WavLM-Large backbone (~315M parameters) and an EnCodec branch adding ~14M parameters (4.4% of backbone scale).

## Results

On ASVspoof 5 Track 1, QAF-Static with a fine-tuned codec branch (codecT) achieves an EER of 5.68%, representing a 13.9% relative improvement over the AttM baseline (6.60%) and outperforming fully fine-tuned SSL models. On ASVspoof 2019 LA, QAF-Static with codecF achieves 0.44% EER (a 32.3% relative reduction), while codecT reaches 0.35% EER, yielding a 46.2% relative improvement over AttM (0.65%). Ablation studies confirm that replacing uniform Quantizer Mean Pooling (6.01% EER on ASVspoof 5) with QAF-Static and fine-tuning (5.68%) isolates the performance gains to explicit hierarchical weighting. Cross-codec evaluations on the CodecFake benchmark show that QAF-Static gains are codec-family dependent, providing robust improvements particularly on Group B families (AcademiaCodec, HiFiCodec) characterized by compact RVQ hierarchies.

| System / Condition | ASVspoof 5 EER (%) | ASVspoof 2019 LA EER (%) |
| :--- | :---: | :---: |
| AttM + LSTM (Baseline) [13] | 6.60 | 0.65 |
| Mean Pooling (codecF, sslF, Method 1) | 6.01 | 0.53 |
| QAF-Static (codecF, sslF, Method 2) | 6.04 | 0.44 |
| QAF-Static (codecT, sslF, Method 2) | 5.68 | 0.35 |
| MoLEx [14] | - | 0.44 |

## Limitations

The static weighting design uses global dimension-wise weights that are input-independent, meaning it may average out sample-specific or attack-specific forensic cues when artifact patterns vary drastically. The performance benefits on cross-codec probes (CodecFake) are codec-family dependent rather than uniformly distributed across all compression schemes. The framework is currently validated exclusively on logical access synthetic speech datasets and has not been tested against complex real-world channel degradation or physical access spoofing environments.

## Why read this

Speech and ML engineers looking to incorporate neural audio codec representations into forensic or detection pipelines without full backbone fine-tuning will find a lightweight, parameter-efficient blueprint for hierarchical RVQ modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech deepfake detection, audio anti-spoofing systems for telephony security, and multi-view forensic verification tools.

## Institutions / 機構

Agency for Science, Technology and Research, University of New South Wales

**Funding / 經費:** National Research Foundation, Prime Minister’s Office, Singapore, Ministry of Digital Development and Information, Online Trust and Safety Research Programme

## Related

- (link related pages by id as the wiki grows)
