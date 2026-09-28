---
id: leal26b_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-742
---

# Analyzing Longitudinal Vocal Changes During Cognitive Behavioral Therapy for Hikikomori Patients

**TL;DR** — Tracking how a patient's voice changes session by session during cognitive behavioral therapy for hikikomori (severe social withdrawal) captures treatment response better than comparing only pre- and post-treatment recordings.

## Problem

Objectively monitoring treatment response during CBT for hikikomori patients is hard because there are few temporally grounded, objective markers of progress beyond subjective clinical judgment.

## Method

The authors analyze session-level speech recordings, first identifying stable MFCCs with consistent temporal trends and low early inter-subject variability, then studying trajectory patterns that distinguish improving from deteriorating patients, and comparing Wav2vec 2.0 embeddings against traditional handcrafted features.

## Results

Trajectory analysis reveals distinct speech evolution patterns tied to clinical improvement or deterioration; fusing Wav2vec 2.0 with MFCCs and F0 gives the best F1-score across age and gender groups, and session-by-session trajectory tracking outperforms static pre/post comparisons.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Objective, voice-based progress monitoring tools to support CBT and other therapy for social withdrawal and related mental health conditions.

## Related

- (link related pages by id as the wiki grows)
