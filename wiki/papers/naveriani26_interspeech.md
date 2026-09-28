---
id: naveriani26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2070
pdf: https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.pdf
---

# Diffusion Language Models for Speech Recognition

*Davyd Naveriani, Albert Zeyer, Ralf Schlüter, Hermann Ney*

[PDF](https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2070)

**TL;DR** — This paper investigates discrete diffusion language models—specifically Masked Diffusion Language Models (MDLM) and Uniform-State Diffusion Models (USDM)—for ASR rescoring and proposes a novel token-level joint CTC-USDM decoding framework, achieving a WER of 4.47% on LibriSpeech dev-other while reaching an RTF of 0.003.

## Key contributions

- Systematic comparison of Masked Diffusion Language Models (MDLM) and Uniform-State Diffusion Models (USDM) for ASR hypothesis rescoring.
- Proposed sample-level and global mask normalization techniques for MDLM rescoring that outperform naive sequence-length normalization.
- Designed a novel token-level joint decoding method combining frame-wise CTC probabilities with label-wise USDM distributions at each denoising step.
- Achieved substantial WER improvements with a single joint-decoding forward step while preserving near-real-time efficiency (RTF 0.003).

## Problem

Traditional autoregressive language models used for ASR rescoring or joint decoding are constrained by a strictly left-to-right decoding structure, creating speed bottlenecks during parallel generation. While non-autoregressive discrete diffusion models (such as MDLM and USDM) bypass this restriction through bidirectional context and parallel text generation, their use as standalone standalone language models for token-level ASR joint decoding and structured rescoring remains underexplored. Applying them effectively requires overcoming high-variance ELBO estimators in rescoring and aligning continuous token distributions with frame-level acoustic models.

## Method

The authors evaluate two Diffusion Transformer (DiT) architectures: a small 12-layer model (hidden dim 768, ~110M params) and a primary 24-layer model (16 attention heads, dropout 0.1, hidden dim 1024, ~340M params). Text is tokenized using SentencePiece into 10,240 subword units. MDLM corrupts text via independent masking based on a noise schedule αt, trained using a cross-entropy loss weighted over masked tokens. To fix high-variance Monte Carlo score estimation, the authors introduce sample-level mask normalization (normalizing each sample by its own mask count) and coupled scoring (creating complementary mask pairs). 

USDM corrupts tokens via uniform vocabulary sampling rather than a mask token, yielding a full vocabulary probability distribution at every position during denoising. This property allows the formulation of a joint CTC-USDM decoding framework. At each denoising step l, token distributions Pθ,i are combined with frame-level CTC probabilities P_CTC,τi (renormalized over non-blank vocabulary) aligned via the first frame corresponding to each collapsed token. Ancestral sampling is then used to draw inputs for the next denoising step from the resulting softmax-normalized combined distribution.

## Experimental setup

Experiments use LibriSpeech: the CTC ASR model is trained on 960 hours of training data, while the Diffusion LMs are trained on combined LibriSpeech LM data and train-other transcriptions. Models are optimized using AdamW (weight decay 0.1), a piecewise linear learning-rate scheduler, and a batch size of 20,000 tokens for 5, 10, and 25 epochs. Evaluation is conducted on LibriSpeech dev-other using Word Error Rate (WER) and Real-Time Factor (RTF), comparing against greedy CTC, autoregressive LM rescoring/first-pass decoding, and unnormalized diffusion baselines.

## Results

MDLM rescoring with sample-level mask normalization reduces the CTC baseline WER of 5.08% down to 4.47% at K = 256 (25 training epochs). USDM rescoring reaches 4.71% WER with 24 layers at K = 256. Meanwhile, the proposed CTC-USDM joint decoding achieves 4.66% WER using only a single denoising step (L = 1, t_start = 0.1) with an extremely fast RTF of 0.003, compared to autoregressive LM rescoring (4.19% WER, RTF 0.008) and first-pass AR decoding (3.86% WER, RTF 0.078). MDLM outperforms USDM in static rescoring on this data scale, whereas USDM excels in joint decoding due to its full-vocabulary distribution.

| System | Decoding Method | dev-other WER [%] | RTF |
|---|---|---|---|
| CTC Baseline | Greedy | 5.08 | 0.002 |
| AR LM (24L, 1024 dim) | First-pass | 3.86 | 0.078 |
| MDLM (24L, 25 ep, K=256) | Rescoring | 4.47 | 2.040 |
| USDM (24L, 10 ep, K=256) | Rescoring | 4.71 | 2.086 |
| CTC-USDM (24L, L=1, t_start=0.1) | Joint-Decoding | 4.66 | 0.003 |

## Limitations

The study evaluates diffusion LMs exclusively on the LibriSpeech corpus, leaving multilingual and low-resource generalizability unverified. Diffusion LM rescoring remains computationally expensive at high Monte Carlo sample counts (e.g., K = 256 yields an RTF around 2.04). Furthermore, autoregressive LMs still outperform diffusion-based approaches in raw accuracy on both rescoring and first-pass tasks under the tested data scale.

## Why read this

Speech and ML researchers looking for non-autoregressive alternatives to standard autoregressive LMs for ASR will find a rigorous formulation of MDLM rescoring adjustments and a pioneering blueprint for token-level joint decoding between CTC and uniform-state diffusion models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic speech recognition, high-throughput speech transcription pipelines, and non-autoregressive speech-to-text decoding.

## Related

- (link related pages by id as the wiki grows)
