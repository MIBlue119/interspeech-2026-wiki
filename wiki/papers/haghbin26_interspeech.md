---
id: haghbin26_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1252
pdf: https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.pdf
---

# From Black-Box to Clinical Insight: A Multi-Stage Explainable Framework for Speech-Based Cognitive Impairment Detection

*Yasaman Haghbin, Sina Rashidi, Ali Zolnour, Fatemeh Taherinezhad, Ali Fartoot, Hossein Azadmaleki, James M. Noble, Maryam Dadkhah, Maryam Zolnoori*

[PDF](https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1252)

**Category:** `health-clinical`

**TL;DR** — This paper proposes a multi-stage explainability framework that translates black-box transformer predictions for cognitive impairment into structured clinical narratives using hierarchical SHAP, linguistic features, and a 4-stage LLaMA-3.1-70B pipeline, achieving an F1-score of 72.11% on the NIA PREPARE benchmark.

## Key contributions

- A hierarchical SHAP adaptation that aggregates transformer subword attributions into interpretable word-level importance scores.
- A multi-stage LLM reasoning pipeline (using LLaMA-3.1-70B-Instruct) chaining token attribution, linguistic features, cross-source aggregation, and structured report generation.
- The SpeechCARE Adaptive Gating Fusion (AGF) screening model, which dynamically weights mGTE linguistic, mHuBERT acoustic, and discretized age representations.
- Clinical validation demonstrating 98% physician agreement (Cohen's kappa = 0.85) on 70 stratified samples and an 82/100 System Usability Scale (SUS) score.

## Problem

Transformer-based speech and language models achieve high performance in detecting cognitive impairment like Alzheimer's disease (AD) and mild cognitive impairment (MCI), but they function as black boxes that clinicians cannot interpret. Prior explainability methods like standard SHAP or LIME output raw token scores or generic feature importances without connecting them to established cognitive-linguistic mechanisms. Clinicians require transparent, plain-language justifications that link speech anomalies directly to underlying cognitive-linguistic dimensions like executive function and lexical richness.

## Method

The system builds on the SpeechCARE-AGF screening model, which uses mGTE for text representation and mHuBERT (operating on 5-second overlapping audio windows with a trainable [CLS] token and a 2-layer, 4-head self-attention encoder) for acoustic features, alongside categorical age groups (mid-life, older adults, elderly). Peak normalization (amplitude set to 0.95) and WhisperLarge transcripts preprocessed the audio. A Mixture-of-Experts-inspired gating network (384-neuron gating layer, 128-neuron Tanh fully connected layers) dynamically fuses these modalities into final classification logits.

The explainability framework operates in four sequential LLM reasoning stages powered by LLaMA-3.1-70B-Instruct. Stage 1 maps word-level aggregated SHAP attributions onto six cognitive-linguistic dimensions (lexical richness, syntactic complexity, disfluencies/repetition, semantic coherence, spatial reasoning difficulty, executive function). Stage 2 processes theory-informed quantitative linguistic features (e.g., Type-Token Ratio, mean length of utterance). Stage 3 aggregates convergent evidence from both sources, and Stage 4 summarizes and polishes the findings into a four-category clinical report for physician review.

## Experimental setup

Evaluated on the NIA PREPARE benchmark dataset comprising 2,058 participants (1,646 training, 412 testing, plus a 20% validation split) across English, Spanish, and Mandarin, containing 1,140 healthy controls, 268 MCI, and 650 AD cases. The model was trained for 15 epochs with a batch size of 4, utilizing learning rates of 1e-6 for mGTE and 1e-5 for the remaining components. Performance was measured via Area Under the Curve (AUC) and F1-score, alongside a clinical evaluation involving 2 primary care physicians on 70 stratified English samples and usability testing with 3 primary care physicians and 2 neurologists.

## Results

The SpeechCARE-AGF screening model achieved an AUC of 86.83% and an F1-score of 72.11% on the official PREPARE test set. In the clinical validation phase, independent blind evaluation by two primary care physicians yielded a 98% agreement rate with a Cohen's kappa of 0.85, confirming that the LLM-generated reports reliably mapped SHAP tokens to patient-specific impairment profiles. Furthermore, the system achieved a System Usability Scale (SUS) score of 82 out of 100, indicating high clinical workflow readiness.

| System / Condition | AUC (%) | F1-Score (%) | SUS Score | Physician Agreement (Kappa) |
|---|---|---|---|---|
| SpeechCARE-AGF (PREPARE Test) | 86.83 | 72.11 | - | - |
| Clinical Validation (70 Samples) | - | - | - | 0.85 (98%) |
| Usability Study (Clinician Feedback) | - | - | 82/100 | - |

## Limitations

The current framework focuses entirely on linguistic and text-based explanations derived from ASR transcripts, completely omitting direct acoustic transformer explanations (such as mHuBERT attention or prosodic shifts). The clinical evaluation was restricted to 70 English-language samples, leaving broader cross-lingual validation across Spanish and Mandarin untested. Additionally, the LLM reasoning pipeline relies heavily on LLaMA-3.1-70B-Instruct, requiring substantial computational resources during inference.

## Why read this

Researchers and engineers building clinical AI tools will learn how to design multi-stage LLM reasoning pipelines that bridge raw model attributions (SHAP) with expert-aligned clinical concepts, moving beyond standard token-importance plots.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated non-invasive screening and explainable diagnostic decision support for Alzheimer's disease and mild cognitive impairment in primary care workflows.

## Institutions / 機構

Columbia University, Chalmers University of Technology

## Related

- (link related pages by id as the wiki grows)
