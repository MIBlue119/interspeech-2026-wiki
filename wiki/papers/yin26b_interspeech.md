---
id: yin26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2842
pdf: https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.pdf
---

# STArK: Towards Synthesizing Articulatory Kinematics from Text

[PDF](https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2842)

**TL;DR** — The paper introduces STArK, a non-autoregressive text-to-articulation model that generates high-fidelity electromagnetic articulography kinematics directly from text, achieving competitive speech synthesis and zero-shot voice cloning quality without requiring speaker embeddings during training.

## Problem

Deep learning models that map speech audio to articulatory kinematics are heavily bottlenecked by a severe scarcity of high-quality articulatory recordings. Directly synthesizing these physiological representations from text remains an open challenge that would otherwise enable scalable data generation and provide superior interpretability compared to abstract mel-spectrograms. Solving this enables advancements in phonetics research, cross-linguistic analysis, disordered speech enhancement, and speech avatar simulation.

## Method

STArK adopts a feed-forward Conformer (FFConformer) non-autoregressive text-to-speech architecture comprising a G2P-based text encoder with rotary positional embeddings, an unsupervised alignment module utilizing the One TTS Alignment method with monotonic alignment search, a duration predictor with separable convolutions, and an articulatory decoder. It predicts 12 electromagnetic articulography (EMA) coordinates, loudness, and pitch from text, using logarithmically normalized pitch values. The system uses a pre-trained, frozen SPARC encoder for speaker embeddings and a modified HiFi-GAN SPARC vocoder to resynthesize the predicted kinematic features into audio waveforms. The model contains 73.7 million parameters and is optimized with a joint loss function combining mean squared error for articulation and duration alongside alignment loss.

## Results

Trained on the LibriTTS-R dataset (train-clean-100) using pseudo-labeled EMA targets, STArK achieves comparable performance to multi-speaker text-to-speech baselines like YourTTS. On the test-clean subset, STArK obtains an UTMOS v2 score of 3.543, a naturalness MOS (NMOS) of 4.024, a speaker embedding cosine similarity (SECS) of 0.493, and a Word Error Rate (WER) of 3.31%. When supplemented with oracle aligner durations and prosody, speech quality metrics further improve. The base model was trained for 32,000 steps using four L40S GPUs over approximately 96 hours.

## Code

- https://github.com/Lab-MSP/STArK/

## Applications

Speech engineers and researchers building interpretable text-to-speech systems, voice cloning pipelines, or scalable articulatory datasets for phonetic and speech biomechanics research.

## Limitations

The model relies on pseudo-labeled articulatory features derived from a pre-trained teacher model (SPARC) rather than real physical EMA recordings due to data scarcity.

## Related

- (link related pages by id as the wiki grows)
