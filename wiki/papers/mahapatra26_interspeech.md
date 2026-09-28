---
id: mahapatra26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-831
pdf: https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf
---

# ProSDD: Learning Prosodic Representations for Speech Deepfake Detection against Expressive and Emotional Attacks

*Aurosweta Mahapatra, Ismail Rasim Ulgen, Kong Aik Lee, Nicholas Andrews, Berrak Sisman*

[PDF](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-831)

**TL;DR** — ProSDD is a two-stage speech deepfake detection framework that improves generalization to expressive and emotional attacks by incorporating supervised masked prediction of speaker-conditioned prosodic variations. It reduces the ASVspoof 2024 EER from 39.62% to 7.38% when trained on ASVspoof 2024.

## Key contributions

- Introduces ProSDD, a two-stage supervised masked prediction framework that structures SSL model representations through speaker-conditioned prosodic variation.
- Demonstrates that learning structured prosodic variation exclusively from real speech prior to spoof classification significantly boosts cross-domain and expressive synthesis generalization.
- Employs a lightweight classifier head to prove that performance gains stem from enriched backbone representations rather than complex classification architectures.
- Releases the public code and implementation framework to support community reproducibility.

## Problem

Modern speech deepfake detection (SDD) systems achieve high accuracy on standard benchmarks like ASVspoof, but their performance catastrophically degrades when confronted with emotional, expressive, or out-of-distribution synthetic speech. Traditional fine-tuning relies solely on a binary classification objective over spoof-heavy datasets, which encourages models to learn superficial dataset-specific artifacts instead of true indicators of human speech. Because synthetic generators frequently contain subtle prosodic and temporal inconsistencies, human listeners detect fakes by recognizing deviations from internal models of natural prosodic variability. Existing detectors underutilize this perceptual cue, often treating prosody as a naive auxiliary input rather than using it to structurally reform the self-supervised learning backbone.

## Method

ProSDD processes audio using a pretrained XLS-R backbone across a novel two-stage training scheme. In Stage I, the model undergoes supervised masked prediction on real speech only (LibriSpeech train-clean-100 and dev), explicitly encoding fine-grained prosodic targets combined with utterance-level speaker embeddings. The target representation is constructed by concatenating a 192-dimensional ECAPA-TDNN speaker vector (averaged and L2-normalized across speaker utterances) and a 256-dimensional frame-level prosodic embedding capturing pitch (F0), voice activity, and energy, yielding a 448-dimensional target vector per frame. Span masking is applied to latent features (length 8, probability 0.25), and a linear projection maps 1024-dimensional contextual embeddings to the target space, optimized via an InfoNCE contrastive loss utilizing 100 negatives (split evenly between intra-speaker/different-prosody and inter-speaker/same-prosody) with temperature tau = 0.07.

In Stage II, the Stage I weights initialize training on spoof detection datasets (ASVspoof 2019/2024) using a two-pass strategy per step. A masked pass computes the auxiliary supervised masked prediction loss (using a reduced masking probability of 0.15 and tau = 0.1), while an unmasked pass computes the weighted cross-entropy classification loss using mean-pooled temporal embeddings. The joint objective uses alpha = 1 for classification and a decaying beta schedule (0.2 for the first 4 epochs, then 0.05) for prosodic supervision. The classification head intentionally avoids complex attention modules, relying instead on a simple linear layer, dropout, ReLU activation, and a final linear layer.

## Experimental setup

Experiments use LibriSpeech train-clean-100/dev for Stage I, and ASVspoof 2019 LA train/dev or ASVspoof 2024 train/dev for Stage II. Evaluation is conducted on standard benchmarks (ASVspoof 2019 LA, ASVspoof 2021 LA, ASVspoof 2024 Track 1) and emotional/expressive benchmarks (EmoFake and EmoSpoof-TTS). Baselines include RawNet2, AASIST, and XLSR-SLS. Models are trained for 50 epochs with a batch size of 64 on 4-second audio segments using RawBoost data augmentation, with layerwise learning rates set to 1e-6 (SSL backbone), 1e-4 (projection), and 1e-5 (classifier).

## Results

When trained on ASVspoof 2019 LA, ProSDD achieves a competitive 0.42% EER on ASVspoof 2019 and 3.87% on ASVspoof 2021, while drastically dropping the EER on the challenging expressive ASVspoof 2024 benchmark from 25.43% (XLSR-SLS baseline) down to 16.14%. On emotional datasets under the same 2019 training, ProSDD halves or heavily cuts error rates, recording 3.70% on EmoFake (vs 8.84% for XLSR-SLS) and 9.54% on EmoSpoof-TTS (vs 18.92%).

When trained natively on ASVspoof 2024, ProSDD secures a dramatic headline win over XLSR-SLS on the ASVspoof 2024 test set (7.38% EER vs. 39.62%) and achieves 11.96% on EmoSpoof-TTS and 25.06% on EmoFake. Ablation studies confirm that omitting Stage I real-only prosodic pretraining (w/o Stage I) hurts cross-domain robustness, causing EERs to rise across expressive evaluations (e.g., jumping to 15.02% on EmoSpoof-TTS), while entirely removing masked prediction objectives (w/o MP-SI) collapses performance on traditional benchmarks like ASVspoof 2019 (6.78% EER) and ASVspoof 2021 (25.18% EER).

| Models | ASV 2019 | ASV 2021 | ASV 2024 | EmoFake | EmoSpoof |
|---|---|---|---|---|---|
| RawNet2 (2019 Trained) | 4.60 | 8.08 | 40.67 | 21.71 | 43.04 |
| AASIST (2019 Trained) | 0.83 | 8.15 | 35.53 | 13.64 | 31.06 |
| XLSR-SLS (2019 Trained) | 0.56 | 3.04 | 25.43 | 8.84 | 18.92 |
| ProSDD (2019 Trained) | 0.42 | 3.87 | 16.14 | 3.70 | 9.54 |
| XLSR-SLS (2024 Trained) | 27.00 | 26.54 | 39.62 | 58.57 | 25.92 |
| ProSDD (2024 Trained) | 19.04 | 18.08 | 7.38 | 25.06 | 11.96 |

## Limitations

While ProSDD demonstrates powerful cross-domain generalization, the paper's scope is bounded by its reliance on English speech corpora for Stage I pretraining (LibriSpeech), potentially limiting multilingual prosody modeling. The approach requires extracting multi-modal features like pitch (F0) and energy during pre-processing, which can introduce computational overhead and error propagation under heavy background noise or extreme channel degradations. Furthermore, evaluations are focused primarily on synthetic speech attacks generated by TTS and VC models, leaving open-world audio deepfakes involving semantic script manipulations or complex multi-speaker acoustic environments unexplored.

## Why read this

Speech researchers and security engineers tackling robust deepfake detection under real-world emotional and stylistic distribution shifts should read this to learn how explicit multi-modal prosodic pretraining can re-structure self-supervised backbones without complex classifier layers.

## Code

- https://prosdd.github.io/ProSDD_website/

## Applications

Deploying robust speech authentication systems in telephony, digital media forensics, voice assistant security, and conversational AI safety filters.

## Related

- (link related pages by id as the wiki grows)
