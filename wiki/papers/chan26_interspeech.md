---
id: chan26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-751
---

# Privacy vs. Performance: Assessing Communication Utility of Anonymized Voice Features

**TL;DR** — A lightweight phase-vocoder-based voice anonymization technique largely preserves the acoustic and prosodic cues needed for communication assessment and ASR, showing privacy and clinical/analytic fidelity can coexist.

## Problem

Voice anonymization protects speaker privacy but risks distorting acoustic cues that downstream communication-assessment and speech-analysis pipelines depend on.

## Method

The authors integrate phase vocoder time-scale modification (PV-TSM), a lightweight anonymization technique chosen for operational efficiency, into an end-to-end speech analysis pipeline, and measure its effect on acoustic/prosodic features and on ASR accuracy, including with ASR fine-tuned on anonymized speech.

## Results

Anonymization largely preserves the studied acoustic features while effectively masking speaker identity, and fine-tuning the ASR model on anonymized speech mitigates recognition errors and restores downstream feature accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for privacy-sensitive settings such as clinical communication assessment or call analytics where voices must be anonymized without sacrificing downstream measurement accuracy.

## Related

- (link related pages by id as the wiki grows)
