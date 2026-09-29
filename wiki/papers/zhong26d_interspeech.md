---
id: zhong26d_interspeech
category: asr
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1559
pdf: https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.pdf
---

# Towards Personalized Federated Learning for Dysarthric Speech Recognition

*Tao Zhong, Mengzhe Geng, Jiajun Deng, Shujie Hu, Xunying Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1559)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — This paper introduces two similarity-aware model aggregation strategies for personalized federated learning in dysarthric speech recognition, dividing models into speaker-independent and speaker-dependent components. It achieves statistically significant absolute Word Error Rate reductions of up to 0.99% on UASpeech and 0.56% on TORGO compared to regularized FedAvg.

## Key contributions

- First application of personalized federated learning to dysarthric automatic speech recognition, addressing substantial inter-speaker heterogeneity.
- Proposes a parameter-based similarity averaging strategy that computes inter-speaker closeness directly from model parameters.
- Proposes an embedding-based similarity averaging strategy utilizing mean-pooled output representations from the speaker-independent component, protected by 20% random subsampling.
- Demonstrates consistent outperformance over regularized FedAvg baselines across benchmark dysarthric speech datasets (UASpeech and TORGO).

## Problem

Recognizing dysarthric speech via deep learning faces immense hurdles due to acoustic mismatch with normal speech, severe data scarcity caused by user mobility constraints, and extreme speaker heterogeneity across varying impairment types. While federated learning (FL) preserves patient healthcare privacy by keeping audio on-device, standard quantity-based aggregation methods like FedAvg or generic regularized FL baselines fail because forcing a single global model across highly diverse speech impairments leads to severe negative interference. Designing a personalized approach that groups similar pathological voice characteristics without exposing raw audio or complete gradient histories is critical for clinical adoption.

## Method

The system utilizes a HuBERT-Large model initialized from 960 hours of Librispeech pretraining, featuring a frozen CNN feature encoder, a stack of 24 Transformer blocks, and a Connectionist Temporal Classification (CTC) output layer. The network is split into a speaker-independent (SI) component (set as the lower 1st to 3rd, 6th, 12th, or 18th Transformer layers) and a speaker-dependent (SD) component (comprising the remaining upper layers). Training operates in alternating steps per communication round: first, the SI component is updated and aggregated across clients using standard quantity-based FedAvg (with parameter and embedding regularizations); second, the SD component is trained locally, and inter-client speaker similarity weights are computed either via cosine distance of layer parameters or via cosine similarity of mean-pooled sequence embeddings derived from a random 20% private data subsample. These similarities guide a weighted aggregation of the SD component via trade-off hyperparameter beta (set to 0.8 for UASpeech and 0.6 for TORGO). The combination of both parameter-based and embedding-based similarity aggregation yields further accuracy gains.

During inference, the personalized local models are evaluated directly on client test sets. The design choices strictly decouple generalized acoustic feature extraction in lower layers from personalized pronunciation modeling in upper layers, effectively dampening gradient conflict from dissimilar speakers while avoiding raw text or complete embedding leaks.

## Experimental setup

Evaluated on the English UASpeech corpus (16 dysarthric speakers, 17.8 hours training, 9 hours testing across 155 common and 300 uncommon words) and the English TORGO corpus (8 dysarthric speakers, 15 hours training, 1 hour testing). Compared against centralized training (SI only and SD adaptor baselines) and regularized FedAvg (incorporating FedProx parameter, embedding, and loss-based regularization penalties of 0.001, 0.001, and 0.01). Implemented using 2 Nvidia A40 GPUs with 1 local epoch per communication round over 100 total communication rounds. Evaluated using Word Error Rate (WER) and MAPSSWE statistical significance tests at alpha = 0.05.

## Results

On the UASpeech corpus, baseline regularized FedAvg achieved 31.45% WER, whereas parameter-based averaging (1:3 SI layers) reached 30.51% WER (a 0.94% absolute / 2.99% relative reduction), and embedding-based averaging reached 30.46% WER (a 0.99% absolute / 3.15% relative reduction). Combining parameter- and embedding-based averaging further lowered UASpeech WER to 30.43%, with pronounced improvements for Very Low (VL) intelligibility speakers achieving up to 2.47% absolute WER reduction. On the TORGO corpus, baseline regularized FedAvg yielded 11.83% WER, while parameter-based and embedding-based strategies achieved 11.31% and 11.27% WER respectively (up to 0.56% absolute / 4.73% relative reduction), with the combined system pushing performance to 11.25% WER. 

Performance gains from personalization in the federated setup matched the improvements seen in centralized training settings (approx 1.02% absolute gain in FL vs 1.20% in centralized on UASpeech). The methods show smaller margins or occasional parity on mild-to-moderate intelligibility groups where baseline global models already capture adequate pronunciation patterns.

| System / Condition | UASpeech WER (%) | TORGO WER (%) |
|---|---|---|
| Centralized SI (Sys. 0a) | 28.87 | 9.36 |
| Centralized SD Adaptor (Sys. 0b) | 27.67 | 8.81 |
| Regularized FedAvg Baseline (Sys. 1) | 31.45 | 11.83 |
| Parameter-based Averaging (Sys. 3) | 30.51 | 11.31 |
| Embedding-based Averaging (Sys. 7) | 30.46 | 11.27 |
| Parameter + Embedding Averaging (Sys. 10) | 30.43 | 11.25 |

## Limitations

The evaluation is restricted to English datasets with small cohort sizes (16 speakers for UASpeech and 8 for TORGO), leaving multilingual and larger-scale multi-client generalization untested. The approach assumes client devices can sustain local transformer-based model training for upstream gradient and parameter exchanges. Furthermore, privacy guarantees rely on temporal mean-pooling and subsampling, which require careful auditing against sophisticated white-box inversion attacks.

## Why read this

Speech researchers and privacy-preserving machine learning engineers should read this paper to see how decoupling acoustic feature extraction from speaker-dependent parameter/embedding aggregation resolves client heterogeneity in federated ASR without violating medical data privacy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving on-device speech recognition for individuals with severe speech impairments, dysarthria, or motor disabilities.

## Institutions / 機構

Chinese University of Hong Kong, National Research Council Canada

**Funding / 經費:** Hong Kong RGC GRF

## Related

- (link related pages by id as the wiki grows)
