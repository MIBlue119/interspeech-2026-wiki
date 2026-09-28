---
id: ozkan26_interspeech
category: silent-speech-interface
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1288
pdf: https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.pdf
---

# Automatic pitch prediction from speech articulation: Where does the f0 information come from?

[PDF](https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1288)

**TL;DR** — This paper investigates why silent speech interfaces can successfully predict fundamental frequency (fo) from articulatory data despite source-filter independence, finding that accuracy is primarily driven by local articulatory-fo correlations during prominent words.

## Problem

Source-filter theory posits that the glottal source (including fo) and vocal tract filter are independent, making it paradoxical that silent speech interfaces can predict fo from articulatory data like ultrasound tongue images. Prior work has yielded varying success rates, but it remains unclear what underlying information drives these predictions, whether models generalize to spontaneous speech, or how prosody affects performance. Resolving this paradox is crucial for building silent speech interfaces that can naturally convey pragmatic and paralinguistic functions.

## Method

The authors designed a multimodal encoder-decoder architecture evaluated across 24 conditions (6 input modalities and 4 temporal contexts). Encoders included 2D CNNs for ultrasound tongue images (UTI) and lip images (L+T), and 4-layer fully connected networks for acoustic MFCC proxies. Decoders used a 1D CNN over temporal contexts of 1, 3, 7, and 17 frames (16.7 ms to 283.3 ms). Models were trained on 9 speakers from the TaL corpus (TaL1 and TaL80 subsets, averaging ~4.35 minutes of speech per speaker) using an Adam optimizer, MSE loss, batch size of 1, and learning rate of 10^-3 for 30 epochs on a Quadro RTX 8000 GPU.

## Results

On the TaL1 dataset, the tongue-only (T) model achieved correlations of 0.63 to 0.68 and an RMSE of 0.21 octaves (18.6 Hz), while combining lip and tongue images (L+T) yielded no significant improvement over tongue alone. Acoustic baselines using MFCCs (M0:12) reached correlations up to 0.91 with 17 frames of context. Temporal context adjustments (1 to 17 frames) showed no significant effect on articulatory prediction accuracy. In a listening test with 38 native speakers evaluating 180 synthesized stimuli, utterances with higher prominence proportions (P2++) achieved an 87.5% intonation acceptability rate, demonstrating that perceptual quality relies heavily on capturing local prominent prosodic functions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing silent speech interfaces, speech synthesizers, or assistive communication devices for vocally impaired users.

## Limitations

Models trained exclusively on read, isolated utterances failed to generalize effectively to spontaneous conversational speech.

## Related

- (link related pages by id as the wiki grows)
