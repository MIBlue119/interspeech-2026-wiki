---
id: rafat26_interspeech
category: asr
labels: [low-resource, multilingual, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3334
pdf: https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf
---

# Dynamic Block-Online Streaming ASR for Low-Resource Agglutinative Code-Switching Speech with Morphology-Aware Evaluation

*Kazi Rafat, Afifa Imran, Md. Ismail Hossain, Md. Romzan Ali, Fuad Rahman, Sifat Momen, Shafin Rahman, Nabeel Mohammed*

[PDF](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3334)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `streaming-real-time`

**TL;DR** — This paper introduces a Dynamic Block-Online streaming ASR framework for low-resource, agglutinative intra-sentential Bangla-English code-switching, achieving an Eroot error of 0.29 and Emorph of 0.35 by combining VAD-aligned global attention with Script-Anchored Loanword Injection.

## Key contributions

- Dynamic Block-Online Processing: A VAD-triggered streaming strategy utilizing offline global attention models to resolve long-form agglutinative code-switching dependencies.
- Script-Anchored Loanword Injection: A synthetic augmentation technique embedding 750 high-frequency English loanwords into monolingual corpora to model phonotactic transitions.
- Fine-Grained CS-WER Metric: A decomposed evaluation metric tracking Switch-Point (Eswitch), Loanword Root (Eroot), and Morphological Boundary (Emorph) errors.
- Domain Generalization: Successful zero-shot or adapted transfer to high-perplexity menstrual and menopausal health terminology.

## Problem

Low-resource agglutinative languages challenge low-latency streaming ASR because fixed-window causal attention truncates dependent vowel signs, prefixes, and suffixes that cross code-switch boundaries. Standard causal streaming cannot look back from a future suffix to correct an earlier root embedding, leading to alignment drift and high deletion rates. Existing open datasets lack intra-sentential code-switching coverage, causing models to fail when colloquial Bangla mixes with English loanwords.

## Method

The architecture is built on a Non-Autoregressive Paraformer backbone utilizing Self-Attention Network with Memory (SAN-M) blocks and a Continuous Integrate-and-Fire (CIF) predictor that maps acoustic frames to target tokens using emission weights alpha. While offline training uses global bidirectional attention, standard streaming restricts receptive fields using causal chunk masks (lambda <= 2.4s to 3.0s). To eliminate this future-blindness bottleneck without suffering from high latency, the proposed Dynamic Block-Online framework uses a Voice Activity Detector (VAD) to segment audio at natural communicative pauses (>200ms) into semantic macro-blocks up to 3 seconds long. Within each dynamic block, the unmasked offline encoder is deployed to restore global bidirectional attention, allowing hindsight resolution where early frames (roots) are reevaluated against later frames (suffixes). To combat data scarcity, the model uses Script-Anchored Loanword Injection, mapping a lexicon of 750 semantic equivalents (rbn, ren) onto a 750-hour composite Bengali corpus plus 250 hours of English Gigaspeech to yield roughly 20% code-switched sentences.

## Experimental setup

Experiments use a composite 750-hour Bangla corpus (Common Voice Bengali ~75h, OpenSLR 53 ~215h, IndicVoices ~122h, KathBath ~84h) plus 250h of English Gigaspeech, evaluated on Common Voice conversational splits with injected loanwords and a high-perplexity Menstrual Health dataset. Baselines include offline Whisper (Large v2/v3), MBNSpeech, MMS, and standard offline/streaming Paraformer variants with varying context windows (600ms to 3s) and explicit LID tags. Metrics include Character Error Rate (CER), Word Error Rate (WER), and the fine-grained CS-WER tuple (Eswitch / Eroot / Emorph).

## Results

The standard streaming Paraformer baseline saturates at an Mroot of 0.35 and Mmorph of 0.42 even when extending the causal window to 3.0s (Global WER 37.20%), driven primarily by high deletion rates (~7%). In contrast, the proposed Dynamic Block-Online model matches offline morphological precision, achieving a Global WER of 38.73% and significantly lowering structural errors to an Eswitch/Eroot/Emorph of .53/.29/.35, while dropping deletions to under 2% by converting errors into substitutions. In the menstrual health domain adaptation task, fine-tuning on synthetic-to-real data drops the Eroot from 78 down to 22 and achieves a 27% WER.

| Model | Data | w | CER | Comm Voice WER | CS-WER (Eswitch/Eroot/Emorph) |
|---|---|---|---|---|---|
| Paraformer Offline (+ aug) | B+E+C | Full | 11.05 | 31.14 | .46 / .25 / .31 |
| Paraformer Streaming (600ms) | B+E+C | 600ms | 27.97 | 61.44 | .72 / .61 / .67 |
| Paraformer Streaming (+ aug) | B+E+C | 2.4s | 14.67 | 39.45 | .60 / .36 / .43 |
| Paraformer Streaming (+ aug) | B+E+C | 3s | 14.27 | 37.20 | .58 / .35 / .42 |
| Dynamic Block Paraformer (+ aug) | B+E+C | 3s | 15.62 | 38.73 | .53 / .29 / .35 |

## Limitations

The framework relies heavily on a high-performing VAD model to accurately segment audio at natural communicative pauses. The synthetic loanword injection corpus is limited to 750 high-frequency loanwords rather than exhaustive dialectal variations. The approach is evaluated primarily on Bangla-English code-switching, leaving open its generalization to other low-resource agglutinative language pairs.

## Why read this

Speech and ML researchers working on streaming ASR for low-resource agglutinative languages or code-switching will find this a blueprint for bypassing the structural plateau of causal attention. It demonstrates how to trade rigid fixed-window streaming for VAD-aligned dynamic latency blocks to preserve morphological integrity.

## Code

- https://github.com/Dynamic-ASR

## Applications

Real-time speech recognition for bilingual conversational agents, localized voice assistants, and medical transcription systems handling domain-specific code-switched terminology.

## Institutions / 機構

North South University, Apurba Technologies

## Related

- (link related pages by id as the wiki grows)
