---
id: ta26b_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1587
pdf: https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.pdf
---

# Progressive Weak Supervision for Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1587)

**TL;DR** — Progressive Weak Supervision (PWS) relaxes training supervision early on by accepting top-k predictions with soft targets and gradually tightening to standard cross-entropy, achieving 78.08% unweighted accuracy on IEMOCAP.

## Problem

Speech emotion recognition suffers from label ambiguity because emotions are continuous and subjective, while self-supervised encoders like WavLM are pre-trained for ASR rather than affective cues. Standard hard one-hot targets force models into early, uncalibrated commitments during high-uncertainty training phases. Existing techniques like label smoothing or curriculum learning address only parts of this issue by ignoring either the training stage or the model's current predictive state.

## Method

PWS defines a model-aware weak correctness criterion where a sample is considered correct if the true label is within the top-k predictions. When correct, it assigns a soft target distribution concentrating mass $\alpha$ on the true class and distributing the remainder across other top-k candidates, optimized via KL divergence; otherwise, it applies standard hard one-hot cross-entropy. The parameter $k$ follows a three-phase schedule: a 10% warm-up phase, a linear decay phase down to 1 between 10% and 75% of epochs, and standard cross-entropy for the remaining training. The architecture uses a WavLM-Base acoustic encoder, attention pooling, and a two-layer MLP classification head trained via AdamW for 200 epochs.

## Results

Evaluated on 4-class IEMOCAP (English) and ViSEC (Vietnamese) using session/speaker-stratified 5-fold cross-validation and unweighted accuracy (UA). PWS with $k_{init}=3$ achieves 78.08% UA on IEMOCAP and 85.70% on ViSEC, outperforming standard cross-entropy by 4.66 and 11.90 absolute points respectively. It also beats label smoothing (74.15%) and recent baselines like EmoDim (76.98%) on IEMOCAP. Ablations confirm optimal performance with concentration parameter $\alpha=0.7$ and a 10% warm-up schedule.

## Code

- https://github.com/skyemo47/PWS

## Applications

Speech and machine learning engineers building speech emotion recognition systems for call-center analytics, dialogue agents, or mental health monitoring.

## Limitations

Evaluated primarily on 4-class emotion categorization tasks.

## Related

- (link related pages by id as the wiki grows)
