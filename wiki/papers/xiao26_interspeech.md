---
id: xiao26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2215
pdf: https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.pdf
---

# Continual Adaptation for Pacific Indigenous Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2215)

**TL;DR** — An empirical investigation of adapting speech foundation models to low-resource Pacific Indigenous languages reveals that severe linguistic distance induces massive internal representational drift and a severe plasticity-stability dilemma during continual learning.

## Problem

Speech foundation models are predominantly evaluated on high-resource languages, leaving their generalization to typologically divergent and data-scarce Pacific languages largely unexplored. Adapting to these languages requires significant internal structural reorganization rather than smooth transfer, which triggers catastrophic forgetting of previously acquired capabilities. Without analyzing these internal dynamics, it remains unclear whether performance gains reflect efficient reuse of pretrained features or destructive parameter overwriting.

## Method

The study uses Whisper-Small as the base model and introduces a newly curated corpus of three Pacific languages (Bislama, Nafsan, and Lelepa) spanning 32.13 hours across 23,843 audio samples. Experiments compare full fine-tuning against parameter-efficient alternatives including LoRA, DoRA, and O-LoRA under varying data budgets from 0.5 to 10 hours. The work evaluates cross-lingual transfer, layer-wise representational drift using cosine distance of hidden states, module-specific updates (encoder-only vs. decoder-only), and sequential continual learning on language pairs.

## Results

Bislama reaches a 19.64 WER with 10 hours of full fine-tuning, whereas Lelepa demands deep acoustic restructuring causing early encoder drift. For Lelepa under extreme data scarcity (2.0 hours), LoRA outperforms full fine-tuning (75.66 vs. 84.10 WER) by preventing overfitting. In continual learning on the Nafsan-to-Lelepa sequence, full fine-tuning yields high error on new tasks (83.72 WER) but retains historical memory (45.67 Nafsan WER), whereas LoRA/DoRA/O-LoRA adapt better to new targets (68.62-70.82 Lelepa WER) but suffer severe catastrophic forgetting (>84% error on Nafsan).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers deploying automatic speech recognition systems for endangered, low-resource, or typologically distant Indigenous languages.

## Limitations

Evaluated primarily on Whisper-Small and a specific set of three Pacific languages, highlighting that current methods remain insufficient to fully resolve the stability-plasticity trade-off.

## Related

- (link related pages by id as the wiki grows)
