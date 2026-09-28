---
id: maxwell26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2830
pdf: https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.pdf
---

# Pronunciation and Intonation Structured Markup (PRISM): A Dataset for Australian English Pronunciation Feedback

*Olga Maxwell, Uy Thinh Quang, Debbie Loakes, Adele Gregory, Robert Turnbull*

[PDF](https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2830)

**TL;DR** — The paper introduces PRISM (Pronunciation and Intonation Structured Markup), an open dataset and linguistically grounded annotation framework for Australian English pronunciation feedback containing 859 expert-annotated errors across three learner accent groups. It reveals an even split between segmental (49.9%) and prosodic (46.1%) pronunciation differences, addressing critical sociophonetic gaps in existing commercial AI tools.

## Key contributions

- Developed PRISM, a curated, open-access dataset derived from a demographically stratified subset of CommonVoice 21.0 targeting international student populations in Australia (Hong Kong, Indonesia, South Asia).
- Established a scientifically grounded, interdisciplinary annotation taxonomy comprising 13 major classes and 53 fine-grained categories covering both segmental features (Wells' lexical sets, consonants by place/manner) and prosodic features (pitch, nuclear tunes, rhythm, pauses).
- Evaluated distribution patterns across 859 annotations, demonstrating that prosodic and fluency features (pause insertion, rhythm, linking) comprise nearly half of all recorded pronunciation deviations alongside traditional segmental errors.
- Highlighted and analyzed critical data curation challenges in open speech corpora, such as severe speaker-to-recording demographic imbalances (e.g., 3 Indonesian speakers contributing 42.6% of observations vs. 50 South Asian speakers).

## Problem

Automated computer-assisted pronunciation training (CAPT) and ASR-based tools largely treat pronunciation as a binary correct/incorrect condition, ignore suprasegmental prosodic features (intonation, rhythm, prominence), and penalize advanced learners for benign sociophonetic variations native to target varieties like Australian English (AusEng). Existing benchmark datasets (e.g., SpeechOcean762, EpaDB) lack linguistic diversity, focusing narrowly on single L1 backgrounds (Mandarin or Argentine Spanish), while open-access corpora like CommonVoice lack phonetic annotations and metadata rigor. This mismatch between rigid engineering models and sociolinguistic reality leads to poor user trust, unfair evaluation, and a lack of scalable pedagogical tools for international learners.

## Method

The PRISM dataset curation pipeline uses the English partition of CommonVoice (v21.0, March 2025), filtering for three target accent groups: Hong Kong, Indonesia, and South Asia (India, Pakistan, Sri Lanka). Word-level time boundaries are generated using the Montreal Forced Aligner (MFA v3.3.9) with the pretrained english_mfa v3.1.0 acoustic model and pronunciation dictionary, handling out-of-vocabulary words via the english_us_mfa G2P model. TextGrid alignments are manually verified and corrected via a custom web-based platform.

Annotations are executed by trained phoneticians using AusEng transcription standards and Autosegmental-Metrical (AM) prosody theory. The final coding scheme encompasses 13 classes and 53 categories, dividing features into segmental errors (Wells' lexical sets for vowels, manner/place for consonants, voicing, aspiration, spelling-induced errors) and prosodic/discourse errors (pitch range, nuclear tunes such as falls/rises, phrase-level prominence, stress placement, pause insertion, linking, and rhythm reduction). This interdisciplinary taxonomy bridges phonetic granularity with computational tractability for downstream speech assessment tasks.

## Experimental setup

The study evaluates a preliminary release of 859 annotations drawn from a demographically stratified subset of CommonVoice 21.0. The dataset spans 72 speakers across three accent groups: South Asia (50 speakers, 82 recordings, average 1.6 recordings/speaker), Hong Kong (19 speakers, 53 recordings, average 2.8 recordings/speaker), and Indonesia (3 speakers, 82 recordings, average 27.3 recordings/speaker). The primary metrics reported are descriptive error distributions across the 13 annotation classes and top 10 categories, analyzed comparatively across the distinct regional accent cohorts.

## Results

Across all 859 annotations, segmental errors (vowels and consonants) account for 49.9% of total observations, while prosodic, fluency, and linking errors account for 46.1% (with spelling errors making up the remaining 4.1%). Consonants are the most frequent overall error class at 27.0% (driven heavily by Hong Kong at 33.8% and South Asia at 29.2%), whereas vowels dominate Indonesian speaker errors at 26.5%. 

At the category level, pause insertion is the single most frequent error overall (10.2%), disproportionately high for Hong Kong speakers (15.4%), while rhythm is the top category for Indonesian speakers. Accent-specific patterns include high frequencies of fricative place errors (e.g., dental stops) for South Asian speakers, approximant /v-w/ confusions, and frequent spelling-to-sound pronunciation confusions among Indonesian and Hong Kong cohorts.

| Accent Group | Speakers | Recordings | Top Error Class | Top Category | Proportion of Total Annotations |
|---|---|---|---|---|---|
| South Asia | 50 | 82 | Consonants / Pauses | Pause Insertion | 34.7% |
| Hong Kong | 19 | 53 | Consonants (33.8%) | Pause Insertion (15.4%) | 22.7% |
| Indonesian | 3 | 82 | Vowels (26.5%) | Rhythm | 42.6% |
| Overall | 72 | 217 | Segmentals (49.9%) | Pause Insertion (10.2%) | 100.0% |

## Limitations

The current dataset size is limited to a preliminary release of 859 annotations across only 72 speakers, suffering from severe demographic skew where a tiny pool of 3 Indonesian speakers accounts for over 42% of all observations. Due to limitations in self-reported CommonVoice metadata, the corpus cannot definitively separate L1 world English speakers from L2 ESL speakers. Furthermore, the dataset currently lacks representation for mainland Chinese speakers, who comprise the largest international student demographic in Australian universities.

## Why read this

Speech and ML researchers building automated pronunciation evaluation tools should read this paper to understand how to bridge phonetic science with data engineering, and to recognize the critical necessity of modeling prosody and sociophonetic variation rather than binary phoneme matching.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) applications, automated pronunciation scoring engines, and targeted AI feedback tools for academic and professional English communication.

## Related

- (link related pages by id as the wiki grows)
