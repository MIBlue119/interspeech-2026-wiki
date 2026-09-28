---
id: jain26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2498
pdf: https://www.isca-archive.org/interspeech_2026/jain26_interspeech.pdf
---

# The Lipreading Gap: Do VSR Models Perceive Visual Speech Like Human Lipreaders?

[PDF](https://www.isca-archive.org/interspeech_2026/jain26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jain26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2498)

**TL;DR** — Evaluating visual speech recognition (VSR) models against human lipreaders reveals that machines rely primarily on learned language priors and training frequency rather than genuine bottom-up visual perception.

## Problem

While modern VSR models achieve low word error rates on benchmarks, it remains unclear whether they actually process visual speech via articulatory cues or simply exploit linguistic regularities. This gap persists because transcription metrics overlook perceptual mechanisms, and prior comparisons lacked systematic evaluations against human baselines on word-level datasets. Determining human-machine alignment is crucial for understanding whether VSR systems genuinely understand visual speech or merely memorize sequential patterns.

## Method

The study analyzes three representative VSR paradigms: Auto-AVSR (supervised conformer, 1,759h-3,291h data, 250M parameters), AV-HuBERT (self-supervised masked prediction, 95M parameters), and VSP-LLM (AV-HuBERT frontend with a 7B Llama-2 backbone via LoRA). Videos are cropped via RetinaFace to 96x96 at 25 FPS, and text predictions are converted to phonemes using Phonemizer and mapped to 22 visemes via Microsoft Azure specifications. These models are evaluated alongside text-only n-gram language models against human baselines from the MaFI dataset using Levenshtein-based word, character, phoneme, and viseme metrics.

## Results

Evaluated on 2,189 word samples from the MaFI dataset, Auto-AVSR-Large achieves a word error rate (WER) of 0.65 and character error rate (CER) of 0.30, outperforming human lipreaders who average 0.83 WER and 0.65 CER. Auto-AVSR-Large and AV-HuBERT achieve phoneme scores (PS) of 0.87 and 0.80 and viseme scores (VS) of 0.82 and 0.71, respectively, surpassing human scores (PS 0.71, VS 0.53). Conversely, VSP-LLM lags behind humans with a 1.98 WER. Analysis shows VSR errors correlate more strongly with training word frequency than human visual difficulty, and models exhibit weaker correlation with visual clarity compared to humans.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing robust audio-visual speech recognition and VSR systems can use these insights to build models with better human-machine perceptual alignment and generalization.

## Limitations

The evaluation is constrained to isolated English words from the MaFI dataset and relies on a specific 22-class viseme mapping.

## Related

- (link related pages by id as the wiki grows)
