---
id: mokgosi26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2905
pdf: https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.pdf
---

# Tone-Conditioned Curriculum Learning for Low-Resource Bantu Speech Recognition

*Kesego Mokgosi, Vukosi Marivate, Sitwala Mundia, Unarine Netshifhefhe, Tsholofelo Mogale, Thapelo Sindane*

[PDF](https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2905)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — A tone-conditioned curriculum framework was developed for low-resource Southern Bantu speech recognition, combining hybrid difficulty scoring with gated tone-conditioned adapters. Evaluating across Whisper, W2V-BERT, and MMS revealed that W2V-BERT achieved a 23.81% WER with tone conditioning, outperforming Whisper on Nguni languages while trailing on Sotho-Tswana systems.

## Key contributions

- A hybrid difficulty scoring function for curriculum learning that combines empirical Word Error Rate with morphotonal features.
- Lightweight gated tone-conditioned adapters (2.1M parameters, ~0.3% of Whisper-large-v3-turbo) that modulate encoder representations using utterance-level tonal statistics.
- Comprehensive evaluation of Whisper, W2V-BERT, and MMS across 2 distinct datasets (Swivuriso and NCHLT) covering 6 Southern Bantu languages.
- Generalization analysis demonstrating clear architectural preferences split by language family (W2V-BERT for Nguni, Whisper for Sotho-Tswana).

## Problem

Southern Bantu languages, spoken by over 80 million people, experience zero-shot Word Error Rates above 100% in foundation ASR models like Whisper and MMS because standard orthographies omit tone and prosody. Prior ASR curriculum learning approaches rely solely on signal duration, loss, or generic WER without incorporating the complex morphotonal spreading rules and boundary tone effects specific to Bantu phrasal contours. This gap hinders the deployment of accurate speech technologies for education and public services in sub-Saharan Africa.

## Method

The framework operates in three phases: hybrid difficulty scoring, staged fine-tuning with gated adapters, and inference. First, a hybrid difficulty score $s(u) = \alpha \text{WER}_{norm} + \beta \text{Tonal}_{norm}$ is computed using a frozen fine-tuned Whisper baseline ($\alpha=0.7, \beta=0.3$). Tonal complexity is quantified without forced alignment by extracting F0 contours at 10ms intervals using Parselmouth across a 75–500Hz range, deriving transition rate, unique tone count, tone cluster count, F0 standard deviation, and F0 range, and binning semitones into 5 relative tone levels.

Next, 4 parallel gated bottleneck adapters are injected between the final encoder layer and decoder. A 2-layer MLP maps the 5-dimensional tonal vector to 4 gate values via ReLU and sigmoid activations, dynamically modulating encoder outputs through bottleneck linear layers scaling down to 256 and back to hidden dimensions. These adapters add 2.1M parameters with shared gate weights, allowing efficient training on small community datasets.

Finally, a 3-stage curriculum schedule progressively introduces data based on difficulty quintiles: Stage 1 (steps 1–650) trains on the easiest 40%, Stage 2 (steps 651–1300) on 80%, and Stage 3 (steps 1301–2000) uses the full training set. Models are optimized using AdamW with bfloat16 precision on 2 NVIDIA A100 80GB GPUs, with effective batch sizes of 32 and specific learning rates ($5 \times 10^{-5}$ for W2V-BERT, $1 \times 10^{-5}$ for Whisper) for 2,000 total steps.

## Experimental setup

Evaluated on the community-curated Swivuriso/za-african-next-voices corpus (15,988 dev/test samples across 26.7 hours; 6 languages: isiZulu, isiXhosa, Sesotho, Setswana, Tshivenda, Xitsonga) and transferred zero-shot to the NCHLT corpus (41,964 samples). Baselines include multilingual fine-tuning of Whisper (large-v3-turbo variant), W2V-BERT, and MMS-1B-All. Metrics reported are Word Error Rate (WER), Character Error Rate (CER), and BERTScore F1.

## Results

Across combined averages, W2V-BERT Tone-cond. achieved the best W2V-BERT WER of 28.41% (with 6.98% CER and 0.934 BERTScore), improving over the W2V-BERT multilingual baseline of 30.89% WER. For individual language families, W2V-BERT outperformed Whisper on Nguni languages (e.g., isiZulu Swivuriso WER 24.79% vs 28.12%), whereas Whisper excelled on Sotho-Tswana languages (e.g., Setswana Swivuriso WER 18.60% with Whisper Tone+Curr.).

Curriculum variants yielded mixed results: hybrid curriculum did not universally surpass static tone conditioning, and MMS performed best with WER-only curriculum ordering rather than the hybrid approach (achieving 40.86% average WER vs 50.47% for tone+curr).

| System / Condition | WER (%) | CER (%) | BERTScore |
|---|---|---|---|
| Whisper Multilingual | 29.44 | 7.44 | 0.936 |
| Whisper Tone-cond. | 31.36 | 8.87 | 0.934 |
| W2V-BERT Tone-cond. | 28.41 | 6.98 | 0.934 |
| W2V-BERT Multilingual | 30.89 | 6.83 | 0.932 |
| MMS Curriculum | 40.86 | 9.72 | 0.905 |
| MMS Multilingual | 43.34 | 10.25 | 0.899 |

## Limitations

The study is restricted to 6 Southern Bantu languages and relies on precomputed difficulty scores from a single frozen Whisper baseline. Curriculum staging uses fixed step allocations rather than adaptive pacing, and tone adapters showed minimal benefit for autoregressive sequence-to-sequence models (Whisper) compared to CTC models (W2V-BERT). Domain transfer gaps between community-collected corpora (Swivuriso) and studio recordings (NCHLT) remain large, causing WER degradation up to 22 points on specific language pairings.

## Why read this

Speech and ML engineers working on low-resource, tonal languages should read this paper to understand how parameter-efficient gated adapters can leverage acoustic F0 statistics without explicit phonological transcriptions. It provides critical empirical insights into why architectural choices (CTC vs seq2seq) dictate whether tone conditioning and curriculum learning succeed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building robust, community-governed automatic speech recognition systems for low-resource educational, civic, and digital services in sub-Saharan Africa.

## Institutions / 機構

Technological University Dublin, University of Pretoria, Lelapa AI

**Funding / 經費:** Gates Foundation, Meta, International Development Research Centre, Foreign, Commonwealth & Development Office, AI4D Africa Program, Research Ireland, ADAPT Research Ireland Centre for AI-Driven Digital Content Technology

## Related

- (link related pages by id as the wiki grows)
