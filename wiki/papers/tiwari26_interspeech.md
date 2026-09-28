---
id: tiwari26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2102
pdf: https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.pdf
---

# Say That Again: Visualizing Paralinguistic Cues with Prosody-Aware Diffusion

*Shyamji Tiwari*

[PDF](https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2102)

**TL;DR** — NovaDiffusion conditions a distilled latent diffusion model on emotion-correlated prosodic features extracted from speech, achieving 71.3% emotion classification accuracy on RAVDESS (surpassing SonicDiffusion by 23.1pp).

## Key contributions

- ProsoBench: A dataset of 168K human-annotated speech-emotion-image triplets compiled from RAVDESS, IEMOCAP, and MSP-Podcast with speaker-independent splits.
- ProsodyCLIP: A trimodal contrastive model combining an ESResNeXt voice encoder with a dedicated 2-layer MLP prosodic feature branch and a classification auxiliary loss.
- Efficient Multimodal U-Net: A 280M-parameter distilled architecture based on BK-SDM-Tiny with inverted residual blocks and a multi-scale fusion block.
- Prosody-Aware Adapter: A decoupled cross-attention injection mechanism (via IP-Adapter) that routes prosodic embeddings separately from text conditioning.

## Problem

Text-to-image models discard paralinguistic cues entirely, treating speech inputs as single opaque vectors that ignore pitch, rate, and emotional inflection. Prior audio-to-image methods fail to decouple prosody from environmental sounds, speaker identity, or lexical content, limiting affective control. This matters because identical transcripts spoken with different tones convey radically different scene semantics and visual imagery.

## Method

NovaDiffusion extracts prosodic features—including F0 via CREPE, RMS energy envelope, speaking rate in syllables/sec, and MFCCs 1–13—from speech utterances. These features pass through a prosody-only 3-layer MLP for quality filtering (discarding samples with top-1 mismatch against human emotion labels), and are subsequently encoded into a 128-dim embedding via a dedicated MLP branch combined with a 512-dim ESResNeXt voice embedding. The resulting joint embedding is trained using a two-phase InfoNCE and cross-entropy loss recipe on 168K ProsoBench triplets.

The generative backbone is a 280M-parameter distilled U-Net derived from BK-SDM-Tiny with inverted residual blocks and a multi-scale fusion block that merges encoder levels. Prosodic embeddings are injected into the U-Net via a decoupled cross-attention adapter following IP-Adapter, applying a weighting factor alpha = 0.6. Only the adapter weights and projection layers are trained while keeping the U-Net and ProsodyCLIP frozen. For inference, the OLSS scheduler is employed to enable high-quality 4-step generation.

## Experimental setup

Evaluated on RAVDESS (7.4K recordings), IEMOCAP (10K utterances), and ProsoBench-test using AIS (Wav2CLIP cosine similarity), AIC (CLIP content overlap), IIS, FID, and Emotion Classification Accuracy (ECA) computed via MTCNN and an AffectNet-fine-tuned ResNet50. Baselines include ImageBind, CoDi, AudioToken, SonicDiffusion, SonicDiffusion retrained on ProsoBench, and SeeingSounds. The model is trained on 4x A100 GPUs for 100K steps (~80 GPU hours).

## Results

On RAVDESS (8 classes, 12.5% chance), NovaDiffusion achieves 71.3% ECA, outperforming the original SonicDiffusion (48.2%) and its retrained variant (52.6%). On held-out IEMOCAP speakers, it achieves 63.4% ECA vs 41.7% for the baseline. Ablations demonstrate that removing the prosodic branch drops ECA by 14.1pp, while dropping the auxiliary cross-entropy loss drops it by 8.7pp. It yields an FID of 94.2 compared to SonicDiffusion's 89.6 due to capacity differences in the distilled 280M U-Net.

| System | AIS ↑ | AIC ↑ | IIS ↑ | FID ↓ | ECA ↑ |
|---|---|---|---|---|---|
| ImageBind | 0.580 | 0.213 | 0.633 | 248.8 | 32.1 |
| AudioToken | 0.501 | 0.182 | 0.641 | 279.4 | 38.6 |
| SonicDiffusion | 0.531 | 0.232 | 0.874 | 89.6 | 48.2 |
| SonicDiffusion (retrained) | 0.568 | 0.241 | 0.862 | 91.3 | 52.6 |
| NovaDiffusion | 0.612 | 0.258 | 0.851 | 94.2 | 71.3 |

## Limitations

The voice embedding retains residual lexical content as gradient reversal was not applied. The ProsoBench dataset relies on CLIP retrieval, capturing stereotypical internet-scale imagery rather than physical grounding. Furthermore, the ECA metric requires visible faces and cannot evaluate scene-level emotions lacking facial expressions.

## Why read this

Researchers working on affective multimodal generation and expressive speech-to-image pipelines should read this to see how decoupled cross-attention adapters can route paralinguistic features without destroying text priors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive multimodal storytelling, emotional content creation, and interactive voice-driven digital avatars.

## Related

- (link related pages by id as the wiki grows)
