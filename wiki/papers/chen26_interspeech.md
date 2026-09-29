---
id: chen26_interspeech
category: translation
labels: [multilingual, generative-model]
institutions: ["National Taiwan University", "NVIDIA"]
code: https://47zzz.github.io/MoVE/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-42
pdf: https://www.isca-archive.org/interspeech_2026/chen26_interspeech.pdf
---

# MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation

*Szu-Chi Chen, I-Ning Tsai, Yi-Cheng Lin, Sung-Feng Huang, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-42)

**Category:** `translation` · **Labels:** `multilingual`, `generative-model`

**TL;DR** — MoVE introduces a Mixture-of-LoRA-Experts architecture with a dynamic soft-weighting router to preserve non-verbal vocalizations (laughter and crying) and emotional nuances in speech-to-speech translation (S2ST), successfully replicating target NVs in 76% of test cases.

## Key contributions

- Proposed an automated generation-selection data synthesis pipeline utilizing IndexTTS2 to construct a 1000-hour expressive S2ST corpus covering diverse affective states and extreme non-verbal vocalizations.
- Introduced MoVE, a Mixture-of-LoRA-Experts framework featuring five specialized vocalization adapters and a token-level soft-weighting router that blends experts for hybrid expressive states without cross-emotional interference.
- Demonstrated extreme data efficiency enabled by foundation AudioLLMs, where fine-tuning via LoRA with as little as 30 minutes of curated data achieves 95% of full-data emotional fidelity.
- Pioneered the adaptation of general-purpose AudioLLMs for end-to-end S2ST by freezing base parameters and confining expressive adaptation to lightweight LoRA modules.

## Problem

Current Speech-to-Speech Translation (S2ST) systems prioritize semantic accuracy while consistently stripping away non-verbal vocalizations (NVs) such as laughter and crying, leading to severe pragmatic biases in cross-language communication. This limitation stems from two major bottlenecks: a severe scarcity of high-quality training corpora containing authentic, clean NVs, and the architectural difficulty of training custom end-to-end S2ST models that combine ASR, MT, and TTS while modeling conflicting emotional states without inter-ference. Prior models like SeamlessM4T, SeamlessExpressive, and GPT-4o-audio-preview fail to preserve NVs effectively, capturing them in at most 14% of cases. Overcoming this is crucial to prevent translated speech from losing humor, sarcasm, or emotional intent.

## Method

The MoVE architecture is built upon the pretrained AudioLLM Kimi-Audio-7B-Instruct, freezing base parameters and injecting 5 parallel LoRA adapters across all transformer layers (applied to Wq, Wk, Wv, Wo, and Wgate matrices) to specialize in Happy, Sad, Angry, Laughing, and Crying manifolds. LoRA experts are configured with rank r = 256 and scaling factor alpha = 256. Instead of hard top-k routing, a dynamic token-level soft-weighting router with a Softmax activation computes a continuous mixture weight for each expert using a lightweight linear layer, allowing fine-grained blending for hybrid states like nervous laughter. The pretrained detokenizer is fine-tuned on expressive NV speech synthesized via IndexTTS2 to reliably render extreme NVs.

The training follows a two-stage strategy: Stage 1 involves independent expert specialization where each of the 5 LoRA adapters is trained separately on its expressive subset for 2 epochs using the AdamW optimizer (beta_2 = 0.95, lr = 1e-5) with the base LLM and Whisper encoder frozen. Stage 2 optimizes the dynamic router on the full dataset for 1 epoch using the final language modeling loss without explicit emotion labels. The training data pipeline uses GigaSpeech and GigaST parallel text, emotional prompts from CREMA-D, MSP-IMPROV, and IEMOCAP, laughter extracted via a confidence > 0.99 detector, crying prompts from JVNV, and IndexTTS2 for attribute decoupling (conditioning TTS on NV prompts while sourcing neutral prompts for speaker identity), followed by librosa silence trimming and Whisper-small WER filtering (<= 0.5).

## Experimental setup

Evaluated on 1000 English-Chinese pairs from CVSS-T for semantic translation (ASR-BLEU), a curated out-of-domain test set from NonverbalTTS (up to 1000 utterances per category) for objective emotional fidelity (Arousal-Valence Similarity, Aro-Val SIM), and 30 human-evaluated utterances for Naturalness MOS, Emotion SMOS, and NV Match Accuracy across 6 categories. Compared against SeamlessM4T-Large-v2, SeamlessExpressive, gpt-4o-audio-preview, Kimi-Audio-7B-Instruct, single-LoRA baselines on SynStard-100 and SeamlessAlignExpressive, and a cascaded oracle pipeline.

## Results

MoVE achieves an en->zh ASR-BLEU of 32.5 and zh->en ASR-BLEU of 21.4, outperforming or matching strong baselines like SeamlessM4T-Large-v2 (25.8 en->zh) and gpt-4o-audio-preview (26.3 en->zh). In terms of objective emotional fidelity, MoVE attains an Aro-Val SIM score of 0.53, substantially beating SeamlessExpressive (0.45) and Kimi-Audio-7B-Instruct (0.11). Subjectively, MoVE secures the highest Naturalness MOS (3.85) and Emotion SMOS (3.79) among all end-to-end models, and successfully matches target NVs in 76.0% of cases compared to SeamlessExpressive's 14.0% and Kimi-Audio's 4.0%. In pairwise A/B tests against a single-LoRA baseline, MoVE is preferred in 60.0% of cases (vs 17.3% for single-LoRA). Ablations confirm that 100h of the authors' synthetic dataset outperforms 100h of SynStard and 67h of SeamlessAlignExpressive when paired with a single LoRA.

| System | ASR-BLEU (en->zh) | Aro-Val SIM | Nat. MOS | Emo. SMOS | NV Match (%) |
|---|---|---|---|---|---|
| SeamlessM4T-Large-v2 | 25.8 | 0.14 | 1.65 | 1.47 | 2.0 |
| SeamlessExpressive | 23.8 | 0.45 | 1.41 | 2.57 | 14.0 |
| gpt-4o-audio-preview | 26.3 | 0.18 | 2.87 | 1.95 | 2.0 |
| Kimi-Audio-7B-Instruct | 25.0 | 0.11 | 3.26 | 2.03 | 4.0 |
| Single-LoRA (Ours 100h) | 31.2 | 0.51 | - | - | 26.0 |
| **MoVE (Ours)** | **32.5** | **0.53** | **3.85** | **3.79** | **76.0** |

## Limitations

The current scope is restricted to English-Chinese translation pairs, reflecting the language constraints of the underlying IndexTTS2 and Kimi-Audio models. The evaluation covers five specific emotional and non-verbal manifolds (Angry, Happy, Sad, Laugh, Cry), leaving other nuances like high-valence/low-arousal states unexplored due to acoustic ambiguity. Furthermore, extreme NV categories require synthetic data generation pipelines that may introduce domain artifacts if not carefully filtered.

## Why read this

Researchers and engineers building expressive, multi-modal speech-to-speech translation systems should read this paper to learn how to leverage lightweight LoRA mixture-of-experts with soft-weighting routers to inject paralinguistic control into foundation AudioLLMs with remarkable data efficiency.

## Code

- https://47zzz.github.io/MoVE/

## Applications

Cross-language real-time communication systems, cross-lingual dubbing, immersive conversational AI, and empathetic voice assistants.

## Institutions / 機構

National Taiwan University, NVIDIA

**Funding / 經費:** Ministry of Education

## Related

- [NVV-SuperBench: Beyond Words, Beyond Quality—Benchmarking Nonverbal Vocalizations in Speech Generation](xue26c_interspeech.md) — same problem · relatedness 2.2/3
- [The Interspeech 2026 Challenge on Transfer of Pragmatic Intent in Speech-to-Speech Translation](ward26_interspeech.md) — same problem · relatedness 2.2/3
- [NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation](ni26_interspeech.md) — complementary · relatedness 2.1/3
- [Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning](polle26_interspeech.md) — same problem · relatedness 2.0/3
- [Decoding the Ear (DeEAR): A Framework for Objectifying Expressiveness from Human Preference Through Efficient Alignment](lin26l_interspeech.md) — complementary · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
