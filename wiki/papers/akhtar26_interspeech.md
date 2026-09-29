---
id: akhtar26_interspeech
category: health-clinical
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2704
pdf: https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.pdf
---

# From Signals to Patterns: Non-Invasive Tuberculosis Detection from Cough Audio using Bandit Weighted Hyperbolic Prototypes

*Mohd Mujtaba Akhtar, Girish, Sanjam Wadhwa, Muskaan Singh, Ning Ma*

[PDF](https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2704)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — COBALT is a novel multimodal fusion framework that combines self-supervised speech foundation models with classical spectral features using codebook-aligned hyperbolic prototypes and bandit-style reliability weighting for cough-based tuberculosis screening, establishing a new state-of-the-art of 88.93% accuracy and 89.07% AUC on the CODA TB benchmark.

## Key contributions

- Comprehensive benchmark evaluation of diverse pretrained speech foundation models alongside classical spectral descriptors (MFCC/LFCC) for cough-based tuberculosis screening (CBTS) under a unified cross-validation protocol.
- Proposed COBALT, a fusion framework that maps heterogeneous streams into a shared hyperbolic prototype space using vector quantization and learns bandit-based reliability weights to suppress unstable evidence.
- Demonstrated that fusing spectral descriptors (MFCC) with spectrogram transformers (PaSST) within COBALT substantially outperforms individual representations and naive concatenation baselines across multiple datasets.

## Problem

Tuberculosis (TB) triage relies heavily on symptom-led pathways with highly variable diagnostic yields, forcing reliance on operationalizing demanding and unscalable confirmatory sputum tests. While automated cough analysis using audio foundation models shows promise, existing studies focus almost exclusively on single-stream backbones or naive concatenation, ignoring how to systematically handle cross-representation complementarity and cross-device/environment variability. Furthermore, models often risk learning environmental or device artifacts rather than true pathological cough patterns, necessitating principled multi-representation fusion strategies.

## Method

The framework takes two heterogeneous sequence representations extracted from pretrained models or spectral estimators, denoted as X^(1) and X^(2), and passes them through lightweight 1D CNN adapters followed by tokenization operators to yield K tokens per stream. These tokens are projected into a d_h-dimensional hyperbolic space using the Poincaré ball model B_c^{d_h} via the exponential map at the origin. Both streams are softly assigned to a shared hyperbolic codebook C = {c_1, ..., c_M} through hyperbolic vector quantization distances, aligning them into a common prototype vocabulary and forming prototype evidence vectors p^(m).

A multi-armed bandit mechanism maintains scores Q_j for each prototype j to learn a reliability weight vector w, which is used to reweight the evidence vectors p_tilde^(m) to suppress noisy or artifact-prone evidence. The bandit updates its scores using an exponential moving average rule driven by a reward function measuring performance gains relative to a baseline loss, modulated by a confidence margin and batch usage statistics. Finally, the reweighted evidence vectors and their agreement are concatenated into a fused representation f = [p_tilde^(1); p_tilde^(2); agreement] and fed into a lightweight MLP classifier (dense layer plus softmax) to produce the final classification.

The model is trained end-to-end using a standard cross-entropy task loss combined with hyperbolic vector quantization (HVQ) losses and an entropy regularization term H(w) to encourage selective prototype usage. The entire system has a compact parameter overhead of 3M to 6M trainable parameters depending on the chosen PTM backbone pair.

## Experimental setup

Evaluated on the CODA TB DREAM Challenge benchmark, which contains solicited cough audio from adult participants across seven countries (India, Madagascar, the Philippines, South Africa, Tanzania, Uganda, Vietnam) using official subject-disjoint splits under 5-fold cross-validation. Compared against individual pretrained encoders (PaSST-S [87M], Whisper-Base [74M], WavLM-Base [94M], x-vector [4.2M]), handcrafted features (MFCC, LFCC), naive feature concatenation, Euclidean fusion (COBALT-E), and Möbius-addition fusion. Models were trained for 50 epochs with a batch size of 32 using the Adam optimizer and cross-entropy loss.

## Results

The best-performing individual representation is the PaSST (PST) spectrogram transformer, achieving 78.92% accuracy and 72.20% AUC with an FCN backend, and 79.29% accuracy with a CNN backend. Naive feature concatenation peaks with MFCC + PaSST at 81.67% accuracy and 81.27% AUC. The proposed full COBALT framework combining MFCC and PaSST achieves the overall best performance with 88.93% accuracy, 87.26% F1-score, and 89.07% AUC. Hyperbolic ablations show that COBALT outperforms its Euclidean counterpart (COBALT-E, which peaks at 85.97% accuracy for MF+PST) and Möbius-addition fusion (peaks at 88.26% accuracy for WAL+PST), proving the specific utility of the bandit-weighted prototype codebook.

| System / Condition | Accuracy (%) | F1-Score (%) | AUC (%) |
|---|---|---|---|
| PaSST (Standalone, CNN) | 79.29 | 77.57 | 72.68 |
| MFCC + PaSST (Concat) | 81.67 | 79.88 | 81.27 |
| MFCC + PaSST (COBALT-E) | 85.97 | 83.54 | 85.06 |
| WavLM + PaSST (Möbius) | 86.92 | 85.49 | 84.27 |
| WavLM + PaSST (COBALT) | 88.26 | 87.52 | 86.11 |
| MFCC + PaSST (COBALT) | 88.93 | 87.26 | 89.07 |

## Limitations

The evaluation is restricted to the specific cough acoustic distributions and collection protocols of the CODA TB dataset, leaving cross-dataset generalization to unseen microphones and recording environments unverified. The framework's reliance on fixed frozen foundation features may limit adaptation capacity compared to full fine-tuning, and the multi-armed bandit reliability weighting introduces hyperparameter sensitivity requiring careful tuning of reward margins and step sizes.

## Why read this

Researchers working on multimodal fusion, hyperbolic representation learning, or computational respiratory healthcare should read this paper to see how bandit-driven prototype weighting in non-Euclidean spaces can effectively align and denature mismatched audio foundation embeddings.

## Code

- https://github.com/Helixometry/COBALT.git

## Applications

Automated non-invasive screening for tuberculosis and respiratory pathologies via smartphone or clinical microphone recordings in decentralized health settings.

## Institutions / 機構

Ulster University, Thapar Institute of Engineering and Technology, University of Sheffield

**Funding / 經費:** United States–Ireland–Northern Ireland R&D Partnership Programme, Engineering and Physical Sciences Research Council

## Related

- (link related pages by id as the wiki grows)
