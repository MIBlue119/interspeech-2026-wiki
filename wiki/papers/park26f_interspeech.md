---
id: park26f_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2225
pdf: https://www.isca-archive.org/interspeech_2026/park26f_interspeech.pdf
---

# LLM-Based Multi-Reference Evaluation for Efficient and Robust Assessment of Phrase Break Annotations

[PDF](https://www.isca-archive.org/interspeech_2026/park26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2225)

**TL;DR** — The paper introduces LLM-based Multi-Reference Evaluation (LMRE) to model the one-to-many nature of prosodic phrasing, achieving higher correlation with human judgments than single-reference evaluation (Pearson r reaching 0.621 vs 0.505).

## Problem

Evaluating phrase break annotations for text-to-speech systems traditionally relies on single-reference evaluation or labor-intensive human judgment. Single-reference evaluation assumes a unique gold phrasing per utterance, leading to the incorrect rejection of alternative valid prosodic variations. While human judgment handles this diversity, it is unscalable and expensive, creating a clear need for an efficient and robust automated evaluation framework.

## Method

The proposed LMRE framework leverages LLMs (GPT-4.1 and Claude-Sonnet-4) using batch prompting and few-shot sampling to generate a multi-reference lookup table containing multiple plausible prosodic break annotations per utterance. It defines a multi-reference evaluator that accepts a hypothesis annotation if its similarity exceeds a threshold with any reference in the generated set. The system operates with a deterministic temperature of 0.0 and filters noisy references by retaining only those generated in more than Niter/10 iterations. Experiments test few-shot pool sizes up to 128 and iteration counts up to 40 across a Korean testbed.

## Results

Evaluated on a Korean testbed of 1,356 phrase break annotations spanning five strategies and eleven configurations, LMRE significantly outperforms single-reference evaluation. Using the F1 metric, the Combined model (using both GPT and Claude) achieves a Pearson correlation of r = 0.621 and Spearman correlation of ρ = 0.626 with human scores, compared to r = 0.505 and ρ = 0.497 for single-reference evaluation. LMRE reduces the acceptance rate gap with human judgment to 7.04% overall and 1.75% for score group 5. Ablations show that F1 outperforms exact match (EM), and performance improves consistently as few-shot pool size and iteration count increase.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing text-to-speech (TTS) systems can use LMRE to efficiently and reliably evaluate phrase break prediction modules without manual reference expansion.

## Limitations

The study evaluates the framework primarily on Korean language testbeds, though the authors note the method itself is language-agnostic.

## Related

- (link related pages by id as the wiki grows)
