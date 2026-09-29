---
id: wu26l_interspeech
category: tts
labels: [low-resource, generative-model]
institutions: ["RIKEN", "University of Osaka", "Advanced Telecommunications Research Institute International", "National Institute of Informatics"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2150
pdf: https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.pdf
---

# One-to-Many Electrolaryngeal Voice Conversion with Synthetic Data

*Bowen Wu, Haruto Ueno, Carlos Toshinori Ishi, Chaoran Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2150)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — This paper proposes a data-driven framework to build one-to-many electrolaryngeal (EL) to natural (NL) voice conversion models using only 13 minutes of real EL data, leveraging synthetic data generation to significantly outperform prior pseudo-EL augmentation methods in intelligibility and intonation naturalness.

## Key contributions

- A data-driven pipeline adapting pretrained any-to-many voice conversion (QuickVC) models to one-to-many EL-to-NL voice conversion using a tiny 13-minute real EL corpus.
- A synthetic data generation technique that finetunes an intermediate NL-to-EL model on real EL speech to accurately reconstruct spectral features (e.g., low-frequency components, fricatives, plosives) absent in naive flat-F0 baselines.
- Empirical validation showing that scaling up the synthetic training data from 100 to 10,000 pairs progressively improves objective and subjective metrics for EL-to-NL conversion.
- A freezing strategy during supervised finetuning (freezing the speaker encoder and updating only the content encoder and flow module) that preserves target speaker identity while enabling proper intonation reconstruction from EL speech.

## Problem

Laryngectomees lose natural speech capability and often rely on electrolarynx (EL) devices, which produce monotonous, mechanical excitation lacking natural prosody. While deep learning voice conversion can restore natural speech, time-aligned conversion suffers from severe data scarcity because EL users rarely possess pre-laryngectomy recordings, and prior heuristic data augmentation methods (like flat-F0 pseudo EL speech) fail to match true EL spectral properties. Furthermore, practical systems must support one-to-many conversion so users can select from multiple target voices, a capability unaddressed by existing small-scale parallel EL-to-NL pipelines.

## Method

The method adopts the QuickVC (QVC) architecture, which utilizes a VAE with CNN posterior encoders and decoders, a Whisper content encoder (extracting speaker-independent features via CNN and self-attention), a speaker encoder, and a CNN-based flow module matching latent representations. The pipeline runs in three stages: (1) A small corpus of 100 EL utterances (13 minutes total, averaging ~8 seconds per utterance) recorded from a single 20-year veteran EL user in a soundproof room using a DPA 4060 microphone is used to finetune a pretrained Japanese QVC model (pre-trained from scratch on the JVS corpus for 290k steps) for NL-to-EL conversion with the Whisper encoder frozen for 90k steps using adversarial and feature matching losses.

In the second stage, this NL2EL model converts 12,998 speech samples from the JVS multi-speaker corpus into synthetic, time-aligned EL speech, establishing paired NL/EL training data. In the third stage, QVC is finetuned for EL-to-NL conversion for 50k steps using up to 10k of these synthetic pairs. During this supervised finetuning, synthetic EL speech feeds the Whisper encoder, while corresponding NL speech feeds the speaker encoder as the target voice. The content encoder and flow module are updated using KL divergence and reconstruction losses to map EL features to natural NL prosody, while the speaker encoder is strictly frozen to prevent it from extracting unintended intonation cues from the target speaker.

Inference takes approximately 0.05 seconds for 10-second audio files on a single NVIDIA RTX 3090, accepting an EL speech input to the Whisper encoder and an arbitrary speaker's NL utterance to the speaker encoder to dictate the output voice.

## Experimental setup

Evaluated on a custom 13-minute Japanese EL speech dataset (100 utterances from 1 speaker) and the JVS multi-speaker corpus (12,998 samples, evaluating conversion across 3 male and 2 female target voices). Compared against baselines: standard QVC, QVC-mix (QVC further finetuned with raw EL speech), and flat-F0 (pseudo EL created by flattening F0 via PYWORLD). Metrics include Mel-Cepstrum Distortion (MCD), log F0 RMSE, F0 Correlation (CORR), Whisper-based Character Error Rate (CER), Resemblyzer Voice Similarity, CMOS for intonation naturalness (N-CMOS) and intelligibility (I-CMOS), and S-MOS. Implemented on a single NVIDIA RTX 3090 with training taking ~4 days total.

## Results

The proposedours-10k model achieves an MCD of 6.607, F0 RMSE of 0.309, F0 CORR of 0.585, CER of 0.366, and voice similarity of 0.923, outperforming the flat-F0 baseline (MCD 6.885, CER 0.373, F0 CORR 0.548) and raw QVC-mix (MCD 9.017, CER 0.682). Synthetic EL generation drastically reduces spectral mismatch, achieving an MCD of 5.942 against real EL speech compared to 11.916 for flat-F0. Ablations demonstrate consistent gains when scaling synthetic pairs from 100 (ours-100 CER 0.375) to 1,000 (ours-1k CER 0.381, CORR 0.571) and 10,000 (ours-10k CER 0.366, CORR 0.585). In subjective evaluations, ours-10k significantly wins in N-CMOS (+0.54 vs QVC, +0.28 vs flat-F0) and I-CMOS (+0.57 vs QVC, +0.15 vs flat-F0) with p < 0.005. S-MOS scores 3.03 ± 0.44 compared to 4.51 for ground-truth natural speech.

| System | MCD | F0 RMSE | F0 CORR | CER | Voice Sim. |
|---|---|---|---|---|---|
| QVC [11] | 7.150 | 0.332 | 0.431 | 0.563 | 0.893 |
| QVC-mix | 9.017 | 0.716 | 0.088 | 0.682 | 0.591 |
| flat-F0 [12] | 6.885 | 0.337 | 0.548 | 0.373 | 0.916 |
| ours-100 | 6.600 | 0.315 | 0.555 | 0.375 | 0.907 |
| ours-1k | 6.587 | 0.311 | 0.571 | 0.381 | 0.917 |
| ours-10k | 6.607 | 0.309 | 0.585 | 0.366 | 0.923 |

## Limitations

The model struggles with unpronounceable or highly distorted sounds frequent in electrolaryngeal speech, such as the phoneme /h/. It generates exclusively neutral intonation without modeling the speaker's internal emotional states or expressive variations. Data scale is limited to a single EL speaker's characteristics for synthesis input, and evaluation is restricted to Japanese.

## Why read this

Speech and ML researchers tackling low-resource voice conversion or pathological speech enhancement should read this to see how a small amount of real target domain data can be leveraged to synthesize large-scale parallel supervision for any-to-many models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive communication devices for laryngectomees, real-time electrolaryngeal speech restoration, and personalized voice prosthetics supporting multiple target speaker choices.

## Institutions / 機構

RIKEN, University of Osaka, Advanced Telecommunications Research Institute International, National Institute of Informatics

**Funding / 經費:** RIKEN Special Postdoctoral Researcher Program, JST Moonshot R&D

## Related

- [A Preclinical Study of Electrolaryngeal Voice Conversion for a Novel Nasal Electrolarynx: Feature Choice and Data Augmentation](chen26t_interspeech.md) — same problem · relatedness 2.6/3
- [Personalized Electrolaryngeal Voice Conversion with a Single Pre-operative Utterance](chang26e_interspeech.md) — same problem · relatedness 2.4/3
- [Synthetic Pathological Speech at Scale: A Flow Matching Approach for Clinical Data Augmentation](koudounas26_interspeech.md) — shared technique · relatedness 2.0/3
- [Universal Speech Content Factorization](xinyuan26_interspeech.md) — same problem · relatedness 2.0/3
- [ZeSTA: Zero-Shot TTS Augmentation with Domain-Conditioned Training for Data-Efficient Personalized Speech Synthesis](choi26b_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
