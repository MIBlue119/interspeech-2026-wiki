---
id: lee26r_interspeech
category: speech-synthesis
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1938
pdf: https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.pdf
---

# GETS: Guiding EMG-to-Speech Synthesis via Silent Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1938)

**TL;DR** — GETS combines an EMG-conditioned diffusion generator with silent speech recognition semantic guidance, achieving a state-of-the-art Word Error Rate of 11.89% on silent electromyography-to-speech synthesis.

## Problem

Electromyography-to-speech conversion models often yield low semantic intelligibility because silent biosignals are inherently ambiguous and previous systems focus primarily on acoustic reconstruction rather than linguistic consistency. Minimizing acoustic error alone fails to guarantee that the synthesized speech will accurately convey the intended words, leaving generated output difficult to understand.

## Method

The framework utilizes a DiffWave-based backbone adapted for EMG conditioning, paired with a pre-trained silent speech recognition (SSR) model called MONA-LISA and an automatic speech recognition (ASR) classifier for guidance. During training, silent and voiced EMG features are temporally aligned using Dynamic Time Warping to handle asynchrony, and the diffusion model is optimized via L1 loss using classifier-free guidance. At inference time, frozen ASR-based classifier guidance evaluates conditional log-likelihoods to push the reverse diffusion process toward semantically coherent transcripts predicted by the SSR model. The EMG encoder uses convolutional and transformer blocks initialized from prior work and fine-tuned jointly with the diffusion decoder.

## Results

Evaluated on the Gaddy & Klein single-subject dataset containing 1,285 parallel silent-voiced pairs and 5,470 non-parallel voiced utterances. Using Whisper-medium as the evaluator, GETS achieves a word error rate of 11.89%, substantially outperforming prior baselines such as Gaddy and Klein (25.74%), SU-ETS (26.29%), and diff-ETS (32.1%). When evaluated with DeepSpeech, GETS attains 21.32% WER compared to over 31% for transduction and optimized encoder baselines. Prosodic and energy contour analyses confirm that the dual guidance strategy preserves temporal alignment and natural energy patterns.

## Code

- https://jiwonlee-0218.github.io/GETS_demo-page/

## Applications

Engineers and researchers building silent speech interfaces or assistive communication hardware for individuals with severe speech and motor impairments.

## Limitations

Tested primarily on a single-subject dataset containing parallel silent and voiced utterances.

## Related

- (link related pages by id as the wiki grows)
