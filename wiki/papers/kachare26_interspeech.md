---
id: kachare26_interspeech
category: health-clinical
institutions: ["Infosys"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.pdf
---

# ClinAware: Speech Enhancement Needs Clinical Awareness

*Pramod H. Kachare, Chetana Amancharla*

[PDF](https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.html)

**Category:** `health-clinical`

**TL;DR** — ClinAware is an interactive demonstration system that explores how standard speech enhancement methods unintentionally alter neurological voice biomarkers and downstream risk scores. It reveals that optimizing speech enhancement purely for perceptual intelligibility does not guarantee the preservation of health-relevant acoustic features.

## Key contributions

- Proposes a demonstration framework that bridges the gap between speech enhancement preprocessing and downstream neurological speech analysis.
- Implements a multi-strategy comparison pipeline evaluating conservative spectral gating, aggressive smoothing, and neural enhancement (DEMUCS).
- Formulates an interpretable risk indicator derived from a weighted vector of seven standard neurological speech biomarkers.
- Demonstrates that different enhancement philosophies induce method-dependent feature drifts and risk score shifts despite achieving comparable perceptual improvements.

## Problem

Speech enhancement is routinely deployed as a preprocessing step in telehealth, mobile health apps, and home-based neurological monitoring systems to handle noisy environments. However, traditional enhancement algorithms are designed strictly to optimize perceptual speech quality or automated recognition accuracy. Consequently, operators like spectral subtraction or neural denoisers can inadvertently distort temporal, prosodic, and spectral patterns—such as jitter, shimmer, pitch variance, and speaking rate—that serve as critical biomarkers for conditions like Parkinson's disease and ALS. This mismatch means that clinically relevant signals can be degraded or artificially altered even when the enhanced audio sounds perceptually clean.

## Method

The ClinAware system models clean speech $x(t)$ corrupted by background noise $n(t)$ to yield $y(t)$, which is then passed through an enhancement operator $E(\cdot)$ to estimate $\hat{x}(t)$. The framework extracts a 7-dimensional neurological biomarker vector $\mathbf{b}$ using the Librosa library, comprising pause ratio, pitch mean, pitch standard deviation, spectral centroid standard deviation, jitter, shimmer, and speaking rate. To evaluate how these features propagate to higher-level clinical indicators, a lightweight and interpretable risk score $R$ is formulated via a weighted linear combination of min-max normalized biomarkers $\tilde{b}_i$ mapped to $[0, 1]$ using fixed conservative boundaries (e.g., $F_0/200$, $F_0^{\text{std}}/80$). The fixed heuristic weight vector $\mathbf{w}$ is set to $[0.22, 0.08, 0.20, 0.12, 0.18, 0.12, 0.08]$, heavily weighting prosodic and spectral instabilities that correlate with motor impairments.

The system's backend is powered by FastAPI paired with a lightweight browser-based user interface designed to run offline on a standard laptop. Users can upload audio files, simulate noise conditions, and execute three distinct enhancement backends: a conservative spectral-gating baseline, an aggressive smoothing approach, and a pretrained deep neural model (DEMUCS). By computing biomarkers before and after enhancement, the interface generates parallel spectrograms, numerical feature shifts, and real-time risk score alterations to contrast how distinct processing philosophies reshape the underlying acoustic space.

## Experimental setup

The demo operates on user-uploaded or simulated noisy speech samples processed via three comparative enhancement conditions: a baseline conservative spectral-gating method, an aggressive smoothing method, and a pretrained DEMUCS neural network. Evaluation is performed qualitatively via comparative spectrogram visualizations and quantitatively through a 7-dimensional neurological biomarker vector and a composite risk score metric. The entire system is implemented using a FastAPI backend and a browser frontend configured for real-time local execution on standard laptop hardware.

## Results

The evaluation demonstrates that distinct enhancement backends impose drastically different structural modifications on identical noisy speech inputs. The conservative baseline preserves overall spectro-temporal configurations reasonably well, showing only minor increases in pitch variability and spectral dispersion that lead to a slight rise in the risk score. The aggressive smoothing method flattens fine-scale pitch dynamics and produces smoother spectrograms, but introduces underlying spectral instabilities that drive a moderate risk score shift. In contrast, the pretrained neural model (DEMUCS) substantially amplifies pitch dynamics and temporal energy fluctuations, resulting in a pronounced surge in the composite risk indicator and highlighting how heavy-handed neural processing can severely distort diagnostic biomarkers.

## Limitations

The risk score formulation relies on fixed heuristic weights and conservative normalization bounds rather than a clinically validated diagnostic model. The system functions strictly as an interactive proof-of-concept and visualization demo rather than a certified medical diagnostic tool. Furthermore, the evaluation scope is bounded by the tested subset of enhancement algorithms (spectral gating, smoothing, DEMUCS) and a limited set of seven standard open-source Librosa-derived biomarkers.

## Why read this

Speech and ML engineers building telehealth, voice biomarker extraction, or home-health monitoring pipelines should read this to understand that standard speech enhancement models are not clinically transparent. It provides an interactive framework to audit how preprocessing choices distort downstream health indicators.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Telehealth preprocessing pipelines, remote neurological health monitoring applications, and clinically-aware speech enhancement model design.

## Institutions / 機構

Infosys

## Related

- [BACH: Benchmarking Audio Codecs for Bio-Acoustic Health](zhang26w_interspeech.md) — same problem · relatedness 2.1/3
- [Natural Speech Encodes Early Markers of Cognitive Decline: Evidence from Clinical Conversations](haghbin26b_interspeech.md) — same problem · relatedness 2.0/3
- [Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech](ghosh26_interspeech.md) — same problem · relatedness 2.0/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 2.0/3
- [Cognitive-Heuristic Guided Multimodal Data Augmentation for Alzheimer’s Disease Detection Using LLM and TTS](jiang26e_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
