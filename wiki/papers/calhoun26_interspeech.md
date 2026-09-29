---
id: calhoun26_interspeech
category: phonetics-linguistics
institutions: ["Victoria University of Wellington"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1642
pdf: https://www.isca-archive.org/interspeech_2026/calhoun26_interspeech.pdf
---

# Listeners' gendered experiences and beliefs affect iconic pitch associations

*Sasha Calhoun, Paul Warren, Sara Gilbert*

[PDF](https://www.isca-archive.org/interspeech_2026/calhoun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/calhoun26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1642)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates how listeners' gendered experiences and ideological beliefs modulate iconic pitch-size associations (the Frequency Code), demonstrating through a priming and Implicit Association Task (IAT) that these associations are malleable and vary significantly by listener and voice gender.

## Key contributions

- Proposes an experimental paradigm combining a fictional-creature priming task and an Implicit Association Task (IAT) to measure the malleability of voice pitch-body size iconic associations.
- Shows that convergent priming significantly strengthens the pitch-size-affect association, whereas divergent priming inhibits it across listeners.
- Reveals that priming effects interact heavily with voice gender, exhibiting a wider swing between convergent and divergent conditions for female voices compared to male voices.
- Demonstrates that female participants exhibited stronger consistency effects regarding pitch-size associations overall following the priming task.

## Problem

While traditional accounts like the Frequency Code argue that pitch-size associations derive from universal physical dimensions (body size and sexual dimorphism), prior research (e.g., Calhoun et al.) largely overlooks how language- and individual-specific cultural ideologies—such as gender stereotypes linking masculinity with dominance—shape these meanings. Treating iconic pitch associations as purely biological fails to account for sociolinguistic variation observed across listener groups and social contexts. Understanding this intersection is crucial for explaining how physical resemblances and social constructions co-create speech prosody processing.

## Method

The experiment consists of a priming task, a memory test, and an Implicit Association Task (IAT). In the priming task, 163 participants (after screening, 158 retained: 80 female, 78 male) interacted via Qualtrics with AI-generated images of 10 large and 10 small fictional creatures paired with synthetic speech from SpeechGen. High-pitch voices (+4ST, 200–238Hz baseline for females; 105–139Hz for males) expressed weak or uncertain statements (“I’m a bit scared...”), while low-pitch voices (-3ST) expressed strong or authoritative statements (“...I’m strong and can take it”). Priming conditions crossed Voice Gender (female vs. male) with Convergence (convergent: large/low/strong, small/high/weak; vs. divergent: large/high/weak, small/low/strong).

Following a memory recognition test, participants completed an IAT in PsyToolkit using 6 large and 6 small animal images and nonsense word audio recordings (*yerwer*, *ernerm*) normalized in Praat/MATLAB to high (1.7 ERB raised) and low (-0.7 ERB lowered) pitch targets. The IAT comprises familiarization blocks and critical consistent/inconsistent blocks where keys map size and pitch attributes together. Data were analyzed using mixed-effects linear regression in R via the buildmer package, modeling inverse square-root transformed response times (RTs) with by-participant and by-stimulus random intercepts and consistency slopes.

## Experimental setup

The study analyzed 158 native British, Australian, or New Zealand English adult speakers (aged 18–65, 80 female, 78 male) distributed across 16 experimental conditions. Performance baselines and accuracy filters removed participants with >10% missing data, <75% response accuracy, or failed memory tests. Evaluation relied on response times (RTs) measured in milliseconds during IAT blocks, assessed via ANOVA and emmeans post-hoc analyses on mixed-effects linear models.

## Results

The mixed-effects model revealed a significant three-way interaction between Consistency, Voice Gender, and Prime ($F[1, 14312] = 4.17, p < 0.05$), showing that the consistency effect is robust across conditions but numerically larger and more clearly separated by confidence intervals under convergent vs. divergent priming for female voices. A significant interaction between Consistency and Prime ($F[1, 14312] = 14.5, p < 0.001$) confirmed that convergent priming produces stronger alignment than divergent priming. Furthermore, a significant interaction between Consistency and Participant Gender ($F[1, 14312] = 27.36, p < 0.001$) demonstrated that female participants had a stronger consistency effect than male participants. Where it does not win: the prime conditions did not robustly differentiate the effect sizes for male voices.

| System / Condition | Mean RT Consistency Effect (Approx. / Trend) | Statistical Significance | Prime Impact | Speaker Gender Dynamic |
|---|---|---|---|---|
| Convergent / Female Voices | Strong positive RT difference | $p < 0.001$ | High enhancement | Strongest swing |
| Divergent / Female Voices | Weaker positive/inhibited RT difference | $p < 0.05$ | Moderate reduction | Strongest swing |
| Convergent / Male Voices | Moderate positive RT difference | $p < 0.001$ | Moderate enhancement | Smaller variation |
| Divergent / Male Voices | Moderate positive RT difference | $p < 0.001$ | Slight reduction | Smaller variation |
| Female Participants | Stronger overall consistency effect | $p < 0.001$ | N/A (Main effect) | Higher sensitivity |
| Male Participants | Robust but smaller consistency effect | $p < 0.001$ | N/A (Main effect) | Lower sensitivity |

## Limitations

The study is limited by English-only L1 speakers from specific dialects (British, Australian, NZ), restricting cross-linguistic generalization. Because the priming stimuli simultaneously manipulated pitch and affective semantic content, the authors cannot cleanly disentangle whether the priming trigger was driven strictly by pitch acoustics, the lexical affect statements, or both. Additionally, the sample size per cell across 16 experimental subgroups is relatively small (8-11 participants per cell), and synthetic AI voices may introduce unnatural artifacts relative to natural human speech.

## Why read this

Speech researchers and cognitive scientists studying sound symbolism and sociophonetics should read this to understand how transient linguistic experience and gender ideologies dynamically override or modulate universal physical sound-symbolic mappings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving synthetic voice design, expressive text-to-speech modeling, and socially aware speech interface agents by accounting for listener gender stereotypes and iconic pitch associations.

## Institutions / 機構

Victoria University of Wellington

**Funding / 經費:** Faculty Strategic Research Grant from Te Herenga Waka – Victoria University of Wellington

## Related

- [Sexualised Synthetic Personas Encode and Amplify Gendered Power Asymmetries through Voice](ross26b_interspeech.md) — same problem · relatedness 1.9/3
- [TMASC: Transmasculine Attitude and Speech Corpus](wong26_interspeech.md) — complementary · relatedness 1.8/3
- [Naming Heroes and Villains – The Influence of Phonaesthetics](schade26_interspeech.md) — relatedness 1.7/3
- [Disentangling sociophonetic and physiological variation in /s/ acoustics across 12 languages](lipari26_interspeech.md) — relatedness 1.7/3
- [The (non-)universality of prominence and Intonation Phrases: German and Hungarian listeners'' perception of an unfamiliar language](jabeen26_interspeech.md) — relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
