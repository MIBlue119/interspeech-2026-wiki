---
id: beyers26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-408
---

# Scaling few-shot spoken word classification with generative meta-continual learning

**TL;DR** — A generative meta-continual learning algorithm lets a spoken-word classifier scale to sequentially learning 1,000 word classes from just five examples each, matching a repeatedly fine-tuned model's accuracy while training thousands of times faster.

## Problem

Prior few-shot spoken word classification work targets only a handful of classes at a time, leaving it unclear whether the approach scales to realistically large, sequentially growing vocabularies under a strict few-shot budget.

## Method

The authors train a classifier with the Generative Meta-Continual Learning (GeMCL) algorithm to sequentially learn to distinguish 1,000 spoken-word classes given only five shots per class, and compare it against repeatedly retrained or fine-tuned HuBERT baselines.

## Results

GeMCL gives exceptionally stable performance; while it does not always beat a fully-finetuned HuBERT model, it matches a frozen-HuBERT-plus-classifier baseline while adapting roughly 2,000 times faster on less than half the data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Relevant for on-device or rapidly expanding voice-command systems that must add new spoken keywords on the fly without costly retraining.

## Related

- (link related pages by id as the wiki grows)
