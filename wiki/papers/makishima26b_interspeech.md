---
id: makishima26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1592
pdf: https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf
---

# Unified Audio-Visual Modeling to Recognize Which Face Spoke When and What in Scenarios with On- and Off-Screen Participants

[PDF](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1592)

**TL;DR** — The paper proposes a unified audio-visual speaker-attributed speech recognition method incorporating a dedicated [None] token to handle off-screen or occluded speakers, preventing the forced erroneous associations common in conventional models.

## Problem

Conventional multi-talker audio-visual speaker-attributed speech recognition (AVSASR) models assume that all speakers whose audio is captured are fully visible within the video frames. In real-world environments like business meetings, participants may be occluded, outside the camera field of view, or absent due to privacy constraints. When forced to associate audio streams with available visible faces, standard models make significant errors in identifying who spoke when and what.

## Method

The method builds upon an autoregressive Transformer encoder-decoder architecture that jointly estimates timestamps, textual tokens, and video tokens from single-channel overlapped speech and multi-participant video streams. It introduces a special [None] video token representing that the speaker of a given transcript does not appear in the provided video frames. The model handles various combinations where any subset of speakers can be on-screen or off-screen. Training data utilizes simulated multi-talker conversations built from LRS3, extracting 5 fps mouth regions (96x96 grayscale) and 80-channel log-mel filterbanks, optimized using RAdam.

## Results

Evaluated on extended LRS3 test sets featuring on- and off-screen participant scenarios using Word Error Rate (WER), Visual Word Error Rate (VWER), and Visual Time Error Rate (VTER). Compared against conventional multi-talker AVSASR and a combined pipeline baseline (separate AVSR plus a lip-movement detector for diarization). The proposed method outperforms baseline models in both VWER and VTER when off-screen speakers are included, while matching the performance of dedicated conventional models when all speakers remain on-screen.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building multi-party meeting transcription systems, video conferencing tools, and automated minute-taking applications where participants may not always be visible on camera.

## Limitations

Speaker association remains challenging when off-screen speakers are present because the number of moving lips does not match utterance counts, requiring more robust audio-visual synchronization modeling.

## Related

- (link related pages by id as the wiki grows)
