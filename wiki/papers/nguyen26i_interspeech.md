---
id: nguyen26i_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3465
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.pdf
---

# Contrastive Training with LLM-generated Near-Misses for Robust Code-Switching Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3465)

**TL;DR** — The paper introduces a point-of-interest-aware contrastive training framework utilizing LLM-generated near-miss hypotheses to improve code-switching automatic speech recognition, achieving consistent reductions in both word and point-of-interest error rates.

## Problem

Code-switching speech recognition suffers from severe recognition errors clustered tightly around code-switching points-of-interest and switch-boundary neighborhoods due to language confusion and phonetic ambiguity. Standard fine-tuning objectives fail to provide explicit signals targeting these confusable spans, and full-hypothesis sequence-level criteria like minimum word error rate optimization do not adequately isolate localized token errors.

## Method

The approach, termed CS-NMG, first identifies code-switching points-of-interest and builds switch-boundary neighborhoods on reference transcripts. It then collects N-best hypotheses from a seed model and uses an external large language model offline to generate alternative replacement spans localized to these points-of-interest. Candidates are filtered using a tri-level gate enforcing an acoustic-margin threshold, textual dissimilarity via Levenshtein distance, and phonetic proximity via grapheme-to-phoneme conversion. Finally, Whisper-small is fine-tuned using LoRA with a combined objective consisting of a point-of-interest weighted cross-entropy anchor and a multi-negative contrastive ranking loss.

## Results

Evaluated on the Mandarin-English cmn-eng (CS-FLEURS) and Vietnamese-English vie-eng (ViMedCSS) benchmarks, the full model achieves a word error rate of 14.06 and point-of-interest error rate of 15.10 on cmn-eng, and 21.87 word error rate and 18.74 point-of-interest error rate on vie-eng, consistently outperforming cross-entropy, weighted cross-entropy, and minimum word error rate baselines. Ablations demonstrate that the tri-level filtering gate consistently outperforms unfiltered or single-constraint variants by effectively retaining hard-yet-plausible negatives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building multilingual or code-switched automatic speech recognition systems for specialized domains like medical transcription or conversational assistants.

## Related

- (link related pages by id as the wiki grows)
