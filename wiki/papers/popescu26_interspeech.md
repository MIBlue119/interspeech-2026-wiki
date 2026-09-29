---
id: popescu26_interspeech
category: applications-other
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/popescu26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/popescu26_interspeech.pdf
---

# lisero: An interactive practice app for learning Romanian Sign Language

*Anisia Popescu, Serban Din, Marinela Axinte*

[PDF](https://www.isca-archive.org/interspeech_2026/popescu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/popescu26_interspeech.html)

**Category:** `applications-other` · **Labels:** `low-resource`

**TL;DR** — We introduce lisero, a freely accessible mobile application designed to provide structured lessons and interactive practice exercises for learning Romanian Sign Language (LSR). The app features approximately 1,000 dictionary signs, two parallel curricula, and three distinct exercise types.

## Key contributions

- Developed lisero, a mobile application addressing the critical lack of structured digital learning tools for under-resourced Romanian Sign Language (LSR).
- Created dual learning curricula tailored for both parents of deaf infants and general learners across real-life situational chapters.
- Designed three interactive exercise modalities—multiple-choice with phonological/semantic distractors, video-to-word matching, and video-based sentence construction.
- Integrated pedagogical support features including continuous-loop videos featuring two native deaf signers, half-speed playback, and a front-camera mirror mode.

## Problem

Romanian Sign Language (LSR) was officially recognized as a national language only in 2020, resulting in a severe shortage of structured educational resources, qualified instructors, and certified interpreters (only 77 available). Prior digital resources like dlmg, Semne, and PeSemne function predominantly as static video dictionaries or basic lookup platforms, failing to support interactive practice, syntax learning, or structured pedagogy. This lack of accessible tools creates massive barriers for parents of deaf children, prospective interpreters, and the wider deaf community, severely limiting bimodal bilingualism and social inclusion.

## Method

The lisero application was engineered through an interdisciplinary collaboration involving a programmer, a linguist, deaf native signers, and certified LSR instructors, adhering to established L2 digital language learning principles. The app provides two main curricular tracks: a parent-focused track prioritizing early infant-caregiver interaction, and a general curriculum organized into real-life situational chapters (e.g., family, bath-time, travel).

Content delivery relies on video recordings captured from two deaf native signers, which randomly alternate in a continuous loop to expose users to natural human variation. Vocabulary items are introduced in isolation before being embedded into short contextualized sentences accompanied by Romanian text transcriptions. Interactive reinforcement is delivered via three exercise formats: (1) multiple-choice selections featuring deliberately chosen semantic and phonological competitors to scale difficulty, (2) video-to-word matching, and (3) sentence construction exercises built directly from video inputs.

To facilitate acquisition of fine-grained signing parameters such as hand-shapes and facial non-manual markers, the interface incorporates half-speed video playback and a real-time front-facing camera mirror feature for self-evaluation. Gamification mechanics—including points, accuracy metrics, daily streaks, lesson time tracking, and progress charts—are embedded to boost long-term user engagement. User search tracking within the ~1,000-sign dictionary informs iterative vocabulary expansion.

## Experimental setup

The lisero platform is fully deployed and accessible on both iOS and Android platforms, developed under the commission of Fundația CODA - Farmecul Tăcerii. The application hosts a searchable dictionary of approximately 1,000 signed entries with homophony disambiguation. Evaluation and verification of sign content and pedagogical flow were conducted directly by certified LSR instructors and deaf native signers.

## Results

As a system description and application paper detailing a mobile platform, traditional algorithmic benchmark comparisons against ML models are absent. The platform successfully bridges the gap left by legacy dictionary-only resources (dlmg, Semne, PeSemne) by integrating structured lesson plans, interactive error-remediation loops where incorrectly answered items reappear at lesson ends, and real-time practice feedback. The app supports around 1,000 signs with built-in usage tracking to direct future vocabulary growth.

## Limitations

The application currently covers a limited vocabulary corpus of approximately 1,000 signs and focuses strictly on Romanian Sign Language, leaving other under-resourced sign languages unsupported. The paper does not provide quantitative user studies or clinical trials measuring long-term language acquisition retention rates among learners. Furthermore, automated computer vision sign-recognition feedback is omitted in the current iteration, relying instead on user self-evaluation via the mirror feature and multiple-choice testing.

## Why read this

Researchers and engineers building sign language educational tech or low-resource accessibility tools should read this paper to understand how to design practical, human-centered curricula and interface features (such as alternating native signers and phonological distractors) for under-resourced signed languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accessible mobile-based L2 language learning, early childhood bimodal bilingual education for deaf infants, and foundational training support for sign language interpreters.

## Institutions / 機構

Université Paris 8, Solid Technologies, Babeș-Bolyai University, CODA - Farmecul Tăcerii Foundation

**Funding / 經費:** Fundatia CODA - Farmecul Tacerii

## Related

- (link related pages by id as the wiki grows)
