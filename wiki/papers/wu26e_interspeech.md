---
id: wu26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1770
pdf: https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.pdf
---

# CrossPhon-Tonal: Streamlining Cross-language Modeling for Forced Alignment in Low-resource Tonal Languages

*Hongchen Wu, Yixin Gu*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1770)

**TL;DR** — CrossPhon-Tonal extends cross-language forced alignment (CLFA) to under-resourced tonal languages by introducing an automated articulatory tone mapping module based on Chao tone scales, achieving alignment agreement rates comparable to or exceeding human expert mappings.

## Key contributions

- Extends the CrossPhon articulatory framework to explicitly handle lexical tone and Chao tone scale markers without requiring manual phonetic expert intervention.
- Proposes a two-stage mapping procedure combining segmental articulatory coordinate distances (Manhattan/Hamming) with tone category and pitch contour matching.
- Evaluates the framework comprehensively across six typologically diverse languages (Mandarin, Cantonese, Thai, Vietnamese, Hausa, Croatian).
- Demonstrates that phonological specificity (tonal matching) outperforms massive raw training data size (e.g., a 244-hour Thai model outperforming a 3,600-hour Global English model on tonal languages).

## Problem

Forced alignment is crucial for speech research and data automation, but high-performing tools are restricted to high-resource languages. Cross-language forced alignment (CLFA) allows using acoustic models from high-resource source languages for low-resource targets, but existing methods either ignore lexical tone entirely—degrading syllable duration and boundary placement accuracy—or rely on scarce phonetic experts to craft manual pronunciation mappings. This manual expert bottleneck introduces subjectivity, inconsistency, and scaling challenges for the world's hundreds of under-resourced tonal languages.

## Method

CrossPhon-Tonal models cross-language phonetic mapping as a multi-stage articulatory-feature matching problem. First, IPA tokens are decomposed into a segmental string (consonants/vowels with non-tone diacritics) and a tone suffix using Chao tone letters on a 1-5 pitch scale (1 = low, 5 = high). Segmental mapping converts phones into 3D coordinate vectors (manner, place, voicing for consonants; height, backness, rounding for vowels) and finds the closest target phone by minimizing Manhattan distance (with Hamming distance as a tie-breaker).

Second, the tone-mapping module operates conditionally on the output of segmental mapping. For tonal source tokens, it filters target phones to those with attested tonal variants, categorizing tone contours and selecting candidates that minimize the absolute difference in degree of change (first-to-last pitch level difference) and absolute pitch height. If concave/convex contours lack direct matches, the system prioritizes matching the stable first half of the pitch contour.

Finally, the resulting segment-plus-tone mappings are applied to generate an intermediate pronunciation dictionary in the target language's inventory, which is fed directly into the target language's acoustic model for forced alignment. Fallback rules handle toneless sources, mismatched inventories, and default tone assignments (favoring falling then level tones) ensuring robust dictionary generation.

## Experimental setup

Evaluated on six languages from diverse families: Mandarin (13h12m audio, 525h MFA 3.0 model), Cantonese (6h33m audio, 100h custom model), Thai (12h36m audio, 244h MFA 3.0 model), Vietnamese (1h16m audio, 40h MFA 3.0 model), Hausa (54m audio, 19h MFA 3.0 model), and Croatian (18h17m audio, 17h MFA 2.0a model). Baselines include language-specific acoustic models, human expert-crafted manual mappings, and the MFA Global English acoustic model trained on 3,600 hours. Alignment accuracy is measured using agreement rate against language-dependent baseline alignments with a 0.025s boundary tolerance.

## Results

CrossPhon-Tonal achieves agreement rates closely matching or outperforming human expert-created mappings across the board (e.g., achieving 0.772 agreement on Mandarin using a Thai model versus 0.726 for the expert mapping, and 0.737 vs 0.660 on Cantonese using a Vietnamese model). Tonal-to-tonal cross-language models consistently outperform the massive Global English 3,600-hour model when aligning tonal target languages; for example, the 244-hour Thai model yields 0.772 agreement on Mandarin compared to 0.638 for Global English. Conversely, the Global English model excels on non-tonal/pitch-accent Croatian (0.759 agreement), benefiting from shared Indo-European phonological structures.

| System / Condition | Mandarin Target | Vietnamese Target | Cantonese Target | Thai Target |
|---|---|---|---|---|
| Mandarin Model (Auto/Expert) | N/A | 0.639 / 0.653 | 0.703 / 0.711 | 0.653 / 0.669 |
| Thai Model (Auto/Expert) | 0.772 / 0.726 | 0.680 / 0.751 | 0.758 / 0.753 | N/A |
| Global English (3600h) | 0.638 | 0.698 | 0.619 | 0.809 |

## Limitations

Alignment accuracy was evaluated as an agreement rate against baseline language-specific models rather than independent human-annotated ground-truth boundaries, meaning it measures baseline replication rather than absolute physical precision. Performance varies significantly across language pairs (e.g., low-resource Croatian models struggle on Cantonese or Vietnamese), indicating that source-target phonological similarity and a minimum training data threshold are required. The approach relies on existing pronunciation dictionaries with Chao tone markers and does not yet feature comprehensive error profiling across specific tone contour classes.

## Why read this

Speech researchers and computational phoneticians working on low-resource tonal language documentation should read this to see how articulatory feature-based mapping can automate forced alignment without manual expert dictionaries. It provides a blueprint for bypassing the expert bottleneck while proving that phonological tone specificity outweighs raw acoustic model data scale.

## Code

- https://zenodo.20725470

## Applications

Automated forced alignment, speech corpus creation, and linguistic field data processing for under-resourced and tonal languages.

## Related

- (link related pages by id as the wiki grows)
