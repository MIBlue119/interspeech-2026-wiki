---
id: kando26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-999
---

# On the Effect of Segmentation Width and Cluster Size on Speech Resynthesis and Continuation in Generative Spoken Language Models

**TL;DR** — Systematically varying segment width and K-means cluster size for discrete speech tokens shows intelligible, natural speech resynthesis and stable continuation are achievable at much lower bitrates than the conventional GSLM setup, suggesting current settings are often redundant.

## Problem

Generative Spoken Language Modeling (GSLM) trains language models on discrete speech representations instead of text, but the effect of representation bitrate (segmentation width and cluster size) on synthesis and continuation quality is underexplored.

## Method

The authors segment speech representations with fixed widths and train K-means models at multiple cluster sizes to produce various bitrate settings, then evaluate resynthesis and continuation quality with conventional and LLM-based metrics.

## Results

Intelligible and natural speech can be synthesized at lower bitrates than the GSLM baseline, and continuation quality remains stable at lower bitrates across metrics; LLM-based metrics correlate better with human judgment than conventional ones but the correlation remains modest.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides GSLM and speech-token designers toward more compute- and storage-efficient discrete representations without sacrificing generation quality.

## Related

- (link related pages by id as the wiki grows)
