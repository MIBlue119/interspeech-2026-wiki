---
id: xu26n_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1233
pdf: https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.pdf
---

# Automatic Graphical Representations of Language for Dementia Detection

[PDF](https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1233)

**TL;DR** — This paper proposes an automated framework to extract Content Information Units (CIUs) from picture description speech recordings and model them as temporal graphs, demonstrating that temporal graph features effectively distinguish between cognitively normal and impaired speakers.

## Problem

Traditional Content Information Unit (CIU) extraction for cognitive impairment detection relies heavily on manual annotation, which does not scale, or uses rigid dictionary-based lookups that lack robustness to unseen words. Furthermore, prior computational methods focus primarily on spatial distributions of CIUs rather than the temporal dynamics and narrative organization underlying how speakers traverse the picture content over time.

## Method

The framework processes 16 kHz speech audio using WhisperX for ASR and word-level timestamps, followed by a fine-tuned BERT-base-uncased model for 23-class multi-label sentence-level CIU classification. Layer-wise Relevance Propagation (LRP) and sentence transformer cosine similarity are combined to localize the exact temporal onset of each CIU. Temporal graphs are constructed where nodes are CIUs and directed edges represent transition time intervals. Graph features including normalized walk length, unique nodes, degree centralization, mean edge weight, standard deviation of edge weights, and relative edge jitter are extracted, along with traditional markers like unfilled pause rate and speech rate.

## Results

Evaluated on the W-ADRC dataset containing 80 normal and 64 clinical samples (alongside Pitt Corpus and WRAP datasets with 2,783 transcripts for BERT training), the CIU identification model achieved an F1 score of 0.865 on ASR transcripts and 0.879 on manual transcripts. The clinical group exhibited significantly fewer unique nodes (Hedge's g = 0.80), longer normalized walk lengths, higher relative edge jitter (Hedge's g = -0.37), and slower speech rates compared to the normal group. The LRP localization method achieved an average accuracy of 0.910 across the 23 CIU categories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and digital health engineers building automated screening and assessment tools for early detection of Alzheimer's disease and mild cognitive impairment.

## Limitations

Lower localization accuracy was observed for abstract action categories such as 'action performed by the girl' because the phrase lacks a concrete action keyword.

## Related

- (link related pages by id as the wiki grows)
