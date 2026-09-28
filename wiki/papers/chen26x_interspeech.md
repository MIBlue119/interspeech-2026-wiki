---
id: chen26x_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2358
pdf: https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.pdf
---

# Who is Talking to Me? Addressing Egocentric TTM with Speaker-aware Conversational Context

[PDF](https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2358)

**TL;DR** — This paper introduces a multimodal conversational context framework for the egocentric Talking-to-Me (TTM) task, achieving a state-of-the-art 72.40% mAP on the Ego4D benchmark.

## Problem

Egocentric TTM aims to identify whether an interlocutor is addressing the camera wearer during multi-party social interactions. Existing approaches struggle because they lack explicit multi-round dialogue history modeling, rely on coarse speaker identity representations, and fail when interlocutors temporarily look away or move off-screen. Solving this is crucial for building reliable assistive robotics and augmented reality agents.

## Method

The framework comprises three core modules: a speaker-aware speech embedding (SSE) module using CAM++ spectral clustering for speaker IDs and learnable dialogue round indices; a conversational context modeling (CCM) module using Whisper for ASR, RoBERTa for textual features, and a Transformer encoder over a memory bank of past T utterances; and a gaze-aware visual embedding (GVM) module using a pretrained ResNet-18 Looking-at-Me (LAM) visual backbone. The text and visual tokens are fused via a multi-head self-attention layer and passed to a two-layer MLP classification head. Pretrained backbones are frozen, and the model is trained with cross-entropy loss using AdamW on a single NVIDIA RTX 4090.

## Results

Evaluated on the Ego4D TTM validation split (26,691 training and 2,469 validation samples) using mean Average Precision (mAP), the method scores 72.40% mAP, outperforming prior state-of-the-art SICNet (68.98%) by 3.42% absolute. Component ablations confirm performance drops when removing conversational context (w/o CCM: 68.01%), gaze-aware visual features (w/o GVE: 70.80%), or speaker IDs (w/o SSE: 69.84%). Context window analysis shows accuracy rises from 68.34% at T=1 to 72.40% at saturation around T=10.

## Code

- https://github.com/cfk1009/EgoTTM

## Applications

Engineers building wearable devices, assistive robotics, and augmented reality systems can use this framework to let agents accurately discern when they are being addressed in multi-speaker conversations.

## Limitations

The model occasionally fails in face-missing and semantically ambiguous scenarios, such as when a participant looks down at objects and speaks without clear visual cues or intent.

## Related

- (link related pages by id as the wiki grows)
