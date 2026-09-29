---
id: jiang26g_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time, generative-model]
institutions: ["Nagoya University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3114
pdf: https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.pdf
---

# Integrating Facial Generation into Full-Duplex Spoken Dialogue Systems

*Jingjing Jiang, Atsumoto Ohashi, Ryuichiro Higashinaka*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3114)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — Moshi-Face extends the Moshi full-duplex spoken dialogue model to jointly process and generate 3D facial expressions and speech simultaneously. Trained on 180 hours of dialogue data, it achieves low-latency audiovisual alignment without degrading the core dialogue quality of the audio-only base model.

## Key contributions

- Constructed a face VQ-VAE codec that maps 3D FLAME facial meshes into 8 discrete face tokens per frame at 12.5 Hz.
- Integrated a non-causal Face Transformer into Moshi's 7B RQ-Transformer architecture for parallel, non-autoregressive face token generation.
- Curated a 180-hour 3D audiovisual dialogue dataset (3,400 dialogues) derived from Meta's Seamless Interaction dataset using the VHAP 3D extraction pipeline.
- Demonstrated successful real-time full-duplex conversational interaction with synchronized lip movements and head motion.

## Problem

Prior multimodal conversational systems are strictly constrained to turn-based architectures where only one party speaks at a time, preventing natural phenomena like simultaneous speech, interruptions, and backchanneling. Conversely, modern full-duplex models like Moshi support bidirectional simultaneous voice interaction but remain entirely audio-only, lacking crucial nonverbal cues such as facial expressions, lip movements, and head motion. Developing a model that combines the real-time dynamics of full-duplex audio with synchronized facial generation is essential for natural human-computer interaction, but requires handling complex token synchronization and high-dimensional 3D facial representations.

## Method

Moshi-Face builds on top of Moshi's architecture by appending 8 face token streams (in addition to 1 text stream and 2M=16 audio streams for system/user inputs) processed at a 12.5 Hz frame rate. The 3D facial codec uses a VQ-VAE with an encoder that takes FLAME vertex displacements (5,143 vertices, 3D coordinates), downsamples them temporally by factor r=2, and quantizes latents via a codebook of size K=256 and embedding dimension C=128. The VQ-VAE is trained using an L1 reconstruction loss, a quantization loss, and a velocity loss.

The core model retains Moshi's 7B-parameter pretrained RQ-Transformer (which generates hidden states, text, and audio tokens autoregressively) and attaches a non-causal Face Transformer module. At each timestep, the conditioning vector aggregates the hidden state, text embedding, and audio token embeddings, which are then combined with learnable positional embeddings. The Face Transformer applies non-causal self-attention across the N=8 face token positions within the frame, using 8 parallel linear heads to predict face tokens non-autoregressively. The overall objective combines standard Moshi text and audio cross-entropy losses with a face token cross-entropy loss weighted by lambda.

Training proceeds in two stages: first, freezing the RQ-Transformer and training only the Face Transformer for 500 steps (batch size 32, lr 5e-4); second, jointly fine-tuning all components for 1,200 steps (batch size 16) with specific layer learning rates (Temporal 2e-6, Depth 4e-6, Face 1e-5). Teacher forcing is used during training, feeding ground-truth face tokens from the previous timestep into the current queries.

## Experimental setup

Experiments use a 180-hour subset of Meta's Seamless Interaction dataset (3,400 dialogues total), split into 70 hours for face codec training and the remaining for dialogue training with 100 unseen dialogues reserved for testing. The face codec is evaluated using Mean Vertex Error (MVE), Lip Vertex Error (LVE), and Perplexity; Moshi-Face is evaluated using LSE-D and LSE-C via SyncNet, UTMOS for speech naturalness, and an LLM-as-a-Judge protocol (GPT-5-mini) across 1-5 scale metrics (Coherence, Naturalness, Relevance, Overall). Baselines include pretrained Moshi, Moshi fine-tuned on the dataset without faces (Moshi-ft), Reconstructed face (upper bound), and Random face (lower bound).

## Results

Under teacher-forced evaluation, Moshi-Face achieves a Lip Sync Error Distance (LSE-D) of 8.76 and LSE-C of 0.14, approaching the Reconstructed face upper bound (8.53 / 0.12) and outperforming the Random face lower bound (11.7 / 0.13). In free-run full-duplex self-dialogue generation, Moshi-Face maintains strong synchronization with an LSE-D of 11.0 and LSE-C of 0.16. While speech naturalness (UTMOS) drops slightly from 3.08 (base Moshi) to 1.75 due to domain fine-tuning on the smaller dataset, Moshi-Face achieves the highest semantic coherence (3.79) and strong naturalness (4.52) in LLM-as-a-Judge evaluations, performing comparably to base Moshi overall (3.76 vs 3.85). Ablations confirm that pre-training the Face Transformer and performing joint fine-tuning are both essential for optimal synchronization and semantic performance.

| System / Condition | LSE-D (↓) | LSE-C (↑) | UTMOS (↑) | LLMAJ Overall (1-5) |
|---|---|---|---|---|
| Moshi (Base) | – | – | **3.08** | **3.85** |
| Moshi-ft (Audio-only) | – | – | 1.69 | 3.55 |
| Reconstructed Face (Upper Bound) | **8.53** | **0.12** | – | – |
| Random Face (Lower Bound) | 11.70 | 0.13 | – | – |
| Moshi-Face (Ours, Teacher-forced) | 8.76 | 0.14 | 1.75 | 3.76 |
| Moshi-Face (Ours, Free-run) | 11.00 | 0.16 | 1.75 | 3.76 |

## Limitations

The current face codec is non-causal, requiring a small temporal lookahead that prevents truly real-time streaming visual input/output (though the language model backbone is streaming). The evaluation relies on indirect 2D video rendering via SyncNet pipelines for LSE metrics rather than direct human perceptual studies. Furthermore, the system was trained on a restricted 180-hour subset, leading to a minor drop in general acoustic quality (UTMOS) compared to the original massive pre-trained Moshi checkpoints.

## Why read this

Researchers and engineers building multimodal conversational agents will find this paper a clear blueprint for scaling full-duplex audio-only language models into the visual domain via discrete token codebooks and parallel transformer heads. It provides concrete design choices for handling multi-stream token synchronization and non-autoregressive face token generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time interactive avatars, full-duplex virtual assistants, and embodied conversational AI agents with realistic facial expressions and lip synchronization.

## Institutions / 機構

Nagoya University

**Funding / 經費:** JST Moonshot R&D

## Related

- [From Tokens to Faces: Investigating Discrete Speech Representations for 3D Facial Animation](correa26_interspeech.md) — same problem · relatedness 2.1/3
- [TurnGuide: Enhancing Meaningful Full Duplex Spoken Interactions via Dynamic Turn-Level Text-Speech Interleaving](cui26_interspeech.md) — same problem · relatedness 2.0/3
- [ES-3DF: Editable Speech-Driven 3D Face Reconstruction via Geometry Texture Disentanglement](wang26i_interspeech.md) — same problem · relatedness 1.9/3
- [AV-SyncBench: Decoupled Benchmarking of Temporal and Semantic Audio-Visual Synchronization](zhou26g_interspeech.md) — complementary · relatedness 1.9/3
- [Dual-Space Constrained Face-Based Zero-Shot Text-to-Speech Synthesis](wang26f_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
