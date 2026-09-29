---
id: sun26e_interspeech
category: health-clinical
institutions: ["Nanjing University of Posts and Telecommunications", "Wuxi University", "Graz University of Technology", "University of Bremen", "Technische Universitat Munchen", "Imperial College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1716
pdf: https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf
---

# Label Correction Enhanced Dual-Stream Multiple Instance Learning for Weakly-Supervised Depression Detection in Speech

*Yanfei Sun, Yuanyuan Zhou, Xinzhou Xu, Jin Qi, Feiyi Xu, Zhao Ren, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1716)

**Category:** `health-clinical`

**TL;DR** — The paper introduces Label Correction enhanced Dual-stream Multiple Instance Learning (LC-DMIL) to simultaneously address inaccurate training labels and inexact instance-level annotations in weakly-supervised speech-based depression detection, achieving a UAR of 0.651 and an F1-score of 0.642 on DAIC-WOZ.

## Key contributions

- Proposes a label correction module that fuses likelihood-ratio-based and prototype-based correction strategies to clean noisy annotations.
- Develops a dual-stream multi-instance learning strategy combining a max-rule stream and an MIL-aggregator stream to capture subtle, instance-level depressive traits.
- Employs shared 1D-CNN and Bi-LSTM backbones across both sample and instance levels to map raw audio features to robust representations.
- Demonstrates state-of-the-art performance under simulated weak supervision and label noise on both DAIC-WOZ and AVEC 2014 datasets.

## Problem

Automatic Depression Detection (ADD) using speech typically suffers from two core weakly-supervised challenges: inaccurate labels (noisy annotator judgments or subjective questionnaire scores) and inexact labels (depressive traits restricted to only subtle sub-segments of an overall audio recording). Prior models such as DepAudioNet, ConvBiLSTM, SpeechFormer, and ComParE baseline systems trust training labels blindly and fail to isolate local acoustic indicators within long recordings. Addressing these combined issues is critical for deploying reliable ADD systems in real-world clinical contexts where medical resources are scarce.

## Method

The architecture comprises two main stages: a sample-level label correction module and an instance-level dual-stream MIL depression detection module. Both modules use identical backbone structures consisting of a 1D-CNN layer (256 kernels, size 3, stride 1), batch normalization, ReLU activation, 1D max-pooling (size/stride 2), and a 4-layer Bi-LSTM (256 hidden units, dropout 0.5), followed by a 5-layer MLP classifier. The input audio is processed as 80-dimensional log Mel-spectrograms extracted via Librosa (frame length 2048, shift 533). 

The label correction module cleans sample labels from epoch 11 onward by fusing a likelihood-ratio-based correction strategy (using a dynamically growing threshold $\delta(n^{(Eq)})$) and a prototype-based correction strategy (utilizing cosine similarity against class prototype sets where the number of prototypes per class is 6). The corrected label prediction combines these strategies using a weighting factor $\gamma = 0.3$.

In the second module, each sample is split into $n=9$ instances (each 1.2s with 0.5 overlap). The instances are passed to a dual-stream MIL setup: a max-rule stream that extracts key instances via an instance-level MLP classifier, and an MIL-aggregator stream that maps instance embeddings into query and value vectors via tanh and ReLU transformations, combining them via attention-like similarity weights modulated by a mixing hyperparameter $\mu$. The training regime alternates between backbone warmup, label correction, and MIL detection over iterative cycles optimized with Adam (weight decay $10^{-4}$).

## Experimental setup

Experiments are conducted on the DAIC-WOZ dataset (142 clinical interviews; 7,742 training samples and 2,935 test samples after 6s segmentation and label-swapping on PHQ-8 scores between 7 and 12) and the AVEC 2014 dataset (3,538 training and 3,696 test segments). Baselines include DepAudioNet, ConvBiLSTM, SpeechFormer, ComParE features with SVM, CMT-SMER (Audio), and SLLC. Evaluation metrics are Unweighted Average Recall (UAR) and F1-score.

## Results

LC-DMIL achieves a headline UAR of 0.651 and an F1-score of 0.642 on DAIC-WOZ, outperforming SLLC (UAR 0.614), ConvBiLSTM (0.580), SpeechFormer (0.576), and ComParE (0.550). On AVEC 2014, it reaches a UAR of 0.670 and F1-score of 0.668, surpassing its non-MIL variant SLLC (0.657) and pure ConvBiLSTM (0.644). Ablations confirm that the dual-stream MIL strategy outperforms alternative rules like mean-rule (0.626 UAR) or transformer-based MIL (0.637 UAR), and that optimal label correction mixing requires $\gamma = 0.3$.

| Systems / Conditions | UAR | F1-Score |
| :--- | :--- | :--- |
| DepAudioNet [3] | 0.574 | 0.580 |
| ConvBiLSTM [28] | 0.580 | 0.567 |
| SpeechFormer [29] | 0.576 | 0.549 |
| ComParE [30] | 0.550 | 0.540 |
| SLLC [6] | 0.614 | 0.613 |
| LC-DMIL (Proposed) | **0.651** | **0.642** |

## Limitations

The evaluation relies on a simulated weak-supervision setup via label-swapping on marginal PHQ-8 score bands rather than natively gathered wild noisy labels. The scope is restricted to English-language clinical interviews (DAIC-WOZ and AVEC 2014) and requires hyperparameter tuning for instance bag sizes and stream blending weights.

## Why read this

Speech and ML researchers tackling noisy labels and fine-grained localization in paralinguistics will find a clean blueprint for combining prototype/likelihood-ratio label cleaning with dual-stream multi-instance learning.

## Code

- https://github.com/zhou123122/SLLC

## Applications

Automated mental health screening, telehealth voice diagnostic tools, and general affective computing under weakly-supervised conditions.

## Institutions / 機構

Nanjing University of Posts and Telecommunications, Wuxi University, Graz University of Technology, University of Bremen, Technische Universitat Munchen, Imperial College London

**Funding / 經費:** National Natural Science Foundation of China, Primary Research & Development Plan of Jiangsu Province, Humanities and Social Science Foundation of China Ministry of Education, China Postdoctoral Science Foundation, DFG

## Related

- (link related pages by id as the wiki grows)
