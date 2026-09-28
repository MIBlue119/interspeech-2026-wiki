---
id: shin26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-595
pdf: https://www.isca-archive.org/interspeech_2026/shin26_interspeech.pdf
---

# Breaking Shortcut Learning for Cross-Trial EEG-Guided Target Speech Extraction via Two-Stage Training

[PDF](https://www.isca-archive.org/interspeech_2026/shin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-595)

**TL;DR** — TRUST-TSE is a two-stage training framework for EEG-guided target speech extraction that breaks trial-specific shortcut learning, enabling robust cross-trial generalization where end-to-end baselines fail.

## Problem

End-to-end neural models for electroencephalography (EEG) guided target speech extraction achieve high accuracy under standard within-trial evaluations but collapse below chance levels on unseen trials. The authors demonstrate that this failure occurs because models exploit non-informative, temporally correlated trial-specific EEG patterns as shortcuts for target selection instead of learning genuine EEG-speech alignment. This lack of cross-trial generalizability poses a critical reliability bottleneck for real-world neuro-steered hearing technologies.

## Method

The paper introduces TRUST-TSE, a two-stage framework that decouples EEG representation learning from target speech extraction to prevent shortcut utilization. In Stage 1, an EEG encoder is pretrained via contrastive learning to match EEG segments with corresponding attended speech segments, employing attended-speaker negative sampling where negatives are drawn from other segments of the same attended speaker to suppress trial identity cues. In Stage 2, a target speech extractor conditioned on the frozen pretrained EEG embeddings is trained using a confidence-weighted SI-SDR loss function based on EEG-source similarity. This design forces the model to rely strictly on meaningful, aligned EEG-audio correspondences rather than trial identifiers.

## Results

Evaluated on public benchmarks including the KUL and DTU datasets under strict cross-trial protocols, TRUST-TSE significantly outperforms conventional end-to-end models like NeuroHeed. While standard end-to-end models drop to near or below chance accuracy during cross-trial testing, TRUST-TSE maintains robust speaker selection and speech extraction performance. Diagnostic stress tests—such as test-time EEG shuffling and linear probing of trial indices—confirm that standard models rely heavily on trial-specific shortcuts, whereas the proposed contrastive and confidence-weighted two-stage approach successfully eliminates this vulnerability.

## Code

- https://github.com/argaaw/TRUST-TSE

## Applications

Speech and machine learning engineers developing neuro-steered hearing aids, cochlear implants, or brain-computer interfaces designed to extract attended speech in multi-speaker cocktail party environments.

## Limitations

The framework relies on clean contrastive alignment and assumes the availability of multi-trial neural and acoustic recordings for pretraining.

## Related

- (link related pages by id as the wiki grows)
