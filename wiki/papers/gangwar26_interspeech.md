---
id: gangwar26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3393
pdf: https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.pdf
---

# HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec

[PDF](https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3393)

**TL;DR** — HybridCodec combines a dual-stream architecture with semantic distillation to achieve superior semantic disentanglement and a 3x inference speedup over existing dual-stream models without requiring an SSL model at inference.

## Problem

Existing speech discretization methods choose between semantic distillation codecs that offer fast inference but weak first-codebook semantic specialization, and dual-stream codecs that provide strong disentanglement at the cost of high latency from heavyweight SSL encoders. This creates a trade-off where multimodal large language models either sacrifice linguistic representation quality or suffer from slow inference speeds. Bridging this gap is critical for efficient, unified speech-text modeling.

## Method

HybridCodec uses a common CNN encoder operating on 24kHz audio at a 25Hz framerate, branching into separate semantic and acoustic pathways that feed a shared common decoder. The semantic stream employs a lightweight encoder and decoder with ConvNext blocks and a VQ bottleneck, using an L2 distillation loss against 16th-layer w2v-BERT-2.0 embeddings to inject linguistic knowledge without requiring the SSL model during inference. The acoustic stream subtracts the semantic decoder output from the common encoder latents to ensure residual modeling, utilizing residual vector quantization (RVQ) with 11 remaining codebooks and RVQ dropout. Training incorporates multi-scale Mel-spectrogram loss, distillation loss, quantization/commitment losses, and adversarial/feature matching losses from multi-period and multi-scale STFT discriminators.

## Results

Evaluated on LibriSpeech test-clean, SeedTTS-en (out-of-domain), and Common Voice French (zero-shot cross-lingual) using Word Error Rate (WER), UTMOS, PESQ, and ECAPA-TDNN Speaker Similarity (SSIM). At 60k updates on LibriSpeech, the full HC-SED-AED variant achieves a superior RVQ-1 WER of 15.36% (outperforming DualCodec at 18.93% and DAC Distill at 21.54%), while scaling training to 300k updates further reduces RVQ-1 WER to 12.96%. It attains an inference RTF of 0.014 on an NVIDIA RTX A6000, representing a 3x speedup compared to DualCodec's 0.042 RTF. Ablations across HC-SE, HC-SED, and HC-SED-AED show that adding the acoustic stream maximizes semantic purity at a slight cost to acoustic metrics, whereas HC-SED offers a stronger balance for acoustic fidelity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing multimodal large language models, text-to-speech, and spoken language systems requiring high-performance speech tokenization.

## Limitations

Full semantic disentanglement via the acoustic residual stream yields a slight reduction in absolute acoustic fidelity metrics (PESQ/SSIM) compared to balanced or single-stream variants.

## Related

- (link related pages by id as the wiki grows)
