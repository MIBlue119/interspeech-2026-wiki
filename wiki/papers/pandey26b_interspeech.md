---
id: pandey26b_interspeech
category: speech-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2179
pdf: https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.pdf
---

# Evaluation of forced alignment of code-mixed speech: the case of Hindi-English

[PDF](https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2179)

**TL;DR** — This paper evaluates forced alignment on Hindi-English code-mixed speech using the Montreal Forced Aligner, demonstrating that code-mixed sentence-level acoustic training achieves a mean alignment error of 4.15 ms—ten times lower than monolingual alternatives.

## Problem

Code-mixed speech introduces severe challenges for forced alignment due to expanded phonetic inventories, orthographic errors such as omitted nuqta diacritics, and speaker variation. Standard G2P systems and monolingual acoustic models fail to account for bilingual production realities, resulting in alignment drift and poor phonemic boundary detection. Addressing these hurdles is vital for enabling large-scale computational phonological and linguistic analysis of multilingual communities.

## Method

The study employs Montreal Forced Aligner v1.0 (a Kaldi-based GMM-HMM system using fMLLR) to conduct two primary evaluations. First, it tests five lexicon bootstrapping configurations to handle segmental free-variation pairs ([ph ]~[f] and [Ã]~[z]), ranging from raw G2P output to targeted structural proxy mappings. Second, it compares three acoustic model training recipes using the Phonetically Balanced Code Mixed (PBCM) corpus (6,941 utterances from 113 speakers): full sentence-level code-mixed data, contiguous Hindi phrase-level chunks, and isolated English word chunks.

## Results

Evaluated on hand-annotated gold-standard phonemes and midpoint absolute errors, the results show that simple de-aspiration mappings for /ph / to /p/ achieve high F-scores (up to 0.97), correcting for orthographic nukta deficits. For acoustic model selection, models trained on sentence-level code-mixed data yield a mean error of 4.15 ms, dramatically outperforming monolingual Hindi (38.18 ms) and isolated English (37.58 ms) training setups.

## Code

- https://github.com/Ayushi113/mfa-hindi-code-mixed

## Applications

Speech engineers, phoneticians, and computational linguists working on speech recognition, corpus creation, and linguistic documentation for bilingual or code-switched populations.

## Limitations

The analysis is constrained to Hindi-English bilingual speech and utilizes an older GMM-HMM aligner framework rather than modern neural or end-to-end architectures.

## Related

- (link related pages by id as the wiki grows)
