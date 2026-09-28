---
id: krzywdziak26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1424
pdf: https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.pdf
---

# Task-Conditioned Audio-Text-Image Fusion for Cognitive Score Estimation from Speech-Based Assessments

[PDF](https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1424)

**TL;DR** — This paper proposes a task-conditioned multimodal framework fusing audio, text, and optional visual modalities with a label-conditioned alignment loss to estimate cognitive assessment scores (MoCA and MMSE) from speech-based tasks, achieving a picture description RMSE of 2.11 for MoCA and 1.85 for MMSE.

## Problem

Standard diagnostic pathways for mild cognitive impairment (MCI) and Alzheimer's disease are costly, invasive, and scale poorly for early screening while lacking sensitivity to subtle early-stage deficits. While speech-based picture description tasks offer a non-invasive alternative, prior computational approaches primarily rely on unimodal or loosely coupled features, struggling to capture fine-grained semantic inconsistencies and narrative differences between healthy controls and patients.

## Method

The framework employs pretrained foundation encoders (Wav2Vec2 for audio, BERT for text via Whisper Large v3 ASR, and CLIP for images) with modality-specific projection heads mapped into a shared dmodel space. It evaluates a staged architecture moving from acoustic baselines (eGeMAPS) to frozen foundation embeddings, late fusion, task-conditioned mid-level cross-attention fusion, visual integration for picture description, and a final mixture-of-experts (MoE) layer. An auxiliary label-conditioned image-text alignment loss encourages high semantic similarity for healthy controls and penalizes high similarity above a margin for MCI samples. Training uses a patient-level 5-fold cross-validation scheme with AdamW optimization.

## Results

Evaluated on a custom clinical dataset of 88 Polish-speaking participants (69 MCI, 19 healthy controls) performing five tasks (AV, MA, MW, PD, RA) via Samsung Galaxy A55 smartphones. Aggregate RMSE decreased progressively across model variants E0 through E6, from 3.74 to 2.49 for MoCA and 2.97 to 2.14 for MMSE. In the picture description (PD) task, the best model variant (E6) achieved an RMSE of 2.11 (±0.03) for MoCA and 1.85 (±0.08) for MMSE. Text-only representations consistently outperformed audio-only representations across all aggregate metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers, clinicians, and researchers developing non-invasive digital biomarkers and automated screening tools for early-stage neurodegenerative disorders and cognitive decline.

## Limitations

The study relies on a relatively small, single-language cohort of Polish speakers, coarse sample-level supervision from less frequent clinical score measurements, and sensitivity to ASR quality.

## Related

- (link related pages by id as the wiki grows)
