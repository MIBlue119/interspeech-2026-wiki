---
id: shangguan26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2274
pdf: https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.pdf
---

# Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2274)

**TL;DR** — The paper introduces Dual-LoRA, a parameter-efficient adversarial disentanglement framework for cross-lingual speaker verification that achieves a 0.91% validation EER and ranks 3rd in the TidyVoice challenge.

## Problem

Cross-lingual speaker verification suffers from language-speaker entanglement, where models mistakenly rely on shared linguistic cues as proxies for speaker identity. Standard adversarial techniques using Gradient Reversal Layers (GRL) often degrade speaker discriminability because blind discriminators penalize valuable speaker traits that happen to correlate with language. This causes high error rates in the hardest scenario of accepting the same speaker across different languages while rejecting different speakers sharing the same language.

## Method

The authors freeze a pre-trained backbone and inject two parallel, task-factorized LoRA branches globally across all layers: a Speaker Branch with rank 16 or 32, and a auxiliary Language Branch with rank 4 or 16. To prevent identity loss, they propose a Language-Anchored Adversary where a shared discriminator receives direct language supervision from the language branch in one pass and adversarially reverses gradients from the speaker branch in another. Training uses a three-phase curriculum combining Sub-center ArcMargin loss for speaker identity and cross-entropy losses for language classification and adversarial suppression. At inference, the language components are discarded and the speaker LoRA weights are merged back into the frozen backbone.

## Results

Evaluated on the TidyVoice dataset (using VoxBlink and VoxCeleb for single-system development), the method reduces the overall validation EER to 0.91% using a w2v-BERT2 backbone, outperforming standard adversarial baselines (0.96%) and non-adversarial LoRA (1.25%). In the worst-case cross-lingual scenario (same speaker, different language vs. different speaker, same language), Dual-LoRA drops the EER from the official baseline of 5.19% down to 1.62%. Diagnostic probing confirms that Dual-LoRA achieves lower language identification accuracy (49.02%) than standard adversarial training (55.03%), indicating superior disentanglement. A score-level fusion of three backbones pre-trained on an internal 18k-hour multilingual dataset achieves 2.43% and 2.84% EER on the official eval-A and eval-U test sets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice-based authentication, speaker recognition, and personalization systems operating across multiple languages.

## Related

- (link related pages by id as the wiki grows)
