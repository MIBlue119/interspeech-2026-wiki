---
id: dong26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-966
pdf: https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.pdf
---

# English Vowel Perceptual Training under Multitalker Babble: A Comparison of Humans and Large Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-966)

**TL;DR** — This study evaluates whether multilingual speech models and large language models (Whisper and Qwen2.5-Omni-7B) mirror human second-language (L2) listeners in vowel perceptual training under multi-talker babble and noise conditions, finding that the speech LLM exhibits learning trends most similar to human learners.

## Problem

Second-language learners struggle to perceive non-native vowel contrasts (such as /E/–/æ/ and /eI/–/aI/), and while computer-assisted perceptual training under multitalker babble (MTB) helps, human experiments are complex and time-consuming. Prior neural models like Wav2Vec2.0 or TDNN struggle with speech-shaped noise (SSN) conditions and fail to fully capture multilingual L2 learning dynamics. Investigating multilingual models and speech LLMs provides an alternative proxy to identify effective perceptual training conditions for human listeners.

## Method

The study compares Dutch L2 human listeners against three neural models: Wav2Vec2.0-base (960h), Whisper-large-v3, and Qwen2.5-Omni-7B. Models and humans were subjected to a pretest-training-posttest design focusing on American English vowel pairs (/E/–/æ/ and /eI/–/aI/) using 100 training trials. Training conditions included 2-talker babble, 6-talker babble, quiet, and speech-shaped noise (SSN). Wav2Vec2.0 and Whisper were fine-tuned for 2 epochs using CTC loss and Levenshtein edit-distance response selection, respectively. The speech LLM (Qwen2.5-Omni-7B) was adapted using Parameter-Efficient Fine-Tuning with Low-Rank Adaptation (LoRA), taking audio prompts and option choices directly via text instructions.

## Results

Evaluated on 64-trial pre- and posttest sets in quiet and SSN conditions using word selection accuracy and average accuracy improvement (AVI). Before training, Whisper achieved the highest quiet accuracy (93.75% and 100%), outperforming human listeners (83.30% and 97.86%), while Qwen2.5-Omni-7B scored lowest (87.50% for both pairs). Under SSN test conditions, Qwen2.5-Omni-7B's baseline accuracies and post-training scores aligned closest to human L2 listener performance compared to other models. Both humans and neural models generally benefited more from 6-talker babble training than 2-talker babble. Furthermore, unlike Wav2Vec2.0 which suffered performance drops from mismatched training/test environments, the large-scale speech LLM successfully generalized and benefited from both quiet and SSN training sets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) system designers and speech researchers studying second-language acquisition, phonetic perceptual training, and human-machine cognitive alignment.

## Limitations

L2 human listeners were evaluated under restricted training conditions (only 2- and 6-talker babble with 100 stimuli) and were not grouped by language proficiency level.

## Related

- (link related pages by id as the wiki grows)
