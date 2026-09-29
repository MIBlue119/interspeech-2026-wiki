---
id: kim26d_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-437
pdf: https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.pdf
---

# Privacy-Preserving Speaker Verification with Multi-Granularity Feature Obfuscation

*Hanseul Kim, Nam In Park, Chanjun Chun*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-437)

**Category:** `deepfake-security`

**TL;DR** — This paper proposes a privacy-preserving speaker verification framework that explicitly discards linguistic content via FAcodec and applies a hierarchical multi-granularity feature obfuscation strategy to prosody, achieving an EER of 2.35% on VoxCeleb1-O while heavily suppressing linguistic recoverability.

## Key contributions

- Combines explicit speech component disentanglement using FAcodec with a multi-granularity feature obfuscation module to protect both biometric utility and linguistic privacy.
- Proposes a hierarchical obfuscation strategy comprising Global Temporal Aggregation (GTA), Local Temporal Aggregation (LTA), and Local Temporal Permutation (LTP) to mask linguistic information across multiple temporal resolutions.
- Bridges the gap between metric-based (WER/CER) and perceptual-based privacy evaluations, demonstrating that removing content tokens alone leaves speech partially intelligible unless multi-granularity obfuscation is applied.

## Problem

Conventional speaker verification systems force a difficult trade-off between authentication accuracy and privacy. Transmitting raw audio or spectrograms exposes users to eavesdropping, ASR transcription leakage, and deepfake generation via text-to-speech or voice conversion. Prior disentanglement methods like SpeechTokenizer and SafeEar rely on global shuffling of residual acoustic tokens, which destroys essential temporal context and severely degrades verification performance. Furthermore, a critical evaluation gap exists: even when content tokens are explicitly removed and ASR error rates approach 100%, reconstructed speech can remain partially intelligible to human listeners due to residual prosody features.

## Method

The framework operates on the client side through four modules: explicit feature disentanglement, multi-granularity feature obfuscation, speaker embedding extraction, and reconstruction-based privacy evaluation. First, input speech is decomposed via FAcodec into four independent $T \times d$ feature matrices: content ($\mathbf{F}_{con}$), prosody ($\mathbf{F}_{pro}$), timbre ($\mathbf{F}_{tim}$), and acoustic detail ($\mathbf{F}_{aco}$). The content component $\mathbf{F}_{con}$ is entirely discarded to prevent ASR leakage, while the non-content features $(\mathbf{F}_{pro}, \mathbf{F}_{tim}, \mathbf{F}_{aco})$ are retained. Ablation studies confirm that $\mathbf{F}_{pro}$ is the dominant carrier of speaker identity, but it retains residual linguistic cues.

To eliminate linguistic traces in prosody without sacrificing verification accuracy, a hierarchical Multi-Granularity Feature Obfuscation is applied. The prosody matrix is chunked into $N$ non-overlapping windows of length $L=50$ frames ($\approx 0.5$ s). Global Temporal Aggregation (GTA) averages all frames across the entire sequence to collapse temporal structure and suppress phonetic transitions. Local Temporal Aggregation (LTA) compresses fine-grained temporal details within each chunk into a static mean vector while preserving macro-level prosody like intonation and speech rate. Local Temporal Permutation (LTP) scrambles frame positions within each local window via a random permutation $\pi_n$, preserving spectral texture and identity cues while breaking short-term phonetic correlations.

The three transformed prosody representations are concatenated and projected via a learnable linear transformation, then combined with $\mathbf{F}_{tim}$ and $\mathbf{F}_{aco}$ to feed an ECAPA-TDNN speaker embedding model. The network is optimized using AAM-Softmax loss ($s=30, m=0.2$). Only these obfuscated representations are transmitted to the server for authentication, completely withholding raw speech and linguistic content.

## Experimental setup

The model was trained on the VoxCeleb2-dev dataset (approx. 1,092,009 utterances, >2,400 hours) with Kaldi-style data augmentation (MUSAN noise, RIR reverberation, speed perturbation). Evaluation was performed on VoxCeleb1 test sets (VoxCeleb1-O, VoxCeleb1-E, VoxCeleb1-H) for speaker verification (EER metric) and LibriSpeech test-clean for linguistic privacy measured via wav2vec 2.0 (WER and CER) and Short-Time Objective Intelligibility (STOI). The model uses AdamW optimizer with a learning rate of $10^{-3}$, batch size of 512, trained for 40 epochs with 2-second audio crop lengths during training and full-length utterances during inference.

## Results

The proposed method achieves an EER of 2.35% on VoxCeleb1-O, outperforming the SafeEar baseline with Global Shuffling (5.19%) by a 54.7% relative improvement, while maintaining competitive verification across harder splits (2.44% on VoxCeleb1-E and 4.43% on VoxCeleb1-H). In terms of privacy metrics, it reaches a WER of 98.83% and a CER of 89.60%. Ablations demonstrate that discarding $\mathbf{F}_{con}$ is crucial for high privacy (raising CER from 1.36% to 65.79%), while combining GTA, LTA, and LTP achieves the optimal balance, recovering speaker discriminability (EER 2.35%) compared to using GTA alone (EER 2.98%) while keeping speech perceptually unintelligible.

| System | Codec | Obfuscation | Vox1-O EER | Vox1-E EER | Vox1-H EER | WER | CER |
|---|---|---|---|---|---|---|---|
| SafeEar | SpeechTokenizer | None | 3.68% | 3.92% | 6.96% | 99.97% | 81.74% |
| SafeEar-Styled | SpeechTokenizer | Global Shuffling | 5.19% | 5.39% | 9.82% | 99.98% | 82.06% |
| Proposed (Base) | FAcodec | None | 2.33% | 2.42% | 4.41% | 95.56% | 65.79% |
| Proposed (+GS) | FAcodec | Global Shuffling | 2.66% | 2.76% | 5.03% | 99.74% | 76.96% |
| Proposed (Ours) | FAcodec | Multi-Granularity | 2.35% | 2.44% | 4.43% | 98.83% | 89.60% |

## Limitations

The evaluation focuses primarily on English datasets (VoxCeleb and LibriSpeech), leaving multilingual and cross-lingual robustness largely untested. The framework relies heavily on the quality of FAcodec's initial disentanglement; imperfect factorisation could lead to subtle semantic leakage or speaker information loss. Additionally, perceptual privacy claims are validated via qualitative reconstructed audio samples and STOI/WER metrics rather than large-scale human listening tests.

## Why read this

Read this paper if you are working on practical client-side voice privacy or voice anonymization and need a principled way to balance biometric utility against linguistic leakage without destroying temporal context.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Financial authentication systems, voice-based access control, secure IoT voice assistants, and privacy-preserving biometric verification services.

## Institutions / 機構

Chosun University, National Forensic Service, Glosori Inc

**Funding / 經費:** Innopolis Foundation, Commercialization Promotion Agency for R&D Outcomes

## Related

- (link related pages by id as the wiki grows)
