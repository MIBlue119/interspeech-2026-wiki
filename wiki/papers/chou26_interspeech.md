---
id: chou26_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
institutions: ["National Tsing Hua University", "Google"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1238
pdf: https://www.isca-archive.org/interspeech_2026/chou26_interspeech.pdf
---

# Hidden Priors in Speech LLMs: Speaker Identity Shapes Emotional Perception

*Hsing-Hang Chou, Bo-Hao Su, Krishna Somandepalli, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1238)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how textual speaker-identity descriptors (accent, country, language) injected into prompts systematically bias emotion perception in speech LLMs despite fixed audio, and demonstrates that lightweight LoRA fine-tuning effectively eliminates this vulnerability.

## Key contributions

- Formulates a controlled prompt-perturbation benchmark fixing audio while varying text-injected speaker descriptors (12 values across accent, country, and language) to isolate hidden identity priors in speech LLMs.
- Quantifies identity sensitivity via an F1gap metric across multiple state-of-the-art speech LLMs (Qwen2-Audio, Qwen3-Omni, Phi-4, DeSTA2.5-Audio), proving statistically significant performance disparities under permutation tests.
- Applies gradient-based token saliency analysis to show that identity-driven prediction changes co-occur with major redistributions of acoustic focus across the audio-token span.
- Proposes a lightweight LoRA adaptation strategy with base-prompt or mix-prompt sampling that collapses identity sensitivity down to near-zero levels.

## Problem

Speech LLMs process paralinguistic signals alongside instruction prompts, making them prone to contextual biases from pretrained text-audio representations. While human listeners and conventional classifiers are known to shift emotional judgments based on sociocultural stereotypes or regional expectations, this vulnerability has not been systematically measured in multimodal speech LLMs. This matters because speech agents deployed in healthcare or assistive roles will exhibit unfair, identity-conditioned empathy gaps if their emotion predictions are easily hijacked by simple textual descriptions of who is speaking.

## Method

The authors evaluate four pretrained speech LLMs under a standardized prompt template: What emotion is expressed in the audio? {identity prompt} Output exactly one of the following emotion labels: Neutral | Angry | Happy | Sad Answer: The identity prompt slot is populated by one of 12 descriptor values covering accent (e.g., Brazilian, Egyptian), country (e.g., Brazil, Egypt), or language (e.g., Portuguese, Arabic). Zero-shot deterministic decoding (temperature = 0, top-k = 1) is used to observe the exact effect of prompt perturbations on fixed audio utterances drawn from MSP-Podcast and BIIC-Podcast.

To measure sensitivity, they calculate F1gap via a root-mean-square aggregation of the best- and worst-performing descriptor values for each emotion class. To examine H2 (acoustic focus shifts), they compute gradient-based token saliency via Captum, normalize saliency magnitudes across the contiguous audio-token span into a cumulative distribution function (CDF), and compute the mean absolute deviation (delta) between identity pairs. They test whether label-transition cases exhibit larger CDF differences using 50,000 permutations with Benjamini-Hochberg FDR correction.

To mitigate identity bias, they freeze the audio encoder and train lightweight LoRA adapters on Qwen2-Audio for 10 epochs (rank r = 8, alpha = 16, dropout = 0.1) targeting all attention projections (q_proj, k_proj, v_proj, o_proj) and feed-forward networks (gate_proj, up_proj, down_proj). They train two variants: a base-prompt setup (no identity text) and a mix-prompt setup (uniformly sampled identity attributes and values per emotion class so that text identity becomes entirely uninformative of true emotion).

## Experimental setup

Evaluated on MSP-Podcast (v1.12, English) and BIIC-Podcast (Mandarin) using a class-balanced protocol over four emotions (Neutral, Angry, Happy, Sad) with 2,000 utterances per emotion (8,000 total per dataset). Fine-tuning uses the MSP-Podcast training split with ~10,800 balanced utterances per emotion. Baselines include pre-trained Qwen2-Audio Instruct, Qwen3-Omni Instruct, Phi-4, and DeSTA2.5-Audio. Metrics include macro-F1 and F1gap (spread between best and worst identity conditions).

## Results

Across all models, identity descriptors alone induce statistically significant performance gaps (F1gap) well above the permutation null expectation (p < 0.005). Language prompts consistently generate the largest disruptions; for example, on MSP-Podcast with Qwen2-Audio, Angry F1 under a Yoruba prompt reaches 0.5808, while Turkish drops to 0.4322, despite identical audio. Saliency analysis confirms that off-diagonal prediction transitions (label changes across prompts) exhibit significantly higher audio-span CDF shifts (e.g., Neutral <-> Angry reaches 0.044 on MSP-Podcast) compared to no-transition cases.

Applying the proposed mix-prompt LoRA successfully reduces F1gap to near-zero levels (e.g., dropping the language attribute F1gap on MSP-Podcast from 0.1239 down to 0.0025), rendering the adapter statistically indistinguishable from the null permutation distribution. DeSTA2.5-Audio exhibits the strongest intrinsic resilience, showing both the highest macro-F1 (0.5632 on MSP-Podcast) and the lowest pre-trained F1gap (0.0242 for accent), confirming that stronger baseline emotion recognition competence mitigates identity-driven dispersion.

| System / Condition | MSP-Podcast Accent F1 | MSP-Podcast Accent F1gap | MSP-Podcast Language F1 | MSP-Podcast Language F1gap |
|---|---|---|---|---|
| Qwen2-Audio Instruct | 0.5455 | 0.1182 | 0.5341 | 0.1239 |
| Qwen3-Omni Instruct | 0.5559 | 0.0411 | 0.5185 | 0.1370 |
| Phi-4 | 0.4535 | 0.0440 | 0.4517 | 0.0900 |
| DeSTA2.5-Audio | 0.5655 | 0.0242 | 0.5632 | 0.0388 |
| LoRA w/ mix prompt | 0.6683 | 0.0009 | 0.6683 | 0.0025 |

## Limitations

The study evaluates only single, isolated identity attributes (accent, country, or language) rather than rich, overlapping sociocultural identities or multi-attribute compound prompts. The investigation is restricted to four coarse emotion categories (Neutral, Angry, Happy, Sad) and two conversational podcast corpora, leaving more nuanced dimensional affect spaces (valence/arousal) and interactive dialogue settings unexplored.

## Why read this

Speech/ML researchers building multimodal speech LLMs for interactive agents should read this to understand how easily textual context corrupts paralinguistic perception. It provides a concrete framework and a mix-prompt LoRA recipe to audit and immunize models against hidden identity priors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building robust, fair, and bias-resistant speech emotion recognition systems, empathetic voice assistants, and affective conversational agents deployed across diverse demographic populations.

## Institutions / 機構

National Tsing Hua University, Google

## Related

- (link related pages by id as the wiki grows)
