---
id: hu26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-304
pdf: https://www.isca-archive.org/interspeech_2026/hu26_interspeech.pdf
---

# ArtNet: A JEPA-Like Articulatory Predictive Framework for Robust Zero-Shot Phoneme Recognition

*Zeqian Hu, Fuliang Weng, Shu Shang, Yaqian Zhou*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-304)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — ArtNet introduces a JEPA-like articulatory predictive framework with a variational information bottleneck to suppress language-specific variations, achieving a 20.56% relative phoneme error rate reduction in zero-shot cross-lingual transfer.

## Key contributions

- Formulates zero-shot cross-lingual phoneme recognition as a non-generative, structured articulatory prediction task inspired by JEPA.
- Integrates a lightweight articulatory predictor with a variational information bottleneck (VIB) to strip language-specific variations from SSL representations.
- Proposes vector-space inventory alignment (VSIA) as a zero-shot inference strategy using angular proximity in a continuous articulatory space.
- Demonstrates mitigation of the substitution error bottleneck in zero-shot transfer, improving both in-vocabulary and out-of-vocabulary generalization.

## Problem

Direct acoustic-to-symbol mapping in standard SSL-based phoneme recognizers is brittle because models overfit to source-language acoustic fluctuations and prosodic patterns. Cross-lingual performance collapses primarily due to massive substitution errors—contrarily affecting both in-vocabulary (61.6%) and out-of-vocabulary phonemes—when transferring to unseen languages. Existing auxiliary linguistic methods fail to enforce intrinsic frontend robustness or adequately disentangle universal phonetic properties from language-specific traits.

## Method

The framework leverages mHuBERT-147 (95M parameters, 12 layers, 768 hidden dimensions) as an SSL context encoder, initialized via a CTC objective and frozen during ArtNet training. Orthographic transcripts are converted to IPA using Epitran and mapped via the Panphon database into a static 24-dimensional trinary articulatory matrix, transformed into numeric values {-1, 0, 1}. Frame-level pseudo-labels generate ground-truth articulatory vectors.

To eliminate noise, hidden states are fed into a VIB encoder predicting multivariate Gaussian parameters (mu and sigma) for a 128-dimensional stochastic latent variable z_t. An articulatory predictor (AP) then minimizes mean squared error (MSE) against the ground-truth articulatory vector, regularized by KL divergence against a standard normal prior with trade-off parameter beta = 0.001.

During inference, a segment pooling strategy groups consecutive non-blank frames, and vector-space inventory alignment (VSIA) performs a nearest-neighbor angular proximity search (cosine similarity) against the target language phoneme inventory to output final symbols.

## Experimental setup

The model is trained solely on the 100-hour LibriSpeech train-clean-100 corpus (English) and evaluated zero-shot on the test sets of 7 Multilingual LibriSpeech languages (German, Dutch, French, Spanish, Italian, Portuguese, Polish). Evaluations use Phoneme Error Rate (PER) and Phoneme Feature Error Rate (PFER). Optimization uses the Adam optimizer with a learning rate warming up to 1e-3, utilizing LoRA for the initial phoneme recognizer and training TDNN, MLP, or LSTM configurations for the AP and VIB modules.

## Results

The complete ArtNet system paired with VSIA achieves an average PER of 45.54% across the 7 unseen languages, representing a 20.56% relative reduction over the baseline (57.33%), alongside a 7.01% relative improvement in PFER (down to 12.73% from 13.69%). In Spanish, absolute PER drops by approximately 28.26 percentage points when combining baseline mapping with VSIA/ArtNet. Ablations of the AP backbone show that a local context Time Delay Neural Network (TDNN) achieves the lowest average PER (54.94% unaligned) compared to a global context LSTM (56.51%) and context-free MLP (55.33%), proving that global source prosody introduces harmful language-specific biases.

| System | Dutch | French | German | Italian | Polish | Portuguese | Spanish | Avg PER |
|---|---|---|---|---|---|---|---|---|
| Baseline | 59.67 | 59.33 | 52.63 | 54.43 | 55.08 | 61.38 | 58.76 | 57.33 |
| ArtNet | 58.64 | 56.84 | 51.63 | 51.73 | 50.24 | 59.94 | 55.57 | 54.94 |
| Baseline+tr2tgt | 56.12 | 56.54 | 50.48 | 46.07 | 41.01 | 58.02 | 34.27 | 48.93 |
| ArtNet+VSIA | 55.40 | 53.75 | 50.04 | 39.96 | 35.18 | 53.93 | 30.50 | 45.54 |

## Limitations

The evaluation is restricted to Indo-European languages within the Multilingual LibriSpeech dataset, leaving tonal languages and non-alphabetic writing systems unexplored. The dependency on Epitran and Panphon limits language coverage to those with well-mapped IPA phonological definitions. Furthermore, the framework relies heavily on a pre-existing source language pairing and does not investigate fully unsupervised phoneme discovery without a G2P tool.

## Why read this

Speech researchers and engineers working on low-resource or zero-shot ASR should read this to understand how JOINT-Embedding Predictive Architecture (JEPA) principles and articulatory bottleneck representations can replace fragile direct acoustic-to-symbol decoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource zero-shot automatic speech recognition and cross-lingual phonetic transfer for unwritten or under-resourced languages.

## Institutions / 機構

Fudan University, Logos & Dialogos

## Related

- (link related pages by id as the wiki grows)
