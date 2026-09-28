---
id: zhou26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-455
pdf: https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.pdf
---

# Ouroboros: Self-Referential Backdoor Attacks on Speech Enhancement via Clean Audio Triggers

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-455)

**TL;DR** — Ouroboros is a training-data poisoning backdoor attack framework for speech enhancement models that achieves near-100% attack success rates using natural high-SNR clean speech as triggers without requiring any inference-time input manipulation.

## Problem

Conventional backdoor attacks in audio typically require active injection of artificial triggers during inference, an assumption that clashes with the passive preprocessing role of speech enhancement models deployed in real-time services. Furthermore, speech security research has overwhelmingly focused on classification tasks, leaving speech enhancement models' vulnerabilities to data supply chain contamination unexplored. Because attackers cannot manipulate user audio streams at runtime, establishing stealthy, passive activation mechanisms is critical to understanding and securing these pipelines.

## Method

The framework introduces CleanTrigger, which repurposes pure clean target speech from the training set as an inherent trigger to activate malicious behaviors upon exposure to naturally occurring high-SNR audio. To preserve low-SNR samples vital for denoising performance, the authors propose an SNR-based Poisoning strategy that selects the top p% of high-SNR training samples and pairs them with malicious targets such as silence or targeted speech phrases. Evaluated on four diverse victim architectures—predictive models MP-SENet and SEMamba, alongside generative models CMGAN and FlowSE—using VoiceBank-Demand and WSJ0-CHiME3 datasets under a 10% default poisoning rate.

## Results

Across VoiceBank-Demand and WSJ0-CHiME3, Ouroboros achieves near-perfect Attack Success Rates (ASR around 99.39% to 100%) while inducing minimal degradation in clean-speech Perceptual Evaluation of Speech Quality (PESQ). Ablations confirm that the high-SNR sample selection strategy outperforms random or low-SNR poisoning by preserving normal speech enhancement efficacy. The backdoor exhibits strong resilience against common defenses, with standard fine-tuning (using 20% clean data) and preprocessing filters failing to purge the backdoor without crippling baseline performance. Physical-world evaluations using 60 recorded human voices across two genders and languages demonstrate a 100% ASR on FlowSE and 96.7% on MP-SENet, with output energies dropping below human auditory thresholds.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security researchers and auditors studying vulnerability assessments, data supply chain robustness, and defense mechanisms for speech preprocessing modules.

## Limitations

Attack effectiveness on content-tampering varies depending on the fidelity of the generated trigger phrases, and standard filtering/fine-tuning defenses either fail to eliminate the backdoor or severely damage legitimate speech enhancement functionality.

## Related

- (link related pages by id as the wiki grows)
