---
id: chen26x_interspeech
category: speech-llm-dialogue
institutions: ["Hunan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2358
pdf: https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.pdf
---

# Who is Talking to Me? Addressing Egocentric TTM with Speaker-aware Conversational Context

*Fukun Chen, Xionghu Zhong, Minjie Cai*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2358)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper proposes a multimodal conversational context framework for the egocentric Talking-to-Me (TTM) task that integrates speaker-aware multi-round dialogue history with gaze-aware visual cues, achieving 72.40% mAP on the Ego4D benchmark.

## Key contributions

- Proposes a multimodal framework jointly modeling conversational context across dialogue rounds and Looking-at-Me (LAM) visual cues for egocentric TTM prediction.
- Introduces ID-aware speaker embeddings combined with dialogue round indices to explicitly capture multi-party conversation dynamics and speaker roles.
- Demonstrates state-of-the-art performance on the Ego4D TTM validation set, outperforming prior audio-visual and context-aware methods by up to 3.42% mAP.

## Problem

Determining whether an active speaker in an egocentric video is addressing the camera wearer (Talking-to-Me task) is complicated by multi-speaker interactions, long-term semantic dependencies, and frequently missing visual cues when partners look away or off-screen. Prior audio-visual models lack conversational history, multi-task models do not capture fine-grained multi-round semantic flows, and existing context-aware models like SICNet rely on coarse identity representations and limited temporal scopes. These shortcomings prevent existing systems from effectively tracking speaker intent and dialogue continuity across unconstrained multi-party social interactions.

## Method

The framework comprises three primary modules: a speaker-aware speech embedding (SSE) module, a conversational context modeling (CCM) module, and a gaze-aware visual embedding (GVM) module. Speech segments are transcribed via Whisper, text features are extracted using RoBERTa, and speaker identities are obtained via CAM++ embeddings processed through Laplacian eigen-decomposition and K-Means clustering. Continuous learnable speaker identity embeddings (e^id) and dialogue round index embeddings (e^r), both set to 32 dimensions, are concatenated with utterance-level speech features and projected into a d-dimensional space. The CCM module utilizes an L-layer Transformer encoder taking the current utterance and T - 1 historical utterances from a memory bank to capture long-range semantic dependencies. Simultaneously, the GVM module extracts frame-level features from a pretrained Looking-at-Me (LAM) visual backbone (ResNet-18), aggregates them via temporal average pooling, and projects them into aligned visual embeddings.

For feature fusion, the text-derived representation (h^ccm) and the visual embedding (h^gve) are stacked as a two-token sequence and fed into a multi-head self-attention layer with a residual connection to preserve text dominance. The fused representation is then passed through a two-layer MLP classification head with a softmax function to output the TTM probability score. Pretrained components like Whisper, CAM++, and the LAM model are frozen. RoBERTa is fine-tuned for 5 epochs on its final two layers, LayerNorms, and pooler layer, while downstream projection layers, the Transformer encoder, fusion module, and TTM head are trained for 10 epochs using the AdamW optimizer with a learning rate of 10^-5 and cross-entropy loss on a single NVIDIA RTX 4090.

## Experimental setup

Evaluated on the Social Interaction benchmark subset of Ego4D, consisting of 389 training clips (32.4 hours, 26,691 samples) and 50 validation clips (4.2 hours, 2,469 samples), reporting mean Average Precision (mAP). Compared against baselines including Ego4D-TTM, TalkNet, EgoT2-TS, Multi-task, Late Fusion, EgoT2-g, EgoT2-s, and SICNet.

## Results

The proposed full model achieves 72.40% mAP, outperforming the previous state-of-the-art SICNet baseline (68.98% mAP) by 3.42% absolute mAP, and significantly improving over basic audio-visual fusion like Ego4D-TTM (52.85%). Ablation studies confirm the contribution of each component: removing conversational context modeling (w/o CCM) drops mAP to 68.01%, eliminating gaze-aware visual embeddings (w/o GVE) yields 70.80%, removing speaker identity embeddings (w/o SSE) gives 69.84%, and a baseline without any of these features drops to 66.52% mAP.

Context window size analysis shows that using only the current utterance (T = 1) achieves 68.34% mAP, increasing to 70.89% at T = 3, and saturating near 72.4% at T = 10, while maintaining an inference speed of 31.4 FPS. Limitations are observed in face-missing and semantically ambiguous scenarios, such as when participants look down at objects (e.g., cards) and talk to themselves.

| System / Condition | mAP (%) |
|---|---|
| Ego4D-TTM [9] | 52.85 |
| TalkNet [10] | 57.88 |
| EgoT2-s [13] | 66.53 |
| SICNet [14] | 68.98 |
| Ours (Full Model) | 72.40 |

## Limitations

Evaluated exclusively on the validation split of the Ego4D Social Interaction benchmark because the test split is private. The model occasionally fails in challenging edge cases where facial visual cues are entirely absent or when speech intent is ambiguous (e.g., self-talk while looking down at objects). Scope is limited to pre-segmented conversational turns relying on off-the-shelf ASR transcriptions and speaker diarization.

## Why read this

Researchers and engineers working on egocentric perception, multimodal conversational agents, and social signal processing will find a clean blueprint for effectively fusing multi-round textual dialogue history, fine-grained speaker identities, and visual gaze cues.

## Code

- https://github.com/cfk1009/EgoTTM

## Applications

Assistive robotics, augmented reality social wearables, and smart human-computer interaction devices.

## Institutions / 機構

Hunan University

## Related

- (link related pages by id as the wiki grows)
