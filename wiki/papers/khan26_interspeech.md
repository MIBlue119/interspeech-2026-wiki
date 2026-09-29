---
id: khan26_interspeech
category: deepfake-security
labels: [self-supervised]
institutions: ["University of Michigan", "ProbeTruth Inc"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3008
pdf: https://www.isca-archive.org/interspeech_2026/khan26_interspeech.pdf
---

# Dual-Branch Gated Fusion for Open-Set Audio Deepfake Source Tracing

*Awais Khan, Kutub Uddin, Khalid Malik*

[PDF](https://www.isca-archive.org/interspeech_2026/khan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3008)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — A dual-branch gated fusion framework pairs a frozen XLSR-53 SSL encoder with a 66-dimensional handcrafted acoustic descriptor (CORES) to achieve robust open-set audio deepfake source tracing. On the MLAAD benchmark, it attains 97.6% in-domain accuracy, 4.9% EERc, and an 83.5% relative reduction in FPR95 over the 2025 baseline with only ~0.9M trainable parameters.

## Key contributions

- Proposed CORES, a 66-dimensional handcrafted descriptor spanning cepstral, oscillatory, rhythmic, energy, and spectral dimensions to capture stable signal-level synthesis artifacts.
- Introduced an input-conditioned gating mechanism to resolve the representational imbalance and numerical dominance of high-dimensional SSL features over handcrafted vectors.
- Combined cross-entropy loss, an energy margin loss using dev-split OOD auxiliary samples, and a gate diversity loss to optimize both in-domain classification and out-of-domain rejection.
- Achieved state-of-the-art open-set performance on MLAAD with an 87% relative FPR95 reduction over naive concatenation while maintaining 97.6% ID accuracy.

## Problem

Attributing synthetic speech to its originating generative pipeline (source tracing) requires distinguishing known (seen) systems while reliably rejecting unknown (unseen) systems. Dominant approaches fine-tune large self-supervised learning (SSL) models end-to-end, yielding high in-domain accuracy but overcommitting to training distributions and producing overconfident predictions on out-of-distribution (OOD) audio. Prior attempts to use handcrafted features or naive feature concatenation either fail to balance the gradient dominance of SSL representations or suffer catastrophic drops in in-domain classification accuracy.

## Method

The architecture combines two complementary front-ends. The first uses a frozen XLSR-53 encoder pretrained on 56,000 hours of multilingual speech, mean-pooling final hidden states to yield a 1024-dimensional vector (x_ssl). The second extracts a 66-dimensional handcrafted descriptor, CORES (x_hc), comprising 39-d MFCCs with delta/delta-deltas, 14-d chroma features, 1-d zero-crossing rate, 1-d RMS energy, 3-d spectral centroid/bandwidth/roll-off, 7-d spectral contrast, and 1-d spectral flatness. Each feature stream passes through a two-layer projection network (hidden dim 512, BatchNorm, ReLU, dropout p=0.3) into a shared 256-dimensional embedding space. 

Direct concatenation fails because the SSL input is much larger and retains higher gradient energy, causing the model to ignore the handcrafted branch. To fix this, a lightweight two-layer gating network (512 -> 128 -> 2, ReLU, dropout p=0.2, followed by softmax) computes soft branch weights conditioned directly on the concatenated expert embeddings. The fused representation is a weighted sum of the two branches, mapped via a linear classifier to logits over 24 ID classes. 

Training minimizes a composite objective: cross-entropy with label smoothing (epsilon=0.15) for ID classification; an energy margin loss utilizing Dev-split OOD auxiliary data (with margins m_in = -15.0 and m_out = -2.0) to separate score distributions; and a gate diversity loss (maximizing KL divergence between batch-mean gate distributions over ID and OOD samples, plus an entropy term) to prevent collapse toward a single branch. The gating network uses a 'gate freeze' strategy for the first 10 epochs to allow expert branches to stabilize before adaptive routing begins. Inference requires no retraining, applying post-hoc scoring functions (specifically Softmax Energy, SME) to flag OOD samples when confidence falls below a Dev-set threshold tau.

## Experimental setup

Evaluated on the MLAAD protocol, containing 83 TTS systems across 26 languages (Train: 24 systems/11,000 samples; Dev: 8 ID systems/4,800 samples and 17 OOD systems/7,200 samples; Eval: 21 ID systems/13,591 samples and 43 OOD systems/23,309 samples). Compared against baseline systems including Wav2Vec2.0-AASIST and Klein et al.'s ResNet34 with Large Margin Cosine Loss. Metrics include in-domain accuracy, FPR95 (OOD false positive rate at 95% ID true positive rate), and EERc (joint metric requiring correct classification and in-domain acceptance). Trained for 150 epochs using AdamW (lr=10^-4, weight decay=10^-4, cosine annealing to 5x10^-6), batch size 128, and gradient clipping at l2 norm 5.0.

## Results

The system achieves 97.6% in-domain accuracy, 4.9% EERc, and a 10.4% FPR95 on the MLAAD evaluation set using SME scoring, representing an 83.5% relative reduction in FPR95 over the 2025 baseline. Compared to Kulkarni et al.'s XLSR variants, the model reaches 94.3% OOD accuracy and 7.6% OOD EER while operating with only ~0.9M parameters, outperforming 318M-parameter baselines by 14.2 pp in accuracy. 

Ablations demonstrate that SSL-only models collapse on OOD rejection (FPR95 = 96.2%), handcrafted-only models suffer poor ID accuracy (78.3%), and naive concatenation yields an 82.3% FPR95 due to SSL dominance. Only adaptive gating achieves strong ID accuracy and low FPR95. The primary limitation is that adding excessively diverse auxiliary OOD data (such as ASVspoof5) causes gate collapse toward a single branch.

| System | ID Acc% ↑ | EERc% ↓ | FPR95% ↓ |
|---|---|---|---|
| Baseline [35] | 85.0 | — | 63.0 |
| Klein et al. (ResNet34) [27] | 95.8 | 8.8 | 9.9 |
| Ours (Dual-Branch Gated Fusion) | 97.6 | 4.9 | 10.4 |

## Limitations

The framework's performance depends heavily on appropriate auxiliary OOD data selection during training; incorporating overly diverse datasets (like ASVspoof5) triggers gate collapse and suppresses adaptive routing. The approach relies on a frozen SSL encoder and requires careful hyperparameter tuning of the gate freeze schedule and regularization weights to maintain balance between branches. Evaluation is bounded by the 26 languages and synthetic pipelines represented in MLAAD.

## Why read this

Researchers and engineers tackling open-set audio forensics should read this to learn how to combine handcrafted signal descriptors with frozen SSL representations via input-conditioned gating, resolving the long-standing trade-off between in-domain classification accuracy and out-of-distribution rejection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio deepfake forensics, voice biometrics security, automated voice cloning detection, and platform content moderation.

## Institutions / 機構

University of Michigan, ProbeTruth Inc

## Related

- (link related pages by id as the wiki grows)
