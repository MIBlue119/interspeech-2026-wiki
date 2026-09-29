---
id: lyu26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["South China University of Technology"]
code: https://github.com/huanxian/TriA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-995
pdf: https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.pdf
---

# TriA Pipeline: A Large-Scale Automatic Audio Annotation Pipeline For Audio Classification In Specific Scenarios

*Hong Lyu, Mingru Yang, Qianhua He, Yanxiong Li, Jinxin Huang, Zhengyu Pei*

[PDF](https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lyu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-995)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the TriA Pipeline, a four-stage automatic audio annotation system that converts raw platform audio into high-quality training datasets, resulting in a 2130-hour dataset and average relative gains of 3.97% in accuracy and 3.35% in Macro-F1 across domestic audio classification tasks when combined with manual data.

## Key contributions

- Proposes the TriA Pipeline (Standardization, AAD, AED, Filtering) to process and annotate unstructured streaming audio into event-labeled training data.
- Releases the TriA dataset comprising over 2130 hours of audio across 431 classes, alongside scenario-specific subsets (TriAGK) tailored via prior knowledge.
- Demonstrates that training on pipeline-annotated data alone achieves competitive performance with manually annotated datasets across three domestic classification benchmarks.
- Shows that sequential fine-tuning using TriAGK followed by manual data yields average relative improvements of 3.97% in accuracy and 3.35% in Macro-F1.

## Problem

Annotated audio datasets are severely limited for specific scenarios like domestic environments, where existing specialized corpora such as DESEDreal, Kitchen20, and Nonspeech7k suffer from small scales (often under 10 hours or a few thousand clips). While general-purpose datasets like AudioSet and FSD50K provide scale, they remain class-unbalanced and lack dense coverage for underrepresented acoustic events such as domestic alerts or medical sounds. Prior annotation pipelines (e.g., Emilia-Pipe, NVSpeech-Pipe) focus exclusively on ASR or paralinguistic speech features, leaving a distinct gap for general audio event detection and classification pipelines.

## Method

The TriA Pipeline executes in four sequential stages: Standardization, Audio Activity Detection (AAD), Audio Event Detection (AED), and Filtering. Standardization converts raw files to mono 24 kHz, 16-bit WAVs, normalizes loudness to -20 dBFS, and bounds amplitudes between -3 dB and 3 dB. AAD employs the auditok tool with an energy threshold to segment long audio into clips capped at 30 s, using empirically determined Event Critical Times (ECT = 1.2 s) and Silent Critical Times (SCT = 2.0 s) for domestic environments to remove redundant silence and fragments too short to identify.

For AED, the 90M-parameter BEATsiter3+ model (fine-tuned on AS-2M) annotates audio events. It performs local detection using a 5 s window and 3 s shift to capture short events, concatenates adjacent windows with identical Top-1 event predictions, and executes global detection where the window length matches the concatenated segment to catch long or continuous events. A confidence threshold of 0.6 is enforced.

The Filtering stage uses Facebook's audiobox-aesthetics model to compute Production Complexity (PC) and Production Quality (PQ) scores, alongside Microsoft CLAP similarity against the text annotation. Segments failing predefined threshold values are discarded. The surviving data is exported as MP3 with accompanying JSONL metadata for indexing.

## Experimental setup

Evaluated on three domestic audio classification tasks: DESEDAC, Kitchen20, and Nonspeech7k. TriAGK partitions yield TriADESED (42.60 hours, 23,517 clips), TriAKitchen20 (2.45 hours, 1,688 clips), and TriANonspeech7k (11.29 hours, 9,618 clips). Baselines comprise models trained solely on the manual counterparts (DESEDreal, Kitchen20, Nonspeech7k). Models use a 12-layer Transformer encoder backbone (BEATs, 90M parameters) with a 2-layer linear classification head, trained on an RTX 3090 using AdamW optimizer and cross-entropy loss, evaluated via Accuracy and Macro-F1.

## Results

On the DESEDAC task, training on TriADESED achieves 0.8255 accuracy compared to 0.7837 for DESEDreal alone; sequential fine-tuning (TriADESED -> DESEDreal) achieves an accuracy of 0.8258 and Macro-F1 of 0.8256 (a 5.37% relative accuracy gain over baseline). On Kitchen20, sequential fine-tuning (TriAKitchen20 -> Kitchen20) reaches 0.9813 accuracy and 0.9812 Macro-F1, marking a 6.09% relative improvement over manual-only training. On Nonspeech7k, TriANonspeech7k alone underperforms the manual set (0.8938 vs 0.9448 accuracy), but sequential fine-tuning still pushes performance to 0.9490 accuracy and 0.9464 Macro-F1.

| System / Condition | Accuracy | Macro-F1 |
| --- | --- | --- |
| DESEDreal (Manual) | 0.7837 | 0.7943 |
| TriADESED + DESEDreal | 0.8258 | 0.8256 |
| Kitchen20 (Manual) | 0.9250 | 0.9272 |
| TriAKitchen20 + Kitchen20 | 0.9813 | 0.9812 |
| Nonspeech7k (Manual) | 0.9448 | 0.9437 |
| TriANonspeech7k + Nonspeech7k | 0.9490 | 0.9464 |

## Limitations

The pipeline relies heavily on the ontology and performance ceiling of the pre-trained BEATs model and CLAP filtering encoders, meaning any inherent blind spots or class biases in those upstream models propagate into TriA. The current dataset exploration is bounded primarily to domestic environments (431 classes) and streaming platform audio, leaving the pipeline's generalization to industrial, marine, or extreme noise domains unverified. Furthermore, automated filtering thresholds require domain-specific tuning (via subjective listening tests for ECT/SCT), limiting out-of-the-box zero-shot deployment for entirely novel acoustic environments.

## Why read this

Speech and machine learning engineers building audio classification or event detection systems for data-scarce domains should read this to see how combining off-the-shelf SSL models (BEATs, CLAP, audiobox-aesthetics) into a rigorous multi-stage filtering pipeline can automate the creation of high-performing domain datasets.

## Code

- https://github.com/huanxian/TriA

## Applications

Automated dataset generation for smart home sound event detection, domestic safety monitoring, and acoustic surveillance systems.

## Institutions / 機構

South China University of Technology

**Funding / 經費:** National Natural Science Foundation of China, China-Croatia Science and Technology Cooperation Committee

## Related

- (link related pages by id as the wiki grows)
