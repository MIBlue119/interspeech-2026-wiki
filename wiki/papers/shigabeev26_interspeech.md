---
id: shigabeev26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-809
pdf: https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.pdf
---

# Dialogs: a studio-quality expressive conversational Russian speech corpus for dialog assistants

*Ilya Shigabeev, Ilia Latyshev*

[PDF](https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-809)

**TL;DR** — The paper introduces Dialogs, a 20.6-hour studio-quality expressive conversational Russian speech corpus featuring 12 style/emotion categories across 3 professional actors, and validates its utility by training a VITS2 expressive TTS model.

## Key contributions

- Released Dialogs, a 20.6-hour studio-recorded (44.1 kHz stereo) Russian conversational speech dataset containing 11,796 utterances from 3 professional puppet-theatre actors.
- Provided per-utterance multi-annotator style and emotion labels across 12 distinct categories (neutral, happy, surprise, sad, disgust, angry, tongue-twister, poem, whisper, arrogance, laughing, fear).
- Conducted crowd-sourced MOS evaluations showing Dialogs matches existing Russian studio baselines in audio quality and intelligibility while outperforming them in expressiveness and conversational naturalness.
- Demonstrated a proof-of-concept VITS2 expressive TTS model trained entirely on the Dialogs corpus, highlighting its ability to capture conversational prosody despite limited per-speaker data.

## Problem

Modern conversational assistants and TTS systems require natural, expressive, and interactive speech data that captures prosodic variation, natural timing, and turn-taking. For the Russian language, a significant shortage exists of studio-quality conversational corpora: existing datasets are either single-speaker read-speech without emotion labels (like Ruslan and Natasha) or large web-mined collections with uncontrolled recording conditions and noisy transcripts. This deficit hinders the development of expressive dialog-oriented text-to-speech models that sound genuinely conversational rather than monotone.

## Method

The Dialogs corpus was recorded using Behringer XM8500 microphones in a professional studio with actors seated face-to-face in stereo at 44.1 kHz, 16-bit, maintaining a low ambient noise level of ~20 dBA. Script generation was aided by GPT-3.5 across diverse interactive scenarios (family interactions, travel, poetry, tongue twisters, product reviews), deliberately prompting actors to improvise and deviate from texts to capture natural intonation, rhythm, and paralinguistic events. Manual segmentation yielded 11,796 utterances split into a training set (19.9 hours / 11,428 utterances), development set (0.30 hours / 180 utterances), and test set (0.37 hours / 188 utterances). Style and emotion annotation was gathered via the Yandex Tasks crowd-sourcing platform using 3 independent annotators per utterance, resolving ties by selecting the globally least-frequent category to boost rare style recall.

To validate the corpus, a VITS2 end-to-end TTS model was trained on the dataset using a batch size of 16 for 615,000 steps on a single NVIDIA RTX 4090. The dataset's uneven per-speaker duration distribution (Masha: 9.9h, Dima: 6.2h, Sveta: 4.4h) served as a rigorous testbed for low-resource expressive multi-speaker synthesis. Inference evaluation was performed on 60 held-out audio files (20 per speaker) spanning varied linguistic contexts and assessed via crowd-sourced MOS and UTMOS automated naturalness prediction.

## Experimental setup

The evaluation utilized the Dialogs corpus (20.6 total hours, 3 speakers, 12 styles) compared against two single-speaker Russian read-speech baseline corpora, Ruslan (31 hours, 44.1 kHz) and Natasha (12 hours, 22 kHz). Evaluation metrics included crowd-sourced 5-point scale MOS across six dimensions (overall quality, audio quality, prosody, intelligibility, expressiveness, conversational naturalness) evaluated by native Russian listeners with outlier annotators removed, alongside UTMOS automated neural MOS prediction. The VITS2 proof-of-concept model was trained for 615k steps with a batch size of 16 on a single NVIDIA RTX 4090.

## Results

In corpus quality evaluations, Dialogs achieved scores comparable to established Russian read-speech corpora in audio quality (4.19 vs 4.23 for Ruslan and 4.18 for Natasha) and intelligibility (4.14 vs 4.17 and 4.16), while demonstrating clear improvements in expressiveness (4.05–4.11 vs 3.86–3.88) and conversational naturalness (4.08 vs 3.78–3.82). When evaluated on the trained VITS2-Dialogs model, the system attained an overall MOS of 2.83, audio quality MOS of 2.97, prosody MOS of 2.55, expressiveness MOS of 2.56, conversational MOS of 2.59, intelligibility MOS of 2.28, and a UTMOS score of 3.36. The lower absolute intelligibility and overall MOS scores for the standalone VITS2 model reflect the challenging limited-data regime (4.4 to 9.9 hours per speaker), though informal listening and higher relative expressiveness scores confirm successful absorption of conversational style.

| System / Condition | Overall | Audio Quality | Prosody | Intelligibility | Expressiveness | Conversational | UTMOS |
|---|---|---|---|---|---|---|---|
| Dialogs (Corpus) | 4.15 ± 0.08 | 4.19 ± 0.08 | 4.05 ± 0.08 | 4.14 ± 0.08 | 4.11 ± 0.08 | 4.08 ± 0.08 | 3.17 ± 0.07 |
| Ruslan (Corpus) | 4.26 ± 0.09 | 4.23 ± 0.09 | 4.01 ± 0.10 | 4.17 ± 0.09 | 3.86 ± 0.11 | 3.78 ± 0.13 | - |
| Natasha (Corpus) | 4.16 ± 0.10 | 4.18 ± 0.11 | 3.94 ± 0.11 | 4.16 ± 0.12 | 3.88 ± 0.13 | 3.82 ± 0.14 | - |
| VITS2-Dialogs (TTS) | 2.83 ± 0.24 | 2.97 ± 0.23 | 2.55 ± 0.21 | 2.28 ± 0.20 | 2.56 ± 0.21 | 2.59 ± 0.21 | 3.36 ± 0.06 |

## Limitations

The corpus features professional actors reading scripted prompts rather than truly spontaneous conversation, meaning overlapping speech and ambient background noise are absent. The training data is unevenly distributed across the three speakers (ranging from 4.4 to 9.9 hours), which limits standalone multi-speaker TTS performance without data augmentation or mixing with larger corpora. The dataset is restricted to the Russian language and a limited set of three speakers, constraining speaker diversity.

## Why read this

Researchers and engineers building expressive, conversational Russian TTS systems should read this paper to understand how to curate and leverage studio-quality emotional dialog corpora. It provides a blueprint for combining professional acted prompts with crowd-sourced emotion annotation to overcome the scarcity of expressive conversational resources.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training expressive text-to-speech models, emotional conversational assistants, and interactive voice-bot systems for the Russian language.

## Related

- (link related pages by id as the wiki grows)
