---
id: kumar26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Florida International University", "University of South Florida"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-593
pdf: https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.pdf
---

# Listening with Attention: Entropy-Guided Explainability for Transformer-Based Audio Models

*Ravi Kumar, Utkarsh Grover, Xiaomin Lin, Agoritsa Polyzou*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-593)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — LEAF-X is a model-intrinsic explainable AI framework for transformer ASR that combines entropy-guided attention weighting, multi-layer attention rollout, and causal reweighting to produce faithful token-to-frame attributions. It achieves superior faithfulness and stability compared to black-box and gradient baselines on Whisper and Canary models.

## Key contributions

- Entropy-guided attention weighting that filters diffuse heads and highlights confident, low-entropy attention patterns for sharper token-to-audio alignments.
- Multi-layer attention rollout integration that aggregates compositional evidence and information flow across transformer depths.
- Lightweight causal reweighting via layer ablation to ensure explanations track token likelihood and model computation faithfully.
- Comprehensive evaluation across multiple speech transformer backbones (Whisper-large-v3, Canary-Qwen-2.5B) using established metrics like D-AOPC, Infidelity, and Temporal Localization.

## Problem

Modern transformer-based automatic speech recognition models achieve high accuracy but remain black boxes, making it difficult to trace which acoustic frames support specific decoded tokens. Traditional post-hoc explainers like LIME, SHAP, and Integrated Gradients fail to capture sequential dependencies, are computationally expensive, and often yield coarse or unfaithful time localization. This opacity hinders debugging, auditing, and deployment in high-stakes safety-critical environments where regulatory compliance and transparency are mandatory.

## Method

LEAF-X operates on encoder-decoder models (like Whisper) using cross-attention or speech-augmented decoder-only models (like Canary-Qwen-2.5B) using attention mass on audio pseudo-tokens. Given acoustic features X ∈ R^(T × d), it computes a normalized token-to-time attribution vector s_i for each decoded token y_i over T audio frames. First, it calculates attention head entropy across L layers and H heads, converting it into a confidence weight via exponential scaling (lower entropy yields higher weight) to suppress broad, non-specific context heads. Second, it aggregates these layer-wise distributions using a multi-layer rollout operator that accumulates information flow and applies an output sensitivity gradient modulation to scale attention by output probability impact.

Finally, LEAF-X optionally applies a lightweight causal reweighting step. It computes negative log-likelihood loss changes when ablating the audio-to-text attention contribution of each layer ℓ, deriving layer importance weights to combine intermediate rollout maps. The hyperparameters include entropy temperature τ (typically swept in [0.5, 2]), numerical stability constant ε ≈ 10^(-8), and the full number of audio-to-text attention layers L. The final output is a time-frequency heatmap aligned to the transcript, mapped back to the audio timeline using front-end hop sizes and downsampling strides.

## Experimental setup

Evaluated on LibriSpeech (1000 hours of read English audiobooks, using train-clean-100 for any training and test-clean/test-other for evaluation) and TED-LIUM Release 3 (~450+ hours of spontaneous lecture-style speech). Compared against 7 baselines: LIME, SHAP, Integrated Gradients, SpecMask, Raw Attention Alignment (RAA), SaCo, and Transformer Attribution (TA). Metrics include Deletion Area Over the Perturbation Curve (D-AOPC ↓), Temporal Localization (TLoc ↑), Sparsity (SPR ↑), Stability (STAB ↑), and Infidelity (INF ↓). Models tested are Whisper-large-v3 (1.55B parameters) and Canary-Qwen-2.5B.

## Results

On Whisper-large-v3 (LibriSpeech), LEAF-X achieves the best faithfulness and reliability, scoring D-AOPC of 0.45 (vs 0.51 for SaCo and 0.53 for TA), Infidelity of 0.45, Sparsity of 0.70, and Stability of 0.78, while maintaining a strong Temporal Localization of 0.72 (tied closely with SaCo's 0.73). On Canary-Qwen-2.5B (TED-LIUM 3), LEAF-X yields a D-AOPC of 0.48, Infidelity of 0.47, Sparsity of 0.68, Stability of 0.76, and top-tier Temporal Localization of 0.70. Ablation studies confirm that removing entropy weighting or rollout causes the steepest drops in localization and sparsity, while removing gradient modulation or causal reweighting degrades faithfulness (increasing D-AOPC and INF).

| Method | D-AOPC ↓ | TLoc ↑ | SPR ↑ | STAB ↑ | INF ↓ |
|---|---|---|---|---|---|
| LIME | 0.72 | 0.55 | 0.48 | 0.60 | 0.65 |
| SHAP | 0.68 | 0.58 | 0.50 | 0.62 | 0.63 |
| SpecMask | 0.60 | 0.62 | 0.55 | 0.65 | 0.58 |
| SaCo | 0.51 | 0.73 | 0.68 | 0.72 | 0.50 |
| TA | 0.53 | 0.66 | 0.62 | 0.69 | 0.52 |
| LEAF-X (Ours) | 0.45 | 0.72 | 0.70 | 0.78 | 0.45 |

## Limitations

The framework's causal reweighting step introduces up to L additional forward passes per analyzed token, increasing computational overhead. The evaluation is restricted to English corpora (LibriSpeech and TED-LIUM) and specific model architectures (Whisper and Canary-Qwen), leaving multi-language generalizability and broad domain robustness unverified. Additionally, metrics rely on proxy quantitative measures (perturbation curves, forced alignments) rather than human-in-the-loop interpretability validation.

## Why read this

Speech researchers and ML engineers building auditable or safety-critical speech systems should read this paper to learn how model-intrinsic attention dynamics and entropy guidance can generate faithful, stable token-to-frame explanations without expensive black-box perturbations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and debugging automatic speech recognition models in safety-critical domains such as medical dictation, legal transcription, and emergency response.

## Institutions / 機構

Florida International University, University of South Florida

## Related

- (link related pages by id as the wiki grows)
