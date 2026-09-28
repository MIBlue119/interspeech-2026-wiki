---
id: niu26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1881
pdf: https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.pdf
---

# Improving Stable Speech Synthesis Post-Training with ChatScorer and Margin-Based Preference Construction

*Shihao Niu, Jianguo Wei, Wenhuan Lu, Xianghu Yue, Wei Li, Ming Zhou, Ming Cai, Luo Si*

[PDF](https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1881)

**TL;DR** — This paper proposes a post-training framework for codec-based text-to-speech (TTS) that combines an auxiliary reward model (ChatScorer) with margin-based preference construction, reducing undesirable machine-like outputs and improving generation stability.

## Key contributions

- Identifies that aggregating heterogeneous automatic metrics into a single scalar reward yields weakly separated candidate scores and ambiguous supervision in TTS post-training.
- Proposes a new post-training framework integrating ChatScorer with a margin-based data filtering and preference construction strategy to guarantee clear quality gaps.
- Introduces stability-oriented evaluation metrics including group-level failure rate (FR) and ChatScore-based bad rate alongside conventional quality measures.
- Demonstrates through Rank3DPO integration that the framework improves synthesis stability and lowers bad rates while maintaining competitive intelligibility.

## Problem

Current post-training approaches for neural codec language models in text-to-speech rely heavily on weighted combinations of automatic metrics like character error rate (CER) and speaker similarity (SIM) as scalar reward signals. Directly fusing these metrics leads to weakly separated candidate scores, generating ambiguous supervision during preference optimization and failing to adequately suppress overly machine-like or unnatural conversational outputs. This undermines synthesis reliability and overall conversational naturalness across varied prompt generation.

## Method

Given a text prompt Y, an autoregressive codec-based TTS model pi_theta generates K candidate utterances (K=15) via random sampling. Each candidate is scored using a composite metric: Si = w_cer * phi_cer(Xi) + w_sim * phi_sim(Xi) + w_chat * phi_chat(Xi), where phi values are normalized scores. The candidates are ranked, and a margin-based filtering strategy discards prompts without clear quality gaps (dropping roughly 40% of prompts for DPO and 60-80% for RankDPO). The best candidate X^+ is chosen from the top-3 region subject to positive thresholds (CER <= 0, SIM >= 0.8, ChatScore >= 0.7), while the worst candidate X^- is drawn from the bottom-3 region subject to negative thresholds (CER >= 0.15, SIM <= 0.7, ChatScore <= 0.67).

ChatScorer acts as an auxiliary reward model to detect undesirable conversational outputs. It uses a frozen WavLM encoder followed by a lightweight Transformer block, masked mean pooling, and an MLP to output predicted Gaussian score parameters mu and sigma^2, trained via negative log-likelihood. To prevent speaker leakage, an auxiliary speaker classifier with a Gradient Reversal Layer (GRL) is attached, optimizing an adversarial cross-entropy loss (L_adv = CE). The final objective combines the scoring loss and adversarial loss.

Filtered preference data are optimized using ranked supervision (Rank3DPO or Rank5DPO) alongside standard pairwise DPO. For a ranked subset S, relative policy scores are computed against a frozen reference model pi_ref, and an objective function optimizes valid preference pairs weighted by score differences using inverse temperature beta. This exploits multi-sample ranked relations rather than isolated binary pairs.

## Experimental setup

Experiments use CosyVoice2-0.5B as the base model, with an SFT model trained on 5 hours of real recordings per target speaker used solely for candidate generation. A long-form chat-style dataset containing 2,000 training prompts and 500 test prompts generated via GPT-5 and manually filtered is used. Methods compared include SFT, DPO, GRPO, Rank3DPO, and direct fused-score selection baselines (-w). Evaluation metrics include CER, SIM, group-level failure rates (FR@CER < 0.05, FR@SIM > 0.75), ChatScore-based BadRate (%), and MOS via blind listening tests with 10 listeners rating 50 utterances. Training uses AdamW with a learning rate of 1e-5 on two NVIDIA A800 GPUs.

## Results

Rank3DPO achieves the lowest character error rate (CER) at 1.17% (compared to 1.53% for SFT, 1.28% for DPO, and 1.46% for GRPO) and secures the highest CER=0 ratio at 0.62. For stability metrics, Rank3DPO reduces the SIM failure rate (FR@SIM > 0.75) down to 0.10 compared to 0.42 for SFT and 0.14 for DPO. Incorporating ChatScore drastically reduces the BadRate from 12.69% down to 2.44% in Rank3DPO and raises the MOS from 4.23 to 4.42 +/- 0.05. Margin-based filtering (-m) consistently outperforms direct fused-score selection (-w) across both DPO and Rank3DPO variants.

| Model | CER (%) ↓ | CER=0 ↑ | FR@SIM > 0.75 ↓ | BadRate (%) ↓ | MOS ↑ |
|---|---|---|---|---|---|
| SFT | 1.53 | 0.54 | 0.42 | 12.66 | – |
| DPO | 1.28 | 0.59 | 0.14 | 3.35 | 4.28 ± 0.05 |
| GRPO | 1.46 | 0.44 | 0.22 | 10.83 | 3.91 ± 0.05 |
| Rank3DPO | 1.17 | 0.62 | 0.10 | 2.44 | 4.42 ± 0.05 |

## Limitations

The margin-based construction strategy discards a significant portion of training data (filtering out 40% to 80% of prompts), which reduces overall sample efficiency. The GRPO experiments were conducted on a relatively limited data scale without large-scale online multi-reward optimization. Furthermore, language coverage is restricted and evaluation is constrained to chat-style text prompts without exploring multi-speaker or heavily accented acoustic domains.

## Why read this

Speech and ML researchers working on preference optimization or reinforcement learning for neural codec TTS will find a rigorous formulation for handling ambiguous multi-metric rewards via margin-based filtering and auxiliary reward modeling. Readers will take away a reproducible recipe for suppressing machine-like artifacts using ChatScorer and ranked supervision.

## Code

- https://hajararabiu869.github.io/demo/

## Applications

Conversational speech synthesis systems, virtual assistants, and interactive voice-based AI agents requiring highly stable, natural, and human-like voice outputs.

## Related

- (link related pages by id as the wiki grows)
