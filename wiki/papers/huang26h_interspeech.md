---
id: huang26h_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1409
pdf: https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.pdf
---

# RAS: a Reliability Oriented Metric for Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1409)

**TL;DR** — The paper introduces an abstention-aware ASR framework that allows models to explicitly reject uncertain segments using placeholder tokens, evaluated via a human-preference-calibrated Reliability-Aware Score (RAS).

## Problem

Standard automatic speech recognition systems often generate confident yet incorrect transcripts under noisy, ambiguous, or low-resource conditions, and traditional metrics like Word Error Rate only measure accuracy while ignoring reliability. Post-hoc confidence scores and full-sentence rejections are suboptimal because they either lack an active mechanism to opt out or unnecessarily discard valuable partial information. This makes misleading transcriptions hazardous in high-stakes domains such as medical and legal documentation.

## Method

The framework augments the base ASR model's vocabulary with a dedicated placeholder token, PH, representing segment-level abstention. It introduces RAS, a modified dynamic programming edit distance that balances transcription usefulness against error aversion using a trade-off hyperparameter calibrated through Bradley-Terry preference modeling on listening tests. The model is trained using a two-stage pipeline: supervised bootstrapping on error-replaced training sequences, followed by Group Relative Policy Optimization reinforcement learning using the utterance-level RAS as the reward signal. The base architecture built upon is Whisper.

## Results

Experiments were conducted on LibriSpeech, Noisy LibriSpeech (with AWGN at 0, 5, 10, and 20 dB SNRs), and the TALCS code-switching dataset, with human listening tests utilizing samples from the Medical ASR Recording Dataset and AMI Corpus. The approach substantially improves transcription trustworthiness and reliability in challenging acoustic conditions while maintaining competitive accuracy. The method successfully calibrates the abstention trade-off parameter and optimizes performance through RL reward maximization over sampled generation groups.

## Code

- https://github.com/HartmannPsi/Reliability-Aware-Score

## Applications

Engineers building high-stakes speech transcription systems for medical documentation, legal record keeping, and safety-critical voice interfaces where false confidence is dangerous.

## Limitations

The framework requires careful calibration of the trade-off hyperparameter via human listening tests to match specific application preferences.

## Related

- (link related pages by id as the wiki grows)
