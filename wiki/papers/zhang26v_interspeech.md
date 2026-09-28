---
id: zhang26v_interspeech
category: speech-production
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1402
pdf: https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.pdf
---

# Larynx segmentation in mid-sagittal speech production real-time MRI

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1402)

**TL;DR** — This study introduces a deep learning pipeline using Mask2Former and semi-supervised refinement for automated larynx segmentation in mid-sagittal speech production real-time MRI, demonstrating that satisfactory performance is achieved with ~33-79 annotations per participant.

## Problem

Phonetic research on laryngeal behaviors (such as voicing, tone, and phonation) has historically relied on invasive or low-detail modalities like laryngoscopy and ultrasound because existing speech MRI research predominantly focuses on supraglottal articulators. Automated segmentation pipelines for laryngeal structures are scarce, and the required annotation effort for low-field MRI data as well as the utility of semi-supervised learning remain systematically unquantified.

## Method

The authors employ the Mask2Former architecture with a ResNet-50 backbone, initialized with pre-trained COCO weights and fine-tuned using a 0.55T real-time MRI speech dataset. A Mean Teacher-style semi-supervised learning framework is introduced, where a teacher model generates pseudo-labels (confidence threshold 0.85) on weakly augmented unlabeled data to guide a student model trained on strongly augmented data with a composite loss. The dataset comprises 794 training images, 251 validation images, 235 test images, and 14,456 unlabeled images across multiple tone languages (Mandarin, Yoruba, Cantonese, Tswana). Six laryngeal structures are segmented: thyroid cartilage, ventricle, vocal folds, arytenoid cartilages, epiglottis, and ventricular folds.

## Results

Evaluated using Average Precision (AP) and Dice Similarity Coefficient (DSC), the fully supervised baseline shows that performance gains drop below a 5% marginal threshold after using roughly 25% to 60% of the training annotations (~33-79 annotations per participant). Semi-supervised learning yields modest performance improvements in mid- to low-data regimes but occasionally degrades performance and fails to reach a fully supervised upper bound. A phonetic case study on Mandarin tones successfully extracts five laryngeal variables (vocal fold length, larynx height, thyroid angle, vertical ventricle distance, and aryepiglottic distance), revealing consistent alignment between laryngeal dynamics (such as thyroid tilt and laryngeal constriction) and fundamental frequency.

## Code

- https://github.com/pkuzyb/larynx_segmentation

## Applications

Speech scientists, phoneticians, and linguists studying fine-grained laryngeal dynamics, speech production mechanisms, and linguistic contrasts like tone, intonation, and phonation types.

## Limitations

Semi-supervised learning provides only modest and sometimes negative gains compared to fully supervised models, and certain variables like thyroid angle require more annotations to reduce trajectory noise.

## Related

- (link related pages by id as the wiki grows)
