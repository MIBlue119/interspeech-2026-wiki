---
id: niu26c_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1881
pdf: https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.pdf
---

# Improving Stable Speech Synthesis Post-Training with ChatScorer and Margin-Based Preference Construction

[PDF](https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1881)

**TL;DR** — A post-training framework for codec-based text-to-speech uses an auxiliary reward model (ChatScorer) and margin-based preference filtering to improve generation stability and reduce bad outputs, lowering word error rate to 1.17% and BadRate to 2.44%.

## Problem

Existing post-training methods for neural codec text-to-speech models often fuse heterogeneous automatic metrics like character error rate and speaker similarity into a single scalar reward. Directly combining these metrics yields weakly separated candidate scores, producing ambiguous supervision that fails to suppress unnatural, machine-like speech.

## Method

The framework generates multiple candidate utterances per text prompt using an autoregressive codec language model (CosyVoice2-0.5B) and evaluates them via CER, SIM, and a specialized auxiliary reward model called ChatScorer. ChatScorer combines a frozen WavLM encoder with a lightweight Transformer, a Gaussian score prediction head, and an adversarial speaker classifier using a Gradient Reversal Layer to prevent speaker leakage. A margin-based construction strategy then filters out candidates with weak quality gaps, retaining only clearly separated pairs or ranked subsets (Rank3DPO) to optimize the model using ranked preference supervision.

## Results

Experiments were conducted on a chat-style dataset of 2,000 training and 500 test prompts, with 15 candidate generations per prompt. Evaluated against SFT, DPO, and GRPO baselines using character error rate (CER), WavLM speaker cosine similarity (SIM), group-level failure rates, and ChatScore bad rates. The proposed Rank3DPO method achieved a CER of 1.17%, a SIM failure rate of 0.10, and a BadRate of 2.44%, outperforming standard DPO and GRPO while improving MOS from 4.11 to 4.42.

## Code

- https://hajararabiu869.github.io/demo/

## Applications

Speech engineers and developers of conversational neural codec text-to-speech systems looking to improve generation stability and eliminate unnatural machine artifacts.

## Limitations

The online GRPO experiments were restricted to a relatively limited data scale.

## Related

- (link related pages by id as the wiki grows)
