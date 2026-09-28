---
id: hacker26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1188
pdf: https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.pdf
---

# Common Cold Corpus: Health-Aware Robustness Study of Modern Speaker Embeddings Under Physiological Domain Shift

[PDF](https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1188)

**TL;DR** — This study introduces the Common Cold Corpus to evaluate how moderate upper respiratory tract infections impact acoustic features and modern speaker embeddings, showing that illness induces measurable downward pitch shifts and systematic embedding displacement while verification remains robust.

## Problem

Prior research on cold-induced voice changes predominantly focuses on severe, lab-recorded symptoms, leaving the effects of moderate, naturally occurring upper respiratory infections under everyday acoustic environments poorly understood. Similarly, while speaker embedding robustness has been tested under technical domain shifts like noise and compression, their stability under physiological perturbations remains under-investigated. This gap hinders the deployment of reliable, non-invasive digital health biomarkers in decentralized, real-world monitoring applications.

## Method

The authors collected the Common Cold Corpus, a longitudinal dataset of paired recordings from 85 German speakers during healthy and acutely ill states using personal devices in everyday environments (totaling 431 minutes). Symptom severity was quantified using the Wisconsin Upper Respiratory Symptom Survey, averaging a moderate 3.25 out of 7. Acoustic analysis extracted 90 parameters via eGeMAPS and openSMILE, evaluated with paired t-tests or Wilcoxon signed-rank tests and Benjamini-Hochberg correction. Speaker embeddings were extracted using four architectures (ECAPA-TDNN via SpeechBrain, TitaNet, ECAPA2, and ReDimNet), L2-normalised, and evaluated using cosine-similarity scoring in a text-controlled closed-gallery verification setup across 188 genuine and 15,792 imposter trials.

## Results

Acoustic analysis revealed consistent downward trends in pitch and harmonics-to-noise ratio during illness, with the 80th percentile of F0 and HNR showing significant reductions (p.adj < .001 and < .01, respectively) on the North Wind and Sun task. Speaker verification performance stayed strong despite illness, with TitaNet achieving the lowest EER at 1.51% (AUC 0.9893) and ReDimNet reaching 1.84% (AUC 0.9897), compared to 2.83% for ECAPA2 and 3.10% for ECAPA-TDNN. Relative to healthy cross-text baselines, the ill condition increased EER by approximately 1 to 2 percentage points. Embedding displacement analysis showed that TitaNet experienced the largest absolute distance shift and highest Z-shift (8.826), while ECAPA-TDNN exhibited a 6.38% identity crossover rate into positive margin territory.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing health-aware speaker recognition systems, speaker anonymization frameworks, or non-invasive remote health monitoring tools for respiratory illnesses.

## Limitations

The current dataset size is restricted to 85 speakers of German, and evaluation is limited to four specific speaker embedding architectures and short read/spontaneous prompts.

## Related

- (link related pages by id as the wiki grows)
