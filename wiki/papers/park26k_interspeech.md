---
id: park26k_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3285
pdf: https://www.isca-archive.org/interspeech_2026/park26k_interspeech.pdf
---

# MeloDISinger: Melody-Aware & Duration-Preserving Singing Voice Editing with Audio Infilling

*Yoonjeong Park, Jaekwon Im, Juhan Nam*

[PDF](https://www.isca-archive.org/interspeech_2026/park26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3285)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — MeloDISinger is a flow-matching-based singing voice editing model that leverages a melody-aware duration-ratio predictor (MeloDRP) and audio infilling to modify lyrics while strictly preserving total duration and melody. It achieves state-of-the-art objective and subjective performance, reducing word error rates significantly compared to existing baselines.

## Key contributions

- Proposes MeloDRP to predict fixed-budget duration ratios instead of absolute durations, enabling explicit spanwise duration control and guaranteeing zero total duration deviation.
- Introduces cross-attention fusion between phonetic cues (start flags and coarse phoneme types) and pseudo-MIDI melodic context with temporal-overlap supervision.
- Employs a flow-matching mel decoder in an audio-infilling setup to synthesize edited regions while leaving non-edited contexts untouched.
- Constructs a duration-aware edited-lyric generation pipeline combining WhisperX alignment and Gemini-2.5-flash to enforce feasible evaluation scenarios based on syllable capacities.

## Problem

Text-based singing voice editing requires modifying lyrics while keeping accompaniment synchronization, rhythm, and melody intact. Implicit editing methods learn alignment without phoneme annotations but fail to enforce hard duration constraints, often altering non-edited regions or causing timing drift. Explicit counterparts like EditSinger rely on variance adaptors without melodic context, leading to unnatural speech-like timing and rigid phoneme-matching limitations that degrade pronunciation.

## Method

MeloDISinger follows a three-step pipeline: feature extraction, parsing operation, and modeling. Acoustic features (mel-spectrogram, speaker embedding via Resemblyzer, frame-level F0 with voiced/unvoiced flags, and a pseudo score derived from F0) are extracted alongside Montreal Forced Aligner durations. Edited lyrics are converted into 1559 phonemes using g2p-en, extracting start flags (word-initial, syllable-initial, others) and coarse phoneme types. The core MeloDRP module takes these representations and a phoneme-level budget sequence (b) representing the time span budget Ti for N disjoint edit spans. It encodes pseudo-MIDI extracted directly from performance audio, fusing it with phonetic cues through cross-attention in 4-layer Transformer encoders (hidden size 256, 2 heads). A span-wise softmax outputs duration ratios r_ij satisfying sum(r_ij) = 1, recovering predicted phoneme durations d_hat_ij = T_i * r_ij. The objective combines KL divergence on ratios (L_ph), word-aggregated L1 loss (L_wd), a minimum threshold penalty (L_pen), and an L1 guided-attention loss (L_ga) matching cross-attention to a binary phoneme-note temporal overlap mask.

The acoustic model predicts edited F0 contour (P_edit) using FPIP and feeds condition vector c (edited phoneme sequence, MeloDRP durations, FPIP pitch, speaker embedding, and original mel context) into a flow-matching decoder. The decoder uses a non-causal WaveNet architecture with 20 residual layers and 256 channels. During training, random edit masks (ratio r ~ U(0.3, 0.7)) are sampled, and the conditional flow-matching objective optimizes the mel decoder, mel encoder, and phoneme encoder over linear probability paths x_t = (1-t)x_0 + t_x1 with t ~ U(0,1). At inference, 100 Euler steps are sampled from Gaussian noise to yield x_hat_gen, which is merged with the original mel spectrogram to preserve non-edited regions perfectly.

## Experimental setup

Evaluated on GTSinger-En (13 hours of English singing voices from 3 singers). Audio uses a 44.1 kHz sampling rate, 2048 window size, 512 hop size, and 128 mel bins. Compared against EditSinger (reproduced) and Vevo2 across 60 clips from 8 unseen songs covering 6 singing techniques. Evaluated via WER/CER (using Whisper-large-v3), Duration Consistency (DC), Duration Difference (DDUR), F0 Pearson Correlation (FPC-Cut and FPC-DTW), and MOS tests rated by 22 listeners for Lyric Following, Melody Following, and Naturalness. Models are optimized using Adam (lr=1e-4, batch size 16) with MultiStepLR decay at 10k, 20k, and 30k steps.

## Results

MeloDISinger achieves zero duration difference (DDUR = 0.00s, matching ground truth duration within 0.004s due to STFT hop size) across all settings, whereas EditSinger (up to 0.67s DDUR) and Vevo2 (up to 1.92s DDUR) exhibit temporal drift. In phoneme-matched replacement (Rep-P), MeloDISinger scores a 31.33% WER (vs EditSinger's 38.80% and Vevo2's 51.45%). In syllable-mismatched replacement (Rep-SM), it achieves 28.74% WER (vs Vevo2's 40.89%). Subjectively, MeloDISinger dominates MOS across all metrics; for example, in syllable-matched replacement (Rep-S), it secures a Naturalness MOS of 3.85 vs Vevo2's 3.08, and in Deletion (Del) scores 3.87 vs EditSinger's 3.45 and Vevo2's 2.69. Ablations reveal that removing duration conditioning (-Dur) causes the most severe degradation across all scenarios, while removing melody conditioning (-Mel) heavily impairs performance in Rep-S, Rep-SM, Ins, and Mix scenarios.

| System | Rep-P WER (%) | Rep-S WER (%) | Ins WER (%) | Del WER (%) | Mix WER (%) |
|---|---|---|---|---|---|
| EditSinger | 38.80 | 19.67 | 19.67 | 27.01 | 50.93 |
| Vevo2 | 51.45 | 42.29 | 31.43 | 68.72 | 50.93 |
| MeloDISinger (Full) | 31.33 | 21.88 | 18.57 | 24.88 | 39.38 |

## Limitations

Evaluated exclusively on English singing data from a limited number of speakers (three distinct singers in GTSinger-En), leaving multilingual scalability untested. The approach relies heavily on a robust forced aligner (Montreal Forced Aligner) and accurate pseudo-MIDI extraction from isolated vocal audio, which could degrade on noisy polyphonic studio mixes. Furthermore, the dataset scale is restricted to 13 hours, and evaluation is limited to synthetic edit scenarios constructed via an LLM pipeline.

## Why read this

Read this paper if you build audio editing or generative voice systems and need hard structural constraints (exact time-budget allocation and total duration preservation) combined with flow-matching infilling. It demonstrates how incorporating pseudo-MIDI melodic context via cross-attention solves the rhythm and pitch-alignment failures typical of standard speech-editing adaptors.

## Code

- https://cottonlove.github.io/MeloDISinger_demo/

## Applications

Professional music production tools for pitch correction, mispronunciation fixes, lyric insertion, and vocal phrase replacement without altering backing tracks.

## Institutions / 機構

KAIST

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
