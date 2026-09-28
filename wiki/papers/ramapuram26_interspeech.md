---
id: ramapuram26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2980
pdf: https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.pdf
---

# Scaling Properties of Continuous Diffusion Spoken Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2980)

**TL;DR** — This paper investigates continuous diffusion spoken language models, demonstrating that they follow predictable scaling laws and scaling up to 16 billion parameters on 7 million hours of data.

## Problem

Discrete autoregressive spoken language models face severe computational bottlenecks and data demands due to the necessity of tokenizing continuous speech. This creates a performance gap compared to text-based models, prompting an investigation into whether continuous diffusion can serve as a more viable paradigm for spoken language modeling.

## Method

The authors employ a continuous diffusion framework operating directly on 80-dimensional log-mel filterbanks extracted at 24kHz with a 50ms window and 12.5ms hop. The architecture is based on the Multimodal Diffusion Transformer (MM-DiT), scaling model dimensions via the parameter-to-depth ratio $d_{emb}/L = 128$, with separate bidirectional self-attention streams for context and continuation segments. Training utilizes a velocity-prediction parameterization weighted by min-SNR loss, using a zeroed speech signal for classifier-free guidance at inference rather than explicit dropping during training. The models are trained on SpeechCrawl, a filtered 7-million-hour multilingual conversational speech dataset.

## Results

Validation loss follows standard power-law scaling trends with respect to compute, data size, and model parameters. To evaluate linguistic capacity without factorized likelihoods, the paper introduces the phoneme Jensen-Shannon divergence (pJSD), which shows that learned languageness follows predictable scaling laws. Standard perceptual quality metrics generally do not exhibit scaling laws and plateau near real-data baselines, whereas certain Meta Audiobox Aesthetics dimensions (content enjoyment and usefulness) scale predictably. The approach is scaled up to a 16-billion-parameter model, capable of generating diverse, emotive, and multilingual speech.

## Code

- https://github.com/apple/ml-diffuslm

## Applications

Speech and machine learning engineers building foundational audio-generative models, textless spoken dialogue systems, and large-scale multilingual speech synthesis architectures.

## Limitations

Despite scaling up to 16 billion parameters, achieving long-form linguistic coherence remains a significant challenge, indicating that current datasets and scaling limits are insufficient for full semantic understanding without structural paradigm shifts.

## Related

- (link related pages by id as the wiki grows)
