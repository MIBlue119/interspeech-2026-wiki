---
id: le26_interspeech
category: speaker-anonymization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-497
pdf: https://www.isca-archive.org/interspeech_2026/le26_interspeech.pdf
---

# VerAno: Speaker Anonymization via Self-Supervised Tokenization and Conditional Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/le26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/le26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-497)

**TL;DR** — VerAno is a speaker anonymization framework that tokenizes self-supervised speech features using a bottlenecked VQ-VAE and synthesizes speech via conditional flow matching, outperforming baseline models on the VoicePrivacy Challenge benchmarks.

## Problem

Current speaker anonymization methods face a critical trade-off between privacy protection and utility preservation. Automatic speech recognition (ASR) bottlenecks are language-dependent and harm paralinguistic fidelity, whereas continuous self-supervised learning (SSL) features inadvertently leak speaker timbre and identity.

## Method

VerAno extracts frame-level features from the 18th layer of WavLM Large and passes them through a RepCodec-based VQ-VAE tokenizer equipped with Vocos backbones to create discrete speech tokens. By strictly constraining the codebook size (e.g., K = 128 or 8192), the architecture acts as an information filter that discards fine-grained speaker-specific timbre while retaining semantic and emotional content. These discrete tokens are combined with ReDimNet speaker embeddings to condition a 16-layer, 768-hidden-dimension flow-matching transformer. The model is trained using optimal transport conditional flow matching to predict a velocity field, solving an ODE in 10 Euler steps to generate Mel spectrograms which are then converted to waveforms via a HiFi-GAN vocoder.

## Results

Evaluated on LibriSpeech and IEMOCAP under VoicePrivacy Challenge 2024 protocols, VerAno configurations secure the top two overall average and weighted rankings. The CB8192 model achieves top ranks in linguistic (WER) and emotional (UAR) utility, while the restrictive CB128 model secures strong privacy protection with an Equal Error Rate (EER) competitive with top baselines without suffering utility collapse. In cross-lingual evaluations on the Multilingual LibriSpeech dataset (German, Portuguese, Italian, Spanish), VerAno generalizes effectively to unseen languages without requiring language-specific transcripts.

## Code

- https://submission.netlify.app/

## Applications

Engineers and privacy researchers building secure voice interfaces, speech-enabled large language models, or ambient assistants that need to strip speaker identity while preserving linguistic and emotional content.

## Limitations

Balancing the codebook size remains a sensitive trade-off where higher fidelity risks minor identity leakage and lower fidelity slightly degrades naturalness.

## Related

- (link related pages by id as the wiki grows)
