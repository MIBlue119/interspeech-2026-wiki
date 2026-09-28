---
id: metzger26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3271
pdf: https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.pdf
---

# Scaling Human and G2P Supervision for Robust Phonetic Transcription

[PDF](https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3271)

**TL;DR** — This paper investigates how supervision quality and quantity interact in phonetic transcription, revealing a 2.3× reduction in weighted phone feature error rate by combining self-supervised pretraining, ASR finetuning, and moderate human annotation while finding that large-scale G2P supervision yields diminishing returns once 20–30 hours of diverse human labels are available.

## Problem

Automated phonetic transcription relies heavily on grapheme-to-phoneme (G2P) models to auto-generate phone labels from text at scale, but G2P reflects canonical pronunciations and fails to capture speaker-specific realizations, non-native accents, mispronunciations, or atypical speech like post-stroke aphasia. While expert phonetic annotation yields gold-standard quality, it is scarce and costly, especially for diverse dialects and impaired speech. This study asks how much expert annotation is actually required before large-scale G2P supervision provides diminishing returns and how supervision quality interacts with out-of-domain generalization.

## Method

The authors curate a standardized 80.06-hour English benchmark across 8 datasets (yielding 40.81 hours of clean training data and 13.94 hours of test data) spanning 17 dialects, 8 L1 backgrounds, and post-stroke aphasia, mapping all phone sets to IPA via PanPhon. They evaluate a 4-stage curriculum: large-scale self-supervised pretraining (comparing Wav2Vec2 XLSR, HuBERT, and WavLM), multilingual supervised ASR finetuning, machine-generated phone labels using Espeak G2P, and human expert phonetic label finetuning. Full hyperparameter sweeps were conducted over learning rates, warm-up steps, batch sizes, epochs, weight decay, and masking strategies using A100 GPUs.

## Results

Evaluating across TIMIT, EpaDB, PSST, Speech Ocean, and ISLE, the optimal curriculum of XLSR pretraining, ASR finetuning, and 40.8 hours of human phonetic supervision achieves a mean WPFER of 3.4%, compared to 5.5% for full G2P-labeled baselines and significantly outperforming prior models like Allosaurus, W2V2-eSpeak, and POWSM. The authors identify a key quality threshold: G2P supervision improves performance only when fewer than 20–30 hours of diverse human annotations are available, providing no benefit and sometimes degrading robustness beyond this point. In contrast, ASR pretraining consistently lowers out-of-domain error rates without introducing standard-pronunciation bias, and narrowly transcribed datasets (TIMIT, EpaDB, PSST) show significant WPFER reductions with increments of 10 hours or less of human data.

## Code

- https://github.com/KoelLabs/ML

## Applications

Speech engineers, clinical researchers, and developers building systems for computer-assisted pronunciation training, speech disorder and dementia assessment, voice conversion, and inclusive ASR for non-native or impaired speakers.

## Limitations

The study is currently restricted to English and the specific curated set of native, non-native, and aphasic dialects evaluated.

## Related

- (link related pages by id as the wiki grows)
