---
id: znotins26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3469
pdf: https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.pdf
---

# Low-Resource Medical ASR for Rich Transcription in Latvian

[PDF](https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3469)

**TL;DR** — This paper investigates domain-adapted end-to-end ASR and a two-stage ASR+LLM pipeline for rich medical transcription in low-resource Latvian, achieving a word error rate of 10.6% using an LLM-driven data curation strategy.

## Problem

Medical ASR requires rich, formatted transcriptions featuring proper punctuation, casing, abbreviations, numeric expressions, and clinical terminology, but high-performance models for high-resource languages do not transfer well out-of-the-box to low-resource languages like Latvian. General-domain ASR models degrade severely on medical dictations (WER worsening from 3-13% to 12-46%), while manual rule-based post-processing pipelines require heavy engineering overhead. Overcoming this requires effective domain adaptation under strict data constraints.

## Method

The authors introduce LVMED, a 50-hour Latvian medical speech corpus spanning radiology, histopathology, clinical discharge, and surgery, paired with legacy verbatim transcripts and formatted reports. To mitigate data scarcity, they propose an LLM-driven curation workflow using Gemini 3 Pro to convert legacy verbatim text into paired rich transcripts and generate 75 hours of LLM-corrected pseudo-labeled audio filtered at a 15% WER threshold. They evaluate two adaptation paradigms: (1) end-to-end foundation model fine-tuning (Whisper, Canary, Wav2Vec2-BERT, and Gemma-3n) using a two-stage recipe (pre-training on 200+ hours of general Latvian data before in-domain adaptation), and (2) a two-stage pipeline combining verbatim ASR models with text-only LLMs (Gemma-3 1B, 4B, and 12B) fine-tuned on roughly 30,000 paired segments.

## Results

Evaluated on the LVMED test set using specialized metrics including WER, V-WER, CER, PER, PC-ER, N-ER, and medical concept error rate (MC-ER), the best end-to-end model (ft-whisper-large-v3 trained with pseudo-labels) achieved a WER of 10.6%—more than six times lower than the unadapted Whisper baseline. The two-stage ASR plus text LLM pipeline (using ft-whisper-large-v3 and ft-gemma3-12b) achieved a competitive 11.2% WER and superior punctuation command recognition with a 2.1% PC-ER. Pre-training on general-domain Latvian data was shown to be crucial given the small size of the in-domain medical corpus.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building clinical documentation, electronic health record auto-filling, and medical dictation transcription systems for low-resource languages.

## Limitations

Error analysis indicates persistent challenges regarding sentence segmentation choices and stylistic variations in comma placement, as well as minor terminology inconsistencies between Latvian and Latin drug names.

## Related

- (link related pages by id as the wiki grows)
