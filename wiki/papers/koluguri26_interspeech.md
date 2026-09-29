---
id: koluguri26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-728
pdf: https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.pdf
---

# Preference-ASR: A Preference-Aware Test Set for Benchmarking ASR in the Era of Speech LLMs

*Nithin Rao Koluguri, Sasha Meister, Nikolay Karpov, Piotr Żelasko, Desh Raj, Jagadeesh Balam, Boris Ginsburg*

[PDF](https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-728)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Preference-ASR is a new benchmark and preference-aware normalizer that evaluates speech LLMs on following natural-language instructions for ASR formatting across normalization, entities, disfluencies, and casing. Benchmarking four systems reveals that standard WER masks major instruction-following capabilities and failure modes, such as prompt-driven entity hallucination.

## Key contributions

- Introduces Preference-ASR: a 3,210-sample English test set spanning four preference categories (normalization, entities, disfluencies, case) built from seven open-source corpora.
- Proposes a two-stage LLM-assisted construction pipeline (using Qwen3-30B) with human verification for accurate instruction and reference generation.
- Develops a preference-aware normalizer that selectively skips specific normalization/disfluency steps matching active instructions to enable fair WER evaluation.
- Demonstrates that current SpeechLLMs exhibit distinct failure modes—such as Qwen3-Omni's entity hallucination under biasing prompts and Canary-Qwen's instruction blindness.

## Problem

Traditional ASR benchmarks enforce rigid, undocumented evaluation conventions (like stripping disfluencies or forcing inverse text normalization) and apply blanket post-processing normalizers that erase formatting choices users actually care about. Furthermore, as speech models evolve into Speech-augmented LLMs (SpeechLLMs) capable of following natural-language formatting instructions, existing evaluation metrics cannot measure whether a model correctly obeys user directives. This mismatch causes rankings to reflect dataset annotation quirks rather than genuine system capabilities in handling diverse real-world formatting requirements.

## Method

Preference-ASR was constructed using 3,545 manually verified base samples drawn from seven open-source corpora (AMI, Common Voice, Earnings-22, GigaSpeech, LibriSpeech, SPGISpeech, VoxPopuli). In Stage 1 of the dataset pipeline, Qwen3-30B-A3B-Instruct classifies each sample into four mutually exclusive preference categories (prioritized as: normalization, entities, disfluencies, case). In Stage 2, the model generates task-specific instructions and reference transcripts (handling directional variations like Text Normalization vs. Inverse Text Normalization, or keep/remove for disfluencies), followed by human verification to yield 3,210 preference-annotated triples.

Evaluation is performed using a custom preference-aware normalizer designed to prevent standard WER pipelines from penalizing correct instruction-following behavior. When evaluating normalization preferences, the normalizer skips its own TN/ITN steps so spoken vs. written forms are compared directly; for disfluencies, it preserves or strips filler words/repetitions based on the directive and normalizes all fillers to 'um'; for case preferences, lowercasing suppression is applied. Entities are evaluated with standard normalization because WER already captures entity accuracy.

Experiments benchmark four distinct architectures: Parakeet-TDT-0.6B-v3 (a non-LLM FastConformer-TDT baseline), Canary-Qwen-2.5B (a FastConformer encoder with a Qwen 2.5 LLM backend via LoRA, trained without preference alignment), Phi-4-Multimodal (5.6B, modality-specific LoRA experts), and Qwen3-Omni-30B (natively multimodal with contextual biasing). Inference was executed on two 48GB NVIDIA A6000 GPUs.

## Experimental setup

Evaluated on the newly released Preference-ASR dataset comprising 3,210 instruction-reference-audio triples derived from 7 open-source corpora (AMI, Common Voice, Earnings-22, GigaSpeech, LibriSpeech, SPGISpeech, VoxPopuli), alongside 335 non-preference baseline samples. Systems compared include Parakeet-TDT-0.6B-v3, Canary-Qwen-2.5B, Phi-4-Multimodal (5.6B), and Qwen3-Omni-30B. Metrics reported include standard Word Error Rate (Std WER) and Preference-Aware Word Error Rate (Pref WER) across default and instructed prompt settings.

## Results

Under standard normalization, Canary-Qwen and Qwen3-Omni achieve nearly identical default WERs (5.64% and 5.66%), but their responses to instructions diverge wildly. Qwen3-Omni's entity WER spikes from 5.12% to 12.85% when instructed, highlighting severe prompt-driven hallucination where it inserts entity names from the prompt even when absent from the audio. Conversely, Canary-Qwen shows total instruction blindness, remaining completely invariant to preference prompts (5.64% default vs. 5.84% instructed overall). Phi-4 exhibits aggressive default disfluency removal (50.18% default WER, dropping to 10.46% when instructed), but its case instructions backfire catastrophically, worsening its case WER from 3.93% to 19.76%.

Using the preference-aware normalizer, underlying formatting discrepancies are exposed: Canary-Qwen's case WER jumps to 10.08% even in default mode, revealing poor native formatting adherence. In normalization, Qwen3-Omni (I) achieves a superior 9.84% Pref WER compared to Canary-Qwen (I) at 11.32% and Parakeet at 11.16%, a performance gap entirely invisible under standard normalization. However, Qwen3-Omni does not win everywhere, failing significantly on entity grounding when acoustic evidence conflicts with textual prompts.

| System | Setting | Norm (Pref) | Entities (Pref) | Disfluency (Pref) | Case (Pref) | Overall (Pref) |
|---|---|---|---|---|---|---|
| Parakeet-TDT-0.6B | Default | 11.16 | 4.97 | 10.93 | 9.40 | 8.35 |
| Canary-Qwen-2.5B | Default / Instructed | 10.56 / 11.32 | 4.78 / 4.90 | 10.49 / 10.63 | 10.08 / 10.04 | 8.16 / 8.36 |
| Phi-4-Multimodal | Default / Instructed | 10.76 / 11.10 | 5.26 / 5.28 | 49.88 / 10.79 | 5.88 / 27.23 | 15.11 / 12.64 |
| Qwen3-Omni-30B | Default / Instructed | 10.90 / 9.84 | 4.84 / 12.68 | 10.83 / 9.90 | 10.01 / 9.82 | 8.30 / 10.34 |

## Limitations

The dataset is currently restricted to English audio, lacks multi-speaker preference scenarios, and relies on LLM generation that necessitates intensive manual verification (especially for normalization tasks where text alone cannot resolve ambiguous acoustic contexts). Furthermore, tested SpeechLLMs struggle heavily with conflicting multi-modal contexts, consistently trading off acoustic grounding to satisfy textual prompt constraints during entity biasing.

## Why read this

Speech researchers and engineers building instruction-following speech LLMs should read this paper to understand why standard WER and blanket normalizers fail to evaluate modern formatting capabilities. It provides a concrete blueprint and benchmark dataset for measuring true instruction compliance and exposing critical multi-modal hallucinations.

## Code

- https://github.com/nithinraok/preference-asr-bench

## Applications

Developing reliable instruction-aware speech transcription pipelines for diverse downstream use cases like database ITN ingestion, broadcast script TN formatting, verbatim pronunciation coaching, and clean meeting summarization.

## Institutions / 機構

NVIDIA

## Related

- (link related pages by id as the wiki grows)
