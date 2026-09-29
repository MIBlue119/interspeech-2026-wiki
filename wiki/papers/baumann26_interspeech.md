---
id: baumann26_interspeech
category: asr
institutions: ["Technische Hochschule Nurnberg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3378
pdf: https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.pdf
---

# PhonLLM: Joint Phone Recognition and Phonological Process Inference for Child Speech

*Ilja Baumann, Korbinian Riedhammer, Tobias Bocklet*

[PDF](https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baumann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3378)

**Category:** `asr`

**TL;DR** — PhonLLM introduces phonological process inference, a task and model that jointly predicts canonical phone sequences and phonological process tags from child speech by fusing audio and expected pronunciations. It achieves an average process tagging F1 of 75.9 and reduces phone error rate to 23.5 compared to 58.0 for standard ASR baselines.

## Key contributions

- Formulates phonological process inference as a structured prediction task modeling transformations between expected and realized pronunciations.
- Proposes PhonLLM, a speech-LLM architecture fusing downsampled audio tokens and expected phone embeddings to jointly predict canonical phones and error tags.
- Develops a rule-based data augmentation pipeline injecting large-scale multilingual phonological process supervision without manual annotation.
- Evaluates comprehensively across multilingual child and clinical corpora (German, English, Icelandic), demonstrating superior performance over cascaded ASR-plus-LLM pipelines.

## Problem

Clinical speech assessment for children is time-intensive and requires manual transcription and phonological pattern labeling, which is difficult to scale. Standard ASR systems produce transcripts but fail to provide phone-level diagnostic feedback, while conventional Mispronunciation Detection and Diagnosis (MDD) systems classify errors independently or focus heavily on L2 adult learner sentence-level scoring rather than explicit phonological process tagging. This gap prevents automated systems from delivering interpretable, fine-grained phonetic diagnostics suitable for computer-assisted pronunciation training (CAPT) and speech-language pathology screening.

## Method

PhonLLM employs a two-stage training pipeline. Stage one pretrains on adult multilingual speech for cross-lingual phone recognition using Mozilla CommonVoice and Multilingual LibriSpeech (~9.8k hours total) to learn robust phone-level alignments. Stage two fine-tunes on child speech corpora using Low-Rank Adaptation (LoRA with r=16, alpha=32) while keeping the audio encoder and LLM frozen. The architecture uses an audio encoder (OmniASR wav2vec 2.0, 300M parameters) that extracts latent features, downsamples them by concatenating every r=5 consecutive frames, and projects them into the LLM embedding space. Text pathways map expected phone sequences derived via eSpeak G2P into phone embeddings. The audio and text token streams are concatenated and projected into a shared space, fed into a LLaMA (1B parameters) autoregressive decoder, and optimized via next-token cross-entropy loss.

To train without manual clinical tags, a rule-based augmentation pipeline introduces phonological process variations (velar fronting, coronal backing, deletion) into expected phone sequences based on empirical sampling probabilities (p_fronting = 0.30, p_backing = 0.60, p_deletion = 0.12, p_recognition_only = 0.30). At inference time, the model conditions on the target orthography-derived phone sequence and raw audio frames, emitting canonical phones interleaved with explicit process tags (e.g., <|fronting|>) to localize and explain pronunciation deviations.

## Experimental setup

Experiments use adult read speech (~9.8k hours) for pretraining, and child speech corpora for supervised training including Phattsessionz (German, 1,019 speakers), CSLU Kids (English, 118 speakers), Samromur Children (Icelandic, 3,175 speakers), and Speechocean762 (English, 190 speakers). Evaluation is conducted exclusively on clinical child speech corpora annotated by speech therapists: Neumann/Fox-Boyer, Fox-Boyer, and BESS (German); Torrington-Eaton and Cummings (English); and Masdottir (Icelandic). Baselines include a frozen LLaMA in-context learning model (B1), a fine-tuned LLM with oracle text transcripts (B2 upper bound), and an XLSR-53 phone recognizer combined with a fine-tuned LLM (B3 cascading pipeline). Metrics include precision, recall, and F1 for tagging, alongside Phone Error Rate (PER) and Articulatory Weighted PER (AW-PER) using PanPhon distances for phone recognition.

## Results

PhonLLM achieves an average tagging F1 score of 75.9 (precision 83.6, recall 70.8) across datasets, substantially outperforming chance-level F1 (19.2). Compared to the cascaded XLSR-53 baseline (PER 58.0, AW-PER 26.2), PhonLLM dramatically reduces phone errors to a PER of 23.5 and an AW-PER of 12.6, showing that joint process modeling aids acoustic-phonetic alignment. The oracle fine-tuned text baseline (B2) achieves an F1 of 89.0, but operates on ground-truth transcripts unavailable in practice, whereas PhonLLM bridges this gap directly from raw audio. Ablation studies confirm that removing expected sequence conditioning completely eliminates process tag prediction, proving that linguistic context is required to trigger structured inference.

| System / Condition | Tagging Prec. | Tagging Rec. | Tagging F1 | PER | AW-PER |
|---|---|---|---|---|---|
| B1: LLM in-context (baseline) | 43.8 | 65.1 | 50.2 | - | - |
| B2: LLM fine-tuned (oracle text) | 94.3 | 85.1 | 89.0 | - | - |
| B3: XLSR-53 + fine-tuned LLM | 73.0 | 42.8 | 48.5 | - | - |
| XLSR-53 ASR baseline | - | - | - | 58.0 | 26.2 |
| PhonLLM (Proposed, Avg) | 83.6 | 70.8 | 75.9 | 23.5 | 12.6 |

## Limitations

The current process inventory is restricted to fronting, backing, and deletion, omitting other frequent developmental child phonological processes like deaffrication, cluster reduction, and stopping. Performance varies across languages and datasets due to class imbalances and smaller sample sizes in German corpora compared to English and Icelandic. Age-cohort analysis reveals remaining disparities in phone error adaptation across younger developmental stages (e.g., age 2 vs. 7), suggesting that age-balanced training data or cost-sensitive objectives are still required.

## Why read this

Read this paper if you are building speech-to-text models or clinical speech assessment tools for children and want to see how to bypass error-prone ASR cascading by jointly predicting structured phonetic deviations and linguistic targets using small speech-LLMs with LoRA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech-language pathology screening tools, speech therapy support applications, and Computer-Assisted Pronunciation Training (CAPT) systems for children.

## Institutions / 機構

Technische Hochschule Nurnberg

**Funding / 經費:** Bavarian Ministry of Health, Care and Prevention, European Union

## Related

- (link related pages by id as the wiki grows)
