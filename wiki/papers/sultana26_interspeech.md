---
id: sultana26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1607
pdf: https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.pdf
---

# A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1607)

**TL;DR** — The paper introduces FASQA, a fine-grained acoustically-aware pre-training framework for speech quality assessment that jointly models spectral-temporal dependencies and acoustic distortions to improve mean opinion score prediction.

## Problem

Standard self-supervised speech models prioritize long-term contextual and speaker information while making their representations invariant to background acoustics, which impairs their performance on perceptual tasks like speech quality assessment. Furthermore, these models often struggle to generalize across unseen acoustic domains and environmental distortions because they are typically pre-trained primarily on clean speech. This limitation hinders reliable automatic speech quality evaluation in real-world noisy and reverberant conditions.

## Method

The proposed FASQA framework consists of a Local Spectral-Temporal Encoding (LSpTE) module with depthwise 2D convolutions and a Frame-wise Spectral Relationship Aggregator (FSpRA) using multi-head attention along the spectral dimension. The encoder is jointly optimized using twelve multi-task MLP workers: four regression tasks (waveform, log power spectrum, mel-frequency cepstral coefficients, and prosody), three binary classification tasks (local info max, global info max, sequence predictive coding), and five acoustic workers. These acoustic workers include noise type, SNR level, spectral energy distribution, direct-to-reverberation ratio (DRR), and narrowband versus wideband frequency bandwidth classification. The pre-training utilizes clean data from LibriSpeech alongside synthesized noisy and reverberant signals derived from FSDKaggle2018, Hu Corpus, NoiseX-92, and simulated room impulse responses.

## Results

Evaluated on MOS prediction benchmarks including NISQA, IUB, and TMHINTQI datasets, the proposed encoder creates clearer latent feature clusters for different environmental distortions compared to baselines like PASE. The pre-trained embeddings are frozen and fed into a regressor head with a single hidden layer to predict NISQA-compatible MOS ratings ranging from 1 to 5. The model achieves competitive performance across out-of-domain and out-of-distribution test sets while maintaining a significantly smaller parameter footprint than massive general-purpose self-supervised models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building automated telephony monitoring systems, voice quality assurance pipelines, or real-time communication evaluation tools.

## Related

- (link related pages by id as the wiki grows)
