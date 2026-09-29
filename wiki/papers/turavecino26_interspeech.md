---
id: turavecino26_interspeech
category: tts
labels: [generative-model]
institutions: ["Cantina Labs"]
code: https://airtimemedia.github.io/IS2026-LearnableCFG/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-803
pdf: https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.pdf
---

# Learnable Classifier-Free Guidance Null Embeddings for Enhanced Controllable Speech Synthesis

*Biel Tura-Vecino, Yoach Lacombe, Julian Weber, Zbigniew Latka, Haitong Zhang, Logan Hart, Eren Golge*

[PDF](https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-803)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Replacing traditional fixed zero embeddings with learnable null embeddings in classifier-free guidance (CFG) for text-to-speech improves speaker similarity, stability, and robustness, while decoupling text and speaker guidance scales enables fine-grained attribute control.

## Key contributions

- Replaces static zero unconditional vectors with modality-specific learnable null embeddings optimized via end-to-end training, providing a robust in-domain unconditional baseline.
- Decouples CFG formulation to independently control speaker (ws) and text (wt) guidance weights at inference time.
- Demonstrates that learnable null embeddings withstand larger guidance scales (w >= 1.0) without suffering the objective metric divergence seen in fixed zero baselines.
- Uncovers key generation trade-offs: text guidance trades off stability for expressiveness, while speaker guidance trades off similarity for quality.

## Problem

Standard classifier-free guidance in text-to-speech typically relies on a fixed zero vector for unconditional generation during training and inference. Using a single zero vector fails to distinguish between orthogonal conditioning modalities like speaker identity and linguistic content, and predefined vectors often fall outside the model's training distribution, introducing gradient and numerical instabilities. Furthermore, dynamic attention masking at training time causes compilation overhead and hurts performance with compiled inference frameworks, making robust unconditional baselines critical.

## Method

The architecture combines a 0.6B parameter AR GPT Qwen3-based backbone with lightweight diffusion heads (next-token diffusion) and a causal transformer-based VAE encoding speech into 64-dimensional latents decoded to 48 kHz audio. The backbone is conditioned on BPE-compressed text tokens and speaker latents extracted from reference mel-spectrograms via a Perceiver encoder. The acoustic head is trained using binary cross-entropy for speech generation/stop modes, while diffusion heads are trained with an end-to-end MSE loss.

To implement CFG without custom dynamic attention masks or fixed zero vectors, the system introduces two separate learnable embeddings—s_bar for speaker and t_bar for text—initialized from a standard normal distribution and jointly optimized with the model. During training, conditions are dropped independently with a probability of 0.1, allowing the null embeddings to receive implicit gradient sharing from partially conditioned end-to-end states.

At inference time, independent attribute CFG extends standard guidance by utilizing separate weights ws and wt for speaker and text conditions respectively, allowing fine-grained steering along individual conditioning axes.

## Experimental setup

Evaluated on 65 unseen expressive speaker references synthesizing 2 sentences each (130 generated samples). Compared against open-source baselines including FishSpeech v1.4, Qwen3-TTS 0.6B, VoxCPM v1.5, and IndexTTS v2. Metrics include CER (Whisper v3-large), speaker similarity (ECAPA2 SECS, WavLM PRO, Pitch Mean Ratio), quality (PQ, UTMOS, Pitch Std, Speech Rate Ratio), and pairwise CMOS evaluated by 90 annotators.

## Results

The learnable null embedding baseline (w = 0.8) achieves a lower CER of 0.9 (compared to 1.2 for fixed zero embed and 7.3 for unguided), higher speaker similarity SECS of 0.817 (vs 0.755), and PRO of 0.862 (vs 0.807). When applying decoupled independent tuning (ws = 1.2, wt = 0.4), speaker similarity further improves to 0.841 SECS and 0.877 PRO.

In subjective CMOS tests, the learnable null embedding variants consistently outperformed the fixed zero embedding baseline, which scored negative CMOS values. The coupled learnable variant achieved higher perceived naturalness (0.130), while the tuned independent variant secured higher speaker similarity (0.178), demonstrating a perceptual trade-off between naturalness and strict speaker adherence.

| Model configuration | CFG guidance | CER ↓ | SECS ↑ | PRO ↑ | PMR ∼1 | UTMOS ↑ |
|---|---|---|---|---|---|---|
| FishSpeech v1.4 | - | 2.1 | 0.760 | 0.814 | 1.03 | 3.34 |
| Qwen3-TTS 0.6B | - | 6.9 | 0.743 | 0.814 | 0.95 | 3.50 |
| Baseline (w/o CFG) | w = 0 | 7.3 | 0.725 | 0.758 | 0.94 | 2.23 |
| Fixed Zero embed. | w = 0.8 | 1.2 | 0.755 | 0.807 | 0.88 | 3.22 |
| Learnable Null embed. | w = 0.8 | 0.9 | 0.817 | 0.862 | 0.95 | 2.82 |
| Learnable Null embed. | wt = 0.4, ws = 1.2 | 1.2 | 0.841 | 0.877 | 0.96 | 2.75 |

## Limitations

Evaluated on a relatively small test set of 130 samples across 65 speakers. Absolute perceptual quality scores (UTMOS/PQ) can drop slightly when maximizing speaker adherence via decoupled weighting, as highly expressive prosody is sometimes penalized by strict naturalness metrics. The method's effectiveness is demonstrated specifically on autoregressive GPT architectures with diffusion heads.

## Why read this

Speech researchers and engineers working on controllable generative TTS and classifier-free guidance will learn how to stabilize training and achieve fine-grained attribute steering via learnable null vectors.

## Code

- https://airtimemedia.github.io/IS2026-LearnableCFG/

## Applications

High-fidelity expressive text-to-speech, voice cloning, and fine-grained voice customisation systems requiring precise control over speaker identity and linguistic stability.

## Institutions / 機構

Cantina Labs

## Related

- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — same problem · relatedness 2.3/3
- [CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis](zheng26c_interspeech.md) — same problem · relatedness 2.3/3
- [Enhancing Flow Matching with A Unified Guidance Framework for Efficient and Robust Speech Synthesis](yu26b_interspeech.md) — same problem · relatedness 2.2/3
- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.2/3
- [Dynamic Prosody Prediction in LLM-based TTS for Improving Speaker Similarity](mou26b_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
