---
id: pham26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3449
pdf: https://www.isca-archive.org/interspeech_2026/pham26_interspeech.pdf
---

# VieSpeaker: A Large-Scale Vietnamese Speaker Recognition Dataset Beyond Visual Dependency

[PDF](https://www.isca-archive.org/interspeech_2026/pham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3449)

**TL;DR** — The paper introduces VieSpeaker, a large-scale face-independent Vietnamese speaker recognition dataset containing 902 hours of speech from 4,715 speakers, improving cross-session verification error rates relative to prior resources.

## Problem

Existing large-scale speaker recognition corpora heavily rely on facial tracking to associate audio with identities, which excludes non-visual recordings like audio podcasts and limits data diversity. For under-resourced languages like Vietnamese, prior datasets are either small, heavily biased toward studio-recorded public figures, or still constrained by visual dependency. This restricts the acoustic robustness and cross-domain generalization of speaker embedding models trained on them.

## Method

The authors propose a face-independent pipeline that pairs Pyannote speaker diarization with Gemini-2.5-Pro to reason over textual metadata and transcripts, mapping anonymous speaker tokens to verified identities. It incorporates LLM-based name normalization, cosine-similarity agglomerative clustering via ECAPA-TDNN for identity consolidation across multiple videos, and Interquartile Range (IQR) outlier filtering. The resulting VieSpeaker dataset contains 4,715 speakers and 365,874 utterances (902 hours) across interviews, entertainment, and podcasts. Speaker models are trained using WeSpeaker with an ECAPA-TDNN architecture, 1024-channel encoder blocks, Additive Angular Margin Softmax loss, and MUSAN/RIR augmentations.

## Results

Evaluations are conducted on Vietnam-Celeb, VoxVietnam, and two newly introduced evaluation splits (VieSpeaker-E for easy single-video trials and VieSpeaker-H for hard cross-video trials). Models trained from scratch on VieSpeaker-T achieve robust performance, and pretraining on VieSpeaker followed by finetuning yields relative Equal Error Rate reductions of up to 16.5% on Vietnam-Celeb compared to training from scratch. On the VieSpeaker benchmark, training from scratch on VieSpeaker-T achieves relative EER reductions of 59.5% (Easy) and 41.9% (Hard) over the strongest prior Vietnamese dataset baseline, while VoxCeleb2 pretraining followed by VieSpeaker finetuning reaches lowest EERs of 1.81% and 9.83% on the Easy and Hard protocols respectively.

## Code

- https://huggingface.co/datasets/hustep-lab/VieSpeaker-Dataset

## Applications

Speech engineers and researchers building robust speaker verification, identification, and diarization systems for Vietnamese and low-resource tonal languages.

## Limitations

The dataset construction relies on text metadata and LLM inference which can occasionally miss identities, requiring manual verification for ambiguous aliases and nicknames.

## Related

- (link related pages by id as the wiki grows)
