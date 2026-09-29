---
id: yen26_interspeech
category: asr
labels: [efficient-on-device, generative-model]
institutions: ["Georgia Institute of Technology", "Universita degli Studi di Palermo", "NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-488
pdf: https://www.isca-archive.org/interspeech_2026/yen26_interspeech.pdf
---

# MDM-ASR: Bridging Accuracy and Efficiency in ASR with Diffusion-Based Non-Autoregressive Decoding

*Hao Yen, Pin-Jui Ku, Ante Jukić, Sabato Marco Siniscalchi*

[PDF](https://www.isca-archive.org/interspeech_2026/yen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-488)

**Category:** `asr` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — MDM-ASR introduces an audio-conditioned masked diffusion non-autoregressive (NAR) decoding framework for ASR, achieving a 1B parameter model that outperforms prior NAR models and matches strong autoregressive baselines with a ~4.1x speedup in RTFx over prior diffusion models.

## Key contributions

- Replaces conventional left-to-right autoregressive decoding in standard encoder-decoder ASR with a bidirectional Transformer diffusion decoder using non-causal self-attention for parallel token updates.
- Formulates the ASR objective under a discrete diffusion framework with noise-dependent reweighting, providing a principled multi-step generative interpretation without ad-hoc objectives.
- Proposes Iterative Self-Correction Training (ISCT) to expose the model to its own self-generated intermediate predictions during training, minimizing the training-inference mismatch.
- Introduces the Position-Biased Entropy-Bounded Confidence (PBEB-Conf) sampler, combining positional trajectory priors with adaptive entropy budgeting for efficient and stable decoding.

## Problem

Autoregressive (AR) ASR models provide high accuracy but suffer from slow, linear-time sequential decoding, whereas prior non-autoregressive (NAR) methods either degrade significantly in performance or rely on complex alignments and auxiliary modules. Prior diffusion- and flow-matching-based ASR approaches (such as Transfusion, Whisfusion, FFDM, and Drax) exhibit large WER gaps compared to AR models, lack extensive evaluation, or introduce complicated training pipelines. Closing this gap while maintaining parallel decoding efficiency is vital for scaling real-time speech recognition.

## Method

The architecture builds directly upon the pre-trained Canary-1b-flash encoder-decoder backbone (approx. 1B parameters), replacing the causal decoder self-attention mask with a non-causal self-attention mask to consume both full acoustic embeddings (via cross-attention) and partially masked text transcripts simultaneously. The forward corruption process replaces target tokens independently with a [MASK] state according to a linear noise schedule $\alpha_t = 1 - t$. The discrete diffusion training objective incorporates noise-dependent reweighting ($\frac{1 - \alpha_t'}{\alpha_t}$) derived from the forward process, training the network to directly reconstruct clean tokens at masked positions while unmasked positions incur no loss.

To bridge the training-inference mismatch, Iterative Self-Correction Training (ISCT) simulates multi-step decoding during training by taking a ground-truth transcript, corrupting it at timestep $t_1$, generating a preliminary prediction, re-corrupting that prediction at timestep $t_2$, and adding a secondary cross-entropy loss term for the refined output. At inference, the model uses a maximum sequence length of 256 tokens and stops generation at the first EOS token.

For inference sampling, the paper evaluates random unmasking, discrete flow-matching (DFM), Confidence Top-$K$, Entropy-Bounded Confidence (EB-Conf), and the proposed Position-Biased EB-Conf (PBEB-Conf). PBEB-Conf computes confidence scores $c_i$ for masked positions, weights them with a positional bias term $P_i = e^{-\lambda i}$ ($\lambda = 0.2$) to prioritize earlier tokens, and adaptively unmasks positions whose cumulative entropies satisfy an entropy budget threshold ($\gamma = 0.05$) up to a maximum of 32 function evaluations (NFEs).

## Experimental setup

Evaluated on four English benchmarks: LibriSpeech (960h train, 10.74h test), Earnings22 (105h train, 5.43h test), AMI (78h train, 8.54h test), and VoxPopuli (523h train, 4.93h test); plus multilingual MLS (German, Spanish, French; ~4,000h total train). Compared against autoregressive baselines (Whisper-large-v3, OWSM-v3.1, Canary-1b-flash, Phi-4-multimodal, Qwen2-Audio, Voxtral-Mini), CTC baselines (OWSM-CTC, Parakeet-CTC, XLSR-53), and generative NAR baselines (TransFusion, Whisfusion, FFDM, Drax). Metrics are Word Error Rate (WER) using Whisper Normalization and RTFx (inverse real-time factor) measured on a single NVIDIA A100 GPU using full-precision inference with batch size 1.

## Results

MDM-ASR achieves an average WER of 6.9% across the five English benchmarks, outperforming Canary-1b-flash (7.2%), OWSM-v3.1 (10.3%), and the previous best generative NAR model Drax (9.2%). On LibriSpeech test-clean and test-other, it scores 1.8% and 3.6% WER respectively, representing a 31% relative error reduction on clean and 37% on other compared to Drax (2.6% and 5.7%). On Earnings22, AMI, and VoxPopuli, it scores 10.7%, 12.2%, and 6.0% WER. For multilingual MLS, it attains 3.6% (DE), 2.9% (ES), and 3.8% (FR) WER, outperforming Whisper-large-v3 on Spanish (2.9% vs 3.0%) and French (3.8% vs 4.8%). In efficiency, MDM-ASR delivers an RTFx of 46.81, yielding a ~3.6x speedup over Whisper and ~4.1x speedup over Drax (11.32 RTFx). Ablations show that the PBEB-Conf sampler outperforms random unmasking and DFM across all datasets, and ISCT provides clear WER gains especially under tight computational budgets (low NFEs).

| System | LS Clean | LS Other | Earnings22 | AMI | VoxPopuli | Avg. WER | RTFx |
|---|---|---|---|---|---|---|---|
| Whisper-large-v3 | 2.0 | 3.9 | 11.3 | 16.0 | 9.5 | 8.5 | 12.83 |
| Canary-1b-flash | 1.5 | 2.9 | 12.8 | 13.1 | 5.6 | 7.2 | 29.25 |
| Drax | 2.6 | 5.7 | 15.2 | 13.9 | 8.6 | 9.2 | 11.32 |
| MDM-ASR (ours) | 1.8 | 3.6 | 10.7 | 12.2 | 6.0 | 6.9 | 46.81 |

## Limitations

The evaluation is restricted to a selected subset of publicly available datasets and languages (English, German, Spanish, French), leaving open questions regarding scaling to hundreds of languages or noisy real-world domains. The exploration is constrained to a single pre-trained encoder architecture (Canary-1b-flash) and a two-step ISCT configuration, without investigating alternative adaptive masking schedules or multi-step ISCT variants.

## Why read this

Speech and ML engineers building non-autoregressive speech recognition systems should read this paper to see how masked discrete diffusion can successfully bridge the accuracy gap with large autoregressive models while preserving parallel decoding speed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech transcription, interactive voice assistants, and low-latency multilingual automatic speech recognition.

## Institutions / 機構

Georgia Institute of Technology, Universita degli Studi di Palermo, NVIDIA

## Related

- [Diffusion Language Models for Speech Recognition](naveriani26_interspeech.md) — same problem · relatedness 2.9/3
- [Refining the Latent Bridge: Superior ASR Performance via Adapter-Only Alignment with Diffusion LLMs](bhooi26_interspeech.md) — same problem · relatedness 2.9/3
- [Non-Autoregressive Minimum Bayes' Risk Decoding for Fast Speech Recognition](deguchi26_interspeech.md) — same problem · relatedness 2.6/3
- [Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding](wu26g_interspeech.md) — same problem · relatedness 2.5/3
- [Self-Speculative Decoding for LLM-based ASR with CTC Encoder Drafts](saon26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
