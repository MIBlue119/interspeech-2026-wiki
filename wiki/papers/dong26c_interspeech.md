---
id: dong26c_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1991
pdf: https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.pdf
---

# Can Speech LLMs Approximate Human Ratings of Accentedness and Comprehensibility? Evidence from Correlational and Feature-Based Analyses

[PDF](https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1991)

**TL;DR** — This study evaluates whether the speech LLM Qwen3-Omni-30B-Instruct can approximate human ratings of L2 accentedness and comprehensibility, finding that few-shot prompting achieves moderate correlation with human judgments and successfully tracks learner progress.

## Problem

Evaluating second language (L2) accentedness and comprehensibility typically relies on costly and time-consuming expert human ratings, while traditional automatic systems depend on predefined acoustic or ASR metrics that poorly reflect human perceptual judgment. Although speech LLMs can process raw speech and encode rich representations of segmental accuracy, prosody, and fluency, empirical evidence regarding their alignment with human perceptual scores and sensitivity to language development over time remains limited.

## Method

The authors evaluate the Qwen3-Omni-30B-Instruct model using zero-shot and few-shot prompting configurations, feeding raw speech files and text prompts containing definitions and human-scored reference examples. The evaluation dataset comprises 1,848 English utterances from 33 Indonesian high school students recorded before and after a 36-day practice period with an ASR-based CALL system. Human ratings from nine experts on a nine-point reversed scale served as ground truth. Features were extracted using Praat (16 features), openSMILE/eGeMAPS (88 features), and Whisper ASR (word distance), followed by Lasso regression and linear mixed-effects modeling to analyze feature importance and pre-post test progress alignment.

## Results

Few-shot prompting experiments substantially reduced Mean Squared Error (MSE) compared to zero-shot setups, with the optimal configuration (Exp. 6, providing two low-, intermediate-, and high-score examples) achieving a lowest MSE of 0.82 for accentedness and 1.37 for comprehensibility. Spearman's rank correlation coefficients (SPCC) between LLM scores and human ratings reached up to ~0.31 for accentedness and ~0.50 for comprehensibility. Linear mixed-effects models confirmed that LLM scores successfully captured learner progress from pre- to post-tests (p < 0.001). Feature ranking comparisons revealed that the speech LLM aligns more closely with human feature reliance for comprehensibility than for accentedness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building computer-assisted language learning (CALL) tools and automated pronunciation assessment systems can use this approach to provide scalable, human-aligned perceptual feedback to language learners.

## Limitations

Correlations with human ratings remain moderate, and the speech LLM demonstrates greater consistency with human evaluations for comprehensibility than for accentedness.

## Related

- (link related pages by id as the wiki grows)
