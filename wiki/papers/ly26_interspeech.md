---
id: ly26_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-491
pdf: https://www.isca-archive.org/interspeech_2026/ly26_interspeech.pdf
---

# TinyGiantALM: A Compact Audio-Language Model for Intent-Aware Reasoning under Resource Constraints

*Vinh-Thuan Ly*

[PDF](https://www.isca-archive.org/interspeech_2026/ly26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ly26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-491)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — TinyGiantALM is a compact 1.5B audio-language model that uses an instruction-aware feature refinement framework with a query-guided projector and semantic gating to achieve 46.4% zero-shot accuracy on the MMAR benchmark, outperforming much larger 7B–13B models.

## Key contributions

- Proposes a 1.5B efficiency-oriented audio-language model demonstrating that architectural priors can compensate for reduced scale in audio reasoning.
- Introduces a triple-stream acoustic front-end combining Whisper, HTS-AT, and CLAP encoders to capture fine-grained temporal, event-level, and global semantic representations.
- Develops a Query-guided Triple-stream Projector using E-Branchformer blocks, masked mean-pooling user intent cross-attention, and a CLAP-driven semantic gating mechanism.
- Outperforms traditional 7B-13B base lines (e.g., SALMONN-13B, Qwen2-Audio) on complex mixed-modality tasks by over 36%.

## Problem

Current state-of-the-art audio reasoning models rely on massive parameter scaling exceeding 7B to 30B parameters and expensive reinforcement learning, making them unsuitable for resource-constrained edge devices. Prior architectures use linear projectors or passive processing that fail to filter task-relevant information, causing models like Qwen2-Audio and SALMONN to collapse in complex, overlapping multi-source acoustic scenes. This creates a critical gap in achieving deep audio reasoning and signal disentanglement within an edge-friendly footprint.

## Method

TinyGiantALM adopts a multi-rate resampling triple-stream acoustic front-end consisting of Whisper-Large-v3-turbo (16kHz, 732M total encoder parameters across streams), HTS-AT (48kHz audio for event-level perception), and a CLAP encoder for global semantic priors, all sequence-length fixed to N = 300 tokens via adaptive average pooling. The features are processed by a Query-guided Triple-stream Projector initialized with L = 2 E-Branchformer blocks (combining global MHSA branches and 1D depth-wise convolutional local branches with kernel size 17) to map representations to the d_model = 1024 LLM latent space.

To align acoustic features with the user's instruction, a global user intent vector q_intent is derived via masked mean pooling over instruction tokens M_user, serving as the Query in a Multi-Head Cross-Attention mechanism where encoded audio acts as Key and Value. Next, a soft gate g in (0, 1) is computed via a sigmoid projection of the CLAP global anchor, modulating the features via affine scaling (0.5 * g + 0.5) to inject global context while preserving signal integrity. The final refined embeddings are inserted at the <audio> token position into a Qwen3-0.6B language model backbone.

The model is trained on 558,423 instruction-tuning samples from the CoTA dataset using next-token prediction with assistant response masking, optimizing for a Chain-of-Thought format encapsulating Plan, Audio Analysis, Logic, and Summary tags inside <think> blocks. Training runs for 3 epochs on a single NVIDIA A100 GPU with AdamW optimizer (projector lr 1e-4, LLM lr 5e-5), effective batch size of 32, BFloat16 precision with TF32, and maximum sequence lengths of 300 audio frames and 2048 text tokens.

## Experimental setup

Evaluated on the MMAR benchmark across single and mixed modalities (Sound, Music, Speech, and combinations) containing 16 sub-tasks, compared against baselines including Flamingo-2 (3B), LTU-AS (7B), GAMA (7B), Qwen2-Audio (8.4B), SALMONN (13B), Audio-Reasoner (8.4B), Qwen2.5-Omni (7B), and Gemini 2.0 Flash. Notable implementation details include a single NVIDIA A100 GPU, 3 epochs of fine-tuning, an edge-friendly inference memory footprint of 5GB VRAM for the 1.5B parameter system, and evaluation metrics comprising zero-shot MMAR accuracy (%) and intermediate reasoning Rubrics score.

## Results

TinyGiantALM achieves an overall zero-shot MMAR accuracy of 46.4%, outperforming midscale models like Qwen2-Audio (30.0%) and SALMONN (33.2%), and surpassing Audio-Reasoner (36.8%) by 9.6%. In mixed-modality tasks like Mix-Sound-Music, it attains 45.5% accuracy, avoiding the catastrophic collapse seen in 7B-13B baselines which drop to 9.1%. Ablations confirm that combining the inference query and CLAP gate yields a synergistic +8.40% boost over a vanilla baseline (38.00% to 46.40%), with mixed sound-music accuracy jumping by +36.36%. However, a persistent reasoning gap remains compared to 30B+ foundation models, reflected in a lower Rubrics score (23.77% vs >62.00%) due to limited language modeling capacity causing it to omit granular acoustic triggers.

| System / Condition | Size | MMAR Accuracy (%) |
|---|---|---|
| Qwen2-Audio | 8.4B | 30.0 |
| SALMONN | 13B | 33.2 |
| Audio-Reasoner | 8.4B | 36.8 |
| Qwen2.5-Omni | 7B | 56.7 |
| Gemini 2.0 Flash | - | 65.6 |
| TinyGiantALM (Ours) | 1.5B | 46.4 |

## Limitations

The 1.5B model exhibits a clear reasoning gap, scoring lower in intermediate reasoning Rubrics (23.77%) compared to 30B+ models because it struggles to generate exhaustive, multi-step narrative descriptions. The CLAP-driven semantic gating mechanism can introduce noise in overly dense multi-source scenes (Mix All dropping 4.16% compared to the variant without CLAP) and can strip fine physical cues, leading to performance drops in spatial analysis and correlation tasks.

## Why read this

Speech and ML researchers building efficient, edge-friendly audio-language models should read this to understand how architectural priors like intent-aware cross-attention and semantic gating can match or exceed the perception capabilities of models 5x to 8x larger without brute-force scaling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device interactive virtual assistants, resource-constrained audio surveillance systems, and intent-aware edge audio reasoning hardware.

## Institutions / 機構

Zalo AI, University of Science, VNU-HCM, Vietnam National University

## Related

- (link related pages by id as the wiki grows)
