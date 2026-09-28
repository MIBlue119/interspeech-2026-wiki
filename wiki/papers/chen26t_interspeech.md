---
id: chen26t_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1882
pdf: https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.pdf
---

# A Preclinical Study of Electrolaryngeal Voice Conversion for a Novel Nasal Electrolarynx: Feature Choice and Data Augmentation

*Qi-Yan Chen, Ming-Chi Yen, Fo-Rui Li, Hsin-Te Hwang, Ching-Hung Lai, Shu-Wei Tsai, Ping-Cheng Yeh, Jyh-Shing Roger Jang, Yu Tsao, Hsin-Min Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1882)

**TL;DR** — This study presents the first systematic electrolaryngeal voice conversion (ELVC) system for a newly invented nasal electrolarynx (NEL), introducing an LLE-VC data augmentation method that improves Character Error Rate (CER) from 72.0% to 63.0%.

## Key contributions

- First systematic investigation of voice conversion for a nasal electrolarynx (NEL), contrasting its acoustics with traditional cervical electrolarynx (CEL) devices.
- Demonstrates that optimal feature representation is device-dependent: WavLM features excel for CEL, while 80-channel Mel-spectrograms better preserve NEL's unique mid-high-frequency resonances.
- Proposes a lightweight LLE-VC-based data augmentation strategy using a 10,000-sentence corpus (TWnews) to generate paired sNEL-sNL training data without training a dedicated TTS model.

## Problem

Traditional cervical electrolarynges (CEL) suffer from loud mechanical excitation noise, rigid pitch, and awkward neck placement. A recently invented nasal electrolarynx (NEL) places the vibrator at the entrance of the nasal cavity for internal acoustic coupling, reducing mechanical noise and enabling hands-free operation. However, NEL speech exhibits unusual acoustic patterns—such as severe low-frequency attenuation and prominent mid-high-frequency nasal cavity resonances—causing standard CEL-oriented voice conversion and general zero-shot VC baselines to fail.

## Method

The system builds upon sequence-to-sequence transformer VC frameworks (VTN-VC and its advanced variant ETN-VC). The training uses a multi-stage recipe: (1) pretraining an acoustic decoder on 44 hours of COSPRO dataset text-to-speech data, (2) freezing the decoder while aligning encoder representations to speech inputs, and (3) fine-tuning on parallel electrolaryngeal-to-natural (EL-NL) pairs. ETN-VC introduces an intermediate pretraining stage leveraging synthetic pairs generated via Locally Linear Embedding VC (LLE-VC). Using F5-TTS on the 10k-sentence TWnews corpus, natural text is synthesized to natural speech (sNL) and then converted to synthetic NEL (sNEL) via LLE-VC using 6th-layer WavLM-Large neighbor retrieval. For input features, the model contrasts 1024-dimensional WavLM layer-6 embeddings against 80-dimensional Mel-spectrograms. Mel-spectrograms are directly constructed via LLE-VC neighbor matching to retain sharp spectral peaks, bypassing vocoder-induced degradation present in feature reconstruction.

## Experimental setup

Evaluated on Mandarin Chinese TMHINT sentences (320 utterances by a healthy speaker; 240 train, 40 dev, 40 test). NEL speech was recorded in a hospital ward to mirror real clinical acoustics, while NL and CEL were recorded in a studio. Evaluated via Mel-Cepstral Distortion (MCD), F0 RMSE, F0 CORR, duration error (DDUR), Character Error Rate (CER via Whisper-Large), Syllable Error Rate (SER), SpeechBERTScore, UTMOS, MOSA-Net+, and 30-participant A/B listening tests.

## Results

ETN-VC with Mel-spectrograms reduces CER from 72.0% down to 63.0% and SER from 58.8% down to 53.8% on NEL-to-NL conversion when scaling synthetic pretraining data from 1k to 10k utterances. While WavLM-based models achieve higher non-intrusive quality scores (UTMOS 2.998 vs 2.666 for Mel), Mel-spectrogram models decisively win human A/B intelligibility tests and yield lower ASR error rates because they successfully preserve critical mid-high-frequency nasal resonances that WavLM flattens out.

| System | Feature | CER (%) ↓ | SER (%) ↓ | UTMOS ↑ |
|---|---|---|---|---|
| Unprocessed NEL | ✗ | 90.8 ± 2.4 | 89.5 ± 6.3 | 1.30 |
| VTN-VC | Mel-spectrogram | 72.0 ± 6.6 | 58.8 ± 6.4 | 2.47 |
| VTN-VC | WavLM-layer6 | 71.5 ± 7.7 | 62.0 ± 5.6 | 2.94 |
| ETN-VC (10k sNEL) | Mel-spectrogram | 63.0 ± 7.4 | 53.8 ± 4.8 | 2.67 |
| ETN-VC (10k sNEL) | WavLM-layer6 | 65.8 ± 7.4 | 54.3 ± 5.6 | 3.00 |

## Limitations

The study is strictly preclinical, relying on a single healthy speaker simulating NEL speech rather than actual laryngectomy patients. Evaluation is restricted to Mandarin Chinese, and tests only a single architectural backbone and select SSL layers.

## Why read this

Speech engineers and medical audio researchers working on voice restoration should read this to see how self-supervised feature representations break down on alternative excitation mechanisms like nasal electrolarynges, and why classical Mel-spectrograms combined with LLE augmentation outperform SSL for high-distortion speech reconstruction.

## Code

- https://ymchiqq.github.io/nelvc_demo/

## Applications

Assistive speech restoration, real-time voice conversion for laryngectomy patients using nasal electrolarynx hardware, and biomedical voice prosthetics.

## Related

- (link related pages by id as the wiki grows)
