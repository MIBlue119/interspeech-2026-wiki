---
id: wiesner26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2462
pdf: https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.pdf
---

# Modeling Overlapped Speech with Shuffles

[PDF](https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wiesner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2462)

**TL;DR** — The paper introduces a framework for modeling overlapped speech and speaker-attributed alignment using shuffle product finite-state automata, achieving single-pass multi-talker alignment and transcription.

## Problem

Processing multi-talker, overlapped speech is challenging because exact temporal interleaving between speakers is unknown, and existing methods either scale poorly combinatorially like permutation invariant training or rely on rigid serialization assumptions like utterance-level serialized output training. Without robust single-pass alignment algorithms, handling in-the-wild multi-talker audio from sources like web videos remains computationally expensive and brittle. This work bridges concurrency modeling with automatic speech recognition to formulate a principled, unified approach.

## Method

The paper models concurrent utterances by combining Connectionist Temporal Classification (CTC) with shuffle product finite-state automata (FSAs) and partial order constraints to marginalize over all valid token interleavings at subword, word, and phrase levels. To prevent combinatorial explosion of graph sizes, the authors apply approximate token start times derived from utterance boundaries using a temporal uncertainty threshold or collar to prune unlikely paths. Speaker attribution is resolved by extending the CTC output space to jointly or factorized model (token, speaker) tuples. Viterbi decoding through the resulting shuffle product FSA enables single-pass alignment, with all algorithms implemented using k2 and Icefall toolkits.

## Results

The evaluation is conducted on synthetic LibriSpeech overlap datasets, demonstrating that the framework successfully handles multi-talker transcription and alignment. The approach unifies prior baselines such as utterance-level SOT, token-level SOT, and speaker-distinguishable SD-CTC as special cases or relaxations of the shuffle product framework. Viterbi alignment successfully provides single-pass multi-talker alignment for the first time without needing separate diarization or separation pipelines.

## Code

- https://github.com/geolocation-from-speech/jsalt2025.git

## Applications

Speech engineers and researchers building automatic speech recognition systems for multi-talker environments, meeting transcription, and in-the-wild web video analysis.

## Limitations

Pruning relies on approximate token start times and a temporal uncertainty collar parameter to maintain computational tractability as the number of overlapping speakers or sequence lengths increases.

## Related

- (link related pages by id as the wiki grows)
