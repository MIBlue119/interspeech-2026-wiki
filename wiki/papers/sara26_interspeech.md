---
id: sara26_interspeech
category: applications-other
labels: [self-supervised]
institutions: ["Qatar Computing Research Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1153
pdf: https://www.isca-archive.org/interspeech_2026/sara26_interspeech.pdf
---

# Light-weight Pronunciation Assessment via Discrete Speech Token Surprisal

*Syeda Faiza Ahmed Sara, Shammur Absar Chowdhury*

[PDF](https://www.isca-archive.org/interspeech_2026/sara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1153)

**Category:** `applications-other` · **Labels:** `self-supervised`

**TL;DR** — A lightweight, unsupervised pronunciation assessment framework leveraging self-supervised discrete speech token surprisal and transcript-guided DTW alignment trained exclusively on native speech data. It achieves competitive accuracy on SpeechOcean762 (PCC 0.66) and strong cross-dataset transfer to L2-ARCTIC without requiring forced alignment or labeled non-native data.

## Key contributions

- A lightweight pronunciation assessment framework operating unsupervised or with light calibration from a minimal set of scored learner utterances.
- Native-trained discrete-token surprisal features that eliminate the need for phoneme inventories, forced alignment, and learner mispronunciation labels.
- A transcript-guided Text2DUnit module coupled with discrete-space Dynamic Time Warping (DTW) to extract fine-grained structural mispronunciation features.
- Demonstrated strong zero-shot cross-dataset transfer (L2-ARCTIC) and robustness to an order-of-magnitude reduction in native training data (down to 100 hours).

## Problem

Traditional automated pronunciation assessment methods depend heavily on Goodness of Pronunciation (GoP) scores extracted from forced-aligned ASR models, or rely on regression models trained on large sets of expert-labeled non-native speech. Collecting such non-native annotated corpora is expensive, domain-specific, and practically impossible for low-resource languages, endangered dialects, or specialized speaking styles. Furthermore, prior zero-shot approaches involve costly multi-pass masked token recovery or continuous-embedding DTW that are computationally demanding and sensitive to speaker variability.

## Method

The framework relies on an Audio2DUnit tokenizer, a native Token Language Model (TLM), and a Text2DUnit module. Continuous 16 kHz audio is processed by a frozen HuBERT-base encoder (Layer 9) and quantized via a K-means codebook (K=512) fitted on LibriSpeech. A 3-gram TLM estimates native phonotactic probabilities over these discrete units. Audio-only features include duration, surprisal standard deviation, and a 90th-percentile spike rate (threshold = 9.0 bits), which capture localized pronunciation anomalies rather than utterance-wide averages.

When reference text is available, a CANINE-S character encoder with LoRA adapters (rank 32, alpha 64) and a 4-layer Transformer decoder map transcripts into the identical discrete unit space. The predicted canonical token sequence is aligned against the deduplicated learner token sequence using Dynamic Time Warping (DTW). The local cost uses precomputed L2 distances over the 512 x 512 centroid matrix, penalizing distant phonetic substitutions more severely than close ones. DTW path cost yields a normalized distance, token mismatch rate, mismatch surprisal std, and weighted surprisal std (alpha = 0.5).

A simple Ridge regression model (alpha = 1.0) maps these features to expert scores. Training uses LibriSpeech 960h (or 100h) and SpeechOcean762 for light calibration, requiring a single forward pass per utterance during inference, significantly lowering compute overhead.

## Experimental setup

Evaluated on the SpeechOcean762 test split (2,500 utterances from 250 speakers) and cross-evaluated on L2-ARCTIC (24 speakers, 1,351 manually checked utterances). Performance is measured via Pearson Correlation Coefficient (PCC) against Accuracy, Fluency, and Prosody dimensions. Training data comprises LibriSpeech (960 hours or a 100-hour subset). Implementations use PyTorch, fp16 precision, AdamW optimizer (lr = 5e-5), and a cosine schedule.

## Results

On SpeechOcean762, the audio-only model achieves an accuracy PCC of 0.597, matching prior label-free aMRT baselines (0.60). Incorporating transcript-guided DTW features raises the accuracy, fluency, and prosody PCCs to 0.661, 0.763, and 0.753 respectively, closely approaching fully supervised neural baselines like MultiPA (0.705). Reducing native training data from 960 hours to 100 hours maintains stable performance (accuracy PCC 0.668 vs 0.661). On L2-ARCTIC zero-shot transfer, the system achieves an utterance-level pronunciation PCC of 0.526 without retraining, which improves to 0.557 with light in-domain calibration.

| System / Condition | Accuracy PCC | Fluency PCC | Prosody PCC |
|---|---|---|---|
| GoP [1] (Supervised) | 0.640 | – | – |
| GOPT [2] (Supervised) | 0.740 | – | – |
| HMamba [17] (Supervised) | 0.807 | 0.848 | 0.843 |
| Liu et al. (aMRT) [15] (Zero-shot) | 0.600 | – | – |
| Ours (Audio-only, 960h) | 0.597 | 0.694 | 0.688 |
| Ours (Audio + Transcript, 960h) | 0.661 | 0.763 | 0.753 |

## Limitations

The framework's current evaluation is constrained to non-native English speakers reading prompts, lacking validation on spontaneous or conversational speech. The transcript-guided component strictly requires reference text, limiting completely unprompted free-form spoken evaluation. Furthermore, the approach relies on English-centric SSL models (HuBERT) and text encoders (CANINE-S), meaning its cross-lingual generalization to non-Latin scripts or highly tonal languages remains unproven.

## Why read this

Speech researchers and educational technology engineers seeking to build high-performance, low-resource pronunciation assessment tools without relying on forced aligners or costly non-native training data will find this an elegant and practical blueprint.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-Assisted Language Learning (CALL) applications, automated second-language speech evaluation, and on-device pronunciation tutoring in low-resource classrooms.

## Institutions / 機構

Qatar Computing Research Institute

**Funding / 經費:** HBKU flagship research grant

## Related

- [ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling](sirigiraju26_interspeech.md) — same problem · relatedness 3.0/3
- [Beyond Acoustic Sparsity and Linguistic Bias: A Prompt-Free Paradigm for Mispronunciation Detection and Diagnosis](geng26_interspeech.md) — same problem · relatedness 2.6/3
- [Domain-Aware Mispronunciation Detection and Diagnosis Using Language-Specific Statistical Graphs](nguyen26g_interspeech.md) — same problem · relatedness 2.5/3
- [Automatic Assessment of L2 Speech Intelligibility: Segmental Error Ranking](pludra26_interspeech.md) — same problem · relatedness 2.5/3
- [LOPA: Enhancing Spoken Language Assessment via Latent Ordinal Prototype Alignment](lin26e_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
