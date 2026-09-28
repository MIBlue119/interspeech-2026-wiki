---
id: cui26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1141
pdf: https://www.isca-archive.org/interspeech_2026/cui26_interspeech.pdf
---

# TurnGuide: Enhancing Meaningful Full Duplex Spoken Interactions via Dynamic Turn-Level Text-Speech Interleaving

*Wenqian Cui, Lei Zhu, Xiao-Hui Li, Zhihan Guo, Haoli Bai, Lu Hou, Irwin King*

[PDF](https://www.isca-archive.org/interspeech_2026/cui26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cui26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1141)

**TL;DR** — TurnGuide is a turn-level text-speech interleaved framework for end-to-end full-duplex speech language models that dynamically segments assistant speech into turns and jointly generates text and speech tokens, achieving over 30% performance gains in semantic coherence over speech-only baselines.

## Key contributions

- Proposes a turn-level text-speech interleaved generation approach grounded in natural double-channel conversational data for end-to-end full-duplex SLMs.
- Introduces a dynamic multi-modal turn segmentation and alignment framework utilizing VAD, word-level ASR timestamps, and IPU merging to resolve text insertion timing and length challenges.
- Implements a text-guided full-duplex dialogue modeling framework combining channel-wise chunk-level interleaving with turn-level text-speech interleaving (5:5 token ratio).
- Demonstrates substantial semantic quality improvements and superior performance across diverse turn-taking events (pause handling, backchanneling, smooth turn-taking, and user interruptions).

## Problem

End-to-end full-duplex speech language models (FD-SLMs) learn directly from dual-channel audio conversations to model natural dialogue dynamics like interruptions and overlapping speech, but their conversational quality often degrades compared to text-only LLMs due to long speech sequences and scarce high-quality training data. Prior text-guided attempts like Moshi fragment text semantics excessively by inserting text tokens instantly at sound generation time. Furthermore, naive text insertion in full-duplex models disrupts temporal alignment and interaction fluency because inserting text too early causes hallucinations due to missing user context, while inserting it too late causes assistant speech to precede text, ruining guidance efficacy.

## Method

TurnGuide builds upon the 9B parameter GLM-4-Voice backbone, leveraging its existing speech tokenizer, language model, and vocoder. The method first runs VAD via pyannote on input audio, merges segments into Inter-Pausal Units (IPUs) with a 0.5-second threshold, extracts word-level ASR timestamps, and groups words into dialogue turns using a 0.6-second tolerance parameter to form aligned text-speech training pairs (Wj, Sj).

For dialogue modeling, it adopts two interleaving strategies: channel-wise chunk-level interleaving for audio and text-speech interleaving for the assistant. Audio is split into chunks of 5 tokens (400 ms at 12.5 Hz frame rate) prefixed with unique speaker ID tokens (UID, AID). Assistant text is split into chunks of 5 tokens (τTC=5) terminated by an <EOC> (end-of-chunk) token, and interleaved at the corresponding speech chunk computed via the timestamp of the first text token in each turn. This 5:5 chunk ratio ensures text generation precedes speech.

During training, text token loss weights are increased relative to speech tokens (tested at 2:1 and 3:1 ratios). The models are trained on 2,000 hours of the Fisher dataset for 2 epochs using a global batch size of 256, a learning rate of 4e-6 with a cosine scheduler, and 20 warmup steps.

## Experimental setup

Evaluated on the Fisher dataset (2,000 hours of telephone conversations, split into 120-second clips for training/validation/test). Compared against dGSLM, Speech Token Interleaving (STI), Speech Chunk Interleaving (SCI), Moshi (7B), and Moshi Training Strategy (Moshi TS). Metrics include GPT-4o semantic evaluation scores (rescaled to 0-10), Perplexity (using Fisher-text, GLM-4-Voice, and Llama-3.1-8B-Instruct), Full-Duplex-Bench for fine-grained turn-taking behaviors (TOR, JSD, latency), and corpus-level Pearson correlation for IPU occurrences and durations.

## Results

TurnGuide achieves an average GPT semantic score of 7.27 to 7.79 (with 2:1 and 3:1 loss weighting), substantially outperforming SCI (5.91) and Moshi TS (5.58), representing over 30% performance gains. In terms of interaction naturalness evaluated on Full-Duplex-Bench, TurnGuide yields superior pause handling and backchannel frequency metrics compared to dGSLM and Moshi baselines. Corpus-level Pearson correlation metrics show that TurnGuide maintains conversational dynamics comparable to baselines while drastically improving semantic relevance.

| SLM | Conditional - All (AVG) | Conditional - Assistant (AVG) | Overall Semantic AVG |
|---|---|---|---|
| dGSLM | - | - | - |
| STI | 4.76 | 3.79 | 4.76 |
| SCI | 5.85 | 4.94 | 5.91 |
| Moshi TS | 5.33 | 4.67 | 5.58 |
| TurnGuide (1:1) | 6.76 | 6.48 | 7.27 |
| TurnGuide (L2:1) | 7.03 | 7.03 | 7.70 |

## Limitations

Validation is restricted to the Fisher dataset, a telephone conversation corpus that may not capture the diversity of broader real-world conversational scenarios. Evaluation relies heavily on automated GPT-4o scoring, which may not fully mirror nuanced human perceptions. Furthermore, chunk interleaving creates a theoretical streaming latency floor around 0.69 seconds due to vocoder constraints requiring at least 10 tokens for acoustic stability.

## Why read this

Speech and ML researchers building full-duplex conversational agents should read this paper to learn how to effectively combine text semantic guidance with dual-channel audio modeling without breaking conversational flow or temporal alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time spoken dialogue systems, voice assistants, and multi-speaker podcast generation.

## Related

- (link related pages by id as the wiki grows)
