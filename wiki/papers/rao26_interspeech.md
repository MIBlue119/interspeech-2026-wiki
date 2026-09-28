---
id: rao26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1608
---

# A Causal Reference-Enhanced Keep-Speech Active Noise Control Method

**TL;DR** — A causal, low-latency keep-speech active noise control method uses a DNN to strip speech out of the reference signal before cancellation, preserving speech components in the error signal and improving intelligibility for headphone use in noisy conversations.

## Problem

Active noise control for headphones typically cancels all sound indiscriminately, which can also suppress desirable speech in noisy conversational scenarios.

## Method

The authors propose a causal, low-latency reference-enhanced Keep-Speech Active Noise Control (KSANC) method where a DNN enhances the reference signal by suppressing speech components while retaining noise, so that after control, speech components are preserved in the error signal.

## Results

Validated with measured headphone impulse responses, the method improves speech intelligibility and quality in noisy conversational scenarios compared to all baselines, and is robust across different speech signals/directions, noise types/directions, and SNRs; listening examples and code are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to noise-canceling headphones and earbuds that need to suppress ambient noise while preserving the wearer's ability to hear nearby conversation.

## Related

- (link related pages by id as the wiki grows)
