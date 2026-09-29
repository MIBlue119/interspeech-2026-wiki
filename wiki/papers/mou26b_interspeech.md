---
id: mou26b_interspeech
category: tts
labels: [generative-model]
institutions: ["University of Science and Technology of China", "iFLYTEK"]
code: https://muzw.github.io/dynapros/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2312
pdf: https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.pdf
---

# Dynamic Prosody Prediction in LLM-based TTS for Improving Speaker Similarity

*Zhenwei Mou, Liping Chen, Yajun Hu, Zhen-Hua Ling, Xin Fang, Jian-Qing Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2312)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper introduces a dynamic syllable-level prosody prediction mechanism for LLM-based text-to-speech (TTS) that conditions current prosody on previously generated speech tokens, significantly improving speaker style transfer and speaker similarity.

## Key contributions

- Proposes a dynamic prosody prediction strategy that estimates syllable-level prosody conditioned on target text, reference speech, and previously generated target speech tokens.
- Formulates a discrete syllable-level prosody representation combining duration, mean energy, mean pitch, and pitch range via k-means clustering (512 centroids).
- Integrates seamlessly into the CosyVoice LLM-based TTS framework using alternating prosody and speech token prediction with a dual cross-entropy loss objective.
- Demonstrates superior speaker similarity and emotion transfer across ESD, internal, and AISHELL-3 datasets compared to standard implicit LLM-TTS and static chain-of-thought (CoT) prompting.

## Problem

Existing LLM-based TTS models either model speaker attributes holistically from a reference utterance without explicit style modeling (like CosyVoice) or rely on static chain-of-thought (CoT) prompting (like RALL-E and Vevo1.5) that pre-computes prosody for the entire utterance beforehand. Static pre-computation fails to capture the dynamic stylistic nuances specific to the target text and its progression. Consequently, speaker similarity is heavily bottlenecked by inadequate, implicit style learning, especially when trained on smaller data scales.

## Method

The method builds upon the CosyVoice architecture, modifying the decoder-only Transformer LLM (14 layers, 16 heads, 1024 embedding dim, 4096 FFN dim) to interleave discrete syllable-level prosody tokens with frame-level speech tokens. Syllable boundaries are determined using the Montreal Forced Aligner (MFA), and a 4-dimensional prosody vector—containing syllable duration, mean energy, mean pitch, and pitch range—is quantized using a k-means codebook of size 512 trained on WenetSpeech. During generation, a special prosody query embedding (PQ) triggers the prediction of a discrete prosody token index for the current syllable using the prior text, reference speaker embedding (extracted via CAM++), and previously generated speech tokens. Following this, the model autoregressively generates the speech frames for that syllable using end-of-syllable (EOSL) markers.

The training objective combines cross-entropy losses for both the prosody tokens and the frame-level speech tokens, balanced by a hyperparameter weight alpha set to 0.5. During inference, tokens are sampled using top-p (p=0.8) along with top-k constraints (k=25 for speech tokens, k=15 for prosody tokens). The generated speech tokens are then passed to the original flow matching module to synthesize the final waveform, avoiding any alterations to the acoustic decoder stage.

## Experimental setup

Training utilized a filtered 50-hour Mandarin corpus combining WenetSpeech (10k hours) and the Mandarin subset of Emilia (50k hours) after removing MFA failures and misclassified audio. Evaluations were performed on three test sets: ESD (350 emotional utterances across 10 speakers), an internal iFLYTEK dataset (230 style-diverse utterances), and AISHELL-3 (214 neutral speakers). Models were compared against baseline CosyVoice (50k), a static CoT prompting variant, and large open-source systems (CosyVoice 170k, F5-TTS, Vevo1.5). Implementation used eight MLU 580 GPUs, trained for 800,000 steps with a learning rate of 1e-4 and a 10,000-step warmup. Metrics included MOS, subjective preference tests, Whisper-based Character Error Rate (CER), emotion2vec+ emotion similarity and accuracy, and pitch/energy correlation and RMSE.

## Results

On the ESD emotional dataset, the proposed model achieved a CER of 5.66% (vs 6.38% for CosyVoice(50k) and 6.14% for CoT), an emotion embedding similarity of 0.884 (vs 0.875/0.876), and an emotion recognition accuracy of 86.56% (vs 84.32%/84.52%). Pitch correlation on ESD improved to 80.32% with an RMSE of 80.81, while energy RMSE dropped to 5.93. In subjective preference evaluations, the proposed method decisively beat baseline CosyVoice(50k) (51.5% to 28.8% preference on ESD; 48.2% to 33.2% on internal) and static CoT prompting (50.9% to 28.8% on ESD; 47.7% to 30.9% on internal). Furthermore, trained on only 50k hours, it outperformed open-source models trained on larger corpora (such as Vevo1.5 and F5-TTS trained on 100k hours) on emotionally expressive test conditions.

| System | ESD CER (%) | ESD Emotion SIM | ESD Pitch Corr (%) | AISHELL-3 CER (%) |
|---|---|---|---|---|
| CosyVoice (50k) | 6.38 | 0.875 | 79.52 | 11.59 |
| CoT Prompting | 6.14 | 0.876 | 79.31 | 11.61 |
| Proposed Dynamic | 5.66 | 0.884 | 80.32 | 10.19 |

## Limitations

The evaluation is restricted exclusively to Mandarin Chinese, leaving cross-lingual and multilingual capabilities untested. The approach relies heavily on precise syllable boundary alignments from an external forced aligner (MFA) during training, which can introduce error propagation or scaling bottlenecks. Additionally, compute requirements remain heavy, necessitating 8 specialized accelerators for 800k steps.

## Why read this

Speech researchers and engineers working on LLM-based TTS should read this paper to understand how conditioning autoregressive speech generation on dynamically updated local prosody tokens outperforms static chain-of-thought prompting and bridges data-scale deficits.

## Code

- https://muzw.github.io/dynapros/

## Applications

Personalized text-to-speech, expressive voice cloning, and emotionally adaptive conversational agents.

## Institutions / 機構

University of Science and Technology of China, iFLYTEK

## Related

- (link related pages by id as the wiki grows)
