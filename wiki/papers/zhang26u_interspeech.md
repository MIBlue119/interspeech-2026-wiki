---
id: zhang26u_interspeech
category: translation
labels: [multilingual, efficient-on-device, streaming-real-time]
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1323
pdf: https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.pdf
---

# Learning to Wait: Real Streaming Speech-to-Text Translation with an LLM

*Shucong Zhang, Titouan Parcollet, Rogier van Dalen*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1323)

**Category:** `translation` · **Labels:** `multilingual`, `efficient-on-device`, `streaming-real-time`

**TL;DR** — This paper introduces a learned wait policy for LLM-based streaming speech-to-text translation to replace brittle fixed cadence policies, achieving lower latency while being immune to early-silence hallucinations.

## Key contributions

- Replaces the fixed wait-k cadence policy in LLM speech translation with a learned wait policy that outputs a 2D probability distribution over binary wait (W) or emit (E) actions.
- Formulates an efficient multi-task training objective that evaluates both the wait policy and LLM simultaneously using causal token attention and time-stepped cross-attention masks.
- Introduces 'SilFleurs', a reproducible evaluation benchmark injecting initial silence to expose real-world failure modes (hallucinations) of fixed-policy streaming systems.
- Demonstrates superior latency-quality tradeoffs on English-to-French and English-to-Korean translation tasks without suffering performance drops in noisy/silent deployment conditions.

## Problem

Current state-of-the-art streaming speech translation systems using Large Language Models (LLMs)—such as Bestow—rely on a fixed 'wait-k' policy that outputs tokens at a strict, rigid cadence determined by input audio chunks. In real-world deployment, this assumption breaks down completely: if a microphone opens before speech starts, the system hallucinates text; if speakers talk slowly or pause, it generates unnecessary tokens; and if they speak quickly, it falls irrevocably behind. This makes fixed-policy models completely unreliable outside of clean, perfectly segmented benchmark datasets.

## Method

The system builds upon the Bestow architecture, consisting of a Conformer speech encoder (300M parameters, pretrained via BEST-RQ and dynamic chunk training on Loquacious), an in-house 3B parameter LLM (frozen with rank-8 LoRA applied to dense layers), and a conditioning network using 2 Transformer decoder layers with cross-attention. To control streaming emission, a lightweight learned wait policy (30M parameters, initialized as a modified Transformer decoder with a 768-dim RoPE self-attention layer and 1,024-dim GeLU FFN) is inserted. At each inference step, the wait policy processes encoded audio up to time t and emitted text history u to output a binary action distribution: 'wait' (W, appending an audio chunk) or 'emit' (E, generating an LLM token). 

During training, since ground-truth text alignments are fully known, the wait policy and LLM are trained jointly without interleaving. The wait policy receives all tokens with a causal attention mask, while its cross-attention layers use a custom cross-attention mask matching the reference time alignment (t, u) pairs across T+U steps. The total loss is simply the sum of the wait policy classification loss and the LLM generation loss. During inference, the decoder searches dynamically, emitting tokens only when sufficient information has accumulated in the audio stream.

## Experimental setup

Evaluated on the French and Korean validation and test sets of Fleurs, alongside a newly created 'SilFleurs' dataset featuring 5 seconds of Musan noise prepended at -20 dB. The translation training corpus combines LibriSpeech, CommonVoice v14.0, and MuST-C (approximately 3,700 hours), with synthetic target translations and force-aligned timestamps generated using GPT-4, QWEN-14B, and NeMo. Models are trained on four A100 GPUs using SpeechBrain, with Bestow variants optimized for 180,000 steps (batch size of 600 seconds total duration) using the Adam optimizer. Baselines include an offline concatenated LLM, standard Bestow with a fixed wait-k policy (1.28s initial wait, 640ms chunk cadence), and Bestow using AlignAtt cross-attention score argmax decoding.

## Results

On standard English-to-French Fleurs, the learned wait policy achieves a COMET score of 0.767 at a latency of 1.72s, outperforming the fixed Bestow baseline which yields 0.767 COMET at 3.57s latency. When evaluated on SilFleurs (prepended silence), the fixed-policy Bestow collapses catastrophically, dropping from 0.767 to 0.593 COMET (French) and 0.814 to 0.486 COMET (Korean) due to severe hallucination. In contrast, the proposed learned wait policy retains near-identical robustness, scoring 0.745 COMET on French SilFleurs and maintaining 0.820 COMET on Korean SilFleurs.

In the English-to-Korean setup, the learned wait policy yields 2.37s latency (COMET 0.820) versus the fixed policy's 2.59s latency (COMET 0.814) and AlignAtt's 2.60s latency (COMET 0.840). While the offline concatenated decoder achieves higher raw translation quality (COMET 0.821 in French, 0.889 in Korean), it cannot stream and suffers an unconstrained latency of 5.20s.

| System, wait policy | FR Fleurs COMET | FR Fleurs Latency | SilFleurs (FR) COMET |
|---|---|---|---|
| Concat., offline | 0.821 | 5.20 s | 0.821 |
| Bestow, fixed | 0.767 | 3.57 s | 0.593 |
| Bestow, AlignAtt. | 0.754 | 2.56 s | 0.650 |
| Bestow, learned | 0.767 | 1.72 s | 0.745 |

## Limitations

The evaluation relies heavily on synthetic text translations and automatic forced alignments for training data creation, which may introduce compounding noise or alignment artifacts. The current experiments explore only two language pairs (English-to-French and English-to-Korean) with a single base LLM scale (3B parameters), leaving multi-directional scaling and low-resource robustness unverified. Furthermore, the approach requires paired offline reference transcripts with precise timestamp alignments during training, making it less straightforward to adapt to raw unsupervised speech corpora.

## Why read this

Speech and LLM engineers building real-time conversational streaming assistants should read this to understand how to replace rigid chunk-based cadence policies with adaptive, hallucination-resistant neural wait policies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech-to-text translation for live multilingual video captioning, conversational AR/VR agents, and simultaneous interpretation systems.

## Institutions / 機構

Samsung

## Related

- (link related pages by id as the wiki grows)
