---
id: mou26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2312
pdf: https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.pdf
---

# Dynamic Prosody Prediction in LLM-based TTS for Improving Speaker Similarity

[PDF](https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mou26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2312)

**TL;DR** — This paper introduces a dynamic prosody prediction strategy for LLM-based TTS that estimates syllable-level style conditioned on previously generated speech, improving speaker similarity and emotional expressiveness.

## Problem

Current LLM-based text-to-speech (TTS) systems either model speech attributes implicitly or rely on static chain-of-thought (CoT) prompting to pre-compute prosody for an entire utterance before synthesis. This static pre-computation ignores target-text-specific speaking styles and results in inadequate style modeling, ultimately limiting the synthesized speech's similarity to the target speaker.

## Method

The method builds upon the CosyVoice framework by integrating syllable-level dynamic prosody prediction into a decoder-only Transformer LLM (14 layers, 1024 embedding dimensions, 4096 FFN dimensions). Prosody features comprising duration, mean energy, mean pitch, and pitch range are extracted per syllable and quantized via k-means clustering (512 centroids) to form prosody tokens. During autoregressive generation, the model predicts the prosody token for the current syllable conditioned on the reference speaker embedding, input text, and previously generated prosody and speech tokens. The model is trained using a combined cross-entropy loss for both prosody and speech tokens with a loss weight alpha of 0.5 for 800,000 steps on 50k hours of Mandarin speech data.

## Results

Evaluated on the ESD, internal style, and AISHELL-3 datasets using subjective MOS/preference tests and objective metrics (CER, speaker similarity SIM, emotion accuracy ACC, and pitch/energy correlation and RMSE). The proposed model achieved lower character error rates (e.g., 5.66 on ESD, 10.44 on internal, 10.19 on AISHELL-3) and higher pitch/energy correlation compared to baseline CosyVoice and static CoT methods. In subjective preference tests, evaluators favored the proposed method for speaker similarity over baseline CosyVoice and CoT approaches at statistically significant margins (p < 0.01). Furthermore, when trained on 50k hours, the proposed model outperformed larger open-source models like CosyVoice (trained on 170k hours), Vevo1.5, and F5-TTS on prosodically rich datasets.

## Code

- https://muzw.github.io/dynapros/

## Applications

Personalized text-to-speech, voice cloning, and emotional speech generation systems requiring high speaker similarity and natural speaking styles.

## Limitations

The evaluation is restricted to Mandarin Chinese datasets.

## Related

- (link related pages by id as the wiki grows)
