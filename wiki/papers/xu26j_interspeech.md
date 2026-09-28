---
id: xu26j_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1128
pdf: https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf
---

# GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech

[PDF](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1128)

**TL;DR** — GLAD-CSpeech is a linguistically grounded benchmark corpus for genuine Chinese dialect speech spanning 16 dialect divisions and 23 regions, supporting ASR, TTS, and dialect identification tasks.

## Problem

Existing Chinese dialect speech resources suffer from severe class imbalances, administrative labeling that groups highly divergent varieties together, and an overreliance on unverified web data or mixed speech. This lack of a principled benchmark obscures model generalization capacities and complicates controlled analysis along the Mandarin-dialect continuum. GLAD-CSpeech addresses this bottleneck by adhering to professional dialectological taxonomy and separating genuine non-Mandarin structures from accented Mandarin.

## Method

The corpus contains over 163 hours of studio and real-world audio recorded across consumer-grade devices, featuring 6 speakers per dialect point. It utilizes a 3-layer annotation schema comprising a Mandarin semantic anchor, a character-first phonetically grounded dialect transcription layer, and a per-dialect lexicon glossary. Baseline models evaluated include Whisper-large-v3, Dolphin, and Qwen3-ASR for ASR, GPT-SoVITS fine-tuned on layer-2 transcriptions for TTS, and FireRedLID and fine-tuned Dolphin for dialect identification.

## Results

Zero-shot ASR evaluations on a 24-hour test split across 6 dialect points reveal that non-Mandarin dialects like Wenzhou (Wu) and Meixian (Hakka) pose the greatest challenge, yielding character error rates above 76%. For TTS, fine-tuning GPT-SoVITS on 3.93 hours of Xi'an dialect data achieves an overall MOS of 3.78, intelligibility MOS of 3.91, and an accent-authenticity MOS of 3.65. For dialect identification under a speaker-independent protocol, fine-tuned Dolphin achieves a Macro F1 score of 99.08%, whereas zero-shot FireRedLID reaches 72.29%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers evaluating or adapting automatic speech recognition, text-to-speech, and dialect identification systems for low-resource or highly varied Chinese dialects.

## Related

- (link related pages by id as the wiki grows)
