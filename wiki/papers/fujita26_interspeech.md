---
id: fujita26_interspeech
category: tts
labels: [generative-model]
institutions: ["NTT"]
code: https://ntt-hilab-gensp.github.io/IS2026pseudo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-919
pdf: https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.pdf
---

# Scalable Direction-Following TTS via Voice Impression-Guided Pseudo Triplet Construction

*Kenichi Fujita, Yusuke Ijima*

[PDF](https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-919)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper introduces direction-following TTS to modify a reference utterance's speaking style based on a natural language direction, solving data scarcity via a scalable pseudo-triplet construction pipeline that combines impression-controlled TTS and LLMs.

## Key contributions

- Formulates direction-following TTS as a task requiring relative style modification of a pre-modification reference utterance rather than absolute conditioning.
- Proposes a scalable pseudo-triplet construction pipeline generating 350,617 triplets (127.6 hours) using an impression-controllable TTS proxy and Qwen3-Next-80B-A3B-Instruct.
- Develops a direction-conditioned style refiner operating via rectified flow matching in speech embedding space with a fixed backbone TTS model.
- Collects an interactive professional recording dataset (8.9 hours, 6,899 pairs) to capture authentic human responses and combines it with pseudo data for optimal balance.

## Problem

Standard zero-shot TTS and speech editing frameworks rely heavily on absolute style prompts or single-reading scripts, making them incapable of modeling relative performance transformations (e.g., "make it more hesitant while retaining speaker identity"). Although small corpora with multi-read scripts exist, they lack natural language direction annotations. Furthermore, the complete absence of paired (pre-mod utterance, direction text, post-mod utterance) training data hinders the deployment of data-hungry generative diffusion or flow-based speech models.

## Method

The system features a fixed backbone TTS model (FastSpeech2 architecture with a frozen HuBERT-based joint encoder and HiFi-GAN V1 vocoder) and a separate style refiner operating in speech embedding space. Pseudo data generation relies on an impression-controllable TTS model modulated by 13 continuous antonym-based dimensions (extended with fluent-hesitant and emotional-neutral axes). After filtering out pairs with abnormal speaking rates or ECAPA-TDNN speaker similarities outside [0.80, 0.95], an LLM converts the measured 13-dimensional impression vector differences into natural language directions. 

The direction-conditioned style refiner models a stochastic vector field using rectified flow matching. It takes as input a noise vector, time step t, pre-modification utterance embedding, and a direction representation encoded via ModernBERT-Ja-310M. During training, it minimizes a flow matching objective paired with auxiliary directional consistency and magnitude alignment losses. At inference, the predicted embedding modification vector is directly added to the pre-modification utterance embedding before waveform generation.

## Experimental setup

The pseudo dataset contains 350,617 triplets (127.6 hours) from 1,600 Japanese speakers, while the recorded dataset includes 8.9 hours from 2 professional actors (6,899 pairs). Evaluations use four speakers (two seen, two unseen from HiFi-CAPTAIN) across 15,000 generated utterances per speaker. Metrics include ECAPA-TDNN speaker similarity, UTMOSv2 for naturalness, an LLM-based proxy alignment metric, and crowdsourced subjective SMOS and AlignMOS evaluations (evaluated by 258 and 208 participants respectively, with 10+ raters per sample). The style refiner uses the Adam optimizer with a learning rate of 0.01 and batch size of 32 for up to 1M steps.

## Results

The combined model (Full) achieves the best trade-off, scoring 3.35 (seen) and 3.22 (unseen) for SMOS, compared to 2.67 and 2.63 for the Recorded-only model, and 3.54 and 3.24 for the Pseudo-all model. For direction alignment (AlignMOS), Recorded achieves the highest scores (3.50 seen / 3.48 unseen) due to larger expressive style shifts, but suffers from severe speaker drift where similarity drops below the 0.57 5th-percentile threshold. The Full model closely matches Recorded alignment (3.22 seen / 3.32 unseen) while maintaining robust speaker identity preservation comparable to purely synthetic training. Ablations on pseudo-data speaker scale (200, 400, 800, and 1,600 speakers) show that increasing speaker diversity progressively mitigates extreme speaker drift.

| Conditions | Seen SMOS | Seen AlignMOS | Unseen SMOS | Unseen AlignMOS |
|---|---|---|---|---|
| Full | 3.35 ± 0.08 | 3.22 ± 0.07 | 3.22 ± 0.07 | 3.32 ± 0.07 |
| Recorded | 2.67 ± 0.08 | 3.50 ± 0.07 | 2.63 ± 0.08 | 3.48 ± 0.07 |
| Pseudo-all | 3.54 ± 0.08 | 3.08 ± 0.07 | 3.24 ± 0.07 | 3.18 ± 0.07 |

## Limitations

Pseudo-generated speech exhibits significantly smaller prosodic and F0 variations (mean ln F0 change 0.05 ± 0.08) compared to professional human acting (0.14 ± 0.15), leading to more conservative style modifications. The study is currently restricted to Japanese datasets and specific underlying backbone architectures. Evaluation relies heavily on proxy metrics like LLM-rated impression changes and crowdsourced MOS tests, which may not capture all nuances of theatrical performance direction.

## Why read this

Read this paper if you are working on fine-grained emotional or stylistic control in text-to-speech systems and need a practical, scalable blueprint for bypassing the zero-shot relative-data bottleneck via LLM-augmented pseudo-triplet synthesis.

## Code

- https://ntt-hilab-gensp.github.io/IS2026pseudo/

## Applications

Automated voice-acting direction tools, dynamic video game character dialogue re-reading, and expressive audiobook narration generation.

## Institutions / 機構

NTT

## Related

- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.6/3
- [Poly-InstructTTS: Learning In-the-Wild Expressive Speech Synthesis from Open-Ended Instructions](zhang26m_interspeech.md) — same problem · relatedness 2.6/3
- [StyleStream: Real-Time Zero-Shot Voice Style Conversion](liu26c_interspeech.md) — same problem · relatedness 2.2/3
- [Bagpiper-TTS: Natural Language Guided Universal Speech Synthesis](tian26_interspeech.md) — same problem · relatedness 2.1/3
- [Bridging the Gap: A Hierarchical Framework for Cross-Modal Style Modeling in Expressive TTS](chen26p_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
