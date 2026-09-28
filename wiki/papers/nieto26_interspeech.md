---
id: nieto26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-458
pdf: https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.pdf
---

# Dialect Bias in Speech Recognition Across 10 Spanish and French Varieties

[PDF](https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nieto26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-458)

**TL;DR** — This paper evaluates dialect bias in speech recognition across ten Spanish and French varieties using a new gender-balanced corpus, revealing that ASR errors systematically track linguistic distance from training distributions.

## Problem

ASR bias research is heavily English-centric, leaving major global languages like Spanish and French underexplored while the underlying mechanisms of performance disparities remain poorly understood. Standard evaluation corpora often lack authentic dialectal morphosyntax and regional discourse markers due to relying on read speech from canonical text prompts. Addressing these gaps is critical as speech technologies are increasingly deployed in high-stakes domains where equitable performance across diverse communities is essential.

## Method

The authors introduce a 20-hour manually transcribed evaluation corpus comprising 1,223 minutes of podcast audio across 10 distinct Spanish and French regional varieties, balanced for gender and stratified by country. They benchmark seven state-of-the-art models (including Whisper v2/v3, Otter, GPT-4o-Transcribe, Wav2Vec2, Qwen2-7B, and SALMONN-7B) on this corpus. To diagnose errors, they combine Jensen-Shannon Divergence (JSD) word-shift lexical analysis to track error-contributing tokens with acoustic analyses using external pyannote speaker embeddings and Whisper layer representations. Furthermore, they perform diagnostic fine-tuning to localize errors within the model architecture.

## Results

Evaluated across 10 dialects, Whisper v3 achieved the lowest overall WER, though performance varied significantly (Kruskal-Wallis H = 179.24 for Spanish, H = 63.18 for French, p < .001). Unexpectedly, smaller population varieties like Dominican Spanish outperformed Peninsular Spanish, while Chilean Spanish showed the highest error rates. In French, European varieties (France, Belgium) systematically outperformed African and Canadian variants. Lexical analysis linked errors to forced convergence on morphosyntax (e.g., overriding Chilean voseo), regional slang, and discourse marker densities (the 'pues divide' and Canadian discourse particles), while acoustic distance positively correlated with dialect-gender level WER.

## Code

- https://doi.org/10.5281/zenodo.20575155

## Applications

Engineers and researchers building multilingual speech recognition systems can use these evaluation insights and corpus construction pipelines to audit, diagnose, and mitigate dialectal biases in production models.

## Limitations

The evaluation relies on podcast audio, which captures conversational speech but may not represent all speaking styles or registers.

## Related

- (link related pages by id as the wiki grows)
