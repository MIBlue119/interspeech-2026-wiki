---
id: ren26e_interspeech
category: tts
labels: [self-supervised, generative-model]
institutions: ["Chinese Academy of Sciences", "University of Chinese Academy of Sciences", "Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1186
pdf: https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.pdf
---

# Edit Content, Preserve Acoustics: Imperceptible Text-Based Speech Editing via Self-Consistency Rewards

*Yong Ren, Jiangyan Yi, Jianhua Tao, Tao Wang, Le Xu, Zhengqi Wen*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1186)

**Category:** `tts` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — A text-based speech editing framework that performs token-level modifications in a disentangled semantic space rather than raw acoustic space, yielding lower WER and higher naturalness than state-of-the-art autoregressive baselines.

## Key contributions

- Decouples content modification from acoustic reconstruction by operating in a discrete semantic space using a Prefix-Suffix-Middle (PSM) formatting strategy.
- Introduces Self-Consistency Rewards Group Relative Policy Optimization (GRPO), leveraging a frozen pre-trained Text-to-Speech model as an implicit critic for context alignment.
- Employs a gated reward aggregation strategy incorporating ASR-based intelligibility and duration constraints to eliminate invalid rollout samples and stabilize RL training.
- Achieves consistent state-of-the-art performance across insertion, deletion, and substitution tasks on standard speech editing benchmarks.

## Problem

Prior non-autoregressive speech editing approaches struggle with long-range dependencies and flattened prosody, while autoregressive neural codec language models (NCLMs) operate in acoustic-token space where content and style are tightly coupled. This entanglement causes instability, boundary artifacts, and hallucinations when handling word insertions or deletions. Text-based speech editing differs from standard TTS because it requires strict context-constrained incremental generation, meaning edits must seamlessly blend with surrounding acoustic and semantic environments without manual re-recording.

## Method

The framework operates in two main stages: Structural Foundations and Perceptual Alignment. In the structural stage, input audio is tokenized by a semantic tokenizer into discrete representations. Using a Prefix-Suffix-Middle (PSM) format, the context prefix and suffix are paired with the editable middle tokens, and a decoder-only transformer policy model minimizes the negative log-likelihood of the missing middle tokens. The resulting semantic tokens are fed into a frozen Flow Matching decoder and HiFiGAN vocoder (sourced from CosyVoice3) to reconstruct the waveform.

In the perceptual alignment stage, the model is fine-tuned via Group Relative Policy Optimization (GRPO) using a composite reward function. For each query, a group of candidate sequences is sampled. A frozen pre-trained TTS model acts as an implicit critic, assigning a log-probability self-consistency reward ($r_{sc}$) to measure how naturally the generated tokens fit the bidirectional context. To prevent reward hacking, an intelligibility reward ($r_{wer}$) computed via an ASR model (SenseVoiceSmall) and strict duration validity constraints ($	au_{wer}$ and $	au_{len}$) are gated together. The relative advantage of each sample within its group drives the policy update.

## Experimental setup

The semantic LLM is pretrained on Libriheavy (a 50k-hour English corpus) using 8 NVIDIA H800 GPUs at a learning rate of $1 \times 10^{-5}$ for up to 10 epochs. RL alignment runs for 400 steps with a batch size of 4, rollout group size of 8, learning rate of $1 \times 10^{-6}$, and KL coefficient $\beta = 0.01$. The method is evaluated on the Ming-Freeform-Audio-Edit-Benchmark (basic and full splits covering insertion, deletion, and substitution) and a subset of the Seed-TTS-Eval test set (200 utterances with masked durations from 0.5s to 2.5s). Baselines include FluentSpeech, VoiceCraft, and Ming-UniAudio. Metrics include Whisper WER, WavLM speaker similarity (SIM), DNSMOS, and subjective MOS.

## Results

On the Ming Freeform benchmark substitution task basic split, the proposed model with GRPO achieves a WER of 4.13% compared to FluentSpeech's 4.66% and VoiceCraft's 11.98%. For the deletion task basic split, the model achieves a 6.91% WER compared to VoiceCraft's 16.99% and FluentSpeech's 8.16%. In robustness evaluations with masked durations extending to 2.5s on Seed-TTS, the proposed method maintains a low WER of 4.227% (with GRPO) whereas VoiceCraft degrades to 11.190%. Speaker similarity (SIM) remains high at ~0.81 even at 2.5s, while DNSMOS and subjective MOS ratings confirm superior perceptual naturalness over all baselines.

| Edit Type / System | WER (basic) % | WER (full) % | SIM (basic) | DNSMOS (basic) | MOS (basic) |
|---|---|---|---|---|---|
| **Insertion - VoiceCraft** | 10.70 | 12.94 | 0.67 | 3.00 | 3.62 |
| **Insertion - Ours (w. GRPO)** | **4.50** | **4.97** | **0.82** | **3.17** | **4.01** |
| **Deletion - VoiceCraft** | 16.99 | 17.88 | 0.60 | 3.01 | 3.34 |
| **Deletion - Ours (w. GRPO)** | **6.91** | **6.88** | **0.77** | **3.09** | **3.88** |
| **Substitution - VoiceCraft**| 11.98 | 12.73 | 0.58 | 3.01 | 3.57 |
| **Substitution - Ours (w. GRPO)**| **4.13** | **4.41** | **0.78** | **3.15** | **3.96** |

## Limitations

The framework relies on a frozen semantic tokenizer and a pre-trained Flow Matching decoder (CosyVoice3), binding its acoustic upper bound and zero-shot voice cloning capabilities to the external model's capacity. The evaluation is currently restricted to English corpora (Libriheavy and LibriVox-derived benchmarks) and requires accurate forced alignment (WhisperX) to define editing intervals during data preparation.

## Why read this

Speech and ML engineers building conversational AI editing tools or podcast post-production pipelines should read this to see how combining semantic-space token infilling with RL-based self-consistency rewards successfully circumvents the instability and hallucination issues of acoustic-token autoregressive models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Podcast correction, audiobook revision, post-production dialogue editing, and voice-activated script changes in speech generation pipelines.

## Institutions / 機構

Chinese Academy of Sciences, University of Chinese Academy of Sciences, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China, China Postdoctoral Science Foundation

## Related

- (link related pages by id as the wiki grows)
