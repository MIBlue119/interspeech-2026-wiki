---
id: yan26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1278
pdf: https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.pdf
---

# Probing and Mitigating Hallucinations in Speech-augmented Language Models for Automatic Speech Recognition via Small Language Models

*Bi-Cheng Yan, Jhih-Rong Guo, Fu-An Chao, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1278)

**Category:** `asr`

**TL;DR** — AudioSLM is a compact speech-augmented language model framework designed to mitigate ASR hallucinations by introducing CTC-based temporal gating and cross-modal attention layers, dramatically reducing hallucination error rates from 52.01% to 8.69% on LibriSpeech dev-clean.

## Key contributions

- Identifies via causal mediation analysis that multi-head self-attention modules are the primary source of SLM hallucinations, driven by an excessive attention bias toward textual tokens rather than audio.
- Proposes a CTC-Gated input module that leverages CTC alignment logits with a depth-wise convolution and SwiGLU gating mechanism to provide reliable temporal cues and filter redundant acoustic frames.
- Introduces cross-attention layers inserted between MHA and MLP blocks in the backbone LLM to enforce fine-grained cross-modal alignment between audio tokens and linguistic representations.
- Demonstrates robust scaling behavior across SmolLM2 backbones (135M, 360M, 1.7B) while outperforming traditional end-to-end and LLM-guided ASR systems on LibriSpeech noisy subsets.

## Problem

Speech-augmented language models (SLMs) integrate speech encoders with LLMs to perform transcription and speech understanding, but they frequently suffer from hallucinations where generated tokens diverge from spoken inputs. Prior analysis in vision-language models shows that such errors stem from backbone language models over-relying on linguistic priors and context tokens while sidelining input modality information. In ASR, this manifests as fabricated insertion errors that compromise the reliability and practical utility of SLMs, a phenomenon that has remained largely underexplored compared to text or vision domains.

## Method

AudioSLM builds upon a modular architecture consisting of a Whisper-large-v2 speech encoder (12 layers, 20 heads, 1280 hidden dimension), a 3-layer convolutional connector with a subsampling rate of 4, and a SmolLM2 backbone. To inject temporal and alignment cues, a Connectionist Temporal Classification (CTC) module is placed on top of the connector to produce logit features. These logits are passed through a CTC-Gated module containing a 3x1 depth-wise convolution, linear projections, and a Swish-Gated Linear Unit (SwiGLU) to dynamically gate and refine the audio token sequence via element-wise multiplication.

At the neural architectural level, cross-attention layers are inserted between the multi-head self-attention (MHA) and multi-layer perceptron (MLP) blocks within the Transformer layers of the small language model. During training, the MHA computes self-attention over previous tokens, while the cross-attention layer uses these representations as queries to attend directly to the underlying audio tokens, ensuring the model remains grounded in the acoustic input. Only the cross-attention layers and adapter parameters are updated during training, while the pretrained LLM backbone is frozen, using a cosine learning rate scheduler with a peak of 1e-4 over 30 epochs.

## Experimental setup

Experiments are conducted on the LibriSpeech corpus, utilizing the train-clean-100 subset for training and evaluating across dev-clean, dev-other, test-clean, and test-other splits. The framework is benchmarked against conventional ASR systems (CTC, RNN-T, CTC-Atten), the LLM-Guided Decoder (using LLaMA-2-Chat-7B), and Vanilla-SLM. Performance is evaluated using Word Error Rate (WER), Correct Recognition Rate (CORR), Substitution (SUB), Deletion (DEL), Insertion (INS), and Hallucination Error Rate (HER).

## Results

On the LibriSpeech dev-clean set, AudioSLM with a 135M SmolLM2 backbone reduces the Hallucination Error Rate (HER) from 52.01% (Vanilla-SLM) down to 8.69%, while cutting insertion errors from 3.69% to 0.74%. Ablation studies confirm that removing the cross-attention layers (w/o CA) increases HER to 11.96%, and removing the CTC-Gated module (w/o CTC-Gate) increases HER to 14.67%. In WER evaluations on test-other, AudioSLM using SmolLM2-135M achieves 11.92% (beating the LLM-Guided Decoder at 16.90%), and scaling the backbone to SmolLM2-1.7B further drops test-other WER to 10.21%. Notably, larger backbones exhibit a slight rise in HER (growing from 8.69% at 135M to 12.76% at 1.7B), indicating that stronger language models possess heavier priors that increase hallucination susceptibility.

| Model | Backbone LLM | Dev Clean WER | Dev Other WER | Test Clean WER | Test Other WER |
|---|---|---|---|---|---|
| CTC | - | 11.20 | 21.40 | 11.40 | 22.00 |
| RNN-T | - | 9.70 | 21.50 | 9.80 | 22.20 |
| LLM-Guided Decoder | LLaMA-7B-Chat | 6.20 | 16.50 | 6.70 | 16.90 |
| Vanilla-SLM | SmolLM2-135M | 9.11 | 13.75 | 10.82 | 13.93 |
| AudioSLM | SmolLM2-135M | 6.58 | 12.29 | 7.11 | 11.92 |
| AudioSLM | SmolLM2-1.7B | 4.69 | 8.75 | 4.71 | 10.21 |

## Limitations

The study evaluates models exclusively on the clean and noisy English subsets of LibriSpeech (train-clean-100), leaving multilingual and low-resource generalization untested. Additionally, scaling the backbone LLM up to 1.7 billion parameters paradoxically increased hallucination rates due to overwhelming language priors, showing that cross-attention and gating alone do not fully neutralize stronger language generation biases in large models.

## Why read this

Speech and ML researchers working on modality fusion and hallucination reduction in generative audio models should read this to understand how text-heavy attention biases drive ASR hallucinations and how lightweight CTC-gated cross-attention layers can mitigate them without full model retraining.

## Code

- https://github.com/bicheng1225/AudioSLM

## Applications

Robust automatic speech recognition systems, voice-controlled virtual assistants, and real-time audio transcription interfaces operating in noisy acoustic environments.

## Institutions / 機構

National Taiwan Normal University

**Funding / 經費:** Realtek Semiconductor Corporation

## Related

- (link related pages by id as the wiki grows)
