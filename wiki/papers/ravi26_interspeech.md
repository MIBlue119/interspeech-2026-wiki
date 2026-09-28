---
id: ravi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1355
pdf: https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.pdf
---

# Rank-Distance Based Confidence Estimation for ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ravi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1355)

**TL;DR** — The paper introduces RanD-CEM, a confidence estimation model for automatic speech recognition that uses probability rank and distribution distance to quantify partial transcript correctness, outperforming state-of-the-art baselines across multiple architectures and domains.

## Problem

Standard ASR decoders produce overconfident probability distributions that fail to reflect true accuracy, while existing auxiliary confidence estimation models use either binary targets that ignore partial correctness or temporal scores that suffer from alignment errors and true-class probability collapse. These limitations result in poorly calibrated confidence estimates, which degrades downstream tasks like error correction and speech translation. Addressing this gap is critical for making ASR outputs reliable and trustworthy in practical deployments.

## Method

The proposed RanD-CEM computes continuous word-level target scores by combining a normalized rank score (reflecting the position of the correct token in the posterior distribution) and a normalized Euclidean distance score (measuring the difference between the predicted posterior and the true one-hot distribution) via a mixing parameter alpha. The framework is integrated into four distinct ASR architectures: CTC, RNN-T, TDT, and AED, extracting respective encoder, decoder, or joint hidden representations and posteriors. The auxiliary confidence models are trained using shrinkage loss. For CTC-ASR, the CEM uses fully connected layers of sizes 512, 256, and 128 with ReLU activations and a sigmoid output.

## Results

Evaluated on Hindi (KB and PB datasets using Conformer-CTC) and English (LibriSpeech, NPTEL, and Svarah datasets using Conformer-Transducer, Parakeet-TDT, and Canary-Flash AED models), RanD-CEM is compared against Maximum Class Probability (MCP), entropy, binary-target S-CEM/MLP, and continuous-target baselines like TruCLeS and TeLeS. Performance is measured using MAE, KLD, JSD, NCE, ECE, AUROC, and AUPRC. RanD-CEM consistently improves calibration and discrimination, achieving higher AUROC/AUPRC and lower MAE and ECE across both in-domain and mismatched out-of-domain evaluation splits.

## Code

- https://github.com/Nagarathna-R/2026_RanDiS_Interspeech

## Applications

Speech and ML engineers building voice assistants, automated transcription systems, speech translation pipelines, and health diagnostics tools can use this method to reliably filter, correct, or weight ASR transcripts.

## Limitations

The reliance on rich model representations means the auxiliary confidence estimator may struggle or require adaptation in low-resource ASR scenarios where robust intermediate features are scarce.

## Related

- (link related pages by id as the wiki grows)
