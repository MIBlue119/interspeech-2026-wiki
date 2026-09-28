---
id: yang26m_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2035
pdf: https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.pdf
---

# Multi-View Based Audio Visual Target Speaker Extraction

[PDF](https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2035)

**TL;DR** — The paper introduces Multi-View Tensor Fusion (MVTF), a framework that leverages synchronized multi-perspective lip videos during training to learn robust audio-visual target speaker extraction, achieving 15.836 dB SI-SDR on single-view frontal testing.

## Problem

Audio-Visual Target Speaker Extraction systems predominantly assume the availability of frontal facial views, causing performance degradation when speakers exhibit head rotations or non-frontal angles in real-world scenarios. Prior attempts rely on face frontalization, which discards original visual details and fails when correction breaks down. Addressing this by requiring multi-camera setups at test time is impractical, necessitating a method that leverages multi-view complementary cues during training while supporting flexible single-view inference.

## Method

The framework builds on a TF-GridNet audio separation backbone and a pre-trained lipreading network for visual feature extraction, paired with a Multi-View Tensor Fusion (MVTF) module. Lip embeddings from different angles are processed through a shared LSTM, and pairwise outer products explicitly model unimodal and bimodal multiplicative interactions between views. The resulting interaction tensors are flattened, flattened and projected back via LayerNorm and linear layers, and averaged across view pairs to construct a view-invariant representation. The model is trained from scratch using Scale-Invariant Signal-to-Distortion Ratio (SI-SDR) loss on 10,000 utterances from the MEAD dataset with random multi-view sampling.

## Results

Evaluated on the neutral-emotion MEAD dataset comprising 1,000 test mixtures, MVTF-GridNet (trained with random 3 out of 7 views) achieves an average SI-SDR of 15.836 dB on frontal view inputs, outperforming baseline GridNet trained on random views (15.107 dB) and frontal-only views (13.321 dB). Alternative fusion strategies such as Projected Addition and Attention Fusion achieved average SI-SDRs of 14.588 dB and 14.591 dB respectively, underperforming compared to MVTF. Ablations show that training with random multi-view selection consistently surpasses repeat-view or single-view training strategies.

## Code

- https://b23ca07a.github.io/MVTF-Gridnet/

## Applications

Speech engineers and developers building robust target speaker extraction systems, hearing aids, and speech recognition pipelines deployed in unconstrained environments with head movement.

## Limitations

Evaluated exclusively on neutral-emotion segments of the MEAD dataset to isolate viewpoint variations from emotional changes.

## Related

- (link related pages by id as the wiki grows)
