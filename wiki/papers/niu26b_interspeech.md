---
id: niu26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1539
pdf: https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.pdf
---

# MCA-DCF-DS: An Adaptive Framework for Unified Diarization and Separation with Spatial Information

[PDF](https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1539)

**TL;DR** — The paper introduces MCA-DCF-DS, an adaptive multi-channel framework integrating speaker diarization and speech separation that outperforms the CHiME-8 Task 2 champion system on the NOTSOFAR-1 evaluation set.

## Problem

While single-channel deep cascade fusion of diarization and separation (DCF-DS) handles meeting scenarios well, it relies strictly on spectral cues and struggles in highly overlapped speech regions. Existing multi-channel pipelines also suffer from a fundamental trade-off during diarization, where re-clustering reduces confusion errors but simultaneously increases miss errors. Overcoming this trade-off is critical for robust downstream automatic speech recognition (ASR) in conversational environments.

## Method

The framework extends single-channel DCF-DS to multi-channel MC-DCF-DS by incorporating inter-channel phase difference (IPD) features and mask-based MVDR beamforming alongside Conformer separation models. To solve the miss-versus-confusion trade-off, the authors propose MCA-DCF-DS, which uses a spatial long-term iterative mask estimation (SI-SSD) adaptation module combined with a teacher-student knowledge distillation fine-tuning strategy. The system leverages approximately 1000 hours of simulated NOTSOFAR-1 data plus 700 hours of near-field simulations, using Whisper-large-v3 as the downstream ASR backend.

## Results

Evaluated on the NOTSOFAR-1 multi-channel challenge dataset, MC-DCF-DS reduces tcpWER from the baseline 28.28% down to 21.68% (and 20.17% with re-clustering), substantially improving upon the single-channel DCF-DS score of 31.72%. The proposed MCA-DCF-DS further outperforms the CHiME-8 Task 2 champion system under the same ASR backend. Ablations demonstrate that both IPD features and MVDR beamforming are essential, with longer analysis window sizes (12.8s) outperforming shorter windows (3s).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building far-field multi-speaker speech recognition systems, meeting transcription pipelines, and front-end acoustic processing engines.

## Related

- (link related pages by id as the wiki grows)
