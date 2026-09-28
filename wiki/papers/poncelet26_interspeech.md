---
id: poncelet26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1039
pdf: https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.pdf
---

# Speech Encoder Fusion for LLM-based Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1039)

**TL;DR** — This paper investigates fusing multiple pre-trained speech encoders in speech-aware large language models to improve automatic speech recognition across mono-, multilingual, and diarized settings with minimal computational overhead.

## Problem

Single-encoder speech LLMs rely heavily on the chosen acoustic encoder, yet different encoders possess complementary strengths that a single model fails to exploit. While combining multiple encoders using naive methods like concatenation has been attempted, advanced fusion strategies across varied linguistic, multilingual, and diarized settings remain underexplored. This gap matters because effectively fusing heterogeneous encoders can significantly boost recognition accuracy for rare words and difficult domains without needing heavy autoregressive decoding.

## Method

The authors explore five fusion architectures to combine parallel speech encoder outputs downsampled to 16.7 Hz: feature concatenation, a sigmoid gate, a multi-head attention (MHA) gate operating across encoder streams per frame, a positional Transformer encoder, and a temporal Transformer encoder with interleaved features. The framework uses Whisper-large-v3 paired with either a Dutch NeLF Conformer encoder (for Dutch) or a fine-tuned Wav2vec2 model (for English), projecting fused features via a 2-layer MLP into the LLM embedding space. Training utilizes QLoRA (rank 4) on base LLMs (Tweety-7B for Dutch, Llama-3.1-8B for English/multilingual) with an effective batch size of 128 for up to 5 epochs, resulting in 30M trainable parameters.

## Results

Experiments on Dutch CGN data show that the temporal Transformer fusion achieves the best Word Error Rate (WER) of 6.8% (clean) and 8.3% (other), improving over Whisper alone (8.3% clean, 11.5% other) and outperforming the concatenation baseline (7.2% clean, 9.0% other). For English LibriSpeech, the sigmoid gate fusion achieves a top WER of 2.8% (clean) and 5.5% (other), compared to baseline Whisper scores of 3.2% and 6.4%. In multilingual settings combining Dutch and English data, multi-head gating delivers the strongest performance gains over simple concatenation by facilitating language-dependent optimization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust multimodal speech recognition, multilingual transcription systems, or diarized speech applications using large language models.

## Limitations

Obtaining well-converged systems for heavily optimized English models like LibriSpeech required careful selection of simpler gating mechanisms rather than complex Transformer-based layers.

## Related

- (link related pages by id as the wiki grows)
