---
id: ye26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2284
pdf: https://www.isca-archive.org/interspeech_2026/ye26b_interspeech.pdf
---

# Refining Emphasis Control in Flow-Matching TTS via Preference Alignment and Reinforcement Learning

[PDF](https://www.isca-archive.org/interspeech_2026/ye26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2284)

**TL;DR** — This paper extends F5-TTS with a dedicated emphasis encoder and a three-stage optimization framework (SFT, DPO, and Flow-CPS reinforcement learning) to achieve fine-grained, high-intensity emphasis control while preserving natural prosody.

## Problem

Neural speech synthesis lacks fine-grained emphasis control, which causes generated speech to sound prosodically flat, increases listener cognitive load, and creates semantic ambiguity. Existing methods either rely on over-simplified, rule-based acoustic feature manipulation that sounds robotic, or depend on text-based instruction-tuning data that is scarce and labor-intensive to annotate.

## Method

The architecture extends F5-TTS by adding a 4-layer Transformer-based Emphasis Encoder that processes text embeddings alongside rotary positional encodings and residual connections to produce emphasis-aware representations. These representations are element-wise added to text embeddings for tokens marked with emphasis tags and fed into the DiT backbone as conditioning signals. Optimization proceeds in three progressive stages: Supervised Fine-Tuning on 2.5 hours of manually annotated Chinese speech, Direct Preference Optimization (DPO) using 800 preference pairs ranked via the Wavelet Prosody Toolkit (WPT), and online reinforcement learning via Flow-CPS (a variant of FlowGRPO) using WPT-computed prominence scores as rewards and a coefficients-preserving sampling strategy.

## Results

Evaluated on Chinese test sets, the final F5-TTS-grpo model achieves superior prominence scores and subjectively outperforms the CosyVoice baseline in Emphasis MOS (E-MOS) and Naturalness MOS (N-MOS). On noun emphasis generalizability tests, F5-TTS-grpo reaches an accuracy of 63.00% compared to 37.00% for DPO and 22.00% for CosyVoice, with a prominence score of 1.28. Word Error Rate (WER) and Speaker Similarity (SIM) remain stable across training stages at roughly 1.62-1.63% and 0.71-0.72 respectively, demonstrating that strong prosodic modulation does not degrade intelligibility or speaker identity.

## Code

- https://thuhcsi.github.io/interspeech2026-F5Emphasis

## Applications

Text-to-speech systems requiring expressive, human-like human-computer interaction, voice assistants, and audiobook narration where specific semantic focus needs to be highlighted.

## Limitations

Emphasis control relies on initial coverage and generalized representation of words in training data, which can occasionally challenge performance on underrepresented lexical categories without advanced RL alignment.

## Related

- (link related pages by id as the wiki grows)
