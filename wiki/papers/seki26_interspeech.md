---
id: seki26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1833
pdf: https://www.isca-archive.org/interspeech_2026/seki26_interspeech.pdf
---

# Improving DF-Conformer using Hydra for high-fidelity generative speech enhancement on discrete codec token

[PDF](https://www.isca-archive.org/interspeech_2026/seki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1833)

**TL;DR** — This paper replaces the linear attention mechanism (FAVOR+) in the DF-Conformer of the Genhancer generative speech enhancement framework with a bidirectional state-space model called Hydra, improving speech enhancement quality while preserving linear complexity.

## Problem

Linear attention variants like FAVOR+ achieve O(T) complexity by approximating softmax attention, but they suffer from poor focus ability, restricted feature diversity, and semantic confusion due to non-injectivity. These limitations cause performance bottlenecks in modern generative speech enhancement models that rely on efficient sequence backbones. Overcoming these approximation errors without sacrificing computational scalability is crucial for high-fidelity speech restoration.

## Method

The authors introduce DC-Hydra, substituting FAVOR+ in the DF-Conformer blocks with Hydra, a quasiseparable matrix mixer formulation of bidirectional Mamba-2 that models forward and backward sequences independently without sharing diagonal parameters. The architecture consists of latent denoiser (8 blocks, 256 channels) and token generator (12 blocks, 512 channels) networks integrating dilated depthwise convolutions and feed-forward layers. Models contain roughly 98M to 106M parameters and are trained using the AdamW optimizer with a cosine schedule for 400k steps on 8-second audio chunks.

## Results

Evaluated on the DAPS dataset using 1,200 test samples, the proposed Hydra-based Genhancer achieves 3.44 DNSMOS, 4.81 NISQA, 3.48 UTMOS, 0.88 SpeechBERTScore, 0.84 LPS, 0.83 SpkSim, and 88.95% character accuracy, outperforming the original FAVOR+ baseline (3.46 DNSMOS, 4.76 NISQA, 3.53 UTMOS, 0.88 SpeechBERTScore, 0.83 LPS, 0.79 SpkSim, 87.88% CAcc) and the addition-based Bi-Mamba variant. While a full softmax attention variant achieves slightly higher UTMOS (3.83), it suffers catastrophic memory scaling and performance collapse on 96-second long sequences, whereas Hydra maintains robust performance.

## Code

- https://github.com/goombalab/hydra

## Applications

Speech and machine learning engineers working on high-fidelity generative speech enhancement, noise suppression, and neural codec-based audio restoration systems.

## Limitations

Like many generative speech approaches, the models can produce hallucinations such as breathing artifacts that reduce raw character accuracy compared to noisy inputs.

## Related

- (link related pages by id as the wiki grows)
