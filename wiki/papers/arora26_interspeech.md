---
id: arora26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1756
pdf: https://www.isca-archive.org/interspeech_2026/arora26_interspeech.pdf
---

# Negation in Audio Generation Models

*Arjun Arora, Anshul Jain, Gubbala Mohith Nukesh, Bikash Dutta, Richa Singh, Mayank Vatsa*

[PDF](https://www.isca-archive.org/interspeech_2026/arora26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arora26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1756)

**TL;DR** — Text-to-audio (T2A) models suffer from a severe "affirmation bias," systematically ignoring negative constraints (e.g., "no gunshots") and producing acoustic outputs virtually identical to affirmative prompts, with an Audio Question Answering recall below 0.05. To diagnose this, the authors introduce the Audio Negation Benchmark with 1 million negated prompts.

## Key contributions

- Introduces the Audio Negation Benchmark comprising one million systematically constructed negated prompts derived from AudioCaps across 4 negation types and 3 negation scopes.
- Proposes a multi-modal evaluation protocol combining a fine-tuned contrastive text encoder, a fine-tuned BLEURT regression metric, and an Audio Question Answering (AQA) task using Audio Flamingo 3.
- Evaluates three state-of-the-art T2A paradigms (AudioGen, AudioLDM2, and TangoFlux) and demonstrates a near-universal affirmation bias with AQA recall falling below 0.05 for all models.
- Validates prompt quality via human evaluation, confirming 99.6% semantic accuracy in introduced negations, and releases the benchmark to drive negation-aware training.

## Problem

Text-to-audio generation models are typically conditioned on datasets like AudioCaps, Clotho, and AudioSet that describe what is present in an acoustic scene with zero representation of absent or negated sounds. Consequently, prompts containing negative operators like "without" or "quiet" activate the semantic features of the forbidden entity due to text-audio alignment models like CLAP optimizing for co-occurrence rather than logical exclusion. This causes safety and simulation failures because models routinely generate explosive or hazardous audio when explicitly instructed not to. While negation has been studied in NLP (CANNOT) and text-to-image (CC-Neg, T2I-CompBench), audio negation is uniquely challenging because it requires suppressing specific acoustic patterns inside a continuous temporal soundscape.

## Method

The Audio Negation Benchmark starts from the 90K audio-caption pairs of AudioCaps, filtering for captions with 1 to 3 sound events (covering 89.7% of the dataset). Using the Qwen3-8B LLM in FP16, captions are parsed for sound events and then expanded into negative prompts spanning four negation types (lexical like "no/without", syntactic like auxiliary negation verbs, semantic like replacing events with silence, and mixed) and three negation scopes (full, partial, and mixed) via a one-to-many mapping function yielding one million prompts with a diversity index of 0.96. 

For evaluation, the authors feed these negative prompts into three T2A models: AudioGen-Medium (autoregressive discrete tokens, batched at 64 with loudness normalization), TangoFlux (flow-matching, batched at 8, 100 denoising steps), and AudioLDM2 (latent diffusion, half precision, 200 steps). The generated 10-second audio clips (resampled to 16 kHz) are then re-captioned zero-shot using Whisper-Large, Qwen2Audio, MERaLiON2, and Voxtral-Small to check text-modality drift.

Text evaluation employs frozen MTEB encoders alongside an all-mpnet-base-v2 model fine-tuned via contrastive loss (batch size 128, learning rate 5e-5, 3 epochs, temperature tau approx 0.05) and a fine-tuned BLEURT cross-encoder regression network. Audio modality evaluation uses WavLM/HuBERT/Wav2Vec2 cosine similarity alongside an Audio Question Answering (AQA) protocol where Audio Flamingo 3 and human judges answer multiple-choice queries mapping generated audio back to original versus negated text options.

## Experimental setup

Evaluated on a subset of 15,000 original captions and 170,000 negative prompts sampled from the 1-million-prompt Audio Negation Benchmark. Models tested include three T2A systems (AudioGen, AudioLDM2, TangoFlux) and four audio captioning models (Whisper-Large, Qwen2Audio, MERaLiON2, Voxtral-Small). Metrics include acoustic cosine similarity (WavLM, Wav2Vec2, HuBERT), fine-tuned MPNet cosine similarity, fine-tuned BLEURT regression scores, and AQA recall/accuracy.

## Results

Across all models and evaluation protocols, Audio Question Answering recall for negated audio fell strictly below 0.05. When evaluating negative audio with Audio Flamingo 3, the model predominantly selected the original affirmative caption as the best description in 90.74% of AudioGen samples, 94.0% of TangoFlux samples, and 91.15% of AudioLDM2 samples, confirming a pervasive affirmation bias. Fine-tuned MPNet and BLEURT evaluations showed that the text representation of generated negative audio maps directly back to the original affirmative caption rather than the negative prompt.

| System / Condition | AQA Recall (Negated Audio) | ALM Original Caption Choice Rate | Wav2Vec2 FAD ||
|---|---|---|---||
| AudioGen | < 0.05 | 90.74% | 0.56 |
| AudioLDM2 | < 0.05 | 91.15% | 0.19 |
| TangoFlux | < 0.05 | 94.00% | 0.42 |

## Limitations

The benchmark is derived entirely from AudioCaps, inheriting its specific domain distribution and English-only language scope. The study is limited to prompts containing 1 to 3 distinct sound events to keep combinatorial negation scopes tractable. Furthermore, evaluation relies heavily on proxy ALM judges and zero-shot captioning models which can introduce their own semantic interpretation errors.

## Why read this

Read this paper if you build multimodal text-to-audio systems and want to understand why current architectures completely fail at logical constraints and negative prompts. It provides both the diagnostic benchmark and evaluation pipeline needed to transition from simple co-occurrence alignment to negation-aware training.

## Code

- https://iab-rubric.org/resources/other-databases/audio-negation-benchmark

## Applications

Development of safe, controllable text-to-audio generators for interactive simulations, assistive audio applications, and movie sound design where precise exclusion of unwanted audio artifacts is mandatory.

## Related

- (link related pages by id as the wiki grows)
