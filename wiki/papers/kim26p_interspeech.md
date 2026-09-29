---
id: kim26p_interspeech
category: tts
labels: [low-resource, generative-model]
institutions: ["CBS", "Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2055
pdf: https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.pdf
---

# SALT: Selective Allophone-Level Tokenization for Korean Text-to-Speech Synthesis

*Kwangsung Kim, Cellik Adams, EunKyoung Jo*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2055)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — Selective Allophone-Level Tokenization (SALT) injects targeted linguistic inductive biases into Korean text-to-speech by tagging allophonic variants, reducing character error rate from 4.74% to 3.30% on a 12.75-hour dataset and breaking the 10% CER barrier in an extremely low-resource 1-hour setting.

## Key contributions

- Introduces Selective Allophone-Level Tokenization (SALT) to resolve morphophonemic orthography-to-pronunciation mismatches and acoustic ambiguities in Korean TTS without heavy data reliance.
- Proposes SALT-N, a targeted tokenization variant that selectively separates nasal codas (ㅁ, ㄴ, ㅇ) to maximize Renyi token efficiency and minimize vocabulary expansion.
- Demonstrates that aggressive token expansion (SALT-VCP with all allophonic rules) causes data sparsity and degrades performance, whereas selective tagging preserves learnability.
- Achieves superior performance over raw grapheme and phoneme baselines in both standard (12.75h) and extremely low-resource (1h) single-speaker training regimes.

## Problem

Modern Korean TTS models predominantly rely on raw grapheme (jamo) inputs to exploit the phonetic transparency of Hangul and avoid G2P cascade errors, assuming models can learn pronunciation implicitly. However, Korean orthography is morphophonemic, creating a persistent divergence between written forms and actual spoken pronunciations that low-resource data cannot resolve. Conversely, traditional phoneme-level or exhaustive allophone-level (SALT-VCP) tokenization fails due to token distribution imbalance, high Gini coefficients, and severe data sparsity caused by vocabulary inflation.

## Method

The architecture builds upon F5-TTS, a non-autoregressive flow matching model. The authors adapt a pre-trained F5-TTS model (originally trained on English and Mandarin) using PEFT-TTS, fully fine-tuning the text embedding and ConvNeXt V2 text encoder to ingest the new allophone vocabulary while applying LoRA (prompt adapter rank 64, DiT LoRA rank 16) to the remaining modules. Text inputs are first normalized via N2gk+ to convert numbers, Latin text, and symbols into Hangul, converted to phonemes via G2P, and finally mapped to allophonic tokens via SALT rules. 

SALT-N specifically isolates nasal codas (ㅁ, ㄴ, ㅇ) using a dedicated coda tag ('c'), reflecting the statistical observation that nasals account for 72.5% of Korean spontaneous speech codas. This selective approach preserves a compact vocabulary size (43 unigrams) and achieves the highest unigram Renyi efficiency (0.790 at alpha = 2.5) compared to the exhaustive SALT-VCP variant (56 unigrams, lower efficiency). Models are trained on 24kHz downsampled audio using two NVIDIA A100 (80GB) GPUs with a batch size of 19,200 frames per GPU using the AdamW optimizer (learning rate 1e-5) for up to 150K steps. Vocos is used as the neural vocoder for waveform generation.

## Experimental setup

Experiments utilize the KSS (Korean Single Speaker) dataset split into 12.75 hours for training, 50 validation samples, and 50 test samples, plus a reduced 1-hour subset for low-resource testing. Baselines include raw Grapheme, Phoneme, and exhaustive SALT-VCP. Evaluation metrics encompass Character Error Rate (CER) and Word Error Rate (WER) transcribed via Whisper-Large-v3, UTMOS for objective acoustic naturalness, WavLM-based cosine similarity (SIM) for speaker timbre preservation, and a 5-point Naturalness Mean Opinion Score (NMOS) evaluated by 27 native listeners.

## Results

On the 12.75h KSS dataset, SALT-N achieved the lowest CER of 3.30% and WER of 11.24%, outperforming Grapheme (4.74% CER, 15.26% WER) and Phoneme baselines (3.74% CER, 14.06% WER). The exhaustive SALT-VCP method underperformed with a 6.03% CER due to sparse token distributions. In the NMOS subjective evaluation, SALT-N scored 3.10, significantly outperforming grapheme (2.62) and phoneme (2.53) baselines. In the 1-hour extremely low-resource setting, all baseline models suffered severe degradation with CERs remaining above 10% (Grapheme at 12.21%, Phoneme at 10.78%), whereas SALT-N successfully dropped to an 8.19% CER.

| System | CER (%) | WER (%) | UTMOS | NMOS |
|---|---|---|---|---|
| Ground Truth | 3.88 | 10.44 | 3.23 | 4.25 |
| Grapheme | 4.74 | 15.26 | 2.93 | 2.62 |
| Phoneme | 3.74 | 14.06 | 2.89 | 2.53 |
| SALT-VCP | 6.03 | 17.67 | 3.00 | 3.01 |
| SALT-N | 3.30 | 11.24 | 2.96 | 3.10 |

## Limitations

The evaluation is restricted to a single-speaker corpus (KSS), leaving multi-speaker generalization unverified. The scope is limited to Korean, and the paper does not test scalability on large multi-speaker datasets like CoreaSpeech, though the authors identify this as future work.

## Why read this

Read this paper if you work on low-resource speech synthesis or phonologically complex languages and want to understand how targeted linguistic inductive biases outperform brute-force implicit neural learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource Korean text-to-speech synthesis, localized voice assistants, and phonologically-aware acoustic frontend design for neural speech generation.

## Institutions / 機構

CBS, Sogang University

**Funding / 經費:** Institute of Information Communications Technology Planning Evaluation

## Related

- [Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS](syllas26_interspeech.md) — same problem · relatedness 1.9/3
- [Uncovering the Impact of G2P Precision on Korean TTS: A Large-Scale Statistical Validation via a Novel Morphological Engine](you26_interspeech.md) — same problem · relatedness 1.9/3
- [Indigenising Speech Technology: Building a TTS Model for te Reo Māori](leoni26_interspeech.md) — same problem · relatedness 1.9/3
- [High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages](tamiru26_interspeech.md) — same problem · relatedness 1.9/3
- [K-DIALECT : Korean Dialect-Aware Face-Based Speech Synthesis](yang26d_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
