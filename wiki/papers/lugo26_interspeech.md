---
id: lugo26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2337
pdf: https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.pdf
---

# DiffVQE: Hybrid Diffusion Voice Quality Enhancement Under Acoustic Echo and Noise

[PDF](https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2337)

**TL;DR** — DiffVQE is a hybrid score-based diffusion model for simultaneous acoustic echo control and denoising that outperforms the state-of-the-art DeepVQE in most voice quality metrics while using fewer parameters and lower computational complexity.

## Problem

Discriminative mask-based deep neural networks for acoustic echo control (AEC) often introduce audible artifacts in non-stationary environments and struggle to balance aggressive echo suppression with near-end speech preservation during double-talk scenarios. Meanwhile, generative diffusion models have excelled in noise reduction and speech enhancement, but adapting them to joint AEC tasks has been largely unexplored, non-reproducible, or computationally prohibitive. Providing a fully reproducible, high-performance hybrid diffusion architecture trained on diverse public data is therefore a critical step forward for hands-free communication systems.

## Method

The system employs a dual-stage hybrid architecture featuring a conditional discriminative U-Net (Cond DNN) for robust early echo suppression and feature conditioning, paired with a generative U-Net (Score DNN) operating via a variance-exploding stochastic differential equation. The far-end reference signal is concatenated early with the microphone input in the Cond DNN, and single-step diffusion training is conducted using compressed complex mean squared error loss combined with a denoising score matching objective. The U-Net encoder-decoder backbones use DSBlock and USBlock building blocks with subpixel convolutions instead of transposed convolutions to mitigate aliasing, alongside Karras preconditioning for training stability. The model is trained on approximately 600 hours of data curated from the Interspeech 2025 URGENT Challenge speech/noise corpora and the ICASSP 2023 AEC Challenge, augmented via simulated room impulse responses.

## Results

Evaluated on the synthetic Dval validation set and the ICASSP 2023 AEC Challenge blind test set (Dtest ), DiffVQE is compared against unprocessed audio, clean signals, and Microsoft's DeepVQE baseline. On Dval , the full DiffVQE model achieves an average rank of 1.3 across metrics, outperforming DeepVQE (rank 2.5) and a smaller variant DiffVQE-S (rank 2.0) across speech quality (PESQ), intelligibility (ESTOI, LPS), and non-intrusive AECMOS/DNSMOS scores. Specifically, on Dval , DiffVQE reaches a DT PESQ of 2.63 (vs 2.30 for DeepVQE) and STNE PESQ of 3.14 (vs 2.58), while utilizing 5.13 million parameters and 5.37 GFLOPS (compared to DeepVQE's 5.29 million parameters and 42.24 GFLOPS). On the Dtest blind set, DiffVQE secures the top average rank of 1.17, leading in nearly all metrics except for a slight margin in DT Echo where DeepVQE scores marginally higher.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building hands-free communication systems, speakerphones, and voice communication devices requiring robust background noise reduction and acoustic echo control.

## Limitations

The proposed approach is currently non-causal.

## Related

- (link related pages by id as the wiki grows)
