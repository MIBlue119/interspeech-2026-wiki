---
id: toyin26b_interspeech
category: asr
institutions: ["MBZUAI", "SpeechCare", "SLAI", "Chinese University of Hong Kong, Shenzhen", "University of Edinburgh", "University of Aveiro"]
code: https://github.com/Theehawau/stutterresearch_survey
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1704
pdf: https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.pdf
---

# Aligning Stuttered-Speech Research with End-User Needs: Scoping Review, Survey, and Guidelines

*Hawau Olamide Toyin, Mutiah Apampa, Toluwani Aremu, Humaid Alblooshi, Ana Rita Valente, Gonçalo Leal, Zhengjun Yue, Zeerak Talat, Hanan Aldarmaki*

[PDF](https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1704)

**Category:** `asr`

**TL;DR** — This paper presents a scoping review of 228 stuttered-speech processing papers and a stakeholder survey of 40 people who stutter (PWS) and 30 speech-language pathologists (SLPs), revealing major misalignments between current AI research priorities and end-user needs. The study proposes a comprehensive task taxonomy and concrete guidelines to bridge the gap between technical metrics and human-centred requirements.

## Key contributions

- Conducted a systematic scoping review of 228 papers (2010-2025) analyzing research focus, task naming, language coverage, open-science practices, and stakeholder collaboration.
- Surveyed 40 people who stutter (PWS) and 30 speech-language pathologists (SLPs) to establish ground-truth clinical and everyday communication needs.
- Proposed a standardized task taxonomy dividing stuttered-speech research into distinct sub-tasks (intended vs. verbatim ASR, classification vs. temporal detection vs. severity assessment).
- Identified the 'impatient ASR' phenomenon where mainstream systems fail during blocks or pauses, driving PWS frustration and tool abandonment.
- Formulated actionable recommendations for task-aware benchmarking, explainability, multilingual modeling, and early-stage interdisciplinary collaboration.

## Problem

Mainstream speech technology and stuttered-speech models often fail in real-world deployment because research has evolved with limited interdisciplinary dialogue and stakeholder engagement. In the literature, critical task formulations—such as disfluency classification versus temporal detection, and intended versus verbatim automatic speech recognition (ASR)—are used interchangeably or left implicit. Furthermore, research heavily prioritizes monolingual English classification tasks and synthetic data generation, ignoring the contextual variability of stuttering across situations and interlocutors. Without systematic grounding in the lived experiences of PWS and the clinical workflows of SLPs, technical optimizations risk reinforcing ecological invalidity and exacerbating user frustration.

## Method

The authors executed a dual-methodology approach combining computational literature mapping and qualitative-quantitative survey research. For the literature review, 680 papers from Semantic Scholar were filtered down to a final corpus of 228 empirical studies based on explicit inclusion/exclusion criteria requiring machine learning or speech technology components. Each paper was manually annotated across four dimensions: research area based on the proposed taxonomy, language coverage, stakeholder involvement level, and open-source release status.

For the stakeholder component, two parallel online questionnaires (comprising 35 items for PWS and 38 items for SLPs) were iteratively co-designed with two expert SLPs in English and Spanish. The surveys utilized 5-point Likert scales, multiple-choice questions, and optional open text fields to capture demographics, stuttering profiles, AI tool utility measures, workflow challenges, and ethical concerns. Quantitative responses were aggregated using descriptive statistics, while free-text responses underwent inductive thematic coding to contrast technical research outputs with everyday stakeholder realities.

## Experimental setup

The scoping review analyzed 228 papers published between 2010 and October 2025 across all open-access publications indexed by Semantic Scholar. The stakeholder study evaluated survey responses from 40 people who stutter (aged 18-44, >90% multilingual) and 30 speech-language pathologists (two-thirds with >10 years of clinical practice experience). Evaluation metrics in the review included frequency distributions of research sub-tasks, language skew, open-science rates (code/data release), and stakeholder collaboration ratios.

## Results

The literature mapping shows that stuttered-speech research is heavily dominated by stutter identification (170 out of 228 papers), specifically classification tasks (88 papers on multi-class, 38 on binary). Although 72 papers include 'detection' in their title, only 6 actually perform temporal boundary detection; the rest perform classification on pre-segmented audio clips. Language coverage is severely skewed: 152 papers focus on English, followed by German (22), Mandarin (17), Hindi (5), and Marathi (5), with 183 papers being strictly monolingual. Only ~10% of papers (23 total) released code, models, or data starting from 2021, and fewer than 20% reported any form of stakeholder collaboration.

In contrast, stakeholder surveys revealed strong divergences: 65% of PWS and 80% of SLPs favor temporal detection ('when/where') tools over binary classification ('whether-only'). While 59% of ASR literature implicitly targets intended speech transcription, PWS explicitly require patient systems that ignore disfluencies for daily communication, whereas SLPs strongly prefer verbatim transcripts for clinical documentation and longitudinal tracking. Furthermore, 63% of SLPs expressed openness to AI adoption but conditioned it on strict explainability and data privacy safeguards, while noting that current systems fail to account for context-dependent stuttering spikes in high-pressure situations.

| Research Area / Dimension | Current Literature Focus | Stakeholder Need / Priority | Alignment Gap |
|---|---|---|---|-
| Stutter Identification | Static classification on pre-segmented clips (96 papers) | Temporal detection ('when/where') and tracking patterns over time | Underserved (only ~8% do temporal detection) |
| ASR Transcription | Implicitly leans toward intended ASR (~59% of ASR papers) | PWS want intended ASR; SLPs strongly need verbatim ASR for clinical tracking | Undefined / Implicit modeling choices |
| Data Curation | Heavy recent reliance on synthetic corpora | PWS show high willingness to donate real speech; SLPs need clinically grounded data | Synthetic-heavy vs. untapped real donors |
| Research Focus | Model-building and global accuracy metrics | Explainability, ethical safeguards, and deployment guidance | Underserved (few papers on privacy/explainability) |

## Limitations

The scoping review was constrained by keyword search limitations on Semantic Scholar and the exclusion of purely clinical, neurological, or behavioural papers lacking machine learning components. The stakeholder survey sample sizes (40 PWS and 30 SLPs) reflect specialized professional networks and regional distributions (administered in English and Spanish), which may limit generalizability across broader global demographics, unrepresented languages, and offline clinical communities. Additionally, survey responses rely on self-reported severity and perceptions, which are subject to individual recall and situational variability.

## Why read this

Speech and ML engineers building atypical speech technologies should read this paper to realign their modeling objectives, loss functions, and dataset curation strategies with actual clinical and end-user requirements rather than generic benchmark metrics. It provides an essential taxonomy that resolves widespread naming confusions between classification and detection tasks, while offering a roadmap for incorporating explainability and stakeholder co-design into speech AI pipelines.

## Code

- https://github.com/Theehawau/stutterresearch_survey

## Applications

Development of user-centric speech recognition assistants, clinical decision-support software for speech-language pathologists, automated stuttering severity assessment tools, and real-time fluency monitoring applications.

## Institutions / 機構

MBZUAI, SpeechCare, SLAI, Chinese University of Hong Kong, Shenzhen, University of Edinburgh, University of Aveiro

## Related

- (link related pages by id as the wiki grows)
