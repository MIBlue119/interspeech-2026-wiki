---
id: haghbin26b_interspeech
category: health-clinical
institutions: ["Columbia University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1860
pdf: https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.pdf
---

# Natural Speech Encodes Early Markers of Cognitive Decline: Evidence from Clinical Conversations

*Yasaman Haghbin, Sina Rashidi, Ali Zolnour, Margaret McDonald, Maryam Zolnoori*

[PDF](https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1860)

**Category:** `health-clinical`

**TL;DR** — This paper validates naturalistic conversational speech from phone check-ins and patient-nurse interactions as an early non-invasive biomarker for cognitive decline, achieving an AUC of 0.92 when fused with electronic health records.

## Key contributions

- Developed a lightweight attention-based bottleneck fusion model to integrate structured EHR data, linguistic transcripts, and acoustic speech embeddings.
- Curated a unique clinical corpus of 175 participants combining real-world patient-nurse verbal communications (avg 29 mins) and structured check-in phone calls (avg 9 mins).
- Evaluated the incremental diagnostic value of spontaneous speech sources, demonstrating that patient-nurse dialogues boost AUC from 0.74 (EHR-only) to 0.90.
- Conducted Gradient x Input attribution analyses revealing that spectral/cepstral acoustic features and physiological/functional EHR variables drive the majority of the model's decisions.

## Problem

Alzheimer's disease and related dementias (ADRD) are significantly underdiagnosed due to the subtlety of early symptoms and the limitations of structured clinical data. Prior electronic health record (EHR) algorithms and clinical note classifiers (such as Word2Vec or BioClinicalBERT on nursing notes) struggle to capture early-stage cognitive deficits, yielding modest F1 scores. Meanwhile, public datasets like DementiaBank rely on brief, resource-intensive laboratory tasks (e.g., Cookie Theft) that capture late-stage impairment rather than early, subtle decline in spontaneous everyday communication. This work addresses the need for scalable, ecologically valid screening mechanisms in routine healthcare environments.

## Method

The framework processes three data modalities: structured EHR variables (~100 features), free-text nursing notes, and speech audio from check-in phone calls and patient-nurse communications. Speech was transcribed and diarized using AWS General Transcribe, with GPT-4o mapping speaker roles to isolate patient speech; missing speech modalities were handled via training-set mean imputation. Acoustic features were extracted across six domains using SpeechDETECT, while linguistic embeddings were generated via BERT for speech transcripts and BioMedBERT for nursing notes.

All modalities were projected into a common dimension d using linear adapters and acoustic encoders to form modality tokens, concatenated into $X \in \mathbb{R}^{5 \times d}$. An attention-based bottleneck fusion network used $m=8$ trainable fusion tokens $F^{(0)} \in \mathbb{R}^{m \times d}$ interacting through a single transformer layer with pre-norm cross-attention (attending to modality tokens) and self-attention over $F$. The final representation was passed through LayerNorm and a 2-layer MLP to output a classification logit.

Models were trained using class-weighted cross-entropy, AdamW optimization, and early stopping on validation F1-score across 5 random seeds, utilizing a stepwise training strategy to isolate the contribution of each data source.

## Experimental setup

The study utilized a multimodal corpus of 175 participants (47 with cognitive decline, 128 cognitively healthy; 63.9% female; ages 20-99, mean 70.9). Data was split into 55% training, 20% validation, and 25% test sets. Baselines included the EHR-alone model and incremental additions of check-in phone calls and patient-nurse communications. Evaluation metrics included the F1-score for the cognitive impairment class, macro F1-score, and AUC-ROC.

## Results

The EHR-only baseline achieved an AUC of 0.74 $\pm$ 0.05 and an F1 of 58.22 $\pm$ 3.18. Adding the first check-in phone call improved the AUC to 0.76, while incorporating patient-nurse verbal communications substantially increased performance to AUC = 0.90 $\pm$ 0.02 and F1 = 78.22 $\pm$ 2.12. The best configuration—combining EHR, the first check-in phone call, and both patient-nurse verbal communications—achieved an AUC of 0.92 $\pm$ 0.03, an F1-score of 83.08 $\pm$ 3.59, and a macro F1 of 88.31 $\pm$ 2.68.

Ablation studies demonstrated that single-modality acoustic features alone (F1 = 79.61) and linguistic features alone (F1 = 76.21) underperformed compared to their combined speech representation (F1 = 83.08), confirming the complementarity of both streams. Gradient x Input attribution showed that patient-nurse communications contributed 34.6% of attribution mass, check-in calls contributed 24.8% and 23.2%, and EHR variables contributed 17.4%. Within the acoustic modality, spectral and cepstral features accounted for over 80% of attribution mass.

| System / Condition | AUC-ROC | F1 (CI Class) | Macro F1 |
|---|---|---|---|
| EHR Baseline | 0.74 $\pm$ 0.05 | 58.22 $\pm$ 3.18 | 71.73 $\pm$ 2.62 |
| EHR + First Check-In Call | 0.76 $\pm$ 0.05 | 61.95 $\pm$ 4.79 | 72.52 $\pm$ 4.85 |
| EHR + First & Second Check-In Calls | 0.68 $\pm$ 0.09 | 59.20 $\pm$ 5.90 | 72.87 $\pm$ 2.17 |
| EHR + First Patient-Nurse Verbal Comm. | 0.87 $\pm$ 0.03 | 72.45 $\pm$ 1.19 | 80.12 $\pm$ 0.95 |
| EHR + Both Patient-Nurse Verbal Comms. | 0.90 $\pm$ 0.02 | 78.22 $\pm$ 2.12 | 84.52 $\pm$ 1.72 |
| Best Model (EHR + First Call + Both Comms.) | 0.92 $\pm$ 0.03 | 83.08 $\pm$ 3.59 | 88.31 $\pm$ 2.68 |

## Limitations

The dataset is relatively small (175 participants) and restricted in demographic and linguistic diversity, lacking representation for non-English speakers such as Spanish speakers. The evaluation relies on retrospective or short-term clinical interactions, leaving open whether the extracted features can predict long-term progressive decline rather than short-term fluctuations. Additionally, missing speech data required mean imputation, though a subset analysis on complete cases yielded similar performance.

## Why read this

Speech and machine learning researchers working on clinical biomarkers should read this paper to see how an attention bottleneck architecture effectively fuses heterogeneous clinical records and naturalistic, unscripted conversational audio. It provides clear attribution evidence regarding which acoustic and linguistic feature groups drive early cognitive decline detection in real-world settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated non-invasive screening tools integrated into telehealth platforms and nursing workflows for early detection of Alzheimer's disease and related dementias.

## Institutions / 機構

Columbia University

## Related

- [Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection](li26ga_interspeech.md) — same problem · relatedness 2.6/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 2.5/3
- [WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection](xiao26b_interspeech.md) — same problem · relatedness 2.4/3
- [LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features](park26c_interspeech.md) — same problem · relatedness 2.4/3
- [Automatic Graphical Representations of Language for Dementia Detection](xu26n_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
