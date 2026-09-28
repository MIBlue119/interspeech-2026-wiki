---
id: lahtinen26_interspeech
category: paralinguistic
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2452
pdf: https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.pdf
---

# Looking for Affect in Spontaneous Finnish Speech through Linguistic Interpretability

[PDF](https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2452)

**TL;DR** — Combining text and audio features improves valence regression for spontaneous Finnish speech, whereas arousal regression relies primarily on acoustic signals.

## Problem

While the complementary roles of text and speech modalities are well established for major languages, it remains unclear how much they contribute to perceived valence and arousal in spontaneous Finnish speech. Most prior Finnish affect studies focused separately on small acted speech sets or text-only sentiment corpora without acoustic grounding. Addressing this gap enables a more rigorous computational understanding of how humans perceive affect in real-world spoken interactions.

## Method

The study tests 127 feature combinations using multi-layer perceptron (MLP) regression models optimized with Concordance Correlation Coefficient (CCC) loss. Extracted features include explicit and implicit representations: Finnish ModernBERT text embeddings, FinBERT-FinnSentiment posteriors, emotional lexicon features, Trankit linguistic normalization vectors, ExHuBERT acoustic embeddings, and OpenSmile eGeMAPS functionals. Models also optionally incorporate concurrent human arousal or valence ratings as scalar inputs to simulate joint perception. Experiments evaluate both colloquial and GPT-4.1-standardized text transcriptions across a 12,000-sample subset of the FinnAffect corpus.

## Results

Evaluating on the 2,000-sample Gold Standard test set using CCC, the best valence model combining ModernBERT, ExHuBERT, FinSentiment, and Arousal achieves a test CCC of 0.428. Text-audio feature combinations consistently outperform individual modalities for valence regression, whereas arousal models achieve little complementary gain beyond acoustic features. Using colloquial text transcripts yields comparable or slightly better performance than standardized transcripts. Individual text features alone (e.g., ModernBERT CCC 0.263, FinSentiment CCC 0.315) and acoustic features alone (e.g., ExHuBERT CCC 0.221) underperform relative to multimodal fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building speech emotion recognition, paralinguistic analysis, or spoken dialogue systems for low-resource or non-English languages.

## Limitations

The investigation is scoped specifically to spontaneous Finnish speech and utilizes frozen pre-trained representations without fine-tuning on the target domain.

## Related

- (link related pages by id as the wiki grows)
