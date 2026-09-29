---
id: kawamura26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1662
pdf: https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.pdf
---

# PASQA: Pitch-Accent-Focused Speech Quality Assessment Model Trained on Synthetic Speech with Accent Errors

*Masaya Kawamura, Yuma Shirahata, Kentaro Mitsui, Reo Shimizu*

[PDF](https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1662)

**Category:** `resources-evaluation`

**TL;DR** — PASQA is a specialized speech quality assessment model explicitly designed to detect localized pitch-accent errors in synthetic Japanese speech, achieving an SRCC of 0.828 with human judgments compared to near-zero correlations for traditional utterance-level MOS predictors.

## Key contributions

- Constructed a large-scale Japanese accent-error dataset containing over 2.89 hours across 2.13 million speech samples by systematically corrupting accent nuclei using an accent-controllable TTS system.
- Introduced PASQA, an SSL-based quality assessment architecture leveraging mora-conditioned cross-attention, a pairwise ranking loss, an auxiliary frame-level error detection head, and gradient reversal for speaker invariance.
- Demonstrated that traditional utterance-level MOS predictors (DNSMOS, NISQA, UTMOS) are completely insensitive to localized pitch-accent errors, showing near-chance severity ordering accuracy.
- Validated PASQA's robustness on out-of-domain (OOD) TTS models (GPT-4o-mini-TTS), achieving a significantly higher pairwise accuracy (0.780) in matching human preference compared to baselines.

## Problem

Traditional mean opinion score (MOS) prediction models estimate global utterance-level naturalness but fail to detect localized prosodic degradations such as Japanese pitch-accent errors, where a misplaced accent nucleus alters lexical meaning. Because real-world TTS datasets lack fine-grained accent error labels and modern neural TTS architectures keep internal prosodic representations hidden, evaluating accent correctness directly from the speech waveform remains an unaddressed challenge. Developing an automated assessor is crucial because human listening tests are costly and existing general-purpose metrics are blind to phonemic pitch shifts.

## Method

PASQA builds upon a wav2vec 2.0 self-supervised learning backbone operating on 16 kHz waveforms to extract frame-level acoustic representations. To incorporate linguistic constraints, text-derived mora sequences are embedded into 256 dimensions, contextualized via a 1-layer Transformer encoder with rotary positional encoding and 4 heads, and fused with acoustic features using cross-attention (256 dimensions, 4 heads). 

For training objectives, the model utilizes a multi-task setup combining an L1 score loss, a pairwise logistic ranking loss (inspired by the Bradley-Terry model) calculated over unique mini-batch pairs to prioritize relative severity ordering, an auxiliary binary cross-entropy loss on a frame-level error head to predict temporal accent-error locations derived from TTS phoneme durations, and a speaker-adversarial branch using a gradient reversal layer (GRL) with a scheduled scaling factor (gamma = 10) to eliminate speaker-specific acoustic bias.

The final scalar accent-quality prediction is mapped via a two-layer MLP with a hidden size of 64 and a tanh range clipping function yielding a [1, 5] score interval. Training is performed using SGD with a learning rate of 1e-3, momentum of 0.9, batch size of 16, and gradient clipping norm of 1.0 for up to 100,000 steps, utilizing loss weights set to 1.5, 0.5, 0.2, and 0.1 for the ranking, L1, frame-error, and speaker GRL losses respectively.

## Experimental setup

The accent-error dataset was generated using NANSY-TTS trained on an internal corpus of 207.96 hours (17 speakers, 173,987 samples), creating 91,157 source sentences manipulated into three severity tiers: error-free (r=0), low-severity (r in [0.1, 0.2]), and high-severity (r in [0.8, 0.9]), splitting into 2,130,858 training samples (2,898.79 hours) and a test set containing 1,170 seen-speaker samples and 2,400 unseen-speaker samples. Baselines include DNSMOS P.835, DNSMOS P.808, NISQA, SHEET SSL-MOS, UTMOS, UTMOSv2, an acoustic feature baseline using WORLD vocoder features (ACC-WORLD-MOS), and an SSL-MOS baseline trained only with L1 loss (ACC-SSL-MOS). Evaluation metrics include severity order accuracy, Pearson's LCC, Spearman's rank correlation (SRCC), and Kendall's tau (KTAU) alongside human listening tests with 15 native speakers and OOD tests using GPT-4o-mini-TTS.

## Results

On the seen-speaker evaluation set, PASQA achieved a severity order accuracy of 0.754, an LCC of 0.829, an SRCC of 0.711, and a KTAU of 0.524, outperforming ACC-SSL-MOS (order accuracy 0.710, SRCC 0.666) and drastically beating traditional unadapted models like UTMOS (order accuracy 0.133). On unseen speakers, PASQA reached 0.785 order accuracy and 0.751 SRCC. Ablation experiments proved the necessity of all proposed modules, showing that removing the gradient reversal layer dropped seen-speaker order accuracy to 0.662, while omitting mora-conditioned fusion and the frame error head degraded SRCC to 0.628 and 0.658 respectively. In subjective listening tests against human ratings, PASQA achieved top-tier correlation with an SRCC of 0.828 and KTAU of 0.614, significantly outperforming standard MOS models.

| System | Seen Order Acc. | Seen SRCC | Unseen Order Acc. | Unseen SRCC |
|---|---|---|---|---|
| DNSMOS P.835 | 0.200 | -0.001 | 0.121 | -0.057 |
| UTMOS | 0.133 | -0.013 | 0.121 | -0.041 |
| ACC-WORLD-MOS | 0.346 | 0.036 | 0.339 | 0.040 |
| ACC-SSL-MOS | 0.710 | 0.666 | 0.738 | 0.724 |
| PASQA (Proposed) | **0.754** | **0.711** | **0.785** | **0.751** |

## Limitations

The evaluation is currently limited strictly to the Japanese language and Tokyo dialect pitch-accent rules due to reliance on specific morphological analyzers and accent-label prediction modules. The training data consists entirely of synthetic speech generated from a single TTS architecture (NANSY-TTS), which could introduce synthetic artifacts that bias the model, although cross-TTS generalization was partially verified via GPT-4o-mini-TTS. Absolute score calibration shows higher MSE against human ratings because pseudo-scores do not perfectly map to human rating distributions.

## Why read this

Speech and ML researchers building automated evaluation metrics for text-to-speech systems will learn how to inject linguistic features and ranking losses into self-supervised backbones to capture fine-grained prosodic errors that standard utterance-level MOS models miss.

## Code

- https://github.com/lycorp-jp/PASQA

## Applications

Automated regression testing and real-time quality control for text-to-speech synthesis pipelines, specifically targeting prosodic accuracy and accent preservation.

## Institutions / 機構

LY Corporation

## Related

- (link related pages by id as the wiki grows)
