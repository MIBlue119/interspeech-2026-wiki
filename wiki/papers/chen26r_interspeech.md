---
id: chen26r_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1683
pdf: https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.pdf
---

# Explainable and Trustworthy Speech Emotion Recognition Using Confidence Score and Reinforcement Learning Rectified Speech Emotion Descriptors

[PDF](https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1683)

**TL;DR** — This paper proposes a confidence score filtering and reinforcement learning-based on-the-fly speech emotion descriptor (SED) rectification framework for explainable speech emotion recognition, achieving absolute accuracy gains of 2.9% on IEMOCAP and 3.3% on MELD.

## Problem

Explainable speech emotion recognition (SER) systems relying on speech-LLMs often use automatically annotated speech emotion descriptors (SEDs) like pitch, volume, and age. However, these labels are generated offline using a rigid, unified threshold that ignores speaker variations, leading to supervision errors and unreliable explanations. Training on such noisy labels hurts both end-task performance and the trustworthiness of the model's intermediate interpretations.

## Method

The approach integrates two main components into a pretrained SER-speech-LLM (SER-SLM) framework. First, a lightweight Confidence Estimation Model (CEM)—built using a 3-layer residual feed-forward network with mean pooling—evaluates utterance-level SED confidence to select a reliable subset for supervised fine-tuning. Second, an RNN-based SED Controller (using a 1-layer LSTM) generates on-the-fly SED rectification policies (retaining or modifying tokens) during training, optimized via group relative policy optimization (GRPO) using emotion classification rewards. Pre-training uses 670k utterances from GigaSpeech-m via SpeechCraft, and post-training uses IEMOCAP and MELD.

## Results

Evaluated on IEMOCAP and MELD test sets, the best system combining confidence-based data selection and RL-based SED rectification surpasses the unrectified baseline by 2.9% and 3.3% absolute accuracy (3.7% and 5.4% relative), respectively. The approach is compared against general-purpose SLMs like Qwen2-Audio and Kimi-Audio, as well as specialized SER models like VIB-Emo and BLSP-Emo. Ablations confirm that both confidence-based filtering and the RL SED controller independently and jointly boost performance and explanation trustworthiness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing transparent, explainable speech emotion recognition systems, empathetic conversational agents, or multimodal dialogue managers.

## Limitations

The method relies on an initial automated annotation pipeline to establish baseline SED labels and requires auxiliary models (CEM and SED Controller) during the post-training phase.

## Related

- (link related pages by id as the wiki grows)
