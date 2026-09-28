---
id: sepanta26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2459
pdf: https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.pdf
---

# From Game-Based Annotation to Representation Probing: Cross-Validated Prosodic Speech and Privacy Implications

[PDF](https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2459)

**TL;DR** — This paper introduces a game-based prosodic speech corpus ("Actor's Challenge") that embeds self-validation mechanisms and evaluates it on automatic speech emotion recognition and representation privacy probing.

## Problem

Traditional emotional speech datasets suffer from small and biased actor pools, lack of contextual grounding, rigid phrase lengths, and scarce linguistic diversity. These limitations reduce ecological validity and prevent systematic study of annotation consistency and biometric privacy leakage in modern speech-to-LLM architectures.

## Method

The authors developed a web-based crowdsourcing game (Actor's Challenge) using a Stanislavskian framework where participants alternate between auditioning context-driven emotional phrases and casting peer evaluations to provide built-in validation. The corpus contains 1,018 recordings across English, Italian, German, and French, covering seven emotional categories. To test downstream usability and privacy, the authors evaluated a frozen embedding pipeline using emotion2vec for classification and a speech-LLM framework (Whisper large-v3 encoder, MEUSLI linear projector, and EuroLLM-1.7B-Instruct) to probe intermediate representation stages for emotion and age attribute leakage.

## Results

In 4-class automatic speech emotion recognition (ASER), the Actor's Challenge dataset achieved 0.73 accuracy (0.73 macro-F1) in English and 0.75 accuracy (0.61 macro-F1) in Italian, performing competitively compared to Emozionalmente (0.56 acc) but trailing the studio-acted RAVDESS (0.92 acc). Cross-corpus tests showed that training on combined AC data generalizes well across its languages and to RAVDESS (0.93 acc). In representation probing on AC, 7-class emotion classification achieved 0.41 accuracy at the projector stage and 0.42 at the Whisper encoder stage, while age attribute prediction showed high recoverability from raw Whisper encoder states (0.93 AUC) that attenuated significantly by the final LLM stage (0.50 AUC).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building affective computing systems, emotion recognition models, or auditing multimodal speech-LLMs for biometric privacy leakage.

## Limitations

Engagement in the game platform tends to decline over time due to the effort required for auditions and prompt complexity, and attitudinal prosody is currently less represented than emotional prosody.

## Related

- (link related pages by id as the wiki grows)
