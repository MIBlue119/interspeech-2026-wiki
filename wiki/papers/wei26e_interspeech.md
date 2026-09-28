---
id: wei26e_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2783
pdf: https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.pdf
---

# Do Speech Emphasis Models Generalize across Languages and Emotions?

*Megan Wei, Deepali Aneja, Jiaqi Su, Yunyun Wang, Haonan Chen, Zeyu Jin*

[PDF](https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2783)

**TL;DR** — The paper introduces MMEE, a multilingual expressive speech corpus of 14.13 hours across 7 languages and 34 emotion categories with human-perceptual word-level emphasis annotations, and benchmarks state-of-the-art emphasis detectors to show that prosodic emphasis representations transfer robustly across arousal states and synthetic/human sources but degrade for typologically distant languages like Mandarin.

## Key contributions

- Introduces MMEE, a 14.13-hour multilingual expressive speech corpus comprising 10,000 utterances across 7 macro-languages, 10 regional dialects, and 34 emotion/style categories.
- Provides a 3-level graded human perceptual emphasis annotation scheme collected via Prolific with 10 annotators per sample.
- Comprehensively benchmarks two SOTA architectures (EmphaClass and WhiStress) across monolingual, cross-lingual, multilingual, cross-arousal, cross-dataset, and data-scale settings.
- Demonstrates that bidirectional cross-dataset transfer between synthetic benchmarks (EmphAssess, TinyStress-15K) and human perceptual benchmarks (MMEE) reveals shared underlying prosodic structure.

## Problem

Prior speech emphasis datasets and models are predominantly English-only, rely heavily on synthetic or script-prescribed prominence rather than human perceptual judgments, and restrict themselves to neutral read speech. Furthermore, emphasis is almost exclusively treated as a binary classification task rather than a graded perceptual phenomenon, ignoring how pitch and duration cues shift across diverse languages, cultures, and emotional states. This leaves an open question of whether existing detectors truly capture language-agnostic prosodic properties or merely overfit to monolingual, neutral datasets.

## Method

The authors benchmark EmphaClass—which fine-tunes a 1B-parameter XLS-R (Wav2Vec 2.0) multilingual self-supervised model—and WhiStress, which augments a frozen Whisper encoder-decoder backbone with an additional decoder block and an FCNN classifier head. EmphaClass is adapted for scalar regression via a linear-plus-sigmoid head trained with MSE loss, replacing zero-padding with -100 to ignore padded positions, whereas WhiStress uses weighted cross-entropy or binary cross-entropy (BCE) for binary and scalar modes respectively. Training employs 8 NVIDIA 80GB A100 GPUs with fixed 80/10/10 train/validation/test splits, using learning rates of 7.97e-5 for EmphaClass (15 epochs, batch size 8) and 5e-4 for WhiStress (2 epochs, batch size 32).

The curation pipeline uses Qwen3-ASR for timestamping and initial transcription, RMS energy envelope valleys for low-energy boundary splitting, SileroVAD for precise speech onset/offset alignment, sequence similarity thresholds (>= 99%), and a unanimous GPT-5.2 judge pass across 3 runs to verify transcript match. Emphasis annotations are aggregated in two modes: binary (majority vote > 50%) and scalar (mean of 0/0.5/1 ordinal scores from 10 annotators).

## Experimental setup

Evaluations utilize MMEE (10,000 samples, 14.13 hours, 202 speakers), EmphAssess (3,652 samples, 2.42 hours), and TinyStress-15K (16,000 samples, 16.03 hours). Models are compared against baseline conditions across binary accuracy, F1 score, and Pearson correlation coefficient. Implementation details include fixed 80/10/10 data splits, multilingual language conditioning tokens for Whisper-small, and dataset ablation scales ranging from 10% to 100% of training data.

## Results

Monolingual models achieve strong in-language binary accuracies around 0.78-0.90 but experience severe zero-shot cross-lingual degradation when transferring across typologically distant boundaries, notably with Mandarin Chinese (where tonal F0 conflicts with prominence cues). Multilingual pooled training ('all') successfully recovers this loss, matching or exceeding monolingual performance across all languages. Cross-arousal evaluations demonstrate robust transfer between high-arousal and low-arousal regimes (e.g., High->Low achieves 0.857 accuracy on EmphaClass and 0.908 on WhiStress), proving that emphasis representations are largely separable from arousal-driven acoustic variations.

| System / Condition | Accuracy (EmphaClass) | Pearson (EmphaClass) | Accuracy (WhiStress) | Pearson (WhiStress) |
|---|---|---|---|---|
| High -> High Arousal | 0.848 | 0.846 | 0.918 | 0.833 |
| Low -> Low Arousal | 0.871 | 0.840 | 0.912 | 0.823 |
| High -> Low Arousal | 0.857 | 0.814 | 0.908 | 0.819 |
| Low -> High Arousal | 0.857 | 0.833 | 0.920 | 0.814 |

## Limitations

The study is scoped to 7 macro-languages and 10 regional varieties, leaving low-resource and non-Indo-European/Sino-Tibetan language families largely unexplored. Inter-annotator agreement varies notably across languages—dropping to a fair Cohen's kappa of 0.285 for Chinese due to its lexical tone system—highlighting inherent subjectivity in cross-cultural perception of emphasis. Furthermore, compute constraints limited training batch sizes for multilingual configurations to 4, and evaluations are restricted to text-aligned word-level boundaries.

## Why read this

Speech and ML researchers building expressive TTS, speech translation, or speech LLMs should read this paper to understand the cross-lingual limits of prosodic emphasis transfer and learn how multilingual data diversity solves zero-shot degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive text-to-speech, speech-to-speech translation, and spoken language understanding systems requiring fine-grained prosodic intent modeling.

## Related

- (link related pages by id as the wiki grows)
