---
id: adebara26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["University of Alberta", "Data Science Nigeria", "EqualyzAI", "Alberta Machine Intelligence Institute", "CIFAR"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3519
pdf: https://www.isca-archive.org/interspeech_2026/adebara26_interspeech.pdf
---

# WazobiaSpeech: A Large-Scale Multilingual Speech Corpus for Robust and Fair ASR in Four Nigerian Languages

*Ife Adebara, Oluwaseun Nifemi, Olubayo Adekanmbi, Rashidat Sikiru, Ololade Anjuwon, Ronke Akinmosin, Faiza Sani*

[PDF](https://www.isca-archive.org/interspeech_2026/adebara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/adebara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3519)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — WazobiaSpeech is a 2,540.8-hour ethically governed speech corpus across four Nigerian languages (Hausa, Igbo, Naijã, and Yorùbá) designed to capture spontaneous conversational speech and real-world sociolinguistic variation. Fine-tuning Whisper Large-v3 on this data achieves competitive ASR performance, though deep error analysis reveals persistent challenges with tone mark loss and high-tone bias.

## Key contributions

- Releases WazobiaSpeech: 2,540.8 hours of audio across 4 Nigerian languages from 2,865 unique speakers, heavily emphasizing spontaneous over scripted speech.
- Provides rich demographic and contextual metadata (age, gender, education, domain taxonomies) enabling fine-grained fairness and bias analyses.
- Establishes comprehensive ASR baselines using multiple architectures (Whisper, Wav2Vec 2.0, and zero-shot Omnilingual) across in-domain and cross-corpus evaluations.
- Conducts a rigorous tone sensitivity analysis using a newly introduced Yorùbá minimal pairs evaluation set (4,117 recordings from 8 speakers).

## Problem

Existing large-scale speech resources for African languages heavily prioritize read or scripted speech, provide weak demographic annotation, and lack rigorous governance. Spontaneous speech—marked by natural prosody, disfluencies, dialectal variation, and code-switching—remains largely absent from public datasets, causing commercial and out-of-the-box models to suffer from degraded real-world performance (WERs often exceeding 90% on untuned models). This gap impedes the development of fair, robust, and sociolinguistically aware speech technologies for underrepresented regions.

## Method

Data collection targeted four languages (Hausa, Igbo, Naijã, Yorùbá) across domains like healthcare, agriculture, business, and everyday conversation using multimodal prompts (text, images, video) to elicit spontaneous responses. The corpus incorporates strict automated quality checks (filtering based on 1.5-5.0 words-per-second speech-to-text ratios and ensemble WER estimates) followed by manual linguistic review using standardized error taxonomies.

Baseline models evaluated include Whisper (Small, Turbo, Large-v3), Wav2Vec 2.0, and Omnilingual. Whisper models were trained for up to 10 epochs using AdamW, batch size 32 per GPU, learning rate 1e-5 with a 0.1 warmup ratio, and FP16 mixed precision. Wav2Vec 2.0 was trained for up to 30 epochs with batch size 16, learning rate 1e-4, and feature extractor freezing for the first epoch. Distributed data-parallel training utilized four GPUs with early stopping based on development set performance.

Inference evaluations highlight that fine-tuning sequence-to-sequence and CTC models drastically cuts error rates, while tone error analyses identify heavy reliance on sentential context rather than acoustic feature extraction for tonal discrimination.

## Experimental setup

Evaluated on the WazobiaSpeech corpus (2,540.8 hours total; split roughly 85% train, 5% dev, 5% dev-test, 5% test) and cross-evaluated on NaijaVoices. Models include Whisper-Small, Whisper-Turbo, Whisper-Large-v3, Wav2Vec 2.0, and Omnilingual. Metrics include Word Error Rate (WER), Character Error Rate (CER), substitution/deletion/insertion rates, and tone match percentage on a 73-minimal-pairs Yorùbá dataset (4,117 utterances). Hardware utilized 4 GPUs with mixed-precision training.

## Results

Fine-tuned Whisper Large-v3 achieves the best in-domain WERs: 16.4% for Hausa, 33.5% for Igbo, 30.02% for Yorùbá, and 12.1% for Naijã. Cross-corpus evaluation on NaijaVoices shows fine-tuned Whisper Large reduces Hausa WER from 96.6% (untuned) to 37.4%, and Yorùbá WER from 105.8% to 61.0%. Tonal languages suffer disproportionately from character-level errors, with tone errors comprising 22.0% of substitutions in Yorùbá and 25.0% in Igbo. In the minimal pairs tone analysis, the model achieved a 76.4% tone match in sentential context versus 58.1% in isolation, demonstrating a strong high-tone bias (confusing Low to High 40.1% of the time).

| System / Condition | Hausa WER | Igbo WER | Yorùbá WER | Naijã WER |
|---|---|---|---|---|
| Whisper Small (fine-tuned) | 24.86 | 52.95 | 42.92 | 9.98 |
| Whisper Turbo (fine-tuned) | 20.10 | 45.58 | 39.58 | 10.29 |
| Whisper Large-v3 (fine-tuned) | 16.40 | 33.50 | 30.02 | 12.10 |
| Wav2Vec 2.0 (fine-tuned) | 35.17 | 54.39 | 40.30 | 15.40 |
| Omnilingual (zero-shot) | 36.00 | 58.00 | 44.00 | 44.00 |

## Limitations

The dataset is restricted to four Nigerian languages, leaving hundreds of other African languages unrepresented. Naijã lacks a standardized orthography, making standard WER metrics unreliable due to spelling variation between transcribers and models rather than true recognition failures. Older demographic groups (60+) had sparse representation in certain splits (e.g., only 31 utterances for older Igbo speakers), resulting in high variance for demographic subgroup evaluations.

## Why read this

Researchers building speech models for low-resource or tonal languages will find critical insights into how models fail on diacritics and rely excessively on context over acoustic tone cues. It provides an architectural blueprint and a benchmark dataset for handling spontaneous, code-switched conversational speech in multilingual African settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of robust ASR and speech-to-text transcription tools for Nigerian languages, supporting agricultural extension services, community health outreach, mobile financial literacy apps, and inclusive conversational AI.

## Institutions / 機構

University of Alberta, Data Science Nigeria, EqualyzAI, Alberta Machine Intelligence Institute, CIFAR

**Funding / 經費:** Gates Foundation

## Related

- (link related pages by id as the wiki grows)
