---
id: alali26_interspeech
category: deepfake-security
institutions: ["Mohamed bin Zayed University of Artificial Intelligence", "Maastricht University", "University of Groningen", "University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-327
pdf: https://www.isca-archive.org/interspeech_2026/alali26_interspeech.pdf
---

# Personal Attribute Leakage in Federated Speech Models

*Hamdan Al-Ali, Ali Reza Ghavamipour, Tommaso Caselli, Fatih Turkmen, Zeerak Talat, Hanan Aldarmaki*

[PDF](https://www.isca-archive.org/interspeech_2026/alali26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alali26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-327)

**Category:** `deepfake-security`

**TL;DR** — This paper investigates white-box attribute inference attacks against automatic speech recognition (ASR) models trained in a federated learning setting, revealing that underrepresented personal attributes such as accent and age can be reliably inferred from weight updates alone. The attack achieves up to 100% accuracy for certain traits without requiring access to raw user audio.

## Key contributions

- Demonstrates that a passive white-box adversary can infer sensitive personal attributes (age, accent, emotion, dysarthria) from model weight differentials in federated ASR settings without raw audio access.
- Compares attribute vulnerability across three prominent speech architectures: Wav2Vec2, HuBERT, and Whisper.
- Proves that attribute leakage strongly correlates with underrepresentation in pre-training data, showing that higher surprisal and functional shifts drive vulnerability.
- Shows that fine-tuning global models on a wider, more diverse demographic distribution effectively mitigates attribute inference attacks.

## Problem

Federated learning is widely adopted for privacy-preserving speech model training because it keeps raw audio on client devices and shares only model updates. However, prior work has primarily focused on speaker re-identification and membership inference, leaving it unclear whether personal attributes like gender, age, accent, emotion, and clinical disorders can be extracted from weight updates alone. This gap matters because inferring sensitive attributes enables malicious profiling, surveillance, and discrimination that violate regulations like GDPR, HIPAA, and the ADA.

## Method

The paper assumes a passive server-side adversary who evaluates the global model W_g before local personalization and the updated local model W_s after a user fine-tunes on a single utterance. Using shadow models trained on public datasets with known attributes, the attacker extracts summary statistics (mean, standard deviation, min, max) for every parameter tensor p in W_i, concatenating them into a fixed-length feature vector z_i in R^d (e.g., reducing Whisper small with 244M parameters to d=1916 dimensions). Class centroids are calculated by averaging shadow model feature vectors within each attribute class, and target models are classified by computing normalized Euclidean distances to these centroids.

To understand the root causes of leakage, the authors analyze layer-wise feature representations in Wav2Vec2 and examine functional update metrics across demographic groups. They compute the L2 norm of weight updates, the reduction in cross-entropy surprisal before and after fine-tuning, and the KL divergence between output distributions of the global and personalized models. The key design choice of using tensor summary statistics rather than full raw gradients enables lightweight, non-parametric attribution that scales to large transformer-based speech architectures.

## Experimental setup

The evaluation uses four public speech datasets: the Speech Accent Archive (SAA) for gender, age, and accent; TORGO for speech disorders (8 dysarthric, 7 control speakers); and RAVDESS for acted emotions across 24 professional speakers. Three base ASR architectures are tested: Wav2Vec2-Base (95M params, pretrained on 960 hours of LibriSpeech), HuBERT-Large (300M params, 960 hours of LibriSpeech), and Whisper-Small (244M params, 680,000 hours of multilingual/multitask data). Metrics include binary and multi-class classification accuracy, precision, recall, and F1-score evaluated via cross-validation.

## Results

Wav2Vec2 achieved 100% accuracy for age (18-24 vs. 35-44) and accent (native vs. accented), while HuBERT reached 97% for age and 80% for accent, and Whisper reached 94% and 93% respectively. Gender proved hardest to predict, yielding near-chance accuracies between 46% and 64% across models because gender is already comprehensively represented in LibriSpeech pre-training data. Whisper exhibited high vulnerability across emotion and dysarthria tasks (73%-83% accuracy), whereas Wav2Vec2 and HuBERT performed near chance on emotional states.

Ablations on accent classification demonstrate that fine-tuning the global model on diverse accented speech drops attack success to under 20%, confirming that representation mitigates leakage. Analysis of update metrics showed that while the L2 norm of weight updates remained constant across demographic groups (~11.21), the mean surprisal reduction for Korean-accented speakers was 155.7 compared to 62.7 for native English speakers, proving that greater functional shift drives higher attribute separability.

| Task | Wav2Vec2 | HuBERT | Whisper |
|---|---|---|---|
| Gender: Male / Female | 64% | 63% | 46% |
| Age: 18-24 / 35-44 | 100% | 97% | 94% |
| Accent: Native / Accented | 100% | 80% | 93% |
| Dysarthria: True / False | 59% | 76% | 81% |
| Emotion: Calm / Angry | 52% | 67% | 83% |

## Limitations

The study focuses primarily on binary classification tasks and single-utterance client updates, which may not capture multi-turn or longitudinal federated training dynamics. The experiments rely on controlled or acted datasets (like RAVDESS and SAA) which may not fully reflect the acoustic variability and noise of unconstrained in-the-wild conversational speech. Furthermore, the threat model assumes a passive server rather than an active malicious aggregator capable of crafting malicious global model updates.

## Why read this

Speech and ML researchers focusing on federated learning privacy will find this essential reading for understanding how weight updates leak demographic and clinical traits. It offers actionable insights into why pre-training data coverage directly dictates vulnerability to white-box attribute inference attacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing privacy vulnerabilities in federated ASR systems, designing demographically robust pre-training pipelines, and developing differentially private or secure aggregation protocols for speech applications.

## Institutions / 機構

Mohamed bin Zayed University of Artificial Intelligence, Maastricht University, University of Groningen, University of Edinburgh

## Related

- [From Game-Based Annotation to Representation Probing: Cross-Validated Prosodic Speech and Privacy Implications](sepanta26_interspeech.md) — same problem · relatedness 2.0/3
- [Voice Privacy from an Attribute-based Perspective](rahman26b_interspeech.md) — same problem · relatedness 2.0/3
- [DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations](ngong26_interspeech.md) — same problem · relatedness 1.9/3
- [A Two-Stage Defence for Robust Federated Speech Emotion Recognition](chang26b_interspeech.md) — same problem · relatedness 1.9/3
- [Towards Privacy-Preserving ASR: Speaker-Level Machine Unlearning](ok26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
