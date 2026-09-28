---
id: kim26s_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2532
pdf: https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.pdf
---

# Do Modern Video-LLMs Need to Listen? A Benchmark Audit and Scalable Remedy

[PDF](https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2532)

**TL;DR** — Integrating a causal Mamba-based audio token compressor into LLaVA-OneVision enables efficient 25-fold audio compression, yielding clear performance gains on speech-dependent video benchmarks once visual-only shortcuts are filtered out.

## Problem

Video large language models (Video-LLMs) routinely exclude speech and audio encoders, treating audio streams as dispensable during video understanding. The authors discover that this omission is driven by a structural issue: widely used video benchmarks—even those marketed as audio-visual—admit severe visual shortcuts, allowing high performance from muted visual inputs alone. Consequently, standard evaluation pipelines mask the true utility of audio-visual reasoning and underestimate the importance of speech comprehension in video tasks.

## Method

The authors audit 10 video benchmarks using a conservative single-frame filtering protocol with GPT-4o to isolate items requiring genuine listening. Building on LLaVA-OneVision (using SigLIP2 vision encoder, Qwen2-7B LLM, and the Whisper-based audio encoder from Qwen2-Audio), they evaluate three input policies: visual-only, non-interleaving, and time-aligned interleaving. They compare five audio compressor architectures under a 25-fold token reduction (from 25 Hz to 1 Hz) using a periodic-query framework. The final selected model, UniMambaMia, employs a causal Mamba backbone combined with a gated attention module to re-weight compressed tokens, making it compatible with streaming inference. Training involves image-level instruction tuning, module-only alignment of the compressor on 188K samples, and final video instruction tuning on 420K samples while keeping both encoders frozen.

## Results

Evaluated across 10 benchmarks (including VideoMME, AVQA, AVSpeakerBench, LongVideoBench, and WorldSense), the proposed method achieves superior or tied-best performance among Qwen2-7B models on 7 out of 10 benchmarks. After single-frame filtering removes visually solvable items, audio integration delivers consistent gains on speech- and grounding-dependent benchmarks, such as +3.0 percentage points on AVSpeakerBench and +2.4 pp on VideoMME. Ablations show that causal Mamba-based compression (UniMambaMia) matches or outperforms bidirectional Mamba and attention-based resamplers while gracefully limiting performance degradation to only -0.5 pp at 25× compression, compared to -1.8 pp for average pooling. Furthermore, compression cuts peak inference GPU memory to ~34 GiB (versus ~62 GiB for uncompressed 25 Hz pipelines) and reduces per-sample latency to 1.60 seconds.

## Code

- https://github.com/naver-ai/unimambamia-av

## Applications

Speech and ML engineers building video-LLMs for long-form video understanding, meeting transcription summarization, lecture analysis, and real-time streaming audio-visual assistants.

## Limitations

Music-oriented benchmarks (such as Music-AVQA) show minimal benefit from the speech-oriented encoder due to domain mismatch and a high rate of single-frame visual shortcuts.

## Related

- (link related pages by id as the wiki grows)
