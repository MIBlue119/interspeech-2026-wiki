---
id: mondal26b_interspeech
category: resources-evaluation
labels: [low-resource, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2640
pdf: https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.pdf
---

# Spontaneous Dialect-Aware Speech Corpus for Low-Resource Dakhini, A Southern Indo-Aryan Language: Methods, Challenges, and Insights

*Anindita Mondal, Priyanka Kommagouni*

[PDF](https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2640)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — This paper presents a data-centric methodology and corpus development framework for Dakhini, a low-resource Southern Indo-Aryan contact variety, utilizing telephonic conversational recordings from 160 speakers and a semi-automated dialect-aware annotation pipeline. It successfully addresses sociolinguistic challenges like the Observer's Effect to capture authentic spontaneous dialect speech.

## Key contributions

- Identifies structural and sociolinguistic vulnerabilities in collecting non-prestige dialect speech, specifically demonstrating how formal settings trigger code-switching and dialect suppression.
- Proposes a telephonic data collection methodology using asymmetric participant awareness (an informed 'anchor' speaker paired with an uninformed participant) to preserve spontaneity.
- Builds a semi-automated annotation framework that repurposes standard Hindi/Urdu ASR mismatch errors (via IndicConformer) as positive dialect detection signals.
- Introduces systematic rule-based tagging modules covering 7 phonological, morphosyntactic, and lexical categories unique to Dakhini (e.g., consonant assimilation, auxiliary omission, /ko/ participle constructions).

## Problem

Spontaneous spoken Dakhini remains severely underrepresented in speech corpora despite its widespread use in the Deccan region of India. Prior data collection approaches fail because they overlook the sociolinguistic realities of non-prestige dialects, where speakers confronted with formal recording environments unconsciously suppress dialect features and shift toward standard Hindi or Urdu (the Observer's Effect). Furthermore, standard ASR systems trained on prestige varieties treat characteristic Dakhini forms as errors rather than diagnostic markers, making automated corpus curation impossible without prior structural mapping.

## Method

The corpus collection uses telephonic conversational recordings of mixed-gender pairs who are familiar with each other, maximizing ecological validity and aiding speaker diarization. To bypass the Observer's Effect, an asymmetric protocol is utilized where only one 'anchor' speaker is briefed on the recording setup to gently steer casual discussions across a curated menu of culturally resonant topics (e.g., movies, recipes), while the second participant remains uninformed until a post-session debriefing and consent process. Collected audio is processed using pyannote (speaker-diarization-3.1) with ECAPA-TDNN embeddings trained on VoxCeleb, augmented by manual verification and boundary smoothing ramps.

The annotation workflow leverages IndicConformer Hindi ASR to generate baseline transcriptions. Discrepancies between standard ASR outputs and dialect speech are fed into rule-based detection modules using specific linguistic tags: Phonological Assimilation (PA), Vowel Length Reduction (PV), Morphosyntactic Auxiliary Omission (MAUX), Participle 'ko' Construction (MP-KO), Pronoun Variation (MP), Formality Register (SF), and Lexical Dakhini items (LD). Segments with high tag density (overlapping dialectal markers) are prioritized for intensive human review, while untagged segments receive light verification.

## Experimental setup

The corpus comprises telephonic conversational recordings from 160 speakers in Hyderabad, India (aged 17–50, with 70% male and 30% female distribution, spanning early-settler families and various socioeconomic backgrounds). Each session lasted approximately 20 minutes, yielding about 5 minutes of representative conversational speech per session. The pipeline utilizes pyannote speaker-diarization-3.1 for segmentation, ECAPA-TDNN for speaker embeddings, and IndicConformer Hindi ASR for pre-transcription.

## Results

Sociolinguistic pilot findings reveal stark contrasts in dialect retention across demographics: 10 out of 15 economically disadvantaged male participants and 11 female participants comfortably used Dakhini in formal settings, whereas among educated-sector participants, only 6 of 15 males and just 2 females maintained Dakhini usage, overwhelmingly defaulting to standard Hindi/Urdu. The annotation pipeline successfully harnesses ASR error patterns as positive metadata signals for identifying dialect density, prioritizing human-in-the-loop validation for segments with dense overlapping phonological and morphosyntactic flags.

## Limitations

The current dataset is geographically bounded to Hyderabad, capturing 160 speakers with a predominantly male skew (70% male, 30% female) that may underrepresent female-centric conversational nuances. Telephonic recording modality introduces inherent signal degradation and channel variability compared to studio environments. Additionally, rule-based taggers rely on a predefined seed lexicon and structural grammar checklist, which may miss emergent or highly idiosyncratic multi-way code-switching variants.

## Why read this

Speech and NLP researchers building speech technologies for low-resource, non-prestige, or contact dialects should read this to understand how to design sociolinguistically robust data collection protocols that neutralize the Observer's Effect and systematically repurpose standard ASR errors for dialect mining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of dialect-sensitive ASR, speech translation, and conversational spoken language understanding models for under-documented Indo-Aryan languages.

## Institutions / 機構

International Institute of Information Technology Hyderabad

## Related

- (link related pages by id as the wiki grows)
