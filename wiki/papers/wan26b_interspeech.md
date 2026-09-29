---
id: wan26b_interspeech
category: tts
labels: [generative-model]
institutions: ["Shanghai Jiao Tong University", "Ping An Technology", "Shanghai Jiao Tong University Chongqing Artificial Intelligence Research Institute"]
code: https://wancc-p.github.io/EoLoRA/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1798
pdf: https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.pdf
---

# Continuous Time-Varying Emotion Control Zero-Shot Text-To-Speech With Emotion Orthogonal LoRA

*Chenchen Wan, Minchuan Chen, Yan Shi, Peng Qi, Shaojun Wang, Jing Xiao*

[PDF](https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1798)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper introduces EO-LoRA and Flow-DGPO to achieve continuous, time-varying Valence-Arousal-Dominance (VAD) emotion control in zero-shot flow-matching text-to-speech without requiring massive emotional training corpora. The proposed approach outperforms prior baseline models on emotion similarity and prosody metrics while substantially reducing word error rates.

## Key contributions

- Proposed Emotion Orthogonal LoRA (EO-LoRA), injecting three VAD-aligned low-rank branches into backbone linear layers with an orthogonality regularizer to prevent dimension interference.
- Introduced Flow-DGPO, a preference-based reinforcement learning alignment stage optimized via candidate group comparison to enhance emotional controllability while preserving speaker similarity and intelligibility.
- Demonstrated strong zero-shot time-varying emotion transitions and cross-lingual emotion transfer using only limited emotional training data (~41.2 hours total).

## Problem

High-quality emotional text-to-speech models typically rely on coarse discrete emotion categories or massive proprietary emotion corpora, failing to support fine-grained intensity changes and intra-sentence time-varying transitions. Reference-based zero-shot prompting strategies entangle speaker identity, linguistic content, and emotional prosody into a single signal, making independent manipulation impossible. Existing methods like EmoCtrl-TTS require extensive data resources (over 60k hours), while standard LoRA updates conflate distinct emotional axes. Developing a data-efficient mechanism for fine-grained, independent, continuous, and time-varying emotional control remains an open challenge.

## Method

The framework builds upon a pretrained F5-TTS Diffusion Transformer (DiT) flow-matching backbone. To achieve continuous emotion control, EO-LoRA injects parallel low-rank adaptation branches into selected linear layers. Specifically, for each emotion dimension $k \in \{V, A, D\}$, a low-rank update is defined as $\Delta W_k = A_k B_k$ (where rank $r=16, \alpha=32$), and scaled at every time step $t$ by the corresponding scalar component from the frame-level VAD sequence $(V_t, A_t, D_t)$. Ablations indicate that injecting these branches into Attention Value and Output projections alongside Feed-Forward network linear layers yields optimal control stability. To prevent the three low-rank branches from learning correlated updates, an orthogonality regularizer computes cosine similarity via Frobenius inner products in an efficient trace form over $r \times r$ matrices, using a regularization weight $\lambda_{orth} = 0.05$.

In the second stage, Flow-DGPO aligns the model using a direct preference optimization formulation adapted for flow-matching. Given a conditioning context, the model samples a group of $G=8$ candidates, computes composite rewards balancing emotion similarity ($\lambda_{emo}=3$), speaker similarity ($\lambda_{spk}=1$), and Word Error Rate ($\lambda_{wer}=1$), and assigns GRPO-style normalized advantages. The policy is optimized using a preference margin objective against a frozen reference model with $\beta=20$ and 32 sampling steps, steering the conditional flow matching loss toward candidates that better express the target emotion trajectory without degrading intelligibility or speaker timbre.

## Experimental setup

The models are trained on EmoVoice-DB (40 hours, 20k English samples) and the English subset of ESD (1.2 hours per speaker across 5 speakers/emotions, ~12 hours total). Evaluations are performed on two benchmarks: EMO-Change (RAVDESS-derived sentence pairs featuring explicit intra-utterance emotion shifts) and JVNV S2ST (Japanese-to-English cross-lingual emotion transfer). Baselines include the fine-tuned F5-TTS backbone and reported scores for EmoCtrl-TTS. Automatic metrics consist of Whisper-large-v3 WER, WavLM-large speaker similarity (SIM-o), AutoPCP multilingual v2, emotion2vec Emo SIM, and predictor Aro-Val SIM. Subjective evaluations utilize 5-point Likert Scale MOS (SMOS, NMOS, EMOS) evaluated by 20 native English listeners on 20 utterances.

## Results

On the EMO-change test set, EO-LoRA combined with Flow-DGPO achieved an Emo SIM of 0.778, Aro-Val SIM of 0.914, AutoPCP of 3.60, and a low WER of 0.2%, outperforming the fine-tuned F5-TTS baseline (Emo SIM 0.693, Aro-Val SIM 0.837, AutoPCP 3.17, WER 7.1%). On the JVNV S2ST cross-lingual benchmark, EO-LoRA + Flow-DGPO reached an Emo SIM of 0.701 and Aro-Val SIM of 0.692, compared to 0.632 and 0.601 for the fine-tuned F5-TTS baseline. Ablations confirmed that removing the orthogonality regularizer ($L_{orth}$) degraded Emo SIM from 0.753 to 0.708 on EMO-change, and injecting into Q/K/V/O projections caused optimization instabilities compared to the optimal Value, Output, and Feed-Forward (v+o+ff) configuration.

| System | SIM-o ↑ | WER (%) ↓ | AutoPCP ↑ | Emo SIM ↑ | Aro-Val SIM ↑ |
|---|---|---|---|---|---|
| F5TTS (fine-tuned) | 0.694 | 7.1 | 3.17 | 0.693 | 0.837 |
| EO-LoRA w/o Lorth | 0.721 | 0.6 | 3.31 | 0.708 | 0.843 |
| EO-LoRA | 0.741 | 0.6 | 3.51 | 0.753 | 0.905 |
| EO-LoRA + Flow-DGPO | 0.751 | 0.2 | 3.60 | 0.778 | 0.914 |

## Limitations

The evaluation is restricted to English target speech and cross-lingual transfer from Japanese audio prompts, leaving multi-language scaling unexplored. The approach relies on an external pretrained wav2vec2 VAD predictor to extract frame-level continuous labels, meaning generation quality depends on the accuracy of the upstream emotion trajectory extractor. Compute requirements for group-sampling reinforcement learning (Flow-DGPO) are substantially higher than standard supervised fine-tuning.

## Why read this

Researchers and engineers working on expressive text-to-speech and flow-matching alignment should read this paper to learn how to inject multi-dimensional, continuous control signals into pretrained backbones via orthogonal low-rank subspaces and preference optimization.

## Code

- https://wancc-p.github.io/EoLoRA/

## Applications

Dynamic emotional text-to-speech for conversational AI assistants, video game character voice generation, audiobook narration with continuous affective shifts, and cross-lingual dubbing.

## Institutions / 機構

Shanghai Jiao Tong University, Ping An Technology, Shanghai Jiao Tong University Chongqing Artificial Intelligence Research Institute

## Related

- (link related pages by id as the wiki grows)
