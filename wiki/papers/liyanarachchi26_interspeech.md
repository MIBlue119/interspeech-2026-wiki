---
id: liyanarachchi26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1131
pdf: https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.pdf
---

# Paediatric-HGNN: A Hybrid Heterogeneous Graph Neural Network for Detecting Disfluency in Children’s Speech via Multiscale Acoustic Fusion

[PDF](https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1131)

**TL;DR** — Paediatric-HGNN is a heterogeneous graph neural network that models lexical-acoustic interactions to detect disfluencies in children's speech, achieving an overall weighted accuracy of 82.4%.

## Problem

Automated stuttering detection models optimized for adult speech fail to generalize to paediatric populations due to high acoustic variability in developing voices and the challenge of distinguishing pathological stuttering from typical developmental disfluencies. This domain shift leads to poor clinical utility and misclassification of cognitive-linguistic revisions. Furthermore, standard black-box deep learning architectures lack the transparency required for clinical adoption by speech-language pathologists.

## Method

The framework models speech as a heterogeneous graph containing word nodes (initialized with a 945-dimensional hybrid vector combining Wav2Vec2-base-960h, mel-spectrograms, MFCCs, and physics proxies) and frame nodes (initialized with 768D Wav2Vec2 embeddings). Four edge types connect the nodes: hierarchical edges linking frames to parent words, sequential edges maintaining temporal flow, contextual edges spanning a ±2 word neighborhood, and self-loops. Features are projected into a shared 256D latent space using hierarchical cross-modal attention, followed by relational graph convolutions (GATv2Conv) and a 2-layer Bidirectional GRU combined via learnable gated residual fusion. The network is trained using AdamW and Focal Loss with class-specific weights, leveraging data augmentation (segment repetition, pitch wobbling, and synthetic silence) and selective oversampling to handle class imbalance.

## Results

Evaluated on a consolidated corpus of UCLASS and the VoicesCWS subset of FluencyBank comprising 47 children using a speaker-independent 5-fold cross-validation protocol, Paediatric-HGNN achieves an overall weighted accuracy of 82.4% ± 3.0% and a weighted F1-score of 0.826. It obtains an F1 of 0.904 for fluent speech, 0.280 for core stutters, and 0.386 for typical disfluencies, outperforming standard 4-class SOTA baselines such as ResNet+BiLSTM, StutterNet, Atrous-CNN, and Whister. Transfer learning from the adult SEP-28k dataset caused a catastrophic drop in typical disfluency F1 to 0.08, confirming the severe adult-to-paediatric domain shift. Ablation studies demonstrated that removing contextual edges dropped typical disfluency F1 to 0.287, while removing frame-to-word attention reduced core stutter F1 to 0.213.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and clinical researchers needing objective, interpretable automated tools for early diagnosis and differentiation of developmental versus pathological speech disfluencies in children.

## Limitations

Identifying core stutters in paediatric speech remains difficult due to the low natural prevalence of pathological blocks and prolongations in spontaneous conversational corpora.

## Related

- (link related pages by id as the wiki grows)
