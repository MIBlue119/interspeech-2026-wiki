---
id: chien26c_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3201
pdf: https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.pdf
---

# Two-Sided Fairness Transfer for Gender-Neutral Speech Emotion Recognition with Partially Observed Attributes

[PDF](https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3201)

**TL;DR** — This paper introduces a task arithmetic approach to transfer two-sided gender fairness in speech emotion recognition across datasets under partial attribute supervision.

## Problem

Ensuring fairness in speech emotion recognition (SER) is a two-sided challenge requiring neutrality toward both speaker-side and rater-side biases, yet most debiasing methods require explicit attribute labels on both sides. Real-world deployment scenarios frequently feature partially labeled data where gender annotations exist for only one side, preventing the direct training of comprehensive fair models. Consequently, adapting fairness strategies across cross-dataset domains with incomplete supervision remains an unsolved obstacle.

## Method

The proposed two-stage framework first fine-tunes a pre-trained CLAP foundation emotion encoder combined with a two-layer adversarial domain classifier to optimize an objective containing both cross-entropy emotion classification and adversarial debiasing losses (FairCLAP). In the second stage, it computes the parameter-space difference between speaker- and rater-side fair models in a fully-supervised source dataset to construct an ATT2Fair task vector. This task vector is then scaled and added to a one-sided fair model in a target domain to infer the absent-side fair model without requiring target gender labels. Experiments use a batch size of 32, a learning rate of 1e-4 over 30 epochs with the Adam optimizer, and a grid-searched scaling factor lambda between 1e-3 and 1e-2 on an NVIDIA A100 40GB GPU.

## Results

Evaluated on IEMOCAP, MSP-Podcast (v1.11), and BIIC-Podcast (v1.01) datasets focusing on four primary emotions (Neutral, Happiness, Anger, Sadness), FairCLAP achieved debiasing with an average F1-score drop of only about 2.15% compared to standard unconstrained CLAP models. Statistical parity score differences (delta-SP) demonstrated consistent fairness improvements on both speaker and rater sides. Cross-dataset fairness inference via ATT2Fair matched or outperformed standard FairCLAP baselines while preserving recognition accuracy, such as achieving up to a 1.8% F1 improvement for rater-side inference and 4.8% for speaker-side inference on IEMOCAP for Anger.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building regulatory-compliant, bias-mitigated voice assistants or affective computing systems where training data lacks complete demographic annotations for speakers and annotators.

## Related

- (link related pages by id as the wiki grows)
