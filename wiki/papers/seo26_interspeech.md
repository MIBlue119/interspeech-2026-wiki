---
id: seo26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1126
pdf: https://www.isca-archive.org/interspeech_2026/seo26_interspeech.pdf
---

# When Multiple Script Matters: Evaluating ASR in Clinical Settings

[PDF](https://www.isca-archive.org/interspeech_2026/seo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1126)

**TL;DR** — The paper introduces MultiClin, a clinical ASR benchmark designed to handle multiscript variability, demonstrating that multiscript-aware evaluation and full script unification during fine-tuning significantly reduce recognition error rates.

## Problem

In non-English medical settings, English-origin clinical terms frequently appear alongside local phonetic loanwords, creating multiscript variability where a single spoken term maps to multiple valid orthographic forms. Conventional single-reference evaluation metrics like Word Error Rate treat these valid orthographic variants as errors, systematically underestimating actual ASR performance. Additionally, inconsistent script mappings in training data introduce orthographic uncertainty, complicating model convergence.

## Method

The authors construct the MultiClin benchmark by filtering public doctor-patient dialogues (ACIBench, Primock57, MTS-Dialog), utilizing GPT models to tag medical, unit, and number entities, translate contexts into Korean, and incorporating synthetic audio generation with diverse speaker styles and simulated clinical noise via a DSP chain. They introduce Algorithm 1, a dynamic multi-reference evaluation protocol that uses a 50-character sliding window and Longest Common Substring matching to compute localized error rates against both English and native-script references. For model training, they apply LoRA on Whisper models with a 100% transliteration ratio, unifying all entity tags into the local script to remove ambiguity.

## Results

Evaluating across Whisper (large-v3, v3-turbo), Qwen3 ASR (0.6B, 1.7B), and Gemini (2.5 Flash, 2.5 Pro) on the MultiClin test set, transitioning from strict single-label matching to multiscript-aware evaluation consistently decreases error rates (e.g., Gemini 2.5 Pro WER drops from 28.28% to 15.78%). Fine-tuning Whisper-Large v3 Turbo with 100% script unification yields a best-in-class CER of 6.16% (a 3.83% absolute reduction). Ablations on transliteration ratios reveal that a 50% mixed mapping ratio maximizes conditional entropy and error rates (57.47% CER), while a 100% unification ratio achieves the lowest error (7.66% CER, 17.48% WER).

## Code

- https://github.com/aitrics-ronaldo/Interspeech_MultiClin

## Applications

Speech engineers and healthcare technologists evaluating or improving automatic speech recognition systems deployed in non-English clinical environments.

## Limitations

The benchmark relies on synthetically generated dialogues using TTS to comply with HIPAA regulations rather than real clinical audio.

## Related

- (link related pages by id as the wiki grows)
