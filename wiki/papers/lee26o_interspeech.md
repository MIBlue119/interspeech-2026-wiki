---
id: lee26o_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1684
pdf: https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.pdf
---

# A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1684)

**TL;DR** — A large-scale sensitivity analysis of audio-capable large language models reveals that increasing acoustic scene complexity consistently lowers true-positive rates and raises false-positive rates for event grounding.

## Problem

Current evaluations of large audio-language models (LALMs) primarily focus on single-event clips or small-scale annotations, leaving their reliability in complex, multi-event acoustic scenes under-explored. Without systematic controls, benchmarking hallucinations and grounding in the wild remains difficult because adversarial sampling often introduces ontology-inconsistent labels. This gap matters because real-world audio is inherently multi-event, requiring robust faithfulness and resistance to false alarms.

## Method

The authors extract and normalize approximately 145K structured (source, attribute) events from 71K AudioCapsV2 clips, keeping event types with over 20 occurrences to yield 578 unique events. To probe hallucinations without semantic overlap, they construct ~356K absent-event queries using ReCLAP's audio-aligned text embedding space with cosine similarity filtering (setting alpha = 0.3). They benchmark four SOTA Audio LLMs—Qwen3-Omni-30B-A3B, Qwen2.5-Omni-7B, Qwen2.5-Omni-3B, and Audio-Flamingo 3-7B—using 12 prompt variants combining 4 question templates and 3 response instructions evaluated with greedy decoding via vLLM.

## Results

Across all models, increasing the event count from 1 to 5 drops the true-positive rate on present-events by roughly 29 percentage points and raises the false-positive rate on absent-events by roughly 8 percentage points. Prompt sensitivity analyses expose a strict trade-off where prompt phrasing biasing models toward 'Yes' improves recall but worsens hallucinations, confirmed by strongly negative Kendall's tau bias scores (-0.66 to -0.90) and Pearson correlations (r = -0.73 to -0.95) between complexity sensitivity gaps. Confidence score distributions indicate that models grow significantly more uncertain on correct responses as auditory complexity increases, while conditional false-positive rates show that false alarms are only weakly coupled to successful present-event recognition.

## Code

- https://github.com/alm-evaluation/multi-event

## Applications

Speech and ML engineers developing or deploying audio-language models in real-world environments can use these evaluation datasets and findings to audit, benchmark, and improve model faithfulness and robustness in complex acoustic scenes.

## Limitations

The evaluation scope is constrained to audio clips containing at most 5 events derived from the AudioCapsV2 corpus and tested across four specific SOTA Audio LLMs.

## Related

- (link related pages by id as the wiki grows)
