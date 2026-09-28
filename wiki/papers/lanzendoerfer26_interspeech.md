---
id: lanzendoerfer26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1809
pdf: https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.pdf
---

# Evaluating Objective Speech Quality Metrics for Neural Audio Codecs

*Luca A. Lanzendöerfer, Florian Grötschla, Roger Wattenhofer*

[PDF](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1809)

**TL;DR** — This paper evaluates the reliability of objective quality metrics for assessing modern neural audio codecs on speech and mixed-audio datasets using a MUSHRA listening test. The results identify SCOREQ and legacy PESQ as the strongest predictors of human perceptual quality, while non-intrusive metrics and PEAQ exhibit poor correlation.

## Key contributions

- Conducted a MUSHRA listening study to evaluate perceptual quality of six state-of-the-art neural audio codecs and vocoders across speech-only and combined audio (speech with background) conditions.
- Analyzed Pearson and Kendall correlation coefficients between subjective listening scores and 20+ objective evaluation metrics (distortion, perceptual, intelligibility, non-intrusive MOS).
- Provided practical metric selection guidelines, highlighting complementary strengths of SCOREQ and PESQ while exposing failure modes of reference-free metrics on mixed-content audio.
- Publicly released the complete MUSHRA rating dataset to foster future research in objective metric development for neural audio codecs.

## Problem

While neural audio codecs (NACs) achieve remarkable compression below 8 kbps, evaluating their reconstruction quality remains challenging. Human listening tests like MUSHRA are gold standards but are too slow and costly for iterative development. Traditional objective metrics (such as PESQ and PEAQ) were designed for traditional codecs or source separation and remain underexplored for modern generative NACs. This mismatch makes it unclear which automated metrics reliably capture human perception of neural compression artifacts, especially for stereophonic or mixed audio.

## Method

The authors evaluate six neural audio codecs and vocoder architectures operating in the sub-10 kbps range: EnCodec (24 kHz, 6 kbps), Multi-Band Diffusion (MBD decoding EnCodec latents), Vocos (Fourier-domain vocoder for EnCodec latents), DAC (44.1 kHz, 7.74 kbps), SNAC (44.1 kHz, 2.6 kbps), and Mimi (24 kHz, 4.4 kbps). They utilize the ODAQ dataset comprising 11 clean speech samples and 11 combined speech-and-background samples, resampled to 48 kHz. Because tested NACs lack native stereo support, stereo channels are encoded and decoded independently. A double-blind MUSHRA test was conducted using crowdsourced listeners loudness-normalized to -28 dB. Listeners rated models alongside a hidden reference and 3.5 kHz/7 kHz anchors on a 0-100 scale.

After applying MUSHRA quality filtering thresholds (removing raters scoring the reference below 90 at least twice, leaving 13 participants for speech-only and 17 for combined audio), mean scores per model/snippet combination are computed. The authors then calculate Pearson's correlation coefficient (rho) to measure linear relationships and Kendall's tau (tau) to measure ordinal associations across intrusive metrics (SNR, SI-SNR, C-SI-SNR, SDR, SI-SDR, SA-SDR, PESQ, PEAQ, 2f-Model, STOI, ViSQOL Audio/Speech, WARP-Q) and non-intrusive metrics (DNSMOS, NISQA, NORESQA, NORESQA-MOS, SCOREQ, SCOREQ-no-ref).

## Experimental setup

Evaluated on 11 clean speech samples and 11 combined speech-plus-background audio samples from the ODAQ dataset at 48 kHz. Compared six models: DAC, EnCodec, MBD, Mimi, SNAC, and Vocos. Metrics span distortion, perceptual, intelligibility, and non-intrusive categories. Subjective evaluation involved 13 filtered participants for speech-only and 17 for combined audio.

## Results

For speech-only audio, SCOREQ achieved the highest Pearson correlation with human perception (rho = 0.937, tau = 0.769), followed closely by PESQ (rho = 0.886) and STOI (rho = 0.885). For combined speech-and-background audio, PESQ emerged as the most robust predictor (rho = 0.903), while SCOREQ achieved rho = 0.869; metrics like ViSQOL Speech dropped significantly (rho = 0.593). PEAQ and reference-free metrics (DNSMOS, NISQA, NORESQA) performed poorly overall, showing near-zero or negative correlations on combined audio because background sounds confounded their speech clarity assumptions.

| Metric | Speech-Only Pearson (rho) | Combined Audio Pearson (rho) |
|---|---|---|
| SCOREQ | 0.937 | 0.869 |
| PESQ | 0.886 | 0.903 |
| STOI | 0.885 | 0.772 |
| 2f-Model | 0.836 | 0.816 |
| PEAQ | 0.145 | 0.582 |
| DNSMOS | 0.683 | -0.073 |

## Limitations

The study evaluates a limited set of 6 neural codecs and vocoders, leaving out many emerging neural speech codecs. The test set is small (11 clean and 11 combined audio samples), and listener counts after MUSHRA screening were relatively low (13 and 17 participants). Furthermore, none of the tested objective metrics explicitly model spatial or inter-channel phase/amplitude fidelity for stereo/multichannel audio.

## Why read this

Audio and speech engineers building or evaluating neural compression models will find clear, empirically backed guidance on which objective metrics to trust and avoid. It demonstrates that combining psychoacoustic metrics like PESQ with contrastive neural regression metrics like SCOREQ provides a reliable automated evaluation pipeline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated evaluation and validation pipelines for neural audio codecs, text-to-speech systems, and speech generative models.

## Related

- (link related pages by id as the wiki grows)
