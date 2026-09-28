---
id: park26h_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3025
pdf: https://www.isca-archive.org/interspeech_2026/park26h_interspeech.pdf
---

# AnimeScore: A Preference-Based Dataset and Framework for Evaluating Anime-Like Speech Style

[PDF](https://www.isca-archive.org/interspeech_2026/park26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3025)

**TL;DR** — AnimeScore is a preference-based dataset and automated evaluation framework for Japanese anime-style speech, achieving up to 90.8% ROC-AUC using SSL-based ranking models.

## Problem

Evaluating domain-specific speech styles like anime-likeness lacks a universally shared absolute numerical scale, rendering traditional Mean Opinion Score (MOS) protocols inconsistent. Relying exclusively on manual listening tests creates a major bottleneck for iterative development of generative speech models. Furthermore, simplistic acoustic heuristics like high pitch fail to capture the multidimensional perceptual cues underlying stylized character voices.

## Method

The framework utilizes 15,000 pairwise preference judgments collected from 187 evaluators across a filtered set of 3,000 utterances derived from anime (Anim-400k) and general speech corpora (ReazonSpeech, Coco-Nut). To predict preferences, an input audio waveform is passed through a frozen self-supervised learning (SSL) encoder, followed by a BiLSTM, mean pooling, and an MLP to output a scalar score. The network is optimized end-to-end via a pairwise logistic loss (RankNet objective) on A/B comparison pairs. Evaluated backbones include wav2vec 2.0, WavLM, HuBERT, and data2vec.

## Results

Using held-out A/B comparison pairs (N=2,500), handcrafted acoustic features reach a logistic regression AUC ceiling of 69.3%. In contrast, SSL-based ranking models substantially outperform this baseline, with HuBERT achieving the highest performance at 90.8% AUC (0.3852 NLL, 82.43% accuracy), followed closely by WavLM at 89.4% AUC. Masked-prediction models consistently surpass contrastive models because they better capture paralinguistic, prosodic, and speaker properties.

## Code

- https://github.com/sizigi/animescore

## Applications

Engineers and researchers developing generative speech or voice conversion systems can use this framework as an automated evaluation metric or as a reward signal for reinforcement learning style optimization.

## Limitations

The study is constrained by moderate data scale, demographic imbalances among annotators (76% male, heavily skewed toward ages 30-50), and a lack of model architecture ablations beyond testing different SSL backbones.

## Related

- (link related pages by id as the wiki grows)
