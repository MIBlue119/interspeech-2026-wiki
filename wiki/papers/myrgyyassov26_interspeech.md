---
id: myrgyyassov26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1664
pdf: https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.pdf
---

# Automated Measurement of Geniohyoid Muscle Thickness During Speech Using Deep Learning and Ultrasound

[PDF](https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/myrgyyassov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1664)

**TL;DR** — The paper introduces SMMA, an automated framework combining deep learning segmentation and skeleton-based morphometric analysis to measure geniohyoid muscle thickness from ultrasound during speech, achieving near-human-level accuracy (Dice: 0.9037, MAE: 0.53 mm).

## Problem

Manual measurement of muscle morphology from ultrasound during speech is extremely time-consuming, subjective, and prone to inter-rater variability, which prevents large-scale phonetic and clinical studies. While ultrasound tongue imaging is common, the deeper geniohyoid muscle remains largely unexplored due to these measurement bottlenecks and poor visibility. Solving this gap is crucial for understanding speech motor control and objectively assessing speech and swallowing disorders.

## Method

The SMMA framework consists of two main components: automated deep learning segmentation and skeleton-based thickness extraction. For segmentation, various architectures (Attention UNet, UNet, UltraUNet, SwinUNet, DeepLab v3) were evaluated on 224x224px ultrasound frames, trained for 50 epochs using a combined Dice (0.8) and Focal (0.2) loss. UltraUNet (4.45M parameters) was selected as the backbone based on its superior accuracy and speed. The segmentation masks are post-processed via morphological operations and Gaussian smoothing, followed by skeletonization to extract the medial axis and compute local thickness as the double distance from skeleton points to boundaries.

## Results

Evaluated on a dataset of 1650 annotated B-mode ultrasound images from 11 Cantonese speakers (5 male, 6 female), UltraUNet achieved a mean Dice of 0.9037 and IoU of 0.8263, closely matching human inter-annotator agreement. For thickness extraction on clinically selected images, SMMA achieved a mean absolute error (MAE) of 0.53 mm and a strong correlation with sonographer ground truth (r = 0.901, p < 0.001). Vowel analysis revealed significantly greater geniohyoid thickness during /a:/ production (7.29 mm) compared to /i:/ (5.95 mm), reflecting greater muscle activation for mandibular depression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, phoneticians, and clinical speech-language pathologists can use this tool for scalable investigations of speech motor control and objective assessment of speech and swallowing disorders.

## Limitations

Performance is sensitive to image quality, with random images yielding higher errors (MAE 0.88 mm, r = 0.707) compared to clinically selected high-visibility frames.

## Related

- (link related pages by id as the wiki grows)
