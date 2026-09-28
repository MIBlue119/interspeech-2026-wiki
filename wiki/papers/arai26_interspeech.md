---
id: arai26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-840
pdf: https://www.isca-archive.org/interspeech_2026/arai26_interspeech.pdf
---

# Articulatory Dynamics using Physical Vocal-tract Models

*Takayuki Arai*

[PDF](https://www.isca-archive.org/interspeech_2026/arai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-840)

**TL;DR** — This paper evaluates the VTM-UT30-D9 physical dynamic vocal-tract model controlled via linear and rotating cams to simulate articulatory phonology, demonstrating natural coarticulation and vowel epenthesis phenomena. Acoustic measurements and ASR evaluations show that temporal gesture offsets cause abrupt perceptual transitions and targetless schwa insertion.

## Key contributions

- Evaluated the VTM-UT30-D9 physical dynamic vocal-tract model equipped with a nasal cavity and cam-driven mechanical articulators.
- Demonstrated physical implementation of gestural scores from Articulatory Phonology (AP) and Task Dynamics (TD) frameworks.
- Analyzed acoustic consequences of nasalization timing in [bɑb] vs [bɑm] using impulse responses and pole-zero spectral analysis.
- Investigated vowel epenthesis (targetless schwa) in [ɑbɹɑ] across eight temporal offset steps using MATLAB's wav2vec 2.0 ASR and statistical tests.

## Problem

While computer-simulated vocal-tract models are widespread, physical mechanical models offer superior intuitiveness and straightforward parameterization for studying speech dynamics. However, how precisely programmable mechanical models like VTM-UT suppress, overlap, or desynchronize articulatory gestures to simulate complex phenomena like nasal coarticulation and consonant cluster epenthesis has remained insufficiently studied. Bridging this gap is crucial for validating physical models against Articulatory Phonology and understanding human speech production mechanisms.

## Method

The study utilized the VTM-UT30-D9 physical vocal-tract model, which features a straight polyoxymethylene vocal tract governed by six movable blocks (20 mm wide, except the 10 mm lip block) backed with brass weights to assist gravity-driven fall. The D9 variant incorporates a side-branch nasal cavity attached to a dial-controlled valve for adjustable velopharyngeal (VP) coupling from 0 to 45 degrees. Mechanical control is achieved via programmable linear cams (constructed from right-triangle and rectangular small plates along six base-plate grooves) and rotating cams that map directly to gestural scores of tract variables: Lip Aperture (LA), Tongue Body Constriction Degree (TBCD), Tongue Root Constriction Degree (TRCD), and Velopharyngeal port (VEL).

For the [bɑb] and [bɑm] word pair, the model executed oral closures via the lip block, pharyngeal constrictions via left-most blocks elevated to 18 mm, and controlled VP port opening for nasalization. Impulse responses were recorded using a 65,536-sample swept-sine signal at 48 kHz played through a loudspeaker and captured via a 1/4-inch microphone. For the [ɑbɹɑ] cluster experiment, eight cam configurations (Step 0 to Step 7) systematically delayed the onset of the tongue body movement governing the [ɹ] gesture by 3 mm increments (totaling a 21 mm displacement shift from Step 0 to Step 7), creating varying degrees of temporal overlap and inducing targetless schwa epenthesis.

## Experimental setup

Experiments analyzed acoustic outputs and recorded 80 total repetitions (10 per step across 8 temporal steps) of the nonsense word [ɑbɹɑ]. Acoustic recordings utilized a 48 kHz sampling rate with synchronous averaging. Recognition accuracy of the consonant cluster versus inserted schwa was evaluated using MATLAB's 'speech2text' function (wav2vec 2.0 backend, English language mode). Statistical evaluations were performed using SPSS Statistics 26 via Cochran-Armitage trend tests and Fisher's exact tests with Bonferroni correction at a significance level of alpha = 0.05.

## Results

For nasalization experiments, incremental VP coupling angles (0°, 15°, 30°, 45°) introduced pole-zero pairs in the vocal-tract transfer function that cancelled out the first formant (F1), shifting the lowest pole to become the new F1 while preserving perceptual vowel identity due to human perceptual compensation. In the [ɑbɹɑ] timing experiment, ASR recognition of the consonant cluster showed a significant monotonic decrease across steps (Cochran-Armitage chi-square = 42.538, p < 0.001). Steps 0 and 1 achieved ceiling performance (100% cluster recognition, 0% vowel epenthesis), whereas Steps 6 and 7 dropped to floor performance (0% cluster recognition, 100% vowel insertion). Adjacent-step Fisher's exact tests revealed that the performance drop was non-gradual, with a sharp, statistically significant transition occurring exclusively between Step 1 and Step 2 (Bonferroni-adjusted p = 0.021).

| Condition / Step | Cluster Recognition Rate (%) | Vowel Epenthesis Rate (%) | ASR Outcome |
| :--- | :--- | :--- | :--- |
| Step 0 (d = 30 mm) | 100% | 0% | No insertion |
| Step 1 (d = 33 mm) | 100% | 0% | No insertion |
| Step 2 (d = 36 mm) | 30% | 70% | Sharp transition |
| Steps 3–5 | Intermediate | Intermediate | Progressive degradation |
| Steps 6–7 (d = 51 mm) | 0% | 100% | Full schwa insertion |

## Limitations

The study is limited by testing a restricted set of phonetic sequences ([bɑb], [bɑm], and [ɑbɹɑ]) using a single physical model architecture (VTM-UT30-D9). The mechanical cam configurations model idealized, deterministic gestural trajectories that lack the viscoelastic complexity, muscular fatigue, and neuro-motor feedback loops inherent to human biological speech production. Furthermore, acoustic evaluations relied on a fixed synthetic-to-acoustic recording setup inside a specific physical apparatus rather than a diverse corpus of human speakers.

## Why read this

Phoneticians, speech scientists, and researchers working on articulatory synthesis or speech production models should read this paper to see how physical vocal-tract hardware can effectively instantiate Articulatory Phonology and quantify coarticulation and epenthesis thresholds.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Educational tools in phonetics and speech science, speech pathology rehabilitation models, and physical acoustic validation of speech synthesis algorithms.

## Related

- (link related pages by id as the wiki grows)
