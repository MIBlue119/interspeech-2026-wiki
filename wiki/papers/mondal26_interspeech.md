---
id: mondal26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1133
pdf: https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.pdf
---

# Probing LoRA-to-LoRA Cross-Lingual Transfer for Unseen Low-Resource Conditions in Whisper-Based ASR

*Hirak Mondal, Spandan Dey, Gopal Agrawal*

[PDF](https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mondal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1133)

**TL;DR** — This paper investigates LoRA-to-LoRA cross-lingual transfer for low-resource ASR using Whisper, demonstrating that initializing a recipient LoRA from an orthographically and genealogically aligned donor yields up to 17% relative WER reduction over recipient-only adaptation.

## Key contributions

- Proposes a two-stage donor selection framework utilizing genealogical filtering followed by orthographic-distributional similarity (Jensen-Shannon divergence) over tokenizer vocabularies.
- Explores LoRA-to-LoRA transfer in an extreme low-resource regime where neither the donor nor the recipient languages are well-represented in the Whisper pre-training distribution.
- Achieves consistent relative WER reductions of 9% to 17% across multiple low-resource Indic language pairs (Hindi-Bhojpuri, Marathi-Konkani, Bengali-Assamese).
- Validates that donor-initialized adaptation provides a superior gradient optimization starting point compared to training recipient adapters from scratch or via recipient-only fine-tuning.

## Problem

The vast majority of the world's 7,000+ languages are low-resource with minimal transcribed speech data, excluding speakers from voice-driven digital services. While Whisper provides strong multilingual support, it exhibits near-saturated zero-shot error rates (WER around 100%+) on truly unseen low-resource languages. Full fine-tuning is computationally prohibitive and prone to catastrophic forgetting, while existing LoRA transfer methods focus exclusively on high-resource anchor languages already well-represented in pre-training data.

## Method

The study builds on Whisper-small (244M parameters) as the ASR backbone, mapping log-Mel spectrograms $\mathbf{X} \in \mathbb{R}^{T \times F}$ to latent acoustic representations $\mathbf{H} = \text{Enc}(\mathbf{X})$ and autoregressively generating output tokens via the decoder. To adapt the model to low-resource recipient languages $\ell_u$ without pre-training exposure, the authors introduce a two-stage donor selection strategy. First, candidate donors are restricted by genealogical relatedness to share phonological and morpho-syntactic traits. Second, the optimal donor is chosen by minimizing the Jensen-Shannon (JS) divergence between empirical token probability distributions $P_u$ and $P_k$ over the tokenizer vocabulary $V$, ensuring that initialized LoRA parameters occupy a compatible gradient subspace.

For implementation, LoRA adapters with rank $r = 32$ are applied to the query ($W_q$), value ($W_v$), and output ($W_{\text{out}}$) projections of the attention mechanism, as well as the fully-connected layers ($W_{\text{fc}}$) in feed-forward blocks of both the encoder and decoder. Training uses the AdamW optimizer with a peak learning rate of $10^{-4}$ for 10 epochs. The recipient LoRA weights are initialized directly from the optimal donor's trained LoRA parameters ($\phi_{\text{new}}^{(0)} = \phi_d$), freezing the base model and donor adapters while optimizing only the recipient adapter on 40 to 100 hours of low-resource training data.

## Experimental setup

Experiments use Whisper-small (244M parameters) trained on a single NVIDIA A10 GPU (24GB VRAM) with AdamW for 10 epochs at peak lr $10^{-4}$ and LoRA rank $r=32$. Donors include Hindi (600h), Marathi (550h), and Bengali (600h) from IndicVoices; recipients include Bhojpuri Rural Woman (40h and 80h subsets from AI4Bharat SRUTI benchmark), Konkani (60h and 100h from IndicVoices), and Assamese (40h from IndicVoices). Baselines include Whisper Zero-Shot, Donor-only LoRA, and Recipient-only LoRA, evaluated primarily via Word Error Rate (WER).

## Results

On the Bhojpuri Rural Woman dataset (40h), the proposed Hindi-to-Bhojpuri LoRA transfer achieves a WER of 25.14, outperforming Whisper zero-shot (178.40), donor-only LoRA (26.86), and recipient-only LoRA (30.37), delivering a 17% relative error reduction over recipient-only fine-tuning. Across all evaluated pairs, the donor-initialized transfer consistently outperforms recipient-only adaptation, yielding relative gains of 15% for Bhojpuri (80h), 14% for Bengali-Assamese (40h), 10% for Marathi-Konkani (100h), and 9% for Marathi-Konkani (60h). The method does not win on absolute high-resource parity, as absolute WERs remain high due to severe low-resource constraints and heavy dialectal variability in the evaluation sets.

| System / Condition | Bhojpuri (40h) WER | Konkani (100h) WER | Assamese (40h) WER |
|---|---|---|---|
| Whisper Zero-Shot | 178.40 | 227.10 | 249.86 |
| Recipient-Only LoRA | 30.37 | 41.86 | 49.23 |
| Donor-Only LoRA | 26.86 | 26.74 | 30.91 |
| Donor-Rec. LoRA Transfer | **25.14** | **37.62** | **42.34** |

## Limitations

The study evaluates only Indo-Aryan language pairs, leaving the universality of orthographic-distributional alignment across entirely different language families unverified. The evaluation relies heavily on parameter-efficient LoRA under tight data caps (40-100 hours), and absolute WERs remain elevated, reflecting the difficulty of extreme low-resource speech recognition. Furthermore, reliance on script and token overlap assumes accessible orthographic text corpora for computing Jensen-Shannon divergence.

## Why read this

Researchers and engineers working on extremely low-resource speech recognition will learn how to leverage cross-lingual LoRA transfer using orthographic and genealogical alignment when target languages lack pre-training exposure.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rapid speech recognition adaptation for endangered, dialectal, and extremely low-resource languages lacking pre-training data in foundation models.

## Related

- (link related pages by id as the wiki grows)
