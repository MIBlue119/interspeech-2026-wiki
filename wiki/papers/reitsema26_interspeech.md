---
id: reitsema26_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3530
pdf: https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.pdf
---

# Returning the Turn: Do Backchannels Pattern More Like Turn-Holds or Turn-Changes Given Preceding Syntactic Completion and Boundary Tones?

[PDF](https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3530)

**TL;DR** — This study analyzes conversational cues preceding Dutch backchannels and finds that they pattern significantly closer to turn changes than to turn holds, though they form a distinct category of their own.

## Problem

Prior studies on Dutch intonation and turn-taking have grouped backchannels as a subclass of turn holds, obscuring the specific communicative cues that invite listener backchannels. Because backchannels represent a crucial mechanism for conversational coordination, understanding whether they align more closely with turn holding or turn yielding is vital for accurate computational models of dialogue management.

## Method

The authors analyze slightly over one hour of spontaneous task-oriented dialogue from the Dutch Map Task Corpus (comprising 12 dialogues and 8 native speakers). Conversational data is segmented into interpausal units (IPUs) and annotated for three transition types (Hold, Change, Backchannel), IPU-final boundary tones (high H%, low L%, level %), and incremental syntactic completion. They fit a multinomial mixed-effects regression model and evaluate distributional similarity using Jensen-Shannon Divergence (JSD) and non-parametric bootstrapping.

## Results

Descriptive statistics show that preceding IPUs are syntactically complete in 94.2% of turn changes, 82.1% of backchannels, and 51.6% of turn holds. Final boundary tones preceding backchannels are predominantly high (50.0%) or low (35.7%), with very few level tones (14.3%), diverging sharply from turn holds (50.8% level tones). Jensen-Shannon Divergence reveals a significantly larger distributional distance between holds and backchannels (JSD: 0.187) than between changes and backchannels (JSD: 0.070, p < 0.001).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and dialogue system engineers designing turn-taking models, spoken dialogue agents, and conversational AI can use these findings to better predict when users will produce backchannels or yield the conversational floor.

## Limitations

The analysis is restricted to task-oriented Dutch dialogues, which may exhibit unique feedback-seeking behaviors compared to casual everyday conversation.

## Related

- (link related pages by id as the wiki grows)
