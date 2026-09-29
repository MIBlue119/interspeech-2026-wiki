---
id: lee26h_interspeech
category: tts
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-909
pdf: https://www.isca-archive.org/interspeech_2026/lee26h_interspeech.pdf
---

# UR-BERT: Scaling Text Encoders for Massively Multilingual TTS Through Universal Romanization and Speech Token Prediction

*Sangmin Lee, Eek Gyun Ahn, Woongjib Choi, Hong-Goo Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-909)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — UR-BERT is a massively multilingual text encoder for TTS that scales to 495 languages by unifying writing systems through Romanization and incorporating a speech token prediction pretraining objective, outperforming prior phoneme-based models while using substantially less text data.

## Key contributions

- Proposes UR-BERT, a multilingual text encoder pretrained on speech-text pairs covering 495 languages without relying on G2P toolkits.
- Replaces language-specific G2P pipelines with Uroman-based Romanization as a unified orthographic interface, mapping diverse writing systems to a compact ~30-character Latin inventory.
- Introduces a speech token prediction (STP) objective using a multilingual S3M teacher model (omnilingual-ASR-W2V-300M) and MMS-FA forced alignment to distill acoustic and phonetic information into text representations.
- Achieves strong zero-shot cross-lingual generalization on unseen languages (e.g., Sundanese) and robust performance across high- and low-resource settings.

## Problem

Conventional neural TTS encoders rely heavily on G2P (grapheme-to-phoneme) pipelines like Phonemizer or CharsiuG2P, which are restricted to roughly 100 languages due to a scarcity of linguistic resources and rule sets, leaving thousands of languages unsupported. Furthermore, text encoders trained purely on text lack acoustic and prosodic context, resulting in poor phonetic fidelity and alignment challenges. While prior BERT-style text encoders like m-PLBERT and XPhoneBERT expand coverage up to 88-127 languages, they remain constrained by G2P bottlenecks and require massive text corpora (e.g., XPhoneBERT uses 330M sentences), highlighting the need for a scalable, data-efficient, and speech-aware multilingual text representation framework.

## Method

UR-BERT adopts a standard BERT-base architecture consisting of 12 Transformer encoder layers and a character-level tokenizer, utilizing a compact vocabulary of approximately 30 Latin characters derived from the Uroman Romanization toolkit. To overcome the acoustic ambiguity inherent in reducing diverse scripts to Latin characters, the model incorporates a speech token prediction (STP) objective during pretraining alongside standard masked language modeling (MLM).

The pretraining pipeline constructs supervision signals from ASR speech-text pairs by first extracting continuous representations from the 16th layer of an omnilingual ASR teacher model (omnilingual-ASR-W2V-300M). These representations are aligned to character-level text using MMS-FA forced alignment, averaged pooled per character, and discretized into a 256-element codebook using k-means clustering (plus a zero mute token, totaling 257 indices).

The pretraining corpus combines 13K hours of speech spanning 495 languages (8M sentences) sourced from FLEURS, Common Voice, and the Omnilingual ASR corpus. Training runs for 150K steps with a batch size of 1024 using the AdamW optimizer and a tri-stage learning rate schedule peaking at 1e-4. For downstream TTS, the VITS backbone is finetuned with its text encoder frozen for the first 25% of steps, using 300K steps for high-resource languages and 100K steps for low-resource languages.

## Experimental setup

Evaluated on 11 languages divided into high-resource (English, German, Mandarin Chinese with 20h data each) and low-resource (Afrikaans 2h, Khmer 3h, Javanese 5h, Nepali 2h, Setswana 2h, Xhosa 2h, Sinhala 1h, plus zero-shot Sundanese 5h). Compared against original VITS, m-PLBERT (+MPB), and XPhoneBERT (+XPB) baselines. Metrics include subjective Mean Opinion Score (MOS, 1-5 scale), UTMOS relative degradation (ΔUTM) vs ground truth, character error rate relative degradation (ΔCER) via Omnilingual-ASR-CTC-1B, Mel-Cepstral Distance (MCD), and Log-F0 Root Mean Squared Error (Log-F0 RMSE).

## Results

On high-resource English, UR-BERT achieves an MOS of 4.35 (vs VITS 3.78, +MPB 1.83, +XPB 4.11) and lowers ΔCER to 3.78% (vs VITS 6.15%, +XPB 4.79%). On German, it reaches an MOS of 3.78 and ΔCER of 3.07%. In low-resource settings, UR-BERT consistently outperforms VITS and XPhoneBERT across all tested languages; for instance, on Afrikaans it achieves an MOS of 3.34 and MCD of 6.09, and on Khmer it attains an MCD of 5.59 and ΔCER of 6.88%. Notably, UR-BERT achieves these gains while using only 2.5% of the pretraining data volume of XPhoneBERT (8M vs 330M sentences). Ablations show that removing the STP objective drops MOS across nearly all high- and low-resource languages (e.g., English drops from 4.35 to 4.00, Afrikaans from 3.34 to 3.04).

| System / Condition | English MOS ↑ | English ΔCER ↓ | German MOS ↑ | German ΔCER ↓ |
|---|---|---|---|---|
| Ground Truth (GT) | 4.61 | — | 4.02 | — |
| VITS (Baseline) | 3.78 | 6.15% | 3.45 | 6.37% |
| VITS + m-PLBERT | 1.83 | 66.50% | 2.65 | 67.78% |
| VITS + XPhoneBERT | 4.11 | 4.79% | 3.53 | 5.85% |
| VITS + UR-BERT (Ours) | 4.35 | 3.78% | 3.78 | 3.07% |

## Limitations

While Romanization scales efficiently to 495 languages, it strips away fine-grained phonetic distinctions present in native scripts or IPA, relying heavily on the STP auxiliary objective to recover acoustic fidelity. The k-means clustering uses a fixed codebook size of 257, which may discard subtle speaker-dependent or fine paralinguistic variations. Additionally, evaluation is validated on a subset of 11 fine-tuned languages and one zero-shot language, leaving broader out-of-domain dialectal robustness unverified.

## Why read this

Speech researchers and TTS engineers working on massively multilingual or low-resource speech synthesis should read this paper to learn how combining a lightweight Romanized text representation with acoustic distillation via speech token prediction bypasses G2P bottlenecks while outperforming massive phoneme-based text encoders.

## Code

- https://github.com/sanghyang00/ur-bert

## Applications

Massively multilingual text-to-speech systems, cross-lingual voice cloning, and low-resource speech generation toolkits.

## Institutions / 機構

Yonsei University

**Funding / 經費:** National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
