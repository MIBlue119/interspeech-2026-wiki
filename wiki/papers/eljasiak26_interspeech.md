---
id: eljasiak26_interspeech
category: health-clinical
labels: [multilingual, self-supervised]
institutions: ["Samsung R&D Institute", "AGH University of Kraków", "Harvard Medical School", "Kozminski University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2587
pdf: https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.pdf
---

# Foundational speech models evaluation on multilingual dementia prediction

*Bartłomiej Eljasiak, Wojciech Szecówka, Piotr Masztalski, Agnieszka Pruszek, Teresa Brzozka, Zofia Marciniak, Justyna Krzywdziak, Michał K. Grzeszczyk, Łukasz Łazarski, Mateusz Matuszewski, Daria Hemmerling*

[PDF](https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2587)

**Category:** `health-clinical` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A systematic evaluation of speech foundational models (Wav2Vec 2.0, HuBERT, WavLM, Whisper) for multilingual dementia prediction shows that multilingual training creates a synergistic "boost effect" across languages, achieving an F1 score of 0.854 on English datasets and 0.761 in a challenging multilingual setting.

## Key contributions

- Evaluated and benchmarked four prominent speech foundational encoder families (Wav2Vec 2.0, HuBERT, WavLM, Whisper) using a unified downstream pipeline across a harmonized multi-dataset dementia corpus.
- Demonstrated a cross-lingual synergistic boost effect, showing that incorporating additional languages during training improves monolingual inference performance (e.g., reaching 0.929 F1 on Polish when trained on English and Spanish).
- Evaluated zero-shot cross-lingual transfer capabilities on unseen target languages, proving models capture universal acoustic markers of cognitive decline.
- Identified and addressed critical data leakage issues and file overlaps across benchmark datasets (e.g., ADReSS vs. ADReSSM), establishing clean, disease-stratified subject splits.

## Problem

Early detection of dementia through speech biomarkers is critical, but prior works have largely relied on isolated monolingual datasets, leaving a gap in understanding how self-supervised speech representations transfer across languages and diverse clinical corpora. Existing studies suffer from unstandardized evaluation splits, data leakage across shared challenges (such as overlapping files in DementiaBank subsets), and limited cross-lingual generalization. Addressing this requires a rigorous, unified evaluation of speech foundational models across multiple languages to determine if universal pathological speech markers can be learned without language-specific overfitting.

## Method

The pipeline processes audio through a foundational speech encoder whose transformer layer outputs are aggregated using learned weighted means. Recordings are diarized (via gold transcripts or pyannote.audio) and segmented into 30-second random chunks (padded if shorter than 30s; fragments under 6s of participant speech discarded). Segment-level representations are passed to downstream classification heads, with lightweight ECAPA-TDNN (hidden sizes 16, 32, or 64) and feed-forward architectures with self-attention pooling evaluated. The best-performing downstream model outputs segment-level probabilities that are averaged during inference for participant-level classification based on a validation threshold.

Models are trained using the AdamW optimizer with a learning rate and weight decay of 0.0001, combined with an exponential learning rate scheduler reducing rates by 5% per epoch. Training batches are set to 32, evaluated across monolingual, multilingual transfer, and fine-tuned settings. Key design choices prioritize a simple SUPERB-inspired pipeline to ensure the findings transfer directly to broader monomodal and multimodal architectures without confounding complex task-specific engineering.

## Experimental setup

Evaluated on a harmonized multi-dataset corpus sourced from DementiaBank (ADReSS, ADReSSo, ADReSSM, TAUKADIAL, Dem@Care, Ivanova) plus the Polish clinical DiagNeuro dataset, covering English, Polish, Mandarin, Greek, and Spanish (totaling several tens of hours across hundreds of subjects). Compared models include Wav2Vec 2.0, HuBERT, WavLM, and Whisper variants across base and large sizes. Metrics include Accuracy, F1 score, and ROC AUC. Trained using NVIDIA hardware across 8x A100 GPUs (CUDA 12.9) and 4x RTX PRO 6000 GPUs (CUDA 13.1).

## Results

WavLM-Large achieved the highest English F1 score of 0.854, while WavLM-Base+ achieved the top overall multilingual F1 score of 0.761. In monolingual fine-tuning setups, the pipeline outperformed prior state-of-the-art on specific subsets, such as the ADReSSo dataset with a 0.916 F1 score. Multilingual pretraining demonstrated a strong synergistic boost: expanding the Polish training set from bilingual (EN, PL) to quadrilingual (EN, PL, SP, EL) raised the F1 score from 0.692 to 0.840, and a model trained solely on English and Spanish achieved a 0.929 F1 score on Polish test data.

| System / Condition | Language | F1 Score | ROC AUC |
|---|---|---|---|
| WavLM-Large (Pretrained) | English | 0.854 | - |
| Hubert-large-ls960 (Pretrained) | Polish | 0.971 | - |
| Whisper-base (Pretrained) | Mandarin | 0.775 | - |
| WavLM-Large (Pretrained) | Greek | 0.779 | - |
| WavLM-Base+ (Multilingual All) | All | 0.761 | - |
| EN + SP Training (Zero-shot) | Polish | 0.929 | 0.945 |

## Limitations

The study relies on heterogeneous tasks (primarily picture descriptions, story tasks, and some reading tasks) which can introduce task-specific acoustic biases despite filtering. Diarization errors from automated tools like pyannote.audio may degrade segment-level aggregation quality. Furthermore, the dataset coverage is constrained to a handful of high-resource or clinically documented languages, leaving true low-resource clinical deployment unverified.

## Why read this

Speech and ML researchers building clinical diagnostic tools will find this an essential guide on how foundational speech encoders handle cross-lingual transfer and data leakage in medical speech tasks. It provides clear empirical evidence that multilingual training enhances monolingual dementia detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated, non-invasive digital screening tools for early detection of dementia and cognitive impairment in clinical or telehealth settings.

## Institutions / 機構

Samsung R&D Institute, AGH University of Kraków, Harvard Medical School, Kozminski University

## Related

- (link related pages by id as the wiki grows)
