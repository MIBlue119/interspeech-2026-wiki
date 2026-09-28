---
id: dixit26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3185
pdf: https://www.isca-archive.org/interspeech_2026/dixit26_interspeech.pdf
---

# AURA Score: A Metric for Holistic Audio Question Answering Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/dixit26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dixit26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3185)

**TL;DR** — The paper introduces AURA, an evaluation metric for audio question answering that combines LLM reasoning with audio grounding to achieve state-of-the-art correlation with human ratings.

## Problem

Current audio question answering (AQA) evaluation metrics primarily rely on surface similarity, n-gram overlap, or text-only embedding matching borrowed from NLP and captioning tasks. These legacy metrics fail to account for contextual reasoning, partial correctness, and whether responses are actually grounded in the audio clip, resulting in poor correlation with human judgments especially for longer answers.

## Method

The proposed AURA score combines a correctness score derived from a few-shot, chain-of-thought prompted Large Language Model with an audio entailment component. The LLM evaluates the model response against the question and reference text on a three-point scale after generating an explanatory rationale. Simultaneously, the question and response are converted into a declarative hypothesis, and a CLAP model computes audio-text entailment similarity against the source audio. These two terms are linearly combined using a weighted sum and min-max normalized to produce the final score.

## Results

Evaluated on the newly introduced AQEval benchmark comprising nearly 10k human-annotated model responses from systems like Qwen2-Audio, Audio Flamingo, GAMA, and Qwen Audio. AURA achieves superior Pearson's rank correlation with human ratings compared to traditional baselines like BLEU, METEOR, ROUGE-L, CIDER, SPICE, SPIDER, MACE, and FENSE. AURA outperforms a vanilla LLM-only judge baseline by an overall 9.1%, with notable gains of 16.02% on ClothoAQA and 4.31% on OpenAQA. Ablations demonstrate that performance scales positively with up to three-shot demonstrations and benefits directly from chain-of-thought rationalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing and benchmarking audio-language models for open-ended audio question answering tasks.

## Limitations

Performance gains over vanilla LLM baselines can vary on specific subsets, such as short responses where simple prompt baselines occasionally score marginally higher.

## Related

- (link related pages by id as the wiki grows)
