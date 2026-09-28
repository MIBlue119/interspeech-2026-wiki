---
id: li26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-301
pdf: https://www.isca-archive.org/interspeech_2026/li26c_interspeech.pdf
---

# MSR-Codec: A Low-Bitrate Multi-Stream Residual Codec for High-Fidelity Speech Generation with Information Disentanglement

*Jingyu Li, Guangyan Zhang, Zhen Ye, Yiwen Guo*

[PDF](https://www.isca-archive.org/interspeech_2026/li26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-301)

**TL;DR** — MSR-Codec introduces a multi-stream residual neural audio codec that factorizes speech into semantic, timbre, prosody, and residual streams at low bitrates (424-612 bps), enabling a lightweight 0.2B two-stage TTS model that outperforms larger models in speaker similarity while running significantly faster.

## Key contributions

- A cascaded, multi-stream audio codec architecture that implicitly achieves information disentanglement into semantic, timbre, prosody, and fine-grained residual streams without complex adversarial enforcement.
- A compression factor exceeding 200x operating at a temporal frame rate of 62.5 tokens per second (with base semantic at 25Hz and residual/prosody paths interacting efficiently).
- A two-stage autoregressive TTS model (0.2B parameters) that decouples semantic token prediction from acoustic/prosodic detail generation, achieving superior speaker similarity on only 45k hours of training data.
- Demonstrated zero-shot voice conversion capabilities allowing independent manipulation and disentangled transfer of speaker timbre and prosody.

## Problem

Modern neural audio codecs like SoundStream and Encodec use Residual Vector Quantization (RVQ) over stacked convolutions, yielding high bitrates (6kbps+) that strain downstream LLMs and storage. Prior disentanglement strategies either rely on unstable adversarial mechanisms or fail to isolate attributes cleanly. This paper addresses the lack of an efficient, factorized representation that can simultaneously compress speech aggressively, maintain high reconstruction fidelity, and support precise attribute control for generation tasks.

## Method

The MSR-Codec architecture processes input Mel-spectrograms through a progressive, cascaded pipeline. The foundation layer combines an $l_2$-normalized invariant speaker embedding extracted via a frozen CAM++ network with 25Hz semantic tokens from a frozen Hubert model (using 500 codebook centers). These are fused via cross-attention in Dec1 and downsampled to 12.5Hz. Prosody is captured at 12.5Hz by passing Mel-spectrograms through two sequential encoders (Enc1 at 25Hz, Enc2 at 12.5Hz); the residual difference between Enc2 and Dec1 is quantized via codebook VQ1 (sizes ranging from 64 to 512 entries). Explicit supervision is applied to VQ1 via an auxiliary MSE predictor targeting $F_0$ and spectral energy extracted via textlesslib. The resulting prosody features are element-wise added to the base stream.

A fine-grained residual stream captures high-frequency acoustic details at 25Hz by computing the difference between Enc1 output and the upsampled prosody-enhanced stream, quantized using codebook VQ2 (sizes from 32 to 2048 entries). The final representation is summed and passed to a 3-layer decoder (Dec3) and a pre-trained 16kHz FreGAN vocoder. Training utilizes a combination of reconstruction loss ($L_{recon}$, combining $l_1$ and $l_2$ distances on final and intermediate decoder outputs), adversarial loss ($L_{adv}$ via a discriminator), and prosody prediction loss ($L_{prosody}$). 

The downstream TTS system uses a ByT5-small tokenizer and a 6-layer text encoder (768-dim) coupled with a two-stage autoregressive decoder structure. Stage 1 employs an 18-layer Semantic Decoder operating at 12.5Hz to predict primary features that split into two 25Hz semantic tokens. Stage 2 utilizes a smaller 3-layer Acoustic Decoder that conditions on semantic outputs to predict prosody and residual tokens autoregressively.

## Experimental setup

The codec training data combined MLS (English), Wenetspeech, Textrolspeech, Aishell 1 & 2, CNCeleb 1 & 2, and VoxCeleb 1 & 2 (totaling significantly larger scale), while the TTS model was trained exclusively on MLS-en, LibriTTS, and VCTK (45 hours total). Audio was resampled to 16kHz and transformed into 80-dimensional Mel-spectrograms using a 25ms window and 10ms hop. Evaluations used the LibriSpeech test set for reconstruction and Seed-TTS-eval for zero-shot TTS. Baselines included SpeechTokenizer, X-codec, SemantiCodec, WavTokenizer, Single-Codec, FireRedTTS, CosyVoice2, and Llasa-1B-250k. Metrics comprise STOI, PESQ (NB/WB), UTMOS, WavLM-large speaker similarity (SIM), Whisper-large-v3 WER, and Real-Time Factor (RTF).

## Results

MSR-Codec-612 achieves a state-of-the-art STOI of 0.90 and a speaker similarity (SIM) of 0.83 on speech reconstruction at a low bitrate of 612 bps (62.5 tokens per second), outperforming codecs like SpeechTokenizer and WavTokenizer. In zero-shot TTS, the proposed 0.2B parameter model trained on just 45 hours achieves a WER of 3.07 and SIM of 0.613, outperforming 0.4B–1B parameter models trained on up to 250k hours (such as FireRedTTS and Llasa-1B) while running with the fastest RTF of 0.67. In voice conversion evaluations, the model successfully separates timbre and prosody, yielding high target speaker similarity ($SIM_{tar} = 0.55$) and precise prosody transfer with minimal source-timbre leakage.

Where it does not win: Signal-level objective metrics such as low-bitrate PESQ-NB/WB remain challenging for ultra-low bitrate tokenizers compared to high-bitrate streaming baselines like X-codec.

| Model | Model Size | Data Size | WER $\downarrow$ | SIM $\uparrow$ | RTF $\downarrow$ |
|---|---|---|---|---|---|
| Ori. speech | - | - | 2.14 | 0.722 | - |
| FireRedTTS | 0.4B | 150k hrs | 3.82 | 0.460 | 1.48 |
| CosyVoice2 | 0.5B | 167k hrs | 2.57 | 0.652 | 2.34 |
| Llasa-1B-250k | 1B | 250k hrs | 3.22 | 0.572 | 0.91 |
| MSR-Codec-524 | 0.2B | 45k hrs | 3.07 | 0.613 | 0.67 |

## Limitations

The evaluation relies heavily on English datasets (LibriSpeech, Seed-TTS English, VCTK), leaving multilingual scalability unverified in this scope. The system depends on frozen external pre-trained representations (Hubert, CAM++, textlesslib $F_0$ extraction) which could create bottlenecks or error propagation. Furthermore, compute resource constraints limit the ablation depth across extreme codebook size permutations beyond the three tested bitrates.

## Why read this

Speech and ML engineers building low-bitrate generative speech models should read this to learn how cascaded multi-stream residual quantization can replace complex adversarial disentanglement while enabling fast, high-similarity TTS.

## Code

- https://github.com/herbertLJY/MSRCodec

## Applications

Low-bitrate speech transmission, zero-shot text-to-speech generation, and disentangled voice or prosody conversion.

## Related

- (link related pages by id as the wiki grows)
