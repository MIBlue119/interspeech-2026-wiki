---
id: toussaint26_interspeech
category: speech-synthesis
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2499
pdf: https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.pdf
---

# Emergence of Phonetic Representations in EMG-based Silent Speech Interfaces

[PDF](https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2499)

**TL;DR** — This paper investigates learned representations in surface EMG-based silent speech interfaces, demonstrating that linearly separable phonetic structures naturally emerge even without explicit phone supervision, while standard contrastive pretraining fails to produce useful latent spaces for downstream speech synthesis or phone classification.

## Problem

Silent speech interfaces decode articulatory muscle movements from sources like surface electromyography (EMG) into text or speech to aid speech restoration and private communication. However, these systems suffer from a severe scarcity of open-source annotated data compared to acoustic speech corpora. While self-supervised learning (SSL) techniques like contrastive pretraining are often used to mitigate data scarcity, prior attempts yielded only marginal improvements for speech synthesis and phone classification, highlighting a fundamental knowledge gap regarding what these latent spaces actually learn.

## Method

The authors train neural models on an 18.6-hour single-speaker aligned EMG-audio dataset using four distinct tasks: EMG-to-speech (using frame-wise MSE regression), EMG-to-phones (using cross-entropy phone classification), joint EMG-to-speech&phones (multi-task objective), and EMG-to-text (using CTC loss). The model architecture consists of 48 residual convolutional blocks followed by 12 conformer blocks and a linear output layer. They evaluate internal representations using linear probing (introducing linear regression probing for mel-spectrogram synthesis alongside linear classification for phones) and analyze feature similarity via Linear Central Kernel Alignment (CKA) and UMAP projections.

## Results

Using linear probing on the 18.6-hour dataset, the joint EMG-to-speech&phones model achieves the highest phone classification accuracy at 84.29% (supervised) and 84.68% (finetuned). The purely supervised EMG-to-speech model unexpectedly yields strong intermediate phonetic representations, outperforming dedicated phone-classification models in early encoder layers (e.g., layer 8 accuracy of 79.44% versus 75.22%). Conversely, the self-supervised contrastive pretraining (emg2vec) model achieves a poor phone classification accuracy and an unusable speech synthesis Word Error Rate (WER) of 98.18%. For speech synthesis, models trained without a frame-wise MSE regression loss perform extremely poorly, with WERs jumping to 100% for EMG-to-phones and over 95% for EMG-to-text, proving that classification representations do not transfer to regression-based acoustic synthesis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing silent speech interfaces, speech restoration hardware, or silent communication devices will benefit from these representation analysis insights to improve data-efficient training.

## Limitations

The empirical findings and claims of phonetic emergence are currently restricted to a single-speaker dataset with a limited data volume, requiring validation on larger multi-speaker corpora.

## Related

- (link related pages by id as the wiki grows)
