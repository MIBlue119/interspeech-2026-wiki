---
id: chen26d_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-386
pdf: https://www.isca-archive.org/interspeech_2026/chen26d_interspeech.pdf
---

# YODAS v3: Over 1 Million Hours of High-Bandwidth, Stereophonic, Multilingual Speech

*William Chen, Shinnosuke Takamichi, Sayaka Shiota, Satoru Fukayama, Samuele Cornell, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-386)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — YODAS v3 is an open-access, weakly-supervised speech dataset containing 1.1 million hours of 48kHz multi-channel audio across 147 languages. It achieves language balance and high acoustic fidelity, supporting downstream spatial audio, ASR, and neural codec research.

## Key contributions

- Introduces language-specific keyword generation via filtered Wikipedia subword unigram tokenization to mitigate high-resource language bias in web crawling.
- Reaches 1.1M hours of multilingual speech data across 147 languages with 22 languages exceeding 10K hours and English accounting for under 2% of the total dataset.
- Provides native 48kHz multi-channel OPUS audio with 71% of files verified as truly multi-channel (primarily stereo or up to 4-channel surround) and 92.5% exceeding 32kHz effective bandwidth.
- Includes timestamped utterance-level weak supervision covering original language automatic/manual subtitles and English translations.

## Problem

Prior open-source speech datasets like VoxPopuli, MLS, and YODAS v2 are predominantly monaural, limited to 16kHz or 24kHz sampling rates, and heavily skewed toward high-resource languages such as English. While proprietary models scale beyond 10 million hours of rich multi-channel audio, open-source researchers lack large-scale corpora with high-resolution spatial audio. This scarcity severely bottlenecks progress in modern domains like multi-speaker ASR, high-fidelity codec modeling, expressive TTS, and spatial speech enhancement.

## Method

YODAS v3 avoids high-resource bias by building language-specific keyword lists from Wikipedia dumps, filtering strings between 3-30 characters, and training unigram subword tokenizers to retain only high-likelihood keywords for YouTube queries under Creative Commons licenses. To prioritize novel content, searches target newly uploaded videos, avoiding old high-view-count biases and ensuring zero overlap with YODAS v2 IDs. Audio is stored in its native 48kHz multi-channel OPUS container with utterance-level manual or automated timestamps.

For downstream evaluation, monolingual ASR models are trained on a 7-language subset (4.5K hours for English, ~100 hours each for 6 others) initialized from OWSM v4 base (102M parameters) using ESPnet, and optimized across various CTC-segmentation and score filtering thresholds (theta_CTC from 0.0 to 0.3). Neural audio codecs are trained using the Descript Audio Codec (DAC) architecture on a 1200-hour random subset of YODAS v3 at 16kHz, 24kHz, and 48kHz sampling rates via the ESPnet-Codec framework to benchmark robustness against in-domain web noise.

## Experimental setup

Evaluates data using 1.1 million hours across 147 languages. ASR models are probed on 7 Common Voice languages using Word Error Rate (WER) and Character Error Rate (CER), trained for 40K steps. Neural codecs are evaluated on 1000 YODAS v3 videos and LibriTTS using Short-Time Objective Intelligibility (STOI) and WavLM embedding-based speaker similarity.

## Results

ASR models trained on YODAS v3 demonstrated that removing CTC score-based filtering (theta_CTC = 0.00) generally yields the lowest error rates (e.g., German WER 14.4%, French WER 17.2%, Japanese CER 27.7%), proving the corpus is clean enough to be used directly out-of-the-box without aggressive cleaning. For neural codecs, a 48kHz DAC model trained on YODAS v3 achieved a 0.97 in-domain STOI and 0.84 speaker similarity on YODAS v3, outperforming lower sampling rates and models trained on larger multi-domain mixes like AMUSE (33K hours).

| System | SR | Libri STOI | TTS SPK | YODAS v3 STOI | YODAS v3 SPK |
|---|---|---|---|---|---|
| LibriTTS Baseline | 16kHz | 0.95 | 0.76 | 0.74 | 0.69 |
| LibriTTS Baseline | 24kHz | 0.97 | 0.83 | 0.80 | 0.78 |
| AMUSE Baseline | 16kHz | 0.93 | 0.74 | 0.81 | 0.83 |
| AMUSE Baseline | 44kHz | 0.95 | 0.82 | 0.90 | 0.77 |
| YODAS v3 (This Work) | 16kHz | 0.92 | 0.60 | 0.82 | 0.79 |
| YODAS v3 (This Work) | 48kHz | 0.97 | 0.84 | 0.94 | 0.90 |

## Limitations

The dataset relies on automated YouTube transcripts and locale tags as weak supervision proxies rather than pristine manual transcriptions, introducing potential label noise. Manual subtitles are sparse, comprising only 3.7% of the total collection. Furthermore, web-scale audio inherently includes background noise, music, and overlapping speakers, which degrades clean out-of-domain evaluation metrics unless domain-specific filtering is applied.

## Why read this

Speech researchers and ML engineers building foundation models for spatial audio, neural codecs, and multilingual ASR will find YODAS v3 essential for scaling open-access pretraining data beyond legacy 16kHz monaural limits.

## Code

- https://huggingface.co/datasets/espnet/yodas3

## Applications

Training high-fidelity neural audio codecs, spatial speech enhancement models, multilingual speech foundation models, and conversational speech recognition systems.

## Institutions / 機構

Carnegie Mellon University, Keio University, Tokyo Metropolitan University, National Institute of Advanced Industrial Science and Technology

**Funding / 經費:** ACCESS program, National Science Foundation, Cabinet Office, Government of Japan

## Related

- (link related pages by id as the wiki grows)
