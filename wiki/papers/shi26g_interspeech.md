---
id: shi26g_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3135
pdf: https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.pdf
---

# Speech Codec Probing from Semantic and Phonetic Perspectives

[PDF](https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3135)

**TL;DR** — This paper systematically probes four representative neural speech codecs from semantic and phonetic perspectives, demonstrating that current tokenizers primarily capture phonetic and articulatory structure rather than lexical-semantic meaning.

## Problem

Modern multimodal LLMs increasingly rely on speech tokenizers to bridge audio waveforms and text representations, often assuming that discrete speech tokens encode high-level lexical semantics. However, emerging evidence suggests that speech models exhibit phonetic rather than true semantic clustering (e.g., grouping near-homophones closer than synonyms). This modality mismatch between phonetic speech tokens and semantic text tokens can degrade downstream MLLM performance, making it critical to systematically probe what information is actually preserved across codec codebook layers.

## Method

The study evaluates four representative speech codecs with diverse architectures: EnCodec, DAC, MIMI, and MIMO. It employs three complementary probing tasks: (1) synonym vs. near-homophone distance analysis using WordNet and MFA/CMU dictionary alignments on LibriSpeech; (2) articulatory phonetic probing via Vocal Tract Distance (VTD) extracted from real-time MRI (rt-MRI) mid-sagittal sequences across the 75-Speaker dataset and Annot-16 subset using Projection Weighted Canonical Correlation Analysis (PWCCA); and (3) cross-modal semantic alignment measurement using Centered Kernel Alignment (CKA) between speech and text token spaces in MLLMs.

## Results

Across all models, speech codecs preserve substantially more phonetic information than lexical-semantic information, with synonym distance curves frequently overlapping or exceeding random baselines. Articulatory analysis confirms that EnCodec and DAC exhibit a fading of phonetic information across deeper layers, whereas MIMI and MIMO progressively accumulate phonetic and speaker-related information. Probing MIMI reveals that its WavLM-distilled first codebook layer primarily injects phonetic bias rather than true semantic understanding. CKA evaluation shows weak structural alignment between speech and text modalities, with MIMI scoring 0.329 and MIMO scoring 0.122 (showing minimal gains over random permutation baselines of delta 0.087 and 0.054 respectively).

## Code

- https://github.com/Alexuan/codec_probing_release

## Applications

Speech and ML engineers building multimodal conversational AI systems, speech LLMs, and unified speech-text architectures will benefit from these insights to design better speech tokenizers.

## Limitations

The evaluation is primarily restricted to English datasets due to the availability of well-characterized lexical and articulatory resources.

## Related

- (link related pages by id as the wiki grows)
