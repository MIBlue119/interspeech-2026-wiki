---
id: xiao26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2215
pdf: https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.pdf
---

# Continual Adaptation for Pacific Indigenous Speech Recognition

*Yang Xiao, Aso Mahmudi, Nick Thieberger, Eliathamby Ambikairajah, Eun-Jung Holden, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2215)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper investigates speech foundation model adaptation for low-resource Pacific Indigenous languages, discovering that their linguistic distance induces severe internal representational drift and catastrophic forgetting. It evaluates full fine-tuning and parameter-efficient methods (LoRA, DoRA, O-LoRA) across cross-lingual and sequential learning setups, exposing an unresolved plasticity-stability dilemma.

## Key contributions

- Introduces a newly curated 32.13-hour speech corpus across three Pacific Indigenous languages (Bislama, Nafsan, and Lelepa).
- Quantifies layer-wise representational drift using cosine distance of hidden states, showing that typologically distant languages like Lelepa force profound structural reorganization in early encoder layers.
- Exposes a strict plasticity-stability trade-off where full fine-tuning retains historical knowledge better in sequential learning, whereas parameter-efficient methods (LoRA/DoRA/O-LoRA) excel at immediate target adaptation but suffer from severe catastrophic forgetting.
- Compares component-specific adaptation strategies (encoder-only vs. decoder-only vs. joint updates) to isolate the exact sources of knowledge degradation.

## Problem

Speech foundation models (SFMs) like Whisper are often assumed to possess universally adaptable, language-agnostic representations. However, this assumption has been validated almost exclusively on high-resource languages that are typologically well-documented. Pacific Indigenous languages are not only extremely low-resource but also distributionally and structurally distant from pretraining corpora, possessing unique phonological and prosodic systems. Adapting SFMs to these languages risks triggering large-scale representational drift and catastrophic forgetting, yet prior works treat adaptation as a black-box optimization problem without examining internal representational dynamics.

## Method

The study uses the Whisper-Small architecture (12 encoder and 12 decoder layers) as the base speech foundation model, fine-tuning it with AdamW at a peak learning rate of 1e-4, batch size of 16, linear warm-up for 500 steps, and a cosine decay schedule. Audio is resampled to 16 kHz mono. Vocabulary is extended with characters observed in Bislama, Nafsan, and Lelepa transcripts, initializing new token embeddings with the average of the pretrained vocabulary. Cross-lingual transfer is evaluated by fine-tuning with progressively increasing data budgets (0.5 to 10 hours) using either full fine-tuning (244M parameters) or parameter-efficient Low-Rank Adaptation (LoRA, updating ~20.1M parameters across encoder and decoder). 

Representational drift is measured by extracting hidden states across all 12 encoder and decoder layers on a balanced evaluation set and computing the layer-wise cosine distance before and after adaptation, followed by min-max normalization per language. For sequential continual learning, models are trained on Nafsan followed by Lelepa, testing both standard LoRA and regularized variants including Weight-Decomposed LoRA (DoRA) and Orthogonal LoRA (O-LoRA). Architectural ablation experiments isolate updates to encoder-only, decoder-only, or joint configurations to evaluate source language retention (measured via English LibriSpeech WER) versus target acquisition.

## Experimental setup

Evaluated on a newly introduced Pacific Indigenous Speech Corpus comprising 23,843 audio samples totaling 32.13 hours across Bislama (13.75 hrs), Nafsan (14.83 hrs), and Lelepa (3.55 hrs). Each language is split into 80% train, 10% validation, and 10% test (stratified by speaker). Performance is measured using Character Error Rate (CER) and Word Error Rate (WER) on held-out test sets, alongside cross-lingual evaluations on English LibriSpeech, Chinese, and French test sets. Models are trained over three random seeds per configuration.

## Results

For Bislama with 10 hours of data, full fine-tuning achieves a test WER of 19.64. For Nafsan at 10 hours, full fine-tuning yields a WER of 47.84. In extreme low-resource conditions like Lelepa (2.0 hours), LoRA outperforms full fine-tuning, achieving a WER of 75.66 compared to 84.10 for full fine-tuning, demonstrating that parameter-efficient methods prevent overfitting on highly divergent data. In sequential continual learning (Nafsan to Lelepa), full fine-tuning maintains a lower average WER (64.70%) due to better historical retention of Nafsan (45.67% error after Lelepa training), whereas LoRA, DoRA, and O-LoRA yield higher average WERs (76.52% to 78.25%) because their Nafsan error rates jump to over 84% after learning Lelepa.

| System | Training Stage | Nafsan Test WER (%) | Lelepa Test WER (%) | Avg. WER (%) |
|---|---|---|---|---|
| Full FT | After Nafsan <br> After Lelepa | 47.02 <br> 45.67 | N/A <br> 83.72 | 64.70 |
| LoRA | After Nafsan <br> After Lelepa | 53.23 <br> 84.42 | N/A <br> 68.62 | 76.52 |
| DoRA | After Nafsan <br> After Lelepa | 53.57 <br> 84.80 | N/A <br> 70.82 | 77.81 |
| O-LoRA | After Nafsan <br> After Lelepa | 53.47 <br> 87.42 | N/A <br> 69.08 | 78.25 |

## Limitations

The study is restricted to Whisper-Small and three Pacific Indigenous languages totaling roughly 32 hours of data, leaving scale-up to larger model sizes and broader language families unverified. Sequential learning experiments evaluate only a two-step language sequence (Nafsan to Lelepa) rather than longer task streams. Additionally, the paper evaluates text error rates without analyzing specific phonological confusions or acoustic mismatch factors.

## Why read this

Researchers and engineers working on speech foundation model adaptation for underrepresented or linguistically distant languages should read this to understand the internal mechanics of representational drift and the inherent limitations of standard parameter-efficient fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of robust speech recognition interfaces for endangered, low-resource, and Indigenous Pacific languages in education and public services.

## Institutions / 機構

University of Melbourne, UNSW Sydney

## Related

- (link related pages by id as the wiki grows)
