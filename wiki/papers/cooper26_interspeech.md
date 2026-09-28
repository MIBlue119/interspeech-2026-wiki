---
id: cooper26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1521
pdf: https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.pdf
---

# A Large-Scale Dataset of Listener Impressions of Emotional TTS

[PDF](https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cooper26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1521)

**TL;DR** — The paper introduces the first large-scale speech quality and emotion assessment dataset for emotional text-to-speech, comprising 18,208 samples across five emotional categories evaluated by 262 human listeners.

## Problem

Existing automatic speech quality assessment datasets like BVCC and SOMOS focus exclusively on general-purpose, neutral speech synthesis, leaving them poorly suited for evaluating expressive and emotional TTS. Furthermore, while natural emotional datasets like IEMOCAP and MSP-Podcast exist, they contain no synthesized samples, and raw listening test data from individual TTS papers is rarely made public. This lack of benchmarks impedes the development of automatic evaluation metrics for nuanced conversational AI speech synthesis.

## Method

The dataset incorporates 18,208 audio samples consisting of natural emotional speech from the ESD and DailyTalk corpora alongside outputs from 13 different synthesis systems, including open-source models, API-based engines, and prompt-based architectures. Listeners performed subjective evaluations divided into three independent tasks via a web interface: quality mean opinion score (QMOS), perceived emotion categories with emotion MOS (EMOS), and valence-arousal-dominance ratings using the Self-Assessment Manikin. The test gathered 262 unique US-based native English raters, yielding between 4 and 9 ratings per sample. Preliminary predictive experiments tested pretrained emotion recognizers, quality predictors, and LLM-as-judge pipelines against human ratings.

## Results

Human evaluations produced system rankings showing clear performance variations across model families, with Google Gemini achieving a top QMOS of 4.21 and an EMOS of 3.89 among API systems. Pretrained MOS predictors correlated with human quality ratings at 0.80, while an LLM-as-judge method correlated with emotion MOS rankings at 0.84. However, correlations varied substantially depending on the specific emotion category, highlighting significant room for improvement in automated evaluation tools.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing emotional conversational AI systems can use this dataset to train and benchmark automated speech quality and emotion evaluation models.

## Limitations

The dataset's system comparisons are constrained by differing lexical content and speaker identities across the evaluated models.

## Related

- (link related pages by id as the wiki grows)
