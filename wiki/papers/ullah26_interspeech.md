---
id: ullah26_interspeech
category: audio-captioning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2618
pdf: https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.pdf
---

# Music Artistic Captioning: Towards Translating Music into Expressive Language

[PDF](https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2618)

**TL;DR** — The paper introduces Music Artistic Captioning (MAC), a training-free framework that generates long-form, grounded music descriptions by conditioning an instruction-following LLM on multi-scale audio evidence.

## Problem

Existing music automated captioning systems rely on scarce paired audio-text data and tend to overfit to short clips, failing to maintain coherence and multi-layer semantic understanding over minutes-long audio tracks. This causes captioners to either produce generic labels or hallucinate when describing narrative-rich, evolving works like operas and orchestral suites. Grounding long-form captions is particularly challenging because naive prompting drifts over time, while standard retrieval-augmented methods lack fine-grained temporal anchoring.

## Method

MAC is a modular, training-free framework consisting of three main stages: multi-scale music structure analysis (partitioning audio into global song-level, functional segment-level, and local frame-level segments), multi-resolution audio encoding (extracting low-level acoustic descriptors like tempo and dynamics via MIR tools, and high-level semantics like genre, instruments, and emotions via pretrained MERT and regression heads), and hierarchical evidence-grounded LLM captioning. The framework verbalizes these evidence dictionaries into natural-language pseudo-evidence, constructs hierarchical contexts by linking segments to neighbors and global summaries, and validates JSON outputs through deterministic checks. To balance narrative style and evidence faithfulness without weight updates, MAC utilizes a one-time Iterative Prompt Optimization (IPO) loop driven by an LLM-as-judge and BERTScore. The system uses GPT-OSS 20B served via vLLM, processing audio resampled to 24 kHz on dual RTX 3090 GPUs.

## Results

Evaluated on short-form benchmarks (MusicCaps, MQAD subset, Song Describer) and long-form/artistic datasets (Wagner Ring Cycle opera corpus, MSD full tracks), MAC demonstrates superior cross-dataset generalization without paired fine-tuning. On the MQAD dataset, MAC achieves top scores across standard NLP metrics, while on no-reference artistic evaluations, it leads in emotional alignment (Emo) and artistic score (Art) compared to baselines like Qwen-Omni and FUTGA. Ablation studies confirm that removing hierarchical context severely degrades long-horizon coherence and artistic score, while removing IPO reduces emotional expressivity and evidence faithfulness. In LLM-as-a-judge evaluations using GPT-5 and Gemini, MAC consistently outperforms or matches ablations in completeness and fluency.

## Code

- https://github.com/uu95/MAC

## Applications

Speech and audio engineers, music information retrieval researchers, and digital media creators building automated program-note generators, long-form music streaming analysis tools, or narrative-driven audio-language interfaces.

## Limitations

The evaluation of long-form artistic music captioning remains challenging, relying on indirect LLM judges and heuristic no-reference metrics that share overlaps with the audio feature extractors used during generation.

## Related

- (link related pages by id as the wiki grows)
