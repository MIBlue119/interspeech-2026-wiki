---
id: phukan26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2283
pdf: https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.pdf
---

# Bridging the Age Gap: Towards Detecting Neural Audio Codec Synthesized Elderly Speech Deepfake

[PDF](https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2283)

**TL;DR** — The paper introduces the Elderly CodecFake Detection (ECFD) task and dataset to address the poor performance of existing deepfake detectors on older adult voices, proposing a multimodal foundation model fusion framework called BONSAI that achieves an average equal error rate of 1.66%.

## Problem

Current speech deepfake and neural audio codec (NAC) fake detectors are predominantly trained on younger adult populations, leaving older adults vulnerable to impersonation and fraud. Elderly speech exhibits distinct vocal characteristics—such as increased breathiness, pitch instability, and irregular temporal patterns—causing standard detectors to suffer severe performance degradation. This creates a critical demographic vulnerability and a significant methodological gap in synthetic speech security.

## Method

To bridge this gap, the authors curate the Elderly-CodecFake (ECF) dataset in English and Chinese using 14 neural audio codec variants on real elderly speech sources (SeniorTalk and TIS corpora). They investigate both speech foundation models (Wav2vec2, WavLM, Whisper) and multimodal foundation models (LanguageBind, ImageBind) whose cross-modal pretraining exposes them to visual and contextual cues of elderly individuals. To fuse these representations, they propose BONSAI (Bridging FusiON via JenSen–ShAnnon DIvergence), which applies Jensen–Shannon Divergence as a symmetric alignment loss alongside cross-entropy classification. The architecture uses 1D-CNN feature extractors, projects embeddings to a shared space, and maintains compact downstream parameter sizes ranging from 3.8M to 4.02M.

## Results

Evaluating zero-shot baseline detectors like AASIST and Wav2vec2-AASIST trained on prior benchmark datasets reveals high EERs exceeding 25% to 30% on elderly speech. In contrast, evaluating individual foundation models and the proposed BONSAI framework on the ECF dataset demonstrates substantial gains. BONSAI combining LanguageBind and ImageBind achieves a state-of-the-art average Equal Error Rate (EER) of 1.66%, outperforming individual foundation models and competitive single-model baselines across the SeniorTalk and TIS test partitions.

## Code

- https://helixometry.github.io/ElderlyCodecFake/

## Applications

Speech security systems, voice authentication platforms, and telecommunication safeguards requiring robust anti-spoofing and deepfake detection across diverse demographic age groups.

## Related

- (link related pages by id as the wiki grows)
