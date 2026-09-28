---
id: piao26_interspeech
category: asynchronous-federated-learning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-430
pdf: https://www.isca-archive.org/interspeech_2026/piao26_interspeech.pdf
---

# Unlocking In-Context Learning in Audio-Language Models from Decentralized Medical Audio

[PDF](https://www.isca-archive.org/interspeech_2026/piao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/piao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-430)

**TL;DR** — Federated Self-Contextualization (FSC) enables privacy-preserving in-context clinical audio diagnosis across decentralized hospital clients without real diagnostic labels, achieving 71.6% accuracy in a 2-way 2-shot evaluation.

## Problem

Clinical audio diagnosis typically relies on closed-set classification over large, centrally aggregated, expert-annotated datasets, which ignores open-vocabulary diagnostic concepts and violates strict patient privacy constraints. Obtaining expert labels across decentralized institutional silos is extremely difficult, and existing audio-language models cannot leverage in-context learning without structured audio-label demonstration episodes. This leaves a gap for models that can perform few-shot diagnostic reasoning using distributed data without centralized raw audio access.

## Method

The framework couples the CaReAQA medical audio encoder (producing 1280-dim embeddings mapped to 4 prefix tokens) with a 4-billion-parameter instruction-tuned medical LLM backbone (MedGemma-4B-IT) via visual boundary tokens and linear projection. To bypass scarce expert labels during training, each federated client performs unsupervised K-means clustering (C=10 groups) on local audio representations, assigning semantically void pseudo-label identifiers (e.g., 'Mountain Breeze') so the model learns abstract mapping without memorizing medical terms. Training follows a progressive three-stage pipeline under a federated setup using Flower and FedProx: Stage I aligns the audio encoder and projection mapper via non-episodic classification with a frozen LLM; Stage II adapts them for episodic in-context reasoning; and Stage III freezes the encoder/mapper while applying LoRA adapters (rank r=8, alpha=32) to specialize the LLM. At test time, real clinical descriptions replace pseudo-labels to perform few-shot in-context diagnosis.

## Results

Evaluated across seven respiratory and cardiac datasets comprising over 22,000 recordings divided among 7 federated clients (e.g., ICBHI, CIRCOR, CoughVID, HFLUNG, SPRSound, COVID-19 Sounds, ZCHSound), measuring Accuracy, ROUGE-L F1, and BERTScore F1 over 1,000 episodes with 5 random seeds. In the 2-way 2-shot setting, FSC achieves 71.6% accuracy, outperforming centralized audio-language baselines (Pengi, GAMA, Gemma3n, Qwen2.5-Omni7B, Audio Flamingo) by over 9 percentage points. Ablation studies confirm that each stage of the progressive training pipeline is essential for achieving these performance gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and healthcare engineers building privacy-preserving, few-shot diagnostic tools for cardiopulmonary conditions (such as wheezes, murmurs, and coughs) across distributed hospital networks without sharing raw patient audio.

## Related

- (link related pages by id as the wiki grows)
