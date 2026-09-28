---
id: zhou26d_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1532
pdf: https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.pdf
---

# BiSASV: Bidirectional Feature Modulation with Dual-Granularity Fusion for Spoofing-Robust ASV

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1532)

**TL;DR** — BiSASV establishes a bidirectional feature modulation and dual-granularity fusion framework between automatic speaker verification and countermeasure subsystems, achieving a 0.73% SASV-EER and 0.0153 min a-DCF on ASVspoof 2019 LA.

## Problem

Automatic speaker verification systems are vulnerable to synthetic speech attacks, but current feature-level spoofing-robust ASV fusion methods rely solely on unidirectional interactions that ignore speaker context. This asymmetrical design overlooks how synthetic speech artifacts are intrinsically coupled with target speaker acoustic characteristics. Without reciprocal information flow between speaker verification and countermeasure branches, models struggle to calibrate decision boundaries effectively.

## Method

The system utilizes pre-trained ECAPA-TDNN and AASIST models as front-ends to extract 192-dimensional ASV and 160-dimensional CM features. A bidirectional feature modulation network is introduced, where global speaker statistics derived from ASV embeddings modulate CM features via Feature-wise Linear Modulation (FiLM), and enhanced CM features subsequently perform dimension-wise channel gating on ASV representations. A dual-granularity fusion strategy combines a coarse-grained fusion module using global cosine similarity with a fine-grained gated interaction path. The model is trained using the Adam optimizer for 20 epochs with a batch size of 1024, employing a weighted binary cross-entropy loss with bona fide and spoof weights set to 0.9 and 0.1.

## Results

Evaluated on the ASVspoof 2019 Logical Access set, BiSASV achieves an SASV-EER of 0.73% and a min a-DCF of 0.0153, outperforming the ATMM-SAGA baseline which yields 2.18% SASV-EER and 0.0480 min a-DCF. Compared to a naive embedding fusion baseline scoring 6.37% SASV-EER, the proposed system demonstrates superior cross-task feature complementarity. Ablation studies indicate that removing ASV-to-CM conditioning or coarse-grained fusion degrades SASV-EER to 1.33% and 1.14% respectively, and shuffling batch speaker statistics impairs countermeasure performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice biometric security systems, identity authentication gateways, and speaker recognition platforms requiring robust defense against text-to-speech and voice conversion spoofing attacks.

## Related

- (link related pages by id as the wiki grows)
