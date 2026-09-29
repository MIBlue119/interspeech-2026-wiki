---
id: ito26_interspeech
category: tts
labels: [generative-model]
institutions: ["Sony Group Corporation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2942
pdf: https://www.isca-archive.org/interspeech_2026/ito26_interspeech.pdf
---

# Unified Prosody Restoration Using Diffusion Models for Controllable Text-to-Speech Synthesis

*Yuki Ito, Junki Ohmura, Hayato Futami, Toshiyuki Sekiya, Toshiyuki Kumakura*

[PDF](https://www.isca-archive.org/interspeech_2026/ito26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ito26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2942)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper formulates fine-grained prosody restoration as a unified linear inverse problem and introduces two diffusion-based models (supervised and unsupervised DPRs) that handle five distinct degradation tasks. Evaluated on Japanese emotional speech corpora, the unsupervised DPR achieves a subjective naturalness score of 4.74 out of 5 from severely degraded inputs, closely matching the ground truth.

## Key contributions

- Formulates prosody restoration as a unified linear inverse problem across five tasks, incorporating three novel ones: piecewise-averaged prosody, partially missing smoothed prosody, and partially missing averaged prosody.
- Proposes a supervised Diffusion-based Prosody Restorer (DPR) trained to reverse explicitly simulated degradation operators.
- Proposes an unsupervised DPR framework leveraging linear inverse problem samplers (DDRM for non-blind tasks and GibbsDDRM with Langevin dynamics for blind smoothing kernels).
- Demonstrates through extensive objective and subjective experiments that diffusion-based restorers preserve accent-related linguistic structures significantly better than deterministic or CVAE baselines.

## Problem

Explicitly specifying frame-level prosody for controllable text-to-speech (TTS) systems imposes a heavy burden on users, particularly in pitch-accent languages like Japanese where incorrect accent contours degrade naturalness and intelligibility. Prior approaches like sketch-to-contour prediction or partial inpainting focus on isolated use cases and discard granular variations by averaging over phonemes. Developing a unified framework that can restore full frame-level dynamics from coarse, partial, or smoothed user inputs is therefore essential for practical creative workflows.

## Method

The system architecture combines a context encoder (CE) with a score estimator (SE) implemented as a 1D U-Net. The CE transforms text, speaker ID, style ID, and duration into frame-level context features via a Transformer encoder. The SE takes time $t \in [0, 1]$, noisy prosody $F_t$, and context features to estimate the conditional score. Pitch (log-normalized and interpolated), V/UV flags, and compensated energy are concatenated along the channel dimension.

In the supervised approach (Diff-S), the model is trained end-to-end to reverse simulated degradation operations by sampling masking ratios, block sizes, Gaussian smoothing kernel widths, and mean window sizes during training, conditioned on an explicit 4-state degradation ID tensor per frame. In the unsupervised approach, the score estimator is trained strictly on clean prosody conditioned only on linguistic/speaker context. At inference time, linear inverse problem samplers handle degradations: non-blind tasks (Inp, Ref-A, InpRef-A) use DDRM via singular value decomposition of the degradation matrix to blend observations with Tweedie's score-based prior estimates; blind tasks with unknown smoothing kernels (Ref-S, InpRef-S) use GibbsDDRM, alternating between restoration steps and updating kernel parameters $\varphi$ via Langevin dynamics.

Both DPRs are integrated with a prosody-controllable backbone TTS consisting of a FastSpeech2 variant with a flow matching decoder and a HiFi-GAN vocoder. Training uses a linear log-SNR schedule over 64 diffusion steps, Adam optimizer, a learning rate of $10^{-4}$, and batch size 16 on an NVIDIA RTX A6000 GPU for $2 \times 10^6$ iterations.

## Experimental setup

Evaluated on two Japanese emotional speech datasets: an in-house (IH) dataset containing 31 hours from 4 professional speakers across 4 styles (neutral, happy, angry, sad; 20,210 training utterances) and the JVNV dataset (1,423 training utterances). Baselines include a deterministic Transformer decoder (Det) and a conditional variational autoencoder (CVAE). Metrics include log-$F_0$ RMSE, 1-Wasserstein distance, V/UV F1 score, energy RMSE, mel-cepstral distortion (MCD), SpeechBERTScore, accent phrase error rate (PA-ER), phoneme error rate (P-ER), and a deduction-based subjective naturalness MOS evaluated by professional annotators.

## Results

On the IH dataset, the proposed Diff-U-B (unsupervised blind) achieved a log-$F_0$ RMSE of 176.5 cents on Inp, drastically outperforming Det (283.2) and CVAE (275.8). Across all tasks, the proposed DPRs achieved drastically lower accent error rates (PA-ER) than the baselines, showing that diffusion priors successfully enforce valid linguistic and accentual constraints where deterministic mappings fail. In subjective evaluations on challenging InpRef tasks, the unsupervised DPR (Diff-U-B) scored 4.74 ± 0.08 in naturalness, closely approaching ground-truth prosody (4.86 ± 0.06) with overlapping confidence intervals.

| System | Inp (F0 RMSE ↓) | Ref-S (F0 RMSE ↓) | InpRef-S (Naturalness ↑) |
|---|---|---|---|
| Ground Truth | - | - | 4.86 ± 0.06 |
| Det (Baseline) | 283.2 | 108.3 | 3.48 ± 0.20 |
| CVAE (Baseline) | 275.8 | 136.6 | 3.36 ± 0.17 |
| Diff-S (Supervised) | 241.1 | 55.0 | 4.21 ± 0.15 |
| Diff-U-B (Unsupervised) | 176.5 | 70.3 | 4.74 ± 0.08 |

## Limitations

The evaluation is restricted to Japanese datasets and synthetic degradation patterns (Gaussian smoothing and block masks) which may not fully capture messy, real-world human user inputs. The unsupervised blind method (GibbsDDRM) requires iterative Langevin sampling updates, which increases inference compute overhead compared to feedforward baselines. Human-in-the-loop user studies confirming reduction of user burden are left to future work.

## Why read this

Speech synthesis researchers and engineers building controllable TTS or speech editors should read this paper to understand how to leverage continuous-time score-based diffusion and linear inverse problem samplers (DDRM/GibbsDDRM) to perform flexible, high-fidelity prosody restoration without task-specific retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interactive expressive voice creation tools, film/animation dubbing platforms, and text-to-speech systems requiring fine-grained user control over emotion and intonation.

## Institutions / 機構

Sony Group Corporation

## Related

- [CraftTTS: Fine-Grained Prosody Control for Text-to-Speech](yang26l_interspeech.md) — same problem · relatedness 2.4/3
- [CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis](zheng26c_interspeech.md) — shared technique · relatedness 2.1/3
- [A Fast Solver for Interpolating Stochastic Differential Equation Diffusion Models for Speech Restoration](lay26_interspeech.md) — shared technique · relatedness 2.1/3
- [Adaptive Oscillatory Inductive Bias for Modeling Sharp Prosodic Dynamics in Diffusion-Based TTS](dhar26_interspeech.md) — shared technique · relatedness 2.1/3
- [Emo-BPO: Emotion Bidirectional Preference Optimization for Diffusion-based Emotional TTS](shi26d_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
