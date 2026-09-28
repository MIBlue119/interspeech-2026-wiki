---
id: lu26d_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2183
pdf: https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.pdf
---

# Speech-to-See: End-to-End Speech-Driven Open-Set Object Detection

*Wenhuan Lu, Xinyue Song, Wenjun Ke, Zhizhi Yu, Wenhao Yang, Jianguo Wei*

[PDF](https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2183)

**TL;DR** — Speech2See is an end-to-end framework for speech-driven open-world object detection that bypasses intermediate text generation by coupling HuBERT speech features with Grounding DINO visual representations via a progressive pre-training and fine-tuning paradigm, achieving 56.2 AP on closed-set COCO-val and 42.7 AP on zero-shot COCO.

## Key contributions

- Proposes a fully end-to-end architecture for direct 'listening-to-localization' object detection without requiring an intermediate Automatic Speech Recognition (ASR) text-to-detector pipeline.
- Introduces the Query-Guided Semantic Aggregation (QSA) module, which employs learnable queries via cross-attention to resolve temporal redundancy in continuous audio sequences.
- Incorporates a Mixture-of-LoRA-Experts (MoLE) module into the cross-modal decoder during fine-tuning to handle paralinguistic variations and speaker diversity without full model retraining.
- Demonstrates state-of-the-art performance across COCO and LVIS benchmarks, outperforming two-stage speech-vision baselines by +17.0 AP on closed-set COCO.

## Problem

Prior audio grounding systems, such as YOSS, rely on decoupled two-stage pipelines that combine separately trained audio, text (CLIP), and vision models, which introduces error propagation and convergence bottlenecks. Furthermore, cascaded ASR-plus-text-detector pipelines suffer from accumulation of transcription errors and high inference latency. Directly learning open-set detection from raw speech is further compounded by extreme data scarcity for paired audio-image data and the continuous, entangled nature of acoustic signals compared to discrete text tokens.

## Method

Speech2See takes multi-scale visual features via a Swin Transformer and raw speech embeddings via a HuBERT-Base encoder. The raw HuBERT feature sequence is processed through the Query-Guided Semantic Aggregation (QSA) module, where $K$ learnable queries act as a semantic adapter to condense temporal speech representations into compact semantic tokens via cross-attention. These tokens are fed into a Grounding DINO-inspired vision-language detector with a feature enhancer and speech-guided query selection.

During the pre-training phase (10 epochs on AdamW with lr $1\times 10^{-4}$ and batch size 64), the Swin-T and HuBERT backbones and main detector are frozen, optimizing only the QSA and projection layers. During the fine-tuning phase (2 epochs), the decoder weights are frozen while a Mixture-of-LoRA-Experts (MoLE) module with rank $r=64$ and $K=2$ experts is inserted into the feed-forward network layers. A Top-1 router assigns tokens to experts to capture diverse acoustic patterns, backed by an auxiliary load balancing loss ($\lambda_{lb} = 1\times 10^{-2}$) to prevent expert underutilization.

## Experimental setup

Experiments are conducted on COCO 2017 (80 categories, 123K images), Objects365 (365 categories, 609K images), Flickr30k (159K audio files), and LVIS (1,000 categories, 164K images). Audio annotations are synthesized from object category text using edge-TTS across 10 distinct speakers. Models use Swin-T and HuBERT-Base backbones (197.8M total parameters) and are trained on 8 $\times$ NVIDIA A800 GPUs. Baselines include YOSS (base/large), text-driven Grounding DINO, and a cascaded Whisper-plus-Grounding-DINO system. Evaluation metrics include standard COCO AP, $\text{AP}_{50}$, $\text{AP}_{75}$, and LVIS category splits.

## Results

On closed-set COCO-val, Speech2See with MoLE achieves 56.2 AP, 71.3 $\text{AP}_{50}$, and 60.7 $\text{AP}_{75}$, outperforming the two-stage YOSS-large baseline (39.2 AP) by 17.0 AP points. In zero-shot COCO evaluations trained on Objects365, Flickr30k, and GQA, the model reaches 42.7 AP (55.7 $\text{AP}_{50}$, 46.8 $\text{AP}_{75}$), surpassing the closed-set supervised performance of YOSS-large. On the zero-shot LVIS benchmark, it achieves 19.9 AP overall, outperforming YOSS-large (16.3 AP). Ablation studies show that replacing the QSA module with a standard MLP drops zero-shot AP catastrophically from 42.7 down to 27.2 AP, confirming QSA's vital role in parsing temporal speech redundancy. Increasing MoLE experts from $K=1$ to $K=2$ raises AP from 40.7 to 42.7, whereas $K=3$ yields no further gains.

| System / Condition | Pre-Training Data | MoLE | AP | $\text{AP}_{50}$ | $\text{AP}_{75}$ |
|---|---|---|---|---|---|
| YOSS-large (+GQA) | Flickr, COCO | No | 39.2 | 53.3 | 42.6 |
| Ours (Closed-set) | COCO | No | 54.1 | 70.2 | 59.6 |
| Ours (Closed-set) | COCO | Yes | 56.2 | 71.3 | 60.7 |
| Ours (Zero-shot) | Obj365, Flickr, GQA | No | 40.4 | 52.7 | 44.2 |
| Ours (Zero-shot) | Obj365, Flickr, GQA | Yes | 42.7 | 55.7 | 46.8 |

## Limitations

The work relies entirely on synthesized speech data generated via edge-TTS rather than real-world human-spoken audio grounding datasets, which limits claims regarding robustness in authentic acoustic environments. Performance still lags behind text-driven counterparts (e.g., Grounding DINO at 25.6 LVIS AP vs. 19.9 for Speech2See) due to continuous acoustic variability and paralinguistic entanglement.

## Why read this

Researchers and engineers building multimodal speech-vision systems or looking for alternatives to cascaded ASR-plus-text-detector pipelines will find this a blueprint for bypassing text bottlenecks via parameter-efficient cross-modal adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robotic manipulation, voice-guided navigation, and multimodal human-computer interaction where users query visual scenes directly via speech commands.

## Related

- (link related pages by id as the wiki grows)
