---
id: ohmura26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2231
pdf: https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.pdf
---

# LibriTTS-VI: A Public Corpus and Novel Methods for Efficient Voice Impression Control

*Junki Ohmura, Yuki Ito, Emiru Tsunoo, Toshiyuki Sekiya, Toshiyuki Kumakura*

[PDF](https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ohmura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2231)

**TL;DR** — LibriTTS-VI introduces a public speech corpus and disentanglement/reference-free training methods to solve impression leakage and control errors in numerical voice impression (VI) text-to-speech synthesis, reducing 11-dimensional VI mean squared error from 0.61 to 0.41 objectively.

## Key contributions

- Introduces LibriTTS-VI, the first public voice impression corpus based on LibriTTS-R, complete with human ratings on a 7-point Likert scale across 11 dimensions, annotation guidelines, and automatically labeled corpora.
- Proposes a disentangled training strategy (VIC-dis) using two distinct utterances from the same speaker to decouple speaker identity extraction from target voice impression conditioning.
- Proposes a speaker-reference-free method (VIC-srf) that completely eliminates speaker reference audio during inference, conditioning voice impressions solely on target vectors via Gaussian noise.
- Demonstrates that current large language model-based voice design models (e.g., Qwen3-TTS) exhibit semantic-impression entanglement and imprecise numerical control, which the proposed architectures resolve.

## Problem

Traditional text-to-speech control methods trade off precision and usability: acoustic features are too granular, speaker IDs/references limit flexibility to fixed categories, and natural language prompts lack fine-grained numerical control. Voice Impression Control (VIC) addresses this with an 11-dimensional numerical scale but suffers from two core bottlenecks: the absence of public corpora and "impression leakage," where reference audio unintentionally biases the synthesized voice away from the target voice impressions. Furthermore, existing prompt-based LLM-TTS models entangle text semantics with prosody and fail to yield precise scalar control.

## Method

The baseline VITS backbone utilizes a text encoder, Conformer layers, a stochastic duration predictor, and a speaker encoder containing a reference encoder (HuBERT + Bi-LSTM with attention) and a style token layer (STL). To address impression leakage in VIC-base, VIC-dis replaces the conditioning reference utterance with a separate utterance from the same speaker during training, while keeping the original utterance as the synthesis target and VI source. VIC-srf removes the reference audio entirely, replacing the reference encoder's projection with Gaussian noise z ~ N(0, I) and conditioning purely on the 11-dimensional target VI vector via a control module (CM).

The control module processes the intermediate reference vector with high-rate dropout and a linear projection, concatenates it with a linearly projected VI vector, and maps it to match dimensions. A gradient reversal layer (GRL) with a VI predictor is applied to suppress impression cues. Models are trained using standard VITS losses (adversarial, feature matching, reconstruction) alongside fine-tuning the control module for 60k steps after 600k pre-training steps on the VITS backbone. For LLM comparisons, Gemini 3 Pro generates paraphrased natural-language prompts mapped from quantized VI scales, tagged with continuous scalar values.

## Experimental setup

Evaluated on the LibriTTS-R test-clean set comprising 4,837 utterances and zero-shot evaluations on 39 unseen speakers. Baselines include VITS, VIC-base, and Qwen3-TTS-VoiceDesign variants (zero-shot QVD-z and fine-tuned QVD-f). Metrics include Character Error Rate (CER), Word Error Rate (WER) via Whisper large-v3, UTMOS for audio quality, Speaker Encoder Cosine Similarity (SECS) for speaker identity, VI-MSE, RVI-MSE, and impression leakage delta V. Trained on 8 NVIDIA A100 GPUs using the AdamW optimizer.

## Results

VIC-srf achieved the lowest VI control error with an RVI-MSE of 0.41 (down from 0.61 for VIC-base and 0.51 for VIC-dis) and minimized impression leakage delta V to 0.05 (compared to 0.22 for VIC-base). Intelligibility remained high, with VIC-srf scoring a WER of 7.72% (outperforming VIC-base's 8.17%) and UTMOS of 4.26. In subjective evaluations, VIC-srf reduced multiple-VI modulation MSE to 0.92 compared to VIC-1.15 for VIC-base. LLM-based baselines (QVD-z/QVD-f) scored poorly on speaker similarity (SECS 0.58 vs 0.77 for VIC-base) and exhibited high VI-MSE (0.82-0.87), proving incapable of precise scalar manipulation.

| Model | WER (%) | UTMOS | SECS | VI-MSE | RVI-MSE | Delta V |
|---|---|---|---|---|---|---|
| VITS | 8.63 | 4.20 | 0.77 | - | - | - |
| VIC-base | 8.17 | 4.23 | 0.77 | 0.39 | 0.61 | 0.22 |
| VIC-dis | 7.99 | 4.25 | 0.75 | 0.37 | 0.51 | 0.14 |
| VIC-srf | 7.72 | 4.26 | 0.72 | 0.36 | 0.41 | 0.05 |
| QVD-z | 5.42 | 4.27 | 0.58 | 0.82 | 0.97 | 0.15 |

## Limitations

Inter-annotator agreement for the corpus annotations varies widely, with several subjective VI dimensions (e.g., cold-warm, calmness-restlessness) falling below reliable Krippendorff's alpha thresholds. Audio quality MOS scores remain bounded below 3.8 due to anchor-interface bias in subjective testing. The scope is bounded to English data from LibriTTS-R, and extreme dimensional shifts (e.g., Mod +3 on certain dimensions) can occasionally introduce minor audio degradation.

## Why read this

Researchers building fine-grained controllable speech synthesis systems will learn how to diagnose and structurally eliminate impression leakage using disentangled multi-utterance training or reference-free generation.

## Code

- https://github.com/sony/LibriTTS-VI

## Applications

Fine-grained voice style manipulation in text-to-speech systems, expressive audiobook narration, character voice generation for gaming and animation, and interactive voice design tools.

## Related

- (link related pages by id as the wiki grows)
