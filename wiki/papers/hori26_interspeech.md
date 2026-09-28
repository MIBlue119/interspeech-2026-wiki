---
id: hori26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2999
pdf: https://www.isca-archive.org/interspeech_2026/hori26_interspeech.pdf
---

# Plan and Double-Check: Streaming Multimodal Q-Former for Online Robot Action Generation

[PDF](https://www.isca-archive.org/interspeech_2026/hori26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hori26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2999)

**TL;DR** — This paper extends an offline audio-visual Q-Former action planning model into a real-time streaming framework that generates robot actions and confirmation messages from unsegmented video chunks with under 10% accuracy degradation.

## Problem

Prior multimodal robot action generation frameworks rely on offline processing with pre-segmented video clips, making them unsuitable for real-world interactions where robots must handle unsegmented inputs dynamically. Integrating confirmation generation proactively prevents execution errors, but doing so online requires processing streaming inputs without knowing exact action boundaries. This work addresses the gap by introducing a low-latency, streaming multimodal Q-Former architecture that enables real-time robotic action planning and confirmation.

## Method

The system processes unsegmented videos by extracting audio, image, and video features in short one-second chunks using Omnivore, CLIP, and Audio Spectrogram Transformer (AST) respectively, projecting and concatenating them into a unified multimodal sequence. A Q-Former (initialized with BERT-base) incorporates left-context information into query embeddings by attending to current and cached previous hidden states via tailored attention masks. Specifically, causal masks handle self-attention, chunk-based masks manage cross-attention, and chunk-based masks restrict the streaming LLM decoder (OPT-2.7B) to attend only to current-chunk queries and generated tokens. Training utilizes alignment strategies including random sampling and loss-based selection with a threshold to optimize response timing without requiring precise frame-to-token CTC alignments.

## Results

Evaluated on the YouCook2 dataset validation split using cross-validation, the proposed streaming models are compared against offline baselines and variants using metrics like BLEU-2 and METEOR for action sequences and action descriptions, alongside average latency and miss detection rate. The online streaming model using loss-based selection achieves a BLEU-2 of 0.246 for action sequences and 0.154 for action descriptions, compared to 0.357 and 0.221 respectively for the offline AVBLIP baseline. This represents less than a 10% relative accuracy degradation while providing continuous online generation. The streaming approach with loss-based selection yields a miss detection rate of 4.40% and maintains an average latency reduction across chunks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Embodied AI and robotic engineers can use this framework for real-time human-robot collaboration tasks, enabling humanoid robots to interpret unsegmented human demonstration videos and generate proactive confirmation messages before executing physical actions.

## Limitations

Video subtitles are excluded from the streaming setup due to online availability constraints, and the system lacks precise frame-to-token timestamp alignment data.

## Related

- (link related pages by id as the wiki grows)
