---
id: sinha26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2666
pdf: https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.pdf
---

# Error Diversity and Performance Variability in Zero-Shot Children's Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2666)

**TL;DR** — This paper analyzes self-supervised learning (SSL) representations for zero-shot children's speech recognition using adult-trained models, revealing that different Transformer layers capture complementary acoustic information with significant per-utterance variability.

## Problem

Children's speech recognition suffers due to acoustic mismatch and scarce training data, requiring zero-shot transfer from adult-trained models. However, evaluating intermediate representations solely via aggregate word error rate (WER) obscures structural error differences, per-utterance variability, and recoverability under domain shift.

## Method

The study evaluates frozen large-scale SSL models (Wav2Vec2, HuBERT, and Data2Vec) featuring 24-layer Transformer architectures. Hybrid DNN-HMM acoustic systems are trained exclusively on adult speech corpora (WSJCAM0 and Mini LibriSpeech) and evaluated zero-shot on children's speech datasets (PFSTAR and CMU Kids). Independent ASR decodings are performed using representations from each of the 24 layers. Error composition is analyzed via substitution, deletion, and insertion ratios, and post-recognition correction is tested using an instruction-tuned Mistral-7B-Instruct LLM alongside LoRA fine-tuning.

## Results

On PFSTAR, best-case layer WERs ranged from 5.15% to 5.69% with standard deviations around 2.36–3.03, whereas CMU Kids showed best-case layer WERs between 21.52% and 22.14% with extreme standard deviations of 10.65–15.63 and worst layers reaching 86.62%. Oracle selection yielded substantial absolute gains of 5.10–5.66% on CMU Kids compared to 1.26–1.60% on PFSTAR, demonstrating high per-utterance instability (mean standard deviation 0.16–0.20 on CMU Kids vs. 0.03–0.04 on PFSTAR). LLM-based post-correction failed to improve WER, frequently preserving original hypotheses or introducing hallucinations when fine-tuned.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers working on zero-shot cross-domain adaptation, low-resource children's speech recognition, and acoustic representation selection.

## Limitations

The study is scoped to hybrid DNN-HMM decoders using frozen SSL features and bigram language models, evaluated specifically on British English (PFSTAR) and American English (CMU Kids) children's corpora.

## Related

- (link related pages by id as the wiki grows)
