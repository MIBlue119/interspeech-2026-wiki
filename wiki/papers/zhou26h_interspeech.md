---
id: zhou26h_interspeech
category: tts
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["Tsinghua University", "Inner Mongolia University", "Tencent"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2280
pdf: https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.pdf
---

# FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech

*Shuoyi Zhou, Yixuan Zhou, Peiji Yang, Yifan Hu, Yicheng Zhong, Zhisheng Wang, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2280)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — FineCombo-TTS is a unified controllable text-to-speech framework that combines reference speech and text descriptions via a Conditional Flow Matching (CFM) Speech Variance Predictor and a custom dataset (FineEdit) to achieve precise attribute editing, reaching an emotion control accuracy of 85.0% and outperforming baselines in instruction following.

## Key contributions

- Proposes FineCombo-TTS, a controllable TTS architecture jointly leveraging reference speech and text descriptions for precise attribute manipulation.
- Introduces a CFM-based Speech Variance Predictor operating in a unified acoustic attribute latent space to model fine-grained reference-to-target attribute transformations without explicit disentanglement.
- Constructs FineEdit, a large-scale paired dataset of 〈source speech, control description, target speech〉 triplets covering prosody, emotion, and timbre variations.

## Problem

Existing controllable TTS methods fall into three segregated categories: reference-speech-based approaches (which suffer from lack of flexibility), text-description-based approaches (which fail to capture fine-grained acoustic nuances), and recent joint methods that loosely couple timbre extraction and global style text overwriting. Furthermore, current datasets only contain isolated speech-text pairs describing absolute properties rather than relative variations, making it difficult to learn attribute transformations without explicit entanglement that introduces information leakage or structural redundancy.

## Method

The framework consists of three core components: a Speech Attributes Extractor, a Speech Variance Predictor, and a TTS backbone. The Speech Attributes Extractor concatenates a pretrained FACodec speaker timbre embedding ($E_t$) and a Mel-Style residual style embedding ($E_s$) into a unified attribute embedding $E_a = \text{concat}(E_t, E_s)$ without explicit factor disentanglement. The CFM-based Speech Variance Predictor takes text descriptions encoded via a pretrained google/flan-t5-small model cross-attended into sentence representations $S$, alongside source speech attributes $E_a$ ($x_0$) and target attributes $E_a'$ ($x_1$), modeling velocity fields via a 1D UNet using linear interpolation and classifier-free guidance (CFG) on both text and descriptions during training and inference (with guidance scales $\alpha = \beta = 2$).

The TTS backbone is a 12-layer decoder-only Transformer codec language model that utilizes Descript Audio Codec (DAC) tokens. It incorporates text token inputs $E_{txt}$ and injects target attribute embeddings $E_a'$ via cross-attention within each Transformer block, predicting multi-layer acoustic tokens autoregressively using a delay pattern. Training occurs in two stages: Stage 1 pre-trains on MLS (45k hours) and LibriTTS-R (585 hours), then fine-tunes on EmoVoice-DB (45 hours) and TextrolSpeech (330 hours) for emotion modeling with a batch size of 32 for 250K steps (lr $1\times 10^{-4}$); Stage 2 trains the Speech Variance Predictor separately for 140K steps (lr $1\times 10^{-4}$) using 236K text-speech pairs and ~600K pairs per FineEdit subset on 8$\times$ NVIDIA A100 GPUs.

## Experimental setup

Models are evaluated using FineEdit test splits and unseen data. Datasets include Multilingual LibriSpeech (MLS, 45k hours), LibriTTS-R (585 hours), EmoVoice-DB (45 hours), TextrolSpeech (330 hours), and the FineEdit subsets (634.9k prosody pairs, 80M emotion pairs, 16.4M timbre pairs). Baselines compare against a re-implemented open-source SOTA model, VoxInstruct-Joint. Metrics include MOS-S (speaker similarity), MOS-I (instruction following), MOS-P (prosodic consistency), WER (via openai/whisper-large-v3), SECS (via microsoft/wavlm-base-plus-sv), FPC (pitch correlation), and Emotion-A/S (via emotion2vec-plus-large).

## Results

On prosody control, FineCombo-TTS achieves a MOS-S of 4.04, MOS-I of 4.05, and a Controlled Accuracy of 98.00% for speed and 93.33% for pitch, significantly outperforming VoxInstruct-Joint (MOS-I 3.26, Controlled Accuracy 91.35% and 63.81%) while cutting uncontrolled variations down to 14.62 (speed) and 6.71 (pitch). For emotion control, it reaches 85.0% emotion accuracy compared to VoxInstruct's 47.0%, while maintaining a strong SECS of 66.56 and dropping WER down to 11.22. Ablations on classifier-free guidance (CFG) demonstrate that applying description CFG boosts emotion accuracy from 81.0% to 86.0%, and text CFG reduces WER from 14.17 to 8.82.

| System | MOS-I (Prosody) | Emotion Accuracy (%) | MOS-I (Timbre) | WER (%) |
|---|---|---|---|---|
| VoxInstruct-Joint | 3.26 | 47.00 | 3.32 | 19.24 |
| FineCombo-TTS | 4.05 | 85.00 | 3.75 | 18.59 |

## Limitations

The current scope is limited to English speech due to the construction of the FineEdit dataset subsets. The generation pipeline relies heavily on synthesized pseudo-pairs for prosody via FFmpeg adjustments and automated groupings for timbre/emotion subsets, which may propagate algorithmic noise. Furthermore, high CFG strengths needed for optimal instruction following occasionally introduce minor degradations in speaker similarity (SECS).

## Why read this

Researchers and engineers working on controllable speech generation and zero-shot voice cloning should read this paper to see how framing attribute editing as a relative conditional flow matching problem over paired datasets bypasses the pitfalls of explicit style disentanglement.

## Code

- https://thuhcsi.github.io/interspeech2026-FineCombo-TTS

## Applications

Fine-grained controllable voice cloning, emotional text-to-speech narration, and interactive voice assistants requiring real-time stylistic alterations via natural language prompts.

## Institutions / 機構

Tsinghua University, Inner Mongolia University, Tencent

**Funding / 經費:** National Natural Science Foundation of China, National Social Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
