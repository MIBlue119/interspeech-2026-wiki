---
id: zhang26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-256
pdf: https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.pdf
---

# Step-Audio-R1: Why Audio LLMs Fail at Reasoning — The Trap of Textual Surrogates

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-256)

**TL;DR** — Step-Audio-R1 introduces modality-grounded reasoning distillation to overcome audio LLMs' failure at test-time compute scaling, achieving 83.6% average speech-to-text benchmark accuracy.

## Problem

Existing audio language models typically suffer performance degradation when prompted to perform chain-of-thought reasoning, an anomaly known as inverted scaling. The authors trace this failure to 'textual surrogate reasoning,' where models deliberate over text transcripts and captions instead of analyzing underlying acoustic evidence due to text-based SFT initialization. This makes reasoning a liability rather than an asset for audio understanding.

## Method

The framework, Step-Audio-R1, uses a frozen Qwen2 audio encoder, an audio adaptor reducing frame rate to 12.5 Hz, and a Qwen2.5-32B LLM decoder. It is built via a cold-start phase using 5M samples mixing SFT and RLVR, followed by Modality-Grounded Reasoning Distillation (MGRD), an iterative self-distillation and multimodal reinforcement learning loop. MGRD selects perception-grounded audio tasks requiring timbral, temporal, pitch, and rhythmic analysis, filters responses for acoustic grounding and correctness, and applies PPO with a composite reward (0.8 accuracy + 0.2 format reward for <think> tags) without KL penalty.

## Results

Evaluated across MMSU, MMAU, Big Bench Audio, Spoken MQA, and Wild Speech, Step-Audio-R1 achieves an 83.6% average score, outperforming Gemini 2.5 Pro (81.5%) and approaching Gemini 3 Pro (85.1%). On Big Bench Audio speech-to-speech benchmarks, Step-Audio-R1 Realtime scores 96.1% with a 0.92s first-packet latency. Ablations show that including a think-format reward during RL prevents reasoning length collapse—which otherwise drops from 3000 down to under 1500 tokens—and improves MMAU accuracy from 76.5 to 77.7.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time spoken dialogue systems, voice assistants, and audio-understanding agents requiring complex logical, mathematical, or perceptual reasoning.

## Related

- (link related pages by id as the wiki grows)
