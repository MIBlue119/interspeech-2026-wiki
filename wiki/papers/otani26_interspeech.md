---
id: otani26_interspeech
category: tts
labels: [generative-model]
institutions: ["Tokyo University of Science", "Nippon Institute of Technology"]
code: https://github.com/y-otn/m2s-code
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3379
pdf: https://www.isca-archive.org/interspeech_2026/otani26_interspeech.pdf
---

# Speaker-Independent Speech Synthesis from Real-time MRI Articulatory Data

*Yuto Otani, Shun Sawada, Hidefumi Ohmura, Kouichi Katsurada*

[PDF](https://www.isca-archive.org/interspeech_2026/otani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/otani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3379)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — A speaker-independent speech synthesis method generates speech waveforms from real-time MRI (rtMRI) videos using EfficientNetV2, E-Branchformer, and BigVGAN-v2, guided by cross-modal training with speaker embeddings. It achieves strong linguistic intelligibility (read speech dWER down to 4.5%) and captures relative prosodic patterns from visual articulatory data alone.

## Key contributions

- Proposes a speaker-independent rtMRI-to-speech framework that eliminates the need for target speaker reference audio at inference.
- Introduces a cross-modal training strategy matching an attention-pooled MRI-derived speaker representation to a frozen audio-derived X-vector space via FiLM conditioning.
- Integrates an F0 correlation loss operating on high-periodicity frames to successfully recover relative prosodic variations directly from midsagittal vocal tract movements.
- Evaluates the system on a large-scale corpus (USC 75-Speaker Speech MRI Database) across read, spontaneous, and non-lexical speech.

## Problem

Prior speech synthesis methods utilizing real-time MRI (rtMRI) data are predominantly speaker-dependent, preventing them from generalizing to unseen speakers during inference. Alternative attempts to handle unseen speakers either rely on intermediate text-to-speech (TTS) pipelines that bypass direct articulatory-to-acoustic mapping or fail to explicitly model prosody and speaker identity. This creates a critical gap in generating high-fidelity speech driven entirely by the unique articulatory dynamics of novel speakers, which is vital for speech rehabilitation and computer-assisted pronunciation training.

## Method

The architecture processes 84x84 pixel rtMRI video segments frame-by-frame using an EfficientNetV2-B0 image encoder up to its global average pooling layer. The resulting sequence features are mapped via linear projection and layer normalization into an E-Branchformer Base temporal modeling network. The E-Branchformer output is conditioned via Feature-wise Linear Modulation (FiLM), applying channel-wise affine transformations whose scale and shift parameters are generated dynamically.

To bridge the modalities without reference audio at inference, the model trains via two parallel pathways. A frozen TDNN X-vector extracts an audio-derived speaker embedding from reference recordings, while an attention pooling mechanism followed by an MLP aggregates the E-Branchformer temporal outputs into an MRI-derived speaker embedding. A cosine similarity loss aligns the MRI embedding with the frozen audio embedding. Simultaneously, a linear F0 estimation head applies a Pearson correlation loss in the log-F0 domain strictly on voiced frames (aperiodicity index <= 0.5) to capture relative pitch dynamics.

The training loss is a weighted sum of MSE mel-spectrogram losses for both paths (lambda_M = 0.4), the cosine similarity loss (lambda_c = 0.1), and the F0 correlation loss (lambda_F0 = 0.1). The estimated 80-dimensional log-mel-spectrograms drive a BigVGAN-v2 vocoder pre-trained on LibriTTS and fine-tuned on speaker rtMRI mel-spectrograms with an upsampling ratio of 192. The model uses approximately 33M trainable parameters and is optimized via AdamW with a learning rate schedule starting at 1e-6, warming up to 5e-4 over 50 epochs, and annealing back to 1e-6 across 500 epochs.

## Experimental setup

Experiments utilized the USC 75-Speaker Speech MRI Database, filtered down to 51 speakers (24 male, 27 female) after removing silent or acoustically inconsistent sessions based on speaker embedding distance thresholds. The dataset was split into 43 training, 4 validation, and 4 test speakers. Training segments spanned 384 frames (~4.6 seconds) at an 83.28 fps rtMRI frame rate. Evaluations used differential word error rate (dWER) and differential character error rate (dCER) via the NVIDIA Parakeet TDT 0.6B V2 ASR model, F0 RMSE, Pearson F0 correlation, and Speaker Encoder Cosine Similarity (SECS).

## Results

The proposed rtMRI-driven path achieved read speech dWER ranging from 4.5% to 11.1% and dCER from 1.8% to 5.6%, matching the competitive performance of an audio-guided baseline path using target X-vectors. Spontaneous speech showed higher error rates (dWER 7.9% to 30.2%) due to reduced articulatory precision, while nonce syllables yielded the highest errors owing to ASR limitations on non-lexical words. For prosody, the rtMRI path achieved Pearson F0 correlations of 0.38 to 0.57 overall, increasing to 0.62 to 0.76 on high-periodicity frames, indicating that relative prosody is effectively learned. Speaker identity measured via SECS reached 0.95 to 0.96; however, pairwise similarity matrices revealed high confusion among within-gender speakers.

| System / Condition | Read dWER (%) | Read dCER (%) | F0 Corr (High-Period) | SECS |
|---|---|---|---|---|
| Audio Path (sub20) | 7.0 | 3.1 | 0.70 | 0.98 |
| rtMRI Path (sub20) | 4.5 | 1.8 | 0.62 | 0.95 |
| Audio Path (sub55) | 8.3 | 3.5 | 0.76 | 0.95 |
| rtMRI Path (sub55) | 4.6 | 2.2 | 0.76 | 0.95 |

## Limitations

Absolute F0 estimation remains inaccurate because vocal fold tension and fundamental frequency drivers are not directly visible in the midsagittal vocal tract plane. Within-gender speaker discrimination is constrained due to the limited spatial resolution and single-plane capture of rtMRI. The evaluation relies on a modest test set of 4 speakers, and the models are currently restricted to English read and spontaneous speech datasets.

## Why read this

Speech and ML researchers working on multi-modal synthesis or articulatory inversion should read this to see how cross-modal contrastive embedding alignment can enable speaker-independent generation from silent visual data without downstream text pipelines.

## Code

- https://github.com/y-otn/m2s-code

## Applications

Computer-assisted pronunciation training (CAPT) systems and speech rehabilitation tools for individuals with motor speech disorders.

## Institutions / 機構

Tokyo University of Science, Nippon Institute of Technology

**Funding / 經費:** JSPS KAKENHI, JST SPRING

## Related

- [Tongue2Speech: Real-Time Speech Synthesis from Tongue Ultrasound Videos via Spatiotemporal Transformers](sonkar26_interspeech.md) — same problem · relatedness 2.6/3
- [Feature Design and Generative Modelling in Deep Articulatory Synthesis](mcghee26_interspeech.md) — same problem · relatedness 2.1/3
- [GETS: Guiding EMG-to-Speech Synthesis via Silent Speech Recognition](lee26r_interspeech.md) — same problem · relatedness 2.1/3
- [Enhancing EMG-to-Speech via Silent-Voiced Representation Alignment](lee26v_interspeech.md) — same problem · relatedness 2.0/3
- [TAP-ETS: Time Aligned Phoneme Guiding for EMG-to-Speech Synthesis](han26f_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
