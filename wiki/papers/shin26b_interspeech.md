---
id: shin26b_interspeech
category: audio-understanding
institutions: ["Ewha Womans University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2320
pdf: https://www.isca-archive.org/interspeech_2026/shin26b_interspeech.pdf
---

# EchoLoc: Audio-Aware Object Grounding via Joint Heatmap and Box-Level Localization

*Junghwa Shin, Yeonwoo Kim, HyungJune Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/shin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2320)

**Category:** `audio-understanding`

**TL;DR** — EchoLoc is an audio-aware object grounding framework that jointly trains a heatmap prediction module and a query-based object box detector to localize sound-producing visual regions without explicit bounding-box annotations, achieving a +17.08% relative improvement in AUC (adap) on Flickr-SoundNet-Test over state-of-the-art baselines.

## Key contributions

- Proposes EchoLoc, an audio-aware grounding framework adapting the query-based transformer detector of MDETR to incorporate audio information alongside visual and textual cues.
- Introduces a joint training strategy that combines spatial/global contrastive learning for heatmap generation with ROI-level object box prediction using pseudo boxes.
- Eliminates the requirement for explicit bounding-box annotations during training by deriving pseudo ground-truth boxes from audio-visual similarity heatmaps using a top-alpha probability mass threshold.
- Achieves strong adaptive performance on unconstrained multi-instance datasets, recording 88.22 cIoU (adap) and 79.99 AUC (adap) on Flickr-SoundNet-Test.

## Problem

Conventional vision-language grounding models (e.g., MDETR) predict open-vocabulary bounding boxes using text, but they fail to utilize non-visual acoustic cues and degrade significantly under noisy or incomplete ASR captions. Conversely, self-supervised Sound Source Localization (SSL) methods learn audio-visual similarity heatmaps, but these maps are typically blurry, lack precise object-level boundaries, and rely on post-processing heuristics that cannot be optimized end-to-end. Without box annotations, training an end-to-end object detector with only weak audio-visual signals risks a bootstrap paradox where the model destabilizes from learning its own imperfect predictions. This creates a need for an integrated framework that can map weak sound cues into sharp object-centric bounding boxes without manual box supervision.

## Method

EchoLoc takes a single image frame and a synchronized audio signal as input, processing them through modality-specific encoders. The visual stream uses a ResNet-101 backbone initialized from MDETR, while the audio stream uses a frozen PANNs CNN14 to extract global audio features, deliberately avoiding heavier transformer-based audio encoders like AST for efficiency.

The framework consists of two parallel, jointly-trained modules. The heatmap prediction module computes pixel-wise audio-visual similarity to generate soft spatial heatmaps using spatial contrastive loss (L_spa, aggregating features via log-sum-exp pooling to emphasize relevant spots) and global contrastive loss (L_glob, aligning scene-level pooled representations). To supervise the box prediction module without manual boxes, EchoLoc thresholds the similarity heatmap at the top-alpha probability mass (alpha = 0.4) to extract tight bounding boxes, treating them as pseudo ground-truth targets.

The box prediction module employs an MDETR-based transformer encoder-decoder. It performs early fusion by feeding visual feature maps and global audio features into a cross-modal self-attention encoder. The decoder then processes object queries by attending to these fused features and uses Hungarian matching based on audio-conditioned classification costs and box regression costs (L1 and GIoU loss). Rather than treating pseudo boxes as rigid targets, the query-based design explores diverse candidate boxes and selects the one with the highest audio-visual similarity, allowing the box predictor to refine raw heatmap cues into crisp object boundaries under a total joint loss of L = L_spa + L_glob + L_box.

## Experimental setup

The model is trained on 200k video clips from VGGSound and 144k image-audio pairs from Flickr-SoundNet-144K. Evaluation is conducted on VGG-SS and Flickr-SoundNet-Test, each containing approximately 5,000 annotated image-audio pairs. Models are optimized using AdamW with a batch size of 32 for 40 epochs (taking roughly 15 hours) on a single NVIDIA GeForce RTX 3090 GPU (24 GB VRAM). Loss weights are set to 0.5 for classification, 2.5 for box regression, and 1.0 for GIoU, with a heatmap temperature of 0.15 and pseudo mass threshold of 0.4. Baselines include Attention, CoarseToFine, LCBM, LVS, HardPos, SSPL, EZ-VSL, SLAVC, MarginNCE, and FNAC, evaluated via cIoU, cIoU (adap), AUC, and AUC (adap).

## Results

On the VGG-SS benchmark, EchoLoc achieves a cIoU of 36.36 and an AUC of 38.28, remaining competitive with state-of-the-art fully supervised or contrastive baselines like MarginNCE (38.25 cIoU) and FNAC (39.50 cIoU) despite lacking explicit box annotations. On the unconstrained Flickr-SoundNet-Test dataset, EchoLoc attains 84.34 cIoU, 88.22 cIoU (adap), 54.29 AUC, and 79.99 AUC (adap), yielding a massive +17.08% relative improvement in AUC (adap) over previous state-of-the-art methods.

Ablation studies isolating the box prediction head demonstrate its critical impact: using only the heatmap prediction module yields 31.73 cIoU and 32.06 AUC on VGG-SS, whereas adding the box prediction module boosts cIoU by +4.63 points (to 36.36) and AUC by +6.22 points (to 38.28). However, EchoLoc's fixed-threshold AUC on Flickr-SoundNet drops to 54.29, which the authors attribute to calibration sensitivity and heatmap scale distributions in multi-instance ambiguous scenes.

| System | VGG-SS cIoU | VGG-SS AUC | Flickr cIoU(adap) | Flickr AUC(adap) |
|---|---|---|---|---|
| LVS [6] | 30.30 | 36.40 | 77.20 | 62.72 |
| EZ-VSL [7] | 35.96 | 38.20 | 78.00 | 63.82 |
| MarginNCE [21] | 38.25 | 39.06 | 86.00 | 68.32 |
| FNAC [22] | 39.50 | 39.66 | 84.40 | 64.16 |
| EchoLoc (Ours) | 36.36 | 38.28 | 88.22 | 79.99 |

## Limitations

The framework's box-level predictions are bottlenecked by the quality of the underlying heatmap estimation, since both pseudo-box supervision and query box selection rely entirely on heatmap-derived audio-visual similarity. The evaluation is restricted to static image-audio frame pairs rather than full continuous video streams. Additionally, the fixed-threshold AUC scores indicate calibration sensitivity across different dataset distributions, and the model has only been tested on standard audio-visual datasets (VGGSound and Flickr-SoundNet) without exploring dense multi-speaker or severely occluded real-world acoustic environments.

## Why read this

Researchers working on audio-visual grounding and multi-modal representation learning should read this paper to see how query-based object detectors can be bootstrapped using self-supervised spatial heatmaps without manual bounding-box annotations. It offers a clear recipe for converting weak spatial alignments into crisp object-level detections.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio-visual scene analysis, automated video editing, robotics sound source localization, and multi-modal surveillance systems requiring the identification of sound-producing objects in complex visual environments.

## Institutions / 機構

Ewha Womans University

## Related

- (link related pages by id as the wiki grows)
