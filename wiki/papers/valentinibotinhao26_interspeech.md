---
id: valentinibotinhao26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-446
pdf: https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.pdf
---

# Exploring Active Sampling Strategies for Pairwise Comparisons in Speech Synthesis Evaluation

*Cassia Valentini-Botinhao, Andrea Lorena Aldana Blanco, Dan Wells, Aidan Pine, Korin Richmond*

[PDF](https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-446)

**TL;DR** — This paper evaluates active sampling strategies for pairwise and tuple-based speech synthesis evaluation, showing that the information-gain-based ASAP method combined with Best-Worst Scaling (BWS) dramatically reduces listening test duration while outperforming traditional random selection and sorting methods.

## Key contributions

- Extends the ASAP information-gain active sampling algorithm to Best-Worst Scaling (BWS) tests by using greedy search to select minimal BWS questions covering requested system pairs.
- Compares passive random sampling, merge-rank (MR) sorting-based methods, and the active ASAP framework across both AB and BWS listening test paradigms.
- Demonstrates that BWS tests are more efficient than AB tests for the same overall listening duration in terms of number of significant system differences and rank correlation.
- Provides practical evaluation guidelines showing that 10 participants taking a 20-minute BWS test with ASAP yields equivalent performance to 40 participants taking an 800-minute AB test.

## Problem

Subjective listening tests remain the gold standard for text-to-speech (TTS) evaluation, but preference-based tests like AB and Best-Worst Scaling (BWS) are underutilized due to the false belief that all possible system pairs must be tested. Traditional MOS tests suffer from absolute rating biases and lack cross-test comparability, whereas exhaustive pairwise testing leads to an intractable quadratic growth in evaluation time ($N(N-1)/2$). While rating models like TrueSkill and Bradley-Terry can estimate rankings from incomplete data, naive random sampling requires excessive annotation effort to uncover statistically significant differences between systems, particularly in low-resource settings.

## Method

The paper investigates three pair selection approaches: random selection, a sorting-based merge-rank (MR) method, and an information-gain-based method called ASAP. The MR method uses confidence intervals and termination criteria (with maximum requests per pair $m \in \{54, 108, 216\}$) to iteratively compare adjacent systems based on a sorting assumption. In contrast, ASAP calculates the Kullback-Leibler (KL) divergence between prior and posterior score distributions (estimated via TrueSkill) to measure expected information gain, generating batches of 9 pairs per iteration via minimum spanning tree weights. To operationalize this for BWS, where questions contain 4 systems simultaneously, a greedy search algorithm retrieves minimum BWS questions that cover the requested system pairs.

To evaluate these sampling schemes without confounding live listener variance, the authors constructed a large pool of empirical ratings from a pre-collected bank covering all possible pair and tuple combinations. Stimuli comprise 10 systems (natural speech, Blizzard Challenge 2013 legacy models N, C, K, M, B, and modern Tacotron/FastPitch neural models paired with WaveNet or Parallel WaveGAN vocoders) evaluated across 90 test utterances. AB tests used 90 questions per test setup (2 questions per system pair), while BWS tests used 30 questions per configuration spanning 210 four-system tuples. Ratings from 60 Prolific participants per test (filtered down to 54 for AB and 57 for BWS after quality exclusions) provide the empirical distribution from which the sampling algorithms draw responses.

## Experimental setup

Evaluations used speech data from Blizzard Challenge 2013 and modern neural models across 90 test sentences, administered to 54 (AB) and 57 (BWS) native English speakers. Baselines include random pair sampling and merge-rank sorting (MR1, MR2, MR3, and random-initialized MR1-R). Metrics include the number of significantly different system pairs (derived from TrueSkill score confidence intervals with a 0.05 significance threshold) and Kendall rank correlation against rankings derived from exhaustive evaluation.

## Results

The ASAP method consistently outperforms random sampling and merge-rank approaches across both AB and BWS tests, revealing more significant differences and achieving higher rank correlation with fewer iterations. For instance, in the AB test framework, ASAP uncovers significantly more system performance differences than random selection at matched question budgets. Comparing test paradigms directly at equivalent listener durations, BWS substantially outperforms AB testing in both rank accuracy and revealed significant differences, an advantage further amplified when paired with the ASAP sampling strategy.

The merge-rank method achieves high rank correlation even with a random initial ranking (MR1-R), but exposes fewer significant differences during intermediate iterations because it exhaustively compares individual pairs before progressing. Evaluated against objective metrics on the same data, traditional neural estimators (SSLMOS, UTMOS, ScoreQ, TTSDS) yielded lower rank correlations (ranging from 0.47 to 0.73) compared to the optimized subjective active sampling pipelines.

## Limitations

The evaluation relies on a fixed stimulus bank from 10 distinct systems, meaning generalization to modern state-of-the-art systems with very narrow performance gaps requires further validation. The experiments are restricted to American English listeners, leaving cross-lingual applicability unverified. Furthermore, question retrieval is performed with replacement from a pre-collected evaluation pool rather than adaptive online generation during live listening sessions.

## Why read this

Speech and ML researchers designing subjective evaluation pipelines for TTS or voice cloning will learn how to drastically cut listener annotation hours using information-gain active sampling and BWS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech synthesis evaluation, automated TTS leaderboards, and low-resource speech technology assessment.

## Related

- (link related pages by id as the wiki grows)
