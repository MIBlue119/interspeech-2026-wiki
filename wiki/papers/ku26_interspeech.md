---
id: ku26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2175
pdf: https://www.isca-archive.org/interspeech_2026/ku26_interspeech.pdf
---

# Audiovisual CXMI: Scene-based Context Tagging for Spoken Language Translation Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/ku26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ku26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2175)

**TL;DR** — The paper introduces Audiovisual CXMI (AV-CXMI), an information-theoretic metric for spoken language translation evaluation that integrates scene-based audiovisual tags to achieve a strong positive correlation with human judgment (r=0.400).

## Problem

Traditional text-only translation metrics and standard Conditional Cross-Mutual Information (CXMI) fail to account for multimodal cues like speaker relationships, setting, and tone that human translators naturally exploit. Consequently, text-only CXMI paradoxically assigns lower scores to superior human translations than to machine translation outputs because it misses crucial audiovisual context.

## Method

The framework first segments videos into scenes using PySceneDetect for shot detection, ResNet50 for boundary similarity, and SCNet with ECAPA-TDNN for audio source separation and Jaccard-based speaker clustering to refine temporal consistency. Next, it extracts six structured audiovisual tag categories (setting, relationship, time, mood, dialog act via a BERT classifier, and politeness via a formal Korean register classifier) using GPT-4o and Whisper transcriptions with self-consistency decoding. Finally, it computes AV-CXMI by conditioning an mBART-based encoder-decoder model on both the extracted tags and preceding source sentences, ensuring matched input conditions across evaluations.

## Results

Evaluated on Korean-English film translation across 54 samples using human mean opinion scores (MOS) rated by 20 fluent evaluators. While text-only CXMI showed a negative correlation with human MOS (r=-0.295), AV-CXMI achieved a statistically significant positive correlation (r=0.400, p<0.003). AV-CXMI correctly identified the expected quality hierarchy in 77.8% of samples with a large system effect size (eta squared = 0.519, p<0.001), successfully resolving the ranking reversal problem.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers evaluating context-aware spoken language translation models, particularly in film dubbing, subtitling, and multimedia domains where visual and acoustic cues impact translation adequacy.

## Limitations

The evaluation is restricted to a single language pair (Korean-English) over 54 samples, and the annotation pipeline depends on a cloud-hosted LLM API.

## Related

- (link related pages by id as the wiki grows)
