---
id: koriyama26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1800
pdf: https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.pdf
---

# Benchmarking Large Language Models for Grapheme-to-Phoneme Conversion: A Japanese Case Study

[PDF](https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1800)

**TL;DR** — Over 30 large language models were benchmarked for Japanese grapheme-to-phoneme conversion, demonstrating that top-tier proprietary models achieve a kana character error rate below 0.52%, outperforming the best conventional morphological analyzer at 1.03%.

## Problem

Explicit grapheme-to-phoneme conversion remains crucial for text-to-speech controllability and proper noun pronunciation, but Japanese introduces unique challenges like unsegmented word boundaries, polyphonic kanji, and complex numeral-counter phonological rules. Simple dictionary lookups or traditional rule-based tools often fail on out-of-vocabulary terms and complex context-dependent readings, while end-to-end models lack pronunciation user-control.

## Method

The study evaluates proprietary and open-weight models ranging from 2B to 1T parameters across two prompting paradigms: a parse mode where the LLM performs word segmentation and reading estimation in JSON format followed by rule-based post-processing, and a direct mode where the LLM predicts full-sentence kana directly. The evaluation uses 3,000 manually annotated sentences from the JVS nonpara30 subset covering onomatopoeia, loanwords, proper nouns, and numerals. All models are run without reasoning mode, and conventional rule-based post-processing handles particle conversion and long vowel normalization.

## Results

Tested on 3,000 JVS sentences evaluated by kana character error rate (CER) against conventional tools like OpenJTalk (1.03%) and MeCab+UniDic (1.54%), the best LLMs achieved significantly lower error rates, such as Claude Opus 4.6 at 0.52% in parse mode and Gemini 3.1 Pro at 0.53% in direct mode. Model scaling laws clearly apply, with local open-weight families showing sharp error reductions as parameter counts increase (e.g., Gemma3 dropping from 34.82% at 4B to 5.75% at 27B). Parse mode generally outperformed direct mode because rule-based post-processing relieves the LLM from handling deterministic phonological rules.

## Code

- https://github.com/CyberAgentAILab/jvs_nonpara_kana

## Applications

Engineers building text-to-speech systems, voice assistants, or speech synthesis platforms for Japanese and similar morphologically complex languages requiring high pronunciation accuracy and user controllability.

## Limitations

Smaller LLMs suffer from severe failure modes including word substitution, incorrect kanji readings, and dropping characters, necessitating large or specialized models for practical deployment.

## Related

- (link related pages by id as the wiki grows)
