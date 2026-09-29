---
id: poncelet26b_interspeech
category: asr
labels: [self-supervised]
institutions: ["KU Leuven"]
code: https://huggingface.co/datasets/kul-speech-lab/contextual-reasoning-speechllm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1041
pdf: https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.pdf
---

# Towards Deep Contextual Reasoning from Broad Descriptions for ASR with Speech-LLM via Metadata-Driven Reasoning Chains

*Jakob Poncelet, Hugo Van hamme*

[PDF](https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1041)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper introduces a chain-of-thought training method for speech-LLMs that leverages broad video metadata descriptions to perform deep contextual reasoning, reducing word error rates on rare words and named entities across multiple benchmark sets.

## Key contributions

- A data construction pipeline that generates 400 hours of reasoning-augmented speech data pairing erroneous transcripts with cleaned video metadata and LLM-generated correction rationales.
- A chain-of-thought ASR training formulation where the speech-LLM generates an initial transcript, performs contextual reasoning, and outputs a final corrected transcript.
- Extensive empirical evaluation across multiple model architectures (Qwen2-Audio, Qwen2.5-Omni, Audio-Flamingo-3, Ultravox) demonstrating robust improvements on rare words and named entities.

## Problem

Modern end-to-end ASR and speech-LLMs struggle with rare, domain-specific terminology and context-dependent named entities that are acoustically ambiguous. Traditional contextualization mechanisms rely rigidly on narrow keyword or phrase bias lists that do not scale well and degrade or hallucinate as lists grow. While text-only LLMs excel at utilizing broad topical world knowledge, cascaded speech-then-text systems lack acoustic grounding and fail to verify whether text-only corrections are actually supported by the audio evidence.

## Method

The approach consists of a two-stage framework: metadata-driven reasoning chain generation and chain-of-thought speech-LLM finetuning. First, audio data from GigaSpeech (975h), SlideSpeech (473h), and SlideAVSR (29h) is merged into longer segments averaging 7 seconds. YouTube video titles, descriptions, and tags are extracted via Google APIs and cleaned using Qwen2.5-14B-Instruct-AWQ-4bit to strip URLs and extract semantic entity tags. Erroneous speech hypotheses are generated using multiple Whisper variants (large-v3, small, base, tiny) combined with LLM-injected synthetic errors (using Qwen2.5-32B-Instruct-AWQ-4bit) for named entities and rare words. A text LLM then creates step-by-step reasoning explanations linking the hypothesis, reference, and context to justify necessary corrections.

In the second stage, speech-LLMs are finetuned using a structured chain-of-thought output format: <initial-text> - <reasoning> - <final-text>. Training mixes pure ASR data and context-reasoning data in a 50/50 batch ratio, where initial transcription loss is masked so the model only incurs loss on the reasoning chain and final corrected transcript. Optimization uses QLoRA on all LLM linear layers except the prediction head (rank 32 or 16, alpha 64, dropout 0.05), training for 1-5 epochs with an effective batch size of 128, an 8-bit Adam optimizer, a linear decaying learning rate peaking at 1e-4, 100 warmup steps, and 0.1 weight decay. The underlying audio encoder and projector remain completely frozen.

## Experimental setup

Evaluated on the M³AV test set (filtered to 3.9k examples/9 hours containing named entities), SlideSpeech test set (8 hours, 3.2k examples), and SlideAVSR test set (4 hours, 2.1k examples). Compared against non-finetuned models, standard ASR transcribe tasks, contextual ASR transcribe tasks with context prompts, and two-stage transcribe baselines without explicit reasoning chains. Backbones tested include Qwen2-Audio-7B, Qwen2.5-Omni-7B, Audio-Flamingo-3 (7B), and Ultravox-v0.5-8B (8B). Metrics reported are Global Word Error Rate (All), Rare Word Error Rate (Rare), and Named Entity Error Rate (NE).

## Results

On the M³AV test set using Qwen2-Audio-7B, the proposed two-stage reasoning model trained on the M dataset achieves a global WER of 9.3% (improving over the 9.8% contextual transcribe baseline), with rare word WER dropping to 23.1% and named entity WER dropping to 23.3%. Across alternative models like Qwen2.5-Omni-7B, the reasoning variant on the M split reduces rare word WER from 20.1% to 17.4% and named entity WER from 20.9% to 18.3%. 

Ablations on dataset splits show that filtering reasoning chains (the M set) consistently instills better reasoning capabilities than unfiltered large sets (the L set). The approach sees smaller gains on test sets like SlideSpeech and SlideAVSR due to fewer context-related rare keywords in those specific presentations.

| System / Condition | All WER (%) | Rare WER (%) | NE WER (%) |
| --- | --- | --- | --- |
| Qwen2-Audio (Base, Transcribe) | 13.1 | 30.0 | 28.9 |
| Qwen2-Audio (S split, C-ASR) | 11.0 | 27.9 | 26.9 |
| Qwen2-Audio (S split, Reason) | 11.0 | 26.3 | 26.1 |
| Qwen2-Audio (M split, C-ASR) | 9.8 | 24.2 | 23.8 |
| Qwen2-Audio (M split, Reason) | 9.3 | 23.1 | 23.3 |
| Qwen2-Audio (L split, Reason) | 9.5 | 23.4 | 23.6 |

## Limitations

The reliance on broad descriptive metadata rather than time-aligned keywords limits the magnitude of word error rate improvements, especially on shorter audio segments. Reasoning chains can occasionally be far-fetched or incorrect, leading to a non-zero percentage of negative impacts on transcription accuracy. The study is computationally constrained to models of the 7B-8B parameter scale, leaving larger frontier reasoning models unexplored.

## Why read this

Researchers and engineers building speech-LLMs or contextual ASR systems will learn how to synthesize structured rationale supervision from noisy video metadata to bridge text-world knowledge with acoustic grounding.

## Code

- https://huggingface.co/datasets/kul-speech-lab/contextual-reasoning-speechllm

## Applications

Improving automatic speech recognition systems for domain-specific lectures, academic presentations, media broadcasts, and social media videos rich in topical metadata.

## Institutions / 機構

KU Leuven

**Funding / 經費:** Research Foundation Flanders, Flemish Government, Flanders AI Research Program

## Related

- (link related pages by id as the wiki grows)
