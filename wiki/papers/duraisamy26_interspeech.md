---
id: duraisamy26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2884
pdf: https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.pdf
---

# Subject-Invariant Dynamic Graph Modeling for Cross-Subject EEG Imagined Speech Decoding

*Saravanakumar Duraisamy, Luis A. Leiva*

[PDF](https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/duraisamy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2884)

**Category:** `asr`

**TL;DR** — This paper proposes a subject-invariant dynamic graph modeling framework that integrates multi-view functional connectivity priors with adversarial subject disentanglement to improve cross-subject EEG imagined speech decoding. Evaluated under a strict leave-one-subject-out protocol across two 15-subject datasets, the method achieves average classification accuracies of 31.20% and 30.36%, outperforming standard fine-tuned EEG foundation models.

## Key contributions

- Introduces an electrode-aware Transformer tokenization scheme that aggregates temporal patch tokens per channel to preserve cortical spatial topology.
- Develops a dynamic multi-view graph prior mechanism computed over short overlapping sliding windows combining spatial distances, phase-locking values, spectral coherence, and envelope correlations.
- Implements a graph-biased attention mechanism incorporating learnable mixture weights and prior scaling to guide self-attention toward physiologically plausible cortical interactions.
- Applies adversarial subject-invariant learning using a Gradient Reversal Layer (GRL) to suppress subject-specific neural patterns while preserving task-relevant speech representations.

## Problem

Decoding imagined speech from scalp electroencephalography (EEG) suffers from severe performance degradation when applied to unseen subjects due to low signal-to-noise ratios, subtle distributed neural correlates, and pronounced inter-subject variability. Prior deep learning models and EEG foundation models like NeuroLM, LaBraM, and EEGPT frequently collapse to near-chance performance under strict Leave-One-Subject-Out (LOSO) cross-subject evaluations. This occurs because standard patch-based tokenization ignores fixed cortical electrode geometry, and dot-product self-attention mixes task-relevant speech representations with idiosyncratic, subject-specific spatial-spectral signatures. Overcoming this generalization gap is critical for realizing practical, non-invasive speech brain-computer interfaces.

## Method

The framework processes preprocessed EEG epochs of shape $C \times T = 64 \times 1000$ sampled at 500 Hz. First, a pretrained EEGPT Transformer encoder converts the input into temporal patch tokens, which are subsequently aggregated into electrode-aligned channel tokens for all 64 channels plus a learnable classification token, forming $H_0 \in \mathbb{R}^{65 \times D}$ (with embedding dimension $D = 256$).

To capture transient cortical coordination, each epoch is segmented into overlapping windows of length $L_w = 100$ samples with a hop of 50, yielding approximately $W \approx 19$ windows. For each window, $K$ complementary adjacency matrices are computed: a spatial RBF prior over electrode coordinates, and spectral priors—specifically Phase-Locking Value (PLV), spectral coherence, and envelope correlation—extracted across canonical frequency bands (theta, alpha, beta, gamma). These priors are stacked into $B_t \in \mathbb{R}^{K \times 64 \times 64}$, regularized via shrinkage toward a subject-specific training mean prior with coefficient $\rho = 0.2$, and padded to include the classification token row and column.

The padded priors are injected directly into a 6-layer Graphormer-style graph-biased attention module across 8 attention heads. The structural bias term uses learnable mixture weights $w_{h,k}$ and scaling factor $\alpha = 0.5$ added directly prior to the softmax computation. The resulting window-level classification tokens $z_t$ are then fused across time via attention pooling into a trial-level embedding $z \in \mathbb{R}^D$.

During optimization, the trial-level embedding is fed concurrently into a word classification head and an adversarial subject classifier via a Gradient Reversal Layer (GRL) whose scaling parameter $\lambda$ ramps linearly from 0 to 0.5. The network is trained end-to-end using the AdamW optimizer with an initial learning rate of $2 \times 10^{-4}$, weight decay of $10^{-4}$, batch size 32, cosine learning rate decay, and early stopping with a patience of 10 epochs.

## Experimental setup

Evaluated on two independent publicly available imagined speech EEG datasets (BCI Competition 2020 and an Overt/Covert Speech Dataset), each containing 5-word classification tasks recorded from 15 subjects using 64-channel EEG systems (80 trials per class per subject, 400 trials total per subject). Models are compared against baseline EEG foundation models (NeuroLM, LaBraM, EEGPT) and conventional architectures (EEGNet, CNN-BiLSTM, ST-GCN) under a strict Leave-One-Subject-Out (LOSO) cross-validation protocol. Performance is measured using mean classification accuracy and standard deviation across held-out subjects, evaluated with paired two-sided t-tests.

## Results

Under strict LOSO evaluation on Dataset 1, the proposed model achieves an accuracy of 31.20% $\pm$ 3.12%, significantly outperforming the fine-tuned EEGPT baseline (23.60% $\pm$ 3.85%), EEGNet (20.3%), CNN-BiLSTM (20.8%), ST-GCN (20.2%), NeuroLM (19.9%), and LaBraM (20.3%). On Dataset 2, the model achieves 30.36% $\pm$ 4.05%, surpassing EEGPT (23.80% $\pm$ 4.10%), EEGNet (19.9%), CNN-BiLSTM (21.1%), ST-GCN (20.8%), NeuroLM (20.2%), and LaBraM (19.9%).

Ablation studies isolating components on Dataset 1 indicate that adding graph priors alone yields 28.30% $\pm$ 3.55%, GRL alone yields 27.40% $\pm$ 3.68%, and static graph priors yield 24.86% $\pm$ 2.66% compared to dynamic window priors at 28.30%, confirming the superiority of time-varying connectivity modeling. Adversarial evaluation shows that GRL successfully reduces subject classification accuracy from 18.23% down to 7.00% (near the 6.67% chance level).

| Model / Condition | Dataset 1 Accuracy (%) | Dataset 2 Accuracy (%) |
|---|---|---|
| EEGNet | 20.3 $\pm$ 0.68 | 19.9 $\pm$ 1.14 |
| CNN-BiLSTM | 20.8 $\pm$ 0.9 | 21.1 $\pm$ 0.7 |
| ST-GCN | 20.2 $\pm$ 1.34 | 20.8 $\pm$ 0.88 |
| EEGPT (Fine-tuned) | 23.60 $\pm$ 3.85 | 23.80 $\pm$ 4.10 |
| EEGPT + Graph (Static) | 24.86 $\pm$ 2.66 | 24.33 $\pm$ 3.76 |
| Ours (Dynamic Graph + GRL) | **31.20** $\pm$ **3.12** | **30.36** $\pm$ **4.05** |

## Limitations

Absolute cross-subject LOSO accuracy remains modest (~30%), reflecting the inherent difficulty of decoding imagined speech from noisy scalp EEG without subject-specific calibration data. Short-window connectivity estimates are prone to high variance and are sensitive to preprocessing hyperparameters such as filtering and artifact removal. Furthermore, the evaluation is limited to small vocabularies (5 words) across 15-subject cohorts, and complete subject invariance is not fully attained.

## Why read this

Read this paper if you work on non-invasive BCI decoding or EEG foundation model adaptation and want a rigorous blueprint for combining structural graph priors with adversarial domain generalization to combat inter-subject variability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-invasive brain-computer interfaces, silent communication aids for speech-impaired individuals, and general cross-subject neural decoding.

## Institutions / 機構

University of Luxembourg

**Funding / 經費:** Pathfinder program of the European Innovation Council

## Related

- (link related pages by id as the wiki grows)
