---
id: pang26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2044
pdf: https://www.isca-archive.org/interspeech_2026/pang26_interspeech.pdf
---

# USDnet++: Distilling Signal Processing Based Dereverberation for Unsupervised Neural Speech Dereverberation

[PDF](https://www.isca-archive.org/interspeech_2026/pang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2044)

**TL;DR** — USDnet++ enhances unsupervised neural speech dereverberation by incorporating signal processing-based weak supervision.

## Problem

Unsupervised neural speech dereverberation models like USDnet avoid relying on unrealistic simulated paired data by enforcing reconstruction constraints, but they lack direct target guidance and are bounded by the accuracy of purely blind estimation. Standard signal processing algorithms can boost target speech SNR but suffer from algorithmic limits when used alone. Integrating these signal processing results as weak supervision helps bridge the gap between purely blind neural methods and conventional enhancement techniques.

## Method

The paper introduces USDnet++, extending USDnet by adding an SPD-constrained training loss alongside the mixture-constraint loss. It leverages conventional signal processing dereverberation algorithms—specifically weighted prediction error (WPE) and convolutional beamforming (WPD)—supported by unsupervised DNN estimates to generate high-SNR virtual microphone target signals. The framework utilizes a multi-stage refinement process where the neural model and signal-processing outputs alternate to iteratively improve each other. Additionally, it investigates feeding the derived SPD results directly as extra input features into a re-trained DNN model.

## Results

The evaluation is conducted on the WSJ0CAM-DEREVERB dataset using standard speech enhancement and dereverberation metrics. The proposed USDnet++ method demonstrates superior dereverberation performance compared to baseline USDnet and conventional signal processing approaches. The paper validates the efficacy of the additional SPD-constrained loss term, the multi-stage refinement strategy, and the feature-level integration of SPD outputs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers working on distant-speech automatic recognition or communication systems in reverberant environments without clean training data.

## Related

- (link related pages by id as the wiki grows)
