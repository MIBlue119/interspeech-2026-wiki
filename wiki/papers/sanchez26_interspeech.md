---
id: sanchez26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2600
pdf: https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.pdf
---

# An Evaluation Framework for Text-to-Speech Voice Reconstruction

[PDF](https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2600)

**TL;DR** — This paper proposes a specialized subjective and objective evaluation framework for text-to-speech voice reconstruction that assesses the trade-off between intelligibility and speaker identity preservation across 17 zero-shot TTS systems.

## Problem

Voice reconstruction aims to create personalized TTS for speakers with speech disorders by improving intelligibility while retaining speaker identity, but traditional MOS evaluations suffer from poor sensitivity, saturation, and lack task-specific framing. Furthermore, standard evaluation metrics lack ground-truth reference data and fail to predict reconstruction success for severely disordered speech. This makes it difficult to reliably benchmark how well modern TTS systems handle the trade-off between articulation clarity and speaker voice characteristics.

## Method

The framework combines subjective Best Worst Scaling (BWS) with situational framing, separating evaluations into an INTELLIGIBILITY task (ignoring speaker identity) and a RECONSTRUCTION task (assessing both intelligibility and target speaker match relative to pre-condition expectations). Objectively, the authors evaluate standard proxies including ASR-based WER and PER, speaker embedding cosine similarity via WeSpeaker, and UTMOS, alongside a novel dual-reference distributional measure (TTSDS2) that computes distances simultaneously to a high-intelligibility generic corpus and the original disordered audio. The evaluation tests 17 zero-shot TTS architectures—spanning autoregressive, non-autoregressive, and diffusion models—using 193 English speakers from the Speech Accessibility Project dataset across conditions like ALS, cerebral palsy, Down syndrome, and Parkinson's.

## Results

Evaluating 193 speakers across 17 zero-shot systems shows that StyleTTS2, Fish Speech, and OpenVoice achieve the highest BWS scores for intelligibility, while IndexTTS2, Qwen3-TTS, and E2-TTS rank highest for overall reconstruction. Most TTS outputs exceed the intelligibility of original recordings, especially for low-intelligibility speakers (WER >= 30%), where almost all systems surpass the source audio in intelligibility. Conversely, in the overall reconstruction task, most systems score below the original recordings, and for low-intelligibility speakers, only IndexTTS2 and Qwen3-TTS successfully outrank the source recordings in preserving speaker identity alongside clarity.

## Code

- https://minixc.github.io/sap/

## Applications

Engineers and clinical researchers developing personalized voice output communication aids (VOCAs) and voice reconstruction tools for individuals with neurological speech disorders.

## Limitations

The current framework focuses exclusively on intelligibility and speaker characteristics, leaving accent similarity and conversational suitability for future work.

## Related

- (link related pages by id as the wiki grows)
