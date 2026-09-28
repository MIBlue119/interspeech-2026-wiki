---
id: ryu26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3011
pdf: https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.pdf
---

# Segment-level Tree Search for Long Meeting Document Summarization

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3011)

**TL;DR** — The paper introduces S3, a training-free segment-level Monte Carlo Tree Search framework that composes summary candidates to achieve 72B-grade meeting summarization performance using only 7B backbone models.

## Problem

Long meeting documents feature globally dispersed information and complex conversational structures that challenge existing summarization approaches. Multi-stage pipelines suffer from cumulative error propagation without intermediate validation, while end-to-end long-context language models struggle because available reference summaries are typically short and overly compressed, failing to provide adequate supervision for comprehensive summaries.

## Method

The method, Segment-level Summarization via Monte Carlo Tree Search (S3), partitions a long meeting document into overlapping fixed-length segments using a sliding window and offline generates multiple summary candidates per segment via nucleus sampling or diverse beam search. It then builds a search tree where each depth corresponds to a document segment and actions represent candidate selection, guided by UCT-based MCTS using a self-reward function evaluated across coherence, consistency, fluency, and relevance on a 1-to-5 Likert scale. Finally, a refinement step concatenates the chosen segment summaries, removes redundant introductory phrases, and improves global coherence. Backbone models evaluated include Qwen-2.5-7B-Instruct, Qwen-2.5-72B-Instruct, and Gemma-3-12b-it.

## Results

Evaluated on the QMSum benchmark using G-Eval across coherence, consistency, fluency, and relevance, S3-7B achieves an average score of 4.56, outperforming the zero-shot base 7B model (4.37) and a segment-level baseline S2 (4.47), scoring comparably to the massive 72B-Instruct model (4.54). Length analysis across five input bins shows S3 maintains robust performance and widening performance gains as input length increases beyond 20K tokens. Ablations confirm that nucleus sampling yields higher average G-Eval scores (4.56) compared to diverse beam search (4.51).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building automated meeting transcription and minute-generation systems for long enterprise or parliamentary discussions.

## Related

- (link related pages by id as the wiki grows)
