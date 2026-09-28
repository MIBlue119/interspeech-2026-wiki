---
id: ito26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2942
pdf: https://www.isca-archive.org/interspeech_2026/ito26_interspeech.pdf
---

# Unified Prosody Restoration Using Diffusion Models for Controllable Text-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/ito26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ito26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2942)

**TL;DR** — This paper formulates prosody restoration as a unified linear inverse problem using diffusion models, enabling high-quality text-to-speech synthesis from partial, coarse, or smoothed prosodic inputs.

## Problem

Controllable text-to-speech models often require manual frame-level specification of prosody like pitch and energy, which imposes a heavy user burden and risks breaking linguistic rules, particularly in pitch-accent languages like Japanese. While prior works attempted prediction from simplified inputs, they focused on isolated tasks and discarded granular within-phoneme variations. A unified framework is needed to handle diverse input degradations—such as partial, smoothed, or piecewise-averaged prosody—while preserving valid prosodic structures.

## Method

The authors propose two diffusion-based prosody restorers (DPRs) operating as continuous-time score-based diffusion models coupled with a Transformer-based text context encoder and a 1D U-Net score estimator. The supervised DPR is trained end-to-end to reverse simulated mask, smoothing, and averaging degradations using explicit degradation embedding tensors. The unsupervised DPR relies on standard score estimation on clean prosody, utilizing specialized samplers at inference: the Denoising Diffusion Restoration Model (DDRM) for non-blind linear inverse problems and GibbsDDRM with Langevin dynamics for blind restoration tasks involving unknown smoothing kernels. Both models feed restored frame-level pitch, V/UV flags, and energy into a backbone prosody-controllable TTS model.

## Results

Evaluated on the in-house and JVNV Japanese emotional speech datasets across five distinct restoration tasks (inpainting, smoothing refinement, piecewise-averaged refinement, and joint combinations), the proposed diffusion models consistently outperformed non-diffusion deterministic (Det) and conditional variational autoencoder (CVAE) baselines. The DPR variants successfully recovered severely degraded prosody while faithfully preserving linguistically valid accentual structures and natural expression. Ablations demonstrate the effectiveness of both the supervised degradation-conditioned training and the unsupervised linear inverse problem samplers (DDRM and GibbsDDRM).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and content creators building expressive or emotional text-to-speech authoring tools where users need intuitive, low-effort control over pitch and prosody via coarse or partial outlines.

## Limitations

The unsupervised blind restoration approach requires iterative sampling steps via Langevin dynamics which increase inference latency compared to feed-forward models.

## Related

- (link related pages by id as the wiki grows)
