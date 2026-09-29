---
id: lu26b_interspeech
category: asr
labels: [multilingual, self-supervised]
institutions: ["Chinese Academy of Sciences", "University of Chinese Academy of Sciences"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1185
pdf: https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.pdf
---

# Alignment-Aware Continued Pre-training for Multilingual Speech Representation Learning

*Xun Lu, Xuyang Wang, Fan Feng, Gaofeng Cheng, Pengyuan Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1185)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper proposes an alignment-aware continued pre-training framework for multilingual speech foundation models that jointly optimizes SSL and CTC objectives, achieving up to a 15% relative WER reduction on the FLEURS benchmark.

## Key contributions

- Inserts an intermediate alignment-aware continued pre-training stage between foundation SSL and ASR fine-tuning, jointly optimizing SSL and CTC objectives with a random replacement (RR) mechanism.
- Compares three modeling units (native graphemes, IPA phonemes, and unified Uroman romanization) as structural alignment constraints to balance script preservation and cross-lingual sharing.
- Proposes a language-aware dual-codebook quantization mechanism to explicitly factorize discrete space into global and language-specific components, mitigating multilingual competition under long-tailed data distributions.

## Problem

Standard multilingual speech foundation models (e.g., MMS, XLS-R) are adapted to downstream ASR via direct supervised fine-tuning, which defers acoustic-symbol alignment entirely to the final task optimization stage. In multilingual settings with heterogeneous scripts, phoneme inventories, and long-tailed distributions, this causes a severe mismatch between SSL objectives (acoustic invariance) and ASR objectives (symbolic mapping), degrading cross-lingual generalization and transfer to unseen languages. Prior methods like standard continual SSL adapt only to domain audio without textual supervision, while early joint training approaches often require retraining massive models from scratch.

## Method

The framework builds directly on top of the MMS 300M multilingual SSL foundation model, consisting of a convolutional feature extractor and a Transformer encoder that produces contextual representations H. It introduces an intermediate alignment-aware continued pre-training stage prior to final CTC fine-tuning. During this intermediate stage, a CTC head is attached to inject textual symbolic supervision alongside the standard SSL contrastive loss (L_ctr) and diversity loss (L_div). To prevent the discrete quantization pathway from ignoring text supervision, a random replacement (RR) mechanism with probability p_rr = 0.5 operates on contextual outputs before feeding them to the CTC head, while standard representations are preserved for inference.

To maximize cross-lingual sharing without complex language-specific G2P pipelines that introduce noise, the authors use Uroman unified romanization to project diverse scripts into a shared Latin-based textual symbolic space, comparing it against native graphemes (Char) and IPA phonemes. Furthermore, to address long-tailed multilingual imbalances where high-resource languages monopolize discrete tokens, a language-aware dual-codebook quantizer is introduced. The discrete space is factorized into a shared global codebook C^(g) (capturing universal acoustic-phonetic patterns) and language-specific codebooks C^(s,l) (modeling residual script-specific nuances). Gumbel-Softmax performs differentiable quantization in both parallel latent branches, and the final representations are fused additively to decouple shared structures from language-dependent variations.

Training uses 20k update steps on 4 GPUs for the continued pre-training stage with a peak learning rate of 5×10^-4, mask probability p=0.05, and RR probability p_rr=0.5. Subsequent fine-tuning uses 50k steps on FLEURS and 20k steps on MLS-10h with 2 GPUs and a peak learning rate of 3×10^-4 using the Adam optimizer.

## Experimental setup

Evaluated on the FLEURS dataset (102 languages with diverse scripts and long-tailed distributions) and the Multilingual LibriSpeech (MLS) dataset (8 languages, using the 10-hour subset MLS-10h for low-resource tests and full non-English data for transfer experiments). Compared against direct fine-tuning (B1) and conventional continual SSL adaptation (B2). Metrics reported are Word Error Rate (WER) and Character Error Rate (CER). Implemented using the MMS 300M model architecture.

## Results

On the FLEURS Test benchmark, direct fine-tuning (B1) achieves 47.2% WER, conventional continual SSL (B2) reduces this to 43.4% WER, and the proposed joint SSL-CTC continued pre-training with Uroman further drops it to 36.6% WER (representing an 11% relative reduction over B2 and 22% over B1). When evaluating modeling units, Uroman achieves a superior FLEURS Test WER of 36.6% compared to Char's 37.8%, though Char yields a slightly better CER (12.0% vs 13.0%), while IPA underperforms severely with an overall cross-lingual transfer WER of 45.0% due to G2P conversion errors.

Incorporating the language-aware dual-codebook quantization further cuts the FLEURS Test WER down from 36.6% to 35.5% (a 1.1% absolute gain) and Dev set WER from 37.2% to 36.2% by resolving long-tail capacity starvation.

| System / Condition | FLEURS Dev CER | FLEURS Dev WER | FLEURS Test CER | FLEURS Test WER |
|---|---|---|---|---|
| Direct FT (B1) | 16.1 | 47.8 | 15.6 | 47.2 |
| Continual SSL (B2) | 14.6 | 43.9 | 14.1 | 43.4 |
| Ours: Joint (Char) | 12.5 | 38.3 | 12.0 | 37.8 |
| Ours: Joint (Uroman) | 13.5 | 37.2 | 13.0 | 36.6 |
| Ours: Joint + Dual Codebook | 13.1 | 36.2 | 12.5 | 35.5 |

## Limitations

The framework relies on romanization tools (Uroman) which may occasionally collapse important phonemic distinctions encoded in native non-Latin orthographies, and relies on available G2P resources which limit thorough IPA evaluations to a subset of languages. The experiments are bounded by the scale of the MMS 300M backbone and 102-language FLEURS benchmark, leaving ultra-massive scaling (e.g., 1B+ parameter encoders and thousands of dialects) to future work.

## Why read this

Researchers and engineers working on multilingual speech foundation models and ASR adaptation will find this essential reading for its practical receipt on leveraging intermediate SSL-CTC joint pre-training and structured dual-codebook quantization to resolve multilingual representation bottlenecks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

['Multilingual automatic speech recognition (ASR) systems targeting low-resource and cross-lingual deployment scenarios.', 'Cross-lingual speech representation learning and acoustic model adaptation.']

## Institutions / 機構

Chinese Academy of Sciences, University of Chinese Academy of Sciences

**Funding / 經費:** National Key Research and Development Program of China, Xinjiang Uygur Autonomous Region Key Research and Development Project

## Related

- (link related pages by id as the wiki grows)
