---
id: rahman26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1432
pdf: https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.pdf
---

# Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language

[PDF](https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1432)

**TL;DR** — This paper presents the Pashto Common Voice corpus—the first large-scale open speech resource for Pashto—enabling fine-tuned Whisper Base to achieve a 13.4% word error rate.

## Problem

Pashto lacks open speech datasets despite having over 60 million native speakers, largely due to script and keyboard gaps that omit unique retroflex and fricative consonants. This absence of freely licensed data has historically blocked the development and training of competitive automated speech recognition systems for the language. Consequently, pre-trained multilingual models perform poorly out-of-the-box on Pashto speech.

## Method

The corpus was constructed through interface localization, automated Wikipedia sentence extraction, and phonemically targeted contributions specifically designed to cover the eight Pashto characters missing from standard keyboards. Community growth was driven by social media outreach and a high-impact Voice of America broadcast media campaign. The authors fine-tuned Whisper Base (72.6M parameters) on the MCV20 subset using consumer hardware for 4,900 steps with linear learning rate warmup and decay.

## Results

The final MCV23 release includes 147.07 total hours (82.33 validated hours) across 107,781 clips from 1,483 unique speakers and 13 content domains. Fine-tuning Whisper Base on MCV20 drops the word error rate to 13.4% on the MCV20 test split, compared to a published zero-shot baseline of 99.0% on Fleurs. Speaker participation exhibited a massive 108-fold surge between consecutive releases following broadcast media coverage.

## Code

- https://huggingface.co/ihanif/ps_base_l1

## Applications

Speech engineers and researchers can use this corpus to train, fine-tune, and evaluate automatic speech recognition models and self-supervised speech representations for Pashto.

## Limitations

The dataset is restricted to prompted read speech rather than spontaneous conversation, lacks controlled dialectal representation, and suffers from an almost complete lack of reported gender metadata.

## Related

- (link related pages by id as the wiki grows)
