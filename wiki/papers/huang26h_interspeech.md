---
id: huang26h_interspeech
category: asr
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1409
pdf: https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.pdf
---

# RAS: a Reliability Oriented Metric for Automatic Speech Recognition

*Wenbin Huang, Yuhang Qiu, Bohan Li, Yiwei Guo, Jing Peng, Hankun Wang, Xie Chen, Kai Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1409)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — This paper introduces a fine-grained abstention framework for ASR that allows models to output a special placeholder token ($\text{PH}$) for uncertain segments, accompanied by a human-calibrated Reliability-Aware Score (RAS) and a two-stage training pipeline (placeholder supervision followed by reinforcement learning). The proposed approach improves RAS from $-0.1093$ to $0.4786$ on code-switched data (TALCS) and increases robustness in noisy environments.

## Key contributions

- Extends selective prediction from whole-utterance rejection to fine-grained, segment-level ASR abstention via a dedicated $\text{PH}$ placeholder token.
- Proposes the Reliability-Aware Score (RAS), a modified edit distance metric that balances transcription informativeness and error aversion, calibrated using 980 human preference annotations via a Bradley-Terry model.
- Establishes a robust two-stage training pipeline combining supervised placeholder bootstrapping ($\text{PH-Supv}$) and Group Relative Policy Optimization (GRPO) using RAS as the reward signal.
- Demonstrates substantial reliability gains on noisy LibriSpeech (especially at low SNRs like 0 dB) and English-Mandarin code-switching (TALCS).

## Problem

Standard ASR evaluation metrics like Word Error Rate (WER) measure accuracy alone and implicitly assume forced transcription, failing to penalize or capture plausible-but-wrong hallucinations under ambiguous, noisy, or low-resource acoustic conditions. While machine learning literature explores instance-level abstention, discarding entire utterances is unsuitable for ASR because it wastes valuable partial information. Furthermore, existing post-hoc confidence scoring treats uncertainty as a separate metadata layer rather than enabling an internal, active mechanism to opt out of localized uncertain segments. This matters because confident hallucinations in high-stakes domains like medical documentation and legal records can dangerously mislead downstream users and decision-makers.

## Method

The framework augments the ASR vocabulary with a special token, $\text{PH}$, representing localized abstention. To evaluate outputs, the authors introduce the Reliability-Aware Score (RAS), derived from a modified dynamic programming edit distance where $\text{PH}$-related operations incur a discounted cost factor $\alpha \in (0, 1)$ rather than full substitution/deletion penalties. The hyperparameter $\alpha$ is calibrated to human preferences collected via BeaqleJS listening tests (173 medical samples, 191 AMI conversational samples, 42 participants, 980 valid preference pairs) using a Bradley-Terry preference likelihood loss regularized for indifference.

The training pipeline consists of two stages using Whisper-Tiny as the base model. Stage 1 ($\text{PH-Supv}$) constructs training pairs by taking base model hypotheses, aligning them with ground truth using WER, and replacing substituted, inserted, or deleted text segments with exact counts of $\text{PH}$ tokens corresponding to tokenizer lengths. The model's decoder and embeddings are fine-tuned for 8 epochs using AdamW (batch size 64, learning rate $1.0 \times 10^{-5}$, 1,000 warmup steps). Stage 2 applies Group Relative Policy Optimization (GRPO) using utterance-level RAS as the reward signal. For each prompt, a group of $G=8$ outputs is sampled at temperature 0.7 and top-$p$ 0.95, optimizing policy with an adaptive KL penalty ($\beta_{\text{target}}=30$) and Adam optimizer (peak LR $2 \times 10^{-6}$).

## Experimental setup

Experiments are conducted on LibriSpeech (train-clean-360 for training, test-clean for evaluation), a simulated noisy LibriSpeech variant with Additive White Gaussian Noise at 0, 5, 10, and 20 dB SNRs, and the TALCS English-Mandarin code-switching corpus. Baselines include the unmodified Whisper-Tiny base model and Base+Logit (which applies logit-based confidence thresholding to insert $\text{PH}$ tokens based on token-level confidence bars tuned in $[0.1, 0.3]$). Metrics evaluated are RAS, Usefulness (correct transcription proportion), and Cost (penalized alignment error).

## Results

On clean LibriSpeech, Base+PH-Supv+RL achieves an RAS of 0.8811 (Usefulness 0.9376, Cost 0.0565), outperforming the Base model (0.8603 RAS) and Base+Logit (0.8650 RAS). On the challenging TALCS code-switching dataset, where the base model scores an RAS of $-0.1093$, the proposed method achieves 0.4786 RAS (Usefulness 0.7391, Cost 0.2940), vastly outperforming Base+Logit ($-0.0650$ RAS). On Noisy LibriSpeech at 0 dB SNR, the method improves RAS by 0.2657 over the base model, compared to a modest 0.0208 gain in clean conditions, demonstrating that robustness benefits scale inversely with SNR.

Ablation studies isolating the GRPO reinforcement learning stage show that adding RL strictly improves RAS and Usefulness across datasets (e.g., LibriSpeech RAS increases from 0.8696 with PH-Supv alone to 0.8811 with PH-Supv+RL). Notably, on TALCS, both supervised and RL variants surpass the GT-guided PH-replacement upper bound because base model hallucinations on code-switching limit ground-truth-guided mapping, whereas explicit PH-supervision teaches the model genuine uncertainty management.

| Method | LibriSpeech RAS $\uparrow$ | LibriSpeech Usefulness $\uparrow$ | LibriSpeech Cost $\downarrow$ | TALCS RAS $\uparrow$ | TALCS Usefulness $\uparrow$ | TALCS Cost $\downarrow$ |
|---|---|---|---|---|---|---|
| Base | 0.8603 | 0.9362 | 0.0759 | -0.1093 | 0.5874 | 0.6968 |
| Base+Logit | 0.8650 | 0.9349 | 0.0698 | -0.0650 | 0.5595 | 0.6245 |
| Base+PH-Supv (Ablation) | 0.8696 | 0.9277 | 0.0581 | 0.4054 | 0.6520 | 0.2466 |
| Base+PH-Supv+RL (Ours) | 0.8811 | 0.9376 | 0.0565 | 0.4786 | 0.7391 | 0.2940 |
| GT-guided PH-replacement | 0.9031 | 0.9361 | 0.0329 | 0.3772 | 0.5874 | 0.2103 |

## Limitations

The evaluation relies on simulated additive white Gaussian noise and specific public corpora (LibriSpeech, TALCS), leaving real-world acoustic mismatches and broader multilingual generalization untested beyond English and code-switched Mandarin. The approach requires architectural modifications to expand token vocabularies and depends on human calibration of the $\alpha$ trade-off hyperparameter, which may shift across distinct high-stakes domains. Furthermore, reinforcement learning via GRPO introduces heavy computational overhead during training compared to standard supervised fine-tuning.

## Why read this

Speech and ML researchers studying selective prediction, uncertainty quantification, or reinforcement learning for sequence models should read this paper to see how to transition ASR evaluation and training from forced-transcription accuracy to risk-aware abstention using human-preference-aligned rewards.

## Code

- https://github.com/HartmannPsi/Reliability-Aware-Score

## Applications

High-stakes automatic speech transcription systems in medical documentation and legal recording where avoiding plausible-but-wrong hallucinations is critical.

## Institutions / 機構

Shanghai Jiao Tong University

**Funding / 經費:** China NSFC Project

## Related

- (link related pages by id as the wiki grows)
