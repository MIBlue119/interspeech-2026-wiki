---
id: alizadeh26_interspeech
category: asr
labels: [low-resource, multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2454
pdf: https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.pdf
---

# The Impact of Informal Persian Speech on Low-Resource ASR and Speech Translation

*Hadi Alizadeh, Mohammad Asgari, Mohammad Sadegh Mehrabikia, Amir Koohnavard*

[PDF](https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2454)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the Toorintan-Persian Informal Dataset (T-PID), a 36.77-hour parallel informal Persian-English corpus, and demonstrates that fine-tuning models on informal conversational speech dramatically improves ASR and speech translation accuracy across both informal and formal domains.

## Key contributions

- Introduces T-PID, the first publicly available parallel Persian-English dataset focused specifically on spontaneous, informal, and colloquial speech, totaling 36.77 hours across 22,443 utterances.
- Develops a scalable annotation and translation pipeline using GPT-4o mini for initial English translations, backed by targeted manual curation for idioms and cultural references yielding a low 4% translation post-editing WER.
- Releases a general-purpose Persian text normalizer and fine-tuned checkpoints for Whisper-small, Whisper-medium, Wav2Vec2-BERT, and NLLB-200 on Hugging Face.
- Shows that training on high-perplexity informal speech improves out-of-domain generalization to formal read-speech corpora such as Common Voice 9 and FLEURS.

## Problem

Publicly available Persian speech datasets like FARSDAT, DeepMine, and Arman-AV are dominated by formal registers, read texts, or structured interviews. This creates a severe acoustic-text mismatch when models encounter everyday informal Persian (Tehrani colloquial variants), where phonetic reductions and lexical choices diverge sharply from formal scripts. Consequently, standard ASR and speech translation models suffer from catastrophic hallucinations and high word error rates when applied to in-the-wild conversational speech.

## Method

The dataset construction pipeline extracted isolated speaker clips from Iranian films and television shows using 10 annotators to ensure clean single-speaker segments without overlapping speech. A separate team of 15 human annotators transcribed the audio verbatim into formal/informal Persian script, followed by quality control checks from a 3-member expert team. English translations were generated using GPT-4o mini and validated via a 400-segment random sample showing a 4% post-correction error rate.

For downstream evaluation, the authors fine-tuned Whisper-small, Whisper-medium, and Wav2Vec2-BERT for ASR, and NLLB-200 for machine translation. Because T-PID exhibits a much higher perplexity (557.53) and high acoustic-text alignment precision due to its audio-first collection strategy, Connectionist Temporal Classification (CTC) based architectures like Wav2Vec2-BERT proved especially effective at modeling frame-level acoustic alignments without succumbing to the severe generative hallucinations observed in autoregressive decoder-only or encoder-decoder models like baseline Whisper.

## Experimental setup

Evaluated on T-PID (36.77 hours total; 29.52h train, 2.66h val, 4.59h test), alongside cross-domain evaluations on Common Voice 9 and FLEURS. Metrics used are Word Error Rate (WER) for ASR and BLEU for cascaded Speech Translation (using fine-tuned NLLB-200 for machine translation). Compared against non-fine-tuned baseline Whisper-small and Whisper-medium models.

## Results

Baseline Whisper models suffer from extreme hallucinations on T-PID, yielding WERs of 200.83% (small) and 361.25% (medium). Fine-tuning on T-PID resolves this, dropping Whisper-small WER to 37.48% and Whisper-medium to 36.25% on the T-PID test set. The CTC-based Wav2Vec2-BERT achieves the best in-domain ASR performance with a WER of 29.09% on T-PID, while also achieving strong cross-domain generalization, scoring 16.48% on FLEURS and 30.45% on Common Voice 9.

In cascaded speech translation (evaluated via BLEU on T-PID test data), fine-tuning NLLB-200 alongside Wav2Vec2-BERT raises the BLEU score from a base of 11.96 to 25.30. On FLEURS and CoVoST2 test splits, fine-tuned Wav2Vec2-BERT plus NLLB-200 achieves BLEU scores of 21.41 and 20.69, respectively.

| System / Condition | T-PID WER (%) | FLEURS WER (%) | Common Voice 9 WER (%) |
|---|---|---|---|
| Whisper-small (Base) | 200.83 | 55.8 | 71.9 |
| Whisper-medium (Base) | 361.25 | 41.0 | 49.9 |
| Whisper-small (Fine-tuned) | 37.48 | 38.35 | 45.57 |
| Whisper-medium (Fine-tuned) | 36.25 | 35.03 | 43.96 |
| Wav2Vec2-BERT (Fine-tuned) | 29.09 | 16.48 | 30.45 |

## Limitations

The dataset is limited to approximately 37 hours of total speech, which is modest compared to massive web-scale corpora. Dialectal coverage outside of mainstream colloquial Persian remains limited, and movie audio sources occasionally contain background noise, reverberation, or overlapping music despite segment isolation efforts.

## Why read this

Speech engineers and researchers tackling low-resource or dialect-mismatched ASR will learn how audio-first data curation and fine-tuning on high-perplexity informal speech can eliminate model hallucinations and drastically improve generalization across registers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-world conversational speech recognition, voice assistants, and speech-to-text translation systems handling informal, colloquial Persian media and dialogue.

## Institutions / 機構

Toorintan, Islamic Republic of Iran Broadcasting University

**Funding / 經費:** Toorintan Company

## Related

- (link related pages by id as the wiki grows)
