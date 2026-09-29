---
id: minematsu26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.pdf
---

# AURORA: A Web-based Authoring System for Bridging Aural-Oral Language Training and Communicative Practice

*Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.html)

**Category:** `applications-other`

**TL;DR** — AURORA is a web-based authoring system designed to bridge aural-oral language training and communicative practice, deployed in a two-month academic courseware where 832 learners practiced for 30 minutes daily. Pre- and post-tests demonstrated significant reductions in both listening disfluency (LD) and pronunciation deviation (PD).

## Key contributions

- Developed an accessible web-based authoring system (AURORA) that allows educators to easily create and deploy customized speech drills for listening, speaking, and communication without deep engineering expertise.
- Integrated memory-oriented aural training tasks (shadowing, delayed repetition, retelling) paired with automated listening disfluency (LD) visualization via Dynamic Time Warping (DTW).
- Implemented oral training using imitative overlapping with real-time prosodic gap visualization (duration, syllable prominence, intonation) and crowd-sourced ASR error disambiguation.
- Engineered interactive communicative practice workflows using customized ChatGPT prompts and voice modes for task-based roleplay (e.g., guessing games, TED speaker interviews).

## Problem

Foreign language learners often lack real-world conversational practice outside the classroom, but teachers struggle to develop specialized Computer-Assisted Language Learning (CALL) systems due to technical barriers. Furthermore, traditional listening tasks fail to train students in temporarily retaining transient speech or processing input in meaningful chunks. With institutions transitioning to English-medium instruction (EMI), there is an urgent need for scalable, automated, and generalizable aural-oral training frameworks that address these gaps simultaneously.

## Method

AURORA architecture is structured around three core pedagogical modules: aural training, oral training, and communicative practice. For aural training, shadowing recordings are aligned with reference transcripts using Dynamic Time Warping (DTW) to compute and visualize listening disfluency (LD). Additionally, voice conversion techniques are integrated to transform a single speech sample into more than 100 acoustic variants, enabling high-variability phonetic training.

For oral training, the system uses imitative overlapping. It extracts prosodic features including duration, syllable prominence, and intonation contour, displaying immediate graphical gaps between the learner and the model speech. To separate machine transcription errors from human pronunciation errors, AURORA aggregates ASR word accuracy across all participants to compute a baseline word-level score. Words poorly recognized for an individual learner despite high group accuracy are flagged as genuine production errors.

For communicative practice, the system leverages ChatGPT's advanced voice mode via tailored system prompts across five distinct interactive scenarios: guessing games, story recall, lie detection, topic discussions, and TED-speaker interviews. Following conversations, automated prompts evaluate transcripts, while learners' audio recordings are processed into phonetic posteriorgrams to surface confusing phoneme pairs and diagnose persistent pronunciation habits.

## Experimental setup

The system was evaluated using two-month, inter-semester, on-demand courseware called Special Training for English Academic Communication (STEAC) deployed across the 2025 academic year, registering 832 undergraduate students. Students engaged with the platform for approximately 30 minutes per day over eight weekly programs. Evaluation metrics included automatically measured listening disfluency (LD) via DTW, pronunciation deviation (PD) via prosodic and ASR analysis, and qualitative post-course questionnaires.

## Results

Pre- and post-tests from the summer STEAC deployment demonstrated that both listening disfluency (LD) and pronunciation deviation (PD) were significantly reduced across the participant cohort. Learners reported that the reduction in listening disfluency was particularly noticeable and intuitive through the visual feedback curves. Open-ended student questionnaires yielded overwhelmingly positive feedback regarding the utility of daily 30-minute drills in preparing them for English-medium instruction.

## Limitations

The evaluation relies heavily on pre- and post-test comparisons and subjective questionnaires from a single institution (The University of Tokyo) entering English-medium instruction, lacking a traditional randomized controlled trial control group. The system's automated assessment depends heavily on the robustness of underlying ASR and phonetic posteriorgram extractors, which may exhibit biases or errors with heavily accented non-native speech. Furthermore, reliance on external APIs like ChatGPT introduces third-party dependency, cost, and reproducibility challenges for long-term deployment.

## Why read this

Speech and ML engineers building educational technology (EdTech) or CALL systems should read this to see a successful blueprint for combining classical speech processing (DTW, prosody extraction, ASR error analysis) with modern generative AI (ChatGPT voice mode) in a unified, deployable platform.

## Code

- https://bit.ly/4nbE6Jf

## Applications

Computer-Assisted Language Learning (CALL), automated language assessment, spoken dialogue tutoring systems, and English-medium instruction (EMI) preparatory courseware.

## Institutions / 機構

University of Tokyo

## Related

- (link related pages by id as the wiki grows)
