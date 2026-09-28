---
id: zhang26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-463
---

# Dual-Encoder Fusion with Explicit and Implicit Injection for the Interspeech 2026 Audio Encoder Capability Challenge

**TL;DR** — A systematic study fusing Whisper and Dasheng audio encoders for the Audio Encoder Capability Challenge, finding an "explicit injection" strategy that isolates non-redundant information gives stronger task-wise complementarity than simpler adaptation-based fusion.

## Problem

Combining complementary audio encoders should translate into consistent gains across diverse audio classification and understanding tasks, but how best to fuse them for practical use in large audio-language model pipelines was unclear.

## Method

Uses Whisper and Dasheng as complementary encoders and compares two injection strategies: implicit injection via parameter-efficient Dasheng adaptation before fusion, and explicit injection that decomposes representations into residual components with auxiliary regularization to isolate non-redundant information, identifying a stable token-wise softmax-gated residual fusion backbone with a lightweight STFT residual branch.

## Results

Explicit injection yields stronger task-wise complementarity and more per-task best results, while implicit adaptation remains competitive and robust overall, for the Interspeech 2026 Audio Encoder Capability Challenge.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Practical design guidance for modular multi-encoder fusion inside Large Audio Language Model (LALM) systems.

## Related

- (link related pages by id as the wiki grows)
