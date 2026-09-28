---
id: liu26q_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2346
pdf: https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.pdf
---

# Reducing Speaker Residual by Considering Pinhole Effect in Voice Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2346)

**TL;DR** — This paper proposes a pinhole loss fine-tuning strategy for voice anonymization frameworks to suppress residual speaker attributes and reduce linkability without degrading utility.

## Problem

Disentanglement-based voice anonymization methods often leave residual speaker attributes in content and prosody feature streams due to imperfect factorization. These leaks allow attackers to perform reliable speaker recognition or linkage attacks against anonymized utterances. While stronger disentanglement can eliminate these residuals, it frequently damages speech intelligibility, naturalness, and prosody fidelity.

## Method

The authors introduce an explicit pinhole loss that measures the compactness and linkability of anonymized utterances originating from the same source speaker based on generalized eigenvector scatter matrices. During a secondary fine-tuning stage, the content encoder, prosody encoder, and waveform generator are updated while the speaker encoder used for loss calculation remains frozen. Training batches are constructed with 6 source speakers and 6 utterances per speaker. Standard generation objectives are jointly optimized alongside the pinhole loss to preserve downstream synthesis utility.

## Results

Evaluations across LibriSpeech, LibriTTS, and IEMOCAP demonstrate consistent privacy improvements across multiple anonymization baselines (x-vector based, ASRBN, and ASRBN-GST) and pseudo-speaker generators (a2o, RS, GAN, IDMap-Diff). Automatic speaker verification equal error rates increase across all test sets, indicating significantly enhanced protection against linkage. Meanwhile, linguistic preservation measured by ASR word error rates and emotion preservation measured by IEMOCAP unweighted average recalls remain virtually unchanged.

## Code

- https://anonymous.4open.science/r/Pinhole-loss-fine-tunning-4628

## Applications

Engineers building privacy-preserving speech communication systems, voice assistants, or biometric protection pipelines can apply this fine-tuning strategy to existing anonymization models to strengthen privacy against linkage attacks.

## Related

- (link related pages by id as the wiki grows)
