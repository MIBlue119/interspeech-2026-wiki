---
id: magoshi26b_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2246
pdf: https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.pdf
---

# Improving Zero-Shot Phonetic Classification through Language-Agnostic Articulatory Features

*Ryo Magoshi, Jaeyoung Lee, Shinsuke Sakai, Tatsuya Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2246)

**TL;DR** — The paper investigates zero-shot phonetic classification for unseen phones and demonstrates that standard discrete IPA token-based models fail, whereas using continuous 24-dimensional Articulatory Feature (AF) vectors extracted from frame outputs significantly improves performance—achieving 95.4% balanced accuracy on Chinese aspiration and 72.6% on Japanese nasal classification.

## Key contributions

- Reveals the failure modes of current multilingual Phonetic Foundation Models (PFMs) on zero-shot phonetic classification of distinct phones (Chinese aspiration and Japanese nasals) despite broad training.
- Proposes an Articulatory Feature Classification Module (AFCM) paired with an XLS-R encoder to estimate continuous 24-dimensional PanPhon vectors jointly with CTC posteriors.
- Demonstrates that continuous AF distance metrics drastically outperform discrete token posteriors, especially for rare and underrepresented phonemes (e.g., boosting Japanese [ñ] recall from <7% to 38.5%).
- Establishes that temporal aggregation choice depends strictly on acoustic duration: single-frame classification is vital for transient bursts like aspiration, while segmental averaging is crucial for sustained features like nasal place of articulation.

## Problem

Current Phonetic Foundation Models (PFMs) for Speech-to-IPA transcription (such as POWSM) rely on Grapheme-to-Phoneme (G2P) labels for massive multilingual training, but these labels are phonemic rather than phonetically faithful and propagate conversion errors. Consequently, these models suffer from acoustic-agnostic labeling and notational divergence across languages, causing them to perform poorly in zero-shot evaluations on unseen phones or subtle phonetic distinctions. This limitation prevents deep learning systems from achieving true universal articulatory recognition across diverse languages and dialects.

## Method

The study compares two primary model architectures: POWSM, a 252M-parameter hybrid CTC/Attention model trained from scratch on IPA tokens, and XLS-R + AFCM, a 318M-parameter model combining a pre-trained XLS-R encoder with an Articulatory Feature Classification Module (AFCM). The AFCM is jointly trained using cross-entropy loss to predict 24-dimensional continuous PanPhon AF vectors alongside standard CTC IPA token posteriors. PanPhon representations encode phonetic properties such as nasality, voicing, and place of articulation on a scale of +1, -1, or 0 (binarized to {0,1} during evaluation).

For inference, the framework isolates the target segment using forced alignment to identify the peak frame ($t^*$). It then evaluates phonetic identity using three distinct classification methodologies: Decoder-based alignment minimizing Phoneme-Feature Error Rate (PFER), CTC-based log-posteriori arg max, and AF-based classification which computes the L1 distance between the predicted AF vector and binary PanPhon template vectors across relevant discriminative dimensions.

To capture temporal dynamics, two aggregation strategies are tested: single-frame classification at the peak frame $t^*$, and segmental classification which averages the representations from the peak frame to the onset of the subsequent token. Single-frame setup is optimal for transient features like aspiration bursts, while segmental averaging prevents cue dilution for sustained articulations like nasal place cues.

## Experimental setup

The models are trained on 3,000 hours of speech across 78 languages from the Common Voice and FLEURS subsets of IPAPack++, utilizing a 280-token PanPhon vocabulary. Models are optimized using AdamW with a learning rate of 5e-4, 10k warmup steps, and 10-minute batch sizes. Zero-shot evaluation is performed on Chinese aspiration (FLEURS test set, 652 utterances, 2.0 hours) and Japanese moraic nasals (CSJ eval2 and eval3, 586 utterances, 52 minutes with human-verified IPA labels). Metrics focus on per-IPA recall and balanced accuracy (macro-average of per-IPA recall).

## Results

On Chinese aspiration (binary classification), the baseline POWSM with CTC collapses on aspirated stops, achieving a catastrophic balanced accuracy of 56.7% with a massive bias toward unaspirated tokens (10-20% recall for aspirated vs. >98% for unaspirated). In contrast, XLS-R + AFCM using single-frame AF classification achieves a headline balanced accuracy of 95.4%, yielding over 91% recall across all individual aspirated and unaspirated categories ([p^h], [p], [t^h], [t], [k^h], [k]). Notably, segmental AF aggregation completely fails on aspiration (50.8% balanced accuracy, with aspirated recalls crashing to 1.7–2.8%) because the brief burst is averaged out.

On Japanese nasal classification (four-way classification across [m], [n], [N], [ñ]), the baseline CTC models fail on rare allophones like [ñ] (1.0–6.2% recall). The proposed segmental AF method achieves the highest balanced accuracy of 72.6%, drastically improving rare phone recognition such as [ñ] recall to 38.5% and [N] recall to 93.6%. The primary ablation demonstrates that while AF representations consistently outperform discrete CTC across tasks, the aggregation strategy must match the acoustic duration of the target phonetic feature.

| System | Condition | Chinese Aspiration (Balanced Acc.) | Japanese Nasals (Balanced Acc.) |
|---|---|---|---|
| POWSM (252M) | CTC (Single-frame) | 56.7% | 48.5% |
| POWSM (252M) | Decoder (PFER) | 53.1% | 46.7% |
| XLS-R + AFCM (318M) | CTC (Single-frame) | 94.5% | 59.0% |
| XLS-R + AFCM (318M) | AF (Single-frame) | **95.4%** | 65.8% |
| XLS-R + AFCM (318M) | AF (Segmental) | 50.8% | **72.6%** |

## Limitations

The evaluation scope is limited to two specific zero-shot phenomena (Chinese aspiration and Japanese moraic nasals) and two evaluation languages, meaning generalization to a broader array of rare phonological contrasts and tonal languages requires further validation. The training labels still fundamentally inherit noise and inconsistencies from underlying G2P pipelines used to construct IPAPack++. Furthermore, the performance relies on accurate forced alignment to locate the initial temporal window ($t^^*$) during inference.

## Why read this

Researchers and engineers working on zero-shot speech recognition, phonetic foundation models, or language-agnostic ASR should read this paper to understand why discrete token outputs fail on unseen phones and how continuous articulatory features overcome data scarcity for rare phonetic categories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated pronunciation evaluation for L2 language learners, diagnostic assessment of pathological or atypical speech, and acoustic documentation of endangered unwritten languages.

## Related

- (link related pages by id as the wiki grows)
