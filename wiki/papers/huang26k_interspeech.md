---
id: huang26k_interspeech
category: speech-llm-dialogue
labels: [dataset-or-benchmark-release]
institutions: ["Japan Advanced Institute of Science and Technology"]
code: https://github.com/OrgHuang/NAICL-Clotho1k.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1610
pdf: https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.pdf
---

# Noise-Aware In-Context Learning for Hallucination Mitigation in ALLMs

*Qixuan Huang, Khalid Zaman, Masashi Unoki*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1610)

**Category:** `speech-llm-dialogue` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces Noise-Aware In-Context Learning (NAICL), an inference-time calibration method that uses retrieved noise-description pairs to curb linguistic over-completion in Auditory Large Language Models (ALLMs), reducing overall hallucination rates from 26.53% to 16.98%. It also establishes the Clotho-1K benchmark with a 4-type hallucination taxonomy.

## Key contributions

- Constructed the Clotho-1K benchmark containing 1,000 manually verified multi-event audio samples with revised reference captions and AudioSet-based event annotations.
- Established a formal audit taxonomy dividing auditory hallucinations into four distinct classes: Acoustic Attribute, Source/Material, Prior-Driven, and Fabricated Event.
- Proposed the plug-and-play Noise-Aware In-Context Learning (NAICL) method, modeling broadband noise as an acoustic lower-bound prior to guide conservative generation.
- Evaluated 13 mainstream ALLMs and APIs, demonstrating widespread hallucination vulnerabilities and validating NAICL's effectiveness across model architectures.

## Problem

Auditory Large Language Models (ALLMs) excel at audio understanding, but real-world scenarios involving overlapping events, background noise, and acoustic-semantic uncertainty cause them to over-rely on linguistic priors, creating auditory hallucinations. Prior evaluation schemes treat hallucination detection as a binary classification task—conflating missing sound events with false positives—or limit themselves to narrow object-level metrics, while current datasets suffer from annotator subjectivity and sparse edge-case coverage. Furthermore, existing mitigation techniques depend on costly model fine-tuning rather than flexible inference-time interventions.

## Method

NAICL operates as an inference-time in-context learning mechanism relying on a structured noise prior library containing diverse broadband noise segments paired with conservative textual descriptions. These library templates utilize abstract, acoustics-level expressions (e.g., 'continuous background noise' or 'irregular low-frequency sound') while avoiding concrete entity verbs or definitive event assertions to signal that the model should lower its semantic commitment under ambiguous conditions.

For an input audio clip, the system extracts high-level representations using an officially fine-tuned BEATs acoustic encoder and performs cosine similarity matching in the embedding space to dynamically retrieve the Top-3 most relevant noise-description pairs. The ALLM is then conditioned jointly on the input audio and the retrieved noise context prompts to generate a calibrated caption. Key design choices include fixing noise duration at 2 seconds (as longer 10-second segments introduce excessive interference and length), utilizing structured descriptive templates rather than unstructured text, and relying on synthetic noise rather than real-audio few-shot examples that inadvertently inject unwanted semantic scene priors.

## Experimental setup

Evaluations used the newly constructed Clotho-1K dataset (1,000 multi-event samples derived from filtering 4,981 Clotho audio clips). The approach was primarily implemented and tested on Qwen2.5-Omni-7B, benchmarked alongside 12 other systems (including Qwen2.5-Omni-3B, StepAudio2, Qwen-audio-chat, Qwen2-Audio-7B, MiMo-Audio-7B, Kimi-Audio-7B, Audio-Flamingo-3, SALMONN-7B, Gemini-2.5-flash/pro, and GPT-audio/mini). An LLM-as-a-Judge pipeline powered by Qwen3-Next-80B-A3B-Instruct evaluated generated outputs against manually revised references across four hallucination categories and custom keyword frequency sets (Event, Definite, Acoustic terms).

## Results

Across the 13 evaluated ALLMs, hallucination rates (HR) varied widely from 19.42% (Gemini-2.5-pro) up to 40.50% (SALMONN-7B), with Source/Material and Fabricated Event errors serving as the dominant failure modes. Applying NAICL to Qwen2.5-Omni-7B reduced its total hallucination rate from 26.53% to 16.98%, driving down Source errors from 18.19% to 11.96% and Fabricated Event errors from 10.25% to 7.64%. Ablation studies showed that real-audio ICL actually worsened hallucinations (HR 27.54%) by reinforcing deterministic event priors, whereas NAICL's retrieval-augmented 3-shot 2-second structured configuration achieved the optimal balance, decreasing Event and Definite keyword frequencies while increasing conservative Acoustic term usage.

| System / Configuration | HR (%) | Acoustic Attribute (%) | Source (%) | Prior-Driven (%) | Fabricated (%) |
|---|---|---|---|---|---|
| Qwen2.5-Omni-7B (Base) | 26.53 | 7.24 | 18.19 | 7.84 | 10.25 |
| Qwen2.5-Omni-7B (Real-audio ICL) | 27.54 | 6.53 | 19.80 | 9.95 | 10.35 |
| NAICL (1-shot, w/o retrieval) | 18.99 | 7.24 | 13.07 | 7.24 | 6.23 |
| NAICL (10s noise, 3-shot) | 18.70 | 7.24 | 11.46 | 5.33 | 8.24 |
| NAICL (Unstructured Caption) | 19.10 | 6.03 | 12.86 | 6.83 | 6.93 |
| NAICL (2s, retrieval, 3-shot) | 16.98 | 5.63 | 11.96 | 5.43 | 7.64 |

## Limitations

The current benchmark and library scale are bounded by Clotho-1K's 1,000 samples, limiting coverage of rare acoustic domains and complex multi-lingual environments. Additionally, NAICL's reliance on fixed template descriptions and prompt context injection adds inference-time token overhead and depends heavily on the quality of the external acoustic encoder (BEATs) embedding space.

## Why read this

Researchers and engineers building production-grade audio understanding systems or speech-text LLMs should read this paper to understand why standard in-context learning fails for audio and how retrieval-based acoustic lower-bound priors can fix model hallucinations without retraining.

## Code

- https://github.com/OrgHuang/NAICL-Clotho1k.git

## Applications

Robust audio captioning, automated acoustic surveillance, multimedia content indexing, and hallucination-resistant speech-language assistant applications.

## Institutions / 機構

Japan Advanced Institute of Science and Technology

**Funding / 經費:** JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
