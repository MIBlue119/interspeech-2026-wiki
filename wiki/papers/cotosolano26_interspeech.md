---
id: cotosolano26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3507
pdf: https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.pdf
---

# Automating Sociophonetic Research in Under-Resourced Languages: A Case Study of Speech Rate in Cook Islands Māori

[PDF](https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3507)

**TL;DR** — This paper evaluates an automated sociophonetic workflow using voice activity detection and ASR to analyze speech rate variation across islands and age groups in Cook Islands Maāori, revealing significant regional differences where younger speakers accelerate in specific less-endangered island groups.

## Problem

Sociophonetic research heavily relies on manual processing, making large-scale studies in under-resourced and indigenous languages difficult. Automating this pipeline can accelerate linguistic documentation, but existing AI tools must be rigorously evaluated for accuracy and cross-demographic biases when applied to minority language corpora.

## Method

The authors compiled a 7.5-hour corpus of 60 speakers by combining 4 hours of field recordings (Vairanga Te Tuatua) and 3.5 hours of online social media audio/video data (Facebook, YouTube). They processed the online media using Silero VAD for segmentation and a Wav2Vec2 ASR model (CER=0.06, WER=0.17) for automatic transcription, subsequently dividing text into prosodic phrases to compute speech rate in moras per second. They tested facial age estimation tools (DeepFace and InsightFace) to tag speaker metadata, and validated the ASR pipeline by correlating fully automated measurements against manually corrected annotations across 25 audio sections.

## Results

Correlating automated and manual speech rate measurements yielded a strong and statistically significant relationship (R2 = 0.45, t(23)=4.3, p<0.0005), though automated transcripts exhibited a slight length bias. Facial age estimation models performed poorly on Cook Islander faces (DeepFace showed no significant relationship; InsightFace yielded weak correlation at R2 = 0.27, p<0.05), necessitating manual age classification. Using a linear regression model with age and island interaction, the study found significant interaction effects (t(8077)=6.1, p<0.0001): younger speakers in the Nga Pū Toru island group speak significantly faster than older speakers (7.7 vs 6.8 moras/second), whereas Rarotonga and Aitutaki show no significant age-based speech rate differences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, field linguists, and sociolinguists studying low-resource or endangered indigenous languages using automated audio and NLP pipelines.

## Limitations

Automated facial recognition models exhibited severe demographic biases and failed to accurately estimate speaker ages, requiring manual categorization. The ASR-based pipeline introduces a systematic length bias in speech rate calculations compared to gold-standard manual transcriptions.

## Related

- (link related pages by id as the wiki grows)
