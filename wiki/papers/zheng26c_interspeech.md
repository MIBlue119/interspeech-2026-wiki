---
id: zheng26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1760
pdf: https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.pdf
---

# CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1760)

**TL;DR** — CtrlSpeech proposes a controllable text-to-speech framework using coarse-to-fine continuous diffusion representations to achieve precise phoneme-level prosody control alongside zero-shot voice cloning.

## Problem

Modern text-to-speech systems produce high naturalness and zero-shot voice cloning, but they entangle speaker identity, style, and prosody at the global sentence level. Consequently, users cannot explicitly manipulate local prosodic events like the pitch, loudness, or duration of individual words or phones while preserving the target speaker's timbre. This lack of fine-grained, temporally aligned control limits the practical utility of expressive speech generation in real-world editing and refinement tasks.

## Method

CtrlSpeech is built on a DiTAR backbone operating on continuous latent speech representations extracted via a VAE rather than discrete tokens. It models long-range sequence dependencies using a causal autoregressive transformer over acoustic patches of size 4, combined with a local diffusion transformer (LocDiT) that decodes target patches via flow-matching. Phone embeddings are augmented with discretized control signals for pitch (Mel-scaled f0 quantized into 128 bins), loudness (A-weighted decibel RMS quantized into 64 bins), and duration (phone-level frame counts). Global timbre is preserved via speaker embeddings extracted from reference audio using a Campplus model. Two model sizes are trained: a 0.1B variant (hidden size 512, 4-layer aggregation and DiT encoders) and a 0.6B variant (hidden size 1024, 6-layer encoders).

## Results

Pretrained on approximately 20,000 hours of English data from Emilia and GigaSpeech, the models are evaluated on LibriSpeech-PC test-clean, SeedTTS test-en, and LJSpeech. On the LJSpeech test set for fine-grained controllability, CtrlSpeech (0.6B) achieves a pitch RMSE of 6.78 Hz and a loudness RMSE of 4.39 dB when conditioned on full control signals, significantly outperforming text-only baselines and prior sketch-based models like DrawSpeech. The system maintains competitive zero-shot intelligibility and speaker similarity while enabling explicit prosodic manipulation.

## Code

- https://www.modelscope.cn/models/iic/CosyVoice-300M/file/view/master/campplus.onnx

## Applications

Speech engineers, content creators, and developers building voice assistants or dubbing tools who need explicit local control over pitch, loudness, and pacing without losing target speaker identity.

## Related

- (link related pages by id as the wiki grows)
