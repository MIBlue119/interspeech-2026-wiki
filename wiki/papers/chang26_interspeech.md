---
id: chang26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-637
pdf: https://www.isca-archive.org/interspeech_2026/chang26_interspeech.pdf
---

# TAD: Token-Adaptive Contrastive Decoding with Confidence-Guided Gating for Hallucination Mitigation in Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/chang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-637)

**TL;DR** — The paper introduces Token-Adaptive Decoding (TAD), a training-free inference strategy that suppresses audio object hallucinations in large audio-language models, improving F1 by up to 0.117 on Qwen2-Audio.

## Problem

Large audio-language models (LALMs) frequently generate audio object hallucinations, answering 'yes' to binary presence/absence questions even when specific sound events are entirely absent. This occurs because models rely heavily on strong text-only language priors and spurious co-occurrences rather than actual acoustic evidence. Existing contrastive decoding methods apply a fixed contrast strength globally across all steps, failing to adapt to varying audio evidence or target the critical initial decoding step where binary decisions are formed.

## Method

TAD contrasts token logits conditioned on real audio against a matched silent-reference waveform to penalize unsupported language priors without requiring parameter updates. It employs log-sum-exp pooling over subword variants to aggregate vocabulary logits into semantic 'yes' and 'no' token sets robustly. At the first decoding step (t=1), a confidence-margin gate computes the audio-induced margin gain between affirmative and negative choices. If this margin gain falls below a threshold tau, an additive penalty gamma is applied exclusively to affirmative tokens, avoiding overcorrection when evidence is already sufficient.

## Results

Evaluated on the AudioCaps-Hallucination dataset (across Random, Adversarial, and Popular splits) and Clotho-AQA using Qwen2-Audio-7B-Instruct and Gemma-3n-E4B-it models. On Qwen2-Audio, TAD improves F1 by 0.059 to 0.117 across AudioCaps splits compared to the Audio-Aware Decoding (AAD) baseline, and raises Clotho-AQA F1 from 0.810 to 0.816. Confusion matrix analysis shows that TAD increases true-negative recall for rejecting absent objects from 0.266 (default) to 0.858. ROC/AUC analyses confirm that TAD yields stronger audio-grounded evidence and separation at the first decoding step.

## Code

- https://github.com/Changhy26/TAD

## Applications

Engineers building reliable conversational voice assistants, acoustic captioning systems, and audio question-answering pipelines can use TAD to ensure models faithfully ground binary assertions in audio input rather than hallucinating. Because it is a training-free plug-in logits processor, it can be seamlessly integrated into existing LALMs at inference time.

## Limitations

Overly aggressive contrast weights or poorly tuned thresholds can occasionally lead to minor F1 drops on random splits due to over-correction when audio evidence is already sufficient.

## Related

- (link related pages by id as the wiki grows)
