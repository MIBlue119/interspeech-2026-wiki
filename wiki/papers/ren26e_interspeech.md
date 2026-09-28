---
id: ren26e_interspeech
category: speech-editing
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1186
pdf: https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.pdf
---

# Edit Content, Preserve Acoustics: Imperceptible Text-Based Speech Editing via Self-Consistency Rewards

[PDF](https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1186)

**TL;DR** — This paper proposes a text-based speech editing framework that decouples content modification in a semantic space from acoustic reconstruction via a Flow Matching decoder, optimized using self-consistency reinforcement learning to achieve superior intelligibility and naturalness.

## Problem

Prior text-based speech editing approaches operating directly in acoustic token spaces suffer from content-style entanglement, leading to hallucinations, flattened prosody, and boundary artifacts. Conversely, non-autoregressive methods struggle with long-range dependencies, while autoregressive models fail to precisely control generation length during deletions. These limitations impede the practical goal of achieving imperceptible speech editing for audiobook revision and podcast correction.

## Method

The framework uses a decoder-only transformer policy model operating in a discrete semantic token space formatted with Prefix-Suffix-Middle (PSM) inputs, utilizing frozen components from CosyVoice3 including a semantic tokenizer, a Flow Matching acoustic decoder, and a HiFiGAN vocoder. For perceptual alignment, the authors introduce Group Relative Policy Optimization (GRPO) driven by a composite reward: an implicit critic reward measuring average log-likelihood under a pre-trained frozen TTS model, an ASR-based word error rate intelligibility constraint, and a duration stability constraint. Training is conducted on the 50-hour Libriheavy corpus using 8 NVIDIA H800 GPUs with supervised pre-training followed by RL finefitting.

## Results

Evaluated on the Ming-Freeform-Audio-Edit-Benchmark and a Seed-TTS derived duration robustness subset (masked durations 0.5s to 2.5s), the method is compared against FluentSpeech, VoiceCraft, and Ming-UniAudio. On the basic/full benchmarks, the proposed GRPO-aligned model achieves dramatic WER reductions across insertion, deletion, and substitution tasks (e.g., deletion WER drops to 0.47% / 0.82%). Speaker similarity (SIM) and perceptual quality metrics (DNSMOS and subjective MOS reaching up to 4.01/3.95) consistently outperform all baselines. Robustness evaluations show that unlike VoiceCraft whose WER surges with longer edits due to error accumulation, the proposed method maintains stable intelligibility, speaker preservation, and high DNSMOS up to 2.5-second edits.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers working on podcast correction, audiobook revision, automated dialogue replacement, and post-production speech editing.

## Limitations

The text does not state explicit limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
