---
id: chen26r_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1683
pdf: https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.pdf
---

# Explainable and Trustworthy Speech Emotion Recognition Using Confidence Score and Reinforcement Learning Rectified Speech Emotion Descriptors

*Youjun Chen, Xurong Xie, Mengzhe Geng, Zengrui Jin, Jiajun Deng, Guinan Li, Shujie Hu, Huimeng Wang, Haoning Xu, Chengxi Deng, Bowen Zhang, Xunying Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1683)

**TL;DR** — This paper introduces a confidence-score-based data selection method and a reinforcement-learning-driven on-the-fly SED (speech emotion descriptor) controller to improve explainable speech emotion recognition (SER), achieving absolute accuracy gains of 2.9% on IEMOCAP and 3.3% on MELD over full-data baselines.

## Key contributions

- Pioneers a confidence score-based data selection approach using a lightweight MLP confidence estimation model to filter and select reliable automatically annotated SED subsets for SFT.
- Introduces an RNN-based SED Controller trained via reinforcement learning to generate on-the-fly SED rectification policies (retaining or modifying labels) during SER-SLM post-training.
- Systematically investigates the impact of SED label quality on SER performance and trustworthiness using comparative tests and t-SNE latent space visualizations.

## Problem

Explainable SER systems relying on automatically annotated speech emotion descriptors (such as pitch, volume, speed, gender, and age) suffer from low label reliability due to unified thresholding across diverse speakers, lack mechanisms to correct these noisy labels during training, and produce untrustworthy explanations when trained on uncurated data. Prior SLM and LLM approaches—such as BLSP-Emo, VIB-Emo, and OSUM-EChat—fail to address label noise dynamically, resulting in suboptimal classification accuracy and uninterpretable feature representations. Resolving this is critical for deploying reliable human-computer interaction agents that can justify their emotion classifications using fine-grained acoustic and speaker traits.

## Method

The framework builds upon a pre-trained SER-SLM (using Variational Information Bottleneck for feature disentanglement from HuBERT embeddings) and incorporates two key components: data filtering and online label rectification. First, a confidence estimation model (CEM)—a lightweight 3-layer residual feed-forward MLP with batch normalization, ReLU activation, dropout, and a final Mean Pooling layer—takes the last hidden states of the SLM decoder and outputs a smoothed utterance-level confidence score (aggregated across pitch, volume, speed, gender, and age predictions). Utterances falling below a preset retention threshold (e.g., 90%) are discarded prior to fine-tuning.

To prevent the loss of difficult samples or training data caused by aggressive filtering, an RNN-based SED Controller (parameterized by a 1-layer LSTM, concat layer, and a softmax decoder) is introduced for on-the-fly rectification. Taking mel-spectrograms and original SED token embeddings as input, the controller evaluates M candidate policies per step, deciding whether to retain or modify each SED token. The SER-SLM is trained across M sampled rectification policies using an aggregated cross-entropy loss over text transcriptions, emotion labels, and rectified SED tokens.

Following each training step, policy rewards are computed from the emotion classification cross-entropy losses (L^emo) and normalized across the M group policies (similar to GRPO). The SED Controller is then updated via policy gradient scaling with these group-normalized rewards. This alternating optimization loop allows the model to dynamically correct noisy descriptors while stabilizing convergence through variance-normalized reward feedback, ultimately yielding tightly clustered latent representations for distinct emotional categories.

## Experimental setup

Experiments utilize the GigaSpeech-m subset of SpeechCraft (~670k utterances) for pre-training and CEM training (randomly sampling 100k positive-negative pairs from 261.3k incorrect and 408.7k correct predictions). Downstream post-training and evaluations are performed on the IEMOCAP and MELD corpora. Baselines include general-purpose SLMs (Kimi-Audio, Qwen2-Audio, Audio-Flamingo-3, Step-Audio-R1) and explainable SER models (OSUM-EChat, BLSP-Emo, VIB-Emo). The SER-SLM is optimized using AdamW (lr=2e-4, 10% warmup) for 2 pre-training epochs and 20k post-training steps, while the CEM uses Adam (lr=1e-3, dropout=0.1) and the SED Controller uses Adam (lr=3e-4, hidden size 128, embedding size 32, with M=6 policy samples).

## Results

The best-performing system combining a 90% confidence score data retention threshold and RL-based on-the-fly SED rectification (Sys. 10) achieved an accuracy of 80.98% on IEMOCAP and 64.11% on MELD (69.55% average), outperforming the uncurated full-data baseline (Sys. 4: 78.08% IEMOCAP, 60.81% MELD) by absolute gains of 2.9% and 3.3% respectively. When applied independently, data selection alone peaked at an 80% retention ratio (Sys. 6, 67.39% avg), but coupling it with RL rectification shifted the optimal retention ratio to 90%, proving that on-policy correction safely accommodates less aggressively filtered data. In ablation studies over the number of policy samples M, M=6 maximized performance (69.55% avg), whereas smaller (M=2) or larger (M=10) sample sizes degraded average accuracy down to 68.07% and 68.95%. The system does not dominate every isolated subset condition by wide margins, and its effectiveness remains bound by the initial quality of automatically generated supervision cues.

| System | IEMOCAP (%) | MELD (%) | Average (%) |
|---|---|---|---|
| Baseline (Sys. 1, No SED/SFT) | 63.01 | 48.73 | 53.33 |
| Baseline w/ Domain SFT (Sys. 4) | 78.08 | 60.81 | 66.38 |
| Data Selection Only (90%, Sys. 5) | 78.40 | 62.04 | 67.31 |
| Data Selection Only (80%, Sys. 6) | 78.89 | 61.92 | 67.39 |
| RL Rectification Only (Sys. 9) | 79.85 | 62.96 | 68.41 |
| Ours (90% + RL Rectification, Sys. 10) | 80.98 | 64.11 | 69.55 |

## Limitations

The approach relies heavily on the quality and domain coverage of automatically annotated SED tools derived from large-scale pre-training sets like SpeechCraft, meaning errors in initial pseudo-labels can propagate if confidence estimation miscalibrates. The method introduces computational overhead from sampling multiple SED policies (M=6) per training step and maintaining an alternating RL optimization loop. Scope is currently bounded to English-centric benchmark datasets (IEMOCAP, MELD), leaving multilingual and real-world in-the-wild robustness unverified.

## Why read this

Speech and ML researchers building explainable speech-language models will learn how to combine confidence-based filtering with reinforcement learning policy optimization to handle noisy auxiliary supervision. It provides a blueprint for making multi-task audio LLMs simultaneously more accurate and trustworthy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Explainable conversational agents, empathetic virtual assistants, and psychiatric or customer-service analytics platforms requiring interpretable emotional intelligence.

## Related

- (link related pages by id as the wiki grows)
