---
id: berdo26_interspeech
category: enhancement-separation
labels: [self-supervised, generative-model, robustness-noise]
institutions: ["ETH Zurich"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3405
pdf: https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.pdf
---

# Post-Training Speech Enhancement Language Models with Perceptual Rewards

*Frédéric Berdoȥ, Luca A. Lanzendöerfer, Antonis Asonitis, Roger Wattenhofer*

[PDF](https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/berdo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3405)

**Category:** `enhancement-separation` · **Labels:** `self-supervised`, `generative-model`, `robustness-noise`

**TL;DR** — This paper introduces a reinforcement learning post-training stage for autoregressive speech enhancement language models using Group Sequence Policy Optimization (GSPO) with multimetric perceptual rewards, achieving state-of-the-art results on DNS2020 and DNS5 benchmarks while preventing reward hacking.

## Key contributions

- Adapts Group Sequence Policy Optimization (GSPO) to autoregressive speech enhancement language models, closing the pretrain-SFT-RL pipeline gap established in NLP.
- Designs an equally-weighted multi-metric composite reward function combining DNSMOS, WER, and UTMOS.
- Demonstrates through human evaluation that multi-metric composite reward training is preferred over single-metric variants and completely avoids reward hacking.
- Achieves state-of-the-art performance on DNS2020 and DNS5 benchmarks across both UniSE and GenSE base models.

## Problem

Modern speech enhancement language models rely entirely on supervised token-level cross-entropy loss during training, creating a significant train-evaluation gap because they are evaluated using non-differentiable perceptual quality metrics like DNSMOS, WER, and UTMOS. Prior attempts to bridge this gap using learned discriminators (such as MetricGAN) or offline preference pairs (such as GSEPF) suffer from approximation errors, training instabilities, or vulnerability to reward hacking. Single-metric optimization often produces artifacts that artificially inflate target scores while actively degrading other vital speech quality dimensions, motivating a stable multi-reward post-training framework.

## Method

The method builds upon two autoregressive decoder-only base models: UniSE (unifying speech restoration, extraction, and separation via 16 kHz neural codec tokens) and GenSE (hierarchical two-stage generation of semantic then acoustic tokens). GSPO is initialized from public SFT checkpoints. For each degraded input waveform x, the policy model samples a group of G = 4 complete token sequences using sequential decoding with temperature 1.0. Each sequence is decoded to a waveform and scored by a composite reward function R(x, y) comprising DNSMOS (overall quality), Whisper-LargeV3 WER subtracted from 1 (content preservation), and UTMOS (naturalness), with all three metrics weighted equally.

GSPO computes group-relative normalized advantages within the sampled group to eliminate the need for a separate critic or value network. Unlike token-level GRPO, GSPO calculates the importance ratio over full sequence likelihoods and applies sequence-level clipping (with clipping parameter epsilon = 0.2 and KL divergence penalty coefficient beta) to ensure training stability. The model is trained using AdamW (learning rate 1e-5, weight decay 0.01) with fp16 mixed precision for 3 epochs (3000 total steps) featuring a 100-step linear warmup, an effective batch size of 8 (batch size 2 with gradient accumulation over 4 steps), and max gradient norm of 1.0. At inference time, the post-trained model generates a single enhanced output sequence identically to the base model with zero additional runtime overhead.

## Experimental setup

Training utilizes 20,000 paired noisy-clean 5-second clips sampled at 16 kHz from the DNS-Challenge dataset under diverse synthetic noise, reverberation, and static conditions. Evaluations are conducted on the DNS2020 blind test set (150 synthetic with reverb, 150 synthetic without reverb, 300 real recordings) using DNSMOS P.835 metrics (SIG, BAK, OVRL), and the DNS5 blind test set (389 headset files, 364 speakerphone files) using personalized DNSMOS (pDNSMOS). Baselines include traditional models (Conv-TasNet, Demucs, Inter-SubNet), diffusion models (CDiffuSE, SGMSE, StoRM), and LM/neural methods (SELM, Voicefixer, MaskSR, AnyEnhance, LLaSE-G1, UniFlow, TEA-PSE 3.0, NAPSE). Human evaluation includes 21 raters across head-to-head preference tests yielding Bradley-Terry Elo ratings. Training runs on a single NVIDIA RTX 6000 taking between 10 and 22 hours.

## Results

On the DNS2020 blind test set, GenSE + GSPO achieves top synthetic results with an overall (OVRL) score of 3.53 with reverb and 3.55 without reverb (gains up to +0.37 and +0.14 over base), while UniSE + GSPO achieves the top real recording score of 3.37 OVRL (gain of +0.11). On the DNS5 blind test set, GenSE + GSPO dramatically improves Track 1 pOVRL from 3.41 to 4.45 (+1.04) and Track 2 pOVRL from 2.96 to 4.36 (+1.40), whereas UniSE + GSPO achieves the absolute best Track 1 pOVRL score of 4.63. Human evaluation ablations reveal that the composite reward ranks first with an Elo rating of 1571 and a 71.4% win rate against the baseline, whereas single-metric DNSMOS optimization performs catastrophically with an Elo rating of 1335 (falling well below the base model Elo of 1476 due to severe reward hacking).

| System | DNS2020 Synth+Reverb OVRL | DNS2020 Real OVRL | DNS5 Track 1 pOVRL |
|---|---|---|---|
| Noisy | 1.53 | 2.36 | 2.71 |
| UniSE | 3.43 | 3.26 | 4.21 |
| UniSE + GSPO | 3.49 | **3.37** | **4.63** |
| GenSE | 3.16 | 2.60 | 3.41 |
| GenSE + GSPO | **3.53** | 3.22 | 4.45 |

## Limitations

The approach is currently evaluated on fixed 5-second audio clips sampled at 16 kHz, leaving longer-form audio and higher sample rate generalization untested. The reward function relies on auxiliary neural evaluators (DNSMOS, UTMOS, Whisper), meaning any blind spots or biases inherent to these pretrained metric models can subtly constrain optimization. Training requires sampling multiple candidate sequences per training step, incurring a higher compute overhead during the RL phase compared to standard supervised fine-tuning.

## Why read this

Speech and machine learning researchers working on generative speech models or audio restoration should read this paper to learn how to successfully adapt sequence-level reinforcement learning (GSPO) with multi-metric rewards to close the train-eval gap for autoregressive token-based speech models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication enhancement, telephony noise suppression, and speech quality restoration for downstream speech recognition systems.

## Institutions / 機構

ETH Zurich

## Related

- (link related pages by id as the wiki grows)
