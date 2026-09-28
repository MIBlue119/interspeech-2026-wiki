---
id: mondal26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1133
pdf: https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.pdf
---

# Probing LoRA-to-LoRA Cross-Lingual Transfer for Unseen Low-Resource Conditions in Whisper-Based ASR

[PDF](https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1133)

**TL;DR** — This paper proposes a two-stage LoRA-to-LoRA transfer strategy using genealogical relatedness and orthographic distribution similarity to adapt Whisper to unseen low-resource languages, yielding relative WER reductions of up to 17%.

## Problem

Large speech foundation models like Whisper struggle to adapt to extremely low-resource or unseen languages that lack significant pre-training exposure. While full fine-tuning causes catastrophic forgetting and standard parameter-efficient methods like LoRA struggle without strong pre-trained anchors, transferring knowledge from a related donor language can bridge the gap. However, existing LoRA transfer approaches only examine high-resource languages already well-represented in the base model's training distribution.

## Method

The authors introduce a staged LoRA transfer pipeline using Whisper-small (244M parameters) as the base model. First, candidate donor languages are filtered using genealogical relatedness to match the linguistic family of the low-resource recipient. Second, the optimal donor is identified by computing the Jensen-Shannon divergence between the empirical token distributions of the donor and recipient vocabularies. LoRA adapters with rank r = 32 are trained on the donor language (e.g., Hindi, Marathi, Bengali) and their weights are transferred to initialize the recipient adapter (e.g., Bhojpuri, Konkani, Assamese), which is subsequently fine-tuned while freezing the base model and donor parameters.

## Results

Evaluated on low-resource benchmarks including the Bhojpuri Rural Woman dataset (SRUTI) and IndicVoices, the proposed donor-informed initialization consistently outperforms recipient-only adapter training. For example, transferring from Hindi to Bhojpuri with 40 and 80 hours of recipient data, and across Bengali-Assamese and Marathi-Konkani pairs, yields relative Word Error Rate (WER) reductions of up to 17% compared to single-stage baselines. Zero-shot baseline error rates for the unseen recipients are near-saturated (WER ≈ 100% to 249%), highlighting the difficulty of the target regime.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building automated speech recognition systems for under-resourced, endangered, or dialectal languages with minimal transcribed speech data.

## Limitations

The approach relies on finding a genealogically and orthographically related donor language that has at least moderate supervised resources.

## Related

- (link related pages by id as the wiki grows)
