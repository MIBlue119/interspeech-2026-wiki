---
id: teikitohe26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3276
pdf: https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.pdf
---

# Speech Recognition to Accelerate Documentation of Marquesan and Cook Islands Māori

[PDF](https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/teikitohe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3276)

**TL;DR** — This paper explores automatic speech recognition for documenting under-resourced Polynesian languages, achieving a median character error rate of 16.0 and word error rate of 31.4 for Marquesan, and demonstrates that ASR-assisted correction accelerates human transcription by 0.7x to 2.4x.

## Problem

Endangered languages like Marquesan and Cook Islands Māori lack robust speech technologies, hindering efficient language documentation and community-driven revitalization. While speech tools are increasingly proposed to accelerate transcription, empirical evidence on whether they yield actual time gains in real-world documentation workflows remains sparse and contradictory.

## Method

The authors collected 17 hours of naturalistic Marquesan audio across six dialects and used it to fine-tune several speech foundation models, including Wav2Vec2 Large XLSR-53, MMS-1b-all, Whisper Medium, Parakeet TDT, Qwen3 ASR, and Omnilingual 1B. For decoding, models such as Wav2Vec2, MMS, Whisper, and Omnilingual were integrated with a KenLM language model. They also evaluated transfer and joint training configurations combining Marquesan data with 4 hours of Cook Islands Māori data, and measured human transcription latency using ELAN compared against manual-from-scratch baselines.

## Results

For Marquesan, Wav2Vec2-XLSR53 with a language model achieved the best monolingual performance with a median CER of 16.0 and WER of 31.4, outperforming Whisper Medium (CER 19.4, WER 41.7) and MMS-1b-All (CER 26.4, WER 69.2). Joint training with Cook Islands Māori offered a minor, statistically insignificant improvement for Marquesan (CER 15.4, WER 30.8), but provided no gains for Cook Islands Māori. In workflow evaluations, human transcribers correcting ASR outputs completed the task between 0.7x and 2.4x faster than transcribing the same audio entirely manually.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguists, language archivists, and indigenous community members can use these ASR pipelines to rapidly transcribe oral archives and accelerate language documentation workflows.

## Limitations

The Marquesan models suffer from relatively high word error rates due to word boundary confusions and natural acoustic variability from multi-speaker fieldwork recordings.

## Related

- (link related pages by id as the wiki grows)
