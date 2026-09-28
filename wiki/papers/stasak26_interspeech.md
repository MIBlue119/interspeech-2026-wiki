---
id: stasak26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1783
pdf: https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.pdf
---

# CalliOpeNLP: A Standalone Digital Health Voice Data Collection Research Tool

[PDF](https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1783)

**TL;DR** — CalliOpeNLP is an open-source, Python-based automated voice data collection tool that guides patients through 18 clinical voice tasks, reducing session time to 18 minutes compared to 28+ minutes for manual collection.

## Problem

Manual health voice data collection suffers from interaction bias, high labor costs, data integrity issues, security concerns, and the inclusion of up to three times more extraneous audio than targeted task data. Furthermore, public speaking phobias and discomfort in front of clinical administrators can hinder patient participation and self-reporting naturalness. Automated solutions are needed to standardize data collection protocols, ensure compliance at the point of capture, and eliminate insecure data transfers.

## Method

CalliOpeNLP is implemented in Python using PyCharm/Jupyter and leverages libraries such as NumPy, SciPy, sounddevice for 44.1 kHz 16-bit mono recording, and pyttsx3 for offline text-to-speech instructions using a synthesized Indian-English male accent. It features a five-stage workflow encompassing demographic input, synthesized spoken and visual instructions for 18 clinical voice tasks (read and performative), lightweight ASR-based transcription, text analytics compliance checking using ground-truth comparison for read tasks, and automatic generation of local WAV files and a summary text report. The tool uses pre-set recording length timers ranging from 7 to 45 seconds per task to avoid real-time VAD processing demands.

## Results

Preliminary testing demonstrates that the automated collection process takes an average of 18 minutes compared to 28 minutes for manual in-person sessions, while completely bypassing manual post-session segmentation, labelling, and transcription steps that typically add 10 or more minutes. Preliminary test runs using a pre-set compliance threshold of 0.70 showed that researcher testers achieved compliance scores ranging from 0.80 to 1.00 without triggering warnings. The tool successfully saved structured, uniformly labeled WAV recordings and local text reports without cutting off mid-recording.

## Code

- https://github.com/DrBrianStasak/CalliOpeNLP/

## Applications

Health clinicians, speech researchers, and engineers building clinical voice biobanks and automated speech-based illness screening technologies.

## Limitations

The current version does not automatically evaluate performative voice tasks (such as singing or sustained vowels) for compliance due to ASR limitations with non-speech vocalizations.

## Related

- (link related pages by id as the wiki grows)
