---
id: jang26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-878
pdf: https://www.isca-archive.org/interspeech_2026/jang26_interspeech.pdf
---

# End-to-End Model Compression for Personalized Neural Speech Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/jang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-878)

**TL;DR** — This paper proposes Personalized Descript Audio Codec (PDAC), an end-to-end speaker-aware model compression framework for neural speech codecs that reduces model size by 96% and bitrate by 50% while maintaining perceptual quality.

## Problem

State-of-the-art neural speech codecs rely heavily on massive model capacities containing tens or hundreds of millions of parameters, making real-time processing and deployment on resource-constrained low-power devices infeasible. While prior personalization methods targeted only decoders or specific vocoders like LPCNet, closing the efficiency gap requires compressing the encoder, decoder, and quantizer together within an end-to-end framework.

## Method

The method introduces an exclusive (sparse) mixture of local experts framework applied to both the sender and receiver sides of the Descript Audio Codec (DAC). At the sender, a noise-robust Siamese speaker encoder extracts embeddings from input speech, which are matched using Euclidean distance against C=4 pre-defined speaker-group centroids derived via k-means clustering. The selected group index and compressed bitstream are transmitted to the receiver to activate the corresponding specialized encoder-decoder pair. The system uses three configurations—Large (baseline, 74.18M parameters), Small (14.99M parameters), and Tiny (3.02M parameters)—trained via the Adam optimizer with a batch size of 72 and initial learning rate of 10^-4 on the LibriSpeech dataset.

## Results

Evaluated on the LibriSpeech dataset mixed with MUSAN noise sources (SNR between -5 and 10 dB) using MUSHRA listening tests, Mel distance, STFT distance, SI-SDR, and PESQ metrics. Subjective evaluations demonstrate that personalized Small and Tiny models consistently outperform the generic Large (DAC-L) baseline across both clean and noisy conditions at 1 kbps and 2 kbps bitrates. The performance improvements are particularly pronounced at the lower bitrate of 1 kbps. Furthermore, the personalized models prove robust to acoustic distortions and mislabeled speaker groups.

## Code

- https://minjekim.com/research-projects/PNSC#interspeech2026

## Applications

Speech and ML engineers deploying neural speech codecs, real-time communications, and speech enhancement systems on edge devices or low-power hardware.

## Limitations

Performance can potentially degrade if speaker groups are severely mislabeled, though fine-tuning the classification and expert components mitigates this issue.

## Related

- (link related pages by id as the wiki grows)
