---
id: liu26h_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1183
pdf: https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.pdf
---

# Confidence-Gated Mean-Teacher Consistency Regularization for Low-Resource Multilingual ASR with Shared–Private Fusion-LoRA

[PDF](https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1183)

**TL;DR** — The paper introduces a parameter-efficient fine-tuning and consistency regularization framework for Whisper that reduces macro-average word error rate by 35.4% over baseline LoRA on low-resource Indic languages.

## Problem

Low-resource multilingual ASR relies on joint training and parameter sharing, but excessive sharing causes gradient conflicts and negative transfer where high-resource languages dominate. Furthermore, auxiliary consistency learning and self-training under data scarcity often trigger cross-view instability and confirmation bias. These issues compound when adapting large end-to-end models with very few transcription labels.

## Method

The method builds upon a frozen Whisper-small backbone using a Shared-Private Fusion-LoRA (SPF-LoRA) architecture combined with Confidence-Gated Mean-Teacher Consistency Regularization (MT-CR). SPF-LoRA splits low-rank updates into a cross-lingually shared branch and a language-specific private branch, adaptively blended via learnable language-level sigmoid gating coefficients. MT-CR applies an Exponential Moving Average (EMA) teacher (with momentum 0.9995) to adapter parameters on a second augmented speech view, while token-level confidence gating masks out unreliable teacher predictions using a threshold rising from 0.6 to 0.8. Training uses a two-stage protocol consisting of supervised warmup followed by consistency optimization with ramped consistency weights.

## Results

Evaluated on five Indo-Aryan languages from the Kathbath dataset (Gujarati, Hindi, Marathi, Punjabi, Urdu), the proposed method reduces macro-average WER from 84.70% (zero-shot) and 30.73% (Whisper-small+LoRA) down to 19.85%. It outperforms a Whisper-medium+LoRA baseline (22.46% macro WER) while using the smaller Whisper-small backbone. Character error rate (CER) improvements are consistent across all five languages, led by a 13.82% absolute CER reduction on Gujarati. Ablations demonstrate that learnable shared-private fusion outperforms static variants, and confidence gating is critical for preventing noise accumulation in MT-CR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing low-resource multilingual speech recognition systems or adapting large speech foundation models to tail languages.

## Limitations

The evaluation is restricted to five Indo-Aryan languages and relies on the Whisper-small architecture for primary experiments.

## Related

- (link related pages by id as the wiki grows)
