---
id: deguchi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2971
pdf: https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.pdf
---

# Non-Autoregressive Minimum Bayes' Risk Decoding for Fast Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2971)

**TL;DR** — The paper introduces non-autoregressive minimum Bayes' risk (NAR-MBR) decoding to speed up speech recognition while improving accuracy, achieving up to 43.1x faster decoding than autoregressive beam search without requiring model retraining.

## Problem

Standard autoregressive (AR) decoding in state-of-the-art ASR models is computationally slow because it generates tokens sequentially. Non-autoregressive (NAR) decoding provides parallel generation and faster speeds, but suffers from performance degradation due to the multi-modality problem under uncertainty. Traditional MBR decoding resolves some uncertainty through expected utility maximization, but is too computationally expensive for NAR frameworks.

## Method

The authors propose NAR-MBR decoding for the Mask-CTC architecture, utilizing probabilistic unbiased sampling via categorical and Bernoulli distributions to generate multiple CTC paths and mask tokens in a single forward pass. It maximizes expected utility based on word error rate using an efficient edit distance calculation that incorporates prefix/suffix removal and score caching for duplicate sample pairs. Experiments evaluate sample sizes of 64 and 256, and inference iterations of Niter in {0, 1, 10} using ESPNet with 8 CPU cores and an RTX 6000 Ada GPU.

## Results

Evaluated on LibriSpeech, Switchboard, AMI, and a web presentation corpus, NAR-MBR decoding consistently outperformed standard NAR decoding in word error rate with statistical significance. On the web presentation corpus, NAR-MBR with |Z|=64 at Niter=1 ran 43.1 times faster than AR beam search while maintaining comparable accuracy. Increasing the sample size up to 256 improved WER stability, whereas increasing inference iterations beyond Niter=1 did not yield further performance gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers looking to deploy real-time or high-throughput automatic speech recognition systems where low latency and high transcription accuracy are both critical.

## Limitations

GPU memory usage increases during inference iterations due to the computational cost of the conditional masked language model decoder.

## Related

- (link related pages by id as the wiki grows)
