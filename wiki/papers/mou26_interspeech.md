---
id: mou26_interspeech
category: deepfake-security
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2298
pdf: https://www.isca-archive.org/interspeech_2026/mou26_interspeech.pdf
---

# DuraMark: Duration-Embedded Watermarking in LLM-based TTS

*Zhenwei Mou, Weili Jiang, Liping Chen, Zhen-Hua Ling, Kong Aik Lee, Kai Gao, Boyu Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/mou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2298)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — DuraMark is an information-level speech watermarking framework for LLM-based TTS that embeds watermarks via syllable duration editing, achieving a mean TPR of 99.3% across diverse generative attacks.

## Key contributions

- Develops a duration-controllable LLM-based TTS model that enables precise syllable-level duration editing during generation.
- Introduces DuraMark, an information-level watermarking framework that encodes binary watermarks into syllable duration states (even/odd frame counts).
- Designs a transformer-based duration extractor to recover syllable durations from speech spectrograms for robust detection.
- Demonstrates superior resilience against neural codec, neural vocoder, and traditional signal-processing attacks compared to signal-level baselines.

## Problem

Mainstream speech watermarking methods operate at the signal level (time, frequency, or spectrogram domains), making them highly vulnerable to generative attacks like neural audio codecs and vocoders that smooth out redundant fine-grained signal details. Prior attempts at information-level watermarking rely on post-processing pitch values, which disrupts natural prosody. These vulnerabilities undermine the traceability of AI-generated deepfake audio in real-world deployment scenarios where audio frequently passes through compression and neural resynthesis pipelines.

## Method

DuraMark is built around a duration-controllable LLM-based TTS framework paired with a flow matching decoder and a duration extractor. The LLM predicts syllable-level duration tokens and speech tokens autoregressively, conditioned on text embeddings and speaker embeddings. During embedding, a binary watermark sequence dictates whether each syllable's duration must be an even or odd frame count, modifying the LLM's sampled duration token to the nearest preferred state. A flow matching decoder synthesizes Mel-spectrograms conditioned on these edited durations and speech tokens, guided by a frozen duration extractor loss to ensure precise alignment.

The detection phase uses a transformer-based duration extractor that takes text and Mel-spectrogram features to predict frame-level syllable probabilities, which are summed into estimated syllable durations. These durations are mapped to a [-1, 1] interval and correlated against the target binary watermark sequence to yield a similarity score against a decision threshold tau.

The model is trained on 10,000 hours of Mandarin speech from WenetSpeech with Montreal Forced Aligner-derived boundaries, using the Adam optimizer at a learning rate of 1e-5 across eight MLU 580 GPUs with loss weights lambda_llm = 1 and lambda_flow = 4.

## Experimental setup

Experiments use Mandarin Chinese data, training on 10,000 hours from WenetSpeech and evaluating on 214 speakers from AISHELL-3. Baselines include AudioSeal, Timbre, and WavMark. Performance is measured using True Positive Rate (TPR) at a 1.0% False Positive Rate (FPR), Character Error Rate (CER) via Whisper, and Mean Opinion Score (MOS) from eleven native speakers.

## Results

DuraMark achieves an average TPR of 0.993 for informed detection (DuraMark-Info) and 0.978 for blind detection (DuraMark-Blind) across all attacks, vastly outperforming AudioSeal (0.701), Timbre (0.790), and WavMark (0.403). Under neural codec attacks like DAC (4.5k), DuraMark achieves 0.996 TPR compared to AudioSeal's 0.512 and WavMark's 0.002. Under vocoder attacks such as HiFiGAN, DuraMark maintains 0.994 TPR while WavMark drops to 0.007. Ablation studies prove that removing either duration input or guidance loss collapses the TPR to roughly 0.32–0.47.

| System | None | EnCodec (6k) | DAC (4.5k) | HiFiGAN | MP3 (32k) | Average TPR |
|---|---|---|---|---|---|---|
| AudioSeal [7] | 1.000 | 0.773 | 0.512 | 0.013 | 1.000 | 0.701 |
| Timbre [23] | 1.000 | 0.124 | 0.832 | 1.000 | 1.000 | 0.790 |
| WavMark [8] | 1.000 | 0.015 | 0.002 | 0.007 | 1.000 | 0.403 |
| DuraMark-Info | 0.998 | 0.991 | 0.994 | 0.994 | 0.998 | 0.993 |
| DuraMark-Blind | 0.987 | 0.968 | 0.979 | 0.985 | 0.983 | 0.978 |

## Limitations

Evaluated exclusively on Mandarin Chinese where characters map directly to syllables, leaving morphologically rich or non-tonal languages untested. Blind detection relies on an external ASR system, which introduces minor degradation compared to informed text-based detection. Shorter utterances (under 32 syllables) exhibit slightly lower detection reliability.

## Why read this

Researchers building robust speech attribution systems against generative neural attacks will find a blueprint for leveraging duration control in LLM-based TTS as an information-level watermarking channel.

## Code

- https://muzw.github.io/duramark_demo/

## Applications

Tracing deepfake speech misuse, content authenticity verification for AI-generated synthetic voice services, and broadcast media provenance tracking.

## Institutions / 機構

University of Science and Technology of China, Institute of Forensic Science, Ministry of Public Security, Hong Kong Polytechnic University

## Related

- (link related pages by id as the wiki grows)
