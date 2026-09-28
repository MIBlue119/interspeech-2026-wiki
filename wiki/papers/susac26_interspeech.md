---
id: susac26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1091
pdf: https://www.isca-archive.org/interspeech_2026/susac26_interspeech.pdf
---

# Stuttering Classification and Segmentation with Attention-Based Multiple Instance Learning

[PDF](https://www.isca-archive.org/interspeech_2026/susac26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/susac26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1091)

**TL;DR** — This paper presents a multiple instance learning neural network that utilizes clip-level labels to achieve frame-level stuttering segmentation and classification without requiring frame-level training data, yielding up to a 23% improvement in frame-level F1 score.

## Problem

Standardized clinical stuttering severity assessments require precise knowledge of the duration of individual dysfluencies, but most available stuttering datasets only provide clip-level labels due to the high cost of expert frame-level annotation. Previous deep learning attempts either require expensive frame-level pretraining or rely solely on instance-based pooling strategies that lack embedding-level modeling capacity. This paper addresses the gap by formulating clip-to-frame stuttering detection under a weakly-supervised multi-label multiple instance learning framework.

## Method

The architecture comprises a pretrained foundation speech encoder (comparing wav2vec2-large, WavLM-large, and Whisper-medium with ~300M parameters and 1024 embedding size) combined with an HConv multi-layer pooling interface. The temporal outputs are smoothed using a 4-layer bidirectional LSTM (512 units) and passed through a projection network (256 and 128 fully connected neurons with leaky ReLU). The system explores both an instance-based model using max-pooling and an embedding-based model utilizing MIL attention pooling (with two fully-connected layers and a tanh/softmax structure). Models are optimized using binary cross-entropy loss augmented with positive-class sample weighting and annotator-agreement batch weighting factors.

## Results

Evaluated on the SEP-28k-E dataset for clip-level classification and the FluencyBank CASA gold standard annotations (732 dysfluencies across 8 recordings) for frame-level segmentation. The proposed models achieve state-of-the-art results, showing a 23% improvement in frame-level F1 score and a 2% to 9% improvement in clip-level F1 score over baseline multi-label configurations. The approach demonstrates that models trained exclusively on clip-level labels can successfully perform zero-shot frame-level segmentation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and clinical researchers automating stuttering severity assessment (such as SSI-4 or SES metrics), as well as developers improving speech recognition interfaces for people who stutter.

## Limitations

Performance relies on the quality of clip-level weak annotations and requires threshold tuning for frame-level timestamp extraction.

## Related

- (link related pages by id as the wiki grows)
