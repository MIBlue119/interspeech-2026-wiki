---
id: minematsu26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.pdf
---

# AURORA: A Web-based Authoring System for Bridging Aural-Oral Language Training and Communicative Practice

[PDF](https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/minematsu26_interspeech.html)

**TL;DR** — AURORA is a web-based authoring platform that integrates speech processing and ChatGPT to deliver aural-oral training and communicative practice, successfully reducing listening and pronunciation disfluencies in an 8-week university courseware deployment.

## Problem

Language learners often lack opportunities for real-world conversational practice outside the classroom, and educators typically struggle to build custom computer-assisted language learning (CALL) systems tailored to specific pedagogical needs. This gap is especially problematic during institutional transitions to English-medium instruction, where students require intensive, targeted practice to master listening retention, speech comprehensibility, and interactive fluency.

## Method

The web-based authoring system, AURORA, incorporates three functional pillars: aural training via shadowing with dynamic time warping (DTW) to calculate and visualize listening disfluency; oral training using imitative overlapping to quantify pronunciation deviations in duration, syllable prominence, and intonation; and communicative practice through task-based spoken interactions with customized ChatGPT GPTs. For high-variability phonetic training, voice conversion automatically maps a single speech sample into more than 100 acoustic variants while retaining linguistic content. The system also differentiates between machine ASR errors and human production errors by comparing individual outputs against participant-wide average ASR recognition rates.

## Results

Evaluated using a two-month on-demand courseware program called STEAC deployed to 832 undergraduate and graduate learners across spring and summer sessions, requiring 30 minutes of daily practice. Pre- and post-test evaluations demonstrated statistically significant reductions in both listening disfluency (LD) and pronunciation deviation (PD), with the improvement in listening disfluency being particularly prominent among students. Questionnaire feedback collected from participants indicated overwhelmingly positive subjective responses regarding the courseware's effectiveness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Language instructors and speech engineering researchers building customizable, automated online courseware for computer-assisted language learning and the transition to foreign-language-medium instruction.

## Related

- (link related pages by id as the wiki grows)
