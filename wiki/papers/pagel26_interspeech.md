---
id: pagel26_interspeech
category: phonetics-linguistics
institutions: ["University of Cologne"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2444
pdf: https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.pdf
---

# What Happens When We Speak Together? Multidimensional Convergence in Face-to-Face Interaction

*Lena Pagel, Doris Mücke, Simon Roessig*

[PDF](https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2444)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates multidimensional and multimodal convergence in face-to-face dyadic conversations, revealing that acoustic-prosodic cues exhibit the strongest interpersonal alignment compared to head motion and tongue articulation. Using 15 dyads and 2,230 controlled target tokens, the authors demonstrate that convergence strength is systematically governed by perceptual saliency, motor flexibility, and interactional exposure.

## Key contributions

- Evaluates inter-speaker convergence simultaneously across four distinct dimensions: duration, F0 excursion, supra-laryngeal tongue-body displacement, and head velocity.
- Utilizes an information-structurally controlled dataset (DiCE game) featuring 15 unacquainted dyads (30 participants, 2,230 target-word tokens) to separate prosodic prominence from convergence artefacts.
- Applies Bayesian hierarchical linear modeling combined with 56 pseudo-dyad controls per real dyad to confirm genuine interlocutor-specific adaptation rather than global mode effects.
- Proposes a theoretical framework linking convergence susceptibility to three parameter-inherent factors: perceptual saliency, physiological/motor flexibility, and distributional exposure.

## Problem

Prior research on phonetic convergence, accommodation, or interactive alignment has predominantly evaluated individual parameters in complete isolation, yielding a fragmented understanding of how conversational partners adapt. Furthermore, previous studies rarely control for information structure or prosodic prominence, running the risk of confounding inter-speaker convergence with intra-speaker prominence-driven variations. This study addresses these gaps by evaluating multiple acoustic, articulatory, and kinematic parameters simultaneously within an information-structurally controlled paradigm.

## Method

The experiment elicited question-answer pairs using the Dialogic Collecting Expedition (DiCE) card game under both solo and cooperative dialogue modes. The speech material used four trisyllabic German proper names (Medina, Manila, Benali, Milano) with penultimate lexical stress, controlled for corrective focus (CF) versus background (BG) conditions. Acoustic and kinematic post-processing extracted four quantitative parameters from 2,230 target-word tokens: word duration (ms), F0 excursion (st, multi-step parselmouth estimation), vertical tongue-body displacement (mm via Electromagnetic Articulography), and maximum tangential head speed (mm/s).

To measure convergence—defined as the reduction of between-speaker distance in dialogue relative to solo mode—the authors fitted 60 Bayesian hierarchical linear models using the brms package in R. The model structure formulated parameter values as a function of speaker and communicative mode with random intercepts and slopes by target word. Weakly informative priors with Gaussian and lognormal families were sampled via 4 MCMC chains (9,000 iterations, 3,000 warmup). Convergence strength was quantified via posterior distributions of between-speaker distance differences (beta_d-s) and evaluated using posterior probabilities P(beta_d-s < 0), with a compelling convergence threshold set at P >= 0.90 and validated against 56 pseudo-dyads per real dyad.

## Experimental setup

The dataset comprises 30 native German speakers forming 15 unacquainted dyads, producing 2,230 target-word tokens equally split between solo and dialogue modes. Electromagnetic articulography (EMA) tracked 16 sensors on articulators, head, and torso, supplemented by audio recordings via head-mounted microphones, Whisper, Montreal Forced Aligner, and Praat. Evaluation metrics relied on Bayesian posterior probabilities of distance reduction and convergence ratios across real versus 56 pooled pseudo-dyads.

## Results

Out of 15 dyads, compelling convergence (P >= 0.90) was observed in 9 dyads for duration, 8 dyads for F0 excursion, 4 dyads for head velocity, and only 2 dyads for vertical tongue-body displacement. Pseudo-dyad controls confirmed zero-centered distributions (P ~ 0.50), verifying that real-dyad convergence reflects true interlocutor-specific adaptation rather than general task effects. Tongue and head convergence rarely occurred in isolation, typically co-occurring alongside duration or F0 alignment, whereas duration and F0 frequently converged independently.

| Parameter | Compelling Converging Dyads (out of 15) | Typical beta_d-s Range | Dominant Modality |
|---|---|---|---|
| Duration | 9 | -12.83 to -68.01 ms | Acoustic-Prosodic |
| F0 Excursion | 8 | -0.17 to -0.67 st | Acoustic-Prosodic |
| Head Velocity | 4 | -0.21 to -0.39 mm/s | Co-speech Visual |
| Tongue Displacement | 2 | -1.24 to -2.73 mm | Supra-laryngeal Articulatory |

## Limitations

The study is restricted to 15 German dyads (30 participants) performing a tightly constrained card-game task using a limited set of four proper names, which limits immediate generalization to unconstrained spontaneous conversation or other languages. Supra-laryngeal articulation data was restricted to tongue-body displacement on two target words, excluding fine lip or jaw configurations due to sensor constraints. The evaluation focuses exclusively on corrective focus conditions, omitting other information-structural categories.

## Why read this

Speech scientists and phoneticians seeking a rigorous, multimodal blueprint for measuring human conversational alignment will find this paper essential. It provides a methodological standard using Bayesian modeling and pseudo-dyad controls to decouple accommodation from baseline prosodic variations.

## Code

- https://osf.io/3uebk

## Applications

Improving conversational agents, social robotics, and spoken dialogue systems that need to model human-like interactive entrainment and prosodic adaptation.

## Institutions / 機構

University of Cologne

**Funding / 經費:** German Research Foundation, SFB1252 Prominence in Language, a.r.t.e.s. Graduate School for the Humanities Cologne

## Related

- (link related pages by id as the wiki grows)
