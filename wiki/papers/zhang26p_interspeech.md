---
id: zhang26p_interspeech
category: deepfake-security
labels: [dataset-or-benchmark-release]
institutions: ["Duke Kunshan University", "Chinese University of Hong Kong, Shenzhen", "OfSpectrum"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1187
pdf: https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.pdf
---

# MultiAPI Spoof: A Multi-API Dataset and Local-Attention Network for Speech Anti-spoofing Detection

*Xueping Zhang, Zhenshan Zhang, Yechen Wang, Linxi Li, Liwei Jin, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1187)

**Category:** `deepfake-security` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces MultiAPI Spoof, a 230-hour speech anti-spoofing dataset spanning 30 distinct APIs, and Nes2Net-LA, a local-attention enhanced model that achieves state-of-the-art detection and zero-shot API tracing performance.

## Key contributions

- Introduces MultiAPI Spoof, a 230-hour multi-API speech anti-spoofing dataset generated across 30 commercial services, open-source models, and online TTS platforms.
- Proposes Nes2Net-LA, which integrates a sliding-window local self-attention mechanism between nested multi-scale blocks to improve fine-grained spoofing feature extraction.
- Defines the novel API tracing task for fine-grained source attribution, classifying synthetic speech back to its exact generation API or detecting unseen APIs.
- Demonstrates that training on MultiAPI Spoof significantly boosts cross-domain robustness on external benchmarks such as ITW and AI4T.

## Problem

Traditional speech anti-spoofing benchmarks are constructed from a narrow, public set of open-source TTS/VC models, creating a severe domain gap against real-world systems driven by proprietary commercial APIs. Because modern generative pipelines evolve rapidly and hide their architectural and data details behind closed APIs, models trained solely on legacy benchmarks fail to generalize. Addressing this requires datasets reflecting heterogeneous real-world synthesis platforms and backend detectors capable of cross-source generalization and fine-grained API source tracking.

## Method

The architecture builds upon Nes2Net-X, which encodes raw audio into high-dimensional representations via an XLSR-300M backbone and splits channel subsets hierarchically through 1D-convolutions and weighted summation ($J = 8$). To overcome the limitation of strictly local, adjacent-block-only interactions in standard Nes2Net, Nes2Net-LA introduces a local scaled dot-product self-attention mechanism over a sliding-window neighborhood $N(i, j) = \{h_{i,k} | k \in [j - K, j + K]\}$ with window radius $K = 1$. The enhanced local features are combined with original representations via residual connections, concatenated, and fed into a fully connected layer for final classification.

For the anti-spoofing and API tracing tasks, the system processes 4-second normalized raw audio chunks (shorter clips are looped, longer ones truncated) without any data augmentations. Models are optimized using the Adam optimizer with cross-entropy loss, using a learning rate of $5 \times 10^{-6}$ for anti-spoofing and $1 \times 10^{-5}$ for API tracing (both with a weight decay of $1 \times 10^{-4}$). In the API tracing setup, the model treats the problem as a 22-class classification task (21 seen APIs plus 1 rejection class for predictions falling below a probability threshold for unseen APIs).

## Experimental setup

Experiments use six public datasets (TIMIT, ODSS, FoR, AI4T, ASV5, MLAAD) combined with the MultiAPI Spoof dataset (230 hours total, 1:1 bona fide to synthetic English speech split across 30 APIs: A0-A20 for training/dev/eval splits, A21-A23 for dev, A24-A29 for unseen eval). Baselines include XLSR+AASIST and XLSR+Nes2Net-X. Performance is evaluated using Equal Error Rate (EER), minimum Decision Cost Function (minDCF), actual Decision Cost Function (actDCF) for anti-spoofing, and Precision, Recall, and Macro-F1 for API tracing.

## Results

When trained without MultiAPI Spoof, XLSR+Nes2Net-X yields a high EER of 7.08% on the MultiAPI Spoof evaluation set; incorporating MultiAPI Spoof training data drops this EER dramatically to 0.69% (and minDCF from 0.098 to 0.008). On the ITW benchmark, XLSR+Nes2Net-LA achieves an EER of 1.42% and minDCF of 0.020, outperforming XLSR+Nes2Net (1.69% EER) and XLSR+AASIST (2.09% EER). For API tracing on unseen evaluation APIs (A24-A29), the model achieves high precision (0.972) but low recall (0.520) for the unseen class, demonstrating that while positive rejections are accurate, many unseen instances are misclassified into seen categories due to lack of distinct zero-shot clusters in embedding space.

| System | Training Data | ITW (EER% ↓) | AI4T (EER% ↓) | MultiAPI Seen (EER% ↓) | MultiAPI Unseen (EER% ↓) |
|---|---|---|---|---|---|
| XLSR+AASIST [37] | Data Collection 2 | 2.09 | 6.26 | 0.48 | 0.83 |
| XLSR+Nes2Net [30] | Data Collection 2 | 1.69 | 5.64 | 0.55 | 0.80 |
| XLSR+Nes2Net-LA (Ours) | Data Collection 2 | 1.42 | 5.64 | 0.48 | 0.62 |

## Limitations

The evaluation is restricted entirely to English speech, omitting multilingual and code-switched scenarios. Zero-shot API tracing remains a weak point, as unseen APIs fail to form separable clusters and frequently collapse into seen categories. Additionally, the study does not test resilience against severe channel codecs, environmental noise, or active adversarial perturbations since no data augmentation was applied.

## Why read this

Researchers building robust deepfake detectors or studying commercial API source attribution should read this to see how multi-source API training data and sliding-window local attention overcome domain shift.

## Code

- https://github.com/XuepingZhang/MultiAPI-Spoof

## Applications

Automated security screening for telephone and media platforms, digital forensics, and fine-grained source attribution of deepfake audio.

## Institutions / 機構

Duke Kunshan University, Chinese University of Hong Kong, Shenzhen, OfSpectrum

## Related

- (link related pages by id as the wiki grows)
