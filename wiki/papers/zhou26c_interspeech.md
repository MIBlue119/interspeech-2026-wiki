---
id: zhou26c_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Nankai University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1517
pdf: https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.pdf
---

# UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models

*Jiaming Zhou, Haoqin Sun, Hui Wang, Jinghua Zhao, Yuhang Jia, Shiyao Wang, Enzhi Wang, Shiwan Zhao, Yong Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1517)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — UG-Bench is a unified, decoupled evaluation framework assessing Large Audio-Language Models (LALMs) across 19 tasks and 36 datasets (153,485 test samples). Evaluating 11 LALMs and 5 specialized generation models reveals major gaps in instruction-following, generation quality, and spoken language understanding.

## Key contributions

- Proposes UG-Bench, the first evaluation framework simultaneously covering speech perception, audio perception, speech generation, and spoken language understanding.
- Implements a modular, decoupled design separating model input/output unification from task-specific evaluation to ensure fair comparison and easy extensibility.
- Curates a large-scale evaluation suite spanning 19 tasks, 36 datasets, and 153,485 test samples to establish a rigorous multi-competency baseline.
- Comprehensive evaluation of 11 open-source LALMs and 5 expert speech generation models, highlighting critical shortcomings in instruction-following, hallucination, and overfitting.

## Problem

Evaluating Large Audio-Language Models (LALMs) is difficult because existing benchmarks are mostly static, task-specific, and fragmented, focusing heavily on understanding while neglecting speech generation. Prior efforts like Dynamic-SUPERB, AIR-Bench, and SD-Eval make important contributions but lack a unified interface that comprehensively spans both perception and generation across diverse audio modalities. This fragmentation makes it hard to compare models fairly or measure holistic progress in multimodal human-computer interaction.

## Method

UG-Bench uses a decoupled, four-component architecture: an Input Standardization Module, a Model Interface Module, an Output Unification Module, and a Task Evaluation Module. The Input Standardization Module enforces a unified prompting strategy, applying a model's designated template when required or a fallback default prompt to maintain fairness. The Output Unification Module standardizes model outputs, completely decoupling upstream model architectures from downstream task metrics.

Evaluation tasks are divided into four core competencies: speech perception, audio perception, speech generation, and spoken language understanding. To handle heterogeneous metrics, UG-Bench employs a weighted ranking strategy. Sub-ranks are calculated by averaging a model's ranks across all tasks within a competency, and a final score is computed as a weighted average using heuristic weights: speech perception (0.4), audio perception (0.3), speech generation (0.2), and spoken language understanding (0.1).

## Experimental setup

The evaluation utilizes 36 datasets across 19 tasks totaling 153,485 test samples, including Librispeech, Common Voice, IEMOCAP, Clotho, VocalSound, MusicCap, and Fluent Speech Commands. Eleven open-source LALMs (Qwen2-Audio, Salmonn, WavLLM, Qwen-Audio, BLSP, LTU, Audio-Flamingo, SenseVoice, PandaGPT, AnyGPT, Speech-GPT) and 5 specialized speech generation models (MaskGCT, F5-TTS, CosyVoice, Bark, ChatTTS) are tested using official checkpoints on a single NVIDIA H100 GPU without fine-tuning. Metrics include WER/CER for ASR, Accuracy for classification tasks, BLEU for translation, FENSE/SPIDEr for captioning, and MOS/WER for TTS.

## Results

Qwen2-Audio achieved the top overall ranking with a score of 78.18, leading in speech and audio perception (e.g., 8.10 WER on ASR, 73.67% accuracy on music genre classification), while Salmonn ranked second (62.73) and WavLLM third (57.27). In speech generation, expert models significantly outperformed the few capable LALMs (AnyGPT, Speech-GPT), with expert models achieving superior Mean Opinion Scores (MOS). In spoken language understanding (intent classification), BLSP unexpectedly outperformed all models, while Audio-Flamingo scored near zero (0.08) and slot-filling proved excessively difficult for all LALMs.

| Model | SP | AP | SG | SLU | Score | Final Rank |
|---|---|---|---|---|---|---|
| Qwen2-Audio | 1 | 1 | 11 | 3 | 78.18 | 1 |
| Salmonn | 4 | 2 | 11 | 4 | 62.73 | 2 |
| WavLLM | 2 | 8 | 11 | 2 | 57.27 | 3 |
| Qwen-Audio | 3 | 4 | 11 | 7 | 55.45 | 4 |
| BLSP | 7 | 5 | 11 | 1 | 49.09 | 5 |
| LTU | 5 | 6 | 11 | 5 | 46.36 | 6 |

## Limitations

The benchmark evaluation is currently skewed heavily toward English language datasets, as most open-source LALMs lack robust multilingual or non-English support (Chinese-annotated tasks were excluded from final model rankings). Slot-filling tasks within spoken language understanding proved too difficult for current LALMs and had to be excluded from evaluation. Furthermore, testing was restricted to zero-shot evaluation without fine-tuning, potentially underestimating models optimized with task-specific adaptation.

## Why read this

Speech and ML researchers building or evaluating Large Audio-Language Models should read this to understand current performance ceilings, severe hallucination/instruction-following flaws, and the stark performance gap between LALMs and specialized generation models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Standardized evaluation, model selection, and progress tracking for multimodal speech and audio assistant development.

## Institutions / 機構

Nankai University

**Funding / 經費:** National Key R&D Program of China, NSF China

## Related

- (link related pages by id as the wiki grows)
