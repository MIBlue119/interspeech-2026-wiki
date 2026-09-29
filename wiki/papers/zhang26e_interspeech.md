---
id: zhang26e_interspeech
category: tts
labels: [generative-model]
institutions: ["Northwestern Polytechnical University", "Kuaishou Technology", "Beijing Institute of Technology", "Chinese Academy of Sciences"]
code: https://ziyu6.github.io/UniSinger/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-481
pdf: https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.pdf
---

# Towards Unified Song Generation and Singing Voice Conversion with Accompaniment Co-Generation

*Ziyu Zhang, Chunyu Qiang, Xiaopeng Wang, Yuxin Guo, Kang Yin, Wenjie Tian, Jingbin Hu, Tianlun Zuo, Zhao Guo, Teng Ma, Yuzhe Liang, Chen Zhang, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-481)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — UniSinger is the first end-to-end multi-modal diffusion transformer framework that unifies zero-shot speaker cloning song generation and accompaniment co-generation singing voice conversion (SVC). It achieves state-of-the-art performance across both tasks (e.g., 19.61% song generation PER, 68.85% speaker similarity) by leveraging mutual task priors and a progressive curriculum learning strategy.

## Key contributions

- Unifies song generation and singing voice conversion (SVC) into a single end-to-end framework, enabling fine-grained vocal control and accompaniment co-generation.
- Proposes an MM-DiT architecture equipped with a unified cross-task speaker embedding space for multi-modal alignment and timbre transfer.
- Designs a 4-stage progressive curriculum learning strategy utilizing task-specific modality masking to systematically resolve multi-task optimization conflicts.
- Identifies and validates generalizable inter-task mutual benefits, showing that song generation provides structural priors for SVC prosody while SVC semantic modeling reduces song generation pronunciation errors.

## Problem

Song generation and singing voice conversion (SVC) have traditionally been developed in isolation, leaving song generation without zero-shot speaker cloning and SVC oblivious to vocal-accompaniment synergy. Unifying these two tasks is fundamentally difficult due to heterogeneous inputs (textual instructions vs. audio acoustic inputs) and conflicting training objectives (SVC focuses on timbre disentanglement while song generation creates melodies from scratch). Naively integrating them causes severe gradient conflicts, local optima, and compromised musical structure or vocal details.

## Method

UniSinger employs an MM-DiT backbone for flow matching consisting of 14 bottom Joint DiT Layers (handling cross-modal interaction via concatenated query-key-values for text and audio streams) and 6 top Single DiT Layers (performing self-attention on audio latents for fine-grained acoustic refinement). Pre-trained encoders project inputs into a shared space: Qwen2.5-7B extracts text instructions, Zipformer processes lyric phonemes, So-VITS-SVC (HuBERT + VQ) extracts speaker-independent semantic embeddings, CAM++ provides global speaker embeddings, and a VAE compresses 44.1kHz audio into a 1024x downsampled latent space.

The training pipeline relies on a four-stage progressive curriculum governed by task-specific modality masking with learnable null tokens to drop irrelevant modalities: Stage 0 (General Song Generation using text and phonemes), Stage 1 (General SVC using semantic and speaker embeddings), Stage 2 (Speaker Cloning Song Generation adding speaker embeddings), and Stage 3 (Accompaniment Co-Generation SVC adding text instructions). During training, the model optimizes a conditional velocity field transforming Gaussian noise into target VAE latents using an Adam optimizer (lr = 1e-4) on 16 NVIDIA A800 GPUs (batch size 8 per GPU). Inference integrates this velocity field via an ODE solver, followed by a Mel Decoder waveform synthesis.

## Experimental setup

The training corpus comprises 30k hours of in-the-wild songs standardized to 44.1kHz, filtered via SNR, segmented via VAD, and separated using Hybrid Transformer Demucs. Transcripts use Whisper-Large-v3 and Qwen2.5-Omni voting, alongside Qwen2.5-7B dense captions, paired with 5k hours of accompanied singing data (20k hours total used for training). The model contains 1.54B parameters with 1024 hidden dimensions. Baselines include song generation models (SongLM, YuE, ACE-Step, DiffRhythm+) and SVC models (HQ-SVC, NeuCoSVC, So-VITS-SVC). Metrics include Phoneme Error Rate (PER via FireRedASR), Speaker Similarity (Spk-Sim via WavLM), CLaMP 3, SongEval, FAD, F0 Pearson Correlation (FPC), and subjective MOS/Harmony tests.

## Results

UniSinger achieves a state-of-the-art PER of 19.61% and a Speaker Similarity of 68.85% on song generation, outperforming DiffRhythm+ (20.72% PER) and SongLM. In pure and accompanied SVC tasks, UniSinger achieves a top PER of 0.151 and Spk-Sim of 0.712, while the accompaniment co-generation variant (UniSinger SVC BGM) attains an industry-leading Harmony MOS of 3.891, surpassing cascaded baselines like HQ-SVC and NeuCoSVC. Ablations prove that removing task-specific modality masking increases song generation PER from 19.61% to 25.83% and drops speaker similarity to 60.99%, while omitting the intermediate SVC or song generation curriculum stages heavily degrades speaker identity preservation and musical harmony metrics.

| System / Condition | PER ↓ | Spk-Sim ↑ | FPC ↑ | Harmony ↑ |
|---|---|---|---|---|
| SongLM | 28.32% | 55.43% | - | - |
| YuE | 22.14% | 65.15% | - | - |
| DiffRhythm+ | 20.72% | 64.21% | - | - |
| UniSinger Song | 19.61% | 68.85% | - | - |
| So-VITS-SVC | 15.40% | 70.00% | 0.743 | 3.522 |
| UniSinger SVC BGM | 16.70% | 68.70% | 0.655 | 3.891 |

## Limitations

Audio quality trails dedicated single-task models like HQ-SVC in some subjective MOS tests due to minor artifacts inherited from training on diverse in-the-wild data. The model was evaluated primarily on Chinese and English corpora with 500 balanced clips, leaving multi-lingual scalability outside these bounds untested. Furthermore, joint multi-modal diffusion training requires substantial computational overhead (16 NVIDIA A800 GPUs), and adding background music causes a slight expected performance drop in raw acoustic fidelity metrics.

## Why read this

Researchers and audio engineers working on unified multimodal generative modeling or music creation systems should read this paper to see how curriculum learning and modality masking can successfully resolve multi-task optimization conflicts between text-to-audio generation and audio-to-audio voice conversion.

## Code

- https://ziyu6.github.io/UniSinger/

## Applications

Automated intelligent music production systems, zero-shot singer voice cloning, and text-guided singing voice conversion with synchronized background music co-generation.

## Institutions / 機構

Northwestern Polytechnical University, Kuaishou Technology, Beijing Institute of Technology, Chinese Academy of Sciences

## Related

- (link related pages by id as the wiki grows)
