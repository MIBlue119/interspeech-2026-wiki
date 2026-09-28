---
id: gichamba26_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3493
pdf: https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.pdf
---

# Probing Low Frame Rate Degradation in Neural Audio Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3493)

**TL;DR** — An investigation into neural audio codec degradation at ultra-low frame rates reveals that a severe quality cliff is caused by training sequence length misconfigurations rather than intrinsic phonemic collisions or codebook saturation.

## Problem

Neural audio codecs operating at low frame rates are highly desirable for cutting the generation costs of autoregressive speech synthesis systems, but prior work observed a catastrophic quality cliff around 6.25 Hz. Researchers previously blamed this drop on phonemic collisions or codebook saturation, which threatened to impose a hard lower bound on codec bitrates. Understanding the true mechanism is crucial for engineers building efficient, low-latency speech language models.

## Method

The study conducts a controlled frame rate ablation of the 16 kHz Descript Audio Codec (DAC) architecture across frame rates ranging from 1.6 Hz to 100 Hz, holding quantization levels (nq = 12) and vocabulary size (|V| = 1024) constant. Models are trained on LibriSpeech train-clean-100 for 100,000 iterations using an Adam optimizer. The investigation tests whether standard training configurations—specifically keeping training clip duration fixed rather than matching token sequence length—starve the decoder of inter-token context at low frame rates.

## Results

Under standard fixed clip duration training, reducing frame rates past 12.5 Hz triggers a dramatic failure at 6.25 Hz, where Word Error Rate (WER) spikes to 107.4% and Short-Time Objective Intelligibility (STOI) plummets to 0.46. However, when training sequence length is controlled to supply a consistent number of tokens per clip, the 6.25 Hz model achieves a much lower WER of 15.37%, and intelligible speech persists smoothly down to 3.1 Hz and 1.6 Hz (192 bps). Evaluations rule out phonemic collision and codebook saturation as root causes, demonstrating that codebook utilization remains above 98.7% across all frame rates.

## Code

- https://wakandaai.github.io/low-frame-rate-codec/

## Applications

Speech and ML engineers developing low-latency autoregressive text-to-speech, spoken dialogue systems, and speech language models can leverage these findings to train robust ultra-low bitrate tokenizers.

## Limitations

The evaluation focuses primarily on read English speech via LibriSpeech, and reconstructed audio quality at extreme low frame rates still reflects inherent representational capacity limits.

## Related

- (link related pages by id as the wiki grows)
