---
id: ryu26_interspeech
category: paralinguistics-emotion
institutions: ["Gwangju Institute of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1399
pdf: https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.pdf
---

# Modality Importance is Not Static: Temporal Dynamics via Gating in Multimodal Emotion Recognition

*Jiyeon Ryu, SeongHun Noh, Jin-Hyuk Hong, Woojin Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1399)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper demonstrates that multimodal emotion recognition is a dynamic process where modality importance changes over time, proposing an emotion-query gating mechanism that outperforms static fusion and heavy Transformers while using a fraction of the parameters.

## Key contributions

- Empirical validation that modality importance in dialogue emotion recognition is non-stationary over time and class-dependent.
- Proposing an emotion-query gating module that computes class-conditioned, time-varying modality weights using a GRU temporal backbone.
- Attribution-based validation using temporal/time-modality occlusion and Area Over the Perturbation Curve (AOPC) to prove the faithfulness of learned temporal dynamics.
- Achieving superior performance to heavy multimodal Transformers (MulT, MMER) on IEMOCAP while being 5.9x to 26x smaller in parameters.

## Problem

Most multimodal emotion recognition (MER) systems rely on static per-utterance fusion, which implicitly assumes that the relative importance of text, speech, and video signals remains time-invariant over dialogue history. Prior approaches focus heavily on architectural scaling, graph interaction, or complex cross-modal Transformers (such as MulT and MMER) without directly evaluating whether modality contributions actually evolve across conversational turns. This static view ignores the temporal reality of human affect, where emotional cues unfold sequentially and context shifts the reliance on different sensory modalities. Addressing this gap matters because modeling emotion as a sequential decision process rather than a static classification problem yields more accurate and interpretable dialogue models.

## Method

The framework decouples unimodal representation learning from temporal fusion. For text, speech, and video, the authors train or use frozen backbones: GPT-2 for text, HuBERT (hubert-base-ls960) for speech, and VideoMAE (videomae-base) for video. Utterance-level pooled features (768-D per modality) are extracted across a dialogue context window of length K = 8. A static multilayer perceptron operates on concatenated logits (18-D), while the temporal and gating models ingest concatenated pooled features (2304-D total).

The core temporal backbone is a single-layer GRU with hidden size 128 and dropout 0.2. To adapt modality contributions over time, the authors introduce an emotion-query gating mechanism. Rather than computing unconditioned attention, it calculates class-conditioned modality weights using learnable class-query vectors ($q_c$) and the previous temporal state ($h_{t-1}$). The gate projects modality features into the query space, applies a softmax across the probability simplex to produce $\alpha_t^{m,c}$, and marginalizes over class posteriors. This formulation avoids circular dependency while dynamically scaling the gated features before they enter the GRU classifier.

Training uses the AdamW optimizer for 30 epochs with a batch setup across 5-fold Leave-One-Session-Out (LOSO) cross-validation. The video-new configuration unfreezes the last two blocks of VideoMAE with 16 frames at 224 resolution and face-cropping, applying inverse-frequency class-weighted cross-entropy. Faithful attribution is verified via temporal and time-modality occlusion measured by AOPC.

## Experimental setup

Evaluated on the IEMOCAP dataset using 6 emotion classes (angry, happy/excited merged to hap, neutral, sad, frustrated, surprised) under a 5-fold Leave-One-Session-Out (LOSO) cross-validation protocol. Baselines include standard Transformer, MulT, MMER, and a Static MLP operating on logits. Metrics reported are Macro-F1 and Unweighted Accuracy (UA). Notable implementation details include a context window of K=8, hidden size of 128, dropout of 0.2, 30 training epochs with AdamW, random seed 2026, and execution on a single NVIDIA GeForce RTX 3090 GPU.

## Results

The temporal emotion-query model achieves a Macro-F1 of 0.5731 and UA of 0.5734, outperforming the static MLP (0.4821 F1), the plain Temporal GRU without gates (0.5568 F1), and protocol-matched sequence baselines like Transformer (0.5228), MulT (0.5203), and MMER (0.5184). Notably, the proposed model achieves these gains using only 0.076M parameters, compared to 0.452M for the Transformer and 1.84M–1.94M for MulT and MMER.

Ablations on gating variants show progressive improvement from the No-gate GRU (0.5568) to local gating (0.5643), contextual gating (0.5673), and the final emotion-query gating (0.5731). Per-class improvements are widespread, notably boosting F1 for harder or highly context-sensitive classes like happiness (0.5882 to 0.7443) and surprise (0.1971 to 0.3183). Statistical significance is confirmed via McNemar's test ($\chi^2 = 63.52, p < 10^{-6}$) and bootstrap resampling.

| System / Condition | Macro-F1 | UA |
|---|---|---|
| Static MLP (logits) | 0.4821 | 0.4843 |
| MMER [14] | 0.5184 | 0.5222 |
| MulT [7] | 0.5203 | 0.5323 |
| Transformer [23] | 0.5228 | 0.5229 |
| Temporal GRU (no gate) | 0.5568 | 0.5573 |
| Temporal + Emotion-Query Gate | 0.5731 | 0.5734 |

## Limitations

The evaluation is restricted to the IEMOCAP corpus, which is a partially scripted laboratory-environment dataset with clean transcripts, limiting immediate generalization to noisy, in-the-wild conversational data. The study focuses primarily on text, speech, and video features extracted from fixed base encoders rather than end-to-end multi-stream representations. Additionally, the approach assumes a fixed context window length ($K=8$), which may truncate long-range conversational dependencies.

## Why read this

Researchers building multimodal dialogue or emotion recognition systems should read this to understand why static fusion is fundamentally flawed for sequential affect. It offers a lightweight, parameter-efficient blueprint for dynamic modality weighting backed by rigorous perturbation-based attribution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Customer service analytics, mental health monitoring platforms, and emotionally intelligent conversational agents.

## Institutions / 機構

Gwangju Institute of Science and Technology

**Funding / 經費:** Ministry of Trade, Industry and Energy, Korea Institute for Advancement of Technology, Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- [EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation](huang26n_interspeech.md) — same problem · relatedness 2.7/3
- [MF-EDM: Graph-based Multimodal Fusion and Emotional Dynamics Modeling for Emotion Recognition in Conversation](hwang26_interspeech.md) — same problem · relatedness 2.5/3
- [EII-SCL: Harnessing Emotional Inertia for Multimodal Emotion Recognition in Conversation](huang26p_interspeech.md) — same problem · relatedness 2.5/3
- [Leveraging Modality-Specific Label Distributions for Enhanced Multimodal Emotion Recognition](shi26e_interspeech.md) — same problem · relatedness 2.5/3
- [AcoustEmo: An Utterance-Aware Acoustic Q-Former for Open-Vocabulary Emotion Reasoning](zhang26ea_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
