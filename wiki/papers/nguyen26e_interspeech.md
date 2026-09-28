---
id: nguyen26e_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1353
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.pdf
---

# Fair Cognitive Impairment Detection Through Unlearning

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1353)

**TL;DR** — The paper introduces FMD, a multimodal framework for fair mild cognitive impairment detection that combines cross-modal fusion with demographic unlearning via gradient reversal, improving average F1 scores while narrowing performance gaps across sex and language subgroups.

## Problem

Speech-based machine learning models for clinical screening often exploit spurious demographic correlations rather than true cognitive markers due to dataset imbalances. This leads to substantial performance disparities across patient subgroups like sex and language, undermining their clinical reliability and equitable deployment.

## Method

The framework utilizes unimodal encoders for speech, text, and images—specifically Whisper, multilingual BERT, and SigLIP—followed by a multi-head cross-attention fusion module using text as an alignment anchor. To eliminate demographic shortcuts, it incorporates an auxiliary demographic classifier paired with a gradient reversal module applied to the shared representations. The unlearning strength is dynamically scheduled using a curriculum curve to stabilize early training phases. The system is evaluated using 10-fold cross-validation on TAUKADIAL and PREPARE benchmarks.

## Results

Evaluated on TAUKADIAL (387 samples) and PREPARE (1,644 samples) using stratified 10-fold cross-validation and F1 metrics, FMD outperforms baselines like Whisper, AST, XLSR-53, XLS-R, CogniVoice, DFR, and ATG. On TAUKADIAL, FMD Lang achieves an overall F1 of 92.6 and a worst-group F1 of 90.9, beating the best baseline CogniVoice (84.1 F1 and 81.3 WG F1). On PREPARE, FMD Sex attains the highest overall F1 of 60.1, while reducing demographic performance gaps across sex and language to 1.3 and 1.7 respectively. Ablation studies confirm that removing either the cross-modal fusion or the unlearning module results in degraded overall F1 scores and wider subgroup gaps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Healthcare and clinical engineering teams building automated, equitable diagnostic screening tools for mild cognitive impairment and dementia using spontaneous speech.

## Related

- (link related pages by id as the wiki grows)
