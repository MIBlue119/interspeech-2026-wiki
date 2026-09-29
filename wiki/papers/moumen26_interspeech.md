---
id: moumen26_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["University of Cambridge"]
code: https://github.com/speechbrain/speechbrain
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1873
pdf: https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.pdf
---

# Measuring the Redundancy of Decoder Layers in SpeechLLMs

*Adel Moumen, Guangzhi Sun, Philip C Woodland*

[PDF](https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1873)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper investigates layer redundancy in SpeechLLMs across multiple model scales and families, demonstrating that up to 43.8% of decoder layers can be pruned without significant performance loss via joint projector-decoder healing.

## Key contributions

- Demonstrates that SpeechLLM decoder redundancy is primarily inherited from the pretrained text LLM, showing nearly identical inter-layer angular distance patterns between text-only and speech-routed inputs.
- Establishes a quantitative relationship between model scale and prunable capacity on ASR, proving that 7-8B parameter models tolerate removing up to 43.8% of decoder layers.
- Identifies that joint adaptation (healing both the receiving decoder MLP via LoRA and unfreezing the projector) is critical for restoring performance post-pruning.
- Proves cross-task and cross-modal path transferability, showing that ASR-optimal and AST-optimal pruning layers closely coincide across different source languages and speech encoders.

## Problem

Speech Large Language Models (SpeechLLMs) typically route speech encoder representations through a pretrained LLM decoder that consumes over 90% of total parameters, yet downstream speech tasks require far less capacity than general text tasks. Prior research has identified structural redundancies within standalone LLMs and speech encoders separately, but the excess capacity and redundancy of SpeechLLM decoders remain uncharacterized. This leaves practitioners with overparameterized models that are computationally expensive and lack systematic guidelines for compression.

## Method

The study adopts the SLAM framework, combining a WavLM Large (or Whisper Large v3) speech encoder, a single-hidden-layer GELU MLP projector, and a pretrained LLM decoder (drawn from the Qwen2.5 [1-7B] and Llama [1-3.2B/8B] families). Redundancy is measured using the angular distance $d(\mathbf{h}_\ell, \mathbf{h}_{\ell+n})$ between hidden states of candidate layer blocks over validation sets to locate optimal pruning paths.

To repair representation mismatch after removing contiguous blocks of layers $\ell^*+1, \dots, \ell^*+n-1$, the framework applies post-pruning healing. The receiving layer's MLP block is adapted using rank-64 LoRA adapters ($\alpha=64$, dropout 0.05) on attention projections ($\mathbf{q}, \mathbf{k}, \mathbf{v}, \mathbf{o}$), while the projector is simultaneously unfreed and re-optimized for 5,000 iterations using the Adam optimizer with a peak learning rate of $5 \times 10^{-4}$ and linear warmdown.

Inference uses greedy decoding with the Whisper English text normaliser for ASR evaluation and SacreBLEU for speech translation. The key design choice of joint projector-decoder healing was implemented because removing layers shifts internal input distributions, rendering static projector alignments stale and requiring localized residual correction at the receiving interface.

## Experimental setup

Evaluated on LibriSpeech (960 hours training, evaluated on test-clean and test-other), Loquacious (out-of-domain dev set), and CoVoST2 for speech translation (En$\to$De with 428 hours, Fr$\to$En with 264 hours). Compared across Qwen2.5 (1.5B, 3B, 7B) and Llama 3.1/3.2 (1B, 3B, 8B) families. Metrics include Word Error Rate (WER) for ASR and BLEU for AST, with relative degradation thresholds set to $\Delta \text{WER} \le 0.25$ and $\Delta \text{BLEU} \le 0.10$. Training runs on $2 \times$ H100 80GB GPUs using batch sizes of 8 for 50,000 to 75,000 iterations.

## Results

For Qwen2.5-7B, pruning 28.6% of decoder layers yields a WER of 2.36 on test-clean and 4.83 on test-other (compared to baseline 2.01 and 4.77), while Llama 3.1-8B tolerates a 43.8% layer drop resulting in a test-clean WER of 3.28 (vs 2.65 baseline). Smaller models show reduced pruning tolerance, such as Llama-3.2-1B which only tolerates a 6.3% layer drop under the strict threshold. Joint projector-decoder healing vastly outperforms decoder-only healing, where Qwen2.5-7B yields 2.36% WER with joint healing versus 5.93% with decoder-only healing.

In speech-to-text translation on CoVoST2, applying the ASR-optimal pruning path allows dropping up to 32.1% of layers while maintaining competitive BLEU scores (e.g., Fr$\to$En drops from 39.03 to 36.12 BLEU). Pruning fails to win or maintain stability when applied aggressively past specific size thresholds, causing models to drop below the performance tiers of smaller native architectures, and LoRA-adapted decoders paradoxically exhibit reduced pruning tolerance (17.9% drop for Qwen2.5-7B + LoRA) despite showing heightened internal representation similarity.

| System / Condition | Layers Dropped (%) | LibriSpeech clean (WER) | LibriSpeech other (WER) | Loquacious dev (WER) |
|---|---|---|---|---|
| Qwen2.5-7B (Baseline) | – | 2.01 | 4.77 | 12.21 |
| Qwen2.5-7B (+ Pruning) | 28.6% | 2.36 | 4.83 | 14.91 |
| Llama-3.1-8B (Baseline) | – | 2.65 | 5.03 | 20.50 |
| Llama-3.1-8B (+ Pruning) | 43.8% | 3.28 | 6.28 | 18.92 |
| Qwen2.5-3B (Baseline) | – | 2.22 | 4.83 | 17.24 |
| Qwen2.5-3B (+ Pruning) | 30.6% | 2.53 | 5.12 | 16.69 |

## Limitations

The evaluation is restricted to sequence-to-sequence ASR and AST tasks using specific architectures (WavLM, Whisper, Qwen2.5, and Llama), leaving open whether findings extend to streaming speech recognition, speech generation, or speaker tasks. The post-pruning healing process requires additional task-specific fine-tuning data and compute cycles. Furthermore, pruning thresholds are empirically bounded by relative degradation limits that may cause catastrophic collapse if exceeded beyond small model capacity baselines.

## Why read this

Speech and ML engineers looking to deploy large speech-language models efficiently will learn a practical recipe for compressing heavy decoder backbones by over 40% with minimal accuracy loss. Researchers will gain conceptual insights into how modular redundancy is transferred directly from pretrained text LLMs into multimodal speech pipelines.

## Code

- https://github.com/speechbrain/speechbrain

## Applications

Deploying on-device or low-latency multilingual speech recognition and translation services using heavily compressed, task-adapted SpeechLLM backbones.

## Institutions / 機構

University of Cambridge

## Related

- (link related pages by id as the wiki grows)
