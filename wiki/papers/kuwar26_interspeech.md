---
id: kuwar26_interspeech
category: paralinguistics-emotion
labels: [multilingual]
institutions: ["Plaksha University", "Indraprastha Institute of Information Technology Delhi", "National Tsing Hua University", "University of Tartu"]
code: https://bhavin-19.github.io/vinayaka-interspeech26/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2262
pdf: https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.pdf
---

# VINAYAKA: Multilingual Audio-Visual Hate Speech Detection via Cross-Modal Fusion in Hyperbolic Space

*Bhavinkumar Vinodbhai Kuwar, Orchid Chetia Phukan, Rajesh Sharma*

[PDF](https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2262)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`

**TL;DR** — VINAYAKA is a multilingual audio-visual hate speech detection framework that bypasses ASR errors by fusing paralinguistic speech and behavioral visual features in hyperbolic space, achieving state-of-the-art performance in in-distribution and out-of-distribution settings.

## Key contributions

- Investigates the robustness of purely non-lexical audio-visual (paralinguistic and behavioral) cues for multilingual audio-visual hate speech detection (M-AVHSD).
- Proposes VINAYAKA, a novel framework featuring Cross-modal Fusion in Hyperbolic Space (CFHS) to align temporal audio and visual scenes.
- Demonstrates superior out-of-distribution robustness across code-mixed, cross-lingual, and cross-dataset conditions compared to text-centric baselines.
- Establishes comprehensive evaluations showing resilience to ASR error propagation.

## Problem

Prior hate speech detection systems overwhelmingly rely on text classification and ASR transcripts, rendering them vulnerable to ASR error propagation, especially in code-mixed and multilingual environments. Furthermore, automated moderation systems heavily discount non-lexical and visual cues like gestures, prosody, and facial dynamics that frequently convey hateful intent. Euclidean representation spaces also fail to capture the inherently hierarchical structure of behavioral cues. This work addresses these gaps by evaluating whether pure audio-visual representations modeled in hyperbolic geometry can provide reliable, language-agnostic hate speech detection.

## Method

The framework extracts features using frozen pre-trained encoders: WavLM for raw audio waveforms (94K hours pre-training, capturing prosodic and speaker-dependent characteristics) and ImageBind for uniformly sampled video frames (obtaining tubelet-based spatiotemporal embeddings). Unimodal features are passed through two 1D-CNN layers (64 and 128 filters, kernel size 3) with max pooling (pool size 2) and flattened into representations H^(a) and H^(v).

These Euclidean vectors are projected into the Poincaré ball D_c^d with negative curvature c via the exponential map at the origin. Cross-modal attention weights (alpha) are computed using hyperbolic geodesic distance d_c between Mëobius linear transformations of Queries, Keys, and Values for each modality. Feature aggregation uses Mëobius scalar multiplication and Mëobius addition, with bidirectional cross-modal features fused via Mëobius addition: O^(H) = O^(a->v) oplus_c O^(v->a). Finally, the fused representations are projected back to Euclidean space using the logarithmic map and processed by a fully connected network with a softmax output layer for binary classification.

Training uses the Adam optimizer with an initial learning rate of 1e-4, batch size of 16, binary cross-entropy loss, and early stopping based on validation macro-F1 scores.

## Experimental setup

Evaluated on four datasets: HateMM (43 hours, 1083 English videos), ToxCMM (4021 Hindi-English code-mixed utterances from 931 videos), MultiHateClip-En (MHCE, English), and MultiHateClip-Ch (MHCC, Chinese). Compared against unimodal baselines, feature concatenation (CON), Euclidean cross-attention (ECA), Mëobius addition (MA), MM-HSD, MultiHateClip (MHC), and ToxVidLM (TVLM). Uses 5-fold cross-validation and zero-intervention cross-dataset transfer protocols, measuring Accuracy and Macro-Average F1.

## Results

In in-distribution evaluations on HateMM, VINAYAKA achieves a headline accuracy of 0.914 and macro-F1 of 0.901, outperforming Euclidean cross-attention (0.861 Acc / 0.848 F1) and Mëobius addition alone (0.883 Acc / 0.871 F1). In cross-dataset transfer from HateMM to ToxCMM, VINAYAKA retains an F1 of 0.712 compared to steep drops in text-dependent baselines. Geometric ablations confirm that hyperbolic curvature (c = -1, yielding 0.901 F1 on HateMM) substantially outperforms Euclidean (c = 0, 0.877 F1) and spherical (c = +1, 0.801 F1) configurations.

The framework exhibits weaker transfer performance when crossing vastly divergent cultural and linguistic boundaries, such as training on Chinese MultiHateClip and transferring to English datasets, where cross-lingual visual/cultural gaps reduce macro-F1 scores down to 0.557.

| Model / Condition | HateMM (Acc/F1) | MH-En (Acc/F1) | MH-Ch (Acc/F1) | ToxCMM (Acc/F1) |
|---|---|---|---|---|
| Audio Only (A) | 0.798 / 0.786 | 0.648 / 0.636 | 0.642 / 0.629 | 0.781 / 0.774 |
| Video Only (V) | 0.815 / 0.804 | 0.664 / 0.652 | 0.661 / 0.649 | 0.768 / 0.761 |
| CON | 0.836 / 0.826 | 0.708 / 0.695 | 0.701 / 0.689 | 0.807 / 0.797 |
| ECA | 0.861 / 0.848 | 0.748 / 0.735 | 0.755 / 0.742 | 0.848 / 0.835 |
| MA | 0.883 / 0.871 | 0.782 / 0.779 | 0.739 / 0.725 | 0.835 / 0.825 |
| VINAYAKA (Ours) | 0.914 / 0.901 | 0.849 / 0.841 | 0.847 / 0.831 | 0.892 / 0.885 |

## Limitations

The study relies on frozen upstream models (WavLM and ImageBind), bounding performance to the representation quality of these base models. Cross-lingual transfer experiments reveal performance degradation when shifting between culturally and linguistically distant video spaces (e.g., Chinese to English or vice versa), indicating that visual symbols and paralinguistic markers still carry some domain-specific interpretations. Evaluation is constrained to binary hate speech classification tasks.

## Why read this

Researchers and engineers building robust, multi-modal content moderation systems will learn how hyperbolic geometry can be leveraged for cross-modal alignment of non-lexical audio-visual signals. It provides a blueprint for eliminating reliance on fragile text transcripts and ASR pipelines.

## Code

- https://bhavin-19.github.io/vinayaka-interspeech26/

## Applications

Automated online video content moderation, multilingual and code-switched social media monitoring, and safety filters for user-generated streaming platforms.

## Institutions / 機構

Plaksha University, Indraprastha Institute of Information Technology Delhi, National Tsing Hua University, University of Tartu

## Related

- (link related pages by id as the wiki grows)
