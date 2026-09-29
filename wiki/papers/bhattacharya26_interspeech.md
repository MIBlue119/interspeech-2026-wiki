---
id: bhattacharya26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Columbia University", "University of Michigan"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-249
pdf: https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.pdf
---

# The Sound of Code-Switching: Prosodic Profiles of Spontaneous Spanish-English Speech

*Debasmita Bhattacharya, Michela Marchini, Julia Hirschberg*

[PDF](https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-249)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This paper presents a large-scale prosodic analysis of spontaneous Spanish-English code-switched speech, revealing that code-switching (CSW) is acoustically distinct from monolingual production—primarily driven by duration and energy differences—and is influenced more heavily by speaker proficiency and linguistic strategy than by switch direction.

## Key contributions

- Conducts a macro-level, language-generalizable analysis of prosody across 35 hours of spontaneous Spanish-English dialogue from the Bangor Miami corpus, shifting focus away from restricted read-speech datasets.
- Demonstrates via statistical t-tests and Benjamini-Hochberg corrections that over 96% of duration features and 87.5% of energy features differ significantly between code-switched and monolingual utterances.
- Shows that code-switched prosody aligns more closely with the monolingual prosody of a speaker's higher-proficiency language, verified via school-medium demographic binnings.
- Proposes a diagnostic use of Whisper-base with an added linear classification head, achieving 92% binary classification accuracy on prosodic language identification for code-switched inputs.
- Evaluates multilingual CSW linguistic properties, finding that CSW richness and strategy (insertional vs. alternational) impact prosodic deviation from monolingual speech, whereas switch direction does not.

## Problem

Prior work studying the prosody of code-switching (CSW) has relied heavily on small, elicited, read-speech datasets focused on isolated phonemes or narrow lexical items, yielding contradictory findings ranging from complete prosodic identity to fundamental distinctness. Furthermore, while perception-oriented and limited production studies hint at phonetic anticipatory cues, an incomplete understanding remains regarding how naturally-occurring, spontaneous CSW compares macro-scopically to monolingual speech in its constituent languages. This gap hinders the development of naturalistic multilingual speech synthesis systems that avoid unnatural intonation contours.

## Method

The study uses the Bangor Miami (BM) corpus containing 35 hours of recorded dialogue and 46,900 transcribed utterances (roughly 2,400 code-switched, 30,700 English, and 13,800 Spanish) produced by 84 adult speakers from Miami, FL. Denoised audio data is fed into DisVoice to extract a set of 103 utterance-level prosodic features encompassing fundamental frequency (F0), energy, and duration across voiced, unvoiced, and pause segments using six statistical functionals (mean, standard deviation, max, min, skew, kurtosis). Linguistic properties such as richness (M- and I-indices), switch direction, and strategies (insertional vs. alternational) are integrated alongside speaker metadata indicating language schooling and experience.

Statistical distributions are compared via independent t-tests with Benjamini-Hochberg corrections and Cohen's d effect sizes. Unsupervised validation is performed using scikit-learn k-means clustering (k=2, 206 parameters), achieving roughly 85% accuracy in separating code-switched and monolingual utterances post-PCA. For supervised evaluation, the 74M-parameter Whisper-base model serves as a prosodic-LID classifier. The model is fine-tuned on a 90/10 speaker-level split using a batch size of 8, learning rates of 1e-5 (fine-tuning) and 5e-5 (with an added linear classifier head), trained for 5 epochs in under an hour on a single T4 GPU, mapping inputs exclusively to English and Spanish outputs to test whether CSW prosody mirrors specific speaker proficiencies.

## Experimental setup

Evaluated on the Bangor Miami (BM) corpus of 35 hours of spontaneous Spanish-English dialogue. Baselines include pre-trained Whisper-base off-the-shelf and k-means clustering comparisons against monolingual English, monolingual Spanish, and combined monolingual partitions. Metrics include Benjamini-Hochberg corrected p-values, Cohen's d effect sizes, k-means clustering accuracy, and class-wise F1 scores for binary prosodic language identification.

## Results

Code-switched prosody differs significantly from monolingual speech: at least 96% of duration features and 87.5% of energy features show significant divergence (p < 0.05), whereas pitch features exhibit more overlap, with up to 30% showing no significant difference. Qualitatively, CSW tends to sound higher-pitched, quieter, and more disjointed, featuring greater variance across feature groups. Unsupervised k-means clustering differentiates code-switched speech from combined monolingual speech with 84.3% accuracy, from monolingual English with 83.7%, and from monolingual Spanish with 86.8%.

Regarding speaker proficiency, speakers with Spanish-medium primary or secondary schooling exhibit significantly fewer prosodic differences between their CSW and Spanish utterances than between their CSW and English utterances (delta values of 15-16%). For supervised prosodic LID, the pre-trained Whisper-base baseline yields 64% accuracy, which improves to 83% via fine-tuning and reaches 92% accuracy (F1-score 0.93 for English, 0.89 for Spanish) upon appending a linear classification head to the encoder. For CSW linguistic properties, high-quantity and high-frequency code-switchers display greater prosodic deviation from monolingual English (delta of 9-10% in significant features). Insertional CSW differs from monolingual Spanish significantly more than alternational CSW does (delta of 10%), whereas switch direction (en->es vs es->en) produces negligible absolute variations (~3%) that fail statistical significance.

| System / Condition | Accuracy | en F1-Score | es F1-Score |
|---|---|---|---|
| k-means ((en+es) vs CSW) | 0.843 | — | — |
| k-means (en vs CSW) | 0.837 | — | — |
| k-means (es vs CSW) | 0.868 | — | — |
| Whisper-base (Pre-trained) | 0.64 | 0.74 | 0.44 |
| Whisper-base (Fine-tuned) | 0.83 | 0.86 | 0.77 |
| Whisper-base (FT + Classifier Head) | 0.92 | 0.93 | 0.89 |

## Limitations

The study is scoped strictly to a single Spanish-English bilingual corpus (Bangor Miami) featuring balanced bilingual speakers, limiting generalization to other dialectal code-switching pairings or less proficient bilingual populations. The analysis relies on automated prosodic feature extraction and macro-level functionals, which may abstract away fine-grained segmental micro-dynamics. Furthermore, the work does not explore interlocutor entrainment dynamics or real-world generative speech synthesis evaluations.

## Why read this

Speech and ML researchers building multilingual text-to-speech or spoken language understanding systems should read this to understand that code-switched prosody is structurally distinct and heavily modulated by speaker proficiency and structural strategies rather than simple token-level interpolation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the naturalness and intonation profiles of synthesized code-switched speech in multilingual text-to-speech (TTS) engines and conversational virtual assistants.

## Institutions / 機構

Columbia University, University of Michigan

**Funding / 經費:** National Science Foundation

## Related

- [Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech](hosseinikivanani26b_interspeech.md) — shared technique · relatedness 2.0/3
- [Speaker or Language? Explaining Variance in Charismatic Prosody Across Luxembourgish and French](hosseinikivanani26_interspeech.md) — same problem · relatedness 2.0/3
- [On Entrainment in Semi-Spontaneous Multilingual Parliamentary Speech](ries26_interspeech.md) — shared technique · relatedness 1.9/3
- [Word Lengthening as a Function of Utterance Position: A Multi-Corpus Study](camara26b_interspeech.md) — shared technique · relatedness 1.9/3
- [Prosodic Realization of Focus in Yi-Mandarin Bilingual Speakers: On-Focus Expansion without Post-Focus Compression](zhang26g_interspeech.md) — shared technique · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
