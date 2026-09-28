---
id: behringer26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1459
---

# Assessing the Impact of Noise and Speech Enhancement on the Intelligibility of Speech Codecs

**TL;DR** — Neural speech codecs are less noise-robust than classical codecs, but running speech enhancement before coding can largely close the intelligibility gap.

## Problem

Very low-bitrate neural codecs are gaining ground over classical speech codecs, but whether they preserve intelligibility as well in noisy real-world conditions had not been systematically evaluated.

## Method

The authors measure intelligibility and listening effort for classical and neural codecs in clean and noisy conditions, and test whether applying speech enhancement (SE) before coding — simulating a realistic processing pipeline — mitigates any degradation.

## Results

Classical codecs prove more robust to noise than neural codecs; pre-coding SE significantly improves intelligibility and listening effort for codecs otherwise hurt by noise, and ASR-based objective intelligibility correlates strongly with subjective condition-level scores.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides codec selection and pipeline design (e.g., whether to add an SE stage) for telephony and VoIP systems used in noisy environments.

## Related

- (link related pages by id as the wiki grows)
