---
id: jeon26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1569
pdf: https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.pdf
---

# Not All Frames Are Equal: Difference-Aware Quantization for Ultra-Low-Bit ASR

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1569)

**TL;DR** — DiffAQ modifies post-training quantization calibration by weighting Hessian importance using frame-to-frame activation differences, improving Whisper model transcription accuracy at ultra-low 2-bit and 3-bit bit-widths.

## Problem

Applying standard text-oriented post-training quantization methods like GPTQ and AWQ directly to automatic speech recognition models causes severe degradation and hallucination loops at ultra-low bit-widths. This occurs because speech features contain heavy temporal redundancies, steady-state regions, and zero-padding that dominate standard frame-agnostic Hessian calculations, leaving the model poorly calibrated for rapid phonetic transitions. Addressing this modality gap is critical for running large speech foundation models efficiently on resource-constrained edge hardware.

## Method

The authors propose Difference-Aware Quantization (DiffAQ), a training-free modification to the GPTQ calibration pipeline. DiffAQ computes the L2 norm of the frame-to-frame hidden activation differences in intermediate encoder layers to measure the rate of acoustic change. This temporal density score is normalized and combined with a base importance factor (alpha = 0.2) to construct scaling weights that magnify the Hessian contribution of transient phonetic boundaries while suppressing padding and steady-state frames. Because text generation does not exhibit the same temporal audio redundancy, DiffAQ is applied exclusively to the encoder linear layers while standard GPTQ is retained for the decoder. Evaluations use 128 calibration utterances sampled from LibriSpeech train-other-500, with per-group asymmetrical quantization at group size 64.

## Results

Evaluated across Whisper base.en (~74M), small.en (~244M), and medium.en (~769M) sizes on LibriSpeech (test-clean and test-other) and FLEURS english benchmarks using Word Error Rate (WER). At 3-bit precision, DiffAQ consistently achieves lower WER than Round-to-Nearest, AWQ, and standard GPTQ baselines, reducing Whisper Small WER on FLEURS from 11.37% down to 8.69%. The advantages are more pronounced at 2-bit precision, where baseline methods often yield degenerate outputs exceeding 100% WER; for Whisper Medium on LibriSpeech test-other, DiffAQ lowers the 2-bit WER from 17.53% (GPTQ) to 12.93%. Ablations confirm that varying the floor parameter alpha between 0.0 and 0.3 results in minor WER variations under 1% on FLEURS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers deploying large speech recognition foundation models like Whisper on edge or resource-constrained devices at ultra-low bit-widths.

## Limitations

The temporal activation difference metric is not speech-selective, meaning transient non-speech sounds or environmental noise can cause large activation shifts and receive unintended high importance during calibration.

## Related

- (link related pages by id as the wiki grows)
