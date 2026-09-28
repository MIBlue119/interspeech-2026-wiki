---
id: toyin26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1704
pdf: https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.pdf
---

# Aligning Stuttered-Speech Research with End-User Needs: Scoping Review, Survey, and Guidelines

[PDF](https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toyin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1704)

**TL;DR** — This paper evaluates the alignment between current stuttered-speech technology research and the actual needs of people who stutter and speech-language pathologists through a scoping review of 228 papers and a survey of 70 stakeholders.

## Problem

Current speech recognition systems perform poorly on atypical and stuttered speech, largely because research priorities, task definitions, and evaluation metrics are disconnected from end-user experiences and clinical requirements. Without systematic stakeholder collaboration and standardized task taxonomies, speech technology fails to achieve ecological validity or address the practical communication and assessment needs of the stuttering community.

## Method

The authors conducted a scoping review by searching semantic databases for papers published between 2010 and October 2025, filtering down to a corpus of 228 machine learning and speech technology papers after removing purely clinical works. They manually coded these papers across four dimensions (research areas, language coverage, stakeholder involvement, and open-source availability) and proposed a unified task taxonomy. Additionally, they administered a survey to 70 key stakeholders, comprising 40 adults who stutter and 30 speech-language pathologists, to capture their priorities, pain points, and requirements for voice-based technology.

## Results

The scoping review of 228 papers revealed that research is heavily dominated by stutter identification (170 papers), particularly classification tasks, while true temporal detection and multi-modal behavior analysis remain rare. Among automatic speech recognition works, approximately 59% implicitly optimize for intended speech recognition by removing disfluencies, whereas only a minority focus on verbatim transcription or clinical fidelity. The stakeholder survey identified clear divergences, noting that speech-language pathologists prefer verbatim transcripts faithful to produced speech for clinical assessment, while people who stutter desire communication support tools that respect their intended speech.

## Code

- https://github.com/Theehawau/stutterresearch_survey

## Applications

Speech engineers, researchers, and developers building automatic speech recognition, assistive communication tools, and clinical diagnostic systems for atypical speech.

## Limitations

The literature search was restricted to open-access publications indexed by Semantic Scholar, and the stakeholder survey sample size was limited to 70 participants.

## Related

- (link related pages by id as the wiki grows)
