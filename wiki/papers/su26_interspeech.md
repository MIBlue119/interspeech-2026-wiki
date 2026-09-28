---
id: su26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1277
pdf: https://www.isca-archive.org/interspeech_2026/su26_interspeech.pdf
---

# Robust LLM-based Audio-Visual Speech Recognition with Sparse Modality Alignment and Visual Unit-Guided Refinement

[PDF](https://www.isca-archive.org/interspeech_2026/su26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/su26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1277)

**TL;DR** — AVUR-LLM introduces sparse modality alignment, confidence-aware fusion, and visual unit-guided LLM rescoring for audio-visual speech recognition, achieving a 37% relative word error rate reduction over baseline systems at 0 dB SNR.

## Problem

Prior LLM-based audio-visual speech recognition models suffer from tight coupling to noisy multimodal features, high memory consumption, and a lack of fine-grained control during cross-modal fusion. These issues increase sensitivity to input noise and computational overhead, limiting recognition accuracy in adverse acoustic environments.

## Method

The model uses a two-stage architecture built around a Whisper audio encoder and decoder, an AV-HuBERT visual encoder, and a LLaMA-2 7B LLM. Stage 1 inserts lightweight sparse modality alignment (SMA) blocks into the upper audio encoder layers using audio-conditioned cross-attention with stop-gradient, and applies adaptive modulated fusion (AMF) in the decoder where token-level acoustic uncertainty gates visual injection. Stage 2 extracts mid-layer visual features from AV-HuBERT, discretizes them via a K-means codebook (size 2000), applies run-length compression, and feeds the resulting visual tokens as prompts to a LoRA-adapted LLM to rescore N-best candidate transcriptions via list-wise softmax training.

## Results

Evaluated on the LRS3 dataset (using 433 hours of training data and extended to 1759 hours with VoxCeleb2), AVUR-LLM achieves a clean WER of 0.75% and 0.68% respectively, outperforming prior LLM-based AVSR systems. Under additive babble noise conditions at 0 dB SNR, it records a 1.70% WER, outperforming competing methods. Ablation studies show that removing AMF and VUR severely degrades noise robustness (rising to 6.70% WER at 0 dB), while full integration reduces clean WER by 42.3% and 0 dB WER by 74.6%.

## Code

- https://github.com/yakumo72/AVUR-LLM

## Applications

Speech engineers and developers building robust on-device or cloud speech recognition systems that must operate reliably in noisy environments, such as smart speakers, automated transcription services, and automotive speech interfaces.

## Related

- (link related pages by id as the wiki grows)
