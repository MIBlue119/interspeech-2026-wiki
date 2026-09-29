---
id: francis26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-709
pdf: https://www.isca-archive.org/interspeech_2026/francis26_interspeech.pdf
---

# No-Shot Text-to-Speech: Limitations of Zero-Shot TTS and its Evaluation Methods in Representing Queer and Transgender Voices

*Juliana Francis, Robin Netzorg, Joakim Gustafson, Éva Székely*

[PDF](https://www.isca-archive.org/interspeech_2026/francis26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/francis26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-709)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — An evaluation of six zero-shot TTS models on queer and transgender (Gender Expansive, GE) versus cisgender (Non Gender Expansive, N-GE) voices reveals that human perceptual ratings and automated metrics yield conflicting results, exposing major blind spots in current speech synthesis evaluation pipelines. LinaSpeech and XTTS performed significantly worse on GE voices, whereas F5TTS, E2TTS, and CosyVoice2 showed higher similarity scores for GE voices.

## Key contributions

- Evaluated six popular zero-shot TTS systems (CosyVoice2, E2TTS, F5TTS, XTTS, Zonos, LinaSpeech) on a gender-expansive voice dataset (MAGES) versus a cisgender baseline dataset (GLOBE).
- Conducted a MUSHRA-like human listening study with 16 participants yielding 144 subjective similarity ratings, demonstrating that performance degradation is model-dependent and exhibits larger effect sizes when GE voices are poorly replicated.
- Benchmarked three automated speaker similarity models (ECAPA-TDNN, TitaNet-L, ReDimNet-M) and two automated MOS predictors (UTMOS, fine-tuned wav2vec2), uncovering severe inconsistencies between automated metrics and human perceptual judgments.
- Highlighted critical ethical and technical dilemmas surrounding the scarcity of queer speech datasets, privacy risks, and the imperative for community-led dataset curation.

## Problem

Gender-expansive and transgender voices remain severely underrepresented or completely absent in mainstream speech datasets like Common Voice and large TTS training corpora, leading to potential generalizability failures and erasure of identity in zero-shot cloning. Prior work shows that end-to-end models often strip distinctive queer voice characteristics, and automated speech tools frequently fail on out-of-distribution or marginalized demographic data. This study addresses the urgent gap of whether modern zero-shot TTS systems and evaluation metrics contain systematic biases against gender-expansive voices, ensuring that speech technologies do not further marginalize vulnerable user groups.

## Method

The study evaluates six zero-shot TTS models: CosyVoice2, E2TTS, F5TTS, XTTS, Zonos, and LinaSpeech. For test data, 14 Non-Gender Expansive (N-GE) speakers were sampled from the GLOBE dataset (balanced by US English accents and gender metadata), and 14 Gender Expansive (GE) speakers were drawn from the Mid-Atlantic Gender Expansive Speech (MAGES) dataset based on self-identification. For each speaker, a 10-second reference audio was constructed via concatenation, and 15 Harvard sentences were synthesized per model at 16 kHz and -20 dB.

Human evaluations utilized a MUSHRA-like paradigm where 16 participants rated similarity on a 0-100 scale across 24 total trials. Automated evaluation pipelines used Word Error Rate (WER) via Whisper, Automated Mean Opinion Score (AMOS) via UTMOS and a fine-tuned wav2vec2 model, and speaker similarity via cosine distance extracted from ECAPA-TDNN, TitaNet-L, and ReDimNet-M embeddings. Intraclass Correlation Coefficients (ICC) were computed to test metric consistency across conditions.

The authors hypothesize that models trained on spontaneous or in-the-wild datasets (like EMILIA, used by F5TTS and E2TTS) capture acoustic nuances better than those trained strictly on read speech corpora (XTTS, LinaSpeech), while automated metrics fail because their underlying training data similarly underrepresents diverse speech patterns.

## Experimental setup

Evaluated on the GLOBE dataset (N-GE, US English subset) and the MAGES dataset (GE, self-identified speakers, 14 speakers total). Evaluated 6 zero-shot TTS models: CosyVoice2, E2TTS, F5TTS, XTTS, Zonos, and LinaSpeech. Metrics included human MUSHRA-like similarity ratings (0-100 scale), Word Error Rate (WER via Whisper), Automated MOS (UTMOS, fine-grained wav2vec2), and speaker embedding cosine similarity (ECAPA-TDNN, TitaNet-L, ReDimNet-M). The human evaluation comprised 16 participants rating 8 total speakers across 144 evaluations.

## Results

Human listening tests showed that E2TTS, F5TTS, and CosyVoice2 rated GE voices as significantly more similar to references than N-GE voices (F5TTS: 74.70 GE vs 67.80 N-GE, t=-3.01, d=-0.31; E2TTS: 72.13 GE vs 65.19 N-GE, t=-2.74, d=-0.28; CosyVoice2: 62.57 GE vs 56.06 N-GE, t=-2.19, d=-0.23). Conversely, XTTS and LinaSpeech performed significantly worse on GE voices (LinaSpeech: 39.92 GE vs 58.90 N-GE, t=6.82, d=0.70; XTTS: 42.85 GE vs 55.01 N-GE, t=4.07, d=0.42). Zonos showed no significant difference. Automated metrics exhibited deep contradictions: UTMOS predicted N-GE voices as significantly better across all models, whereas ECAPA-TDNN and ReDimNet-M often rated GE voices higher for models like F5TTS and E2TTS. Zonos had completely conflicting results depending on the embedding model used (ECAPA favored GE, TitaNet favored N-GE, ReDimNet showed no difference). LinaSpeech suffered the highest WER on GE voices (14.1%).

| Model | Human GE (0-100) | Human N-GE (0-100) | WER GE | WER N-GE | UTMOS GE | UTMOS N-GE |
|---|---|---|---|---|---|---|
| F5TTS | 74.70 | 67.80 | 0.038 | 0.022 | 4.192 | 4.284 |
| E2TTS | 72.13 | 65.19 | 0.040 | 0.021 | 3.978 | 4.065 |
| CosyVoice2 | 62.57 | 56.06 | 0.088 | 0.087 | 4.366 | 4.405 |
| Zonos | 46.78 | 50.07 | 0.052 | 0.060 | 4.081 | 4.143 |
| XTTS | 42.85 | 55.01 | 0.039 | 0.020 | 4.052 | 4.155 |
| LinaSpeech | 39.92 | 58.90 | 0.141 | 0.072 | 4.206 | 4.265 |

## Limitations

The evaluation is bounded by a very small sample size of gender-expansive speakers (only 14 speakers available in the MAGES dataset) and a limited human listener pool (16 participants). The scope is restricted to English-language models and speakers with US accents. Furthermore, automated metrics and speech datasets lack fine-grained demographic metadata, making it impossible to disaggregate intersectional factors like race, dialect, and regional accents within the queer community.

## Why read this

Speech and ML engineers building zero-shot TTS architectures or automated evaluation pipelines should read this paper to understand that standard automated metrics (UTMOS, speaker embedding cosine distance) fail to align with human perceptions of minority and gender-expansive voices. The findings provide an essential critique of dataset bias and evaluation validity in modern speech synthesis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and improving zero-shot text-to-speech fairness, developing inclusive speech evaluation benchmarks, and designing ethical data collection protocols for marginalized speaker communities.

## Institutions / 機構

KTH Royal Institute of Technology, University of California, Berkeley

**Funding / 經費:** WASP

## Related

- (link related pages by id as the wiki grows)
