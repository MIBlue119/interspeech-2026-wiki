---
id: kuzmin26_interspeech
category: deepfake-security
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3105
pdf: https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.pdf
---

# StreamVoiceAnon+: Emotion-Preserving Streaming Speaker Anonymization via Frame-Level Acoustic Distillation

*Nikita Kuzmin, Kong Aik Lee, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3105)

**Category:** `deepfake-security` · **Labels:** `streaming-real-time`

**TL;DR** — StreamVoiceAnon+ is a streaming speaker anonymization method that uses supervised finetuning on neutral-emotion pairs and frame-level acoustic emotion distillation to achieve state-of-the-art emotion preservation without adding inference latency.

## Key contributions

- Demonstrates that emotion degradation in neural audio codec streaming speaker anonymization is primarily a training paradigm issue rather than a model capacity limitation.
- Introduces supervised finetuning on same-speaker neutral-emotion utterance pairs alongside dedicated separation tokens to eliminate prompt-driven acoustic style transfer.
- Applies frame-level emotion knowledge distillation exclusively to the acoustic hidden states, avoiding gradient competition with content supervision on the semantic branch.
- Achieves 49.2% unweighted average recall (UAR) for emotion preservation (+24% relative over baseline) with zero inference latency overhead and improved privacy (49.0% EER).

## Problem

Real-time streaming speaker anonymization models successfully mask speaker identity while maintaining linguistic intelligibility, but they severely degrade emotional expression. Neural audio codec language models trained for audio continuation tend to discard emotional content, defaulting to dominant acoustic patterns rather than preserving paralinguistic attributes. Prior mitigation techniques like using emotion-diverse prompts require harder-to-obtain emotional prompt data and degrade intelligibility, while offline approaches cannot handle streaming constraints with low latency.

## Method

The model builds on a neural audio codec language model architecture featuring Slow AR (time-axis tokens) and Fast AR (codebook tokens) branches. During supervised finetuning, the authors construct training pairs where the prompt is a neutral utterance and the source is an emotional utterance from the exact same speaker, supplemented by neutral-to-neutral pairs for balance. Distinct learnable separation tokens (Linguistic [SEP] and Acoustic [SEP]) are introduced between prompt and source streams to mark sequence boundaries and prevent the model from copying prompt characteristics.

A frame-level emotion distillation loss is applied to the Slow AR acoustic hidden states using pretrained Emotion2Vec+ large representations as targets. This is trained via a causal transformer head with distillation weight w = 0.01, combining with standard next-token prediction language modeling losses. Distillation is explicitly isolated to the acoustic branch rather than the semantic branch to prevent gradient competition with existing content supervision. At inference time, the distillation head and additional components are stripped away, yielding zero latency overhead relative to the base streaming architecture (maintaining a 180ms algorithmic latency).

## Experimental setup

Finetuned on CREMA-D (filtered to 4 emotions: angry, happy, neutral, sad, yielding ~25,000 neutral-emotion pairs) for 5 epochs using 4 x NVIDIA RTX 4090 GPUs with a learning rate of 1e-4. Evaluated following the VoicePrivacy 2024 protocol using LibriSpeech-based ASR for word error rate (WER), ECAPA-TDNN for equal error rate (EER) privacy, and an IEMOCAP-trained SER model for unweighted average recall (UAR).

## Results

The proposed frame-distill system achieves a headline 49.22% UAR, 5.77% WER, 48.98% lazy-informed EER (EER-L), and 18.30% semi-informed EER (EER-S). Compared to the unadapted StreamVoiceAnon baseline (39.72% UAR, 4.54% WER, 47.19% EER-L), it delivers a +24% relative UAR improvement while slightly improving privacy. Against prior streaming competitors with viable privacy (>40% EER-L), it outperforms GenVC-small (34.23% UAR), DarkStream (34.73% UAR), and TVTSyn (37.32% UAR) by 32% to 44% relative UAR.

Ablation studies show that adding CREMA-D finetuning alone yields only a marginal 1.4% UAR bump, whereas restructuring training pairs with neutral-emotion pairs adds +4.2% UAR and separation tokens add +2.1% UAR. Causal frame-level distillation (48.5% UAR) outperforms statistical utterance-level pooling (46.3% UAR), and acoustic-branch distillation (49.2% UAR, 5.77% WER) outperforms semantic-branch distillation (48.2% UAR, 6.23% WER due to gradient conflict). The method trades off happiness over-prediction bias for dramatic gains on sad emotion (rising from 8.0% to 42.6% UAR).

| System | Lat. (ms) | WER (%) | UAR (%) | EER-L (%) |
|---|---|---|---|---|
| Original Speech | – | 1.83 | 70.07 | 5.16 |
| TVTSyn / StreamVoiceAnon | 80 | 5.35 | 37.32 | 47.55 |
| Baseline (vctk-1fix) | 180 | 4.54 | 39.72 | 47.19 |
| SVA + Emotion Prompts | 180 | 6.59 | 44.59 | 46.53 |
| Ours (pool-distill) | 180 | 5.08 | 46.30 | 48.62 |
| Ours (frame-distill) | 180 | 5.77 | 49.22 | 48.98 |

## Limitations

The evaluation relies entirely on acted speech corpora (CREMA-D for training and IEMOCAP for testing) and lacks validation on spontaneous emotion datasets like MSP-Podcast. The study does not include subjective listening tests (MOS), depends on a single SER evaluator setup from the VoicePrivacy protocol, and maintains a performance gap compared to offline methods (such as EASY at 63.8% UAR) due to the inherent constraints of causal streaming context.

## Why read this

Speech and ML researchers building real-time voice conversion or speaker anonymization systems should read this to understand how training data pairing and acoustic hidden-state distillation can resolve emotion degradation without adding inference latency.

## Code

- https://paniquex.github.io/streamvoiceanon-plus/

## Applications

Privacy-preserving real-time teleconferencing, customer call center anonymization, voice assistants, and online mental health counseling.

## Institutions / 機構

Nanyang Technological University, Agency for Science, Technology and Research, Hong Kong Polytechnic University

## Related

- (link related pages by id as the wiki grows)
