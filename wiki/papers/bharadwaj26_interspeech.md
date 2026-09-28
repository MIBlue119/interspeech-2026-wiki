---
id: bharadwaj26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1462
pdf: https://www.isca-archive.org/interspeech_2026/bharadwaj26_interspeech.pdf
---

# An Empirical Recipe for Universal Phone Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/bharadwaj26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bharadwaj26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1462)

**TL;DR** — PhoneticXEUS is a state-of-the-art multilingual phone recognition model that achieves 17.7% PFER on multilingual datasets and 10.6% PFER on accented English by combining massively multilingual SSL features with Self-Conditioned CTC training.

## Problem

English-focused phone recognition models fail to generalize to diverse multilingual settings, while existing multilingual systems underutilize pretrained representations and have not systematically explored the design space of training objectives and data scale. Understanding how data scale, model architecture, and loss formulations interact is critical for building robust phone recognition systems for zero text-resource languages, atypical speech assessment, and linguistic fieldwork.

## Method

The authors perform controlled ablations across loss functions, backbones, and data scales using the PRiSM evaluation scheme. The final recipe adopts XEUS—a 580M-parameter E-Branchformer speech encoder pretrained via HuBERT-style masked prediction across 4,000 languages—as the backbone. The model is finetuned using Self-Conditioned CTC (SelfCTC) on IPAPack++, a 17,000-hour multilingual dataset of G2P-generated IPA labels. SelfCTC feeds soft phonetic posteriors from intermediate layers back into deeper encoder layers via learnable linear projections to refine predictions.

## Results

Evaluated on the PRiSM benchmark, PhoneticXEUS achieves SOTA results with 17.7% PFER on multilingual datasets and 10.6% PFER on accented English, outperforming large language models and prior multilingual systems. Ablations show that SelfCTC outperforms vanilla CTC (17.7 vs 18.8 PFER multilingually), and XEUS outperforms supervised E-Branchformer trained from scratch (19.6 vs 23.1 PFER). Scaling the multilingual training data from 150k to 600k utterances steadily improves multilingual performance without degrading English accuracy. Cross-lingual analyses show SSL initialization improves performance across 19 of 21 language families in VoxAngeles and yields error rate reductions across 187 of 192 accents on PR-saa.

## Code

- https://github.com/changelinglab/PhoneticXeus

## Applications

Speech and ML engineers working on zero-resource language processing, computer-assisted language learning, atypical speech assessment, and phonetic fieldwork.

## Limitations

Performance remains challenged by short duration monosyllabic utterances, missing glottal stops, child/female acoustic variations, and features relying on temporal acoustic cues such as vowel tenseness and delayed release.

## Related

- (link related pages by id as the wiki grows)
