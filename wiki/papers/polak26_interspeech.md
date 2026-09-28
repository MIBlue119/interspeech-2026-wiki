---
id: polak26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-575
pdf: https://www.isca-archive.org/interspeech_2026/polak26_interspeech.pdf
---

# Better Late Than Never: Meta-Evaluation of Latency Metrics for Simultaneous Speech-to-Text Translation

[PDF](https://www.isca-archive.org/interspeech_2026/polak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-575)

**TL;DR** — This paper presents a comprehensive meta-evaluation of simultaneous speech translation latency metrics, uncovering structural biases, and introduces YAAL, LongYAAL, and SoftSegmenter for robust short- and long-form evaluation.

## Problem

Existing latency metrics for simultaneous speech translation yield highly inconsistent system rankings due to simplifying assumptions and structural biases related to audio segmentation and tail-word generation. These discrepancies hinder meaningful system comparisons and design improvements, a problem that is amplified when moving from pre-segmented short-form settings to realistic unsegmented long-form audio streams.

## Method

The authors analyze latency metric behaviors across diverse systems and language pairs from recent IWSLT shared tasks. They identify how tail words and cutoff points distort existing formulations like Average Lagging and DAL, leading to the design of YAAL (Yet Another Average Lagging) which restricts measurement strictly to words generated before the input ends. For unsegmented audio, they introduce SoftSegmenter, a resegmentation tool leveraging soft word-level alignment, and extend YAAL into LongYAAL. All proposed metrics and tools are integrated into the open-source OmniSTEval toolkit.

## Results

The meta-evaluation demonstrates that popular metrics suffer from severe segmentation-induced distortions and fail to detect degenerate system behaviors where translations are dumped after input termination. SoftSegmenter significantly outperforms existing community alignment tools in resegmentation quality for long-form audio streams. The proposed YAAL and LongYAAL metrics successfully eliminate tail-word bias to provide stable, comparable latency assessments across different segmentation schemes.

## Code

- https://github.com/pe-trik/OmniSTEval

## Applications

Speech engineers and researchers evaluating simultaneous speech-to-text translation systems in both short-form and long-form streaming scenarios.

## Limitations

The work focuses strictly on incremental simultaneous speech translation systems that do not revise outputs, leaving out flickering-prone revision-based architectures.

## Related

- (link related pages by id as the wiki grows)
