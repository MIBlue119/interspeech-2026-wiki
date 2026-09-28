---
id: zhang26ca_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2134
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.pdf
---

# ACR-Net: Mitigating Semantic Dominance via Contrastive Acoustic-Semantic Decoupling

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2134)

**TL;DR** — The paper introduces ACR-Net, a decoupling-based architecture and the ASPIRE benchmark to resolve semantic dominance and text bias in speech emotion recognition when vocal tones contradict textual semantics.

## Problem

Multi-modal audio models and audio LLMs often fail in implicit discrepancy scenarios (such as sarcasm) where vocal tone contradicts textual semantics because training on congruent data creates a rigid semantic prior known as semantic dominance. Existing fusion methods merely re-weight features or shift decision boundaries without disentangling the underlying representations, leading to modality collapse and severe text bias. The ASPIRE benchmark and diagnostic metrics (SOP and LDD) are introduced to systematically evaluate and quantify these cognitive blind spots across adversarial audio-text pairs.

## Method

ACR-Net employs a structurally isolated dual-stream architecture featuring a frozen Whisper-medium backbone with Low-Rank Adaptation (LoRA) injected into every self-attention block for the audio stream, alongside a frozen text encoder anchor. It uses Cross-Modal Attention (CMA) where acoustic features act as queries to scan semantic keys and values to detect inconsistencies. A hybrid loss function combines standard cross-entropy with a Contrastive Decoupling Loss governed by weighting lambda and margin parameters, which forces contradictory audio and text embeddings into orthogonal latent sub-spaces.

## Results

Evaluated on the ASPIRE benchmark across four conflict types (Polarity Opposite, Arousal Opposite, Valence Opposite, and Emotion Masking) and standard congruent datasets including EmoDB, CASIA, SAVEE, CREMA-D, and RAVDESS. ACR-Net achieves an acoustic accuracy (ACC) of 76.5% on ASPIRE, keeping the Semantic Overconfidence Penalty (SOP) down to 0.128 and achieving a high Latent Decoupling Degree (LDD) of 0.864. In contrast, baseline methods like naive concatenation, tensor fusion, and MCR achieve significantly lower ACC (41.2% to 48.5%) and higher SOP (>0.7). On standard datasets, ACR-Net maintains robust performance ranging from 81.4% to 93.1% ACC across benchmarks like EmoDB and RAVDESS.

## Code

- https://github.com/zmkshakespar/ACR-Net

## Applications

Speech and ML engineers building robust Speech Emotion Recognition (SER) systems, conversational agents, and audio-language models that must correctly interpret emotional intent even when textual semantics contradict vocal cues.

## Related

- (link related pages by id as the wiki grows)
