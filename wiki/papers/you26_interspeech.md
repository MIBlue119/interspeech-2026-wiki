---
id: you26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-887
pdf: https://www.isca-archive.org/interspeech_2026/you26_interspeech.pdf
---

# Uncovering the Impact of G2P Precision on Korean TTS: A Large-Scale Statistical Validation via a Novel Morphological Engine

*Heejo You, Sungwoo Moon*

[PDF](https://www.isca-archive.org/interspeech_2026/you26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/you26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-887)

**TL;DR** — This paper introduces a high-speed, high-precision rule-based Korean Grapheme-to-Phoneme (G2P) engine that integrates deep morphological pointer structures and recursive rule re-evaluation, achieving an 8.7x speedup and 85.7% accuracy over the g2pk baseline while demonstrating through 96 VITS models that high-precision G2P eliminates label noise to improve TTS intelligibility.

## Key contributions

- Proposed a hierarchical pointer data structure (Sentence → Eojeol → Syllable → Morpheme) that enables O(1) instant boundary detection for complex Korean phonological rules.
- Implemented a priority-based iterative rule engine governed by the Single Responsibility Principle and isolated rule dictionaries to accurately model cascading phonological chain reactions.
- Conducted a large-scale statistical validation across 96 VITS models (32 per condition, trained for 500k steps) to eliminate random initialization biases and prove the impact of G2P precision on TTS training efficiency.
- Achieved 3.14ms processing latency (4.7x to 8.7x faster than g2pk) and 85.7% sentence-level accuracy (compared to 27.2% for g2pk) with a character error rate (CER) reduction from 0.021 to 0.002.

## Problem

End-to-end Korean TTS models rely on phoneme inputs to reduce training complexity, but existing G2P tools like g2pk suffer from slow inference speeds and inaccurate word-boundary phonological modeling. These inaccuracies introduce label noise that misleads the model encoder, causing attention instability and degrading synthesis quality. Furthermore, standard neural G2P models act as black boxes prone to out-of-vocabulary hallucinations, while large language model preprocessors introduce extreme computational asymmetry.

## Method

The proposed engine parses input text using the Kiwi analyzer into a hierarchical pointer structure where each Syllable object directly points to its constituent Morpheme object, enabling O(1) detection of intra-morpheme versus inter-morpheme boundaries. To handle etymological variations, it replaces a single global dictionary with rule-specific isolated dictionaries (e.g., separate dictionaries for Sino-Korean tensification vs. Native Korean rules). The core phonology engine utilizes a priority-based recursive re-evaluation mechanism following the Single Responsibility Principle: when a rule alters a phoneme, the scan stops, resets the cursor to the start of the Eojeol, and repeats until convergence, faithfully simulating complex chain reactions like implosion followed by nasalization.

Training and benchmarking use 3,000 KSS sentences for latency and 925 manually verified sentences for accuracy. For downstream evaluation, 96 independent VITS models (32 per group: Grapheme, G2PK, Proposed) were trained for 500k steps using a learning rate of 1.0e-4 and a batch size of 48 without fixed random seeds. Evaluation metrics include Whisper large-v3-turbo based Character Error Rate (CER) for intelligibility, PESQ, and WV-MOS for acoustic quality, analyzed via ANOVA and Fisher's LSD post-hoc tests after filtering outliers outside the 95% confidence interval.

## Experimental setup

Evaluated using 3,000 sentences from the KSS corpus for standalone G2P speed benchmarks and 925 manually verified sentences for accuracy. Downstream validation trained 96 VITS models (32 per condition: Grapheme, G2PK, Proposed) for 500k steps with batch size 48 and learning rate 1.0e-4. Metrics include processing latency (ms), sentence accuracy (%), Character Error Rate (CER), PESQ, and WV-MOS.

## Results

The proposed engine achieved an average processing latency of 3.14ms compared to 14.98ms for g2pk (t(2999) = 778.117, p < 0.001) and reached 85.73% accuracy and 0.002 CER versus 27.24% accuracy and 0.021 CER for g2pk. In downstream TTS evaluation across 96 models, the Proposed group achieved significantly lower CER (0.042) than both G2PK (0.048) and Grapheme (0.047) groups (ANOVA p = 0.039), with post-hoc tests confirming no significant difference between G2PK and raw Grapheme conditions (p = 0.960), proving that inaccurate G2P acts as destructive label noise. Crucially, PESQ (p = 0.265) and WV-MOS (p = 0.123) showed no significant degradation, proving the speed and intelligibility gains came with zero trade-off in acoustic naturalness.

| System | Processing Latency (ms) | Accuracy (%) | CER | TTS CER (500k steps) |
|---|---|---|---|---|
| G2PK | 14.98 | 27.2 | 0.021 | 0.048 |
| Grapheme | - | - | - | 0.047 |
| Proposed (Ours) | 3.14 | 85.7 | 0.002 | 0.042 |

## Limitations

The engine's precision is strictly bound by the underlying morphological analyzer (Kiwi), meaning neologisms, spacing errors, and morphological parsing failures propagate into rule errors. It also struggles with semantic homograph ambiguities that require broader contextual reasoning beyond morphological boundaries. Evaluation is currently constrained to the Korean language and the VITS architecture.

## Why read this

Speech engineers and TTS researchers should read this paper to understand how G2P label noise throttles downstream generative model convergence and how to implement a high-speed, morphologically integrated rule engine backed by rigorous multi-seed statistical validation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying low-latency, high-fidelity Korean text-to-speech systems and bootstrapping reliable phonetic training data for neural speech synthesis models.

## Related

- (link related pages by id as the wiki grows)
