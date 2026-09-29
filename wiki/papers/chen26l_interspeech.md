---
id: chen26l_interspeech
category: translation
labels: [multilingual, self-supervised]
institutions: ["Chinese University of Hong Kong, Shenzhen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1148
pdf: https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.pdf
---

# Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data

*Qixu Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1148)

**Category:** `translation` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The paper introduces a two-stage Rank→Distill self-bootstrapping framework using audio-language models to filter noisy speech-to-speech translation (S2ST) training data, yielding up to a +1.4 ASR-BLEU improvement. It directly evaluates raw paired source and target speech for keep/drop decisions, jointly capturing acoustic fidelity and cross-lingual semantic consistency.

## Key contributions

- Proposes a Rank→Distill strategy that combines multi-dimensional weak quality signals with a lightweight ranker to generate reliable pseudo-labels from noisy mined corpora.
- Develops an audio-LLM-based filtering approach that evaluates raw speech-to-speech pairs directly, avoiding the blind spots of text-only transcription filtering.
- Achieves state-of-the-art filtering performance on CVSS-C and SpeechMatrix (FR→EN and DE→EN), outperforming 70B text-only LLM judges and embedding-based BLASER/BLEURT baselines under matched data budgets.
- Demonstrates that speech-conditioned semantic modeling in a modest 8B audio model can surpass massive text-only language models by capturing acoustic and pronunciation artifacts.

## Problem

End-to-end speech-to-speech translation (S2ST) models rely heavily on large-scale mined or automatically aligned corpora, which frequently contain severe acoustic noise, reverberation, temporal misalignment, and semantic translation errors. Prior filtering techniques either rely on brittle heuristic rules (duration ratios, ASR transcript lengths) or text-only metrics that require transcribing speech first and completely miss acoustic artifacts, synthesis anomalies, and speech-pair misalignment. Solving this is vital because unfiltered noisy data destabilizes training and degrades end-to-end translation quality.

## Method

The framework utilizes a two-stage Rank→Distill self-bootstrapping pipeline. In Stage I, a set of quality features is extracted from paired speech, covering acoustic fidelity (SNR via Brouhaha), perceptual quality (MOS via UTMOS), and semantic consistency (using Qwen3.1-7B on Whisper transcripts and BLEURT on MT outputs). Clean pairs are selected via strict thresholds (SNR ≥ 35, MOS ≥ 2.0, LLM adequacy ≥ 90, BLEURT ≥ 0.8), and negative samples are created via controlled augmentations (noise, reverberation, temporal cropping, compression artifacts sampled at 3:6:1 light/medium/heavy ratios). A lightweight teacher ranker using LambdaMART in LightGBM (300 trees, learning rate 0.05, max depth 6) is trained on pairwise preferences to score the unlabelled candidate pool.

In Stage II, the top-K and bottom-K pairs from the ranker serve as keep/drop pseudo-labels to fine-tune an audio-language model student. The architecture uses Qwen2-Audio (8B) with 4-bit quantization and LoRA (rank 16, alpha 32, dropout 0.05), processing paired source and target audio input chat-style prompts to predict binary keep/drop decisions via causal language modeling loss. It is trained for 2 epochs with a learning rate of 2 × 10⁻⁴, batch size 8, and gradient accumulation of 4.

This design was chosen because direct supervised fine-tuning of audio LLMs on synthetic noise fails to cover real-world distributions, and a ranking stage provides a robust ordering signal. Dual-audio conditioning is necessary because models accepting concatenated single inputs (like Audio Flamingo 3) underperform due to input constraints.

## Experimental setup

Experiments are conducted on the CVSS-C dataset (FR→EN, 207k pairs) combined with 20% of the mined SpeechMatrix corpus. S2ST models use a discrete speech-to-unit (S2U) backbone trained from scratch on 4 × A100 GPUs for 300k max updates using FP16. Performance is measured using sacreBLEU (ASR-BLEU) via a fixed wav2vec 2.0 ASR evaluation recipe, comparing against unsupervised baselines, SNR/MOS heuristic rules, LLaMA-70B text judges, and BLASER 2.0-QE.

## Results

Under a matched data budget of roughly 477k retained pairs, the proposed Audio-LLM filter achieves 22.72 ASR-BLEU on CVSS-C + SpeechMatrix (FR→EN), outperforming the unfiltered baseline (21.32 BLEU), random selection (21.27 BLEU), BLEURT filtering (22.09 BLEU), BLASER 2.0-QE filtering (21.71 BLEU), and even a massive 70B text-only LLaMA LLM filter (22.32 BLEU). In ablations, removing Stage I (direct audio LLM training without ranker) fails because synthetic degradations do not mirror real noise distributions. Using Audio Flamingo 3 instead of Qwen2-Audio drops performance to 21.53 BLEU due to single-audio input limitations. On German-to-English (DE→EN), the method improves BLEU from 13.27 to 15.14 (+1.87).

| System / Condition | Retained Pairs | ASR-BLEU |
|---|---|---|
| CVSS-C + SpeechMatrix (Unfiltered) | 614,265 | 21.32 |
| Random Keep | 477,773 | 21.27 |
| BLEURT Filtering | 477,773 | 22.09 |
| BLASER 2.0-QE Filtering | 477,773 | 21.71 |
| 70B LLM Filtering | 477,773 | 22.32 |
| Ours (Audio-LLM Filter) | 477,773 | 22.72 |

## Limitations

The current binary classification formulation forces a hard keep/drop decision, preventing flexible retention tuning under arbitrary compute or data budgets. The evaluation is currently restricted to speech translation tasks (FR→EN and DE→EN) and relies on fixed pseudo-labeling thresholds that may require retuning for entirely different domain distributions.

## Why read this

Speech and ML researchers working on multi-modal data curation and end-to-end speech translation should read this to learn how to leverage audio-LLMs for robust data filtering. It demonstrates how a Rank→Distill pipeline bridges the gap between text-only semantic judges and raw acoustic perception.

## Code

- https://github.com/chin-alt/S2S-Filtering

## Applications

Data cleaning and filtering pipelines for large-scale speech-to-speech translation, voice conversion, and cross-lingual spoken corpora.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen

**Funding / 經費:** National Natural Science Foundation of China, Program for Guangdong Introducing Innovative and Entrepreneurial Teams

## Related

- (link related pages by id as the wiki grows)
