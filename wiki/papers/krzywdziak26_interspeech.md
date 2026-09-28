---
id: krzywdziak26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1424
pdf: https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.pdf
---

# Task-Conditioned Audio-Text-Image Fusion for Cognitive Score Estimation from Speech-Based Assessments

*Justyna Krzywdziak, Władysław Średniawa, Agnieszka Pruszek, Wojciech Szecówka, Michał K. Grzeszczyk, Teresa Brzozka, Bartłomiej Eljasiak, Zofia Marciniak, Łukasz Łazarski, Mateusz Matuszewski, Daria Hemmerling*

[PDF](https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krzywdziak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1424)

**TL;DR** — A multimodal framework for estimating clinical cognitive scores (MoCA and MMSE) from speech and images achieves a picture-description RMSE of 2.11 for MoCA and 1.85 for MMSE using task-conditioned cross-attention and a mixture-of-experts architecture.

## Key contributions

- Proposed an audio-image-text fusion pipeline with a label-conditioned image-text alignment loss tailored for picture description cognitive assessment tasks.
- Evaluated a staged model progression from acoustic and unimodal baselines up to multi-modal fusion and mixture-of-experts.
- Conducted a task-level analysis across five speech-based cognitive tasks, demonstrating that picture description provides the most informative setting for score estimation.

## Problem

Standard clinical diagnostics for Alzheimer's disease and mild cognitive impairment (MCI)—such as cerebrospinal fluid biomarkers, PET, and MRI—are costly, invasive, and scale poorly for early screening. Prior computational approaches largely relied on unimodal features or rudimentary late-fusion setups, often ignoring visual context or failing to explicitly model transcript-image consistency differences between healthy controls and MCI patients. Because early-stage cognitive decline manifests subtly in narrative organization and semantic retrieval during picture descriptions, developing robust, automated multimodal screening tools is crucial for scalable longitudinal monitoring.

## Method

The framework utilizes pretrained foundation encoders for audio, text, and vision: frozen Whisper Large v3 for speech, BERT for transcripts, and CLIP for prompt images. Modality-specific projection heads map raw representations into a shared space of dimension d_model via learned linear projections and LayerNorm. For non-visual tasks, visual tokens are masked out to preserve a consistent input format. 

Two fusion strategies are explored: a late fusion baseline using pooled vectors concatenated with task embeddings, and a task-conditioned mid-level cross-attention fusion mechanism that allows token-level interactions. A mixture-of-experts (MoE) layer sits on top of the fused representation to enable task specialization over a shared backbone. 

Training minimizes a masked, weighted sum of MSE losses across targets. For picture description samples, an auxiliary label-conditioned alignment loss (L_ca) penalizes high image-text cosine similarity for MCI patients above a margin while encouraging high alignment for healthy controls. Optimization uses AdamW with a 5-step warmup and cosine decay under a patient-level 5-fold cross-validation scheme.

## Experimental setup

Evaluated on a custom dataset collected from 88 participants (69 mild MCI, 19 healthy controls) across three medical centers in Poland using Samsung Galaxy A55 smartphones. Compared against baselines ranging from handcrafted eGeMAPS features (E0), frozen wav2vec2 (E1), and BERT (E2) to audio-text late fusion (E3), mid-level fusion (E4), visual token integration (E5a), label-conditioned alignment (E5b), and MoE (E6). Metrics include Root Mean Squared Error (RMSE) and Mean Absolute Error (MAE) for MoCA and MMSE scores.

## Results

Aggregate RMSE across experiments drops progressively from 3.74 to 2.49 for MoCA and 2.97 to 2.14 for MMSE from E0 to E6. On the picture description task specifically, the final MoE model (E6) achieves an RMSE of 2.11 (±0.03) for MoCA and 1.85 (±0.08) for MMSE, outperforming intermediate variants like E5 (2.21 and 1.96). Among tasks, picture description yields the lowest errors, whereas reading aloud yields the highest errors.

| System / Condition | MoCA RMSE | MMSE RMSE |
|---|---|---|
| E0: eGeMAPS + MLP | 3.74 | 2.97 |
| E1: Wav2Vec2 Audio-only | ~3.45 | ~2.75 |
| E2: BERT Text-only | ~3.20 | ~2.55 |
| E3: Audio+Text Late Fusion | ~2.95 | ~2.40 |
| E4: Mid-level Cross-Attention | ~2.75 | ~2.30 |
| E6: Full MoE + Alignment (PD task) | 2.11 | 1.85 |

## Limitations

The clinical cohort is relatively small (88 participants) and restricted to Polish-speaking individuals, which limits cross-lingual and demographic generalization. Supervision is coarse because clinical scores are measured infrequently relative to individual audio recordings, and system performance depends heavily on downstream ASR transcription quality.

## Why read this

Researchers building multimodal diagnostic models for neurodegenerative conditions will find practical insights on how to combine cross-attention fusion, auxiliary alignment objectives, and mixture-of-experts architectures for clinical score regression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated screening tools for early-stage mild cognitive impairment and Alzheimer's disease using smartphone-based speech and visual description tasks.

## Related

- (link related pages by id as the wiki grows)
