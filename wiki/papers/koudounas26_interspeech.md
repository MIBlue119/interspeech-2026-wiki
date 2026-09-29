---
id: koudounas26_interspeech
category: health-clinical
labels: [low-resource, generative-model]
institutions: ["Sony Group Corporation", "Kore University of Enna", "Universita degli Studi di Palermo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2313
pdf: https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.pdf
---

# Synthetic Pathological Speech at Scale: A Flow Matching Approach for Clinical Data Augmentation

*Alkis Koudounas, Moreno La Quatra, Quentin Jodelet, Hayato Futami, Valerio Mario Salerno, Sabato Marco Siniscalchi, Emiru Tsunoo*

[PDF](https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2313)

**Category:** `health-clinical` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — This paper adapts F5-TTS with clinical status token conditioning to synthesize pathological and healthy sustained vowels for data augmentation, showing that classifiers trained on 100k synthetic samples outperform real-data baselines by +3.9% accuracy and +13.3% sensitivity.

## Key contributions

- Adapted F5-TTS for clinical voice synthesis using binary status token conditioning (<healthy> or <pathological>) to control acoustic characteristics during generation.
- Conducted the first systematic scaling laws study for synthetic data in speech pathology detection, generating synthetic sets from 100 to 100,000 samples.
- Demonstrated strong cross-domain generalization, achieving up to +7.4% / +10.0% F1 gains on multi-class pathology classification and +6.8% accuracy on zero-shot Parkinson's detection.

## Problem

Deep learning models for pathological voice detection are heavily constrained by data scarcity, imbalance, and a lack of acoustic diversity. Traditional data augmentation methods (e.g., pitch shifting, noise, spectral warping) fail because linear transformations cannot capture the complex, non-linear glottal instabilities, jitter, shimmer, and aperiodicity that define vocal fold disorders. This bottleneck prevents discriminative models from generalizing across different acoustic environments, languages, and disease severities.

## Method

The authors employ F5-TTS, a non-autoregressive Conditional Flow Matching (CFM) framework that defines a continuous transformation between a Gaussian prior and target mel-spectrogram features via a learned vector field. The model operates on 80-bin mel-spectrograms at 24 kHz (1024 FFT, 256 hop length) using a Diffusion Transformer (DiT) architecture equipped with long-skip connections, Rotary Positional Embeddings (RoPE), and cross-attention over phoneme encoder embeddings. Clinical status conditioning is implemented by prepending status tokens (<i> or <pathological>) to the phonetic transcription (e.g., '/a/') during training, which conditions the DiT via cross-attention to implicitly model physiological aperiodicity and glottal perturbation. During inference, reference-guided synthesis pairs each text prompt with a reference recording matching the target class to secure speaker identity and prosody, integrating the vector field via an adaptive ODE solver with Sway sampling near t=1.

For downstream evaluation, pretrained self-supervised learning (SSL) encoders—specifically HuBERT pretrained on AudioSet (HuBERT-AS)—extract frame-level representations from raw audio. These are pooled via temporal mean pooling and passed through a two-layer MLP classification head with LayerNorm, GELU, and dropout, trained using inverse-frequency weighted cross-entropy loss to handle class imbalance.

## Experimental setup

The generative model is trained on 7,211 sustained vowel recordings (3,230 healthy, 3,981 pathological) pooled from four corpora: SVD (German), AVFAD (Portuguese), VOICED (Italian), and PVQD (English), split 80/20 into 5,769 training and 1,442 test samples. F5-TTS is trained for 150K steps using AdamW with a 1e-5 learning rate, 1,500 warmup steps, and a 200-frame batch size on a single NVIDIA A100. Classifiers use HuBERT-AS as the backbone and are evaluated using speaker-level 10-fold cross-validation on the training partition and evaluated on the held-out real test set, alongside OOD datasets (FEMH, IPV, and PC-GITA for zero-shot Parkinson's detection).

## Results

Classifiers trained solely on 100k synthetic samples achieved an accuracy of 0.836, F1 macro of 0.831, and sensitivity of 0.907, surpassing the real-only baseline (0.804 accuracy, 0.803 F1) by +3.9% accuracy and +13.3% sensitivity. In contrast, standard data augmentation (Real++) yielded negligible gains over the real baseline. For multi-class out-of-domain classification, real data augmented with 100k synthetic samples improved F1 macro scores to 0.315 (+10.0%) on FEMH and 0.571 (+7.4%) on IPV. For zero-shot Parkinson's disease detection on PC-GITA, augmentation with 10k synthetic samples peaked at 0.647 accuracy (+6.8% over real-only), whereas excessive scaling to 100k samples degraded performance (0.607 accuracy), indicating that moderate synthetic volume prevents overfitting to general pathology at the expense of disease-specific motor signatures.

| Train Data | Acc. | F1 Macro | Sensitivity | Specificity |
|---|---|---|---|---|
| Real-only | 0.804 | 0.803 | 0.800 | 0.810 |
| Synth-only 100 | 0.554 | 0.553 | 0.455 | 0.677 |
| Synth-only 1k | 0.575 | 0.560 | 0.354 | 0.847 |
| Synth-only 10k | 0.744 | 0.731 | 0.877 | 0.581 |
| Synth-only 100k | 0.836 | 0.831 | 0.907 | 0.748 |

## Limitations

The generation setup relies heavily on matching reference audio to impart speaker identity, which risks retaining speaker-specific traits and limits cross-speaker generalization without identity disentanglement. The binary health conditioning (<healthy> vs <pathological>) lacks fine-grained severity granularity, and the sole reliance on sustained vowels misses the acoustic complexities of connected speech and spontaneous dialogue.

## Why read this

Researchers and engineers working on medical speech processing or clinical data augmentation should read this paper to see how flow matching can successfully model non-linear glottal instabilities and scale synthetic clinical data to outperform real-data baselines.

## Code

- https://github.com/koudounasalkis/Pathology-F5TTS

## Applications

Automated voice disorder screening, early non-invasive neurodegenerative disease detection (e.g., Parkinson's), and clinical data augmentation for low-resource medical datasets.

## Institutions / 機構

Sony Group Corporation, Kore University of Enna, Universita degli Studi di Palermo

**Funding / 經費:** D.A.R.E. - Digital Lifelong Prevention

## Related

- (link related pages by id as the wiki grows)
