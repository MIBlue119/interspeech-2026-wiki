---
id: sun26g_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1847
pdf: https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf
---

# ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1847)

**TL;DR** — ADD-DINO is a two-stage audio deepfake detection framework that leverages non-contrastive self-distillation on unlabelled audio, achieving near-full supervision performance with only 20% of labeled data and a 19.99% relative EER reduction on cross-domain benchmarks.

## Problem

Current audio deepfake detectors heavily rely on large volumes of expensive labeled data and tend to overfit to specific synthesis methods, resulting in poor cross-domain generalization and vulnerability to unseen attacks. This label scarcity and lack of robustness hinder their deployment in real-world security applications.

## Method

The framework utilizes a two-stage design with an XLS-R and AASIST backbone. In the first stage, the model is pretrained on one million unlabeled audio samples using a non-contrastive teacher-student self-distillation scheme, where the teacher processes global long segments and the student processes noise-augmented local short segments to learn consistency. In the second stage, the classification head is replaced, and the pretrained teacher backbone is fine-tuned on a small fraction of labeled data using weighted binary cross-entropy loss. Four different self-supervised backbones (WavLM-Large, XLS-R, XLSR-53, and Whisper-Medium) were evaluated.

## Results

Evaluated on ASVspoof 2019 LA, 2021 LA, and 2021 DF, the XLS-R-based ADD-DINO fine-tuned on only 20% of the training data achieved EERs of 0.55, 1.25, and 2.95, closely matching fully supervised models trained on 100% of the data. On cross-domain test sets like In-the-Wild and DFADD, ADD-DINO lowered the average EER from 15.31% to 12.25% (a 19.99% relative drop). On unseen modern synthesis algorithms (such as Udio, AudioBox, CosyVoice, and F5-TTS), it improved average classification accuracy from 66.5% to 81.6% (a 22.7% relative improvement).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and security engineers can use this framework to deploy robust audio deepfake detection systems in low-resource settings or against novel, unseen speech synthesis attacks.

## Related

- (link related pages by id as the wiki grows)
