---
id: deng26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1611
pdf: https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.pdf
---

# Confidence Score Guided Incremental and Speaker Adaptive Pseudo-Labeling for Semi-Supervised Elderly Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1611)

**TL;DR** — This paper proposes a confidence-guided incremental and speaker-adaptive pseudo-labeling method for semi-supervised elderly speech recognition, achieving absolute word and character error rate reductions of up to 2.27%.

## Problem

Elderly and pathological speech recognition suffers from severe labeled data scarcity, high error rates that make direct pseudo-labeling unreliable, and complex speaker heterogeneity caused by physical and cognitive decline. Traditional filtering discards difficult utterances entirely, while unguided incremental methods accumulate errors across iterations. Addressing these gaps is crucial for adapting speech foundation models to real-world healthcare and tele-consultation applications.

## Method

The framework builds upon the Whisper speech foundation model adapted with Low-Rank Adaptation (LoRA) and a confidence estimation module (CEM) implemented as a 3-layer residual feed-forward network. The CEM evaluates token-level confidences by comparing hypothesis and reference tokens via edit distance, producing utterance-level scores used to rank untranscribed data per speaker in descending order. Unlabeled data is partitioned into K curriculum subsets and incrementally introduced from high to low confidence during fine-tuning. Additionally, speaker-adaptive training (SAT) incorporates learnable speaker prompts concatenated with log-Mel spectrogram inputs to handle speaker heterogeneity and provide robust foundations for test-time adaptation.

## Results

Evaluated on the English DementiaBank Pitt and Cantonese JCCOCC MoCA elderly speech corpora using a 10% labeled training split, the proposed system is compared against supervised and standard semi-supervised baselines. The full model integrating confidence-guided incremental selection and SAT achieves statistically significant absolute reductions of 1.45% in WER on DementiaBank Pitt and 2.27% in CER on JCCOCC MoCA over the conventional semi-supervised baseline. Ablations demonstrate consistent performance gains from incorporating confidence-based ranking, curriculum incremental updates, and speaker prompts respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and health-tech developers building automatic speech recognition systems for elderly populations, cognitive decline screening, and remote geriatric healthcare tele-consultations.

## Limitations

The approach assumes a multi-speaker training setup where speaker identities are available to assign and optimize speaker-specific prompt embeddings.

## Related

- (link related pages by id as the wiki grows)
