---
id: seo26_interspeech
category: asr
labels: [multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1126
pdf: https://www.isca-archive.org/interspeech_2026/seo26_interspeech.pdf
---

# When Multiple Script Matters: Evaluating ASR in Clinical Settings

*Jean Seo, Minkyu Kim, Jeonguk Lee, Jisoo Jung, Wooseok Han, Eunho Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/seo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1126)

**Category:** `asr` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — MultiClin is a new clinical ASR benchmark designed to evaluate non-English speech recognition systems under multiscript variability, where English medical terms can be written in native phonetic loanwords or Roman script. The authors show that multiscript-aware evaluation and 100% script unification during fine-tuning dramatically improve model accuracy.

## Key contributions

- Introduces MultiClin, a curated clinical ASR benchmark featuring doctor-patient dialogues with multi-reference annotations for multiscript medical terminology, numbers, and units.
- Proposes a dynamic multi-reference evaluation algorithm utilizing local character/word error rates and sliding-window LCS alignment to fairly score orthographic variants.
- Demonstrates that 100% script unification (transliterating all mixed entities into the local script) during fine-tuning eliminates orthographic ambiguity and minimizes model entropy.
- Exposes a non-monotonic performance drop at a 50% mixed-script training ratio, proving that inconsistent script mapping severely impairs model convergence and stable decision boundaries.

## Problem

In non-English clinical environments, English-origin medical terms frequently coactivate with phonetic adaptations in local scripts, creating a many-to-one mapping between acoustics and orthography known as multiscript variability. Conventional ASR evaluation metrics like strict WER assume a single ground-truth reference, unfairly penalizing models that output phonetically and semantically correct words in alternate orthographies. Furthermore, prior code-switching datasets ignore orthographic variation and lack medical-domain coverage, making clinical ASR benchmarking prone to severe underestimation.

## Method

The authors construct MultiClin using doctor-patient dialogues sourced from ACIBench, Primock57, and MTS-Dialog, filtered down to 316 validated dialogues containing tagged MEDICAL, UNIT, and NUMBER entities. Because real-world medical audio is restricted by HIPAA, audio is synthesized using gpt-4o-mini-tts with distinct speaker-role voice styles, conversational dynamics, and a digital signal processing (DSP) chain (reverb and HVAC noise) at 16 kHz. 

For evaluation, Algorithm 1 dynamically resolves references by sliding a 50-character window over the ASR hypothesis and using Longest Common Substring (LCS) matching to select the orthographic variant that yields the minimal local error. For training, Whisper models are fine-tuned via LoRA using a batch size of 4 for 4 epochs on a 9:1 data split, systematically investigating the effect of script consistency ratios ranging from 0% to 100% transliteration.

The key design choice—full script unification (100% ratio)—was chosen because intermediate mixing ratios (especially 50%) maximize conditional entropy $H(Y|X)$ and epistemic uncertainty, whereas complete normalization removes script ambiguity and provides a deterministic learning signal.

## Experimental setup

The MultiClin dataset comprises 316 dialogues (averaging 34 turns and 68 sentences per dialogue) spanning 22 medical specialties, dominated by orthopedics (30.1%). Baselines include Whisper (large-v3, v3-turbo via faster-whisper), Qwen3 ASR (0.6B, 1.7B), and Gemini (2.5 Flash, 2.5 Pro). Models are evaluated using Character Error Rate (CER) and Word Error Rate (WER) under single-reference and multiscript-aware settings. Whisper fine-tuning uses LoRA with a 9:1 train-test split for 4 epochs.

## Results

Under zero-shot evaluation, multiscript-aware scoring reveals true model performance, decreasing Gemini 2.5 Pro's WER from 28.28% to 15.78% and its CER from 24.23% to 4.86%. When fine-tuning Whisper Large v3 Turbo on MultiClin with a 100% transliteration ratio, CER drops from a pretrained 10.08% down to 6.16%. 

Ablations on transliteration training ratios reveal a severe performance penalty at 0% ratio (69.17% CER, 54.35% WER) and a secondary peak error at the 50% ratio (57.47% CER, 48.50% WER) due to high orthographic uncertainty, before bottoming out at the optimal 100% unification ratio (7.66% CER, 17.48% WER).

| System / Condition | CER (%) | WER (%) |
|---|---|---|
| Whisper Large v3 (Zero-shot, Original) | 29.68 | 36.57 |
| Whisper Large v3 (Zero-shot, Both) | 29.65 | 36.75 |
| Whisper Large v3 Turbo (Zero-shot, Original) | 13.37 | 27.78 |
| Whisper Large v3 Turbo (Zero-shot, Both) | 13.24 | 27.91 |
| Fine-tuned Whisper Large v3 (100% ratio) | 7.66 | 17.48 |
| Fine-tuned Whisper Large v3 Turbo (100% ratio) | 6.16 | N/A |

## Limitations

The benchmark relies on synthetic text-to-speech audio rather than real clinical recordings due to strict HIPAA patient privacy constraints, which may introduce a synthetic-to-real acoustic gap. The evaluation is currently demonstrated solely through a Korean clinical case study, leaving the cross-lingual generalizability to other non-English scripts (e.g., Arabic, Indic scripts) empirically unverified in this study. Additionally, the dataset size is constrained to 316 curated dialogues after rigorous manual filtering.

## Why read this

Speech and ML researchers building ASR systems for non-English, domain-specific environments should read this to understand how multiscript variability distorts standard evaluation metrics. It provides a concrete algorithmic solution for multi-reference scoring and proves that script unification is essential for stable model training.

## Code

- https://github.com/aitrics-ronaldo/Interspeech_MultiClin

## Applications

Clinical dictation systems, automated medical scribe applications, and multilingual healthcare speech recognition workflows.

## Institutions / 機構

AITRICS, University of Copenhagen, KAIST

## Related

- (link related pages by id as the wiki grows)
