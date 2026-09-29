---
id: dudek26_interspeech
category: health-clinical
labels: [low-resource, self-supervised]
institutions: ["AGH University of Krakow", "SoftServe", "Silesian University of Technology", "University of Silesia in Katowice"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1416
pdf: https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.pdf
---

# Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant

*Milosz Dudek, Daria Hemmerling, Kamil Kwarciak, Maciej Stroinski, Maria Pensko, Mateusz Kowalewski, Leonid Pavlovskyi, Sebastian Jurczak, Anna-Mariia Vitkovska, Zuzanna Miodonska, Natalia Mocko, Michal Krecichwost*

[PDF](https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1416)

**Category:** `health-clinical` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — A phoneme-level mispronunciation screening pipeline for Polish-speaking children combines a fine-tuned wav2vec2 recognizer with bracketed substitution tokens and a template-grounded caregiver assistant, achieving an 88.7% exact sequence match on held-out children.

## Key contributions

- A substitution-aware token recognizer for Polish child speech built on a pretrained wav2vec2 encoder coupled with a compact 6-layer Transformer post-encoder.
- A specialized phonetic vocabulary extending standard IPA tokens with 12 expert-judged bracketed substitution markers to explicitly capture common sibilant mispronunciations (sigmatism).
- A screening evaluation protocol on 10 unseen children (559 utterances) reporting both token accuracy and a conservative target mismatch proxy.
- A template-grounded caregiver assistant design featuring explicit uncertainty suppression and safety guardrails to translate diagnostic vectors into plain-language feedback.

## Problem

Speech sound disorders in children require early identification, but access to clinical specialists is bottlenecked by long wait times, necessitating reliable home screening tools. Polish is especially challenging for automatic speech recognition due to its dense consonantal inventories, complex clusters, and three distinct sibilant series that frequently undergo substitutions and distortions. Furthermore, off-the-shelf end-to-end ASR models rely on strong language-model priors that normalize atypical child utterances toward canonical words, masking the subtle minimal-contrast errors critical for speech therapy screening.

## Method

The acoustic model employs a wav2vec2-large-xlsr-53-polish encoder initialized from pretrained weights, followed by a 6-layer Transformer post-encoder to stabilize temporal context and CTC emissions for sibilant-heavy segments. Parameter-efficient adaptation is performed via LoRA injected into attention projections and feed-forward sublayers (rank r=32, alpha=64, dropout 0.1) alongside partial unfreezing of the last 6 encoder layers, yielding 119.7M trainable parameters out of 359.6M (33.3%). The token vocabulary is augmented with 12 bracketed IPA substitution tokens representing expert-assigned closest matches for target sibilants. Training uses the Connectionist Temporal Classification (CTC) loss objective, trained with mixed precision and early stopping (patience 50, max 200 epochs).

During inference, greedy CTC decoding (argmax over logits without an external language model) extracts a recognized production sequence, which is aligned to the canonical prompt string using minimum-edit (Levenshtein) distance. Alignment operations yield a diagnostic vector containing the prompt, target, realized token, error type, position, and confidence score. The frame-level confidence score is computed as the mean posterior probability of the realized token over the frames assigned to it during greedy CTC collapse. If the confidence falls below a threshold or evidence is inconsistent, the assistant triggers a safety rule to request a re-recording rather than delivering detailed feedback. Otherwise, a template-grounded assistant maps the diagnostic vector to a structured, plain-language caregiver report.

## Experimental setup

Evaluated on a proprietary corpus of prompted Polish child speech comprising 201 native-speaking children aged 4 to 8 years (107 female, 94 male; mean age 76.2 months). Data collection used a 15-channel audio (44.1 kHz/16-bit) and dual-camera video setup during on-site SLT examinations, consisting of 51 words and 12 logotomes (12,830 segments total). The model was trained on 10,508 utterances, validated on 1,170, and tested on a speaker-disjoint held-out set of 10 unseen children comprising 559 utterances. Baselines compared include a wav2vec2 model without a post-encoder and a WavLM-Base encoder replacement.

## Results

On the held-out test set of 559 utterances, the proposed wav2vec2 system with a post-encoder and bracket tokens achieves an 88.7% exact sequence match (496/559), 95.0% token accuracy, 5.95% word error rate (WER), and 4.09% character error rate (CER) on token strings. Cluster bootstrap by child yields a 95% confidence interval of [83.8, 93.2] for exact match and [92.7, 97.0] for token accuracy.

Ablation experiments demonstrate that removing the 6-layer post-encoder drops exact match to 84.5% (token accuracy 90.2%, screening F1 0.62), while swapping the SSL backbone for WavLM-Base further degrades performance to 78.6% exact match (token accuracy 86.6%, screening F1 0.54). Evaluated as a screening proxy for detecting primary sibilant target mismatches, the system achieves 72.9% precision, 61.4% recall, an F1 score of 0.67, and a false-alarm rate of 2.7% on target-correct items. When a mismatch is flagged, the predicted bracket class matches the reference label in 85.7% of cases.

| System | Exact Match (%) | Token Accuracy (%) | Screening F1 |
|---|---|---|---|
| wav2vec2 + post-enc + bracket tokens (Proposed) | 88.7 | 95.0 | 0.67 |
| wav2vec2 + bracket tokens (No post-enc) | 84.5 | 90.2 | 0.62 |
| WavLM + post-enc + bracket tokens | 78.6 | 86.6 | 0.54 |

## Limitations

The evaluation relies on a fixed diagnostic prompt inventory (64 prompts) rather than open-vocabulary child speech, restricting assessment to speaker-disjoint generalization on known items. The held-out test cohort is limited to 10 children, resulting in wider speaker-generalization uncertainty. Furthermore, the system currently focuses on sibilant substitutions and does not handle broader phonetic errors, and the caregiver assistant lacks end-user user studies evaluating safety and clarity in the field.

## Why read this

Speech and ML researchers focusing on low-resource or clinical speech processing will find a concrete recipe for adapting self-supervised SSL encoders to detect fine-grained phonetic errors without language model smoothing. It provides a blueprint for integrating expert-guided token augmentation with rule-based safety guardrails for assistive health technologies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech screening tools for early detection of speech sound disorders and caregiver-guided speech therapy practice outside the clinic.

## Institutions / 機構

AGH University of Krakow, SoftServe, Silesian University of Technology, University of Silesia in Katowice

**Funding / 經費:** National Centre for Research and Development

## Related

- [A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic](yang26j_interspeech.md) — same problem · relatedness 2.3/3
- [Harf-Speech: A Clinically Aligned Framework for Arabic Phoneme-Level Speech Assessment](azad26_interspeech.md) — same problem · relatedness 2.2/3
- [Beyond Acoustic Sparsity and Linguistic Bias: A Prompt-Free Paradigm for Mispronunciation Detection and Diagnosis](geng26_interspeech.md) — same problem · relatedness 2.2/3
- [IQRA 2026: Interspeech Challenge on Automatic Assessment Pronunciation for Modern Standard Arabic (MSA)](kheir26b_interspeech.md) — same problem · relatedness 2.1/3
- [Detection of Incorrect Place of Articulation in Polish Sibilants Using Convolutional Autoencoders](pieniazek26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
