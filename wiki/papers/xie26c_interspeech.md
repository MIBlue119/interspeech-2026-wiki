---
id: xie26c_interspeech
category: tts
labels: [generative-model]
institutions: ["Hong Kong University of Science and Technology", "Tencent"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1757
pdf: https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf
---

# VoiceTTA: Enhancing Zero-Shot Text-to-Speech via Reinforcement Learning-Based Test-Time Adaptation

*Tianxin Xie, Chenxing Li, Dong Yu, Li Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1757)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — VoiceTTA introduces a reinforcement learning-based test-time adaptation (TTA) framework that optimizes lightweight learnable prefixes via group relative preference optimization (GRPO) to improve zero-shot text-to-speech imitation on uncommon speaking styles, achieving a 0.64 speaker similarity while maintaining a 3.12 WER.

## Key contributions

- Proposes a reinforcement learning-based test-time adaptation (TTA) framework for zero-shot TTS models that operates using only seconds of target speaker audio during inference.
- Introduces auxiliary style rewards based on the coefficient of variation of F0 (F0-CV) and energy (Energy-CV) alongside speaker similarity (S-SIM) and an intelligibility reward (WER from Whisper).
- Employs group relative preference optimization (GRPO) without a value model to optimize a small set of learnable prefixes prepended to a flow matching-based DiT architecture.
- Demonstrates robust performance improvements across five challenging zero-shot scenarios (accented, children, slurred speech, Chinese sketches, and regional dialects).

## Problem

Pretrained zero-shot text-to-speech models are predominantly trained on large datasets from standard domains like podcasts and audiobooks, causing a severe domain shift when processing uncommon or corner-case speaking styles such as dialects, slurred speech, or crosstalk. Traditional speaker adaptation methods rely either on embedding extraction (which struggles with dramatic prosodic shifts) or full-model fine-tuning (which is data-hungry, computationally expensive, and requires large target-speaker corpora). This creates a bottleneck for rapidly personalizing or adapting deployed TTS systems to unseen user environments without extensive retraining datasets.

## Method

VoiceTTA adapts a pretrained flow matching-based zero-shot TTS model (specifically built on F5-TTS) at inference time by optimizing lightweight learnable prefixes via Group Relative Preference Optimization (GRPO). Given an unseen speech prompt and text input, the model samples $k=4$ diverse candidates by drawing the temperature $T$ from a uniform distribution $U(0.5, 1.5)$ across a diffusion Transformer (DiT) architecture. For each generated candidate, a composite reward function is computed, consisting of an intelligibility reward ($r_{\text{Intel}}$ based on Whisper-Large-V3 Word Error Rate) and three style rewards: F0 coefficient of variation ($r_{\text{F0-CV}}$), energy coefficient of variation ($r_{\text{Energy-CV}}$), and speaker embedding cosine similarity ($r_{\text{S-SIM}}$). 

Each reward type is normalized into $[0, 1]$ and combined with hyperparameters $\lambda_1=0.2$, $\lambda_2=0.2$, $\lambda_3=1.0$, and $\lambda_4=1.5$ to form the total reward $r_i$. Because the method adapts lightweight prefixes instead of the full model, the standard GRPO formulation is adapted by dropping the KL-divergence term and utilizing the underlying flow matching loss as a probability density proxy to compute the policy ratio term $\pi_\theta(o_i) / \pi_{\theta_{\text{old}}}(o_i)$. The adaptation process runs for $G=50$ GRPO steps with a learning rate of $5 \times 10^{-4}$ and a 5% warmup ratio using an NVIDIA RTX 6000 Ada GPU.

Only 4 learnable prefixes are prepended to the first layer of the DiT backbone, resulting in a minimal footprint of approximately 16 KB per adapted speaker. After the $G$ adaptation steps, the optimized prefixes guide final high-fidelity waveform generation via a vocoder. Crucially, prefixes are randomly reinitialized between different target utterances to prevent cross-sample update accumulation, rendering the approach fully compatible with rapid online deployment.

## Experimental setup

Evaluated on an internal dataset of 200 uncommon speech samples (90 accented, 40 children's, 30 slurred, 40 Chinese sketches) and 160 utterances spanning 8 Chinese dialects from KeSpeech. Compared against state-of-the-art baselines including CosyVoice, MaskGCT, Vevo, and base F5-TTS. Metrics include objective Word Error Rate (WER via Whisper-Large-V3) and Speaker Similarity (S-SIM), alongside subjective Naturalness MOS (N-MOS) and Similarity MOS (S-MOS) rated by 24 human evaluators.

## Results

VoiceTTA achieves an averaged WER of 3.12 and an S-SIM of 0.64, outperforming base F5-TTS (3.19 WER, 0.57 S-SIM), MaskGCT (3.26 WER, 0.62 S-SIM), CosyVoice (4.57 WER, 0.54 S-SIM), and Vevo (12.41 WER, 0.34 S-SIM). In subjective evaluations, it attains an averaged S-MOS of 3.27, edging out CosyVoice (3.25) and F5-TTS (3.07), while maintaining a competitive N-MOS of 3.35. Ablation studies confirm that relying solely on style rewards collapses intelligibility (WER jumping to 7.04), whereas using all four rewards harmonizes clarity and acoustic alignment.

| System | WER (\u2193) | S-SIM (\u2191) | S-MOS (\u2191) | N-MOS (\u2191) |
|---|---|---|---|---|
| CosyVoice [22] | 4.57 | 0.54 | 3.25 | **3.58** |
| MaskGCT [23] | 3.26 | 0.62 | 3.14 | 3.14 |
| Vevo [24] | 12.41 | 0.34 | 2.05 | 1.91 |
| F5-TTS [21] | 3.19 | 0.57 | 3.07 | 3.36 |
| VoiceTTA (Ours) | **3.12** | **0.64** | **3.27** | 3.35 |

## Limitations

The framework requires running 50 GRPO optimization iterations at inference time per reference prompt, introducing computational latency prior to synthesis. The evaluation scope is restricted primarily to Chinese dialects and curated uncommon English/Chinese styles, leaving open its scaling behavior on extremely low-resource languages with zero existing ASR supervision. Furthermore, extreme sampling temperatures during candidate generation can degrade phoneme clarity even with WER regulation.

## Why read this

Speech researchers and ML engineers looking to bridge the gap between static zero-shot TTS and online speaker adaptation without massive retraining corpora should read this paper to see how reinforcement learning test-time adaptation can be efficiently layered onto flow-matching models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized on-device text-to-speech assistants, real-time dialect conversion, and conversational agents handling diverse, noisy, or accented user voice prompts.

## Institutions / 機構

Hong Kong University of Science and Technology, Tencent

**Funding / 經費:** National Natural Science Foundation of China, Guangdong Basic and Applied Basic Research Foundation, Tencent AI Lab Rhino-Bird Program

## Related

- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — same problem · relatedness 2.6/3
- [Dual-Space Constrained Face-Based Zero-Shot Text-to-Speech Synthesis](wang26f_interspeech.md) — same problem · relatedness 2.6/3
- [CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis](zheng26c_interspeech.md) — same problem · relatedness 2.5/3
- [FlowTTS-GRPO: Online Reinforcement Learning with Multi-Objective Reward Optimization for Flow-Matching Based Text-to-Speech](wang26s_interspeech.md) — shared technique · relatedness 2.4/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
