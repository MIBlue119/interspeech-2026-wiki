---
id: halpern26_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Nagoya University", "University of Groningen", "University of Cologne"]
code: https://github.com/karkirowle/pathbench
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-946
pdf: https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.pdf
---

# PathBench: Speech Intelligibility Benchmark for Automatic Pathological Speech Assessment

*Bence Mark Halpern, Thomas Tienkamp, Defne Abur, Tomoki Toda*

[PDF](https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-946)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — PathBench is a unified benchmark for automatic pathological speech intelligibility assessment across six public datasets and four languages, evaluating 19 distinct protocols. It introduces Dual-ASR Articulatory Precision (DArtP), a reference-free metric achieving a top average speaker-level Pearson correlation of r = 0.66 among reference-free approaches.

## Key contributions

- Constructed PathBench, standardizing evaluation protocols (Matched Content, Extended, Full) across six public pathological speech datasets spanning English, Spanish, Italian, and Dutch.
- Established comprehensive baselines evaluating reference-free, reference-text, and reference-audio assessment methods without requiring labelled intelligibility training data.
- Proposed Dual-ASR Articulatory Precision (DArtP), an explainable, reference-free metric that couples a semantic ASR model with a phonetic ASR model to score acoustic-phonetic alignment.
- Analyzed key confounding factors (speaker age and WADA SNR) and protocol variations (word vs. sentence stimuli, matched content vs. extended datasets).

## Problem

Automatic evaluation of pathological speech intelligibility (PSIT) has remained heavily fragmented due to a reliance on private datasets and inconsistent evaluation protocols, hindering independent reproduction and comparison. Furthermore, prior studies mix diverse targets like intelligibility, articulatory precision, and voice quality using different input requirements—ranging from zero references to required transcriptions or parallel healthy audio—without clear insight into how data selection choices and noise/age confounders alter performance.

## Method

PathBench evaluates methods across three input constraints: Reference-Free, Reference-Text, and Reference-Audio. All audio is resampled to 16kHz and trimmed of leading/trailing silence using ASR-based forced alignment. The proposed Reference-Free method, Dual-ASR Articulatory Precision (DArtP), operates in two steps. First, a semantic ASR model (wav2vec2-large-xlsr-53) decodes an intended message hypothesis via beam search using 5-gram Wikipedia language models trained for English, Italian, Spanish, and Dutch (with parameters alpha = 0.5, beta = 1.5) and pyctcdecode. Second, a phonetic ASR model (wav2vec2-xlsr-53-espeak-cv-ft) converts the text hypothesis into phonemes via an espeak G2P backend, force-aligns them to the audio using CTC, and computes Articulatory Precision (AP) as the average posterior probability of aligned phonemes over active, non-silent speech frames.

Baseline methods span signal-based features (Speech Rate via De Jong & Wempe syllable nuclei detection, Cepstral Peak Prominence (CPP), fundamental frequency variation sigma_fo via Praat, and polygonal Vowel Space Area (VSA)), model-based confidence and ASR Inconsistency (ASRIC), reference-text metrics (PER on semantic/phonetic outputs, and ArtP via ground-truth text alignment), and parallel reference-audio metrics (P-ESTOI and Neural Acoustic Distance (NAD) computed on layer 10 of wav2vec2-large). Protocols are bifurcated into Matched Content (MC; identical utterances across speakers) and Extended (EX; all available utterances per speaker to maximize data volume).

## Experimental setup

Evaluated across six public datasets: UASpeech (English dysarthria; 14 patients, 13 controls), NeuroVoz (Spanish Parkinson's; 50 patients, 56 controls), EasyCall (Italian dysarthria; 30 patients, 24 controls), COPAS (Dutch pathology variety; up to 216 patients, 130 controls), TORGO (English dysarthria; 11 patients, 6 controls), and YouTube (English oral cancer; 88 patients, 7 controls). The primary evaluation metric is speaker-level Pearson Correlation Coefficient (PCC). Implementation utilizes 16kHz audio inputs, wav2vec2 backbones, and pre-trained 5-gram language models.

## Results

Across all 19 protocols, the top overall performers by average correlation are ArtP and NAD, both achieving an average PCC of r = 0.71. Among reference-free methods, DArtP leads with an average PCC of r = 0.66, closely followed by unconstrained ASR Confidence (r = 0.63) and ASRIC (r = 0.59). For reference-text configurations, PER (SEM) reaches r = 0.60 and ArtP reaches r = 0.72.

Ablations on protocol size show that the Extended (EX) data condition yields significantly higher correlations than Matched Content (MC) (Wilcoxon Signed-Rank Test, p < 0.0001), indicating that data volume and linguistic diversity generally outweigh strict content matching for model-based and reference-based pipelines. Stimulus-level comparisons show sentences outperforming isolated words overall (p = 0.0012), driven primarily by reference-audio methods (p = 0.0001) where longer context stabilizes alignment algorithms like DTW. Confounder checks reveal weak correlations for age (|r| < 0.4 mostly) and WADA SNR (|r| < 0.3 mostly, except COPAS word task where SNR hit r = -0.69).

| System / Condition | UASpeech (Word) EX | NeuroVoz (Sentence) EX | EasyCall (Word) EX | TORGO (Sentence) EX | Average PCC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Speech Rate (Ref-Free) | -0.78 | 0.32 | 0.53 | 0.72 | 0.11 |
| ASRIC (Ref-Free Model) | 0.98 | 0.86 | 0.70 | 0.88 | 0.59 |
| DArtP (Proposed Ref-Free) | 0.98 | 0.79 | 0.62 | 0.91 | 0.66 |
| ArtP (Ref-Text) | 0.98 | 0.78 | 0.68 | 0.92 | 0.72 |
| NAD (Ref-Audio) | 0.97 | 0.75 | 0.86 | 0.90 | 0.71 |

## Limitations

PathBench is currently restricted to four languages (English, Italian, Spanish, and Dutch), lacking coverage of tonal or broader language families. Reference-audio approaches like NAD are bounded by the availability of control speakers in public datasets. Furthermore, while natural acoustic noise showed weak baseline correlations, the paper does not systematically stress-test estimator robustness under controlled, artificially degraded signal-to-noise ratio environments.

## Why read this

Speech and ML researchers building automatic pathological speech assessment tools should read this to understand how data protocols, task constraints, and input references shape performance across fragmented public datasets. It provides standardized baselines and demonstrates that dual-model ASR decoding can yield strong, explainable intelligibility estimates without needing labeled clinical training data.

## Code

- https://github.com/karkirowle/pathbench

## Applications

Automated clinical screening, remote rehabilitation monitoring, and disease progression tracking for patients suffering from dysarthria, Parkinson's disease, and oral cancer.

## Institutions / 機構

Nagoya University, University of Groningen, University of Cologne

**Funding / 經費:** Dutch Research Council, JSPS KAKENHI, BRIDGE Program

## Related

- [Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment](zhong26c_interspeech.md) — same problem · relatedness 2.1/3
- [Augmenting Dysarthric Speech Severity Assessment with MOS Supervision](jia26_interspeech.md) — same problem · relatedness 2.1/3
- [What Counts as an Error? Dual-Reference Benchmarking for Atypical ASR](toyin26_interspeech.md) — same problem · relatedness 2.0/3
- [Improving Cross-Dataset Speech Intelligibility Prediction for Hearing-Impaired Listeners with Few-Shot Adaptation](lin26h_interspeech.md) — same problem · relatedness 2.0/3
- [Uncovering Dimension-Specific Layer Preferences in Wav2Vec2 for Fine-Grained Perceptual Assessment of Dysarthric Speech](zhong26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
