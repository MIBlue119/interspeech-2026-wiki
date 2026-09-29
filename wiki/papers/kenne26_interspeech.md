---
id: kenne26_interspeech
category: health-clinical
institutions: ["University of Massachusetts Lowell"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2868
pdf: https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.pdf
---

# Multi-Level Privacy-Preserving Dementia Detection from Speech via Targeted Adversarial Obfuscation and Representation Learning

*Henriette Flore Kenne, Raphael Anaadumba, Mohammad Arif Ul Alam*

[PDF](https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2868)

**Category:** `health-clinical`

**TL;DR** — A multi-level privacy-preserving framework for speech-based dementia detection neutralizes eavesdropping by combining keyword-aligned signal-level adversarial perturbation and feature-level mutual information-guided noise injection, achieving near-chance speaker identification (EER = 0.59) while maintaining strong diagnostic performance (Dementia F1 = 0.79, AUC = 0.86).

## Key contributions

- A cumulative signal attack (CSA)-based adversarial obfuscation pipeline that disrupts semantic transcription (WER = 1.0) inside keyword-aligned temporal windows while preserving low-frequency prosodic dementia biomarkers.
- A mutual information (MI)-guided selective noise injection strategy that controls the privacy-utility trade-off at the embedding level by protecting the top 20% prosody-relevant dimensions and corrupting speaker-identifying dimensions.
- A dual-level defense framework evaluated against white-box attacks, machine eavesdroppers (ECAPA-TDNN), and human eavesdroppers (Whisper ASR) on the DementiaBank Pitt Corpus.

## Problem

Speech recordings shared for clinical cognitive assessment encode both diagnostic prosodic biomarkers and personally identifiable information, exposing patients to dual eavesdropping risks from machine ASR systems and human listeners with speaker recognition models. Prior single-stage privacy mechanisms—such as generic noise injection, feature masking, or embedding shuffling—either drastically degrade clinical utility (dementia classification F1 dropping to 0.64) or leave residual identity leaks in high-level representations without fine-grained control. This creates an unresolved privacy-utility conflict that violates data protection regulations like HIPAA and GDPR.

## Method

The framework processes speech in two sequential stages: a signal-level CSA perturbation pipeline and a feature-level adversarial representation learning module. At the signal level, the system uses Wav2Vec2-base-960h as a differentiable ASR surrogate to minimize connectionist temporal classification (CTC) loss against a semantically altered target transcript (swapping content words while keeping disfluencies). Perturbations are restricted to keyword-aligned temporal windows, partitioned into patches of size p=5, and integrated via a cumulative discrete-time shaping operator under an l_inf constraint (epsilon = 0.01, step size alpha = 0.01, 100 PGD iterations) to concentrate adversarial energy in low-frequency bands. At the feature level, input features combining 192-dimensional ECAPA-TDNN speaker embeddings and a 4-dimensional Parselmouth prosodic vector (mean F0, mean intensity, pause segments, articulation rate) are mapped via a shared encoder to a latent space. This space feeds two branches: a prosody reconstruction head optimized via mean squared error, and a speaker classification head trained adversarially through a gradient reversal layer (GRL with lambda scheduled from 2.0 to 1.0) to confuse identity while maintaining diagnostic structure (balancing alpha = 0.5).

To eliminate residual overlap, a mutual information-guided noise injection mechanism computes cumulative MI between each latent dimension and the prosodic targets. The top 20% of dimensions scoring highest in MI are preserved intact, while the remaining 80% receive additive Gaussian noise with scale sigma = 0.6 scaled by the dimension's empirical standard deviation. The final protected waveforms and representations are evaluated against an RBF-SVM and various classifiers (Logistic Regression, MLP) for dementia detection, ensuring clinical viability without a decryption or recovery pipeline.

## Experimental setup

Evaluated on the DementiaBank Pitt Corpus comprising 552 Cookie Theft picture description recordings (309 Alzheimer's disease, 243 healthy controls) split 80/20. Compared against baselines including original unanonymized speech, random shuffling, Shapley-based shuffling, and MI-based feature shuffling. Metrics include Word Error Rate (WER), Equal Error Rate (EER), speaker F1, dementia macro F1-score, ROC-AUC, SNR, SI-SDR, STOI, and PESQ. Implemented in PyTorch on an NVIDIA A40 GPU using pretrained facebook/wav2vec2-base-960h and speechbrain/spkrec-ecapa-voxceleb.

## Results

The proposed ADV + PRIV framework achieves a Dementia F1-score of 0.79 and AUC of 0.86, showing only a minor utility drop compared to the unanonymized original (F1 = 0.83), whereas shuffle-based baselines collapse dementia F1 down to 0.64-0.74. Against machine eavesdroppers, the system forces speaker identification F1 down to 0.0033 and EER near chance (0.498 to 0.597), while human ASR (Whisper) yields a WER of 1.00 indicating complete semantic obfuscation. In white-box adversarial robustness evaluations, the system demonstrates high resilience against gradient model inversion, parameter exploitation, and multi-stage attacks, maintaining defense scores >= 0.994.

| System / Condition | Dementia F1 ↑ | Speaker F1 ↓ | EER ↑ | WER ↑ |
|---|---|---|---|---|
| Original | 0.83 | 0.30 | 0.53 | — |
| ADV + PRIV (Ours) | 0.79 | 0.22 | 0.54 | 1.00 |
| ShuffleRandom | 0.67 | 0.05 | 0.52 | — |
| ShuffleShap | 0.74 | 0.05 | 0.54 | — |
| ShuffleMI-pros | 0.64 | 0.05 | 0.54 | — |

## Limitations

The evaluation is restricted to a single English-language clinical dataset (DementiaBank Pitt Corpus) consisting of short picture-description monologues, leaving multi-language generalization and unconstrained conversational speech untested. The signal-level perturbation introduces perceptible distortion (negative SNR and SI-SDR values, PESQ ~2.0-3.1), which, while preserving diagnostic STOI (>=0.76), may alter subjective listening experiences. Additionally, the approach relies on clean transcripts to locate keyword windows for the targeted signal attack.

## Why read this

Researchers and engineers building privacy-compliant speech diagnostic systems should read this to learn how combining targeted signal-level adversarial perturbations with mutual information-guided feature-space obfuscation solves the persistent privacy-utility tradeoff better than single-stage pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving telemedicine, clinical voice data sharing under HIPAA/GDPR compliance, and secure automated dementia screening.

## Institutions / 機構

University of Massachusetts Lowell

## Related

- [Natural Speech Encodes Early Markers of Cognitive Decline: Evidence from Clinical Conversations](haghbin26b_interspeech.md) — same problem · relatedness 2.3/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 2.3/3
- [LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features](park26c_interspeech.md) — same problem · relatedness 2.2/3
- [WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection](xiao26b_interspeech.md) — same problem · relatedness 2.2/3
- [Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection](li26ga_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
