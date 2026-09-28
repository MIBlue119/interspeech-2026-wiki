---
id: ye26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-21
pdf: https://www.isca-archive.org/interspeech_2026/ye26_interspeech.pdf
---

# Which Speech Representation Better Matches Text-Native Reasoning? A Study of Speech-Text Alignment on Frame Rate and Representation

*Zhen Ye, Xu Tan, Yiming Li, Guangyan Zhang, Chimin Chan, Haohe Liu, Zhengxi Liu, Hongzhan Lin, Zheqi Dai, Xinshen Zhang, Peiwen Sun, Qiuqiang Kong, Wei Xue*

[PDF](https://www.isca-archive.org/interspeech_2026/ye26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-21)

**TL;DR** — This paper investigates how speech token design and temporal frame rate impact cross-modal reasoning in a frozen text LLM. By combining factorized FSQ with a non-autoregressive audio head and intermediate-layer contrastive alignment, the model achieves competitive speech-to-speech QA using only ~2.5k hours of training data.

## Key contributions

- Identifies temporal-granularity mismatch in spoken dialogue models and systematically sweeps speech frame rates from 50 Hz down to 2.08 Hz under a controlled 600 bits/sec information rate.
- Proposes factorized Finite Scalar Quantization (FSQ) paired with a lightweight non-autoregressive (NAR) transformer audio LM head to bypass high-rate information bottlenecks.
- Introduces intermediate-layer InfoNCE contrastive alignment to bridge the cross-modal semantic gap between speech and text representations.
- Demonstrates data-efficient speech QA performance using a frozen 4B/8B text LLM backbone with only ~100M-150M trainable parameters.

## Problem

Spoken dialogue models built on text LLM backbones frequently suffer from a modality gap where reasoning degrades when conditioning on speech instead of text. Prior end-to-end systems operate at high frame rates (12.5-50 Hz) and rely on costly full-model adaptation, which entangles LLM adjustments with speech representation changes. The authors argue that this degradation stems from a temporal-granularity mismatch: excessive speech token redundancy dilutes semantic density per token and disrupts text-native reasoning dynamics.

## Method

The authors keep the text LLM backbone (Qwen3-4B/8B) and Whisper-Large-v3 speech encoder entirely frozen, training only a strided convolutional input projector and a lightweight NAR audio LM head. To support extreme downsampling down to 2.08 Hz without codebook exhaustion, they employ factorized FSQ: a d-dimensional feature vector is split into n groups of size dg, where each scalar is independently quantized to L discrete levels. This factorizes an intractable L^d vocabulary into n parallel L^(d/n)-way predictions. Group-specific slot embeddings are added to the frozen LLM hidden states, and a 2-layer NAR transformer processes all n slot-augmented vectors via self-attention before a shared classifier predicts the tokens.

To align modalities without altering the LLM backbone, an InfoNCE contrastive loss (tau=0.07, lambda=0.1) is applied using utterance-level temporally-averaged hidden states extracted from an intermediate layer of the frozen LLM. Training proceeds in three progressive stages: (1) Speech-to-text (ASR) on LibriSpeech-960h for 5 epochs using AdamW and linear warmup over 3% of steps; (2) Text-to-speech (TTS) keeping speech tokens fixed; and (3) Speech-to-speech QA on InstructS2S-200k (1.5k hours) with multi-task supervision (S2S QA primary, S2S text-to-speech and speech-to-text as auxiliaries) for 3 epochs at learning rate 1e-4.

## Experimental setup

Evaluated on LibriSpeech-960h (ASR), SeedTTS test-en (tokenizer reconstruction), and QA benchmarks including Web Questions, Llama Questions, and TriviaQA. Downsampling factors span 1x (50 Hz) to 24x (2.08 Hz) under a fixed information rate of 600 bits/s. Baselines include CosyVoice2, Moshi (7B), and scaling interleave models. Metrics include WER, SIM, UTMOS, and GPT-4o judged QA accuracy.

## Results

Under a fixed 600 bits/s information budget, ASR WER follows a U-shaped curve with optimal performance at intermediate rates (test-clean: 2.39-3.90%, test-other: 5.97-8.16%), proving factorized FSQ avoids low-rate collapse. For speech QA, performance peaks at 4.17 Hz and 6.25 Hz (Llama Questions score 30.7 at 4.17 Hz) rather than the average text rate of 3.32 Hz, because a slightly higher rate provides a buffer for utterance variance within the LLM's length tolerance window.

Ablations reveal that removing the NAR transformer head causes TTS WER to degrade severely from 1.83/1.90 to 10.17/12.73. Furthermore, performing contrastive alignment at the middle LLM layer (L/2) yields the strongest gain (+7.4 points over unaligned), outperforming embedding-level (-1.6 points) and late-layer (3L/4, +4.4 points) alignment. The 4B model (trained on 2.5k hours) outperforms Moshi (7M hours) across all QA benchmarks, while the 8B model achieves competitive results against systems utilizing 100B-200B tokens.

| System | Train Params | Data | Web Q. | Llama Q. | Trivia QA |
|---|---|---|---|---|---|
| Moshi (7B) [1] | 7B | 7M hrs | 9.2 | 21.0 | 7.3 |
| Scaling Interleave [33] | 9B | 200B tok | 13.3 | 44.0 | 18.7 |
| Ours (4B) | ~100M | 2.5k hrs | 7.9 | 30.7 | 11.9 |
| Ours (8B) | ~150M | 2.5k hrs | 12.2 | 39.3 | 17.6 |

## Limitations

The study evaluates only English read speech (LibriSpeech) and InstructS2S-200k, meaning generalization to noisy, conversational, or multilingual audio remains unproven. Experiments are restricted to the Qwen3 model family (4B and 8B), and baseline comparisons are cross-architecture rather than controlled on identical backbones. Additionally, the system relies on Whisper-Large-v3 features and lacks explicit fine-tuning of the LLM backbone.

## Why read this

Speech and ML researchers building spoken dialogue systems should read this to understand how token frame rate and intermediate-layer contrastive alignment govern cross-modal transfer in frozen LLMs, offering a data-efficient alternative to full-model adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

End-to-end spoken dialogue agents, real-time voice assistants, and low-resource speech-to-speech translation systems.

## Related

- (link related pages by id as the wiki grows)
