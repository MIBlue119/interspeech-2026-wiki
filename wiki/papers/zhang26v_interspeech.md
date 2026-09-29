---
id: zhang26v_interspeech
category: phonetics-linguistics
institutions: ["University of Southern California"]
code: https://github.com/pkuzyb/larynx_segmentation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1402
pdf: https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.pdf
---

# Larynx segmentation in mid-sagittal speech production real-time MRI

*Yubin Zhang, Xuan Shi, Kevin Huang, Prakash Kumar, Kevin Lee, Louis Goldstein, Krishna Nayak, Shrikanth Narayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1402)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper introduces a Mask2Former-based deep learning pipeline for automated larynx segmentation in low-field (0.55T) real-time speech MRI, demonstrating that 33-79 annotations per participant are sufficient before hitting diminishing returns. It uses this pipeline to conduct a phonetic study on Mandarin tones, revealing fine-grained spatiotemporal dynamics of intrinsic and extrinsic pitch control.

## Key contributions

- Proposes the first comprehensive automated Mask2Former pipeline (with a ResNet-50 backbone) for segmenting six fine-grained laryngeal structures in mid-sagittal real-time speech MRI.
- Systemematically evaluates annotation scaling (from 1% to 100%), establishing that a 5% marginal gain threshold is reached at 25% to 60% of data (~33-79 annotations per speaker).
- Implements a Mean Teacher semi-supervised refinement framework leveraging 14,456 unlabeled frames to boost low-data performance, while honestly noting occasional performance degradation.
- Applies the segmentation pipeline to a phonetic study of Mandarin tones across four speakers, quantifying vocal fold length, larynx height, thyroid angle, ventricle distance, and aryepiglottic distance.

## Problem

Investigating the spatiotemporal dynamics of the larynx via speech real-time MRI has historically lagged behind supraglottal vocal tract research due to technical imaging challenges and the scarcity of expert annotations. Existing segmentation frameworks (such as U-Net or Mask R-CNN architectures) primarily focus on the vocal tract or rely on high-field 1.5T/3T data, providing no guidance on required annotation budgets, especially for challenging low-field 0.55T MRI scans. Furthermore, laryngeal behaviors like pitch control and constriction mechanisms remain poorly quantified in linguistic studies of tone, voicing, and phonation.

## Method

The architecture utilizes Mask2Former with a ResNet-50 backbone, initialized with pre-trained weights from the COCO dataset and implemented via Detectron2. The training set consists of 794 labeled mid-sagittal real-time MRI frames (2.3 x 2.3 mm² spatial resolution, 99 f/s frame rate) collected from two Mandarin and four Yoruba speakers, covering six anatomical structures: thyroid cartilage, ventricle, vocal folds, arytenoid cartilages, epiglottis, and ventricular folds. To exploit a pool of 14,456 unlabeled frames from multiple languages (Mandarin, Cantonese, Yoruba, Tswana), a Mean Teacher semi-supervised framework is introduced. The teacher model (updated via Exponential Moving Average with smoothing coefficient alpha = 0.999) generates pseudo-labels on weakly augmented images using a confidence threshold of 0.85, while the student model is optimized on strongly augmented images (random Rician noise and blur) using a composite loss function with an unlabeled weight factor lambda = 0.5.

Inference generates binary segmentation masks per frame, which are subsequently processed for phonetic analysis. Five geometric laryngeal metrics are extracted: vocal fold length (anterior-posterior axis extent via PCA), larynx height (average y-coordinate of masks), thyroid angle (vertical PCA axis tilt relative to image horizontal), vertical ventricle distance (average vertical air space gap), and aryepiglottic distance (mean gap between epiglottis and arytenoid cartilages). These variables are temporally aligned with fundamental frequency (f0) extracted via Praat's autocorrelation algorithm from simultaneous audio recordings.

## Experimental setup

The labeled dataset contains 794 training, 251 validation, and 235 test images from 0.55T MRI scans. The unlabeled dataset contains 14,456 frames. Performance is evaluated using Average Precision (AP) and Dice Similarity Coefficient (DSC) across different annotation fractions (1% to 100%).

## Results

Supervised fine-tuning shows rapid performance gains in the low-data regime, with AP and DSC marginal gains dropping below a 5% threshold at ~60% and ~25% of the data respectively, indicating diminishing returns past 33-79 annotations per participant. Larger structures achieve higher accuracy (arytenoid cartilage: 0.527 AP, 0.861 DSC; epiglottis: 0.320 AP, 0.781 DSC; vocal folds: 0.302 AP, 0.779 DSC), whereas smaller and deformable structures are harder to segment (ventricular folds: 0.144 AP, 0.670 DSC; ventricle: 0.133 AP, 0.660 DSC; thyroid cartilage: 0.125 AP, 0.656 DSC). Semi-supervised learning yields modest AP improvements (e.g., +0.0398 for vocal folds, +0.0332 for ventricle) but exhibits slight performance degradation for specific structures like arytenoids (-0.00353 DSC) and ventricular folds (-0.00829 DSC) under extreme low-data conditions.

| Structure | AP | DSC | AP SSL Gain | DSC SSL Gain |
|---|---|---|---|---|
| Arytenoid Cartilage | 0.527 | 0.861 | +0.0209 | -0.00353 |
| Epiglottis | 0.320 | 0.781 | +0.00232 | +0.00452 |
| Vocal Folds | 0.302 | 0.779 | +0.0398 | +0.0142 |
| Ventricular Folds | 0.144 | 0.670 | +0.0141 | -0.00829 |
| Ventricle | 0.133 | 0.660 | +0.0332 | +0.0300 |
| Thyroid Cartilage | 0.125 | 0.656 | +0.0184 | +0.0118 |

## Limitations

The study is constrained by data from a single 0.55T low-field MRI scanner setup, limiting direct generalizability to high-field 1.5T or 3T imaging systems where soft tissue boundaries appear differently. Semi-supervised learning shows unstable behavior with occasional performance drops in extreme low-data conditions (e.g., 2.5% data condition). Furthermore, the thyroid cartilage metric exhibited noticeable noise across annotation fractions, indicating that structural ambiguity in mid-sagittal views still challenges fully automated extraction.

## Why read this

Speech researchers and machine learning engineers working on biomedical image segmentation or articulatory phonetics should read this to understand annotation scaling laws for low-field MRI and how to adapt Mask2Former for highly deformable laryngeal structures.

## Code

- https://github.com/pkuzyb/larynx_segmentation

## Applications

Automated analysis of laryngeal dynamics for phonetic research, speech pathology diagnostics, and computational modeling of linguistic tone, voicing, and phonation.

## Institutions / 機構

University of Southern California

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
