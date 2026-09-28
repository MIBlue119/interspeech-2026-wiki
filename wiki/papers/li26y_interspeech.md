---
id: li26y_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1586
pdf: https://www.isca-archive.org/interspeech_2026/li26y_interspeech.pdf
---

# KFC-KWS: Keyframe Fusion with CTC for User-Defined Keyword Spotting

*Jin Li, Wenbin Jiang, Ji Hu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1586)

**TL;DR** — KFC-KWS is a multimodal user-defined keyword spotting framework that uses CTC posterior peaks to select phoneme-aligned keyframes for cross-modal fusion, achieving 98.73% balanced AUC on LibriPhrase.

## Key contributions

- Introduces a zero-cost CTC-guided keyframe selection strategy exploiting posterior peaks to isolate discriminative phoneme frames.
- Proposes a dual-branch architecture combining keyframe-based matching (QbyKeyframe) with full-feature global context modeling (QbyOmni).
- Applies modality-level dropout during training to prevent over-reliance on any single enrollment modality.
- Achieves state-of-the-art performance on the challenging LibriPhrase-Hard subset (97.65% AUC, 7.75% EER) with only 2.0M trainable parameters.

## Problem

User-defined keyword spotting systems must distinguish target keywords from phonetically confusable alternatives, especially when candidates differ by only one or two phonemes. Prior full-utterance matching methods treat all frames uniformly, diluting subtle phonetic distinctions, while memory-bank approaches require heavy external components. This lack of fine-grained phonetic alignment leads to high false activation rates on confusable keywords during practical deployment.

## Method

KFC-KWS uses pre-trained XLS-R (0.3B) for audio, multilingual DistilBERT for text, and a G2P converter for 64-dimensional phoneme embeddings. All modality features are linearly projected to a shared 128-dimensional space, combined with positional and modality encodings, and fed into two parallel branches. The QbyOmni branch concatenates full query audio features with each enrollment modality, passes them through a 2-layer Transformer encoder (feed-forward dim 512), and maps them via a GRU (hidden size 64) and FC layer into fixed-dimensional sequences.

The QbyKeyframe branch passes projected audio embeddings through a linear layer and softmax to compute frame-level phoneme posterior probabilities over a phoneme vocabulary plus a blank token. Non-blank peaks satisfying a distinct-token constraint (retaining only the first occurrence of each unique predicted phoneme) are selected as keyframes. A symmetric context window of size 2w+1 (with w=2, yielding 5 frames) averages features around each keyframe timestamp to generate compact representations. Cosine similarity matrices between keyframes and enrollment features act as queries in cross-attention over full-utterance representations to combine local phonetic precision with global context.

The composite training loss sums an utterance-level binary cross-entropy loss, sequence-level cross-entropy losses for phoneme and text modalities, and a CTC loss on phoneme predictions weighted by lambda = 0.2. Modality dropout randomly zeroes out entire enrollment modalities with probability p = 0.5 during training.

## Experimental setup

Evaluated on the LibriPhrase benchmark (extracted from LibriSpeech train-clean-100/360 for training, and train-other-500 for the evaluation split containing easy LPE and hard LPH subsets). Compared against baselines including EMKWS, iPhonMatchNet, CED, HyperSpotter-c, SLiCK, MM-KWS, PLCL, and DS-KWS-M1. Metrics include Area Under the Curve (AUC) and Equal Error Rate (EER) on LPH, LPE, and their arithmetic mean (Balanced). Implemented with batch size 512 using the Adam optimizer (lr = 0.001) for 50 epochs on a single NVIDIA 4080 Super GPU, totaling approximately 2.0M trainable parameters.

## Results

With augmentation, KFC-KWS achieves a top balanced AUC of 98.73% and a balanced EER of 4.85%. On the challenging hard subset (LPH), it reaches 97.65% AUC and 7.75% EER, outperforming the augmented PLCL baseline by 1.06% in AUC and 0.72% in EER while maintaining a compact 2.0M parameter footprint compared to PLCL's 40.0M. Ablation studies confirm that removing the phoneme encoder causes the most severe performance degradation, dropping LPH AUC by 5.75% to 91.90%. The method trades away a minor amount of performance on easy samples (LPE EER around 1.94% to 2.22%) to secure substantial gains on confusable hard keywords.

| System | LPH AUC (%) | LPE AUC (%) | LPH EER (%) | LPE EER (%) | Bal. AUC (%) | Bal. EER (%) |
| --- | --- | --- | --- | --- | --- | --- |
| MM-KWS | 94.02 | 99.98 | 12.46 | 0.41 | 97.00 | 6.44 |
| PLCL | 95.56 | 99.95 | 9.96 | 1.21 | 97.76 | 5.59 |
| HyperSpotter-c | 96.07 | 99.89 | 10.45 | 1.08 | 97.98 | 5.77 |
| DS-KWS-M1 | 95.77 | 99.98 | 10.02 | 0.52 | 97.88 | 5.27 |
| KFC-KWS (Unaugmented) | 96.54 | 99.58 | 9.13 | 2.22 | 98.06 | 5.68 |
| KFC-KWS (Augmented) | 97.65 | 99.81 | 7.75 | 1.94 | 98.73 | 4.85 |

## Limitations

The evaluation is restricted to the LibriPhrase dataset derived from clean LibriSpeech audio, leaving noise-robustness and real-world acoustic variability untested. The sparse keyframe selection mechanism causes a slight regression in performance on easy keyword sets compared to full-sequence baselines. Furthermore, the reliance on pre-trained text and audio encoders (such as XLS-R and DistilBERT) inherits their respective language and resource footprints.

## Why read this

Researchers and engineers building open-vocabulary or user-defined keyword spotting systems will learn how to leverage CTC posterior peaks as a zero-cost attention anchor for cross-modal alignment. It provides a blueprint for achieving state-of-the-art discrimination on phonetically confusable words with a lightweight parameter budget.

## Code

- https://github.com/gusrud1103/LibriPhrase.git

## Applications

On-device voice assistants, personalized wake-word engines, and interactive smart home devices supporting user-defined custom commands.

## Related

- (link related pages by id as the wiki grows)
