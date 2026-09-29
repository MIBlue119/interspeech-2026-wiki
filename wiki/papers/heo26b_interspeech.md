---
id: heo26b_interspeech
category: deepfake-security
institutions: ["DGIST"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2354
pdf: https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.pdf
---

# Tracing the Origins: Legacy Codec Identification in Neural Audio Transcoding

*Wonje Heo, Shinee Youn, Yooshin Kim, Chuck Chae, Donghoon Shin*

[PDF](https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2354)

**Category:** `deepfake-security`

**TL;DR** — This paper investigates audio forensics in the era of neural audio codecs (NACs), proposing a Transformer-based framework that recovers legacy compression traces from residual vector quantization (RVQ) tokens with up to 99.99% accuracy. It demonstrates that legacy codec signatures survive non-linear neural transcoding.

## Key contributions

- Defines and formalizes the forensic gap of legacy-to-neural audio transcoding, where RVQ-based neural codecs obscure traditional linear compression traces.
- Proposes a Layer-Causal RVQ Transformer (LCR-Trans) to model hierarchical inter-layer dependencies and prevent future information leakage across codebook layers.
- Introduces a Dynamic Layer-wise Attentive Aggregator (DLAA) to weigh and isolate forensically informative codebook layers dynamically.
- Presents a Temporal Context Transformer (TC-Trans) to capture time-varying acoustic events like pre-echo suppression and transient processing.
- Establishes a rigorous evaluation protocol including fixed-bitrate codec identification, bitrate classification, and an 18-class joint identification task.

## Problem

Traditional audio forensics relies on linear signal processing assumptions applied to continuous waveforms or deterministic bitstreams to detect compression artifacts such as spectral cut-offs and quantization noise. The widespread adoption of Residual Vector Quantization (RVQ)-based neural audio codecs like SoundStream, EnCodec, and DAC replaces linear bitstreams with discrete tokens, causing traditional forensic techniques to collapse entirely. Because modern audio pipelines routinely transcode legacy formats into neural tokens, analysts face a severe security and provenance gap. Without specialized methods that treat neural codecs as an underlying transmission channel, verifying content authenticity and tracing source codecs becomes impossible.

## Method

The framework ingests discrete RVQ token sequences represented as $X \in \mathbb{R}^{B \times L \times T}$, which are mapped into a continuous embedding space $E \in \mathbb{R}^{B \times C \times L \times T}$ using pre-trained codebooks from a 48 kHz EnCodec model. The architecture consists of three core components: the Layer-Causal RVQ Transformer (LCR-Trans), the Dynamic Layer-wise Attentive Aggregator (DLAA), and the Temporal Context Transformer (TC-Trans).

First, LCR-Trans uses a 2D convolutional layer followed by Group Normalization and GELU activation to capture local correlations across time and codebook layers on the $T-L$ plane. It then applies a Transformer encoder with causal-masked attention along the codebook layer axis to model hierarchical inter-layer dependencies without leaking information from future layers. Second, DLAA computes global layer weights and time-varying temporal layer attention scores combined via a sigmoid function to generate a dynamic attention map $A \in \mathbb{R}^{B \times 1 \times L \times T}$. This map reweights and aggregates the features along the layer axis to isolate the most forensically informative quantization levels.

Third, TC-Trans feeds the compressed temporal features $Z \in \mathbb{R}^{B \times C \times T}$ into a temporal Transformer encoder to model long-range dependencies and capture unique time-varying signatures like pre-echo handling. The output is pooled via adaptive average pooling into a global feature vector $v \in \mathbb{R}^{B \times C}$ and fed into an MLP classifier for final identification. The model is trained using AdamW with a batch size of 16, an initial learning rate of $5 \times 10^{-6}$, weight decay of $1 \times 10^{-4}$, a 5-epoch linear warmup, and a ReduceLROnPlateau scheduler.

## Experimental setup

The evaluation dataset is constructed from the VCTK corpus using a speaker-disjoint split (80% train, 10% validation, 10% test). Speech files were compressed via FFmpeg using five legacy codecs (MP3, AAC, Opus, Vorbis, G.711 $\mu$-law) across four bitrates (32, 64, 96, 128 kbps or equivalent VBR quality settings), then transcoded using a 48 kHz EnCodec model. Baseline comparisons include a minimal CNN+MLP network, single-module variants, and leave-one-out ablation models. The models are trained for 25 epochs, with performance evaluated using accuracy and Macro-F1 scores.

## Results

In fixed-bitrate codec identification, the proposed model achieves near-perfect performance, scoring 99.99% accuracy at 32 kbps, 99.70% at 64 kbps, 98.36% at 96 kbps, and 97.32% at 128 kbps. Performance naturally improves at lower bitrates due to aggressive quantization artifacts acting as strong discriminative cues. For bitrate classification under a fixed codec, AAC and Vorbis achieve over 99% accuracy, whereas MP3 and Opus drop to 84.43% and 71.01% respectively, struggling to separate 96 kbps from 128 kbps due to artifact convergence near transparency.

In the rigorous 18-class joint codec-and-bitrate identification task, the proposed full model achieves an accuracy of 89.34% and a Macro-F1 of 89.31%, outperforming the CNN+MLP baseline (73.71%) by more than 15%. Ablation experiments demonstrate that removing LCR-Trans, DLAA, or TC-Trans drops accuracy to 86.88%, 88.97%, and 87.98% respectively, confirming the necessity of all proposed modules.

| System / Condition | Accuracy (%) | Macro-F1 (%) |
|---|---|---|
| Baseline (CNN+MLP) | 73.71 | 72.18 |
| LCR-Trans Only | 86.60 | 86.46 |
| DLAA Only | 81.82 | 81.63 |
| TC-Trans Only | 84.85 | 84.72 |
| Ours (Full Model) | 89.34 | 89.31 |

## Limitations

The study is currently scoped to a single neural audio codec (EnCodec at 48 kHz) and a restricted set of English speech data derived from the VCTK corpus, leaving cross-codec generalization across different NAC architectures like DAC or SoundStream unverified. High-bitrate discrimination for codecs like MP3 and Opus remains challenging because quantization artifacts converge near transparency. Furthermore, multilingual evaluation, noise robustness, and real-world acoustic reverberation environments were not explicitly tested.

## Why read this

Speech and ML engineers working on audio forensics, content provenance, and neural audio codecs should read this paper to understand how discrete token representations preserve legacy compression signatures. It provides a blueprint for leveraging hierarchical attention across RVQ codebook layers to solve composite multi-compression identification tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio forensics, deepfake and media authenticity verification, copyright infringement tracking, and digital content provenance auditing in neural audio distribution networks.

## Institutions / 機構

DGIST

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation

## Related

- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — shared technique · relatedness 2.3/3
- [FakeSound2: A Benchmark for Explainable, Traceable, and Generalizable Deepfake Sound Detection](xie26_interspeech.md) — same problem · relatedness 2.0/3
- [Countering Neural Audio Codec Distortions in Watermarking with Adaptive Restoration](park26d_interspeech.md) — same problem · relatedness 2.0/3
- [Dual-Branch Gated Fusion for Open-Set Audio Deepfake Source Tracing](khan26_interspeech.md) — same problem · relatedness 1.9/3
- [What Do Deepfake Speech Detectors Actually Hear?](stanek26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
