---
id: mylvaganam26b_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of New South Wales", "University of Melbourne", "University of Sydney"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1837
pdf: https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.pdf
---

# Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR

*Pravina Mylvaganam, Eliathamby Ambikairajah, Ting Dang, Vidhyasaharan Sethu, Tünde Szalay*

[PDF](https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1837)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper investigates how multi-level language similarity—combining acoustic embeddings and linguistic features—can optimize source language selection for cross-lingual ASR transfer to Warlpiri, an extremely low-resource Australian Aboriginal language. By fine-tuning Whisper using Assamese as a source language, the authors achieve a headline reduction to 32.6% Word Error Rate (WER), outperforming standard multilingual baselines.

## Key contributions

- Proposed a combined framework using acoustic similarity from speech models (ECAPA-TDNN, wav2vec 2.0, XLSR-53) and linguistic distance (syntactic, phoneme inventory, grammatical, typological features) to rank and select source languages for low-resource ASR.
- Curated and pre-processed a 1.5-hour transcribed speech dataset for Warlpiri from DoReCo across 18 speakers (1 hour train, 15 min validation, 15 min test).
- Demonstrated through Spearman correlation analysis that phoneme inventory and typological similarity best predict zero-shot transfer performance, whereas acoustic similarity is the strongest predictor during fine-tuning.
- Showed that fine-tuning Whisper on acoustically close non-genealogical languages like Assamese and Hindi substantially outperforms monolingual training and generic multilingual baselines, reducing Warlpiri WER to 32.6% and 37.6% respectively.

## Problem

Endangered and low-resource languages like Warlpiri lack sufficient transcribed corpora to train robust automatic speech recognition systems from scratch, causing massive performance drops compared to high-resource languages. Cross-lingual transfer offers a solution, but prior work typically selects source languages based on arbitrary heuristics, data availability, or genealogical/geographical closeness—metrics that often fail to capture true acoustic and phonetic overlap. This issue is particularly acute for Warlpiri due to its typological distance from major languages, small vowel system, and extensive consonant inventory featuring uncommon dental, alveolar, retroflex, and palatal sounds. Without a systematic, multi-level similarity framework, it remains unclear which high-resource languages provide the most effective transfer.

## Method

The study employs a multi-level similarity framework to rank 107 candidate languages, pre-filtered using a VoxLingua107-trained ECAPA-TDNN LID model. Candidate source languages are evaluated across acoustic similarity (using cosine distances of utterance-level embeddings from ECAPA-TDNN, wav2vec 2.0, and XLSR-53 transformer layers) and linguistic feature similarity (using cosine and Hamming distances over WALS/SSWL/Ethnologue syntax vectors, PHOIBLE phoneme inventories, and Grambank grammatical features).

For downstream evaluation, the Whisper Small architecture (12 encoder/decoder layers, 768 model dimensions, 12 attention heads, 244M parameters) is used. The model is first adapted by fine-tuning individually on each selected high-resource source language dataset (sampled to 2,500 utterances or 10 hours per language from VoxLingua107) and subsequently full-model fine-tuned on the 1-hour Warlpiri training split. Training runs for 10 epochs with a batch size of 2, utilizing a 10% warm-up phase to a peak learning rate of 10^-5 with linear decay. Checkpoints are saved every 200 steps, selecting the best model based on validation set Word Error Rate.

Inference relies on the fine-tuned Whisper small variants evaluated on a held-out 15-minute Warlpiri test set. This design allows the authors to test whether aligning acoustic spaces (e.g., matching shared vowel spaces and overlapping consonants found in Assamese or Tamil) bridges the gap left by genealogical distance.

## Experimental setup

The evaluation uses a 1.5-hour Warlpiri corpus from the DoReCo dataset sampled at 16 kHz (1h train, 15m validation, 15m test). High-resource language evaluations draw from VoxLingua107 subsets (2,500 utterances/10 hours per language). Baselines include a monolingual Whisper model trained solely on Warlpiri data, a standard multilingual Whisper model, and a self-supervised XLSR-53 model. Performance is measured using Word Error Rate (WER %) and Character Error Rate (CER %). Models are implemented following Hugging Face guidelines.

## Results

The monolingual Whisper baseline yields a poor 86.9% WER (41.3% CER), while standard multilingual Whisper achieves 41.0% WER (15.1% CER). Fine-tuning on similarity-selected source languages dramatically shifts performance: Assamese (the most acoustically similar language) achieves the best result with a WER of 32.6% and a CER of 12.3%. Hindi and Telugu also perform strongly with WERs of 37.6% and 39.9% respectively. In contrast, acoustically distant languages like Japanese and Javanese perform much worse, yielding WERs of 49.7% and 48.0%.

Correlation analyses reveal that phoneme inventory similarity exhibits the strongest zero-shot correlation with WER (ρ = -0.54), while acoustic similarity dominates in fine-tuning settings (ρ = -0.67 with WER, ρ = -0.62 with CER). Syntactic and grammatical features show weaker or inconsistent correlations.

| System / Condition | WER (%) | CER (%) |
|---|---|---|
| Whisper Monolingual | 86.9 | 41.3 |
| Whisper Multilingual | 41.0 | 15.1 |
| XLSR-53 Baseline | 72.7 | 26.5 |
| Whisper + Assamese | 32.6 | 12.3 |
| Whisper + Hindi | 37.6 | 14.3 |
| Whisper + Japanese | 49.7 | 24.5 |

## Limitations

The study is restricted to a single target low-resource language (Warlpiri) with an extremely limited dataset of 1.5 hours, meaning findings may not fully generalize to other Aboriginal or polysynthetic languages without further testing. Missing linguistic feature metadata for languages like Assamese and Japanese required ignoring certain feature dimensions rather than imputing them. The evaluation is limited to the Whisper Small variant and XLSR-53, leaving larger model scales (e.g., Whisper Medium or Large) unexplored.

## Why read this

Speech and ML researchers working on low-resource and endangered language documentation should read this paper to learn how to systematically select cross-lingual transfer sources using a principled mix of acoustic embeddings and phoneme inventories rather than arbitrary geographic heuristics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual automatic speech recognition for endangered, Indigenous, and extremely low-resource languages.

## Institutions / 機構

University of New South Wales, University of Melbourne, University of Sydney

**Funding / 經費:** University of New South Wales

## Related

- (link related pages by id as the wiki grows)
