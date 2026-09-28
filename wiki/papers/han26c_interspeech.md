---
id: han26c_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1869
pdf: https://www.isca-archive.org/interspeech_2026/han26c_interspeech.pdf
---

# Exploring Hesitation as a Signal for Spoken Grammatical Error Correction

[PDF](https://www.isca-archive.org/interspeech_2026/han26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1869)

**TL;DR** — This paper demonstrates that treating speech disfluencies as positive signals rather than noise improves spoken grammatical error correction for L2 learners, achieving a headline F0.5 score of 0.4790.

## Problem

Traditional spoken grammatical error correction pipelines treat speech disfluencies solely as noise and remove them before text correction. However, psycholinguistic evidence shows that disfluencies frequently co-occur with linguistic and grammatical uncertainty in L2 learner speech. Discarding these disfluencies eliminates valuable contextual cues that could otherwise assist automated feedback systems in locating learner errors.

## Method

The authors propose a hesitation-aware sequence-to-sequence framework based on the t5-base architecture. They introduce five special marker tokens to explicitly identify silent pauses ([SP]), filled pauses ([FP], [/FP]), and word repetitions ([REP], [/REP]). Additionally, they add a learned auxiliary hesitation type embedding layer that combines with standard token embeddings to propagate hesitation context across entire disfluent spans. Models are fine-tuned on the Speak & Improve Corpus 2025 using human-annotated disfluent transcripts for 10 epochs with early stopping.

## Results

Evaluated on the Speak & Improve Corpus 2025 using span-based F0.5 metrics computed by ERRANT, the proposed method achieves an overall F0.5 of 0.4790. This outperforms both a rule-based disfluency removal baseline at 0.4585 (+2.05%p) and an oracle human-annotated fluent transcription baseline at 0.4606 (+1.84%p). Performance gains are heavily concentrated near hesitation positions, with errors within a ±1 token window showing an F0.5 of 0.5087 (+2.78%p over the fluent baseline). Among hesitation types, filled pauses yield the largest improvement at +9.10%p over the fluent baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning systems and automated spoken language tutors providing grammatical feedback to second-language learners.

## Limitations

The study relies on manual human-annotated transcriptions rather than direct ASR outputs to isolate hesitation signals from recognition error propagation.

## Related

- (link related pages by id as the wiki grows)
