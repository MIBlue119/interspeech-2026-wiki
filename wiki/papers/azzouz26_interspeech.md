---
id: azzouz26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-734
---

# Acoustic-to-Articulatory Inversion of Clean Speech Using an MRI-Trained Model

**TL;DR** — A vocal-tract-shape prediction model trained on denoised MRI speech also works well on ordinary clean speech recorded outside the scanner, reaching accuracy close to MRI-based results.

## Problem

Acoustic-to-articulatory inversion reconstructs vocal tract shapes from speech using real-time MRI, but rt-MRI audio is heavily corrupted by scanner noise and needs denoising, raising the question of whether such models can work on speech recorded without MRI at all.

## Method

The author aligns matched clean-speech and denoised-MRI-speech recordings from the same speaker and sentences via phonetic segmentation, then evaluates an MRI-trained inversion model on both signal types, alongside a model trained and tested purely on clean speech.

## Results

Clean speech supports articulatory inversion effectively, achieving an RMSE of 1.56 mm, close to the model's performance on denoised MRI speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Articulatory-inversion-based tools for speech therapy, pronunciation visualization, and CAPT that need to run on ordinary microphone recordings rather than MRI data.

## Related

- (link related pages by id as the wiki grows)
