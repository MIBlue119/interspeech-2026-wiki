---
id: mitra26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2493
pdf: https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.pdf
---

# Adaptive Turn-Taking for Real-time Multi-Party Voice Agents

[PDF](https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2493)

**TL;DR** — ModeratorLM conditions real-time multi-party conversational agents on explicit assistant roles, improving turn-taking precision by over 40% and recall by more than 70%.

## Problem

Traditional conversational agents are primarily built for dyadic interactions and rely on simple silence or pause detection, which fails in multi-party settings featuring overlapping speech, dynamic floor competition, and negotiated turn allocation. Furthermore, existing voice agents lack mechanisms to condition their turn-taking and response style on assigned personas or roles. Without role conditioning, assistants struggle to determine whether they should intervene or remain passive listeners based on context.

## Method

The system combines a frozen variable-lookahead speech encoder with a 4B-parameter Qwen backbone LLM operating chunk-wise in a streaming manner, processing downmixed multi-channel audio embeddings alongside text transcripts with speaker annotations. Variable chunk sizing between 0.5 and 3 seconds is used during training to ensure robustness, and turn-taking is decided entirely by the LLM via dedicated control tokens rather than a separate voice activity detector. A reasoning-augmented variant, ModeratorLM-Think, incorporates chain-of-thought tokens before emitting a turn decision. Training proceeds in three stages: speech-LLM alignment on 90K hours of public speech data, conversation pretraining on multi-party corpora like AMI and Fisher, and final fine-tuning via LoRA on a newly introduced synthetic dataset, RolePlayConv.

## Results

Evaluated on the real-world NOTSOFAR-1 meeting dataset and a zero-shot RolePlayConv test set against baselines like Moshi and a non-role-conditioned MP-Baseline. ModeratorLM and ModeratorLM-Think achieve substantial gains, boosting turn-taking precision and recall while lowering false-positive interruptions and reactive miss rates. LLM-as-a-judge evaluations using Claude-Sonnet-3.5 demonstrate that reasoning augmentation further improves both turn-taking alignment and response role fidelity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-party voice assistants, automated meeting moderators, and role-playing social conversational agents.

## Limitations

Evaluations rely heavily on synthetic test sets and LLM-as-a-judge metrics due to the subjective nature of multi-party turn-taking.

## Related

- (link related pages by id as the wiki grows)
