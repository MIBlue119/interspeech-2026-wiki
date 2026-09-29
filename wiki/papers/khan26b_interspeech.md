---
id: khan26b_interspeech
category: deepfake-security
labels: [generative-model]
institutions: ["RMIT University"]
code: https://github.com/ahmedsohair/SAPTA26
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3175
pdf: https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.pdf
---

# I Am No One: Style-Aware Paraphrasing for Text Anonymization

*Ahmed Sohair Khan, Estrid He, Monica Wachowicz, Elham Naghizade*

[PDF](https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3175)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — This paper proposes a prompt-driven, style-aware text anonymization framework that neutralizes author-specific stylometric fingerprints using large language models, reducing authorship attribution F1 by 60–70% while preserving high semantic utility and readability.

## Key contributions

- Formulates text anonymization as a controlled stylistic transformation rather than relying on indiscriminate differential privacy noise injection or generic paraphrasing.
- Introduces a two-stage pipeline consisting of an explicit Style-Profiling Module (extracting length, vocabulary, tone, and punctuation profiles from K samples) and a Style-Guided Rewriting Module.
- Demonstrates that full four-dimension style profiles achieve the most stable privacy-utility trade-offs across diverse corpora, though length-only cues suffice for short-form texts.
- Evaluates rigorously against differential privacy variants, non-DP baselines, and ALISON, showing superior fluency (low perplexity) and retention of informative tokens (measured via weighted KL divergence).

## Problem

Authorship attribution models can re-identify users from text and speech transcripts by exploiting stable stylistic fingerprints (syntax, vocabulary, discourse patterns), even after explicit identifiers are removed. Traditional differential privacy (DP) methods force a severe trade-off between privacy and text utility, where low privacy budgets destroy readability (perplexity exploding into thousands) while failing to completely erase high-order stylistic structures. Existing non-DP paraphrasing or general style-transfer methods lack fine-grained, explicit control over which authorial traits are suppressed, risking either insufficient privacy or catastrophic content loss.

## Method

The framework operates in two stages using an open-source base LLM (primarily LLAMA-3.2-3B-INSTRUCT, also evaluated with MINICPM3-4B). Stage 1 (Style-Profiling Module) takes $K$ representative text samples ($K=5$ chosen empirically) from an author's training corpus and prompts the LLM to build a human-readable stylistic profile capturing four core dimensions: sentence length, vocabulary choice, tone, and punctuation patterns. Stage 2 (Style-Guided Rewriting Module) consumes the source text and the extracted profile to generate an anonymized rewrite that suppresses the identified stylistic cues while strictly preserving semantic content. The style profile serves as an explicit control signal during autoregressive generation.

Three rewrite modes are investigated: style-guided (providing the explicit profile), semi-guided (neutral style instruction without the explicit profile), and unguided (generic paraphrasing). The style-guided variant achieves the best balance because the explicit profile guides the LLM to target specific stylistic markers without over-truncating the text or altering informative rare tokens. The entire architecture is attacker-agnostic, meaning it does not require access to or optimization against a specific adversary's classifier.

## Experimental setup

Evaluated on AUTHOR10 (15,070 long-form blog posts from 10 authors, extracted from the Blog Authorship Corpus) and ILLINOIS9 (3,959 short Google Reviews from top 9 reviewers). Baselines include strict DP-Prompt ($\epsilon \in \{25, 100, 250\}$), Quasi-DP, Non-DP paraphrasing, and ALISON (stylometry-grounded non-DP baseline). Metrics include cosine similarity (CS) across ALL-MINILM-L6-V2, ALL-MPNET-BASE-V2, and GTE-SMALL; perplexity (PPL) via GPT-2; weighted KL divergence (W-KL); BLEU; authorship attribution F1 using DeBERTa-v3 and BERT classifiers; relative gain ($\gamma$); and fluency-aware gain ($\gamma_{\text{flu}}$).

## Results

On AUTHOR10, the proposed style-guided rewriting reduces authorship F1 from 66.45 down to 26.02, substantially outperforming ALISON (F1=29.53) and non-DP paraphrasing (F1=53.10). While strict DP ($\epsilon=25$) lowers F1 to 7.13, its perplexity explodes catastrophically to 8,770, whereas the proposed method maintains near-original readability with a PPL of 42.47 (vs. 41.0 for original text) and strong semantic similarity (CS=0.702). On ILLINOIS9, the method achieves an author F1 of 20.76 with a PPL of 53.36 and CS of 0.709, yielding the highest fluency-aware relative gain (0.584). Ablations over style channels reveal that while a Full profile provides the most stable performance, length-only profiles perform nearly as well on short-form texts like reviews. The method also proves robust against a method-aware white-box adversary, reducing attacker F1 by 55% on ILLINOIS9.

| System / Condition | CS $\uparrow$ | PPL $\downarrow$ | Author F1 $\downarrow$ | Fluency-Aware Gain ($\gamma_{\text{flu}}$) $\uparrow$ |
| :--- | :--- | :--- | :--- | :--- |
| **Author10: Original** | 1.000 | 41.00 | 66.45 | – |
| **Author10: DP ($\epsilon=25$)** | 0.589 | 8770.0 | 7.13 | 0.190 |
| **Author10: ALISON** | 0.710 | 368.30 | 29.53 | -0.037 |
| **Author10: Ours (LLAMA)** | 0.702 | 42.47 | 26.02 | 0.442 |
| **Illinois9: Original** | 1.000 | 98.83 | 76.78 | – |
| **Illinois9: Ours (LLAMA)** | 0.709 | 53.36 | 20.76 | 0.584 |

## Limitations

The framework relies entirely on the base LLM's capacity to extract predefined style features, potentially missing highly nuanced rhetorical or syntactic idiosyncrasies. Standard authorship F1 evaluation metrics can conflate style obfuscation with unintentional content loss. The current evaluation is restricted to text corpora, leaving the interaction between stylometric leakage and acoustic anonymization pipelines in ASR-transcribed speech unverified.

## Why read this

Researchers and engineers working on text and speech privacy will find this a compelling alternative to brittle differential privacy noise injection. It provides a blueprint for leveraging prompt-driven LLMs for fine-grained style obfuscation without destroying semantic utility or readability.

## Code

- https://github.com/ahmedsohair/SAPTA26

## Applications

Privacy-preserving publishing of user reviews, blogs, and ASR transcripts of meetings and call-center conversations to prevent authorship re-identification.

## Institutions / 機構

RMIT University

## Related

- (link related pages by id as the wiki grows)
