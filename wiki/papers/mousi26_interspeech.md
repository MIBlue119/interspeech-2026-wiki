---
id: mousi26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1980
pdf: https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.pdf
---

# Said Aloud, Read Different: Cross-Modal Instability in Multimodal Models

*Basel Mousi, Fahim Dalvi, Shammur Absar Chowdhury, Firoj Alam, Nadir Durrani*

[PDF](https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1980)

**TL;DR** — The paper introduces a speech-augmented culturally grounded contrastive benchmark of 10,150 triplets and a new metric, Contrastive Instability (CI), revealing that speech inputs and non-English languages (specifically Arabic) substantially increase internal decision inconsistency in multimodal foundation models even when aggregate accuracy remains high.

## Key contributions

- Introduces M2CQA-S, a speech-augmented culturally grounded contrastive benchmark of 10,150 triplets spanning 18 MENA countries across English and Arabic.
- Proposes Contrastive Instability (CI), a triplet-level conditional metric that isolates internal decision incoherence and fragmented reasoning beyond aggregate accuracy.
- Performs a comprehensive cross-modal and cross-lingual evaluation of prominent multimodal foundation models (Qwen2.5-Omni, Qwen3-Omni-30B, Phi-4-multimodal-instruct) under clean and noisy speech conditions.
- Demonstrates that modality is not a neutral input channel and that joint speech-text signaling mitigates but does not fully eliminate cross-lingual speech-induced instability.

## Problem

Multimodal foundation models are increasingly deployed in speech-first interactive assistants, yet it remains unclear whether semantically equivalent queries yield consistent visually grounded decisions across modalities (text versus speech) and languages (such as English versus Arabic). Prior work primarily evaluates hallucination and accuracy within a single channel or via independent-sample benchmarks, failing to test whether models can coherently distinguish supported statements from plausible distractors. This gap matters because standard aggregate accuracy can mask underlying instability, where a model correctly answers individual queries in isolation while failing to make consistent discriminations within semantically matched groups.

## Method

The authors construct a contrastive evaluation dataset by pairing each image from 18 MENA countries with one visually supported statement (Q+) and two culturally plausible but unsupported alternatives (Q-), ensuring statements require image access via an image-blind filtering step using strong language models. English statements are translated into Arabic at the statement level, and spoken versions are synthesized using zero-shot neural text-to-speech (XTTS-v2) conditioned on human reference recordings for matched male/female voices. Controlled acoustic perturbations (nonstationary background noise and synthetic reverberation across various SNRs) are applied to test robustness under realistic conditions.

The core evaluation metric, Contrastive Instability (CI), is defined conditionally as the proportion of triplets with at least one correct statement that fail to achieve full consistency (correctly accepting Q+ while rejecting both Q- alternatives). The study evaluates models via the vLLM-Omni framework using greedy decoding to ensure reproducibility. Experiments test text-only, audio-only, and joint speech-text signaling inputs across model scales (Qwen2.5-Omni 3B and 7B, Qwen3-Omni-30B, and Phi-4-multimodal-instruct) to determine how capacity, language, acoustic degradation, and multimodality affect internal reasoning stability.

## Experimental setup

Evaluations are performed on a curated benchmark of 10,150 contrastive triplets spanning 18 MENA countries and five visual themes. Models tested include Qwen2.5-Omni (3B and 7B), Qwen3-Omni-30B-A3B-Instruct, and Phi-4-multimodal-instruct using the vLLM-Omni framework under greedy decoding. Metrics reported include Q+ accuracy, Q- accuracy, F1 score, and Contrastive Instability (CI).

## Results

Speech inputs significantly inflate Contrastive Instability (CI) while leaving aggregate accuracy relatively stable. For instance, Qwen2.5-3B in Arabic text achieves an F1 of 0.77 with a CI of 0.43, which jumps to an F1 of 0.51 and a CI of 0.71 under speech input. Arabic consistently exhibits much higher instability than English; Qwen3-30B achieves 0.20 CI in English text versus 0.28 in Arabic text, and 0.19 in English speech versus 0.47 in Arabic speech. Model scaling reduces CI (e.g., Arabic text CI drops from 0.43 to 0.35 and 0.28 from 3B to 30B), and joint speech-text input partially mitigates speech-induced instability compared to audio-only input, though it does not fully recover text-only performance.

| Model | Language | Mode | Q+ ↑ | Q- ↑ | F1 ↑ | CI ↓ |
|---|---|---|---|---|---|---|
| Q2.5-3B | en | Text | 0.93 | 0.91 | 0.92 | 0.20 |
| Q2.5-3B | en | Speech | 0.93 | 0.90 | 0.91 | 0.22 |
| Q2.5-3B | ar | Text | 0.66 | 0.92 | 0.77 | 0.43 |
| Q2.5-3B | ar | Speech | 0.35 | 0.94 | 0.51 | 0.71 |
| Q2.5-7B | ar | Speech | 0.88 | 0.62 | 0.73 | 0.63 |
| Q3-30B | ar | Speech | 0.92 | 0.73 | 0.81 | 0.47 |

## Limitations

The evaluation is restricted to English and Arabic, limiting generalizability to a broader typological range of languages. The synthetic speech relies on a specific zero-shot neural TTS model and might not capture the full diversity of natural human sociolinguistic variation, prosody, and disfluencies. Furthermore, the benchmark focuses specifically on region-specific visual and cultural contexts from MENA countries, which may constrain evaluation breadth.

## Why read this

Speech and ML researchers building spoken multimodal assistants should read this paper to understand that text-based evaluation and aggregate accuracy metrics are insufficient for ensuring model reliability across modalities. It offers concrete proof that speech and non-English languages introduce hidden internal decision instabilities that scaling alone does not solve.

## Code

- https://huggingface.co/datasets/QCRI/M2CQA-S

## Applications

Development and robust evaluation of speech-first multimodal virtual assistants, cross-lingual educational tools, and culturally grounded interactive AI systems.

## Related

- (link related pages by id as the wiki grows)
