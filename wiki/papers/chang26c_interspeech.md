---
id: chang26c_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1296
pdf: https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.pdf
---

# USAD 2.0: Scaling Representation Distillation for Universal Audio Understanding

*Heng-Jui Chang, Alexander Liu, Saurabhchand Bhati, Mrudula Athi, Anton Ratnarajah, Amit Chhetri, James Glass*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1296)

**TL;DR** — USAD 2.0 is a universal audio encoder scaling up to 1B parameters that integrates self-supervised and supervised multi-domain foundation models via domain-aware distillation and depth scaling. It achieves state-of-the-art performance across diverse probing and audio-LLM evaluations.

## Key contributions

- Introduces domain-aware distillation with a soft weighting factor (omega = 10) to balance matched-domain expertise and cross-domain acoustic transfer.
- Extends multi-domain coverage to music by incorporating a music-domain expert (MuQ) and dedicated music data (13K hours).
- Presents USAD 2.0+, a second-stage supervised distillation framework using Whisper and Audio Flamingo 3 to align representations with audio LLMs.
- Proposes efficient model scaling using a 25Hz feature framerate reduction (down from 50Hz) and depth up-scaling to efficiently reach 1B parameters.

## Problem

Prior audio encoders are typically specialized for a single domain—such as WavLM for speech or MERT/MuQ for music—struggling with out-of-domain audio and failing to provide balanced multi-domain representations. While prior multi-domain distillation approaches like USAD, SPEAR, and Wei et al. integrate multiple SSL experts, they lack music coverage, rely on uniform teacher weighting that causes domain mismatches, and are rarely evaluated under audio-LLM setups. Meanwhile, supervised encoders (e.g., Whisper, Audio Flamingo 3) align better with multimodal LLMs but often lack the fine-grained acoustic features captured by self-supervised learning.

## Method

USAD 2.0 builds upon layer-wise knowledge distillation from DistilHuBERT, generalizing it to M teacher models. In the first stage, it distills knowledge from three SSL experts: WavLM (speech), ATSTFrame (general audio), and MuQ (music). To prevent performance degradation from domain mismatches, the framework introduces domain-aware distillation. For an input from domain m, the loss from the m-th teacher is scaled using a hyperparameter omega > 1 (set to 10 in experiments) for matched domains, while mismatched teachers retain smaller weights (1/M) to preserve cross-domain acoustic cues like denoising.

The training dataset combines 116K hours of multilingual speech, 21K hours of general audio, and 13K hours of music. First-stage SSL distillation runs for 600K updates. For USAD 2.0+, a second-stage distillation uses supervised teachers—Whisper Large-v3 for multilingual speech and Audio Flamingo 3 (AF3) AF-Whisper for general audio—distilling only their final layers over 50K updates. Initializing from SSL-pretrained weights rather than training from scratch is critical for downstream performance.

To scale to 1B parameters within an academic budget, the XLarge and XXLarge architectures reduce temporal resolution from 50Hz to 25Hz via a 2x CNN feature extractor stride. Depth scaling expands the model from 32 to 48 layers using depth up-scaling, which copies and stacks the first and last 24 layers of a pre-trained backbone. This design cuts sequence-length self-attention costs, yielding a 1.036B parameter XXLarge+ model that runs faster than a 336M parameter 50Hz Large model.

## Experimental setup

Evaluated on HEAR (probing benchmark covering speech, sound, and music), MARBLE (music probing benchmark), and XARES-LLM (The Interspeech 2026 Audio Encoder Capability Challenge, including Track A classification and Track B understanding tasks like ASR and captioning). Compares against single-encoder SOTA baselines (Whisper, MERT, SPEAR, AF3, WavLM, ATSTFrame, MuQ), multi-expert ensembles, and prior USAD models. Implemented on an A5000 GPU; models range from Small (25M) to XXLarge+ (1036M parameters).

## Results

On the HEAR benchmark, unsupervised USAD 2.0 models consistently outperform prior state-of-the-art models of comparable sizes, with the XXLarge+ supervised variant reaching a top average score of 84.4. On XARES-LLM Track B (understanding), USAD 2.0+ models exhibit dramatic improvements, with the 1B parameter XXLarge+ achieving 0.624 compared to 0.457 for Whisper Large and 0.485 for USAD 2.0 XLarge.

Ablation studies show that setting the domain-aware distillation scale omega to 10 is optimal; an overly large scale harms cross-domain transfer, while omega = 1 drops phoneme recognition PER from 8.7 to 13.3. Removing the music domain teacher causes a 30% relative drop in NSynth pitch classification accuracy (from 70.3% down to 49.1%). Initializing supervised models from SSL backbones improves XARES-LLM Track A from 0.731 to 0.772 and Track B from 0.574 to 0.611 compared to training from scratch.

| System | HEAR Avg | MARBLE Avg | XARES Track A | XARES Track B |
|---|---|---|---|---|
| SPEAR Large | 81.8 | - | 0.691 | - |
| Whisper Large | - | - | - | 0.457 |
| AF3 | - | - | 0.782 | - |
| USAD 2.0 XLarge (695M) | 82.5 | 75.7 | 0.708 | 0.485 |
| USAD 2.0+ XLarge+ (695M) | 84.4 | 75.0 | 0.772 | 0.611 |
| USAD 2.0+ XXLarge+ (1036M) | 84.4 | 75.6 | 0.783 | 0.624 |

## Limitations

While the model covers speech, general audio, and music, its performance bounds are tied to the language coverage and biases of the underlying 150K+ hours of training corpora. The second-stage distillation relies entirely on English-centric or dominant supervised teachers (Whisper and AF3), which may constrain ultra-low-resource dialect adaptation. Additionally, depth up-scaling and sequence stride reductions assume that temporal downsampling to 25Hz does not discard critical millisecond-level acoustic transients required for specialized tasks.

## Why read this

Speech and ML engineers building audio LLMs or multi-domain frontends should read this paper to learn how to combine self-supervised and supervised distillation at a 1-billion parameter scale without training from scratch.

## Code

- https://hf.co/collections/MIT-SLS/usad2

## Applications

Universal audio frontends for multimodal large language models, multi-domain acoustic classification, automatic speech recognition, audio captioning, and music understanding.

## Related

- (link related pages by id as the wiki grows)
