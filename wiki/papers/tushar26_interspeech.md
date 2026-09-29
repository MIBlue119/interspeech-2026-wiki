---
id: tushar26_interspeech
category: deepfake-security
labels: [self-supervised, generative-model]
institutions: ["Singapore Institute of Technology", "Duke Kunshan University"]
code: https://github.com/pranavtushar/SSL-CVA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2191
pdf: https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.pdf
---

# Child-Centric Voice Anonymization in Single and Multi-Speaker Speech via Domain-Adapted SSL Models

*Pranav Tushar, Xiaoxiao Miao, Rong Tong*

[PDF](https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2191)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — This paper investigates child-centric voice anonymization by fine-tuning an SSL-based architecture (HuBERT encoder and HiFi-GAN vocoder) and a controlled child speaker pool on the MyST corpus, improving intelligibility and age preservation while achieving strong privacy protection (EER of 45.09% in-domain). It also extends the pipeline to multi-speaker mixtures using Conformer-based target speaker extraction, showing that privacy is stable across overlaps while downstream utility is bounded by extraction errors.

## Key contributions

- Systematic evaluation of child-domain adaptation for SSL-based voice anonymization across in-domain (MyST) and zero-shot cross-accent benchmarks (MPS, SpeechOcean).
- Construction of a controlled child speaker pool from AI-generated, age-consistent voices (Typecast and SpeechGen) enabling child-to-child anonymization without adult-voice distortion.
- Extension of the pipeline to two-speaker mixtures via Conformer-based target speaker extraction across adult-adult, child-adult, and child-child pairings.
- Comprehensive subjective and objective evaluation demonstrating that joint adaptation of content encoder and vocoder achieves superior WER and EER compared to unadapted or partially adapted pipelines.

## Problem

Voice anonymization systems are predominantly developed and evaluated on adult speech, relying on content encoders and neural vocoders trained on adult data. When applied to children's speech—which exhibits higher fundamental frequencies, greater prosodic variability, and developmental disfluencies—adult-oriented systems suffer from severe degradation in linguistic intelligibility and perceptual quality. Furthermore, existing pipelines either distort age-dependent acoustic cues by converting children's voices into adult-like tones or fail in multi-speaker conversational settings (such as classrooms or clinical sessions) where selective targeting of a child speaker in the presence of overlapping speech is required.

## Method

The single-speaker pipeline decomposes input speech $x$ into three disentangled representations: soft content features $c$ via a HuBERT-based encoder, a pitch contour $f_0$, and a speaker embedding $s$ extracted via ECAPA-TDNN. To mitigate domain mismatch, both the HuBERT soft content encoder and the HiFi-GAN vocoder are fine-tuned on the MyST child speech corpus. The original adult speaker pool is replaced with a controlled pool of 44 utterances from 16 synthetic child-like speakers (generated via Typecast and SpeechGen and manually screened for age consistency and naturalness). During anonymization, the source speaker embedding $s$ is replaced by a reference child embedding $s_{	ext{ref}}$, while content and prosody representations are kept intact. The HiFi-GAN vocoder then reconstructs the anonymized waveform $\tilde{x}$ from $(c, f_0, \tilde{s})$.

For multi-speaker scenarios (two-speaker mixtures $x_{	ext{mix}}$ with 0-100% overlap ratios at 0 dB SNR), a Conformer-based target speaker extraction (TSE) model isolates the target signal using a short reference utterance $r_{	ext{target}}$. The extracted target signal $\hat{x}_{\text{target}}$ is processed through the single-speaker child-adapted anonymization pipeline, while the non-target residual $\hat{x}_{\text{non-target}} = x_{	ext{mix}} - \hat{x}_{\text{target}}$ is left untouched. The final mixture is reconstructed as $\tilde{x}_{	ext{mix}} = \tilde{x}_{\text{target}} + \hat{x}_{\text{non-target}}$. Three age pairings are evaluated: adult-adult (AA), child-adult (CA), and child-child (CC).

## Experimental setup

Single-speaker experiments use the MyST corpus (US English, ages 8-11) for in-domain training and testing, alongside zero-shot cross-accent benchmarks MPS (Indian accent, ages 7-11) and SpeechOcean (Mandarin accent, ages 6-10). Multi-speaker evaluations generate 50 SparseLibriMix-style mixtures per overlap level (0-100% in 20% increments) across AA, CA, and CC pairings (900 mixtures total). Metrics include EER via ECAPA-TDNN ASV for privacy (original vs. anonymized), WER via Whisper Large-v3 for intelligibility, NISQA-MOS for objective quality, and human listening tests (13 participants) rating naturalness, fluency, similarity, and perceived age. Diarization error rate (DER) and target WER (tWER) using gpt-4o-transcribe-diarize and DiariZen+pyannote evaluate multi-speaker performance.

## Results

In single-speaker in-domain MyST evaluations, fully adapting both the content encoder and HiFi-GAN vocoder (FT/FT) achieves an EER of 45.09% (up from 15.39% original and 43.80% for base SSL) and a WER of 16.64% (improving over the 17.31% base SSL and 20.02% B2 signal-processing baseline). On zero-shot cross-accent datasets, the fully adapted SSL-FT model maintains strong privacy with EERs of 39.88% on SpeechOcean and 40.94% on MPS, while yielding competitive WERs (43.36% and 15.72%, respectively). Human evaluations confirm that SSL-FT preserves perceived childness more consistently than base SSL or B2 while maintaining low speaker similarity scores.

In multi-speaker evaluations, privacy (OA EER) remains robust and stable across overlap ratios (0-100%) for all age pairings. However, downstream utility degrades significantly based on extraction difficulty: target WER (tWER) and diarization error rate (DER) are lowest for adult-adult mixtures, moderate for child-adult, and highest for child-child mixtures, where acoustic similarity and rapid child spectral dynamics severely challenge target speaker extraction.

| System / Condition | EER (OA) % (↑) | WER % (↓) | NISQA-MOS (↑) |
|---|---|---|---|
| MyST (Original) | 15.39 | 14.55 | 2.65 |
| MyST (B2 Baseline) | 42.10 | 20.02 | 2.25 |
| MyST (SSL Base/Base) | 43.80 | 17.31 | 3.60 |
| MyST (SSL FT/Base) | 38.10 | 19.53 | 3.70 |
| MyST (SSL Base/FT) | 40.68 | 20.67 | 3.10 |
| MyST (SSL FT/FT - Proposed) | 45.09 | 16.64 | 3.36 |

## Limitations

The study is bounded by data scale and accent coverage, focusing primarily on US and accented English datasets (MyST, MPS, SpeechOcean). Several key multi-speaker components—including the Conformer extraction model, ECAPA-TDNN ASV attackers, and NISQA MOS predictors—remain adult-trained, introducing domain mismatch in evaluation metrics and extraction stages. Additionally, automatic quantification of age preservation remains unreliable, necessitating subjective human listening tests that limit scalability.

## Why read this

Speech and ML engineers building privacy-preserving pipelines for minors should read this paper to understand how domain mismatch in foundational SSL content encoders and vocoders affects child speech anonymization. It provides a blueprint for child-to-child voice anonymization and reveals critical insights into the decoupling of privacy and utility in multi-speaker mixtures.

## Code

- https://github.com/pranavtushar/SSL-CVA

## Applications

Deploying privacy-preserving speech technologies in child-centered environments such as smart classrooms, educational software, pediatric telehealth, and automated speech-based developmental screening.

## Institutions / 機構

Singapore Institute of Technology, Duke Kunshan University

**Funding / 經費:** Singapore Ministry of Education Academic Research Fund Tier 1

## Related

- (link related pages by id as the wiki grows)
