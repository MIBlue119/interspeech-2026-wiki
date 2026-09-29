---
id: kim26s_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2532
pdf: https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.pdf
---

# Do Modern Video-LLMs Need to Listen? A Benchmark Audit and Scalable Remedy

*Geewook Kim, Minjoon Seo*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2532)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`

**TL;DR** — The paper audits 10 video benchmarks to show that most can be solved using vision alone (e.g., GPT-4o gets 76% on AVQA muted), and introduces a causal Mamba-based audio token compressor that achieves 25-fold reduction to enable efficient, long-form audio-visual Video-LLM reasoning.

## Key contributions

- Audited 10 video benchmarks with a conservative single-frame filtering protocol to expose visual shortcuts, releasing the filtered splits.
- Conducted a systematic comparison of input integration policies (visual-only, non-interleaved, time-aligned interleaved) for video and audio streams.
- Proposed a causal Mamba-based audio token compressor (UniMambaMia) that achieves a 25x reduction in audio tokens while gracefully preserving temporal context.
- Demonstrated clear performance gains on speech-dependent tasks after filtering out visual shortcuts, without bloating inference latency.

## Problem

Modern Video-LLMs routinely discard audio streams, treating video understanding as a purely visual task. The authors identify a structural flaw in the field: widely used video QA benchmarks like ActivityNetQA, NExTQA, and AVQA harbor heavy visual shortcuts, allowing models to achieve high scores using only a single muted frame. This misleads researchers into thinking speech encoders are unnecessary, while uncompressed audio ingestion leads to crippling memory overhead and latency on long-form videos.

## Method

The model builds upon LLaVA-OneVision, coupling a frozen SigLIP2 vision encoder and a frozen Whisper-based encoder (from Qwen2-Audio) to a Qwen2-7B LLM. To handle the massive token rate of audio (25 Hz to 50 Hz), the authors design a periodic-query compression module inserted between the audio encoder and the LLM, achieving a 25-fold token reduction (from 25 Hz down to 1 Hz, transforming ~90K tokens per hour into ~3.6K tokens). Five compressor architectures are evaluated: parameter-free average pooling (Avg Pool), a cross-attention Resampler, UniMamba (causal SSM), BiMamba (bidirectional SSM), and UniMambaMia (a causal Mamba backbone paired with a gated attention mechanism that re-weights tokens by pooled context). Time-aligned interleaving places compressed audio tokens adjacent to temporally corresponding video frame tokens, enabling causal processing essential for streaming inference.

Training proceeds in stages: image-level instruction tuning, module-only alignment of the audio compressor using subsets of LLaVA-VideoSet and FineVideo-Set (188K samples), and final video instruction tuning unfreezing the LLM with 420K samples. Learning rates are set to 1e-4 for module alignment and 2e-5 for LLM tuning. Inference utilizes 32 frames sampled at 1.0 fps.

## Experimental setup

Evaluated across 10 benchmarks spanning vision-centric suites (VideoMME, TempCompass, ActivityNetQA, NExTQA, LongVideoBench), audio-visual QA (Music-AVQA, AVQA), and modern audio-visual suites (AVSpeakerBench, VideoMMMU, WorldSense). Baselines include Qwen2-VL, LLaVA-OneVision, LLaVA-Video, LLaVA-NeXT-Video, Qwen2.5-Omni, VideoLLaMA2, and VAMBA. Metrics are accuracy scores evaluated on both original datasets and single-frame filtered subsets. Models are trained using 3 random seeds; inference latency and memory are measured on a single A100 80GB GPU.

## Results

On unfiltered benchmarks, audio integration with Avg Pool improves scores on 6 out of 10 tasks, with notable gains on AVSpeakerBench (+3.0) and VideoMME (+2.4). After single-frame filtering removes visual shortcuts, AVQA accuracy drops from ~92% to ~73%, but audio integration yields clear gains on speech-dependent benchmarks like AVSpeakerBench (43.7 vs 40.7), LongVideoBench (48.6 vs 46.7), and VideoMME (52.0 vs 49.6). Among compressors at 25x reduction, UniMambaMia achieves the highest average filtered score of 48.8, outperforming Avg Pool (47.8) and standard Resamplers (46.7), while scaling inference latency down to 1.60 seconds per sample compared to 4.12 seconds for uncompressed Qwen2.5-Omni.

| System / Condition | AVQA (Filtered) | AVSpeakerBench | VideoMME (Filtered) | Latency (s) |
|---|---|---|---|---|
| LLaVA-Video | 57.6 | 43.3 | 52.6 | 1.00 |
| Qwen2.5-Omni (Uncompressed) | 68.3 | 47.0 | 56.0 | 4.12 |
| Ours (Avg Pool 25x) | 73.9 | 43.7 | 52.0 | 1.60 |
| Ours (UniMambaMia 25x) | 74.5 | 44.1 | 54.4 | 1.60 |

## Limitations

The single-frame filtering protocol is conservative and only removes items solvable by a single central frame, potentially missing items solvable by multi-frame visual contexts without audio. The audio encoder relies on Whisper, limiting performance on non-speech acoustic domains like complex musical reasoning (as evidenced by Music-AVQA). Additionally, extreme compression ratios beyond 25x cause degradation in audio token fidelity.

## Why read this

Read this paper if you build multimodal video LLMs or speech-language models and want a rigorous audit of why current benchmarks fail to reward listening. It provides a practical, scalable recipe for compressing high-rate audio streams via causal Mamba modules without exploding inference latency.

## Code

- https://github.com/naver-ai/unimambamia-av

## Applications

Real-time streaming video assistant applications, automated meeting transcription and summarization, and interactive audio-visual lecture comprehension agents.

## Institutions / 機構

NAVER Cloud, KAIST

## Related

- (link related pages by id as the wiki grows)
