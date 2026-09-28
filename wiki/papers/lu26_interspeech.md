---
id: lu26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-998
pdf: https://www.isca-archive.org/interspeech_2026/lu26_interspeech.pdf
---

# PolyBench: Benchmarking LLM-based TTS Systems for Chinese Polyphone Disambiguation

[PDF](https://www.isca-archive.org/interspeech_2026/lu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-998)

**TL;DR** — PolyBench is a new comprehensive benchmark for evaluating Chinese polyphone disambiguation in LLM-based text-to-speech systems, revealing that even the best evaluated open-source model achieves only 82.02% pronunciation accuracy.

## Problem

Large Language Model-based TTS (LLM-TTS) systems perform polyphone disambiguation implicitly within their architectures, making direct evaluation difficult since traditional ASR-based metrics like Word Error Rate often fail to detect character mispronunciations. Furthermore, existing public polyphone datasets suffer from annotation errors, incomplete coverage, and a lack of domain-specific contexts, which hinders systematic progress.

## Method

The authors construct PolyBench via a four-stage pipeline: extraction and rule-based filtering of 494 high-frequency polyphonic characters and 88 words from dictionary entries, DeepSeek-V3.1-based sentence generation across 5 categories (common, surname, dialectal, colloquial, literary), and rigorous manual verification by native speakers yielding 6,016 sentences. They also create two supplementary test sets (DictWords with 2,137 words and ALLinONE with 494 multi-pronunciation sentences) and establish Qwen3-Omni-Instruct as an automated pronunciation annotator achieving 93.06% labeling accuracy. They benchmark 3 G2P models and 17 state-of-the-art open-source LLM-TTS models.

## Results

Evaluated on the Main test set, FireRedTTS-2 achieves the highest Polyphone Pinyin Accuracy (Poly-PyAcc) of 82.02%, outperforming baselines like CosyVoice2 (79.21%) and Chatterbox (68.51%), though models still struggle heavily on dialectal (approx. 42% accuracy) and colloquial categories. On the DictWords test set, models reach up to 86.01% Poly-PyAcc, while on the demanding ALLinONE test set, the top system correctly pronounces all polyphones in only 202 out of 494 sentences. Intra-system results show a 10% to 20% performance gap between character recognition accuracy and actual Pinyin pronunciation accuracy.

## Code

- https://github.com/Chunhui-Lu/PolyBench

## Applications

Speech and machine learning engineers developing or evaluating Chinese LLM-TTS systems for naturalness, intelligibility, and fine-grained pronunciation correctness.

## Limitations

Current automated labeling models still produce occasional tone and Pinyin errors, and evaluation is restricted to the top 3,500 most common Chinese characters.

## Related

- (link related pages by id as the wiki grows)
