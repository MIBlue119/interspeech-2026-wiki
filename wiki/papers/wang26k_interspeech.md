---
id: wang26k_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-589
---

# Does Fine-tuning by Reinforcement Learning Improve Generalization in Binary Speech Deepfake Detection?

**TL;DR** — Fine-tuning speech deepfake detectors with GRPO reinforcement learning (rather than only supervised fine-tuning) improves out-of-domain generalization while preserving in-domain performance, outperforming both pure SFT and hybrid SFT+RL setups, with the negative reward term appearing key to the gain.

## Problem

Building speech deepfake detectors that generalize to unseen attacks is hard, and most current foundation-model fine-tuning approaches rely solely on supervised fine-tuning (SFT), leaving reinforcement learning's potential contribution unexplored.

## Method

Inspired by RL fine-tuning in LLMs, the authors investigate Group Relative Policy Optimization (GRPO) for fine-tuning speech deepfake detectors, comparing pure GRPO, SFT-only, and hybrid SFT+RL setups across multiple detectors and test sets, with ablation studies isolating the effect of the negative reward term.

## Results

Pure GRPO-based fine-tuning improves performance on out-of-domain test sets while maintaining target-domain performance, outperforming both SFT-only and hybrid setups; ablations suggest the negative reward in GRPO is a key factor in this improvement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Gives speech deepfake detection developers a concrete fine-tuning recipe (GRPO-based RL) for improving generalization to unseen synthesis attacks.

## Related

- (link related pages by id as the wiki grows)
