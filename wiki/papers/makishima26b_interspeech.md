---
id: makishima26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1592
pdf: https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf
---

# Unified Audio-Visual Modeling to Recognize Which Face Spoke When and What in Scenarios with On- and Off-Screen Participants

*Naoki Makishima, Suzuka Yamada, Taiga Yamane, Mana Ihori, Tanaka Tomohiro, Satoshi Suzuki, Shota Orihashi, Ryo Masumura*

[PDF](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1592)

**Category:** `asr`

**TL;DR** — This paper proposes a unified audio-visual speaker-attributed speech recognition method that handles both on-screen and off-screen speakers in multi-talker conversations by introducing a dedicated [None] video token. It significantly outperforms conventional cascading and joint baselines in visual word and time error rates when off-screen participants are present.

## Key contributions

- Introduces a special [None] video token into autoregressive sequence-to-sequence audio-visual multi-talker modeling to explicitly represent absent or occluded speakers.
- Extends training and evaluation simulation datasets from LRS3 to incorporate arbitrary combinations of on-screen and off-screen participants.
- Formulates a joint audio-visual speech recognition and active speaker tracking objective that prevents forced erroneous speaker-to-video assignments.
- Demonstrates robust performance matching fully-visible specialized models when all speakers are on-screen while outperforming them when off-screen participants are included.

## Problem

Real-world conversations often feature participants whose faces are occluded or completely outside the camera's view due to camera framing or privacy concerns. Conventional audio-visual speaker-attributed speech recognition (AVSASR) models, such as prior joint attention frameworks, fundamentally assume that every speaker heard in the audio stream is always visible in the video. When forced to assign visible video tokens to off-screen voices, these traditional models make erroneous associations, severely degrading transcription and diarization performance.

## Method

The proposed architecture utilizes an end-to-end Transformer-based encoder-decoder model that jointly predicts textual tokens, start/end timestamps, and video assignment tokens in a first-in, first-out autoregressive sequence. The audio branch processes 80-dimensional log mel-filterbank coefficients through an initial convolutional and LSTM front-end followed by an 8-layer Transformer encoder (256-dim, 4 attention heads). The visual branch processes 5 fps grayscale mouth crops (96x96 pixels) using a MobileNetV3-Small video encoder. These features are concatenated along the time axis using designated segment descriptors and passed into 2-layer Transformer encoder and decoder blocks. 

The core modification is the inclusion of a [None] token within the video token set U, allowing the autoregressive decoder to designate that a transcribed utterance does not correspond to any visible video track. The training recipe enforces that each participant video can be assigned at most once per utterance group, while the [None] token can be assigned multiple times. Models are optimized using cross-entropy loss with RAdam, employing a pre-training strategy where models are first trained without off-screen speakers and subsequently fine-tuned with mixed on- and off-screen scenarios.

## Experimental setup

Experiments are conducted on simulated 2-speaker and 3-speaker mixtures derived from the LRS3 dataset, featuring an average signal-to-interference ratio of 0 dB. Models are evaluated using Word Error Rate (WER), Visual Word Error Rate (VWER, measuring correctness of who spoke what), and Visual Time Error Rate (VTER, measuring correctness of who spoke when) with a 250 ms boundary tolerance. Baselines include conventional multi-talker ASR, conventional multi-talker AVSASR without the [None] token, and a pipelined combined system of multi-talker AVSR paired with a frame-wise Lip Moving Detection (LMD) classifier.

## Results

When evaluated on 2-speaker mixtures containing off-screen speakers, the proposed method achieves a WER of 25.8%, a VWER of 30.4%, and a VTER of 3.5%, outperforming the conventional AVSASR model (which degrades to a VWER of 71.9%) and the AVSR + LMD combined system (VWER 34.8%, VTER 6.4%). When all speakers are on-screen, the proposed method achieves near-identical performance to the specialized on-screen-only conventional AVSASR (e.g., 2-speaker VWER of 27.9% vs 28.8%). 

The primary limitation where the model struggles is handling complex audio-visual synchronization when the count of moving lips does not match the active utterance count in mixed on/off-screen environments.

| System | 1-Spk Off-Screen VWER | 2-Spk Off-Screen VWER | 3-Spk Off-Screen VWER | 2-Spk Off-Screen VTER |
|---|---|---|---|---|
| Conventional AVSASR | 100.0% | 71.9% | 88.4% | 76.3% |
| AVSR + LMD | 18.2% | 34.8% | 44.9% | 6.4% |
| Proposed Method | 18.4% | 30.4% | 42.6% | 3.5% |

## Limitations

The evaluation relies entirely on simulated multi-speaker mixtures derived from single-speaker LRS3 clips rather than natural multi-party meeting recordings. The video frame rate is restricted to 5 fps due to memory constraints, which potentially limits fine-grained lip movement analysis. Furthermore, performance drops when numerous off-screen speakers converse simultaneously due to the inherent ambiguity of audio-visual synchronization without direct visual cues.

## Why read this

Speech and ML researchers building real-world multi-party meeting transcription systems where participants are frequently occluded or off-camera should read this paper to learn how to adapt joint audio-visual models using a simple yet effective null-token strategy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription, multi-speaker conversational analysis, and smart-room video conferencing systems with partial camera visibility.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
