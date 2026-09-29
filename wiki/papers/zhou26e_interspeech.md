---
id: zhou26e_interspeech
category: tts
labels: [multilingual, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1696
pdf: https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.pdf
---

# Beyond One-Size-Fits-All: Personalized and Culturally Adaptive Emotional TTS via Interactive Optimization of Individual Emotion Perception Spaces

*Wangzixi Zhou, Bagus Tris Atmaja, Sakriani Sakti*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1696)

**Category:** `tts` · **Labels:** `multilingual`, `generative-model`

**TL;DR** — This paper introduces a lightweight post-training personalization and cultural adaptation framework for emotional Text-to-Speech (TTS) that optimizes individual arousal-valence (A-V) perception spaces using an Interactive Genetic Algorithm (IGA). Evaluated across Japanese, Chinese, and Indonesian participants, the proposed emotion controller improves MOS from 3.37 to 3.75, reduces WER from 21% to 17%, and achieves a 76% preference rate over one-size-fits-all U.S.-data baselines.

## Key contributions

- A lightweight post-training personalization framework for emotional TTS that adapts arousal-valence representations to individual listeners using an Interactive Genetic Algorithm (IGA) under limited feedback.
- An emotion controller module combining Gaussian Fourier feature mapping, an emotion feature predictor, and FastSpeech 2-derived pitch and energy predictors to map continuous A-V coordinates to high-dimensional acoustic features.
- A multi-cultural evaluation involving Chinese, Indonesian, and Japanese participants demonstrating that both per-user personalization and cultural adaptation significantly improve perceptual emotional alignment.
- Empirical evidence that default U.S.-based A-V mappings fail to capture cross-cultural and individual variability, with participants consistently preferring their own cultural or personalized A-V maps.

## Problem

Most emotional TTS systems rely on discrete emotion labels or dimensional arousal-valence (A-V) models trained on averaged population-level annotations from single cultural groups (typically U.S.-centric). This assumption of a universal mapping between acoustic cues and perceived affect causes severe mismatches because human emotional perception is deeply subjective, personal, and culturally mediated. Prior approaches like reinforcement learning with human feedback (RLHF) target massive dataset-level alignment and require heavy gradient-based retraining of backbones. The field lacks a rapid, per-user adaptation mechanism that can align emotional expression with individual perception spaces without retraining or fine-tuning the underlying high-dimensional neural TTS acoustic model.

## Method

The system utilizes Grad-TTS as the acoustic backbone operating on 80-dimensional mel-spectrograms with a HiFi-GAN vocoder. To bridge low-dimensional control and high-dimensional audio, the framework incorporates an Emotion Controller consisting of an Emotion Feature Predictor, a Pitch Predictor, and an Energy Predictor. The Emotion Feature Predictor takes continuous A-V coordinates e = [a, v] in R^2, passes them through a Gaussian Fourier feature mapping (using a fixed matrix B and dimension Df), and feeds the resulting vector into a 4-layer MLP with SiLU activations and dropout to predict a latent emotion feature vector h_pred matching target features h_gt extracted from a pre-trained Speech Emotion Recognition (SER) model.

Personalization is executed via an Interactive Genetic Algorithm (IGA) without modifying the pretrained acoustic backbone. Given a target emotion category, the system generates a population of N = 10 candidate A-V coordinates, synthesizes speech samples using the generator G, and presents them to the user. The user selects preferred samples to form a parent set P. New child coordinates are produced using multi-parent arithmetic crossover (random weighted combination of parents where weights sum to 1) and uniform mutation driven by perturbation U(-Mg, Mg). The mutation strength Mg decays multiplicatively over generations g via M_{g+1} = gamma * M_g (with initial M_1 = 0.20, decay rate gamma = 0.90, and lower bound M_min = 0.05). This converges within approximately 3 rounds of interaction, yielding a personalized variant of Russell's circumplex model for each listener.

## Experimental setup

The model was trained on a 9-hour American English female emotional speech dataset at 22.05 kHz constructed by combining EXPRESSO, EmoV-DB, and ESD. Ground-truth A-V values for training were estimated using a pre-trained SER model. The models were trained for 2000 epochs using the Adam optimizer on a single NVIDIA RTX A6000 GPU. Evaluations used 100 synthesized utterances measured via Word Error Rate (WER), Concordance Correlation Coefficient (CCC) for arousal and valence, a 5-point MOS naturalness scale, and blind A/B preference tests with 30 participants across Chinese, Indonesian, and Japanese cultural groups.

## Results

The proposed Grad-TTS with the emotion controller outperforms the baseline Grad-TTS with simple emotion embeddings, raising MOS from 3.37 to 3.75 and reducing WER from 21% to 17%. Emotional similarity also improves substantially, increasing CCC(A) from 0.60 to 0.84 and CCC(V) from 0.64 to 0.77. In blind A/B preference tests, listeners preferred speech generated using their IGA-personalized A-V mappings over the U.S.-based baseline 76% of the time.

For cross-cultural evaluations, participants who did not undergo IGA personalization preferred culturally adapted A-V averages (Chinese, Indonesian, Japanese) over the U.S. baseline with preference rates of 64.8%, 69.8%, and 65.6% respectively. Furthermore, in cross-cultural ranking tests, participants consistently preferred speech synthesized using their own culture's A-V mapping (e.g., Chinese participants selected Chinese mappings 65% of the time, Japanese 67%, and Indonesian 70%).

| System / Condition | MOS (^\uparrow) | WER (%) (\downarrow) | CCC(A) (^\uparrow) | CCC(V) (^\uparrow) |
|---|---|---|---|---|
| Ground Truth | 4.04 ± 0.09 | - | - | - |
| Grad-TTS w/ emo emb | 3.37 ± 0.10 | 21 | 0.60 | 0.64 |
| Grad-TTS w/ emo ctrl (Proposed) | 3.75 ± 0.09 | 17 | 0.84 | 0.77 |

## Limitations

The current framework relies on a fixed English-trained acoustic backbone and SER model, limiting native cross-lingual text synthesis. The IGA adaptation requires direct interactive user feedback over multiple rounds, which may introduce listener fatigue if scaled to many emotion categories. The evaluation is currently restricted to three Asian cultural groups and seven basic emotion categories, leaving spontaneous, mixed, or high-dimensional affective states largely unexplored.

## Why read this

Speech and ML researchers focusing on affective computing, personalization, or human-in-the-loop alignment should read this paper to see how low-dimensional black-box evolutionary search (IGA) can effectively customize continuous emotion control spaces without expensive gradient-based backbone retraining.

## Code

- https://37integer.github.io/Beyond-One-Size-Fits-All/

## Applications

Personalized conversational agents, empathetic virtual assistants, culturally adaptive digital tutors, and video game NPC voice generation requiring fine-grained user-specific emotional tuning.

## Institutions / 機構

Nara Institute of Science and Technology

**Funding / 經費:** JSPS KAKENHI, JST NEXUS

## Related

- (link related pages by id as the wiki grows)
