---
id: koshino26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.pdf
---

# Automatic generation of audio comic from manga images

[PDF](https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.html)

**TL;DR** — This paper presents a pilot automatic pipeline that converts manga images into expressive audio comics by combining multi-modal detection, vision-language emotion recognition, and prompt-based text-to-speech.

## Problem

Adapting manga into audio comics is manually intensive, limiting commercial production and accessibility for visually impaired readers. Creating an automated end-to-end system reduces production costs and broadens title availability, but requires robust integration of text/character detection, panel sequencing, and emotive voice synthesis.

## Method

The system architecture consists of a detection and understanding pipeline followed by prompt-based TTS. Two pipeline variants were tested: v1 (Magiv2 and Yomitoku) and v2 (Magiv3 and MangaOCR). A vision-language model (GPT-5.23) predicts one of eight categorical emotions for each text line using the image, text, surrounding context, and character face. The resulting character name and emotion style prompt, along with the text line, are fed into Parler-TTS fine-tuned on the 9-hour Japanese MangaVox dataset.

## Results

Evaluated on ~700 pages from 8 manga titles using Manga109 and MangaVox ground-truth, the v2 pipeline outperformed v1 across all detection, recognition, and alignment tasks, showing particular gains in text recognition and order estimation. In subjective evaluations of overall quality, ground-truth audio scored around 4.0 MOS, while both the automatic v2+TTS and manual+TTS systems achieved approximately 2.5 MOS. This demonstrates that the fully automatic pipeline delivers quality comparable to semi-automatic generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Publishers and accessibility service providers can use this system to automatically adapt manga into spoken audiobooks or immersive audio comics.

## Limitations

A noticeable quality gap still remains between synthetic TTS-based audio comics and human ground-truth performances.

## Related

- (link related pages by id as the wiki grows)
