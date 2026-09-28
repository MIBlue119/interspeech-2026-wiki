---
id: chen26y_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2412
pdf: https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.pdf
---

# Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance

*Minchuan Chen, Chenchen Wan, Junjie Li, Peng Qi, Shaojun Wang, Jing Xiao*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2412)

**TL;DR** — This paper presents a zero-shot text-to-speech (TTS) framework built on flow matching that combines a dual-model direct preference optimization (DPO) strategy with improved classifier-free guidance (CFG), reducing word error rate (WER) from 4.24 to 2.87 on Chinese test sets.

## Key contributions

- A dual-model direct preference optimization (DPO) architecture that separately models preferred and dispreferred distributions to prevent parameter conflicts inherent in single-model updates.
- A unified inference-time three-term guidance formula that integrates preferred and dispreferred velocity fields alongside a linearly combined proxy-prompt to reduce forward pass overhead.
- Integration of optimized scale and zero-init techniques for classifier-free guidance to stabilize early sampling steps in the ODE solver and prevent phonetic instability.
- Demonstration of high data efficiency, showing that preference optimization performance plateaus with as few as 250 to 500 carefully curated preference pairs.

## Problem

Conventional zero-shot text-to-speech systems powered by flow matching often struggle to seamlessly integrate human preferences or proxy metrics like intelligibility and speaker similarity during training and inference. Standard single-model preference alignment methods (such as standard DPO) force a single set of network parameters to balance competing preferred and dispreferred targets, resulting in weight offsets and parameter conflicts. Furthermore, standard classifier-free guidance relies solely on conditional versus unconditional prompts without accounting for explicit preference feedback, leading to erratic output quality and pronunciation errors on challenging text prompts.

## Method

The method uses F5-TTS Small (a 158M parameter Diffusion Transformer with 18 DiT layers, 12 attention heads, 768-dim embeddings, and a 4-layer 512-dim ConvNeXt V2 module) as the base flow-matching architecture. Instead of optimizing a single model with standard DPO, the approach initializes two distinct models from a common reference model to independently capture preferred and dispreferred data distributions using a specialized joint loss function that maximizes the sum of reward scores while keeping models close to the reference policy.

During inference, the system combines the outputs of the preferred model ($p_\theta^w$) and dispreferred model ($p_\theta^l$) using a three-term guidance formulation controlled by a hyperparameter $\alpha$ (set to 1.0). To improve efficiency, the conditional prompt $c$ and null prompt $\phi$ are combined into a single proxy-prompt $\hat{c} = -\alpha c + (1 + \alpha)\phi$ fed into the dispreferred model. Additionally, CFG is enhanced with an optimized scale factor $s$ (projecting condition velocity onto unconditional velocity) and a zero-init technique that zeros out the first few steps of the Euler ODE solver to suppress early-stage timbre collapse.

The pretraining phase uses 1,530 hours of data (945 hours of WenetSpeech4TTS Mandarin data and 585 hours of LibriTTS English data) trained for 600K updates. DPO fine-tuning uses preference pairs constructed via Pareto optical ranking over model outputs (using regular and challenging DeepSeek-generated texts containing tongue twisters and repetitions, termed DT2 and DT3 datasets) trained for 10 epochs with a batch size of 6,400 frames on 4 NVIDIA A800 GPUs.

## Experimental setup

Evaluated on the Seed-TTS test sets (Seed-TTS-test-zh and Seed-TTS-test-en). Baselines include the F5-TTS Small baseline and single-model DPO variants (PA-Base). Metrics include Word Error Rate (WER evaluated via Whisper large-v3 for English and Paraformer for Chinese), Speaker Similarity (SSIM using a WavLM-large verification model), UTMOS for naturalness, and CMOS/SMOS via human evaluation with 24 participants.

## Results

On the Chinese Seed-TTS test set, the proposed PA-Dual model using challenging text pairs (DT3) achieves a WER of 2.87 (vs 4.24 for Baseline and 3.45 for PA-Base with regular text) and an SSIM of 0.634 (vs 0.553 for Baseline). On the English Seed-TTS test set, PA-Dual (DT3) achieves a WER of 2.38 (vs 3.46 for Baseline) and an SSIM of 0.625 (vs 0.591 for Baseline).

Ablation studies on CFG enhancements demonstrate that removing both optimized scale and zero-init increases Chinese WER from 2.86 up to 3.13 and drops SSIM from 0.634 down to 0.578, with zero-init contributing the more pronounced stability gains. The method does not win or show significant gains when preference pairs are constructed trivially by contrasting ground-truth audio against random model outputs rather than ranking the model's own diverse generations.

| Model | Chinese WER ($\downarrow$) | Chinese SSIM ($\uparrow$) | English WER ($\downarrow$) | English SSIM ($\uparrow$) |
|---|---|---|---|---|
| Ground Truth | 1.26 | 0.766 | 2.06 | 0.732 |
| Baseline | 4.24 | 0.553 | 3.46 | 0.591 |
| PA-Base (w/ DT2) | 3.45 | 0.592 | 2.83 | 0.614 |
| PA-Dual (w/ DT2) | 3.06 | 0.628 | 2.45 | 0.608 |
| PA-Dual (w/ DT3) | 2.87 | 0.634 | 2.38 | 0.625 |

## Limitations

The work evaluates exclusively on Mandarin and English corpora, leaving multilingual scalability in low-resource settings unverified beyond these two languages. The approach requires maintaining and running two separate model weights simultaneously during inference, which doubles the active parameter footprint and increases computational overhead per forward evaluation pass unless distilled. Evaluation is restricted to proxy metrics (Whisper, Paraformer, WavLM) supplemented by a relatively small human pool (24 participants rating 30 samples).

## Why read this

Speech and ML engineers building zero-shot generative TTS systems should read this paper to learn how to decouple preference optimization into dual models to bypass parameter conflict, and how to stabilize flow-matching ODE sampling via zero-init CFG.

## Code

- https://minchuan2025.github.io/interspeech2026

## Applications

Personalized zero-shot text-to-speech assistants, expressive dubbing, and audiobook generation requiring high speaker similarity and robust handling of challenging phonetics.

## Related

- (link related pages by id as the wiki grows)
