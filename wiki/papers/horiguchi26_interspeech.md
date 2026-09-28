---
id: horiguchi26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-45
pdf: https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.pdf
---

# Tight Boundary Prediction in Speaker Diarization Using Causal-Anticausal Consistency

[PDF](https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/horiguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-45)

**TL;DR** — This paper introduces a causal-anticausal co-training framework that learns to output tight speaker diarization boundaries using loosely annotated multi-talker ASR corpora, recovering about 70% of the effect of ideal tight-label training.

## Problem

Multi-talker ASR corpora commonly used to train speaker diarization models contain loose annotations, where pauses are included and boundaries are padded to prevent truncation. Models trained on these labels internalize this loosening behavior, which degrades performance in downstream tasks like guided source separation and spoken dialogue modeling. While manually acquiring tight labels or using channel-separated forced alignment is prohibitively expensive or inapplicable to single-channel web audio, learning directly from loose labels remains challenging because standard noisy-label methods assume errors are independent of context rather than systematically distributed around boundaries.

## Method

The method leverages causal and anticausal models, which are inherently incapable of learning complete boundary padding or pause filling because they lack future or past context respectively. By combining the predictions of causal and anticausal models via logical intersection (masking loose annotations), the system generates progressively tighter pseudo-labels. A co-training scheme iteratively refines these pseudo-labels while simultaneously updating both causal and anticausal model parameters. Finally, a standard non-causal diarization model is trained using the resulting tightened pseudo-labels.

## Results

Experiments demonstrate that the proposed co-training method recovers approximately 70% of the tightening effect achieved by models trained on ideal forced-alignment tight labels. The resulting tight predictions improve downstream performance compared to models trained on conventional loose annotations. The approach successfully operates on single-channel mixture recordings without requiring auxiliary channel-separated data or manual tight annotations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building speaker diarization systems, guided speech separation pipelines, and spoken dialogue models requiring precise temporal speech boundaries.

## Limitations

The approach assumes that true tight speech intervals are always contained within the boundaries of the given loose annotations.

## Related

- (link related pages by id as the wiki grows)
