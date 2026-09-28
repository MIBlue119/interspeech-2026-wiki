---
id: xie26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1757
pdf: https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf
---

# VoiceTTA: Enhancing Zero-Shot Text-to-Speech via Reinforcement Learning-Based Test-Time Adaptation

*Tianxin Xie, Chenxing Li, Dong Yu, Li Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1757)

**TL;DR** — VoiceTTA introduces a reinforcement learning-based test-time adaptation (TTA) framework that optimizes lightweight learnable prefixes for zero-shot text-to-speech models using group relative preference optimization (GRPO). It improves style imitation and voice-matching on uncommon speech prompts (such as dialects and slurred speech) while preserving intelligibility, achieving a state-of-the-art speaker similarity of 0.64.

## Key contributions

- Proposes a test-time adaptation (TTA) framework for zero-shot TTS that optimizes lightweight learnable prefixes during inference using only a few seconds of target speech prompt.
- Formulates a composite reward function integrating coefficient-of-variation differences of F0 and energy, speaker cosine similarity (S-SIM), and ASR-derived Word Error Rate (WER) to balance acoustic stylization and clarity.
- Applies group relative preference optimization (GRPO) to flow-matching-based TTS models by treating the flow-matching loss as a probability proxy for policy updates without requiring a value network.
- Demonstrates consistent gains across five challenging test scenarios (accented, children, slurred, Chinese sketches, and dialects), storing only a lightweight 16 KB adapted prefix per speaker.

## Problem

Pretrained zero-shot text-to-speech models are predominantly trained on common, curated datasets like audiobooks and podcasts, leading to domain shift when encountering uncommon speaking styles, accents, regional dialects, or exaggerated prosody. Traditional speaker adaptation relies either on speaker embeddings (which struggle with dramatic stylistic variations) or full parameter fine-tuning (which demands large-scale target-speaker data and extensive compute). This creates a bottleneck for rapidly personalizing deployment systems to out-of-domain or corner-case prompts.

## Method

VoiceTTA operates as an online adaptation step during inference by prepending four learnable prefixes to the first DiT layer of a flow-matching-based backbone (specifically F5-TTS). Given an unseen speech prompt and text content, the model samples $k=4$ diverse candidate mel-spectrograms by drawing temperature parameters $T$ uniformly from $U(0.5, 1.5)$ to control stochasticity. These candidates are converted to waveforms via a vocoder, and four complementary rewards are computed: an F0-CV reward measuring pitch dynamics, an Energy-CV reward capturing energy contour variations, an S-SIM reward via cosine distance of speaker embeddings, and an intelligibility reward using a pretrained Whisper-Large-V3 model to compute Word Error Rate (WER).

The optimization leverages group relative preference optimization (GRPO), treating the prefixes as a stochastic policy and normalizing rewards into the range $[0, 1]$ with weighting coefficients $\lambda_1 = \lambda_2 = 0.2$ for F0/energy variations, $\lambda_3 = 1.0$ for S-SIM, and $\lambda_4 = 1.5$ for WER. Because flow-matching models directly regress mel-spectrograms rather than token probabilities, the authors use the negative flow-matching loss as a probability proxy ratio to compute policy updates without training an auxiliary value model. Adaptation runs for $G=50$ steps using an Adam-like setup with a learning rate of $5 \times 10^{-4}$ and a 5% warmup on an NVIDIA RTX 6000 Ada GPU. Prefixes are randomly reinitialized between different test samples to prevent cross-contamination.

## Experimental setup

Experiments are conducted on an internal dataset of 200 samples (90 accented, 40 children, 30 slurred, 40 Chinese sketches) plus 160 dialect utterances from KeSpeech covering eight Chinese variants. The backbone model is F5-TTS, compared against SOTA baselines CosyVoice, MaskGCT, and Vevo. Evaluation metrics include Word Error Rate (WER) via Whisper-Large-V3, Speaker Similarity (S-SIM) via speaker embedding cosine distance, and subjective MOS evaluations for naturalness (N-MOS) and style similarity (S-MOS) rated by 24 participants.

## Results

On the averaged five test-time scenarios, VoiceTTA achieves a WER of 3.12, outperforming F5-TTS (3.19), MaskGCT (3.26), CosyVoice (4.57), and Vevo (12.41). For speaker similarity, VoiceTTA reaches an S-SIM of 0.64, beating F5-TTS (0.57), MaskGCT (0.62), CosyVoice (0.54), and Vevo (0.34), alongside a top subjective S-MOS of 3.27. Ablations show that optimizing exclusively with style rewards (F0-CV + Energy-CV + S-SIM) maximizes S-SIM to 0.67 but severely harms intelligibility, driving WER up to 7.04, confirming that the WER reward is critical to maintain stability.

| System | WER ($\downarrow$) | S-SIM ($\uparrow$) | S-MOS ($\uparrow$) | N-MOS ($\uparrow$) |
|---|---|---|---|---|
| CosyVoice | 4.57 | 0.54 | 3.25 | 3.58 |
| MaskGCT | 3.26 | 0.62 | 3.14 | 3.14 |
| Vevo | 12.41 | 0.34 | 2.05 | 1.91 |
| F5-TTS (Baseline) | 3.19 | 0.57 | 3.07 | 3.36 |
| VoiceTTA (Ours) | 3.12 | 0.64 | 3.27 | 3.35 |

## Limitations

The framework requires running 50 steps of GRPO inference-time adaptation per speaker prompt, which increases latency before final generation compared to zero-shot inference. The evaluation is focused primarily on Chinese dialects and specialized internal stylized styles, leaving multi-lingual western dialect adaptation unexplored at scale. Furthermore, extreme high temperatures during candidate generation collapse intelligibility entirely.

## Why read this

Read this paper if you work on zero-shot TTS personalization or test-time adaptation and want to learn how to apply group relative preference optimization (GRPO) to flow-matching models without requiring large target corpora or value networks.

## Code

- https://voicetta.pages.dev/

## Applications

Personalized conversational agents, voice cloning for regional dialects and expressive uncommon styles, and interactive on-device speech assistants.

## Related

- (link related pages by id as the wiki grows)
