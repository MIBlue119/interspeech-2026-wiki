---
id: sato26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2997
pdf: https://www.isca-archive.org/interspeech_2026/sato26_interspeech.pdf
---

# Latency Controllable Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/sato26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sato26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2997)

**TL;DR** — This paper proposes a latency-controllable speech enhancement framework using lightweight adapters, supporting seven latency modes in a single model while reducing stored parameters by 76%.

## Problem

Streaming speech enhancement requires balancing enhancement quality with algorithmic latency, which varies drastically across applications from a few milliseconds for hearing aids to hundreds of milliseconds for telephony. Most neural networks are trained for a single fixed lookahead, forcing engineers to deploy multiple full models to support different latency budgets. This rigid design increases deployment complexity, development overhead, and memory consumption.

## Method

The framework builds on an encoder-separator-decoder backbone (specifically Conv-TasNet with B=256, R=4, X=8, H=512, P=3) and inserts a bank of Latency Control Adapters (LCAs) after the fourth block of the separator. Each LCA is composed of depthwise-separable dilated 1D convolutional blocks (kernel size 3, X=6 blocks with dilations 2^0 to 2^5) configured with specific binary causality patterns to inject controlled amounts of future context. To avoid scaling parameter counts linearly with the number of latency modes, parameters are shared across adapters separately for causal and non-causal blocks. Training uses intra-batch multi-latency training by passing inputs through all K adapters simultaneously and averaging their negative SNR losses.

## Results

Evaluated on 50,000 training, 3,000 development, and 2,000 evaluation simulated noisy speech mixtures derived from LibriSpeech and the DNS4 challenge dataset at 16 kHz. A single shared-parameter LCA model supports seven latency modes (ranging from 20 ms to 650 ms for standard latency, and 5 ms to 162.5 ms for ultra-low latency), outperforming independently trained per-latency models in SDR and DNSMOS P.835 OVRL. The shared LCA model maintains a constant 1.46 G/s MAC footprint while cutting total stored parameters from 104.1M (for seven individual models) down to 16.5M. Ablations confirm that joint optimization of the backbone and intra-batch multi-latency training are crucial for maximizing multi-mode performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing real-time communication tools, VoIP pipelines, teleconferencing software, or hearing-assistive devices where dynamic latency switching is required.

## Related

- (link related pages by id as the wiki grows)
