---
id: futami26_interspeech
category: asr
labels: [multilingual, efficient-on-device, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2561
pdf: https://www.isca-archive.org/interspeech_2026/futami26_interspeech.pdf
---

# Merging the Knowledge of LLMs for Automatic Speech Recognition

*Hayato Futami, Tatsuya Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/futami26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/futami26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2561)

**Category:** `asr` · **Labels:** `multilingual`, `efficient-on-device`, `self-supervised`

**TL;DR** — The paper introduces Language Model (LM) Merging, a cross-modal parameter arithmetic technique that directly combines text-only domain-specific language models into an LLM-based ASR model using LoRA adapters, avoiding any inference latency or memory overhead. It yields consistent domain adaptation gains in Japanese and English while matching the inference speed of the base ASR model.

## Key contributions

- Formulates cross-modal model merging between ASR and text-only LMs via LoRA arithmetic for zero-inference-overhead domain adaptation.
- Proposes Domain Extension Merging (equivalent to shallow fusion) and Domain Transfer Merging (equivalent to density ratio).
- Integrates TIES-merging (sign consensus and magnitude sparsification at top-p=50%) to mitigate task interference in cross-modal parameter combination.
- Demonstrates compatibility with downstream techniques, showing that merging can be stacked with shallow fusion, density ratio, or n-best rescoring for compounding gains.

## Problem

End-to-end ASR models trained on general paired speech-text corpora suffer from domain degradation when evaluated on specialized target domains with zero paired data. Traditional adaptation via Shallow Fusion or Density Ratio requires running large external LLMs at every decoding step, introducing severe computational overhead and slowing down inference. Conversely, post-processing methods like n-best rescoring or generative error correction scale poorly with small beam sizes (especially greedy decoding) and inflate the memory footprint. The core challenge is how to inject target-domain text knowledge into ASR models without incurring runtime latency or extra parameter costs.

## Method

The framework utilizes an LLM-based ASR model built by attaching a speech encoder to a pre-trained LLM, where the LLM parameters are adapted via LoRA. For Japanese experiments, LLM-jp-3-980M uses a Conformer encoder (512 dims, 8 heads, 12 layers) with LoRA rank R=8 and alpha=16 applied to query, key, value, and output attention layers. For English experiments, LLaMA3.2-1B is paired with a WavLM-base-plus frontend and an E-Branchformer encoder (256 dims, 4 heads, 12 layers). Target-domain and source-domain LMs are independently fine-tuned from the same foundational LLM using the same LoRA configuration on text-only corpora.

Domain extension merging (Merge-E) mirrors shallow fusion by adding the target-domain LM LoRA adapter parameters directly to the ASR LoRA weights scaled by a hyperparameter lambda_alpha. Domain transfer merging (Merge-T) mirrors density ratio by adding the target-domain adapter and subtracting the source-domain LM adapter. To resolve task interference between disparate modalities (speech-text ASR vs. pure text LM), TIES-merging is applied to both approaches: parameters are sparsified to retain the top-50% values by magnitude, a consensus sign is elected, and only parameters matching this sign are merged.

During inference, the merged model executes a single-model forward pass identical to the base ASR architecture, meaning zero additional parameters, no extra memory allocations, and unchanged Real Time Factors (RTF).

## Experimental setup

Evaluated on Japanese (Corpus of Spontaneous Japanese, CSJ) and English (LibriSpeech to SPGISpeech). CSJ uses CSJ-SPS (280h, source domain paired data) for ASR training and CSJ-APS (240h, target domain text only) for LM adaptation, evaluated on eval1 (target) and eval3 (source). LibriSpeech (960h) serves as the source domain to train an ASR model adapted to SPGISpeech (corporate earnings calls financial domain text). Metrics include Character Error Rate (CER) for Japanese and Word Error Rate (WER) for English, alongside total model parameters and Real Time Factor (RTF) measured on an NVIDIA RTX A6000 GPU.

## Results

On CSJ (eval1 target domain), the baseline ASR yields a 13.9% CER with 1.1B parameters and 0.45 RTF. Applying TIES-merging for domain transfer (TIESmerge-T) improves CER to 13.3% while maintaining the identical 1.1B parameter footprint and 0.45 RTF. Conventional shallow fusion (SF) achieves 12.8% CER but inflates parameters to 2.1B and RTF to 0.52; density ratio (DR) achieves 12.5% CER with 3.1B parameters and 0.57 RTF. However, stacking TIESmerge-T with shallow fusion pushes CER down to 12.4% (RTF 0.53), and stacking with density ratio yields 12.4% CER (RTF 0.58).

On the LibriSpeech-to-SPGISpeech benchmark, baseline ASR yields 11.2% WER (1.4B params, 0.40 RTF). TIESmerge-T improves WER to 10.6% without any parameter or RTF penalty. Conventional SF reaches 9.1% WER (2.4B params, 0.49 RTF) and DR reaches 9.0% (3.4B params, 0.56 RTF), while the combination of TIESmerge-T + DR achieves the strongest overall result of 8.8% WER. Notably, LM merging outperforms density ratio under greedy decoding (beam size 1), where density ratio degrades due to small search spaces.

| System | CER (%) eval1 | Params | RTF |
|---|---|---|---|
| ASR Baseline | 13.9 | 1.1B | 0.45 |
| + TIESmerge-T | 13.3 | 1.1B | 0.45 |
| + Shallow Fusion (SF) | 12.8 | 2.1B | 0.52 |
| + Density Ratio (DR) | 12.5 | 3.1B | 0.57 |
| + TIESmerge-T + SF | 12.4 | 2.1B | 0.53 |
| + TIESmerge-T + DR | 12.4 | 3.1B | 0.58 |

## Limitations

LM merging underperforms compared to conventional shallow fusion and density ratio because it lacks per-step probability interpolation from an active external language model. A severe cross-modal alignment bottleneck exists where scaling up the merging coefficient (lambda_alpha) past a threshold triggers an ASR parameter collapse, capping the maximum extractable domain transfer gain. The approach requires access to text data from the target domain to build the LM adapter, and domain transfer merging additionally requires source-domain text data.

## Why read this

Speech and ML engineers looking to deploy LLM-based ASR models in specialized target domains without absorbing the heavy inference latency and memory penalties of shallow fusion or density ratio. It provides a blueprint for cross-modal parameter merging using LoRA and TIES-merging.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-latency domain adaptation for production ASR systems, voice assistants, and enterprise transcription engines operating under strict latency constraints.

## Institutions / 機構

Kyoto University

## Related

- (link related pages by id as the wiki grows)
