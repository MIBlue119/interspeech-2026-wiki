---
id: shahamiri26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.pdf
---

# BetterSpeak: An Atypical Speech to Typical Speech Platform for Dysarthric Speakers

*Seyed Reza Shahamiri, Zihan Zhong, Qianli Wang, Satwinder Singh*

[PDF](https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.html)

**TL;DR** — BetterSpeak introduces a mobile ASR platform powered by a two-phase personalized Conformer adaptation pipeline to translate atypical dysarthric speech into typical speech, achieving word error rates of 21.5% on UASpeech and 12.7% on TORGO.

## Key contributions

- A two-phase personalized Conformer adaptation pipeline that bridges the acoustic mismatch of dysarthric speech using vocabulary adaptation followed by targeted individual acoustic encoder fine-tuning.
- A mobile platform integrating real-time dysarthric ASR, LLM post-processing, and Text-to-Speech (TTS) for assistive communication.
- A data collection and onboarding workflow leveraging phonetically rich prompts and guardian/therapist feedback to continuously update user-specific models.
- A resource-efficient transfer learning strategy tailored to handle high inter- and intra-speaker variability under severe data scarcity.

## Problem

Commercial speaker-independent ASR systems like Whisper fail catastrophically on severe dysarthric speech, producing Word Error Rates (WER) as high as 76.4%. This performance breakdown stems from massive acoustic mismatches caused by motor speech disorders and severe data scarcity, as no public recordings of dysarthric children currently exist. Addressing this is vital to provide children with dysarthria an accessible, high-accuracy medium for education, autonomy, and social participation.

## Method

The system utilizes a Sequence-to-Sequence framework built on the Conformer architecture, which combines Convolutional Neural Networks for local acoustic features and Transformers for global linguistic context. The training follows a Two-Phase Personalized Conformer Adaptation Pipeline. In Phase 1 (Vocabulary Adaptation), a pre-trained model (from LibriSpeech) is adapted using healthy control speaker data from dysarthric corpora like UASpeech and TORGO to align lexical and phonological representations with the target domain.

In Phase 2 (Individual Adaptation), the model undergoes fast personalization using a small set of target speaker audio samples captured during app onboarding. To prevent overfitting on these data-scarce, personalized sets, fine-tuning is strictly constrained to a subset of parameters, specifically focusing on the Conformer encoder layers closer to the acoustic input.

During inference, the mobile platform acts as a real-time translator: user speech is transcribed via the personalized DSR model, refined with Large Language Models, and converted into clear, intelligible audio using Text-to-Speech (TTS). Users or therapists can also supply corrections and ratings through an interactive guided collection interface to enable seamless server-side retraining as speech patterns evolve.

## Experimental setup

Evaluated using publicly available dysarthric speech corpora, specifically UASpeech and TORGO. Compares against traditional speaker-independent ASR models and prior Seq2Seq adaptation approaches. Metrics reported include Word Error Rate (WER). Notable implementation details include a resource-efficient transfer learning setup running on a mobile-backend architecture.

## Results

The two-phase adaptation pipeline achieves average Word Error Rates of 21.5% on the UASpeech corpus and 12.7% on the TORGO corpus, substantially outperforming prior Sequence-to-Sequence approaches. Commercial speaker-independent baselines reach WERs up to 76.4% on severe dysarthric speech, highlighting the efficacy of the personalized transfer learning strategy.

| System / Condition | UASpeech (WER) | TORGO (WER) |
|---|---|---|
| Commercial SI ASR (e.g., Whisper) | ~76.4% | - |
| Prior Seq2Seq Approaches | Higher | Higher |
| BetterSpeak (Proposed Pipeline) | 21.5% | 12.7% |

## Limitations

The current evaluation lacks real-world testing data for pediatric dysarthric speakers, as no public corpus of dysarthric children's speech currently exists. The platform relies on initial onboarding samples and active guardian feedback, meaning performance heavily depends on user compliance during data collection. Additionally, server-side retraining overhead and mobile connectivity requirements may constrain real-time deployment in low-bandwidth settings.

## Why read this

Speech and ML engineers building assistive technologies or tackling extreme low-resource adaptation should read this paper to see how a constrained two-phase Conformer fine-tuning strategy bridges massive acoustic gaps in atypical speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive communication devices, mobile speech translation apps for individuals with motor speech disorders, and speech therapy monitoring tools.

## Related

- (link related pages by id as the wiki grows)
