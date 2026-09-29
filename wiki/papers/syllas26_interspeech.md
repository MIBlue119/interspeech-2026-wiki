---
id: syllas26_interspeech
category: tts
labels: [low-resource, multilingual, generative-model]
institutions: ["Athena R.C", "University of Bern", "National Technical University of Athens"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2481
pdf: https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.pdf
---

# Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS

*Georgios Syllas, Efthymios Georgiou, Kosmas Kritsis, Alexandros Potamianos*

[PDF](https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2481)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `generative-model`

**TL;DR** — This paper proposes a two-stage adaptation recipe combining full fine-tuning on curated multilingual data with speaker-specific LoRA and deterministic prompting to build a high-quality Modern Greek text-to-speech model from limited data. The best configuration achieves a 10.7% word error rate and near-human speaker consistency (MOS-C 4.24).

## Key contributions

- A reusable data curation pipeline that cleans raw Greek audio and audiobooks via WhisperX alignment and aggressive acoustic filtering.
- A two-stage adaptation recipe for prompt-conditioned codec models (Parler-TTS): full multi-speaker fine-tuning followed by speaker-specific LoRA.
- Identification of LLM-generated style prompts as a cause of speaker timbre drift, resolved by replacing them with deterministic quantile-binned prompts.
- Empirical evidence that robust single-speaker Modern Greek TTS is achievable using only 3.5 hours of target speaker data.

## Problem

State-of-the-art neural TTS architectures demand large, clean, single-speaker corpora that are largely unavailable for low-resource languages like Modern Greek. Existing public Greek resources consist either of tiny clean sets (CSS10) or noisy multi-speaker collections (Common Voice) with fragmentary supervision, causing model training to collapse into a diffuse, speaker-averaged voice with severe timbre drift, prosody degradation, and articulation errors. Prior standard models such as VITS fail to deliver intelligible prosody under these constraints, and stochastic LLM-based style conditioning introduces unpredictable generation-to-generation variability.

## Method

The authors adopt Parler-TTS (880M parameters), leveraging its pretrained cross-lingual phonetic and prosodic priors transferred from phonetically similar languages like Spanish. The pipeline first executes full multi-speaker fine-tuning on ~23 hours of data (Common Voice filtered to 15.5h + CSS10 + Audiobook-1) using the AdamW optimizer with a learning rate of 1e-4 for 50 epochs on the entire 500M-parameter decoder. To mitigate speaker averaging and timbre drift, a second stage applies Low-Rank Adaptation (LoRA) specifically to attention projection matrices (rank r=16, alpha=32, dropout=0.05) over 2 additional epochs using 3.5 hours of a single verified male speaker's data, updating only ~25M parameters (~5% of the decoder). Stochastic LLM-generated style prompts are replaced with deterministic prompts formed by discretizing scalar attributes (speaking rate, pitch, SNR, reverberation) into five quantile bins and concatenating fixed labels (e.g., "male, slightly low pitch, moderate speed, very clear"). Inference utilizes greedy decoding with a single canonical deterministic prompt (median bins).

For data preparation, raw audiobooks and Common Voice clips undergo WhisperX forced alignment, duration trimming (1.5–10 s segments), and SNR/transcription confidence filtering. An automatically filtered 7.5h audiobook corpus was dropped due to ASR hallucination propagation, proving that transcription accuracy supersedes sheer data volume.

## Experimental setup

Evaluated on a 50-utterance held-out Common Voice test set for intelligibility and 20 held-out audiobook utterances for speaker similarity. Datasets include CSS10 (4.0h), Common Voice Greek (15.5h filtered out of 32h), and a verified Audiobook-1 single-speaker corpus (3.5h). Baselines include ground-truth human speech, a pretrained Greek VITS checkpoint, multi-speaker Parler-TTS with LLM prompts or deterministic prompts, and LLM+LoRA. Metrics comprise ASR-based WER/CER (via WhisperX v3), Mel-Cepstral Distortion (MCD), ECAPA-TDNN speaker similarity (SIM-S), and listener-based MOS for naturalness (MOS-N), intelligibility (MOS-I), and vocal consistency (MOS-C) evaluated by 29 native speakers. Hardware used includes an A100 40GB for full fine-tuning (~20h wall time) and a T4 16GB GPU for LoRA (~2h wall time).

## Results

The deterministic LoRA configuration achieves a word error rate (WER) of 10.7% and character error rate (CER) of 3.7%, closely approaching the human ASR floor of 7.8% WER and 2.3% CER. Without LoRA, deterministic multi-speaker models lag in WER (18.8%), and pairing LoRA with stochastic LLM prompts yields a worse WER of 21.1%. In subjective evaluations, the deterministic LoRA system attains near-human voice consistency with a MOS-C of 4.24 (vs 4.30 for human speech, outperforming LLM+LoRA's 3.56). Naturalness MOS-N reaches 3.68 (vs 3.47 for human Common Voice clips which contained background noise and variable microphone quality). Subjective intelligibility MOS-I reaches 4.00. Across ablations, deterministic prompting consistently improves stability when combined with LoRA, whereas fully automated LLM prompts induce severe timbre drift across utterances. Primary limitations observed are lexical-stress errors and minor residual syllable hallucinations.

| System | Spk. | WER ↓ | CER ↓ | MOS-I ↑ | MOS-C ↑ |
|---|---|---|---|---|---|
| Ground Truth | Ref. | 7.8% | 2.3% | 4.36 | 4.30 |
| Parler-TTS (LLM) | MS | 15.2% | 6.2% | 3.83 | – |
| Parler-TTS (Det.) | MS | 18.8% | 8.0% | 4.11 | – |
| LLM + LoRA | SS | 21.1% | 7.6% | 3.92 | 3.56 |
| Det. + LoRA | SS | 10.7% | 3.7% | 4.00 | 4.24 |

## Limitations

The work is restricted to Modern Greek, a single male LoRA speaker, and a single reading style, leaving multi-speaker and expressive style scaling for future investigation. The evaluation relies heavily on ASR-based metrics which can misestimate perceptual error rates for morphologically complex languages. Additionally, absolute speaker-similarity vector scores remain modest (SIM-S ~0.60), and the subjective study relies on a relatively small listening cohort (n=25–27).

## Why read this

Speech researchers and engineers tackling low-resource TTS will learn how to effectively adapt large multilingual prompt-conditioned codec models using parameter-efficient LoRA and deterministic prompt engineering. It provides a concrete blueprint for overcoming speaker drift and data scarcity in non-English languages.

## Code

- https://github.com/gsyllas/greek-stable-tts/tree/main/scripts/data

## Applications

Low-resource synthetic voice generation, audiobook narration, and localized speech assistants for Modern Greek.

## Institutions / 機構

Athena R.C, University of Bern, National Technical University of Athens

**Funding / 經費:** European High-Performance Computing Joint Undertaking, Greek Ministry of Digital Governance and Artificial Intelligence

## Related

- (link related pages by id as the wiki grows)
