---
id: huang26f_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1273
pdf: https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.pdf
---

# CodecMOS-Accent: A MOS Benchmark of Resynthesized and TTS Speech from Neural Codecs Across English Accents

[PDF](https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1273)

**TL;DR** — The paper introduces CodecMOS-Accent, a large-scale MOS benchmark evaluating neural audio codecs and LLM-based TTS models across ten English accents using 19,600 human annotations.

## Problem

Current speech synthesis benchmarks primarily rely on standard speech and automated objective metrics, leaving a critical gap in understanding how neural audio codecs and in-context learning TTS models perform on diverse non-standard speech like accented audio. Furthermore, existing evaluations often omit subjective human listening tests for accented voice cloning and resynthesis tasks. Addressing this requires a comprehensive dataset to systematically study perceptual quality, speaker similarity, and accent preservation.

## Method

The CodecMOS-Accent dataset comprises 4,000 samples derived from the VCTK corpus, featuring 32 speakers across 10 distinct English accents. The evaluated systems include 9 neural audio codec resynthesis models (such as Encodec, DAC, SpeechTokenizer, FACodec, Mimi, SNAC, WavTokenizer, NanoCodec, and NeuCodec) and 15 LLM-based voice cloning TTS models (such as VALL-E-X, TorToiSe, XTTS, FireRedTTS, MaskGCT, and CosyVoice 2). A crowdsourced subjective evaluation was conducted with 25 listeners from four accent regions rating 19,600 annotations across three dimensions on a five-point scale: naturalness (S-NAT), speaker similarity (S-SPK-SIM), and accent similarity (S-ACC-SIM). Additionally, objective baselines including word error rate (O-WER via Whisper), speaker embedding cosine similarity (O-SPK-SIM via ECAPA-TDNN), accent embedding similarity (O-ACC-SIM), and predicted speech quality (O-UTMOS) were computed and analyzed.

## Results

Subjective analysis revealed a strong correlation between speaker and accent similarity (0.75 utterance-level, 0.97 system-level), indicating that models capture global acoustic traits before achieving high-fidelity generation. Objective metrics demonstrated that O-SPK-SIM and UTMOS strongly correlate with subjective scores (0.86 and 0.96 system-level correlations, respectively), whereas word error rate showed poor correlation with perceived quality and should not be used as a standalone proxy. The study also identified a statistically significant 'same-accent bias' where listeners systematically assigned higher similarity scores to speakers sharing their native accent.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building, tuning, or deploying neural audio codecs, voice cloning, and zero-shot text-to-speech systems for multilingual or accented speech applications.

## Limitations

The listening test pool was heavily skewed toward US-based annotators, which may have influenced model bias findings regarding American-centric training data.

## Related

- (link related pages by id as the wiki grows)
