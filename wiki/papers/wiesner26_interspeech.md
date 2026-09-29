---
id: wiesner26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Johns Hopkins University", "CNRS", "Carnegie Mellon University", "Brno University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2462
pdf: https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.pdf
---

# Modeling Overlapped Speech with Shuffles

*Matthew Wiesner, Samuele Cornell, Alexander Polok, Lucas Ondel-Yang, Lukáš Burget, Sanjeev Khudanpur*

[PDF](https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2462)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — The paper introduces the shuffle product and partial order finite-state automata (FSAs) to model concurrent data streams, enabling end-to-end speaker-attributed transcription and the first single-pass Viterbi alignment for multi-talker overlapped speech. On LibriMix test sets, the proposed lightweight WavLM-based shuffle models achieve competitive multi-speaker word error rates (tcpWER) while offering a principled generalization of prior serialization strategies.

## Key contributions

- Formulates multi-talker ASR supervision via the shuffle product and partial order FSAs to marginalize over all valid token interleavings.
- Introduces temporal constraints via time collars (kappa) to prune the shuffle graph size, bridging token-level SOT and full shuffles.
- Extends CTC to model (token, speaker) tuples through factored and joint output spaces, enabling both greedy 1-pass and target-speaker N-pass decoding.
- Enables the first single-pass Viterbi forced alignment for multi-talker recordings using shuffle FSAs.

## Problem

Traditional Permutation Invariant Training (PIT) for overlapped speech requires fixing the maximum number of speakers a priori and scales combinatorially. Utterance-level Serialized Output Training (SOT) imposes rigid FIFO speaker orderings, whereas token-level SOT (tSOT) relies on precise word-level alignments that are typically unavailable for in-the-wild or web-video data. These limitations prevent robust end-to-end speaker-attributed transcription and token-level alignment of multi-talker recordings without sacrificing computational tractability or relying on oracle speaker counts.

## Method

The framework models overlapped speech as the recovery of interleaved token sequences observed through a shared acoustic channel. Let y and z be token sequences; their shuffle product y â z generates all possible interleavings preserving internal sequence order. To make graph construction tractable, the authors introduce partial order constraints using approximate token start times and a temporal collar kappa: tokens whose start times are within kappa are left unordered, while those outside obey a precedence relationship (yi âº zj). This prunes the hypercube state space (which scales as O(k^N*N^k) for k sequences of length N) via breadth-first search. The topology uses the compact selfless label topology to exploit the peaky behavior of CTC for discrete event sequences.

For speaker attribution, the CTC output space is augmented to (token, speaker) tuples, utilizing either a factored joint model (multiplying token and speaker probabilities) or a direct joint model over unrolled (upsilon_t, sigma_t) vectors. Training minimizes the negative log-forward score over the shuffle FSA using the log-semiring implemented in k2/Icefall. For inference, 1-pass greedy decoding extracts (BPE, speaker) sequences directly from frame argmaxes, whereas N-pass decoding routes target-speaker probabilities through a WFST language model decoding graph (TLG) by shifting non-target speaker probability mass to speaker-specific blanks.

## Experimental setup

Evaluated on synthetic LibriSpeech overlaps, Libri2Mix, Libri3Mix, and LibriSpeech clean/other test sets, featuring high speaker density and overlap percentages between 42% and 72%. Baselines include SOT, token-level SOT (kappa=0), Speaker-Distinguishable CTC (SD-CTC), and an oracle single-speaker CTC alignment. Models use pretrained WavLM Base and Large encoders downsampled to 25 Hz or 50 Hz, trained using the Adam optimizer with a OneCycle scheduler (102k iterations, max LR 1e-4) on a single 32GB V100 GPU with a 5000-token BPE vocabulary.

## Results

Sweeping the partial order collar kappa from 0s to 4s on WavLM Base (25 Hz) drops the average tcpWER from 36.3% (kappa=0) down to 26.0% (kappa=4s). With a 50 Hz frame rate, WavLM Large models trained with the shuffle loss achieve a 17.2% average tcpWER (8.1% on LibriMix 2 Clean), matching or slightly outperforming SD-CTC variants (17.4%). Ordering speakers by total speaking duration (length) rather than time of first appearance (start) significantly improves performance on overlapped test sets (e.g., dropping LibriMix 2 Clean tcpWER from 17.6% to 8.1% for large shuffle models). For multi-talker alignment, models trained with the shuffle loss achieve an Intersection over Union (IoU) of 61.8% and a boundary error of 69 ms on 2-speaker overlaps, closely tracking the single-speaker oracle (IoU 64.6%, BE 63 ms). The method struggles on 3-speaker overlaps when utterance boundaries are unconstrained (kappa=32s) due to out-of-memory errors from excessive graph size.

| System | Synth | LibriMix 3 Clean | LibriMix 2 Clean | LibriMix 2 Both | LibriSpeech Clean | LibriSpeech Other | Average |
|---|---|---|---|---|---|---|---|
| WavLM Base (SOT) | 43.7 | 71.9 | 50.5 | 65.8 | 6.4 | 12.0 | 41.7 |
| WavLM Base (kappa = 0s) | 36.6 | 69.6 | 39.3 | 52.8 | 7.0 | 12.2 | 36.3 |
| WavLM Base (kappa = 4s) | 18.5 | 60.6 | 21.1 | 39.7 | 5.7 | 10.4 | 26.0 |
| WavLM Large (Shuffle, length) | 11.8 | 44.3 | 8.1 | 25.3 | 5.3 | 8.2 | 17.2 |
| WavLM Large (SD-CTC, length) | 11.1 | 43.8 | 7.8 | 28.2 | 5.3 | 8.2 | 17.4 |

## Limitations

The search space and graph size of unconstrained shuffles grow exponentially with the number of speakers and sequence lengths, causing GPU memory overflow on 3-speaker overlaps when utterance start/end boundaries are completely unknown (large kappa). Experiments are restricted to synthetic LibriSpeech mixtures with a maximum of 4 speakers, leaving real-world acoustic conditions, domain mismatch, and highly conversational web videos untested at scale.

## Why read this

Speech and ML researchers working on multi-talker ASR or forced alignment will find this a foundational unification of FSA shuffle products and CTC objectives, replacing heuristic SOT methods with a principled mathematical framework.

## Code

- https://github.com/geolocation-from-speech/jsalt2025.git

## Applications

Multi-talker automatic speech recognition, automated corpus creation via multi-speaker forced alignment, diarization-free conversational transcription, and polyphonic music or multi-event audio parsing.

## Institutions / 機構

Johns Hopkins University, CNRS, Carnegie Mellon University, Brno University of Technology

**Funding / 經費:** Jelinek Memorial Summer Workshop on Speech and Language Technologies, Advanced Cyberinfrastructure Coordination Ecosystem: Services Support, National Science Foundation, National Science and Technology Council, Ministry of Education, Youth and Sports of the Czech Republic

## Related

- (link related pages by id as the wiki grows)
