---
id: suzuki26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Keio University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-914
pdf: https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.pdf
---

# ELSA: Acoustic Event-Level Semantic Alignment for Fine-Grained Reference-Free Text-to-Audio Evaluation

*Shuntaro Suzuki, Kento Tokura, Daichi Yashima, Kanon Amemiya, Komei Sugiura, Shinnosuke Takamichi*

[PDF](https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/suzuki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-914)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — ELSA is a reference-free automatic evaluation metric for text-to-audio (TTA) generation that decomposes text queries into distinct acoustic events and evaluates fine-grained event-level alignment using LASS and CLAP features. It achieves consistently higher correlation with human subjective relevance ratings than existing reference-based and reference-free metrics across four major benchmarks.

## Key contributions

- Proposes a hierarchical reference-free evaluation framework that combines global text-audio matching with event-level precision, recall, and F1 scores.
- Utilizes a text parser (LLM) and a Language-queried Audio Source Separation (LASS) model to extract and align individual noun-verb acoustic event descriptions.
- Introduces an adaptive score combination factor (lambda) that weights fine-grained matching more heavily when the number of detected acoustic events is large.
- Demonstrates superior correlation with human ratings across four benchmarks (AudioCaps, Clotho, MusicCaps, RELATE) and compositional evaluation sets (CompA).

## Problem

Traditional text-to-audio automatic evaluation relies either on restrictive reference audio (e.g., AudioBERTScore, SI-SDR) or coarse-grained global embeddings (e.g., CLAPScore, PAM) that match entirely different modalities. Because global embeddings average semantics across the entire sequence, short and transient acoustic events like footsteps or specific animal sounds are obscured. This results in poor correlation with human subjective ratings (e.g., a Spearman correlation of 0.280 between standard CLAPScore and human relevance on RELATE), hindering the development of reliable TTA models.

## Method

ELSA takes a text query x and generated audio s, first projecting them into a shared embedding space using pretrained Human-CLAP to compute a global coarse matching score yc via cosine similarity. To capture fine-grained details, a text-only LLM (GPT-5.2) decomposes the prompt into concise noun-verb event descriptions xi (e.g., 'dog barking'), and a Language-queried Audio Source Separation (LASS) model (SAM Audio) extracts corresponding audio segments as representations a(fi). Pairwise similarities between event-level text and audio embeddings are calculated to derive precision Pf and recall Rf, yielding an event-level F1 score yf.

The final evaluation score is adaptively computed as y_hat = lambda^M * yc + (1 - lambda^M) * yf, where M is the number of extracted acoustic events and the balancing factor lambda is empirically set to 0.4 across all experiments. This formulation assigns higher weight to fine-grained event alignment as the compositional complexity of the user intent increases, bridging holistic semantic matching with localized acoustic verification.

## Experimental setup

Evaluated on four text-to-audio benchmarks: AudioCaps, Clotho, MusicCaps, and RELATE, alongside compositional test sets CompA and RELATE's inclusion/order of sound events (IS/OS). Baselines include reference-based metrics (SI-SDR, FDOpenL3, KLPaSST, AudioBERTScore) and reference-free metrics (PAM, CLAPScoreMS, CLAPScoreLAION, CLAPScoreHuman). Audio samples are resampled to 16 kHz and fixed to 10 seconds. Metrics are evaluated using Spearman's rho and Kendall's tau rank correlation coefficients.

## Results

ELSA achieves substantial correlation improvements over the best baseline metrics across all tested benchmarks. On AudioCaps, its Kendall's tau for REL reached 32.7 (+13.1 points over the best baseline); on Clotho, it reached 28.7 (+14.0 points); on MusicCaps, 27.5 (+4.8 points); and on RELATE, 25.2 (+1.5 points). Ablations showed that swapping the LASS model (e.g., to AudioSep or SoloAudio) caused minor variations (up to 5.4 points in tau), whereas changing the underlying CLAP embedding space to MS-CLAP or LAION-CLAP severely degraded performance (up to 9.6 points drop), proving that embedding quality dominates metric sensitivity. ELSA does not win on absolute score calibration, showing a systematic downward shift averaging 0.23 points lower than human relevance scores.

| System | AudioCaps REL (tau) | Clotho REL (tau) | MusicCaps REL (tau) | RELATE REL (tau) |
|---|---|---|---|---|
| CLAPScoreHuman | 18.7 | 14.7 | 22.7 | 6.2 |
| PAM | 11.7 | 12.1 | 0.6 | 10.8 |
| AudioBERTScore | 19.6 | 14.2 | 15.4 | 19.4 |
| ELSA (Ours) | 32.7 | 28.7 | 27.5 | 25.2 |

## Limitations

ELSA does not explicitly model the temporal order or duration of acoustic events, relying entirely on bag-of-events precision and recall which limits strict sequential reasoning despite decent empirical results on order benchmarks. The absolute output scale of ELSA is systematically lower than human relevance ratings, requiring calibration if used as an absolute threshold rather than a relative ranking metric. The pipeline relies heavily on heavy foundation models (GPT-5.2 and SAM Audio), making evaluation computationally expensive.

## Why read this

Speech and ML researchers building or tuning text-to-audio generation systems should read this to understand how event-wise decomposition overcomes the catastrophic blindness of global CLAP embeddings to transient sounds. It provides a drop-in reference-free evaluation framework that aligns much closer with human perception.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated evaluation, hyperparameter tuning, and reward modeling for text-to-audio generation, sound effect synthesis, and multimedia generation systems.

## Institutions / 機構

Keio University

## Related

- (link related pages by id as the wiki grows)
