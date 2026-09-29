---
id: kumar26e_interspeech
category: tts
labels: [low-resource, multilingual, efficient-on-device, generative-model]
institutions: ["Indian Institute of Technology Mandi", "Indian Institute of Technology Madras", "Indian Institute of Technology Kharagpur"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2050
pdf: https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.pdf
---

# Lightweight Cross-Lingual Speaker Adaptation for Indic TTS

*Tarun Kumar, Keshav Agarwal, Pawan Goyal, Laxmidhar Behera, Hema A. Murthy*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2050)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `efficient-on-device`, `generative-model`

**TL;DR** — A lightweight, non-autoregressive cross-lingual voice adaptation pipeline for Indic text-to-speech requires only a 10-second reference sample and achieves a 53× speedup over flow-matching baselines while reducing word error rates by 18% to 22%.

## Key contributions

- A multilingual FastSpeech2 base model with dual-site ECAPA-TDNN speaker conditioning and an auxiliary cosine consistency loss, trained across four Indian languages using a Common Label Set (CLS).
- A four-stage synthetic data filtering pipeline leveraging phoneme-level CER, pitch statistics, duration thresholds, and log-likelihood pruning to turn voice-cloned data into a clean fine-tuning set.
- Demonstrated cross-lingual speaker adaptation from a single 10-second reference audio sample across Hindi, Marathi, Tamil, and Telugu without requiring target-speaker text or multi-speaker target recordings.

## Problem

State-of-the-art zero-shot voice cloning models such as IN-F5 rely on massive datasets and compute-heavy auto-regressive or flow-matching architectures (e.g., Diffusion Transformers requiring 32 ODE steps), which cause severe word-dropping errors, high word error rates, and prohibitively slow inference for low-resource deployment. While non-autoregressive models like standard FastSpeech2 are deterministic and fast, they lack robust mechanisms for high-fidelity zero-shot or few-shot speaker adaptation across diverse low-resource languages. Building reliable conversational and personalized TTS systems for Indian languages requires models that can rapidly adapt to a target voice from minimal data while maintaining structural stability and cross-lingual generalization.

## Method

The system architecture builds on a 71.4-million parameter FastSpeech2 model using a 4-layer Conformer encoder and decoder with a hidden dimension of 384, operating on 160-bin mel-spectrograms sampled at 48 kHz and paired with a HiFi-GAN V1 vocoder. Text is uniformly processed through a Common Label Set (CLS) containing 78 phonemes to bridge Indo-Aryan and Dravidian languages. To overcome the bottleneck of single-site global speaker conditioning, the authors introduce dual-site ECAPA-TDNN conditioning using 192-dimensional speaker embeddings. Conditioning Site (1) applies speaker injection before the variance adapter to steer prosody (duration, pitch, and energy), while Conditioning Site (2) injects speaker information into length-regulated features prior to the decoder to specialize acoustic-spectral properties. An auxiliary cosine consistency loss minimizes the distance between input speaker embeddings and predicted embeddings from a lightweight decoder head, with its loss weight linearly ramped up over the first 10 epochs.

The training pipeline begins with stage-one pretraining on 119 hours of multispeaker Indic data from IndicVoices-R and IndicTTS for 4,000 warmup steps using the Adam optimizer with a Noam schedule. In stage two, a 10-second reference sample of a male Hindi speaker is used to synthesize approximately 2,400 utterances via the IN-F5 voice cloning model. This synthetic corpus is filtered via a four-stage quality-control process: (1) phoneme-level Character Error Rate filtering via a data2vec ASR model discarding utterances with CER > 10%; (2) pitch filtering to remove global anomalies or excessive intra-utterance variation; (3) duration filtering to drop samples shorter than 2 seconds; and (4) log-likelihood pruning based on forced-alignment frame scores to eliminate samples two standard deviations below the mean. Stage three fine-tunes the pretrained FastSpeech2 base model on the resulting 2,088 clean utterances (2.34 hours) for 50 epochs at a learning rate of 1e-4 using a single A6000 GPU, adapting speaker layers without sacrificing multilingual phoneme knowledge.

At inference time, the model operates completely non-autoregressively in a single feed-forward pass, guaranteeing deterministic audio generation (zero standard deviation across repeated generations for fundamental frequency and syllable rate) and delivering an average inference latency of 0.25 to 0.87 seconds per utterance depending on text length.

## Experimental setup

Pretraining uses 119 hours across Hindi, Marathi, Tamil, and Telugu from IndicVoices-R and IndicTTS. Fine-tuning uses 2,088 filtered synthetic utterances (2.34 hours) generated from a 10-second reference. Baselines include the zero-shot IN-F5 model (a 337.1M-parameter Diffusion Transformer) and the unadapted Base FS2 multi-speaker model. Metrics include Character/Word Error Rate (WER) via a data2vec ASR model, Speaker Embedding Cosine Similarity (SECS) using ECAPA-TDNN against the 10-second reference, output determinism ($\sigma_{F0}$ and $\sigma_{syl}$ across 10 repetitions), Mean Inference Time (MI), and subjective Mean Opinion Score (MOS) and Speaker MOS (SMOS) evaluated by 15 native listeners per language. Implementation uses ESPnet2 on NVIDIA A6000 hardware.

## Results

The proposed adapted FastSpeech2 system achieves a relative Word Error Rate reduction of 18.6% on Hindi and an average of 21.8% across cross-lingual targets (Marathi, Tamil, and Telugu) compared to the IN-F5 baseline, driven by its non-autoregressive architecture that eliminates word omissions. Fine-tuning on the quality-controlled synthetic corpus provides an additional 14% to 16% relative WER reduction over the unadapted Base FS2 model, while increasing Speaker Embedding Cosine Similarity (SECS) from 0.78–0.81 up to 0.87–0.88 (closely tracking IN-F5's 0.89–0.91 range). Ablations on the filtering pipeline confirm that phoneme-level CER filtering removes the largest share of defective data (5.3% of initial utterances), outstripping pitch (3.0%), duration (1.1%), and log-likelihood (1.7%) trims. Subjectively, the system secures top-tier naturalness with MOS scores ranging from 3.82 to 4.14 across languages (significantly outperforming IN-F5's 3.41 to 3.68), while maintaining competitive speaker similarity (SMOS 3.68 to 4.02). Notably, the model operates completely deterministically ($\sigma_{F0} = 0.000$ Hz vs. IN-F5's ~5.2 Hz) and achieves a 53× inference speedup (0.25s vs. 13.3s per utterance) with a 4.7× smaller parameter footprint (71.4M vs. 337.1M parameters).

| System | Language | WER (↓) | SECS (↑) | MOS (↑) | Infer/utt (↓) |
|---|---|---|---|---|---|
| IN-F5 | Hindi | 11.8% | 0.91 | 3.68 | 14.87 s |
| Base FS2 | Hindi | 11.2% | 0.81 | 3.72 | 0.51 s |
| Ours (Adapted) | Hindi | 9.6% | 0.88 | 4.14 | 0.51 s |
| IN-F5 | Tamil | 15.7% | 0.89 | 3.41 | 12.15 s |
| Ours (Adapted) | Tamil | 12.1% | 0.87 | 3.82 | 0.42 s |

## Limitations

The current evaluation is restricted to a single 10-second target reference speaker for the adaptation experiments, leaving multi-speaker adaptation validation as future work. The upper bound of speaker similarity (SECS 0.87–0.88) remains slightly constrained by the acoustic similarity of the synthetic training corpus generated by the teacher model rather than direct reference conditioning at inference time. Scope is currently limited to four Indian languages (Hindi, Marathi, Tamil, and Telugu) out of the broader set of 22 scheduled for future expansion.

## Why read this

Speech and ML researchers working on low-resource voice cloning will find this paper a compelling blueprint for turning error-prone teacher models into fast, robust, non-autoregressive student models via quality-controlled synthetic data fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource personalized text-to-speech, cross-lingual voice cloning, on-device multilingual assistants, and expressive conversational speech generation.

## Institutions / 機構

Indian Institute of Technology Mandi, Indian Institute of Technology Madras, Indian Institute of Technology Kharagpur

**Funding / 經費:** Ministry of Electronics and Information Technology

## Related

- [IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis](varadhan26_interspeech.md) — same problem · relatedness 2.5/3
- [FlowEdit: Associative Memory for Lifelong Pronunciation Adaptation in Flow-Matching TTS](singh26c_interspeech.md) — same problem · relatedness 2.4/3
- [Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS](syllas26_interspeech.md) — same problem · relatedness 2.3/3
- [Universal Speech Content Factorization](xinyuan26_interspeech.md) — same problem · relatedness 2.2/3
- [OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models](zhu26e_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
