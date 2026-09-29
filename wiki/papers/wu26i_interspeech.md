---
id: wu26i_interspeech
category: asr
institutions: ["Qifu Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2029
pdf: https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.pdf
---

# AFG-Bias: Acoustic-Fusion-Gated Biasing for Plug-and-Play Hotword Customization in LLM-Based ASR

*Long Wu, Lingchao Zhao, Yuanzhong Zheng, Haojun Fei, Qing Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2029)

**Category:** `asr`

**TL;DR** — AFG-Bias is a plug-and-play contextual biasing framework that grounds hotwords in continuous acoustic representations without modifying frozen LLM-ASR parameters, achieving up to 74.1% relative CER reduction on domain-specific benchmarks.

## Key contributions

- Cross-Modal Acoustic Retrieval (CAR) uses sliding-window cosine similarity in a shared adapter space to localize sub-utterance hotword candidates while absorbing pronunciation duration variability.
- Acoustic-Fusion Gating merges multimodal states into a confidence circuit via an acoustic attention and gate MLP to structurally inject verified bias and suppress contextual hallucinations.
- A Targeted Sparse Mask and dual loss objective (Hotword Recognition Loss plus Gate Supervision Loss) train the lightweight module while keeping underlying LLM parameters completely frozen.
- Demonstrated robust cross-backbone generalization across FireRedASR, OSUM, and Kimi, overcoming the scale collapse and prompt-overload failures typical of prompt injection and RAG.

## Problem

Large language model-based automatic speech recognition (LLM-ASR) architectures excel at general transcription but frequently fail on acoustically rare, domain-specific entities like proper names, medical terms, and financial codes. Prior approaches like shallow fusion are incompatible with generative LLM decoding, deep contextualization is built for traditional E2E systems, and text-based prompt injection/RAG bypasses acoustic grounding to trigger severe contextual hallucinations and scale collapse. This leaves open the challenge of achieving scalable, hallucination-free biasing for completely frozen LLM-ASR backbones.

## Method

AFG-Bias operates as a lightweight plug-and-play module that interfaces directly with continuous acoustic features from frozen ASR encoders/adapters without updating backend LLM weights. First, Cross-Modal Acoustic Retrieval (CAR) evaluates sub-utterance alignment by sliding a frame window of size W = L * tau across normalized acoustic features Es, where tau is the per-token acoustic receptive field. The local alignment score computes maximum cosine similarity per token, and the global presence averages these token-level maxima to find the optimal window offset p while selecting the top-K scoring candidates.

Next, the extracted top-K hotword embeddings H are passed alongside acoustic context A into a HotWord-Attention module with residual connections and layer normalization. In parallel, the LLM hidden embedding ht^LLM queries the acoustic sequence via an Acoustic-Attention module. The resulting context is concatenated with acoustic embeddings and routed through a Gate-MLP and Sigmoid function to generate a confidence gate pt_gate. A Hotword Recognition Loss computes cross-entropy over unmasked raw vocabulary projections to suppress non-hotword distractors, while a Binary Cross-Entropy Gate Supervision Loss (weighted by lambda_g = 0.2) trains the acoustic gate using binary span tags.

During inference, a targeted sparse mask M zero-outs all non-candidate tokens across the vocabulary. The final sparse hotword bias vector multiplies the gated hotword features before projection, and is added directly to the frozen LLM pre-softmax logits at each decoding step. This guarantees that decoding is steered toward verified sub-tokens while ensuring a valid, normalized probability distribution that naturally seals off trailing hallucinations.

## Experimental setup

The framework is trained on AISHELL-1 and KeSpeech. Evaluation utilizes open-source SeACo hotword subsets (Dev/Test-Aishell1-NE, containing 1,334/808 utterances and 371/226 hotwords respectively) alongside two internal domain-specific datasets (Financial with 200 utterances/hotwords, and Medical with 1,000 utterances/hotwords). Metrics reported include Character Error Rate (CER), Hotword Recall, and Hotword F1. The architecture uses an inner dimension of 256, a single-layer unidirectional LSTM bias encoder, top-K = 5, receptive stride tau = 3, biasing weight alpha = 0.4, and is evaluated across FireRedASR, OSUM, and Kimi backbones.

## Results

On domain-specific cohorts, naive prompt injection causes catastrophic context collapse (CER exceeding 30%), whereas AFG-Bias stabilizes recognition and slashes CER. Specifically, FireRedASR CER drops from 6.04% to 2.96% (51.0% relative reduction) on the Financial set and from 6.59% to 3.38% on the Medical set, while OSUM CER decreases from 10.93% to 2.83% (74.1% relative reduction). On the general-domain Test-Aishell1-NE benchmark, AFG-Bias boosts FireRedASR hotword F1 from 83.3% to 86.5% while maintaining baseline CER stability (1.91%). Ablations confirm that removing the gating mechanism causes financial CER to surge to 20.18% due to unconstrained hallucination, while dropping CAR impairs candidate selection. Scalability tests show CER remains resilient up to 1,200 distractor candidates (3.86% CER with >88% recall).

| System / Condition | Financial CER (%) | Financial F1 (%) | Medical CER (%) | Medical F1 (%) |
|---|---|---|---|---|
| FireRedASR (Baseline) | 6.04 | 91.0 | 6.59 | 90.0 |
| FireRedASR + Prompt Injection | >30.0 | — | >30.0 | — |
| FireRedASR + Prompt + CAR(top-5) | 13.62 | — | 12.18 | — |
| FireRedASR + AFG-Bias (Ours) | 2.96 | 94.7 | 3.38 | 94.2 |
| OSUM (Baseline) | 10.93 | 87.4 | 10.66 | 85.5 |
| OSUM + AFG-Bias (Ours) | 2.83 | 95.8 | 6.74 | 90.7 |

## Limitations

The framework's ultimate retrieval capacity is bounded by the precision of the initial CAR candidate selector, as evidenced by oracle analysis where perfect per-utterance error lists yield further substantial CER gains. Evaluation is primarily demonstrated on Mandarin benchmarks (AISHELL-1, KeSpeech, and domain sets), leaving multilingual scalability unverified. Additionally, training requires paired transcripts with entity annotations or dynamic span sampling, and extra compute is needed for the continuous alignment and attention gating modules during inference.

## Why read this

Researchers and engineers working on production LLM-ASR deployment who need to inject custom vocabulary lists without retraining massive base models or suffering from prompt-induced hallucinations should read this to see how acoustic gating solves contextual scale collapse.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Domain-specific voice assistants, medical dictation systems, and financial transcription engines requiring real-time, hallucination-free customization of rare vocabulary.

## Institutions / 機構

Qifu Technology

## Related

- [UGPCB: Uncertainty-Gated Phonetic Contextual Biasing for Improving Hotword Recognition in Large Speech Models](hou26_interspeech.md) — same problem · relatedness 2.9/3
- [COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation](guo26b_interspeech.md) — same problem · relatedness 2.7/3
- [LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR](he26c_interspeech.md) — same problem · relatedness 2.5/3
- [Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild](munyampirwa26_interspeech.md) — same problem · relatedness 2.3/3
- [Context Projector: Complementary Keyword and Dialogue Context Embeddings for LLM-based ASR](villatorotello26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
