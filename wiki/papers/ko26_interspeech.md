---
id: ko26_interspeech
category: asr
labels: [low-resource]
institutions: ["National Cheng Kung University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-891
pdf: https://www.isca-archive.org/interspeech_2026/ko26_interspeech.pdf
---

# Mispronunciation Modeling via PPG-Based Phone Editing: A Data Augmentation Framework for Dysarthric Speech Recognition

*Tsai-Hsiu Ko, You-Cyuan Jhuo, Chung-Hsien Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/ko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-891)

**Category:** `asr` · **Labels:** `low-resource`

**TL;DR** — This paper presents a dysarthric speech data augmentation framework that combines phonetic posteriorgram (PPG)-based phone editing, speaking style conversion, and phonetic-level speed perturbation, achieving a word error rate of 19.53% on the UASpeech corpus.

## Key contributions

- Constructs a speaker-dependent phonetic mapping matrix from paired control and dysarthric utterances to quantify fine-grained mispronunciation patterns.
- Proposes a PPG-based phone editing method that swaps phoneme probability distributions frame-by-frame to emulate individual articulatory defects.
- Adapts the UUVC voice conversion architecture into a PPG-to-speech synthesizer by removing the duration network and integrating a source-filter-energy network with HiFi-GAN.
- Demonstrates consistent ASR accuracy improvements on the UASpeech corpus, particularly for low and very-low intelligibility speakers.

## Problem

Automatic speech recognition systems struggle to recognize dysarthric speech because of severe acoustic mismatch, irregular rhythms, and extreme data scarcity. Existing data augmentation approaches like uniform speed perturbation and GAN-based style transfer manipulate global features like pitch, duration, and energy, failing to capture fine-grained, speaker-dependent phonetic mispronunciations. Developing robust systems is further hindered by the physiological burden of collecting extensive disordered speech corpora from patients.

## Method

The framework consists of pronunciation variation analysis, PPG-based phone editing, speaking style conversion, and speed perturbation. First, phoneme alignments map expected phonemes to pronounced ones under vowel/consonant and shared-neighbor constraints, populating a 40x40 speaker-dependent phonetic mapping matrix. Second, expected phonemes with pronunciation accuracy below an alpha threshold (70%) are edited by swapping probability distributions with substitution candidates exceeding a beta threshold (5%). Third, a modified UUVC synthesizer translates the edited continuous PPGs into mel-spectrograms without a duration network; it combines a source network (PPG + speaker embedding), filter network (PPG + pitch embedding), and energy network, trained using L1 mel loss, binary cross-entropy for pitch/energy bins, and least-squares adversarial loss, followed by a HiFi-GAN vocoder. Finally, phonetic-level speed perturbation applies the WSOLA algorithm based on Kaldi GMM-HMM forced alignments to scale phoneme durations to match the target dysarthric speaker's tempo.

For downstream ASR, a HuBERT Large model is fine-tuned on the augmented data after freezing weights for the first 10,000 updates, using the Adam optimizer with a peak learning rate of 2e-5 and a tristage schedule.

## Experimental setup

Evaluated on the UASpeech corpus (15 dysarthric speakers across high, medium, low, and very-low intelligibility subgroups, and 13 control speakers using blocks 1 and 3 for training and block 2 for testing). The VCTK corpus (110 English speakers) was used exclusively to pre-train the PPG-to-speech synthesizer. Metrics include Word Error Rate (WER) for ASR, MOSNet for synthetic naturalness, and Speaker Embedding Similarity (SES) for timbre preservation.

## Results

The proposed method achieves an overall WER of 19.53%, outperforming the GAN-based baseline (21.88%). The gains are most prominent in severely impaired groups, reducing WER from 24.14% to 20.45% in the low intelligibility group and from 58.25% to 53.71% in the very-low intelligibility group. Ablation studies show that each component contributes incrementally: replacing random substitution with the proposed mapping matrix improves WER from 22.05% to 21.48%, adding style conversion further drops it to 20.52%, and incorporating phonetic-level speed perturbation achieves the final 19.53%.

| System | H | M | L | VL | All |
|---|---|---|---|---|---|
| Baseline [6] | 3.09 | 13.19 | 24.14 | 58.25 | 21.88 |
| Ours (Mapping + Style + Speed) | 2.75 | 10.32 | 20.45 | 53.71 | 19.53 |

## Limitations

The framework relies on the availability of parallel typical and dysarthric text-matched utterances to construct the phonetic mapping matrix, which may not always exist. The phone editing strategy is restricted to a maximum of one modification per utterance to prevent excessive distortion, potentially missing complex multi-phoneme error patterns. Evaluation is limited to the English UASpeech corpus, leaving multilingual and cross-accent scalability unverified.

## Why read this

Researchers working on pathological speech recognition or data augmentation for low-resource domains should read this to learn how to explicitly model phoneme-level substitution matrices instead of relying solely on global acoustic transformations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Dysarthric speech recognition assistants, accessible communication interfaces for individuals with motor speech disorders.

## Institutions / 機構

National Cheng Kung University

**Funding / 經費:** National Science and Technology Council of Taiwan

## Related

- (link related pages by id as the wiki grows)
