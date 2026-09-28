---
id: dong26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-966
pdf: https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.pdf
---

# English Vowel Perceptual Training under Multitalker Babble: A Comparison of Humans and Large Language Models

*Wenwei Dong, Alif Silpachai, Catia Cucchiarini, Helmer Strik*

[PDF](https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-966)

**TL;DR** — This paper investigates whether multilingual neural models (Whisper and speech LLM Qwen2.5-Omni-7B) mirror second-language (L2) human listeners in perceptual vowel training under multitalker babble. The speech LLM demonstrates trends and noise robustness most closely aligned with human L2 listeners, achieving up to 90.62% accuracy under speech-shaped noise.

## Key contributions

- Evaluated pre-trained multilingual speech models (Whisper-large-v3 and Qwen2.5-Omni-7B) on second-language English vowel perception tasks (/E/–/æ/ and /eI/–/aI/).
- Compared neural model learning trajectories against 70 native Dutch L2 listeners under 2-talker and 6-talker multitalker babble (MTB) high variability phonetic training.
- Benchmarked neural models under mismatched (MTB) versus matched (quiet and speech-shaped noise) training and testing conditions.
- Demonstrated that speech LLMs exhibit greater accuracy consistency and human-like performance degradation in adverse noise environments compared to encoder-only or ASR-only models.

## Problem

Second-language learners struggle to perceive non-native phonetic contrasts absent in their native language, though targeted computer-assisted phonetic training can help. Conducting perceptual experiments to determine optimal multitalker babble configurations for humans is complex and time-consuming. While prior neural architectures like Wav2Vec2.0 have been used to simulate human perception, they are typically limited to single languages, perform poorly in speech-shaped noise (SSN), and fail to capture complex L2 learning dynamics. This work investigates whether modern multilingual models and speech LLMs can accurately replicate human L2 perceptual learning patterns.

## Method

The study evaluates Wav2Vec2.0-base-960h (960 hours Librispeech), Whisper-large-v3 (5 million hours), and the multimodal speech LLM Qwen2.5-Omni-7B (7 billion parameters). The evaluation task is a two-alternative forced choice (2AFC) vowel discrimination test targeting American English contrasting pairs (/E/–/æ/ and /eI/–/aI/) embedded in monosyllabic words. Human L2 listeners (70 native Dutch speakers) underwent high variability phonetic training (HVPT) with corrective feedback using 100 training trials per condition, split evenly between 2-talker and 6-talker babble configurations generated from readings of The Wonderful Wizard of Oz.

Neural models were fine-tuned using exact parallel conditions across four training environments: 2-talker babble, 6-talker babble, quiet, and speech-shaped noise (SSN). Wav2Vec2.0 was fine-tuned for 2 epochs using Connectionist Temporal Classification (CTC) loss and evaluated via forced alignment confidence scores. Whisper-large-v3 was fine-tuned for 2 epochs using a lower learning rate, with choices determined by character-level Levenshtein edit distance. Qwen2.5-Omni-7B was adapted using Low-Rank Adaptation (LoRA) for parameter-efficient fine-tuning, directly consuming speech audio and textual option prompts to output the perceived word.

Inference benchmarking utilized pre- and post-tests comprising 64 trials each (32 per test set, produced by independent speakers not present in training). Babble and noise configurations were strictly controlled, with SSN derived from the long-term spectrum of speech read from White Fang.

## Experimental setup

Evaluated on 70 native Dutch L2 listeners (self-reported mean fluency 3.76/5) and three neural models: Wav2Vec2.0, Whisper-large-v3, and Qwen2.5-Omni-7B. Datasets comprised pretests (32 trials), training sets (100 trials), and posttests (32 trials) across quiet, SSN, 2-talker, and 6-talker babble conditions. Evaluation metrics measured word selection accuracy, average improvement (AVI), and total average improvement (TAVI) across vowel pairs.

## Results

Human L2 listeners showed significant improvement only in SSN conditions (improving by 3.44%, p < 0.001) and benefited more from 6-talker babble (2.59% average improvement) than 2-talker babble. In quiet conditions, neural models like Whisper and Wav2Vec2.0 suffered from ceiling effects (pre-trained accuracies exceeding 93-100%), leaving minimal room for fine-tuning improvement. In SSN test sets, pre-trained Wav2Vec2.0 and Whisper models performed poorly (averaging below 60% accuracy), whereas Qwen2.5-Omni-7B achieved 78.12% for /E/–/æ/ and 90.62% for /eI/–/aI/, closely mirroring human L2 accuracy patterns. When trained on matched quiet/SSN conditions rather than babble, Whisper achieved the highest gain in SSN test sets (28.12% improvement), demonstrating that massive pre-training data scales allow robust acoustic transfer.

| System / Condition | /E/–/æ/ Quiet (Post) | /eI/–/aI/ Quiet (Post) | /E/–/æ/ SSN (Post) | /eI/–/aI/ SSN (Post) |
|---|---|---|---|---|
| Human L2 (6-talker) | 88.04% | 98.75% | 80.89% | 93.21% |
| Wav2Vec2.0 (2-talker MTB) | 100.00% | 100.00% | 50.00% | 56.25% |
| Whisper-large-v3 (6-talker MTB) | 100.00% | 100.00% | 43.75% | 75.00% |
| Qwen2.5-Omni-7B (6-talker MTB) | 87.50% | 87.50% | 81.25% | 100.00% |

## Limitations

L2 human listeners were restricted to a short training duration (100 training stimuli) across only two babble configurations (2 and 6 talkers) due to experimental time constraints. The study did not stratify human participants by baseline second-language proficiency levels. Neural models were evaluated on a limited vocabulary of isolated monosyllabic words rather than continuous, conversational speech.

## Why read this

Researchers and engineers building speech LLMs or computer-assisted language learning (CALL) tools should read this to understand how modern multimodal architectures compare to human second-language phonetic acquisition under noise. It highlights why massive speech-LLM pre-training scales yield robust noise resilience compared to classical ASR or encoder-only representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) systems, automated second-language pronunciation training, and robust spoken language interface evaluation.

## Related

- (link related pages by id as the wiki grows)
