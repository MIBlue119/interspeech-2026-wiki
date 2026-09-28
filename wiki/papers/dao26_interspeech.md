---
id: dao26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-676
pdf: https://www.isca-archive.org/interspeech_2026/dao26_interspeech.pdf
---

# Linguistic Bias Mitigation for Spoofing Detection via Gradient Reversal and A Variational Information Bottleneck

[PDF](https://www.isca-archive.org/interspeech_2026/dao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-676)

**TL;DR** — This paper proposes a linguistic-invariant spoofing detection framework using adversarial teacher-student learning and a variational information bottleneck, achieving up to a 36.2% relative EER reduction across nine out-of-domain datasets compared to the baseline.

## Problem

State-of-the-art spoofing detectors often suffer from poor cross-dataset generalization because they exploit dataset-specific shortcuts like linguistic bias rather than genuine acoustic artifacts. The authors demonstrate that training sets like ASVspoof 5 exhibit a structural mismatch where bona fide and spoofed utterances have distinct linguistic content distributions. If models rely on what is being said instead of how the speech is generated, their performance collapses when deployed on unseen domains with different text distributions.

## Method

The framework utilizes a frozen linguistic-aware teacher model trained on an English Common Voice subset (10.3k phrases, 158k utterances) using an XLSR encoder and a Multi-Head Factorized Attentive (MHFA) classifier. The student detector shares an XLSR front-end and is jointly optimized for spoofing classification and phrase linguistic content classification. A Gradient Reversal Layer (GRL) is placed between the feature extractor and the linguistic head to adversarially minimize linguistic information in the shared representations. To prevent the complete destruction of valuable non-linguistic cues, a Variational Information Bottleneck (VIB) is integrated into the linguistic branch (MHFA-VIB) using a Kullback-Leibler divergence penalty against a standard normal prior. Training uses the ASVspoof 5 dataset augmented with MUSAN and RIR data, optimized via Adam at a 10^-6 learning rate for 30 epochs on NVIDIA A100 GPUs with loss weights alpha=0.1 and beta=0.1.

## Results

Evaluated across nine out-of-domain English datasets from the Speech DF Arena (including In-the-Wild, ASVspoof 2019/2021, FoR, CodecFake, DFADD, LibriSeVox, and SONAR) using Equal Error Rate (EER). The proposed MHFA-IVLing-VIB model reduces the pooled EER from the standard MHFA baseline of 13.67% down to 8.72%, representing a substantial generalization boost. The standalone linguistic invariance (MHFA-IVLing) achieves a pooled EER of 9.56%, while adding the VIB regularization (MHFA-IVLing-VIB) further improves performance by preventing the over-suppression of useful acoustic artifacts. Relative EER reductions reach up to 36.2% depending on the specific evaluation benchmark compared to standard MHFA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust voice biometric security systems and audio deepfake detectors that need to generalize reliably to unseen out-of-domain datasets and mismatched text contents.

## Limitations

The current framework is evaluated specifically on English-language datasets due to the availability of the linguistic teacher model setup.

## Related

- (link related pages by id as the wiki grows)
