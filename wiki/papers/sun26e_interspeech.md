---
id: sun26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1716
pdf: https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf
---

# Label Correction Enhanced Dual-Stream Multiple Instance Learning for Weakly-Supervised Depression Detection in Speech

*Yanfei Sun, Yuanyuan Zhou, Xinzhou Xu, Jin Qi, Feiyi Xu, Zhao Ren, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1716)

**TL;DR** — The paper introduces Label Correction enhanced Dual-Stream Multiple Instance Learning (LC-DMIL) to simultaneously address inaccurate training labels and inexact instance-level supervision in weakly-supervised speech-based depression detection, achieving an Unweighted Average Recall (UAR) of 0.651 and an F1-score of 0.642 on DAIC-WOZ.

## Key contributions

- Proposes a label correction module that fuses likelihood-ratio-based and prototype-based correction strategies to clean noisy annotations in marginal clinical score ranges.
- Develops a dual-stream Multiple Instance Learning (MIL) depression detection module combining a max-rule stream (for identifying key instances) and an MIL-aggregator stream (using query-value attention).
- Establishes a robust two-step iterative training recipe alternating between label correction updates and multi-instance sequence learning.
- Demonstrates consistent improvements over state-of-the-art baselines on both DAIC-WOZ and AVEC 2014 under simulated weak supervision.

## Problem

Automatic Depression Detection (ADD) using speech faces significant hurdles in real-world weakly-supervised scenarios due to inaccurate and inexact labels. Prior systems blindly trust subjective annotators or questionnaire scores (like PHQ-8), ignoring label noise in marginal patient samples, while also failing to localize subtle, localized depressive acoustic traits within long recordings. Existing models such as ConvBiLSTM, SpeechFormer, and standard multi-instance learning approaches either suffer from confirmation bias caused by noisy labels or dilute critical acoustic signals by treating entire long dialogues uniformly.

## Method

The architecture consists of two main components: a sample-level label correction module and an instance-level dual-stream MIL depression detection module. Both modules share a backbone comprising a 1D-CNN layer (256 kernels, size 3, stride 1) followed by batch normalization, ReLU activation, 1D max-pooling (size/stride 2), a 4-layer Bidirectional LSTM (256 hidden units, dropout 0.5), and a 5-layer MLP classifier.

The label correction module maps sample outputs to class probabilities and adjusts training labels via a weighted combination of a likelihood-ratio-based strategy (comparing score ratios against a dynamically growing threshold $\delta(n_{Eq}) = 1.2 + 0.15(n_{Eq}-10)$) and a prototype-based strategy (using cosine similarities against $C=6$ class prototypes per category). The fused corrected label uses a weight $\gamma = 0.3$. 

The MIL-based detection module splits each sample into $n=9$ overlapping instances (1.2s length, 50% overlap). These instance embeddings are fed into a dual-stream structure: a max-rule stream that extracts key instance predictions via element-wise maximization, and an MIL-aggregator stream that computes query-value attention vectors mapped through linear weights with a combination parameter $\mu$. The combined loss function integrates cross-entropy and entropy regularization terms controlled by weight $\alpha = 0.1$. Training uses an initial 10-epoch warm-up with cross-entropy, followed by alternating label correction epochs and 50 MIL epochs, repeated for 5 outer iterations using the Adam optimizer with a weight decay of $10^{-4}$.

## Experimental setup

Experiments use the DAIC-WOZ dataset (142 clinical interviews, split into 7,742 training samples and 2,935 test samples after 6s segmentation and label-swapping on PHQ-8 scores 7-12 to simulate weak supervision) and the AVEC 2014 dataset (3,538 training and 3,696 test samples). Models are evaluated using Unweighted Average Recall (UAR) and F1-score, and compared against baselines including DepAudioNet, ConvBiLSTM, SpeechFormer, ComParE SVMs, CMT-SMER, and SLLC.

## Results

LC-DMIL achieves a headline UAR of 0.651 and an F1-score of 0.642 on DAIC-WOZ, outperforming the SLLC label-correction baseline (UAR 0.614) and ConvBiLSTM (UAR 0.580) with statistical significance ($p < 0.005$). Ablation studies confirm that combining both label correction and dual-stream MIL outperforms using either technique in isolation; specifically, replacing the dual-stream approach with single mean-rule or transformer-based MIL drops UAR performance down to 0.626 and 0.637 respectively. On the AVEC 2014 dataset, LC-DMIL similarly reaches a top UAR of 0.670, surpassing its standalone MIL (0.628) and label correction (0.657) variants.

| Systems / Conditions | UAR | F1-Score |
| :--- | :--- | :--- |
| DepAudioNet [3] | 0.574 | 0.580 |
| ConvBiLSTM [28] | 0.580 | 0.567 |
| SpeechFormer [29] | 0.576 | 0.549 |
| ComParE [30] | 0.550 | 0.540 |
| SLLC [6] | 0.614 | 0.613 |
| LC-DMIL (Proposed) | **0.651** | **0.642** |

## Limitations

The evaluation relies on artificially simulated weak supervision via label swapping on marginal PHQ-8 score bands, which may not completely replicate complex real-world clinical label noise distributions. The approach is only validated on English-language clinical interview corpora (DAIC-WOZ and AVEC 2014) with relatively small patient counts (142 and 84 speakers respectively), leaving cross-lingual and large-scale data generalization unproven.

## Why read this

Speech and ML researchers tackling noisy paralinguistic datasets should read this paper to learn how to couple dynamic prototype-based label correction with dual-stream attention-driven multiple instance learning for robust sequence classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated mental health screening tools, computer-aided clinical diagnosis systems, and robust affective computing applications operating on imperfectly annotated speech data.

## Related

- (link related pages by id as the wiki grows)
