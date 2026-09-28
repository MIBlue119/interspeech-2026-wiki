---
id: bijoy26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1373
pdf: https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.pdf
---

# Mixture-of-Accent-Adapters for Robust ASR: Injecting Accent Cues into Pretrained Whisper

[PDF](https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1373)

**TL;DR** — The paper introduces Mixture-of-Accent-Adapters (MoAA), which combines soft codebook conditioning, accentedness-gated adapter routing, and adversarial gender suppression on top of Whisper to achieve a 7.49% WER on the AESRC benchmark.

## Problem

Pretrained ASR models like Whisper struggle with regional and non-native accents, but standard adaptation techniques either apply uniform conditioning or full fine-tuning without selective control. Furthermore, multi-task auxiliary heads often cause negative transfer, and intermediate representations can leak speaker attributes like gender. Additionally, encoder-decoder models frequently generate decoding artifacts and repetition loops when processing accented audio.

## Method

MoAA builds on a frozen Whisper-small backbone, using mean pooling over encoder states followed by a linear projection to form a control bottleneck. This bottleneck feeds auxiliary classifiers for accentedness and accent category, alongside a gradient reversal layer (GRL) to remove gender information. A learnable soft accent codebook uses posterior-weighted retrieval to dynamically build accent cues, which are combined with an accentedness gate to modulate both encoder-side conditioning and routing weights over a bank of 10 lightweight residual bottleneck adapters ($r=192$). Finally, a deterministic hallucination filtering (DHF) module post-processes decoder outputs by stripping repetition bursts and numeric anomalies.

## Results

Evaluated on the AESRC accented English test set, the zero-shot Whisper-small baseline yields 35.17% WER and 13.26% CER. Full fine-tuning obtains 15.50% WER (4.10% CER) while LoRA achieves 15.44% WER (3.89% CER) using roughly 1.77M parameters. The proposed MoAA framework combined with DHF reaches a headline performance of 7.49% WER and 3.81% CER, representing a 26.9% relative WER reduction over the pre-filtered MoAA output.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building inclusive, multi-accent speech recognition systems or deploying resource-efficient encoder-decoder models on edge hardware.

## Limitations

Richer accent-conditioned encoder states can occasionally destabilize the frozen decoder, making it prone to repetition artifacts that require a separate post-decoding cleanup step.

## Related

- (link related pages by id as the wiki grows)
