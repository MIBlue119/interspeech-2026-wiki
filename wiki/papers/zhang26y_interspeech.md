---
id: zhang26y_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Cornell University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1625
pdf: https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.pdf
---

# SoniSpeech: A Large-Scale Open-Vocabulary Tri-Modal Dataset for Wearable Silent Speech Interfaces

*Ruidong Zhang, Jiacheng Liu, François Guimbretière, Cheng Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1625)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — SoniSpeech is the first large-scale, open-vocabulary, trimodal dataset for wearable silent speech interfaces using acoustic-sensing eyewear, achieving a 26.3% word error rate (WER) on open-vocabulary silent speech recognition with a ResNet-34 CTC baseline.

## Key contributions

- Presents the first open-vocabulary, trimodal silent speech dataset using minimally-obtrusive acoustic-sensing eyewear: 34.1 hours, 18,000 utterances, and synchronized ultrasound, audio, and video modalities.
- Constructs a contemporary conversational English corpus drawn from the SODA social dialogue dataset, covering 5,356 unique words, full phoneme coverage, and colloquial expressions.
- Establishes the first open-vocabulary baseline for acoustic-sensing wearable SSI using a CTC-based ResNet-34, achieving 26.3% WER on silent speech and proving task tractability.
- Provides parallel voiced and silent utterance pairs to study cross-modal transfer and domain adaptation challenges between speaking modes.

## Problem

Wearable silent speech interfaces (SSIs) are currently caught in a trade-off where open-vocabulary systems rely on obtrusive hardware like facial electrodes or chin-mounted probes, while minimally-obtrusive form factors such as acoustic eyewear or depth-sensing devices are confined to small, closed command sets. This vocabulary bottleneck persists largely due to a critical scarcity of large-scale public data for unobtrusive wearable sensors. Without foundational open datasets, the speech community cannot adequately investigate whether continuous, natural language recognition is computationally tractable in lightweight wearable form factors.

## Method

The sensing hardware consists of modified eyeglass frames equipped with two Ole Wolff speakers and two Syntiant ultrasound microphones. Speakers transmit inaudible FMCW chirps (18-28 kHz and 29-39 kHz) that capture millimeter-level facial deformations as echo profiles, sampled at 100 kHz via a Teensy 4.0 microcontroller. Frontal video is captured concurrently at 1920x1080 resolution and 30 fps, with all modalities temporally synchronized using a clapping procedure.

The baseline architecture adapts a ResNet-34 for sequence modeling, taking 4-channel differential echo profiles (80 range bins covering ~27.2 cm) sampled at 200 Hz as input. The standard stem max-pool layer is removed, and temporal downsampling is handled via strided convolutions in the stem and residual stages 2-4, yielding a total 16x temporal reduction. Frequency-wise global average pooling collapses 2D feature maps to 1D sequences (512 dimensions per time step), followed by a linear projection to output logits. A SentencePiece Unigram tokenizer with a 1,000-unit vocabulary handles text.

Models are trained using Connectionist Temporal Classification (CTC) loss via the Adam optimizer (learning rate 2x10^-4, weight decay 10^-4) with an exponential decay scheduler and linear warm-up for 200 epochs at batch size 16. Data augmentations include SpecAugment (2 frequency masks, 3 time masks) and utterance concatenation (up to 3 utterances or 15 seconds per sample).

## Experimental setup

The dataset contains 34.1 hours of session-level data across 18,000 utterances (8,000 training sentences and 1,000 test sentences per mode) collected from a single speaker across 360 sessions (180 voiced, 180 silent). Baselines compare voiced-only, silent-only, and combined voiced+silent training configurations evaluated via Word Error Rate (WER) using greedy decoding without an external language model. Implementation uses Group Normalization (32 groups) and trains on the first 140 sessions of each mode.

## Results

The silent-only model achieves 33.7% WER on silent speech evaluation, while the voiced-only model achieves 16.9% WER on voiced evaluation. Combining voiced and silent training data improves the silent evaluation WER down to 26.3%, demonstrating that audible data provides a complementary training signal. A severe cross-modal mismatch exists when evaluating a voiced-trained model on silent speech (>50% WER), driven by different articulation dynamics and ultrasonic acoustic energy overlap.

| Training Data | Eval: Voiced WER | Eval: Silent WER |
|---|---|---|
| Voiced only | 16.9% | 78.4% |
| Silent only | 55.7% | 33.7% |
| Voiced + Silent | 15.8% | 26.3% |

## Limitations

The dataset is collected from a single non-native speaker in a controlled, quiet environment, leaving inter-speaker variability and environmental noise robustness for future work. The baseline system intentionally omits external language models, pretrained representations, or advanced contrastive learning objectives, serving purely as a raw lower bound.

## Why read this

Speech and machine learning researchers building wearable, unobtrusive silent speech interfaces will find this paper essential as a foundational dataset release and benchmark for open-vocabulary speech reconstruction from acoustic facial echoes.

## Code

- https://doi.org/10.7298/xjjr-9m85

## Applications

Accessible and private hands-free communication devices, silent dictation for smart eyewear, and cross-modal speech enhancement or voice conversion.

## Institutions / 機構

Cornell University

**Funding / 經費:** National Science Foundation, Qualcomm Innovation Fellowship

## Related

- (link related pages by id as the wiki grows)
