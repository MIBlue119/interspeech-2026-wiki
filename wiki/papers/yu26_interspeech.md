---
id: yu26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-456
---

# Investigating LLMs Behavior in Depression Severity Prediction

**TL;DR** — Finds that adding more few-shot examples barely helps LLMs predict depression severity (PHQ-8) and they're largely insensitive to corrupted labels, but feeding symptom-focused transcript excerpts instead of full transcripts improves accuracy while cutting token usage by about 80%.

## Problem

LLMs are increasingly used for depression assessment, but it was unclear whether few-shot demonstrations actually provide effective supervision for predicting depression severity, or just superficial structural cues.

## Method

The authors evaluate five LLMs across 0-10-shot settings on PHQ-8 prediction, introduce a contradictory-label intervention to test whether models actually depend on demonstration label correctness, and compare using full transcripts versus symptom-focused excerpts, plus prediction averaging.

## Results

Increasing shot count gives limited, non-monotonic gains and performance is largely insensitive to corrupted demonstration labels, while replacing full transcripts with symptom-focused excerpts consistently improves performance and cuts token usage by about 80%; prediction averaging adds stable further gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides cost-effective, context-focused prompting strategies for deploying LLM-based depression-severity screening tools in clinical settings.

## Related

- (link related pages by id as the wiki grows)
