---
id: you26b_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1032
pdf: https://www.isca-archive.org/interspeech_2026/you26b_interspeech.pdf
---

# Bidirectional Retention Network-based Segmentation Model for Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/you26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/you26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1032)

**TL;DR** — This paper proposes a speaker diarization segmentation model that replaces traditional back ends with a bidirectional Retention Network (BiRetNet) combined with a WavLM front end, achieving state-of-the-art diarization error rates on AISHELL-4 and VoxConverse datasets.

## Problem

Traditional end-to-end neural diarization (EEND) frameworks struggle to scale to long recordings and a high, unknown number of speakers, while cascaded pipelines fail to adequately handle overlapped speech. Although EEND with vector clustering (EEND-VC) addresses long-context scalability, its local segmentation back ends typically rely on standard RNNs, Transformers, or state-space models which either lack linear sequence scaling or underperform in capturing complex temporal speaker dynamics.

## Method

The architecture integrates a pre-trained WavLM Base+ front end (producing 768-dimensional frame-level representations reduced to 256 via linear projection) with a four-block bidirectional Retention Network (BiRetNet) back end utilizing a 1024 hidden size feed-forward network and a chunk size of 100 frames (2 seconds). Training utilizes a powerset loss formulation (max speakers N=4, max concurrent speakers K=2) across a 952-hour compound dataset. It operates in two stages: training the back end with frozen WavLM, followed optionally by joint fine-tuning and dataset-specific domain adaptation.

## Results

Evaluated across multiple evaluation sets including AMI, AISHELL-4, AliMeeting, NOTSOFAR-1, MSDWild, VoxConverse, and DIHARD III using DiariZen/Pyannote and VBx clustering, the BiRetNet model achieves a macro average DER of 20.5% (frozen WavLM baseline) and improves to 15.0% with domain adaptation, securing state-of-the-art results on AISHELL-4 (9.9%) and VoxConverse (8.5%). Ablations show that a 4-block depth and a 2-second chunk size (100 frames) optimize the DER trade-offs. In CPU computational efficiency tests on AliMeeting, BiRetNet maintains a stable RTF of ~1.5 and peak memory usage of 611-680 MB, outscaling attention-based memory growth.

## Code

- https://github.com/frankyoujian/BiRetNetDiarization

## Applications

Speech and ML engineers building robust speaker diarization and meeting transcription systems that require overlap-awareness and scalability to long-form audio recordings.

## Limitations

Missed speech detections and speaker confusion remain dominant error sources, particularly in dense acoustic scenarios with high speaker overlap like NOTSOFAR-1.

## Related

- (link related pages by id as the wiki grows)
