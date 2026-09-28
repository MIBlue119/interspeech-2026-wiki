---
id: li26ia_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3080
pdf: https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.pdf
---

# HASS: Hierarchical Simulation of Logopenic Aphasic Speech for Scalable PPA Detection

[PDF](https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3080)

**TL;DR** — The paper introduces HASS, a clinician-guided hierarchical simulation framework that generates synthetic logopenic primary progressive aphasia (lvPPA) speech across multiple severity levels, improving automated diagnostic AUC-ROC to 0.892 in cross-site evaluations.

## Problem

Building accurate machine learning models for primary progressive aphasia (PPA) is severely constrained by data scarcity, high vulnerability of clinical populations, and expensive expert labeling. Existing synthetic data generation methods rely on injecting isolated, disconnected dysfluencies (like pauses or simple repetitions) or general LLM text manipulation rather than capturing the structured, multi-level linguistic disruptions characteristic of specific neurodegenerative phenotypes. Consequently, models trained on these naive simulations fail to generalize across different clinical corpora and institutional environments.

## Method

The Hierarchical Aphasic Speech Simulation (HASS) framework employs a two-layer text generation pipeline guided by clinical experts and powered by Gemini 3. The first layer models lexical retrieval impairments conditioned on severity to introduce content-level disruptions (circumlocutions, false starts, filled pauses) with a bias toward low-frequency and multisyllabic words. The second layer edits word-aligned IPA sequences to inject a phonological hierarchy of markers (pauses, substitutions, deletions, repetitions, prolongations, and rare insertions). The marked IPA is synthesized into 12.81 hours of audio across 4,773 clips (2,007 controls and 2,766 dysfluent samples spanning mild, moderate, and severe conditions) using VITS across 95 VCTK speakers. For diagnosis, a Wav2Vec 2.0 base model is fine-tuned via LoRA adapters on query and value projections.

## Results

Evaluated using cross-site protocols on real patient corpora (Baycrest and Johns Hopkins PPA datasets) and control datasets (Delaware and Capilouto from DementiaBank/AphasiaBank), a Wav2Vec 2.0 model trained exclusively on HASS synthetic data achieves an AUC-ROC of 0.892 (±0.076), an F1 score of 0.800 (±0.072), and a dysfluent recall of 0.899 (±0.066). This outperforms baseline models trained on real-world clinical data, which yielded an AUC-ROC of 0.850 (±0.122), an F1 of 0.778 (0.165), and a dysfluent recall of 0.659 (0.238). Marker distribution analyses confirm that simulated marker counts scale with severity, increasing from 10.0 events per file at mild severity to 29.0 events per file at severe severity.

## Code

- https://anonymous.4open.science/r/HASS-890D

## Applications

Speech engineers and clinical researchers would use this framework to generate scalable training datasets for automated screening and diagnostic classification of neurodegenerative language disorders like PPA.

## Limitations

HASS models phoneme-level dysfluencies as discrete categorical edits, which can conflate perceptual labels with gradient production mechanisms like gestural dynamics or co-occurring apraxia, and standard phoneme-to-speech architectures like VITS are optimized for fluent speech and struggle when forced to generate severe phonological errors.

## Related

- (link related pages by id as the wiki grows)
