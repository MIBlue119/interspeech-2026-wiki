---
id: huang26m_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1796
pdf: https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.pdf
---

# On the Robustness of Speaker Embeddings for Cross-Domain Speaker Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1796)

**TL;DR** — This paper evaluates the robustness of pre-trained speaker embedding models under cross-domain speaker retrieval constraints and demonstrates that applying Adaptive Symmetric Normalization (ASN) effectively restores global ranking stability without requiring model retraining.

## Problem

Speaker recognition systems are almost exclusively evaluated on binary verification metrics like Equal Error Rate (EER) rather than global similarity ranking, leaving their resilience against ranking degradation in large-scale retrieval unstudied. When deployed in unconstrained real-world environments, unseen distribution shifts—such as channel distortions, cross-lingual queries, biological aging, and ambient noise—cause severe rank inversion and false alarms. Retraining or fine-tuning models on every target domain is computationally prohibitive and creates privacy risks, making it critical to understand how frozen off-the-shelf speaker embeddings generalize in global retrieval spaces.

## Method

The study benchmarks six pre-trained speaker embedding models from the 3D-Speaker Toolkit: CAM++, ECAPA-TDNN, ERes2Net, x-vector, RDINO, and SDPN, all pre-trained on VoxCeleb2 without target-domain adaptation. It establishes an open-set speaker retrieval pipeline where queries are matched against a gallery contaminated by a massive scale of out-of-set distractor speakers using cosine similarity on L2-normalized embeddings. To evaluate cross-domain robustness, four distinct mismatch dimensions are tested: channel variations (codec/telephone filtering via VoxCeleb2), acoustic environment mismatch (room reverberation via VOiCES), language mismatch (English/non-English via TidyVoice), and temporal age mismatch (longitudinal voice changes via voxAging). Finally, an Adaptive Symmetric Normalization (ASN) non-parametric backend strategy is applied as a training-free post-processing step to dynamically center and scale similarity scores using top-scoring pseudo-impostor background cohorts.

## Results

Evaluated on VoxCeleb2, VOiCES, TidyVoice, and voxAging datasets using Precision@10 (P@10) and Mean Average Precision (mAP) metrics. Under in-domain conditions (O→O), supervised multi-scale models like ECAPA-TDNN achieve up to 92.72% P@10 and 98.82% mAP, whereas self-supervised models trail by 15% to 18% in precision. Under telephone-to-network channel mismatch, ERes2Net shows superior resilience due to multi-scale local feature fusion, achieving 40.70% P@10 and 60.53% mAP (outperforming x-vector at 7.77% P@10). Under acoustic environment mismatch (clean-to-noisy), global ranking remains high across all models (>95% mAP), with self-supervised RDINO reaching 74.03% P@10 (surpassing the x-vector model at 71.79%). Under language mismatch, English queries cause models to overfit to phonetic variations due to English pre-training bias, dropping RDINO's precision to 25.66%, while non-English queries recover better performance. Under temporal aging mismatch (early-to-late), ERes2Net and ECAPA-TDNN lead with ~50.41% P@10, showing robustness to long-term vocal tract evolution. Applying ASN backend calibration universally improves retrieval performance across all models, raising ERes2Net's T→N P@10 from 40.70% to 43.76% and mAP from 60.53% to 63.62%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers deploying large-scale audio archives, forensic voice tracking systems, or personalized media services where plug-and-play speaker retrieval across adverse environments is required without model retraining.

## Limitations

The study focuses on frozen pre-trained embeddings and evaluates performance primarily on specific simulated domain shifts (channel, acoustic, linguistic, and temporal), without exploring active adaptation or fine-tuning approaches.

## Related

- (link related pages by id as the wiki grows)
