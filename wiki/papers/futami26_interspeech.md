---
id: futami26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2561
pdf: https://www.isca-archive.org/interspeech_2026/futami26_interspeech.pdf
---

# Merging the Knowledge of LLMs for Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/futami26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/futami26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2561)

**TL;DR** — The proposed LM merging method integrates target-domain language models directly into LLM-based ASR parameters via arithmetic operations on LoRA adapters, improving target-domain recognition without increasing inference latency or memory footprint.

## Problem

End-to-end ASR models trained on general paired data suffer performance drops in specific target domains lacking sufficient audio-text data. While conventional external language model fusion techniques like shallow fusion or density ratio help adapt to new domains, running massive LMs at every decoding step introduces severe computational overhead. Furthermore, static initialization prevents LLM-based ASR from dynamically adjusting to target domains at inference time.

## Method

The approach couples a Conformer speech encoder with a pre-trained LLM (LLM-jp-3-980M and LLaMA3.2-1B) adapted via LoRA, while domain-specific LMs are independently fine-tuned using LoRA from the same base LLM. Domain extension merging adds the target-domain LM adapter weights directly to the ASR model parameters, corresponding to shallow fusion. Domain transfer merging additionally subtracts the source-domain LM adapter weights, corresponding to density ratio. These arithmetic operations are further enhanced using TIES-merging, which applies magnitude-based parameter trimming and sign consensus to mitigate task interference.

## Results

Evaluated on Japanese (Corpus of Spontaneous Japanese, adapting from CSJ-SPS source to CSJ-APS target) and English (adapting from LibriSpeech to SPGISpeech financial domain). Experiments show that LM merging consistently improves target-domain ASR performance compared to unadapted baselines. Although traditional LM fusion yields slightly higher accuracy, LM merging matches the performance of n-best rescoring while eliminating extra inference compute and memory overhead. Combining LM merging with traditional fusion or rescoring yields even further performance gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners deploying LLM-based ASR systems to specialized target domains where only text corpora are available, particularly under strict on-device latency and compute constraints.

## Limitations

Domain transfer merging requires access to the original source-domain text data used for ASR training, which is not always available.

## Related

- (link related pages by id as the wiki grows)
