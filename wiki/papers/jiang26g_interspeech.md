---
id: jiang26g_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3114
pdf: https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.pdf
---

# Integrating Facial Generation into Full-Duplex Spoken Dialogue Systems

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3114)

**TL;DR** — Moshi-Face extends full-duplex spoken dialogue models to jointly process and generate 3D facial motion alongside speech, achieving robust audiovisual synchronization without degrading dialogue quality.

## Problem

Existing full-duplex spoken dialogue models are confined strictly to the audio modality, completely lacking the facial expressions and head movements that are critical for natural, multi-modal human interaction. Conversely, multimodal systems that do process facial behavior remain constrained to turn-based architectures where only one party speaks at a time, preventing simultaneous conversational dynamics like backchanneling and real-time interruption.

## Method

Moshi-Face builds on a 7B-parameter Moshi model by adding a VQ-VAE face codec and a non-causal Face Transformer. The VQ-VAE uses a codebook size of 256 and embedding dimension 128 to compress 25 fps 3D facial meshes (5,143 FLAME vertices extracted via VHAP from 180 hours of Seamless Interaction dialogues) into N=8 discrete face tokens per frame at a 12.5 Hz rate. A non-causal Face Transformer module non-autoregressively generates the N face tokens in parallel at each timestep, conditioned on the RQ-Transformer's hidden state, text embeddings, and M=8 audio tokens. Training proceeds in two steps: freezing the RQ-Transformer to train the Face Transformer for 500 steps, followed by joint fine-tuning.

## Results

Evaluated on a 100-dialogue test set using SyncNet-based Lip Sync Error Distance (LSE-D) and Confidence (LSE-C), LLM-as-a-Judge (using GPT-5-mini on Whisper-large-v3 transcripts), and UTMOS. Under teacher-forced conditions, Moshi-Face achieves an LSE-D of 8.76 (approaching the reconstructed face upper bound and beating the 11.7 random face lower bound), and maintains similar synchronization during free-run interactive dialogue. In LLMAJ evaluations, Moshi-Face achieves the highest coherence and second-highest naturalness among variants, matching the overall dialogue quality of the original Moshi model. Ablations confirm that Step 1 Face Transformer pre-training improves LSE-D from 9.53 to 8.76, and Step 2 joint fine-tuning is essential for optimal synchronization and semantic scores.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Developers and researchers building real-time, embodied conversational agents, interactive avatars, and face-to-face AI assistants requiring simultaneous speech and facial motion generation.

## Limitations

The current face codec is non-causal, requiring future work to adopt a streaming causal codec for fully real-time visual I/O.

## Related

- (link related pages by id as the wiki grows)
