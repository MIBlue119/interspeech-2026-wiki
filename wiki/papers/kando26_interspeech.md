---
id: kando26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, generative-model]
institutions: ["University of Tokyo", "Keio University"]
code: https://github.com/gifdog97/espnet/tree/master/egs2/ljspeech/tts1/myscripts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-999
pdf: https://www.isca-archive.org/interspeech_2026/kando26_interspeech.pdf
---

# On the Effect of Segmentation Width and Cluster Size on Speech Resynthesis and Continuation in Generative Spoken Language Models

*Shunsuke Kando, Wataru Nakata, Shinnosuke Takamichi, Yusuke Miyao*

[PDF](https://www.isca-archive.org/interspeech_2026/kando26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kando26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-999)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — Investigating Generative Spoken Language Modeling (GSLM) across various bitrates reveals that wider segmentation and larger cluster sizes reduce sequence length and bitrate without degrading speech resynthesis or continuation quality. LLM-as-a-judge metrics correlate better with human subjective scores than traditional perplexity/diversity metrics, though overall correlation remains low.

## Key contributions

- Systematically evaluates GSLM speech resynthesis and continuation across 64 distinct speech-to-unit (s2u) configurations varying segmentation width (N=20 to 280 ms) and K-means cluster size (K=128 to 16384).
- Demonstrates that moderately large segmentation widths (e.g., N=80–120 ms) achieve speech resynthesis and continuation quality comparable to the baseline N=20 ms setting while drastically reducing bitrate.
- Compares Tacotron2 and VITS unit-to-speech (u2s) decoders, showing Tacotron2 excels in intelligibility (WER) while VITS excels in acoustic quality.
- Shows that LLM-as-a-judge pairwise metrics correlate better with human Meaningfulness MOS (MMOS, SRCC=0.323) than traditional PPL or VERT metrics.

## Problem

Conventional Generative Spoken Language Models (GSLMs) use fine-grained discrete speech units extracted via self-supervised learning with small segmentation widths (e.g., HuBERT frame shifts of N=20 ms). This produces extremely long unit sequences compared to text, causing quadratic computational cost blowups in Transformer language models and redundant modeling capacity. While recent zero-shot spoken language understanding studies suggest that wider segmentation and larger cluster sizes enhance efficiency, it remains unknown whether this holds for speech synthesis and continuation tasks.

## Method

The pipeline consists of three stages: speech-to-unit (s2u), unit language modeling (uLM), and unit-to-speech (u2s). Continuous features are extracted from the 9th layer of HuBERT-base and segmented into fixed widths of N ms (multiples of 20 ms up to 280 ms), mean-pooled per segment, deduplicated, and quantized using K-means models with cluster sizes K from 2^7 (128) to 2^14 (16384). The resulting discrete unit sequences are fed into a Transformer-based autoregressive unit LM (OPT architecture trained on 960 hours of LibriSpeech).

For the final speech generation stage (u2s), two decoder models are evaluated: Tacotron2 paired with a Parallel WaveGAN vocoder, and VITS (an end-to-end unit-to-speech model with a monotonic alignment search mechanism). Models are trained on LJSpeech. Bitrate is modulated by combining segmentation width N and cluster size K, reducing sequence length to alleviate Transformer computational overhead while preserving semantic and acoustic fidelity.

## Experimental setup

K-means quantization models are trained on the 100-hour clean LibriSpeech subset; unit LMs are trained on the full 960-hour LibriSpeech corpus. Unit-to-speech models (Tacotron2 and VITS) are trained on LJSpeech. Evaluations use OpenAI's Whisper-large-v3 for ASR/WER transcription, Llama-3.1-8B for perplexity, GPT-4.1-mini for LLM-as-a-judge pairwise comparisons, UTMOS and MCD/LogF0 RMSE for acoustic quality, and human evaluations (Meaningfulness MOS and AB tests).

## Results

Moderately large segmentation widths (N=40 to 80 ms) match the baseline N=20 ms speech resynthesis quality, with Tacotron2 achieving lower WER (often <5%) and VITS achieving lower MCD and UTMOS (>4). For speech continuation, configurations like N=120 ms with K=2^13 and N=80 ms with K=4^4 (or 4096) achieve perplexity and diversity scores on par with or superior to the standard N=20 baseline.

In human AB tests, the lower-bitrate configuration (80, 4096) outperforms baseline (20, 256) with a win rate of 0.558 (p < 0.05). However, traditional metrics like PPL show negative or near-zero correlation with human Meaningfulness MOS (-0.105), whereas LLM-as-a-judge achieves a statistically significant Spearman rank correlation of 0.323.

| System / Condition | WER (%) | UTMOS | LLM-as-a-Judge Avg Score | Meaningfulness MOS |
|---|---|---|---|---|
| Baseline (N=20, K=256) | < 5.0 | > 4.0 | 0.00 | 2.52 |
| Proposed (N=40, K=256) | < 5.0 | > 4.0 | +0.05 | 2.50 |
| Proposed (N=80, K=4096) | < 5.0 | > 4.0 | +0.18 | 2.62 |
| Proposed (N=120, K=4096)| < 5.0 | > 4.0 | +0.21 | 2.48 |

## Limitations

Experiments are restricted to English datasets (LibriSpeech and LJSpeech) and single-speaker or limited multi-speaker domains, leaving cross-lingual and massive multilingual generalization unverified. The study relies primarily on HuBERT-base representations from a single layer (layer 9) and fixed acoustic decoders (Tacotron2/VITS), meaning findings may shift with larger SSL backbones or modern flow-matching/diffusion decoders. Furthermore, automatic evaluation metrics still exhibit weak correlation with human perceptual judgments, indicating a need for more robust assessment frameworks.

## Why read this

Speech and ML engineers building generative spoken language models or textless audio tokenizers should read this to understand how trading off sequence length and bitrate via segmentation width and cluster size impacts synthesis quality, offering a path to dramatically more efficient tokenization.

## Code

- https://github.com/gifdog97/espnet/tree/master/egs2/ljspeech/tts1/myscripts

## Applications

Efficient generative spoken language models, textless speech-to-speech translation systems, and zero-shot spoken dialogue agents.

## Institutions / 機構

University of Tokyo, Keio University

**Funding / 經費:** JST ACT-X, JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
