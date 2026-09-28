---
id: lee26v_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2931
---

# Enhancing EMG-to-Speech via Silent-Voiced Representation Alignment

**TL;DR** — A Silent-Voiced Alignment loss that aligns multi-level representations between utterance-parallel silent and voiced EMG pairs significantly improves speech content reconstruction for silent-speech-interface systems that lack ground-truth audio for silent recordings.

## Problem

Silent Speech Interfaces reconstruct intelligible speech from facial EMG signals even without vocalization, but silent EMG naturally has no ground-truth speech, and available EMG-to-speech (ETS) training data is scarce.

## Method

The authors propose a Silent-Voiced Alignment (SVA) loss that introduces a multi-level representation-based alignment objective between utterance-parallel silent and voiced EMG pairs, designed to integrate seamlessly into existing ETS frameworks.

## Results

Extensive experiments show the method significantly enhances content reconstruction and demonstrate improved intelligibility and robustness under a standardized evaluation protocol.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Advances silent speech interfaces for communication in noise-restricted environments or for people unable to vocalize, such as certain laryngectomy or motor-impairment cases.

## Related

- (link related pages by id as the wiki grows)
