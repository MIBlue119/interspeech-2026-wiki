---
id: pal26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2497
pdf: https://www.isca-archive.org/interspeech_2026/pal26_interspeech.pdf
---

# Two-stage semi-supervised learning with pseudo-labels: A case study on Northern Sámi ASR

[PDF](https://www.isca-archive.org/interspeech_2026/pal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2497)

**TL;DR** — This paper investigates semi-supervised pseudo-labeling for low-resource Northern Sámi ASR, demonstrating that a larger teacher model can improve out-of-domain generalization of a smaller student model by up to 3.8% WER and 3.3% CER with no extra human-labeled data.

## Problem

Northern Sámi is an endangered, morphologically rich Finno-Ugric agglutinative language hampered by a scarcity of annotated speech data. While self-supervised learning helps, parameter-efficient smaller models severely underperform larger ones given identical supervised resources, and obtaining manual transcriptions remains expensive and slow.

## Method

The authors examine wav2vec 2.0 models pre-trained on 22.4k hours of Sámi audio: a 95M-parameter base student and a 317M-parameter large teacher. Unlabeled Parliament recordings (75 hours) are transcribed via single-iteration pseudo-labeling using either the unfiltered full set or a filtered subset derived from multi-teacher agreement (WER below 10%). They evaluate mixed-batch training against a sequential two-stage fine-tuning recipe where models are trained first on pseudo-labeled data and subsequently refined on human annotations.

## Results

Using 20 hours of supervised data as a baseline, the authors evaluate performance on a parliament validation set, 282 out-of-domain utterances, YLE podcasts, and the UIT-SME corpus. Training on all pseudo-labels (PL-Full) improves WER and CER across most test conditions, outperforming a randomly sampled 25-hour capped subset. A two-stage fine-tuning setup starting with all pseudo-labels and finishing with human labels yields the best overall performance, reducing YLE podcast WER from 34.45% (baseline) to 27.61% and tightening error variance across utterances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building ASR systems for extremely low-resource, morphologically complex, or endangered languages lacking abundant textual and auditory resources.

## Limitations

The study evaluates only a single iteration of pseudo-labeling without incorporating external language models, data augmentation, or confidence-based thresholds.

## Related

- (link related pages by id as the wiki grows)
