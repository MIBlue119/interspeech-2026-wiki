---
id: zhang26fa_interspeech
category: asr
labels: [efficient-on-device, self-supervised, streaming-real-time]
institutions: ["Harbin Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2485
pdf: https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.pdf
---

# MPA-KWS: Multi-Modal Phoneme-Level Alignment for Streaming Open-Vocabulary Keyword Spotting

*Jue Zhang, Guibin Zheng, Jiarui Zhang, Jiqing Han, Chenhao Jing*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2485)

**Category:** `asr` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`

**TL;DR** — MPA-KWS is a streaming multimodal open-vocabulary keyword spotting framework that leverages W-CTC forced alignment and phoneme-level contrastive learning to achieve state-of-the-art performance on confusable words. On the challenging LibriPhrase-Hard dataset, it achieves an EER of 8.21% under text-audio enrollment and 9.53% under text-only enrollment with a compact 4.0M parameter footprint.

## Key contributions

- Proposes MPA-KWS, a streaming open-vocabulary keyword spotting framework supporting both text-only and text-audio enrollments.
- Introduces a dynamic data augmentation strategy based on CTC beam search to mine hard negative pronunciation variants.
- Designs a phoneme-level contrastive learning objective that combines Asymmetric Proxy (AsyP) loss for cross-modal matching and symmetric InfoNCE for intra-modal alignment.
- Integrates a lightweight multi-head cross-attention bias module to inject keyword phoneme context into the acoustic encoder without increasing streaming latency.

## Problem

Traditional open-vocabulary keyword spotting relies on utterance-level representations that struggle to discriminate acoustically confusable words. While recent non-streaming phoneme-aligned approaches achieve high accuracy, their high time complexity and dependence on full-sequence context make them unsuitable for real-time streaming. Conversely, existing streaming methods using connectionist temporal classification (CTC) are restricted to text-only enrollment and lack modality fusion, while suffering from training-inference mismatches and failing to address acoustic-text asymmetry.

## Method

The architecture consists of five components: a text feature extractor (G2P model, embedding lookup, and a single-layer BiLSTM producing 256-dimensional phoneme embeddings), an acoustic feature extractor (an 18-layer Conv1dNet with depthwise separable convolutions, causal squeeze-and-excitation modules, and DoubleSwish activations operating at a 4x downsampling rate), a W-CTC forced alignment module, a phoneme-level contrastive learning module, and a BiGRU-based verifier.

To bridge the modality gap, a multi-head cross-attention bias module (4 heads) uses precomputed support text embeddings as keys and values to inject keyword phoneme priors directly into the acoustic frames without latency. The W-CTC forced alignment module appends wildcard tokens to handle arbitrary start/end alignment boundaries, dropping blank frames and computing confidence weights to aggregate frame-level acoustic embeddings into phoneme-level representations (E^phn in R^{L_p 	imes d}).

For contrastive learning, the model employs an Asymmetric Proxy (AsyP) loss for cross-modal text-audio pairs—treating the deterministic text embedding as a proxy invariant reference while accounting for environmental audio variance—and a symmetric InfoNCE loss (temperature τ = 0.04) for intra-modal audio-audio matching. During training, multi-task optimization minimizes cross-entropy for the verifier (L_UAT), phoneme-text contrastive loss (L_PAT), and phoneme-audio contrastive loss (L_PAA). Text-only enrollment is simulated by masking support audio 50% of the time. Dynamic data augmentation uses CTC beam search (mining top-K non-ground-truth hypotheses) to generate hard negative text pairs during training.

## Experimental setup

Evaluated on the LibriPhrase dataset (derived from LibriSpeech train-clean-100/360 for training and train-other-500 for testing), which is split into LibriPhrase-Hard (LPH) and LibriPhrase-Easy (LPE) subsets based on edit distances. Compared against baselines including CMCD, CED, AdaKWS-Tiny, W-CTC, MM-KWS, and PLCL. Metrics reported are Area Under the Curve (AUC %) and Equal Error Rate (EER %). Implemented in PyTorch using the AdamW optimizer (initial lr 5e-4, weight decay 0.05, batch size 500) on a model with 4.03M parameters.

## Results

In the text-audio enrollment mode, MPA-KWS achieves an AUC of 97.30% and an EER of 8.21% on LibriPhrase-Hard (LPH), outperforming the state-of-the-art PLCL method (which uses a much larger Whisper-Tiny encoder) which scores 8.47% EER. In text-only mode, it reaches 96.04% AUC and 9.53% EER on LPH, surpassing the W-CTC streaming baseline (10.21% EER). On the easy subset (LPE), it achieves 99.98% AUC and 0.45% EER (text-audio).

Ablation studies reveal that replacing the AsyP loss with InfoNCE degrades LPH EER from 8.21% to 9.04%, removing the cross-attention bias module increases EER to 9.52%, dropping phoneme-level loss spikes EER to 11.87%, and omitting the CTC beam-search data augmentation causes EER to jump to 12.52%.

| Modality | Method | AUC (LPH) % | AUC (LPE) % | EER (LPH) % | EER (LPE) % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| T | CMCD | 73.58 | 96.70 | 32.90 | 8.42 |
| T | AdaKWS-Tiny | 93.75 | 99.80 | 13.47 | 1.61 |
| T | W-CTC | 95.93 | 99.95 | 10.21 | 0.91 |
| TA | PLCL | 96.59 | 99.97 | 8.47 | 0.57 |
| T | MPA-KWS (Ours) | 96.04 | 99.95 | 9.53 | 0.77 |
| TA | MPA-KWS (Ours) | 97.30 | 99.98 | 8.21 | 0.45 |

## Limitations

Evaluated exclusively on English data derived from LibriSpeech, leaving multilingual scalability untested. The model's reliance on a G2P model for text conversion introduces dependency on grapheme-to-phoneme accuracy, and evaluation is limited to phrase-level utterances (1-4 words) rather than continuous, unconstrained conversational audio streams.

## Why read this

Speech and ML engineers building low-latency, on-device keyword spotting systems will find this paper valuable for its practical integration of W-CTC streaming alignments with asymmetric contrastive learning. It offers a clear recipe for improving robustness against acoustically confusable words without scaling up model size.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device voice assistants, hands-free wake-word detection, smart home appliances, and wearable voice-controlled hardware.

## Institutions / 機構

Harbin Institute of Technology

## Related

- (link related pages by id as the wiki grows)
