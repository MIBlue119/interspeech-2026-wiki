---
id: lu26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1185
pdf: https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.pdf
---

# Alignment-Aware Continued Pre-training for Multilingual Speech Representation Learning

[PDF](https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1185)

**TL;DR** — The paper introduces an alignment-aware continued pre-training framework that integrates CTC supervision and a language-aware dual-codebook quantizer into multilingual speech foundation models, achieving up to a 15% relative WER reduction on FLEURS.

## Problem

Standard multilingual self-supervised learning (SSL) models defer acoustic-symbol alignment entirely to the downstream supervised fine-tuning stage, which leads to suboptimal cross-lingual generalization and performance degradation over heterogeneous scripts and long-tailed language distributions. This misalignment prevents foundation models from fully exploiting pretrained representations for unseen or underrepresented languages. Addressing this gap requires incorporating textual symbolic constraints earlier into an intermediate continued pre-training stage while retaining self-supervised regularization.

## Method

The framework builds on top of the 300M parameter MMS multilingual SSL model through a three-stage pipeline: initialization, joint SSL-CTC continued pre-training, and CTC fine-tuning. During continued pre-training, a CTC head is attached alongside contrastive and diversity losses, utilizing a random replacement (RR) mechanism with a replacement probability of 0.5 to inject textual symbolic gradients into both contextual and quantization pathways. The authors evaluate three modeling units—native graphemes (Char), IPA phonemes via G2P, and unified romanization (Uroman)—to define the textual symbolic space. Additionally, they introduce a language-aware dual-codebook quantization mechanism that decomposes the discrete space into a shared global codebook and language-specific codebooks combined via additive fusion with Gumbel-Softmax routing, mitigating multilingual competition under long-tailed distributions.

## Results

Experiments are conducted on the FLEURS (102 languages) and Multilingual LibriSpeech (MLS-10h and 7 non-English languages) datasets. On the FLEURS Test set, the proposed joint SSL-CTC pre-training with Uroman reduces word error rate (WER) from 47.2% (direct fine-tuning) and 43.4% (continual SSL) down to 36.6%, representing an 11% relative reduction over continual SSL and a 15% relative reduction over direct fine-tuning. Uroman outperforms graphemes on overall WER (36.6% vs 37.8% on FLEURS Test) and unseen cross-lingual transfer, while IPA conversion yields inferior performance (45.0% overall WER) due to G2P noise and allophonic variations. Furthermore, the language-aware dual-codebook variant further decreases FLEURS Test WER from 36.6% to 35.5% and character error rate (CER) from 13.0% to 12.5%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust multilingual automatic speech recognition systems for low-resource or highly diverse language scenarios.

## Limitations

IPA modeling is hindered by limited G2P resource coverage and conversion noise across diverse languages.

## Related

- (link related pages by id as the wiki grows)
