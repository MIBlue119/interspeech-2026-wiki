---
id: kando26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-999
pdf: https://www.isca-archive.org/interspeech_2026/kando26_interspeech.pdf
---

# On the Effect of Segmentation Width and Cluster Size on Speech Resynthesis and Continuation in Generative Spoken Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/kando26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kando26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-999)

**TL;DR** — This paper demonstrates that generative spoken language models can maintain speech synthesis and continuation quality at lower bitrates by increasing segmentation width and cluster size, challenging the redundancy of conventional fine-grained representations.

## Problem

Standard Generative Spoken Language Modeling (GSLM) relies on high-bitrate discrete speech tokens extracted from self-supervised learning models, resulting in excessively long sequences that scale quadratically and inflate Transformer training costs. While prior work addressed sequence length reduction for understanding tasks, its impact on speech resynthesis and continuation remained unverified. Determining how quantization bitrates affect generative speech performance is critical for efficient textless spoken language modeling.

## Method

The authors systematically evaluate 64 different speech-to-unit (s2u) configurations by combining 8 segmentation widths from 20 ms to 280 ms (using HuBERT-base 9th layer representations) and 8 K-means cluster sizes from 2^7 to 2^14. Deduplicated discrete units are fed into an OPT language model trained on LibriSpeech (960 hours) for unit-level language modeling (uLM). For unit-to-speech (u2s) generation, they train both Tacotron2 (with Parallel WaveGAN) and VITS models on LJSpeech. Evaluation spans objective metrics, LLM-as-a-judge pairwise evaluations, and human listening tests.

## Results

Experiments on LibriSpeech and LJSpeech reveal that moderately large segmentation widths (e.g., 40 ms to 80 ms) and larger cluster sizes preserve speech resynthesis intelligibility (WER below 5%) and naturalness (UTMOS above 4) comparable to the baseline N=20 setting while lowering bitrates. For speech continuation, configurations with larger segmentation widths achieve stability matching or exceeding the baseline across perplexity and diversity metrics. Tacotron2 excels in phonetic intelligibility, whereas VITS dominates in acoustic fidelity metrics like MCD and UTMOS. Human AB tests confirm that lower-bitrate configurations can outperform or match standard baselines in subjective preference.

## Code

- https://github.com/gifdog97/espnet/tree/master/egs2/ljspeech/tts1/myscripts

## Applications

Speech and ML engineers building textless spoken dialogue systems, text-to-speech pipelines, or generative spoken language models seeking to reduce computational overhead without sacrificing quality.

## Limitations

Automatic evaluation metrics like perplexity and diversity show limited correlation with human subjective scores, indicating a broader need for more robust evaluation frameworks in speech continuation.

## Related

- (link related pages by id as the wiki grows)
