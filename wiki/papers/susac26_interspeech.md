---
id: susac26_interspeech
category: health-clinical
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1091
pdf: https://www.isca-archive.org/interspeech_2026/susac26_interspeech.pdf
---

# Stuttering Classification and Segmentation with Attention-Based Multiple Instance Learning

*Petar Sušac, Sebastian P. Bayerl, Hrvoje Džapo*

[PDF](https://www.isca-archive.org/interspeech_2026/susac26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/susac26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1091)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This paper presents a Multiple Instance Neural Network (MINN) architecture that leverages weakly-supervised instance-based and attention-based embedding multiple instance learning (MIL) with fine-tuned speech foundation encoders to perform accurate frame-level stuttering segmentation using only clip-level labels. It achieves a state-of-the-art 0.70 frame-level F1 score on the CASA dataset, outperforming previous segmentation baselines by 23%.

## Key contributions

- Generalizes the weakly-supervised multiple-instance learning paradigm to multi-label stuttering classification and segmentation.
- Applies attention-based embedding MIL and HConv feature pooling to stuttering detection for the first time.
- Achieves state-of-the-art clip-level multi-label classification results on the SEP-28k-E dataset using fine-tuned wav2vec 2.0, WavLM, and Whisper encoders.
- Attains state-of-the-art frame-level stuttering classification performance on the CASA annotations of the FluencyBank dataset without requiring pre-training on frame-based datasets.

## Problem

Assessing stuttering severity clinically using instruments like the SSI-4 and SES requires knowing the exact duration and timestamps of individual dysfluencies (blocks, prolongations, repetitions). However, the vast majority of available stuttering datasets (e.g., SEP-28k) provide only cheaper, more practical clip-level labels rather than frame-level timestamps. Prior deep learning methods treat stuttering classification purely at the clip level, whereas existing frame-level segmentation methods like YOLO-Stutter or StutterCut rely on artificial datasets, object detection formulations, or graph clustering, and struggle with end-to-end processing.

## Method

The architecture operates on 3-second audio clips segmented into 20 ms frames (yielding $T = 150$ frames). It starts with a pretrained foundation encoder (wav2vec2-large, whisper-medium, or wavlm-large, all having ~300M parameters and 1024 embedding dimensions), pooling outputs across multiple layers via the HConv interface. These representations pass through a 4-layer bidirectional LSTM (512 units) for temporal smoothing, followed by a projector (two fully connected layers of 256 and 128 neurons with leaky ReLU).

Two variants are evaluated: an instance-based model and an embedding-based model. The instance-based model uses a multi-label classification head with sigmoid activation to output per-instance probabilities, aggregating them via max-pooling for clip-level results. The embedding-based model utilizes a MIL attention pooling mechanism (adapted from Ilse et al., using two fully connected layers of 128 and $T$ neurons with tanh and softmax) to compute bag representations. For inference, frame-level segmentation is performed by thresholding ($\theta = 0.5$) either instance scores or unnormalized attention weights (before softmax) to prevent prolonged dysfluencies from diluting the weights.

Models are trained using binary cross-entropy (BCE) loss averaged across labels, incorporating positive sample weighting for class imbalance and an annotator-agreement weighting factor (0.25 penalty for non-unanimous votes on the 'No stuttered words' label, normalized per batch). Training proceeds in two phases using the Adam optimizer (batch size 16, initial learning rate $5 \times 10^{-5}$): encoders are first frozen until validation loss plateaus, then unfrozen and fine-tuned at an LR of $1 \times 10^{-5}$.

## Experimental setup

Evaluated on the SEP-28k-E dataset (28,000 clips of 3 seconds), the FluencyBank clip-level dataset (4,144 clips), and the CASA consensus test set of FluencyBank (8 variable-length recordings containing 732 dysfluencies). Baselines include Miyahara et al., Haas et al., Shih et al., YOLO-Stutter, and StutterCut. Metrics include F1 score, precision, and recall.

## Results

On the SEP-28k-E multi-label clip-level task, the Whisper + max/attn pool and WavLM + max/attn pool configurations achieve top F1 scores of 0.35 for blocks, up to 0.53 for sound repetitions, and 0.82–0.83 for interjections, matching or exceeding prior baselines. On the cross-dataset FluencyBank single-label classification task, Whisper with attention pooling establishes a new state-of-the-art F1 score of 0.90 (vs 0.85 for Shih et al. and 0.88 for WavLM max pool), proving the benefit of unfreezing and fine-tuning foundation encoder weights. On the CASA frame-level segmentation benchmark, the Whisper embedding-based attention model achieves the highest F1 score of 0.70 (precision 0.71, recall 0.69), outperforming YOLO-Stutter (F1 0.47), StutterCut (F1 0.45), and its max-pooling counterpart (F1 0.66).

| Model | F1 | Precision | Recall |
|---|---|---|---|
| YOLO-Stutter [21] | 0.47 | 0.47 | 0.49 |
| StutterCut [22] | 0.45 | 0.39 | 0.58 |
| WavLM + max. pool | 0.46 | 0.53 | 0.41 |
| WavLM + attn. pool | 0.56 | 0.53 | 0.59 |
| Whisper + max. pool | 0.66 | 0.76 | 0.59 |
| Whisper + attn. pool | 0.70 | 0.71 | 0.69 |

## Limitations

The models occasionally struggle with long-lasting blocks because the 3-second context window lacks sufficient acoustic context for dysfluencies spanning multiple windows. Evaluation is currently restricted to single-label frame-level performance on the CASA dataset, leaving multi-label frame-level segmentation for future work.

## Why read this

Researchers building automated speech pathology and stuttering severity assessment tools will find this digest a blueprint for turning cheap clip-level labels into precise frame-level segmentations without requiring expensive frame-annotated datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical stuttering severity assessment, speech therapy monitoring tools, and improving speech recognition (ASR) robustness for people who stutter.

## Institutions / 機構

University of Zagreb, Rosenheim Technical University of Applied Sciences

**Funding / 經費:** European Union NextGenerationEU, NPOO VISTAHealth

## Related

- (link related pages by id as the wiki grows)
