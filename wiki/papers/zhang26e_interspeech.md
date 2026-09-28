---
id: zhang26e_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-481
pdf: https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.pdf
---

# Towards Unified Song Generation and Singing Voice Conversion with Accompaniment Co-Generation

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-481)

**TL;DR** — UniSinger is the first end-to-end framework to unify speaker cloning song generation and accompaniment co-generation singing voice conversion (SVC) via a multimodal diffusion transformer and curriculum learning, achieving state-of-the-art performance across both tasks.

## Problem

Song generation and singing voice conversion (SVC) have historically been developed in isolation; song generation lacks zero-shot speaker cloning and fine-grained vocal control, while SVC overlooks vocal-accompaniment acoustic synergy. Furthermore, jointly training these tasks is hindered by heterogeneous inputs (text versus audio), mismatched objectives (melodies from scratch versus timbre disentanglement), and severe multi-task gradient conflicts.

## Method

UniSinger employs a 1.54B parameter multimodal diffusion transformer (MM-DiT) backbone leveraging flow matching on a 1024-downsampled VAE audio latent space. Input processing utilizes a frozen Qwen2.5-7B for instructions, Zipformer for phonemes, So-VITS-SVC (HuBERT + VQ) for semantics, CAM++ for global speaker embeddings, and a VAE for audio codecs. To resolve multi-task conflicts, a four-stage progressive curriculum learning strategy applies task-specific modality masking (learnable null tokens for dropped modalities) spanning stages for general song generation, general SVC, speaker cloning song generation, and accompaniment co-generation SVC. A unified cross-task speaker embedding space broadcasts speaker representations to bridge SVC timbre transfer directly into song generation.

## Results

Trained on 25k hours of audio (20k hours of songs plus 5k hours of accompanied singing), UniSinger achieves a phoneme error rate (PER) of 19.61% and speaker similarity of 68.85% on song generation, outperforming baselines like DiffRhythm+ (20.72% PER) and SongLM. On the SVC task, UniSinger attains a PER of 0.151 and a speaker similarity of 0.712, while the accompaniment co-generation variant achieves a harmony MOS score of 3.891, surpassing cascaded baselines. Ablation studies confirm that removing task-specific masking degrades PER to 25.83% and speaker similarity to 60.99%, and omitting individual curriculum stages damages cross-task generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building intelligent music production tools, automated song generation platforms, and zero-shot voice cloning systems with integrated background music accompaniment.

## Limitations

Audio quality slightly trails specialized single-task models like HQ-SVC due to artifacts from utilizing in-the-wild training data.

## Related

- (link related pages by id as the wiki grows)
