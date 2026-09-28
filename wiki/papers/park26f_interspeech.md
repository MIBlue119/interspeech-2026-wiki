---
id: park26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2225
pdf: https://www.isca-archive.org/interspeech_2026/park26f_interspeech.pdf
---

# LLM-Based Multi-Reference Evaluation for Efficient and Robust Assessment of Phrase Break Annotations

*Younghan Park, Hoyeon Lee, Hawon Jeong, Jong-Hwan Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/park26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2225)

**TL;DR** — LLM-based Multi-Reference Evaluation (LMRE) solves the one-to-many prosodic phrasing problem in text-to-speech by generating multiple valid reference phrase break annotations via few-shot prompting, achieving significantly higher human correlation than single-reference baselines.

## Key contributions

- Proposes LMRE, a framework modeling the one-to-many nature of prosodic phrasing using LLM-generated reference lookup tables.
- Curates a diverse Korean testbed of 1,356 phrase break annotations spanning five strategies (rule-based, audio-driven, text-driven, synthetic) and eleven configurations.
- Demonstrates that LMRE significantly reduces under-acceptance of valid alternatives and yields higher correlation with human scores across evaluation metrics (EM, F1) compared to single-reference lookups.

## Problem

Traditional single-reference evaluation assumes a single gold prosodic phrasing per utterance, causing it to incorrectly reject valid alternative phrasings and exhibit a 13% to 26% acceptance gap relative to human judgments. Conversely, relying purely on human evaluation offers flexibility for multi-reference acceptance but is labor-intensive and unscalable. While direct LLM-as-a-judge paradigms exist, black-box LLMs struggle to capture subtle prosodic variations. LMRE bridges this gap by offering a fully automatic, scalable, and deterministic multi-reference evaluation framework.

## Method

The LMRE framework constructs a reusable multi-reference lookup table, R = LLM(P_FS, N_FS, N_iter), which maps an input text to a set of valid phrase break labels: {B_r^{(1)}, B_r^{(2)}, ..., B_r^{(k)}}. Phrase breaks are categorized into four language-agnostic boundary tokens: no boundary (NB), accent phrase boundary (AP), intonation phrase boundary (IP), and end-of-sentence boundary (SB). Hypothesis annotations are accepted if they achieve a similarity score greater than threshold theta against at least one reference in R.

To build the multi-reference pool, the authors leverage LLMs (GPT-4.1 and Claude-Sonnet-4) using few-shot sampling pools (P_FS) derived from expert text-driven annotations (T_H1' and T_H2'). Few-shot demonstration count N_FS is set to half the pool size (|P_FS|), and iterations N_iter are set to 20 by default (or 40 in combined runs). To eliminate noisy or spurious generations, references are filtered out unless they appear in more than N_iter / 10 generated outputs. Batch prompting with a batch size of 32 is utilized to reduce inference latency and cost, while inference temperature is pinned at 0.0 for deterministic and reproducible outputs. A hypothesis is evaluated using Exact Match (EM) or F1 score against the generated multi-reference set.

## Experimental setup

Evaluated on a Korean testbed of 1,356 annotations spanning short (<7 words), medium (7-10 words), and long (>=11 words) utterances across conversations, GPS navigation, and news domains. Compared against single-reference evaluation using two human-expert lookups (T_H1, T_H2) and validated via four independent human judges (two binary, two using a 1-5 Likert scale). Evaluated using Pearson (r) and Spearman (rho) correlation coefficients against human scores, alongside acceptance rates grouped across human score categories.

## Results

LMRE substantially narrows the acceptance rate gap compared to human judgment, particularly in the Acceptable score group where single-reference evaluation under-accepts by up to 26.59%, while LMRE reduces this error down to 7.04% (and 1.75% for score group 5). For correlation with human judgments on the All subset using F1 score, LMRE in the Combined setting reaches Pearson r = 0.621 and Spearman rho = 0.626, outperforming single-reference evaluation (r = 0.505, rho = 0.497). 

Ablation studies show that F1 consistently outperforms EM because F1 rewards partial overlap, accommodating subtle acceptable phrasing variations. Performance improves as the few-shot pool size (|P_FS| up to 128) and iteration count (N_iter up to 40) increase, with the Combined setting using both GPT and Claude yielding the strongest and most robust alignments.

| System / Condition | Short (F1 r/rho) | Medium (F1 r/rho) | Long (F1 r/rho) | All (F1 r/rho) |
|---|---|---|---|---|
| Single-Reference (T_H·) | 0.53 / 0.53 | 0.53 / 0.53 | 0.50 / 0.50 | 0.42 / 0.45 |
| LMRE - GPT (|P_FS|=128) | 0.65 / 0.68 | 0.60 / 0.60 | 0.55 / 0.57 | 0.48 / 0.51 |
| LMRE - Claude (|P_FS|=128) | 0.55 / 0.57 | 0.57 / 0.56 | 0.56 / 0.55 | 0.46 / 0.50 |
| LMRE - Combined (|P_FS|=128) | 0.66 / 0.68 | 0.64 / 0.63 | 0.61 / 0.61 | 0.52 / 0.55 |
| LMRE - Combined† (N_iter=40) | 0.67 / 0.69 | 0.65 / 0.64 | 0.62 / 0.63 | 0.53 / 0.56 |

## Limitations

The current empirical validation is constrained to Korean textbeds, though the framework itself is language-agnostic. The approach requires a clean seed pool of human-annotated few-shot demonstrations (P_FS) to guide the LLM reference generation. Furthermore, evaluation performance remains bounded by the capability of the underlying foundational LLMs (GPT-4.1 and Claude) to capture complex, context-dependent prosodic nuances.

## Why read this

Speech and ML researchers building text-to-speech frontends or phrase break predictors should read this to replace flawed single-reference evaluation pipelines with a robust, scalable, multi-reference LLM framework that accurately accounts for natural human prosodic variability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated evaluation of text-to-speech (TTS) frontend prosody modules, phrase break prediction systems, and corpus annotation quality control.

## Related

- (link related pages by id as the wiki grows)
