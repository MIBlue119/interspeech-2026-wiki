---
id: sharma26_interspeech
category: speaker
labels: [low-resource, multilingual, robustness-noise]
institutions: ["Indian Institute of Technology Mandi"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2502
pdf: https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.pdf
---

# Robust Language Identification Using Semi-positive Contrastive Learning

*Shubham Sharma, Padmanabhan Rajan*

[PDF](https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharma26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2502)

**Category:** `speaker` · **Labels:** `low-resource`, `multilingual`, `robustness-noise`

**TL;DR** — Semi-positive Contrastive Learning (SpCL) introduces a bi-modal audio-text framework with a controlled target weighting loss to tackle domain shifts in low-resource spoken language identification, achieving 91.42% accuracy on unseen YouTube data.

## Key contributions

- Formulates spoken language identification as a contrastive representation problem using a shared audio-text embedding space (dim=512) without requiring explicit domain adaptation.
- Proposes a novel semi-positive contrastive loss governed by weight parameter alpha to distinguish strong positives from semi-positive pairs (same language, different domains).
- Introduces dynamic phoneme-sequence text captions to prevent representational collapse and increase structural variation compared to static sentence templates.
- Evaluates comprehensively across 12 Indian languages using multi-domain datasets, demonstrating superior out-of-distribution robustness.

## Problem

Spoken language identification (LID) systems frequently degrade when deployed on out-of-domain test sets due to acoustic over-fitting to specific recording conditions or channel environments, an issue exacerbated in low-resource languages with sparse training sets. Traditional mitigation strategies such as Unsupervised Domain Adaptation (UDA), Domain Generalization (DG), or acoustic data augmentation attempt to eliminate domain variance but often conflate core linguistic cues with channel noise. Furthermore, existing multimodal architectures treat all same-language samples identically, failing to explicitly model variance arising from cross-domain shifts.

## Method

The proposed architecture features two primary branches: an audio branch using a fine-tuned pretrained encoder (wav2vec 2.0 phoneme or Whisper) and a text branch using a RoBERTa encoder to process captions. Both modalities pass through projection heads mapping them into a shared 512-dimensional latent space Z. During training, similarity matrices are computed between audio and text embeddings within mini-batches, and optimized using a linear combination of a semi-positive contrastive loss and a standard cross-entropy classification loss weighted by lambda = 0.3.

The semi-positive contrastive loss relies on a target matrix T that assigns strong weights to positive pairs (same language and domain), moderate weights (controlled by parameter alpha) to semi-positive pairs (same language, different domains), and zero to negatives. The paper investigates static captions (e.g., templates declaring language and domain) versus dynamic captions (utterance-derived phoneme sequences). Dynamic captions distribute anchor attractions across multiple centers, widening the embedding space and preventing representation collapse.

During inference, the text encoder is discarded entirely, and only the audio encoder and classification heads are executed, keeping operational complexity low.

## Experimental setup

Evaluated on 12 Indian languages using EkStep (TV/broadcast news, ~117h), DatasetM (studio air recordings and YouTube vlogs, ~78h), and IndicVoices (~69h), alongside VoxLingua107 (~5483h) for broader validation. Baselines include an MFCC-Conformer (B1), ConfPhoneme with/without augmentations (B2a/B2b), Gradient Reversal Layer UDA (B3), and a fine-tuned Whisper encoder (B4). Evaluated primarily using classification accuracy on seen partitions, YouTube (yt) unseen domains, and IndicVoice unseen datasets.

## Results

SpCL_whisp (dynamic) achieves state-of-the-art results, scoring 98.76% on seen test data, 91.42% on the unseen YouTube dataset, and 54.52% on the challenging IndicVoice multi-domain dataset, outperforming the strong Whisper baseline (B4) which scores 97.9%, 88.1%, and 40.1% respectively. Ablation studies confirm that introducing semi-positive weights (alpha values between 0.3 and 0.7, with 0.7 yielding peak unseen performance) consistently improves robustness over standard binary contrastive learning (alpha = 0). Dynamic captions further outperform static captions across all encoder types, especially on highly mismatched out-of-domain evaluation partitions.

| System | Seen | DatasetM yt (Unseen) | IndicVoice (Unseen) |
| --- | --- | --- | --- |
| B1 (MFCC-Conformer) | 92.7 | 17.7 | 10.4 |
| B2b (ConfPhoneme + aug) | 95.4 | 82.3 | 50.2 |
| B3 (UDA via GRL) | 85.6 | 83.2 | 47.6 |
| B4 (WhisperEncoder) | 97.9 | 88.1 | 40.1 |
| SpCL_w2v2 (Dynamic) | 97.5 | 67.49 | 34.33 |
| SpCL_whisp (Dynamic) | 98.76 | 91.42 | 54.52 |

## Limitations

Performance on the highly diverse IndicVoice dataset remains comparatively low across all evaluated models (max 54.52%), highlighting that extreme multi-domain acoustic shifts and dialectal variations still pose challenges. The framework requires auxiliary text or reliable phonetic transcription models during training to construct dynamic captions. Furthermore, the evaluation focuses heavily on Indian languages and VoxLingua, leaving cross-lingual generalizability to entirely different language families less explored.

## Why read this

Researchers building robust, low-resource spoken language identification systems facing severe domain mismatch will find this a valuable blueprint for replacing costly explicit domain adaptation with a lightweight semi-positive contrastive loss.

## Code

- https://github.com/HeisenBug-07/Interspeech2026_SpCL

## Applications

Multilingual automatic speech recognition pipelines, spoken language translation systems, and voice-activated assistant language routing.

## Institutions / 機構

Indian Institute of Technology Mandi

**Funding / 經費:** Ministry of Electronics and Information Technology

## Related

- (link related pages by id as the wiki grows)
