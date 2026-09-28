---
id: polok26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-443
pdf: https://www.isca-archive.org/interspeech_2026/polok26_interspeech.pdf
---

# Mind the Gap: Impact of Synthetic Conversational Data on Multi-Talker ASR and Speaker Diarization

*Alexander Polok, Ivan Medennikov, Honza Černocký, Shinji Watanabe, Lukáš Burget, Samuele Cornell*

[PDF](https://www.isca-archive.org/interspeech_2026/polok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-443)

**TL;DR** — This paper investigates how synthetic conversation simulation choices impact multi-talker ASR (DiCoW) and speaker diarization (Sortformer), releasing an open-source toolkit (FastMSS) that generates 1,000 hours of annotated audio in under five minutes. It reveals that optimal recipes are task-dependent (e.g., speech overlap helps ASR but hurts diarization), and two-stage synthetic pre-training followed by real-data fine-tuning significantly outperforms real-only training.

## Key contributions

- Introduces FastMSS, an open-source conversation simulation toolkit with native Lhotse integration that scales efficiently to 32 workers and generates 1,000 hours of multi-talker audio in under 5 minutes.
- Demonstrates that turn-taking dynamics and source domain diversity are critical: corpus-fitted HMM transition models and multi-domain source mixtures consistently outperform flat priors and single in-domain datasets.
- Discovers a task divergence where artificially boosting speech overlap improves target-speaker ASR (DiCoW) but degrades speaker diarization (Sortformer) boundaries.
- Shows that acoustic augmentation (noise + room impulse responses) is vital for diarization (yielding an 11% absolute drop on far-field AliMeeting) but has minimal impact on heavily pretrained ASR backbones like Whisper.
- Establishes that a two-stage training recipe (synthetic pre-training followed by real-data fine-tuning) achieves the best overall performance, dropping macro DER to 15.5% for diarization and macro tcpWER to 8.7% for ASR.

## Problem

Multi-talker conversational speech processing architectures like DiCoW and Sortformer are data-hungry, yet real conversational datasets (such as AMI, NOTSOFAR-1, and CHiME) are severely limited in scale (tens to hundreds of hours), expensive to annotate, and privacy-restricted. While synthetic data generation is widely used to bridge this gap, simulation strategies remain heavily fragmented, designed exclusively for single tasks, reliant on single seed sources, and poorly understood regarding their transfer to spontaneous in-the-wild interactions. Furthermore, there is no community consensus on whether synthetic data should be used alone, combined jointly with real recordings, or applied via sequential pre-training.

## Method

The study builds upon two core architectures: DiCoW, which injects frame-level diarization cues into a Whisper-large-v3-turbo encoder for multi-talker ASR (MT-ASR), and Sortformer, an offline 4-speaker encoder-only model using a 109M-parameter NEST-L backbone that resolves permutations via Sort Loss without clustering or attractors. The simulation engine, FastMSS, extends a two-speaker HMM turn-taking approach to multi-speaker settings by modeling four transition types: turn hold (TH), turn switch (TS), interruption (IR), and backchannel (BC). Pause and gap durations are drawn from exponential distributions, overlap ratios from truncated exponentials, and participant order is selected uniformly at random. FastMSS also integrates Pyroomacoustics for room impulse responses, MUSAN noise sources (excluding speech), and per-utterance gain variation.

To explore training strategies, the authors evaluate synthetic-only training, joint real-and-synthetic training, and a two-stage pipeline consisting of synthetic pre-training followed by real-data fine-tuning. For DiCoW, the ASR decoder is frozen during training to bypass the lack of inter-turn semantic coherence inherent in concatenative simulation. DiCoW is trained using greedy attention-only decoding and evaluated via time-constrained minimum-permutation WER (tcpWER) with a 5s collar, while Sortformer is trained on 60-second random crops from 90-second simulated segments (balancing 1-4 speaker sessions at a 1/3/6/10 ratio) and evaluated using diarization error rate (DER) with a 0s collar.

## Experimental setup

Source domains for synthetic data include LibriSpeech (960h read speech), VoxPopuli (543h semi-spontaneous), otoSpeech (141h conversational), and close-talk channels of AMI and NOTSOFAR-1 (NSF-1). Real data baselines use a ~314-hour multi-domain set comprising NSF-1, AMI, AliMeeting, DIHARD-III Dev, and VoxConverse-v0.3. Evaluation benchmarks include NSF-1 (SC and MHM), AMI (SDM and MHM), AliMeeting (Near and Far), LibriSpeechMix (LS1-LS3), Mixer6 (MX6) CH4, DIHARD-III Eval (1-4 speaker subset), and MSDWild. Implementations use NVIDIA NeMo framework, evaluated with metrics tcpWER and DER.

## Results

For multi-talker ASR (DiCoW), corpus-fitted turn-taking statistics improve NSF-1 tcpWER from 24.8% (flat prior) to 23.6%, and artificial overlap boosting pushes it further to 22.1% (matching real in-domain performance on AMI at 25.1%). Using a Combined multi-source synthetic dataset yields a macro tcpWER of 10.0%, outperforming real-only training (10.9%), while a two-stage synthetic-to-real training strategy achieves the best overall macro average of 8.7% (NSF-1 SC at 16.3%, AMI SDM at 14.9%). For speaker diarization (Sortformer), CALLHOME-fitted turn-taking with noise and reverberation augmentation reduces macro DER from 26.1% (clean, flat prior) to 22.2%. In this domain, overlap boosting degrades macro average DER from 26.1% to 27.6%, confirming task divergence. Combining synthetic data with real data via a two-stage approach achieves the best macro DER of 15.5% (outperforming real-data-only at 17.4%), with dramatic improvements on far-field conditions like AliMeeting Far (12.0% DER).

| System / Condition | NSF-1 SC (tcpWER/DER) | AMI SDM (tcpWER/DER) | Macro Avg | AliMeeting Far (DER) |
|---|---|---|---|---|
| DiCoW: Real Only | 17.7% | 15.5% | 10.9% | - |
| DiCoW: Synthetic Combined | 20.6% | 16.5% | 10.0% | - |
| DiCoW: Synthetic -> Real | 16.3% | 14.9% | 8.7% | - |
| Sortformer: Real Only | 21.5% | 15.0% (MHM) | 17.4% | 13.5% |
| Sortformer: Synthetic Only | 25.9% | 22.0% (MHM) | 22.2% | 22.9% |
| Sortformer: Synthetic -> Real | 18.3% | 14.5% (MHM) | 15.5% | 12.0% |

## Limitations

The concatenative simulation approach lacks inter-turn semantic coherence, which forces the freezing of the ASR decoder during training to prevent distribution shifts. The evaluation relies heavily on forced-alignment ground-truth timestamps for conversational corpora (AMI, AliMeeting, NSF-1) rather than standard oversegmented human annotations, potentially altering real-world difficulty bounds. Additionally, language coverage is restricted to English source corpora, and performance on extreme multi-speaker scenarios (>4 speakers) remains limited by the dataset and model configurations evaluated.

## Why read this

Speech and ML engineers building conversational AI systems or multi-speaker pipelines should read this paper to understand how to optimally construct synthetic multi-talker training data using FastMSS. It offers definitive guidelines on why task-specific simulation parameters (such as overlap control and acoustic augmentation) dictate downstream success for ASR versus diarization.

## Code

- https://github.com/popcornell/FastMSS

## Applications

Multi-talker automatic speech recognition, end-to-end speaker diarization, meeting transcription systems, and spoken dialogue agents.

## Related

- (link related pages by id as the wiki grows)
