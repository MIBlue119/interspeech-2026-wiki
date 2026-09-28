---
id: li26p_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1008
pdf: https://www.isca-archive.org/interspeech_2026/li26p_interspeech.pdf
---

# Effects of Co-speech Gesture on the Acoustic Realization of Focus in Cantonese-speaking Children With and Without Autism Spectrum Disorder

*Zhuoran Li, Si Chen, Yitian Hong, Bingxin Liu, Ho-Yi Ku, Jiayue Gao, Chun-Sing Wong, Angel Chan, Zhuoming Chen, Haoyan Ge, Bin Li, Li Sheng, Po-yi Tempo Tang, Ratree Wayland*

[PDF](https://www.isca-archive.org/interspeech_2026/li26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1008)

**TL;DR** — This study examines how co-speech gestures (deictic and iconic) modulate the acoustic realization of focus in Cantonese-speaking children with and without autism spectrum disorder (ASD), revealing that typically developing (TD) children use gestures to enhance prosodic contrast while autistic children exhibit distinct duration-shortening trade-offs indicative of multimodal integration difficulties.

## Key contributions

- Investigated the fine-grained acoustic effects of two specific gesture types (deictic and iconic) on focus prosody in 22 autistic and 25 typically developing Cantonese-speaking children.
- Extracted and analyzed 6,016 target sentences (17,818 syllables) evaluating mean f0, f0 range, and syllable duration across multiple focus and gesture conditions.
- Demonstrated that iconic gestures universally increase on-target syllable duration (d = 0.39 to 0.60) and non-focus f0 range in both groups.
- Revealed that TD children employ a post-focus duration compression strategy to enhance prosodic contrast, whereas ASD children display atypical global shortening effects with deictic gestures.

## Problem

While prosody and co-speech gestures jointly signal discourse-pragmatic focus, the degree to which manual gestures modulate the phonetic implementation of speech remains understudied, particularly in developmental populations. Autistic individuals well document difficulties with both prosodic focus marking (e.g., reduced f0 and duration expansion) and gesture-speech temporal integration. Existing accounts like the Weak Central Coherence theory and the Enhanced Perceptual Functioning Model predict that autistic individuals struggle with complex multisensory integration, yet empirical data on how gesture modifies focus prosody in ASD was lacking prior to this work.

## Method

The experiment utilized a 'Toy Talk' game paradigm conducted in a sound-proof booth, recording participants at 44,100 Hz in Audacity. The design manipulated Gesture Presence (with vs. without gesture), Gesture Type (deictic pointing vs. two-handed iconic depictions), and Focus Type (contrastive-focus vs. non-focus, broken down into on-target and post-target syllable positions). Stimuli comprised high-frequency Cantonese vocabulary containing 16 testing trials per gesture type across varied lexical tones and avoiding unreleased coda stops.

Acoustic data extraction was performed manually in Praat for syllable boundaries, yielding mean f0, f0 range, and duration metrics. Linear mixed-effects (LME) models were fitted using the lme4 package in R, incorporating fixed effects for Participant Group, Gesture Condition, and Focus Type, alongside random intercepts for Participant, Syllable, and Tone Shape. Significant interactions were interrogated via Tukey-adjusted pairwise comparisons using emmeans.

## Experimental setup

The study evaluated 47 native Cantonese-speaking children (25 typically developing, mean age 11.37 years; 22 autistic, mean age 11.18 years) with confirmed formal diagnoses and standardized IQ and HKCOLAS expressive language scores. The evaluation framework relied on 6,016 recorded target sentences (17,818 syllables after outlier filtration via the IQR method). Baselines consisted of no-gesture control conditions matched across identical stimuli and task structures.

## Results

For iconic gestures, both groups showed a significant on-target duration lengthening effect (d = 0.39 to 0.60) and an increased f0 range on non-focus target syllables (ASD: z = 4.55, p < 0.001, d = 0.35; TD: z = 3.17, p = 0.008, d = 0.23). The TD group demonstrated post-focus duration compression under both deictic (z = -2.79, p = 0.026, d = -0.14) and iconic (z = -3.31, p = 0.005, d = -0.17) gestures to reinforce prosodic contrast, alongside elevated post-target mean f0 with iconic gestures (d = 0.15–0.16). In contrast, the ASD group failed to show post-focus temporal compression, instead exhibiting anomalous duration-shortening across both on- and post-target positions when accompanied by deictic gestures (d = -0.46 to -0.21).

The ASD group did not show significant mean f0 modulations from gestures (all p > 0.10), illustrating that autistic children do not leverage manual gestures to shape fundamental frequency cues in the same manner as neurotypical peers.

| System / Condition | On-Target Duration Effect (Iconic) | Post-Focus Duration Effect (TD) | Post-Focus Duration Effect (ASD) |
|---|---|---|---|
| Typically Developing (TD) | Increased (d = 0.39–0.60) | Compressed (d = -0.14 to -0.17) | N/A |
| Autistic (ASD) | Increased (d = 0.39–0.60) | N/A | Shortened (Deictic: d = -0.46 to -0.21) |

## Limitations

The study is limited by its sample size of 47 children and focuses exclusively on Cantonese, a tonal language where tonal constraints might interact uniquely with f0 range and duration metrics. The investigation is restricted to child populations aged around 11 years, leaving developmental trajectories across younger or older cohorts unexplored. Furthermore, cognitive-motor load factors were inferred rather than measured via direct kinematic or neural tracking.

## Why read this

Speech and ML researchers studying multimodal speech synthesis, human-robot interaction, or atypical communication will find this paper valuable for understanding the fine-grained acoustic coupling between manual gestures and vocal prosody. It provides empirical constraints on how gesture-speech integration fails or adapts in neurodevelopmental conditions like ASD.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Design of multimodal conversational agents, assistive technologies for children with autism, and automated diagnostic tools for evaluating speech-gesture integration anomalies.

## Related

- (link related pages by id as the wiki grows)
