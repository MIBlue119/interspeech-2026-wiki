---
id: ma26d_interspeech
category: asr
labels: [multilingual, self-supervised]
institutions: ["Sogang University", "LOTTE INNOVATE"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2309
pdf: https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.pdf
---

# Retention-Preserving Gradient Projection with Entropy-Guided Token-Level Distillation for Rehearsal-Free Continual ASR

*Seunghee Ma, Junseok Oh, Ji-Hwan Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2309)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A strict rehearsal-free continual learning method for encoder-decoder ASR models (Whisper) that uses entropy-guided token-level distillation and retention-preserving gradient projection, achieving a 7.2% relative reduction in mean WER and a 51.5% reduction in multilingual degradation compared to Learning without Forgetting (LwF).

## Key contributions

- Freezing the encoder and adapting only the decoder based on a diagonal Fisher information analysis showing decoder parameters are significantly more sensitive (1.73x on LibriSpeech, 1.79x on AMI).
- Introducing entropy-guided token-level distillation to scale down distillation targets at positions with high teacher uncertainty (using normalized Shannon entropy).
- Formulating a retention-preserving gradient projection mechanism that modifies the supervised update only when it conflicts with the distillation retention direction (cos < 0), governed by a tunable projection coefficient η.
- Demonstrating superior backward transfer and minimal multilingual performance degradation on Common Voice across sequential domain adaptation on four English corpora.

## Problem

Large-scale pretrained ASR models like Whisper generalize well but suffer catastrophic forgetting when sequentially adapted to new domains. Standard rehearsal-free techniques like Learning without Forgetting (LwF) use a uniform distillation loss that treats all teacher predictions equally, which fails because high-uncertainty teacher outputs introduce noise. Furthermore, supervised and distillation gradients frequently conflict; combining them directly without explicit geometric handling compromises knowledge retention. Developing a method that prevents forgetting without storing past data buffers or parameter-importance matrices is crucial for practical, privacy-preserving deployments.

## Method

The framework leverages the frozen previous model state as a teacher and isolates parameter updates to the decoder. For token-level retention, Shannon entropy is calculated over the teacher vocabulary distribution at temperature 1, normalized by log V, and converted into a token distillation weight λ_t using a scaling hyperparameter α, bounded by [λ_min, λ_max]. The token-weighted distillation loss is computed via KL divergence with temperature T = 1.5: L_distill = T^2 sum_t λ_t KL(q_t || p_t).

To resolve gradient competition between cross-entropy (g_CE) and distillation (g_distill), the method treats g_distill as an explicit retention direction. When g_CE and g_distill conflict (cos(g_CE, g_distill) < 0), g_CE is projected to attenuate its opposing component: g_CE' = g_CE - η * ((g_CE . g_distill) / ||g_distill||^2) * g_distill, where η is a tunable projection coefficient set to 0.75. When no conflict occurs (cos >= 0), g_CE' = g_CE. The final combined update is g_final = g_CE' + g_distill. This selectively dampens updates pulling away from prior knowledge without requiring episodic memory or replay data.

## Experimental setup

Experiments use Whisper Large-v3 as the base model, sequentially adapted across four English domains in the order LibriSpeech (LIB, train-other-500: 496.9h), AMI Corpus (AMI: 80.4h), TED-LIUM 3 (TED: 453.8h), and SPGISpeech (SPG, subset S: 196.2h). Baselines include Full Fine-Tuning (FT full), Decoder-only Fine-Tuning (FT dec.), L^2-SP decoder-only (α=0.003), and LwF decoder-only (λ=0.3), plus rehearsal-based ER and GEM using a 1-hour TED replay buffer. Training uses AdamW with a learning rate of 1e-5, batch size 64, and 5 epochs per domain, with hyperparameters T=1.5, λ_min=0.1, λ_max=0.3, α=1.0, and η=0.75.

## Results

After sequential adaptation across all four domains (LIB -> AMI -> TED -> SPG), the proposed method attains a final average WER of 8.12%, compared to 9.66% for FT decoder-only, 8.91% for L^2-SP decoder-only, and 8.75% for LwF decoder-only, representing absolute reductions of 1.54% and 0.63% over FT dec and LwF (15.9% and 7.2% relative). Backward transfer (BWT) improves to -2.82 compared to -4.63 for LwF. Against rehearsal-based baselines equipped with a 1-hour buffer (GEM and ER at 8.93% and 8.90% avg WER), the rehearsal-free proposed method achieves a lower average WER (8.12%) without storing past data. In multilingual evaluations on Common Voice (Spanish, French, Korean, English), the method limits average degradation to an absolute increase of 0.95%, achieving a 51.5% relative reduction over LwF (1.96%) and an 86.9% reduction over FT decoder-only (7.25%). Component ablations reveal that gradient projection drives retention and generalization gains (improving LIB retention from 4.27% to 4.11% on LIB->AMI), while entropy-guided weighting recovers target domain adaptation performance dropped by strict projection (recovering AMI WER from 13.20% back to 12.96%).

| System/Condition | LIB Avg WER (%) | AMI Avg WER (%) | TED Avg WER (%) | SPG Avg WER (%) | Final Avg WER (%) |
|---|---|---|---|---|---|
| FT full | 3.76 | 9.13 | 4.12 | 6.19 | 10.14 |
| FT dec. | 3.92 | 10.09 | 3.89 | 6.28 | 9.66 |
| L^2-SP dec. | 3.82 | 9.72 | 3.67 | 6.32 | 8.91 |
| LwF dec. | 3.98 | 10.77 | 3.77 | 6.13 | 8.75 |
| Ours (η=0.75) | 4.83 | 19.41 | 5.37 | 2.87 | 8.12 |

## Limitations

The evaluation is restricted to English domain adaptation sequences and specific language pairs in multilingual Common Voice, omitting broader zero-shot evaluations across dozens of low-resource languages. The framework assumes access to the previous model's full parameter state, which can still represent significant memory overhead for extreme-scale models. Furthermore, tuning the projection coefficient η requires balancing domain-specific adaptation speed against long-term historical retention, which may be sensitive to domain dissimilarity.

## Why read this

Speech and machine learning researchers working on continual learning or domain adaptation for large-scale encoder-decoder speech models will find a practical, memory-efficient blueprint that avoids replay buffers entirely. Readers will learn how to geometrically resolve gradient conflicts and token-level uncertainty for robust knowledge retention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Incremental on-device deployment of automatic speech recognition models for streaming conversational apps, custom enterprise terminology adaptation, and multilingual voice assistants.

## Institutions / 機構

Sogang University, LOTTE INNOVATE

**Funding / 經費:** National Research Foundation of Korea

## Related

- [Unified Gradient Projection: Language-Balanced Continual Learning for Multilingual Low-Resource ASR](ren26g_interspeech.md) — same problem · relatedness 2.7/3
- [Parameter-Efficient Continual Learning for Automatic Speech Recognition](eeckt26_interspeech.md) — same problem · relatedness 2.7/3
- [SCOLoRA: Similarity Conditioned Signed Orthogonal LoRA for Continual Speaker Adaptation](ko26b_interspeech.md) — same problem · relatedness 2.3/3
- [Learning to Hear Hesitation: Continual Learning for Disfluency-Aware ASR](kordt26_interspeech.md) — same problem · relatedness 2.2/3
- [Avoiding Catastrophic Forgetting in Text-Only Adaptation of LLM-based ASR via Multi-View Text Denoising](burdisso26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
