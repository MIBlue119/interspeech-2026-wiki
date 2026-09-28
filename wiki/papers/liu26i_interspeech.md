---
id: liu26i_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1192
---

# Prosodic Boundary-Aware Streaming Generation for LLM-Based TTS with Streaming Text Input

**TL;DR** — A post-training strategy that teaches an LLM-based TTS model to stop early at content boundaries with limited lookahead slashes long-form streaming TTS word error rate from 71% to 4.8%.

## Problem

Streaming TTS that consumes streaming text is essential for interactive systems, but suffers from unnatural prosody due to missing lookahead and from long-form collapse due to unbounded context.

## Method

The authors adapt a pretrained LLM-based TTS model with a prosodic-boundary-aware post-training strategy using weakly time-aligned data, teaching the model to stop early at specified content boundaries given only limited future text; at inference, a sliding-window prompt carries forward prior text and speech tokens to bound context and ensure seamless concatenation.

## Results

Outperforms a CosyVoice-style interleaved baseline in both short- and long-form scenarios, with long-text synthesis showing a 66.2 absolute-point WER reduction (71.0% to 4.8%) and relative gains of 16.1% in speaker similarity and 1.5% in emotion similarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, interactive TTS systems that must synthesize speech incrementally as text streams in (e.g., LLM chat voice output, live captioning-to-speech).

## Related

- (link related pages by id as the wiki grows)
