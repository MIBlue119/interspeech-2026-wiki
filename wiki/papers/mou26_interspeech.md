---
id: mou26_interspeech
category: speech-watermarking
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2298
pdf: https://www.isca-archive.org/interspeech_2026/mou26_interspeech.pdf
---

# DuraMark: Duration-Embedded Watermarking in LLM-based TTS

[PDF](https://www.isca-archive.org/interspeech_2026/mou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2298)

**TL;DR** — DuraMark is an information-level speech watermarking framework that embeds watermarks via syllable duration editing in an LLM-based TTS model, achieving a true positive rate above 95% against generative neural codec and vocoder attacks.

## Problem

Mainstream speech watermarking methods operate at the signal level (waveform or spectrogram), making them vulnerable to generative attacks like neural audio codecs and vocoders that smooth out redundant signal-level details. Prior information-level methods edit pitch values using traditional signal post-processing, which leads to unnatural prosody. DuraMark bridges this gap by introducing a robust generative watermarking framework that operates at the syllable duration level without degrading speech naturalness.

## Method

DuraMark integrates a duration-controllable LLM-based TTS model with a dedicated duration extractor. The TTS model uses an autoregressive transformer LLM to predict syllable duration tokens and speech tokens, followed by an Optimal Transport Conditional Flow Matching (OT-CFM) decoder to synthesize Mel-spectrograms. During embedding, syllable durations predicted by the LLM are explicitly edited to match binary watermark bits (even/odd state mapping). During training, the flow matching decoder utilizes a pre-trained, frozen duration extractor to provide auxiliary guidance (Lguide) so the output strictly adheres to the edited durations. Experiments used CosyVoice architecture trained on 10,000 hours of Mandarin Chinese from WenetSpeech with an Adam optimizer.

## Results

Evaluated on the AISHELL-3 test set across 33-64 syllable utterances, DuraMark achieved a True Positive Rate (TPR) exceeding 0.95 across all tested attacks at a 1.0% False Positive Rate. It significantly outperformed signal-level baselines (AudioSeal, Timbre, and WavMark), which suffered sharp performance drops (often falling below 0.10 TPR) under neural codec and vocoder attacks like SpeechTokenizer, FACodec, BigVGAN, Vocos, and HiFiGAN. In subjective naturalness evaluations, DuraMark achieved a Mean Opinion Score (MOS) of 4.04 ± 0.07, comparable to unwatermarked speech (4.05 ± 0.09) and outperforming WavMark (3.97). Ablation studies showed that removing duration input or guidance loss drastically degraded detection TPR to around 0.32–0.47.

## Code

- https://muzw.github.io/duramark_demo/

## Applications

Speech and ML engineers or security teams building AI-generated voice detection systems to prevent deepfake misuse and trace synthesized audio.

## Limitations

Evaluated primarily on Mandarin Chinese where syllables align directly with characters.

## Related

- (link related pages by id as the wiki grows)
