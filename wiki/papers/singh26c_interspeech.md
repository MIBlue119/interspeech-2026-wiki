---
id: singh26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2764
pdf: https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.pdf
---

# FlowEdit: Associative Memory for Lifelong Pronunciation Adaptation in Flow-Matching TTS

[PDF](https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2764)

**TL;DR** — FlowEdit is a lifelong adaptation framework for frozen flow-matching text-to-speech systems that achieves a 92.7% relative reduction in target-word phoneme error rate by optimizing latent text perturbations and storing them in an associative Hopfield memory.

## Problem

State-of-the-art flow-matching text-to-speech systems are frozen after training, leaving them unable to correct mispronunciations of proper nouns or foreign loan-words without costly retraining. Traditional fine-tuning and weight-editing techniques risk catastrophic forgetting, parameter drift, and voice degradation, while grapheme-to-phoneme rules fail on polyglot names. These limitations prevent real-world deployment of personalized voice assistants and accessibility tools requiring reliable pronunciations.

## Method

FlowEdit bypasses weight updates by freezing the diffusion transformer (DiT) and optimizing a token-level perturbation vector added to the text embedding space via gradient descent, guided by user reference audio. To compute memory-efficient gradients without storing intermediate ODE states, it employs the adjoint sensitivity method with a constant memory cost. Optimized correction vectors are securely stored as key-value pairs in a Modern Hopfield Network inserted after the text encoder. During inference, stored corrections are retrieved using soft attention combined with a similarity gate, enabling fuzzy morphological matching for inflected variants without parameter modification.

## Results

Evaluated on the curated P OLYGLOT-N OUNS benchmark consisting of 312 proper nouns across 18 language families, FlowEdit reduces target-word Phoneme Error Rate (PER) from the zero-shot baseline of 42.5% down to 3.1%. It maintains identical general-speech quality with a zero-forgetting PER of 4.1% on held-out LibriTTS-R data, outperforming full fine-tuning (PERtarget 8.2%, PERgen 15.3%) and LoRA baselines. Each correction completes in approximately 15 seconds on a single A100 GPU using 32 ODE steps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building production text-to-speech systems, voice assistants, and accessibility tools can use FlowEdit for post-deployment, user-specific pronunciation correction without retraining the underlying model.

## Limitations

Residual errors concentrate on monosyllabic words with single-phoneme targets and tonal languages like Mandarin and Vietnamese due to challenges in reconstructing fundamental frequency trajectories via standard mel-spectrogram losses.

## Related

- (link related pages by id as the wiki grows)
