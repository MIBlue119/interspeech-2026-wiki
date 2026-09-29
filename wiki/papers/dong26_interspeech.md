---
id: dong26_interspeech
category: deepfake-security
labels: [self-supervised]
institutions: ["National Taiwan University"]
code: https://github.com/snooow1029/ALM_MIA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-514
pdf: https://www.isca-archive.org/interspeech_2026/dong26_interspeech.pdf
---

# Membership Inference Attacks against Large Audio Language Models

*Jia-Kai Dong, Yu-Xiang Lin, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/dong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-514)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper presents the first systematic membership inference attack (MIA) evaluation of Large Audio Language Models (LALMs), revealing that reported privacy leaks are often illusions caused by train/test acoustic distribution shifts rather than genuine model memorization.

## Key contributions

- Evaluated seven confidence-based MIA methods and thirty aggregated indicators across eight diverse audio-centric datasets and two open-source LALMs (Audio-Flamingo 3 and Music-Flamingo).
- Introduced a Multi-modal Blind Baseline framework utilizing metadata, TF-IDF text features, and acoustic descriptors (MFCCs, pitch, RMS) to quantify distribution-shift artifacts without accessing the target LALMs.
- Proved that standard benchmarks (e.g., LibriSpeech) exhibit near-perfect train/test separability (AUC up to 99.8) using blind acoustic classifiers alone, severely confounding raw MIA metrics.
- Demonstrated through modality disentanglement that genuine LALM memorization is strictly cross-modal, relying on the tight binding of specific speaker vocal identities to corresponding text rather than standalone text or speech.

## Problem

Membership inference attacks (MIA) are crucial for auditing data privacy and copyright compliance in machine learning, but prior work has focused almost exclusively on text-only LLMs or fixed-dimensional speaker embeddings. Extending MIA to Large Audio Language Models (LALMs) introduces unique challenges because audio contains complex non-semantic cues, recording conditions, and speaker identities. Furthermore, standard audio dataset curation and preprocessing pipelines introduce severe acoustic distribution shifts between training and test splits. Without proper controls, these distributional discrepancies act as domain classifiers rather than true measures of model memorization, leading to false alarms regarding privacy risks.

## Method

The authors propose a rigorous three-phase privacy auditing framework: (1) Multi-modal Blind Bias Audit, (2) MIA Auditing via a Two-Stage Generation Protocol, and (3) Modality Disentanglement. In Phase 1, Logistic Regression classifiers are trained on metadata, text (unigram/bigram TF-IDF), and aggregated frame-level acoustic descriptors (MFCCs, spectral centroid, bandwidth, rolloff, pitch, RMS, zero-crossing rate) to detect inter- and intra-dataset distribution shifts without model access.

In Phase 2, the framework evaluates a gray-box auditing scenario using a Two-Stage Generation protocol. First, the target LALM performs autonomous greedy decoding to yield a self-generated pseudo-ground-truth sequence. Next, the model re-runs a forward pass conditioned on this sequence to extract token-level logits. Thirty complementary membership metrics are computed, including Perplexity, Shannon Entropy, Min-k%/Max-k% Probability, Max-Rényi divergence (alpha in {0, 1, 2, inf}), Zlib ratio, and Max Probability Gap. These are combined into a 30-dimensional feature vector to train a stratified linear Logistic Regression classifier with 10-fold cross-validation.

In Phase 3, distribution-matched (clean) datasets undergo modality disentanglement to isolate the mechanics of memory. Inputs are systematically altered across four conditions: Original, Text-Only (zero-tensor audio silence), Noise-Only (Gaussian audio noise), and Acoustic Resynthesis (replacing original audio with synthetic versions generated via Cosyvoice2-0.5B for speech or TangoFlux for audio captions). This isolates whether memorization requires specific instance-level acoustic features or speaker-to-text binding.

## Experimental setup

Evaluated on two fully open-source LALMs with known data provenance: Audio-Flamingo 3 (AF3) and Music-Flamingo (MF). Eight datasets spanning three tasks were tested: LibriSpeech, GigaSpeech, TED-LIUM, VoxPopuli, and SPGISpeech (ASR); Clotho and CochlScene (Audio Captioning); and NSynth (Music Synthesis). For each dataset, a balanced cohort of 2,000 to 5,000 instances was randomly sampled. Classifiers used stratified linear Logistic Regression with 10-fold cross-validation, and acoustic resynthesis used 3 realizations per sample averaged across runs.

## Results

When evaluated on standard benchmarks without bias control, apparent MIA performance is misleadingly high—for instance, LibriSpeech yields an MIA AUC of 93.8 for AF3, but a blind acoustic baseline simultaneously achieves a 99.8 AUC with a strong Pearson correlation (r = 0.78), proving the metric merely catches dataset curation artifacts. When restricting evaluation to distribution-matched, bias-controlled 'clean' datasets where the blind baseline AUC hovers near 0.5 (such as SPGISpeech and Clotho), the LALMs' true MIA AUC collapses to near-random levels (50.7 to 52.4), demonstrating robust sample-level privacy under proper experimental conditions.

Modality disentanglement on these clean datasets (VoxPopuli, SPGISpeech, Clotho, NSynth) reveals that when original audio is swapped for Silence, Noise, or TTS/TTA Resynthesis, the MIA AUC drops significantly down to near-random performance (approx. 50%), confirming that LALM privacy risks stem strictly from cross-modal instance-specific identity-content binding.

| Dataset | AF3 MIA AUC | MF MIA AUC | Acoustic Blind Baseline AUC | Text Blind Baseline AUC |
|---|---|---|---|---|
| LibriSpeech | 93.8 | 70.9 | 99.8 | 61.1 |
| GigaSpeech | 87.6 | 90.5 | 78.9 | 75.6 |
| TED-LIUM | 70.0 | 68.9 | 98.7 | 85.7 |
| VoxPopuli | 62.0 | 68.1 | 66.7 | 60.3 |
| SPGISpeech | 51.9 | 50.7 | 52.0 | 50.0 |
| Clotho | 52.4 | 48.9 | 48.2 | 47.1 |

## Limitations

The study is scoped to open-source foundation models (AF3 and MF) where complete training data provenance is explicitly known, avoiding unfaithful shadow models but restricting the analysis to two architectures. The modality disentanglement ablation relies on surrogate TTS and TTA generators (Cosyvoice2 and TangoFlux) which may introduce minor acoustic artifacts or fail to perfectly replicate natural speaker timbre distributions. Additionally, non-speech modalities like music (NSynth) could not undergo full acoustic resynthesis due to technical synthesis constraints.

## Why read this

Speech and machine learning researchers auditing multimodal privacy risks should read this paper to avoid falling into the trap of confusing dataset distribution shifts with model memorization. It provides a concrete, actionable baseline protocol and demonstrates that LALM privacy mitigation requires breaking cross-modal speaker-content binding rather than relying solely on textual deduplication.

## Code

- https://github.com/snooow1029/ALM_MIA

## Applications

Auditing open-source and proprietary Large Audio Language Models for regulatory compliance, privacy preservation, copyright infringement detection, and designing privacy-aware data curation pipelines.

## Institutions / 機構

National Taiwan University

**Funding / 經費:** Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence, NTU Artificial Intelligence Center of Research Excellence

## Related

- (link related pages by id as the wiki grows)
