---
id: kim26l_interspeech
category: deepfake-security
labels: [robustness-noise]
institutions: ["Incheon National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1483
pdf: https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.pdf
---

# Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation

*Donghee Kim, Wooil Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1483)

**Category:** `deepfake-security` · **Labels:** `robustness-noise`

**TL;DR** — The paper proposes an orthogonality-constrained feature decorrelation method for speech deepfake detectors to prevent overfitting to dataset-specific artifacts, reducing Equal Error Rates (EER) on challenging cross-corpus datasets like ASVspoof 2021 DF (from 6.64% to 3.67%) and In-the-Wild (from 11.22% to 8.84%).

## Key contributions

- Formulates a dual-branch architecture splitting spectral and temporal graph representations into domain-invariant common features and domain-specific attack features.
- Introduces an auxiliary 3-way classification task (bonafide/TTS/VC) on the specific branch to force it to capture attack-type and corpus-specific variations.
- Applies a cosine-similarity-based orthogonality regularization loss between common and specific features to encourage statistical independence and eliminate reliance on spurious shortcuts.
- Demonstrates consistent out-of-distribution generalization across multiple unseen target corpora without requiring complex multi-domain meta-learning or heavy external datasets.

## Problem

End-to-end speech deepfake detectors like RawNet2, RawGAT-ST, and AASIST are typically trained via standard empirical risk minimization (ERM), leading them to overfit to dataset-specific artifacts and superficial shortcuts (such as non-speech silence durations or codec noise). When exposed to unseen domains, diverse acoustic environments, lossy codecs, or novel spoofing algorithms, their Equal Error Rates (EER) can degrade dramatically (e.g., up to tenfold increases on in-the-wild datasets). This makes standard models unreliable for real-world security and anti-spoofing deployments where test data distribution shifts significantly from training data.

## Method

The proposed method builds upon the SSL-AASIST baseline, which extracts raw waveform representations using a Wav2Vec 2.0 XLS-R 300M front-end and builds spectral (Gs) and temporal (Gt) graphs via graph attention modules. Instead of feeding graph outputs directly to the final classifier, the feature maps of dimension d=64 are projected through two separate branches using SeLU activation: a common feature projector (W_com, mapping to d_com = 32) and a specific feature projector (W_spec, mapping to d_spec = 32). W_com and W_spec are shared between both spectral and temporal graphs.

The common branch feeds its features into the standard AASIST back-end for binary bonafide/spoof detection, guided by a binary cross-entropy main loss (L_main). The specific branch feeds its features into an auxiliary multi-layer perceptron (MLP) trained with a 3-way cross-entropy loss (L_aux) for bonafide vs. TTS vs. VC classification, which forces this branch to absorb domain- and attack-dependent artifacts.

To prevent the two branches from learning redundant or overlapping representations, an orthogonality regularization loss (L_ortho) is calculated as the cosine similarity between each pair of common and specific representations (Gs_com and Gs_spec, Gt_com and Gt_spec). The total training loss is defined as L_total = L_main + L_aux + L_ortho with equal weighting. During inference, only the common feature stream and the main AASIST classification head are evaluated for deepfake detection, while the specific branch and auxiliary head are discarded.

## Experimental setup

Evaluated on five datasets: ASVspoof 2019 LA (training: 2,580 bonafide, 22,800 spoofed; evaluation: 7,355 bonafide, 63,882 spoofed), ASVspoof 2021 LA, ASVspoof 2021 DF, ASVspoof 5 (ASV5), and In-the-Wild (ITW). Models are compared against the SSL-AASIST baseline, ProtoMAML (meta-learning adaptation), and SLIM (style-linguistics mismatch framework). Evaluation metric is Equal Error Rate (EER %). Implementation uses a Wav2Vec 2.0 XLS-R 300M front-end, batch size of 14, learning rate of 10^-6, and RawBoost augmentation (combining linear/non-linear convolutive noise LnL and impulsive signal-dependent additive noise ISD).

## Results

With RawBoost data augmentation, the proposed system achieves near-identical in-domain performance to the baseline on 19LA (0.32% vs 0.22%) and 21LA (0.92% vs 0.82%), but substantially outperforms it on out-of-domain cross-corpus benchmarks: reducing EER from 6.64% to 3.67% on ASVspoof 21DF, from 16.25% to 14.39% on ASV5, and from 11.22% to 8.84% on In-the-Wild (ITW). Compared to specialized robustness competitors like SLIM and ProtoMAML, the proposed method yields superior or competitive EERs across 21DF and ITW. Ablation tests demonstrate that adding the orthogonality loss (L_ortho) is critical, as using the auxiliary loss alone or combined without orthogonality fails to consistently improve OOD robustness.

| System | 19LA | 21LA | 21DF | ASV5 | ITW |
|---|---|---|---|---|---|
| Baseline [16] | 0.22% | 0.82% | 6.64% | 16.25% | 11.22% |
| ProtoMAML [20] | 1.35% | 6.39% | 6.05% | – | 16.29% |
| SLIM [21] | 0.20% | – | 4.40% | – | 12.50% |
| Proposed (main+aux+ortho) | 0.32% | 0.92% | 3.67% | 14.39% | 8.84% |

## Limitations

The evaluation relies heavily on standard logical access (LA) and compressed deepfake datasets, and while ITW tests real-world data, the auxiliary classification assumes a strict categorization (bonafide/TTS/VC) which may not capture novel generative paradigms like hybrid or end-to-end neural audio codecs. Furthermore, performance on clean source corpora (19LA/21LA) shows a negligible degradation or no improvement compared to the baseline, indicating that forcing domain-invariant common features can slightly trade off optimal in-domain calibration for OOD robustness.

## Why read this

Researchers and engineers working on domain generalization and robustness in speech deepfake detection will find this a clean, lightweight alternative to heavy meta-learning or multi-dataset fine-tuning pipelines. It provides an actionable blueprint for disentangling invariant authenticity cues from attack artifacts via auxiliary objectives and explicit feature decorrelation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying robust speech deepfake detectors in real-world conversational systems, biometric authentication security gates, and automated fraud/voice phishing detection tools.

## Institutions / 機構

Incheon National University

**Funding / 經費:** KOITA, Ministry of Science and ICT, Incheon National University

## Related

- (link related pages by id as the wiki grows)
