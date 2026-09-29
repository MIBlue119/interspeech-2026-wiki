---
id: zheng26_interspeech
category: speech-coding
labels: [multilingual, generative-model]
institutions: ["University of Science and Technology of China", "University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-806
pdf: https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.pdf
---

# CycleCodec: Distillation-Free Factorized Neural Speech Codec via Cycle-Consistent Speaker Swapping

*Rui-Chen Zheng, Nicholas Sanders, Jinzuomu Zhong, Yang Ai, Zhen-Hua Ling, Korin Richmond*

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-806)

**Category:** `speech-coding` · **Labels:** `multilingual`, `generative-model`

**TL;DR** — CycleCodec is a distillation-free, factorized neural speech codec trained from scratch that uses cycle-consistent speaker swapping to eliminate the need for pretrained teacher models, outperforming distillation-free baselines across in-domain and unseen languages.

## Key contributions

- Proposes cycle-consistent speaker swapping as a codec-internal self-supervision signal that suppresses cross-stream leakage during speaker-conditioned generation without requiring parallel data or external teachers.
- Introduces architectural upgrades for disentanglement, including a reduced codebook size (256 entries) to limit temporal capacity and a query-based Transformer aggregator with an auxiliary speaker contrastive loss.
- Validates robustness under a rigorous train-test language mismatch setting, training exclusively on English LibriTTS and testing zero-shot on out-of-domain Mandarin and Vietnamese.
- Demonstrates superior single-step and iterative voice conversion stability, achieving lower Word Error Rates (WER) and higher Perceptual Evaluation of Speech Quality (PESQ) than distillation-free baseline TiCodec.

## Problem

Factorized neural speech codecs typically rely on external distillation from pretrained ASR models (e.g., CTC loss on phonemes in FACodec) or SSL models (e.g., WavLM in LSCodec and FreeCodec) to separate time-varying content from global speaker traits. However, this dependency fails for low-resource, non-codified, or indigenous languages where reliable teacher models or transcripts do not exist, and representation shift causes severe degradation under language mismatch. While teacher-free models like TiCodec exist, they lack robust speaker-content controllability and exhibit residual cross-stream leakage, highlighting the need for a distillation-free factorized codec driven entirely by internal constraints.

## Method

CycleCodec builds on an encoder-decoder backbone similar to TiCodec, factoring speech into a time-varying sequence (quantized temporal features q) and an utterance-level global embedding (g). To prevent the temporal stream from absorbing speaker attributes, the codebook size is restricted to 256 entries (operating at a bitrate of 0.6 kbps), and global speaker modeling is enhanced using a query-based Transformer aggregator containing N=8 learnable query tokens processed across L=4 self-attention blocks, paired with an auxiliary speaker contrastive loss (L_spk) operating on l2-normalized embeddings.

To enforce disentanglement and prevent content drift during generation, CycleCodec introduces a two-stage training scheme utilizing cycle-consistent speaker swapping. In the fine-tuning stage, the encoder and quantizer are frozen while the decoder undergoes two forward passes on non-parallel batch pairs. The swap forward pass feeds source temporal features (q_src) and target speaker embeddings (g_tgt) into the decoder to synthesize a swapped utterance (y_swap). The cycle forward pass re-analyzes y_swap through the encoder to recover q_swap and g_swap, optimizing feature-level similarity losses (L_swap^g, L_swap^q) and a mel-spectrogram reconstruction cycle loss (L_cycle^mel) that decodes y_cycle using q_swap and g_src to reconstruct the original source speech.

The final fine-tuning objective balances the original codec loss, speaker contrastive loss, swap feature losses, and the mel-spectrogram cycle loss using hyperparameter weights. This end-to-end internal constraint forces the decoder to produce faithful audio under arbitrary speaker conditions without ever relying on linguistic or acoustic teacher models.

## Experimental setup

The model is trained on the 24 kHz LibriTTS corpus. Evaluation is conducted across three datasets: LibriTTS (English, in-domain, 500 test pairs), Seed-TTS-ZH (Mandarin, zero-shot, 2018 pairs), and VieNeu-TTS-140h (Vietnamese, zero-shot, 500 pairs). Baselines include TiCodec (single-codebook variant) and LSCodec (50 Hz configuration using pretrained WavLM teacher supervision as an upper bound). Metrics include PESQ, STOI, voiced/unvoiced (V/UV) F1, ASR Word Error Rate (WER using Whisper-large-v3 and Paraformer-zh), and speaker similarity via Resemblyzer and WavLM cosine distances.

## Results

On LibriTTS reconstruction, CycleCodec achieves a PESQ of 1.868, STOI of 0.878, V/UV F1 of 0.929, and a WER of 11.248%, outperforming TiCodec across all metrics (TiCodec: 1.628 PESQ, 0.853 STOI, 0.914 V/UV, 15.137% WER) while trailing LSCodec's supervised WER (7.222%). Under zero-shot voice conversion to Mandarin (Seed-TTS-ZH), CycleCodec achieves a Resemblyzer speaker similarity of 0.764, WavLM similarity of 0.881, and a WER of 13.488%, significantly outperforming TiCodec (0.710 Res., 0.835 Wav., 19.627% WER) and beating LSCodec's content preservation (LSCodec WER: 15.426%). Ablations confirm that removing cycle-consistent swapping (-Cycle) causes the largest surge in content degradation, while removing the small codebook or speaker contrastive loss (-L_spk) degrades speaker similarity. CycleCodec does not win against teacher-supervised LSCodec in clean in-domain ASR WER or absolute zero-shot speaker similarity on perfectly matched high-resource English data.

| Dataset | System | PESQ | STOI | V/UV F1 | WER (%) |
|---|---|---|---|---|---|
| LibriTTS | LSCodec | 1.774 | 0.716 | 0.879 | 7.222 |
| LibriTTS | TiCodec | 1.628 | 0.853 | 0.914 | 15.137 |
| LibriTTS | CycleCodec | 1.868 | 0.878 | 0.929 | 11.248 |
| Seed-TTS-ZH | LSCodec | 1.578 | 0.701 | 0.859 | 9.147 |
| Seed-TTS-ZH | TiCodec | 1.464 | 0.796 | 0.882 | 17.339 |
| Seed-TTS-ZH | CycleCodec | 1.620 | 0.822 | 0.904 | 12.614 |

## Limitations

The approach is evaluated primarily on high- and mid-resource languages (English, Mandarin, Vietnamese) with standard evaluation toolchains, meaning real non-codified or unwritten indigenous languages still lack native ASR verification metrics. The codec bitrate is fixed at 0.6 kbps using a single codebook of size 256, which may constrain ultra-high-fidelity acoustic capture compared to multi-codebook RVQ codecs. Furthermore, training relies on clean multispeaker read speech corpora (LibriTTS) and assumes access to basic utterance-level speaker metadata tags for the contrastive loss.

## Why read this

Speech researchers and audio engineers working on low-resource speech generation, voice conversion, or speech language models who need a factorized neural codec without depending on heavy pretrained SSL/ASR teacher models should read this paper to learn how internal cycle-consistency can replace external distillation.

## Code

- https://zhengrachel.github.io/CycleCodec/

## Applications

Cross-lingual and zero-shot voice conversion, controllable speech synthesis, and discrete tokenization for low-resource speech language models.

## Institutions / 機構

University of Science and Technology of China, University of Edinburgh

**Funding / 經費:** National Natural Science Foundation of China, Speech Generation for Indigenous Language Education project

## Related

- (link related pages by id as the wiki grows)
