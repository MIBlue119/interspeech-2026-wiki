---
id: tamiru26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2658
pdf: https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.pdf
---

# High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages

[PDF](https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2658)

**TL;DR** — This paper builds high-quality, multi-speaker Text-to-Speech systems for Amharic and Afan Oromo by fine-tuning SpeechT5 on newly recorded, linguistically enriched studio datasets, achieving human-evaluated MOS scores of 4.65 and 4.43 respectively.

## Problem

Modern speech technologies are predominantly developed for high-resource languages, leaving low-resource languages like Amharic and Afan Oromo underserved. Traditional TTS methods for these languages rely on small, domain-limited corpora, concatenative synthesis, or rule-based models that fail to capture complex phonological phenomena such as gemination and context-sensitive pronunciation, resulting in poor naturalness and scalability.

## Method

The authors created a studio-recorded corpus totaling 200 hours of speech (100 hours each for Amharic and Afan Oromo, split across two male and two female speakers), captured at 16 kHz mono. For Amharic, an additional 13 hours of targeted data was curated to explicitly address homographs, gemination, and context-dependent pronunciations, bringing its total to 113 hours. Text inputs were normalized, tokenized via the SpeechT5 tokenizer (with Ge'ez script transliterated to Latin characters for Amharic), and fed into the SpeechT5 Transformer encoder-decoder model. The system was trained using 512-dimensional x-vector speaker embeddings to condition the decoder for multi-speaker synthesis, utilizing the Adam optimizer with a learning rate of 1e-5, mixed-precision, and gradient accumulation.

## Results

Evaluated using ten expert native speakers rating 250 utterances per language, the Amharic model achieved an overall Mean Opinion Score (MOS) of 4.65 (with naturalness at 4.62, intelligibility at 4.68, and pronunciation at 4.65), while the Afan Oromo model achieved an overall MOS of 4.43 (naturalness 4.58, intelligibility 4.72, pronunciation 3.98). Adding the 13-hour targeted linguistic dataset for Amharic raised its overall MOS from 4.12 to 4.65. Objective validation loss decreased as dataset size scaled from 50 to 100 hours (dropping from 0.3996 to 0.3662 for Afan Oromo, and 0.3915 to 0.3710 for Amharic).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building inclusive virtual assistants, screen readers, and mobile speech features for Ethiopian language speakers.

## Limitations

The system relies on standardized input text at inference time and does not yet feature a fully automated linguistic front-end for homograph disambiguation.

## Related

- (link related pages by id as the wiki grows)
