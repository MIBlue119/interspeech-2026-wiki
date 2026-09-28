---
id: khan26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3175
pdf: https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.pdf
---

# I Am No One: Style-Aware Paraphrasing for Text Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3175)

**TL;DR** — This paper proposes a prompt-driven text anonymization framework utilizing pretrained large language models to construct compact author style profiles and rewrite text, reducing authorship attribution F1 by 60 to 70 percent while preserving semantic content quality and readability.

## Problem

Authorship attribution models can re-identify users from text and speech transcripts by exploiting stable stylistic fingerprints, posing serious privacy risks even after explicit personal identifiers are removed. Traditional differential privacy mechanisms either fail to disrupt high-order syntactic structures or severely degrade text utility and readability into unreadability. Therefore, there is a critical need for anonymization techniques that neutralize author-specific style attributes without relying on indiscriminate noise injection.

## Method

The framework consists of a Style-Profiling Module and a Style-Guided Rewriting Module. The profiling module samples $K=5$ texts per author and prompts an LLM to summarize their writing style across four dimensions: sentence length, vocabulary choice, tone, and punctuation patterns. The rewriting module uses this explicit profile as a control signal to prompt an LLM to rewrite the text while suppressing those specific stylistic markers and preserving semantic content. The primary base model used is Llama-3.2-3B-Instruct, with MiniCPM3-4B tested for model agnosticism. Evaluations compare full profiles against single-dimension profiles and unguided or semi-guided rewriting variants.

## Results

Evaluated on AUTHOR10 (long-form blog corpus with 15,070 documents) and ILLINOIS9 (short-form Google reviews with 3,959 documents). Metrics include cosine similarity, perplexity, weighted KL divergence, BLEU, authorship attribution F1 using DeBERTa-v3/BERT classifiers, and relative privacy-utility gains. The approach reduces authorship F1 on AUTHOR10 from 66.45 to 26.02, outperforming Alison (29.53) and non-DP paraphrasing (53.10), while maintaining near-original perplexity (42.47 versus 41 for original, compared to strict DP perplexities exceeding 8,700). Full profiles yield the best overall privacy-utility trade-off, though length-only profiles perform competitively on short texts.

## Code

- https://github.com/ahmedsohair/SAPTA26

## Applications

Engineers and privacy officers working on text publishing, analytics platforms, and speech-to-text transcription pipelines (such as meeting or call-center ASR logs) can use this to protect user anonymity from stylometric re-identification.

## Limitations

The framework assumes authorship attribution is primarily driven by specific stylometric dimensions, and effectiveness depends on the instruction-following capabilities of the underlying base LLM.

## Related

- (link related pages by id as the wiki grows)
