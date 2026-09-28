---
id: zhang26da_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2157
pdf: https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.pdf
---

# Grammar-Guided Hierarchical Parsing for Long-form Audio Activity Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2157)

**TL;DR** — A grammar-guided hierarchical parsing framework uses a probabilistic context-free grammar prior over event-level sound detections to infer multi-level act-sub-event parse trees without requiring sub-activity or activity training labels.

## Problem

Long-form audio recordings span minutes to hours and exhibit complex hierarchical structures (events forming sub-activities and high-level activities) with strict temporal and compositional constraints. Prior work either models these levels independently via separate neural heads or requires heavy multi-level supervision, causing global inconsistencies, implausible step orderings, and error drift across boundaries. Addressing this requires structured inference that enforces global compositionality while remaining robust to imperfect, noisy event detections.

## Method

The authors propose a Hierarchical Activity Grammar (HAG) formulated as a probabilistic context-free grammar (PCFG) that models global temporal logic (root activity expanding into an ordered sequence of sub-activities) and local acoustic variability (sub-activities expanding into anchor event classes interleaved with noise non-terminals for robustness). The framework takes an onset-ordered sequence of detected event segments and class posteriors from an event detector (SlowFast encoder and ActionFormer segmenter trained only on event labels). It then performs Viterbi-style Earley maximum a posteriori (MAP) parsing in the log domain, combining acoustic evidence with the grammar prior controlled by a weight parameter lambda. This decodes an optimal Act-Sub-Event parse tree from which sub-activity segments and root activities are derived without any sub-activity/activity supervision.

## Results

Evaluated on the 8.97-hour MultiAct audio dataset across event detection, sub-activity segmentation, and activity classification. Event detection AP shows slight, consistent improvements post-decoding (e.g., Val AP at tIoU 0.1 increases from 16.98 to 17.00). For sub-activity segmentation on validation/evaluation splits, the grammar-induced approach achieves competitive temporal-order consistency and structural alignment compared to fully-supervised upper bounds. High-level activity classification using event-only grammar induction yields 66.7% Top-1 accuracy and 75.0% mAUC on the Eval split. Ablations show that a moderate grammar prior weight around lambda = 0.3-0.4 yields peak performance, and adding noise non-terminals improves all segmentation metrics by effectively absorbing spurious or missing events.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building long-form audio understanding systems for smart homes, surveillance, egocentric video/audio analysis, and procedural task monitoring.

## Limitations

Performance remains sensitive to the choice of the grammar prior weight lambda, and imperfect event-level evidence or boundary inaccuracies can still propagate through the parsing stage.

## Related

- (link related pages by id as the wiki grows)
