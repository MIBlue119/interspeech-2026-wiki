---
id: gomez26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3113
pdf: https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.pdf
---

# Unsupervised Speech in the Wild Challenge: Learning Robust Multilingual Representations

*Rafael Mosquera Gómez, Juan Felipe Rodríguez, Daniel Galvez, Sarah Luger*

[PDF](https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3113)

**TL;DR** — The Unsupervised Speech in the Wild (UPS) 2026 Challenge evaluates self-supervised speech representation learning on 522,000 speech hours of heterogeneous web audio, revealing that baseline systems achieve up to 0.949 Macro-F1 in language ID, 0.538 CER in few-shot ASR, and 0.947 ARI in speaker clustering.

## Key contributions

- Introduces the UPS 2026 Challenge benchmark based on over 800,000 hours of raw web audio (522,000 speech hours via Silero VAD) across 89 detected languages.
- Establishes a unified evaluation protocol on Dynabench covering zero-shot language identification, few-shot ASR via CTC probes, and speaker clustering.
- Provides comprehensive benchmarking across 80 submissions from 14 teams, isolating representation quality using frozen encoders and standardized linear probes.

## Problem

Self-supervised learning (SSL) speech models like Wav2Vec 2.0, Hubert, WavLM, and XLS-R are predominantly pretrained on curated, clean corpora like LibriSpeech and CommonVoice, leaving their robustness under heterogeneous web conditions with background noise, music, and spontaneous dialogue unproven. Existing benchmarks like SUPERB, LeBenchmark, and Xtreme-S focus on clean or moderately varied data, failing to test the limits of models trained on uncurated internet data. This gap matters because real-world deployment requires representations that handle long-tailed linguistic variation and severe acoustic variability without task-specific engineering interference.

## Method

The challenge mandates pretraining exclusively from scratch or continuing pretraining using the Unsupervised People's Speech (UPS) dataset, which comprises 47TB packaged in over 11,000 tar files (99% at 44.1 kHz sample rate). Whisper's encoder detected 89 languages in the data, and Silero VAD filtered out non-speech regions to retain 522,000 hours of speech. Participants must expose a single unified interface that extracts frame-level embeddings from raw audio waveforms.

For downstream evaluation, encoders are completely frozen to isolate representation quality. Language identification aggregates frame-level embeddings utterance-wide to train a linear classifier, evaluated via macro-averaged F1 across 73 languages from a FLEURS subset (14,600 training and 7,246 test utterances). Few-shot ASR trains lightweight per-language linear projection heads with CTC loss using 200 utterances per language, evaluated using macro-averaged Character Error Rate (CER).

Speaker clustering maps speech segments to embeddings via temporal aggregation, performing language-specific clustering using oracle speaker counts on a VoxTube-derived subset comprising 70 languages, 398 speakers, and 3,980 segments, evaluated via Adjusted Rand Index (ARI). Dynabench manages model ingestion and execution to guarantee reproducibility, enforce interface compliance, and keep test sets fully held out.

## Experimental setup

The training dataset consists of the UPS dataset (>800k hours raw, 522k speech hours). Evaluation uses a 73-language FLEURS subset (14,600 train / 7,246 test utterances) for LID and ASR, and a VoxTube-derived subset (3,980 segments across 70 languages and 398 speakers) for speaker clustering. Evaluations comprise 80 successful submissions across 14 teams on the Dynabench infrastructure, comparing architectures including Whisper, WavLM, Hubert, and Qwen3 encoders.

## Results

Across 80 scored submissions, performance varied widely with mean Macro-F1 of 0.362, mean ASR CER of 0.787, and mean speaker clustering ARI of 0.457. No single model dominated all tasks: Whisper baselines and Nx series achieved the highest Macro-F1 (up to 0.949), WavLM-large variants obtained the lowest ASR CER (best at 0.538), and the Qwen3 encoder baseline secured the top speaker clustering ARI (0.947).

Language-level analysis showed that ASR is heavily script-dependent, with logographic and non-Latin systems like Japanese (CER 1.481), Korean, Amharic, Khmer, and Thai proving extremely difficult under character-level CTC. Conversely, speaker clustering ARI varied due to subset composition and severe gender imbalances in languages like Vietnamese, Ukrainian, and Swedish.

| System / Condition | Macro-F1 (LangID) ↑ | CER ↓ | ARI ↑ |
|---|---|---|---|
| whisper-baseline | 0.9488 | - | - |
| Nx v3 | 0.9479 | - | - |
| WavLM-large-500h-e5 | - | 0.5378 | - |
| WavLM-large-500h-e2 | - | 0.5540 | - |
| qwen3-encoder-baseline | - | - | 0.9469 |
| HubertLucky | - | - | 0.8774 |

## Limitations

The evaluation relies on fixed, curated evaluation subsets (FLEURS and VoxTube) which may not fully capture the unbounded acoustic diversity present in the 522k-hour training set. Character-level CTC evaluation inherently penalizes models on logographic scripts like Japanese due to orthographic mismatches rather than true semantic failures. Gender imbalances and sparse speaker counts in subsets of the VoxTube speaker clustering evaluation data inflate variance and skew ARI metrics.

## Why read this

Speech and ML researchers building self-supervised representations for real-world, uncurated web audio should read this to understand the multi-task trade-offs between language identification, few-shot ASR, and speaker discrimination. It provides definitive empirical evidence that current SSL models specialize selectively across linguistic and speaker dimensions when trained on massive, heterogeneous data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multilingual speech recognition, zero-shot language identification, and speaker diarization or clustering in uncurated acoustic environments.

## Related

- (link related pages by id as the wiki grows)
