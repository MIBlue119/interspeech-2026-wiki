---
id: ullah26_interspeech
category: audio-understanding
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2618
pdf: https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.pdf
---

# Music Artistic Captioning: Towards Translating Music into Expressive Language

*Ubaid Ullah, Hyun-Chul Choi, Zied Bouraoui*

[PDF](https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ullah26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2618)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — Music Artistic Captioning (MAC) is a training-free framework that conditions an instruction-following LLM on automatically extracted multi-scale audio evidence to generate long-form, expressive music narratives, achieving superior emotional and artistic alignment on narrative-rich tracks like opera compared to existing supervised models.

## Key contributions

- A training-free modular architecture that links low-level acoustics and high-level semantic descriptors across global, functional, and local time scales to ground long-horizon LLM generation.
- A hierarchical context construction method that pairs target segments with their structural neighbors and global summaries to ensure temporal coherence and narrative flow over multi-minute audio.
- Iterative Prompt Optimization (IPO), a lightweight, reflective one-time prompt calibration loop balancing stylistic narration voice with evidence faithfulness.
- A comprehensive evaluation protocol for narrative-rich long-form music (such as opera) incorporating semantic alignment, emotional agreement, and an explicit 'Art' score combining factuality, expressivity, and coherence.

## Problem

Automated music captioning for long-form, narrative-rich works (like operas or multi-minute orchestral pieces) remains difficult because audio-LLM pipelines typically target short 10-30 second clips and rely on scarce paired training data. Supervised fine-tuning often causes models to overfit to dataset-specific phrasing, leading to poor cross-dataset transfer and hallucinated prose that lacks grounding in audible structures. Consequently, prior approaches fail to sustain a program-note-like artistic style while faithfully tracking evolving rhythms, instrumentation, and affect over minutes of audio.

## Method

The MAC pipeline operates in three sequential stages. First, Music Structure Analysis (MSA) partitions the input audio waveform into multi-scale temporal bases: global (coarse equal-length splits across duration T), functional (segment-level boundaries via MSAF novelty/recurrence cues), and local (5.0-second sliding frames). Second, Multi-Resolution Audio Encoding extracts low-level acoustic features via standard MIR tools and BeatNet (tempo tau, meter m, onset rate rho, dynamics e; total da = 4), while a pretrained MERT music foundation model provides high-level semantic distributions (genre, instrument, mood, vocals, tags) and a 28-dimensional emotion vector via regression heads. These features are thresholded (confidence threshold theta = 0.1, top-k = 5 labels, top-n = 3 aggregations) and structured into per-scale evidence dictionaries.

Third, Evidence-Grounded LLM Captioning verbalizes evidence dictionaries into natural-language prompt contexts using an NL summarizer and builds a hierarchical context string combining global summaries, functional/local targets, and nearest-neighbor segment data. An instruction-following LLM (GPT-OSS 20B served via vLLM at temperature 0.2, max tokens 2048) conditions on this context to output a JSON completion containing the caption field, which is checked by a deterministic validator for correct schema and minimum evidence mention.

To align generation with user-preferred styles without altering weights, MAC uses Iterative Prompt Optimization (IPO), a reflective meta-instruction loop. IPO optimizes system and instruction prompts by maximizing a combined objective function J balancing a coarse BERTScore F1 (alpha) against an LLM-as-judge evaluation (beta, where beta > alpha) assessing style match and evidence faithfulness. A single best prompt is cached per scale and reused across all evaluation tracks.

## Experimental setup

Experiments use benchmark datasets including MusicCaps (1.1k samples, 5.7 hours, 20s clips), an MQAD subset (1.1k samples, 9.1 hours, 30s AI captions), and Song Describer (706 samples, 23.2 hours, 2m clips), alongside artistic datasets comprising the Wagner Ring Cycle opera corpus (11 tracks, 15.1 hours) and full-length Million Song Dataset (MSD) tracks (100 tracks, 6.2 hours). Baselines include LP-MusicCaps, FUTGA, MU-LLaMA, MusiLingo, Qwen-Audio, and Qwen-Omni. Metrics include BLEU-1/2, METEOR, ROUGE-L, BERTScore-F1, MuQ-MuLan semantic similarity, CARER-based emotional agreement, an artisanal Art score, and 0-5 LLM-judge ratings from GPT-5 and Gemini. Hardware consists of two RTX 3090 (24GB) GPUs.

## Results

On the MQAD benchmark test split, MAC achieves leading performance across standard lexical overlap metrics, scoring 0.3112 in BLEU-1, 0.1414 in BLEU-2, and 0.2271 in METEOR, outperforming supervised models like FUTGA and Qwen-Omni due to effective IPO adaptation. On MusicCaps and SongDesc, where human reference captions rely heavily on sparse cultural cues or un-modeled stylistic preferences, MAC shows more moderate lexical gains but maintains robust zero-shot stability.

In no-reference artistic evaluations on the Wagner Opera and MSD Full datasets, MAC dominates emotional alignment (Emo: 0.80 on Opera vs. 0.66 for Qwen-Omni) and artistic quality (Art: 0.55 on Opera vs. 0.35 for FUTGA), though Qwen-Omni retains a slight edge in MuQ-MuLan semantic similarity (Sem: 0.60 vs. 0.51 on Opera) because global audio-text embeddings favor short, generic alignments over MAC's structured multi-paragraph prose. Ablation studies confirm that removing hierarchical context severely harms structural coherence and Art scores, while removing IPO degrades emotional expressivity.

| System | MQAD B1 | MQAD M | Opera Emo | Opera Art |
|---|---|---|---|---|
| Qwen-Omni | 0.1166 | 0.1056 | 0.66 | 0.25 |
| FUTGA | 0.1949 | 0.1654 | 0.49 | 0.35 |
| MAC w/o IPO | 0.2452 | 0.2070 | 0.78 | 0.43 |
| MAC (ours) | 0.3112 | 0.2271 | 0.80 | 0.55 |

## Limitations

The framework relies on automatic MIR feature extractors and foundation models (like MERT) whose pseudo-labels can introduce circularity into evaluation metrics that share the same underlying feature space. The evaluation of long-form artistic text relies heavily on proxy metrics and LLM-as-a-judge protocols, which remain indirect and subject to model calibration biases. Furthermore, the pipeline is bound by the scale and domain coverage of the underlying audio encoder and segment-boundary detection tools.

## Why read this

Speech and ML researchers working on audio-language generation should read this to learn how multi-scale evidence grounding and zero-shot iterative prompt optimization can bypass the data-scarcity and overfitting bottlenecks of fully supervised music captioners.

## Code

- https://github.com/uu95/MAC

## Applications

Automated generation of program notes, artistic commentaries, and rich narrative descriptions for classical, operatic, and long-form streaming music catalogs.

## Institutions / 機構

Yeungnam University, Univ. Artois, CRIL CNRS

**Funding / 經費:** National Research Foundation of Korea, Ministry of Science, ICT and Future Planning, Yeungnam University, ANR

## Related

- (link related pages by id as the wiki grows)
