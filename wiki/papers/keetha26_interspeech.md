---
id: keetha26_interspeech
category: speaker
labels: [multilingual]
institutions: ["Meeami Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2097
pdf: https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.pdf
---

# Progressive Learning for Robust Speaker Representation

*Nikhil Keetha, Hima Jyothi R, Nivedita Chennupati, Balaji Padmanaban, Harish Rajamani, Naveen Ambati*

[PDF](https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2097)

**Category:** `speaker` · **Labels:** `multilingual`

**TL;DR** — A two-stage progressive training framework combining backbone fine-tuning and metric learning is proposed to build language-invariant speaker embeddings, reducing Equal Error Rate (EER) from 3.07% to 1.58% on the TidyVoice benchmark.

## Key contributions

- Adopted the high-efficiency ReDimNet-B6 architecture as a robust backbone for cross-lingual speaker verification.
- Designed a two-stage progressive training strategy that separates in-domain acoustic fine-tuning from language-invariant metric learning.
- Introduced a lightweight 256.13K-parameter convolutional projection network trained with triplet loss to shape the embedding space.
- Established a balanced random triplet sampling strategy across multi-language trial categories to prevent language-induced false positives without requiring hard negative mining.

## Problem

Traditional speaker verification models struggle under acoustic mismatch and cross-lingual conditions, failing in two primary ways: different speakers sharing a common language are falsely accepted because dominant phonetic patterns override speaker traits, and the same speaker across different languages is falsely rejected due to acoustic shifts. These failures happen because standard embeddings encode language-specific details irrelevant to true speaker identity. Prior cross-lingual techniques and adversarial domain adaptation via gradient reversal fail to adequately disentangle language information or maintain robustness across diverse acoustic environments like noise and reverberation.

## Method

The proposed architecture utilizes a ReDimNet-B6 backbone processing 72-dimensional log-mel filterbank features, taking inputs through alternating 1D and 2D residual blocks followed by attentive statistics pooling to yield 192-dimensional embeddings. Stage 1 trains this backbone on the full TidyVoice dataset using Additive Angular Margin (ArcMargin) loss, alongside comprehensive data augmentations including MUSAN noise (5-20 dB SNR), room impulse responses (RIR), and speed perturbation (0.9x and 1.1x factors).

In Stage 2, the Stage 1 encoder is completely frozen, and a lightweight 1D convolutional projection network is trained on top via triplet loss. The projection network consists of a parallel linear layer and a three-layer 1D CNN (channel dimensions 64, 128, and 256; kernel sizes 5, 5, and 3), followed by batch normalization, ReLU activations, adaptive average pooling, and a fully connected layer producing a 256-dimensional vector projected onto an l2-normalized unit hypersphere. The triplet loss uses Euclidean distance with margin alpha, pulling anchor-positive pairs together and pushing anchor-negative pairs apart.

Triplet construction uses balanced random sampling rather than hard negative mining. Anchors are randomly sampled utterances, positives are drawn equally from same-speaker/same-language or same-speaker/different-language pairs, and negatives are drawn from different speakers in either the same or different languages. This strategy directly forces the network to ignore shared phonetic traits among speakers of the same language.

## Experimental setup

Evaluated on the TidyVoice Challenge dataset containing 4,474 speakers across 40 languages spanning 457 hours of audio, alongside ESC-50 noise variants and RIR evaluations. Compared against the official challenge baseline (SimAM-ResNet34 pretrained on VoxBlink2/VoxCeleb2) and an unadapted ReDimNet-B6. Metrics reported include Equal Error Rate (EER) and minimum Detection Cost Function (minDCF). Stage 1 optimizes with SGD (momentum 0.9, weight decay 2e-5, initial lr 1e-3) using the WeSpeaker toolkit, while Stage 2 optimizes with Adam (lr 1e-3) on an l2-normalized embedding space.

## Results

On the TidyVoice development set, the official baseline achieves an overall EER of 3.07% (minDCF 0.8200). An unadapted ReDimNet-B6 obtains 2.70% EER (0.7922 minDCF). Stage 1 in-domain fine-tuning drops EER to 1.75% (0.6600 minDCF), and adding the Stage 2 triplet projection network achieves a headline overall EER of 1.58% (0.6481 minDCF). On the hardest trial category (Same-Speaker Different-Language vs Different-Speaker Same-Language), EER drops from 4.42% (unadapted) to 2.52% (Stage 2). On blind evaluation sets, Stage-2 reduces EER from 9.06% to 4.81% on eval-A (seen language enrollment, unseen test languages), and from 11.60% to 7.01% on eval-U (fully unseen languages).

| System | Overall EER (%) | Overall minDCF |
|---|---|---|
| Challenge Baseline (SimAM-ResNet34) | 3.07 | 0.8200 |
| ReDimNet-B6 (Unadapted) | 2.70 | 0.7922 |
| Stage 1 (ArcMargin Fine-tuned) | 1.75 | 0.6600 |
| Stage 2 (Triplet Projection) | 1.58 | 0.6481 |

## Limitations

The study is bounded by the specific scope of the TidyVoice benchmark dataset (40 languages, 457 hours), and while robust to 38 unseen test languages, performance degrades on fully zero-shot cross-lingual pairings (eval-U EER rises to 7.01%). Speakers sharing multiple languages can exhibit closer inter-cluster distances in the embedding space due to overlapping cross-lingual phonetic patterns, a phenomenon not fully resolved by current language disentanglement.

## Why read this

Researchers and engineers tackling cross-lingual speaker verification or multi-accent speaker recognition will find this paper valuable for its practical blueprint on combining backbone fine-tuning with a lightweight metric-learning projection network rather than expensive end-to-end retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speaker verification, speaker diarization, target speaker extraction, and secure multi-language voice authentication systems.

## Institutions / 機構

Meeami Technologies

## Related

- [L-Proto: Language-Aware Episodic Prototypical Training for Multilingual Speaker Verification](oh26_interspeech.md) — same problem · relatedness 3.0/3
- [Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge](li26fa_interspeech.md) — same problem · relatedness 3.0/3
- [LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification](shen26b_interspeech.md) — same problem · relatedness 3.0/3
- [Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification](shangguan26_interspeech.md) — same problem · relatedness 3.0/3
- [Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge](du26c_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
