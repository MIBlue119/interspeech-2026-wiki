---
id: jiang26h_interspeech
category: speech-coding
labels: [generative-model]
institutions: ["University of Science and Technology of China", "iFLYTEK", "Tsinghua University"]
code: https://pb20000090.github.io/P2PSynCodec/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3506
pdf: https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.pdf
---

# An Ultra-Low-Bitrate Neural Speech Codec with Plain-to-Pseudo Synergistic Vector Quantization

*Xiao-Hang Jiang, Yang Ai, Fei Liu, Rui-Chen Zheng, Jian-Qing Gao, Zhen-Hua Ling, Ji Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3506)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — P2PSynCodec is an ultra-low-bitrate neural speech codec that uses a plain-to-pseudo synergistic vector quantizer (P2PSVQ) to transmit a single basic token while using decoder-side neural predictors to generate zero-bitrate auxiliary tokens, matching the quality of 2.0 kbps codecs at just 0.5 kbps.

## Key contributions

- Proposes P2PSVQ, replacing standard high-bitrate residual vector quantization with one plain VQ (transferred/transmitted) and N pseudo VQs (predicted at the decoder with zero bitrate cost).
- Uses a modified ConvNeXt v2 backbone operating on MDCT spectra with a temporal downsampling factor of D=320, yielding 50 tokens/sec at 16 kHz.
- Formulates a two-stage training strategy: first training an RVQ teacher codec (equivalent to MDCTCodec), then supervising pseudo VQs using teacher-forcing and cross-entropy loss.
- Achieves 75% bitrate reduction, operating at 0.5 kbps (16 kHz) and 1.5 kbps (48 kHz) while scoring competitively against much larger models like BigCodec and standard baselines at 2.0 kbps.

## Problem

Traditional neural speech codecs rely heavily on residual vector quantization (RVQ) (e.g., SoundStream, EnCodec, DAC) or finite scalar quantization (SQCodec) to compress representations, but scaling down bitrates below 1.0 kbps causes severe quality degradation. Alternative high-capacity single-codebook approaches like BigCodec and WavTokenizer maintain quality at low bitrates only by dramatically scaling up model size and computational complexity, making them impractical for edge deployment. P2PSynCodec addresses this gap by increasing quantization-level efficiency without massive architectural bloating, making ultra-low-bitrate speech compression viable for satellite, IoT, and on-device storage applications.

## Method

P2PSynCodec processes speech by first extracting Modified Discrete Cosine Transform (MDCT) spectra, which are compressed using a fully convolutional encoder based on a modified ConvNeXt v2 network. Each residual block in the ConvNeXt backbone comprises a 1D depthwise convolution, layer normalization, a linear projection, global response normalization (GRN), and a GELU activation, bounded by input/output 1D convolutions and a temporal downsampling layer (downsampling factor D=320). The decoder mirrors this structure via upsampling to reconstruct MDCT spectra, converted back to waveforms via inverse MDCT (IMDCT).

The core innovation is the Plain-to-Pseudo Synergistic Vector Quantizer (P2PSVQ), which consists of one plain VQ (Q_pl) and N pseudo VQs (Q_ps^1 to Q_ps^N). The plain VQ discretizes the K-dimensional encoder output vector e (dimension K=32, codebook size M_pl=1024) into a basic token d_pl via minimum Euclidean distance lookup, which is the only token transmitted and contributing to the bitrate calculation (yielding 0.5 kbps at 16 kHz and 1.5 kbps at 48 kHz). To recover high-bitrate expressiveness without increasing bitrate, N pseudo VQs (set to N=3) predict auxiliary tokens at the decoder side. Each pseudo VQ takes the plain token and previously generated auxiliary tokens, passing them through a neural network (NN_ps) consisting of 3 Conformer blocks (256 channels, 8 attention heads) and 2 BiLSTM layers (256 channels) to output an intermediate feature vector, from which the maximum logit index yields the predicted auxiliary token via codebook lookup. The final quantized vector e_hat is the sum of lookups from the plain VQ and all pseudo VQs.

Training follows a two-stage strategy. In Stage 1, an RVQ-based teacher codec with N+1 plain VQs (equivalent to MDCTCodec) is trained using standard adversarial, codebook, and spectral losses. In Stage 2, the encoder, decoder, and plain VQ are frozen, and the N pseudo VQs are trained independently using a teacher-forcing strategy. The target probability distribution is derived via one-hot encoding of the teacher codec's ground-truth auxiliary tokens, optimized using cross-entropy loss against the predicted probability distributions.

## Experimental setup

Experiments use LibriTTS (16 kHz, using train-clean-100 and train-clean-360 for training, dev-clean for validation, and test-clean for evaluation) and VCTK (48 kHz, 40,936 training utterances, 2,937 test utterances). Baselines include MDCTCodec, DAC, BigCodec, WavTokenizer, and SQCodec. Metrics include UTMOS and SIGMOS (non-intrusive quality), STOI and ViSQOL (intrusive intelligibility/quality), FLOPs, parameter count, MUSHRA, and ABX preference tests evaluated by native English listeners. Model uses N=3 pseudo VQs, codebook size M=1024, vector dimension K=32, and downsampling rate D=320.

## Results

P2PSynCodec at 0.5 kbps achieves a UTMOS score of 3.947 on LibriTTS, outperforming MDCTCodec (2.670), DAC (2.725), and WavTokenizer (3.269), and performing comparably to BigCodec (3.939) while using only 5% of its FLOPs (3.31G vs 61.03G) and 14% of its parameters (22.99M vs 159.32M). At 48 kHz (1.5 kbps), it achieves a SIGMOS of 3.305, exceeding MDCTCodec (2.846), DAC (2.971), WavTokenizer (3.232), and BigCodec (3.277). Subjective ABX tests confirm no statistically significant preference difference (p > 0.01) between P2PSynCodec at 0.5 kbps and baseline codecs running at 4.0x higher bitrates (2.0 kbps for MDCTCodec, DAC, WavTokenizer; 1.5 kbps for SQCodec), validating a 75% bitrate reduction. 

Ablations on the number of pseudo VQs N demonstrate that performance peaks at N=3. Increasing N to 5 or 7 degrades objective metrics (e.g., UTMOS drops from 3.947 at N=3 to 3.889 at N=7) because a larger N starves the plain VQ of information, making subsequent autoregressive pseudo-token predictions excessively difficult.

| System | Bitrate | UTMOS (16k) | SIGMOS (48k) | FLOPs | Params |
|---|---|---|---|---|---|
| MDCTCodec | 0.5 / 1.5 kbps | 2.670 | 2.846 | 2.32G | 6.75M |
| DAC | 0.5 / 1.5 kbps | 2.725 | 2.971 | 55.53G | 73.87M |
| BigCodec | 0.5 / 1.5 kbps | 3.939 | 3.277 | 61.03G | 159.32M |
| WavTokenizer | 0.5 / 1.5 kbps | 3.269 | 3.232 | 4.21G | 71.65M |
| P2PSynCodec | 0.5 / 1.5 kbps | 3.947 | 3.305 | 3.31G | 22.99M |

## Limitations

The architecture currently employs non-causal convolutional and bidirectional LSTM layers, making it unsuitable for real-time streaming applications without architectural modifications. The evaluation is restricted to English corpora (LibriTTS and VCTK), leaving multi-lingual robustness unverified. Additionally, setting the number of pseudo VQs too high destabilizes training and hurts reconstruction quality due to information starvation in the plain VQ.

## Why read this

Speech and audio compression researchers targeting ultra-low bandwidth settings should read this paper to learn how auxiliary token prediction can bypass RVQ bottlenecks without inflating encoder-decoder backbone capacity.

## Code

- https://pb20000090.github.io/P2PSynCodec/

## Applications

Satellite communications, emergency radio links, IoT voice interfaces, and extreme on-device audio storage.

## Institutions / 機構

University of Science and Technology of China, iFLYTEK, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
