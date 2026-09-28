---
id: moumen26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1873
pdf: https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.pdf
---

# Measuring the Redundancy of Decoder Layers in SpeechLLMs

[PDF](https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moumen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1873)

**TL;DR** — Speech Large Language Model decoders contain massive redundancy inherited from pretrained text LLMs, allowing 7–8B models to retain good ASR performance while removing up to 43.8% of their decoder layers.

## Problem

Speech Large Language Models route features through massive LLM decoders that consume over 90% of total parameters, yet speech tasks typically require vastly smaller capacity. It remains an open question how much of this decoder capacity is actually needed, and whether layer redundancy can be exploited to build smaller, more efficient systems. Characterising this redundancy helps bridge the gap between heavy generic LLM decoders and the actual requirements of speech applications.

## Method

The study evaluates the SLAM framework composing a WavLM Large or Whisper speech encoder, a single-layer MLP GELU projector, and decoder-only LLMs across two families (Qwen2.5 and Llama 3.1/3.2) at three scales (1–8B). Redundancy is measured using angular distance between hidden states to identify removable contiguous blocks of layers along an optimal pruning path. To heal the pruned models without adding extra capacity, the authors attach LoRA adapters (rank 64) exclusively to the receiving decoder MLP block and optionally unfreeze the projector for 5,000 iterations.

## Results

Evaluated on LibriSpeech (960h train, test-clean/other), Loquacious dev, and CoVoST2 (En->De, Fr->En), models are pruned using relative WER degradation thresholds (delta WER <= 0.25). Pruning 43.8% of decoder layers in Llama 3.1-8B and 30.6% in Qwen2.5-7B maintains acceptable performance, with Llama 3.1-8B achieving 2.25% (clean) and 5.30% (other) WER. Joint decoder and projector healing drastically outperforms decoder-only or projector-only healing, preventing sharp degradation. Furthermore, ASR- and AST-optimal pruning layers closely coincide despite different tasks and source languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building resource-efficient automated speech recognition and speech translation systems using large language model backbones.

## Limitations

Pruning tolerance scales down with model size, showing reduced effectiveness on smaller 1-1.5B parameter models.

## Related

- (link related pages by id as the wiki grows)
