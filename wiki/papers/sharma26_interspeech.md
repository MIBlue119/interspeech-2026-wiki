---
id: sharma26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2502
pdf: https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.pdf
---

# Robust Language Identification Using Semi-positive Contrastive Learning

[PDF](https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2502)

**TL;DR** — The paper introduces Semi-positive Contrastive Learning (SpCL) to improve cross-domain Spoken Language Identification (LID), achieving an accuracy of 91.42% on unseen YouTube test domains for 12 Indian languages.

## Problem

Spoken Language Identification models frequently degrade in performance when confronted with test data from mismatched domains or acoustic conditions, a vulnerability exacerbated in low-resource settings where training sets are small and prone to overfitting. Traditional multimodal or contrastive methods treat all same-language samples identically, failing to account for intra-language variance introduced by domain shifts and requiring complex explicit domain adaptation or generalization techniques.

## Method

The paper proposes Semi-positive Contrastive Learning (SpCL), which maps audio waveforms and text captions into a 512-dimensional shared latent space using a bi-modal encoder architecture. The audio branch employs fine-tuned top layers of either a phoneme-centric Wav2Vec 2.0 or a Whisper-base encoder, while the text branch utilizes RoBERTa with either static language-domain captions or dynamic phoneme-sequence captions. A novel semi-positive contrastive loss uses a weighting factor alpha to pull strong positive pairs (same language and domain) closer while applying a weaker attraction to semi-positive pairs (same language, different domains) and pushing negatives away. The total training objective combines this contrastive loss (weighted by lambda = 0.3) with a standard cross-entropy classification loss, though only the audio encoder and classifier are retained for inference.

## Results

Evaluated on 12 Indian languages across multi-domain datasets (EkStep, DatasetM, and IndicVoice), the SpCL whisp model with dynamic captions achieved 98.76% accuracy on seen data, 91.42% on the unseen YouTube (YT) domain, and 54.52% on the IndicVoice domain, outperforming strong baselines like MFCC-Conformer (10.4% on IndicVoice), standard ConfPhoneme, and gradient-reversal UDA. On the VoxLingua33 evaluation set, SpCL whisp with dynamic captions reached 93.0% accuracy. Ablation studies confirmed that moderate semi-positive weights (alpha between 0.3 and 0.7) and dynamic phoneme captions consistently improve out-of-distribution generalization compared to binary contrastive learning.

## Code

- https://github.com/HeisenBug-07/Interspeech2026_SpCL

## Applications

Speech and machine learning engineers developing robust speech processing pipelines, automatic speech recognition (ASR) front-ends, and spoken language identification systems that must operate reliably across diverse acoustic environments and unseen channel distributions.

## Limitations

The models still experience performance drops when evaluated on severely mismatched distributions such as the IndicVoice dataset.

## Related

- (link related pages by id as the wiki grows)
