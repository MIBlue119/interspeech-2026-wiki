---
id: hori26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2999
pdf: https://www.isca-archive.org/interspeech_2026/hori26_interspeech.pdf
---

# Plan and Double-Check: Streaming Multimodal Q-Former for Online Robot Action Generation

*Chiori Hori, Ryosuke Korekata, Motonari Kambara, Yoshiki Masuyama, Siddarth Jain, Radu Corcodel, Diego Romeres, Jonathan Le Roux*

[PDF](https://www.isca-archive.org/interspeech_2026/hori26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hori26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2999)

**TL;DR** — This paper extends a Q-Former-based multimodal robot action generation framework to support online streaming processing, achieving low-latency response generation with less than 10% accuracy degradation compared to offline processing.

## Key contributions

- Proposed a streaming multimodal Q-Former framework that processes unsegmented audiovisual features in 1-second chunks without requiring explicit video clip boundaries.
- Integrated a chunk-based left-context-aware query embedding mechanism and specialized attention masks that enable efficient parallel training comparable to offline models.
- Introduced a loss-based alignment selection method during training to dynamically determine optimal response generation timing and avoid irrelevant trigger points.
- Demonstrated successful generation of proactive robot confirmation messages and micro-step action sequences in an online streaming setting using a frozen LLM decoder.

## Problem

Prior robot action generation frameworks primarily rely on offline processing with pre-segmented video clips, making them unsuitable for real-world interactions where robots must handle unsegmented, continuous multimodal inputs. Although human-in-the-loop replanning and confirmation generation mitigate execution errors, existing methods are either reactive or demand explicit clip boundaries. This creates a critical gap for building low-latency, proactive robotic assistants that can interpret streaming audiovisual environments and verify actions before physical execution.

## Method

The system builds on the AVBLIP architecture, combining audio, visual, and image features extracted via AST, Omnivore, and CLIP, respectively. Multimodal inputs are divided into 1-second chunks (with feature dimensions of 527 for audio, 768 for image, and 3806 for video) and interleaved before being fed into a 188M-parameter Q-Former initialized with BERT-base weights. A set of 16 learnable query embeddings interacts with past and current chunk features via chunk-based cross-attention masks, ensuring left-context dependency without attending to future frames. 

The resulting query embeddings are projected into the embedding space of a frozen OPT-2.7B large language model decoder using a fully-connected layer. To train the streaming model to emit responses at appropriate times, three alignment approaches are explored: clip-end alignment, random sampling within an allowable 5-second shift window prior to clip end, and a loss-based selection method. The loss-based approach compares the cross-entropy loss of a sampled response time against the final clip-end loss, applying a threshold tau of 0.002 ($L_{	ext{smpl}} - L_{	ext{orig}} < 	au$) to backpropagate from the optimal early timing. Inference uses greedy decoding to produce robot confirmation sentences and micro-step action sequences (consisting of 12 primitive actions, target objects, prepositions, and places) chunk-by-chunk in an online manner.

## Experimental setup

Evaluated on the YouCook2 dataset consisting of 1,173 training videos (8,743 clips averaging 19.7 seconds) and 416 validation videos (3,117 clips), split in half for cross-validation. Baselines include the offline AVBLIP baseline, an interleaved offline configuration, and streaming variants using clip-end, sampled, and loss-based alignments. Metrics comprise BLEU-2 and METEOR for action sequences and descriptions, alongside streaming latency (relative to original clip end) and miss detection rate.

## Results

The offline baseline achieved a BLEU-2 of 0.357 and METEOR of 0.251 for action sequences, while the proposed online streaming model with loss-based alignment achieved a BLEU-2 of 0.328 and METEOR of 0.228, representing less than 10% relative accuracy degradation. The loss-based streaming model attained an average latency of -2.92 seconds (with a standard deviation of 2.20) and a low miss detection rate of 4.40%, outperforming the simple sampling method (-2.12 seconds latency, 4.80% miss rate) and clip-end streaming (5.20% miss rate). Ablations confirm that feature interleaving alone causes negligible performance loss in offline settings, but loss-based alignment is crucial for minimizing temporal fluctuation and avoiding irrelevant response triggers during streaming.

| System / Condition | Action BLEU-2 | Action METEOR | Desc BLEU-2 | Desc METEOR | Latency [sec] | Miss Rate [%] |
|---|---|---|---|---|---|---|
| (1) Baseline (Offline) | 0.357 | 0.251 | 0.221 | 0.154 | - | - |
| (2) Offline w/ Interleave | 0.354 | 0.248 | 0.219 | 0.152 | - | - |
| (4) Streaming (Clip End) | 0.321 | 0.223 | 0.197 | 0.138 | -0.78 | 5.20 |
| (5) Streaming (Sampling) | 0.319 | 0.215 | 0.194 | 0.138 | -2.12 | 4.80 |
| (6) Streaming (Loss-based) | 0.328 | 0.228 | 0.212 | 0.145 | -2.92 | 4.40 |

## Limitations

The framework was evaluated exclusively on cooking instructional videos from YouCook2, which may limit generalizability to highly dynamic, unconstrained open-world robotics domains. Subtitles and audio-visual speech transcripts were intentionally omitted to maintain a clean online setup, foregoing potential textual cues that could improve grounding. Furthermore, evaluation relies on greedy decoding rather than beam search, and performance is bounded by the scale of the frozen OPT-2.7B language model and 188M Q-Former architecture.

## Why read this

Speech and ML researchers working on streaming multimodal architectures and embodied AI will find this a clean blueprint for adapting offline Q-Former vision-language models to online, low-latency streaming without retraining large LLM decoders. It provides actionable insights into chunk-based attention masking and loss-guided alignment for real-time human-robot interaction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time human-robot collaboration, proactive assistive robotics, streaming multi-modal scene understanding, and online task planning with natural language confirmation generation.

## Related

- (link related pages by id as the wiki grows)
