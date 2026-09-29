---
id: boeddeker26_interspeech
category: enhancement-separation
institutions: ["Mitsubishi Electric Research Laboratories"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2620
pdf: https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.pdf
---

# Speaker Identity as Sole Supervision for Speech Separation

*Christoph Boeddeker, Yoshiki Masuyama, Julius Richter, Takahiro Edo, Gordon Wichern, Jonathan Le Roux*

[PDF](https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/boeddeker26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2620)

**Category:** `enhancement-separation`

**TL;DR** — This paper introduces Speaker-Identity Supervision (SIS), a training strategy for monaural speech separation that uses a contrastive speaker-embedding objective instead of waveform- or spectrogram-level reconstruction losses. Trained from scratch on Libri2Mix, the proposed method achieves an SDR of 8.1 dB on clean mixtures and can be used to adapt pretrained models to noisy conditions.

## Key contributions

- Investigation of training speech separation using speaker identity as the sole supervision signal without clean parallel references or spatial cues.
- Formulation of a contrastive InfoNCE objective with temperature scaling and in-batch negatives operating on speaker embeddings to guide the separator.
- A training recipe where the speaker embedding extractor is frozen when processing separator outputs to prevent it from adapting to separation artifacts.
- Demonstration that SIS can train separators from scratch (8.1 dB clean SDR) and effectively fine-tune pretrained models on noisy mixtures (8.7 dB SDR).

## Problem

Traditional deep learning speech separation methods rely on parallel clean references (via Permutation Invariant Training, Deep Clustering, or Deep Attractor Networks), multichannel spatial cues (such as Reverberation As Supervision or UNSSOR), or self-remixing mixture-consistency objectives like MixIT. However, collecting clean parallel data in real-world scenarios is impossible, and spatial methods fail on monaural data while mixture-of-mixtures approaches suffer from over-separation and instability. This paper investigates whether speaker identity extracted from auxiliary utterances can replace waveform-level reconstruction losses to train speaker-independent separators from scratch or adapt them to new domains.

## Method

The separator takes a monaural mixture of K speakers and outputs source estimates via time-frequency magnitude masks. The architecture consists of an STFT magnitude front-end followed by four bidirectional LSTM-P (BLSTMP) layers with 256 hidden units, residual connections around the first two layers, and parameter sharing across the final two speaker-specific layers. Two mask non-linearities are evaluated: softmax (which enforces a strict mixture-consistency constraint by normalizing across the speaker dimension) and sigmoid (which relaxes this constraint to allow better noise suppression). 

Instead of signal-level losses, training is supervised via a contrastive InfoNCE objective. Auxiliary utterances from the same speakers (sourced from a disjoint subset of LibriSpeech train-960 to prevent leakage) are passed through an ECAPA-TDNN embedding extractor to yield anchor embeddings. The separator estimates are also passed through the embedder to yield positive embeddings, while competing source estimates and auxiliary embeddings from other mixtures in the mini-batch serve as in-batch negatives. Cosine similarity with temperature scaling tau = 1.86 and flooring at zero is used. Permutations are resolved using PIT-style matching.

A key design choice involves the embedder training schedule: when processing separator outputs, embedder parameters are frozen (gradients flow only to the separator) to prevent the embedder from adapting to separation artifacts and avoiding batch-normalization cross-sample leakage. In a second forward pass, the embedder processes auxiliary utterances with enabled gradients to update its speaker verification capability. The training batch size is set to 24 to maximize the pool of in-batch negative examples.

## Experimental setup

Experiments use Libri2Mix max configuration at 16 kHz (clean subset and noisy subset mixed with WHAM! noise). Training uses LibriSpeech train-960 and WHAM! noise, with the dataset split into disjoint subsets for mixtures and auxiliary references. Evaluation metrics include BSS Eval SDR (dB), PESQ, STOI, Word Error Rate (WER %) using a pretrained NeMo Conformer-CTC large model, and DNSMOS OVRL. Models are evaluated against unprocessed mixtures and fully supervised upper bounds trained with waveform-level LogMAE loss.

## Results

On Libri2Mix clean, the fully supervised upper bound (C1) achieves 14.4 dB SDR and 5.0% WER. Training from scratch with SIS using a jointly trained embedder (C2) achieves 8.1 dB SDR, 1.71 PESQ, 0.85 STOI, 19.4% WER, and 2.69 DNSMOS, demonstrating that speaker identity alone induces effective waveform separation. Using a frozen pretrained ECAPA-TDNN embedder (C3) drops SDR to 3.0 dB, confirming that standard verification models are overly robust to separation artifacts.

On Libri2Mix noisy, clean-trained models degrade severely under domain shift. Training SIS from scratch on noisy data with sigmoid masking (N2) yields 2.8 dB SDR. Fine-tuning a clean-pretrained supervised model using SIS on noisy data with sigmoid masking and clean initialization (N5) reaches 8.7 dB SDR, 1.51 PESQ, 0.82 STOI, 24.6% WER, and 2.73 DNSMOS, approaching the fully supervised noisy upper bound (N6) of 9.7 dB SDR. Softmax-based masking constraints limit performance in noisy settings because they force noise energy to be assigned to one of the speakers.

| System / Condition | Embedder | Loss / Setup | SDR (dB) | PESQ | STOI | WER (%) |
|---|---|---|---|---|---|---|
| Mixture (Clean) | - | Unprocessed | 0.1 | 1.31 | 0.76 | 76.4 |
| Fully Supervised (C1) | - | Waveform (Wav) | 14.4 | 2.46 | 0.94 | 5.0 |
| SIS From Scratch (C2) | Learned | SIS (Softmax) | 8.1 | 1.71 | 0.85 | 19.4 |
| SIS Pretrained (C3) | Frozen | SIS (Softmax) | 3.0 | 1.40 | 0.79 | 19.9 |
| SIS Fine-tuned (N5) | Learned | Wav + SIS (_sigma_) | 8.7 | 1.51 | 0.82 | 24.6 |
| Fully Supervised Noisy (N6) | - | Wav (Noisy) | 9.7 | 1.53 | 0.84 | 19.1 |

## Limitations

The approach requires access to clean auxiliary utterances from the same speakers during training, limiting its applicability to conversational domains where single-speaker active regions can be reliably segmented. Separation performance still lags behind fully supervised waveform baselines. Furthermore, relaxing mixture-consistency constraints via sigmoid masking can occasionally introduce speech-like generative artifacts into the separated output.

## Why read this

Speech and ML researchers working on weak supervision, self-supervised learning, or domain adaptation for audio separation should read this paper to understand how auxiliary speaker embeddings can replace direct signal-level reconstruction losses.

## Code

- https://github.com/merlresearch/sis_sep

## Applications

Monaural speech separation and domain adaptation of speech enhancement models for telephony, meeting transcription, and hearing assistive devices using weak speaker metadata.

## Institutions / 機構

Mitsubishi Electric Research Laboratories

## Related

- (link related pages by id as the wiki grows)
