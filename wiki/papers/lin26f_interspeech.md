---
id: lin26f_interspeech
category: speech-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1403
pdf: https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.pdf
---

# Improving Streaming Speaker Diarization for LLM Based Multi-talker Speech Understanding

*Ju Lin, Ruizhi Li, Ruizhe Huang, Jing Pan, Xuan Zhang, Zili Huang, Jing Zheng, Ming Sun, Florian Metze*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1403)

**TL;DR** — This paper proposes a two-stage streaming speaker diarization framework combining a Conformer-based source separation front-end with a gradient boosting classifier to enable robust, device-agnostic multi-talker speech recognition and translation on smart glasses. It achieves significant reductions in Word Error Rate and Speaker Attribution Error Rate while reducing model size from 20M to 5.5M parameters.

## Key contributions

- A two-stage streaming diarization pipeline combining a source separation front-end with a GBDT/SVM second-stage acoustic classifier using F0 and RMS features.
- A lightweight Conformer-based source separation architecture that replaces GRU blocks, reducing parameter count from ~20M to 5.5M.
- A multi-geometry beamforming strategy using NLCMV to build a unified multi-device model generalizing across diverse microphone arrays.
- A multi-task learning objective that jointly optimizes speech reconstruction and auxiliary speaker classification to improve separation quality.

## Problem

Large language models deployed on wearable devices like smart glasses struggle with multi-talker scenarios because they predominantly accept monaural inputs and lack robust spatial awareness. Prior single-stage separation or simple RMS-ratio thresholding techniques degrade under diverse, noisy acoustic environments and are heavily tied to specific microphone array geometries. Furthermore, fully integrated end-to-end multi-talker models suffer from a scarcity of labeled multichannel conversational training data, necessitating decoupled or modular approaches.

## Method

The system processes 5-channel microphone array input through N NLCMV beamformers mapped to geometry-agnostic directional representations. The source separation module, adapted with Conformer layers (input dimension 128, 4 attention heads, feed-forward dimension 256, kernel size 15) instead of GRUs, decomposes the signal into reference, self (wearer), and other (partner) streams in 600ms streaming chunks. The loss function combines time-domain L1 loss, weighted STFT loss (WSTFT), Log SI-SDR loss, and an auxiliary cross-entropy classification head (1280->256->3 linear layers) predicting self, other, and non-speech.

Extracted fundamental frequency (F0) and RMS energy features from the separated and reference streams are fed into a second-stage GBDT classifier (100 boosting iterations, learning rate 0.1, maximum depth 3) or an SVM with an RBF kernel. The predicted speaker tags (self, other, non-speech) dictate task-specific prompts sent to a frozen Gemma-3n 4B LLM for speaker-attributed ASR and translation. For multi-device adaptation, the framework uses platform-specific beamformer weights combined with frequency/channel layer normalization and a 0.25 secondary-device mixing ratio.

## Experimental setup

Source separation training used simulated data based on Project Aria 5-microphone array geometry using LibriSpeech audio positioned via real room impulse responses across 12 azimuthal directions. The second-stage classifier utilized 1,000 in-house multichannel conversational recordings with human annotations. Evaluation was performed on real-world recordings across Italian-English (IT-EN), French-English (FR-EN), and Spanish-English (ES-EN), totaling 200-350 recordings per language pair. Models were trained for 60 epochs using the Adam optimizer with a tri-stage LR schedule (peak 4e-4, 10k warmup steps) on 20M-parameter baseline GRU models versus 5.5M-parameter Conformer variants, evaluated via WER, SAER, and BLEU.

## Results

The 2-Stage Multi-Task (MT) configuration consistently outperformed single-stage baselines. On IT-EN, Other WER dropped from 23.01% (1-Stage ST) to 12.99% (1-Stage MT), while 2-Stage MT lowered overall Self/Other WER to 6.09% / 10.75% and achieved a low SAER of 0.36% / 0.57%. The 2-Stage Conformer model matched the best Self WER (6.09%) on IT-EN while shrinking parameters by over 70%. In second-stage classifier comparisons, SS + GBDT and SS + SVM heavily outperformed standard VAD baselines, with SS + GBDT yielding balanced F1-scores of 91.4% (Self), 85.9% (Other), and 79.6% (Non-speech). For translation, 2-Stage MT reached 57.04 BLEU for Other speech on IT-EN (+11.06 over JSTAR). The multi-device model reduced Device-A WER by 0.2-2.5 points across language pairs (e.g., FR-EN Other dropping from 11.6% to 9.1%) while maintaining performance within 0.2% on Device-B.

| System / Condition | IT-EN Self WER | IT-EN Other WER | IT-EN Self SAER | IT-EN Other SAER |
| :--- | :--- | :--- | :--- | :--- |
| 1-Stage ST [13] | 7.80 | 23.01 | 0.60 | 9.57 |
| 1-Stage MT | 7.76 | 12.99 | 1.24 | 1.85 |
| 2-Stage MT | 6.09 | 10.75 | 0.36 | 0.57 |
| 2-Stage Conformer | 6.09 | 10.71 | 0.37 | 0.48 |

## Limitations

Training reliance entirely on simulated room impulse responses and spatialized clean speech datasets limits immediate generalization to unseen acoustic environments with severe reverberation. The second-stage GBDT classifier requires domain-specific in-house annotated conversational datasets (1,000 recordings used here) for optimal tuning. Evaluation is restricted to three specific language pairs and only two hardware form factors.

## Why read this

Researchers and engineers building real-time multi-modal assistants for wearable hardware should read this to see how decoupling neural source separation from a lightweight statistical classifier (GBDT) bypasses data scarcity while slashing model footprints down to 5.5M parameters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time smart glasses captioning, multi-talker speech translation, wearable conversational assistants, and device-agnostic spatial audio parsing.

## Related

- (link related pages by id as the wiki grows)
