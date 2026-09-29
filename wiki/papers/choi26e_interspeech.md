---
id: choi26e_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
institutions: ["Korea University"]
code: https://github.com/slp-lab-research/siser.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2186
pdf: https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.pdf
---

# SISER: Speaker-Invariant Speech Emotion Recognition with Entropy-Based Adversarial Training

*Eunseo Choi, Hyunku Kang, Chanwoo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2186)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — SISER integrates wav2vec 2.0 with an ECAPA-TDNN speaker discriminator under an entropy-based adversarial training framework for speech emotion recognition, achieving an unweighted accuracy of 60.63% on IEMOCAP test sets without data augmentation.

## Key contributions

- Proposes a speaker-invariant speech emotion recognition (SER) framework combining wav2vec 2.0 feature encoders with an ECAPA-TDNN adversarial speaker classifier.
- Replaces standard gradient reversal with an entropy maximization objective to explicitly target a uniform posterior distribution over all speaker identities.
- Demonstrates via ablation that a high-capacity speaker discriminator architecture (ECAPA-TDNN) provides stronger adversarial pressure, significantly outperforming shallow linear classifiers.
- Matches augmented baseline performance without relying on speed-perturbation data augmentation while reducing cross-fold variance.

## Problem

Speech emotion recognition (SER) suffers from performance degradation due to inter-speaker variability and severe data scarcity, causing models trained on fixed speakers to overfit to speaker-specific correlations instead of generalizing to unseen domains. Prior adversarial approaches mitigate this using gradient reversal layers and shallow linear speaker classifiers, but these fail to adequately strip speaker-identifying traits from powerful self-supervised feature encoders. This limitation stems from weak adversarial pressure and an unconstrained target distribution, leaving rich speaker cues entangled with affective content in the latent space.

## Method

The architecture comprises three core modules: a feature encoder (ENC), an emotion classifier (EC), and a speaker classifier (SC). ENC uses a pre-trained wav2vec 2.0 base model that maps raw waveforms to frame-level contextualized representations, with fine-tuning applied exclusively to the final two transformer layers during training. EC consists of three fully connected layers with PReLU activations mapping utterance embeddings to emotion categories using a cross-entropy objective. SC is instantiated as an ECAPA-TDNN incorporating squeeze-and-excitation residual blocks and multi-scale temporal context aggregation, mapping encoder outputs to a linear speaker classification layer.

The training follows an adversarial two-step alternating routine. First, SC is updated by minimizing standard speaker cross-entropy loss over training identities. Second, ENC and EC are jointly optimized by combining emotion cross-entropy loss with an entropy maximization loss that penalizes predictable speaker inference by driving SC's posterior distribution toward uniform entropy across all training speakers. The objectives are balanced via a weighting parameter $\lambda = 0.5$. By employing ECAPA-TDNN instead of a shallow classifier, the adversarial gradient feeds back channel-wise attention and multi-temporal scale feedback, forcing the encoder to completely strip away speaker-specific acoustic patterns.

## Experimental setup

Evaluated on the IEMOCAP dataset containing 5,531 utterances across four emotion classes (angry, happy/excited, neutral, sad) split into 10 speaker-independent sessions. The setup follows a 10-fold leave-one-session-out cross-validation protocol using 8 speakers for training, 1 for validation, and 1 for testing. Models are trained for 300 epochs with the Adam optimizer using a learning rate of $1 \times 10^{-4}$ and batch size of 64 on a single NVIDIA A100 GPU.

## Results

On the IEMOCAP test set, SISER achieves 60.63% unweighted accuracy (UA) and 58.53% weighted accuracy (WA), outperforming the unaugmented baseline (51.15% UA / 50.14% WA) by 9.48% UA and the vanilla wav2vec 2.0 model without speaker suppression (56.46% UA). Notably, SISER's performance matches traditional augmented baselines (59.91% UA) without applying any speed-perturbation data augmentation. Across 10-fold cross-validation, the framework yields a mean UA of 62.73% ± 1.72, showing substantially lower variance than the baseline (54.20% ± 3.55).

Ablation studies confirm that swapping a shallow fully connected speaker classifier for ECAPA-TDNN yields a massive +7.13% UA gain for CNN+GRU encoders and +6.49% UA for wav2vec 2.0, proving that discriminator capacity is critical for effective feature disentanglement.

| System | Test UA (%) | Test WA (%) | Validation UA (%) | Validation WA (%) |
|---|---|---|---|---|
| CNN + Grus (Baseline) [12] | 51.15 | 50.14 | 54.51 | 54.20 |
| wav2vec 2.0 (Vanilla) | 56.46 | 54.45 | 59.22 | 59.17 |
| wav2vec 2.0 + ECAPA + GRL | 56.95 | 56.01 | 58.93 | 58.69 |
| SISER (Ours, Entropy) | 60.63 | 58.53 | 62.37 | 61.64 |

## Limitations

The evaluation is restricted solely to the IEMOCAP corpus, limiting proof of generalization across diverse acoustic domains, languages, and recording conditions. The framework only unfreezes the top two transformer layers of wav2vec 2.0, potentially restricting the encoder's adaptation scope. Furthermore, computational overhead increases significantly during training due to the heavy ECAPA-TDNN backbone serving as the adversarial discriminator.

## Why read this

Speech researchers tackling domain mismatch and speaker bias in affective computing should read this to understand how high-capacity speaker verification models can act as adversarial discriminators. It demonstrates that discriminator capacity matters more for disentanglement than raw feature extractor upgrades alone.

## Code

- https://github.com/slp-lab-research/siser.git

## Applications

Cross-speaker speech emotion recognition systems, empathetic dialogue agents, and call-center affective monitoring.

## Institutions / 機構

Korea University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
