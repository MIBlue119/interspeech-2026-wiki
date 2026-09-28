---
id: paver26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2053
pdf: https://www.isca-archive.org/interspeech_2026/paver26_interspeech.pdf
---

# Acoustic correlates of voice quality settings: variation within and between individual speakers

[PDF](https://www.isca-archive.org/interspeech_2026/paver26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/paver26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2053)

**TL;DR** — This study evaluates group-level and speaker-specific acoustic correlates of laryngeal and supralaryngeal voice quality (VQ) settings, demonstrating that acoustic shifts are highly speaker-contingent rather than invariant.

## Problem

Perceptual assessments of voice quality are frequently criticized as subjective, leading researchers to rely on acoustic measures as objective correlates of articulatory settings. However, most acoustic studies generalize across speakers while ignoring the speaker-specific nature of VQ, conflating inter-speaker variation with actual VQ effects. Furthermore, acoustic correlates of supralaryngeal VQ remain largely underexplored, creating challenges for forensic phonetics where reliable baseline references for 'modal' voice do not exist.

## Method

The authors analyzed a subset of 4 male British English-speaking phoneticians from the Person-Specific Automatic Speaker Recognition (PASR) dataset, reading the Rainbow passage across 3 sessions in 6 different VQ guises: default (DEF), breathy (BRT), fronted tongue body (FTB), nasal (NAS), denasal (DEN), and lowered larynx (LLX), totaling 216 recordings. Vocalic segments were force-aligned using the Montreal Forced Aligner, and acoustic measures—including CPP, spectral tilt (H1-A1*, H1-A2*, H1-A3*, H1-H2*, H2-H4*), harmonics-to-noise ratio (HNR05, HNR15, HNR25, HNR35), and long-term formants (F1–F4)—were extracted using VoiceSauce and Praat. Data were z-score normalized and modeled using linear mixed-effects regression in lme4 with a three-way interaction between VQ setting, acoustic measure, and speaker, followed by pairwise comparisons of estimated marginal means.

## Results

At the group level, significant interaction effects showed that breathy (BRT) and nasal (NAS) voice increased spectral tilt, BRT increased F1–F4 and decreased CPP and HNR05, and denasal voice lowered H1-A1* and H2-H4*. However, a significant three-way interaction (F(195, 9359) = 3.34, p < .001) revealed that individual speakers exhibited high variability, with many group-level trends driven by only one or two speakers (e.g., spectral tilt and F2 increases for NAS were only significant for speaker 6). The findings confirm that acoustic measures index positions within speaker-specific acoustic spaces rather than absolute articulatory states.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic phoneticians, speech scientists, and sociophonetics researchers analyzing voice quality and speaker individuality in audio recordings.

## Limitations

The study is limited by a small sample size of only four male speakers, which may obscure broader group-level trends and generalizability.

## Related

- (link related pages by id as the wiki grows)
