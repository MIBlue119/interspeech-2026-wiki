---
id: lan26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2486
pdf: https://www.isca-archive.org/interspeech_2026/lan26_interspeech.pdf
---

# SA-UAED: Joint Frame-Level Detection of Audio Events, Speaker Activities, and Speaker-Attributed Paralinguistic Events

[PDF](https://www.isca-archive.org/interspeech_2026/lan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2486)

**TL;DR** — The paper introduces SA-UAED, a unified framework for joint frame-level audio event detection, speaker diarization, and speaker-attributed paralinguistics, alongside a 500-hour simulation pipeline and dataset (LibriPara) that substantially improves laugh and cough attribution.

## Problem

Existing sound event detection and speaker diarization systems fail to attribute transient paralinguistic events like laughter and coughing to individual speakers due to a severe lack of fine-grained multi-label training data. Furthermore, standard speech-biased speaker embeddings fail to capture the erratic acoustic and temporal characteristics of non-verbal vocalizations. This makes it difficult to build context-aware speech applications that require precise tracking of who is laughing or coughing.

## Method

The authors propose an audio simulation pipeline using ChatterBox-Turbo zero-shot TTS with LibriSpeech prompts, PANNs filtering, and VAD trimming to generate LibriPara, a 500-hour multi-speaker dataset with frame-level annotations. Building upon the T-UAED encoder-decoder architecture, they introduce SA-UAED, which adds task-specific fully-connected layers (192-to-192 linear projections) to map generic speaker embeddings into dedicated paralinguistic sub-spaces for coughing and laughter. The model operates on 32-second, 16 kHz audio clips with a 50 Hz frame resolution, utilizing BEATs/WavLM encoders and an ECAPA-TDNN frontend, and is trained end-to-end via binary cross-entropy loss.

## Results

Evaluated on the LibriPara and EARS-based simulated test sets, SA-UAED is compared against a strong reproduced T-UAED baseline and a shared adapter variant. On the LibriPara test set, SA-UAED improves segment-based F1 (SB-F1) for cough detection from 0.281 to 0.473 and for laughter detection from 0.357 to 0.476, while maintaining a low Diarization Error Rate (DER) of ~8.07%. On the real-world EARS test set, zero-shot evaluation shows SB-F1 increases from 0.375 to 0.470 for cough and from 0.259 to 0.409 for laughter. A minor trade-off is observed with a slight drop in generic sound event detection accuracy.

## Code

- https://github.com/originallover/SA-UAED

## Applications

Engineers building multi-party dialogue systems, smart healthcare patient monitoring solutions, or intelligent meeting transcription tools can use this framework to track speaker-specific non-verbal acoustic cues.

## Limitations

The approach shows a minor degradation in generic sound event detection accuracy as a trade-off for improved paralinguistic modeling performance.

## Related

- (link related pages by id as the wiki grows)
