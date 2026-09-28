---
id: zheng26_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-806
pdf: https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.pdf
---

# CycleCodec: Distillation-Free Factorized Neural Speech Codec via Cycle-Consistent Speaker Swapping

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-806)

**TL;DR** — CycleCodec is a distillation-free factorized neural speech codec that employs cycle-consistent speaker swapping and architectural capacity constraints to achieve robust content-speaker disentanglement without relying on pretrained teacher models.

## Problem

Existing factorized neural speech codecs rely on distillation from pretrained automatic speech recognition (ASR) or self-supervised learning (SSL) teacher models to separate content from speaker representations. However, this dependency limits their performance on unseen languages and makes them entirely infeasible for low-resource or indigenous languages lacking reliable teacher models. Furthermore, alternative distillation-free codecs like TiCodec lack adequate controllability, leading to residual cross-stream leakage and content drift during speaker-conditioned generation.

## Method

CycleCodec builds upon the TiCodec encoder-decoder backbone by factorizing speech into a time-varying discrete sequence (content/prosody) and an utterance-level continuous embedding (speaker traits). To eliminate cross-stream leakage, it reduces the quantizer codebook size to 256 (0.6 kbps bitrate) to restrict temporal capacity, and introduces a query-based Transformer aggregator (8 learnable query tokens over 4 Transformer layers) combined with an auxiliary speaker contrastive loss. The core training innovation is a two-stage cycle-consistent speaker swapping mechanism: during fine-tuning (with frozen encoder/quantizer), source content codes are combined with a target speaker embedding to synthesize swapped speech, which is then re-encoded and swap-back reconstructed. This cycle uses a combination of global speaker cosine similarity loss, temporal feature mean-squared error loss, and mel-spectrogram cycle reconstruction loss. The model is trained on the 24 kHz LibriTTS corpus.

## Results

Evaluated on in-domain English (LibriTTS) and zero-shot unseen languages Mandarin (Seed-TTS-ZH) and Vietnamese (VieNeu-TTS), CycleCodec outperforms the distillation-free baseline TiCodec in reconstruction quality, speaker similarity, and Word Error Rate (WER). On LibriTTS reconstruction, CycleCodec achieves a PESQ of 1.868, STOI of 0.878, V/UV F1 of 0.929, and WER of 11.248%. For zero-shot voice conversion, CycleCodec maintains lower WER and competitive speaker similarity compared to teacher-guided models (like LSCodec) which suffer severe content degradation on unseen languages. Progressive ablations demonstrate that cycle-consistent swapping is the primary driver for preventing content drift, while the small-codebook constraint and contrastive loss optimize speaker similarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on controllable speech generation, voice conversion, and speech language models, particularly for low-resource or multilingual settings where pretrained SSL/ASR teacher models are unavailable.

## Related

- (link related pages by id as the wiki grows)
