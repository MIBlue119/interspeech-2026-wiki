---
id: shi26d_interspeech
category: tts
labels: [generative-model]
institutions: ["College of William & Mary", "Emory University", "George Mason University"]
code: https://jiachengqaq.github.io/emo-bpo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1613
pdf: https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.pdf
---

# Emo-BPO: Emotion Bidirectional Preference Optimization for Diffusion-based Emotional TTS

*Jiacheng Shi, Hongfei Du, Xinyuan Song, Y. Alicia Hong, Yanfu Zhang, Ye Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1613)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Emo-BPO is a bidirectional preference optimization framework for diffusion-based emotional TTS that jointly learns emotion-aligned and emotion-contrastive score functions from reordered same-text pairs, achieving a 99.23% emotion similarity score.

## Key contributions

- Identifies structural asymmetry in existing diffusion-based preference alignment methods, specifically the absence of explicit emotion-contrastive trajectory modeling under classifier-free guidance.
- Proposes Emo-BPO, a bidirectional diffusion framework that jointly learns emotion-aligned and emotion-contrastive score functions from reordered same-text pairs.
- Introduces a late-step guidance schedule for inference that applies weaker emotional guidance early on to preserve coarse acoustic structure and increases it later to refine prosody.
- Requires neither auxiliary reward models nor additional human annotations or datasets beyond standard emotion-labeled corpora.

## Problem

Prior diffusion-based emotional TTS and preference optimization methods like EmoDPO, EMORL-TTS, and EASPO optimize conditional trajectories solely toward preferred target emotions. They fail to explicitly model divergence or separation from competing emotional modes, which limits fine-grained emotional controllability under classifier-free guidance (CFG). This asymmetry underutilizes the natural contrastive mechanism inherent in CFG, restricting inter-emotion discrimination. Addressing this gap is critical for conversational agents, expressive narration, and human-machine interaction requiring robust multi-dimensional emotional spaces.

## Method

The Emo-BPO framework builds on Grad-TTS operating on 80-dimensional mel-spectrograms, using a HiFi-GAN vocoder for waveform synthesis. The text encoder and duration predictor are frozen, while only the diffusion decoder score network is partially fine-tuned. Training utilizes reordered same-text emotional pairs derived from emotion-labeled corpora: given a text prompt c, an audio sample a1 expressing the target emotion forms the aligned pair (c, a1, a2), while reversing it to (c, a2, a1) forms the contrastive pair using an alternative emotion a2. This allows Emo-BPO to maintain separate parameterizations for two dedicated diffusion branches: an emotion-aligned branch minimizing the standard denoising objective to form an attractive energy basin, and an emotion-contrastive branch minimizing an alternative objective to induce repulsive gradients.

During inference, these two branches are integrated via a contrastive guidance formulation compatible with classifier-free guidance. Specifically, the final noise estimate is computed as epsilon_omega(xt, t) = (1 + omega(t)) * epsilon_theta_EA(xt, c_align, t) - omega(t) * epsilon_theta_EC(xt, c_ctr, t), where omega(t) is a guidance scale. To stabilize generation and preserve coarse acoustic structures, a progressive late-step guidance schedule defined as omega(t) = 1 - t/T is applied, where T is the total number of diffusion steps. This applies weaker guidance at early timesteps and amplifies guidance strength at later timesteps to refine fine-grained emotional and prosodic cues.

## Experimental setup

Experiments are conducted on two English emotional speech datasets: EmoVoiceDB (approx. 22,100 utterances, 40 hours) and the English subset of the Emotional Speech Database (ESD, 17,500 utterances, 12 hours across 5 emotions and 10 speakers). Baselines include EmoSpeech, CosyVoice, CosyVoice2, Emosphere++, and EmoVoice. Evaluation metrics include Word Error Rate (WER) via Whisper-Large-v3, AutoPCP for prosody similarity, emotion2vec-base cosine similarity for emotion similarity (Emo SIM), automatic speech emotion recognition accuracy, UTMOS for naturalness, and human evaluation via MOS, Emo MOS, MOS EC, AB preference tests, and an Emotion Accuracy Test with 30 participants. The model is optimized using Adam with a learning rate of 1e-4, batch size of 16, on randomly cropped 2-second mel-spectrogram segments.

## Results

Emo-BPO achieves an emotion similarity of 99.23%, prosody similarity of 3.85, UTMOS of 4.52, and a mean speech emotion recognition accuracy of 87%. In comparison to baselines, it outperforms EmoSpeech (61% recognition), CosyVoice (69%), CosyVoice2 (82%), Emosphere++ (75%), and EmoVoice (81%) on mean emotion recognition accuracy. Subjective evaluations demonstrate that Emo-BPO attains a superior MOS of 3.93, Emo MOS of 4.25, and MOS EC of 3.92, winning clear preferences in AB tests against EmoSpeech and CosyVoice2. While CosyVoice2 attains a lower Word Error Rate (3.77 vs 3.84) due to its autoregressive LLM design prioritizing strict linguistic fidelity, Emo-BPO maintains highly competitive intelligibility while outperforming all competitors in emotional expressiveness and acoustic naturalness.

Ablation studies reveal that removing the contrastive branch degrades emotion similarity (dropping to 97.41), confirming its necessity for inter-emotion discrimination. Eliminating the late-step scheduling strategy causes a spike in WER (4.32) and degrades prosody similarity (3.67), proving that progressive scheduling is vital for generation stability.

| Systems / Conditions | Emo SIM | Prosody SIM | WER | UTMOS | Mean Emotion Rec. | MOS |
| --- | --- | --- | --- | --- | --- | --- |
| EmoSpeech [8] | 96.35 | 3.39 | 7.13 | 4.24 | 0.61 | 2.55 |
| CosyVoice [10] | 97.07 | 3.64 | 4.32 | 4.41 | 0.69 | - |
| CosyVoice2 [11] | 98.47 | 3.78 | 3.77 | 4.43 | 0.82 | 3.61 |
| Emosphere++ [21] | 98.16 | 3.69 | 4.94 | 4.35 | 0.75 | 3.46 |
| EmoVoice [22] | 98.59 | 3.67 | 4.16 | 4.39 | 0.81 | 3.39 |
| Emo-BPO | 99.23 | 3.85 | 3.84 | 4.52 | 0.87 | 3.93 |

## Limitations

The evaluation is restricted to English-language corpora (ESD and EmoVoiceDB) and a limited set of categorical emotions, leaving multilingual and zero-shot cross-lingual emotional generalizability unverified. The framework relies on a pre-trained Grad-TTS backbone and HiFi-GAN vocoder, inheriting their respective structural bottlenecks such as fixed architectural capacities during inference. Furthermore, constructing text-matched emotional pairs requires pre-annotated categorical emotion labels, which may limit applicability to unannotated in-the-wild speech data.

## Why read this

Speech researchers and ML engineers focusing on diffusion-based generative models or emotional TTS should read this paper to learn how to implement explicit contrastive score functions and late-step guidance schedules to improve emotional controllability without relying on auxiliary reward models.

## Code

- https://jiachengqaq.github.io/emo-bpo/

## Applications

Conversational AI agents, expressive audiobooks, and interactive human-machine interfaces requiring fine-grained, controllable emotional speech synthesis.

## Institutions / 機構

College of William & Mary, Emory University, George Mason University

## Related

- (link related pages by id as the wiki grows)
