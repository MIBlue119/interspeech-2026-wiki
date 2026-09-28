---
id: lee26m_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1589
pdf: https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.pdf
---

# From Awareness to Adherence: Bridging the Context Gap in Spoken Dialogue Systems via Context-Aware Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1589)

**TL;DR** — The paper introduces an audio-adapted Context-Aware Decoding (CAD) method for multi-round spoken dialogue systems that amplifies latent context awareness during inference, improving average pass ratios by up to 13.30% on the Audio MultiChallenge benchmark.

## Problem

In multi-round spoken dialogues, end-to-end models often fail to maintain context adherence, which prior work mistakenly attributes entirely to memory loss. The authors identify a more critical bottleneck: a gap between latent context awareness—where the model internally recognizes past utterances—and active adherence, where strong parametric priors overshadow these signals during decoding.

## Method

The proposed audio-adapted CAD approach leverages internal attention mechanisms to dynamically isolate key historical conversational rounds without requiring additional training or external retrieval modules. Token attention scores from the current query to history are aggregated into turn scores (using mean pooling over the last 4 layers), combined into round scores with a down-weighting ratio (beta = 0.5) for audio token lengths, and the top-1 round is selected as key context. During inference, output distributions conditioned on the full history versus history minus the key context are contrasted using a logit penalty weight (alpha = 2.5) to suppress generic parametric priors and enforce faithful adherence.

## Results

Evaluated on the Audio MultiChallenge benchmark using gpt-5-nano as an LLM judge over Semantic Memory (90 samples) and Self Coherence (83 samples) subtasks across 5 independent runs. Tested on three baseline models: MiMo-Audio-7B-Instruct, Qwen3-Omni-30B-A3B-Instruct, and Kimi-Audio-7B-Instruct. Qwen3-Omni showed the largest absolute average pass ratio increase of 13.30% (Semantic Memory surging from 22.67% to 39.33%), while MiMo-Audio and Kimi-Audio achieved absolute average gains of 8.10% and 6.70%, respectively. Ablations demonstrated that using the whole history for CAD degraded performance to 21.04% compared to No CAD's 26.01%, whereas the optimized CAD achieved 33.10%.

## Code

- https://github.com/saga1214/AudioCAD

## Applications

Engineers building voice assistants and end-to-end spoken dialogue systems can use this inference-time decoding technique to reduce hallucinations and improve multi-round context tracking.

## Limitations

Expanding the context scope to top-2 rounds (K=2) degrades performance and introduces noise when combined with high penalty weights, indicating that precise context selection is critical.

## Related

- (link related pages by id as the wiki grows)
