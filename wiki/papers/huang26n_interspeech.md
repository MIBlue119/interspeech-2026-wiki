---
id: huang26n_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1996
pdf: https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.pdf
---

# EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation

[PDF](https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1996)

**TL;DR** — The paper introduces EmoEUS, an explicit uncertainty supervision framework for multimodal emotion recognition in conversation that dynamically weights modality contributions based on learned variances.

## Problem

Multimodal conversational data frequently contains conflicting signals, varying noise, or missing modality-specific cues that cause inconsistent reliability across utterances. Traditional emotion recognition models typically ignore these discrepancies and assume uniform reliability, or they model uncertainty only implicitly through standard classification loss. This lack of explicit supervision makes it difficult to dynamically adjust modality fusion under uncertain conversational contexts.

## Method

The EmoEUS framework comprises three core components: a context-level distribution estimator module (ContextDEM), an uncertainty-aware multimodal fusion (UAMF) mechanism, and an explicitly supervised loss (ESL). Modality features are first extracted via RoBERTa for text, Wav2vec2.0 for audio, and CLIP for visual inputs, and are subsequently processed by bidirectional GRUs. ContextDEM transforms these point-wise features into Gaussian distributions with means and variances using Transformer encoders and dual-branch MLPs. UAMF computes relative uncertainty ratios to derive confidence weights that suppress unreliable modalities via element-wise multiplication before global context modeling. Finally, ESL explicitly aligns the predicted variance of each utterance with the 2-Wasserstein distance between the utterance-level distribution and its corresponding global emotion- and modality-specific cluster center.

## Results

Evaluated on the IEMOCAP and MELD datasets using accuracy and weighted F1-score as evaluation metrics, EmoEUS consistently outperforms multiple state-of-the-art baselines including DialogRNN, DialogGCN, MMGCN, M2FNet, CFN-ESA, AdaIGN, MDAG, DER-GCN, and FEMI. The full model yields superior balanced performance across all emotion categories without heavy class biases, achieving weighted F1 scores above 70 percent for every emotion class on IEMOCAP. Ablation studies confirm that removing either the uncertainty-aware fusion or the explicit supervision loss degrades overall recognition performance across both datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on affective computing, intelligent medical care systems, and advanced human-computer interaction applications.

## Related

- (link related pages by id as the wiki grows)
