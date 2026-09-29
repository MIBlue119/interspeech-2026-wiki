---
id: han26f_interspeech
category: tts
labels: [generative-model]
institutions: ["Seoul National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3485
pdf: https://www.isca-archive.org/interspeech_2026/han26f_interspeech.pdf
---

# TAP-ETS: Time Aligned Phoneme Guiding for EMG-to-Speech Synthesis

*Dongyub Han, Injune Hwang, Jaejun Lee, Jiwon Lee, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/han26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3485)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — TAP-ETS introduces a time-aligned phoneme-guided framework for EMG-to-speech synthesis that explicitly conditions the decoder on frame-wise phoneme sequences via cross-attention, reducing Word Error Rate on the Gaddy silent EMG benchmark from 25.12% to 19.77%.

## Key contributions

- Proposes a time-aligned phoneme (TAP)-conditioned ETS architecture that generates mel-spectrograms directly guided by frame-wise phoneme embeddings via decoder cross-attention.
- Introduces TAP refinement strategies (Levenshtein-based and masking-based models) to redistribute corrected phoneme or text sequences over EMG frames while preserving temporal structure.
- Demonstrates seamless integration of external phoneme- and text-level correction modules (such as LMs and LLMs) into a unified EMG-to-speech synthesis pipeline without backbone retraining.

## Problem

Electromyography-to-speech (ETS) synthesis must recover acoustic information solely from noisy neuromuscular articulatory signals, making the mapping challenging. Prior approaches like Gaddy and Scheck treat phoneme classification merely as an auxiliary training loss, providing only a weak inductive bias that decouples linguistic guidance from acoustic generation. Consequently, high-level text- or phoneme-level semantic correction models cannot be easily incorporated at inference time without retraining the synthesis backbone, limiting overall intelligibility and controllability.

## Method

The TAP-ETS framework consists of two primary stages: ETS training with time-aligned phoneme conditioning and TAP refinement for semantic guidance during inference. Given a downsampled EMG sequence, an EMG encoder extracts hidden features used both to predict frame-wise phoneme logits via a linear projection and as queries (Q) in a decoder cross-attention mechanism. The keys (K) and values (V) are derived from the time-aligned phoneme encoder features, allowing the decoder to jointly condition mel-spectrogram generation (Y^) on articulatory EMG dynamics and linguistic phoneme constraints. Training optimizes a multi-objective loss combining an acoustic reconstruction term and an auxiliary phoneme cross-entropy loss, with loss weights set to lambda_mel = lambda_ph = 0.5.

During inference, external text-level or phoneme-level corrections from language models lack precise frame-level timings. To bridge this gap, TAP-ETS applies a two-step refinement strategy. First, a Levenshtein distance-based method aligns corrected token sequences within maximal non-silence islands while preserving and redistributing total island durations. Second, an independently trained frame-wise masking-based refinement model—built as a Transformer encoder-decoder trained on LibriSpeech data with masked/corrupted phoneme frames—mitigates duration allocation errors and EMG-induced confusions. The refined frame-wise sequence acts as the conditioning input to the generator, maintaining precise prosodic timing and alignment.

## Experimental setup

Experiments use the public Gaddy et al. EMG benchmark dataset containing paired voiced and silent recordings, utilizing the standard 198-sample validation set and 98-sample silent test set. The masking-based refinement model is trained on the LibriSpeech train-clean-100 split. Baselines include Gaddy and Scheck. Evaluation metrics comprise Accuracy, Phoneme Error Rate (PER), Character Error Rate (CER), and Word Error Rate (WER) using Whisper-medium ASR transcriptions, alongside HiFi-GAN as the shared vocoder across all systems.

## Results

TAP-ETS achieves state-of-the-art performance on the Gaddy silent EMG benchmark, lowering the Word Error Rate from 25.12% (Gaddy baseline) and 26.09% (Scheck baseline) down to 19.77%. Concurrently, Phoneme Error Rate drops to 15.59% and Character Error Rate to 11.15%, with Accuracy rising to 73.03%. Ablation studies demonstrate that combining Levenshtein-based and masking-based refinement (Lev+NN) yields superior results compared to either method in isolation (21.47% and 23.78% WER respectively), and that explicit frame-wise phoneme conditioning substantially outperforms merged-sequence conditioning (28.71% WER).

| System | Acc (↑) | PER (↓) | CER (↓) | WER (↓) |
|---|---|---|---|---|
| Gaddy [2] | 67.54 | 19.73 | 13.92 | 25.12 |
| Scheck [3] | 65.59 | 19.59 | 12.76 | 26.09 |
| TAP-ETS (ours) | 73.03 | 15.59 | 11.15 | 19.77 |

## Limitations

The framework relies on external language models to generate initial corrections for alignment and refinement, making overall performance dependent on the quality and robustness of those upstream correction models. The evaluation is currently restricted to the single Gaddy silent EMG dataset and English speech. Furthermore, significant temporal shifts or random duration perturbations heavily degrade synthesis quality, indicating strict dependency on precise frame-level temporal alignment.

## Why read this

Speech and ML researchers working on silent speech interfaces or biosignal-to-speech conversion should read this paper to learn how to inject explicit, time-aligned linguistic guidance into acoustic decoders via cross-attention. It offers a practical recipe for retrofitting text-level language model corrections into generative speech models without retraining the entire backbone.

## Code

- https://github.com/ongdyub/TAP-ETS

## Applications

Silent speech interfaces for communication without vocalization, covert communication systems, and assistive speech restoration for individuals with speech impairments.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, Advanced GPU Utilization Support Program

## Related

- (link related pages by id as the wiki grows)
