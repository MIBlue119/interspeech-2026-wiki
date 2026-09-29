---
id: toussaint26_interspeech
category: tts
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2499
pdf: https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.pdf
---

# Emergence of Phonetic Representations in EMG-based Silent Speech Interfaces

*Guillaume Toussaint, Deborah Pereg, Kevin Scheck, Tanja Schultz, Jürgen Schmidhuber, Michael Wand*

[PDF](https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toussaint26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2499)

**Category:** `tts` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates learned representations in surface EMG-based silent speech interfaces, demonstrating that phonetic representations spontaneously emerge in latent space even without explicit phonetic supervision during training. However, self-supervised contrastive pretraining alone fails to yield representations suitable for speech synthesis or phone classification.

## Key contributions

- Evaluated linear probing across eight distinct training configurations for EMG-based silent speech interfaces to assess latent space phonetic content.
- Showed that purely regression-based speech synthesis objectives cause phonetic representations to emerge earlier in the network (layers 8-10) rather than at the final layer.
- Demonstrated that self-supervised contrastive pretraining (emg2vec) learns latent spaces that are not semantically aligned with acoustic or phonetic targets.
- Established that combining regression and cross-entropy classification losses achieves the highest phone classification accuracy (84.68%) and strong speech intelligibility (35.26% WER).

## Problem

Silent speech interfaces decode articulatory muscle movements via surface EMG into text or speech to enable private communication or speech restoration. A major bottleneck is data scarcity, as open-access EMG datasets are drastically smaller (e.g., 18.6 hours) than standard speech corpora like Librispeech (960 hours). While self-supervised learning (SSL) like Contrastive Predictive Coding or HuBERT has been applied to mitigate data scarcity, prior work showed that contrastive pretraining yielded marginal or no improvements for downstream speech synthesis and phone classification. This work addresses the need for an empirical understanding of what representations these models actually learn and why prior pretraining methods fall short.

## Method

The architecture comprises 3 residual convolutional blocks followed by 12 conformer blocks and a linear projection layer. The framework was evaluated across four primary supervised/finetuned tasks: EMG-to-speech (predicted via frame-wise MSE loss L_MSE), EMG-to-phones (classified via cross-entropy loss L_CE), multi-task EMG-to-speech&phones, and EMG-to-text (transcribed via CTC loss). Additionally, unsupervised pretraining was implemented using emg2vec, where feature encoder outputs were product-quantized, 20% masked, fed through conformers, and optimized with a contrastive loss using a temperature parameter of 0.2 and 100 negative samples. Linear probing was utilized not just for classification, but extended to regression (mel-spectrogram prediction) across network layers to evaluate feature quality.

Models were trained using AdamW on an RTX 3090 GPU for 64 epochs (speech/phone lr=10^-3, text lr=10^-4, weight decay 10^-2) while pretraining ran for 1000 epochs (lr=10^-6, weight decay 10^-3). Evaluation metrics included linear probing phone classification accuracy (with and without silences), word error rate (WER) computed via a pretrained Wav2Vec2 model, mean squared error (MSE) for spectrogram regression, UMAP projections, and Linear Central Kernel Alignment (CKA) for representation similarity.

## Experimental setup

Evaluated on the single-speaker Gaddy & Klein dataset consisting of 18.6 hours of aligned EMG-audio pairs and unvoiced EMG recordings (12 hours voiced, 6 hours unvoiced/voiced with DTW alignment). Compared against random initialization and self-supervised emg2vec pretraining baselines. Assessed via linear probing accuracy, mel-spectrogram MSE, and Wav2Vec2-derived Word Error Rate (WER).

## Results

The multi-task EMG-to-speech&phones setup achieved the highest phone classification accuracy at 84.68% (52.74% excluding silences), closely matching its supervised counterpart (84.29%). For speech synthesis, the multi-task model achieved a WER of 35.26% (MSE 0.80), whereas the pure EMG-to-speech model achieved 39.63% WER (MSE 0.78). In contrast, the pretrained emg2vec baseline failed catastrophically on synthesis with a 98.18% WER (1.19 MSE) and only 37.56% phone accuracy, performing similarly to the randomly initialized baseline (38.46% phone accuracy, 98.34% WER).

Ablations across encoder layers revealed that for the EMG-to-speech model, intermediate layers 10 yielded higher linear probing phone accuracy (80.08%) than the final layer 12 (74.54%), indicating that intermediate features are more general and better suited for phone classification. CKA similarity heatmaps confirmed that supervised and finetuned representations align closely with each other, whereas pretrained representations diverge significantly.

| Setup | Sil (%) | No sil (%) | MSE | WER (%) |
|---|---|---|---|---|
| Pretrained | 37.56 | 4.45 | 1.19 | 98.18 |
| Random | 38.46 | 4.24 | 1.22 | 98.34 |
| EMG-to-text (finetuned) | 76.87 | 45.80 | 1.03 | 95.91 |
| EMG-to-speech&phones (finetuned) | 84.68 | 52.74 | 0.80 | 35.26 |
| EMG-to-speech (\lambda_{phones}=0) | 74.57 | 43.48 | 0.78 | 39.63 |
| EMG-to-phones (\lambda_{phones}=1) | 75.35 | 45.43 | 1.10 | 100.0 |

## Limitations

The empirical findings are restricted to a single-speaker dataset of modest scale (18.6 hours), meaning claims of phonetic emergence require validation on larger multi-speaker corpora. The evaluation relies heavily on proxy metrics such as Wav2Vec2-derived WER rather than human subjective listening tests. Furthermore, the self-supervised contrastive pretraining approach failed to learn semantically aligned latent spaces, leaving open the question of how to successfully apply SSL to low-resource EMG data without supervised targets.

## Why read this

Speech and ML researchers working on silent speech interfaces or multimodal speech reconstruction will find this an insightful diagnostic study on what latent representations actually encode under different loss functions. It provides clear empirical evidence that standard contrastive SSL fails for EMG feature extraction, while multi-task supervised training successfully co-optimizes phonetic structure and acoustic synthesis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech restoration devices, silent communication interfaces, and myoelectric vocal interaction systems.

## Institutions / 機構

SUPSI, University of Bremen, King Abdullah University of Science and Technology

**Funding / 經費:** Swiss National Science Foundation, German Research Foundation

## Related

- (link related pages by id as the wiki grows)
