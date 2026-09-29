---
id: li26q_interspeech
category: audio-understanding
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1024
pdf: https://www.isca-archive.org/interspeech_2026/li26q_interspeech.pdf
---

# Few-shot Class-variable Incremental Audio Classification via Prototype Adaptation and Pseudo Class-variable Training

*Yanxiong Li, Guoqing Chen, Qianqian Li, Sen Huang*

[PDF](https://www.isca-archive.org/interspeech_2026/li26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1024)

**Category:** `audio-understanding` · **Labels:** `low-resource`

**TL;DR** — This paper introduces Few-shot Class-variable Incremental Audio Classification (FCIAC), a realistic learning setting where audio classes can be both added and removed over time. The authors propose a Class-variable Prototype Adaptation Network (CPAN) combined with a Pseudo Class-variable Training Strategy (PCTS), achieving superior average accuracy across public speech, music, and sound event datasets compared to traditional incremental baselines.

## Key contributions

- Formalization of the Few-shot Class-variable Incremental Audio Classification (FCIAC) problem, which accounts for both the addition and removal of target classes in incremental sessions.
- Design of a Class-variable Prototype Adaptation Network (CPAN) consisting of an Attentive Prototype Generator Module (APGM), Stability Adaptation Module for Prototypes (SAMP), and Plasticity Adaptation Module for Prototypes (PAMP).
- Proposal of a Pseudo Class-variable Training Strategy (PCTS) in the base session that synthesizes pseudo-classes via Beta-mixing to simulate alternating class addition and removal without requiring future incremental data.
- Integration of a multivariate Gaussian embedding reconstruction mechanism using stored mean vectors and covariance matrices to allow prototype updating after old classes are removed.

## Problem

Traditional few-shot class-incremental audio classification (FCAC) methods assume that the number of classes monotonically increases over time, which fails to reflect practical scenarios like smart speaker keyword management where commands are frequently added and deleted. Existing approaches (such as CEC, PAN, and AMFO) lack mechanisms to handle class deletion or to dynamically resize and re-stabilize decision boundaries when classes vanish. Consequently, these models suffer from severe catastrophic forgetting or structural failure when the label space shrinks or fluctuates irregularly across sessions.

## Method

The model architecture features a standard ResNet-18 encoder trained during the base session and subsequently frozen to preserve old-class representations. The classifier relies on class prototypes updated via the Class-variable Prototype Adaptation Network (CPAN). CPAN integrates an Attentive Prototype Generator Module (APGM) activated during class addition to map support embeddings to new prototypes via self-attention, alongside Stability Adaptation Module (SAMP) and Plasticity Adaptation Module (PAMP) sub-networks that use self-attention, layer normalization, and residual connections to globally adjust all prototype representations and query embeddings. A fusion module combines SAMP and PAMP outputs using gating weights.

To bridge the gap between static base training and dynamic incremental sessions, the Pseudo Class-variable Training Strategy (PCTS) constructs episodic datasets from the base training set. It takes random subset pairs from base classes, mixes them using a symmetric Beta distribution ($\beta(a,a)$), assigns pseudo-labels, and alternates episodic training steps between simulated class additions and random prototype dropouts (simulated removals). Cross-entropy loss ($\mathcal{L}_{CE}$) drives stochastic gradient descent optimization for both the encoder and CPAN.

During inference in incremental sessions, when classes are added, old-class embeddings are reconstructed using saved class-specific mean vectors $\boldsymbol{\mu}$ and inverse covariance matrices $\boldsymbol{\Sigma}^{-1}$ drawn from a multivariate Gaussian distribution $\mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$. When classes are removed, the corresponding prototypes, mean vectors, and covariance matrices are discarded, and remaining prototypes are updated via CPAN using reconstructed legacy embeddings.

## Experimental setup

Experiments are conducted on three public audio datasets: LS-100 (100 speaker classes, speech utterances), NSynth-100 (100 musical instrument classes), and FSC-89 (89 sound event classes). Baseline methods compared include CEC, PAN, and AMFO adapted to the FCIAC setting. Evaluation is measured via Average Accuracy (AA) across 4 incremental sessions (alternating schedule of adding 5 classes and removing 2 classes, configured as 5-way 5-shot learning, averaged over 100 runs). Log-Mel spectrograms use 128 dimensions, prototypes use 512 dimensions, and learning rates are set to 0.1 for the encoder and $2\times 10^{-4}$ for CPAN in the base session ($1\times 10^{-4}$ in incremental sessions).

## Results

On the LS-100 dataset, the proposed method achieves an overall Average Accuracy (AA) of 92.62% across all classes, outperforming AMFO (91.53%), PAN (91.43%), and CEC (90.96%). Specifically, on incremental classes during session transitions, the method achieves an average accuracy of 97.91% on LS-100, 86.34% on NSynth-100, and 30.15% on FSC-89, consistently beating all baselines with statistical significance verified via Friedman and Nemenyi tests ($\alpha = 0.05$).

Ablation studies on LS-100 demonstrate that removing either CPAN or PCTS degrades performance: using neither yields 91.43% All AA, using CPAN alone gives 91.91%, PCTS alone yields 92.29%, and combining both achieves the peak 92.62% All AA (with incremental class accuracy jumping from 88.85% to 97.91%). The method does not win by wide margins on base-class retention alone in certain early sessions where standard fine-tuning or rigid freezing holds strong, but dominates aggregate metrics due to superior plasticity on fluctuating class sets.

| System / Condition | LS-100 (All AA %) | NSynth-100 (All AA %) | FSC-89 (All AA %) |
|---|---|---|---|
| CEC [35] | 90.96 | 97.10 | 38.89 |
| PAN [22] | 91.43 | 97.90 | 40.41 |
| AMFO [28] | 91.53 | 97.70 | 40.45 |
| **Ours (CPAN + PCTS)** | **92.62** | **98.73** | **40.76** |

## Limitations

The framework relies on a frozen encoder trained heavily on the base session, meaning out-of-domain classes introduced later that deviate drastically from base feature distributions may not be well-represented by the multivariate Gaussian embedding reconstruction. The evaluation is restricted to controlled 5-way 5-shot increments with a fixed number of added/removed classes per session, though irregular and simultaneous addition/removal tests show stability. Scalability to thousands of classes or unconstrained real-world audio streams remains untested.

## Why read this

Researchers and engineers working on incremental few-shot audio recognition or edge AI systems with dynamic vocabulary updates will find this paper essential for its novel formulation of class deletion alongside addition. It provides a concrete blueprint combining meta-learning adaptation networks with distribution-based embedding reconstruction.

## Code

- https://github.com/cgq2971-afk/FCIAC

## Applications

Smart speakers with dynamic keyword addition/removal, real-world acoustic monitoring systems, and personal voice assistants requiring adaptive on-device audio classification.

## Institutions / 機構

South China University of Technology

**Funding / 經費:** National Natural Science Foundation of China, China-Croatia Science and Technology Cooperation Committee

## Related

- (link related pages by id as the wiki grows)
