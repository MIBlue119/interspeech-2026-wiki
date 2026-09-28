---
id: gong26b_interspeech
category: speech-editing
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-631
pdf: https://www.isca-archive.org/interspeech_2026/gong26b_interspeech.pdf
---

# Bagpiper-Edit: Zero-Shot Open-Ended Audio Editing via Rich-Caption

*Xun Gong, Jinchuan Tian, Haoran Wang, William Chen, Shinji Watanabe, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/gong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-631)

**TL;DR** — Bagpiper-Edit reformulates open-ended audio editing across speech, sound, and music as a text-space rich-caption rewriting task, achieving zero-shot editing without paired training data.

## Key contributions

- Replaces rigid atomic operations and expert model compositions with inference-time rich-caption rewriting using free-form natural language.
- Introduces a self-supervised training paradigm utilizing continuous audio segmentation and audio repetition to anchor acoustic identity without paired audio-editing datasets.
- Unifies cross-domain editing capabilities across speech, sound events, and music into a single autoregressive framework.
- Demonstrates robust zero-shot performance competitive with specialized expert models across multiple audio editing tasks.

## Problem

Prior audio editing frameworks rely on rigid operation templates or complex compositions of specialized expert models, which severely restrict their flexibility for open-ended user requests. Furthermore, existing systems depend heavily on large, expensive paired audio-editing datasets (original audio to edit instruction to edited audio). Addressing this is critical because real-world audio often contains complex mixtures of speech, background noise, and sound events that require targeted modifications while preserving overall realism and identity.

## Method

Bagpiper-Edit builds on the Bagpiper-Base architecture, which utilizes Qwen3-8B-Base as a decoder-only LLM and a multi-stream X-Codec operating at 50Hz for audio prediction targets. The framework operates in three steps: first, extracting a rich caption from the original audio using the base model's understanding capabilities; second, using a strong text LLM (Qwen3-235B-A22B-Instruct-2507-FP8) to synthesize a target caption based on the free-form user request; and third, generating the edited audio conditioned on the rewritten caption while using the original audio as a contextual acoustic anchor.

To train this capability without paired editing data, the authors use 500k samples spanning YODAS, LAION-Audio, Emilia-En, AudioSet, WavCaps, and AudioCaps. They propose two self-supervised strategies: audio repetition (setting identical clips and captions to retain source timbre and environment) and audio segmentation (splitting continuous audio into adjacent clips $a_1$ and $a_2$ with respective captions $c_1$ and $c_2$ to share acoustic backgrounds). Data is organized into Single-Turn (ST) patterns (concatenating captions and audio within a single turn) and Multi-Turn (MT) patterns (structuring input as a two-round sequential dialogue to establish $c_1 \rightarrow a_1$ as an in-context conditioning example).

During inference, the MT pattern proves superior by enforcing audio-to-audio conditioning sequentially, effectively preventing style and identity drift that would otherwise occur if the foundation model regenerated audio solely from the text prompt.

## Experimental setup

The model is trained on 500k samples without paired editing data using a global batch size of 128k tokens and a learning rate of 1e-5. Evaluations are conducted on tasks derived from LibriSpeech test-clean and AudioSet datasets. Baselines include domain-specific expert models (CosyVoice-3, Ming-UniAudio-Edit, Step-Audio-EditX, AudioLDM2) and Bagpiper-Base. Metrics comprise WER, speaker similarity (SpkSIM via WavLM), DNSMOS, emotion accuracy, Fréchet Audio Distance (FAD), Contrastive Language-Audio Pretraining (CLAP) scores, CapSIM via Qwen3-Embedding-4B, and LLM-based scoring using Qwen3-Omni-30B-A3B-Thinking and Gemini-3-flash.

## Results

On speech transcription editing, Bagpiper-Edit (MT) achieves a competitive WER of 14.01% and an editing accuracy of 79.76%, while maintaining a high speaker similarity (SpkSIM) of 0.83, outperforming Bagpiper-Base (SpkSIM 0.58) and approaching expert models like CosyVoice-3. For audio-event addition, the MT variant secures the highest editCLAP score of 0.18 while preserving background consistency (FAD 3.29). In free-form rich-caption editing, Bagpiper-Edit (MT) obtains the best semantic similarity (CapSIM of 0.5961) and top LLM preference scores (2.75 for Qwen3, 3.95 for Gemini) compared to Bagpiper-Base.

Where the model does not win includes speaking style editing, where its scores lag behind specialized expert models, and full-sentence transcription replacements, which occasionally suffer from prompt propagation errors introduced by the text LLM rewriting step.

| System | WER (%) ↓ | Acc (%) ↑ | SpkSIM ↑ | FAD ↓ | CapSIM ↑ |
|---|---|---|---|---|---|
| CosyVoice-3 | 9.74 | 95.45 | 0.86 | - | - |
| Bagpiper-Base | 72.19 | 50.66 | 0.58 | 7.62 | 0.4636 |
| Bagpiper-Edit (ST) | 19.62 | 47.11 | 0.86 | 0.91 | 0.5355 |
| Bagpiper-Edit (MT) | 14.01 | 79.76 | 0.83 | 2.85 | 0.5961 |

## Limitations

As a zero-shot model, Bagpiper-Edit exhibits lower generation stability than domain-specific expert models trained on massive paired datasets. Processing extremely complex acoustic environments, such as multi-speaker separation, remains constrained by the capacity of the base model. Furthermore, full-sentence transcription replacements can suffer from error propagation when generated entirely by the text LLM rather than extracted from real audio.

## Why read this

Researchers and engineers working on audio generation and editing should read this to learn how to leverage self-supervised segmentation and rich-caption rewriting to bypass the need for costly paired audio-editing datasets.

## Code

- https://bagpiper-edit.github.io

## Applications

Cross-domain audio editing assistants for film post-production, podcast authoring, and multi-modal content creation supporting simultaneous speech, sound effect, and music modifications via natural language.

## Related

- (link related pages by id as the wiki grows)
