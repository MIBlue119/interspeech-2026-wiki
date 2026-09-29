---
id: correa26_interspeech
category: tts
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1397
pdf: https://www.isca-archive.org/interspeech_2026/correa26_interspeech.pdf
---

# From Tokens to Faces: Investigating Discrete Speech Representations for 3D Facial Animation

*Pedro R. Corrêa, Olivier Perrotin, Samir Sadok, Paula D. P. Costa, Thomas Hueber*

[PDF](https://www.isca-archive.org/interspeech_2026/correa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/correa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1397)

**Category:** `tts` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — This paper evaluates four speech representation families (semantic, semantic+acoustic, acoustic, and label-based) for 3D facial animation, revealing that phonetic class encoding combined with an absence of low-structured acoustic information is vital for accurate lip sync. It also introduces a unified Audio-Visual Text-to-Speech (AVTTS) pipeline that decodes text into synchronized speech audio and facial motion from shared discrete tokens.

## Key contributions

- Comprehensive evaluation of 8 model combinations crossing 4 speech encoders (HuBERT, SpeechTokenizer, WavTokenizer, CosyVoice2) with 2 facial decoders (GRU, Transformer) on 3D facial animation.
- Introduction of novel variants (VOURS) applying acoustic (WavTokenizer) and label-based (CosyVoice2) discrete representations to 3D facial animation prediction for the first time.
- Probing analyses connecting speech representation tokens to phonetic units (entropy-based) and facial deformation spaces (viseme clusters and continuous blendshape regression).
- Proof-of-concept unified Audio-Visual Text-to-Speech (AVTTS) pipeline that simultaneously generates synchronized speech and 3D facial movement directly from text using a shared token representation.

## Problem

Speech-driven 3D facial animation models typically rely on continuous hidden representations from large-scale self-supervised learning models like wav2vec 2.0, HuBERT, or Whisper. While these continuous features yield realistic lip movements, the rapid shift in speech generation toward discrete neural audio codecs and tokenized spaces leaves it unclear whether continuous or discrete, and acoustic or semantic representations are truly optimal. Furthermore, prior work has not systematically tested fully acoustic or fully label-based discrete token spaces for their ability to capture phoneme-level classes or articulatory dynamics, disconnecting speech synthesis pipelines from facial animation.

## Method

The study tests four feature extractors: HuBERT (HB, semantic), SpeechTokenizer (ST, semantic+acoustic via multi-codebook residual vector quantization), WavTokenizer (WT, acoustic via extreme single-codebook compression), and CosyVoice2 (CV2, label-based via supervised character and prosody training). These are paired with two temporal facial decoders: a frame-by-frame Gated Recurrent Unit (GRU) operating as a denoising network in a diffusion setup (trained with L1 loss, mimicking FaceDiffuser), and a non-causal Transformer (T.) utilizing self-attention with cross-attention decoder layers (trained with L1 loss plus velocity and acceleration smoothness losses). 

All encoders are kept frozen while decoders are trained from scratch. The models map speech features to 51-dimensional ARKit facial blendshapes derived from FLAME parameters. The probing framework utilizes normalized entropy to measure alignment between token IDs and phonetic classes or k-means-derived visemes (32 clusters), alongside a Ridge regression probe mapping one-hot token features to continuous blendshapes (measured via R²). 

For the AVTTS proof-of-concept, the autoregressive LLM backbone of CosyVoice2 generates discrete speech tokens from text and reference audio; these exact tokens are fed simultaneously into the flow-matching speech waveform decoder and the pre-trained facial Transformer decoder, bypassing any intermediate audio-to-video processing stage.

## Experimental setup

Evaluations are performed on the BEAT2 dataset, comprising approximately 27 hours of English speech from 25 speakers across scripted monologues and 8 basic emotions (eval test set contains 265 stimuli / ~4 hours). Metrics include Lips Vertex Error (LVE) for blendshape reconstruction, Jitter Score (second-degree derivative/acceleration of frames), Bilabial Closure Score (BCS) measuring effective lip closure for /b/, /p/, /m/, MUSHRA-like perceptual evaluation with 30 participants on Prolific, and probing entropy/R² scores.

## Results

In objective LVE reconstruction, HuBERT-based models achieve the lowest error (0.26), with the new label-based CosyVoice2 Transformer variant ([CV2+T.]) closely following at 0.28. Transformer decoders consistently outperform GRU decoders on Jitter (e.g., [HB+T.] at 45.5 vs [HB+GRU] at 80.3). For Bilabial Closure (BCS), the Base model scores highest (57.5%), closely matched by [CV2+T.] (47.0%), while acoustic and semantic+acoustic models fail catastrophically (<6.5%). 

In the MUSHRA perceptual evaluation, [CV2+T.] matches the Base [HB+GRU] model with no statistically significant difference, while outperforming [HB+T.]. Probing analyses show that semantic+acoustic representations yield the highest phonetic entropy score (39.6% normalized entropy), but perform poorly on facial animation, demonstrating that phonetic encoding is necessary but insufficient if low-structured acoustic information contaminates the space.

| Speech representation | Facial decoder | Type | LVE (↓) | Jitter (↓) | BCS (%) (↑) |
|---|---|---|---|---|---|
| semantic (HuBERT) | GRU | Base | 0.26 | 80.3 | 57.5 |
| semantic (HuBERT) | Trans. | VSOTA | 0.26 | 45.5 | 27.6 |
| semantic+acoustic (SpeechTokenizer) | Trans. | VSOTA | 0.34 | 35.2 | 2.3 |
| acoustic (WavTokenizer) | Trans. | VOURS | 0.33 | 43.6 | 6.2 |
| label-based (CosyVoice2) | Trans. | VOURS | 0.28 | 50.3 | 47.0 |

## Limitations

The evaluation is restricted to English-language scripted monologues from a single dataset (BEAT2), leaving multilingual generalization and conversational spontaneity untested. The AVTTS pipeline is presented strictly as a proof-of-concept without large-scale quantitative perceptual validation of the generated text-to-face quality compared to traditional two-stage systems. Additionally, the study relies on fixed frozen pre-trained encoders, precluding any co-adaptation of the speech representation space specifically for facial deformation.

## Why read this

Speech and ML researchers building multimodal conversational avatars or unified speech-language models should read this to understand why acoustic-heavy token spaces hurt facial animation while semantic and label-based discrete tokens succeed. It provides a clear blueprint for migrating from multi-stage audio-to-video pipelines to single-token AVTTS frameworks.

## Code

- https://github.com/ProdCor/Token-to-Face

## Applications

Speech-driven 3D facial animation, embodied conversational AI characters, real-time digital avatars, and unified audio-visual text-to-speech generation systems.

## Institutions / 機構

State University of Campinas, Grenoble Alpes University, National Centre for Scientific Research, Grenoble Institute of Technology, Inria

**Funding / 經費:** Sao Paulo Research Foundation, Brazilian Institute of Data Science, Coordenacao de Aperfeicoamento de Pessoal de Nivel Superior

## Related

- (link related pages by id as the wiki grows)
