---
id: zhang26s_interspeech
category: asr
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1228
pdf: https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.pdf
---

# DASR-CPO: Reference-Free Contrastive Preference Optimization for Correcting Mandarin Semantic Drift in Low-Resource Chinese Dialect ASR

*Tao Zhang, haiyang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1228)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — DASR-CPO is a reference-free contrastive preference optimization method that corrects Mandarin semantic drift in low-resource Chinese dialect ASR by penalizing mined Mandarin homophone confusions on local spans. On 4.53 hours of Sichuanese data, it reduces CER from 24.85% to 22.58% and increases dialect-entity F1 from 72.82 to 74.15 with zero inference-time overhead.

## Key contributions

- Identifies and formalizes Mandarin Semantic Drift as a local ranking error where a Mandarin-dominant pretraining prior substitutes dialect lexical items with frequent homophones.
- Proposes DASR-CPO, combining offline data-driven confusion mining with a reference-free, span-level contrastive preference optimization objective and hard-negative pooling.
- Introduces full-sequence dynamic matching to robustly localize multi-character dialect spans under BPE tokenization without modifying inference decoding.
- Achieves consistent gains over standard LoRA supervised fine-tuning and context-bias loss-reweighting baselines with zero inference latency overhead.

## Problem

Pretrained ASR models like Whisper-Large-v3 degrade on low-resource Chinese dialects because their Mandarin-dominant pretraining distribution favors frequent homophones over dialect words. This causes 'Mandarin Semantic Drift', where phonetically plausible but semantically wrong Mandarin forms replace dialect entities and critical spans (e.g., decoding '巴适' as '巴士'). Standard supervised fine-tuning (SFT) and parameter-efficient methods like LoRA optimize the gold reference likelihood but fail to explicitly penalize these strong Mandarin-biased competing hypotheses. This matters because entity-level errors ruin downstream semantic fidelity even when overall character error rates are moderately reduced.

## Method

DASR-CPO proceeds in two phases: offline confusion mining and span-level contrastive preference optimization. First, the framework mines Mandarin confusion candidates by decoding training utterances with a baseline model, aligning hypotheses with references, and retaining frequent substitutions with tone-stripped pinyin edit distance <= 2. Because BPE tokenization fragments multi-character words inconsistently, full-sequence dynamic matching maps string-level dialect terms back to tokenizer span indices (start token index and length). 

Starting from a supervised fine-tuned model (LoRA on query/value projections with rank r=32, alpha=64), DASR-CPO applies a single teacher-forced forward pass to compute counterfactual span scores for gold dialect spans and pooled hard-negative Mandarin confusions. It optimizes a mixed objective consisting of standard cross-entropy over the full sequence (L_SFT) and a span-level reference-free CPO loss (L_CPO) controlled by a temperature parameter beta=0.5 and loss weight lambda=1.0. This explicitly enlarges the margin between the gold dialect span and its strongest Mandarin competitor locally without requiring a frozen reference model or test-time rescoring.

## Experimental setup

Evaluated on the MagicData Sichuanese corpus (ASR-CSICHDIACSC) containing 4.53 hours of transcribed dyadic conversations, split 0.8:0.1:0.1 into train (3.62h), dev (0.45h), and test (0.45h). Baselines include zero-shot Whisper-Large-v3, Pure LoRA (SFT for 3 epochs), and Context Bias (loss reweighting with gamma in {1.5, 5.0}). Metrics include Character Error Rate (CER), Dialect Recall, Entity F1, and False Positives (FP). Implemented on Whisper-Large-v3 (1.55B parameters) using 8-bit loading, gradient checkpointing, AdamW (LR 1x10^-3 for SFT, 1x10^-6 for CPO), per-device batch size 8, gradient accumulation 2, mixed precision (fp16), and dropout 0.09.

## Results

DASR-CPO achieves a CER of 22.58%, improving over Pure LoRA (24.85%) by 2.27 absolute and beating the Context Bias baseline (23.40%). On entity metrics, it raises Dialect Recall from 66.39 to 67.94 (+1.55) and Entity F1 from 72.82 to 74.15 (+1.33), while reducing false-positive dialect mentions from 39 to 32 (-7). The primary limitation is that overall CER reductions appear modest due to dialect entities constituting a small fraction of total characters, though semantic intent and keyword fidelity are substantially improved.

| Model | CER (%) | Recall | F1 | FP |
|---|---|---|---|---|
| Zero-shot Whisper | 59.07 | - | - | - |
| Pure LoRA (SFT) | 24.85 | 66.39 | 72.82 | 39 |
| Context Bias (loss reweight) | 23.40 | 65.55 | 72.63 | 39 |
| DASR-CPO (ours) | 22.58 | 67.94 | 74.15 | 32 |

## Limitations

The dataset is small (4.53 hours) with speaker overlap between splits due to limited sessions, potentially overestimating generalization to unseen speakers. The approach relies on offline mined confusion pairs and a lexicon extracted from training data, making performance sensitive to lexicon coverage. Additionally, the method requires careful hyperparameter tuning of preference strength to maintain calibration in ultra-low-resource settings.

## Why read this

Speech and ML researchers tackling low-resource adaptation or catastrophic forgetting of domain priors in large audio foundation models should read this to see how reference-free preference optimization can directly target semantic drift with zero inference overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource speech recognition, regional dialect transcription, and entity-critical voice-controlled assistants.

## Institutions / 機構

Beijing University of Posts and Telecommunications

## Related

- (link related pages by id as the wiki grows)
