---
id: zhong26c_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1138
pdf: https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.pdf
---

# Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment

*Zihan Zhong, Qianli Wang, Satwinder Singh, Clarion Mendes, Mark Hasegawa-Johnson, Waleed Abdulla, Seyed Reza Shahamiri*

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1138)

**Category:** `health-clinical`

**TL;DR** — The paper introduces the Phoneme Error Decomposition (PED) feature family—combining phoneme error rates and posterior uncertainty features extracted from a frozen CTC recognizer—to achieve interpretable, utterance-level dysarthric speech assessment that matches black-box SSL models on primary dimensions with a mean binary AUROC of 0.80.

## Key contributions

- Proposes using free-decoding CTC posterior uncertainty features (Evidential Deep Learning and a training-free ME score) as proxies for articulatory distortion without requiring canonical-phoneme alignment targets.
- Introduces the 11-feature Phoneme Error Decomposition (PED) feature suite, merging 6 reference-based phoneme error rates with 5 confidence/uncertainty metrics.
- Demonstrates that PED achieves binary screening performance comparable to a 1024-dimensional HuBERT Large baseline on four primary clinical dimensions while remaining transparent.
- Presents a human-inspectable decision-tree pipeline (max depth = 4) driven by PED features that yields a mean AUROC of 0.78 for automated clinical support.

## Problem

Prior automated dysarthric speech assessment relies either on subjective SLP auditory evaluation, hand-crafted acoustic features (jitter, f0) that lack multidimensional scope, or opaque self-supervised learning (SSL) embeddings that act as clinical black boxes. Alternative word error rate (WER) and alignment-based phoneme methods fail to capture localized distortions or are degraded by acoustic mismatch in dysarthric speech. This work addresses the need for objective, utterance-level, and interpretable multi-dimensional impairment assessment.

## Method

The core architecture builds on a frozen wav2vec2-xlsr-300m-timit-phoneme encoder (315M parameters) trained on TIMIT. To capture uncertainty without forced alignment, the authors propose two distinct paradigms: Evidential Deep Learning (EDL) and a training-free Margin-Entropy (ME) score. The EDL head is a 2-layer MLP (1024 -> 512 -> 44) with 547K trainable parameters that replaces the softmax layer with Dirichlet parameterization, trained on LibriSpeech train-clean-100 for 5 epochs via AdamW (lr=1e-4) with KL annealing (lambda from 0 to 0.01). It yields evidence uncertainty, aleatoric uncertainty (expected entropy), and epistemic uncertainty (mutual information). Alternatively, the training-free ME score is computed directly from softmax outputs as d = 0.5(1 - m) + 0.5 H, where m is the top-2 posterior margin and H is normalized Shannon entropy.

These uncertainty metrics are combined with six reference-based phoneme error rates obtained by comparing CTC greedy decoding output against reference text G2P conversions via Levenshtein alignment. The six error rates include PER, substitution rate, deletion rate, insertion rate, phonological feature error rate (PFER, weighted by a 16-dimensional phonetic articulatory distance matrix), and length ratio. The complete 11-feature PED vector feeds either logistic regression classifiers (C=1.0, balanced class weights, lbfgs solver) for binary screening (normal vs impaired) or LassoCV for 1-7 ordinal grading. For transparent human-inspectable inspection, shallow decision trees with a fixed max depth of 4 and balanced weights are trained on the features to map exact clinician-traceable splitting thresholds.

## Experimental setup

Evaluated on the Speech Accessibility Project (SAP) dataset (release 2025-11-02) containing 11,168 labeled utterances from 959 speakers across 5 etiologies, split into speaker-stratified train (8,759), validation (1,017), and test (1,392) sets. Assesses 7 clinical DAB dimensions: Imprecise Consonants (IC), Distorted Vowels (DV), Intelligibility (Int), Naturalness (Nat), Breathiness (Br), Prolonged Phonemes (PP), and Harsh Voice (HV). Baselines include GoP-maxlogit, Whisper Large-v3 WER, Acoustic12 parselmouth features, and HuBERT Large (1024-dim). Implemented in PyTorch and scikit-learn on an NVIDIA GeForce RTX 3090 GPU.

## Results

The 11-feature PED achieves a mean binary AUROC of 0.80 on the four primary dimensions (IC, DV, Int, Nat), closely matching HuBERT Large (AUROC 0.81), and rising to 0.83 when supplemented with acoustic features (PED+Ac12). For single-feature evaluations, the training-free ME score achieves an average AUROC of 0.79 across primary dimensions, significantly outperforming GoP-maxlogit (0.69) and Whisper WER (0.68). In ordinal grading, however, HuBERT retains a higher mean Spearman rho (0.62 vs 0.59 for PED+Ac12), highlighting an interpretability-performance tradeoff where black-box embeddings better capture fine-grained severity ranks. PED underperforms on secondary voice quality and prosody dimensions unless combined with acoustic features, where PED+Ac12 surpasses HuBERT on Harsh Voice (0.78 vs 0.74 AUROC).

| System / Condition | IC (AUC/rho) | DV (AUC/rho) | Int (AUC/rho) | Nat (AUC/rho) | Mean Primary |
|---|---|---|---|---|---|
| Whisper WER | .70 / .38 | .65 / .23 | .68 / .30 | .68 / .29 | .68 / .30 |
| GoP-maxlogit (Single) | .76 / .51 | .69 / .37 | .70 / .35 | .59 / .41 | .69 / .41 |
| PED (11 features) | .84 / .64 | .79 / .54 | .80 / .48 | .80 / .54 | .80 / .55 |
| PED + Ac12 (23 feat) | .86 / .68 | .82 / .58 | .81 / .49 | .85 / .60 | .83 / .59 |
| HuBERT Large (1024) | .88 / .72 | .78 / .58 | .81 / .50 | .77 / .68 | .81 / .62 |

## Limitations

The study is limited by skewed sample sizes across secondary perceptual dimensions, linear models that potentially underperform on complex feature interactions, and reliance strictly on numerical feature summaries. Furthermore, downstream generalization is bound by the English-only scope of the SAP dataset and the domain coverage of the TIMIT-finetuned CTC phoneme recognizer.

## Why read this

Speech and ML engineers building clinical-grade assistive tools will find this paper a masterclass in replacing opaque SSL black boxes with interpretable, uncertainty-aware phoneme decomposition features that match black-box screening performance.

## Code

- https://github.com/Kanelmis/PED

## Applications

Automated clinical speech assessment, computer-aided speech therapy evaluation tools, and objective multi-dimensional dysarthria screening systems.

## Institutions / 機構

DeepNet Discovery Network, University of Auckland, University of Illinois Urbana-Champaign

## Related

- (link related pages by id as the wiki grows)
