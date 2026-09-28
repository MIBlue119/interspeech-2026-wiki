---
id: zhang26t_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1313
pdf: https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.pdf
---

# EChO-Agent: Evidence Chain Orchestration Agent for Audio Reasoning

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1313)

**TL;DR** — EChO-Agent structures audio reasoning into a modular four-stage pipeline, achieving 71.0% accuracy and a 63.0 rubric score on the MMAR benchmark.

## Problem

Large Audio Language Models struggle with complex audio reasoning because they lack question-conditioned perception, reliable ways to revisit audio, and checkable intermediate reasoning chains. Directly prompting models or using unstructured tool outputs introduces noisy or distracting contexts, leading to ungrounded shortcut reasoning and failures in process faithfulness.

## Method

The framework uses a four-stage pipeline: Tool, Evidence, Reason, and Verify. First, a static tool-dispatch orchestrator invokes specialized analysis tools including YAMNet for audio events, Whisper for ASR, SpeechBrain for emotion, and Essentia for music. Next, DeepSeek-V3 acts as an evidence constructor that performs relevance filtering, cross-observation synthesis, and evidence structuring to distill raw observations into a concise evidence set. Then, Qwen3-Omni-Instruct performs evidence-conditioned audio reasoning using stepwise prompting and diagnostic feedback. Finally, a dual-pass arbitration and verification module checks format compliance, reasoning-answer consistency, and candidate selection.

## Results

Evaluated on the MMAR benchmark, EChO-Agent achieves 71.0% average accuracy and a 63.0 rubric score, ranking 5th in the MMAR Agent Track and improving over the Qwen3-Omni-Instruct baseline by +2.3 accuracy points and +4.3 rubric points, with particularly strong gains on composite mixed-type audios. Ablation studies demonstrate that removing evidence integration causes the largest performance drop (down to 65.4% accuracy and 56.9 rubric), even underperforming the tool-free baseline. Removing tools or verification decreases accuracy by 1.8% and 1.9% respectively, confirming the necessity of structured evidence and self-verification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech and audio question-answering systems requiring auditable, faithful reasoning traces and robust multi-tool integration.

## Limitations

The granularity of sound-modality reasoning is restricted by the limits of existing perception tools, such as coarse event labels from YAMNet.

## Related

- (link related pages by id as the wiki grows)
