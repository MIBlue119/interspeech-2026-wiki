---
id: zorila26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3291
pdf: https://www.isca-archive.org/interspeech_2026/zorila26_interspeech.pdf
---

# From Noisy Speech to Accurate APIs: LLM-driven Embedding Steering for Resilient Tool Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/zorila26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zorila26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3291)

**TL;DR** — A training-free embedding-steering method uses LLM-generated synthetic user queries to enrich API descriptions, improving speech-to-API tool retrieval accuracy across noisy and clean acoustic conditions.

## Problem

API descriptors are often non-standardized, noisy, and poorly aligned with the training distributions of text embedding models, creating retrieval bottlenecks. In speech-driven interfaces, these issues are severely amplified by ASR transcription errors resulting from environmental noise and reverberation. Existing document and query expansion techniques are primarily built for static text corpora and fail to handle complex functional argument schemas or severe input corruptions.

## Method

The approach utilizes the Qwen3-8B LLM to offline generate up to 10 diverse user-style queries, use-case scenarios, and task fragments (3–12 words) for each API descriptor. The embeddings of these synthetic queries are averaged to produce a representative steering vector, which is then blended with the original API description embedding using a weighted interpolation parameter alpha. Experiments evaluate text-to-API benchmarks using four different embedding backbones: bert-base-uncased (110M), ToolRetriever (110M), bge-base-en-v1.5 (109M), and bge-large-en-v1.5 (335M). Speech queries are synthesized using WhisperSpeech TTS, augmented with random room reverberation via Pedalboard and speech-shaped noise at -5 to 5 dB SNR, and transcribed using Whisper base ASR.

## Results

Evaluated on Gorilla-HF, Ultratool, and ToolACE datasets using Normalized Discounted Cumulative Gain (NDCG@1, @3, @5). Across all models and datasets, setting alpha=0.5 yields consistent retrieval gains for clean text (q0), clean ASR transcripts (qc), and noisy ASR transcripts (qn). For instance, with bge-large-en-v1.5, average N@1/N@3/N@5 on clean text improves from 52.7/56.8/60.3 to 60.5/64.9/68.3, and on clean ASR transcripts from 47.6/51.8/55.3 to 55.0/59.3/62.8. Even under severe noise conditions where baseline ASR word error rates exceed 70%, embedding steering delivers robust improvements, such as lifting bge-large-en-v1.5 noisy average N@1 from 19.3 to 20.5.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational AI assistants, voice-controlled agents, and automated reasoning systems that need to accurately map spoken user commands to modular software APIs and function-calling tools.

## Limitations

Performance gains eventually saturate as the number of generated steering queries K grows large due to semantic redundancy.

## Related

- (link related pages by id as the wiki grows)
