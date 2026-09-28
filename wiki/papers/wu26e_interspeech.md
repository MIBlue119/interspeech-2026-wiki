---
id: wu26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1770
pdf: https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.pdf
---

# CrossPhon-Tonal: Streamlining Cross-language Modeling for Forced Alignment in Low-resource Tonal Languages

[PDF](https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1770)

**TL;DR** — CrossPhon-Tonal extends cross-language forced alignment to tonal languages by introducing an automated articulatory-based tone encoding and mapping framework that achieves accuracy comparable to human expert-crafted dictionaries.

## Problem

Forced alignment is crucial for speech processing and linguistic research, but most of the world's tonal languages lack custom acoustic models and labeled datasets. Existing cross-language forced alignment methods either ignore lexical tone entirely, which degrades boundary placement accuracy, or rely on scarce phonetic experts to build manual pronunciation mappings, introducing a severe bottleneck of subjectivity and inconsistency.

## Method

The framework builds on the CrossPhon paradigm by decomposing IPA tokens into a segmental string and a Chao tone suffix mapped to a 1–5 relative pitch scale. First, base phone segments are matched in a shared 3D articulatory space using Manhattan distance. Second, an automated tone-mapping module selects target tones sharing the same category while minimizing the absolute difference in pitch contour change and height. Tone mapping is strictly constrained to attested variants within the target inventory to prevent invalid segment-tone combinations.

## Results

Tested across six typologically diverse languages including Mandarin, Cantonese, Thai, Vietnamese, Hausa, and Croatian using public speech datasets and Montreal Forced Aligner models, CrossPhon-Tonal achieves alignment performance comparable to human expert-generated mappings. Furthermore, the approach matches or outperforms massive non-tonal baseline models such as the state-of-the-art 3,600-hour Global English model. The system successfully preserves fine-grained allophonic and tonal contrasts without requiring manual phonetic intervention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and linguists building automated speech recognition pipelines, phonetic analysis tools, or speech datasets for low-resource and endangered tonal languages.

## Related

- (link related pages by id as the wiki grows)
