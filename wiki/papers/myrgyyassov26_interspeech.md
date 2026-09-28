---
id: myrgyyassov26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1664
pdf: https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.pdf
---

# Automated Measurement of Geniohyoid Muscle Thickness During Speech Using Deep Learning and Ultrasound

*Alisher Myrgyyassov, Bruce Xiao Wang, Yu Sun, Shuming Huang, Zhen Song, Min Ney Wong, Yongping Zheng*

[PDF](https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1664)

**TL;DR** — SMMA is a fully automated deep learning and skeleton-based framework that measures geniohyoid muscle thickness from ultrasound speech videos, achieving near-human segmentation accuracy (Dice 0.9037) and strong thickness correlation (r = 0.901).

## Key contributions

- Proposes SMMA, a two-component pipeline combining deep learning image segmentation with skeleton-based morphometric thickness extraction for geniohyoid muscle analysis.
- Benchmarks multiple deep learning segmentation architectures (Attention UNet, UNet, UltraUNet, SwinUNet, DeepLab v3) against human inter-annotator agreement on ultrasound speech data.
- Validates automated thickness extraction against expert sonographer manual measurements across random and clinically selected frames (MAE of 0.53 mm for high-quality images).
- Demonstrates physiological applicability by revealing systematic geniohyoid thickness variations during Cantonese vowel production (/a:/ vs /i:/, Cohen's d > 1.3).

## Problem

Ultrasound studies of speech articulation have historically concentrated on surface tongue contour tracking, while deeper muscles like the geniohyoid (GH) remain largely unexamined due to visualization difficulties and operator variability. Manual muscle boundary delineation from ultrasound is intensely time-consuming, subjective, and introduces severe inter-rater bottlenecks that prevent large-scale phonetic and clinical investigations. Prior work on muscle ultrasound focuses primarily on swallowing disorders or sarcopenia rather than speech motor control. Developing a validated automated framework is essential to unlock scalable morphological studies of tongue and jaw coordination during speech.

## Method

The SMMA framework operates in two sequential components. Component 1 handles image standardization (cropping, resizing, and normalization to 224x224 pixels) followed by a deep learning segmentation network. The segmentation models are trained for 50 epochs with early stopping (patience 10) using a combined loss function of Dice loss (weight 0.8) and Focal loss (weight 0.2), alongside ultrasound-specific online data augmentations. Among tested backbones, UltraUNet (4.45M parameters) is chosen for its superior speed (250 masks/s) and boundary precision. 

Component 2 post-processes the binary output mask using morphological closing, opening, hole-filling, and Gaussian smoothing to preserve connectivity of the largest component. A skeletonization algorithm extracts the one-pixel-wide medial axis (spine) from the smoothed mask. Local thickness is computed as double the perpendicular distance from each skeleton point to opposite sides of the muscle boundary. To reject edge artifacts, the mean thickness is derived exclusively from the interquartile range (25th to 75th percentile) of the skeleton points. 

The pipeline is evaluated on synchronized 30 fps B-mode ultrasound video and audio recordings acquired using a SuperSonic Imagine Aixplorer scanner with an SC6-1 convex probe positioned submentally along the midsagittal plane. Inference runs frame-by-frame to enable continuous tracking of muscle kinematics across phonetic sequences.

## Experimental setup

The dataset comprises 1650 annotated B-mode ultrasound images sampled from 5 male and 6 female healthy Cantonese speakers performing isolated vowels, consonants, and syllable sequences (split 7:2:2 by subjects for train/validation/test). Models are benchmarked against human inter-annotator agreement (evaluated across three trained annotators). Thickness extraction is validated against 110 images manually measured by an expert sonographer (55 random, 55 clinically selected for superior visualization). Metrics include Dice coefficient, Intersection over Union (IoU), 95th percentile Hausdorff distance (HD95), Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and Pearson correlation coefficient (r).

## Results

UltraUNet achieves the best segmentation performance with a mean Dice of 0.9037 ± 0.0035 and IoU of 0.8263 ± 0.0057, closely matching human inter-annotator agreement (Dice 0.90–0.91) while outperforming UNet (Dice 0.8870) and SwinUNet (Dice 0.8159). For thickness extraction, SMMA achieves an MAE of 0.53 mm and Pearson r = 0.901 on clinically selected high-quality images, compared to an MAE of 0.88 mm and r = 0.707 on randomly sampled images featuring acoustic shadows and blur.

Applying SMMA to vowel production reveals that /a:/ exhibits significantly greater geniohyoid thickness (7.29 mm) than /i:/ (5.95 mm) with large effect sizes (Cohen's d > 1.3), aligning with increased suprahyoid activation during jaw lowering. Male subjects show 5-8% greater absolute muscle thickness than females, reflecting anatomical scaling.

| System / Condition | Dice | IoU | MAE (mm) | Pearson r |\n|---|---|---|---|---|\n| Ann1 vs Ann2 (Human) | 0.9179 | 0.8493 | - | - |\n| UltraUNet | 0.9037 | 0.8263 | - | - |\n| UNet | 0.8870 | 0.8016 | - | - |\n| DeepLab v3 | 0.8792 | 0.7874 | - | - |\n| SwinUNet | 0.8159 | 0.7006 | - | - |\n| SMMA (Clinical Images) | - | - | 0.53 | 0.901 |

## Limitations

The study relies on a modest sample size of 11 speakers restricted to a single language (Cantonese) and recorded by a single sonographer. Image quality severely impacts performance, with random frames showing higher error (MAE 0.88 mm) due to blur and acoustic shadows. The skeleton-based thickness algorithm assumes relatively uniform muscle morphology and may produce artifacts when presented with highly irregular configurations or continuous speech coarticulation.

## Why read this

Speech researchers and biomedical engineers building automated articulatory analysis tools will find a complete, reproducible recipe for deep learning ultrasound segmentation and skeleton-based muscle morphometry. It bridges the gap between raw ultrasound imaging and quantitative phonetic motor control studies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical assessment of speech and swallowing disorders (such as dysarthria), monitoring rehabilitation progress, and large-scale phonetic investigations of speech motor control.

## Related

- (link related pages by id as the wiki grows)
