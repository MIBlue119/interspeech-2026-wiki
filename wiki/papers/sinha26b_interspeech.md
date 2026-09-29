---
id: sinha26b_interspeech
category: asr
labels: [low-resource, self-supervised, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2666
pdf: https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.pdf
---

# Error Diversity and Performance Variability in Zero-Shot Children's Speech Recognition

*Abhijit Sinha, Hemant Kumar Kathania, Paban Sapkota, Mikko Kurimo*

[PDF](https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sinha26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2666)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`, `robustness-noise`

**TL;DR** — An empirical analysis of intermediate SSL representations (Wav2Vec2, HuBERT, Data2Vec) under zero-shot adult-to-child ASR reveals that layers with identical word error rates exhibit distinct error structures and complementary acoustic behaviors. Oracle selection proves that per-utterance representation diversity can yield absolute WER gains of up to 5-6% under severe domain mismatch, outperforming LLM-based post-recognition correction.

## Key contributions

- Evaluated layer-wise representation diversity across Wav2Vec2, HuBERT, and Data2Vec in a strict zero-shot adult-to-child ASR setting across PFSTAR and CMU Kids datasets.
- Demonstrated through error composition analysis that zero-shot error profiles vary drastically by dataset (PFSTAR shows higher insertion rates while CMU Kids is heavily substitution-dominated).
- Conducted an oracle analysis proving that no single layer is consistently optimal per utterance, uncovering latent representation complementarity that yields 5-6% absolute WER improvements under high domain mismatch.
- Showed that instruction-tuned LLMs (Mistral-7B-Instruct) fail to correct zero-shot children's ASR errors effectively because failures stem from acoustic ambiguity rather than linguistic ill-formedness.

## Problem

Children's speech recognition suffers from severe acoustic and developmental mismatch when models are trained solely on adult data due to limited labeled children's speech corpora. Prior work typically selects intermediate layers of self-supervised learning (SSL) models based exclusively on aggregate Word Error Rate (WER). However, aggregate metrics obscure structural error compositions, per-utterance variation, and whether downstream text-based post-processing can actually recover these errors.

## Method

The authors examine three large-scale SSL models—Wav2Vec2, HuBERT, and Data2Vec—each featuring a convolutional feature extractor followed by a 24-layer Transformer network. All SSL models are kept entirely frozen during experimentation to enforce a strict zero-shot protocol, extracting 1024-dimensional frame-level representations at a 20 ms rate from every individual layer. These frozen features are passed into a conventional hybrid DNN-HMM acoustic model built using the Kaldi toolkit, containing five hidden layers of 1024 units each, trained with a decaying learning rate schedule and decoded using a bigram language model.

To probe linguistic recoverability, the 1-best hypothesis from the top-performing SSL layer is fed into an instruction-tuned Mistral-7B-Instruct LLM with zero-shot prompts to minimally fix transcription errors, alongside parameter-efficient LoRA text-domain adaptation. Per-utterance representation complementarity is quantified via an oracle experiment, selecting the hypothesis with the lowest WER across all 24 individual layer outputs for every individual utterance.

## Experimental setup

Evaluated on PFSTAR (British English children, 8.3h train, 1.1h test across 60 speakers) and CMU Kids (American English children, 9h train, 2.83h test across 78 speakers). Acoustic models are trained on adult-only corpora matching accent: WSJCAM0 (15.5h, 92 speakers) for PFSTAR, and Mini LibriSpeech for CMU Kids. Baselines compare layer-wise variations across Wav2Vec2, HuBERT, and Data2Vec large configurations using WER decomposed into substitutions, deletions, and insertions, alongside oracle selections over all and top-k layers.

## Results

On PFSTAR, best-case layer WERs reach 5.15% (Wav2Vec2, layer 22), 5.69% (HuBERT, layer 24), and 5.43% (Data2Vec, layer 22), with oracle gains remaining modest at 1.26% to 1.60% absolute. On the more acoustically mismatched CMU Kids corpus, best-case layer WERs sit at 21.52% (Wav2Vec2), 22.14% (HuBERT), and 21.64% (Data2Vec), but worst-performing layers spike as high as 86.62%. Oracle selection on CMU Kids drives substantial absolute improvements of 5.10% to 5.66% (lowering Wav2Vec2 WER from 21.52% down to 16.42%), accompanied by a 4- to 6-fold increase in per-utterance layer instability (mean standard deviation rising from ~0.038 on PFSTAR to ~0.163 on CMU Kids). Restricting oracle selection to top-2 layers degrades CMU Kids oracle performance to 20.41% WER. Zero-shot LLM correction via Mistral-7B-Instruct leaves WER virtually unchanged, while LoRA text fine-tuning degrades performance by forcing hallucinatory substitutions.

| System / Condition | Best Layer WER (%) | Oracle WER (%) | Oracle Gain (%) | Instability (StdDev) |
|---|---|---|---|---|
| Wav2Vec2 (PFSTAR) | 5.15 | 3.89 | 1.26 | 0.0386 |
| HuBERT (PFSTAR) | 5.69 | 4.09 | 1.60 | 0.0399 |
| Data2Vec (PFSTAR) | 5.43 | 3.89 | 1.54 | 0.0286 |
| Wav2Vec2 (CMU Kids) | 21.52 | 16.42 | 5.10 | 0.1636 |
| HuBERT (CMU Kids) | 22.14 | 17.00 | 5.14 | 0.2026 |
| Data2Vec (CMU Kids) | 21.64 | 15.97 | 5.66 | 0.1635 |

## Limitations

The study is restricted to read speech datasets in English (British and American accents) and does not evaluate spontaneous or conversational children's speech. The investigation is limited to hybrid DNN-HMM architectures using Kaldi, leaving open whether end-to-end encoder-decoder or CTC/RNN-T models exhibit identical layer-wise error diversities.

## Why read this

Speech and ML researchers working on cross-domain transfer or zero-shot ASR should read this to understand that global WER optimization hides massive layer-wise error diversity. It demonstrates that under severe acoustic mismatch, acoustic representation selection or combination matters far more than post-hoc text-based LLM correction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot domain adaptation for children's speech interfaces, educational voice applications with limited labeled training data, and dynamic acoustic feature fusion strategies.

## Institutions / 機構

NIT Sikkim, Aalto University

## Related

- (link related pages by id as the wiki grows)
