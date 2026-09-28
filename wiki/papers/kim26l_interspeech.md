---
id: kim26l_interspeech
category: speech-deepfake-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1483
pdf: https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.pdf
---

# Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation

[PDF](https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1483)

**TL;DR** — This paper proposes an orthogonality-constrained feature decorrelation method for speech deepfake detection, improving out-of-domain generalization and lowering Equal Error Rates across unseen datasets.

## Problem

End-to-end deepfake detectors trained via standard empirical risk minimization frequently overfit to dataset-specific artifacts and superficial cues, such as silence duration or recording environment bias. When deployed under real-world distributional shifts, such as novel spoofing algorithms, unseen codecs, or environmental noise, their detection performance degrades drastically. This vulnerability hinders reliable deployment in security-critical scenarios like fraud prevention and content moderation.

## Method

The framework modifies the SSL-AASIST architecture by splitting spectral and temporal graph features into two distinct branches using shared linear projections and SeLU activations: a common feature branch and a specific feature branch. The common branch handles binary bonafide/spoof detection to capture domain-invariant authenticity cues, while the specific branch handles an auxiliary three-way attack-type classification task (bonafide/TTS/VC) to capture domain- and attack-dependent variations. An orthogonality regularization loss based on pairwise cosine similarity is applied between the common and specific representations to minimize redundancy and correlation. The model is trained jointly using a combination of the main binary cross-entropy loss, the auxiliary cross-entropy loss, and the orthogonality loss, alongside RawBoost waveform-level augmentation.

## Results

Experiments evaluate generalization on ASVspoof 2019 LA, ASVspoof 2021 LA, ASVspoof 2021 DF, ASVspoof 5, and In-the-Wild (ITW) datasets. The proposed method achieves notable EER reductions on unseen cross-corpus and in-the-wild evaluation sets compared to the SSL-AASIST baseline. For instance, on the ASVspoof 2021 DF dataset, the EER decreases from 11.22% (baseline main+aux) down to 3.67% with the full orthogonality loss. On the challenging In-the-Wild dataset, the EER drops from 12.69% to 8.84%. Ablation studies confirm that omitting the orthogonality constraint or relying solely on auxiliary tasks yields inferior cross-corpus robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and security engineers building robust audio forensics tools, voice authentication systems, and media verification pipelines to protect against deepfake audio fraud.

## Related

- (link related pages by id as the wiki grows)
