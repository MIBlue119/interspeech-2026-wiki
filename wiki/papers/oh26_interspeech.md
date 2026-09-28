---
id: oh26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-410
pdf: https://www.isca-archive.org/interspeech_2026/oh26_interspeech.pdf
---

# L-Proto: Language-Aware Episodic Prototypical Training for Multilingual Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/oh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-410)

**TL;DR** — L-Proto is a language-aware episodic prototypical training strategy for multilingual speaker verification that constructs single-language episodes to reduce cross-lingual embedding entanglement, yielding consistent EER and minDCF improvements across multiple backbones.

## Problem

Multilingual speaker verification suffers when language-dependent phonetic and prosodic traits entangle with speaker identity during training, causing utterances from the same person to form language-specific sub-clusters and degrading cross-lingual verification. Standard global training and random episodic sampling fail to control for this linguistic interference, which distorts prototype estimation and reduces similarity-comparison reliability. Addressing this gap is critical for robust speaker recognition across diverse and mismatched language pairs.

## Method

The method, L-Proto, utilizes streaming episode sampling and an episodic prototypical objective combined with a global speaker classification loss. Each training episode is constrained to a single language by buffering utterances per speaker and dynamically selecting $P$ speakers with $K$ utterances each once ready. During episodic learning, speaker prototypes are computed as the mean of support embeddings within the language-consistent episode, and a cross-entropy loss over cosine similarities enforces query-prototype proximity. Training is optimized end-to-end with a joint objective weighted by $\lambda$, evaluated using backbones such as SimAM-ResNet34, SimAM-ResNet100, ResNet variants, CAM++, and ECAPA-TDNN initialized from VoxBlink2 checkpoints and fine-tuned on TidyVoiceX.

## Results

Evaluated on the TidyVoice Challenge development set (derived from TidyVoiceX with over 4,474 speakers across roughly 40 languages and 321k utterances), L-Proto consistently outperformed pretrained and standard fine-tuned baselines across metrics like Equal Error Rate (EER) and minimum Detection Cost Function (minDCF). For SimAM-ResNet34, L-Proto reduced the overall development EER from 1.56% (fine-tuning) down to 0.95%, with significant gains particularly in cross-lingual target conditions (e.g., D/D and D/S trial pairs). Across public backbones including ResNet variants and ECAPA-TDNN models, L-Proto secured superior EER figures. Centroid cosine similarity analysis confirmed that L-Proto increases intra-speaker cross-lingual similarity (Simintra up to 0.8536) while shrinking inter-speaker similarity (Siminter down to 0.0479), widening the separation margin.

## Code

- https://github.com/hs-oh-prml/L-Proto/

## Applications

Speech and ML engineers building multilingual speaker verification or speaker recognition systems for global applications with cross-lingual enrolment and test conditions.

## Limitations

The method requires explicit language labels for incoming samples, sufficient speaker diversity within each target language, and incurs additional online data sampling overhead.

## Related

- (link related pages by id as the wiki grows)
