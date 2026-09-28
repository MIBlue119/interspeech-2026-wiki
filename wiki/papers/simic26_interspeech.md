---
id: simic26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2081
pdf: https://www.isca-archive.org/interspeech_2026/simic26_interspeech.pdf
---

# Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/simic26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/simic26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2081)

**TL;DR** — This paper integrates speaker and noise embeddings into an audio-visual speech recognition model, achieving relative Word Error Rate reductions of up to 13.4% compared to state-of-the-art baselines.

## Problem

Standard audio-visual speech recognition (AVSR) models struggle to maximize performance under fluctuating acoustic conditions because they lack explicit, scenario-specific guidance about speaker traits and environmental noise. Without leveraging auxiliary information regarding who is speaking and what background noise is present, models miss critical adaptation opportunities that could improve transcription robustness in adverse listening environments.

## Method

The system extends a pre-trained 74M-parameter Whisper base model with a 13M-parameter audio-visual (AV) fusion module using self-attention and chunked feature concatenation. Speaker adaptation utilizes X-Vectors or ECAPA-TDNN embeddings incorporated at the pre-decoder level, while noise adaptation relies on a custom attention-based noise classification and regression module (four encoder layers, eight heads) trained jointly with MSE loss for SNR and cross-entropy for noise category. Three adaptation integration strategies are evaluated: prefix concatenation, additional cross-attention layers, and channel-wise gated weighting via MLPs. Models are pre-trained on VoxCeleb2 and LRS3 via self-supervision and fine-tuned using a combination of embedding-level MSE and decoder cross-entropy losses.

## Results

Evaluated on the LRS3 benchmark across diverse noise categories (babble, music, natural, sidespeaker) and SNR levels ranging from -15dB to 30dB, noise adaptation strategies yield relative WER reductions of up to 3.48% (reaching 4.26% WER on All Mix compared to a 4.42% baseline), with improvements up to 5.1% at challenging -5dB conditions. Speaker adaptation via X-Vectors outperforms ECAPA-TDNN by 0.8% average WER and achieves a 3.2% gain over the baseline using cross-attention injection. Compared against state-of-the-art approaches such as AV-HuBERT, the proposed models achieve relative WER reductions of up to 13.4%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust speech recognition systems for multi-speaker environments, smart home devices, or automated transcription tools operating in heavy background noise.

## Limitations

Noise-adapted models showed minor performance drops compared to the baseline at high SNR (10dB) clean conditions, and gated weighting failed to improve speaker adaptation unlike its success in noise adaptation.

## Related

- (link related pages by id as the wiki grows)
