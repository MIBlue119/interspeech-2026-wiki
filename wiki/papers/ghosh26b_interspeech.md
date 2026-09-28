---
id: ghosh26b_interspeech
category: speech-synthesis
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-518
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.pdf
---

# LipAdapter: Text-to-Video Alignment is All You Need for Lip-to-Speech

*Souvik Ghosh, C. V. Jawahar, Vinay Namboodiri*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-518)

**TL;DR** — LipAdapter is a modular framework that converts a frozen pre-trained Text-to-Speech model into a lip-synchronized speech generator using a lightweight text-to-video alignment module, achieving state-of-the-art results on English benchmarks while using 15x less training data (30 hours) than prior end-to-end approaches.

## Key contributions

- Introduces LipAdapter, a modular framework that bridges frozen Visual Speech Recognition and Text-to-Speech models using a novel text-to-video monotonic alignment network.
- Achieves competitive or superior speech quality, Word Error Rate, and lip-sync accuracy on LRS3 and MultiVSR using only 30 hours of training data compared to 430+ hours for prior end-to-end models.
- Demonstrates stable zero-shot multilingual transfer to unseen languages (French, German, Spanish, Portuguese) without requiring task-specific retraining.
- Provides extensive ablations showing compatibility with alternative length-regulated TTS backbones like FastSpeech2 and robustness down to 3 hours of training data.

## Problem

Prior end-to-end lip-to-speech systems directly map raw video frames to audio waveforms, suffering from poor out-of-dataset generalization and subpar speech naturalness because their audio components are trained on visual-speech datasets lacking clean TTS speech samples. Alternative approaches that condition speech generation pipelines on both visual and textual guidance achieve lower word error rates but still train their speech components from scratch. Furthermore, these pipelines typically demand over 430 hours of training data, creating a heavy bottleneck for low-resource languages and future research. LipAdapter solves this by avoiding training speech generators from scratch, instead adapting off-the-shelf, high-quality, pre-trained TTS models via an efficient information bottleneck.

## Method

LipAdapter processes a silent video of T frames through a pretrained VTP visual feature extractor to obtain lip embeddings in R^{T x D}, while XPhoneBERT provides multilingual phoneme embeddings. Lip embeddings are linearly projected to the phoneme dimension, upsampled to match speech temporal resolution, and projected into a shared attention space via three nonlinear convolutional blocks for queries and keys. Alignment energies are computed with temperature scaling and an external diagonal alignment prior. 

During training, a two-stage approach is used: for the first 20K steps, soft alignment is applied via matrix multiplication to produce temporally weighted text embeddings, keeping the audio reconstruction loss fully differentiable through the attention mechanism. After 20K steps, Monotonic Alignment Search (MAS)—a dynamic programming algorithm calculating cumulative log probabilities—is used to derive hard binary monotonic paths and extract phoneme durations. The alignment module is trained using a monotonic alignment likelihood objective inspired by CTC alongside a path-concentration regularizer.

The lip-aligned phoneme representations are fed into a state-of-the-art base TTS model, ZMM-TTS, which comprises Text2Vec and Vec2Wav modules. Text2Vec maps the phonemes to discrete code indices from a pretrained XLSR-53 model, and Vec2Wav transforms these discrete representations into the final audio waveform. The alignment module and Text2Vec are lightly fine-tuned while the core TTS backbone remains frozen.

## Experimental setup

Evaluated on the LRS3 in-the-wild English dataset and 500 samples from the MultiVSR dataset for out-of-distribution and zero-shot multilingual assessment. Compared against video-only and video+text baselines including VCA-GAN, Multitask L2S, Intelligible L2S, DiffV2S, V2SFlow, Accurate L2S, and LipVoicer. Metrics include Word Error Rate (WER), Lip-Sync Error Confidence (LSE-C), Lip-Sync Error Distance (LSE-D), Short-Time Objective Intelligibility (STOI-Net), DNSMOS, and human Mean Opinion Scores (MOS). Trained on 30 hours of LRS3 videos.

## Results

On the LRS3 test set, LipAdapter achieves a competitive WER of 21.2% (matching or beating models requiring 430+ hours of data like LipVoicer's 21.4% and Accurate L2S's 23.1%), an LSE-C of 6.165, an LSE-D of 8.250, STOI of 0.944, and DNSMOS of 3.13 while using only 30 hours of training data. On MultiVSR zero-shot tests, it achieves a WER of 34.44% and LSE-C of 7.145, outperforming video-only flows that suffer severe WER degradation out-of-distribution (e.g., V2SFlow jumps to 61.09% WER). Ablation studies show that freezing the TTS backbone and training only the aligner yields a competitive 23.6% WER, and training with as little as 3 hours of data still yields a viable 27.4% WER. The primary failure mode occurs on very short video clips under 1 second, where limited temporal context degrades LSE-C synchronization confidence.

| System | Training Hours | WER (%) ↓ | STOI-Net ↑ | DNSMOS ↑ | LSE-C ↑ | LSE-D ↓ |
|---|---|---|---|---|---|---|
| Intelligible [3] | 430 | 29.8 | 0.90 | 2.85 | 7.732 | 6.761 |
| Diff V2S [2] | 430 | 39.2 | 0.931 | 3.13 | 7.019 | 7.463 |
| V2SFlow [1] | 430 | 28.5 | 0.948 | 3.24 | 7.752 | 7.015 |
| Accurate L2S [5] | 660 | 23.1 | 0.77 | 2.79 | 7.886 | 6.850 |
| LipVoicer [4] | 430 | 21.4 | 0.92 | 3.11 | 5.803 | 8.637 |
| LipAdapter (Ours) | 30 | 21.2 | 0.944 | 3.13 | 6.165 | 8.250 |

## Limitations

The framework relies on a multi-stage pipeline, meaning errors can accumulate from upstream VSR transcriptions, text-to-video misalignments, or imperfect ASR evaluations. Performance drops on very short utterances under 1 second due to insufficient temporal context for reliable monotonic alignment estimation. Zero-shot multilingual evaluation is tested without acoustic fine-tuning, leaving accent and prosody transfer bounds dependent on the base TTS model's underlying multilingual coverage.

## Why read this

Speech researchers and engineers building video-guided speech synthesis or dubbing tools should read this to learn how to efficiently adapt powerful pretrained TTS models using lightweight alignment modules instead of training massive end-to-end systems from scratch.

## Code

- https://lipadapter.github.io/

## Applications

Assistive technologies for speech impairments, communication in noisy environments, video dubbing, and speech restoration in silent or corrupted archival videos.

## Related

- (link related pages by id as the wiki grows)
