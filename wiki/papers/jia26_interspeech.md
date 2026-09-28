---
id: jia26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1300
pdf: https://www.isca-archive.org/interspeech_2026/jia26_interspeech.pdf
---

# Augmenting Dysarthric Speech Severity Assessment with MOS Supervision

[PDF](https://www.isca-archive.org/interspeech_2026/jia26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jia26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1300)

**TL;DR** — Using human-annotated speech synthesis evaluation data from QualiSpeech as an auxiliary augmentation source improves automatic dysarthric speech severity assessment on the Speech Accessibility Project corpus, yielding up to a 43.7% relative MSE reduction.

## Problem

Automatic utterance-level assessment of dysarthric speech is bottlenecked by the extreme scarcity of clinically annotated, unconstrained-vocabulary datasets with expert perceptual ratings. While self-supervised learning helps, prior generative data augmentation methods lack human perceptual validation, leaving label reliability uncertain. This work leverages speech synthesis evaluation corpora—which share perceptual commonalities like reduced intelligibility and unnatural prosody—to provide scalable perceptual supervision.

## Method

The architecture uses pre-trained self-supervised learning (SSL) encoders (wav2vec 2.0 Base/Large*, HuBERT Base/Large) as feature extractors, followed by temporal mean pooling and a two-layer feed-forward regression head to predict continuous severity scores. Two training paradigms are explored: joint training (JT) combining QualiSpeech and SAP corpora at a 1:1 ratio with linearly mapped MOS scales, and sequential fine-tuning (FT) pre-training on QualiSpeech MOS dimensions (Overall Quality and Naturalness) before fine-tuning on SAP. The entire SSL encoder and regression head are fine-tuned end-to-end using an MSE loss, learning rate of 1e-5, and weight decay of 0.01.

## Results

Evaluated on the Speech Accessibility Project (SAP) challenge corpus using Mean Squared Error (MSE), Linear Correlation Coefficient (LCC), and Spearman's Rank Correlation Coefficient (SRCC). Fine-tuning (FT) on QualiSpeech overall quality consistently improved intelligibility prediction, achieving up to a 43.7% relative MSE reduction with wav2vec 2.0 Large+. For naturalness prediction, dimension-matched fine-tuning using QualiSpeech naturalness achieved the lowest MSE, yielding relative MSE reductions of 36.4% for wav2vec 2.0 Base and 40.9% for Large*, while joint training also showed consistent improvements (e.g., 24.2% MSE reduction for wav2vec 2.0 Large*). Smaller encoders like wav2vec 2.0 Base generalized better under in-domain training, whereas larger models derived greater benefit from the additional cross-domain supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building automated clinical tools for monitoring neurological disease progression, guiding speech therapy, and assessing rehabilitation outcomes in dysarthric patients.

## Limitations

Joint training underperforms fine-tuning for intelligibility due to semantic misalignment between MOS ratings and clinical phonemic clarity, and the intelligibility dataset exhibits severe class imbalance toward minimal impairment.

## Related

- (link related pages by id as the wiki grows)
