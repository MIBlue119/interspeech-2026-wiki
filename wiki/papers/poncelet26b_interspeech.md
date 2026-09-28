---
id: poncelet26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1041
pdf: https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.pdf
---

# Towards Deep Contextual Reasoning from Broad Descriptions for ASR with Speech-LLM via Metadata-Driven Reasoning Chains

[PDF](https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poncelet26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1041)

**TL;DR** — This paper proposes a chain-of-thought fine-tuning method for speech-LLMs to perform deep contextual reasoning using video metadata descriptions, reducing overall WER to 9.3% and rare word WER to 23.1% on held-out academic lecture test sets.

## Problem

Standard automatic speech recognition systems and speech-LLMs struggle with rare, acoustically ambiguous domain-specific terms and named entities because existing contextualization techniques rely narrowly on rigid keyword or phrase lists rather than broad semantic reasoning. While text-only LLMs can leverage broad topic descriptions, cascaded post-editing pipelines lack acoustic grounding and often introduce hallucinations or corrections unsupported by the audio. This work bridges that gap by enabling speech-LLMs to use broad topic descriptions as weak semantic priors while remaining strictly constrained by actual acoustic evidence.

## Method

The authors construct a 400-hour reasoning-augmented speech dataset by pairing YouTube-derived audio (from GigaSpeech, SlideSpeech, and SlideAVSR) with cleaned video titles, descriptions, and tag metadata. Using text-based LLMs (Qwen2.5-32B and Qwen2.5-14B), they generate stepwise reasoning chains that link erroneous ASR hypotheses and context descriptions to reference transcripts. They fine-tune Qwen2-Audio-7B via QLoRA on linear layers using a 50/50 mix of pure ASR data and reasoning data, masking loss on initial transcripts so the model learns to output a baseline hypothesis, reason over the context, and output an acoustically grounded correction.

## Results

Evaluated on the held-out M3AV academic lecture test set (filtered for named entities), the proposed method achieves a global word error rate (WER) of 9.3%, a rare word WER of 23.1%, and a named entity WER of 23.3%, outperforming standard transcription (11.1% global), context-prompted transcription (10.4%), and two-stage text-LLM post-correction baselines. Ablations show that training with the full reasoning-augmented dataset outperforms subsets relying solely on filtered or named-entity-only chunks. The approach consistently improves recognition on rare terminology and domain-specific named entities compared to keyword-biasing or traditional speech-LLM baselines.

## Code

- https://huggingface.co/datasets/kul-speech-lab

## Applications

Engineers building speech recognition and transcription systems for academic lectures, specialized meetings, or multi-domain media archives where broad topic metadata is available.

## Limitations

The scope is restricted to contextual biasing and correction of named entities and rare words, purposefully omitting general audio-only or grammatical spelling errors.

## Related

- (link related pages by id as the wiki grows)
