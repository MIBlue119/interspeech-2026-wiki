---
id: thienpondt26_interspeech
category: speaker
institutions: ["Ghent University", "imec"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2471
pdf: https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.pdf
---

# Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization

*Jenthe Thienpondt, Kris Demuynck*

[PDF](https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thienpondt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2471)

**Category:** `speaker`

**TL;DR** — This paper introduces a weakly supervised multi-speaker embedding model and training strategy that simultaneously extracts frame-level voice activity, speaker activity, and speaker-specific embeddings, achieving a 13.7% average relative improvement in confusion error rate across standard diarization benchmarks.

## Key contributions

- Proposes a weakly supervised multi-speaker fine-tuning (MSFT) strategy that requires only utterance-level speaker labels to train frame-level VAD and speaker activity detection (SAD) modules.
- Eliminates the dependency on external VAD and speaker segmentation models in cascaded diarization pipelines while avoiding the need for expensive frame-level annotated training data.
- Introduces a permutation-invariant additive angular margin (AAM) softmax loss for multi-speaker embedding extraction.
- Achieves an average relative improvement of 13.7% in confusion error rate over baseline ECAPA2 systems across AMI, VoxConverse, and DIHARD III benchmarks.

## Problem

Traditional cascaded speaker diarization systems rely on coarse sliding-window speaker boundaries and require complex multi-stage pipelines involving external VAD, speaker segmentation, and clustering. Conversely, end-to-end diarization models can predict frame-level speaker activity directly but depend on sparsely available, expensive frame-level labeled training datasets and often underperform in unconstrained scenarios. Recent hybrid approaches attempt to bridge this gap by combining local end-to-end window processing with global clustering, but they still require training multiple independent models on difficult-to-obtain frame-level annotations. This work addresses the challenge of building a unified, lightweight system that provides granular speaker boundaries and interference-reduced embeddings using only weak, utterance-level supervision.

## Method

The architecture builds upon the ECAPA2 speaker embedding extractor. First, a single-speaker pre-training phase incorporates a channel-attentive mechanism where frame-level attention scalars function as VAD logits. Second, a multi-speaker fine-tuning (MSFT) stage freezes the pre-pooling encoder and VAD layers while introducing a speaker activity detection (SAD) module composed of two bidirectional LSTM layers that project pre-pooling features to speaker activity logits for up to two speakers. The sum of SAD and VAD logits is temporally normalized via softmax, followed by attentive mean/standard deviation pooling per speaker and a linear projection to output speaker-specific embeddings. Optimization uses a permutation-invariant additive angular margin (AAM) softmax loss operating solely on utterance-level speaker labels.

During inference, the model extracts frame-level features and VAD logits to form continuous speech segments. For each segment, extraction windows (2-second length, 1-second hop) are processed to compute speaker embeddings and activity logits. The system checks the cosine similarity between the two speaker embeddings against a threshold (λ_sim): if high, it falls back to a single-speaker embedding; if low, it splits the window into continuous speech segments per speaker using maximum speaker activity values. Unsupervised spectral clustering on these cleaner, interference-reduced embeddings determines final speaker identities, complemented by an overlap-midpoint heuristic for remaining edge cases.

## Experimental setup

Single-speaker pre-training and MSFT utilize the development partitions of VoxCeleb2 and Multilingual LibriSpeech (MLS), the latter providing uniform background conditions for artificial speaker-change utterances. Fine-tuning uses 4-second training utterances (50% single-speaker, 50% two-speaker generated via concatenation) with a batch size of 128 and an AAM-softmax margin penalty of 0.2. Evaluation is conducted on the AMI headset partition (Full-corpus-ASR), VoxConverse, and DIHARD III benchmarks using oracle VAD with a 0.25-second forgiveness collar, reporting voice activity and confusion (CNF) error rates.

## Results

The proposed ECAPA2 + MSFT system achieves a confusion error rate of 1.2 on AMI (vs 1.4 baseline), 1.9 on VoxConverse (vs 2.2 baseline), and 4.0 on DIHARD III (vs 4.6/4.7 baseline), representing an average relative improvement of 13.7% over the best comparable published results. Subdomain analysis on DIHARD III reveals the largest confusion reductions in clean background conditions such as telephone speech (CTS, -31.68%) and clinical audio (-28.53%), though performance remains stable or slightly degraded in dense overlapping conditions like meetings (+1.36%) and restaurants (+2.08%).

Ablations demonstrate that removing pre-training or unfreezing the backbone during MSFT drastically harms verification equal error rates (EER jumping from 0.57 to 1.11+ on Vox1-est), and retaining global squeeze-excitation (SE) layers degrades multi-speaker verification by 10.5% due to interference with local SAD statistics.

| System | AMI CNF | VoxConverse CNF | DIHARD III CNF |
|---|---|---|---|
| ECAPA-TDNN [26] | 4.0 | – | – |
| TitaNet-L [28] | 1.9 | – | – |
| DR-DESA [29] | – | 2.8 | 5.5 |
| ECAPA2 [16] | 1.4 | 2.2 | 4.6 |
| ECAPA2 + MSFT (ours) | **1.2** | **1.9** | **4.0** |

## Limitations

The current system is strictly limited to extracting a maximum of two speakers per extraction window, making it less optimal for highly overlapped or dense multi-speaker scenarios like large meetings or restaurants. It does not explicitly model overlapping speech segments, resulting in penalization on benchmarks containing heavy simultaneous speech. Additionally, the training data relies heavily on artificially constructed two-speaker mixtures from clean datasets (VoxCeleb2 and MLS), which limits adaptation to complex acoustic reverberation and background noise domains.

## Why read this

Speech and ML researchers focusing on speaker diarization should read this to see how weak utterance-level supervision can replace expensive frame-level annotations for end-to-end segmentation. It offers a practical recipe for augmenting standard single-speaker embedding extractors with attention-based speaker activity detection without destabilizing pre-trained feature spaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription, multi-speaker conversational speech analysis, and streamlined diarization pipelines for telephony and clinical audio recordings.

## Institutions / 機構

Ghent University, imec

**Funding / 經費:** Research Foundation Flanders

## Related

- (link related pages by id as the wiki grows)
