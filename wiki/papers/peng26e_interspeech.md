---
id: peng26e_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1225
pdf: https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.pdf
---

# A Unified and Reproducible Experimentation Framework for Speech Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1225)

**TL;DR** — The paper introduces SURE, a unified and reproducible experimentation framework for speech understanding that standardizes evaluation pipelines and provides an agent-assisted workflow for controlled model training.

## Problem

Deployment-oriented model selection for speech foundation models and Speech LLMs is severely hindered by inconsistent scoring protocols, non-comparable post-processing choices, and training pipelines that are difficult to reproduce across varying data scales. Small variations in text normalization, casing, punctuation, and segmentation can drastically alter reported performance metrics, obscuring true architectural gains. Furthermore, existing benchmarks often focus on narrow slices of model families or test conditions, leaving system robustness under realistic acoustic and linguistic stressors under-measured.

## Method

SURE couples a standardized, end-to-end evaluation loop with a dynamic Relative Performance Score (RPS) in [0, 1] that normalizes task metrics against current SOTA leaderboard entries. The evaluation stack features fixed input, preprocessing, normalization, and task-specific scoring protocols, utilizing official backends like meeteval for diarization and sacrebleu for translation. For training comparisons, SURE introduces an agent-assisted conversion workflow that maps academic papers and codebases into versioned, runnable training pipelines within the swift framework using matched open-data subsets. The framework covers three main tracks: scenario stress testing for front-end tasks, full-stack horizontal speech understanding evaluation, and controlled from-scratch training studies.

## Results

Evaluations span diverse datasets including VoxPopuli-en, AISHELL-5, AMI, AliMeeting, LibriSpeech, AISHELL-1, CoVoST2, IEMOCAP, and MMSU-Reason. Track I experiments demonstrate that conventional cascaded pipelines remain highly competitive with end-to-end systems on speaker-aware meeting transcription, such as VibeVoice-ASR achieving 47.33% DER and 43.66% cpWER on AliMeeting. Track I stress tests also reveal clear functional trade-offs, where context-biasing models excel on code-switching (CS-Dialogue) and hotword recognition but degrade under severe acoustic or dialectal degradation. Track II horizontal comparisons show that cascaded pipelines can match Speech LLMs on clean perception tasks, while emotion recognition (SER) remains difficult for all models, with accuracy spanning roughly 52% to 69% on IEMOCAP.

## Code

- https://sure-eval-framework.github.io/speechllm_series/

## Applications

Speech and machine learning engineers can use SURE to benchmark speech understanding systems, conduct robust model selection for production deployment, and perform controlled architectural comparisons.

## Limitations

The paper notes format adherence issues in instruction-following Speech LLMs on basic tasks, where output schema deviations artificially harm automatic evaluation scores.

## Related

- (link related pages by id as the wiki grows)
