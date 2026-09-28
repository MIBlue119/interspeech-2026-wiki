---
id: camara26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1374
pdf: https://www.isca-archive.org/interspeech_2026/camara26_interspeech.pdf
---

# An Acoustic Landmark Database of the English Lexicon via Articulatory Synthesis

*Mateo Cámara, José Luis Blanco, Juan Ignacio Godino-Llorente, Jeung-Yoon Choi, Stefanie Shattuck-Hufnagel*

[PDF](https://www.isca-archive.org/interspeech_2026/camara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1374)

**TL;DR** — The paper introduces ALLIE-PT, a large-scale English lexicon of over 200,000 synthesized words with deterministic, time-aligned acoustic landmark annotations generated via the Pink Trombone physical vocal-tract model. The dataset achieves an average Short-Time Objective Intelligibility (STOI) score of 0.75 compared to clean human reference speech.

## Key contributions

- Created the Articulatory Landmark Lexicon of English - Pink Trombone (ALLIE-PT) containing over 115,000 words rendered in parallel adult male and female configurations (>200,000 total WAV files).
- Developed a programmatic rule-based pipeline that deterministically places 8 distinct landmark types (V, G, Sc, Sr, Fc, Fr, Nc, Nr) at exact physical articulatory events, eliminating human labeling variability.
- Provided a lexical statistical analysis showing a consonantal-to-vocalic landmark ratio of approximately 1.595 and charted the top landmark bigrams across the English lexicon.
- Released an open-source web-based interactive tool and Hugging Face dataset repository integrating real-time vocal-tract animation, spectrograms, and sample-level landmark timestamps.

## Problem

Acoustic Landmark Theory posits that speech perception is anchored to discrete acoustic events caused by critical articulatory gestures, offering advantages for robust ASR and clinical speech pathology. However, progress has been heavily constrained by the scarcity of large-scale, accurately annotated corpora. Manual annotation is prohibitively labor-intensive and susceptible to inter-annotator disagreement, while prior automatic annotators applied to datasets like TIMIT lack independent validation. Furthermore, natural speech suffers from pervasive coarticulation, reduction, and articulatory overlap that obscure expected acoustic cues. This work bypasses these hurdles by inverting the problem: synthesizing speech from first principles via a controllable physical model to generate unambiguous, ground-truth landmark annotations.

## Method

The corpus is derived from the CMUDict lexicon, converted from ARPABET to International Phonetic Alphabet (IPA) allophone sequences. Each IPA phone is mapped to a static, canonical configuration in the Pink Trombone (PT) synthesizer's control space—a waveguide-based physical model of the vocal tract. The parameters controlled include the glottal source ($f_0$ and voicing), a two-parameter tongue body system (position and diameter), lip and soft palate oral constrictions, and a binary velopharyngeal port for nasalization. Coarticulation is approximated via linear interpolation of adjacent parameter vectors.

To maintain a controlled sandbox, phone durations, fundamental frequency ($f_0$), and prosody are held constant across all entries, eliminating prosodic variability. The synthesizer renders 16-bit PCM audio at 48 kHz for both adult-male and adult-female anatomical configurations. Landmark labels are placed algorithmically based on deterministic rules tied to the manner of articulation: vowels (V) and glides (G) target the temporal midpoint of maximal opening/constriction; stops use closure ($	ext{Sc}$) and release ($	ext{Sr}$) templates; fricatives mark the onset ($	ext{Fc}$) and offset ($	ext{Fr}$) of turbulence noise; and nasals mark the opening ($	ext{Nc}$) and closing ($	ext{Nr}$) of oral-nasal passages.

## Experimental setup

The evaluation utilizes a phonetically balanced subset of Harvard sentences recorded by a native male speaker mimicking the flat-intonation style of the synthesizer. Performance is measured using the Short-Time Objective Intelligibility (STOI) metric. The primary database comprises 115,487 words and 1,100,803 total landmarks (676,646 consonantal, 424,157 vocalic/glide), synthesized at 48 kHz mono PCM using the Pink Trombone physical model.

## Results

The synthesized database achieves an unimodal STOI distribution with a peak and average score around 0.75 against human recordings, indicating good baseline intelligibility for synthetic speech with a substantial portion exceeding 0.8. Statistical analysis of the lexicon reveals a total of 279,980 Vowel landmarks, 153,181 Stop Closure/Release pairs, 144,177 Glides, 99,016 Fricative pairs, and 86,126 Nasal pairs. The most frequent non-defintional bigram is the CV syllable onset sequence $	ext{Sr}$–$	ext{V}$ (90,698 occurrences), followed by $	ext{V}$–$	ext{G}$ (84,490) and $	ext{G}$–$	ext{V}$ (80,048).

The approach does not win in capturing natural prosodic variation, context-conditioned allophonic detail, or complex acoustic-articulatory timing lags found in continuous human speech, resulting in a performance tail toward lower STOI scores for intricate phonetic sequences.

| System / Condition | STOI Score | Total Words | Total Landmarks | Consonantal/Vocalic Ratio |
|---|---|---|---|---|
| ALLIE-PT (Adult Male) | ~0.75 (Avg) | 115,487 | 1,100,803 | 1.595 |
| ALLIE-PT (Adult Female) | ~0.75 (Avg) | 115,487 | 1,100,803 | 1.595 |

## Limitations

The dataset models single words with fixed phone durations and flat $f_0$, lacking natural prosody, speaking rate variability, and phrasal intonation. It relies on a single canonical articulatory target per phone without fully capturing contextual allophonic variations or acoustic-articulatory timing lags (e.g., aerodynamic/biomechanical delays). The Pink Trombone is a simplified vocal tract model whose acoustic fidelity falls short of advanced physiological models like VocalTractLab.

## Why read this

Speech researchers and ML engineers building event-based ASR or automatic landmark detectors should read this to understand how generative physical modeling can resolve data scarcity and annotation ambiguity. It provides a blueprint for leveraging analysis-by-synthesis to build clean, parallel, multi-gender training resources free from human labeling errors.

## Code

- https://huggingface.co/datasets/mcamara/all-words-in-english-with-pink-trombone

## Applications

Training and benchmarking automatic acoustic landmark detectors, event-driven ASR systems, clinical speech pathology assessment, and low-resource language documentation.

## Related

- (link related pages by id as the wiki grows)
