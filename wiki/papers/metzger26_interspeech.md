---
id: metzger26_interspeech
category: asr
labels: [multilingual, self-supervised]
institutions: ["Koel Labs"]
code: https://github.com/KoelLabs/ML
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3271
pdf: https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.pdf
---

# Scaling Human and G2P Supervision for Robust Phonetic Transcription

*Alexander Metzger, Aruna Srivastava, Ruslan Mukhamedvaleev*

[PDF](https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3271)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper investigates the scaling behaviors of human versus Grapheme-to-Phoneme (G2P) supervision for phonetic transcription, discovering a quality threshold where G2P scaling becomes redundant beyond 20-30 hours of diverse human annotation. By combining Wav2Vec2 XLSR pretraining, multilingual ASR finetuning, and 40 hours of human phonetic labels, the authors achieve a 2.3x reduction in weighted phone feature error rate over prior systems.

## Key contributions

- Curates a standardized 80-hour English benchmark spanning 8 datasets, 17 dialects, 8 L1 backgrounds, and post-stroke aphasia.
- Performs a systematic scaling analysis isolating self-supervised pretraining, ASR labels, G2P labels, and human labels.
- Identifies a supervision quality threshold: G2P labels only improve accuracy when fewer than 20-30 hours of diverse human data are available.
- Achieves a 2.3x reduction in weighted phone feature error rate (WPFER) over prior art, with pronounced gains on non-native and aphasic speech.

## Problem

Expert phonetic transcription is scarce, costly, and difficult to scale, particularly for nonstandard dialects, non-native accents, and atypical or clinical speech. To circumvent this, prior systems (such as Allosaurus and W2V2-eSpeak) rely heavily on G2P models to auto-label thousands of hours of orthographic text. However, G2P targets canonical pronunciations, failing to capture acoustic variability, disfluencies, or speaker-specific mispronunciations, which can bias models and hurt cross-dialect generalization. This work evaluates whether raw label quantity from G2P can truly substitute for high-quality human supervision in robust phonetic modeling.

## Method

The system architecture builds on Wav2Vec2 XLSR pretraining, followed by multilingual ASR finetuning to absorb broader speaker and dialect variations without standard-speech bias. Instead of relying on large-scale G2P pseudo-labels, the recipe integrates up to 40.8 hours of cleaned, human-annotated phonetic data mapped to the International Phonetic Alphabet (IPA). Data cleaning filters out silence and non-target speakers using patch files provided in the code repository.

Hyperparameter optimization is performed via full sweeps across learning rates ([3e-5, 5e-4]), warm-up steps ([200, 2000]), batch sizes ([16, 64]), epochs ([3, 20]), weight decay ([0.0, 0.5]), time masking ([0.05, 0.15]), and feature masking ([0.0, 0.2]). All sweeps require approximately 730 GPU hours on a single A100 (40GB VRAM). The loss function optimizes phoneme sequence prediction against IPA gold standards using PanPhon-weighted Phone Feature Error Rate (WPFER) to award partial credit for articulatory-similar phoneme substitutions.

## Experimental setup

Experiments use a curated 80.06-hour English benchmark (54.75 hours post-processing: 40.81 hours training, 13.94 hours test) combining TIMIT, EpaDB, PSST, Speech Ocean, Buckeye, DoReCo, and ISLE corpora. Evaluation metrics rely on PanPhon WPFER with 95% confidence intervals derived from 2000 bootstrap samples. The approach is compared against 30 prominent models including Espeak G2P, Allosaurus, W2V2-eSpeak, MultIPA, and POWSM.

## Results

The optimal curriculum achieves an average WPFER of 3.5%, outperforming the Espeak G2P baseline (8.1%), Allosaurus (14.6%), W2V2-eSpeak (7.8%), and POWSM (9.0%). On the post-stroke aphasia dataset (PSST), the proposed system achieves a 5.3% WPFER compared to 14.4% for POWSM and 25.8% for the Espeak baseline. Ablations demonstrate that adding 5.3K hours of G2P data yields no benefit and slightly degrades performance once human data exceeds 20-30 hours, whereas ASR pretraining universally enhances out-of-domain generalization.

Scaling experiments reveal that for narrow transcriptions (TIMIT, EpaDB, PSST), every 10-hour increment of human data significantly reduces WPFER, whereas broad transcriptions (Speech Ocean, ISLE) require at least 20 hours for significant gains.

| System | TIMIT | EpaDB | PSST | Speech Ocean | ISLE | Avg. WPFER |
|---|---|---|---|---|---|---|
| Espeak G2P Baseline (2021) | 4.97% | 3.9% | 25.8% | 2.3% | 3.5% | 8.1% |
| Allosaurus (2020) | 10.0% | 13.3% | 23.9% | 15.1% | 10.5% | 14.6% |
| W2V2-eSpeak (2021) | 5.9% | 5.9% | 13.5% | 9.0% | 4.7% | 7.8% |
| POWSM (2025) | 9.3% | 7.0% | 14.4% | 10.3% | 4.1% | 9.0% |
| Optimal Curriculum (ours) | 2.1% | 2.5% | 5.3% | 3.7% | 3.6% | 3.5% |

## Limitations

The study is restricted to the English language and specific curated dialects evaluated within the 80-hour benchmark. The findings may not automatically transfer to highly tonal languages or languages with vastly different phonemic inventories under extreme low-resource conditions.

## Why read this

Speech and ML researchers building phonetic transcriptors for clinical, non-native, or atypical speech should read this to understand the diminishing returns of large-scale G2P scaling and the superiority of targeted human annotation combined with ASR pretraining.

## Code

- https://github.com/KoelLabs/ML

## Applications

Computer-assisted pronunciation training, speech disorder and dementia assessment, clinical speech pathology, and inclusive speech technology design.

## Institutions / 機構

Koel Labs

**Funding / 經費:** Mozilla, Google

## Related

- (link related pages by id as the wiki grows)
