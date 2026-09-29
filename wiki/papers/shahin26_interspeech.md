---
id: shahin26_interspeech
category: health-clinical
institutions: ["University of New South Wales", "University of Sydney"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.pdf
---

# SayCheck: Gamified Speech Practice and Attribute-Based Speech Analysis for Children

*Mostafa Shahin, Kirrie Ballard, Beena Ahmed*

[PDF](https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.html)

**Category:** `health-clinical`

**TL;DR** — SayCheck is an AI-powered speech therapy platform that combines a Mario-style gamified practice environment ("Say Bananas") with an attribute-based speech analysis system ("PhoneAid") for children. It moves beyond traditional phoneme-level mispronunciation detection to diagnose errors using fine-grained articulatory and phonological features.

## Key contributions

- Integrates a gamified side-scrolling speech practice game (Say Bananas) where coin and star collection triggers speech exercise pop-ups for home practice.
- Develops PhoneAid, an automated speech analysis engine leveraging wav2vec2 and a separable connectionist temporal classification (SCTC-SB) framework.
- Extends pronunciation assessment from binary phoneme correctness to multi-label phonological and articulatory attribute classification (e.g., voicing, nasality, place of articulation, vowel height).
- Provides summary diagnostic reporting for clinicians and caregivers, tracking phoneme accuracy, percentage consonants correct (PCC), percentage vowels correct (PVC), and attribute-level performance.

## Problem

Speech therapy for children requires consistent home practice, but maintaining motivation during repetitive exercises is notoriously difficult. Traditional digital speech therapy tools often rely solely on coarse phoneme-level correctness scoring, which identifies substitutions, insertions, or deletions without offering actionable clinical insight into how a child's articulation deviates from the target sound. Furthermore, standard speech recognition and assessment pipelines struggle with the acoustic variability and developmental pronunciation differences inherent in child speech. These limitations restrict the diagnostic utility of home-practice systems for speech-language pathologists.

## Method

The SayCheck platform operates through a closed-loop workflow where therapists or caregivers configure target words based on phonemes, word length, and phoneme position. During gameplay in Say Bananas, collecting stars triggers a recording prompt allowing children to listen to a reference audio, record their production, and review it before submission. Recorded utterances are then processed by PhoneAid, which extracts robust acoustic representations using a wav2vec2 backbone adapted to child speech.

PhoneAid maps the wav2vec2 features into multiple binary attribute sequences using a separable connectionist temporal classification (SCTC-SB) framework. Instead of predicting discrete phoneme symbols alone, the network performs multi-label sequence prediction for articulatory and phonological features across vowel, consonant, manner, temporal, and vowel structure categories (e.g., voiced, nasal, labial, coronal, high, front). These recognized attribute sequences and aligned phoneme sequences are compared against canonical reference pronunciations to calculate fine-grained error metrics and aggregate summary statistics.

## Experimental setup

The system utilizes an Australian child speech dataset to train the wav2vec2-based attribute detection model for robustness against developmental speech variations. Evaluation metrics include phoneme-level accuracy, percentage consonants correct (PCC), percentage vowels correct (PVC), and attribute-level classification accuracy. The demonstration highlights the integration of exercise configuration, gameplay elicitation, and diagnostic visualization dashboards.

## Results

The paper presents a system demonstration and architectural overview rather than a formal quantitative benchmarking study against external baselines. Qualitative results show that PhoneAid successfully captures fine-grained articulatory deviations (such as voicing or place of articulation errors) that are obscured in standard phoneme-level evaluation. The platform's interface successfully aggregates utterance-level outputs into session summaries tracking overall phoneme accuracy, consonant correctness, and attribute-specific performance.

## Limitations

The current system is demonstrated primarily on Australian child speech data, potentially limiting immediate cross-accent and cross-dialect generalization without localized retraining. The evaluation lacks extensive quantitative comparisons against state-of-the-art child ASR or mispronunciation detection baselines. Additionally, the platform's clinical efficacy relies on user adherence to home practice and proper configuration by trained speech-language pathologists or caregivers.

## Why read this

Speech and ML engineers building child-centric speech applications or computer-aided pronunciation training (CAPT) systems will benefit from seeing how multi-label phonological attribute modeling using wav2vec2 and SCTC-SB is integrated into a functional clinical workflow. It bridges the gap between raw acoustic model outputs and clinically interpretable diagnostic feedback.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech therapy platforms, computer-aided pronunciation training (CAPT) for children, and remote clinical speech monitoring tools.

## Institutions / 機構

University of New South Wales, University of Sydney

## Related

- (link related pages by id as the wiki grows)
