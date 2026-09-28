---
id: xu26q_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2614
pdf: https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf
---

# Continual Generalized Category Discovery for Acoustic Signals via Instance-Adaptive Regularization and Dynamic Teacher Guidance

[PDF](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2614)

**TL;DR** — This paper proposes an acoustic-specific Continual Generalized Category Discovery framework using instance-adaptive regularization and a dynamic teacher, achieving 74.14% cumulative average accuracy on ShipsEar.

## Problem

Real-world acoustic systems encounter continuous streams of non-stationary sound categories with overlapping spectro-temporal profiles, requiring models to discover novel classes without forgetting legacy knowledge. Directly applying vision-centric C-GCD methods to audio fails due to severe spectral overlap, polyphony, and base-class bias. Furthermore, this setting is rehearsal-free, meaning historical data cannot be stored or accessed.

## Method

The framework utilizes an AudioMAE backbone within an Exponential Moving Average (EMA) teacher-student architecture to process unlabelled streaming audio. An instance-adaptive entropy regularization mechanism splits batches into high- and low-confidence subsets via a Gaussian Mixture Model (GMM) driven adaptive threshold, balancing legacy knowledge consolidation with hierarchical entropy maximization for novel discovery. Feature-level distillation and selective updates restrict classifier shifts to mitigate semantic drift and base-class bias.

## Results

Evaluated on ShipsEar (5/1 protocol) and LibriSpeech (50/10 and 80/10 protocols) using cumulative average accuracy (CAA), old-class accuracy, and novel-class accuracy. On ShipsEar, the method achieves 74.14% cumulative average accuracy (a 4.84 percentage point improvement over the Happy baseline). On LibriSpeech under the 80/10 setting, it achieves 86.51% CAA-All, 87.64% CAA-Old, and 74.73% CAA-New, outperforming Happy by 6.63 points overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers deploying open-world acoustic perception systems, such as underwater surveillance, environmental noise monitoring, and dynamic speech applications that require continuous, unsupervised category discovery.

## Limitations

While overall accuracy and old-class retention improve significantly, novel-class discovery on certain subsets like ShipsEar still has room for improvement.

## Related

- (link related pages by id as the wiki grows)
