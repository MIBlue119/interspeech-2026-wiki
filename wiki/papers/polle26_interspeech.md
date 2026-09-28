---
id: polle26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2993
pdf: https://www.isca-archive.org/interspeech_2026/polle26_interspeech.pdf
---

# Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning

[PDF](https://www.isca-archive.org/interspeech_2026/polle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2993)

**TL;DR** — Benchmarking eight voice cloning models across five paralinguistic tasks shows they retain most diagnostic signal, and cloning English clinical speech into Japanese outperforms raw cross-lingual transfer for depression and anxiety detection.

## Problem

Synthetic data augmentation is well-studied for linguistic tasks like ASR, but under-explored for paralinguistic and clinical speech applications where labeled data is scarce, expensive, and subject to privacy constraints. While voice cloning is typically evaluated on intelligibility and speaker similarity, it remains unclear whether these models faithfully preserve the subtle paralinguistic cues required for downstream mental health and emotion detection.

## Method

The authors evaluate eight open-source voice cloning models spanning autoregressive, flow-matching, hybrid, and masked generative architectures (including XTTS v2, Zonos, E2-TTS, F5-TTS, OpenAudio, CosyVoice 2/3, and MaskGCT). They process speech datasets using two text conditions: 'Repeat' (preserving original transcripts) and 'Standard' (fixing a uniform passage to isolate paralinguistic signals). For cross-lingual augmentation, English clinical speech is translated into Japanese via Qwen 3 235B and cloned using the original English recordings as speaker references. Downstream classification uses WavLM Large 1024-dimensional embeddings coupled with L2-regularized logistic regression, measuring performance via AUC and a custom preservation score.

## Results

Across 176 evaluated configurations on public datasets (IEMOCAP, MELD, MUSTARD, VCTK) and proprietary clinical corpora, all models perform significantly above chance, with top models retaining over 90% of the original signal under the repeat condition (median preservation score P = 0.87, median AUC drop 3.2 percentage points). In cross-lingual experiments translating English data into Japanese, training on cloned data significantly outperforms the raw English-to-Japanese cross-lingual baseline for depression and anxiety detection (e.g., OpenAudio improves depression AUC by +3.3 pp and CosyVoice3 improves anxiety by +4.0 pp at N=10,000 speakers). A scaling analysis demonstrates that cloned data advantages emerge starting from roughly 1,000 source speakers. Speaker embedding cosine similarity strongly correlates with downstream preservation on clean corpora (r = 0.77 to 0.87) but degrades on noisy data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers working on low-resource paralinguistic tasks, mental health speech biomarker detection, or privacy-preserving voice augmentation across languages.

## Limitations

The cross-lingual evaluation is restricted to a single language pair (English to Japanese) with a minimal baseline, clinical findings rely on a proprietary dataset, and results are limited to WavLM Large embeddings and open-source models.

## Related

- (link related pages by id as the wiki grows)
