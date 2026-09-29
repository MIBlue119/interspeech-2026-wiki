---
id: liyanarachchi26_interspeech
category: health-clinical
institutions: ["University of New South Wales", "Resourced Music Therapy", "Western Sydney University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1131
pdf: https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.pdf
---

# Paediatric-HGNN: A Hybrid Heterogeneous Graph Neural Network for Detecting Disfluency in Children’s Speech via Multiscale Acoustic Fusion

*Rashini Liyanarachchi, Rachael Mackay, Alison Short, Aditya Joshi, Erik Meijering*

[PDF](https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liyanarachchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1131)

**Category:** `health-clinical`

**TL;DR** — Paediatric-HGNN is a heterogeneous graph neural network that models speech as hierarchical interactions between lexical word nodes and acoustic frame nodes, achieving 82.4% weighted accuracy in automated stuttering detection for children.

## Key contributions

- Paediatric-Only Specialisation: Trains exclusively on a consolidated paediatric corpus (UCLASS and FluencyBank-CWS) to eliminate domain shift from adult datasets.
- Graph-Based Lexical Integration: Represents speech as a heterogeneous graph connecting word nodes and fine-grained acoustic frames, using linguistic context to distinguish core stutters from developmental disfluencies.
- Hierarchical Attention & Interpretability: Employs cross-modal attention weights that reveal whether a model focuses on local acoustic spikes (core stutters) or broader ±2 word contexts (typical disfluencies).
- Rigorous Evaluation: Validated using a speaker-independent 5-fold cross-validation protocol to prevent data leakage and ensure realistic clinical generalizability.

## Problem

Automated stuttering detection models are predominantly optimised for adult corpora like SEP-28k, causing them to fail when applied to developing children's voices due to high fundamental frequencies and high acoustic variability. Furthermore, early childhood speech features a natural phase of typical developmental disfluencies (such as revisions and phrase repetitions) that frequently overlap acoustically with pathological core stutters (blocks and prolongations). Standard black-box deep learning models lack the clinical interpretability and contextual grounding required to separate cognitive-linguistic developmental searching behavior from motor-speech blocks.

## Method

The framework constructs a heterogeneous graph where word nodes are initialized with a 945-dimensional hybrid feature vector (combining Wav2Vec2-base-960h contextual embeddings, mel-spectrogram textures, MFCCs, zero-crossing rates, YIN pitch stability, energy instability, and duration ratios), and frame nodes represent acoustic windows initialized with 768D Wav2Vec2 embeddings. Graph connectivity consists of hierarchical edges mapping frames to words, sequential edges maintaining temporal flow, and contextual edges capturing a ±2 word neighborhood. These features are projected into a shared 256D latent space where hierarchical cross-modal attention permits word nodes to attend to relevant frame-level acoustic artifacts.

The graph-enhanced sequence is subsequently processed by a 2-layer Bidirectional GRU. A learnable gated residual fusion dynamically weights spatial GNN features against temporal RNN features via H = g * H_RNN + (1 - g) * H_GNN, allowing the network to prioritize local acoustic spikes for repetitions or long-range rhythms for hesitations before passing representations to a 3-class MLP classifier. The model is optimized using AdamW and a Focal Loss function (gamma = 2) with class-specific weights alpha = [1, 3, 3] to prioritize minority pathological classes, supplemented by oversampling that replicates core stutters at an 8x ratio and typical disfluencies at a 4x ratio.

## Experimental setup

Evaluated on a consolidated corpus of 47 children (25 from UCLASS, 22 from FluencyBank-CWS) encompassing conversational interviews and reading tasks. Compared against baselines including ResNet+BiLSTM, StutterNet, Atrous-CNN, Whister, and an adult-pretrained SEP-28k transfer learning model. Metrics include Precision, Recall, F1-Score, and Weighted Accuracy using a speaker-independent 5-fold cross-validation protocol.

## Results

Paediatric-HGNN achieved a weighted overall accuracy of 82.4% ± 2.7% (and F1 scores of 0.904 for Fluent speech, 0.280 for Core Stutters, and 0.386 for Typical Disfluencies). In comparison, transferring an adult-pretrained SEP-28k model caused performance to collapse, dropping the Typical Disfluency F1 score to 0.08 due to domain shift between adult chronic patterns and child linguistic planning phases. Ablation studies proved the necessity of architectural components: removing contextual edges dropped Typical Disfluency F1 from 0.386 to 0.287, while removing frame-to-word attention dropped Core Stutter F1 from 0.280 to 0.213.

| System / Condition | Fluent F1 | Core Stutter F1 | Typical Disfluency F1 | Weighted Accuracy |
|---|---|---|---|---|
| ResNet+BiLSTM | 0.52 | 0.36 | 0.22 | - |
| StutterNet | 0.63 | 0.31 | 0.27 | - |
| Atrous-CNN | 0.64 | 0.49 | 0.37 | - |
| SEP-28k Transfer Learning | 0.88 | 0.15 | 0.08 | - |
| Paediatric-HGNN (Ours) | 0.90 | 0.28 | 0.39 | 82.4% |

## Limitations

The study relies on a relatively small dataset of only 47 children spanning two corpora, limiting acoustic diversity and resulting in low absolute F1 scores for minority core stutter classes (0.280). The approach requires pre-computed or forced-aligned word boundaries to construct lexical-acoustic graph nodes. Furthermore, evaluation is restricted to English-language paediatric corpora, leaving multi-language generalisability unexplored.

## Why read this

Speech and ML researchers focusing on clinical audio tasks should read this to see how heterogeneous graph neural networks and hierarchical cross-modal attention can inject structural interpretability into black-box speech pathology models. It offers a clear blueprint for overcoming domain shift when adapting adult speech technologies to fragile paediatric populations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools for speech-language pathologists, computer-aided speech therapy applications, and early-intervention diagnostic systems for pediatric developmental disorders.

## Institutions / 機構

University of New South Wales, Resourced Music Therapy, Western Sydney University

## Related

- (link related pages by id as the wiki grows)
