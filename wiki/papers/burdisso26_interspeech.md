---
id: burdisso26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3422
pdf: https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.pdf
---

# Avoiding Catastrophic Forgetting in Text-Only Adaptation of LLM-based ASR via Multi-View Text Denoising

[PDF](https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3422)

**TL;DR** — The paper introduces a text-only adaptation strategy for LLM-based ASR that utilizes multi-view text denoising and specialized batching to prevent catastrophic forgetting, achieving up to 25.4% relative WER improvements.

## Problem

Adapting LLM-based ASR systems to new domains using only text data is challenging because naive fine-tuning disrupts the speech-text alignment learned by the projector, leading to catastrophic forgetting. Since collecting large paired audio-text corpora is expensive, developing text-only adaptation techniques that preserve cross-modal alignment is crucial for practical deployment in new domains.

## Method

The method casts text-only ASR adaptation as a denoising task by training the LLM to reconstruct clean target transcripts from corrupted text inputs that emulate speech-projector outputs. A lightweight multi-view noise-driven batch mixing scheme combines four components: paired source audio-text data, projector-induced noisy source transcripts, synthetically corrupted source transcripts, and synthetically corrupted target transcripts. Synthetic noise is generated via a two-step process involving random character substitutions (using nlpaug on 15% of words) and random character duplications to mimic projector artifacts. The architecture uses a frozen WavLM-Large speech encoder, a learnable single-layer projection network with ReLU, and a frozen Llama 3.2 3B Instruct decoder, requiring zero additional learnable parameters during adaptation.

## Results

Evaluated on the DefinedAI (customer-agent telephone calls) and SlideSpeech (online conference videos) conversational corpora across multiple target domains, the proposed method significantly outperforms prior text-only adaptation baselines. On DefinedAI with Banking and Insurance target domains, the method achieves WER reductions down to 6.53 and 7.59 compared to the base model WERs of 8.02 and 9.36. On SlideSpeech target domains (Agriculture, Animation, Musical Instruments), it yields consistent relative WER improvements (e.g., up to 25.4% relative improvement over prior approaches), outperforming competitive text adaptation baselines such as Fang et al. and Ma et al.

## Code

- https://github.com/idiap/llm-asr-text-only-adaptation

## Applications

Speech and ML engineers looking to adapt LLM-based ASR systems to specialized target domains when only unlabelled domain text transcripts are available.

## Limitations

The target domain text-only data consists of conversational speech ground-truth transcripts rather than arbitrary web text, and the mixing proportion heuristic relies on relative domain sizes.

## Related

- (link related pages by id as the wiki grows)
