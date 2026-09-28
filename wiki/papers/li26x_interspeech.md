---
id: li26x_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1487
pdf: https://www.isca-archive.org/interspeech_2026/li26x_interspeech.pdf
---

# What Makes Synthetic Speech Sound Sarcastic? A Prosody-Controlled Perception Study

[PDF](https://www.isca-archive.org/interspeech_2026/li26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1487)

**TL;DR** — Using a neural text-to-speech framework for controlled prosodic manipulation, this study demonstrates a divergence between humans, who rely primarily on loudness for sarcasm perception, and foundation models, which lean on speech rate.

## Problem

Investigating the independent contributions of prosodic cues to sarcasm perception is challenging because natural speech exhibits co-varying acoustic features and lacks fine-grained control. Previous studies using spontaneous speech cannot isolate causal factors, and it remains unclear whether computational foundation models align with human behavioral strategies in weighing prosodic cues.

## Method

The study utilized Qwen3-TTS-12Hz-1.7B-CustomVoice to generate a 2x2x2 factorial stimulus set manipulating pitch variation (dynamic vs. flat), loudness (loud vs. soft), and speech rate (fast vs. slow) while keeping lexical content constant. Orthogonality across dimensions was verified via Cohen's d effect sizes (duration d=1.76, pitch variation d=1.14, loudness d=0.81) and voice quality measures (H1-H2, HNR). A human perception experiment assessed 66 participants on 192 stimuli using 5-point Likert scales, and Qwen3-Omni was evaluated on the same audio inputs across six random seeds.

## Results

Linear mixed-effects modeling revealed that human sarcasm perception was driven significantly by loudness (beta = 0.29, p < 0.05), where louder realizations received higher sarcasm ratings. In contrast, the foundation model's sarcasm ratings were driven significantly by speech rate (beta = 0.31, p < 0.01), favoring slowed speech, with no significant rank-order alignment between human and model ratings (Spearman rho = -0.11, p = 0.26). For naturalness, humans rated fast speech and soft stimuli higher, whereas the model rated dynamically modulated pitch utterances as more natural.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers evaluating the perceptual alignment, prosodic sensitivity, and behavioral realism of multimodal foundation models relative to human listeners.

## Limitations

The study used a context-free design without rich discourse, many human participants were non-native English speakers, sarcasm was treated as a single category, and orthogonal separation of prosodic features can reduce naturalness.

## Related

- (link related pages by id as the wiki grows)
