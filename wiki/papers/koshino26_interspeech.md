---
id: koshino26_interspeech
category: tts
labels: [generative-model]
institutions: ["Keio University", "National Institute of Advanced Industrial Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.pdf
---

# Automatic generation of audio comic from manga images

*Sota Koshino, Shotaro Ueji, Shinnosuke Takamichi, Tomohiko Nakamura*

[PDF](https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koshino26_interspeech.html)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — The paper introduces a pilot pipeline that automatically generates audio comics from manga pages by combining vision-language models for layout/emotion understanding with prompt-based text-to-speech, achieving subjective quality comparable to a manually annotated setup.

## Key contributions

- Proposes a fully automatic pipeline for audio comic generation spanning panel, text, and character detection, reading order estimation, and VLM-based emotion and prompt generation.
- Introduces two system variants (v1 using Magiv2 + Yomitoku; v2 using Magiv3 + MangaOCR) and demonstrates that v2 significantly reduces text recognition and ordering errors.
- Utilizes a fine-tuned Parler-TTS model trained on the MangaVox dataset (9 hours of acted speech) to generate expressive character voices conditioned on structured text and prompts.
- Conducts comprehensive objective evaluations across 700 pages from 8 manga titles and subjective crowdsourced MOS evaluations comparing automated pipelines, manual pipelines, and ground truth.

## Problem

Adapting manga into audio comics traditionally requires intensive manual labor to parse panels, recognize text, sequence reading order, identify speakers, and assign expressive voice styles. Prior parsing tools (like early Magi versions and basic OCR) suffer from high error rates in text ordering and character identification, causing pipeline failures downstream. Automating this workflow is vital for lowering production costs, expanding the volume of adapted manga titles, and improving accessibility for visually impaired readers.

## Method

The system architecture is structured into three main stages: Detection, Understanding, and Synthesis. In the detection phase, the system processes input manga pages using v2 modules—Magiv3 for panel, text, and character face detection, and MangaOCR for text recognition—alongside reference face image matching for character identification and text ordering. During the understanding phase, a vision-language model (GPT-5.2) analyzes each text line, surrounding context, character face crops, and panel images to categorize the emotional state into one of eight classes (calm, neutral, happy, surprised, angry, fearful, sad, disgust). It then formats a style prompt structured as '[Character Name]'s voice is [Emotion] with very clear audio.'

For the synthesis stage, the text line and generated style prompt are fed into a prompt-based text-to-speech model (Parler-TTS) fine-tuned specifically for Japanese speech. Parler-TTS maps the conditioning prompt and text tokens to an expressive acoustic realization matching the required character context and emotion. The model is trained on the MangaVox dataset containing roughly 9 hours of human-acted speech paired with rich annotations. At inference time, the full pipeline operates end-to-end from raw image input to synthesized multi-speaker audio tracks.

## Experimental setup

Evaluations used the Manga109 dataset and the MangaVox dataset (approx. 9 hours of human-acted speech for training/testing). The objective test set comprised ~700 pages across 8 manga titles of various genres. Subjective evaluations engaged 150 crowdworkers rating 40 test pages (5 unseen pages per title across 8 titles, covering major characters) on a 5-point Likert scale. Systems compared include v2+TTS (fully automatic), manual+TTS (human-corrected XML annotations combined with TTS), and GT (original human-acted voices from MangaVox). Implementation details involve fine-tuning Parler-TTS on Japanese speech and leveraging GPT-5.2 as the VLM.

## Results

In objective evaluations, the v2 pipeline consistently outperformed v1 across all metrics (panel detection, text detection, character detection, character identification, text order error rate, character error rate, and speaker identification), with particularly large gains in text recognition and reading order estimation. In subjective MOS evaluations, human-acted ground truth (GT) achieved a score of approximately 4.0 out of 5.0. Both the fully automated pipeline (v2+TTS) and the semi-automatic pipeline (manual+TTS) scored around 2.5, demonstrating that the automatic detection and understanding pipeline performs comparably to human-annotated setups while leaving a performance gap relative to professional human acting.

| System Condition | Overall MOS (Likert 1-5) |
|---|---|
| v2 + TTS (Proposed Automatic) | ~2.5 |
| manual + TTS (Semi-Automatic) | ~2.5 |
| GT (Human-Acted MangaVox) | ~4.0 |

## Limitations

The current system relies on a relatively small training corpus for TTS (MangaVox, roughly 9 hours), limiting expressive range compared to massive commercial data assets. The subjective gap between synthetic TTS conditions (MOS 2.5) and human ground truth (MOS 4.0) indicates that prompt-based TTS still struggles to fully capture the nuance of professional voice acting in comic books. Furthermore, evaluation was restricted to Japanese manga titles, and generalization to Western comic layouts or webtoons with different reading directions and panel structures remains untested.

## Why read this

Speech and ML engineers building multimodal generative pipelines or creative AI tools should read this paper to see how off-the-shelf VLMs, manga layout parsers, and prompt-based TTS can be chained into a working end-to-end entertainment application.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated production of audiobooks and audio comics for the publishing industry, and accessibility tools providing auditory presentation of manga for visually impaired readers.

## Institutions / 機構

Keio University, National Institute of Advanced Industrial Science and Technology

**Funding / 經費:** AIST policy-budget project "Research and Development of Generative AI Foundation Models for the Physical Domain", JSPS KAKENHI, JST FOREST Program

## Related

- (link related pages by id as the wiki grows)
