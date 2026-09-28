---
id: dey26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3091
pdf: https://www.isca-archive.org/interspeech_2026/dey26_interspeech.pdf
---

# Improving Adversarial Robustness in Spoken Language Identification through Self-Defensive Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/dey26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dey26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3091)

**TL;DR** — The paper introduces Self-Defensive Adversarial Re-Training (SDART) to protect spoken language identification models against adversarial attacks, improving robustness on both genuine and attacked speech samples.

## Problem

While adversarial vulnerabilities are heavily studied for speaker verification and automatic speech recognition, spoken language identification (LID) remains largely unexplored despite expanding to multilingual deployments. Attackers can easily manipulate LID front-ends using subtle, human-imperceptible perturbations to cause misclassifications that cascade into catastrophic failures for downstream multilingual speech pipelines. Addressing this gap requires proactive defenses tailored to language-specific dynamics rather than simple reactive filters.

## Method

The proposed SDART framework builds upon standard adversarial re-training by incorporating progressive adversarial sample mining, a teacher-free defensive distillation mechanism via dynamic online label smoothing, and linguistic consistency regularization. Specifically, adversarial samples are generated using Projected Gradient Descent (PGD) with perturbation sizes bounded in an L-infinity norm ball and gradually injected during training via an epoch-dependent fraction parameter. To stabilize convergence and capture inter-language dynamics, epoch-wise soft labels are computed using entropy-weighted prediction scores exclusively from correctly classified genuine training instances. The approach utilizes ECAPA-TDNN and Conformer architectures trained on 80-dimensional log Mel-spectrograms extracted from 3-second audio segments, optimizing a combined loss weighted by an annealed mixing parameter.

## Results

Evaluated on the top ten most widely spoken languages from VoxLingua107 (VoxLingua-10) and Common Voice datasets using utterance-level equal error rate (EER) and normalized cost ($C_{avg}$), SDART consistently outperforms conventional adversarial training methods across both white-box and black-box transfer attacks. Under PGD attack settings with a 5-step perturbation and step size of 0.03, the proposed framework substantially mitigates performance degradation compared to standard empirical baselines. Notable ablations confirm that restricting soft-label updates solely to correctly classified genuine samples and incorporating entropy-based confidence weighting are critical for optimal robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security practitioners building multilingual voice assistants, speech translation systems, or multi-task speech pipelines can use SDART to secure front-end spoken language identification modules against adversarial manipulation.

## Related

- (link related pages by id as the wiki grows)
