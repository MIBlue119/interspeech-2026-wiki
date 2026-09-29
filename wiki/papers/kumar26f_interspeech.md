---
id: kumar26f_interspeech
category: deepfake-security
labels: [low-resource, self-supervised]
institutions: ["IIIT-Delhi", "IDIAP"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2442
pdf: https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.pdf
---

# Who Synthesized This? Joint Deepfake Detection and Generative Source Attribution

*Vishal Kumar, Vinayak Abrol, Mathew Magimai Doss*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2442)

**Category:** `deepfake-security` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — A few-shot, open-set framework for joint deepfake detection and generative source attribution uses a LoRA-adapted WavLM-Large backbone trained with dual-tier hierarchical metric learning, achieving 0.49% EER on ASVspoof 5.0 and 99% accuracy in tracing speech to its source.

## Key contributions

- Dual-Tier Hierarchical Metric Learning: Joint optimization of dynamically conditioned AAM-Softmax margins and EMA-anchored Center Loss to resolve both broad synthesis families and fine-grained synthesizer fingerprints.
- Dynamic Prototype Anchoring: A few-shot prototype mechanism for inference-time attribution of emergent, zero-day generative architectures using K=36 support samples without parameter updates.
- Gender-Conditioned Bonafide Prototyping: Partitioning the real speech manifold into three gender-conditioned subregions (male, female, mixed) to model nonisotropic intra-speaker variance.
- Empirical State-of-the-Art: Establishing a new benchmark on ASVspoof Track 1 open condition with a 0.49% EER and 0.09 minDCF.

## Problem

Modern speech synthesis methods like autoregressive models, diffusion pipelines, and flow-matching frameworks directly optimize latent manifolds under perceptual losses, suppressing legacy spectral and phase artifacts. This escalation turns zero-shot cloning into a severe threat against automatic speaker verification (ASV). Furthermore, legacy detectors assume a closed world and fail categorically when encountering zero-day generative models, requiring continuous retraining that static systems cannot accommodate.

## Method

The framework utilizes a WavLM-Large backbone, chosen for its denoising pretraining objective that preserves fine-grained generative fingerprints under acoustic perturbation. To prevent catastrophic forgetting, Low-Rank Adaptation (LoRA) is applied exclusively to the feature projection and attention output projection layers with rank r = 8 and scaling factor alpha = 16.0.

The embedding space topology is optimized using a joint geometric objective combining Conditional AAM-Softmax with dynamically trainable margins (my) and an Exponential Moving Average (EMA) stabilized Center Loss to mitigate gradient noise from class-imbalanced mini-batches. Training follows a two-stage hierarchical curriculum: Stage 1 separates broad architectural families (LLM-Codec, Diffusion, Flow-Matching, FastSpeech, VITS), while Stage 2 refines intra-family synthesizer identities.

During Phase 2, zero-day models from Set 2 are registered into a prototype store without parameter updates by computing mean embedding centroids over K approx 36 support samples. Bonafide prototypes are registered using VoxCeleb 2 via three gender-conditioned centroids (male, female, mixed). During Phase 3 inference, test utterances are mapped through the frozen backbone and classified via cosine similarity nearest-neighbor retrieval against the prototype registry, eliminating class-specific threshold calibration.

## Experimental setup

The system evaluates on MLAAD v9 (partitioned temporally into Set 1 pre-2025 for training and Set 2 post-2025 for open-set registration), VoxCeleb 2 for bonafide prototypes, and ASVspoof 5 Track 1 (open condition) for zero-shot evaluation. Performance is measured via Equal Error Rate (EER), Minimum Detection Cost Function (minDCF), Actual Detection Cost Function (actDCF), and accuracy. Implementation uses PyTorch on three NVIDIA RTX 3090 GPUs (24GB VRAM each) and 512GB system RAM.

## Results

The proposed single system achieves an EER of 0.49% and a minDCF of 0.09 on the ASVspoof 5 Track 1 open-condition evaluation, outperforming the best challenge ensemble submission (T45: minDCF = 0.07, EER = 2.59%) in EER and the best single system submission (T31: minDCF = 0.14, EER = 5.56%). Progressive evaluation with Set 2 models scaling from 30% to 100% shows EER dropping from 2.31% to 0.69% (reaching 0.49% with 3-way gender conditioning), while family-level and model-level accuracies scale up to 92.0%/90.3% (reaching 99.0%/97.0% fully configured). The primary weakness is an elevated actual DCF (actDCF = 0.97), reflecting score clustering near the unit hypersphere boundary characteristic of metric learning spaces, which requires post-hoc calibration.

| System | minDCF | actDCF | EER (%) |
|---|---|---|---|
| B01 (Baseline) | 0.8266 | 0.9922 | 36.04 |
| T47 (Ensemble) | 0.26 | 0.33 | 9.18 |
| T31 (Single) | 0.14 | 0.22 | 5.56 |
| T27 (Ensemble) | 0.09 | 0.13 | 3.42 |
| T45 (Ensemble) | 0.07 | 1.00 | 2.59 |
| Ours (Single) | 0.09 | 0.97 | 0.49 |

## Limitations

The framework exhibits score calibration gaps resulting in an elevated actDCF (0.97) due to hypersphere boundary clustering, necessitating post-hoc normalization like Platt scaling. The evaluation relies on MLAAD v9 and ASVspoof 5 partitioning, meaning broader real-world in-the-wild acoustic variability and cross-lingual robustness remain bound by the scope of these datasets. Furthermore, the system assumes access to K=36 clean support samples for registering zero-day generators, which may be unfeasible in extremely data-constrained forensic scenarios.

## Why read this

Researchers and engineers building scalable deepfake detection and attribution systems should read this to learn how to combine self-supervised representations with hierarchical metric learning and zero-shot prototype registration to handle evolving generative architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-world synthetic speech detection, forensic speaker attribution, audio deepfake monitoring for automated speaker verification security, and zero-day model auditing.

## Institutions / 機構

IIIT-Delhi, IDIAP

**Funding / 經費:** Swiss National Science Foundation, Nebius Research Grant, Infosys Foundation

## Related

- (link related pages by id as the wiki grows)
