---
id: pagel26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2444
pdf: https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.pdf
---

# What Happens When We Speak Together? Multidimensional Convergence in Face-to-Face Interaction

[PDF](https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pagel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2444)

**TL;DR** — This study investigates multidimensional and multimodal phonetic convergence during face-to-face dialogue, demonstrating that interlocutors adapt their prosodic prominence cues across acoustic, articulatory, and visual domains with varying strengths.

## Problem

Prior research on inter-speaker convergence and alignment has typically examined isolated parameters—mostly acoustic-prosodic features—in a fragmented manner without controlling for information-structural factors like prosodic focus. This leaves open the risk of confounding interactive convergence with prominence-driven intra-speaker variation, and obscures how different communicative modalities relate to one another during conversation.

## Method

The authors analyze an information-structurally controlled dataset of 15 unacquainted German-speaking dyads engaged in a cooperative card game (DiCE) in both solo and dialogue communicative modes. Using electromagnetic articulography (EMA), audio recordings, and forced alignment, they extract 2,230 target-word tokens produced in corrective focus. Four parameters are measured: target word duration, fundamental frequency (F0) excursion, vertical tongue-body displacement, and maximum head velocity. Convergence is operationalized via Bayesian hierarchical linear models (implemented in brms) measuring reductions in between-speaker distance from solo to dialogue modes, evaluated against 56 pseudo-dyads per real pair to verify interlocutor-specific adaptation.

## Results

Across 15 dyads evaluated over 4 parameters, compelling evidence for convergence (posterior probability P >= 0.90) appears in 9 dyads for duration, 8 dyads for F0 excursion, 4 dyads for head velocity, and 2 dyads for tongue displacement. Acoustic-prosodic parameters exhibit the highest rates of convergence, followed by co-speech head motion, with supra-laryngeal articulation showing the least. Comparisons against pseudo-dyads confirm that the observed reduction in between-speaker distance stems from true interaction rather than mode-switching artefacts. Individual dyads display diverse multidimensional profiles, where tongue and head convergence rarely occur in isolation but typically co-occur with acoustic convergence.

## Code

- https://osf.io/3uebk

## Applications

Phoneticians, psycholinguists, and dialogue system engineers modeling natural human-human interaction, conversational adaptation, and multimodal virtual agents.

## Limitations

The investigation is restricted to controlled question-answer pairs and a specific set of German proper names, meaning findings should be extended to less constrained spontaneous dialogue.

## Related

- (link related pages by id as the wiki grows)
