---
id: li26y_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1586
pdf: https://www.isca-archive.org/interspeech_2026/li26y_interspeech.pdf
---

# KFC-KWS: Keyframe Fusion with CTC for User-Defined Keyword Spotting

[PDF](https://www.isca-archive.org/interspeech_2026/li26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1586)

**TL;DR** — KFC-KWS proposes a multimodal framework for user-defined keyword spotting that leverages connectionist temporal classification peaky posteriors for keyframe selection, achieving 98.73% balanced AUC on LibriPhrase.

## Problem

User-defined keyword spotting struggles to distinguish target keywords from phonetically confusable alternatives that differ by only one or two phonemes. Full-utterance matching methods treat all frames equally, which dilutes subtle phonetic distinctions and leads to false activations. Furthermore, many open-vocabulary approaches rely on costly training pipelines or extra memory bank modules.

## Method

The architecture comprises a frozen 0.3B XLS-R audio encoder, a G2P phoneme converter with 64-dim embeddings, and a multilingual DistilBERT text encoder, projecting all modalities to a shared 128-dim space. It processes representations through two parallel branches: QbyOmni (full sequence cross-modal self-attention and GRU) and QbyKeyframe (CTC posterior-guided keyframe selector with a symmetric context window of 2w+1=5 frames, combined with cosine similarity and cross-attention). During training, a modality dropout of p=0.5 is applied independently across enrollment streams. The model contains roughly 2.0M trainable parameters and is trained using a composite loss function combining utterance-level binary cross-entropy, frame-level phoneme losses, and CTC supervision.

## Results

Evaluated on the LibriPhrase benchmark (partitioned into easy LPE and hard LPH subsets), KFC-KWS achieves a balanced AUC of 98.73% and attains 97.65% AUC with a 7.75% EER on the challenging hard subset. It outperforms robust baselines like PLCL and HyperSpotter-c on the hard subset while using significantly fewer trainable parameters (2.0M). Ablations confirm that modality dropout yields steady performance gains and that the keyframe mechanism successfully isolates confusable phoneme intervals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building voice-interactive edge or server devices supporting personalized, open-vocabulary user-defined keyword enrollment.

## Related

- (link related pages by id as the wiki grows)
