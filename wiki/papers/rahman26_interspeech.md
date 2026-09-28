---
id: rahman26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1432
pdf: https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.pdf
---

# Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language

*Hanif Rahman, Shafeeq ur Rehman*

[PDF](https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rahman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1432)

**TL;DR** — This paper presents the Pashto Common Voice corpus, the first large-scale, openly licensed speech dataset for Pashto, growing to 147 total hours and 1,483 contributors across ten Mozilla Common Voice releases. Fine-tuning Whisper Base on this data achieves a 13.4% word error rate on the test split, down from 99.0% zero-shot performance.

## Key contributions

- Built the first open speech corpus for Pashto (147 total hours, 82.33 validated hours, 107,781 clips) licensed under CC-0 across ten Mozilla Common Voice releases (CV14-CV23).
- Quantified community growth dynamics, documenting a ~108-fold increase in speaker participation between consecutive releases (CV17 to CV18) driven by a VOA Pashto broadcast media campaign.
- Designed a phonemically targeted sentence curation methodology specifically addressing the four Pashto fricatives and affricates most frequently dropped in informal digital text.
- Established a first-party ASR baseline by fine-tuning Whisper Base (72.6M parameters) on MCV20, achieving 13.4% WER on the test split.

## Problem

Pashto has 60–80 million native speakers across Afghanistan, Pakistan, and the diaspora, yet prior to this work, no freely licensed open speech corpus existed at sufficient scale to train or fine-tune competitive Automatic Speech Recognition (ASR) systems. Furthermore, standard Persian and Arabic keyboards lack eight distinct Pashto consonants (four retroflex stops/nasals and four fricatives/affricates), causing informal digital text to routinely drop or substitute these characters and breaking standard cross-lingual transfer from related languages. This absence of open data and script-matching resources has kept Pashto entirely absent from modern open speech technology.

## Method

Corpus construction spanned seven phases: interface localisation of over 1,200 strings on Mozilla Pontoon, initial sentence collection, and a Wikipedia extraction pipeline targeting sentences of 15 words or fewer while filtering out foreign tokens, digits, and special characters. To fix orthographic gaps, community contributors introduced phonemically targeted sentences covering the four keyboard-absent fricatives and affricates (shin, zhe, dze, tse) and retroflex sounds. Community outreach combined a local Facebook page framing the project around accessibility (screen readers, voice interfaces for non-literate or disabled users) with video tutorials and broadcast media campaigns through VOA Pashto.

For downstream evaluation, the authors fine-tuned Whisper Base (72.6M parameters) on the MCV20 training split (4,693 clips). Training ran for 4,900 steps (~3 epochs) using a linear warmup to a peak learning rate of 5×10^-5 at step 1,000 followed by linear decay, performed on a consumer Apple MacBook Pro. Whisper's multilingual BPE tokenizer natively covers the Arabic Unicode block, enabling direct encoding of all Pashto-specific characters without vocabulary modifications.

## Experimental setup

The final MCV23 release includes 147.07 total hours (82.33 validated hours) across 107,781 total clips, 25,109 validated sentences, and 13 content domains. The fine-tuning baseline uses the MCV20 subset with a dev/test/train split of 3,660 / 3,660 / 4,693 clips. Baselines include the published Whisper Base zero-shot performance on Pashto (99.0% on Fleurs, 47.3% on CHiPSAL) and 10-shot adaptation (41.2% WER). Metrics evaluated are Word Error Rate (WER) and orthographic WER (WERortho).

## Results

Fine-tuning Whisper Base on MCV20 drops the word error rate from the published zero-shot baseline of 99.0% down to 13.4% (14.6% WERortho) at the final 4,900-step checkpoint. Intermediate checkpoints show rapid error reduction, achieving 93.5% WER at step 100, 57.0% at step 500, 46.7% at step 1,000, 30.9% at step 2,000, 22.5% at step 3,000, and 16.5% at step 4,000. 

The primary non-technical breakthrough was a massive step-discontinuity in corpus size—from 2.11 hours and 9 speakers in CV17 (March 2024) to 75.94 hours and 971 speakers in CV18 (June 2024)—directly correlated with a VOA Pashto broadcast campaign arranged by a community knowledge broker. However, the corpus lacks demographic balance, with gender unreported for 98% of speakers.

| System / Checkpoint | Epoch | WER (%) | WERortho (%) |
|---|---|---|---|
| Whisper Base Zero-Shot (Fleurs) [9] | 0 | 99.0 | - |
| Whisper Base 10-Shot (CHiPSAL) [6] | - | 41.2 | - |
| Fine-Tuned MCV20 (Step 100) | 0.1 | 93.5 | 94.6 |
| Fine-Tuned MCV20 (Step 1000) | 0.6 | 46.7 | 50.6 |
| Fine-Tuned MCV20 (Step 3000) | 1.9 | 22.5 | 25.3 |
| Fine-Tuned MCV20 (Final, Step 4900) | 3.1 | 13.4 | 14.6 |

## Limitations

The corpus is limited to 147 total hours, which is modest compared to high-resource languages, and consists entirely of prompted read speech rather than spontaneous conversational data. Dialectal coverage is uncontrolled and likely skewed toward Northern (Yusufzai) varieties due to the heavy concentration of diaspora contributors. Furthermore, 98% of speakers left the gender metadata field blank, preventing gender-aware evaluation and bias auditing.

## Why read this

Researchers and engineers building speech technology for script-minority or low-resource languages should read this paper to learn a practical blueprint for combining community-driven digital localisation, targeted phonemic sentence curation, and broadcast media broker strategies. It demonstrates how to successfully adapt off-the-shelf multilingual models like Whisper to previously unsupported languages using consumer hardware.

## Code

- https://huggingface.co/ihanif/ps_base_l1

## Applications

Automated speech recognition, screen readers, and voice-controlled digital assistants for Pashto speakers, particularly benefiting non-literate or visually impaired users.

## Related

- (link related pages by id as the wiki grows)
