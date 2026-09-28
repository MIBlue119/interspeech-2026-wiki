---
id: wu26i_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2029
pdf: https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.pdf
---

# AFG-Bias: Acoustic-Fusion-Gated Biasing for Plug-and-Play Hotword Customization in LLM-Based ASR

[PDF](https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2029)

**TL;DR** — AFG-Bias is a plug-and-play acoustic biasing framework for frozen LLM-based ASR backbones that eliminates prompt-injection hallucinations and achieves up to 74.1% relative CER reductions on domain-specific benchmarks.

## Problem

Large language model-based ASR systems struggle to accurately transcribe acoustically rare entities like proper nouns, drug names, and financial codes. Existing workarounds like prompt injection and retrieval-augmented generation force raw candidate lists into the text prompt, which overwhelms the LLM's attention span, causes contextual scale collapse, and triggers severe hallucination loops.

## Method

The framework freezes all backbone LLM and ASR parameters while introducing a lightweight Cross-Modal Acoustic Retrieval (CAR) module and an Acoustic-Fusion Gating circuit. CAR uses sliding-window maximum cosine similarity in the shared adapter space to localize hotwords at sub-utterance granularity, absorbing pronunciation duration variability and picking top-K candidates. The gating mechanism then combines hotword features and LLM hidden states via cross-attention, using a binary cross-entropy supervised gate and a targeted sparse vocabulary mask to inject verified bias while structurally blocking ungrounded distractors. It trains using a dynamic hotword sampling strategy on AISHELL-1 and KeSpeech.

## Results

Evaluated across FireRedASR, OSUM, and Kimi backbones on financial, medical, and AISHELL-1-NE datasets, AFG-Bias achieves up to a 74.1% relative CER reduction and boosts AISHELL-1 hotword F1 by up to 5.4 absolute points. Ablation tests demonstrate that removing the neural gate causes CER to surge to 20.18% due to unconstrained hallucinations, whereas the complete system remains stable with up to 1,000 distractor entities injected into the candidate list.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying LLM-based ASR systems in specialized industrial sectors, such as finance and healthcare, where accurate recognition of rare domain-specific vocabulary is critical.

## Related

- (link related pages by id as the wiki grows)
