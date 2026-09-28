---
id: kumar26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1007
pdf: https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.pdf
---

# Overcoming Decoder Inconsistencies in Whisper for Dravidian and Low-Resource Languages

*Chowdam Venkata Kumar, Kumud Tripathi, Pankaj Wasnik*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1007)

**TL;DR** — This paper addresses Whisper's high Word Error Rates on morphologically rich, low-resource Dravidian languages by introducing two decoder enhancements: Weighted-Attention for balancing attention sources and a Self-Conditioning module for token consistency. Together, they reduce average WER by up to 3.00% on challenging languages like Malayalam.

## Key contributions

- Identifies lexical sparsity, low repetition, and long word lengths as primary root causes of character-level substitution errors in Dravidian language ASR.
- Introduces a Weighted-Attention mechanism using lightweight 2-layer FFN gating modules to dynamically balance self-attention and cross-attention signals.
- Proposes an autoregressive Self-Conditioning module applied at the second-last decoder layer to re-inject intermediate predictions with auxiliary supervision.
- Validates broad applicability on non-Indian agglutinative languages (Korean and Swahili), demonstrating consistent WER reductions.

## Problem

Multilingual ASR models like Whisper exhibit a stark performance gap, scoring significantly higher Word Error Rates on Dravidian languages (Tamil, Telugu, Kannada, Malayalam) compared to Indo-Aryan languages (Hindi, Bengali). The authors show that Dravidian languages possess longer average words, much higher type-to-token ratios, and lower word repetition, resulting in sparse token distributions. Prior approaches like standard multilingual fine-tuning or sampling strategies fail to fix the decoder's internal imbalance between linguistic self-attention context and acoustic cross-attention cues, causing frequent character-level substitution errors.

## Method

The paper introduces two architectural modifications to the Whisper decoder to handle morphological complexity. The first is Weighted-Attention, which adds two lightweight gating modules (WeightPredictor1 and WeightPredictor2) constructed from two-layer feedforward networks with sigmoid activations, producing scalars in [0, 1] to dynamically regulate self-attention and cross-attention contributions via residual connections.

The second enhancement is a Self-Conditioning module applied at the second-last decoder layer. Intermediate decoder states generate logits via the LM head, which are converted to probabilities via softmax and linearly projected back into the decoder's space to match dimensions. This vector is added back to the preceding hidden state to provide a richer, context-integrated representation guided by an auxiliary cross-entropy loss.

Models are built on top of Whisper-medium (and tested on small/large-v3) using the Kathbath speech corpus. Training runs for 3 epochs using the AdamW optimizer with a batch size of 16, a base learning rate of 1e-5, and 5e-5 for newly introduced parameters. Morphological splitting (via IndicNLP) is evaluated as an analytical tool, while the proposed attention and conditioning layers add less than 1% parameter overhead, minimal training latency, and under 2% inference latency overhead.

## Experimental setup

Experiments use the Indian multilingual Kathbath corpus alongside non-Indian agglutinative datasets for Korean and Swahili. Evaluations compare standard Whisper-medium fine-tuning (W-M FT) against variants with Morphological Splitting (MS), Weighted-Attention, Self-Conditioning, and their combination, measuring performance via Word Error Rate (WER %). Training relies on four NVIDIA A100 (40GB) GPUs using Hugging Face Transformers.

## Results

On Indian languages with morphological splitting, baseline W-M FT achieves an average WER of 17.18%. Adding Weighted-Attention lowers the average WER to 15.63%, while Self-Conditioning alone yields 15.63% on average, and the combined approach hits 15.53%. The gains are most prominent on heavily agglutinative Dravidian languages: Malayalam improves by up to 3.00% absolute WER (dropping from 27.89% to 24.89% with MS), and Telugu improves by 2.03% (dropping from 18.73% to 16.70%). On non-Indian agglutinative languages, the combined approach reduces Korean WER from 3.34% to 2.51% and Swahili WER from 16.07% to 14.58% (without MS).

| System / Condition | Hindi | Telugu | Malayalam | Average (All 8) |
|---|---|---|---|---|
| W-M FT + MS (Baseline) | 11.48 | 18.73 | 27.89 | 17.18 |
| + Weighted-Attention + MS | 10.67 | 16.69 | 25.54 | 15.63 |
| + Self-Conditioning + MS | 10.82 | 16.90 | 25.07 | 15.63 |
| + Combined + MS | 10.48 | 16.70 | 24.89 | 15.53 |

## Limitations

The study focuses primarily on Whisper encoder-decoder architectures and evaluates on a constrained set of language families (Indo-Aryan, Dravidian, and two external agglutinative languages). The morphological splitting analysis relies on rule-based or external tools like IndicNLP, which may not scale gracefully to extremely under-resourced dialects lacking comprehensive morphological analyzers. Compute scope is restricted to 3 epochs on medium-sized models, leaving ultra-large scale scaling properties unexplored.

## Why read this

Speech and ML researchers focusing on multilingual ASR and decoder architectures should read this to understand how morphological sparsity causes internal attention imbalances in sequence-to-sequence models. It provides a lightweight, plug-and-play recipe (Weighted-Attention and Self-Conditioning) to dramatically improve low-resource and agglutinative language performance without inflating compute or parameter budgets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual speech recognition systems, voice interfaces for low-resource and agglutinative regional languages, and robust transcription pipelines for morphologically rich linguistic families.

## Related

- (link related pages by id as the wiki grows)
