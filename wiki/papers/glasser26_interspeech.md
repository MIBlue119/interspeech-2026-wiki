---
id: glasser26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3001
pdf: https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.pdf
---

# Bridging the Speech AI Accessibility Gap for Deaf and Hard of Hearing People

*Abraham Glasser, Christian Vogler, Raja Kushalnagar*

[PDF](https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/glasser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3001)

**Category:** `applications-other`

**TL;DR** — This position paper highlights how current speech AI technologies (STT, TTS, and STS) fail Deaf and Hard of Hearing (DHH) users due to atypical "deaf accents" and lack of non-auditory verification mechanisms. It proposes two core design frameworks, UVG (Usability, Verifiability, Graceful Degradation) and FATE (Fairness, Accountability, Transparency, Ethics), to bridge the accessibility gap.

## Key contributions

- Identifies structural failure modes of commercial speech AI engines (STT, TTS, STS) when processing DHH speech and accents, such as catastrophic hallucinations and high word error rates.
- Formulates the UVG design framework (Usability, Verifiability, Graceful Degradation) tailored to the non-auditory verification needs of DHH users.
- Highlights FATE considerations specific to DHH populations, including identity preservation via personalized voice cloning versus involuntary deepfake risks.
- Outlines practical roadblocks in DHH speech data collection, including word omission during read-aloud tasks and the necessity of ethical consented corpora.

## Problem

Mainstream speech AI models are predominantly trained on hearing speech corpora, resulting in biased automatic speech recognition (ASR) engines that exhibit high and unpredictable word error rates—such as 13% WER even on simple 0-9 digit recognition tasks for speakers with poor intelligibility. Furthermore, text-to-speech (TTS) and speech-to-speech (STS) applications fail DHH users because they lack non-auditory verifiability, preventing users who cannot sufficiently hear the output from confirming whether it matches their intent. Without intentional intervention, these gaps marginalize DHH individuals in workplaces, education, and social spaces as AI rapidly automates communication workflows.

## Method

The paper outlines conceptual architectural requirements and operational frameworks rather than a single neural network architecture. For Speech-to-Text (STT), systems must implement robust graceful degradation to halt and report failures transparently rather than hallucinating text when encountering out-of-distribution DHH speech.

For Text-to-Speech (TTS) and Speech-to-Speech (STS), the authors advocate for personalized voice-cloning capabilities that allow DHH users to retain their unique vocal identities while cleaning up atypical speech characteristics. Because traditional auditory verification is impossible or impaired (e.g., via cochlear implants with limited spectral resolution), systems must incorporate novel non-auditory verification interfaces—such as leveraging reliable STT loopbacks on synthetic speech—to allow users to visually or tactilely confirm tone, prosody, and semantic correctness before output transmission.

## Experimental setup

This is a position and perspective paper drawing on the lived experiences of Deaf researchers and prior literature. It synthesizes findings from previous studies evaluating commercial ASR performance on atypical speech, digit recognition error benchmarks, and user studies regarding mixed meeting accessibility.

## Results

The paper references prior empirical benchmarks demonstrating that ASR for deaf speakers with poor intelligibility yields a 13% Word Error Rate even on restricted single-digit recognition tasks (0-9) where hearing speech incurs nearly zero errors. It highlights that naive human listener ratings of speech clarity fail to reliably predict ASR word error rates on DHH speech, demonstrating a persistent evaluation gap.

## Limitations

As a position paper, the work lacks empirical evaluation of newly proposed models, relying instead on qualitative frameworks and literature synthesis. The scope is bounded primarily by the linguistic and cultural realities of Deaf and Hard of Hearing populations using spoken English and American Sign Language, leaving cross-lingual and global sign language variations largely implicit. Data scarcity, privacy risks associated with personally identifiable voice data, and the potential for community coercion remain unmitigated operational hurdles.

## Why read this

Speech and ML engineers building commercial ASR, TTS, or voice-cloning systems should read this to understand why standard evaluation metrics and training recipes fail marginalized speakers with atypical accents. It provides an essential ethical and technical roadmap for incorporating accessibility-first design into next-generation audio foundation models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of inclusive, accessible speech-to-text transcription tools, personalized voice cloning for assistive text-to-speech, and real-time speech-to-speech revoicing systems for inclusive meetings.

## Institutions / 機構

Gallaudet University

**Funding / 經費:** National Institute on Disability, Independent Living, and Rehabilitation Research, National Science Foundation

## Related

- (link related pages by id as the wiki grows)
