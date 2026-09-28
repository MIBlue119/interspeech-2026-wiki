---
id: glasser26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3001
pdf: https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.pdf
---

# Bridging the Speech AI Accessibility Gap for Deaf and Hard of Hearing People

[PDF](https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3001)

**TL;DR** — This position paper examines how current speech AI technologies fail to accommodate the unique communication needs and accented speech of Deaf and Hard of Hearing (DHH) individuals, proposing new design frameworks to bridge the accessibility gap.

## Problem

Mainstream automatic speech recognition (ASR) engines are predominantly trained on hearing speakers, leading to high word error rates and severe performance variability when processing atypical "deaf accents" caused by hearing loss. Furthermore, text-to-speech (TTS) and speech-to-speech (STS) systems fail DHH users because they lack non-auditory verifiability mechanisms, preventing users who cannot sufficiently hear the output from confirming that the generated voice accurately reflects their intent. Developing these tools without direct DHH community input risks cultural marginalization, forcing inappropriate voice usage, and compromising user privacy.

## Method

The authors present a critical analysis grounded in their lived experiences as Deaf signers, formulating core design principles for future speech AI development. These include Usability (reliable performance for DHH speakers), Verifiability (non-auditory methods to validate AI outputs), Graceful Degradation (preventing catastrophic hallucinations during recognition failures), and FATE (Fairness, Accountability, Transparency, Ethics). They evaluate three primary modalities—speech-to-text, text-to-speech, and speech-to-speech—highlighting how text acts as an impoverished intermediary that strips away crucial paralinguistic and prosodic cues.

## Results

The paper synthesizes prior findings, noting that ASR for deaf speakers with poor speech intelligibility yields an average 13% Word Error Rate even on restricted vocabulary tasks like single-digit recognition, compared to near-zero errors for hearing speech. It emphasizes that standard human clarity ratings fail to reliably predict ASR accuracy on DHH speech. Additionally, it highlights that cochlear implants often lack the spectral resolution required for nuanced emotion detection, compounding verification challenges for TTS and STS applications.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building accessible communication tools, developers of ASR/TTS/STS engines, and researchers designing inclusive interfaces for workplaces, media content creation, and real-time multi-party meetings involving DHH individuals.

## Limitations

As a position and conceptual paper, it does not introduce a novel algorithmic architecture or quantitative benchmark evaluation, focusing instead on qualitative frameworks and literature synthesis.

## Related

- (link related pages by id as the wiki grows)
