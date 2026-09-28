---
id: bonzi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1504
pdf: https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.pdf
---

# Enhancing Audio Reasoning via Semantic Summary Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1504)

**TL;DR** — The paper introduces SPARE, a fine-tuning strategy for Large Audio Language Models that aligns a sequence-initial register token with the terminal conclusion's semantic embedding, improving zero-shot audio reasoning accuracy on MMAU to 58.03%.

## Problem

Large Audio Language Models often suffer from a reasoning gap where generating long Chain-of-Thought sequences causes their internal attention to drift away from the input audio toward already generated text. This acoustic neglect leads to hallucinations and inferior accuracy compared to direct-answer prompting. Existing solutions rely on heavy reinforcement learning or black-box scaling rather than architectural or training-time regularization.

## Method

The method builds upon SALMONN 13B, which combines Whisper and BEATs encoders with a Vicuna LLM backbone. It injects a learnable register token immediately after the audio/prompt inputs and before the multi-stage Chain-of-Thought sequence (summary, caption, and reasoning). During training, a custom causal attention mask ensures subsequent tokens cannot attend to the register. A cosine similarity alignment loss is enforced between the register token's final hidden state and a Sentence-BERT embedding derived from the ground-truth conclusion text, with an optimal loss weight lambda of 2.0. At inference time, both the register token and the auxiliary projection head are discarded, introducing zero parameter or latency overhead.

## Results

Evaluated on the MMAU and MMAR benchmarks using SALMONN 13B as the base model, SPARE achieves 58.03% on MMAU and 40.32% on MMAR. This outperforms standard supervised fine-tuning on the 160k-sample YouTube8M/AF-Think dataset by 3.38% on MMAU and exceeds an audio-adapted MuToR baseline by 5.01%. Ablation studies show that a single sequence-initial register token outperforms multi-conclusion chapter summaries, and alignment weights of 1.0 or 3.0 remain superior to baselines though lambda equals 2.0 peaks performance. Attention map analyses confirm that SPARE forces stronger early-layer attention toward acoustic features.

## Code

- https://github.com/FrancescoBonzi/SPARE

## Applications

Speech and machine learning engineers developing Large Audio Language Models for complex, multi-step audio question answering and reasoning tasks.

## Limitations

Overly aggressive regularization weights such as lambda equals 3.0 introduce higher training variance and latent space instability.

## Related

- (link related pages by id as the wiki grows)
