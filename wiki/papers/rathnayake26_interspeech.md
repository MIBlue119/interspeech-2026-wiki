---
id: rathnayake26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1543
pdf: https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.pdf
---

# Pā‑Kakare: The First Emotional Speech Database for Te Reo Māori

[PDF](https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1543)

**TL;DR** — The paper introduces Pā-Kakare, the first emotional speech database for te reo Māori, comprising 3,840 acted utterances spanning 16 community-defined emotion categories with an overall listener recognition accuracy of 36.15%.

## Problem

Speech Emotion Recognition research predominantly focuses on well-resourced languages and universally assumed emotion categories derived from Western models, ignoring cultural nuances. Indigenous languages like te reo Māori lack annotated emotional speech corpora, and applying standard universal emotion frameworks risks cultural misalignment and a failure to capture authentic emotional expressions. This work bridges this resource gap via a culturally grounded, community-oriented approach that respects Indigenous data sovereignty.

## Method

The corpus was constructed using 16 culturally relevant emotion categories established through prior community research (such as ngenge, aroha, and huakore). Four professional Māori voice actors (two male, two female) recorded 15 sentences per emotion, divided into 5 emotion-specific and 10 neutral-context sentences, across two separate recording sessions. Audio was captured using a Shure SM7B microphone at 44.1 kHz, 16-bit PCM mono WAV format, resulting in 3,840 total utterances (3 hours and 45 minutes). The dataset is governed under a Kaitiakitanga guardianship license to enforce data sovereignty and responsible community access.

## Results

Corpus validation via an online perception test with 18 participants yielded an overall classification accuracy of 36.15% across an eight-class subset split, significantly above the 12.5% chance baseline. Female speakers achieved higher recognition rates (51% and 40%) compared to male speakers (30% and 26%). Acoustic analysis revealed systematic variations in fundamental frequency, intensity, and speech rate across categories, while confusion matrices highlighted typical perceptual confusions among emotions mapped to similar arousal levels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building naturalistic human-computer interaction, text-to-speech, and speech emotion recognition systems for te reo Māori and Indigenous languages.

## Limitations

The dataset is based on acted speech rather than naturalistic or induced recordings, and listener recognition is modest due to the fine-grained nature of the 16 cultural emotion categories.

## Related

- (link related pages by id as the wiki grows)
