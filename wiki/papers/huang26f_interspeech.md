---
id: huang26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1273
pdf: https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.pdf
---

# CodecMOS-Accent: A MOS Benchmark of Resynthesized and TTS Speech from Neural Codecs Across English Accents

*Wen-Chin Huang, Nicholas Sanders, Erica Cooper*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1273)

**TL;DR** — The paper introduces CodecMOS-Accent, a large-scale MOS benchmark evaluating 24 neural audio codec resynthesis and LLM-based TTS systems across 10 English accents via 19,600 annotations. It reveals high correlation between speaker and accent similarity, significant same-accent perceptual bias, and the surprising system-level predictive power of older objective metrics like UTMOS on modern models.

## Key contributions

- Curated CodecMOS-Accent: 4,000 resynthesis and voice-cloning test samples from 24 open-source systems, 32 speakers, and 10 English accents.
- Collected 19,600 subjective annotations from 25 listeners across three explicit dimensions: naturalness (S-NAT), speaker similarity (S-SPK-SIM), and accent similarity (S-ACC-SIM).
- Uncovered a perceptual 'same-accent bias' where listeners consistently award higher similarity and naturalness scores to speech matching their own accent.
- Demonstrated that low-layer representations in models like SpeechTokenizer preserve robust speaker and accent traits, challenging assumptions that initial codec layers encode purely low-level linguistic features.

## Problem

Modern neural audio codecs (NACs) and LLM-based text-to-speech (TTS) systems are rarely evaluated using subjective human listening tests, especially for non-standard speech types such as accented speech. Prior benchmarks like DASB and Codec-SUPERB focus heavily on reconstruction quality and downstream discriminative tasks rather than perceptual voice cloning and accent fidelity. Furthermore, existing evaluation relies on unvalidated objective proxies or small-scale human tests, leaving a gap in understanding how well contemporary synthesis architectures generalize across diverse regional English accents and how human perception correlates with automated metrics.

## Method

The authors constructed the CodecMOS-Accent dataset using VCTK source material downsampled to 16 kHz and trimmed of leading/trailing silences. A balanced selection of 32 speakers spanning 10 distinct English accents and 20 female/12 male profiles yielded 160 ground truth utterances (5 samples per speaker), with secondary reference utterances selected for voice cloning tasks. The evaluation suite incorporates 9 resynthesis models operating at various bitrates (Encodec, DAC, SpeechTokenizer, FACodec, Mimi, SNAC, WavTokenizer, NanoCodec, NeuCodec) and 15 open-source voice-cloning/TTS systems (including VALL-E-X, TorToiSe, XTTS, CosyVoice 2, Llasa-1B, and MaskGCT). Crowd-sourced listeners from four English-speaking regions evaluated 4,000 total samples across 3 explicit 5-point MOS dimensions: naturalness (S-NAT), speaker similarity (S-SPK-SIM), and accent similarity (S-ACC-SIM). Objective evaluation benchmarks included Whisper-based Word Error Rate (O-WER), ECAPA-TDNN speaker embedding cosine similarity (O-SPK-SIM), CommonAccent ECAPA-TDNN accent similarity (O-ACC-SIM), and UTMOS for predicted quality.

## Experimental setup

The dataset comprises 4,000 samples evaluated across 24 systems and ground truth. A total of 25 crowdfunded listeners (19 US, 2 Canadian, 3 English, 1 Scottish) provided 19,600 total ratings (4.9 annotations per sample), with 275 annotations discarded due to silence or severe quality anomalies. Baselines include 9 open-source NAC resynthesis frameworks and 15 open-source neural TTS architectures. Evaluation metrics consist of human MOS ratings (S-NAT, S-SPK-SIM, S-ACC-SIM) and automated metrics (O-WER, O-SPK-SIM, O-ACC-SIM, O-UTMOS).

## Results

Ground truth samples ranked 9th in naturalness (S-NAT: 4.045) due to inherent VCTK recording artifacts, while modern TTS models like CosyVoice 2 and OpenAudio s1 mini achieved superior naturalness scores of 4.430 and 4.291 by stripping away background recording noise. Subjective speaker and accent similarity showed a high utterance-level Pearson correlation of 0.75, and system-level O-SPK-SIM strongly correlated with S-ACC-SIM (r = 0.90) and S-SPK-SIM (r = 0.86). Surprisingly, UTMOS (trained on 2020-era BVCC data) exhibited a massive 0.96 system-level correlation with S-NAT for post-2020 architectures. Conversely, O-WER showed poor correlation with subjective quality dimensions, warning against using intelligibility proxies as sole quality metrics.

| System | S-NAT | S-SPK-SIM | S-ACC-SIM | O-UTMOS |
|---|---|---|---|---|
| Ground Truth | 4.045 | 4.756 | 4.678 | 4.082 |
| CosyVoice 2 | 4.430 | 4.241 | 4.097 | 4.349 |
| OpenAudio s1 mini | 4.291 | 4.158 | 4.125 | 4.344 |
| Llasa-1B | 4.240 | 4.135 | 4.009 | 4.352 |
| MaskGCT | 3.763 | 4.586 | 4.483 | 3.843 |
| VALL-E-X | 3.073 | 3.858 | 3.786 | 3.649 |

## Limitations

The listening test pool was heavily skewed toward US-based listeners (19 out of 25), limiting the granular balance across non-American regional accents. The dataset is restricted to English accents and open-source models, omitting proprietary commercial black-box systems like ElevenLabs or OpenAI Voice Engine. Additionally, evaluation is bound to 10 specific English regional varieties represented in VCTK, omitting broader global or non-native English variations.

## Why read this

Speech synthesis and machine learning researchers building or evaluating neural audio codecs and voice-cloning LLMs should read this to understand the perceptual limitations of current objective metrics and how accent/speaker similarity intertwines. It provides an essential blueprint and benchmark dataset for human-centric evaluation of zero-shot text-to-speech models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot voice cloning, accented text-to-speech synthesis, speech quality assessment (SQA) model development, and neural codec design.

## Related

- (link related pages by id as the wiki grows)
