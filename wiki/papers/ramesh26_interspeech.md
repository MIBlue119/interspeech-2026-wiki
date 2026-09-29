---
id: ramesh26_interspeech
category: asr
institutions: ["Indian Institute of Technology Hyderabad"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2568
pdf: https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.pdf
---

# Duration-Aware Soft Targets for Text-Independent Supervised Phone Segmentation

*Raghavan Ramesh, Meka Nani, Sri Rama Murty Kodukula*

[PDF](https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2568)

**Category:** `asr`

**TL;DR** — This paper proposes duration-aware soft targets to model phonetic transition uncertainty in text-independent supervised phone segmentation, achieving a state-of-the-art R-value of 91.53% on TIMIT using a simple BiGRU architecture. By softening ground-truth hard boundaries with duration-proportional Gaussian pulses, the method significantly reduces spurious peaks and improves cross-dataset and multilingual generalization.

## Key contributions

- Replaces brittle single-frame hard boundaries with duration-aware soft targets (Gaussian, uniform, or triangular pulses) that scale standard deviation proportionally to neighboring phone durations.
- Achieves a 91.53% R-value on TIMIT and 86.23% on Buckeye using a standard, lightweight BiGRU model without costly structured loss functions or autoregressive decoding.
- Demonstrates robust out-of-domain and multilingual generalization on unseen datasets including Buckeye, German, Telugu, and Hindi.
- Provides comprehensive transition-type analysis showing soft targets excel particularly at hard-to-detect same-source/different-filter phonetic boundaries (+3.4% relative accuracy).

## Problem

Traditional text-independent supervised phone segmentation treats acoustic boundaries as instantaneous, single-frame hard binary events. However, acoustic phone transitions in natural speech are inherently gradual, meaning hard targets fail to capture temporal transition uncertainty and lead to high rates of false alarms (over-segmentation). While prior works attempt to fix this via complex structured loss functions, heavy auto-regressive models, or self-supervised feature clustering, they drastically increase computational overhead without tackling the root issue of supervision target quality.

## Method

The architecture comprises a two-layer bidirectional Gated Recurrent Unit (BiGRU) network with a hidden dimension of 39 units. The input features are 39-dimensional Mel-Frequency Cepstral Coefficients (MFCCs, including deltas and delta-deltas) extracted using a 30 ms frame size and 10 ms frame stride. The output of the BiGRU passes through a linear projection from 78 to 1 dimensions, followed by a sigmoid activation function to output frame-level boundary probabilities.

Instead of 0/1 hard targets, the supervision signal is transformed using a spread ratio hyperparameter (K = 0.2) multiplied by the left duration (t1) and right duration (t2) of adjacent phone boundaries. This defines the spread of unnormalized zero-mean half-Gaussian pulses (or alternative uniform/triangular kernels) on either side of the hard pivot, where standard deviations are proportional to Nl/2 and Nr/2. The model is trained using a weighted binary cross-entropy (BCE) loss, with positive class weights (w+) set to 4 for soft targets and 5 for hard targets to mitigate severe class imbalance. During inference, boundaries are extracted from the predicted probability curve using SciPy's prominence-based peak detection.

## Experimental setup

Evaluated on the TIMIT and Buckeye corpora for in-domain and 1-hour cross-dataset generalization. Multilingual evaluation uses 3 hours of German (Carina dataset), 1 hour of Telugu (Microsoft/SpeechOcean), and 1 hour of Hindi (IIT Madras ASR challenge). Metrics include Precision (P), Recall (R), F1-score (F), and R-value evaluated within a 20 ms tolerance window, alongside a clustered McNemar test using Generalized Estimating Equations (GEE). The baseline BiGRU model is trained with a learning rate of 10^-3, averaging results over 5 random seeds.

## Results

On the TIMIT test split, the proposed soft-target BiGRU achieves an R-value of 91.53% and F1 of 90.15%, outperforming the hard-target baseline (89.50% R-value) and prior benchmarks such as SEGFEAT (86.28%) and SuperSeg Non-AR (85.56%). On the Buckeye corpus, it reaches an R-value of 86.23% (vs 84.47% for hard targets). Ablations testing uniform, triangular, and Gaussian smoothing kernels show virtually identical R-values (91.64%, 91.32%, and 91.53% respectively), proving that performance gains stem from the act of target smoothing rather than a specific kernel choice. Soft targets yield a 40% reduction in spurious false peaks per utterance.

| Model | TIMIT P | TIMIT R | TIMIT F | TIMIT R-value |
|---|---|---|---|---|
| SEGFEAT [6] | 94.30 | 80.78 | 87.01 | 86.28 |
| SuperSeg (Non-AR) [12] | 83.69 | 82.54 | 83.11 | 85.56 |
| Ours (Hard) | 87.40 | 88.04 | 87.72 | 89.50 |
| Ours (Soft) | 90.51 | 89.79 | 90.15 | 91.53 |

## Limitations

The current approach relies on a fixed spread ratio hyperparameter (K = 0.2) rather than dynamically adapting to context or speaking rate. Evaluation is currently constrained to phonetically transcribed speech corpora and standard acoustic features (MFCCs), omitting large-scale continuous speech or direct testing on raw self-supervised representations without forced alignments.

## Why read this

Speech and ML researchers working on acoustic segmentation or forced alignment should read this paper to understand how modifying target supervision geometry can drastically outperform complex architectures and loss functions. It provides a lightweight, easily reproducible recipe for upgrading existing boundary-detection pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improved phone segmentation and boundary localization for automatic speech recognition, keyword spotting, forced alignment, and low-resource speech processing systems.

## Institutions / 機構

Indian Institute of Technology Hyderabad

## Related

- (link related pages by id as the wiki grows)
