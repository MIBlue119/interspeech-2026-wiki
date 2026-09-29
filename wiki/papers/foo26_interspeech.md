---
id: foo26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-913
pdf: https://www.isca-archive.org/interspeech_2026/foo26_interspeech.pdf
---

# All That Glitters Is Not Audio: Rethinking Text Priors and Audio Reliance in Audio-Language Evaluation

*Leonardo Haw-Yang Foo, Chih-Kai Yang, Chen-An Li, Ke-Han Lu, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/foo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/foo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-913)

**Category:** `resources-evaluation`

**TL;DR** — This paper presents a diagnostic evaluation framework to audit Large Audio-Language Models (LALMs) for shortcut behaviors, revealing that models retain 60–72% of their full-audio accuracy without any audio input and that 96% of audio-dependent questions can be answered using isolated local fragments rather than holistic context.

## Key contributions

- Proposes a two-axis diagnostic evaluation framework—Text Prior and Audio Reliance—to audit whether LALM benchmark performance stems from true auditory perception or textual/localized shortcuts.
- Introduces a rigorous item-level score decomposition mapping benchmark items into mutually exclusive categories: Text-Solvable (TS), Fragment-Sufficient (FS), Cross-Segment (XS), Audio-Harmful (AH), and Unsolvable (UN).
- Evaluates eight prominent LALMs across three standard benchmarks (MMAU, MMAR, MMAU-Pro), demonstrating that text priors account for 60–72% of full-audio performance.
- Conducts a temporal granularity analysis showing that only 3.0–4.2% of audio-dependent items genuinely require cross-segment integration across the full audio clip.

## Problem

Large Audio-Language Models (LALMs) regularly report continuous performance gains on speech and audio benchmarks, which are typically interpreted as evidence of robust auditory comprehension. However, prior work in NLP and vision has exposed lexical shortcuts, dataset artifacts, and strong language priors (such as hypothesis-only or question-only baselines) that allow models to pass evaluations without perceiving the primary sensory modality. In the audio domain, substituting audio with silence introduces confounding artifacts, leaving a gap in quantifying how much benchmark success relies on text-alone reasoning versus acoustic signals. This matters because inflated benchmark scores hide fundamental weaknesses in auditory grounding, misguiding research investments toward superficial language reasoning rather than robust audio understanding.

## Method

The diagnostic framework audits models along two axes: Text Prior and Audio Reliance. Text Prior measures the model's capacity to solve benchmark items without acoustic input by comparing three conditions: the Text Backbone (TB) evaluating the original pre-multimodal LLM, a 'None' setting where the multimodal LALM receives the prompt with the audio omitted entirely (avoiding the artifacts of silent audio inputs), and the standard 'Full' multimodal setting. The text-prior rate is defined as R_TP = Acc_none / Acc_full. 

Audio Reliance examines temporal dependency by partitioning each audio clip into N contiguous, equal-duration segments (evaluated at N = 2, 3, 4, 5) alongside a retention rate metric RN normalized against full-audio performance. High retention rates near 1 indicate that short local fragments carry sufficient information, invalidating the assumption of global audio integration. A joint item-level decomposition categorizes every evaluation instance into mutually exclusive partitions: Text-Solvable (correct under Full and None), Fragment-Sufficient (incorrect under None, but correct under at least one fragment), Cross-Segment (incorrect under None and all individual fragments, demanding global context), Audio-Harmful (correct without audio, incorrect with it), and Unsolvable.

Eight advanced LALMs ranging from 3B to 30B parameters are evaluated alongside a hybrid multiple-choice scorer (using regular expressions backed by Claude 4.5 Haiku at temperature 0 for format-sensitive failures, matching human evaluation in 97.2% of cases compared to 26.0% for rigid string matching).

## Experimental setup

Evaluations are conducted on three standard audio-language benchmarks: MMAU (1,000-item test-mini split from 10k items covering sound, music, and speech), MMAR (1,000 MCQ items across 4 cognitive layers and 7 modality variations), and MMAU-Pro (5,305 items across MCQ, open-ended QA, and instruction following). Eight open and proprietary LALMs are assessed: Audio-Flamingo-3 (8.4B), DeSTA-2.5 (8.8B), Phi-4-Multimodal (5.6B), Qwen2-Audio-7B (8.2B), Qwen2.5-Omni-7B (10.7B), Qwen3-Omni Instruct (30B MoE with 3B active), Qwen3-Omni Thinking (30B MoE, temperature 0.6), and Voxtral-Mini-3B (4.7B).

## Results

Across all models and benchmarks, text-backbone accuracies significantly exceed chance (surpassing random guessing by 12.4% on MMAU, 5.4% on MMAR, and 3.6% on MMAU-Pro, with Qwen3-30B text backbones reaching up to 50.8% accuracy on MMAU). Under the None condition (no audio input), models achieve an average text-prior rate R_TP between 60.5% and 72.1% of their Full-audio performance, proving that a massive fraction of benchmark success is driven by textual priors rather than listening. 

In the audio reliance analysis, retention curves show that performance degrades only marginally when clips are reduced to short fragments (N=2 to 5). Item-level decomposition reveals that Text-Solvable items constitute 26.2–39.5% of benchmarks. Among genuinely audio-dependent items, Cross-Segment (XS) cases account for a sparse 3.0–4.2%, meaning roughly 96% of audio-reliant questions can be solved using a single local temporal fragment. Task-level breakdowns show that speech tasks maintain higher audio dependency (Full-None gaps of 24.7–27.7%), whereas sound and music tasks retain over 93% of accuracy with just half-clip fragments (N=2).

| Benchmark | Full Accuracy (%) | None Accuracy (%) | Text Backbone (%) | Text-Prior Rate (R_TP) |
|---|---|---|---|---|
| MMAU (Overall Mean) | 68.6 | 44.6 | 37.4 | 65.1 |
| MMAR (Overall Mean) | 56.5 | 34.2 | 30.4 | 60.5 |
| MMAU-Pro (Overall Mean) | 50.0 | 36.0 | 29.5 | 72.1 |

## Limitations

The study is constrained by its focus on multiple-choice and specific text-promptable formats, meaning open-ended generation tasks outside MMAU-Pro's scope may exhibit different prior dynamics. The reliance on LLM judges (Claude 4.5 Haiku) for parsing ambiguous textual answers, while vastly superior to string matching, introduces potential downstream judge biases. Furthermore, the analysis is restricted to eight existing LALMs and three benchmarks, leaving potential scaling behaviors in ultra-large or proprietary models unmapped.

## Why read this

Speech and ML engineers building audio-language models or designing new benchmarks should read this paper to understand why high benchmark scores are heavily inflated by text priors and local acoustic cues. It provides a concrete diagnostic recipe—measuring text-prior rates and fragment retention curves—to ensure future architectures perform genuine holistic audio reasoning rather than exploiting linguistic shortcuts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing audio-language dataset quality, designing robust multimodal evaluation benchmarks, and developing audio-language models with true acoustic grounding.

## Institutions / 機構

National Taiwan University

**Funding / 經費:** Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence, NTU Artificial Intelligence Center of Research Excellence

## Related

- (link related pages by id as the wiki grows)
