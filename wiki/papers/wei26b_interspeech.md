---
id: wei26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-77
pdf: https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.pdf
---

# Speaker Identity in Non-Verbal Vocalizations: Conditional Distillation and Mixture of Experts Approach

*Tzu-Chieh Wei, Yi-Cheng Lin, Huang-Cheng Chou, Kuan-Yu Chen, Hsin-Yen Sung, Shrikanth Narayanan, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-77)

**TL;DR** — This paper presents the first systematic evaluation of speaker verification (SV) across 10 non-verbal vocalization (NVV) types, introducing an inter-layer residual Mixture of Experts (IR-MoE) framework with conditional distillation to bridge the speech-NVV domain gap while preventing catastrophic forgetting. The proposed model reduces speech-NVV EER from 38.93% to 22.66% and improves speech verification EER from 13.17% to 9.24%.

## Key contributions

- First systematic evaluation of modern SV systems across a diverse taxonomy of 10 non-verbal vocalization types (e.g., laughter, breathing, coughing).
- Proposed an Inter-Layer Residual Mixture of Experts (IR-MoE) module with learned domain-aware routing to separate processing paths for modal speech and non-verbal vocalizations.
- Designed a novel conditional knowledge distillation loss using a frozen WavLM-based teacher to retain speech-to-speech verification accuracy without restricting NVV adaptation.
- Integrated a supervised contrastive loss operating on cross-domain speech-NVV positive pairs to force a unified speaker identity manifold.

## Problem

Modern text-to-speech (TTS) and voice conversion (VC) systems increasingly generate non-verbal vocalizations (NVVs) like laughter, coughing, and breathing, requiring objective speaker verification across both modal speech and NVVs. However, standard SV frameworks relying on self-supervised learning front-ends (such as WavLM or HuBERT) and discriminative backends (like ECAPA-TDNN) assume phonemically structured speech and fail when handling non-phonemic, acoustically diverse NVVs. Naively fine-tuning these models on NVV data bridges the domain gap but induces catastrophic forgetting, severely degrading modal speech verification performance.

## Method

The architecture combines a frozen Data2Vec self-supervised front-end with an ECAPA-TDNN speaker embedding backend featuring 1024 convolutional channels and producing 192-dimensional embeddings. To separate feature extraction pathways, the authors introduce Mixture of Experts (MoE) modules, specifically testing PostFusion MoE and Inter-Layer Residual MoE (IR-MoE) where trainable MoE adapters with 4 experts and top-k=2 routing are inserted after each transformer block.

The training objective combines four distinct loss functions: standard AAM-softmax loss (L_Spk, with margin=0.2, scale=32), event-guided MoE routing constraints (L_MoE) consisting of batch load balancing, KL divergence against EMA routing prototypes for intra-event consistency, and cosine-margin loss for inter-event separation; a conditional knowledge distillation loss (L_Dist) applying cosine distance computed exclusively on speech utterances against a frozen wavlm-base-plus-sv teacher; and a supervised contrastive domain-bridging loss (L_SupCon, temperature=0.07) prioritizing cross-domain positive pairs (same speaker, speech-to-NVV) within speaker-balanced batches of 128.

The framework is optimized using Adam with weight decay 1e-4, starting with a base learning rate of 5e-3 decaying via cosine annealing to 1e-4. A progressive training schedule is utilized, beginning with a warm-up phase using only L_Spk, introducing MoE routing with high load balancing, and finally scaling up event regularization.

## Experimental setup

Evaluated on the NonverbalTTS dataset comprising 17 hours of audio (1,314 training speakers, 46 validation, 147 test) spanning 10 NVV categories, resulting in evaluation trials of 18,043 NvS (NVV vs. Speech), 18,398 NvN, and 10,764 SvS (Speech vs. Speech) pairs. Compared against seven baseline systems sharing the ECAPA-TDNN backend, including conventional Fbank features, single-SSL front-ends (WavLM, Data2Vec, Voc2Vec), and dual-SSL fusion configurations. Models are evaluated using Equal Error Rate (EER) and minimum normalized detection cost function (minDCF at P_target=0.05).

## Results

The zero-shot wavlm-base-plus-sv baseline achieves an EER of 5.60% on modal speech (SvS) but fails drastically on NVV-to-Speech (NvS) with an EER of 38.93%. Fine-tuning a baseline with standard losses and contrastive objectives suffers from a severe transfer dilemma, yielding a poor SvS EER of 13.17%. Incorporating the proposed conditional knowledge distillation loss successfully recovers speech verification performance, dropping SvS EER to 9.24% while achieving an NvS EER of 22.66% and NvN EER of 27.52% with the 4-expert IR-MoE architecture. Ablations confirm that increasing IR-MoE capacity beyond 4 experts slightly degrades NvS performance (23.05%) due to data scarcity per expert, though SvS EER continues to improve down to 8.96%.

| System | NvS EER (%) | NvN EER (%) | SvS EER (%) |
|---|---|---|---|
| Zero-shot wavlm-base-plus-sv | 38.93 | 39.13 | 5.60 |
| Data2Vec + ECAPA-TDNN | 23.33 | 27.98 | 10.76 |
| IR-MoE (w/o Distillation) | 24.95 | 29.61 | 13.17 |
| MoE-1 (PostFusion, 4 experts) | 23.95 | 28.38 | 9.00 |
| MoE-2 (IR-MoE, 4 experts) | 22.66 | 27.52 | 9.24 |

## Limitations

The study is bounded by the relatively small scale of the NonverbalTTS dataset (17 hours), which restricts the capacity and scaling limits of multi-expert routing, particularly for rare NVV classes like sneezes (9 samples) and snores (11 samples). Furthermore, fine-tuned models still underperform relative to the zero-shot WavLM baseline on pure modal speech (SvS EER 9.24% vs 5.60%), indicating a persistent gap caused by domain-specific fine-tuning on smaller corpora compared to massive speech datasets like VoxCeleb2.

## Why read this

Speech engineers and researchers building expressive text-to-speech or voice conversion systems should read this to learn how to implement robust multi-domain speaker verification across non-verbal vocalizations without suffering catastrophic forgetting on modal speech.

## Code

- https://github.com/wiizzz/nonverbal-sv

## Applications

Objective automated evaluation of speaker identity consistency in expressive text-to-speech and voice conversion systems that generate non-verbal vocalizations.

## Related

- (link related pages by id as the wiki grows)
