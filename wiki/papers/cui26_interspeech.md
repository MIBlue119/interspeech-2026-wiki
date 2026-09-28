---
id: cui26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1141
pdf: https://www.isca-archive.org/interspeech_2026/cui26_interspeech.pdf
---

# TurnGuide: Enhancing Meaningful Full Duplex Spoken Interactions via Dynamic Turn-Level Text-Speech Interleaving

[PDF](https://www.isca-archive.org/interspeech_2026/cui26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cui26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1141)

**TL;DR** — TurnGuide is a turn-level text-speech interleaved framework for end-to-end full-duplex speech language models that dynamically segments assistant speech and jointly generates text and speech to improve semantic coherence and turn-taking behavior.

## Problem

End-to-end full-duplex speech language models (FD-SLMs) often experience conversational quality degradation compared to text-only models due to prolonged speech sequences and scarce high-quality conversational data. While text-speech interleaving can help, directly inserting discrete text tokens into continuous dual-channel audio disrupts precise temporal alignments and interaction fluency. Specifically, poorly timed or improperly sized text insertions lead to context hallucinations, overspeaking, or fragmented semantics.

## Method

The TurnGuide framework consists of a dynamic multi-modal turn segmentation and alignment module followed by a text-guided dialogue modeling framework. It first applies Pyannote for Voice Activity Detection and merges segments into Inter-Pausal Units (IPUs) using a 0.5-second threshold, then uses the Whisper medium model with whisper-timestamped for word-level timestamps and text alignment. The aligned data is fed into an off-the-shelf GLM-4-Voice backbone using chunk-level channel-wise interleaving (chunk size of 5 frames corresponding to 400-ms audio segments at 12.5 Hz). Text tokens are injected at the start of each assistant speech turn to supply semantic guidance without corrupting temporal coordination.

## Results

The paper evaluates TurnGuide on double-channel conversational datasets (such as the Fisher corpus), comparing it against baseline end-to-end FD-SLMs like dGSLM, SyncLLM, Moshi, and NTPP. Experiments demonstrate that TurnGuide substantially enhances semantic coherence and yields state-of-the-art performance across diverse turn-taking events including smooth turn-taking, backchanneling, and parallel speaking. Ablation studies confirm the effectiveness of the proposed dynamic turn segmentation and appropriate insertion length strategies compared to naive token-level text insertion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building real-time full-duplex conversational agents, voice assistants, and spoken dialogue systems that require natural interruption and overlap handling.

## Related

- (link related pages by id as the wiki grows)
