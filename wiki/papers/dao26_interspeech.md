---
id: dao26_interspeech
category: deepfake-security
institutions: ["Avignon Universite", "EURECOM"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-676
pdf: https://www.isca-archive.org/interspeech_2026/dao26_interspeech.pdf
---

# Linguistic Bias Mitigation for Spoofing Detection via Gradient Reversal and A Variational Information Bottleneck

*Anh-Tuan DAO, Driss Matrouf, Mickael Rouvier, Nicholas Evans*

[PDF](https://www.isca-archive.org/interspeech_2026/dao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-676)

**Category:** `deepfake-security`

**TL;DR** — The paper introduces a linguistic-invariant teacher-student framework using gradient reversal and a variational information bottleneck to mitigate linguistic shortcuts in spoofing detection, achieving a 36.2% relative EER reduction across nine out-of-domain datasets.

## Key contributions

- Identifies and empirically demonstrates an unexplored linguistic shortcut in ASVspoof 5 where classifiers exploit spoken text content mismatches between bona fide and spoofed utterances.
- Proposes a teacher-student adversarial framework using a Gradient Reversal Layer (GRL) to suppress linguistic information without needing text annotations for the target spoofing dataset.
- Incorporates a Variational Information Bottleneck (VIB) into the student's linguistic branch to regulate feature suppression, preventing the destruction of non-linguistic acoustic cues beneficial for spoofing detection.
- Achieves consistent out-of-domain generalization gains, lowering pooled EER down to 8.72% across nine DF Arena evaluation datasets compared to 13.67% for the baseline.

## Problem

Current spoofing detectors suffer from poor out-of-domain generalization due to shortcut learning, where models exploit spurious non-acoustic correlations rather than genuine artifacts. In datasets like ASVspoof 5, structural content imbalances exist where bona fide utterances differ fundamentally in spoken text from spoofed counterparts. Consequently, detectors learn what is being said rather than how the speech is generated, rendering them fragile when deployed on unseen datasets with different linguistic distributions.

## Method

The framework utilizes a frozen teacher model and an adversarial student model built on a pretrained XLSR frontend encoder. The teacher model is an XLSR encoder paired with a Multi-Head Factorized Attentive (MHFA) classifier trained on an English Common Voice subset (10.3k unique phrases, 158k utterances) for phrase linguistic content classification. The student model is optimized jointly for binary spoofing detection via an MHFA head and phrase linguistic content classification via an MHFA-VIB head. A Gradient Reversal Layer (GRL) is positioned between the XLSR feature extractor and the linguistic head, scaling gradients by $-\lambda$ during backpropagation to force the feature extractor to output linguistic-invariant representations.

To prevent adversarial training from over-aggressively stripping useful acoustic cues, a Variational Information Bottleneck (VIB) is introduced on the key stream ($k$) of the student's MHFA-VIB linguistic attention block. It models a stochastic latent variable $z$ through a Gaussian posterior ($q_\theta(z|k)$) using the reparameterization trick, constrained by a Kullback-Leibler (KL) divergence penalty against a standard normal prior $N(0, I)$. This bottleneck limits the capacity of the latent representation to avoid encoding redundant features.

The overall training loss minimizes the cross-entropy spoofing loss ($L_s$), mean squared error between student and teacher linguistic embeddings ($L_l$), and the KL divergence VIB penalty ($L_VIB$), balanced by weighting hyperparameters $\alpha = 0.1$ and $\beta = 0.1$ for 30 epochs using the Adam optimizer with a learning rate of $10^{-6}$ and batch size of 32 on NVIDIA A100 GPUs.

## Experimental setup

Models are trained on the ASVspoof 5 training set comprising roughly 180,000 utterances from 400 speakers, augmented using MUSAN and real room impulse response (RIR) databases. Evaluation is performed strictly out-of-domain across nine English-language Speech DF Arena datasets: In-the-Wild (ITW), ASVspoof 2019 eval, ASVspoof 2021 LA and DF, Fake-or-Real (FoR), CodecFake, DFADD, LibriSe-Vox, and SONAR. Baselines include AASIST, Conformer, standard MHFA, and MHFA-VIB, evaluated via Equal Error Rate (EER) and pooled EER.

## Results

The proposed MHFA-IVLing-VIB model achieves a pooled EER of 8.72%, representing a 36.2% relative error reduction compared to the standard MHFA baseline (13.67%) and outperforming the pure linguistic-invariant model without VIB (9.56%). On individual datasets, it records substantial gains, such as 1.88% EER on ITW (vs 4.30% for MHFA), 4.07% on ASVspoof 2019 eval (vs 9.48%), and 0.79% on DFADD (vs 2.11%). When benchmarked against top-4 open-condition ASVspoof 5 challenge submissions, the method trades a slight degradation on the in-domain ASVspoof 5 set (5.26% vs 3.30% for T27) for massive out-of-domain dominance, achieving an average EER of 3.97% across cross-dataset benchmarks compared to 11.83%–15.51% for the challenge leaders.

| System/Condition | ITW (EER%) | ASV19 Eval (EER%) | ASV21 LA (EER%) | CodecFake (EER%) | Pooled (EER%) |
| --- | --- | --- | --- | --- | --- |
| AASIST | 7.03 | 10.79 | 11.99 | 38.67 | 19.98 |
| Conformer | 5.68 | 10.80 | 10.93 | 30.30 | 15.58 |
| MHFA | 4.30 | 9.48 | 11.55 | 30.33 | 13.67 |
| MHFA-VIB | 3.95 | 7.24 | 9.41 | 24.69 | 11.83 |
| MHFA-IVLing | 1.93 | 5.04 | 5.87 | 20.80 | 9.56 |
| MHFA-IVLing-VIB | 1.88 | 4.07 | 5.58 | 20.28 | 8.72 |

## Limitations

The study is scoped strictly to English-language datasets and evaluations due to reliance on an English Common Voice teacher model. The approach requires auxiliary textual transcript resources to train the teacher model beforehand, and hyperparameters such as $\alpha$ and $\beta$ require careful tuning to balance linguistic suppression against acoustic preservation.

## Why read this

Speech researchers and security engineers tackling cross-dataset generalization failures in voice biometrics should read this to understand how dataset text imbalances cause shortcut learning and how to deploy adversarial VIB regularizations to remove linguistic confounders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice biometrics security, synthetic speech detection, and robust anti-spoofing systems for conversational AI deployment.

## Institutions / 機構

Avignon Universite, EURECOM

**Funding / 經費:** ANR BRUEL

## Related

- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.6/3
- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — same problem · relatedness 2.6/3
- [Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation](kim26l_interspeech.md) — same problem · relatedness 2.5/3
- [QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection](truong26_interspeech.md) — same problem · relatedness 2.4/3
- [Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning](dvirniak26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
