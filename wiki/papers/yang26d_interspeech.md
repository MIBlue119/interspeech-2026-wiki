---
id: yang26d_interspeech
category: tts
labels: [low-resource, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-616
pdf: https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.pdf
---

# K-DIALECT : Korean Dialect-Aware Face-Based Speech Synthesis

*Seongyeon Yang, Juyeob Lee, Eunil Park*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-616)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — K-DIALECT is a multimodal, face-conditioned text-to-speech framework designed to synthesize low-resource regional Korean dialects without requiring reference audio. It achieves superior dialectal fluency and lower word error rates compared to state-of-the-art voice-based baselines like XTTS-v2.

## Key contributions

- Proposes a reference-free multimodal TTS framework that jointly controls speaker identity and dialectal prosody using only a face image and a dialect identifier.
- Introduces a dual-branch face encoder using ArcFace and CLIP to explicitly disentangle speaker identity features from style and expression cues.
- Integrates a dialect-conditioned pitch predictor that generates frame-level fundamental frequency trajectories and semitone offsets.
- Employs a Feature-wise Linear Modulation (FiLM) fusion module to combine pitch and style embeddings with the acoustic decoder hidden states.

## Problem

Neural text-to-speech systems are predominantly optimized for standard languages, resulting in unnatural or homogenized outputs when applied to regional dialects and accents. Furthermore, dialect speech data is scarce and unevenly distributed, making standard reference-audio adaptation strategies impractical and vulnerable to acoustic artifacts. Prior voice-based conditioning approaches, such as XTTS-v2, cannot cleanly separate speaker identity from regional prosody in low-resource settings without clean reference speech.

## Method

K-DIALECT comprises a text encoder, a T5-based Dialect Translator pre-trained on a 42 GB Korean corpus and fine-tuned on standard-to-dialect parallel text, a dual-branch face encoder, a dialect-conditioned pitch predictor, and a GPT-based acoustic decoder. The face encoder extracts identity and style via ArcFace and CLIP branches (each producing a 512-dim embedding, concatenated to 1024-dim, passed through layer norm and GELU layers, and l2-normalized) using contrastive, MSE, distillation, and orthogonality losses. The pitch predictor maps a dialect ID through a two-layer hidden MLP with non-linear activations to output relative pitch offsets in semitones (delta f_semi), which are optimized via an MSE loss against ground-truth log f_0 contours minus a speaker baseline. These pitch and style embeddings modulate the decoder hidden states via FiLM.

The overall multitask loss sums cross-entropy objectives for text alignment (L_txt) and mel-spectrogram prediction (L_mel), face encoder losses (contrast, MSE, distillation, orthogonality), and pitch MSE loss (L_pitch). At inference time, the system takes text, a face image, and a target dialect ID, translates the text into dialectal phrasing, predicts pitch offsets, applies FiLM conditioning on phoneme sequence representations, and synthesizes either mel-spectrograms or discrete audio tokens.

## Experimental setup

Evaluated on the AI Hub Korean Dialect Dataset comprising 2,749 speakers and ~1,511.55 minutes total duration across six dialects (Seoul, Gangwon, Gyeongsang, Jeolla, Jeju, Chungcheong). The Seoul subset contains 1,245 utterances (244.17 mins) with paired face images; each of the other five subsets contains 3,000 utterances (~230-293 mins each). Compared against XTTS-v2 baseline and ablation variants (w/o ENCstyle, w/o ENCID, w/o Pitch Predictor). Metrics include SECS, WER, MCD, F0-DTW-RMSE, G-SHAPE, F-SCALAR, F-SHAPE, MOD distance, MOS-F, MOS-N, and preference ranks. Implemented with a single NVIDIA RTX A6000 Ada 49GB GPU (batch size 10, AdamW lr=5e-6, 1.2M steps).

## Results

The proposed full model achieves a competitive SECS of 0.70 while significantly outperforming the XTTS-v2 baseline on WER (0.25 vs 0.29) and MCD (14.66 vs 18.93). On pitch and prosody structure, it beats the baseline across average G-SHAPE (2.45 vs 3.03), F-SCALAR (1.02 vs 1.09), F-SHAPE (1.27 vs 1.29), and MOD distance (1.45 vs 1.58). Subjectively, the full model achieves an average MOS of 3.96 for fluency and 3.90 for naturalness across dialects, outperforming XTTS-v2 (2.18 and 1.90) and the model without the pitch predictor (2.93 and 3.15). The baseline XTTS-v2 marginally wins on pure speaker embedding cosine similarity (SECS of 0.79 vs 0.70) when clean reference speech is available.

| System | SECS (↑) | WER (↓) | MCD (↓) |
|---|---|---|---|
| XTTS-v2 (Voice-based) | 0.79 | 0.29 | 18.93 |
| Ours w/o ENCstyle | 0.66 | 0.27 | 14.92 |
| Ours w/o ENCID | 0.65 | 0.25 | 15.41 |
| Ours (Full Face-based) | 0.70 | 0.25 | 14.66 |

## Limitations

The face encoder relies strictly on the Seoul dialect subset for paired face and mouth-shape training data, requiring cross-domain transfer to unobserved speakers of other regional dialects. Intra-dialect prosodic and acoustic variations are not fully explored. The approach is currently validated exclusively on the Korean language family.

## Why read this

Researchers building multimodal zero-shot TTS systems for low-resource or dialect-heavy languages will learn how to effectively decouple speaker identity from regional prosody using dual-branch visual encoders and FiLM-based pitch conditioning.

## Code

- https://dxlabskku.github.io/K-Dialect/

## Applications

Culturally faithful regional voice assistants, local media localization, interactive digital avatars, and low-resource dialect preservation.

## Institutions / 機構

Sungkyunkwan University, Jaume I University

**Funding / 經費:** MSIT, Korea, Global Research Support Program, ICAN, ITRC, IITP

## Related

- (link related pages by id as the wiki grows)
