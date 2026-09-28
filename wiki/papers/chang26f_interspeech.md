---
id: chang26f_interspeech
category: multilingual
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2367
pdf: https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.pdf
---

# VIP-MINGLE: A Corpus for Videoconference and In-Person Multimodal Interaction in Group Language Engagement

*Andrew Chang, Abhinay K Bodi, Wenxin Deng, Junrui Huang, Venu G Kadamba, Sumanth B H Karanam, Dhiwahar A Kennady, David Poeppel, Dustin Freeman*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2367)

**TL;DR** — VIP-MINGLE is a 59-hour multimodal dataset featuring paired within-subject group conversations in both in-person and videoconferencing settings, demonstrating significant behavioral shifts across speech, syntax, and facial expressions.

## Key contributions

- Introduces VIP-MINGLE, a corpus containing 59 hours of recordings across 32 groups and 105 participants using a controlled within-subjects design for in-person versus videoconferencing comparison.
- Provides aligned raw audio/video streams, speaker diarization, Whisper large speech transcriptions, OpenFace geometric features, and DeepFace affect probabilities.
- Includes standardized participant psychometric baselines and time-resolved human annotations over 7,077 segmented clips evaluating fluidity, enjoyment, and conversational events.
- Quantifies specific cross-setting behavioral domain shifts, revealing longer turn-taking gaps, shorter utterances, and lower syntactic complexity in remote settings.

## Problem

Prior speech and dialogue research has relied heavily on isolated datasets—either purely in-person corpora like AMI and ICSI or recent remote collections like CANDOR and RoomReader—without cross-setting alignment. Unpaired cross-domain comparisons are confounded by task and protocol variations, making it impossible to disentangle medium-specific behavioral shifts from individual traits. Understanding these differences is critical because videoconferencing fundamentally restructures human communication rather than merely degrading audio-visual signals.

## Method

VIP-MINGLE utilizes a structured within-subjects design where groups of 2-4 participants complete an identical Family Feud-style game across counterordered in-person and videoconferencing sessions. Remote audio and video were collected via Zoom individual streams, while in-person sessions utilized lavalier microphones and a centered 360-degree camera. Audio tracks were preprocessed using the pyannote speaker diarization pipeline (downsampled to 16 kHz) to isolate individual speakers, and transcripts were generated using the Whisper large model with timestamp alignment.

Visual feature extraction applied OpenFace at 25-30 fps for 3D head pose, eye gaze, and facial Action Units (AUs), alongside DeepFace for time-series emotion probabilities. Textual syntax was analyzed using Mean Dependency Distance (MDD) via spaCy, and temporal conversational dynamics were computed using the Heldner-Edlund model for turn-taking gaps and utterance durations. Human perceptual annotations were gathered via crowdsourced 10-second clip evaluations rated on a 5-point Likert scale across 192 qualified annotators.

## Experimental setup

The dataset comprises approximately 59 hours of recordings, 32 groups (105 participants, aged 17-28), and 7,077 annotated clips. Analysis employed linear mixed-effects models and Wilcoxon signed-rank tests to measure setting-induced distributional shifts across temporal, syntactic, visual, and human-rated dimensions.

## Results

Videoconference sessions exhibited significantly longer turn-taking gaps (beta = 0.113, SE = 0.054, p = 0.037) and shorter utterance durations (beta = -0.094, SE = 0.018, p < 0.001) compared to in-person interactions. Syntactic complexity measured via Mean Dependency Distance (MDD) was significantly higher in-person (p = 0.017), whereas other lexical diversity and surprisal metrics showed no significant differences.

Human evaluations revealed that in-person conversations scored significantly higher in enjoyment (p = 0.001) despite exhibiting more frequent interruptions and gaps, whereas videoconferencing sessions were more uneventful and perceived as less engaging.

## Limitations

The corpus is restricted to English-language conversations and a single semi-structured game task (Family Feud-style trivia), limiting generalization to other conversational genres or unstructured dialogues. Participant demographics are predominantly young adults from a single university setting (ages 17-28).

## Why read this

Researchers building domain-aware multimodal dialogue models, conversational agents, or studying Zoom fatigue will find this paper essential for understanding how communication media fundamentally alter human behavioral dynamics.

## Code

- https://doi.org/10.5281/zenodo.20670131

## Applications

Development of cross-domain robust speech-language models, automated meeting summarization systems, and enhancement of future videoconferencing platforms.

## Related

- (link related pages by id as the wiki grows)
