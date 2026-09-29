---
id: ozkan26_interspeech
category: phonetics-linguistics
institutions: ["Univ. Grenoble Alpes", "CNRS", "Grenoble INP"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1288
pdf: https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.pdf
---

# Automatic pitch prediction from speech articulation: Where does the f0 information come from?

*Beliz Ozkan, Jonas Michael, Thomas Hueber, Olivier Perrotin*

[PDF](https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ozkan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1288)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates why silent speech interfaces can predict fundamental frequency (fo) from articulatory data despite source-filter independence, finding that accuracy depends on capturing local articulatory-fo couplings during prominent words rather than global trajectories. Using bimodal ultrasound tongue and lip imaging, models achieve utterance-level Spearman correlations up to 0.68 on read speech, but generalization degrades severely on spontaneous speech.

## Key contributions

- Systematically tests four hypotheses to resolve the theoretical paradox of predicting glottal source fo from vocal tract articulatory gestures.
- Compares 24 model conditions across 6 input modalities (tongue ultrasound, lips, bimodal, and MFCC acoustic subsets) and 4 temporal contexts.
- Demonstrates that tongue ultrasound alone is sufficient, with lip images offering no additive benefit, and that temporal context beyond 50 ms yields no significant improvement.
- Shows that models trained on read speech fail to generalize to spontaneous speech, and proves via subjective listening tests (n=38) that high prominence words drive perceptual acceptability (reaching 87.5% acceptance).
- Establishes a speaker adaptation recipe using fine-tuning on less than 5 minutes of data per speaker.

## Problem

Source-filter theory posits that the glottal source (including fo) and the vocal tract filter are independent, implying articulatory data should contain no fo information. Yet, prior silent speech interface studies successfully predicted fo from biosignals like ultrasound tongue images or electromyography with correlations up to 0.74 or RMSE down to 10.3 Hz. This paper resolves this paradox by investigating whether this predictability stems from residual glottal cues in training data, temporal dynamics, read-speech overfitting, or local articulatory-fo correlations tied to prosodic prominence.

## Method

The architecture comprises an encoder-decoder network. For articulatory inputs, each modality (ultrasound tongue images resized to 128x170 at 60 FPS, and lip images) is processed by a 4-layer 2D-CNN encoder (filters: 6, 16, 32, 64) with batch normalization, ReLU, and max pooling, followed by 3 fully connected layers (1000, 500, 200) producing a 200-dim embedding (concatenated to 400-dim for bimodal L+T). Acoustic baselines use 4-layer fully connected encoders over MFCCs. The decoder uses a 1D-CNN with 32 filters operating across 4 temporal contexts (1, 3, 7, or 17 frames, spanning 16.7 ms to 283.3 ms centered on the current frame), followed by 3 FC layers (16, 8, 1) to predict log-transformed, z-scored fo.

Models are trained using Mean Squared Error (MSE) loss with the Adam optimizer at a learning rate of 1e-3, batch size of 1 utterance, for 30 epochs on a Quadro RTX 8000 GPU (48 GB). The evaluation data relies on the TaL corpus, splitting read utterances 80/20 into train/test sets while reserving all spontaneous speech exclusively for testing. Words are clustered into three prominence levels (P0, P1, P2) using continuous wavelet transform alignments and k-means clustering. Training uses 1 professional male speaker (TaL1, 21.45 min) for base training, and 8 non-professional speakers (TaL80, ~4.35 min each) for speaker-dependent fine-tuning.

## Experimental setup

Evaluated on the TaL corpus (TaL1 and TaL80 subsets containing synchronized audio, ultrasound tongue imaging at 80 FPS, and lip images at 60 FPS). Baselines compare unimodal tongue (T), unimodal lips (L), bimodal tongue+lips (L+T), and acoustic MFCC subsets (M0:2 for glottal source, M3:12 for formants, M0:12 combined). Metrics include utterance-level and word-level Spearman's correlation coefficient and Root Mean Square Error (RMSE) in octaves, supplemented by a 38-participant perceptual binary forced-choice listening test (Acceptable/Not Acceptable) using LPCNet neural vocoder resynthesis.

## Results

On TaL1, the unimodal tongue model (T) achieves an RMSE of 0.21 octaves (~18.6 Hz) and a Spearman correlation of 0.63 to 0.68 across 1-frame and 17-frame contexts, closely approaching prior literature benchmarks. Bimodal input (L+T) performs comparably to tongue alone (T > L, p < 0.05; L+T equivalent to T, p > 0.05), indicating lip images provide no added benefit. Acoustic models combining all MFCCs (M0:12) reach up to 0.91 correlation at 17 frames. Ablating speech type shows global correlation drops sharply from 0.70 to 0.39 on TaL1 and 0.65 to 0.38 on TaL80 when shifting from read speech to spontaneous speech, confirming read-speech overfitting (H3). Conversely, prediction performance is significantly higher on words with strong prominence (P2) across all conditions (p < 0.05), and perceptual acceptability reaches 87.5% for high-prominence utterances (P2++), proving that local articulatory-fo coupling during stress drives success.

| System / Condition | Input Modality | Temporal Context | Spearman Correlation (TaL1 Global) | RMSE (octaves) |
|---|---|---|---|---|
| Unimodal Lips (L) | Lip Images | 17 frames | ~0.35 | -- |
| Unimodal Tongue (T) | Ultrasound Tongue | 1 frame | 0.63 | 0.21 |
| Unimodal Tongue (T) | Ultrasound Tongue | 17 frames | 0.68 | -- |
| Bimodal (L+T) | Tongue + Lips | 17 frames | ~0.68 | -- |
| Acoustic Source (M0:2) | MFCCs (0-2) | 17 frames | 0.61 - 0.84 | -- |
| Full Acoustic (M0:12)| MFCCs (0-12) | 17 frames | 0.91 | -- |

## Limitations

Evaluated exclusively on modal speech in English from a limited speaker pool (1 professional speaker and 8 fine-tuned speakers from TaL80), limiting cross-lingual and cross-accent generalization. Models trained entirely on read speech show severe performance degradation when applied to conversational, spontaneous speech. The study relies on ultrasound and lip imaging setups which may not translate directly to non-optical silent speech modalities like sEMG or invasive neural recordings.

## Why read this

Researchers building silent speech interfaces or prosody prediction models should read this to understand that global fo trajectory metrics are misleading, and that future SSI designs must target local articulatory-prosodic coupling and incorporate conversational training data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Silent speech interfaces, expressive speech synthesis, voice restoration for laryngectomees, and articulatory-to-acoustic inversion models.

## Institutions / 機構

Univ. Grenoble Alpes, CNRS, Grenoble INP

**Funding / 經費:** ANR SilentPitch, MIAI Cluster

## Related

- [Speaker-Independent Speech Synthesis from Real-time MRI Articulatory Data](otani26_interspeech.md) — same problem · relatedness 1.9/3
- [Towards Robust Ultrasound-based Silent Speech Recognition Learning Physics-Aware and Context-Rich Representations](wen26d_interspeech.md) — same problem · relatedness 1.9/3
- [On the Role of the Tongue Region in Ultrasound-to-Acoustic Mapping](ibrahimov26_interspeech.md) — same problem · relatedness 1.9/3
- [Quantifying Dimensional Independence in Speech: An Information-Theoretic Framework for Disentangled Representation Learning](kashyap26_interspeech.md) — complementary · relatedness 1.9/3
- [The Role of Laryngeal Position in the Articulation of American English Velar Stop Consonants](kim26b_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
