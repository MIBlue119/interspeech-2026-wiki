---
id: edet26_interspeech
category: tts
labels: [low-resource, dataset-or-benchmark-release, generative-model]
institutions: ["University of Cross River State", "University of Calabar", "ML Collective"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1868
pdf: https://www.isca-archive.org/interspeech_2026/edet26_interspeech.pdf
---

# Towards Digital Preservation of Efik: TTS for a Low-Resource African Language

*Offiong Bassey Edet, Emmanuel Oyo-Ita, Archibong Okon Archibong, David Effanga Bassey, Mbuotidem Sunday Awak*

[PDF](https://www.isca-archive.org/interspeech_2026/edet26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/edet26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1868)

**Category:** `tts` · **Labels:** `low-resource`, `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — This paper presents the first end-to-end text-to-speech (TTS) study for Efik, a low-resource tonal African language, by introducing a curated 3-hour single-speaker corpus and benchmarking four neural architectures. MMS-TTS emerges as the top-performing model, achieving a mean opinion score (MOS) of 3.80 ± 0.63.

## Key contributions

- Introduces the first documented single-speaker Efik TTS corpus consisting of 2,632 validated utterances totaling approximately 3.08 hours.
- Provides a comparative evaluation of four distinct neural TTS architectures (VITS, MMS-TTS, SpeechT5, and Orpheus-TTS) under extreme low-resource conditions.
- Establishes a foundational evaluation benchmark using native speaker evaluations across MOS, Nat-MOS, and A-MOS metrics.
- Identifies transfer learning via multilingual pretraining (e.g., initializing MMS-TTS with a Yoruba checkpoint) as a key enabler for intelligible low-resource tonal synthesis.

## Problem

Efik is a Lower Cross tonal language spoken by 1.5 million native speakers and 3 million second-language speakers in Southeastern Nigeria, yet it remains absent from modern speech technology pipelines. Developing TTS for Efik is hindered by severe data scarcity and the need to accurately model lexical pitch variations, as inadequate tone realization destroys intelligibility. Prior automatic forced alignment using Whisper and XLS-R failed completely due to a lack of pretraining exposure to Lower Cross languages, necessitating manual annotation to construct a reliable training set.

## Method

The authors fine-tuned four models: VITS (conditional VAE with normalizing flows), MMS-TTS (multilingual framework leveraging cross-lingual transfer), SpeechT5 (transformer sequence-to-sequence), and Orpheus-TTS (adversarial waveform realism). Because MMS-TTS lacked an Efik checkpoint, it was initialized using a Yoruba checkpoint with vocabulary and embedding extensions for Efik-specific characters like o. and ˜n. VITS and SpeechT5 similarly required updated embeddings, while Orpheus-TTS worked without modification.

Training was conducted on a single NVIDIA A100 GPU using mixed precision and early stopping based on validation loss. Hyperparameters included: VITS trained for 50 epochs (lr=2e-4, batch size 4, Adam); MMS-TTS trained for 50 epochs (lr=2e-5, batch size 16, AdamW); SpeechT5 trained for up to 2,500 epochs (lr=1e-5, batch size 4, 0.1 dropout); and Orpheus-TTS trained for 50 epochs (lr=2e-5, batch size 8). The audio dataset was preprocessed into uncompressed 16 kHz mono WAV files with trailing silences of 60-100 ms preserved to protect sentence-final tonal cues.

## Experimental setup

The dataset contains 2,632 utterances (1,975 train, 264 validation, 393 test) summing to 3.08 hours from a single native speaker, drawn from novels, folktales, and educational texts. Evaluation was performed by 5 native Efik speakers rating short clips on a 1-5 scale across MOS (overall naturalness), Nat-MOS (native naturalness), and A-MOS (accent/phonetic preservation). Models were compared against each other as baselines under identical low-resource constraints.

## Results

MMS-TTS achieved the headline-leading MOS of 3.80 ± 0.63, Nat-MOS of 3.60 ± 0.56, and A-MOS of 3.04 ± 0.52, demonstrating superior stability in generating continuous speech up to 3 minutes without hallucination. Orpheus-TTS ranked second with an MOS of 3.08 ± 0.48 and Nat-MOS of 2.32 ± 0.46, though it exhibited a foreign European male accent and struggled with tonal nuances. SpeechT5 scored an MOS of 2.48 ± 0.49, maintaining intelligibility only for short sequences under 20-30 seconds before hallucinating. VITS performed the worst with an MOS of 1.08 ± 0.27, completely failing to capture tonal variations or produce intelligible long-form audio due to its heavy reliance on large-scale datasets.

| Model | MOS | Nat-MOS | A-MOS |
|---|---|---|---|
| VITS | 1.08 ± 0.27 | 1.04 ± 0.19 | - |
| SpeechT5 | 2.48 ± 0.49 | 1.88 ± 0.51 | 1.64 ± 0.48 |
| Orpheus-TTS | 3.08 ± 0.48 | 2.32 ± 0.46 | 2.21 ± 0.43 |
| MMS-TTS | 3.80 ± 0.63 | 3.60 ± 0.56 | 3.04 ± 0.52 |

## Limitations

The study is restricted to a single-speaker dataset of roughly 3 hours, limiting prosodic variation and robust long-sequence modeling. Rare phonemes like ˜n caused persistent pronunciation failures across all evaluated models, and non-MMS models suffered from foreign accent drift and poor preservation of cultural tonal contours.

## Why read this

Speech researchers and engineers working on extremely low-resource, tonal, or underrepresented African languages should read this paper to understand how cross-lingual transfer (such as initializing with Yoruba checkpoints) bridges data gaps where mainstream models like VITS fail.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Digital language preservation, educational tools, and text-to-speech accessibility applications for the Efik-speaking community.

## Institutions / 機構

University of Cross River State, University of Calabar, ML Collective

## Related

- [High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages](tamiru26_interspeech.md) — same problem · relatedness 2.4/3
- [Indigenising Speech Technology: Building a TTS Model for te Reo Māori](leoni26_interspeech.md) — same problem · relatedness 2.3/3
- [Scalable Neural TTS for Latin-Script Low-Resource Languages of Manipur](pangsatabam26_interspeech.md) — same problem · relatedness 2.3/3
- [IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis](varadhan26_interspeech.md) — same problem · relatedness 2.1/3
- [Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS](syllas26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
