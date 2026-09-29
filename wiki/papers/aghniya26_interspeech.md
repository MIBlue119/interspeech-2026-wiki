---
id: aghniya26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["National Yang Ming Chiao Tung University", "Academia Sinica"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1842
pdf: https://www.isca-archive.org/interspeech_2026/aghniya26_interspeech.pdf
---

# GRATS : A Natural Multi-Speed Mandarin Dataset for Speech Time-Scale Modification Benchmarking

*Ghaida Fathin Aghniya, Dyah A. M. G. Wisnu, Stefano Rini, Yu Tsao*

[PDF](https://www.isca-archive.org/interspeech_2026/aghniya26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aghniya26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1842)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — We introduce GRATS, the first naturally recorded parallel multi-speed Mandarin speech dataset consisting of 25 speakers across five speaking rates (0.5x to 1.5x) to benchmark speech time-scale modification (STSM). Benchmarks reveal that extreme rates degrade temporal rhythm and pitch-timing coordination, which cannot be captured by artificial time-scaling references.

## Key contributions

- Introduced the GRATS dataset: 25 speakers, 60 unique prompts, 7,500 parallel utterances totaling 8.1 hours of naturally recorded Mandarin speech across 5 controlled speaking rates (0.5x, 0.75x, 1.0x, 1.25x, 1.5x).
- Proposed a linguistically grounded evaluation protocol comparing STSM outputs directly against authentic target-rate recordings instead of artificially time-scaled references.
- Benchmarked representative classical (WSOLA, Phase Vocoder) and neural (TSMNet, ScalerGAN, CLPCNet) STSM systems using a multi-dimensional metric suite.
- Demonstrated that current STSM systems suffer from U-shaped duration errors and dropping F0 correlation at extreme rates, highlighting the necessity of tone- and alignment-aware evaluation for tonal languages.

## Problem

Evaluating Speech Time-Scale Modification (STSM) for tonal languages like Mandarin remains flawed because existing research relies on English corpora or artificially time-scaled references. Artificial scaling assumes a deterministic waveform transformation, completely failing to capture natural rate-dependent prosodic variations and fine-grained pitch-timing coordination essential for Mandarin lexical tones. Without natural multi-speed parallel data, it is impossible to determine whether STSM algorithms genuinely preserve tonal and temporal integrity under realistic speed variations.

## Method

The GRATS dataset was collected using a karaoke-style visual prompting system that guided 25 native Mandarin speakers (13 female, 12 male) to read 60 sentences at five target speeds (0.5x, 0.75x, 1.0x, 1.25x, and 1.5x). Audio was recorded in a low-noise environment via an Audio-Technica ATR2500x-USB microphone at 44.1 kHz, 16-bit PCM mono, yielding 7,500 parallel utterances (8.1 hours) without any post-processing, silence trimming, or artificial scaling.

For the evaluation benchmark, five baseline systems were configured in an inference-only setting without fine-tuning on GRATS: classical algorithms WSOLA (window=1024, hop=512) and Phase Vocoder (window=2048, hop=512, phase accumulation), alongside neural models TSMNet, ScalerGAN, and CLPCNet. The 1.0x natural recording served as the input to generate outputs at 0.5x, 0.75x, 1.25x, and 1.5x. For scoring consistency, all files were downsampled to 16 kHz mono before metric calculation.

Evaluation leverages a complementary metric suite to capture multi-dimensional performance failure modes: character error rate (CER) using a fixed Whisper medium multilingual model, perceptual and objective metrics PESQ, STOI, and non-intrusive DNSMOS, and prosodic/temporal metrics including syllable-level duration Mean Absolute Error (MAE) and WORLD-extracted F0 correlation aligned via the Montreal Forced Aligner (MFA).

## Experimental setup

Evaluated on the 8.1-hour GRATS dataset comprising 7,500 parallel Mandarin utterances across 25 speakers. Baselines compared include WSOLA, Phase Vocoder, TSMNet, ScalerGAN, and CLPCNet using official pretrained checkpoints. Metrics include CER (Whisper medium), PESQ, STOI, DNSMOS, syllable-level duration MAE (ms), and WORLD F0 correlation.

## Results

Phase Vocoder achieved the lowest CER across rates (e.g., 0.053 at 0.5x and 0.051 at 1.5x), indicating strong linguistic content preservation, whereas neural models like CLPCNet scored higher in DNSMOS and STOI (reaching up to 2.946 DNSMOS at 0.75x and 1.164 PESQ), demonstrating a disconnect between ASR transcript accuracy and human-perceived spectral quality. Duration MAE exhibited a severe U-shaped degradation pattern with peak errors at extreme rates (e.g., WSOLA hitting 188.5 ms and TSMNet hitting 207.6 ms at 0.5x), while F0 correlation dropped monotonically from slower to faster/extreme conditions (falling below 0.65 for TSMNet at 1.5x).

| System | 0.5x CER | 0.5x DNS | 0.75x CER | 0.75x DNS | 1.25x CER | 1.25x DNS | 1.5x CER | 1.5x DNS |
|---|---|---|---|---|---|---|---|---|
| WSOLA | 0.098 | 2.482 | 0.067 | 2.842 | 0.068 | 2.905 | 0.083 | 2.766 |
| Phase Vocoder | 0.053 | 2.295 | 0.046 | 2.024 | 0.048 | 1.908 | 0.051 | 1.793 |
| TSMNet | 0.072 | 1.480 | 0.056 | 1.806 | 0.097 | 1.710 | 0.160 | 1.496 |
| ScalerGAN | 0.108 | 2.426 | 0.101 | 2.713 | 0.057 | 2.982 | 0.055 | 2.859 |
| CLPCNet | 0.058 | 2.727 | 0.048 | 2.946 | 0.054 | 3.016 | 0.059 | 2.934 |

## Limitations

The GRATS dataset is restricted to read speech solely from Taiwan Mandarin speakers, leaving out conversational styles and other regional dialects or tonal languages. Objective metrics cannot fully substitute for human listening evaluations concerning speaker identity preservation, naturalness, or subjective tonal faithfulness.

## Why read this

Speech and ML engineers building or evaluating time-scale modification systems should read this to understand why artificial time-scaling references are insufficient for tonal languages. It provides the GRATS benchmark framework showing how neural and classical STSM models fail at extreme speaking rates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech playback control, computer-assisted language learning (CALL) for Mandarin, hearing assistance devices, and robust data augmentation for speech processing models.

## Institutions / 機構

National Yang Ming Chiao Tung University, Academia Sinica

**Funding / 經費:** Bio-ASP Lab at Academia Sinica, National Science and Technology Council

## Related

- [CraftTTS: Fine-Grained Prosody Control for Text-to-Speech](yang26l_interspeech.md) — complementary · relatedness 1.9/3
- [Privacy vs. Performance: Assessing Communication Utility of Anonymized Voice Features](chan26_interspeech.md) — shared technique · relatedness 1.9/3
- [Learning to Rescale: On-the-Fly Sequence Length Adaptation in Non-Autoregressive Speech Synthesis](jin26b_interspeech.md) — complementary · relatedness 1.8/3
- [Not Flat, But Dissociated: Prosodic and Segmental Divergence in Neural TTS](wang26ea_interspeech.md) — complementary · relatedness 1.8/3
- [Profiling Speech Rate Abilities of Visually Impaired Screen Reader Users by Bayesian Item Response Theory](miura26_interspeech.md) — shared data / evaluation · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
