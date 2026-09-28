---
id: choi26e_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2186
pdf: https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.pdf
---

# SISER: Speaker-Invariant Speech Emotion Recognition with Entropy-Based Adversarial Training

[PDF](https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2186)

**TL;DR** — SISER integrates wav2vec 2.0 with an ECAPA-TDNN speaker discriminator via entropy-based adversarial training to remove speaker variability, achieving an unweighted accuracy of 60.63% on IEMOCAP.

## Problem

Speech emotion recognition suffers from performance drops due to speaker variability in cross-speaker settings and a scarcity of labeled data. Although self-supervised models learn transferable representations, speaker identity remains entangled with emotional content. Traditional adversarial approaches fail to completely suppress speaker cues because they typically employ weak, shallow speaker classifiers.

## Method

The framework uses a pretrained wav2vec 2.0 base model as the feature encoder, an emotion classifier composed of stacked fully connected layers, and an ECAPA-TDNN model as the speaker classifier. The encoder and emotion classifier are updated by minimizing emotion cross-entropy while maximizing the entropy of the speaker classifier's output distribution, driving the posterior over speakers to be uniform. The speaker classifier is trained independently via cross-entropy loss on speaker identities while freezing the encoder. The model uses the Adam optimizer, a batch size of 64, and a balance weight lambda of 0.5 on a single NVIDIA A100 GPU.

## Results

Evaluated on the IEMOCAP dataset using a 10-fold leave-one-session-out cross-validation protocol without data augmentation, SISER achieves 60.63% unweighted accuracy (UA) and 58.53% weighted accuracy (WA). It outperforms the unaugmented baseline (51.15% UA) and a vanilla wav2vec 2.0 model without speaker suppression (56.46% UA). An ablation confirms that replacing the shallow speaker classifier with ECAPA-TDNN significantly improves disentanglement and downstream performance.

## Code

- https://github.com/slp-lab-research/siser.git

## Applications

Speech and machine learning engineers building speaker-independent speech emotion recognition systems for call centers, assistive agents, or affective computing applications.

## Limitations

Evaluated exclusively on the IEMOCAP dataset under a specific 10-fold cross-validation protocol.

## Related

- (link related pages by id as the wiki grows)
