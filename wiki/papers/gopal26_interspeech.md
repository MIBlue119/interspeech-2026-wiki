---
id: gopal26_interspeech
category: speech-llm-dialogue
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2446
pdf: https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.pdf
---

# Language-Aware Distillation for Multilingual Instruction-Following Speech LLMs with ASR-Only Supervision

*Shreyas Gopal, Donghang Wu, Ashutosh Anshul, Yeo Yue Heng, Yizhou Peng, Haoyang Li, Hexin Liu, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2446)

**Category:** `speech-llm-dialogue` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A language-aware context distillation framework for multilingual speech LLMs uses a query bank and a gating network to eliminate language interference, outperforming matched multilingual baselines by 14% on instruction following while keeping the speech encoder and LLM frozen.

## Key contributions

- Proposes a language-aware distillation method with a query bank and gating network that prevents language interference in shared multi-lingual projectors.
- Introduces hard and soft query selection mechanisms utilizing a straight-through estimator to route speech tokens to language-specific query sequences.
- Releases Audio-MLQA, a novel high-quality multilingual spoken question-answering benchmark built on MLQA across 5 languages.
- Achieves competitive performance using only 5.8K hours of ASR-only training data without task-specific SFT or unfreezing backbone weights.

## Problem

Scaling existing distillation-based Speech LLMs to multilingual settings causes severe performance drops due to language interference within a single shared static query projector, where dominant training languages overshadow low-resource ones. Prior solutions either rely on massive task-specific SFT that triggers catastrophic forgetting, or require expensive multi-stage pretraining and extensive synthetic TTS datasets. This work addresses this by enabling robust multilingual speech understanding under low-resource ASR-only supervision without updating the backbone speech encoder or text LLM.

## Method

The model consists of a frozen Whisper-large-v3 speech encoder producing embeddings H ∈ R^{T x ds}, a frozen Llama-SEA-LION-v3-8B-IT text backbone providing embeddings Y, a Q-Former projector, and a query bank/gating network. The gating network G_phi processes H to output language logits g, which drive either soft query mixing or hard query selection from a query bank B = {Q^(k)} for k=1..K languages. Hard selection uses a straight-through estimator to keep inference discrete while permitting end-to-end gradient flow. Scheduled teacher forcing (cosine-annealed p_tf from 1 to 0 over the first 50% of steps) stabilizes early training by forcing ground-truth language selection.

The overall loss function combines cross-entropy language identification loss (L_LID), input distillation loss (L_IN) aligning the last T projected speech embeddings with the first T text embeddings via L2 distance, and output distillation loss (L_OUT) matching final hidden states of speech-conditioned versus text-conditioned LLM executions. The projector initializes query tokens from N(0, 0.02^2) and weights from the Whisper-large-v3 decoder, trained using AdamW with peak learning rate 5.6e-5, DeepSpeed ZeRO-2, and BF16 precision.

## Experimental setup

Trained on 5,870 hours of ASR data (4.33M samples) spanning English (1,750h CV21), Vietnamese (900h ViVoice), Indonesian (950h YODAS2), Chinese (755h MagicData + 100h CV24), Spanish (515h CV24), and German (900h CV24), filtering out audio with WER > 10%. Evaluated on open-ended instruction-following (AlpacaEval-zh, Audio-AlpacaEval, Audio-OpenHermes) and Audio-MLQA (250 items/language across 5 languages). Compared against cascaded Whisper + LLM, zero-shot end-to-end models (Glm-4-voice, MERaLiON-2-10B, SeaLLMs-Audio, Qwen2-Audio), and re-trained DiVA baselines. Evaluated using GPT-4.1 model-as-judge on a 0-5 scale, running on 4 NVIDIA H100 GPUs.

## Results

Hard-gating achieved an average open-ended instruction following score improvement of 14% over ML-DiVA, specifically boosting Indonesian performance from 3.04 to 3.71. On Audio-MLQA close-ended evaluation, the model scored an average of 3.96, outperforming SeaLLMs-Audio and Qwen2-Audio by 32% and 31% respectively, and coming close to the text-only reference upper bound of 4.14. Ablations showed that increasing static query length L from 64 to 256 reduced input distillation loss by 89% (8.63 to 0.97), and hard-gating consistently outperformed soft mixing by preventing dominant language averaging effects. The approach underperforms relative to specialized models primarily on Chinese (ZH), the most distant language from the primary training distribution.

| System | Audio-MLQA (Avg) | Audio-AlpacaEval (EN) | Audio-OpenHermes (ID) | Open-Ended Avg |
|---|---|---|---|---|
| Text-only Reference | 4.14 | 4.59 | 3.85 | 4.14 |
| Cascaded Whisper + LLM | 3.99 | 3.99 | 3.61 | 3.76 |
| ML-DiVA [12] (baseline) | 3.85 | 4.28 | 3.11 | 3.51 |
| Ours (soft-gating) | 3.88 | 4.58 | 3.58 | 3.95 |
| Ours (hard-gating) | 3.96 | 4.39 | 3.66 | 3.94 |

## Limitations

Evaluated on a constrained set of 6 languages, showing weaker adaptation to extremely distant language pairs like Chinese relative to related language clusters. Relies on ASR supervision quality and pre-filtered transcriptions with <10% WER, limiting direct applicability to extremely noisy or unannotated speech corpora. The approach requires language labels during scheduled teacher forcing in early training stages, which might restrict zero-shot application to entirely unlabelled corpora without a preliminary LID model.

## Why read this

Speech and ML researchers building multilingual or low-resource speech LLMs without massive SFT compute budgets should read this to learn how to combine query banks and hard gating for interference-free context distillation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual voice assistants, cross-lingual spoken question answering, and on-device conversational agents supporting low-resource regional languages.

## Institutions / 機構

Nanyang Technological University, AI Singapore, National University of Singapore, Institute for Infocomm Research, Agency for Science, Technology and Research

**Funding / 經費:** WeBank-NTU Joint Research Institute on FinTech

## Related

- (link related pages by id as the wiki grows)
