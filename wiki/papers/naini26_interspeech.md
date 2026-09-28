---
id: naini26_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2935
pdf: https://www.isca-archive.org/interspeech_2026/naini26_interspeech.pdf
---

# Comparative Reasoning: Making an Audio Language Model Better at Comparing Emotions

[PDF](https://www.isca-archive.org/interspeech_2026/naini26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/naini26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2935)

**TL;DR** — A reasoning-guided ordinal speech emotion recognition framework adapts large audio-language models for pairwise emotion comparison, achieving superior preference accuracy while using only 5% of conventional training data.

## Problem

Large audio-language models (LALMs) are predominantly designed for single-audio inference and exhibit weak performance in comparative multi-audio tasks. Emotional perception is naturally relative rather than absolute, but existing SER preference approaches learn comparative relationships implicitly from annotations without explicit reasoning over acoustic and semantic cues.

## Method

The framework uses Qwen2.5-Omni-3B (3B parameters) as the base LALM, adapted via LoRA (rank and scaling factor both set to 64) on linear layers. Training data consists of 10k utterance pairs per emotional attribute from MSP-Podcast, representing roughly 5% of conventional training volume. Inputs combine paired speech clips, an explicit prompt specifying sample order and emotional dimension definitions, and structured comparative reasoning traces. These traces are generated using Qwen3-Next-80B by combining Qwen3-Omni-Caption semantic descriptions with 36-dimensional acoustic representations derived from 18 GeMAPS low-level descriptors (means and standard deviations, discretized into qualitative levels like low/medium/high). Models are trained using supervised fine-tuning (SFT) and direct preference optimization (DPO), including variants incorporating correct (r+) and incorrect (r-) reasoning traces.

## Results

Evaluated on 3k held-out pairs from MSP-Podcast development/test sets, as well as WHiSER and BIIC-Podcast corpora for cross-domain tests. On MSP-Podcast test sets, the DPO-CoT model achieves an average preference accuracy of 0.881 across arousal (0.887), valence (0.890), and dominance (0.867), outperforming WavLM+RankNet (0.784 avg) and RankList (0.796 avg) baselines while utilizing only 5% of their training data volume. In cross-dataset transfer to WHiSER, DPO-CoT reaches 0.909 average accuracy compared to 0.764 for WavLM+RankNet. In cross-emotion transfer (trained on arousal only, tested on valence/dominance), DPO-CoT yields an average accuracy of 0.785 compared to 0.637 for baseline LALM SFT.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building interpretable speech emotion recognition systems, voice-based assistants, or multi-audio comparative evaluation pipelines.

## Limitations

Longer reasoning traces are prone to hallucination and degrade performance, requiring strict length constraints (fewer than five sentences).

## Related

- (link related pages by id as the wiki grows)
