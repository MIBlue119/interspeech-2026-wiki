---
id: sunder26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2441
pdf: https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.pdf
---

# Parameter-Efficient Adaptation of Speech-Aware LLMs for Timestamp Prediction

*Vishal Sunder, Samuel Thomas, Xulin Fan, Brian Kingsbury, George Saon, Avihu Dekel, Luis Lastras*

[PDF](https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2441)

**TL;DR** — The paper introduces a parameter-efficient, two-step generation framework for speech recognition with timestamps (SRWT) in speech LLMs, achieving a state-of-the-art 27ms alignment error in English while maintaining a word error rate identical to the base model.

## Key contributions

- A two-step generation design that first decodes the transcript and then regenerates it with interleaved timestamps, decoupling text recognition from temporal localization.
- Mod-aLoRA (activated Low-Rank Adaptation), a novel modular adaptation framework for speech LLMs that enables KV-cache reuse from the base model while keeping task adapters dormant until an invocation token.
- Comprehensive empirical evaluation showing a 35% relative improvement in English timestamp alignment error (27.1ms AAS) over prior baselines without any WER degradation.
- Strong zero-shot multilingual transfer capabilities, achieving 37.3ms average alignment error when trained exclusively on English timestamp data.

## Problem

Modern speech LLMs either suffer from degraded transcription quality when forced to perform one-pass joint timestamp-text generation, or they rely on disconnected external aligners (like GMM-HMM forced aligners, CTC models, or DTW-based phoneme aligners) that do not natively integrate into speech LLMs. Existing two-pass or one-pass integration methods often break text coherence or require full-model fine-tuning. This creates a tension as speech LLMs scale to multiple tasks, because full fine-tuning risks catastrophic forgetting of base transcription and translation capabilities while failing to preserve precomputed KV representations.

## Method

The base speech-LLM consists of a 16-layer Conformer speech encoder (1024 hidden dim, 8 heads), a 2-layer Q-Former projector (downsampling audio by 5x to an LLM dimension of 2048), and a 1-billion parameter LLM (40 transformer layers, 2048 hidden dim, 16 attention heads, grouped query attention with 4 KV heads, RoPE, SiLU, and a 100,352 token vocabulary). The base LLM is fine-tuned via standard LoRA (LoRAA) with rank r=64 and scaling factor 0.5 across all linear projections. 

To predict timestamps without hurting transcript quality, the paper uses a two-step framework. Instead of predicting absolute start and end times, the target format uses explicit silence tokens (~~) and end-time tags for each word (e.g., hello|30), allowing the start time to be inferred from the preceding word's end time (units of 10ms). The authors contrast three adaptation variants: (1) Non-Mod, which continually fine-tunes the base LoRA and projector on original tasks plus SRWT but destroys true modularity; (2) Mod-LoRA, which merges base LoRA weights and trains isolated timestamp adapters (LoRAT, LoRAPrT) in a two-pass setup that forces full KV-cache recomputation; and (3) Mod-aLoRA, which freezes merged base weights and uses a binary mask to keep timestamp adapters dormant until a designated invocation token (<|timestamp|>) is encountered. Upon encountering this token, the model activates LoRAT and re-injects audio via LoRAPrT, seamlessly reusing the base model's KV cache from the first decoding step.

Training uses pad-free training with FlashAttention. The base model is trained for 900k steps (batch size 128, lr 1e-4 with linear decay after 1000 warmup steps). Non-Mod is continually fine-tuned for 800k steps at 4e-5, while modular variants are trained for 800k steps at 1e-4 exclusively on SRWT data.

## Experimental setup

The training data pools LibriSpeech, Multilingual LibriSpeech (en, fr, de, pt, es), CommonVoice (en, fr, de, pt, es), VoxPopuli (en, fr, de, es), AMI-IHM, Switchboard, TIMIT, Buckeye, and YODAS. High-quality word-level targets are generated via the Montreal Forced Aligner (MFA) and validated using CTC-based forced alignment shifts, retaining the top 95% for English and 70% for non-English data (capped at 4M YODAS and 5M MLS samples). Baselines include Qwen3 Forced Aligner, In-sync, CrisperWhisper, Canary-v2, and WhisperX. Evaluation metrics are Accumulated Average Shift (AAS) in milliseconds for temporal accuracy and Word Error Rate (WER) for transcription fidelity.

## Results

On English benchmarks, Non-Mod achieves the best average AAS of 27.1ms (a 35% relative improvement over Qwen3-FA's 41.8ms and 49% over CrisperWhisper's 53.1ms) while matching the base speech-LLM's WER of 7.3%. Mod-LoRA and Mod-aLoRA match this 7.3% WER and yield competitive AAS scores of 28.7ms and 28.6ms respectively, confirming that parameter-efficient modular adaptation preserves core ASR performance. On multilingual evaluation, Mod-aLoRA achieves the best average AAS of 21.2ms (outperforming Non-Mod's 22.9ms and Mod-LoRA's 23.9ms), demonstrating that inheriting the base model's pretrained KV cache preserves low-resource multilingual acoustic representations. In zero-shot multilingual transfer (trained solely on English SRWT), Mod-aLoRA dramatically outperforms Non-Mod (37.3ms average AAS vs 339.5ms), proving that modular isolation prevents overfitting to language-specific timing cues.

| System | English AAS (ms ↓) | English WER (% ↓) | Multilingual AAS (ms ↓) | Multilingual WER (% ↓) |
|---|---|---|---|---|
| Speech-LLM (ASR baseline) | - | 7.3 | - | 5.3 |
| Qwen3-FA | 41.8 | - | 33.3 | - |
| CrisperWhisper | 53.1 | 10.6 | 50.1 | 8.1 |
| Non-Mod | 27.1 | 7.3 | 22.9 | 5.2 |
| Mod-LoRA | 28.7 | 7.3 | 23.9 | 5.3 |
| Mod-aLoRA | 28.6 | 7.3 | 21.2 | 5.3 |

## Limitations

The evaluation is constrained to datasets with reliable forced-alignment pseudo-labels or native annotations, which may inherit alignment errors from base aligners like MFA or CTC models. The framework relies on a fixed 1-billion parameter LLM backbone and a specific Conformer-Q-Former speech encoder architecture, leaving the scaling behavior to much larger LLMs (e.g., 7B+ parameters) unexplored. Furthermore, zero-shot evaluations were only tested for transfer from English to a specific set of European languages.

## Why read this

Speech and ML engineers building production speech LLMs should read this to learn how to add word-level timestamp prediction without sacrificing base transcription accuracy or incurring catastrophic forgetting across multi-task training schedules. It offers a definitive blueprint for combining KV-cache reuse with modular adapter design via aLoRA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Closed captioning, automated transcript synchronization, keyword-based audio retrieval, and fine-grained speech-text alignment tools.

## Related

- (link related pages by id as the wiki grows)
