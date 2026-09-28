---
id: yang26o_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2970
pdf: https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.pdf
---

# Speech Recognition on TV Series with Video-Guided Post-ASR Correction

[PDF](https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2970)

**TL;DR** — This paper proposes a training-free video-guided post-ASR correction framework that utilizes video-large multimodal models and large language models to fix transcription errors in complex multimedia, achieving a relative 20.75% Word Error Rate reduction on WavLM.

## Problem

Automatic speech recognition systems struggle significantly in complex multimedia environments like TV series due to overlapping speech, domain-specific terminology, and long-range contextual dependencies. Traditional audio-visual speech recognition methods rely on low-level sensory fusion such as lip-reading, which fails in TV series because of off-screen speakers, wide camera shots, and inconsistent face resolutions. Consequently, leveraging high-level semantic video context to correct persistent ASR decoding errors remains largely underexplored.

## Method

The framework operates in two stages: initial ASR generation followed by a training-free video-guided post-correction module. First, a Video-Large Multimodal Model (VideoLLaMA2) extracts high-level semantic context from the video using a dual-prompt question-answering format focused on TV show identification and fine-grained action/scene description. Second, a Large Language Model (GPT-4o) ingests the initial ASR transcript alongside the extracted visual context and a task instruction to output the refined transcript. Evaluated ASR backbones include wav2vec 2.0, HuBERT, and WavLM (fine-tuned with CTC loss) and Conformer-Large (fine-tuned with RNN-T loss), all pretrained on Librispeech-960h.

## Results

Evaluated on a newly curated 90.027-hour TV series subset of the Violin dataset named Violin-TV (comprising 7,983 training clips, 1,007 validation clips, and 1,013 testing clips), the proposed framework consistently reduces Word Error Rate across all tested models. WavLM-Large achieves a relative WER reduction of 20.75% (dropping from 29.45% raw to 23.64%), wav2vec 2.0 improves by 13.06% (29.28% to 25.36%), HuBERT-Large by 11.86% (25.73% to 23.27%), and Conformer-Large by 7.46% (22.14% to 20.97%). Baseline text-only GPT-4o post-correction yields marginal or negative gains (-0.38% to 2.54%), proving the necessity of visual guidance. Ablations confirm that combining both coarse TV show identification and fine-grained scene description prompts delivers superior error correction compared to using either prompt type in isolation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building automated transcription pipelines, subtitle generators, and media accessibility tools for television series, movies, and video content.

## Limitations

The framework relies heavily on the capabilities of external large-scale foundational models like VideoLLaMA2 and GPT-4o, making it computationally expensive and dependent on accurate video-text alignment during prompting.

## Related

- (link related pages by id as the wiki grows)
