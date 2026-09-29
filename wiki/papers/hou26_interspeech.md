---
id: hou26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Tsinghua University", "Tiangong University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1577
pdf: https://www.isca-archive.org/interspeech_2026/hou26_interspeech.pdf
---

# UGPCB: Uncertainty-Gated Phonetic Contextual Biasing for Improving Hotword Recognition in Large Speech Models

*Yong-Jie Hou, Yun-Fei Shao, Wei-Qiang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/hou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1577)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — UGPCB is a training-free, decode-time contextual biasing framework that uses an entropy-driven gating mechanism and a bimodal grapheme-phoneme contrastive penalty to improve hotword recognition in large speech models. Evaluated on the Dolphin base model using the SeACo Mandarin benchmark, it achieves a 16.04% recall improvement (reaching 90.81% F1) while limiting precision reduction to 0.78%.

## Key contributions

- Introduces an uncertainty-aware dynamic gating mechanism driven by normalized Shannon entropy from acoustic posteriors to suppress over-biasing in confident model regions.
- Proposes a grapheme-phoneme dual-track prefix matching trie (using BPE and tone-aware/tone-agnostic pinyin) equipped with phonetic truncation protection and whitespace boundaries.
- Implements a Contrastive Homophone Penalty (CHP) during N-best rescoring that cross-validates graphemic and phonetic evidence to penalize phonetic-only matches and mitigate homophone hallucinations.
- Operates entirely at decode time as a parameter-free logit bridge, requiring no fine-tuning or architectural modifications to the pretrained foundation ASR model.

## Problem

End-to-end ASR systems heavily rely on training data distributions, leading to severe recognition degradation on proper nouns, domain terms, and user-defined hotwords. Standard contextual biasing methods that rely on exact BPE matching struggle with subword fragmentation, causing brittle text-only retrieval. Conversely, phonetic-matching alternatives introduce vulnerabilities such as over-biasing confident predictions and triggering homophone false positives (hallucinations), especially when distractor lists scale up. Prior approaches mitigating these issues typically demand expensive parameter tuning, architectural adjustments, or heavy inference overhead.

## Method

The framework operates on top of a pretrained acoustic foundation model (Dolphin) using a parameter-free logit bridge that intercepts raw unnormalized logits l_t at each autoregressive step without modifying model parameters. Posterior probabilities are converted via softmax to compute normalized Shannon entropy H_t over valid vocabulary tokens. An entropy threshold tau (set to 0.10) and temperature T control a dynamic gating mechanism that suppresses bias injection when the model is confident (H_t < tau) and activates it under high uncertainty, supplemented by segment-level gates and trajectory momentum.

To bridge orthographic and phonetic representations, the system builds parallel grapheme-phoneme tries using BPE subwords and Mandarin pinyin. To prevent phonetic truncation caused by multi-character BPE tokens, a global phonetic mapping table indexes only the first phoneme of each multi-character token along with explicit whitespace boundaries. The biasing gain is modulated via exponential rank decay to assign large boosts only to acoustically supported candidates.

During N-best rescoring, a Contrastive Homophone Penalty (CHP) cross-validates BPE counts (C_bpe) and pinyin counts (C_py). Dual-track matches receive synergistic rewards, while unilateral phonetic matches without graphemic support incur step-wise penalties (mild penalty beta_mild = 0.3 * w_py for long words with partial hits, severe penalty beta_severe = 1.5 * w_py otherwise). Additionally, a Needleman-Wunsch fuzzy matching penalty triggers virtual phonetic matches if phonetic similarity exceeds 0.6 without graphemic hits, suppressing out-of-trie homophone substitutions.

## Experimental setup

Evaluated on the AISHELL-1 Mandarin corpus using the SeACo benchmark test set of 808 utterances, with hyperparameters tuned on an independent 550-utterance development subset. The base model is the Dolphin small variant (372M parameters, BPE tokenization, beam size 5). Baseline comparisons include B1 (unmodified Dolphin), B2 (text-only shallow fusion with exact BPE trie prefix boosting), B3 (decode-time UGPCB without N-best rescoring), and B4 (full UGPCB framework). Metrics comprise Character Error Rate (CER), Background CER (B-CER excluding hotword spans), entity-level Precision, Recall, F1, and False Alarm (FA) counts, tested under distractor scales N in {0, 100, 500, 1000}.

## Results

Full UGPCB (B4) achieves an F1 score of 90.81% (recall 84.19%, precision 98.57%) and a CER of 5.60%, marking a +9.96 pp F1 improvement over the unmodulated baseline B1 (80.85% F1, 7.28% CER). Compared to text-only shallow fusion (B2), B4 improves recall by +4.68 pp (79.51% to 84.19%) and F1 by +2.66 pp (88.15% to 90.81%), with a modest background CER increase from 4.47% to 4.61%. Pure entropy gating (B3) successfully cuts false alarms from 8 to 4 and lowers B-CER to 4.36% compared to baseline, demonstrating effective over-biasing suppression at confident steps.

Under distractor scaling up to N = 1,000, B4 maintains a consistent 3 to 5 percentage point recall advantage over B2 (82.41% vs 79.51% at N = 1,000), though its false alarms rise from 11 to 33 and precision drops from 98.57% to 95.73% due to the broader phonetic search space. Paired permutation tests confirm the recall gains are statistically significant (p < 0.001), while the precision trade-off versus B2 is non-significant (p = 0.366).

| System | CER | B-CER | Prec. | Rec. | F1 | FA |
|---|---|---|---|---|---|---|
| B1 (Baseline) | 7.28 | 4.44 | 99.35 | 68.15 | 80.85 | 4 |
| B2 (Text SF) | 6.40 | 4.47 | 98.89 | 79.51 | 88.15 | 8 |
| B3 (Dec. UGPCB) | 6.40 | 4.36 | 99.38 | 70.94 | 82.78 | 4 |
| B4 (Full UGPCB) | 5.60 | 4.61 | 98.57 | 84.19 | 90.81 | 11 |

## Limitations

The framework is explicitly evaluated only on Mandarin Chinese using AISHELL-1, relying heavily on language-specific pinyin mappings and homophone characteristics. Scaling distractor lists up to 1,000 increases false alarms and degrades precision, indicating sensitivity to extremely noisy open-vocabulary biasing catalogs. Furthermore, the approach requires careful tuning of entropy thresholds and penalty weights on development sets to balance recall against background degradation.

## Why read this

Speech and ML engineers looking to add robust contextual biasing to pretrained speech foundation models without expensive fine-tuning or parameter updates will find this paper's decoupling of acoustic uncertainty and contrastive homophone penalties immediately applicable. It provides a blueprint for resolving the recall-vs-hallucination trade-off in hotword recognition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants, smart home command recognition, and domain-specific conversational transcription systems requiring accurate dynamic vocabulary injection.

## Institutions / 機構

Tsinghua University, Tiangong University

## Related

- [AFG-Bias: Acoustic-Fusion-Gated Biasing for Plug-and-Play Hotword Customization in LLM-Based ASR](wu26i_interspeech.md) — same problem · relatedness 2.9/3
- [COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation](guo26b_interspeech.md) — same problem · relatedness 2.5/3
- [LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR](he26c_interspeech.md) — same problem · relatedness 2.2/3
- [ADALA: A Wake-up Word Detection Framework Based on Adaptive Semi-supervised learning and Large Language Model](tang26_interspeech.md) — same problem · relatedness 2.2/3
- [Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild](munyampirwa26_interspeech.md) — complementary · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
