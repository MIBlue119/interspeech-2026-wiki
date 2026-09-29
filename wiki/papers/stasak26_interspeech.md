---
id: stasak26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1783
pdf: https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.pdf
---

# CalliOpeNLP: A Standalone Digital Health Voice Data Collection Research Tool

*Brian Stasak, Rebecca Li, Antonia Chacon, Rebecca Black, Cate Madill*

[PDF](https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stasak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1783)

**Category:** `resources-evaluation`

**TL;DR** — CalliOpeNLP is a free, open-source python software tool that automates the collection, labeling, and compliance monitoring of 18 clinically validated voice tasks to eliminate in-person interaction bias and reduce post-processing overhead.

## Key contributions

- Introduces an open-source, standalone Python tool providing synthesized voice and visual instructions for 18 standardized clinical voice tasks (e.g., CAPE-V phrases, maximum phonation, singing, Rainbow Passage).
- Integrates lightweight ASR (Whisper-tiny) and NLP string-matching metrics (Levenshtein distance and token-set-ratio fuzzy matching with a 0.70 compliance threshold) for real-time task compliance verification.
- Automates local session segmentation and structured naming conventions, bypassing manual audio slicing and reducing overall data collection and curation time from 28+ minutes down to 18 minutes.
- Ensures data privacy and security by performing all processing locally without requiring third-party cloud data transfer or external internet connectivity.

## Problem

Manual in-person voice data collections suffer from severe interaction bias, where clinicians inadvertently alter patient vocal behavior through the Hawthorne effect, therapeutic probing, or inconsistent task examples. Furthermore, traditional continuous session recordings capture up to three times more extraneous background noise and private chatter than actual target speech, resulting in expensive, tedious manual audio segmentation and delayed quality control. Existing automated collection alternatives are either locked inside proprietary, fee-based commercial packages or restricted to consortium-internal smart device apps like Bridge2AI-Voice, leaving researchers without a transparent, customizable open-source option.

## Method

CalliOpeNLP is implemented as a modular Python script operable in environments like PyCharm CE, Jupyter Notebook, or Spyder, relying on standard libraries alongside specialized packages including pyttsx3 for offline text-to-speech instructions, sounddevice for audio capture, and OpenAI's Whisper for transcription. The pipeline begins with a pre-stage demographic survey where users input name/ID, age, gender identity, height, and native English status via keyboard. Stage 1 guides the user through 18 distinct voice tasks utilizing synthesized male Indian-English speech instructions and visually highlighted green italic text prompts, recording audio at 44.1 kHz (16-bit mono) with preset task-specific timers ranging from 7 to 45 seconds to avoid manual stop friction or real-time VAD demands.

In Stage 2, recorded audio files are processed locally by Whisper ASR to generate textual transcripts. In Stage 3, read-format tasks are automatically evaluated for user compliance using Python's Levenshtein distance and FuzzyWuzzy token-set-ratio string matching against ground-truth texts, operating on a conservative default threshold of 0.70. Scores falling below this threshold trigger an on-screen warning and prompt a potential re-attempt option. Performative tasks (such as sustained vowels or singing) bypass automated NLP compliance checks due to ASR limitations with non-speech or sung phonation, though some include audio playback exemplars. In the post-stage, the tool auto-generates a structured local .TXT report containing demographics, timestamps, re-attempt counts, and compliance metrics while saving uniformly formatted WAV files using the naming convention <user_name_ID>_<month_day_year>_<specific_task>.

The system defaults to the Whisper 'tiny' model (4 layers, 39 million parameters) to achieve low-latency processing of under 3 seconds per task, but allows engineers to seamlessly swap it out for larger models like 'large' (32 layers, 1.55 billion parameters) or domain-specific clinical ASR models such as Auphoria depending on latency versus accuracy tradeoffs.

## Experimental setup

Preliminary testing evaluated the software workflow involving internal researcher test users over 18-minute session runtimes, comparing them against traditional 28-minute manual in-person protocols that require an additional 10+ minutes of post-session audio slicing. The system runs locally on standard desktop hardware using Python 3, PyCharm CE, sounddevice, pyttsx3, and Whisper ASR models ranging from tiny to large.

## Results

Preliminary operational tests demonstrated that CalliOpeNLP reduced total session collection time to 18 minutes compared to 28 minutes for manual counterparts, entirely eliminating the 10+ minute manual post-processing segmentation and labeling burden. Pre-set recording timers successfully captured all target speech without cutting off tester samples, and test runs yielded read-compliance scores consistently falling in the 0.80 to 1.00 range—comfortably above the 0.70 threshold. The paper does not report formal clinical disease classification accuracies or large-scale patient diagnostic evaluations, focusing instead on workflow efficiency and software validation.

## Limitations

The current version cannot automatically evaluate compliance for performative tasks (such as sustained vowels and singing) because standard ASR models struggle with non-lexical phonation and sung speech. The tool's compliance threshold (0.70) is presently based on preliminary heuristics and requires formal empirical tuning across diverse pathological and demographic cohorts. Furthermore, while Whisper supports multilingual inputs, the default prompt configuration and validation dictionaries are primarily tailored toward English protocols.

## Why read this

Speech researchers, digital health engineers, and clinical investigators building voice biobanks who need a free, privacy-preserving, and customizable open-source alternative to commercial or consortium-locked data collection software will find this paper essential. Readers will take away a complete architectural blueprint for automating task prompting, local ASR transcription, and string-matching compliance checks to standardize voice data collection.

## Code

- https://github.com/DrBrianStasak/CalliOpeNLP/

## Applications

Automated clinical voice data collection for biomedical research, digital health biobanks, telehealth screening, and paralinguistic or speech pathology datasets.

## Institutions / 機構

University of Sydney

## Related

- (link related pages by id as the wiki grows)
