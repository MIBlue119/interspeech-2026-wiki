---
id: yi26_interspeech
category: deepfake-security
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-157
pdf: https://www.isca-archive.org/interspeech_2026/yi26_interspeech.pdf
---

# Exploring the Scale and Diversity of Speech Anti-spoofing Datasets: Experiments and Analysis

*Zhuolin Yi, Jun Xue, Yanzhen Ren, Yihuan Huang, Yi Chai, Daixian Li, Guanxiang Feng, Jiajun Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/yi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-157)

**Category:** `deepfake-security` · **Labels:** `robustness-noise`

**TL;DR** — This study challenges the 'scale-first' paradigm in speech anti-spoofing by showing that indiscriminately scaling training data under fixed generation methods yields diminishing returns and hurts cross-domain generalization, whereas prioritizing attack diversity significantly improves robustness.

## Key contributions

- Identifies a non-monotonic relationship between training data scale and performance, where excessive sampling from fixed generation domains leads to overfitting and degraded cross-domain generalization.
- Proves that data diversity outweighs raw scale; a smaller composite set (63k utterances, 53 generation methods) outperforms multi-thousand-hour datasets with limited generator diversity in cross-dataset evaluations.
- Conducts controlled parallel experiments on Speechfake-BD and ASVspoof5 using random sampling at 1%, 5%, 10%, 20%, 50%, and 100% proportions.
- Establishes a rigorous cross-domain benchmark evaluation across In-the-Wild, VoiceWukong, FSW, CD-ADD, and Spoofceleb.

## Problem

Over the past decade, speech anti-spoofing training sets have grown exponentially—ranging from ASVspoof2015's 16 hours to AntiDeepfake's 74,000 hours—driven by the assumption that larger datasets universally improve generalization. However, prior large-scale efforts incur exorbitant computational costs (e.g., eight NVIDIA H100 GPUs) while delivering marginal performance gains (e.g., a ~1% improvement for an 86-fold increase in scale). The research community lacked a controlled isolation of whether performance gains stem from raw scale or attack diversity, risking wasted compute on redundant, single-domain samples.

## Method

The study executes two structured, controlled experimental pipelines to decouple scale and diversity using a fixed downstream architecture. For the scale experiments, two representative source datasets are used: Speechfake-BD (bilingual Chinese/English, 30 generation methods, 704k total utterances, 859 hours) and ASVspoof5 (English, 8 generation methods, 182k total utterances, 604 hours). Each dataset is randomly sampled at 1%, 5%, 10%, 20%, 50%, and 100% proportions while keeping the generation method set constant. For the diversity experiments, a composite training set of 63,000 fake utterances is constructed by uniformly drawing 1,000 samples per generation method across ASVspoof5 (8 methods, 8k), Speechfake-BD (30 methods, 30k), CD-ADD (5 methods, 5k), and Spoofceleb (10 methods, 10k), alongside 10,000 real samples drawn exclusively from Speechfake-BD, resulting in a total duration of 94 hours across 53 distinct generation methods.

All experiments employ a unified architecture—the Wav2Vec-AASIST model utilizing the official XLS-R 300M pretrained self-supervised backbone—coupled with RawBoost data augmentation during training. This fixed-capacity setup isolates training data effects by removing architectural confounders. Model selection and monitoring are performed using the original development sets of the respective source datasets, and evaluation is carried out using Equal Error Rate (ERR%) across in-domain and out-of-domain test sets (including CD-ADD, Spoofceleb, FSW, In-the-Wild, and VoiceWukong).

## Experimental setup

Datasets include Speechfake-BD (859 hours train), ASVspoof5 (604 hours train), CD-ADD (278 hours train), Spoofceleb (1,982 hours train, 2.5M utterances), FSW, In-the-Wild, and VoiceWukong. Evaluated via Equal Error Rate (EER%). Built upon the Wav2Vec-AASIST model with an XLS-R 300M frozen/pretrained backbone and RawBoost augmentation.

## Results

In scale experiments, model performance exhibits an initial rise followed by a decline rather than monotonic scaling. For Speechfake-BD, cross-domain generalization peaks at just the 20% data scale, after which further scaling degrades performance due to overfitting. For ASVspoof5, optimal cross-domain performance occurs at the 10% or 20% mark rather than the full 100% dataset.

In diversity experiments, the compact 94-hour composite training set containing 53 generation methods achieves an average cross-domain EER of 13.03%, outperforming the massive Spoofceleb dataset (1,982 hours, 10 methods, 19.67% average EER), Speechfake-BD (859 hours, 30 methods, 17.52%), ASVspoof5 (604 hours, 27.92%), and CD-ADD (278 hours, 21.65%). Specifically, on the In-the-Wild benchmark, the composite model achieves a 2.06% EER, beating Speechfake-BD (2.63%) and Spoofceleb (3.57%).

| Train System | Train dur (h) | #gen | Avg EER% | In-the-Wild EER% | VoiceWukong EER% | FSW EER% |
|---|---|---|---|---|---|---|
| Composite | 94 | 53 | **13.03** | **2.06** | **19.46** | **17.58** |
| CD-ADD | 278 | 5 | 21.65 | 9.83 | 25.20 | 29.91 |
| ASVspoof5 | 604 | 8 | 27.92 | 17.20 | 32.52 | 34.05 |
| Speechfake-BD | 859 | 30 | 17.52 | 2.63 | 26.28 | 23.64 |
| Spoofceleb | 1982 | 10 | 19.67 | 3.57 | **23.58** | 31.85 |

## Limitations

The study relies exclusively on random sampling subsets rather than advanced informative sample selection strategies (e.g., entropy-based sampling) which could further mitigate data redundancy. Model capacity is held fixed at 300M parameters (XLS-R), leaving the interaction between scaling laws, model capacity upper bounds, and data diversity unexplored. Real data sources in the composite set were restricted solely to Speechfake-BD.

## Why read this

Speech/ML researchers designing anti-spoofing data collection pipelines should read this to reallocate budgets away from brute-force data scaling toward generator diversity, avoiding the diminishing returns and cross-domain overfitting demonstrated here.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust deepfake speech detection systems for voice authentication, cybersecurity, fraud prevention, and social media moderation.

## Institutions / 機構

Wuhan University

**Funding / 經費:** Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
