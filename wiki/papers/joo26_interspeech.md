---
id: joo26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1163
pdf: https://www.isca-archive.org/interspeech_2026/joo26_interspeech.pdf
---

# Cross-Lingual Compositional Learning for Code-Switched Lip Reading

[PDF](https://www.isca-archive.org/interspeech_2026/joo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/joo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1163)

**TL;DR** — CoCoVSR introduces a cross-lingual compositional learning framework that adapts pretrained multilingual visual speech recognition models to code-switched scenarios using concatenated monolingual corpora, achieving state-of-the-art results on Chinese-English code-switched lip reading.

## Problem

Visual speech recognition (VSR) has advanced significantly in monolingual and standard multilingual settings, but code-switched VSR remains severely underexplored due to an extreme scarcity of annotated multilingual visual data. Existing code-switched video benchmarks are tiny, repetitive, and lack lexical variability, making it unclear whether models can generalize to unseen compositional code-switched configurations.

## Method

The paper proposes CoCoVSR, which builds pseudo code-switched training pairs by temporally concatenating language-specific video clips from existing monolingual and multilingual corpora (such as English and Mandarin subsets) without requiring generative synthesis or extra annotations. The framework employs a pretrained visual front-end (3D-CNN and visual transformer blocks) and a Transformer encoder-decoder backbone. Instead of heavy modular routing or language-specific adapters, it uses parameter-efficient fine-tuning via shared LoRA adapters (rank 32) applied to self-attention and feed-forward layers in both the encoder and decoder to exploit shared articulatory viseme representations across languages.

## Results

Evaluated on the English-Chinese CSLR benchmark, MultiVSR (Chinese), and LRS2 (English), CoCoVSR achieves state-of-the-art performance on CSLR with a mixture error rate (MER) of 16.48%, substantially outperforming vanilla CTC (MER 256.46%) and prior bi-encoder or MoE baselines (which range from 37.54% to 40.35% WER/CER/MER metrics). Crucially, CoCoVSR preserves high performance on seen monolingual Chinese (MultiVSR CER 16.23%) and unseen English benchmarks (LRS2 WER 55.51%), showing minimal catastrophic forgetting. Ablation studies demonstrate that a 1:1 mixture ratio of code-switched data to CoCo-MultiVSR data yields the best generalization, and sharing adapter layers outperforms multiple isolated adapters.

## Code

- https://github.com/ewha-mmai/CoCoVSR

## Applications

Speech and machine learning engineers developing inclusive multimodal communication tools, multilingual automatic speech recognition fallbacks, or human-computer interaction systems that need to process natural, code-switched visual speech.

## Limitations

The framework relies on the assumption that visual speech shares robust cross-lingual articulatory commonalities, which may experience limits when mixing languages with vastly divergent viseme-to-phoneme mappings.

## Related

- (link related pages by id as the wiki grows)
