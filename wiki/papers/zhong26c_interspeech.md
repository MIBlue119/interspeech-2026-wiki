---
id: zhong26c_interspeech
category: dysarthria
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1138
pdf: https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.pdf
---

# Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1138)

**TL;DR** — The paper introduces the Phoneme Error Decomposition (PED) feature family, combining frozen CTC phoneme recognizer posterior-uncertainty features and phoneme error rates to achieve a mean AUROC of 0.80 on primary dysarthric speech assessment dimensions.

## Problem

Prior automated dysarthric speech assessment methods either rely on black-box self-supervised learning embeddings that lack clinical interpretability or use alignment-based phoneme methods vulnerable to acoustic mismatch. Furthermore, coarse utterance-level summaries like word error rate miss localized articulatory disruptions, while manual clinical transcription is time-consuming and subjective.

## Method

The 11-feature PED suite comprises six reference-based phoneme error rates (PER, substitution, deletion, insertion, phonological feature error rate weighted by articulatory distance, and length ratio) and five reference-free confidence/uncertainty features. Uncertainty is modeled via an evidential deep learning (EDL) Dirichlet head applied to a frozen wav2vec2-xlsr-300m-timit-phoneme (315M parameters) to output evidence, aleatoric, and epistemic uncertainties, alongside a training-free margin-entropy (ME) score combining posterior margin and Shannon entropy. Probing is conducted using logistic regression for binary screening and LassoCV for ordinal grading on 11,168 samples from the Speech Accessibility Project (SAP) dataset covering five etiologies, accompanied by transparent depth-4 decision trees.

## Results

Evaluated on SAP across seven speech dimensions, the training-free ME score outperforms prior alignment-based goodness-of-pronunciation baselines, achieving an AUROC of 0.82 on Imprecise Consonants and 0.77 on Distorted Vowels. The full 11-feature PED achieves a mean AUROC of 0.80 on four primary dimensions (Imprecise Consonants, Distorted Vowels, Intelligibility, Naturalness), matching a strong HuBERT Large SSL baseline (0.81 AUROC). Combining PED with 12 acoustic features (PED+Ac12) raises screening AUROC to 0.83, surpassing HuBERT on harsh voice (0.78 vs. 0.74). A shallow decision tree built on PED maintains strong performance (mean AUROC 0.78) while providing an inspectable clinical decision pathway.

## Code

- https://github.com/Kanelmis/PED

## Applications

Speech-language pathologists and automated clinical systems seeking interpretable, objective tools to screen and grade motor speech disorders across multiple perceptual dimensions.

## Limitations

Limitations include skewed label distributions on secondary dimensions, linear probing models potentially underestimating complex feature interactions, and relying exclusively on numerical tabular features rather than direct sequence decoding.

## Related

- (link related pages by id as the wiki grows)
