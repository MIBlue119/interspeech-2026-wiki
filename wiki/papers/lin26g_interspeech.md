---
id: lin26g_interspeech
category: speech-llm-dialogue
institutions: ["National Taiwan University", "ASUS"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1421
pdf: https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.pdf
---

# Silence is Golden: Mitigating Hallucinations in Large Audio-Language Models via Layer-Weighted Vector Steering

*Tsung-En Lin, Kuan-Yi Lee, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1421)

**Category:** `speech-llm-dialogue`

**TL;DR** — The paper introduces Layer-Weighted Vector Steering (LWVS), a training-free inference-time intervention that mitigates audio hallucinations in Large Audio-Language Models by contrasting active audio against silence and concentrating steering strength in influential deep layers. This approach boosts the Total F1 score on Gemma by 6.9 points and improves general audio understanding accuracy on Qwen by 8% relative.

## Key contributions

- Proposes a modality-aware steering vector derived by contrasting the final-token hidden states of active audio against a silent audio clip of the exact same duration.
- Establishes a probing framework using cosine similarity and Cohen's d effect size to demonstrate that later transformer layers disproportionately dictate output grounding.
- Introduces Layer-Weighted Vector Steering (LWVS), a training-free energy-conserving adaptive schedule that upweights intervention in influential deep layers and downweights early/final layers.
- Demonstrates consistent hallucination reduction across diverse architectures (Qwen2-Audio-7B and Gemma-3n-E4B-It) while preserving or enhancing general audio understanding on the MMAU benchmark.

## Problem

Large Audio-Language Models and Speech Language Models frequently generate ungrounded content (hallucinations) during audio question answering and captioning tasks. Prior strategies like fine-tuning or Retrieval-Augmented Generation require heavy compute or infrastructure, while adapting vision-language activation steering methods like VISTA using text-only negative instances fails to capture the acoustic modality. This lack of modality awareness causes inconsistent performance drops, making it critical to develop lightweight, interpretable inference interventions that ground models in acoustic inputs without degrading general reasoning.

## Method

The method builds on internal state analysis of residual stream activations at the final token index T. To isolate acoustic information, a Modality-Aware Steering Vector (MAVS) is computed at layer l as the difference vector between a positive instance (audio X_a plus query X_q) and a negative instance (silent audio X_s of identical length plus query X_q). A normalization constraint ensures the modified hidden state matches the original vector magnitude: Norm(u) = u * (||h_{t,l}||_2 / ||u||_2).

Probing these hidden states via cosine similarity and Cohen's d effect size against output correctness reveals that early layers show negligible separation, while later layers exhibit large positive effect sizes, indicating deep layers govern output grounding. Based on this, Layer-Weighted Vector Steering (LWVS) partitions layers into a boost set L_inc (deep layers) and a suppress set L_dec (early and final layers). It uses a layer-specific strength schedule governed by an adaptation factor beta to redistribute steering energy without changing total intervention effort.

For implementation, the base steering strength is fixed at lambda = 0.05 with adaptation factor beta = 0.5. For Qwen2-Audio-7B-Instruct, the boost set is layers 14 to 29; for Gemma-3n-E4B-It, the boost set is layers 16 to 32. Gemma's auxiliary branches in its AltUp architecture are left unmodified, applying steering exclusively to the primary residual stream.

## Experimental setup

Evaluated on the Audio Hallucination QA dataset (measuring object hallucination via Accuracy, Precision, Recall, and F1 across Random, Popular, and Adversarial subsets) and the Multi-Modal Audio Understanding (MMAU) benchmark suite containing 10,000 expert-level multiple-choice questions (evaluated on Test and Test-mini splits). Compared against Original (no steering), Text-Only Vector Steering (TVS, adapting text-based VISTA), and Modality-Aware Vector Steering (MAVS). Uses greedy decoding for deterministic single-token evaluations.

## Results

On the Audio Hallucination QA dataset, text-centric steering (TVS) degrades Gemma's Total F1 from 55.0 to 47.8, proving text-only contrasts are insufficient for audio. Modality-Aware Vector Steering (MAVS) fixes this, lifting Gemma Total F1 to 60.3 and Qwen to 62.6. LWVS achieves the best overall performance, reaching a Total F1 of 61.9 on Gemma (with Recall surging from 53.4% to 69.0%) and 63.2 on Qwen (Total Accuracy rising from 55.0% to 59.9%). On the MMAU general benchmark, LWVS maintains parity on Gemma (64.1% vs 63.8% original) and yields a significant accuracy gain on Qwen, increasing from 54.8% to 59.2% (an 8% relative increase). Ablations confirm that concentrating steering energy in the empirically identified high-influence late layers outperforms uniform application.

| System/Condition | Gemma Hallucination (Total F1) | Qwen Hallucination (Total F1) | MMAU Test (Qwen Accuracy) |
|---|---|---|---|
| Original Baseline | 55.0 | 60.2 | 54.8 |
| Text-Only Steering (TVS) | 47.8 | 60.4 | 58.3 |
| MAVS (Audio-Silence) | 60.3 | 62.6 | 58.4 |
| LWVS (Ours) | 61.9 | 63.2 | 59.2 |

## Limitations

The approach assumes a static layer-weighting schedule determined by probing, which may vary across different model scales or families not tested. The evaluation focuses strictly on binary yes/no question answering and multiple-choice tasks using greedy decoding, leaving open-ended generation and sampling decoding strategies unverified. Furthermore, the silence baseline approach assumes that equal-duration silence effectively isolates acoustic presence without accounting for ambient noise profile variations.

## Why read this

Speech and ML engineers building or deploying Large Audio-Language Models should read this paper to learn how to apply lightweight, training-free activation steering to eliminate audio hallucinations. It offers a clear diagnostic framework using effect sizes to locate where models process grounding, demonstrating how to improve factual reliability without fine-tuning or damaging general reasoning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying safer, more grounded Large Audio-Language Models for audio question-delimited QA, voice assistants, and audio captioning systems where factual reliability is critical.

## Institutions / 機構

National Taiwan University, ASUS

**Funding / 經費:** Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence, NTU Artificial Intelligence Center of Research Excellence

## Related

- (link related pages by id as the wiki grows)
