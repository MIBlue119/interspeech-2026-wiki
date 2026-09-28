---
id: li26t_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1178
pdf: https://www.isca-archive.org/interspeech_2026/li26t_interspeech.pdf
---

# Hearing Smiles in the Crowd: How Babble Noise Shapes Smiled Speech Perception

[PDF](https://www.isca-archive.org/interspeech_2026/li26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1178)

**TL;DR** — Multi-talker babble noise severely degrades human perceptual sensitivity to smiled speech and systematically shifts listener decision bias toward conservative, non-smiling interpretations under acoustic uncertainty.

## Problem

Auditory smile perception has mostly been studied under clean laboratory conditions, leaving a major gap in understanding how background babble noise impacts human recognition of smiled speech in real-world environments. This question matters because missing or misinterpreting vocal smiles in noisy settings—such as contact centers or phone calls without visual cues—can impair social interactions and highlights the need to evaluate how speech technologies handle paralinguistic cues under uncertainty.

## Method

The authors conducted two binary forced-choice perceptual classification tasks using stimuli from the AMuS corpus: Task 1 (smile-like vs. neutral detection) and Task 2 (amused vs. spread-lip categorization). The study evaluated two speakers (one French male, one English female) across three noise conditions: Quiet (clean), -3 dB SNR, and -6 dB SNR using multi-talker cafeteria babble noise from NOISEX-92. The final participant pool comprised 38 English-fluent and 37 French-fluent adults recruited via Prolific. Data were analyzed using trial-level generalized linear mixed-effects models (GLMMs) with binomial logit links and complementary Signal Detection Theory (SDT) metrics including sensitivity ($d'$), Area Under the ROC Curve (AUC), and decision criterion ($c$).

## Results

In Task 1, classification accuracy dropped sharply for spread-lip and amused speech under noise (e.g., GLMM fixed-effect interactions for spread-lip at -3 dB: $\beta = -1.38$, and at -6 dB: $\beta = -2.05$; amused at -3 dB: $\beta = -1.47$, and at -6 dB: $\beta = -2.33$, all $p < 0.001$), while neutral speech remained stable. Perceptual sensitivity ($d'$) in Task 1 decreased monotonically from 1.87 in quiet to 1.00 at -3 dB and 0.58 at -6 dB, while the decision criterion ($c$) shifted conservatively from 0.09 to 0.69. In Task 2, an initial listener bias toward 'amused' responses in quiet reversed under strong noise, accompanied by a drop in $d'$ from 1.28 to 0.55 and a decrease in AUC from 0.93 to 0.77.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers designing speech technology, spoken dialogue systems, or voice-controlled interfaces for real-world noisy environments where affective and paralinguistic understanding is critical.

## Limitations

The study was restricted to only two speakers (one male French, one female English) limiting generalizability, and utilized read rather than spontaneous speech.

## Related

- (link related pages by id as the wiki grows)
