---
id: behringer26_interspeech
category: speech-coding
labels: [robustness-noise]
institutions: ["Fraunhofer Institute for Integrated Circuits"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1459
pdf: https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.pdf
---

# Assessing the Impact of Noise and Speech Enhancement on the Intelligibility of Speech Codecs

*Lyonel Behringer, Anna Leschanowsky, Anjana Rajasekhar, Emily Kratsch, Guillaume Fuchs*

[PDF](https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1459)

**Category:** `speech-coding` · **Labels:** `robustness-noise`

**TL;DR** — A crowdsourced subjective evaluation of speech codecs reveals that classical codecs are significantly more noise-robust than neural codecs, though pre-processing with a speech enhancement model effectively bridges this performance gap. Furthermore, listening effort ratings successfully differentiate codec performance even when sentence-level intelligibility scores hit ceiling effects.

## Key contributions

- Performs a systematic crowdsourced sentence-level intelligibility evaluation comparing classical (AMR-WB, EVS) and neural codecs (LPCNet, Lyra V2, DAC, Mimi) across clean and noisy conditions.
- Demonstrates the effectiveness of combining speech enhancement (DeepFilterNet2) prior to neural coding to recover intelligibility and reduce listening effort in adverse SNR environments.
- Establishes listening effort as a valuable secondary metric that uncovers perceptual differences between codecs even when intelligibility scores saturate near ceiling.
- Evaluates the correlation between subjective scores and objective metrics, showing that ASR-based objective intelligibility outperforms STOI and ESTOI at the condition level.

## Problem

While neural speech codecs (NSCs) achieve high compression ratios, they are predominantly evaluated in clean conditions and prioritized for overall speech quality rather than explicit speech intelligibility, particularly in realistic noisy scenarios. Prior work relies heavily on word-level tests, objective proxies like STOI, or quality metrics, failing to assess sentence-level intelligibility in open-response listening tasks that mimic real-world communication. This lack of rigorous intelligibility benchmarks in adverse environments obscures potential content hallucinations and degradation in low-bitrate generative and neural codecs.

## Method

The study tests six codecs spanning classical CELP architectures (AMR-WB at 6.6 kbps, EVS at 8.0 kbps) and neural codecs (LPCNet at 1.6 kbps, Lyra V2 at 3.2 kbps, DAC at 1.5 kbps, and Mimi at 1.1 kbps). Test items comprise 48 unique naturalistic sentences selected from the Clarity Speech Corpus via the mLTM algorithm for phonemic balance, padded with leading/trailing silence, and loudness-normalized to -24 dBov. Four noise types from the DEMAND database (living room, restaurant babble, car engine, metro) are mixed at 5, 15, and 25 dB SNRs. Half of the noisy items are pre-processed using DeepFilterNet2, a real-time speech enhancement model consuming ~0.7 GFLOPs.

Crowdsourced listening tests are deployed via Amazon Mechanical Turk using an incomplete block design where participants transcribe open-response sentences and rate listening effort on a 5-point ITU-T P.800 Annex B scale. Transcripts are normalized by lowercasing, removing punctuation, and converting numbers to graphemes to compute speech intelligibility (SI) and word error rate (WER). Statistical analysis relies on linear mixed-effects models (LMM) incorporating fixed effects for codec, noise type, SNR, and speech enhancement, along with a codec-by-speech-enhancement interaction term and random intercepts for sentence ID.

## Experimental setup

The evaluation uses 2,352 total test items derived from 48 unique sentences, four DEMAND noise types, three SNR levels (5, 15, 25 dB), clean conditions, and with/without DeepFilterNet2 speech enhancement. A total of 160 native English-speaking participants generated 7,670 valid responses after rigorous screening (achieving <=10% WER on a 4-sentence clean screening task and <=30% on main test clean items). Baselines include clean unprocessed speech references and classical 3GPP codecs (AMR-WB, EVS). Objective evaluation metrics include STOI, ESTOI, and ASR transcript-based objective intelligibility evaluated across Whisper-Base, Whisper-Large-v3, Canary-1B-v2, and Parakeet-TDT-0.6B-v3.

## Results

Classical codecs (EVS and AMR-WB) demonstrate superior noise robustness compared to neural codecs, with statistically significant performance drops appearing for neural codecs at 15 dB and 5 dB SNR (e.g., EVS significantly outperforms DAC without SE, LPCNet with/without SE, and Mimi with/without SE at 5 dB SNR). Speech enhancement preprocessing yields statistically significant intelligibility gains for DAC (Δ=0.060, p < 0.001), LPCNet (Δ=0.082, p < 0.001), and Mimi (Δ=0.036, p = 0.003), effectively neutralizing the noise robustness deficit of neural codecs. In ceiling-effect subsets where SI >= 0.95, listening effort MOS successfully differentiates codecs, showing that DAC requires significantly less listening effort than other neural or classical counterparts, matching the clean reference. For objective metrics, ASR-based objective intelligibility correlates strongly with human subjective scores at the condition level (Whisper-Base condition-wise Pearson correlation reaching r = 0.973), substantially outperforming STOI (r = 0.870) and ESTOI (r = 0.903).

| System / Condition | Subjective Intelligibility (5 dB SNR) | Listening Effort MOS (SI >= 0.95) |
|---|---|---|
| Reference | 0.96 | 4.2 |
| EVS (No SE) | 0.94 | 4.0 |
| DAC (No SE) | 0.78 | 4.0 |
| DAC + SE | 0.89 | 4.0 |
| LPCNet (No SE) | 0.52 | 3.3 |
| LPCNet + SE | 0.76 | 3.4 |

## Limitations

The evaluation is restricted to English-language sentences, single-channel speech enhancement preprocessing, and a limited set of acoustic noise environments from the DEMAND database. Inter-annotator reliability drops at low SNR (5 dB), which introduces potential confounding from listener variability in highly adverse acoustic conditions. The crowdsourcing framework also lacks direct control over participant playback hardware, such as headphone quality.

## Why read this

Speech and ML engineers designing or deploying neural audio codecs should read this paper to understand the real-world trade-offs between ultra-low bitrate neural models and classical codecs in noisy environments. It provides actionable evidence that speech enhancement pipelines can salvage neural codec intelligibility while demonstrating how listening effort metrics bypass typical subjective ceiling effects.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication systems, mobile VoIP applications, hearing aid speech processing pipelines, and ultra-low bitrate audio transmission.

## Institutions / 機構

Fraunhofer Institute for Integrated Circuits

**Funding / 經費:** Free State of Bavaria

## Related

- (link related pages by id as the wiki grows)
