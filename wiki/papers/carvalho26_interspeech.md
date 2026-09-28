---
id: carvalho26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1969
---

# Exploring the potential and limitations of Model Merging for Multi-Domain Adaptation in ASR

**TL;DR** — A benchmark of 11 model-merging algorithms for combining domain-specialized ASR checkpoints into one model, plus a new merging method that beats full fine-tuning on European Portuguese.

## Problem

Speech foundation models are usually adapted per domain via separate fine-tuned checkpoints, and redoing full fine-tuning every time new domain data arrives is computationally expensive; model merging offers a cheaper alternative but its limits are not well understood.

## Method

The authors benchmark 11 merging algorithms across 10 European Portuguese domains, measuring in-domain accuracy, robustness to distribution shift, and retained English/multilingual performance, and propose BoostedTSV-M, a merging method built on TSV-M that uses singular-value boosting to counter rank collapse and improve numerical stability.

## Results

BoostedTSV-M outperforms full fine-tuning on European Portuguese domains in a single merged model while better preserving out-of-domain generalization than the other merging baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient multi-domain deployment of large ASR models, e.g. combining domain-adapted checkpoints (medical, call-center, broadcast) into one production model without repeated full fine-tuning.

## Related

- (link related pages by id as the wiki grows)
