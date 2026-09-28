---
id: lin26f_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1403
pdf: https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.pdf
---

# Improving Streaming Speaker Diarization for LLM Based Multi-talker Speech Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1403)

**TL;DR** — A two-stage streaming speaker diarization framework combining neural source separation and a lightweight GBDT/SVM classifier improves LLM-based multi-talker speech recognition and translation on smart glasses.

## Problem

Large language models predominantly process monaural audio and struggle with multi-talker smart glasses scenarios where background noise and diverse acoustic conditions distort simple threshold-based diarization. Prior spatial audio LLMs also require dedicated encoders for each unique microphone array geometry, making device-specific adaptation costly and inflexible. This work addresses these gaps to enable robust, real-time, device-agnostic captioning and translation.

## Method

The framework uses a 5-channel microphone array feeding NLCMV beamformers to transform geometry-dependent signals into fixed directional representations. A source separation encoder-decoder model isolates wearer (self) and partner (other) speech streams, optimized via time-domain L1, weighted STFT, and Log SI-SDR losses. To reduce parameters from 20M to 5.5M, recurrent GRU layers are replaced with Conformer blocks (input dimension 128, 4 attention heads, 256 feed-forward dimension). Extracted F0 and RMS acoustic features from separated streams are fed into a second-stage GBDT or SVM classifier to predict speaker tags, which govern prompt selection for a frozen Gemma-3n 4B LLM.

## Results

Evaluated on 200-350 real-world multichannel conversational recordings across Italian-English, French-English, and Spanish-English language pairs. On Spanish-English, the two-stage multi-task model (2-Stage MT) achieved a wearer (Self) WER of 7.77%, partner (Other) WER of 9.05%, and Speaker Attribution Error Rates of 0.21% (Self) and 0.45% (Other), outperforming single-stage baselines. The Conformer-based variant matched accuracy while using 28% of the parameters (5.5M vs 20M). For translation, 2-Stage MT scored 57.04 BLEU on Italian-English partner speech, improving over JSTAR (45.98) and 1-Stage MT (53.56). A multi-device unified model successfully generalized across two smart glass array configurations with minimal or no performance degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time, multi-talker speech recognition and translation pipelines for wearable devices like smart glasses and hearing-assistive hardware.

## Related

- (link related pages by id as the wiki grows)
