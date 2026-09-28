---
id: rafat26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3334
pdf: https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf
---

# Dynamic Block-Online Streaming ASR for Low-Resource Agglutinative Code-Switching Speech with Morphology-Aware Evaluation

*Kazi Rafat, Afifa Imran, Md. Ismail Hossain, Md. Romzan Ali, Fuad Rahman, Sifat Momen, Shafin Rahman, Nabeel Mohammed*

[PDF](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rafat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3334)

**TL;DR** — This paper introduces a Dynamic Block-Online streaming ASR framework for low-resource, agglutinative intra-sentential Bangla-English code-switching, achieving an Eroot of 0.29 and Emorph of 0.35 via VAD-aligned global attention and script-anchored loanword injection.

## Key contributions

- Dynamic Block-Online Processing: A VAD-triggered streaming strategy utilizing offline global attention models to resolve agglutinative code-switching dependencies.
- Script-Anchored Loanword Injection: A synthetic augmentation technique embedding 750 high-frequency English loanwords into colloquial monolingual corpora to model phonotactic transitions.
- CS-WER Metric: A fine-grained evaluation framework decomposing error rates across switch points, embedded English roots, and agglutinative suffixes.
- Domain Generalization: Successful zero-shot and fine-tuned adaptation to specialized, high-perplexity menstrual and menopausal health domains.

## Problem

Low-resource agglutinative languages like colloquial Bengali frequently incorporate English loanwords (code-switching) and complex pre-base vowel/suffix orderings, creating severe challenges for low-latency ASR. Standard causal streaming models rely on fixed-size lookahead windows and causal masks that arbitrarily truncate morphemic suffixes and fail to handle long-range morphological dependencies or abrupt language switches. This causes alignment drift, structural deletion errors, and semantic degradation that breaks downstream natural language understanding pipelines.

## Method

The architecture is built on a Non-Autoregressive (NAR) Paraformer backbone featuring a SAN-M (Self-Attention Network with Memory) encoder and a Continuous Integrate-and-Fire (CIF) predictor that emits attention weights to integrate acoustic embeddings into target token representations. While standard streaming uses causal-masked unidirectional attention (limiting context windows to 2.4s-3.0s), the proposed Dynamic Block-Online paradigm deploys a Voice Activity Detection (VAD) model to strip audio at natural communicative pauses (>200ms) up to a 3-second macro-block limit. Within each dynamic block, the system employs an unmasked offline encoder trained with global bidirectional attention, allowing hindsight resolution where the model re-evaluates early frames (roots) in light of later frames (suffixes). To tackle data scarcity, Script-Anchored Loanword Injection maps 750 high-frequency English semantic equivalents into a 750-hour composite monolingual Bengali corpus (Common Voice, OpenSLR 53, IndicVoices, KathBath) plus 250h of English Gigaspeech, yielding roughly 20% synthetic intra-sentential code-switched training instances without disrupting syntactic structures.

## Experimental setup

Evaluated on a 750-hour composite Bangla corpus plus 250h English Gigaspeech for training, tested on a conversational Common Voice CS test set and a specialized menstrual health dataset. Baselines include offline Whisper (Large-v2/v3), MBNSpeech, MMS, and a standard causal Paraformer streaming model with chunk-masked attention evaluated across 600ms, 800ms, 2s, 2.4s, and 3s windows. Metrics include Character Error Rate (CER), Word Error Rate (WER), and Fine-Grained CS-WER (Eswitch/Eroot/Emorph).

## Results

On the conversational test set, the standard causal streaming model saturates at a morphological error rate (Emorph) of 0.42 and loanword root error (Eroot) of 0.35, whereas the proposed Dynamic Block Paraformer achieves an Eroot of 0.29 and Emorph of 0.35, matching the precision of offline models (Eroot 0.29, Emorph 0.36) while maintaining a global WER of 38.73%. Error topology analysis demonstrates that the Dynamic Block model successfully shifts error distributions away from fatal structural deletions (<2%) toward phonetic substitutions. For domain adaptation on menstrual health, fine-tuning the block-online model on a synthetic TTS-generated corpus drops Eroot from 78 down to 22 and WER to 27%.

| System | w | CER | Comm. WER | CS-WER (E_switch / E_root / E_morph) |
|---|---|---|---|---|
| Whisper Large-v3 | Full | - | 40.30 | 0.94 / 0.96 / 0.97 |
| MBNSpeech | Full | 11.44 | 42.30 | 1.00 / 1.00 / 1.00 |
| Paraformer Offline (+ aug) | Full | 11.05 | 31.14 | 0.46 / 0.25 / 0.31 |
| Paraformer Streaming (+ aug) | 2.4s | 14.67 | 39.45 | 0.60 / 0.36 / 0.43 |
| Paraformer Streaming (+ aug) | 3s | 14.27 | 37.20 | 0.58 / 0.35 / 0.42 |
| Dynamic Block Paraformer (+ aug) | 3s | 15.62 | 38.73 | 0.53 / 0.29 / 0.35 |

## Limitations

The framework's primary operational limitation is its dependency on a robust VAD model to accurately segment audio at natural communicative pauses. The synthetic data augmentation relies on a curated set of 750 common loanwords rather than an exhaustive dictionary of all possible loanwords. Furthermore, the approach requires significant compute and training hours to adapt streaming checkpoints onto pretrained offline models.

## Why read this

Speech and ML researchers working on low-resource, morphologically complex, or code-switched audio should read this to understand how flexible, VAD-driven latency budgets can overcome the structural performance plateaus of strict causal streaming architectures.

## Code

- https://github.com/apurbatech/Dynamic-ASR

## Applications

Real-time speech recognition for bilingual conversational assistants, automated voice transcription in low-resource code-switched markets, and front-end acoustic processing for domain-specific small language models in specialized healthcare settings.

## Related

- (link related pages by id as the wiki grows)
