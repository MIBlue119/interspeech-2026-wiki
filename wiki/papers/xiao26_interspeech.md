---
id: xiao26_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2215
---

# Continual Adaptation for Pacific Indigenous Speech Recognition

**TL;DR** — An empirical study finding that adapting speech foundation models to distant, low-resource Pacific Indigenous languages causes severe internal representational drift, and that LoRA, while good initially, still suffers catastrophic forgetting in sequential learning.

## Problem

Speech foundation models struggle with low-resource Pacific Indigenous languages due to severe data scarcity, and full fine-tuning risks catastrophic forgetting, but how adaptation strategies actually behave for these languages was unstudied.

## Method

Investigates the impact of data volume, adaptation strategies, and representational drift on speech foundation models across three distinct Pacific Indigenous languages, plus a continual learning framework for sequential language acquisition.

## Results

Adapting to these linguistically distant languages induces severe internal representational drift, creating a plasticity-stability dilemma; LoRA adapts well initially but suffers catastrophic forgetting during sequential learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides adaptation strategy choices for building ASR in Pacific Indigenous and other severely underrepresented languages.

## Related

- (link related pages by id as the wiki grows)
