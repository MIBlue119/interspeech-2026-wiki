---
id: boeddeker26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2620
pdf: https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.pdf
---

# Speaker Identity as Sole Supervision for Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2620)

**TL;DR** — This paper demonstrates that monaural speech separation can be trained from scratch using only speaker identity supervision via a contrastive InfoNCE objective, eliminating the need for clean time-frequency waveform references or multichannel spatial cues.

## Problem

Traditional speech separation relies heavily on parallel clean reference signals for waveform- or spectrogram-level loss functions, or on multichannel spatial recordings for unsupervised setups, making them inapplicable to monaural, unlabelled real-world mixtures. While mixture-invariant training and self-remixing offer monaural alternatives, they often suffer from instability and over-separation issues. Using automatic speech recognition for supervision requires text transcriptions, whereas target speaker extraction models require auxiliary speaker conditioning vectors during both training and inference.

## Method

The authors propose Speaker-Identity Supervision (SIS), a contrastive learning framework using InfoNCE loss with temperature-scaled cosine similarity and a zero-flooring operation. During training, the model accesses auxiliary utterances from the true speakers active in the mixture during non-overlapping regions. A neural speaker embedding extractor (such as a jointly-trained or pretrained ECAPA-TDNN) maps separated outputs and auxiliary anchors to embeddings, maximizing similarity for matching speakers while repelling competing speakers using in-batch negatives. To prevent the embedder from adapting to separation artifacts, its parameters are frozen when processing separator estimates and updated only in a separate forward pass using clean auxiliary utterances. The separation network uses a simple STFT magnitude-based architecture with four BLSTMP layers (256 units) and a batch size of 24.

## Results

Experiments were conducted on the Libri2Mix max clean and noisy datasets using BSS Eval SDR, PESQ, STOI, DNSMOS, and WER. On Libri2Mix clean, supervised waveform-level training achieves an upper bound SDR of 15.6 dB, while the proposed SIS method trained from scratch with a jointly learned embedder reaches 8.1 dB SDR. Combining pre-trained speaker embeddings with auxiliary losses or domain adaptation further improves separation quality, successfully adapting models trained on clean data to noisy mixtures without needing parallel clean target references.

## Code

- https://github.com/merlresearch/sis_sep

## Applications

Speech and machine learning engineers working on monaural speech separation, speaker diarization, or domain adaptation for acoustic models in unlabelled, real-world conversational environments.

## Limitations

The approach requires access to clean auxiliary utterances containing single-speaker active regions for each target speaker within the training conversations.

## Related

- (link related pages by id as the wiki grows)
