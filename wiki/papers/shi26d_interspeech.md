---
id: shi26d_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1613
pdf: https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.pdf
---

# Emo-BPO: Emotion Bidirectional Preference Optimization for Diffusion-based Emotional TTS

[PDF](https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1613)

**TL;DR** — Emo-BPO is a bidirectional preference optimization framework for diffusion-based emotional TTS that jointly learns aligned and contrastive score functions from reordered same-text pairs, achieving a 99.23% emotion similarity and 4.52 UTMOS score.

## Problem

Existing diffusion-based emotion alignment methods solely reinforce target emotional expressions while failing to explicitly model competing emotional modes, which limits fine-grained controllability under classifier-free guidance (CFG). This asymmetric optimization underutilizes the contrastive mechanism inherent in CFG, weakening inter-emotion discrimination and prosodic separation. Addressing this structural gap is critical for generating highly controllable and expressive conversational or narrative speech without requiring auxiliary reward models or additional annotations.

## Method

The framework utilizes Grad-TTS as the backbone, operating on 80-dimensional mel-spectrograms with a pretrained HiFi-GAN vocoder, while freezing the text encoder and duration predictor to train two separate score networks via Adam (learning rate 1e-4, batch size 16 on 2-second crops). Emo-BPO constructs reordered same-text emotional pairs (target vs alternative emotion) from standard corpora to jointly supervise an emotion-aligned (EA) branch and an emotion-contrastive (EC) branch. During inference, these branches are integrated via a contrastive guidance formulation compatible with classifier-free guidance. A late-step guidance schedule, defined as omega(t) = 1 - t/T, applies weaker emotional guidance at early timesteps to preserve acoustic structure and ramps up strength at later stages to refine fine-grained prosody.

## Results

Evaluated on the English subset of the Emotional Speech Database (ESD) and EmoVoiceDB (covering Angry, Happy, Sad, Surprise, and Neutral emotions), Emo-BPO is compared against baselines including EmoSpeech, CosyVoice, CosyVoice2, Emosphere++, and EmoVoice. Objective evaluations show Emo-BPO reaches 99.23% Emo SIM, 3.85 prosody similarity, 4.52 UTMOS, and an average speech emotion recognition accuracy of 87%. Subjective evaluations with 30 participants demonstrate superior performance in overall MOS (3.93), Emo MOS (4.25), MOS EC (3.92), and emotion recognition accuracy (79%), alongside clear listener preference in AB tests against EmoSpeech and CosyVoice2. Ablation studies confirm that removing either the contrastive branch or the late-step scheduling strategy consistently degrades emotion similarity, prosody, and word error rate.

## Code

- https://jiachengqaq.github.io/emo-bpo/

## Applications

Speech and ML engineers developing conversational agents, expressive narrations, and human-machine interaction systems requiring fine-grained emotional control in text-to-speech.

## Related

- (link related pages by id as the wiki grows)
