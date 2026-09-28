---
id: piao26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-430
pdf: https://www.isca-archive.org/interspeech_2026/piao26_interspeech.pdf
---

# Unlocking In-Context Learning in Audio-Language Models from Decentralized Medical Audio

*Ran Piao, Tsai-Ning Wang, Martijn den Dekker, Linda Moonen, Hareld Kemps, Yuan Lu, Aaqib Saeed*

[PDF](https://www.isca-archive.org/interspeech_2026/piao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/piao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-430)

**TL;DR** — Federated Self-Contextualization (FSC) is a multimodal framework that uses semantically void pseudo-label episodes to teach audio-language models in-context clinical diagnosis across distributed hospitals, achieving 71.6% accuracy in a 2-way 2-shot evaluation.

## Key contributions

- Formalizes federated self-contextualization, decoupling abstract episodic reasoning acquisition from scarce real medical label availability.
- Instantiates a progressive three-stage training pipeline addressing cross-modal alignment, episodic in-context learning, and data sovereignty jointly.
- Demonstrates robust open-vocabulary clinical diagnosis across seven heterogeneous cardiopulmonary datasets without sharing raw audio or expert labels.
- Shows that federated training outperforms centralized pseudo-label training by over 6% due to the regularization effect of cross-institutional diversity.

## Problem

Clinical audio diagnosis relies on open-ended reasoning where clinicians interpret acoustic evidence against known medical conditions. Existing machine learning models treat this as closed-set classification requiring large, centrally aggregated labeled datasets—an approach that fails due to strict patient privacy constraints, institutional silos, and scarce expert annotations. Furthermore, purely acoustic few-shot methods like prototypical networks operate solely on embedding distances and cannot leverage the semantic structure of clinical descriptions or generalizable open-vocabulary knowledge.

## Method

FSC combines a 4-billion-parameter instruction-tuned medical language model (MedGemma-4B-IT) with a medical audio encoder (CaReAQA). The audio encoder processes raw clips into 1280-dimensional embeddings, which a linear projection maps into 4 prefix tokens inserted between MedGemma's visual boundary tokens. Within each client, local audio embeddings are clustered into C=10 groups via K-means and assigned semantically void, meaningless identifiers (e.g., "Mountain Breeze") to prevent the model from memorizing direct disease-sound associations.

The progressive three-stage training pipeline consists of: Stage I (Alignment), which trains the encoder and projection on non-episodic pairs with the language model frozen for 10 rounds; Stage II (Episodic Refinement), which shifts to episodic few-shot prompts for 15 rounds while keeping the language model frozen; and Stage III (LM Adaptation), which freezes the encoder/projection and trains LoRA adapters (rank r=8, alpha=32) on the language model backbone for 10 rounds. All stages use Flower for federated learning with FedProx (mu=0.01) to mitigate client drift across M=7 institutional nodes.

At inference time, episodes serialize support audio-label pairs interleaved with audio prefix tokens, ending with a query audio sample. Semantically meaningful medical descriptions replace the training pseudo-labels, allowing the language model's pretrained medical knowledge to provide semantic grounding while the learned in-context reasoning skill executes the diagnosis.

## Experimental setup

Evaluated on seven respiratory and cardiac audio datasets containing 17,479 training samples and 2,983 test samples (including ICBHI, CIRCOR, CoughVID, HFLUNG, SPRSound, COVID-19 Sounds, and ZCHSound). Compared against Pengi, GAMA, Gemma3n, Qwen2.5-Omni-7B, and Audio Flamingo under an N-way K-shot episodic protocol (N in {2, 3}, K in {2, 5}) averaged over 1,000 episodes and 5 random seeds. Metrics include Accuracy, ROUGE-L F1, and BERTScore F1.

## Results

In the 2-way 2-shot setting, FSC achieves 71.61% accuracy, outperforming the strongest baseline (Qwen2.5-Omni-7B at 62.07%) by over 9 percentage points, with matching gains in ROUGE-L (73.72%) and BERTScore (75.59%). Class-wise performance reaches 89.25% on URTI and 80.68% on abnormal heart sounds. Ablations demonstrate that omitting Stage I alignment drops accuracy to 67.31%, joint training drops it to 65.87%, replacing MedGemma with general-purpose LLMs collapses performance to ~49%, and centralized pseudo-label training yields only 65.44% compared to FSC's 71.61% federated result.

| System / Condition | Accuracy (%) | ROUGE-L F1 | BERTScore F1 |
|---|---|---|---|
| Pengi (2-way 2-shot) | 50.91 | 52.34 | 54.18 |
| Qwen2.5-Omni-7B (2-way 2-shot) | 62.07 | 65.35 | 67.03 |
| FSC - Centralized Baseline | 65.44 | 66.95 | 70.12 |
| FSC w/o Stage I Alignment | 67.31 | 69.18 | 71.89 |
| FSC (Full, 2-way 5-shot) | 68.34 | 70.76 | 73.14 |
| FSC (Full, 2-way 2-shot) | 71.61 | 73.72 | 75.59 |

## Limitations

Performance degrades as the number of episode ways increases (falling from 71.6% in 2-way to 54.3% in 3-way settings), and increasing shots from 2 to 5 slightly decreases accuracy due to autoregressive context dilution. The evaluation is currently restricted to short cardiopulmonary audio clips (5 seconds at 16 kHz) and requires formatting consistency between training and inference episodes.

## Why read this

Researchers and engineers building privacy-preserving multimodal medical systems should read this paper to see how semantically void pseudo-labeling combined with federated in-context learning can eliminate the need for centralized expert-annotated audio corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving automated clinical auscultation and cardiopulmonary disease screening in decentralized hospital networks.

## Related

- (link related pages by id as the wiki grows)
