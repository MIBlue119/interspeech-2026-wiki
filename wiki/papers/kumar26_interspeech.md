---
id: kumar26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-593
pdf: https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.pdf
---

# Listening with Attention: Entropy-Guided Explainability for Transformer-Based Audio Models

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-593)

**TL;DR** — LEAF-X is a model-intrinsic explainability framework for transformer ASR that uses entropy-guided attention weighting and multi-layer rollout to produce faithful, sparse token-to-frame attributions.

## Problem

Modern transformer ASR models like Whisper and Canary achieve high transcription accuracy but operate as opaque black boxes, complicating deployment in safety-critical settings where auditing model decisions is required. Existing post-hoc explainers like LIME, SHAP, and Integrated Gradients often fail to faithfully capture causal evidence, yield coarse time localization, and are poorly matched to sequential speech dynamics. ASR needs a model-intrinsic XAI framework that provides fine-grained, word-aligned rationales reflecting the model's internal computation.

## Method

LEAF-X combines entropy-guided attention weighting to filter diffuse heads, multi-layer attention rollout to aggregate compositional evidence across transformer depth, gradient modulation for output sensitivity, and lightweight causal reweighting via layer-wise ablations. The framework operates on encoder-decoder models (e.g., 1.55B-parameter Whisper-large-v3) and speech-augmented decoder-only hybrids (Canary-Qwen-2.5B), extracting token-to-time attributions mapped back to spectrogram frames. Hyperparameters include entropy temperature tau, numerical stability constants, rollout depth matching model layers, and optional causal ablation passes.

## Results

Evaluated on LibriSpeech (using train-clean-100, test-clean, test-other) and TED-LIUM Release 3 using D-AOPC, Temporal Localization (TLoc), Sparsity (SPR), Stability (STAB), and Infidelity (INF) metrics against baselines like LIME, SHAP, Integrated Gradients, Occlusion/SpecMask, Raw Attention Alignment, SaCo, and Transformer Attribution. On Whisper-large-v3, LEAF-X achieves the lowest D-AOPC (0.45) and INF (0.45), while improving sparsity (0.70) and stability (0.78). On Canary-Qwen-2.5B, LEAF-X attains D-AOPC of 0.48, INF of 0.47, SPR of 0.68, and STAB of 0.76, while tying for top temporal localization (0.70). Ablations confirm that removing entropy weighting or rollout causes the largest drops in localization and sparsity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, compliance auditors, and developers deploying ASR systems in high-stakes environments such as medical dictation and emergency response who need to audit model behavior and verify spoken evidence.

## Limitations

Limitations include dependence on backbone model architecture, sensitivity to attention and entropy calibrations, vulnerability to domain shift and noise, and lack of direct human-in-the-loop user validation.

## Related

- (link related pages by id as the wiki grows)
