---
id: penney26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2610
pdf: https://www.isca-archive.org/interspeech_2026/penney26_interspeech.pdf
---

# Achieving voicelessness in coda stop contexts: Insights from combined electroglottography and laryngoscopy

*Joshua Penney, Jae Hyun Kim, Dijana Dragicevich, Prue Gourley*

[PDF](https://www.isca-archive.org/interspeech_2026/penney26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/penney26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2610)

**Category:** `phonetics-linguistics`

**TL;DR** — By combining electroglottography (EGG) and flexible nasolaryngoscopy in Australian English, this study confirms that pre-sonorant voiceless coda /t/ uses glottal/laryngeal constriction while /k/ uses glottal spreading, whereas all phrase-final voiceless stops (/p, t, k/) exhibit glottal constriction.

## Key contributions

- Combined synchronous EGG and high-definition flexible nasolaryngoscopy to directly validate EGG-inferred glottal states during the production of Australian English voiceless coda stops.
- Demonstrated that in pre-nasal positions, /t/ production is accompanied by sustained glottal and epilaryngeal constriction throughout the preceding vowel, whereas /k/ production exhibits progressive glottal spreading.
- Revealed that in phrase-final position, voiceless stops across all places of articulation (/p, t, k/) consistently employ glottal/laryngeal constriction, challenging universal single-strategy accounts.
- Identified methodological artifacts and data loss risks in multimodal laryngeal data collection involving crossed EGG and laryngoscope cabling.

## Problem

Phonetic studies of voiceless coda stops often infer glottal states indirectly using electroglottography (EGG) via electrical impedance. However, EGG provides no direct visualization of supraglottal configurations (such as epilaryngeal constriction), leaving the physical alignment between inferred electrical contact metrics and actual laryngeal behaviour unverified. Furthermore, prior work offers conflicting accounts regarding whether place-of-articulation asymmetries in coda stop glottalisation generalize across prosodic contexts like phrase-final versus pre-sonorant environments.

## Method

Synchronised audio, 48 kHz EGG, and 25 fps high-definition flexible nasolaryngoscopic video data were captured using a Laryngograph EGG-D200 and a Pentax VNL11-J10 nasolaryngoscope. Three male L1 Australian English speakers produced target /VC/ syllables where V was the high front vowel /i:/ (chosen to minimize tongue root retraction/epiglottis obscuration) and C was a voiceless stop (/p, t, k/) in two contexts: word-in-isolation (final position) and followed by an alveolar nasal and high front vowel (pre-nasal position).

Audio and EGG signals were force-aligned using WebMaus and analyzed via PraatDet to compute open quotient (OQ) values per glottal cycle using a hybrid method based on glottal closing instants (peak of the first derivative of the EGG signal) and glottal opening instants (amplitude falling below 25%). OQ trajectories across the second half of each target vowel were time-normalised, z-scored within speaker, and smoothed using LOESS with bootstrapped confidence intervals. Laryngoscopic video frames synchronized with audio were visually examined using custom MATLAB scripts to cross-verify glottal and supraglottal opening/constriction patterns against EGG-derived open quotient curves.

## Experimental setup

Data from 3 male L1 Australian English speakers (ages 25–45) after excluding 3 participants due to non-tolerance or impulse-like electrical signal interference from crossed EGG/laryngoscope cabling. Stimuli consisted of 3 repetitions of /i:p/, /i:t/, and /i:k/ tokens elicited in isolation (final position) and pre-nasal contexts. Analysis relied on descriptive qualitative evaluation of LOESS-smoothed OQ trajectories and frame-by-frame visual inspection of nasolaryngoscopic video.

## Results

In pre-nasal position, OQ trajectories and laryngoscopic imaging showed a clear place-of-articulation split: vowels preceding /t/ exhibited decreasing OQ and sustained epilaryngeal constriction (indicating glottal/laryngeal constriction), whereas vowels preceding /k/ showed rising OQ and reduced epilaryngeal constriction (indicating glottal spreading). Bilabial stops /p/ showed intermediate, flat trajectories without a consistent pattern.

In phrase-final position, EGG and laryngoscopy revealed converging patterns of glottal and laryngeal constriction preceding stops at all three places of articulation (/p, t, k/), though individual tokens occasionally displayed late spreading realisations characterized by a rapid release of constriction at the very end of the vowel boundary.

## Limitations

The study relies on a highly constrained laboratory setting with a very small sample size of three male speakers, entirely precluding robust quantitative statistical modeling. The pre-nasal environment introduced a homorganic following nasal for /t/ but not for /p/ or /k/, presenting a potential phonetic confound. Additionally, high front vowels were exclusively analyzed to optimize laryngeal visibility, limiting immediate generalizability to non-high vowel contexts.

## Why read this

Phoneticians and speech researchers studying voice quality, laryngeal articulation, and phonation-obstruent interactions should read this paper to see how direct nasolaryngoscopy validates or nuances electroglottographic inferences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phonetic research, speech pathology, laryngeal physiology analysis, and multi-modal speech data acquisition methodology.

## Institutions / 機構

Macquarie University

**Funding / 經費:** Early Career Researcher Enabling Scheme

## Related

- (link related pages by id as the wiki grows)
