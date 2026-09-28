---
id: zhang26v_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1402
---

# Larynx segmentation in mid-sagittal speech production real-time MRI

**TL;DR** — A Mask2Former-based pipeline for segmenting the larynx in real-time MRI video of speech production, finding around 33-79 annotated frames per participant suffice, then using it to capture laryngeal dynamics during Mandarin tone production.

## Problem

The spatiotemporal dynamics and coordination of laryngeal movements during speech remain incompletely characterized, partly for lack of a validated automatic larynx-segmentation pipeline for real-time MRI.

## Method

The authors build a larynx segmentation and analysis pipeline combining supervised learning with semi-supervised refinement using Mask2Former, and study how many annotated frames per participant are needed for good performance, then apply the pipeline to a phonetic study of Mandarin tones.

## Results

Roughly 33-79 annotations per participant (about 25-60% of the 794 training samples across 6 participants) suffice under a 5% marginal-gain threshold, with diminishing returns beyond that; semi-supervised learning gives only modest and sometimes inconsistent gains over full supervision; the Mandarin tone study demonstrates the pipeline can capture intrinsic and extrinsic pitch control and laryngeal constriction dynamics; code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables large-scale study of laryngeal behavior in linguistic contrasts like voicing, tone, and phonation type using real-time MRI, useful for phonetics research and voice/speech disorder studies.

## Related

- (link related pages by id as the wiki grows)
