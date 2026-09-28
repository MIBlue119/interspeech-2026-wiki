---
id: yang26p_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3086
pdf: https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.pdf
---

# RobustSpeechFlow: Learning Robust Text-to-Speech Trajectories via Augmentation-based Contrastive Flow Matching

*Jinhyeok Yang, Hyeongju Kim, Yechan Yu, Joon Byun, Frederik Bous, Juheon Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3086)

**TL;DR** — RobustSpeechFlow introduces a contrastive flow matching training strategy that uses length-preserving repeat and skip latent augmentations to fix TTS alignment errors. It achieves top-tier intelligibility (Seed-TTS-eval WER 1.38) at a compact scale of 0.06B parameters.

## Key contributions

- Proposes a speech-specific contrastive flow matching strategy targeting skip and repeat failures via latent-space augmentations.
- Eliminates the need for external aligners, ASR models, or human preference datasets.
- Integrates directly into standard Flow Matching TTS pipelines with minimal computational overhead.
- Demonstrates robust intelligibility gains on public benchmarks and a new multilingual diverse benchmark (ZERO500), especially at low NFE.

## Problem

Modern non-autoregressive and flow-matching TTS systems frequently suffer from content fidelity issues like word skipping and repeating, especially under constrained model capacity or low number of function evaluations (NFE). While prior work uses auxiliary ASR losses, preference optimization (DPO), or external aligners to fix this, these approaches add heavy training complexity and require costly data curation. Resolving alignment without extra models or data is essential for lightweight, production-grade speech generation.

## Method

The model builds on SupertonicTTS, utilizing a Supertonic speech autoencoder that maps audio to continuous latents $x \in \mathbb{R}^{C \times T}$, paired with a linear probability path conditional flow matching (CFM) objective where target velocity is $v(x, \epsilon) = x - \epsilon$. To penalize failure modes contrastively, the authors introduce length-preserving repeat and skip latent augmentations from ground-truth latents. For repeat augmentation, a source span is copied and used to overwrite a target start region within the same sequence length, inherently inducing a simultaneous skip error. For skip augmentation, a span is removed, and the subsequent sequence is shifted forward, padding the final tail frames with a precomputed silence latent $x_{sil}$.

The training loss combines standard CFM with random batch negatives and these hard failure-mode negatives: $\mathcal{L}_{total} = \mathcal{L}_{pos} - \lambda_{rand}\mathcal{L}_{rand} - \lambda_{aug}\mathcal{L}_{aug}$. Hyperparameters include $\lambda_{rand} = \lambda_{aug} = 0.2$, coverage budget $\kappa \sim \mathcal{U}(0.2, 0.4)$ for repeats and $\mathcal{U}(0.4, 0.8)$ for skips. Models are trained with AdamW on dynamic batches using raw text inputs without grapheme-to-phoneme conversion.

During inference, an Euler solver is applied with a classifier-free guidance weight of 3.0 at low function evaluations ($NFE \in \{12, 24\}$), utilizing Length-Aware RoPE (LARoPE) and context-sharing batch expansion.

## Experimental setup

Trained on internal datasets of ~10k hours, 5M utterances, and 80k speakers across English and Korean. Evaluated on the public Seed-TTS-eval benchmark and the newly proposed multilingual ZERO500 benchmark (50 voices per language paired with 10 prompts, evaluated twice). Baselines include the vanilla SupertonicTTS baseline and ContrastiveFM with random batch negatives. Trained for 500k steps on 8 NVIDIA H100 GPUs using a compact 0.06B parameter architecture.

## Results

On Seed-TTS-eval, RobustSpeechFlow reduces WER from 1.44 (baseline) and 1.41 (ContrastiveFM) down to 1.38 at 0.06B parameters, achieving the lowest WER on the benchmark while maintaining a speaker similarity (SIM) of 0.60. On the ZERO500 English benchmark at NFE=24, it drops CER to 0.35% and WER to 1.03%. On Korean ZERO500, it decreases CER from 0.81% (baseline) to 0.57% and WER from 8.40% to 7.45% at NFE=24.

Ablations show that while random ContrastiveFM has erratic training dynamics and plateaus early, RobustSpeechFlow's augmentation-based hard negatives provide a stable optimization trajectory, outperforming all methods from 300k steps onward. A noted trade-off is that speaker similarity (SIM=0.60) remains constrained relative to massive 1.5B parameter models, reflecting the capacity limits of the compact backbone rather than the objective.

| System | Params | Seed-TTS WER | ZERO500-en CER (NFE=24) | ZERO500-ko CER (NFE=24) |
|---|---|---|---|---|
| Baseline | 0.06B | 1.44 | 0.48% | 0.81% |
| ContrastiveFM | 0.06B | 1.41 | 0.39% | 0.65% |
| **RobustSpeechFlow** | **0.06B** | **1.38** | **0.35%** | **0.57%** |

## Limitations

The approach exhibits a speaker similarity gap on public benchmarks compared to massive models, which the authors attribute to the compact 0.06B backbone capacity rather than the objective. Evaluation relies heavily on ASR-based metrics (CER/WER) which can carry recognition biases and depend on text normalization choices. Scope is currently tested on English and Korean using internal 10k-hour datasets.

## Why read this

Speech researchers and ML engineers building on flow-matching or compact TTS systems should read this to learn how to inject structured failure-mode hard negatives into latent space without needing external aligners, ASR models, or preference data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device or low-latency zero-shot text-to-speech generation requiring high content stability and resilience to skip/repeat errors.

## Related

- (link related pages by id as the wiki grows)
