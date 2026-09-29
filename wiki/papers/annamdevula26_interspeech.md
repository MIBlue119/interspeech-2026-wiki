---
id: annamdevula26_interspeech
category: tts
labels: [multilingual, generative-model]
institutions: ["Sony"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1744
pdf: https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.pdf
---

# CrossAccent-TTS: Cross-Lingual Accent-Intensity Controllable Text-to-Speech via Disentangled Speaker and Accent Representations

*Ram Annamdevula, Ankit Tatawat, Ashishkumar P. Gudmalwar, Nirmesh J. Shah, Pankaj Wasnik*

[PDF](https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1744)

**Category:** `tts` · **Labels:** `multilingual`, `generative-model`

**TL;DR** — CrossAccent-TTS introduces an Accent Intensity Controller and an adversarial Accent Suppression Module within a Qwen2.5-based LLM speech synthesizer to enable continuous, fine-grained accent modulation and cross-lingual accent conversion while preserving speaker identity. It achieves lower accent leakage and superior accent similarity compared to baseline systems on both Indic and L2-ARCTIC benchmarks.

## Key contributions

- Proposed an Accent Intensity Controller (AIC) enabling continuous accent modulation and smooth interpolation between accents at inference time without requiring dedicated multi-accent training data.
- Designed an adversarial Accent Suppression Module utilizing a gradient reversal layer (GRL) to disentangle accent and language information from speaker and style representations.
- Evaluated extensively across low-resource Indic multilingual datasets (986 hours) and the L2-ARCTIC English accent corpus, demonstrating consistent cross-lingual accent control.
- Integrated token-level language and accent conditioning into a scalable 0.5B parameter Qwen2.5 autoregressive neural codec TTS architecture.

## Problem

Mainstream LLM-based TTS systems offer strong cross-lingual generalization but lack explicit mechanisms to control accent characteristics and intensity during synthesis. Traditional methods either implicitly bundle accent inside high-dimensional speaker embeddings or rely heavily on massive labeled data, failing in low-resource and phonetically diverse settings like Indic languages. This lack of fine-grained control leads to either unnatural foreign accent leakage or uninformative, generic output, highlighting the need for explicit disentanglement of accent from speaker identity and timbre.

## Method

The system processes 16 kHz audio using Neucodec, a finite scalar quantization (FSQ)-based neural codec operating at 50 tokens per second (16 bits per token) with a 24 kHz upsampling decoder. Random chunks of acoustic tokens are sampled from reference utterances and fed into a Perceiver Resampler with learnable positional encodings, 32 latent slots ($N_s = 32$), and an embedding dimension $d = 768$ to yield fixed-length speaker and style embeddings. To strip residual accent and language information, an auxiliary classifier optimized via a Gradient Reversal Layer (GRL) adversarially forces the Perceiver Resampler to minimize accent-discriminative cues in the speaker representation.

For explicit accent control, a learned language embedding table yields vectors of shape $(B, 1, d)$ which are expanded across all latent slots and added to the speaker-style representations. This combined representation conditions an autoregressive decoder built on Qwen 2.5 (0.5B parameters), which jointly takes IPA text token embeddings to predict Neucodec acoustic tokens. The model is trained using an objective combining the decoder's autoregressive cross-entropy loss and the GRL adversarial classification loss (weighted by $\lambda_{\text{GRL}} = 0.1$).

At inference time, users can interpolate between distinct accent embeddings using a weighting factor $\lambda \in [0, 1]$ to scale accent intensity continuously (e.g., tested at 0, 0.3, 0.6, and 1.0), with the generated tokens decoded by Neucodec into time-domain waveforms.

## Experimental setup

Experiments use a 986-hour Indic multilingual corpus (636 hours in-house + 350 hours Emilia Yodas across Hindi, Telugu, Tamil, Bengali, Marathi, English) and the 27-hour L2-ARCTIC corpus comprising 24 speakers across six foreign English accents. Baselines include IndicF5 and XTTS-v2 for Indic evaluation, and CVAE-L, CVAE-NL, and GST for L2-ARCTIC. Metrics comprise UTMOS for speech quality, objective accent similarity and accent leakage via a fine-tuned GenAID model, and Resemblyzer-based speaker similarity, alongside MOS listening tests with 20 participants. The model is initialized from Qwen 2.5 (0.5B), trained for 5 epochs on the full Indic dataset, and fine-tuned for 3 additional epochs on L2-ARCTIC.

## Results

On the Indic multilingual dataset, the proposed framework achieves a UTMOS of 3.181, an accent leakage score of 0.203 (outperforming XTTS-v2's 0.284 and IndicF5's 0.312), and an accent similarity of 0.371 while maintaining a strong speaker similarity of 0.842. On the L2-ARCTIC English dataset, it reaches a UTMOS of 4.001 (substantially higher than GST's 3.044 and CVAE's ~2.7-2.8) and an accent similarity of 0.686, while holding accent leakage down to 0.439. Accent intensity analysis confirms that scaling $\lambda$ from 0 to 1.0 monotonically increases accent similarity scores from 0.203 to 0.336. The method does not uniformly dominate speaker similarity on every individual baseline condition, matching or slightly trailing GST on L2-ARCTIC speaker retention (0.693 vs 0.732).

| Model | UTMOS $\uparrow$ | AccLeak $\downarrow$ | AccSim $\uparrow$ | SpkSim $\uparrow$ |
|---|---|---|---|---|
| IndicF5 | 2.817 | 0.312 | 0.312 | **0.843** |
| XTTS-v2 | 3.168 | 0.284 | 0.284 | 0.832 |
| CVAE-L | 2.810 | 0.487 | 0.612 | 0.677 |
| GST | 3.044 | 0.544 | 0.670 | **0.732** |
| Proposed (Indic) | 3.181 | **0.203** | **0.371** | 0.842 |
| Proposed (L2-Arctic) | **4.001** | **0.439** | **0.686** | 0.693 |

## Limitations

Evaluated primarily on specific Indic and non-native English subsets, leaving generalization to extremely low-resource languages completely unverified outside the tested 6 Indic families and 6 foreign accents. The approach relies on pre-determined categorical language/accent labels for adversarial training and explicit conditioning, restricting fine-grained interpolation to predefined discrete accent pairs rather than capturing arbitrary continuous dialect manifolds. Real-time inference latency and computational overhead of the 0.5B Qwen-based autoregressive decoder on edge hardware are not quantified.

## Why read this

Read this paper if you are building multilingual or cross-lingual LLM-based TTS systems and need explicit, continuous control over accent intensity without retraining separate models for every dialect variant. It provides a clean recipe combining neural speech codecs, Perceiver resamplers, and adversarial GRL modules to achieve clean disentanglement.

## Code

- https://research.sri-media-analysis.com/interspeech26-cross-accent-tts/

## Applications

Personalized conversational bots, localized multi-accent voice dubbing, and expressive foreign-language computer-assisted language learning (CALL) tools.

## Institutions / 機構

Sony

## Related

- (link related pages by id as the wiki grows)
