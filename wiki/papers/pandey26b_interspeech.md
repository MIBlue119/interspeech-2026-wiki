---
id: pandey26b_interspeech
category: asr
labels: [multilingual]
institutions: ["Karya", "Heinrich Heine University Düsseldorf", "University of Florida"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2179
pdf: https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.pdf
---

# Evaluation of forced alignment of code-mixed speech: the case of Hindi-English

*Ayushi Pandey, Pamir Gogoi, Kevin Tang*

[PDF](https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pandey26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2179)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — This paper evaluates forced alignment of Hindi-English code-mixed speech using the Montreal Forced Aligner, tackling orthographic inconsistencies (missing nuqta diacritics) and acoustic model selection. Acoustic models trained on sentence-level code-mixed data achieve a mean phoneme midpoint error of 4.15 ms—ten times lower than monolingual alternatives.

## Key contributions

- Identified and cataloged two major sources of errors in code-mixed forced alignment: segmental free variation ([pʰ]~[f] and [ʤ]~[z]) and orthographic variation caused by omitted Devanagari nuqta diacritics.
- Proposed a multistage lexicon refinement pipeline incorporating bilingual phone mapping, syllabic de-noising, nasal disambiguation, and phonological bootstrapping.
- Demonstrated that maximum bootstrapping mapping (e.g., ʤ→c and z→s) significantly improves lexicon accuracy, raising the F-score from 0.16 to 0.74 for the [ʤ]~[z] variation.
- Proved that acoustic models trained on sentence-level code-mixed data drastically outperform monolingual Hindi (38.18 ms error) and English (37.58 ms error) baselines, achieving a mean absolute midpoint error of 4.15 ms.

## Problem

Code-mixed speech featuring word-level insertions of English within a Hindi sentential frame presents severe challenges for forced alignment due to expanded inventories, speaker variation, and pervasive orthographic errors in scripts like Devanagari where diacritics are frequently omitted. Standard G2P systems and off-the-shelf monolingual acoustic models fail to capture bilingual production patterns, leading to high alignment drift and poor phonemic boundary detection. This lack of robust computational tooling hinders large-scale phonological and linguistic analysis of code-switching communities, especially in low-resource settings.

## Method

The experiments employ Montreal Forced Aligner (MFA) v1.0, a Kaldi-based GMM-HMM system utilizing fMLLR. For Experiment 1 (lexicon design), five bootstrapping configurations were tested on manually annotated free-variation sets ([pʰ]~[f] and [ʤ]~[z]): No mapping (control), Majority baseline, Dominant baseline mapping (mapping to native counterparts like p or c), Fricative/sibilant mapping, and Maximum Bootstrapping (mapping variants to distinct voiceless proxy phones, e.g., ʤ→c and z→s). This reduces phonetic ambiguity and prevents free-variation errors from propagating.

For Experiment 2 (acoustic data selection), three training configurations were evaluated: (1) full sentence-level code-mixed data (6,941 utterances from the PBCM corpus), (2) contiguous monolingual Hindi phrase-level chunks separated via TextGridTools, and (3) isolated word-level English chunks. Alignment quality was assessed by extracting phoneme midpoints and measuring absolute error against gold-standard manual annotations (10% of code-mixed English words). Code-mixed sentence models were chosen because sentence-level contexts provide critical co-articulatory cues and preserve natural bilingual prosody that isolated chunks discard.

## Experimental setup

Evaluated on the Phonetically Balanced Code Mixed (PBCM) corpus containing 6,941 read-speech utterances recorded by 113 Hindi-L1 speakers. Lexicon refinement handled 4,790 Hindi word types and 3,754 English word types. Baselines compared include unmodified G2P lexicons, majority baseline mapping, monolingual Hindi acoustic models, and monolingual English acoustic models. Metrics include accuracy, precision, recall, F-score for lexicon evaluation, and absolute midpoint error (in milliseconds) alongside error tolerance coverage percentages for forced alignment.

## Results

For [pʰ]~[f] variation, speakers overwhelmingly produced the fricative [f] despite the nuktaless script suggesting [pʰ]; simply mapping [pʰ]→[p] or utilizing the majority baseline achieved high F-scores up to 0.97 and 1.0 respectively, while unmapped models stalled at 0.72. For the more complex [ʤ]~[z] variation, the unmapped baseline failed completely with an F-score of 0.16, whereas Maximum Bootstrapping (ʤ→c and z→s) achieved the best F-score of 0.74 and precision of 0.84.

For acoustic model selection, sentence-level code-mixed training achieved a headline mean absolute error of 4.15 ms, vastly outperforming monolingual Hindi (38.18 ms) and monolingual English (37.58 ms) models. Under a strict <10 ms error tolerance, code-mixed sentence models covered 87.06% of phonemes compared to 48.10% for mono-Hindi chunks and 41.89% for mono-English words.

| System / Condition | Mean Absolute Error (ms) | F-score ([pʰ]~[f]) | F-score ([ʤ]~[z]) | Error <10ms (%) |
|---|---|---|---|---|
| Unmapped Baseline | - | 0.72 | 0.16 | - |
| Majority Baseline | - | 1.00 | 0.56 | - |
| Maximum Bootstrapping | - | 0.84 | 0.74 | - |
| Monolingual Hindi Chunks | 38.18 | - | - | 48.10 |
| Monolingual English Words | 37.58 | - | - | 41.89 |
| Code-Mixed Sentences | 4.15 | - | - | 87.06 |

## Limitations

The study relies on an older version of the Montreal Forced Aligner (v1.0), meaning results could potentially benefit from modern v3.x architectures supporting multi-variety acoustic models. The evaluation is restricted to read speech from a single Hindi-English code-mixed corpus (PBCM) with specific demographic backgrounds, limiting immediate generalization to spontaneous conversational code-switching or other language pairs.

## Why read this

Speech researchers and engineers building pipelines for bilingual or code-mixed audio will learn how principled lexicon bootstrapping and sentence-level code-mixed acoustic training eliminate alignment errors caused by orthographic ambiguities.

## Code

- https://github.com/Ayushi113/mfa-hindi-code-mixed

## Applications

Building robust speech recognition, alignment tools, and voice interfaces for bilingual communities and multilingual markets.

## Institutions / 機構

Karya, Heinrich Heine University Düsseldorf, University of Florida

## Related

- (link related pages by id as the wiki grows)
