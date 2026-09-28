---
id: chen26k_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1118
pdf: https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.pdf
---

# Causal Tracing of Audio-Text Fusion in Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1118)

**TL;DR** — The paper adapts causal tracing to uncover internal audio-text fusion dynamics in large audio language models, revealing distinct strategies such as progressive integration in DeSTA and late-stage fusion in Qwen.

## Problem

Large audio language models (LALMs) achieve strong empirical performance across various perception and reasoning tasks, but their internal mechanisms remain a black-box. Current evaluations are strictly end-to-end and task-level, failing to explain how or where acoustic features are integrated with textual representations. Understanding these internal dynamics is critical for improving interpretability, mitigating hallucinations, and guiding future multi-modal architectures.

## Method

The authors adapt a causal tracing framework using three inference runs: clean (original audio), corrupted (pure silence baseline), and patched (replacing corrupted hidden states with cached clean ones). Pure silence is selected as the baseline to ablate acoustic signals without introducing out-of-distribution artifacts or model hallucinations. Interventions are evaluated along two axes using the Recovery Rate (RR) metric: layer-wise depth across transformer layers and token-wise spatial localization across structured text prompts. Experiments examine multiple modern LALM families, including DeSTA (2 and 2.5), Qwen (and 2), and Voxtral.

## Results

Evaluated on the SAKURA dataset targeting four acoustic attributes (animal, emotion, gender, and language), layer-wise tracing shows that DeSTA models employ progressive integration stabilizing after layer 15, Qwen models exhibit polarized late-stage fusion occurring within the final third of the network (layers 18 to 31), and Voxtral utilizes an early fusion strategy. Token-wise tracing demonstrates that the final sequence token acts as an informational bottleneck for audio context retrieval, while intermediate object tokens trigger an attention-like query mechanism to extract specific target attributes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers designing future multi-modal architectures, improving model interpretability, and mitigating hallucinations in audio language models.

## Related

- (link related pages by id as the wiki grows)
