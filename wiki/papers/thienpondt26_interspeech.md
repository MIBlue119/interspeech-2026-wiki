---
id: thienpondt26_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2471
pdf: https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.pdf
---

# Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2471)

**TL;DR** — This paper presents a weakly supervised multi-speaker embedding model that eliminates external VAD and segmentation dependencies, achieving a 13.7% average relative reduction in confusion error rate across standard diarization benchmarks.

## Problem

Traditional cascaded speaker diarization pipelines rely on separate voice activity detectors, speaker segmentation models, and overlapping window heuristics that yield coarse boundaries. End-to-end alternatives provide granular frame-level boundaries but require scarce frame-level training annotations and struggle on diverse scenarios. Hybrid systems combine both but still necessitate complex multi-model training pipelines using difficult-to-acquire frame-level labels.

## Method

The architecture builds upon a pre-trained ECAPA2 speaker embedding extractor with a channel-attentive VAD mechanism. During multi-speaker fine-tuning (MSFT), the pre-pooling encoder and VAD layers are frozen, and a speaker activity detection (SAD) module consisting of two BLSTM layers is introduced to project features into speaker activity logits. The model processes 4-second training chunks containing single or dual speakers and is optimized using a permutation-invariant additive angular margin (AAM) softmax loss. Squeeze-excitation layers are removed to prevent global statistics from interfering with SAD, and training uses VoxCeleb2 combined with Multilingual LibriSpeech (MLS) for simulated speaker turns.

## Results

Evaluated on the AMI headset partition, VoxConverse, and DIHARD III benchmarks using spectral clustering and a forgiveness collar of 0.25 seconds. The proposed ECAPA2 + MSFT system reduces confusion error rates compared to the baseline ECAPA2, achieving 1.2% on AMI (down from 1.6%), 1.6% on VoxConverse (down from 2.2%), and 3.96% on DIHARD III (down from 4.6%). Ablation studies confirm that freezing modules, removing squeeze-excitation layers, and incorporating MLS data are critical for minimizing equal error rate and confusion error rates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building streamlined speaker diarization pipelines for multi-speaker conversational audio without frame-level supervision.

## Limitations

The current model formulation does not explicitly model overlapping speech.

## Related

- (link related pages by id as the wiki grows)
