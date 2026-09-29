---
id: hao26b_interspeech
category: asr
labels: [low-resource]
institutions: ["University of Groningen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1659
pdf: https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.pdf
---

# Can Large Language Models Reliably Correct Errors in Low-Resource ASR? A Contamination-Aware Case Study on West Frisian

*Yun Hao, Reihaneh Amooie, Wietse de Vries, Rik van Noord, Martijn Wieling*

[PDF](https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1659)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — This paper investigates generative error correction (GER) using Large Language Models for low-resource West Frisian ASR, introducing a non-public offline dataset to explicitly control for data contamination. Results show that GPT-5.1 achieves a Word Error Rate (WER) of 8.9% on Common Voice (surpassing the 5-best oracle of 9.6%) and 13.8% on the offline dataset.

## Key contributions

- Evaluates LLM-based generative error correction (GER) on a truly low-resource language (West Frisian, ~400k speakers) with only 5.5 hours of training speech data.
- Constructs a contamination-aware offline evaluation dataset comprising 1.5 hours of speech (811 utterances) from unreleased storybooks and original sentences to eliminate pretraining text overlap concerns.
- Compares closed-source frontier models (GPT-4o-mini, GPT-5.1) against open-source models (Qwen3-8B with and without LoRA fine-tuning) and classical trigram language models.
- Performs detailed sentence-level and edit-level (substitution, deletion, insertion) error analyses revealing that models struggle most with balancing aggressive word insertions against overcorrection.

## Problem

Automatic speech recognition remains severely limited for low-resource languages due to scarce transcribed training data. While generative error correction (GER) using LLMs successfully post-processes ASR N-best hypotheses in high-resource languages like English, its effectiveness in low-resource settings remains underexplored. Furthermore, prior studies cannot easily rule out data contamination—where evaluation benchmarks overlap with LLM pretraining texts—meaning reported performance gains may reflect memorization rather than true phonetic or linguistic correction capability.

## Method

The pipeline utilizes XLS-R 1B as the acoustic backbone, pretrained on 436k hours across 128 languages and fine-tuned on the Common Voice Frisian training split (5.5 hours, 3,921 utterances) for 2,000 steps using a Connectionist Temporal Classification (CTC) loss. Feature extractors are frozen while Transformer encoder layers are updated with a batch size of 64, learning rate of 5e-5, and weight decay of 5e-5. Beam search decoding with a beam width of 50 extracts the top-5 N-best hypotheses.

For generative error correction, LLMs (GPT-4o-mini, GPT-5.1, and Qwen3-8B) receive zero-shot or k-shot prompts (k=1, 3, 5, 10) containing the N-best hypotheses and are instructed to act as Frisian language experts, outputting a single corrected transcription free from the constraint of selecting strictly from the N-best list. Qwen3-8B is also fine-tuned using LoRA applied to attention and feed-forward projection layers (rank r=16, alpha=32, dropout=0.05) for 3 epochs with an effective batch size of 16, utilizing XLS-R 5-best outputs as inputs and reference texts as targets.

## Experimental setup

Evaluations use Common Voice 17.0 Frisian (test set: 3,171 utterances, 4.7 hours) and a newly collected Frisian Offline Dataset (811 utterances, 1.5 hours recorded via head-mounted microphone at 44.1 kHz in an acoustic lab). Baselines include raw XLS-R 1-best, XLS-R 5-best oracle, a trigram language model integrated during decoding, and a selection-based LLM prompting approach. Metric used is Word Error Rate (WER), alongside precision and recall computed at the edit level (substitutions, deletions, insertions).

## Results

On the Common Voice test set, baseline XLS-R achieves 13.5% WER (trigram: 12.1%, 5-best oracle: 9.6%). GPT-5.1 via 3-shot generative prompting achieves an 8.9% WER, outperforming the oracle, whereas its selection-based counterpart reaches 12.1%. Qwen3-8B achieves 14.4% (zero-shot) and 13.4% (fine-tuned), showing minimal correction capability by leaving 97.3% of sentences unchanged.

On the non-public Frisian offline dataset, baseline XLS-R achieves 21.1% WER (trigram: 19.2%, 5-best oracle: 18.0%). GPT-5.1 generative correction drops the WER to 13.8% (5-shot/10-shot), confirming that performance gains are driven by genuine language modeling capabilities rather than pretraining data contamination. Sentence-level analysis indicates GPT-5.1 (Gen) improves 54.9% of offline utterances with a low degradation rate of 7.5%. Edit-level diagnostics show insertion errors have the lowest precision (~61-68%) due to overzealous token additions, while substitution errors form the bulk of remaining failures.

| System / Condition | Common Voice WER (%) | Frisian Offline WER (%) |
|---|---|---|
| XLS-R Baseline | 13.5 | 21.1 |
| XLS-R + Trigram LM | 12.1 | 19.2 |
| XLS-R 5-Best Oracle | 9.6 | 18.0 |
| Qwen3-8B-FT (3-shot) | 13.4 | 20.9 |
| GPT-4o-mini (5-shot) | 12.5 | 18.4 |
| GPT-5.1 (3-shot / 5-shot) | 8.9 | 13.8 |

## Limitations

The study is restricted to a single low-resource language (West Frisian) and relies heavily on closed-source frontier models (GPT-4o-mini and GPT-5.1) which lack architectural transparency and reproducibility. Open-source models tested (Qwen3-8B) failed to provide meaningful error correction despite fine-tuning, demonstrating a steep capability gap for low-resource generative tasks. The offline dataset size is relatively small (1.5 hours, 4 speakers), limiting deep speaker-demographic generalizability.

## Why read this

Researchers building speech-to-text systems or evaluating LLM-based post-processing for low-resource languages should read this paper to understand how to design contamination-aware evaluations and to recognize the performance gap between proprietary frontier models and open-source alternatives in low-resource regimes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Post-processing pipeline enhancement for low-resource automatic speech recognition, historical or regional archive transcription, and contamination-free evaluation benchmarking for speech LLMs.

## Institutions / 機構

University of Groningen

**Funding / 經費:** China Scholarship Council

## Related

- [DASR-CPO: Reference-Free Contrastive Preference Optimization for Correcting Mandarin Semantic Drift in Low-Resource Chinese Dialect ASR](zhang26s_interspeech.md) — same problem · relatedness 2.0/3
- [IPA-Guided Dual Transcription for Data-Centric Speech Corpus Refinement](choi26f_interspeech.md) — shared technique · relatedness 1.9/3
- [Error Diversity and Performance Variability in Zero-Shot Children's Speech Recognition](sinha26b_interspeech.md) — same problem · relatedness 1.9/3
- [Audio-KWS-Gated Error Memory Retrieval for Incremental ASR Post-Correction](ashikawa26_interspeech.md) — same problem · relatedness 1.9/3
- [TASU2: Controllable CTC Simulation for Alignment and Low-Resource Adaptation of Speech LLMs](peng26b_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
