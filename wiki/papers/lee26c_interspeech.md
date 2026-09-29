---
id: lee26c_interspeech
category: translation
labels: [multilingual, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-540
pdf: https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.pdf
---

# NaturalFlow: Reducing Disruptive Pauses for Natural Speech Flow in Simultaneous Speech-to-Speech Translation

*Dongwook Lee, Youngho Cho, Sangkwon Park, Heeseung Kim, Sungroh Yoon*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-540)

**Category:** `translation` · **Labels:** `multilingual`, `streaming-real-time`

**TL;DR** — NaturalFlow is a fluency-aware simultaneous speech-to-speech translation (S2ST) framework that reduces disruptive inter-chunk silences by 13-58% across benchmarks without degrading latency or translation quality.

## Key contributions

- Formulates simultaneous S2ST pause reduction as a preference-based learning problem using Direct Preference Optimization (DPO).
- Introduces the 'Silver-Medal Preference' strategy, choosing the second quintile (top 20-40%) of candidate translations to avoid fluency collapse and semantic degradation.
- Applies acoustically grounded text-stream isolation and Length-Normalized DPO to stabilize training over discrete acoustic spaces.
- Demonstrates consistent silence-ratio reductions on both short-form (CVSS-C, VoxPopuli) and long-form (Audio-NTREX, mTEDx) benchmarks.

## Problem

Simultaneous speech-to-speech translation models prioritize minimal latency by releasing translations in short chunk-wise bursts, leading to fragmented, pause-laden acoustic delivery that increases listener cognitive load. While prior systems like StreamSpeech and SeamlessStreaming optimize the BLEU-versus-lag trade-off, they ignore acoustic fluency and pause frequency. This matters because unnatural pauses heavily degrade human perception of translation intelligibility and quality even when semantic content is preserved.

## Method

NaturalFlow builds on top of Hibiki-2B, which discretizes raw audio at 12.5 Hz using Mimi (16 codebooks) and jointly predicts target audio tokens and word-aligned text. To optimize silence without manual policies, the authors collect 32 candidate translations per source utterance using a temperature of 1.0. These candidates are stratified into five quintiles by silence ratio (measured via Silero VAD with 0.5 threshold, 250ms min speech, 100ms min silence). Standard DPO optimization on the extreme lowest-silence tier causes models to aggressively rush speech and collapse semantically. To fix this, the 'Silver-Medal' strategy designates the second quintile (20-40% rank) as the preferred set and the 1st and 3rd-5th quintiles as rejected, enforcing large-margin requirements (delta BLEU >= 5, delta silence ratio >= 15%).

To make training stable over intractable discrete audio tokens, optimization is restricted to the auto-regressive text policy conditioned on both source audio and generated audio streams. Length-Normalized DPO (DPO-LN) divides log-probabilities by text sequence length to prevent unfair penalization of longer, accurate translations. Fine-tuning uses LoRA with rank r=128, text padding weight 0.5, duration 102.4, KL penalty beta=0.1, effective batch size 32, peak learning rate 2e-6 with a 5% one-cycle warmup, trained for 400 steps on 4 NVIDIA L40S and 2 NVIDIA RTX PRO 6000 Blackwell GPUs.

## Experimental setup

Evaluated on short-form datasets (CVSS-C French-to-English test set with ~5.6s utterances; VoxPopuli S2S interpretation subset with ~11.4s utterances) and long-form datasets (Audio-NTREX-4L test set with ~42.1s utterances; concatenated mTEDx French-to-English test/val splits with ~35.8s utterances). Compared against baselines StreamSpeech, SeamlessStreaming (Seamless), and Hibiki. Metrics include ASR-BLEU (via Whisper-medium), ASR-COMET (via XCOMET-XL), Start Offset, End Offset, Length-Adaptive Average Lagging (LAAL), and Silence Ratio (SR). Human evaluation uses Amazon Mechanical Turk with 30 raters across ~150 trials.

## Results

On CVSS-C short-form, NaturalFlow achieves an SR of 0.08 (matching Hibiki while reducing the top-quartile high-SR subset) with an ASR-BLEU of 25.30 and LAAL of 3.46. On VoxPopuli, it lowers SR from 0.12 (Hibiki) to 0.10 while maintaining 17.40 ASR-BLEU and 3.36 LAAL. On long-form Audio-NTREX, it reduces SR to 0.13 (vs 0.17 for Hibiki) with 23.96 ASR-BLEU and 3.49 LAAL. On mTEDx long-form, it reduces SR to 0.21 (vs 0.26 for Hibiki) while improving ASR-BLEU to 33.27 and achieving the best LAAL of 3.38. Ablations show that removing the silver-medal buffer (selecting the top 0-20% low-SR candidates) causes a catastrophic drop in ASR-BLEU down to 1.50 and an unintelligible speech rate exceeding 300 words per minute. In human evaluations, raters preferred NaturalFlow over the baseline 55% to 34% (11% ties) and over the unconstrained ablation 68% to 24%.

| System | Dataset | SR (↓) | LAAL (↓) | ASR-BLEU (↑) | ASR-COMET (↑) |
|---|---|---|---|---|---|
| Hibiki | VoxPopuli (Short) | 0.12 | 3.54 | 19.18 | 0.73 |
| NaturalFlow | VoxPopuli (Short) | 0.10 | 3.36 | 17.40 | 0.66 |
| Hibiki | mTEDx (Long) | 0.26 | 3.69 | 32.94 | 0.46 |
| NaturalFlow | mTEDx (Long) | 0.21 | 3.38 | 33.27 | 0.46 |

## Limitations

Evaluated exclusively on French-to-English translation, leaving multilingual generalizability across diverse language families untested. The framework relies on an existing pre-trained multi-stream foundation model (Hibiki-2B) and requires generating 32 candidate samples per utterance for preference mining, incurring significant offline data construction overhead.

## Why read this

Read this if you work on simultaneous speech-to-speech translation or preference optimization, as it demonstrates how to prevent multi-objective alignment collapse via middle-quintile candidate selection rather than aggressive Pareto-frontier extremes.

## Code

- https://naturalflows2st.github.io/naturalflow/

## Applications

Simultaneous multilingual speech-to-speech translation systems for real-time international conferences, live broadcast dubbing, and low-latency voice assistants.

## Institutions / 機構

Seoul National University, University of Seoul

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT, National Research Foundation of Korea, BK21 FOUR Program, Samsung Electronics

## Related

- (link related pages by id as the wiki grows)
