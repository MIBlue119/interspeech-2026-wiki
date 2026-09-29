---
id: lee26m_interspeech
category: speech-llm-dialogue
institutions: ["Seoul National University", "University of Seoul"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1589
pdf: https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.pdf
---

# From Awareness to Adherence: Bridging the Context Gap in Spoken Dialogue Systems via Context-Aware Decoding

*Che Hyun Lee, Heeseung Kim, Sungroh Yoon*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1589)

**Category:** `speech-llm-dialogue`

**TL;DR** — The paper introduces an audio-adapted Context-Aware Decoding (CAD) method for multi-round spoken dialogue systems that dynamically highlights critical conversation history by penalizing general parametric priors during inference, boosting Average Pass Ratio by up to 13.30%.

## Key contributions

- Formalized multi-round spoken dialogue context failures as a gap between latent awareness and active adherence rather than pure memory loss.
- Proposed an audio-adapted Context-Aware Decoding method that operates entirely at inference time without requiring extra training or external retrieval modules.
- Designed a multi-axis context extraction pipeline using attention layer selection, mean token-to-turn aggregation, and a down-weighted turn-to-round ratio (beta = 0.5).

## Problem

End-to-end spoken dialogue systems often struggle in multi-round conversations, generating responses that ignore user constraints or contradict prior turns (hallucinations). Prior works assume models simply forget past dialogue, relying on external retrieval methods. However, the authors show that models often maintain latent awareness in internal attention maps, but strong parametric priors overpower these signals during generation. Closing this generation gap is critical for fluid, consistent, and context-faithful voice assistants.

## Method

The method builds upon Context-Aware Decoding (CAD) by constructing a targeted unconditional context (C_unc) that masks out only the key dialogue context (C_key) instead of dropping the entire conversation history (H_{n-1}). During autoregressive generation, logits are adjusted by contrasting the conditional output distribution against the unconditional one, scaled by a penalty weight alpha (tested between 1.0 and 3.0, optimal at 2.5). 

To locate C_key, the system analyzes the attention weights that the current user query U^n assigns to historical tokens. Token scores are computed across the last 4 layers (last_4), aggregated to turn scores via mean pooling, and combined into round scores using a turn-to-round ratio beta = 0.5 to balance speech codecs against text tokens. Finally, the top-K rounds (K=1 performs best) are isolated as C_key to penalize generic parametric priors during decoding.

## Experimental setup

Evaluated on the Audio MultiChallenge benchmark featuring conversations spanning 3 to 8 rounds with realistic disfluencies and noise. Tasks include Semantic Memory (90 samples) and Self Coherence (83 samples). Tested across three state-of-the-art base models: MiMo-Audio-7B-Instruct, Qwen3-Omni-30B-A3B-Instruct, and Kimi-Audio-7B-Instruct. Performance is measured using Average Pass Ratio (APR) based on binary instance-specific rubrics evaluated via gpt-5-nano over 5 independent runs.

## Results

Applying audio-adapted CAD consistently improved performance across all baselines. Qwen3-Omni-30B-A3B-Instruct showed the largest absolute average gain of 13.30% (Semantic Memory jumping from 22.67% to 39.33%). MiMo-Audio-7B-Instruct and Kimi-Audio-7B-Instruct saw average gains of 8.10% and 6.70%, respectively. 

Ablations demonstrated that utilizing the whole history as C_key drastically degraded performance (21.04% APR vs 26.01% baseline) due to noise, whereas the calibrated pipeline reached 33.10%. Furthermore, selecting a context scope of K=2 underperformed K=1, proving that wider scopes introduce irrelevant turns that harm generation when amplified.

| System / Condition | Semantic Memory (%) | Self Coherence (%) | Average Pass Ratio (%) |
|---|---|---|---|
| MiMo-Audio-7B-Instruct | 26.00 | 26.02 | 26.01 |
| + Ours (CAD) | 32.00 | 36.39 | 34.11 |
| Qwen3-Omni-30B-A3B-Instruct | 22.67 | 29.16 | 25.78 |
| + Ours (CAD) | 39.33 | 38.80 | 39.08 |
| Kimi-Audio-7B-Instruct | 13.56 | 19.04 | 16.19 |
| + Ours (CAD) | 23.11 | 22.65 | 22.89 |

## Limitations

The evaluation relies on LLM-as-a-judge metrics (gpt-5-nano) rather than human evaluations, which may carry automated evaluation biases. The approach assumes that internal attention weights reliably reflect latent context awareness, which might degrade in extremely long or highly ambiguous dialogues. Furthermore, scope is bounded to S2T settings where responses are text, though the principle is claimed to extend to S2S.

## Why read this

Speech and ML engineers building multi-turn spoken dialogue systems will learn how to fix context adherence failures at inference time without costly retraining or external retrieval pipelines.

## Code

- https://github.com/saga1214/AudioCAD

## Applications

Voice assistants, smart speakers, real-time spoken translation systems, and multi-round conversational agents.

## Institutions / 機構

Seoul National University, University of Seoul

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government, National Research Foundation of Korea, BK21 FOUR Program, Samsung Electronics Co., Ltd

## Related

- (link related pages by id as the wiki grows)
