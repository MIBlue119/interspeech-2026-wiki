---
id: yu26_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-456
pdf: https://www.isca-archive.org/interspeech_2026/yu26_interspeech.pdf
---

# Investigating LLMs Behavior in Depression Severity Prediction

*Jiawei Yu, Yun Hao, Heysem Kaya*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-456)

**Category:** `health-clinical`

**TL;DR** — This paper investigates how large language models (LLMs) behave under in-context learning (ICL) for depression severity prediction, finding that increasing demonstration shot count yields negligible gains, whereas filtering transcripts for symptom relevance improves Concordance Correlation Coefficient (CCC) while reducing token usage by 80%.

## Key contributions

- Evaluated five LLMs (GPT-4o-mini, GPT-5.1, DeepSeek-Chat, DeepSeek-Reasoner, Llama-3.1-8B) across 0-10 few-shot settings on the E-DAIC PHQ-8 benchmark, showing that shot scaling quickly plateaus.
- Introduced a contradictory-label intervention (replacing gold PHQ-8 scores with inverted fake scores in demonstrations), demonstrating that most models are largely insensitive to label corruption.
- Proposed using GPT-5.1-extracted symptom-focused excerpts instead of full interview transcripts, which consistently boosts prediction accuracy and cuts token overhead by ~80% from 2-shot onward.
- Achieved new state-of-the-art text-based performance on the E-DAIC test set (CCC of 0.714 and MAE of 3.646 using GPT-5.1) through symptom excerpting and prediction averaging.

## Problem

Prior work applies LLMs to mental health scoring using zero-shot or few-shot prompts without analyzing how performance scales with demonstration count or examining whether models actually rely on ground-truth demonstration labels. Furthermore, interview transcripts contain substantial dialogue irrelevant to clinical conditions (such as small talk), which dilutes task-relevant signals, wastes context window space, and inflates API costs. Understanding whether context relevance matters more than demonstration quantity is crucial for building cost-effective, interpretable clinical decision support tools.

## Method

The pipeline processes semi-clinical audio interviews from the E-DAIC dataset, re-transcribing recordings with Whisper-Large-V3 to obtain complete dialogue sessions (raw transcripts averaging ~1,110 words). To isolate clinical content, raw transcripts are passed to GPT-5.1 with a prompt that extracts only text aligned with the eight PHQ-8 symptom categories while preserving exact wording. In Stage 2, prompts are constructed with a task definition, k few-shot demonstration pairs (where k ranges from 0 to 10), and the target test transcript, requiring a numerical PHQ-8 score and severity label output. Demonstrations are randomly sampled from the training split across five independent trials with a fixed decoding temperature of 0.3. For the contradictory-label test, non-depressed gold scores (e.g., 3) are swapped with depressed fake scores (e.g., 15) and vice-versa. Finally, prediction averaging aggregates scores across the five independent random-sampling runs per model to mitigate stochastic variance.

## Experimental setup

Evaluated on the Extended Distress Analysis Interview Corpus (E-DAIC), which contains 275 semi-clinical interviews (163 train, 56 dev, 56 test) paired with PHQ-8 depression severity scores (0 to 24). Baselines include prior SOTA systems such as the AVEC'19 winner, Van Steijn et al., Yu et al., Makiuchi et al., and Sadeghi et al. Evaluation metrics are Concordance Correlation Coefficient (CCC, primary), Mean Absolute Error (MAE), and Root Mean Squared Error (RMSE). Experiments test five models: GPT-4o-mini, GPT-5.1, DeepSeek-Chat, DeepSeek-Reasoner, and Llama-3.1-8B across 0-10 shot configurations.

## Results

Across 0-10 shots with raw transcripts, performance remains flat after a minor 0-to-2 shot bump: GPT-5.1 hovers around 0.67-0.70 CCC, DeepSeek-Reasoner around 0.60s, GPT-4o-mini around 0.46-0.49, and Llama-3.1-8B lags at 0.22-0.30. Under contradictory labels, GPT-4o-mini and GPT-5.1 show near-zero drop (delta CCC ~0.0), while DeepSeek-Chat and DeepSeek-Reasoner suffer moderate degradation up to 13-17% at higher shots. Replacing raw transcripts with symptom-focused excerpts yields massive performance boosts: GPT-4o-mini gains +0.20 to +0.24 CCC, DeepSeek-Chat gains +0.13 to +0.34, and Llama-3.1-8B gains +0.26 to +0.41 CCC. On the held-out test set using prediction averaging with excerpted inputs, GPT-5.1 achieves a SOTA text-only CCC of 0.71 (MAE 3.65, RMSE 4.84) and DeepSeek-Chat achieves a CCC of 0.67.

| System / Condition | CCC (dev/test) | MAE | RMSE |
|---|---|---|---|
| AVEC'19 Winner [16] | 0.67 | 4.02 | 4.73 |
| Van Steijn et al. [17] | 0.62 | - | 6.06 |
| Yu et al. [18] (Audio only) | 0.48 | - | 5.58 |
| Sadeghi et al. [19] (Audio+Visual) | - | 3.76 | 4.53 |
| Our DeepSeek-Chat (Excerpt) | 0.67 | 4.08 | 5.17 |
| Our GPT-5.1 (Excerpt) | 0.71 | 3.65 | 4.84 |

## Limitations

The study is restricted to a single English-language benchmark dataset (E-DAIC) and a single clinical scale (PHQ-8), limiting immediate generalization to other psychiatric disorders or multilingual populations. Performance relies heavily on upstream ASR transcript quality from Whisper-Large-V3. The work lacks multimodal integration (audio/visual cues are excluded), which could otherwise capture paralinguistic and visual markers of depression.

## Why read this

Researchers and clinical NLP engineers should read this to understand the limits of few-shot prompt scaling in mental health prediction and to learn how pre-filtering dialogue via symptom-focused excerpting drastically reduces API token costs while outperforming full-transcript baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cost-effective clinical decision support tools for automated mental health screening, depression severity tracking, and psychiatric interview analysis from conversational text.

## Institutions / 機構

Utrecht University, University of Groningen

**Funding / 經費:** China Scholarship Council

## Related

- (link related pages by id as the wiki grows)
