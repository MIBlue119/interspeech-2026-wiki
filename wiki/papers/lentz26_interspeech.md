---
id: lentz26_interspeech
category: health-clinical
institutions: ["Ruhr-Universität Bochum", "McMaster University"]
code: https://www.ika.ruhr-uni-bochum.de/ika/demos/beatgain
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2713
pdf: https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.pdf
---

# BeatGain - A Rhythmic Pattern Enhancement Algorithm for Music Listening with Cochlear Implants

*Benjamin Lentz, Theresa Hartmann, Anil Nagathil, Ian Bruce, Rainer Martin*

[PDF](https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2713)

**Category:** `health-clinical`

**TL;DR** — BeatGain is a rhythmic pattern enhancement algorithm for cochlear implant music listening that amplifies metrically strong beats and suppresses weak off-beat events, achieving significant improvements in perceived rhythmic clarity over standard stem remixing baselines.

## Key contributions

- Proposes a rhythm-aware music pre-processing framework integrating neural stem separation, harmonic-percussive sound separation (HPSS), and beat tracking.
- Introduces metrically guided temporal modulation that amplifies quarter and eighth-note percussive positions while attenuating off-grid sixteenth notes to reduce rhythmic complexity.
- Formulates a gain-scaling mechanism applied specifically to the percussive components of bass, drum, and secondary stems.
- Demonstrates through a 2AFC listening experiment with 17 vocoder-simulated normal-hearing participants that BeatGain significantly outperforms uniform percussive amplification in rhythmic clarity.

## Problem

Cochlear implant (CI) users suffer from severely limited spectral resolution and pitch perception due to current spread and place-frequency mismatches, making complex music unenjoyable. While prior mixing approaches like stem extraction and harmonic-percussive sound separation improve spectral balance, they fail to explicitly target the temporal organization and intrinsic rhythmic complexity of music. Because CI listeners rely heavily on temporal envelope cues, unstructured percussive events can cause harmful acoustic overlap, necessitating an explicit rhythm-focused processing strategy.

## Method

The BeatGain pipeline takes an input audio track $x(n)$ and decomposes it into vocals $v(n)$, bass $b(n)$, drums $d(n)$, and other instruments $o(n)$ using the pretrained Spleeter neural network. Each stem is subsequently split into harmonic and percussive components using vertical and horizontal median filtering (HPSS). Harmonic components of the bass, drums, and other stems are entirely discarded ($\beta_{bh}=\beta_{dh}=\beta_{oh}=0$), while vocals are preserved unmodulated ($\beta_{vh}=\beta_{vp}=1$).

Simultaneously, the pretrained BeatThis! DNN estimates quarter-note beat positions, which are linearly interpolated to sixteenth-note timings $t(k)$ with metrical positions $w(k) \in \{1, \dots, 16\}$. A Hann window centered around each discrete timing $n_k$ with a local sixteenth-note duration scaling factor $R = 0.9$ builds a prototypical beat-adaptive gain signal via a 16-entry gain table $G$. In this proof-of-concept, quarter and eighth notes are multiplied by a gain factor of 2, and intermediate sixteenth notes are attenuated to zero.

This gain signal is scaled by stem-specific factors $g_u$ (applied exclusively to percussive bass, drums, and others where $g_{bp}=g_{dp}=g_{op}=1$, and zero elsewhere) to produce the final modified components. All processed stems and components are then summed to yield the enhanced output mix $y(n)$, designed specifically to reinforce metrically salient pulses and suppress syncopated complexity.

## Experimental setup

Evaluated on the IKA CI Pop Music Dataset comprising 15 pop/rock excerpts. Comparisons include the unprocessed signal and baseline remixing strategies (V+P and V+2P where percussive stems are uniformly amplified by $\alpha=1$ or $\alpha=2$ without metrical gain modulation). Metrics comprise estimated instrumental complexity (Buyens et al.) and Scale-Invariant Signal-to-Distortion Ratio (SI-SDR). A listening experiment with 17 normal-hearing participants used an 8-channel noise-excited band-pass vocoder (Greenwood scale, 100 Hz to 8 kHz) to simulate CI perception, loudness-normalized to -27 LUFS, evaluated via a two-alternative forced-choice (2AFC) paradigm.

## Results

BeatGain consistently achieved lower estimated instrumental complexity scores than uniform percussive remixing baselines across all amplification factors $\alpha$, dropping complexity below the unprocessed mixture's 27% baseline. In terms of SI-SDR, BeatGain introduced only minor additional structural distortions compared to standard V+P mixing while delivering superior temporal sparsification. In the 2AFC listening tests, BeatGain secured a statistically significant preference over V+2P in rhythmic clarity (59.4% preference score, $p<0.01$) and outperformed the unamplified V+P baseline significantly in both overall impression (71.2%) and rhythmic clarity (71.2%).

| System | SI-SDR (dB) vs Unprocessed | Estimated Complexity (%) | Rhythmic Clarity Pref (%) |
|---|---|---|---|
| Unprocessed | 0.0 | 27.0 | Reference |
| V+P (\alpha=1) | Higher | Moderate | Baseline |
| V+2P (\alpha=2) | Comparable | Lower | 52.4 (vs BeatGain) |
| BeatGain (Proposed) | Slightly Lower | Lowest | 59.4 (vs V+2P) |

## Limitations

Tested exclusively on 4/4 time signature rock and pop music excerpts, leaving meter structures like 3/4 or odd meters unexplored. The evaluation relied on normal-hearing subjects listening through an 8-channel vocoder simulation rather than actual cochlear implant users. The fixed binary gain pattern (amplifying on-beat, zeroing off-beat sixteenths) is a rigid proof-of-concept that may over-sparsify complex rhythmic genres like jazz or Latin music if not adapted.

## Why read this

Speech and audio engineers working on auditory prostheses or music enhancement algorithms should read this to see how integrating beat-tracking metrical hierarchies into source-separation pipelines successfully reduces perceptual complexity for electric hearing.

## Code

- https://www.ika.ruhr-uni-bochum.de/ika/demos/beatgain

## Applications

Cochlear implant sound processors, real-time music enhancement apps for hearing-impaired listeners, and rhythm-guided speech pre-processing algorithms.

## Institutions / 機構

Ruhr-Universität Bochum, McMaster University

## Related

- [Towards a Stochastic DNN Approximation of Cochlear Implant Auditory Models](hartmann26_interspeech.md) — same problem · relatedness 1.7/3
- [Adaptation to Room Acoustics in Understanding Vocoded Speech: A Comparison Between Listeners With Varying Immersion Age](pratiwi26_interspeech.md) — same problem · relatedness 1.7/3
- [Relative Importance of Formants to the Intelligibility of Vocoded Speech in Cochlear Implant Simulation](cai26_interspeech.md) — same problem · relatedness 1.6/3
- [Lightweight Convolutional Front-ends for Real-time Framewise Phoneme Recognition in Cochlear Implants](guo26d_interspeech.md) — same problem · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
