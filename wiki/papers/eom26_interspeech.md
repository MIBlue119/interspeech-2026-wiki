---
id: eom26_interspeech
category: tts
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3190
pdf: https://www.isca-archive.org/interspeech_2026/eom26_interspeech.pdf
---

# Transcript-Free Flow-Matching Text-to-Speech via Speech Feature Conditioning

*SooHwan Eom, Hee Suk Yoon, Eunseop Yoon, Mark Hasegawa-Johnson, Chang D. Yoo*

[PDF](https://www.isca-archive.org/interspeech_2026/eom26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eom26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3190)

**Category:** `tts` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — RTFree-F5 replaces text-based reference conditioning in flow-matching text-to-speech with continuous self-supervised speech features, eliminating the need for reference transcripts and reducing Word Error Rate on dysarthric speech from 24.6% to 10.4%.

## Key contributions

- Replaces reference transcript conditioning in zero-shot F5-TTS with continuous SSL features (WavLM-Large) mapped via a lightweight MLP projector, removing reliance on ASR systems at inference.
- Fully reuses pretrained F5-TTS checkpoints without retraining the core backbone from scratch.
- Introduces a two-stage training recipe: cross-modal projection alignment followed by joint fine-tuning of the projector and the DiT flow-matching backbone on cross-utterance same-speaker pairs.
- Demonstrates massive intelligibility and naturalness gains on challenging non-native (L2-ARCTIC) and dysarthric (SAP) speech reconstruction tasks, outperforming even oracle transcript baselines.

## Problem

State-of-the-art non-autoregressive zero-shot TTS models like E2-TTS and F5-TTS depend on reference transcripts at inference time—typically acquired via external ASR systems—to construct their text-infilling conditioning space. For speakers with atypical patterns such as dysarthria or strong non-native accents, ASR errors severely degrade synthesis quality. Moreover, even when perfect ground-truth transcripts are provided, text-based reference conditioning propagates pathological or accented acoustic traits directly from the reference audio into the final output due to a fundamental mismatch between normative text tokens and non-standard speech acoustics.

## Method

RTFree-F5 modifies the conditioning branch of F5-TTS by extracting frame-level representations from reference audio using a frozen WavLM-Large encoder (1024 dimensions, operating at 50 Hz, linearly interpolated to 93.75 Hz mel frame rate). A lightweight two-layer MLP projector with LayerNorm and GELU activation maps these SSL features into the 512-dimensional text-conditioning space of F5-TTS. The projected speech features are concatenated with the target text encoder features along the temporal axis to form the final conditioning input for the Diffusion Transformer (DiT) flow-matching backbone.

Training proceeds in two stages using cross-utterance pairs (reference and target utterances from the same speaker) sampled from LibriTTS with durations between 0.3 and 30 seconds. In Stage 1, only the 0.8M-parameter projector is optimized for 10 epochs via the flow-matching objective while the DiT backbone and WavLM encoder remain frozen. In Stage 2, the projector and DiT backbone are jointly fine-tuned for 20 epochs using AdamW (learning rates of 5e-5 for the projector and 1e-5 for the DiT backbone) with classifier-free guidance dropout (0.3 audio drop, 0.2 joint drop).

At inference time, the model executes 32 function evaluations (NFE) via the Euler ODE solver (sway sampling coefficient -1, CFG strength 2.0) using the Vocos vocoder at 24 kHz. No reference transcript is required during inference, enabling direct zero-shot voice cloning from raw reference audio.

## Experimental setup

Evaluated on typical-speaker datasets (LibriSpeech-PC test-clean, SeedTTS test-en) and atypical-speaker datasets (SAP dev split for dysarthria, L2-ARCTIC test split for accented English). Baselines include pretrained F5-TTS conditioned on oracle transcripts and Whisper large-v3 ASR transcripts, alongside original reference audio metrics. Metrics include Whisper large-v3 Word Error Rate (WER), ECAPA-TDNN speaker similarity (SIM), and UTMOS predicted naturalness. Implemented on 4 NVIDIA A100 GPUs using the pretrained F5-TTS v1 Base checkpoint.

## Results

On LibriSpeech-PC, RTFree-F5 achieves a 1.77% WER, 0.66 SIM, and 4.13 MOS, outperforming the oracle baseline (2.08% WER, 3.83 MOS). On dysarthric speech (SAP), RTFree-F5 drops WER from 24.62% (original) down to 10.39%, beating the oracle transcript baseline (20.71% WER) and raising MOS from 2.16 to 2.85, though speaker similarity trades off slightly from 0.60 to 0.50. On non-native speech (L2-ARCTIC), it cuts WER from 10.75% (original) to 1.44% (beating the 2.00% oracle baseline) while improving MOS from 3.82 to 4.08 and maintaining speaker similarity (0.61). Ablations show that stopping after Stage 1 (projector only) causes catastrophic failure on dysarthric data (90% WER), confirming that joint fine-tuning in Stage 2 is mandatory.

| Model | SAP (Dysarthria) WER (%) | SAP MOS | L2-ARCTIC WER (%) | L2-ARCTIC MOS |
|---|---|---|---|---|
| Original | 24.62 | 2.16 | 10.75 | 3.82 |
| Baseline (oracle) | 20.71 | 2.27 | 2.00 | 3.92 |
| Baseline (ASR) | 20.46 | 2.27 | 1.99 | 3.92 |
| RTFree Stage 1 | 90.00 | 2.19 | 7.53 | 4.00 |
| RTFree Stage 2 (Ours) | 10.39 | 2.85 | 1.44 | 4.08 |

## Limitations

The method experiences a trade-off on dysarthric speech where intelligibility gains reduce speaker similarity scores, partly because standard speaker embedding models (ECAPA-TDNN) conflate identity with pathological traits. Scope is bounded to English language evaluations across tested public corpora, and performance relies heavily on the quality and capacity of the frozen WavLM-Large encoder and F5-TTS base model.

## Why read this

Speech and ML researchers working on zero-shot TTS and atypical speech reconstruction should read this to understand how continuous self-supervised representations can bypass the brittle text-conditioning bottleneck of modern flow-matching models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accessibility communication tools for dysarthric speakers, accent-normalized speech translation, and robust zero-shot voice cloning.

## Institutions / 機構

Korea Advanced Institute of Science and Technology, University of Illinois Urbana-Champaign

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
