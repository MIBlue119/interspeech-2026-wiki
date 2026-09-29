---
id: poncelet26_interspeech
category: asr
labels: [self-supervised]
institutions: ["KU Leuven"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1039
pdf: https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.pdf
---

# Speech Encoder Fusion for LLM-based Automatic Speech Recognition

*Jakob Poncelet, Hugo Van hamme*

[PDF](https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poncelet26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1039)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates fusing multiple pre-trained acoustic encoders via learned gates and transformer layers to enhance speech-aware large language models for automatic speech recognition, achieving lower word error rates than single-encoder baselines with minimal computational overhead.

## Key contributions

- Evaluates five distinct fusion architectures (feature concatenation, sigmoid gate, multi-head gate, positional transformer, temporal transformer) for combining multiple parallel speech encoders.
- Demonstrates consistent improvements across mono- and multilingual ASR settings (Dutch and English) by leveraging complementary encoder strengths.
- Applies encoder fusion to diarized speech recognition by combining an ASR encoder with an ECAPA speaker encoder, significantly reducing Speaker-Attributed WER and speaker confusion.
- Analyzes a two-stage training recipe incorporating pre-trained ASR decoder hypotheses into the LLM prompt alongside fused speech features.

## Problem

Speech-aware LLMs rely heavily on a single pre-trained acoustic encoder to project audio into the LLM's embedding space, bottlenecking performance on domain-specific or low-resource tasks due to individual encoder blind spots. Prior multi-encoder works largely rely on naive feature concatenation or summing, failing to dynamically weight complementary encoder outputs across different linguistic or acoustic contexts. Furthermore, generating and combining multiple autoregressive ASR decoder outputs inside an LLM is computationally heavy, motivating lightweight parallel encoder-level fusion.

## Method

The architecture takes feature outputs from multiple pre-trained speech encoders (e.g., Whisper-large-v3, NeLF, Wav2Vec2) and resamples them to a uniform sequence length of 16.7 Hz via frame stacking (or frame averaging for speaker encoders). The outputs are combined using one of several fusion layers prior to being projected via a 2-layer MLP (inner dimension 2048, ReLU) into the LLM embedding space. Simple feature concatenation merges streams along the feature dimension statically. The sigmoid gate projects streams linearly and combines them using frame-specific gating weights derived from a linear projection and sigmoid/softmax. The multi-head gate applies Multi-Head Attention (4 heads) independently at each time step across encoder streams (treating the number of encoders as the sequence length), enabling heads to dynamically allocate encoder contributions per frame. The positional transformer concatenates features channel-wise and passes them through a Transformer encoder, while the temporal transformer interleaves streams along the time dimension (sequence length 2*T) followed by a Transformer encoder and mean pooling.

Models are trained using QLoRA (rank 4, alpha 16, dropout 0.05) on all linear mappings with 4-bit quantization of the base LLMs (Tweety-7B for Dutch, Llama-3.1-8B for English/multilingual). Training uses the 8-bit Adam optimizer with an effective batch size of 128 utterances, linear decaying learning rate peaking at 5e-5 with 10% warm-up, for a maximum of 5 epochs. The setup trains approximately 30M parameters in total (fusion layer, projector, and LoRA adapters) while keeping the speech encoders frozen.

## Experimental setup

Experiments use the Spoken Dutch Corpus (CGN) comprising 240 hours of Belgian Dutch data (evaluated on 8h clean and 6h other test sets), LibriSpeech with 960 hours for English, and a combined 360h subset for multilingual training. Diarized evaluations use a multi-speaker subset of CGN (up to 4 speakers, 40% multi-speaker utterances). Baselines include single-encoder Whisper, monolingual NeLF/Wav2Vec2 models, standard feature concatenation, and gated cross-attention. Metrics include normalized Word Error Rates (WER), Speaker-Attributed WER (SA-WER), and Speaker Confusion (Spk-Conf).

## Results

For Dutch monolingual ASR using Tweety-7B, the temporal transformer fusion of Whisper and NeLF reduces WER to 6.8% (clean) and 8.3% (other), outperforming Whisper alone (8.3% / 11.5%) and NeLF alone (7.5% / 9.0%). For English monolingual ASR with Llama-3.1-8B, sigmoid gating combining Whisper and Wav2Vec2-FT achieves 2.8% clean and 5.5% other WER, beating Whisper alone (3.2% / 6.4%). In multilingual joint training, multi-head gating achieves 6.5% (NL) and 2.5% (EN), outperforming concatenation (7.1% NL / 3.9% EN). For diarized speech recognition, temporal transformer fusion of NeLF and ECAPA drops SA-WER to 18.1% (from 24.7% baseline) and speaker confusion to 3.6%.

| Encoder(s) & Fusion mode | WER clean (NL) | WER other (NL) | SA-WER (Diarized) |
|---|---|---|---|
| Whisper (Baseline) | 8.3 | 11.5 | - |
| NeLF (Baseline) | 7.5 | 9.0 | 24.7 |
| Concat | 7.2 | 8.9 | 21.4 |
| Sigmoid gate | 7.1 | 8.4 | 23.4 |
| Temporal Transf. | 6.8 | 8.3 | 18.1 |

## Limitations

The study is restricted to short-form speech recognition and evaluated on a limited set of languages (Dutch and English). Computational constraints necessitated 4-bit quantization and low LoRA ranks (rank 4), which may limit absolute performance ceilings compared to full-precision, unquantized large-scale runs. Furthermore, downstream gains depend heavily on the availability and complementarity of pre-trained encoders for the target language or domain.

## Why read this

Speech and ML researchers building multimodal LLMs will find this paper a practical blueprint for cheaply exploiting complementary features from multiple pre-trained acoustic encoders without scaling LLM sequence lengths.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual automatic speech recognition, speaker-attributed diarized transcription, and robust voice command processing systems.

## Institutions / 機構

KU Leuven

**Funding / 經費:** Research Foundation Flanders, Flemish Government, Flanders AI Research Program

## Related

- [WQ-Fusion: Dynamic Gated Attention for Cross-Domain Audio Representation](lin26n_interspeech.md) — shared technique · relatedness 2.6/3
- [Adapting Text LLMs to Speech via Multimodal Depth Up-Scaling](yano26_interspeech.md) — same problem · relatedness 2.4/3
- [LLM-as-Joiner: Decoupling Alignment from Language Modeling in Label-synchronous ASR](lee26u_interspeech.md) — same problem · relatedness 2.4/3
- [Dual-Encoder Fusion with Explicit and Implicit Injection for the Interspeech 2026 Audio Encoder Capability Challenge](zhang26d_interspeech.md) — shared technique · relatedness 2.4/3
- [Refining the Latent Bridge: Superior ASR Performance via Adapter-Only Alignment with Diffusion LLMs](bhooi26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
