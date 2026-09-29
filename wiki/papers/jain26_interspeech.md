---
id: jain26_interspeech
category: asr
institutions: ["Trinity College Dublin"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2498
pdf: https://www.isca-archive.org/interspeech_2026/jain26_interspeech.pdf
---

# The Lipreading Gap: Do VSR Models Perceive Visual Speech Like Human Lipreaders?

*Rishabh Jain, Naomi Harte*

[PDF](https://www.isca-archive.org/interspeech_2026/jain26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jain26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2498)

**Category:** `asr`

**TL;DR** — By evaluating state-of-the-art visual speech recognition (VSR) models on the MaFI isolated-word lipreading dataset, this paper demonstrates that machines achieve high benchmark accuracy not through human-like visual perception, but by exploiting memorized linguistic patterns and training word frequency. Despite outperforming humans in raw word and viseme accuracy, VSR models show weak correlation with human word-level difficulty and visual clarity.

## Key contributions

- Establishes multi-level recognition baselines (word, character, phoneme, and viseme) comparing three state-of-the-art VSR paradigms against human lipreaders across 2,189 words.
- Quantifies the power of pure language priors using text-only n-gram baselines, showing that knowing only the first 3 phonemes rivals human lipreading performance.
- Performs class-wise viseme and confusion matrix analyses, revealing that VSR models succeed most on visemes that humans find hardest and exhibit distinct error topologies.
- Evaluates human-machine alignment through correlation analyses, proving that model errors correlate more strongly with training word frequency than with human visual difficulty (MaFI score).

## Problem

Modern transformer-based VSR models achieve low word error rates (WER) on benchmarks like LRS3, leading to the assumption that machines have mastered visual speech perception. However, benchmark accuracy alone cannot distinguish whether models use bottom-up articulatory features or exploit learned linguistic contexts and co-occurrence patterns. Prior comparative analyses between humans and VSR systems relied on small datasets and outdated Hidden Markov Models, leaving modern transformer, self-supervised, and LLM-based architectures unexamined against human perception.

## Method

The study evaluates three representative pretrained VSR models without additional finetuning: Auto-AVSR (supervised conformer, Small 1,759h and Large 3,291h variants), AV-HuBERT (self-supervised, 1,759h pretraining / 433h finetuning, 95M parameters), and VSP-LLM (AV-HuBERT visual frontend adapted to a frozen 7B Llama-2 backbone via LoRA). Videos are standardized using RetinaFace, cropped to 96x96 pixels at 25 FPS, and text predictions are converted to phonemes via Phonemizer and mapped to 22 visemes using Microsoft Azure Speech Service definitions. To isolate language priors, text-only 2-gram and 5-gram models are trained via KenLM on 11.1M LRS3 training tokens, taking only the first K phonemes as input to predict target words using sequence scores combined with log-transformed word frequencies.

For evaluation, Levenshtein distance-based metrics are used: Word Error Rate (WER), Character Error Rate (CER), Phoneme Score (PS), and Viseme Score (VS). Human baseline performance is established using the MaFI dataset, which contains Mouth and Facial Informativeness scores for 2,189 English words rated by 410 participants (-2.5 to 0 scale, where higher values indicate easier visual clarity). Spearman rank correlations, Human-Human Alignment Scores (HHAS) via split-half reliability with Spearman-Brown correction, and Human Alignment Scores (HAS) are computed to measure human-machine perceptual agreement across high-clarity (MaFI > -1, N=1,056) and low-clarity (MaFI <= -1, N=1,133) splits.

## Experimental setup

Evaluated on 2,189 word-level test samples from the MaFI dataset and referenced against LRS3 benchmark results (Small/Large SL: 250M params, 20.3%–24.6% WER; AV-HuBERT: 95M params, 28.6% WER; VSP-LLM: 7B params, 25.4% WER). Metrics include WER, CER, PS, VS, Spearman's rho for alignment and MaFI correlations, and R² variance explained. All VSR models use publicly released pretrained weights.

## Results

Auto-AVSR-Large achieves a 0.65 WER and 0.30 CER on MaFI, outperforming the human baseline (0.83 WER, 0.65 CER). At the phoneme and viseme levels, Auto-AVSR-Large achieves a PS of 0.87 and VS of 0.82, representing relative improvements of 23% and 55% over human scores (PS 0.71, VS 0.53). Conversely, VSP-LLM underperforms humans across all metrics (1.98 WER, 1.06 CER, 0.53 PS, 0.44 VS), often generating multi-word outputs for single-word inputs. Text-only n-gram models given only K=3 initial phonemes achieve 41% word accuracy on MaFI, surpassing human visual lipreading (17%) and rivaling Auto-AVSR-Large (35%).

Model error rates correlate more strongly with training word frequency (mean |rho| = 0.35) than with human visual difficulty/MaFI scores (|rho| = 0.22). Human word-level alignment scores (HAS) for models are exceptionally low: Auto-AVSR-Large achieves rho = 0.37 (R² = 0.12), well below the human ceiling (HHAS = 0.74). Furthermore, while humans show strong correlations between performance and visual clarity (MaFI VS rho = 0.88, PS rho = 0.83), VSR models show 3x weaker correlations (Auto-AVSR-Large VS rho = 0.29, PS rho = 0.27). When visual clarity drops from high to low, humans suffer a 38% drop in VS, whereas Auto-AVSR-Large drops only 14% in VS but experiences a 64% increase in WER, proving models maintain sub-lexical articulation features without successfully mapping them to correct words.

| System | WER ↓ | CER ↓ | PS ↑ | VS ↑ |
|---|---|---|---|---|
| Human Baseline | 0.83 | 0.65 | 0.71 | 0.53 |
| Auto-AVSR-Large | 0.65 | 0.30 | 0.87 | 0.82 |
| Auto-AVSR-Small | 1.11 | 0.56 | 0.75 | 0.66 |
| AV-HuBERT | 0.96 | 0.47 | 0.80 | 0.71 |
| VSP-LLM | 1.98 | 1.06 | 0.53 | 0.44 |

## Limitations

The study is restricted to isolated English words from the MaFI dataset and does not evaluate continuous speech sequences or multi-word sentence contexts. It is limited to English-language models and datasets, and does not test multilingual capabilities or audio-visual fusion scenarios (e.g., noisy cocktail-party environments).

## Why read this

Speech and ML researchers should read this paper to understand that current VSR benchmark gains are heavily driven by language priors rather than human-like visual perception, necessitating a pivot toward human-aligned loss functions and evaluation metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic evaluation frameworks for speech perception models, improving audio-visual speech recognition robustness, and guiding the design of human-aligned training objectives for VSR.

## Institutions / 機構

Trinity College Dublin

**Funding / 經費:** Research Ireland

## Related

- (link related pages by id as the wiki grows)
