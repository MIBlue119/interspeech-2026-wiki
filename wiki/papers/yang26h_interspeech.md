---
id: yang26h_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1503
pdf: https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.pdf
---

# Robust Streaming ASR with Decoupled Separation and Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1503)

**TL;DR** — A decoupled robust streaming ASR framework combining an online speech separation frontend with a clean-trained ASR backend consistently outperforms multi-condition training baselines without degrading clean speech performance.

## Problem

Real-world automatic speech recognition deployed in streaming scenarios suffers from background noise, room reverberation, and interfering speakers. While multi-condition training helps generalize to noisy environments, it demands massive datasets and degrades word error rates on clean speech. Conversely, combining speech separation frontends with ASR backends often introduces a mismatch effect where separated speech deviates from the backend's training distribution.

## Method

The framework pairs an online speech separation frontend (zero lookahead) with a streaming ASR backend trained exclusively on clean speech, completely eliminating multi-condition training. The authors evaluate two frontends: DPDFNet (an extension of DeepFilterNet2 with dual-path blocks, 3.54M parameters) and oTF-CrossNet (a causal, zero-lookahead modification of TF-CrossNet using complex spectral mapping, 7.95M parameters). For the ASR backend, they introduce FastMambaformer—a novel 130M-parameter architecture replacing the convolutional modules in FastConformer with Mamba selective state-space blocks (SSM state expansion factor 16, local conv width 4). They also test large pretrained backends including NeMo FastConformer (114M parameters) and SimulStreaming based on Whisper large-v3 (1.5B parameters). All models are trained on LibriSpeech data.

## Results

Evaluated on LibriSpeech (test-other mixed with ADTBabble and ADTCafeteria noises from -5 to 10 dB SNR), CHiME-4, and LibriCSS datasets using word error rate (%WER). On LibriSpeech, a noisy-trained FastMambaformer baseline achieves 36.9% average WER, whereas the clean-trained FastMambaformer coupled with the oTF-CrossNet frontend achieves a superior 36.1% average WER. When utilizing oTF-CrossNet with larger backends like NeMo pre-trained and SimulStreaming, average WERs improve further to 30.9% and 25.4% respectively, outperforming standard multi-condition training counterparts. Un-causal offline TF-CrossNet frontends provide theoretical upper bounds (e.g., 26.6% average WER with SimulStreaming).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time voice assistants, live captioning tools, and spoken dialogue systems operating in acoustically harsh environments.

## Limitations

Performance heavily relies on the quality and separation capability of the online speech separation frontend, meaning weak frontends can still cause distribution mismatch for clean-trained backends.

## Related

- (link related pages by id as the wiki grows)
