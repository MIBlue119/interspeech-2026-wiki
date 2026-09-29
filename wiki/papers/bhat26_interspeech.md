---
id: bhat26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Visvesvaraya National Institute of Technology Nagpur"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-135
pdf: https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.pdf
---

# A Gated Multi-Task Whisper Framework for Speech, Emotion, and Scene Understanding

*Manjiri Bhat, Ravindra B. Keskar*

[PDF](https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-135)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — A multi-task framework built on the Whisper-small encoder jointly performs ASR, speech emotion recognition, and acoustic scene classification using a VAD-inspired gating mechanism that cuts ASR hallucinations on non-speech inputs from over 96% down to under 1%.

## Key contributions

- Proposed a gated multi-task Whisper architecture featuring task-specific heads and a learnable three-way gating mechanism for conditional inference routing.
- Introduced ESAS-32K, a simulated multi-task dataset of 32,080 audio samples combining emotional speech and acoustic scenes at 5, 10, 15, and 20 dB SNRs.
- Demonstrated that inference-time conditional task activation effectively mitigates ASR looping and hallucination on silent or non-speech segments.
- Achieved competitive or superior performance against single-task baselines across VAD, SER, ASC, and ASR tasks using only the Whisper-small.en backbone.

## Problem

Foundation audio models like Whisper exhibit powerful generalizability across speech and ambient sound domains, yet they suffer from severe hallucination vulnerabilities when processing silent or non-speech segments. Deploying independent single-task models for assistive systems requires excessive memory and computational overhead in real-time environments. Furthermore, while standard architectures capture environmental context in shared representations, they fail to explicitly leverage scene or emotional cues to conditionally gate execution, highlighting the need for unified context-aware audio understanding frameworks.

## Method

The framework utilizes the Whisper-small.en encoder (2 convolutional layers followed by 12 Transformer blocks with a hidden size of 768) mapping 3000-frame, 80-bin log-Mel spectrograms to a hidden sequence of length 1500. Mean-pooling on encoder hidden states yields input embeddings for linear classification heads handling SER (8 emotion classes), ASC (5 scene classes), and a 3-way VAD gate (clean speech, noisy speech, non-speech). The ASR decoder consists of 12 Transformer layers. The training objective combines a VAD gate cross-entropy loss, ASR cross-entropy loss (omitted for un-transcribed data), and masked cross-entropy losses for SER and ASC, scaled by task weights where $\lambda_{\text{GATE}}$ is prioritized at 1.0 while other task weights are set to 0.5.

Training proceeds in two phases: first, the encoder, gate, SER, and ASC heads are optimized while the ASR decoder is frozen for 5 epochs; second, all components are jointly fine-tuned for an additional 5 epochs using the AdamW optimizer with an initial learning rate of $5 \times 10^{-5}$ and batch size of 4. During inference, a 3-way gate conditionally routes execution: clean speech triggers ASR + SER; non-speech triggers ASC only; noisy speech triggers ASR + SER + ASC. To prevent repetition loops on short 10-second clips, a no-repeat n-gram size of 3 with a repetition penalty of 1.3 is applied during decoding.

## Experimental setup

Evaluated on the newly introduced ESAS-32K dataset (32,080 samples split into 7,080 clean speech, 7,080 noisy speech, and 17,920 non-speech noise-only samples) derived from RAVDESS, TESS, SAVEE, and SPASS datasets, using a 70/10/20 train/validation/test split. Baselines include S-RF, Whisper-VAD, 2D-CNN, Inception-ResNet, Whisper-SER, Whisper-ASC, and raw Whisper-small. Metrics comprise accuracy, F1-score, Word Error Rate (WER), and hallucination rate. Experiments were executed on an Intel i9-9900K CPU, an NVIDIA Titan RTX GPU (24 GB, CUDA 12.2), and 128 GB RAM using PyTorch and Hugging Face.

## Results

Under the 70/10/20 train/val/test split with n-gram constraints, the gated multi-task model achieves a VAD gate accuracy of 99.98% (F1: 0.998), SER accuracy of 98.1% (F1: 0.977), ASC accuracy of 94.5% (F1: 0.943), ASR WER of 0.411%, and a non-speech hallucination rate of 0.014%. Compared to the ungated multi-task baseline under the same high-resource setting, the ungated model suffers from a catastrophic 96.11% ASR hallucination rate on non-speech inputs while dropping ASR WER to 34.412% and showing negligible differences in classification metrics.

Against single-task state-of-the-art baselines on ESAS-32K, the proposed framework outperforms Whisper-SER (98.2% vs 96.2% accuracy) and Whisper-small ASR (WER 23.315% vs 30.774%, and hallucination rate 0.40% vs 98.58% without n-gram limits), while matching or slightly trailing specialized vision-style architectures like Inception-ResNet for ASC (94.5% vs 97.4% accuracy). In low-resource ablation settings (10% training data), the model gracefully degrades, maintaining 98.97% VAD gate accuracy and 86.9% ASC accuracy, though ASR WER rises to 0.996% with n-gram limits.

| System / Condition | Gate Acc (%) | SER Acc (%) | ASC Acc (%) | ASR WER (%) | Hallucination Rate (%) |
|---|---|---|---|---|---|
| Ungated (70/10/20) | - | 97.5 | 93.2 | 34.412 | 96.11 |
| Proposed Gated (70/10/20) w/o ngram | 99.98 | 98.2 | 94.5 | 23.315 | 0.015 |
| Proposed Gated (70/10/20) w/ ngram | 99.98 | 98.1 | 94.5 | 0.411 | 0.014 |
| Proposed Gated (40/10/50) w/ ngram | 99.50 | 96.9 | 92.4 | 0.426 | 0.440 |
| Proposed Gated (10/10/80) w/ ngram | 98.97 | 90.3 | 86.9 | 0.996 | 1.112 |

## Limitations

The evaluation is restricted to fixed-length (10-second) English audio samples, limiting insights into variable-length or streaming performance. The acoustic scene classification scope is limited to 5 categories and tested on simulated synthetic mixtures rather than unconstrained in-the-wild recordings. Furthermore, multi-lingual capabilities and routing robustness under severe, non-stationary background noises remain unexplored.

## Why read this

Researchers and engineers building real-time edge speech assistants or smart home monitoring systems should read this paper to learn how architectural conditional routing can eliminate Whisper's costly and disruptive non-speech hallucinations without sacrificing multi-task performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive technologies, smart home monitoring systems, emergency alert dispatchers, and elder-care audio surveillance agents.

## Institutions / 機構

Visvesvaraya National Institute of Technology Nagpur

## Related

- (link related pages by id as the wiki grows)
