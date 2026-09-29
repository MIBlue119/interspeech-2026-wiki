---
id: gering26_interspeech
category: resources-evaluation
institutions: ["University of Sheffield"]
code: https://github.com/prgering/interaction-quality-modelling-sds
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1152
pdf: https://www.isca-archive.org/interspeech_2026/gering26_interspeech.pdf
---

# A System-Agnostic Approach to Modelling Interaction Quality in Spoken Dialogue Systems

*Paul Gering, Roger K. Moore*

[PDF](https://www.isca-archive.org/interspeech_2026/gering26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gering26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1152)

**Category:** `resources-evaluation`

**TL;DR** — This paper evaluates a system-agnostic (SA) approach for predicting user interaction quality (IQ) in spoken dialogue systems using audio, text, and temporal features, demonstrating that end-to-end fine-tuning allows SA features to achieve performance comparable to traditional system-dependent (SD) log-based features. The fine-tuned SA model achieved a Macro-F1 of 0.454 and UAR of 0.453 on the CMU Let's Go corpus.

## Key contributions

- Formulates a system-agnostic IQ prediction pipeline combining openSMILE acoustic features, self-supervised embeddings (WavLM, RoBERTa), and turn-taking temporal dynamics.
- Compares static feature extraction versus end-to-end fine-tuning across both system-dependent and system-agnostic pipelines.
- Shows via permutation tests that while static SD models significantly outperform static SA models (p = 0.046), end-to-end fine-tuning closes the performance gap so that differences become statistically insignificant (p > 0.05).
- Analyzes the computational footprint and demonstrates that fine-tuned SA and SD models maintain real-time inference latencies below 20 ms per exchange.

## Problem

Evaluating spoken dialogue systems typically relies on system-dependent (SD) log data (such as internal submodule states and dialogue manager logs) as pioneered by Schmitt et al., which lacks generalizability across different system architectures and tasks. While recent text-and-temporal alternatives like Gupta et al.'s RoBERTaIQ bypass system metadata, they omit raw acoustic signals and paralinguistic cues essential for capturing user satisfaction. This work addresses the gap by establishing whether a holistic, system-agnostic feature set containing acoustic, textual, and temporal dimensions can effectively model interaction quality without access to internal system metadata.

## Method

The study utilizes the CMU Let's Go (LEGO) corpus, processing dialogue at the exchange level (system prompt followed by user response). For the system-agnostic (SA) pipeline, user speech is isolated via Silero VAD, transcribed using Whisper large-v3-turbo with WhisperX word-level alignments, and complemented by system speech isolated from dyadic recordings. Acoustic features are extracted using openSMILE's 88-dimensional eGeMAPSv02 set alongside mean-pooled self-supervised representations from WavLM-base (selected over HuBERT and Wav2Vec2). Text embeddings are extracted using RoBERTa-base (selected over SBERT and TOD-BERT) after applying PCA (retaining 80% variance for text, 60% for speech), and merged with temporal indicators such as turn duration, response latency, overlap, and response token presence.

The classification back-end consists of a unidirectional LSTM with self-attention. Two experimental phases are investigated: Phase 1 freezes the pre-trained encoders, using PCA followed by a tuned LSTM with a hidden size of 384, 2 layers, and a head learning rate of 5e-4. Phase 2 implements an end-to-end fine-tuned architecture using gradient accumulation (batch size 1 with 8 steps, freezing the bottom 3 encoder layers) where text and acoustic encoder outputs pass through learnable projection layers, LayerNorm, and a sliding dialogue context window of size 5 (compared to 15 for SD). Models are optimized using Adam with early stopping on NVIDIA A100 GPUs.

## Experimental setup

Evaluated on a filtered subset of the CMU Let's Go corpus consisting of 229 telephone dialogues and 5,477 exchanges, partitioned 80/20 at the dialogue level into training and test sets. Performance is compared against a majority class baseline and Ultes's log-feature baseline. Metrics reported are Macro-Average F1 (Macro-F1) and Unweighted Average Recall (UAR) averaged across 5 random seeds for Phase 2.

## Results

In the static feature pipeline (Phase 1), the system-dependent model achieves a Macro-F1 of 0.469 and UAR of 0.463, significantly outperforming the static system-agnostic model (Macro-F1: 0.389, UAR: 0.383; p = 0.046). When end-to-end fine-tuning is applied (Phase 2), the system-agnostic model's performance increases substantially to a Macro-F1 of 0.454 and UAR of 0.453, bringing it statistically on par with the fine-tuned SD model (Macro-F1: 0.462, UAR: 0.471; p > 0.05). Computational complexity scales up during fine-tuning, increasing trainable parameters from 2.29M to 135.73M and inference latency from 0.16 ms to 17.98 ms per exchange for the SA models.

| System / Condition | Macro-F1 | UAR |
|---|---|---|
| Majority Baseline | 0.101 | 0.200 |
| Static SD (Phase 1) | 0.469 | 0.463 |
| Static SA (Phase 1) | 0.389 | 0.383 |
| Fine-tuned SD (Phase 2) | 0.462 | 0.471 |
| Fine-tuned SA (Phase 2) | 0.454 | 0.453 |

## Limitations

The study is restricted to a single dated telephone-based dialogue corpus (CMU LEGO) featuring bus schedule inquiries, exhibiting severe label skew toward high IQ scores and low inter-annotator agreement (Cohen's kappa = 0.31). The system-agnostic pipeline relies on manually corrected transcripts rather than a fully automated speech-to-text pipeline, and evaluation is limited to a single English-language telephony domain.

## Why read this

Researchers and engineers building scalable, portable dialogue evaluation metrics will learn how to substitute internal system logs with self-supervised acoustic-textual embeddings without sacrificing predictive fidelity.

## Code

- https://github.com/prgering/interaction-quality-modelling-sds

## Applications

Real-time monitoring of user satisfaction and interaction quality in production spoken dialogue systems without requiring proprietary system-log access.

## Institutions / 機構

University of Sheffield

**Funding / 經費:** UK Research and Innovation, UKRI AI Centre for Doctoral Training in Speech and Language Technologies (SLT) and their Applications

## Related

- [HaessigDB: A Database of Irritable Speech with Intensity Grading](weller26_interspeech.md) — same problem · relatedness 1.9/3
- [SA-UAED: Joint Frame-Level Detection of Audio Events, Speaker Activities, and Speaker-Attributed Paralinguistic Events](lan26_interspeech.md) — complementary · relatedness 1.6/3
- [When Does Quality-Aware Multimodal Fusion Matter? A Leakage-Safe Diagnostic for Decision-Level Dependence](moon26b_interspeech.md) — same problem · relatedness 1.6/3
- [ConformalMOS: Uncertainty-Aware MOS Prediction with Conformal Intervals and Ordinal Modeling](elelu26_interspeech.md) — same problem · relatedness 1.6/3
- [M-LAMA: Multimodal Automated Scoring of Long-form Spoken English](daoxuanquang26_interspeech.md) — shared technique · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
