---
id: baumann26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3378
pdf: https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.pdf
---

# PhonLLM: Joint Phone Recognition and Phonological Process Inference for Child Speech

[PDF](https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3378)

**TL;DR** — PhonLLM introduces phonological process inference to jointly recover canonical phone sequences and explicit process tags from child speech, lowering the Phone Error Rate to 23.5 compared to 58.0 for traditional ASR baselines.

## Problem

Clinical child speech assessment requires time-intensive manual transcription and error labeling by speech therapists, which is difficult to scale. Standard ASR systems can transcribe speech but fail to provide granular, interpretable phone-level diagnostic feedback or identify systematic phonological deviations like fronting and backing. Framing mispronunciations as isolated errors misses the structured transformations that characterize speech sound disorders in children.

## Method

The architecture uses a frozen 300M wav2vec 2.0 audio encoder (OmniASR) and a frozen 1B LLaMA decoder, trained via LoRA (r=16, α=32) alongside an audio projection module. The model operates in two stages: initial pretraining on 9.8k hours of adult multilingual speech for phone recognition, followed by fine-tuning on child corpora using a fusion of downsampled audio embeddings (every 5 frames) and expected phone sequences derived from orthography. A rule-based data augmentation pipeline automatically injects supervision for processes like velar fronting, coronal backing, and deletion without manual labeling.

## Results

Evaluated on clinical child corpora across German, English, and Icelandic, PhonLLM achieves an average tagging F1 of 75.9 (massively outperforming the 19.2 chance level) and a Phone Error Rate (PER) of 23.5 with an Articulatory Weighted PER (AW-PER) of 12.6. This significantly improves upon an XLSR-53 transcription baseline, which yields a PER of 58.0 and AW-PER of 26.2. Among processes, fronting achieves the highest consistency (F1 in the 80s, peaking at 90.1 on Másdóttir), while deletion is more difficult (F1 66.6 to 74.9).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and engineers building Computer-Assisted Pronunciation Training (CAPT) or automated speech screening tools for children.

## Limitations

Performance varies across languages due to differing per-process sample sizes, with German datasets showing lower recall compared to English or Icelandic corpora.

## Related

- (link related pages by id as the wiki grows)
