---
id: berdo26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3405
pdf: https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.pdf
---

# Post-Training Speech Enhancement Language Models with Perceptual Rewards

[PDF](https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3405)

**TL;DR** — The paper introduces a post-training stage for autoregressive speech enhancement language models using Group Sequence Policy Optimization (GSPO) with a multi-metric perceptual reward, achieving state-of-the-art results on DNS2020 and DNS5.

## Problem

Current autoregressive speech enhancement language models are trained exclusively with supervised token-level cross-entropy loss, creating a train-evaluation gap since models are ultimately judged on non-differentiable perceptual quality metrics like DNSMOS, WER, and UTMOS. While prior work tried to bridge this gap using learned surrogates or single-metric optimization, these approaches often lead to training instability or reward hacking, where models exploit artifacts to inflate targeted scores while degrading other perceptual dimensions.

## Method

The authors apply Group Sequence Policy Optimization (GSPO) to initialize from public supervised fine-tuning checkpoints of two base autoregressive models: UniSE (decoder-only) and GenSE (hierarchical two-stage generation). For each noisy input, GSPO samples 4 complete sequence outputs, decodes them to waveforms, and evaluates them using a composite reward function combining DNSMOS, Whisper-LargeV3 word error rate (1 - WER), and UTMOS with equal weighting. GSPO computes group-relative normalized advantages across the sampled sequences and performs sequence-level clipped policy gradient updates without requiring a learned critic network or offline preference pairs.

## Results

Evaluated on the DNS2020 blind test set, UniSE + GSPO and GenSE + GSPO consistently improve across all DNSMOS P.835 metrics (SIG, BAK, OVRL) across synthetic and real recording conditions, outperforming baselines like AnyEnhance and LLaSE-G1 (e.g., GenSE + GSPO achieves 3.53 OVRL with reverb and 3.55 without). On the DNS5 blind test set, GenSE + GSPO increases Track 1 personalized OVRL (pOVRL) from 3.41 to 4.45 and Track 2 pOVRL from 2.96 to 4.36. A human evaluation ablation with 21 raters and Bradley-Terry Elo ratings demonstrates that the composite multi-metric reward ranks first (Elo 1571) and is strongly preferred over single-metric variants, with DNSMOS-only optimization suffering from reward hacking and falling below the SFT baseline (Elo 1335 vs 1476).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on speech enhancement, telephony noise suppression, and generative audio enhancement can use this method to align discrete-token audio language models with human perceptual quality.

## Related

- (link related pages by id as the wiki grows)
