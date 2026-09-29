---
id: yang26c_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["National Taiwan University"]
code: https://github.com/danielqwer/MUGEN
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-530
pdf: https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.pdf
---

# MUGEN: Evaluating and Improving Multi-audio Understanding of Large Audio-Language Models

*Chih-Kai Yang, Yun-Shao Tsai, Yu-Kai Guo, Ping-Le Tsai, Yen-Ting Piao, Hung-Wei Chen, Ting-Lin Hsiao, Yun-Man Hsu, Ke-Han Lu, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-530)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — MUGEN is a new benchmark for evaluating multi-audio understanding in Large Audio-Language Models (LALMs) across 35 tasks, revealing that model performance severely degrades as concurrent audio inputs scale. Applying Audio-Permutational Self-Consistency (APSC) yields accuracy gains of up to 6.74%.

## Key contributions

- Introduced the MUGEN benchmark comprising 35 audio-grounding tasks across 7 dimensions (1750 test instances total, covering speech, audio, and music via an audio-as-option multiple-choice framework).
- Exposed a critical capability gap where open-source and proprietary LALMs perform well on semantic tasks but drop significantly on non-semantic and paralinguistic attributes.
- Identified input scaling as a fundamental bottleneck, showing sharp accuracy declines as the number of concurrent audio inputs increases from 2 to 5.
- Demonstrated that training-free Audio-Permutational Self-Consistency (APSC) combined with Chain-of-Thought improves performance by up to 6.74% by mitigating positional bias.

## Problem

Current LALM evaluations are predominantly restricted to isolated, single-audio environments, ignoring real-world requirements such as audio-in-context learning, speech RAG, and multi-speaker analytics that demand joint reasoning over multiple audio segments simultaneously. Existing multi-audio attempts have narrow coverage of auditory attributes and small input scales, often relying heavily on text-based modalities or semantic shortcuts. Consequently, systematic evaluation across diverse non-semantic dimensions (e.g., emotion, prosody, tempo) and larger input scales remains unaddressed, masking the true limitations of models in complex acoustic environments.

## Method

MUGEN evaluates models via a 5-to-6 option multiple-choice audio grounding framework where all options are acoustic signals rather than text labels. The benchmark spans 35 tasks grouped into Semantics & Pragmatics, Speaker & Demographics, Affective & Paralinguistic State, Temporal Awareness, Acoustic Scene & Event Analysis, Music Analysis, and Compositional Acoustic Reasoning, utilizing 9,250 total audio clips with a mean duration of 8.6 seconds.

To address multi-audio reasoning failures without architectural retraining, the authors evaluate training-free strategies including Chain-of-Thought (CoT), standard Self-Consistency (SC) with 10 sampled responses via majority voting, and Audio-Permutational Self-Consistency (APSC). APSC randomizes the temporal order of audio candidates across 10 generations, mapping candidate indices back to original positions to mitigate positional bias and over-reliance on fixed audio placement.

Experiments leverage open-source LALMs (DeSTA2.5-Audio, Qwen2.5-Omni-7B, Audio Flamingo 3, Voxtral-Mini-3B/Small-24B, Phi-4-Multimodal-Instruct) run via vLLM alongside proprietary Gemini-3-pro and a cascaded ASR (Whisper-large-v3) + LLM baseline. Decoding uses greedy search (except Voxtral at temp 0.2 / top-p 0.95 and Gemini-3-pro at temp 1.0). Evaluation relies on an LLM-as-a-judge (Claude Haiku 4.5) to map free-form outputs to choices, achieving 99% human agreement.

## Experimental setup

Evaluated on the MUGEN benchmark (1750 total test instances across 35 tasks, 9,250 audio clips). Baseline models include DeSTA2.5-Audio, Qwen2.5-Omni-7B, Audio Flamingo 3, Voxtral-Mini-3B, Voxtral-Small-24B, Phi-4-Multimodal-Instruct, Gemini-3-pro (Low/High thinking levels), and a Whisper-large-v3 + Gemini-3-pro cascaded baseline. The metric is multiple-choice accuracy evaluated via Claude Haiku 4.5 as an automated judge.

## Results

Overall accuracy across open-source LALMs is poor, ranging from 17.43% (Audio Flamingo 3) to 28.69% (Qwen2.5-Omni-7B), which is comparable to the cascaded ASR+LLM baseline (30.06%). The proprietary Gemini-3-pro (High) achieves the best overall performance at 69.60%. Performance is severely imbalanced: semantic tasks achieve high accuracy (e.g., Gemini-3-pro reaches 90.67% on S&P), whereas temporal awareness and non-semantic reasoning drop drastically.

In input scaling experiments (reducing candidates from 5 to 2), Qwen2.5-Omni retains only 66% (without reference audio) and 48% (with reference audio) of its 2-candidate accuracy when scaled to 5 candidates, while Gemini-3-pro retains around 80%. For improvement strategies, standard CoT yields negligible (-0.12% to +0.86%) or negative changes, indicating perceptual bottlenecks cannot be solved by text reasoning alone. Standard SC yields up to +3.14%, whereas APSC alone yields up to +6.28%, and APSC combined with CoT achieves peak gains of +6.74% for Gemini-3-pro (Low).

| System / Condition | Semantics & Pragmatics | Speaker & Demographics | Affective & Paralinguistic | Temporal Awareness | Acoustic Scene & Event | Music Analysis | Compositional Reasoning | Overall Accuracy |
|---|---|---|---|---|---|---|---|---|
| Qwen2.5-Omni-7B | 70.00 | 12.00 | 32.50 | 15.20 | 10.80 | 53.20 | 18.00 | 28.69 |
| Voxtral-Small-24B | 64.67 | 27.50 | 32.50 | 22.80 | 22.40 | 25.60 | 16.80 | 28.63 |
| Audio Flamingo 3 | 25.33 | 22.50 | 15.00 | 21.20 | 23.20 | 1.20 | 19.20 | 17.43 |
| ASR + LLM (High) | 82.67 | 16.50 | 27.75 | 28.80 | 26.00 | 26.00 | 22.40 | 30.06 |
| Gemini-3-pro (Low) | 89.33 | 68.00 | 77.00 | 48.00 | 55.60 | 69.60 | 69.20 | 67.66 |
| Gemini-3-pro (High) | 90.67 | 71.50 | 77.50 | 53.60 | 56.80 | 68.40 | 72.80 | 69.60 |

## Limitations

The benchmark tasks are restricted to multiple-choice formats with 2 to 5 candidate audios and a single reference audio, which may not capture open-ended, continuous multi-audio dialogue dynamics. APSC and SC strategies incur significant computational overhead by requiring 10 concurrent generations per test instance. The evaluation focuses entirely on discrete grounding constraints rather than generation or streaming tasks.

## Why read this

Speech and ML researchers building multi-audio agents or RAG systems should read this to understand the fundamental input scaling and acoustic perception bottlenecks of current LALMs. It provides actionable inference-time strategies like APSC to mitigate positional biases.

## Code

- https://github.com/danielqwer/MUGEN

## Applications

Multi-speaker analytics, audio-based in-context learning, speech retrieval-augmented generation (RAG), and cross-utterance acoustic event matching for voice agents.

## Institutions / 機構

National Taiwan University

**Funding / 經費:** Ministry of Education, NTU Artificial Intelligence Center of Research Excellence, Taiwan Centers of Excellence in Artificial Intelligence

## Related

- [UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models](zhou26c_interspeech.md) — shared data / evaluation · relatedness 2.8/3
- [PolyBench: A Benchmark for Compositional Reasoning in Polyphonic Audio](chen26aa_interspeech.md) — shared data / evaluation · relatedness 2.7/3
- [MSU-Bench: Towards Understanding the Conversational Multi-Speaker Scenarios](sun26j_interspeech.md) — shared data / evaluation · relatedness 2.4/3
- [A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs](lee26o_interspeech.md) — same problem · relatedness 2.4/3
- [AURA Score: A Metric for Holistic Audio Question Answering Evaluation](dixit26_interspeech.md) — shared data / evaluation · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
