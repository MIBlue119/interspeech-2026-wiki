---
id: ding26c_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1034
pdf: https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.pdf
---

# Through-Wall Radar Speech Acquisition via Cascaded Attention Fusion

[PDF](https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1034)

**TL;DR** — The Cascaded Attention Fusion Transformer (CAF-Former) enhances through-wall radar speech and extends its bandwidth, achieving state-of-the-art intelligibility (STOI) and DNSMOS on both simulated and real recordings.

## Problem

Through-wall radar sensing captures speech via surface vibrations using radio-frequency waves, but the resulting signals suffer from severe band limitation, noise corruption, and high-frequency attenuation (>1 kHz). Conventional deep learning models and standard multi-head self-attention mechanisms fail under these conditions because head fragmentation and inadequate long-range temporal-spectral modeling lead to distorted, unintelligible reconstructions.

## Method

The model uses a progressive reconstruction strategy via K=10 transformer layers that gradually expand reliable low-frequency input bins (0-765.6 Hz) to a full-band 512-point STFT spectrum. Each layer applies temporal multi-query attention (TMQA) with Nq=8 parallel queries sharing keys and values to capture diverse temporal patterns without head fragmentation. This is followed by a frequency attention fusion (FAF) module (hidden dimension dk=64) that reorganizes attention maps along the frequency axis to model inter-frequency interactions. Training uses log-spectral amplitude distance loss, the Adam optimizer at a learning rate of 1e-4 for up to 50 epochs, and 312 hours of simulated 8 kHz LibriSpeech data.

## Results

Evaluated on simulated and real-world datasets collected with a 5.31 GHz FMCW radar facing a 15 cm concrete wall, compared against Wave-Voice Net, RANet, DPTNet, TF-Locoformer, and EBENet. CAF-Former achieves superior STOI (0.699 sim, 0.617 real), DNSMOS (2.546 sim, 2.423 real), and CS-MFCC (0.596 sim, 0.591 real), while maintaining competitive PESQ. Ablation studies confirm that combining both TMQA and FAF outperforms standard multi-head self-attention and single-query variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing non-acoustic speech acquisition, covert surveillance, search-and-rescue communication, or alternative sensing systems operating through physical barriers.

## Limitations

Performance degrades on real-world recordings compared to simulations due to hardware noise and barrier distortion, and the current evaluation is restricted to machine-played sound exciter data rather than live human speech.

## Related

- (link related pages by id as the wiki grows)
