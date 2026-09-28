---
id: maxwell26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2830
pdf: https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.pdf
---

# Pronunciation and Intonation Structured Markup (PRISM): A Dataset for Australian English Pronunciation Feedback

[PDF](https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maxwell26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2830)

**TL;DR** — PRISM is a curated, openly accessible dataset of 859 phonetically and prosodically annotated pronunciation error instances derived from CommonVoice for Australian English feedback.

## Problem

Automated pronunciation feedback tools often rely on commercial black-box models that penalize valid world-English variations and lack rigorous linguistic or pedagogical grounding. Furthermore, existing open datasets are linguistically homogenous (e.g., restricted to Mandarin L1) and lack fine-grained phonetic and prosodic metadata needed for personalized ESL learning. This work addresses these gaps by establishing a transparent, scientifically grounded annotation framework targeting the demographic profiles of international students in Australian tertiary education.

## Method

The dataset is constructed using a demographically stratified subset of CommonVoice version 21.0, focusing on three accent groups: South Asia, Hong Kong, and Indonesia. Word-level time boundaries are generated using the Montreal Forced Aligner (MFA) version 3.3.9 with Kaldi-based acoustic models and G2P fallback for out-of-vocabulary words. Three trained phoneticians manually annotated the aligned data using a purpose-built web platform. The final coding scheme comprises 13 major classes and 53 distinct categories spanning segmental features (vowels via Wells's lexical sets, consonants, liquids, onset/coda, voicing, aspiration, spelling, linking) and prosodic/discourse features (pitch, nuclear tunes, pause insertion, prominence/density, and rhythm).

## Results

The initial release reports on 859 annotations across 50 South Asian speakers (82 recordings), 19 Hong Kong speakers (53 recordings), and 3 Indonesian speakers (366 observations, averaging 27.3 recordings per speaker). Results reveal an almost even split between segmental and prosodic error categories. Accent-specific error patterns include high frequencies of schwa usage across all groups, liquid errors for maintaining the /l-r/ contrast in Hong Kong English, and approximant (/v-w/) and retroflex-alveolar place contrast errors alongside FACE vowel issues in South Asian and Indonesian cohorts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and educational linguists developing AI-driven, curriculum-integrated pronunciation learning applications for international students and speakers of world Englishes in tertiary settings.

## Limitations

The dataset exhibits demographic imbalances in speaker-to-recording ratios across accent groups (e.g., heavy reliance on very few speakers for the Indonesian subset), and CommonVoice metadata limitations prevent definitive classification of speakers as L1 versus L2 English.

## Related

- (link related pages by id as the wiki grows)
