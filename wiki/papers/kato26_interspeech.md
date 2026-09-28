---
id: kato26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/kato26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/kato26_interspeech.pdf
---

# Coco-VC: Degradation-Robust Streaming Voice Conversion System on the Listener Side

[PDF](https://www.isca-archive.org/interspeech_2026/kato26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kato26_interspeech.html)

**TL;DR** — Coco-VC is a degradation-robust, real-time streaming voice conversion system designed to run on the listener's side during phone calls, achieving a 25% relative reduction in word error rate on noisy telephony speech compared to existing baselines.

## Problem

In telephone conversations, speakers are often unaware that poor acoustic environments, communication constraints, or difficult voice timbres cause their speech to reach the listener with poor clarity. Traditional speaker-side voice conversion does not fix these listening-end challenges, making it difficult for recipients to comprehend severely degraded audio. A listener-side system must therefore stream in real-time, handle heavy telephony degradations, and cleanly convert the speaker's voice into an intelligible target profile.

## Method

Coco-VC features a lightweight student content encoder constructed with Causal ConvNeXt blocks using zero look-ahead padding, paired with a lightweight Vocos-based waveform decoder. It achieves a 40 ms algorithmic latency (20 ms frame size plus overlap-add). To handle adverse conditions, it utilizes an asymmetric training strategy where frozen teacher models process clean 16 kHz speech while the student processes dynamically corrupted 8 kHz speech subject to simulated codecs, distortions, reverberation, and noise. Furthermore, it employs a multi-teacher distillation approach that fuses representations from both ContentVec (for speaker-invariant prosody) and the Whisper encoder (for robust linguistic features).

## Results

Evaluated on simulated noisy telephony data (FLEURS-8k), Coco-VC achieved a Word Error Rate (WER) of 0.338 and a UT-MOS of 3.214, outperforming the StreamVC baseline's WER of 0.451 while maintaining a competitive MOS. On clean VCTK speech, Coco-VC reached a UT-MOS of 4.041 versus 3.701 for the baseline. An ablation on a private dataset of simulated complaint calls demonstrated that scaling training data from 960 hours of public data to 61,840 hours of in-domain private data drastically improved robustness, dropping the WER from 0.363 to 0.125 and raising UT-MOS from 3.08 to 3.35.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Telecommunication users and call center operators seeking assistive, listener-side real-time voice conversion to clarify degraded incoming speech on standard consumer hardware.

## Related

- (link related pages by id as the wiki grows)
