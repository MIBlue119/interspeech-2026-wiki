---
id: sepanta26_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
institutions: ["Fondazione Bruno Kessler", "University of Trento"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2459
pdf: https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.pdf
---

# From Game-Based Annotation to Representation Probing: Cross-Validated Prosodic Speech and Privacy Implications

*Sia Vosh Sepanta, Roberto Zamparelli, Alessio Brutti*

[PDF](https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sepanta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2459)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper introduces the Actor's Challenge (AC), a game-based crowdsourced prosodic speech corpus with built-in human validation, and uses it to evaluate automatic speech emotion recognition (ASER) and privacy leakage of demographic traits in speech-LLM pipelines. Results show that AC yields robust, contextually realistic emotion recognition models while revealing that age and emotion attributes persist in intermediate representations.

## Key contributions

- Developed a crowdsourced Games-With-A-Purpose (GWAP) framework where players alternate as performers and casting directors to collect and self-validate emotional prosody data.
- Created a multilingual prosodic speech corpus (English, Italian, French, German) featuring 1,018 completed recordings and 1,489 evaluations across 7 emotion classes.
- Evaluated self-supervised representations (emotion2vec) on the AC corpus, demonstrating superior cross-corpus generalization compared to traditional acted corpora like Emozionalmente.
- Probed a speech-LLM architecture (Whisper, MEUSLI projector, EuroLLM-1.7B) to expose privacy leakage, showing strong preservation of emotion and speaker age in intermediate hidden states.

## Problem

Traditional emotional speech datasets face severe limitations, including small pools of professional actors that restrict demographic and acoustic diversity, lack of contextual grounding for elicited phrases, and narrow linguistic coverage. These shortcomings cause models trained on canonical datasets to overfit to clean, prototypical studio conditions and fail in real-world scenarios. Furthermore, as speech-to-text and multimodal speech-LLM architectures become ubiquitous, understanding whether and where sensitive biometric traits (like age and emotion) leak through internal representations remains an open security challenge.

## Method

The data collection platform, Actor's Challenge (AC), uses Stanislavskian acting principles where users read neutral target phrases (e.g., 'It's a cappuccino') embedded within specific communicative contexts to elicit authentic emotional prosody. Players rotate between 'Auditioner' (performing) and 'Casting Director' (evaluating and rating performance on a 1-5 Likert scale) roles, providing continuous quality control. Audio is resampled to 16 kHz for downstream tasks.

For Automatic Speech Emotion Recognition (ASER), the frozen self-supervised model emotion2vec base extracts embeddings, which are aggregated via mean pooling, mean-std concatenation, or attention pooling, and fed into lightweight classifiers (logistic regression or a 2-layer MLP). For privacy probing, a SLAM-based speech-LLM pipeline is evaluated using a frozen Whisper large-v3 encoder (Stage E), a trainable linear MEUSLI projector (Stage Z), and EuroLLM-1.7B-Instruct final hidden states restricted to speech-aligned positions (Stage H). Shallow MLPs probe these frozen stages to measure feature recoverability for emotion and speaker age.

## Experimental setup

Evaluations used the AC corpus (English and Italian subsets), RAVDESS (English, professional acted), and Emozionalmente (Italian). Metrics included Accuracy, Macro-F1, AUC, and balanced accuracy (bACC). Probing experiments utilized speaker-disjoint splits and 7-class configuration for age based on Common Voice metadata, and 4-class/7-class settings for emotion.

## Results

On 4-class ASER, AC achieves 0.73 Accuracy / 0.77 Macro-F1 for English and 0.75 Accuracy / 0.73 Macro-F1 for Italian, outperforming Emozionalmente (0.56 Acc / 0.31 Macro-F1) though trailing RAVDESS (0.92 Acc / 0.92 Macro-F1) due to AC's naturalistic variability. In cross-corpus testing, training on combined AC (EN+IT) yields strong transfer to RAVDESS (0.93 Accuracy). In pipeline probing, 7-class emotion accuracy peaks at Stage Z (Projector, 0.41) and Stage E (Encoder, 0.42), up from 0.21 at Stage H. Speaker age is exceptionally recoverable at the Whisper encoder stage (AUC 0.93), but heavily attenuates by the final LLM hidden states (AUC 0.50).

| System / Condition | Accuracy | Macro-F1 |
|---|---|---|
| AC (English) | 0.73 | 0.77 |
| AC (Italian) | 0.75 | 0.73 |
| AC (EN+IT combined) | 0.60 | 0.61 |
| RAVDESS (English) | 0.92 | 0.92 |
| Emozionalmente (Italian) | 0.56 | 0.31 |

## Limitations

The dataset currently has limited volume (1,018 recordings across 240 users) and an uneven distribution favoring emotional prosody over attitudinal prosody. Engagement tends to drop over time due to the cognitive effort required for complex contextual prompts. Furthermore, privacy probing was constrained to frozen backbones, and demographic evaluation was limited primarily to age and emotion.

## Why read this

Speech and ML researchers building multimodal speech-LLMs or emotion recognition systems should read this to understand how crowdsourced GWAP frameworks can generate ecologically valid speech datasets, and to learn how sensitive speaker attributes leak across speech-LLM pipeline stages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic speech emotion recognition, trustworthy speech-LLM development, privacy-preserving speech representation learning, and crowdsourced affective dataset generation.

## Institutions / 機構

Fondazione Bruno Kessler, University of Trento

**Funding / 經費:** European Union

## Related

- (link related pages by id as the wiki grows)
