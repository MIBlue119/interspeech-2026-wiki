---
id: pokel26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of Zurich", "ETH Zurich", "Technical University of Munich"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-776
pdf: https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.pdf
---

# Data-Efficient ASR Personalization for Non-Normative Speech Using an Uncertainty-Based Phoneme Difficulty Score for Guided Sampling

*Niclas Pokel, Pehuén Moure, Roman Böehringer, Yingqiang Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pokel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-776)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — The paper introduces a data-efficient ASR personalization method for non-normative speech by leveraging Variational Low-Rank Adaptation (VI LoRA) to estimate epistemic uncertainty and guide phoneme-targeted oversampling. Evaluated on English and German datasets, it achieves error reductions of up to 15.12% in WER while demonstrating strong alignment with longitudinal clinical logopedic reports.

## Key contributions

- A composite uncertainty-based metric (PhDScore) combining phoneme error rate, mean prediction entropy, and ground truth agreement to isolate true articulatory difficulty from acoustic noise.
- An efficient Bayesian uncertainty-guided oversampling training strategy using Variational Low-Rank Adaptation (VI LoRA) or Monte Carlo Dropout without backbone representation masking.
- Longitudinal clinical validation across English (UA-Speech) and German (BF-Sprache) datasets, proving strong correlation with clinician logopedic reports taken one year apart.

## Problem

State-of-the-art ASR foundation models like Whisper experience high error rates when processing non-normative speech from individuals with speech impairments or conditions like Apert syndrome, due to extreme acoustic variability and limited training data. Standard fine-tuning in low-data settings causes severe overfitting, while existing parameter-efficient methods treat all training samples equally. Furthermore, raw softmax-based entropy or standard post-processing confidence scores conflate unlearnable acoustic noise with specific articulatory difficulties, failing to provide a reliable signal for targeted training.

## Method

The framework operates in three stages: uncertainty estimation, composite score computation, and difficulty-guided oversampling. For uncertainty estimation, the authors employ Monte Carlo Dropout (MCD) with a dropout rate p_drop = 1% across 20 stochastic forward passes, or Variational Low-Rank Adaptation (VI LoRA), which models LoRA matrices A and B as variational distributions using a mean-field diagonal Gaussian approximation optimized via negative ELBO with bimodal priors.

To decouple aleatoric noise from epistemic articulatory difficulty, the authors formulate the Phoneme Difficulty Score (PhDScore). For each phoneme type, it aggregates the Phoneme Error Rate (Ep), Mean Prediction Entropy (Hp), and Ground Truth Agreement (Ap) into a weighted sum: PhDScore(p) = w_e E_p + w_h H_p + w_a (1 - A_p), using configuration weights w_e = 0.4, w_h = 0.2, and w_a = 0.4. The utterance-level score is computed by averaging constituent phoneme scores, which are then min-max normalized to establish sampling probabilities ranging from 1.0 to 5.0 for fine-tuning.

Inference relies on standard deterministic foundation model execution after adaptation, while training uses the derived oversampling probabilities on a pre-existing 70/10/20 train/val/test split. To mitigate catastrophic forgetting on general normative speech, the recipe incorporates an interpolated mix of normative training samples into the oversampled batch distribution.

## Experimental setup

The method is evaluated on UA-Speech (English, 16 speakers across various dysarthria intelligibility levels) and BF-Sprache (German, 505 isolated words from a child with Apert syndrome, expanded to continuous text via semantic re-chaining). Baselines compare standard full fine-tuning, conventional LoRA, and VI LoRA with and without oversampling. Metrics include Word Error Rate (WER) and Character Error Rate (CER) for non-normative performance, alongside Mozilla Common Voice evaluations to measure catastrophic forgetting on normative speech. Implementation utilizes DeepSpeed on dual AMD EPYC 7742 CPUs and up to 4 NVIDIA RTX 3090 GPUs, training with Adam (effective batch size 32, learning rates of 5e-6 for full FT and 1e-4 for LoRA/VI LoRA) and early stopping.

## Results

On the UA-Speech dataset, uncertainty-guided oversampling yields substantial non-normative improvements, with WER reductions scaling inversely with speaker intelligibility: very low intelligibility speakers achieve up to 15.12% absolute WER reduction using LoRA (r=16) and 13.22% with VI LoRA. Ablations demonstrate that the composite PhDScore drastically outperforms raw entropy, which produces erratic performance or degradation (e.g., pre-trained PhDScore yields a CER delta of -2.43 on UA-Speech compared to -0.71 for entropy). Furthermore, longitudinal clinical validation against logopedic reports shows that pre-trained VI LoRA PhDScore achieves a peak Average Precision (AP) of 0.82 for identifying true articulatory difficulties, which collapses to near-random (AP ~0.35) post-fine-tuning as uncertainty is successfully resolved.

| System / Condition | Non-Normative WER Δ (%) | Normative WER Δ (%) |
|---|---|---|
| Full FT (High Intelligibility) | -1.85 | +2.04 |
| LoRA (Medium Intelligibility) | -5.14 | +4.29 |
| LoRA (Low Intelligibility) | -8.35 | +1.52 |
| LoRA (Very Low Intelligibility) | -15.12 | -4.01 |
| VI LoRA (Very Low Intelligibility) | -13.22 | +2.05 |

## Limitations

Phoneme-level clinical validation was constrained to a single pediatric patient (BF-Sprache) due to the severe scarcity of longitudinal annotated clinical data and pediatric ethical approvals. The approach exhibits a personalization-generalization trade-off that risks catastrophic forgetting on normative speech unless mixed-dataset sampling is explicitly applied. Additionally, the pre-computed uncertainty signal becomes non-discriminative after initial adaptation, requiring static extraction from the initial zero-shot model state.

## Why read this

Researchers and engineers working on speech foundation model adaptation or health-related speech tech should read this to see how principled Bayesian uncertainty estimation can replace heuristic data augmentation. It provides a practical blueprint for steering parameter-efficient fine-tuning (LoRA/VI LoRA) using clinical priors rather than uniform data selection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized assistive ASR systems for individuals with severe speech impairments, dysarthria, or atypical anatomical speech conditions, as well as computational support tools for clinical logopedic assessments.

## Institutions / 機構

University of Zurich, ETH Zurich, Technical University of Munich

## Related

- [Low-Burden Data Augmentation for Dysarthric ASR via Zero-Shot Voice Cloning](singh26_interspeech.md) — same problem · relatedness 2.2/3
- [BetterSpeak: An Atypical Speech to Typical Speech Platform for Dysarthric Speakers](shahamiri26_interspeech.md) — same problem · relatedness 2.2/3
- [IACC-HuBERT: Intelligibility-Aware Channel Conditioning of HuBERT Frontend for Dysarthric Speech Conformer ASR](sapkota26_interspeech.md) — same problem · relatedness 2.1/3
- [Towards Personalized Federated Learning for Dysarthric Speech Recognition](zhong26d_interspeech.md) — same problem · relatedness 2.1/3
- [Investigating ASR for Low-Intelligibility Dysarthric Speech](kwon26b_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
