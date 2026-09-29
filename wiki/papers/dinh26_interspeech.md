---
id: dinh26_interspeech
category: enhancement-separation
labels: [efficient-on-device]
institutions: ["Institute of Science Tokyo"]
code: https://phuongdnm.github.io/rvqgrid
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2296
pdf: https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.pdf
---

# Improving Audio Codec-based Speech Separation By Stacking Residual Vector Quantization Layers

*Nhu Minh Phuong Dinh, Roland Hartanto, Koichi Shinoda*

[PDF](https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2296)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`

**TL;DR** — RVQ-Grid is a speech separation model operating in the compressed latent space of Neural Audio Codecs that preserves the coarse-to-fine acoustic hierarchy by stacking Residual Vector Quantization layers into a 3D grid, achieving a +3.6 dB SI-SDRi improvement over prior codec-based methods while requiring 6x fewer MACs than waveform transformers.

## Key contributions

- Proposes RVQ-Grid, which stacks per-layer RVQ vectors into a 3D grid (Codebook x Dimension x Time) instead of collapsing them into a single embedding, thereby preserving hierarchical acoustic information.
- Introduces dual-axis recurrent blocks consisting of sequential BiLSTMs that alternately model cross-layer dependencies along the codebook axis and temporal context along the time axis.
- Achieves an 8.6% Word Error Rate (WER) using Whisper large-v3-turbo on WSJ0-2Mix, demonstrating near-baseline downstream ASR utility with 6x reduction in MACs compared to SepFormer.
- Conducts comprehensive evaluations showing that performance degrades gracefully down to 12 kbps, and that increasing RVQ depth and training sequence length consistently boosts SI-SDRi.

## Problem

Raw waveform speech separation models like SepFormer achieve high SI-SDR performance but suffer from massive computational costs and quadratic memory scaling with sequence length, making long audio processing and edge deployment impractical. While prior compressed-domain alternatives like Codecformer reduce computation by operating in Neural Audio Codec (NAC) latent spaces, they collapse all Residual Vector Quantization (RVQ) layers into a single summed embedding. This aggressive compression destroys the vital coarse-to-fine acoustic hierarchy across codebook layers, resulting in a 2-3 dB performance degradation and poor downstream usability.

## Method

RVQ-Grid operates on top of a frozen pre-trained Neural Audio Codec (either DAC or EnCodec). The mixture is encoded and quantized, and instead of summing the RVQ layer outputs, the per-layer vectors are stacked into a 3D grid representation $Z_{grid} \in \mathbb{R}^{N \times D \times T}$ (where $N$ is codebook layers, $D$ is embedding dimension, and $T$ is temporal frames). A learnable 2D convolution projects this grid from dimension $D$ to hidden dimension $C$, yielding $H_0 \in \mathbb{R}^{N \times C \times T}$.

This projected representation is then processed by $L$ dual-axis recurrent blocks. Each block applies two sequential operations: first, a BiLSTM along the $N$ axis to capture cross-layer dependencies ($H_{cross}$); second, a BiLSTM along the $T$ axis to capture temporal context ($H_{temp}$). Residual connections and layer normalization are applied after each sub-path. For the DAC variant, the model uses $N=12$ codebook layers, $D=1024$, $L=6$ blocks, hidden dimension $C=512$, and a Snake activation function in the mask head to match DAC's internal design. For the EnCodec variant, it uses $N=32$, $D=128$, $L=16$ blocks, hidden dimension $C=128$, and an ELU activation function.

After passing through the $L$ blocks, a mask head projects hidden features to $S \times D$ dimensions to estimate $S$ speaker masks. The masks are applied element-wise to the stacked latents, summed across the codebook dimension, and passed to the frozen codec's decoder to reconstruct the separated raw waveforms at 8 kHz.

## Experimental setup

Evaluated on the WSJ0-2Mix dataset containing 20,000 training mixtures (30h), 5,000 validation mixtures (10h), and 3,000 test mixtures (5h) sampled at 8 kHz. Compared against SepFormer, Codecformer (DAC), and codec-passthrough baselines. Metrics include SI-SDRi, SDRi, GMACs, parameter count, PESQ, STOI, and Word Error Rate (WER) evaluated via Whisper large-v3-turbo. Trained using the AdamW optimizer with weight decay 0.01, initial learning rate of $1.5 \times 10^{-4}$ (halved after 5 epochs of validation loss plateau), batch size of 4, and negative SI-SDR loss with Permutation Invariant Training (PIT) for 200 epochs using the SpeechBrain framework.

## Results

On the WSJ0-2Mix test set, RVQ-Grid (EnCodec) achieves a headline SI-SDRi of 8.6 dB and SDRi of 10.7 dB, outperforming Codecformer (DAC) which scores 5.0 dB SI-SDRi. This represents a +3.6 dB improvement over prior codec-based separation while utilizing 11.6 GMACs (a 6x reduction compared to SepFormer's 77.3 GMACs). In downstream evaluation, RVQ-Grid (EnCodec) achieves a 3.0 PESQ, 0.91 STOI, and an 8.6% WER, closely matching the original SepFormer waveform baseline (6.0% WER) and drastically outperforming Codecformer's 30.5% WER. Ablations on RVQ depth show that increasing codebook layers from $N=4$ to $N=32$ steadily improves SI-SDRi from 4.4 dB to 8.6 dB. Bitrate evaluations demonstrate graceful degradation from 24 kbps (8.6 dB SI-SDRi) down to 12 kbps (7.5 dB), though performance drops sharply below 6 kbps due to codec bottlenecks.

| System (Codec) | Params [M] | GMACs | SI-SDRi [dB] | SDRi [dB] | WER [%] |
|---|---|---|---|---|---|
| SepFormer | 25.7 | 77.3 | 22.4 | 22.6 | 6.0 |
| Codecformer (DAC) | 17.6 | 1.5 | 5.0 | 6.2 | 30.5 |
| RVQ-Grid (DAC) | 58.3 | 6.6 | 8.1 | 9.3 | 15.8 |
| RVQ-Grid (EnCodec) | 9.6 | 11.6 | 8.6 | 10.7 | 8.6 |

## Limitations

The model relies on frozen, pre-trained neural audio codecs that were optimized for general perceptual reconstruction rather than speech separation specifically, potentially capping maximum attainable separation fidelity. The evaluation is limited to clean-to-noisy 2-speaker mixtures derived from the WSJ0 corpus at 8 kHz, leaving open performance on reverberant, multi-speaker, or higher sample-rate real-world audio. Furthermore, scaling up codebook layers and hidden dimensions increases parameter count (up to 58.3M for the DAC variant) and memory footprint.

## Why read this

Speech and ML researchers working on compressed-domain audio processing should read this to understand how explicitly preserving residual vector quantization hierarchies overcomes the limitations of single-embedding codec separation. It provides a blueprint for building efficient dual-axis recurrent separators that balance low MACs with high downstream ASR accuracy.

## Code

- https://phuongdnm.github.io/rvqgrid

## Applications

On-device speech enhancement and separation, bandwidth-efficient cloud-edge audio transmission, and preprocessing for downstream ASR systems in telecommunications.

## Institutions / 機構

Institute of Science Tokyo

**Funding / 經費:** JSPS KAKENHI

## Related

- [TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation](hu26d_interspeech.md) — same problem · relatedness 2.7/3
- [Speaker Separation via Audio Language Modeling](lanzendoerfer26b_interspeech.md) — same problem · relatedness 2.5/3
- [UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement](yan26_interspeech.md) — same problem · relatedness 2.4/3
- [MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow](shimizu26_interspeech.md) — same problem · relatedness 2.4/3
- [Latent Flow Matching Based Speech Separation Using Speaker Diarization](rubenchik26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
