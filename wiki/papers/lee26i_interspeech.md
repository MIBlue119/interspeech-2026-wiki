---
id: lee26i_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-932
pdf: https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.pdf
---

# Designed Vocalizations Dataset: Sound-Designed Human and Animal Voices for Non-human Voice Conversion

*Seolhee Lee, Minsu Kang, Yangsun Lee, Woosun Min, Choonghyeon Lee, Namhyun Cho*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-932)

**TL;DR** — The paper introduces the Designed Vocalizations Dataset, a public resource of 231,800 paired and non-paired sound-designed audio samples, along with a benchmark for human-to-non-human voice conversion (H2NH-VC). Using a CVAE-based baseline, the authors establish standardized seen/unseen splits over source timbres and professional DSP preset styles, yielding MOS scores between 3.49 and 3.81.

## Key contributions

- Introduces the first public Designed Vocalizations Dataset containing 5,774 raw sources and 231,800 designed variants processed via professional DSP chains.
- Provides a standardized test set of 5,640 (source, reference) pairs with explicit seen/unseen splits across both source timbres and sound-design preset styles.
- Releases comprehensive metadata including preset-level effect summaries for built-in presets and full effect-chain structures with parameter configurations for in-house presets.
- Establishes a rigorous baseline benchmark using a modified CVAE voice conversion architecture evaluated across four systematic generalization scenarios.

## Problem

Prior research in human-to-non-human voice conversion (H2NH-VC) relies heavily on internal, private datasets and inconsistent evaluation protocols, hindering reproducible progress. While natural speech processing enjoys abundant public benchmarks, non-natural vocalizations like monster roars, robotic voices, and stylized character audio are difficult to record naturally and require complex, manual DSP chains. This lack of standardized public resources and open evaluation sets makes fair, controlled comparisons across non-human voice conversion systems impossible.

## Method

The dataset construction maps raw vocal audio x_raw to designed variants x^(p) = G_p(x_raw) using preset-specific DSP operators G_p built from serial, parallel, or hybrid chains of M_p effect modules (such as delay pitch shifting, flanger/chorus, granular processors, noise generators, ring modulators, and spectral shifters). Raw sources include 3,270 linguistic samples from VCTK (109 speakers) and 2,384 non-linguistic items (animal sounds, interjections, infant cries, and vocal mimicry) scraped from Freesound, filtered, denoised, and volume-normalized.

The benchmark evaluates a representative H2NH-VC model based on a Conditional Adversarial VAE (CVAE). The model incorporates fine-resolution STFT parameters (20 ms window, 5 ms hop) to capture sharp acoustic details, applies style embedding exclusively to the prior network and flow module, and trains on a multi-resolution Mel-STFT loss covering 0 to 22.05 kHz.

During inference, the model takes an unprocessed source x_s and a target reference x_r = G_p(x_s), generating an output that preserves linguistic content or temporal structure while adopting the target acoustic timbre.

## Experimental setup

The dataset comprises 5,774 raw sources and 231,800 designed files in the training split (40 presets, 5,654 raw sources), and 5,640 pairs in the test split (120 sources across 47 presets). The test set evaluates four generalization conditions: Seen-to-seen, Seen-to-unseen, Unseen-to-seen, and Unseen-to-unseen (where unseen sources use HiFiTTS and unseen presets include 7 held-out configurations). Evaluation metrics include cosine similarity of time-averaged BEATs embeddings for timbre, PCC-E and RMSE-E for energy prosody, Whisper-based CER and WER for intelligibility, and an 8-participant 5-point MOS test.

## Results

Baseline performance shows MOS scores dropping from 3.81 in the easiest Seen-to-seen condition down to 3.49 in the hardest Unseen-to-unseen condition, with cross-conditions at 3.66. Timbre cosine similarity decreases from 0.667 (Seen-to-seen) to 0.610 (Unseen-to-unseen). Energy prosody metrics remain nearly invariant, with PCC-E spanning 0.982 to 0.985 and RMSE-E spanning 0.047 to 0.049. ASR intelligibility metrics paradoxically yield lower error rates on unseen sources (e.g., Unseen-to-unseen CER 1.64% vs Seen-to-seen CER 3.79%), which the authors attribute to weaker conversion leaving the output closer to the intelligible original source.

| Scenario | Cos. Sim. (↑) | PCC-E (↑) | RMSE-E (↓) | CER (↓) | WER (↓) | MOS (↑) |
|---|---|---|---|---|---|---|
| Seen-to-seen | 0.667 | 0.985 | 0.047 | 3.79% | 7.55% | 3.81 |
| Seen-to-unseen | 0.648 | 0.984 | 0.049 | 3.59% | 7.38% | 3.66 |
| Unseen-to-seen | 0.643 | 0.982 | 0.047 | 1.89% | 5.23% | 3.66 |
| Unseen-to-unseen | 0.610 | 0.983 | 0.049 | 1.64% | 4.65% | 3.49 |

## Limitations

The dataset is constrained by its reliance on specific digital audio workstation tools (Dehumaniser 2 and Cubase) for effect generation, which may bias the acoustic space toward preset-driven transformations. Language coverage for linguistic sources is limited to English (VCTK and HiFiTTS). Additionally, the evaluation relies on automated speech recognition models (Whisper) and self-supervised embeddings (BEATs) that may not fully capture perceptual anomalies inherent to extreme non-human transformations.

## Why read this

Researchers and engineers working on non-natural voice conversion, stylized character generation, or audio-to-audio style transfer should read this paper to adopt the first standardized public benchmark and dataset for designed vocalizations.

## Code

- https://ncai-official.github.io/speech/publications/designed-vocalizations-dataset/

## Applications

Automated voice generation for video games, films, animation, virtual reality, and interactive media requiring monster, robotic, or stylized character voices.

## Related

- (link related pages by id as the wiki grows)
