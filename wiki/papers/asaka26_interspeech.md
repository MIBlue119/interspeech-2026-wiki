---
id: asaka26_interspeech
category: speaker
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1956
pdf: https://www.isca-archive.org/interspeech_2026/asaka26_interspeech.pdf
---

# Two-Level Uncertainty Suppression for Robust Meeting Diarization

*Shuhei Asaka, Muhammad Shakeel, Chikara Maeda, Benjamin Yen, Takeshi Ashizawa, Naoaki Sumida, Kazuhiro Nakadai*

[PDF](https://www.isca-archive.org/interspeech_2026/asaka26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/asaka26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1956)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — A two-level uncertainty suppression framework for meeting diarization combines OWSM-Encoder linguistic features into WavLM via Feature-wise Linear Modulation (FiLM) for segmentation and Known-Seed Guided Clustering (KSGC) for global assignment, reducing Diarization Error Rate (DER) by up to 1.8 points on WavLM-large and 2.62 points under mixed known/unknown conditions.

## Key contributions

- A segmentation approach integrating ASR-derived OWSM-Encoder representations into WavLM intermediate layers using FiLM with correlation-guided layer selection.
- Known-Seed Guided Clustering (KSGC), which models partially available enrollment speakers as replication-based constraints within standard AHC.
- Demonstrated consistent DER improvements on AMI, AliMeeting, and AISHELL-4 under rapid speaker turns, overlapping speech, and mixed known/unknown conditions.

## Problem

Real-meeting diarization suffers from uncertainty propagation where local boundary ambiguities caused by rapid speaker turns and overlapping speech destabilize downstream speaker clustering. Existing end-to-end neural diarization (EEND-VC) and acoustic self-supervised models like WavLM do not explicitly model boundary uncertainty or linguistic context. Furthermore, practical enterprise scenarios often feature mixed known/unknown speaker conditions with partial enrollment data, which standard unconstrained or fully-supervised configurations fail to exploit.

## Method

The framework builds upon the DiariZen-based EEND-VC architecture, tackling local prediction instability and global assignment inconsistency sequentially. For local segmentation, hidden states from an E-Branchformer-based OWSM-Encoder v3.1 are injected into a WavLM backbone using Feature-wise Linear Modulation (FiLM). Cross-model representational alignment is determined via Pearson correlation and Hungarian matching on temporally averaged hidden representations to select optimal injection layers (e.g., layer pair 5->8). The modulated features are subsequently fed into a Conformer encoder for speaker activity estimation using powerset loss.

For global clustering, Known-Seed Guided Clustering (KSGC) introduces a data-level weighting mechanism for Agglomerative Hierarchical Clustering (AHC). Single-speaker enrollment audio (20 seconds per speaker) is embedded using ResNet34-LM (Wespeaker). To handle speaker assignment ambiguity, enrollment embeddings are multiplied by a predefined replication factor (5 for AMI/AISHELL-4, 150 for AliMeeting) to increase their weight relative to test embeddings, anchoring cluster centroids during early AHC stages. Final clusters containing known seeds are labeled via majority voting, while remaining clusters are designated as unknown speakers.

## Experimental setup

Evaluated on AMI-SDM (ENG, 134/18/16 files for train/dev/test), AliMeeting (CHI, 209/8/12 files), and AISHELL-4 (CHI, 173/18/19 files). Modified test sets simulate mixed known/unknown conditions using 20 s non-overlapping enrollment for 3 speakers per recording. Models use 8 s processing chunks with powerset loss, trained with AdamW via differential learning rates (2e-5 for WavLM, 1e-5 for OWSM, 3e-4 for other components). AHC uses a threshold of 0.7 and min cluster size 30. Metrics include Diarization Error Rate (DER) broken into False Alarm (FA), Missed Detection (MD), and Confusion (CN).

## Results

On fully unknown settings, WavLM-large + single-layer FiLM (5,8) achieves a DER of 14.1% on AMI (improving 0.4 points over WavLM-large) and 13.0% on AliMeeting (improving 1.8 points), while scoring 10.6% on AISHELL-4. Under mixed known/unknown conditions using KSGC, WavLM-large + KSGC reduces AliMeeting DER to 17.6% (a 2.62-point gain over baseline AHC). Ablations show that targeted single-layer FiLM outperforms multi-layer injection and output-level fusions (Weighted Sum/Gating), and larger replication factors are critical for datasets with frequent speaker turns like AliMeeting.

| System Condition | AMI (DER %) | AliMeeting (DER %) | AISHELL-4 (DER %) |
| --- | --- | --- | --- |
| WavLM-large (Unknown) | 14.5 | 14.8 | 10.6 |
| FiLM single (5,8) (Unknown) | 14.1 | 13.0 | 10.6 |
| WavLM-large + AHC (Mixed) | 15.5 | 19.6 | 12.4 |
| WavLM-large + KSGC (Mixed) | 15.2 | 17.6 | 12.3 |

## Limitations

The framework incurs higher computational and memory footprints during segmentation by concurrently executing both WavLM and the OWSM-Encoder backbone without freezing. The optimal replication factor in KSGC is empirically tuned per corpus (ranging from 5 to 150) rather than dynamically adapted. Furthermore, the approach does not yet propagate known-speaker information upstream into the segmentation stage.

## Why read this

Speech and ML researchers focusing on speaker diarization and robust meeting transcription will appreciate this concrete blueprint for fusing ASR-derived linguistic representations into acoustic models via FiLM and solving partial-enrollment clustering via weighted replication.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription, multi-speaker conversational analysis, speaker-attributed ASR systems, and corporate conferencing analytics.

## Institutions / 機構

Institute of Science Tokyo, Honda Research Institute Japan

## Related

- (link related pages by id as the wiki grows)
