---
id: choi26e_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2186
---

# SISER: Speaker-Invariant Speech Emotion Recognition with Entropy-Based Adversarial Training

**TL;DR** — SISER pairs a wav2vec 2.0 feature encoder with an ECAPA-TDNN speaker discriminator in an entropy-based adversarial setup, pushing IEMOCAP unweighted accuracy from 51.15% to 60.63% by suppressing speaker identity.

## Problem

Speech emotion recognition is hurt by scarce labeled data and by inter-speaker variability, and while adversarial training can address speaker variability, prior approaches have not combined it well with powerful pretrained representations.

## Method

SISER integrates wav2vec 2.0 as the feature encoder with ECAPA-TDNN as a speaker discriminator inside an entropy-based adversarial training scheme, using the stronger speaker discriminator to more effectively suppress speaker-identity information than shallow classifiers.

## Results

On IEMOCAP, SISER reaches 60.63% unweighted accuracy, versus 51.15% for the baseline and 56.46% for wav2vec 2.0 without speaker suppression, with ablations showing the speaker classifier's architecture is a key factor.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More generalizable speech emotion recognition systems for call centers, mental health monitoring, and human-computer interaction where training data covers a limited set of speakers.

## Related

- (link related pages by id as the wiki grows)
