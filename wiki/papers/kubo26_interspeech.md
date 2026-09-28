---
id: kubo26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1672
pdf: https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.pdf
---

# Building Tailored Speech Recognizers for Japanese Speaking Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1672)

**TL;DR** — The paper introduces a streamable phonemic recognizer tailored for Japanese speaking assessment that incorporates pitch accents and reduces mora-label error rates from 12.3% to 7.1%.

## Problem

Standard ASR systems normalize speech by discarding speaker errors, mispronunciations, and incorrect accent positions, making them unsuitable for language education and speaking proficiency evaluation. Although phonetic transcribers exist, fine-grained tasks like Japanese pitch accent assessment suffer from extreme data scarcity, as hand-annotated multi-speaker corpora like the CSJ core set contain only 45 hours of speech. Multitask learning and lattice-based fusion are proposed to leverage cheaper unannotated text and pitch data to overcome this sparsity.

## Method

The architecture uses a pretrained Mimi speech encoder (without quantization/downsampling) coupled with a 24-layer, 512-dimensional causal Llama-2-style encoder-only CTC model. It is trained using a multitask learning scheme consisting of three estimation tasks: phonetic alphabet (PA) recognition, text token (TT) recognition, and a 10-class fundamental frequency trajectory classifier derived via the Harvest algorithm. To combine modalities, a novel finite-state transducer (FST) lattice fusion algorithm merges CTC confusion networks for PAs with a pronunciation-dictionary-derived PA lattice converted from the TT estimator.

## Results

Evaluated on the Corpus of Spontaneous Japanese (CSJ) core evaluation sets using mora-label error rate (MER). The proposed approach reduces the average MER from a baseline of 12.3% down to 7.1%. Experiments confirm that both multitask learning and lattice fusion are crucial, outperforming generic multilingual recognizers that tend to incorrectly correct non-canonical speaker errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and educational technology developers building automated computer-assisted language learning (CALL) systems and speaking proficiency evaluation tools for Japanese.

## Limitations

The current framework relies on a single training phase without iterative pseudo-labeling on unannotated datasets.

## Related

- (link related pages by id as the wiki grows)
