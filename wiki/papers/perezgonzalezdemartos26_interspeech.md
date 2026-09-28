---
id: perezgonzalezdemartos26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1407
pdf: https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.pdf
---

# Not Quite My Tempo: Voice Activity-aware Speech Synthesis for Lip-Synchronous Dubbing

*Alejandro Pérez-González-de-Martos, Florian Lux, Angelina Elizarova, Milana Shkhanukova, Andreas Kellner, Mattia Antonino Di Gangi*

[PDF](https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1407)

**TL;DR** — This paper introduces Voice Activity Detection (VAD) conditioning for inpainting-based text-to-speech (TTS) to enable precise temporal alignment for automatic lip-synchronous dubbing without requiring paired video data. The approach achieves a VAD alignment accuracy of ~96% while maintaining natural prosody.

## Key contributions

- Replaces complex visual lip-movement encoders with a lightweight binary voice-activity mask derived from audio VAD to condition TTS temporal structure.
- Proposes a training recipe with random VAD masking that makes temporal conditioning entirely optional at inference time.
- Integrates an F5-TTS style architecture featuring ZipVoice average upsampling and explicit speaker/style embeddings (FACodec, ERes2NetV2, GST).
- Provides extensive cross-lingual evaluation on mTEDx across Greek, French, Portuguese, and Russian using objective VAD accuracy, MOS, and WER.

## Problem

Automatic dubbing requires target speech to match the precise pause structure and timing of source audio to preserve audio-visual coherence. Prior methods condition speech synthesis on visual lip-movement streams extracted from video, which are brittle in out-of-domain scenarios like cartoons or multi-speaker scenes and demand expensive paired video data. Existing systems also struggle to enforce cross-lingual temporal alignment across differing source and target text lengths without degrading speech quality. This work addresses the gap by using a lightweight, modality-agnostic temporal conditioning signal that decouples lip-sync constraints from visual processing.

## Method

The architecture builds upon an F5-TTS framework, incorporating ZipVoice average upsampling for a near-diagonal temporal alignment bias between input text and target sequences. Timbre and style transfer are handled by explicit speaker embeddings from FACodec and ERes2NetV2 combined with Global Style Tokens (GST). Frame-level binary voice activity masks, extracted via Silero VAD, are embedded and added to the encoder representations, feeding into an 18-layer Diffusion Transformer (DiT) decoder (d=1024, 8 attention heads) optimized via optimal-transport Conditional Flow Matching.

During training, ground-truth VAD embeddings are randomly masked with a certain probability (along with 20% CFG conditioning dropout). This design choice allows the model to learn that VAD guidance is optional, letting editors enforce or relax timing constraints during inference. The inpainting paradigm operates on a fixed-length canvas, enabling the voiced/unvoiced pattern to propagate directly from source to target while leaving internal linguistic generation to the end-to-end model.

## Experimental setup

Evaluated using a core English model trained on LibriTTS-R and a multilingual model trained on public and proprietary data. The evaluation set comprises 291 samples (7-15s duration, pauses >500ms) from the mTEDx corpus across Greek, French, Portuguese, and Russian. Metrics include Silero, Pyannote, and TEN VAD alignment accuracy, Word Error Rate (WER) via an internal ASR system, Intelligibility and Prosody scores from the TTSDS benchmark, and 5-point Likert scale Mean Opinion Scores (Placement MOS and Prosody MOS) rated by 40 English native speakers via Prolific. Models were trained using a global batch size of 128 across four NVIDIA A100 GPUs with a peak learning rate of 7e-5.

## Results

VAD conditioning elevates frame-level VAD alignment accuracy from ~72.7% (baseline/chance overlap) to 96.21% for the LibriTTS model and 91.59% for the multilingual model across mTEDx source languages. Subjective evaluations show no statistically significant drop in naturalness: LibriTTS Placement MOS shifts from 3.80 to 3.74 and Prosody MOS from 3.71 to 3.68 when VAD is enabled. However, WER increases from 8.5% to 13.9% for LibriTTS and 6.3% to 8.3% for the multilingual model under VAD conditioning due to severe temporal mismatches from unadapted translations, where the model sacrifices verbatim text integrity (via word omissions or repetitions) to respect rigid VAD boundary constraints.

| System & Condition | VAD Accuracy (%) | Placement MOS | Prosody MOS | WER (%) |
|---|---|---|---|---|
| LibriTTS No VAD | 72.69 | 3.80 | 3.71 | 8.5 |
| LibriTTS VAD | 96.21 | 3.74 | 3.68 | 13.9 |
| Multilingual No VAD | 71.35 | 3.82 | 3.81 | 6.3 |
| Multilingual VAD | 91.59 | 3.73 | 3.68 | 8.3 |

## Limitations

The approach suffers from robustness failures (word omissions, repetitions, or reorderings) when paired with unadapted translations that exceed extreme duration constraints, as the model prioritizes temporal boundaries over text fidelity. Evaluation is restricted to 291 mTEDx samples and tested primarily in English target synthesis from four source languages. The current system relies on pre-translated text timing alignment and lacks fine-grained articulatory or phonetic mouth-shape modeling.

## Why read this

Speech researchers and dubbing engineers should read this to learn how to achieve precise temporal audio alignment using a simple, video-free VAD conditioning signal instead of fragile visual lip-reading encoders. It provides clear insights into the trade-offs between strict temporal constraints and linguistic robustness.

## Code

- https://alexdemartos.github.io/NQMT_IS26

## Applications

Automated cross-lingual movie dubbing, video localization, and speech-to-speech translation tools requiring strict temporal audio synchronization.

## Related

- (link related pages by id as the wiki grows)
