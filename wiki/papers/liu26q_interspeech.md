---
id: liu26q_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2346
pdf: https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.pdf
---

# Reducing Speaker Residual by Considering Pinhole Effect in Voice Anonymization

*Zeyan Liu, Weili Jiang, Liping Chen, Kong Aik Lee, Boyu Zhao, Kai Gao, Zhen-Hua Ling*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2346)

**TL;DR** — This paper proposes a pinhole loss fine-tuning strategy for voice anonymization models to suppress residual speaker attributes across feature streams, boosting Equal Error Rates (EER) on speaker verification while preserving linguistic and emotional utility.

## Key contributions

- Revisits voice anonymization through the lens of the pinhole effect, defining residual speaker attributes as the clustering strength (linkability) of anonymized utterances from the same source speaker.
- Introduces an explicit, optimizable pinhole loss function computed via within-speaker and between-speaker scatter matrices over generalized eigenvectors.
- Proposes a selective fine-tuning recipe that updates only the content encoder, prosody encoder, and waveform generator while freezing the speaker encoder.
- Demonstrates consistent privacy gains across multiple baseline architectures (x-vector based, ASRBN, ASRBN-GST) and pseudo-speaker generation methods (a2o, RS, GAN, IDMap-Diff).

## Problem

Disentanglement-based voice anonymization schemes fail to achieve complete de-identification because identity attributes leak into content and prosody streams as residual speaker attributes. Existing mitigation strategies either only target specific subsystems (like bottlenecks for content or fundamental frequency manipulation for prosody) or rely on implicit bottlenecks without a global, optimizable objective. This unsuppressed residual leakage makes anonymized speech vulnerable to linkage and speaker recognition attacks without providing a systematic way to suppress leakage across all feature streams simultaneously.

## Method

The method builds upon well-trained voice anonymization frameworks consisting of a content encoder, a prosody encoder, a speaker encoder, and a waveform generator. During a secondary fine-tuning stage, all input utterances from source speakers are mapped to a shared pseudo-speaker feature vector to isolate residual speaker attributes. The speaker encoder evaluates the generated waveforms to extract speaker embeddings, which are used to calculate global means, per-source-speaker means, and within-speaker/between-speaker scatter matrices ($R_w$ and $R_b$). The pinhole loss ($L_{	ext{Pinhole}}$) is formulated using the top $k$ generalized eigenvectors of these scatter matrices to measure relative separability; minimizing this loss collapses the clustering of anonymized utterances from identical source speakers.

To optimize this objective without destroying the core anonymization mapping, only the content encoder, prosody encoder, and waveform generator are updated during fine-tuning, while the speaker encoder used for loss calculation remains frozen. This isolates the pathway where residual leakage manifests—specifically lingering in content and prosody representations before being projected into the final synthesized waveforms. Standard generation objectives are jointly retained alongside $L_{	ext{Pinhole}}$ to guarantee that speech intelligibility and prosody fidelity are not sacrificed for privacy.

## Experimental setup

Experiments use the LibriTTS train-clean-100, train-clean-360, and train-other-500 sets for training and fine-tuning. Evaluations utilize LibriSpeech dev and test subsets for Automatic Speaker Verification (ASV, measured in EER %) and Automatic Speech Recognition (ASR, measured in WER %), alongside IEMOCAP subsets for Speech Emotion Recognition (SER, measured in UAR %). The setup compares three baselines (x-vector based, ASRBN, and ASRBN-GST) paired with four pseudo-speaker generation methods (a2o, RS, GAN, IDMap-Diff), using a pretrained ECAPA-TDNN model as the feature leakage probe and loss-computation speaker encoder.

## Results

Applying the pinhole fine-tuning consistently increases ASV Equal Error Rates across all frameworks and pseudo-speaker generation methods, signifying a major improvement in privacy. For example, on the x-vector baseline with IDMap-Diff, average EER rises from 18.326% to 31.632%, and on ASRBN-GST with IDMap-Diff, it reaches 50.754%. Concurrently, linguistic utility remains stable, with Word Error Rates showing negligible shifts (e.g., changing from 2.576% to 2.562% on LibriSpeech test), and Speech Emotion Recognition UARs remain virtually unchanged on IEMOCAP.

Feature-based probing confirms that content leakage classification accuracy drops significantly (e.g., from 84.7% to 44.4% on the x-vector model's content features), and learned prosody leakage in ASRBN-GST drops from 36.9% to 9.3%. The paper does not report failure conditions where fine-tuning reduces privacy, though it notes that gains depend on the underlying disentanglement capacity.

| System / Condition | Baseline EER (%) | Fine-Tuned EER (%) | Baseline WER (%) | Fine-Tuned WER (%) |
| :--- | :--- | :--- | :--- | :--- |
| x-vector (a2o) | 5.71 | 21.65 | 2.58 | 2.58 |
| x-vector (IDMap-Diff) | 18.33 | 31.63 | 2.58 | 2.56 |
| ASRBN (a2o) | 30.80 | 45.49 | 3.20 | 3.30 |
| ASRBN (IDMap-Diff) | 44.52 | 48.25 | 3.35 | 3.33 |
| ASRBN-GST (a2o) | 39.60 | 46.35 | 3.12 | 3.21 |
| ASRBN-GST (IDMap-Diff) | 48.20 | 50.75 | 3.31 | 3.32 |

## Limitations

The evaluation is restricted to English datasets (LibriSpeech/LibriTTS and IEMOCAP), leaving cross-lingual and multilingual generalization unverified. The compute overhead requires an additional fine-tuning phase on top of already well-trained generative pipelines. Furthermore, the approach assumes access to multi-utterance groupings per source speaker during fine-tuning to accurately compute the within- and between-speaker scatter matrices.

## Why read this

Speech and ML researchers working on voice privacy and speaker de-identification should read this paper to learn how to formulate an explicit, global optimization loss for linkability rather than relying solely on architectural bottlenecks. It provides a drop-in fine-tuning recipe that uniformly enhances privacy across disparate anonymization backbones.

## Code

- https://anonymous.4open.science/r/Pinhole-loss-fine-tunning-4628

## Applications

Privacy-preserving speech technologies, forensic voice masking, secure conversational agents, and anonymized data collection for speech recognition training.

## Related

- (link related pages by id as the wiki grows)
