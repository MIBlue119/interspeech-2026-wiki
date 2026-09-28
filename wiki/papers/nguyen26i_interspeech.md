---
id: nguyen26i_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3465
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.pdf
---

# Contrastive Training with LLM-generated Near-Misses for Robust Code-Switching Speech Recognition

*Tung X. Nguyen, Hieu Minh Truong, Giang Son Nguyen, Nhu Vo, Wray Buntine, Dung D. Le*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3465)

**TL;DR** — The paper introduces a point-of-interest (POI) aware contrastive training framework that combines ASR N-best decoding, offline LLM candidate expansion, and a tri-level filtering gate to generate hard negative transcripts for robust code-switching speech recognition, reducing both Word Error Rate and POI Error Rate by over 2% absolute on Mandarin-English and Vietnamese-English benchmarks.

## Key contributions

- CS-NMG pipeline: an acoustic-aware near-miss generation method that perturbs only POIs using seed N-best outputs and an external LLM.
- Contrastive alignment objective: a combination of a POI-weighted cross-entropy anchor and an InfoNCE-style multi-negative ranking loss.
- Tri-level filtering gate: a gating strategy enforcing acoustic margins, phoneme proximity, and textual deviation to filter high-quality hard negatives.
- Consistent outperformance over standard LoRA fine-tuning, weighted CE, and sequence-level MWER baselines on CS-FLEURS (cmn-eng) and ViMedCSS (vie-eng).

## Problem

Code-switching (CS) in automatic speech recognition causes severe language confusion and phonetic ambiguity, with recognition errors heavily concentrated in embedded-language spans and switch-boundary neighborhoods (Points-of-Interest or POIs). Standard fine-tuning objectives treat all tokens equally or rely purely on cross-entropy, failing to provide explicit signals that discourage acoustically plausible yet incorrect substitutions at these critical switch points. While sequence-level criteria like MWER or LLM-based post-correction are used, they either lack localized hard negatives or introduce costly inference-time decoding overhead, motivating a training-time alignment solution that preserves standard ASR-only decoding.

## Method

The method builds a Point-of-Interest (POI) candidate pool offline by extracting embedded-language spans and their switch-boundary neighborhoods from the 10-best hypotheses of a seed ASR model. An external LLM (Gemini 2.5 Pro) is queried via API to generate additional replacement strings for each targeted POI while keeping the rest of the reference transcript fixed. These candidate near-misses are passed through a tri-level filtering gate: an acoustic margin check, a phonetic distance constraint via G2P mapping (ARPAbet, Pinyin, or syllables), and a textual Levenshtein distance requirement to ensure candidates are both hard (sufficiently different in text) and plausible (close in pronunciation). 

The ASR model (Whisper-small) is then fine-tuned using LoRA (rank r=16, alpha=32, dropout=0.05, learning rate 0.001) with a combined objective. The loss function consists of a POI-weighted cross-entropy (WCE) anchor on the reference transcript (with POI token upweighting weight alpha_wce set to 1.7 or 2.0) and an InfoNCE-style contrastive ranking loss (temperature beta=1, contrastive weight lambda_CL=0.1) that optimizes length-normalized sequence scores to prefer the reference over selected filtered near-misses. At inference time, the model uses standard beam search without any auxiliary modules or decoding overhead.

## Experimental setup

Evaluated on two code-switching benchmarks: Mandarin–English (cmn-eng) from CS-FLEURS and Vietnamese–English (vie-eng) from ViMedCSS (a medical domain-specific dataset). Compared against standard cross-entropy (CE), weighted cross-entropy (WCE), and sequence-level minimum word error rate (MWER) training. Metrics include conventional Word Error Rate (WER) and POI-focused Point-of-Interest Error Rate (PIER). The model backbone is Whisper-small trained with LoRA, utilizing N=10 for N-best lists, K=5 sampled near-misses per utterance, and specific phonetic normalization tools like pypinyin, g2p_en, and underthesea.

## Results

The full tri-level filtered contrastive model achieves the lowest errors across both datasets, outperforming the standard CE baseline and sequence-level MWER. On cmn-eng (CS-FLEURS), it reduces WER from 16.67 (CE) and 15.75 (MWER) down to 14.06, and PIER from 17.25 (CE) and 16.41 (MWER) down to 15.10. On vie-eng (ViMedCSS), it decreases WER from 24.72 (CE) and 23.82 (MWER) to 21.87, and PIER from 21.95 (CE) and 20.84 (MWER) down to 18.74. 

Ablation studies show that utilizing the tri-level gate (Acoustic + Phoneme + Text) outperforms unfiltered or partially filtered configurations (such as acoustic-only or text-only gates), dropping negative density from 6.0 down to an optimal ~3.8 near-misses per utterance and proving that quantity alone does not drive performance.

| Method | cmn-eng WER | cmn-eng PIER | vie-eng WER | vie-eng PIER |
|---|---|---|---|---|
| CE (Baseline) | 16.67 | 17.25 | 24.72 | 21.95 |
| WCE | 16.42 | 16.68 | 24.21 | 21.18 |
| MWER | 15.75 | 16.41 | 23.82 | 20.84 |
| CE + CL (N-best NM) | 15.64 | 16.21 | 23.16 | 20.11 |
| WCE + CL (N-best NM) | 14.93 | 15.72 | 22.86 | 19.10 |
| WCE + CL (Tri-level) | 14.06 | 15.10 | 21.87 | 18.74 |

## Limitations

The near-miss expansion phase relies on a proprietary external LLM API and specific prompt designs, which adds offline processing cost and can affect reproducibility. The evaluation is strictly scoped to two language pairs and a single model backbone (Whisper-small), leaving broader language coverage, open-source LLM expansion, and multi-architecture verification for future work.

## Why read this

Speech and ML researchers focusing on preference-based alignment or code-switching ASR should read this paper to learn how to construct offline, phonetically constrained hard negatives for contrastive decoding without adding runtime inference latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual speech recognition systems, voice assistants, and domain-specific transcription tools (such as medical dictation) that encounter frequent code-switching or foreign entity insertions.

## Related

- (link related pages by id as the wiki grows)
