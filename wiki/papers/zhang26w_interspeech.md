---
id: zhang26w_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1588
pdf: https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.pdf
---

# BACH: Benchmarking Audio Codecs for Bio-Acoustic Health

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1588)

**TL;DR** — BACH is the first systematic benchmark for evaluating neural audio codecs on bio-acoustic health tasks, revealing a fundamental misalignment between signal reconstruction fidelity and downstream diagnostic performance.

## Problem

Bio-acoustic health signals like heartbeats, snoring, and lung sounds are critical for remote diagnostics, but their efficient transmission requires compression without losing diagnostic cues. Although neural audio codecs achieve high compression and reconstruction quality for speech and general audio, their ability to preserve task-relevant semantic information in specialized medical domains remains unverified.

## Method

The authors introduce a unified three-view evaluation framework comprising the original audio domain, compressed token domain, and reconstructed audio domain. Eight representative neural audio codecs—spanning multi-codebook (DAC, EnCodec), single-codebook (WavTokenizer, BigCodec), decoupling-based (SpeechTokenizer, FACodec), and semantic-based (UniCodec, SemantiCodec) architectures—are configured to operate at nearly 1 kbps. Downstream classification uses a standardized pipeline consisting of a linear alignment layer, a Transformer Encoder, and a feed-forward classification head trained with the AdamW optimizer (learning rate 5e-4, batch size 32, 50 epochs).

## Results

Evaluated across five bio-acoustic health datasets (Snoring, HeartSound, ICBHI, MSTI, and VocalSound) totaling over 34 hours of audio, using Accuracy, F1-Score, UTMOS, PESQ, and STOI metrics. Decoupled codecs like SpeechTokenizer and FACodec achieve superior downstream classification performance by isolating semantic information, whereas conventional codecs like DAC and EnCodec yield higher reconstruction fidelity (measured by PESQ and STOI) but lower task accuracy. Increasing the number of codebooks improves signal reconstruction quality but yields limited gains in downstream task performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing remote healthcare monitoring systems, telemedicine applications, and efficient bio-acoustic signal transmission architectures.

## Limitations

The benchmark is currently limited to five bio-acoustic health datasets and extremely low bitrates around 1 kbps, leaving real-world deployment robustness across broader tasks for future work.

## Related

- (link related pages by id as the wiki grows)
