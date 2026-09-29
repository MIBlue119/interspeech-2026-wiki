---
id: pham26_interspeech
category: speaker
labels: [dataset-or-benchmark-release]
institutions: ["Hanoi University of Science and Technology"]
code: https://huggingface.co/datasets/hustep-lab/VieSpeaker-Dataset
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3449
pdf: https://www.isca-archive.org/interspeech_2026/pham26_interspeech.pdf
---

# VieSpeaker: A Large-Scale Vietnamese Speaker Recognition Dataset Beyond Visual Dependency

*Viet Hoang Pham, Tran Trung Nguyen, Bao Thu Ho, Phuong Tuan Dat, Trang Thu Thi Nguyen*

[PDF](https://www.isca-archive.org/interspeech_2026/pham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3449)

**Category:** `speaker` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — VieSpeaker is a large-scale, face-independent Vietnamese speaker recognition dataset comprising 902 hours of speech across 4,715 speakers, constructed by leveraging LLM reasoning over metadata and transcripts rather than facial cues. Models trained on VieSpeaker achieve robust verification performance, dropping Equal Error Rates down to 1.81% on easy evaluation subsets and 9.83% on hard cross-session splits when initialized with large-scale pretraining.

## Key contributions

- Proposes a novel face-independent dataset construction pipeline that bypasses visual tracking limitations by leveraging LLM structured reasoning over textual metadata and transcripts.
- Introduces VieSpeaker, the largest Vietnamese speaker recognition dataset to date, containing 902.03 hours of audio from 4,715 speakers across interview, entertainment, and podcast domains.
- Establishes rigorous evaluation protocols (VieSpeaker-E and VieSpeaker-H) featuring same-session and cross-session trials to measure generalization under realistic acoustic conditions.
- Demonstrates that models pretrained on VieSpeaker outperform or match VoxCeleb2 pretraining when evaluated on Vietnamese downstream benchmarks.

## Problem

Prior large-scale speaker recognition datasets like VoxCeleb2 and CN-Celeb2 rely heavily on face detection and tracking pipelines to link audio segments with speaker identities. This visual dependence restricts data collection strictly to on-camera recordings, automatically excluding identity-consistent audio from vlogs, anonymous podcasts, telephone conversations, and radio interviews. For under-resourced languages like Vietnamese, existing corpora such as Vietnam-Celeb and VoxVietnam are either severely limited in scale, restricted to studio interviews, or still bound by visual constraints, causing significant performance degradation under cross-domain or mismatched deployment conditions.

## Method

The data collection pipeline begins by curating public YouTube playlists across interview, entertainment, and podcast domains. Raw audio is segmented into homogeneous units using the pretrained pyannote speaker-diarization-3.1 framework. Next, an LLM-driven module using gemini-2.5-pro via the Google AI Studio API executes structured reasoning over video titles, channel descriptions, and transcript samples (sampling up to seven initial segments per diarized SPEAKER ID). Decoding is deterministic with temperature=0.0 and top_k=1 using a strict prompt enforcing evidence-based identity mapping and outputting verified Vietnamese names with diacritics.

To consolidate identities across multiple videos, role-based prefixes are stripped via text normalization, and foreign speakers are manually filtered out. Cosine-similarity-based agglomerative clustering is then applied on ECAPA-TDNN embeddings (trained on Vietnam-Celeb) with merge and split thresholds set to 0.7 and 0.2, respectively, followed by human verification for ambiguous entries. Finally, data cleansing removes anomalous utterances via Interquartile Range (IQR) filtering on global mean cosine similarities, discards segments shorter than 1.0 second, filters speakers with under 30 total seconds of speech, and randomly downsamples overly dominant speakers like hosts to balance the distribution.

Speaker recognition models are implemented using the WeSpeaker framework with an ECAPA-TDNN architecture containing 1024-channel encoder blocks. Training inputs are randomly cropped 3-second segments derived from 80-dimensional log Mel-filterbank features (25 ms frame length, 10 ms shift). The network is optimized via Additive Angular Margin Softmax loss with MUSAN and room impulse response (RIR) data augmentation applied at a 60% probability. Training runs for 150 epochs on an NVIDIA Tesla V100 GPU with a batch size of 128.

## Experimental setup

The final dataset comprises 365,874 utterances (902.03 hours) split into a 4,000-speaker training set (VieSpeaker-T) and a 715-speaker evaluation pool. Evaluation is split into VieSpeaker-E (Easy; intra-video trials) and VieSpeaker-H (Hard; cross-video trials with challenging acoustic negative pairs), each containing 500,000 trials. Baselines include models trained on VoxCeleb2, Vietnam-Celeb-T, and VoxVietnam-T, measured via Equal Error Rate (EER %).

## Results

When trained from scratch, the model trained on VieSpeaker-T achieves an EER of 2.40% on VieSpeaker-E and 13.45% on VieSpeaker-H, outperforming models trained on Vietnam-Celeb-T (5.92% / 23.14%) and VoxVietnam-T (7.99% / 26.61%). Initializing with VoxCeleb2 pretraining and finetuning on VieSpeaker-T achieves the best overall performance, reaching 1.81% EER on VieSpeaker-E and 9.83% EER on VieSpeaker-H. On the external Vietnam-Celeb benchmark, training from scratch on VieSpeaker-T yields 9.28% (E) and 11.19% (H) EER, while finetuning a VieSpeaker-pretrained model on Vietnam-Celeb-T achieves 5.45% (E) and 6.74% (H) EER, outperforming VoxCeleb2-pretrained baselines (5.79% and 6.91%).

| Training set / System | VieSpeaker-E (EER %) | VieSpeaker-H (EER %) |
|---|---|---|
| VoxCeleb2 | 7.02 | 12.95 |
| Vietnam-Celeb-T | 5.92 | 23.14 |
| VoxVietnam-T | 7.99 | 26.61 |
| VieSpeaker-T | 2.40 | 13.45 |
| VoxCeleb2 ft. VieSpeaker-T | 1.81 | 9.83 |

## Limitations

The dataset construction relies heavily on the quality of automated speaker diarization and YouTube auto-generated or manual transcripts, meaning severe transcription errors or multi-talker overlap can propagate inaccuracies to the LLM reasoning stage. Although the pipeline eliminates visual dependency, it remains tethered to metadata availability and platforms containing structured textual descriptions. Furthermore, language coverage is strictly restricted to Vietnamese, and compute-intensive clustering and human verification were required for high-ambiguity speaker aliases.

## Why read this

Speech and ML engineers building speaker verification systems for low-resource or non-English languages should read this paper to learn how to construct massive, high-diversity datasets without relying on costly or restrictive visual/facial identification pipelines.

## Code

- https://huggingface.co/datasets/hustep-lab/VieSpeaker-Dataset

## Applications

Speaker verification, speaker diarization, and forensic audio analysis for Vietnamese and other text-rich, visually constrained multimedia environments.

## Institutions / 機構

Hanoi University of Science and Technology

**Funding / 經費:** Ministry of Education and Training of Vietnam

## Related

- [Stabilizing Short Duration Speaker Verification through Neural Re-scoring with Hybrid Enrollment](ai26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [Progressive Learning for Robust Speaker Representation](keetha26_interspeech.md) — same problem · relatedness 2.1/3
- [LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification](shen26b_interspeech.md) — same problem · relatedness 2.1/3
- [Speaker Verification with Speech-Aware LLMs: Evaluation and Augmentation](thebaud26_interspeech.md) — same problem · relatedness 2.0/3
- [Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models](peng26f_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
