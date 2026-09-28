---
id: sinha26_interspeech
category: low-resource
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2634
pdf: https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.pdf
---

# Collection and Curation of a Spontaneous Multilingual Speech Corpus for Low-Resource Himalayan Languages

[PDF](https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2634)

**TL;DR** — This paper presents a 146-hour spontaneous speech corpus across four under-resourced Eastern Himalayan languages and validates its utility via speaker-independent language identification achieving up to 92.95% accuracy.

## Problem

Speech technology development for Eastern Himalayan languages is severely constrained by a lack of structured, high-quality spontaneous speech corpora. Collecting data in these regions is challenging due to variable acoustic environments, diverse speaker demographics, and the impracticality of large-scale transcription. Consequently, systematic resources to support computational modeling and linguistic documentation for these communities are urgently needed.

## Method

The corpus contains 146 hours of spontaneous unscripted monologues from 320 verified native speakers (80 per language) across Bodo, Dzongkha, Gorkhali (Nepali), and Sherpa, collected via portable recorders and headphone-microphones in indoor environments. To validate the data, frame-level pitch (F0 via YIN), intensity, RMS loudness, and 40-dimensional MFCCs were extracted from 10-second speech chunks after WebRTC voice activity detection. Speaker-independent language identification experiments (using an 80/20 speaker-disjoint split) were performed using SVM and CNN classifiers with individual and incrementally fused acoustic features.

## Results

Baseline MFCC features yielded 78.47% accuracy with SVM and 85.95% with CNN. Incorporating loudness and prosodic features via feature fusion improved CNN performance, with the full combination of MFCC, loudness, intensity, and pitch achieving a headline accuracy of 92.95% (92.41% balanced accuracy). Individual acoustic analyses revealed systematic differences in mean F0, ranging from 173.7 Hz for Bodo down to 141.9 Hz for Sherpa.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and linguists working on low-resource speech technology, language identification, and computational documentation for Himalayan or underrepresented multilingual speech communities.

## Limitations

The dataset exhibits demographic gender imbalances across specific language subsets due to practical field recruitment constraints, and raw recordings contain natural background noise from indoor field settings.

## Related

- (link related pages by id as the wiki grows)
