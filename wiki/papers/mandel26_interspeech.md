---
id: mandel26_interspeech
category: tts
labels: [self-supervised, generative-model]
institutions: ["OriginAI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1663
pdf: https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.pdf
---

# From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data

*Moshe Mandel, Shlomi E. Chazan*

[PDF](https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1663)

**Category:** `tts` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — We propose a zero-shot, any-to-any voice conversion framework using a palindromic training strategy with WavLM features and a waveform-level speaker loss, outperforming baselines in speaker similarity while being trained exclusively on 960 hours of English data.

## Key contributions

- A non-parallel, zero-shot, any-to-any voice conversion framework leveraging controlled KNN-based synthetic data generation for scalable supervision.
- A waveform-level speaker verification loss that directly optimizes speaker identity similarity and improves Equal Error Rate.
- Demonstration of strong zero-shot cross-lingual generalization to multiple unseen languages without any fine-tuning.
- A three-stage training pipeline including vocoder pre-training, transformer conversion training, and specialized vocoder post-training.

## Problem

Traditional voice conversion frameworks either rely on expensive parallel corpora or use imperfect disentanglement-based methods that leak speaker info or degrade linguistic content. Recent KNN-based retrieval approaches avoid disentanglement but suffer severely in one-shot or short-prompt settings due to sparse target neighbors and poor intelligibility. These limitations matter because collecting large parallel multi-speaker datasets is practically infeasible, demanding robust zero-shot solutions that maintain speaker identity and prosody from very short references without complex manual annotation or ASR/TTS bottlenecks.

## Method

The framework utilizes an end-to-end architecture comprising a pretrained WavLM encoder (6th layer), a transformer-based latent converter, and a HiFi-GAN vocoder. Training occurs in three stages: first, a vocoder is pre-trained to auto-encode WavLM features using Multi-Resolution STFT and adversarial MPD/MSD losses. Second, a 6-layer transformer with 16 attention heads and a hidden dimension of 1024 is trained using a palindromic setup where offline KNN-retrieved WavLM features from a target audio act as synthetic inputs, and the real target audio acts as supervision. The transformer objective combines an L1 feature loss with a waveform-level speaker verification loss computed using a pretrained Redimnet/speaker model (comparing cosine similarity and L1 distance between reference and converted waveforms). Third, a new vocoder instance is post-trained on the converted features produced by the transformer to mitigate distribution mismatch and reduce auditory artifacts.

At inference time, the model bypasses KNN retrieval and ingests real source speech directly, utilizing only a short reference prompt from the target speaker. This design was chosen because synthetic-to-real palindromic training circumvents the need for aligned parallel data while stabilizing identity transfer through explicit waveform-level speaker supervision.

## Experimental setup

Models were trained on 960 hours of the English LibriSpeech dataset. Evaluation was conducted on LibriSpeech (English) and Multilingual LibriSpeech test sets covering Dutch, French, German, Italian, Polish, Portuguese, and Spanish across 4 prompt durations (3, 10, 30, 60 seconds) with 3 seeds of 50 pairs. Baselines include SdVC, KNN-VC, Vevo, and OOVC. Metrics include Speaker Similarity, Equal Error Rate (EER) via Redimnet, Word Error Rate (WER) and Character Error Rate (CER) via Whisper-Large-V3, DNS-MOS, and subjective MOS/SMOS. The transformer has 77M parameters and was trained for 800K steps using Adam at a 3e-4 learning rate; vocoders were trained for 100K steps.

## Results

On English evaluation sets, our method achieves a speaker similarity of 0.612, 0.713, 0.717, and 0.712, and EERs of 0.097, 0.180, 0.170, and 0.150 for 3, 10, 30, and 60-second prompt durations respectively, consistently outperforming KNN-VC (which scores 0.380, 0.552, 0.617, and 0.631 in similarity for the same durations). Intelligibility remains highly competitive, maintaining WER values between 0.047 and 0.056. The performance delta is exceptionally wide in ultra-low resource settings (3-second prompts), where the proposed method dramatically exceeds KNN-VC and other baselines in speaker preservation and subjective SMOS (reaching 4.00 at 10 seconds). Ablations confirm that vocoder post-training is essential for boosting DNS-MOS scores (from ~3.39 to ~3.83 at 60 seconds) by eliminating synthetic artifacts while maintaining speaker similarity and low WER.

| System | Prompt Dur. (s) | Spk Sim (↑) | EER (↑) | WER (↓) |
|---|---|---|---|---|
| KNN-VC | 3 | 0.380 | 0.033 | 0.430 |
| KNN-VC | 30 | 0.617 | 0.070 | 0.042 |
| Ours | 3 | 0.612 | 0.097 | 0.056 |
| Ours | 10 | 0.713 | 0.180 | 0.049 |
| Ours | 30 | 0.717 | 0.170 | 0.047 |
| Ours | 60 | 0.712 | 0.150 | 0.050 |

## Limitations

The framework is currently evaluated primarily on read speech corpora (LibriSpeech) and lacks testing on highly expressive, conversational, or singing voice data. Cross-lingual performance is assessed in zero-shot transfer without fine-tuning, but vocabulary scope is bounded by the acoustic coverage of the English training corpus. The system relies on offline KNN feature retrieval galleries during the data preparation phase, which can scale memory requirements for massive reference banks.

## Why read this

Speech and ML engineers building zero-shot voice conversion systems should read this paper to see how waveform-level speaker verification losses and palindromic synthetic training can drastically boost short-prompt speaker similarity without requiring complex disentanglement networks or parallel corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time or offline zero-shot voice conversion, cross-lingual dubbing, personalized text-to-speech voice cloning, and audio anonymization.

## Institutions / 機構

OriginAI

## Related

- [CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion](song26_interspeech.md) — same problem · relatedness 2.9/3
- [SSL-GMMVC: Interpretable Voice Conversion via Locally Linear GMM Transforms in Self-Supervised Representation Space](tanabu26_interspeech.md) — same problem · relatedness 2.9/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.8/3
- [Universal Speech Content Factorization](xinyuan26_interspeech.md) — same problem · relatedness 2.8/3
- [MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion](ma26c_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
