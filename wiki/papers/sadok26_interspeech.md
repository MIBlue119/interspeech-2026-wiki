---
id: sadok26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Inria", "Universite Grenoble Alpes", "CNRS"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-733
pdf: https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.pdf
---

# InsideSSL: Understanding Self-Supervised Speech Representations using a Model-Centric Perspective

*Samir Sadok, Xavier Alameda-Pineda*

[PDF](https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-733)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — INSIDESSL is a task-agnostic, model-centric framework that analyzes speech self-supervised learning (SSL) models across layer depth using entropy, manifold curvature, perturbation robustness, and a novel Generative Compatibility Matrix (GCM), uncovering distinct optimization regimes like Wav2Vec2's deep-layer entropy collapse.

## Key contributions

- Introduces per-layer intrinsic evaluation metrics spanning matrix-based von Neumann entropy (compression), token trajectory curvature (geometry), and InfoNCE-based invariance to augmentations (robustness).
- Proposes the cross-layer Generative Compatibility Matrix (GCM) using Continuous Flow Matching decoders to map functional transferability and information flow between different Transformer depths.
- Exposes a structural divergence between HuBERT-style masked prediction models (which maintain stable entropy and invariance) and Wav2Vec2/Data2Vec (which exhibit late-stage compression/entropy collapse and invariance spikes).
- Bridges intrinsic representation topology to downstream performance via linear probes, revealing that paralinguistic tasks thrive on early high-entropy/high-curvature states while phoneme recognition benefits from mid-to-deep layer manifold linearization and compression.

## Problem

Despite the foundational success of speech SSL models like Wav2Vec2, HuBERT, and WavLM across downstream applications, understanding their internal layer-wise dynamics remains an ongoing challenge. Prior analyses rely heavily on task-specific external labels (probing correlations with predefined attributes) rather than intrinsic properties, failing to systematically track how information is compressed, geometrically organized, or robustly preserved across the network hierarchy. Without a task-agnostic, model-centric perspective, designing interpretable, task-aligned architectures remains largely trial-and-error.

## Method

For a given input signal, layer representations are extracted as token embedding matrices across Transformer layers. Compression is quantified via matrix-based von Neumann entropy using normalized Gram matrix eigenvalues, avoiding explicit probability density estimation while measuring spectral spread and effective dimensionality. Geometry is evaluated through the average curvature of token transition vectors between adjacent layers, distinguishing abrupt local acoustic details from smoother, linearized abstract manifolds deeper in the network. Robustness is assessed via an InfoNCE-based mutual information lower bound between augmented pairs (using additive noise, pitch shifts, gain adjustments, and time masking with probability p=0.7 and temperature tau=0.1).

To map inter-layer relationships, the Generative Compatibility Matrix (GCM) trains Continuous Flow Matching (CFM) decoders—implemented as 6-layer Diffusion Transformers (DiT) with a 512 hidden dimension connected to a frozen HiFi-GAN vocoder—on one model layer and evaluates them across all other layers using metrics like SpeechBERTScore, Resemblyzer speaker similarity, STOI, and L1 loss. This decoupled setup runs for 400 epochs on train-clean-100. Linear probing is further applied to frozen representations to link intrinsic topological properties (entropy, curvature, invariance) to downstream phoneme classification, pitch regression (F0 via CREPE), and speaker identification.

## Experimental setup

Intrinsic layer-wise metrics are evaluated on the LibriSpeech test-clean subset (2,620 utterances). Generative decoders and linear task probes are trained on the train-clean-100 subset. Investigated models include BASE (12 layers, 768 hidden dim, 95M params, pretrained on 960h LibriSpeech) and LARGE/PLUS variants (24 layers, 1024 hidden dim, 315M params, pretrained on >=60k to 94k hours) across Wav2Vec2, HuBERT, WavLM, UniSpeech-SAT, and Data2Vec-Audio.

## Results

Most models (HuBERT, WavLM, UniSpeech) sustain high normalized entropy (~0.82 to ~0.75) and smoothly decreasing curvature (~1.4 down to ~1.2) across layers, indicating preserved informational density and manifold unfolding. In contrast, Wav2Vec2-base and Data2Vec exhibit an entropy collapse near the final layer alongside a sharp spike in InfoNCE loss (rising to ~3.0 for Wav2Vec2), signaling a deep-layer representation breakdown likely linked to quantization or projection heads. GCM heatmaps reveal strict hierarchical pruning (asymmetric lower-triangular structure), where deep decoders generalize to preceding layers but early decoders cannot decode abstract representations, with a stable phonetic core residing in layers 1–10 for Wav2Vec2 and two distinct sub-blocks (1–6, 6–12) for WavLM. Downstream task correlations show that pitch and speaker classification correlate positively with entropy and curvature (Pearson ~0.77 to ~0.84), whereas phoneme classification correlates negatively (Avg entropy -0.46, curvature -0.57, invariance -0.54), proving that linguistic tasks benefit from deep-layer compression and linearization.

| System / Condition | Phoneme Acc (Peak Layer) | Pitch F0 Corr | Speaker Acc | InfoNCE Final Layer |
|---|---|---|---|---|
| Wav2Vec2-Base | Mid Layers (7-8) | Moderate (Attenuates) | High (Early Layers) | ~3.0 (Spike) |
| WavLM-Base | Mid Layers (7-8) | Stable Preservation | High (Early Layers) | Low Stable Plateau |
| HuBERT-Base | Mid Layers (7-8) | Stable Preservation | High (Early Layers) | Low Stable Plateau |
| Data2Vec-Audio-Base | Early Layers (Layer 4) | Sharp Decline (>L3) | High (Early Layers) | ~3.0 (Spike) |

## Limitations

The study focuses primarily on English via the LibriSpeech corpus, leaving multilingual cross-lingual transferability unexplored. The framework provides robust empirical correlations but lacks formal causal proofs for architectural anomalies like Wav2Vec2's deep-layer entropy collapse. Furthermore, analyses are restricted to standard unidirectional/bidirectional Transformer-based SSL backbones and standard augmentation recipes.

## Why read this

Speech researchers and model designers seeking a rigorous, task-agnostic diagnostic toolbox to understand internal SSL layer dynamics, representation geometry, and cross-layer functional compatibility will find this essential reading. It replaces trial-and-error architecture tuning with principled insights into how pre-training objectives shape compression and downstream task alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guiding the design of next-generation speech SSL architectures, multi-task layer selection, and efficient on-device model pruning based on intrinsic layer-wise topology.

## Institutions / 機構

Inria, Universite Grenoble Alpes, CNRS

## Related

- [Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?](getman26b_interspeech.md) — same problem · relatedness 2.1/3
- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 2.1/3
- [GRIDS: Dimensionality-Aware Anomaly Detection in Learned Representations of Self-Supervised Speech Models](arcosholzinger26_interspeech.md) — same problem · relatedness 2.0/3
- [Do speech foundation models really learn words?](huo26_interspeech.md) — same problem · relatedness 2.0/3
- [Layer-wise Probing of Whisper's Encoder Representations for Bengali Phone-like Units](thahmid26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
