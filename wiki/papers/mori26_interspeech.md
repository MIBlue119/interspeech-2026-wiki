---
id: mori26_interspeech
category: tts
labels: [generative-model]
institutions: ["Utsunomiya University"]
code: https://www.speech-lab.org/hiroki/IS2026/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2141
pdf: https://www.isca-archive.org/interspeech_2026/mori26_interspeech.pdf
---

# Evaluating Automatic Laughter Phone Annotation for Socially-Situated Laughter Synthesis

*Hiroki Mori, Hiroto Ueda*

[PDF](https://www.isca-archive.org/interspeech_2026/mori26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mori26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2141)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper evaluates automatic laughter phone annotation for conversational laughter synthesis using both traditional statistical parametric speech synthesis (SPSS) and audio-LLM (Fish-Speech) approaches, discovering that audio-LLMs yield higher naturalness while SPSS achieves superior reproducibility of specific laughter styles.

## Key contributions

- Constructed an improved speaker-independent laughter phone recognizer on a newly developed 11-speaker dataset, achieving a phone boundary error of 23.0 ms and 30% substitution error for unseen speakers.
- Built and compared two distinct conversational laughter synthesis frameworks (SPSS-based and Fish-Speech audio-LLM) using manual, automatic, and unannotated phone labels.
- Evaluated the impact of automatic annotation accuracy on downstream laughter generation, showing that automated labels degrade SPSS performance compared to manual labels, though they still outperform unconditioned baselines.
- Demonstrated that audio-LLMs achieve near-natural acoustic quality without phone supervision, but lag behind SPSS in reproducing specific, individual laughing styles.

## Problem

Modeling nonverbal vocalizations like conversational laughter is underexplored in modern dialogue agents. Traditional laughter synthesis depends heavily on expert manual phone annotations over scarce datasets, creating a major bottleneck. While automatic phone recognition has improved, the downstream impact of recognition errors on synthesized laughter quality—and whether audio-LLMs eliminate the need for phone annotations entirely—remains unknown.

## Method

The laughter phone recognizer uses a framewise+d method built on top of XLSR-53 large (a wav2vec 2.0 model) serving as a 39-class CV classifier with three binary auxiliary feature recognizers, followed by dynamic programming with a phone duration model for boundary refinement.

For synthesis, two distinct backends are evaluated: (1) An SPSS-based vocoder-synthesizer using a 3-layer bidirectional LSTM (128 hidden units) that maps 128 input features (CV identity, phonetic variations, context, phone position, laughter length, and speaker one-hot) to 59th-order Mel-cepstrum, log F0, aperiodicity, and voicedness. (2) Fish-Speech, a fast-slow autoregressive audio-LLM (FishAudio S1 pre-trained on 2M+ hours) that uses a Slow Transformer for global semantics/prosody and a Fast Transformer for acoustics, prompted via zero-shot target speaker audio and text token inputs (e.g., laughter phone sequences or a simple 'LoL' token).

Four training/prompting conditions were tested: ManualLabel, AutoLabel, AutoLabel+ (expanded data for SPSS with 29 extra speakers), and NoLabel (using a single generic LoL token).

## Experimental setup

Evaluated using spontaneous laughter datasets from the Action Gameplay Social Communication corpus (AGSC) and Online Gaming Voice chat Corpus (OGVC), utilizing an 11-speaker dataset split into train and test sets across seen and unseen speakers. Evaluated via listening tests (MOS for naturalness and SMOS for similarity of 'way of laughing' and individuality) with 20 to 30 crowdsourced subjects across 320 stimuli (naturalness) and 280 pairs (similarity).

## Results

For naturalness (MOS), Fish-Speech models scored highest across conditions (ManualLabel: 3.62, AutoLabel: 3.48, NoLabel: 3.46), closely trailing natural laughter (3.94), with no statistically significant differences across its prompting variants. SPSS models scored lower on naturalness (ManualLabel: 2.71, AutoLabel: 2.51, AutoLabel+: 2.27, NoLabel: 1.62), where automatic labels and data expansion underperformed manual labels, and unannotated baselines collapsed.

Conversely, for similarity in the 'way of laughing' (SMOS), SPSS-based models heavily outperformed Fish-Speech when conditioned on phone labels (ManualLabel: 3.94, AutoLabel: 3.46 vs Fish-Speech ManualLabel: 2.58). Fish-Speech proved too uniform and failed to show significant sensitivity to phone-level prompts, indicating that zero-shot audio-LLMs cannot easily capture specific human laughter styles through simple text-based phone prompts alone.

| System & Condition | Naturalness (MOS) | Way of Laughing (SMOS) | Individuality (SMOS) |
|---|---|---|---|
| SPSS + ManualLabel | 2.71 | 3.94 | 3.46 |
| SPSS + AutoLabel | 2.51 | 3.46 | 2.95 |
| SPSS + NoLabel | 1.62 | 1.37 | 1.64 |
| Fish-Speech + ManualLabel | 3.62 | 2.58 | 2.90 |
| Fish-Speech + NoLabel | 3.46 | 2.40 | 2.64 |
| Natural Laughter | 3.94 | - | - |

## Limitations

The study is restricted to Japanese laughter data sourced from two gaming voice-chat corpora (AGSC and OGVC), limiting cross-lingual and cross-cultural generalization. The automatic annotation pipeline suffers from a 30% substitution error rate, which creates an annotation-style mismatch during SPSS training. Additionally, the audio-LLM evaluation was limited to zero-shot prompting rather than full fine-tuning due to architectural scope.

## Why read this

Speech and ML engineers building conversational agents or reactive avatars should read this to understand the trade-offs between legacy statistical parametric models and modern audio-LLMs for nonverbal vocalizations. It provides a sobering baseline showing that audio-LLMs currently lack style control for fine-grained expressions like laughter despite superior acoustic naturalness.

## Code

- https://www.speech-lab.org/hiroki/IS2026/

## Applications

Conversational AI agents, social robotics, virtual avatars, and interactive gaming companions requiring expressive nonverbal feedback.

## Institutions / 機構

Utsunomiya University

## Related

- [NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation](ni26_interspeech.md) — same problem · relatedness 2.0/3
- [NVV-SuperBench: Beyond Words, Beyond Quality—Benchmarking Nonverbal Vocalizations in Speech Generation](xue26c_interspeech.md) — same problem · relatedness 2.0/3
- [MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation](chen26_interspeech.md) — same problem · relatedness 1.9/3
- [Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning](polle26_interspeech.md) — shared technique · relatedness 1.7/3
- [MultiLinguahah : A New Unsupervised Multilingual Acoustic Laughter Segmentation Method](callejas26_interspeech.md) — complementary · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
