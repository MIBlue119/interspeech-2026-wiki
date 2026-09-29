---
id: polle26_interspeech
category: paralinguistics-emotion
labels: [low-resource, multilingual, generative-model]
institutions: ["thymia", "University of Edinburgh", "University of Southampton"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2993
pdf: https://www.isca-archive.org/interspeech_2026/polle26_interspeech.pdf
---

# Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning

*Roseline Polle, Owen Parsons, George Fairs, Luis Miguel San Martin Fernandez, Cole Looney, Xiaoliang Wu, Alexandra Livia Georgescu, Stefano Goria*

[PDF](https://www.isca-archive.org/interspeech_2026/polle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2993)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`, `multilingual`, `generative-model`

**TL;DR** — This paper benchmarks eight voice cloning models across five paralinguistic and clinical speech tasks, demonstrating that modern cloning architectures preserve over 90% of discriminative paralinguistic signals and effectively augment low-resource cross-lingual datasets.

## Key contributions

- Benchmarked eight open-source voice cloning models (autoregressive, flow-matching, SSM, and hybrid) across five distinct paralinguistic tasks using both public and proprietary clinical datasets.
- Proposed a normalized preservation score P to quantify the fraction of above-chance paralinguistic signal retained after voice cloning.
- Demonstrated cross-lingual clinical augmentation by cloning English clinical speech into Japanese, outperforming raw cross-lingual transfer for depression and anxiety detection.
- Analyzed the correlation between standard speaker similarity metrics (WavLM cosine distance) and downstream paralinguistic preservation across clean and noisy corpora.

## Problem

While synthetic speech augmentation is mature for linguistic tasks like ASR, its utility for paralinguistic and clinical speech biomarker detection remains unproven, as existing models are evaluated primarily on intelligibility and speaker similarity rather than paralinguistic preservation. This lack of validation is acutely felt in clinical speech tasks where annotated data is scarce, expensive, and heavily skewed toward English. Prior work has not investigated whether the nuanced acoustic and prosodic signals required for tasks like depression, anxiety, and emotion detection survive the voice cloning process, particularly when applied cross-lingually.

## Method

The evaluation framework tests eight open-source voice cloning models spanning diverse architectures: XTTS v2 (GPT-2 autoregressive + Perceiver), Zonos (Mamba2 SSM + Transformer), E2-TTS (flow-matching, character-level), F5-TTS (flow-matching, ConvNeXt), OpenAudio S1-mini (Qwen3 LLM + online RLHF), CosyVoice 2 and 3 (autoregressive/LLM + flow-matching), and MaskGCT (masked generative codec transformer). Audio clips are transcribed via Whisper medium, silence-trimmed, and truncated to 10 seconds. Cloning is performed under two conditions: 'Repeat' (preserving original text) and 'Standard' (mapping all speakers to a fixed reference passage to isolate paralinguistic content). For the cross-lingual experiment (RQ2), English transcripts are translated into Japanese using Qwen 3 235B via Amazon Bedrock, and English audio references are used to generate Japanese speech.

Downstream classification utilizes 1024-dimensional embeddings extracted from WavLM Large. A standard scaler feeds into an L2-regularized Logistic Regression classifier with C=0.001 and balanced class weights. Performance is evaluated using macro-averaged One-vs-Rest AUC. The custom preservation score is defined as P = (Ac - 0.5) / (Ar - 0.5), where Ac and Ar represent AUC on cloned and real speech, respectively. For cross-lingual training, models use subsets of up to 30,000 English speakers, tested against a matched Japanese clinical corpus.

## Experimental setup

Evaluated across four public datasets (IEMOCAP: 5,531 samples/10 speakers, MELD: 13,708 samples/304 speakers, MUSTARD: 690 samples/21 speakers, VCTK: 29,650 samples/73 speakers) and a proprietary clinical corpus consisting of English data (82,046 samples, ~228 hours, 30,537 speakers) and Japanese target data (14,159 samples, ~39 hours, 6,253 speakers). Models are compared against Real (in-domain) baselines and raw cross-lingual transfer baselines. Metrics include AUC, percentage point (pp) drops, preservation score P, and Pearson correlation coefficients against WavLM speaker similarity.

## Results

Under the repeat condition, all 176 model-task configurations performed significantly above chance (p < 0.05). Median degradation across tasks was a modest 3.2 pp (median preservation score P = 0.87), with top-tier models (E2-TTS, OpenAudio, MaskGCT, CosyVoice 3, F5-TTS) retaining over 90% of the discriminative signal (P >= 0.90). Accent classification proved most robust (median P = 0.95), while emotion and sentiment tasks exhibited higher information loss. In cross-lingual experiments (EN -> JP), training on cloned data with 10,000 English speakers significantly outperformed raw English cross-lingual transfer by 3.3 pp for depression (OpenAudio) and 4.0 pp for anxiety (CosyVoice 3), with scaling curves showing gains emerge from ~1,000 speakers onward. However, cloning fails to match in-language Japanese training performance (0.654 vs 0.626 AUC), and speaker similarity correlates strongly with downstream preservation on clean data (r = 0.81-0.87) but degrades on noisy television-sourced datasets like MELD (r = 0.18).

| System / Condition | IEMOCAP Emotion | MELD Emotion | MUSTARD Sarcasm | VCTK Accent |
|---|---|---|---|---|
| Real Baseline | 0.896 | 0.696 | 0.661 | 0.957 |
| E2-TTS (Repeat) | 0.856 | 0.670 | 0.690 | 0.768 |
| OpenAudio (Repeat) | 0.833 | 0.681 | 0.680 | 0.746 |
| MaskGCT (Repeat) | 0.869 | 0.677 | 0.658 | 0.763 |
| CosyVoice 3 (Repeat) | 0.867 | 0.674 | 0.637 | 0.759 |
| XTTS v2 (Repeat) | 0.822 | 0.655 | 0.639 | 0.736 |

## Limitations

The study evaluates only a single cross-lingual language pair (English to Japanese) and relies on a deliberately minimal raw cross-lingual baseline. All features are extracted exclusively from WavLM Large, and experiments use a fixed linear classifier (Logistic Regression) rather than more expressive deep architectures. Furthermore, the primary clinical evaluation utilizes a proprietary dataset, restricting direct external reproducibility.

## Why read this

Speech researchers and ML engineers building clinical biomarkers or cross-lingual paralinguistic models should read this paper to understand whether voice cloning preserves subtle affective and psychological markers, and how to successfully use synthetic data augmentation for low-resource languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Augmenting low-resource clinical mental health datasets, cross-lingual affective computing, and privacy-preserving speech processing where identity is decoupled from paralinguistic content.

## Institutions / 機構

thymia, University of Edinburgh, University of Southampton

## Related

- (link related pages by id as the wiki grows)
