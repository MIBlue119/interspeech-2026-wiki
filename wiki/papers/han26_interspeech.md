---
id: han26_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["LG Electronics", "Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-534
pdf: https://www.isca-archive.org/interspeech_2026/han26_interspeech.pdf
---

# A Transcript-anchored Pipeline With Large Language Models For Detecting Inappropriate Pauses In Dysarthric Speech

*Minsu Han, Insung Lee, Taeyoung Jeong, Myoung-Wan Koo*

[PDF](https://www.isca-archive.org/interspeech_2026/han26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-534)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This paper presents a transcript-anchored pipeline utilizing fine-tuned Whisper, Montreal Forced Aligner (MFA), VAD timestamp fusion, and LLMs to detect and classify inappropriate pauses in dysarthric speech, achieving an overall alignment F1-score of 72.8% and boosting dysarthria detection macro-accuracy by 8.4 percentage points.

## Key contributions

- Proposed a four-stage, LLM-guided, transcript-anchored pipeline (verbatim Whisper, MFA-VAD timestamp fusion, LLM lexical adaptation, and LLM classification) for inappropriate pause (IP) detection in dysarthria.
- Conducted exhaustive benchmarking of transcriber-aligner combinations (Whisper, wav2vec 2.0, MFA, CTC, DTW) across different dysarthria severity groups.
- Performed expert evaluations with certified speech-language pathologists (SLPs) validating the pipeline's pause appropriateness classifications.
- Demonstrated that incorporating pipeline-derived IP features into a LightGBM dysarthria detector improves macro-accuracy by 8.4 percentage points and macro-F1 by 7.2 percentage points.

## Problem

Dysarthria causes prosodic abnormalities such as inappropriate pauses (IPs) that are vital for clinical assessment, but automated evaluation remains challenging. Standard forced alignment pipelines like WhisperX degrade on abnormal speech due to substitutions, fillers, and lengthenings, while GMM-HMM aligners like MFA fail when encountering out-of-lexicon atypical tokens. End-to-end models also struggle due to severe scarcity of annotated dysarthria data, leaving a critical need for robust, transcript-anchored pause analysis.

## Method

The framework operates in four sequential stages. First, a small Whisper model is fine-tuned to generate verbatim transcripts preserving fillers, repetitions, and self-repairs using an 8:1:1 split on 743 Korean utterances (15.7 hours total across healthy controls, mild-to-moderate, and severe dysarthria). Second, the Montreal Forced Aligner (MFA) extracts initial boundaries, which are then fused with frame-level Silero-VAD non-speech spans (replacing MFA boundaries if overlaps occur). Third, an LLM (GPT-5) maps out-of-lexicon unspaced tokens and unknown tokens (<unk>) into MFA-compatible forms while maintaining transcription alignment. Finally, a second LLM prompt classifies pause appropriateness into appropriate pauses (AP) or three specific IP categories (intra-word pauses, pauses following vocal fillers, pauses during pronunciation corrections) while generating short rationales.

All training was performed on NVIDIA A100 GPUs using the AdamW optimizer with a learning rate of 1e-5 for Whisper (batch size 16, 20 epochs, 10% warmup) and 3e-4 for wav2vec 2.0 (batch size 128, 15 epochs, 16.7% warmup), while Silero-VAD was optimized with Adam at 5e-4 (batch size 128, 5 epochs).

## Experimental setup

Evaluated on 743 Korean utterances of the Autumn Paragraph reading task (15.7 hours, divided into 221 healthy control, 467 mild-to-moderate, and 55 severe utterances). Baselines included wav2vec 2.0 CTC, WhisperP, VAD-only, and various combinations of wav2vec 2.0, CTC, and DTW aligners. Metrics include alignment F1-score with a 0.2-second collar tolerance, WER, and SLP-evaluated macro-F1 for AP vs. IP classification.

## Results

The proposed WhisperMFA configuration combined with VAD refinement achieved a total pause alignment F1-score of 72.8%, outperforming wav2vec 2.0 CTC (64.0%) and VAD-only fine-tuned (73.7%, which drops significantly on severe cohorts). In SLP-assessed binary IP classification (AP vs. IP), WhisperMFA achieved a macro-F1 of 0.64 for Healthy Control and 0.68 for Mild-to-Moderate groups, outperforming WhisperCTC (0.57 / 0.50) and wav2vec 2.0 (0.51 / 0.51). In the dysarthria detection ablation, adding IP features to LightGBM raised macro-accuracy from 75.2% to 83.6% (+8.4 pp) and macro-F1 from 70.8% to 78.0% (+7.2 pp). The pipeline underperforms on severe dysarthria due to unreliable ASR transcripts.

| System | HC Pause F1 | Mild-to-Mod Pause F1 | Severe Pause F1 | Total Pause F1 |
|---|---|---|---|---|
| wav2vec 2.0 CTC | 10.2 | 10.0 | 11.7 | 10.7 |
| WhisperP + wav2vec 2.0 CTC | 37.7 | 19.5 | 17.1 | 24.8 |
| Whisper + wav2vec 2.0 CTC | 76.5 | 69.5 | 46.0 | 64.0 |
| Whisper + DTW | 17.9 | 13.6 | 6.5 | 12.7 |
| Whisper + MFA (Proposed) | 75.7 | 73.1 | 69.3 | 72.8 |
| VAD-only (Fine-tuned) | 76.0 | 73.7 | 71.3 | 73.7 |

## Limitations

The framework relies heavily on transcript accuracy, causing performance to degrade severely on patients with severe dysarthria where transcripts are highly unreliable. The evaluation was limited to Korean utterances from a single reading task (Autumn Paragraph), and LLM judgment can be overly influenced by romanized token boundaries rather than language-specific phonological rules.

## Why read this

Speech and ML researchers working on computational paralinguistics, automated clinical speech assessment, or LLM integration with forced alignment will find a robust blueprint for handling disfluent and disordered speech data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools for stroke and neurological disorder assessment, speech-language pathology training applications, and objective remote monitoring of motor speech disorders.

## Institutions / 機構

LG Electronics, Sogang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- [Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment](zhong26c_interspeech.md) — same problem · relatedness 2.1/3
- [Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment](wang26ga_interspeech.md) — same problem · relatedness 2.0/3
- [Investigating ASR for Low-Intelligibility Dysarthric Speech](kwon26b_interspeech.md) — shared technique · relatedness 2.0/3
- [WER Are We (Really): How Well Do Top Open ASR Leaderboard Models Generalize to Nonstandard Speech?](dhaka26_interspeech.md) — same problem · relatedness 2.0/3
- [Montreal Forced Aligner and the state of speech-to-text alignment in 2026](mcauliffe26_interspeech.md) — complementary · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
