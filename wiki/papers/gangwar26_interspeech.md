---
id: gangwar26_interspeech
category: speech-coding
labels: [efficient-on-device, self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3393
pdf: https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.pdf
---

# HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec

*Arjun Gangwar, S Umesh*

[PDF](https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gangwar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3393)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `self-supervised`, `generative-model`

**TL;DR** — HybridCodec combines a dual-stream neural audio codec with semantic distillation from a frozen SSL model during training, eliminating heavyweight SSL encoders at inference while achieving superior RVQ-1 semantic specialization and a 3x speedup over DualCodec.

## Key contributions

- Proposes HybridCodec, a unified architecture that integrates a dual-stream design with semantic distillation to achieve strong semantic-acoustic disentanglement without requiring an SSL model during inference.
- Systemematically compares semantic-acoustic disentanglement paradigms across in-domain (LibriSpeech), out-of-domain (SeedTTS-en), and zero-shot cross-lingual (Common Voice French) settings.
- Achieves a 3x inference speedup (RTF 0.014) over DualCodec while outperforming existing distillation baselines on RVQ-1 Word Error Rate (15.36% on Test Clean at 60k updates).
- Analyzes the impact of extended training up to 300k steps and provides architectural ablations (HC-SE, HC-SED, HC-SED-AED) balancing intelligibility and reconstruction fidelity.

## Problem

Neural audio codecs used as speech tokenizers in Multimodal Large Language Models require clear disentanglement between semantic (linguistic) and acoustic (speaker, prosody) information. Prior dual-stream approaches like DualCodec achieve great semantic separation but suffer from high inference latency due to running a large 600M-parameter SSL encoder at runtime. Conversely, distillation-based codecs like DAC (Distill) offer fast inference by injecting SSL supervision into the first RVQ codebook, but exhibit weaker semantic specialization in the first codebook. HybridCodec solves this tension to provide both low latency and high semantic purity.

## Method

HybridCodec processes 24 kHz raw audio through a common CNN encoder downsampling by a factor of 960 to a 25 Hz framerate. The latents branch into separate semantic and acoustic streams, each containing 5 causal ConvNext blocks. The semantic stream generates RVQ-1 codes (codebook size 16,384) and a semantic decoder whose output is optimized via MSE loss against 25 Hz downsampled embeddings from the 16th layer of a frozen w2v-BERT-2.0 model. The acoustic stream subtracts the semantic decoder's output from the common encoder latents to enforce disentanglement, followed by an RVQ module with N-1 codebooks (size 1024 each) using RVQ dropout during training.

The training objective combines a multi-scale Mel-spectrogram reconstruction loss (Lspec), semantic distillation loss (Ldistill, weighted lambda_d=15.0), quantization codebook and commitment losses, adversarial loss using Multi-Period (MPD) and Multi-Scale STFT (MS-STFTD) discriminators, and feature matching loss (lambda_f=2.0). Total training uses lambda_s=15.0 and lambda_g=1.0, with commitment weights lambda_m=0.25. The entire SSL model is stripped away at inference time, yielding a model size of 159.62M parameters.

## Experimental setup

Models are trained from scratch on the full 960-hour LibriSpeech corpus resampled to 24 kHz, using random 3-second audio crops for 60k to 300k steps on a cluster of 4 NVIDIA RTX A6000 (48GB) GPUs. Baselines include DAC, DAC (Distill), and DualCodec retrained under identical conditions, alongside open-source checkpoints for Mimi and DualCodec. Evaluation metrics include Word Error Rate (WER) using Whisper v3-large, Speaker Similarity (SSIM) via ECAPA-TDNN, UTMOS, PESQ, Real-Time Factor (RTF), and throughput (samples/sec) measured across LibriSpeech test-clean, SeedTTS-en, and Common Voice French.

## Results

At 60k updates on LibriSpeech Test Clean, the full HC-SED-AED variant achieves the lowest RVQ-1 WER of 15.36%, outperforming DualCodec (18.93%) and DAC (Distill) (21.54%). As quantizers increase to RVQ-1:12, its WER drops to 4.46%, remaining competitive with DAC (Distill) (4.39%) and DualCodec (4.80%). Scaling training to 300k updates further reduces RVQ-1 WER to 12.96% and RVQ-1:12 WER to 3.63% on Test Clean.

In out-of-domain and zero-shot settings (SeedTTS-en and CV-French), HC-SED-AED maintains robust performance, securing competitive RVQ-1 WER (30.37% on SeedTTS-en) and improving over DAC (Distill) on CV-French (106.41% vs 112.56%). In terms of efficiency, HC-SED-AED achieves an RTF of 0.014 (a 3x speedup over DualCodec's 0.042) and a throughput of 348.75 samples/sec. The model does not win on raw acoustic metrics like PESQ or SSIM when compared to unconstrained or single-stream baselines, as the aggressive semantic bottleneck trades off minor acoustic fidelity for purity.

| Model | RVQ-1 WER ↓ | RVQ-1:12 WER ↓ | SSIM ↑ | UTMOS ↑ | PESQ ↑ | RTF ↓ |
|---|---|---|---|---|---|---|
| DAC | 43.22 | 4.55 | 0.60 | 3.51 | 2.36 | - |
| DAC (Distill) | 21.54 | 4.39 | 0.62 | 3.53 | 2.37 | 0.005 |
| DualCodec | 18.93 | 4.80 | 0.61 | 3.45 | 2.31 | 0.042 |
| HC-SED-AED (Ours) | 15.36 | 4.46 | 0.58 | 3.44 | 2.27 | 0.014 |

## Limitations

The evaluation focuses primarily on English (LibriSpeech, SeedTTS) and one zero-shot language (French), leaving low-resource or tonal languages untested. The model trades away a fraction of acoustic reconstruction fidelity (lower PESQ and SSIM) in exchange for semantic disentanglement. Compute scale was limited to 960 hours of training data and 300k optimization steps, leaving data scaling properties open.

## Why read this

Speech researchers and MLLM engineers building unified speech-text models should read this to learn how to combine dual-stream semantic disentanglement with distillation, achieving robust tokenization without runtime SSL overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal Large Language Models, speech tokenization, text-to-speech, and zero-shot cross-lingual speech generation.

## Institutions / 機構

Indian Institute of Technology, Madras

## Related

- (link related pages by id as the wiki grows)
