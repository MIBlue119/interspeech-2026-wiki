---
id: lee26v_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2931
pdf: https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.pdf
---

# Enhancing EMG-to-Speech via Silent-Voiced Representation Alignment

*Jiwon Lee, Injune Hwang, Jaejun Lee, Eungbeom Kim, Dongyub Han, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2931)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — The paper introduces Silent-Voiced Alignment (SVA), a multi-level representation loss that utilizes utterance-parallel silent and voiced facial EMG pairs to guide silent-to-speech mapping, achieving a statistically significant relative Word Error Rate (WER) reduction of 6.0% on standard benchmarks.

## Key contributions

- Proposes a novel Silent-Voiced Alignment (SVA) loss that maps silent EMG embeddings to their parallel voiced counterparts across both intermediate transformer layers and output layers.
- Formulates a joint Dynamic Time Warping (DTW) and soft-scheduling weighting mechanism to dynamically emphasize high-confidence silent-voiced alignments during training.
- Establishes a rigorous multi-seed evaluation protocol (10 independent random seeds, 200 epochs each) to explicitly account for high trial-to-trial variance and prove statistical significance in EMG-to-speech research.
- Demonstrates seamless plugin compatibility with both continuous mel-spectrogram (Gaddy et al.) and discrete soft speech unit (SU-ETS) baseline architectures.

## Problem

Reconstructing audible speech from silent facial electromyography (EMG) suffers from severe data scarcity and a complete lack of direct speech supervision because silent articulation produces no audible audio. Prior target-transfer approaches (such as Gaddy et al. and SU-ETS) rely entirely on mapping silent EMG to target speech representations while ignoring the rich structural and representational consistency present in utterance-parallel voiced-silent pairs. Because EMG signals are exceptionally noisy and limited in sample size, single-seed evaluations produce high performance fluctuations, bringing the reliability of prior reported averages into question.

## Method

The architecture comprises an EMG encoder featuring residual convolutional downsampling layers (reducing signals to 50Hz for soft units or 86.13Hz for mel-spectrograms) followed by a transformer module with dual output heads for phoneme classification and acoustic targets. During a two-stage training scheme, the encoder is first pretrained on voiced EMG and then fine-tuned on both silent and voiced data using a composite loss. The core SVA loss pairs silent EMG representations (Es) with voiced counterparts (Ev) sharing identical linguistic transcripts; because Es and Ev lengths diverge due to articulation variance, Dynamic Time Warping (DTW) establishes optimal alignment paths. This path computes an output-level SVA loss using weighted acoustic features and phoneme distributions, and is simultaneously reused to enforce cosine similarity constraints across hidden states at every transformer layer (Lh SVA). A sample-wise soft scheduling weight, parameterized by a sigmoid function over a threshold hyperparameter tau, scales the SVA loss dynamically to emphasize cleanly aligned pairs early in training. Training uses the AdamW optimizer with a batch size of 80, learning rate of 3e-4, weight decay of 1e-5, and a ReduceLROnPlateau scheduler.

## Experimental setup

Experiments use the Gaddy & Klein dataset containing 1,289 silent-voiced parallel pairs and 5,477 non-parallel voiced training utterances sampled via 8-channel facial EMG at 1000 Hz, with 98 test samples evaluated after filtering. Baselines include Gaddy's mel-spectrogram prediction model and SU-ETS (predicting HuBERT-Soft units followed by a HiFi-GAN vocoder). Metrics comprise Character Error Rate (CER), Word Error Rate (WER) using the Whisper-medium model, and Fréchet Speech Distance (FSD) extracted via WavLM. Models are trained for 200 epochs across 10 random seeds, reporting averages and paired t-test significance.

## Results

Under mel-spectrogram targets, the method achieves a CER of 12.88% and a WER of 25.14% (down from 14.16% and 26.75% for Gaddy's baseline, p=0.002), alongside an improved FSD of 6.28. Under soft speech unit targets, it yields 13.37% CER and 26.55% WER (improving over SU-ETS's 13.95% CER and 27.78% WER, p=0.009). Ablations reveal that combining output-level and hidden-layer alignment yields the strongest performance (25.14% WER for Mel, 26.55% for SU), whereas relying solely on hidden-level alignment degrades WER to 26.67%. FSD improvements were statistically significant under mel targets (p=0.0018) but not under soft unit targets (p=0.946).

| System | CER (%) ↓ | WER (%) ↓ | FSD ↓ |
|---|---|---|---|
| Gaddy's [3] (Mel) | 14.16 ± 0.76 | 26.75 ± 0.99 | 6.48 ± 1.70 |
| Ours (Mel) | 12.88 ± 0.49 | 25.14 ± 0.90 | 6.28 ± 1.63 |
| SU-ETS [5] (SU) | 13.95 ± 0.64 | 27.78 ± 0.85 | 8.99 ± 5.04 |
| Ours (SU) | 13.37 ± 0.44 | 26.55 ± 0.51 | 9.15 ± 5.08 |

## Limitations

Evaluations are restricted to a single publicly available dataset (Gaddy & Klein) featuring limited speaker diversity and English-only text, leaving multilingual generalization untested. The method strictly depends on the availability of utterance-parallel voiced-silent training pairs, restricting its applicability to un-paired silent speech data regimes. Hardware demands require multi-seed runs across 200 epochs, compounding training compute overhead.

## Why read this

Read this paper if you build silent speech interfaces or multi-modal representation alignment systems and need a robust training strategy to leverage parallel unannotated modalities. It provides a blueprint for replacing brittle direct target supervision with multi-level hidden and output space alignment backed by rigorous multi-seed statistical validation.

## Code

- https://github.com/jiwonlee-0218/SVAETS

## Applications

Silent speech communication interfaces for individuals with laryngeal injuries or neurodegenerative disorders, and covert secure communication in acoustically constrained or sensitive environments.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT, National IT Industry Promotion Agency

## Related

- (link related pages by id as the wiki grows)
