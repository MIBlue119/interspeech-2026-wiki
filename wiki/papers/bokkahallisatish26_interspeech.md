---
id: bokkahallisatish26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1918
---

# The Voice Behind the Words: Quantifying Intersectional Bias in SpeechLLMs

**TL;DR** — A large-scale controlled study finds that speech LLMs give systematically less helpful responses to certain accents (especially Eastern European female-presenting voices), even though outputs are equally polite, and that human raters detect these biases more strongly than LLM judges do.

## Problem

Because speech LLMs process audio directly, they retain speaker cues like accent and perceived gender that cascaded pipelines used to strip out, creating a risk of speaker-identity-dependent response quality that hasn't been systematically measured at an intersectional level.

## Method

The authors run a large-scale intersectional evaluation across three SpeechLLMs using 2,880 controlled interactions spanning six English accents and two gender presentations, holding linguistic content constant via voice cloning, and score responses with pointwise/pairwise LLM judges, Best-Worst Scaling, and human validation.

## Results

They find recurring directional disparities, with Eastern European-accented speech receiving lower helpfulness scores (especially for female-presenting voices) despite similar politeness, and human evaluators showing stronger sensitivity to accent-level contrasts than LLM judges.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Relevant to developers and auditors of voice assistants and speech-based LLM products who need to detect and mitigate accent- and gender-based service-quality disparities before deployment.

## Related

- (link related pages by id as the wiki grows)
