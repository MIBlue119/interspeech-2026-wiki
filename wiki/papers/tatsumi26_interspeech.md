---
id: tatsumi26_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3061
pdf: https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.pdf
---

# Universality of Speech Emotion Recognition in Humans and Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3061)

**TL;DR** — This study evaluates whether English monolingual speech-language models and human listeners exhibit cross-language universality in emotion recognition, finding that while both perform well above chance, their error profiles and emotional biases diverge sharply.

## Problem

While human listeners can identify emotions in unfamiliar languages—a phenomenon termed universality—it remains unclear whether computational speech encoder models share this trait or if they rely on language-specific representations. Furthermore, even if models achieve cross-lingual generalization, it is unknown whether their internal recognition patterns and response biases mirror human perception. Understanding these divergences is critical for developing robust, psychologically grounded speech emotion recognition systems.

## Method

The authors compare 101 monolingual English human listeners and two frozen 24-layer ASR models (Whisper-medium.en and HuBERT-large-ll60k) on cross-lingual emotion recognition. Models are probed using multinomial logistic regression with L2 regularization, trained exclusively on 26,498 English utterances from CREMA-D, RAVDESS, and ESD datasets, and evaluated zero-shot on non-English datasets. The non-English evaluation utilizes a balanced test pool of 120 items across Canadian French, Japanese, Greek, and Thai featuring basic emotions and neutral state. Human listeners performed the identical listening task via Prolific, judging audio clips into six categories.

## Results

On non-English test data, human listeners achieved a mean accuracy of 43.8% against a 21.4% chance baseline, while Whisper and HuBERT achieved 39.0% and 48.3% respectively at their primary analysis layers (layers 17 and 11). Bootstrap analysis indicated Whisper's performance did not differ significantly from humans (-1.4% gap, 95% CI [-6.7%, 3.9%]), whereas HuBERT significantly outperformed humans by 6.8% (CI [1.8%, 12.0%]). However, accuracy rankings and error biases diverged completely: humans showed peak accuracy for neutral speech (80.0%) and defaulted to neutral during errors (32.4%), whereas Whisper peaked on happy expressions (89.1%) with a default error bias toward happy (52.4%), and HuBERT peaked on surprise (81.0%) with a dominant error bias toward surprise (53.0%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on cross-lingual speech emotion recognition, affective computing, and paralinguistic interpretation models.

## Limitations

The study relies on acted emotional speech datasets rather than spontaneous real-life emotional utterances, and tests only two English-monolingual ASR encoder architectures.

## Related

- (link related pages by id as the wiki grows)
