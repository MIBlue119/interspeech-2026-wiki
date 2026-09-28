---
id: you26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-887
pdf: https://www.isca-archive.org/interspeech_2026/you26_interspeech.pdf
---

# Uncovering the Impact of G2P Precision on Korean TTS: A Large-Scale Statistical Validation via a Novel Morphological Engine

[PDF](https://www.isca-archive.org/interspeech_2026/you26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/you26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-887)

**TL;DR** — The paper introduces a high-speed, morphologically integrated Korean G2P engine that resolves word-boundary phonological errors, achieving an 85.7% accuracy and significantly improving downstream TTS intelligibility across a large-scale evaluation of 96 models.

## Problem

Standard Korean G2P tools like g2pk suffer from high latency and superficial morphological integration, leading to phonological inaccuracies at word boundaries. These inaccuracies act as label noise that degrades TTS training convergence and synthesis quality. Furthermore, typical TTS studies rely on single-seed comparisons that fail to isolate algorithmic improvements from random initialization noise.

## Method

The proposed rule-based G2P engine utilizes the Kiwi morphological analyzer to construct a hierarchical pointer structure where syllables directly reference their constituent morphemes with O(1) boundary detection time. It incorporates rule-specific isolated dictionaries to handle etymological irregularities and a priority-based recursive re-evaluation mechanism following the Single Responsibility Principle to accurately simulate cascading phonological changes. Large-scale statistical validation is performed by independently training 96 VITS models (32 per condition: Grapheme, G2PK, and Proposed) for 500k steps without fixed seeds.

## Results

Tested on 3,000 KSS sentences, the proposed engine achieves an average processing time of 3.14ms (outperforming g2pk's 14.98ms, p < 0.001) and reaches an 85.7% sentence-level accuracy compared to g2pk's 27.2%. In downstream TTS evaluations across 96 VITS models, the proposed G2P approach significantly improves intelligibility with a lower Character Error Rate (CER of 0.002 vs 0.021 for G2PK) while maintaining acoustic quality without trade-offs in PESQ or WV-MOS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building Korean or multilingual text-to-speech systems seeking robust, low-latency text normalization and phonemization.

## Limitations

Remaining errors stem primarily from homograph ambiguities restricted by the morphological analyzer's context window limits.

## Related

- (link related pages by id as the wiki grows)
