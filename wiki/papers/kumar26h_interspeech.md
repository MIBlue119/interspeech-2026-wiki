---
id: kumar26h_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2607
---

# VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings

**TL;DR** — A role-separated human-AI annotation pipeline, applied to build a Hindi agricultural-speech dataset, cuts annotation effort by 61% using LLM-based post-correction without hurting transcript quality.

## Problem

Building high-quality speech corpora for low-resource languages is labor-intensive, and the paper's case study — Hindi agricultural speech — highlights the need for scalable, quality-controlled human-AI annotation pipelines.

## Method

The authors present VāṇīSetu, integrating ASR, lightweight and LLM-based post-correction, and structured multi-stage human validation through an enhanced annotation tool (Vāgyojaka), with a role-separated, incentive-linked validation architecture (Annotator → Validator → Verifier) and threshold-gated quality control, applied to construct the KrishiVāṇī Hindi agricultural speech dataset.

## Results

In a controlled annotation study, mT5-based post-correction yields a 61.1% reduction in annotation effort while preserving transcript fidelity, and smaller fine-tuned language models outperform larger LLMs for this in-domain correction task.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable, cost-efficient speech corpus creation for low-resource languages and specialized domains (e.g. agriculture), useful to NGOs and researchers building Indic speech datasets.

## Related

- (link related pages by id as the wiki grows)
