---
id: kulkarni26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["University of Maryland, College Park"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3070
pdf: https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.pdf
---

# A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models

*Apoorva Kulkarni, Kaousheik Jayakumar, Sreyan Ghosh, Sarah Wiegreffe, Dinesh Manocha, Ramani Duraiswami*

[PDF](https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3070)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper investigates why Large Audio Language Models (LALMs) fail at temporal reasoning by introducing a controlled 1,657-question benchmark and conducting the first causal mechanistic analysis of attention mechanisms. The authors demonstrate that redistributing attention via scaling outperforms simply increasing audio attention, improving average model accuracy from 55.9% to 59.1% without fine-tuning.

## Key contributions

- Introduces a controlled temporal reasoning benchmark comprising 1,657 questions across three foundational tasks: Earliest Onset (EO), Latest Offset (LO), and Longest Duration (LD).
- Performs behavioral analysis showing that models under-utilize audio and rely heavily on text when textual cues are available.
- Compares causal attention interventions and finds that attention scaling (redistributing attention weights) significantly outperforms raw attention upweighting.
- Shows that combining task-relevant keyword tokens with final prompt tokens yields the highest error-correction fix rates.
- Proposes a training-free, layer-targeted attention scaling intervention that improves average temporal accuracy from 55.9% to 59.1%.

## Problem

State-of-the-art Large Audio Language Models (LALMs) struggle significantly with temporal localization, ordering, and duration reasoning, which limits their utility in downstream tasks like diarization and event detection. Existing benchmarks evaluate overall capability but only report performance gaps without probing underlying mechanisms. Although prior work attributes these failures broadly to text-audio modality imbalance, it relies purely on behavioral observation rather than causal analysis. This work addresses the need to understand whether models fail because they lack audio attention mass or because attention is improperly distributed across audio tokens.

## Method

The authors evaluate four open-source LALMs (Qwen2-Audio-7B-Instruct, Kimi-Audio-7B-Instruct, Audio-Flamingo-3, and DeSTA2.5-Audio-Llama-3.1-8B) and perform mechanistic interventions on Audio-Flamingo-3 and DeSTA-2.5-Audio. The benchmark is constructed from TACOS (Freesound clips spanning 7 superclasses and 59 fine-grained categories), filtered so correct answers are separated by at least 1 second from distractors. Two main intervention strategies are tested: Attention Upweighting (adding an amplification term to pre-softmax attention logits for all audio tokens) and Attention Scaling (ScalingVis, multiplying attention logits by a coefficient alpha to sharpen or smooth the distribution where alpha > 1 sharpens and alpha < 0.2/0.5 smooths). 

Interventions are applied across three token positions: Last (final prompt token), Keyword (task-relevant words like 'earliest'), and Kwd+Last (both). Because global all-layer interventions disrupt correctly predicted tokens, the authors identify critical bottleneck layers (Layer 20 for Audio-Flamingo-3 using sharpening alpha=2.0, and Layer 9 for DeSTA-2.5-Audio using smoothing alpha=0.2) to apply targeted inference-time scaling. This design is chosen because raw modality imbalance hypotheses do not account for token-level precision errors within the audio sequence.

## Experimental setup

Evaluates 1,657 multiple-choice questions (528 Earliest Onset, 499 Latest Offset, 630 Longest Duration) derived from TACOS data. Baselines include Qwen2-Audio-7B-Instruct, Kimi-Audio-7B-Instruct, Audio-Flamingo-3, and DeSTA2.5-Audio-Llama-3.1-8B, alongside silence ablation and random guessing (25% baseline). Metrics include multi-class accuracy, modality comparison (AQA vs CQA vs ACQA), and fix rate percentage on initially incorrect predictions. Implementation uses open-source LALM weights without any training or model fine-tuning.

## Results

Silence ablation drops model performance to near-chance (approx 21-32%), proving models cannot solve the benchmark using text priors alone. However, modality comparisons show CQA (caption-only) frequently outperforms AQA (audio-only), confirming heavy text reliance. In causal intervention experiments, scaling consistently outperforms upweighting: Audio-Flamingo-3 achieves a 20.5% average fix rate with sharpening (alpha = 2.0), while DeSTA-2.5-Audio achieves 20.1% with smoothing (alpha = 0.2), compared to 15.8% and 10.1% for upweighting respectively. Combining keyword and final tokens (Kwd+Last) maximizes fix rates. Applying global all-layer scaling degrades baseline performance across the board, but single-layer targeted interventions (Layer 20 for Audio-Flamingo-3 and Layer 9 for DeSTA-2.5-Audio) lift average model accuracy from 55.9% to 59.1%.

| System / Condition | EO Accuracy (%) | LO Accuracy (%) | LD Accuracy (%) |
|---|---|---|---|
| Audio-Flamingo-3 (Baseline) | 60.42 | 56.71 | 58.10 |
| Audio-Flamingo-3 (All-Layer Scaled) | 51.13 | 48.09 | 47.77 |
| DeSTA2.5-Audio (Baseline) | 50.38 | 51.30 | 54.92 |
| DeSTA2.5-Audio (All-Layer Scaled) | 51.70 | 51.10 | 52.22 |

## Limitations

The study's scope is restricted to narrow, synthetic-style foundational temporal questions (EO, LO, LD) rather than continuous, open-ended conversational audio reasoning. The interventions do not account for potential downstream bottlenecks originating in weak lower-level audio encoder representations. The evaluation is constrained by the availability of fully open-source LALMs with accessible training weights and architectures, limiting the testing pool to two primary models for mechanistic intervention.

## Why read this

Speech and multimodal ML researchers should read this to understand that audio-text modality imbalance in LALMs cannot be fixed merely by turning up audio attention volume; token-level attention distribution is what matters. It provides a blueprint for training-free, layer-targeted attention interventions that boost temporal reasoning without extra data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving fine-grained temporal grounding, sound-event detection, and audio diarization in large multimodal speech models.

## Institutions / 機構

University of Maryland, College Park

## Related

- [MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models](wang26t_interspeech.md) — same problem · relatedness 2.8/3
- [AudioGround: Fine-Grained Temporal Grounding in Audio via Deterministic Boundary Supervision](kim26z_interspeech.md) — same problem · relatedness 2.4/3
- [GigaChat Audio: Time-aware Large Audio Language Model](kutsakov26_interspeech.md) — same problem · relatedness 2.4/3
- [Towards Fine-Grained Temporal Perception: Post-Training Large Audio-Language Models with Audio-Side Time Prompt](shi26b_interspeech.md) — same problem · relatedness 2.3/3
- [Hearing the Order: Investigating Position Bias in Large Audio-Language Models](lin26c_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
