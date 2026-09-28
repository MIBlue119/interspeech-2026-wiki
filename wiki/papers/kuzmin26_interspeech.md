---
id: kuzmin26_interspeech
category: speaker-anonymization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3105
pdf: https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.pdf
---

# StreamVoiceAnon+: Emotion-Preserving Streaming Speaker Anonymization via Frame-Level Acoustic Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuzmin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3105)

**TL;DR** — StreamVoiceAnon+ is a streaming speaker anonymization method that uses supervised finetuning with neutral-emotion pairs and frame-level emotion distillation to achieve a 49.2% unweighted average recall (UAR) for emotion preservation.

## Problem

Neural audio codec language models used for streaming speaker anonymization typically degrade source emotional content, as content tokens discard paralinguistic attributes and models default to dominant acoustic patterns. This occurs because audio continuation training paradigms and discrete vector quantization bottlenecks strip fine-grained emotional prosody, degrading user experience in real-time communication deployments.

## Method

The approach applies supervised finetuning on neutral-emotion utterance pairs from the same speaker, paired with learnable linguistic and acoustic separation tokens to mark the prompt-source boundary. It incorporates a frame-level emotion distillation loss applied to acoustic token hidden states using a 2-layer causal transformer supervised by a pretrained Emotion2Vec+ teacher. Finetuning takes under 2 hours on 4 GPUs, adds zero inference latency overhead while maintaining a 180ms streaming latency, and keeps all other model components frozen.

## Results

Evaluated on the VoicePrivacy 2024 protocol using CREMA-D for training and IEMOCAP for testing, the method achieves 49.2% UAR, 5.77% Word Error Rate (WER), and 48.98% Equal Error Rate (EER-L) for privacy. This represents a +24% relative UAR improvement over the StreamVoiceAnon baseline (39.7% to 49.2%) and +10% over the emotion-prompt variant, while outperforming GenVC-small, DarkStream, and TVTSyn. Ablations show that neutral-emotion pairs yield a +4.2 UAR gain and acoustic-branch distillation outperforms semantic-branch distillation.

## Code

- https://paniquex.github.io/streamvoiceanon-plus/

## Applications

Engineers and developers building real-time, privacy-preserving speech applications such as teleconferencing, call centers, voice assistants, and online mental health counseling where emotion retention is critical.

## Limitations

Limitations include reliance on a single speech emotion recognition evaluator, the absence of subjective listening tests, and evaluation restricted to acted speech corpora rather than spontaneous emotion datasets.

## Related

- (link related pages by id as the wiki grows)
