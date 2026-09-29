---
id: papi26_interspeech
category: asr
institutions: ["Fondazione Bruno Kessler"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-40
pdf: https://www.isca-archive.org/interspeech_2026/papi26_interspeech.pdf
---

# Cross-Attention is Half Explanation in Speech-to-Text Models

*Sara Papi, Dennis Fucci, Marco Gaido, Matteo Negri, Luisa Bentivogli*

[PDF](https://www.isca-archive.org/interspeech_2026/papi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/papi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-40)

**Category:** `asr`

**TL;DR** — This paper presents the first systematic evaluation of cross-attention as an explanatory proxy for speech-to-text (S2T) models, comparing attention scores against input and encoder saliency maps. The analysis reveals that cross-attention captures only ~50% of input relevance and up to 52-75% of encoder output saliency, demonstrating that it is an incomplete explanation tool.

## Key contributions

- Conducted the first rigorous, large-scale empirical assessment of cross-attention as an explanatory proxy for S2T models across monolingual, multilingual, and multitask settings.
- Quantified the impact of context mixing by comparing cross-attention against both raw input saliency maps (via SPES) and encoder-output saliency maps.
- Demonstrated that aggregating cross-attention across attention heads and decoder layers significantly improves alignment with true feature attribution, though intrinsic limitations remain.
- Evaluated and released fully open-science models (trained on transparent data up to 150k hours) and reproducible evaluation scripts to prevent data contamination.

## Problem

Cross-attention scores in encoder-decoder speech-to-text models are widely exploited for downstream applications like timestamp estimation, audio-text alignment, and simultaneous decoding under the unverified assumption that they faithfully indicate input-output dependencies. However, this assumption has never been formally tested in the speech domain, where context mixing can obscure relationships between attention weights and the raw audio signal. Understanding whether cross-attention can serve as a lightweight, reliable substitute for expensive feature-attribution methods is critical for the trustworthy deployment of S2T systems.

## Method

The authors analyze three Conformer-Transformer S2T models: a 125M parameter monolingual English ASR base model (12 encoder / 6 decoder layers, 8 heads, 512 hidden dim, 2,048 FFN dim), a 474M parameter small FAMA model, and an 878M parameter large FAMA model (24 encoder / 12 decoder layers, 16 heads, 1024 hidden dim, 4096 FFN dim). Models use 80-channel mel-filterbank features extracted every 10ms with a 25ms window, undergoing a 4x convolutional subsampling factor. Training uses a multi-task loss combination of label-smoothed cross-entropy and intermediate/final CTC losses.

To evaluate explanation fidelity, cross-attention (CA) matrices are extracted from decoder layers and heads and compared against two saliency references computed using SPES (Morphological Fragmental Perturbation Pyramid with SLIC clustering, 20,000 KL-divergence perturbation iterations): input saliency maps (SM^X) and encoder-output saliency maps (SM^H). Various aggregation functions (2D avg, 1D max + 1D avg, 2D max pooling) are tested to match granularities, with 2D max pooling chosen due to its superior preservation of localized spectral resonance bands. Pearson correlation coefficients are computed across flattened token-time matrices after mean-variance normalization to assess alignment.

## Experimental setup

Experiments utilized ~3k hours of English speech data from IWSLT 2024 (CommonVoice, CoVoST v2, Europarl-ST, LibriSpeech, MuST-C, TEDLIUM, VoxPopuli) for the base model, and over 150k hours of open-source English and Italian audio (CommonVoice, CoVoST v2, FLEURS, MOSEL, MLS, YouTube-Commons) for the FAMA models. Evaluation is performed on the EuroParl-ST test set (6 hours of Italian ASR/translation, 3 hours of English ASR/translation). Metrics include Word Error Rate (WER) via Whisper normalizer, COMET (v2.2.4) for translation, and deletion/size scores for explanation faithfulness using a single NVIDIA A40 (40GB) GPU.

## Results

Head-wise cross-attention yields weak and noisy correlations with saliency maps, but averaging across attention heads and decoder layers substantially boosts alignment, with the final decoder layers exhibiting the highest correlation (peaking at rho = 0.588 for the base model). Multilingual and multitask large models achieve the highest input-relevance correlation on English ASR (rho up to 0.639), while Italian and speech translation tasks show lower alignment due to data imbalance and task complexity.

Disentangling context mixing by comparing cross-attention to encoder-output saliency (SM^H) increases correlation scores by 0.03 to 0.18 absolute points, proving that encoder transformation obscures part of the input signal. Nonetheless, even free of context mixing, cross-attention accounts for at best 52-75% of encoder saliency and severely lags behind true attribution methods on deletion metrics (e.g., base model CA deletion score of 41.2 vs. 91.3 for full resolution SPES).

| System / Condition | ASR WER (en) | ASR WER (it) | ST COMET (en-it) | Input Correlation (rho) |
|---|---|---|---|---|
| Base Model (125M) | 9.5 | - | - | 0.588 |
| Small Model (474M) | 11.7 | 22.3 | 0.854 | 0.633 |
| Large Model (878M) | 11.1 | 21.7 | 0.862 | 0.621 |

## Limitations

The evaluation scope is restricted solely to ASR and speech translation, omitting other S2T tasks such as spoken QA or summarization. The multilingual analysis is limited to English and Italian due to the high computational costs of training foundation models from scratch. Furthermore, the study examines standard speech foundation models rather than modern Speech-LLMs, and relies on SPES as a silver-standard proxy reference for saliency.

## Why read this

Speech and ML researchers relying on cross-attention for alignment, timestamp extraction, or model interpretability should read this paper to understand the fundamental ceiling and limitations of attention maps. It provides actionable evidence that cross-attention should be treated strictly as an auxiliary signal rather than a faithful stand-alone explanation tool.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the robustness of attention-based timestamp prediction, guiding simultaneous speech recognition and translation architectures, and developing attention-regularized training objectives for speech models.

## Institutions / 機構

Fondazione Bruno Kessler

**Funding / 經費:** European Union

## Related

- [Listening with Attention: Entropy-Guided Explainability for Transformer-Based Audio Models](kumar26_interspeech.md) — same problem · relatedness 2.5/3
- [How Do Instructions Shape Speech? Cross-Attention Attribution for Style-Captioned Text-to-Speech](mathur26_interspeech.md) — shared technique · relatedness 1.9/3
- [From Dispersion to Attraction: Spectral Dynamics of Hallucination Across Whisper Model Scales](viakhirev26_interspeech.md) — same problem · relatedness 1.9/3
- [A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models](kulkarni26_interspeech.md) — shared technique · relatedness 1.8/3
- [Dr. SHAP-AV: Decoding Relative Modality Contributions via Shapley Attribution in Audio-Visual Speech Recognition](cappellazzo26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
