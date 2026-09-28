---
id: fang26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1827
pdf: https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.pdf
---

# WhispEar: A Bidirectional Framework for Scaling Whispered Speech Conversion via Pseudo-Parallel Whisper Generation

*Zihao Fang, Yingda Shen, Zifan Guan, Tongtong Song, Zhenyi Liu, Zhizheng Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1827)

**TL;DR** — WhispEar is a bidirectional whispered speech conversion framework that uses unified semantic representations and zero-shot normal-to-whisper generation to scale training data, improving whisper-to-normal Word Error Rate (WER) on English to 22.44%.

## Key contributions

- Proposed WhispEar, a bidirectional whispered speech conversion framework built on unified semantic representations.
- Introduced a zero-shot normal-to-whisper (N2W) synthesis strategy for scalable pseudo-parallel data generation from large normal speech corpora.
- Conducted a systematic scaling study demonstrating consistent performance gains from expanding pseudo-parallel training data.
- Released wEar, the largest bilingual (Chinese and English) whispered-normal parallel corpus to date, comprising 3,044 hours and 604k pairs.

## Problem

Whispered speech lacks vocal fold vibration and fundamental frequency, resulting in severe acoustic degradation that makes whisper-to-normal (W2N) conversion difficult. Prior approaches heavily rely on scarce parallel whispered-normal data, while traditional DSP-based pseudo-whispers exhibit large distribution gaps and adversarial methods suffer from training instability. Furthermore, existing models struggle to preserve speaker timbre and natural prosody, highlighting the need for scalable data augmentation and robust semantic modeling.

## Method

WhispEar is trained in three stages: semantic tokenizer distillation, shared flow-matching acoustic model training, and unified tokenizer training with data scaling. In Stage 1, a compact student semantic tokenizer with RoPE self-attention, FSMN blocks, and FFNs is distilled from a large ASR teacher model (SenseVoice-Large) over mixed whispered and normal speech, with representations quantized using Finite Scalar Quantization (FSQ). 

In Stage 2, a conditional Flow-Matching Transformer (initialized from CosyVoice2) takes discrete semantic tokens and masked mel-spectrograms alongside a direction indicator (w2n or n2w), predicting velocity fields along an optimal-transport path using velocity-matching loss computed only on masked regions. This acoustic model and its vocoder are shared across both conversion directions.

In Stage 3, two unified semantic tokenizers are trained. The easier N2W model is trained first on real paired data to synthesize large-scale pseudo-whisper data from normal corpora (e.g., Emilia subset), which then trains the harder W2N tokenizer combined with real pairs. At inference, input speech is mapped to target semantic tokens via the unified tokenizer, and the shared flow-matching model and vocoder generate the waveform.

## Experimental setup

Evaluated on wTIMIT (English, 26 hours) and wEar (Chinese, real 18 hours plus 3,026 hours of pseudo-parallel data, totalling 3,044 hours across 230 speakers). Compared against WESPER, DistillW2N, MaskCycleGAN, and CosyVoice2. Metrics include UTMOS, DNSMOS, NISQA, WER (English), CER (Chinese), F0 Pearson correlation (F0 CoRR), and WavLM-based speaker similarity (SIM). Notable implementation details include an Adam optimizer with learning rates of 1e-4 (Stage 1 distillation) and 1e-5 (Stage 2 flow-matching fine-tuning).

## Results

On the English WTIMIT test set, WhispEar-Scaled achieves a WER of 22.44% and speaker similarity (SIM) of 0.577, outperforming baseline CosyVoice2 (36.69% WER, 0.409 SIM) and WESPER (42.01% WER). On the Chinese wEar test set, WhispEar-Scaled reduces CER to 14.93% with a SIM of 0.750, whereas previous English-only models like WESPER and DistillW2N suffer severe degradation with CER exceeding 80%. Ablations confirm that combining real aligned pairs with generated pseudo pairs (A+P config) yields superior UTMOS (3.064) and lower WER (34.87%) compared to raw unaligned or traditional DSP baselines. Scaling pseudo-data up to 200k pairs consistently improves performance when followed by fine-tuning on real aligned data.

| System | SIM (EN) | WER (EN) | UTMOS (EN) | CER (CN) | UTMOS (CN) |
|---|---|---|---|---|---|
| Whispered Speech | 0.333 | 12.36% | 1.46 | 18.09% | 1.41 |
| WESPER | 0.064 | 42.01% | 3.63 | 141.36% | 3.64 |
| DistillW2N | 0.189 | 50.99% | 1.97 | 128.06% | 1.69 |
| CosyVoice2 | 0.409 | 36.69% | 2.51 | 29.29% | 2.11 |
| WhispEar | 0.554 | 30.74% | 3.45 | 32.50% | 2.59 |
| WhispEar-Scaled | 0.577 | 22.44% | 3.75 | 14.93% | 3.16 |

## Limitations

The framework relies on a small amount of real aligned parallel data for fine-tuning to effectively adapt the pre-trained pseudo-models to the target W2N task. Evaluation is currently constrained to Chinese and English languages, and robustness under noisy acoustic environments remains an area for future improvement.

## Why read this

Speech researchers and engineers working on voice conversion and low-resource data augmentation should read this to learn how bidirectional semantic tokenization and zero-shot pseudo-parallel generation can scale whispered speech conversion.

## Code

- https://whispear-demo.github.io/

## Applications

Privacy-preserving speech communication and voice restoration for whispered or pathological speech.

## Related

- (link related pages by id as the wiki grows)
