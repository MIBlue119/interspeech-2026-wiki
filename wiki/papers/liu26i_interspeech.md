---
id: liu26i_interspeech
category: tts
labels: [streaming-real-time, generative-model]
institutions: ["Nanyang Technological University", "Tianjin University", "Southeast University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1192
pdf: https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.pdf
---

# Prosodic Boundary-Aware Streaming Generation for LLM-Based TTS with Streaming Text Input

*Changsong Liu, Tianrui Wang, Ye Ni, Yizhou Peng, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1192)

**Category:** `tts` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — This paper proposes a prosodic-boundary-aware post-training strategy for streaming LLM-based text-to-speech using weakly time-aligned data, achieving a 66.2% absolute reduction in long-form word error rate compared to standard interleaved baselines.

## Key contributions

- Introduces a prosodic-boundary adaptation strategy with a windowed lookahead mechanism to anticipate future text for better prosody without complex causal attention modifications.
- Designs an acoustic prompting method using previous chunk audio tails to ensure seamless concatenation and prevent long-form cross-modality generation collapse.
- Demonstrates robust long-form streaming stability using only weakly time-aligned open-source supervision extracted via WhisperX.
- Achieves superior streaming efficiency, reducing Time-to-First-Audio (TTFA) to 1296 ms while maintaining real-time factor (RTF) below 0.8.

## Problem

Streaming text-to-speech with streaming text input faces two primary bottlenecks: unnatural prosody caused by restricted receptive fields and missing future text lookahead, and long-form performance collapse caused by unbounded generation history in cross-modality interleaved LLM architectures (like CosyVoice or Qwen3TTS). Prior approaches rely on complex causal attention alterations or precise manual force-alignments. Addressing this is crucial for interactive dialogue and speech-to-speech translation systems where text arrives incrementally.

## Method

The method builds on the CosyVoice2 architecture, adapting only the Qwen-based LLM while keeping flow-matching and the HiFi-GAN vocoder frozen. It introduces a special token (`marker_boundary`) inserted stochastically into text sequences during training via Dynamic Boundary Insertion, utilizing word-level timestamps from WhisperX to truncate target speech tokens at aligned audio endpoints. The full-utterance retention probability is set to p_full = 0.15, speech tokens operate at 25 Hz, and minimum truncated length is l_min = 5 frames.

During inference, input text is processed in chunks of k words with a lookahead of f future words. To prevent unbounded KV-cache growth, a sliding-window prompt replaces historical text and speech tokens with the text and generated speech tokens from the immediate previous chunk. This bounds the context window to O(k + f), avoiding semantic drift and hallucinations while enabling incremental waveform synthesis via a streaming vocoder.

## Experimental setup

Evaluated on the English subset of CommonVoice 13.0 (~930k utterances, ~1,000 hours) for training, using Seed-TTS-Eval for standard evaluation and an LLM-expanded (DeepSeek-V3) long-form benchmark (280-320 words per paragraph). Baselines include the native CosyVoice2 interleaved streaming implementation and a naive sliding-window approach. Metrics include Word Error Rate (WER via Parakeet-TDT-0.6B-v2), Speaker Similarity (SPK-SIM via WavLM-Large), Emotional Similarity (EMO-SIM via emotion2vec+), TTFA, and RTF measured on a single NVIDIA A40 GPU (48 GB VRAM).

## Results

On the standard Seed-TTS-Eval tier, the proposed boundary-aware method achieves a WER of 4.03% (vs 7.48% for interleaved and 6.03% for sliding-window), an SPK-SIM of 0.64, and an EMO-SIM of 0.918. On the long-form benchmark, the interleaved baseline suffers catastrophic collapse with a WER of 70.97% due to unbounded context growth, whereas the proposed method maintains a stable WER of 4.77%, SPK-SIM of 0.65, and EMO-SIM of 0.912. Ablations show that a chunk size of k >= 3 words stabilizes linguistic generation, while excessive lookahead relative to chunk size (e.g., k = 10, f = 6) increases long-form WER to 12.98%.

| System | Standard WER (%) ↓ | Long-form WER (%) ↓ | Standard SPK-SIM ↑ | Long-form SPK-SIM ↑ |
|---|---|---|---|---|
| Interleaved | 7.48 | 70.97 | 0.53 | 0.56 |
| Sliding-Window | 6.03 | 7.83 | 0.57 | 0.22 |
| Boundary-Aware (Ours) | 4.03 | 4.77 | 0.64 | 0.65 |

## Limitations

Evaluated exclusively on English datasets and a single base architecture (CosyVoice2), leaving multilingual generalization and transfer to other LLM-TTS families unverified. The performance is sensitive to hyperparameter tuning between chunk size and lookahead, where excessive lookahead degrades long-form syntactic stability.

## Why read this

Speech and ML engineers building real-time interactive voice agents or speech-to-speech translation pipelines should read this to learn how to adapt frozen LLM-TTS models for stable long-form streaming using weak alignments instead of costly manual annotations.

## Code

- https://charlieliu331.github.io/Prosodic-Boundary-Aware-Streaming-Text-TTS/

## Applications

Real-time conversational voice assistants, duplex dialogue agents, and low-latency speech-to-speech translation systems.

## Institutions / 機構

Nanyang Technological University, Tianjin University, Southeast University

**Funding / 經費:** RIE2025 Industry Alignment Fund - Industry Collaboration Projects, A*STAR, Alibaba Group, NTU Singapore, Alibaba-NTU Global e-Sustainability CorpLab

## Related

- (link related pages by id as the wiki grows)
