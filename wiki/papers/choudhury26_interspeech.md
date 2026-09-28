---
id: choudhury26_interspeech
category: security
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3500
pdf: https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.pdf
---

# Impact Analysis of Speech Representation Learning Models for Acoustic Side-Channel Attack

[PDF](https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3500)

**TL;DR** — This paper introduces KEYAC, a multi-channel keystroke acoustic dataset, and demonstrates that Kolmogorov-Arnold Networks (KAN) significantly improve acoustic side-channel attack (ASCA) accuracy across different keyboards and VoIP codecs.

## Problem

Acoustic side-channel attacks on keyboards have raised serious security and privacy concerns, but prior research relies on small-scale datasets, outdated hardware, or manual features without evaluating modern speech pretrained models. Furthermore, existing approaches struggle to generalize across diverse physical keyboards and real-world Voice-over-IP (VoIP) transmission codecs due to spectral and temporal distortions. This work addresses the lack of benchmark datasets and effective adaptation techniques for realistic ASCA environments.

## Method

The authors introduce KEYAC, containing 37,440 keystroke samples from 37 keyboards captured across local microphones, smartphones, and VoIP pipelines (Zoom/Teams). Six speech PTMs (Wav2Vec2, HuBERT, WavLM, Whisper, X-Vectors, and XLS-R) are evaluated with frozen backbones. To overcome the limitations of conventional linear adaptation layers, a Kolmogorov-Arnold Network (KAN) adapter replaces standard FCN and CNN heads. The KAN adapter utilizes a single hidden layer with 30 units, grid size 5, and spline order 3 to model complex nonlinear feature interactions.

## Results

Evaluated using accuracy and macro-F1 across in-domain and out-of-domain cross-validation protocols, WavLM consistently outperforms other PTM baselines (achieving 58.34% accuracy with a CNN downstream in-domain on standard recordings). Standard FCN and CNN adapters suffer sharp performance drops under VoIP codec compression and unseen keyboards. Incorporating the KAN-based fine-tuning strategy consistently surpasses baseline architectures, establishing a new state-of-the-art on KEYAC across all generalization scenarios.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security engineers and researchers analyzing acoustic side-channel vulnerabilities in remote teleconferencing and public communication environments.

## Limitations

Performance degrades significantly under VoIP codec-induced compression and spectral distortions when using conventional linear adaptation layers.

## Related

- (link related pages by id as the wiki grows)
