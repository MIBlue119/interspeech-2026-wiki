---
id: han26c_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1869
pdf: https://www.isca-archive.org/interspeech_2026/han26c_interspeech.pdf
---

# Exploring Hesitation as a Signal for Spoken Grammatical Error Correction

*Seunghoon Han, Minyoung Kyoung, Hyungbae Jeon*

[PDF](https://www.isca-archive.org/interspeech_2026/han26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1869)

**TL;DR** — This paper challenges the conventional spoken GEC pipeline of stripping disfluencies as noise, instead introducing a hesitation-aware approach with special marker tokens and type embeddings that improves F0.5 by up to 2.05 percentage points over standard removal.

## Key contributions

- Formulates disfluencies in L2 learner speech as a positive linguistic signal of grammatical uncertainty rather than noise to be removed.
- Introduces five special hesitation marker tokens ([SP], [FP], [/FP], [REP], [/REP]) to explicitly map silent pauses, filled pause regions, and word repetitions.
- Proposes a hesitation type embedding layer summed with standard token representations to propagate context across disfluent spans.
- Demonstrates consistent F0.5 gains over rule-based disfluency removal and oracle fluent transcript baselines, particularly for errors near hesitation boundaries (+2.78%p).

## Problem

Traditional spoken grammatical error correction (SGEC) cascades use Automatic Speech Recognition, followed by Disfluency Detection (DD) to strip hesitation phenomena, and finally text-based Grammatical Error Correction. This discards valuable psycholinguistic signals because L2 learners frequently hesitate precisely where they experience grammatical uncertainty. Removing disfluencies beforehand forces text GEC models to operate on unnatural inputs and loses contextual cues that point directly to error locations.

## Method

The method builds upon a t5-base sequence-to-sequence architecture, modifying its vocabulary with five new special tokens for silent pauses ([SP]), filled pauses/false starts ([FP], [/FP]), and repetitions ([REP], [/REP]). In addition to inserting these markers into the transcript text, the model incorporates an auxiliary hesitation type embedding layer of dimension d_model with four distinct type states (normal token, silent pause token, filled pause region token, and repetition region token). These learnable type vectors (initialized from N(0, 0.02)) are summed directly with the standard token embeddings before being fed to the T5 encoder.

The input text is formatted with the prefix "gec: <marked transcript>" to generate the corrected target sequence. The choice of T5 allows leveraging robust pre-trained text-to-text sequence generation while seamlessly extending the token and embedding dimensions. By explicitly preserving spans instead of erasing them, the network can attend directly to fragments where speakers abandoned or repeated words, utilizing the proximity of hesitation as a soft attention prior for pinpointing redundant or missing syntax.

## Experimental setup

Experiments are conducted on the Speak & Improve (S&I) Corpus 2025 utilizing human manual transcriptions (isolating hesitation effects from ASR error propagation). Baselines include a rule-based disfluency removal pipeline (DD) and an oracle fluent transcription baseline where disfluencies are entirely deleted. Models are fine-tuned from t5-base for 10 epochs using AdamW (learning rate 1e-4, batch size 8, gradient accumulation over 4 steps, max sequence length 256) with early stopping based on validation GLEU. Evaluation uses span-based F0.5 metrics computed via ERRANT.

## Results

The proposed method achieves an overall F0.5 of 0.4790, outperforming both the rule-based DD baseline (0.4585, +2.05%p) and the oracle Fluent baseline (0.4606, +1.84%p), while yielding higher recall (0.3759 vs 0.3465) without sacrificing precision. Gains are heavily concentrated near hesitation boundaries: within a ±1 token window, the proposed system achieves F0.5 = 0.5087 (+2.78%p over Fluent), whereas improvements far from hesitations are more modest (+1.15%p).

Breakdowns by hesitation type show filled pauses (FP) achieving the largest jump (+9.10%p over Fluent), silent pauses yielding +2.46%p, and repetitions seeing marginal gains (+0.58%p) due to a high baseline. Across ERRANT categories, the model excels most at detecting unnecessary elements like unnecessary nouns (U:NOUN, +11.5%p) and pronouns (U:PRON, +6.3%p). The system does not win as heavily on regions devoid of hesitation markers, where its advantage drops significantly.

| Method | Precision | Recall | F0.5 |
|---|---|---|---|
| DD | 0.5003 | 0.3436 | 0.4585 |
| Fluent | 0.5019 | 0.3465 | 0.4606 |
| Proposed | 0.5142 | 0.3759 | 0.4790 |

## Limitations

The study relies exclusively on manual human transcriptions containing explicit hesitation annotations to isolate the contribution of hesitation signals, meaning real-world cascade deployment with imperfect ASR-derived hesitation tags remains untested. The evaluation is restricted to English L2 learner speech from the S&I Corpus 2025. Furthermore, realizing these performance gains in automated pipelines depends on building robust ASR systems capable of reliably predicting fine-grained disfluency markers.

## Why read this

Speech and NLP researchers working on computer-assisted language learning or disfluency handling should read this to understand how treating hesitation as a feature rather than noise can boost GEC recall. It provides concrete proof that preservation strategies outperform both rule-based deletion and oracle clean text.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated spoken language tutoring systems, computer-assisted language learning (CALL) interfaces, and spoken grammatical error correction pipelines for L2 learners.

## Related

- (link related pages by id as the wiki grows)
