---
id: sanjotra26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2203
pdf: https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.pdf
---

# Investigating the Relationship between Objective AI-driven Metrics and Subjective MOS for In-the-Wild Speech

[PDF](https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2203)

**TL;DR** — This paper evaluates the performance of objective AI-driven MOS predictors on in-the-wild discrete-token TTS, revealing a total correlation collapse and severe metric biases.

## Problem

Automated Mean Opinion Score predictors are widely used to benchmark text-to-speech systems, but they are typically trained on studio-recorded or denoised corpora. When applied to modern zero-shot, in-the-wild discrete-token TTS models that produce semantic errors and acoustic camouflage, standard metrics fail to align with human perception. This creates a critical blind spot where automated evaluations can rank poor-quality, semantically corrupted synthetic speech above human standards.

## Method

The authors construct a controlled ablation across four systems using 32 text transcripts and reference prompts from the TITW-Easy database: a continuous clean anchor (StyleTTS 2), a discrete in-the-wild target (MQTTS with a semantic token encoder operating on raw reference audio), an additive noise control (StyleTTS 2 outputs mixed with calibrated MUSAN babble noise via NISQA matching), and ground-truth recordings. They collect 768 human naturalness ratings under a headphone-screened absolute category rating protocol using 48 diverse participants. They evaluate four neural objective metric families—UTMOSv2, DNSMOS P.835 OVRL, DNSMOS Pro (BVCC and VCC2018 checkpoints), and PLC-MOS—using the VERSA toolkit without references or transcripts.

## Results

On continuous clean TTS (SYS-A), UTMOSv2 achieves a moderate correlation of r = 0.51 (p < 0.01), but its correlation collapses to r = −0.01 (n.s.) on the discrete in-the-wild system (SYS-B), a drop confirmed as statistically significant by Steiger's test (t(29) = 2.24, p = 0.033). All other evaluated neural MOS predictors similarly drop to statistical non-significance on the discrete ITW system. Furthermore, DNSMOS P.835 OVRL penalizes the additive noise condition 0.42 points more severely than the generative-artefact condition (2.64 vs. 3.06), even though human listeners rate both conditions equivalently. Scatter analysis uncovers an acoustic camouflage effect where UTMOSv2 assigns scores above 3.8 to 7 discrete ITW files that human listeners rated below 2.5.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech synthesis engineers and researchers evaluating zero-shot, in-the-wild generative text-to-speech models, to avoid relying on misleading objective quality metrics.

## Limitations

The evaluation focuses specifically on discrete-token in-the-wild TTS architectures and a subset of four prominent neural MOS metric families.

## Related

- (link related pages by id as the wiki grows)
