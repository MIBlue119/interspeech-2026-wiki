---
id: chen26m_interspeech
category: phonetics-linguistics
institutions: ["Chinese University of Hong Kong", "University College Dublin", "Chinese University of Hong Kong, Shenzhen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1194
pdf: https://www.isca-archive.org/interspeech_2026/chen26m_interspeech.pdf
---

# Modulation of Phonetic Realizations in Cantonese Dialogue with Human and AI Interlocutors

*Xinyi Chen, Grace Wenling Cao, Yusheng Tian, Manson Chun Man Wong, Miko Hoi Tung Ng, Tan Lee, Peggy Pik Ki Mok*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1194)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates how interacting with human versus AI interlocutors and emotional stances modulate fine-grained phonetic realizations in Cantonese dialogue, finding shorter target word durations and tone-specific F0 shifts in AI interactions. By controlling the voice and speech rate of a customized DurIAN-based text-to-speech AI against a human model speaker, the authors reveal precise word-level phonetic adjustments rather than global acoustic changes.

## Key contributions

- Demonstrates that interacting with a synthetic AI interlocutor elicits significantly shorter target word durations (~10 ms reduction) compared to human interlocutors in a tone language.
- Reveals tone-specific F0 contour modifications in AI dialogue (raising Tone 1 and Tone 4, lowering Tone 5) rather than a global pitch shift.
- Implements a controlled Wizard-of-Oz paradigm using a custom-trained DurIAN TTS model to match human voice quality and speaking rate, avoiding confounds from commercial black-box AI assistants.
- Explores the impact of negative emotion in human-AI interaction, observing a marginal expansion of the vowel space area (VSA) and raised F0 contours for Tone 2 under negative stance.

## Problem

Prior work examining phonetic modulation in human-AI interaction has overwhelmingly focused on intonation languages (such as English and German) and positively valenced or prosocial systems, leaving tone languages largely unexplored. Furthermore, previous studies often utilized off-the-shelf commercial AI assistants (like Alexa) whose distinct voices, mismatched baseline rates, and lack of stimulus control severely confounded acoustic comparisons. It remains poorly understood whether users adapt their speech to synthetic agents globally or at a fine-grained, localized level, particularly under antagonistic or negatively expressive emotional conditions.

## Method

The study utilized a within-subject design with 17 native Hong Kong Cantonese speakers engaging in a scripted dialogue task under a Wizard-of-Oz framework. Participants completed 20 dialogues (10 with a human model talker via live video call, 10 with an iPhone Memoji avatar driven by a customized TTS voice). The AI voice was synthesized using a modified duration-informed DurIAN model trained on roughly 3,000 sentences from the same female human speaker, taking phoneme duration, pitch, and energy extracted from human recordings as input parameters to match voice quality and tempo. Each dialogue comprised 6 alternating turns, where emotional stance shifted from neutral (turns 1-2) to negative (turns 3-6) featuring blame or criticism. Twenty disyllabic target words containing corner vowels (/i/, /a:/, /ʊ/) and all six Cantonese lexical tones were embedded medially across turns.

Acoustic analyses were conducted in Praat using Montreal Forced Aligner with manual corrections. Durational measures (utterance speech rate, target word duration, syllable duration) were analyzed using linear mixed-effects models (LMMs) with Interlocutor Identity and Emotional Stance as fixed effects and Participant and Dialogue as random intercepts. Time-normalized F0 trajectories of target syllables (sampled at 10 points) were evaluated using generalized additive mixed models (GAMMs) with z-scored F0, incorporating tensor product smooths for Tone Category × Interlocutor Identity × Emotion along with participant random smooths and an AR(1) autocorrelation structure. Vowel space area (VSA) was computed using ERB-transformed F1-F2 coordinates of the three corner vowels extracted from 10% to 100% of vowel duration (10-40% for the diphthong /aːi/) and analyzed via LMMs.

## Experimental setup

Evaluated on 17 native Hong Kong Cantonese speakers (9 males, 8 females, aged 18-27) participating in a sound-proof booth experiment. The dataset comprised 20 scripted dialogues per participant (totaling 80 utterances per participant across human and AI conditions), featuring 20 disyllabic target words embedded twice in model turns and four times in participant turns. Metrics included utterance-level speech rate (syllables/sec), target word/character duration (ms), time-varying zF0 trajectories across all 6 Cantonese tones, and vowel space area (VSA) in ERB scale. Statistical modeling used lme4 and mgcv packages in R with restricted maximum likelihood (REML).

## Results

Linear mixed-effects models showed a significant main effect of Interlocutor Identity on target disyllabic word duration (beta = -10.891, p = .04), with shorter durations in the AI condition (mean 372.5 ms) relative to the human condition (mean 380.5 ms), and a marginal trend for target syllable duration (beta = -5.986, p = .06). Utterance-level speech rate showed no significant differences, confirming the adaptation was localized to target items rather than global. GAMM analyses revealed tone-specific F0 adjustments: Tone 1 (significant difference interval 2.55-7.73) and Tone 4 (interval 1-5 in neutral; 1.18-8.36 in negative) exhibited significantly higher F0 contours toward the AI interlocutor, whereas Tone 5 showed a lowered F0 contour (interval 4-8.45). Emotionally, Tone 2 displayed a significantly raised F0 under negative emotion for both interlocutors (intervals ~1.4 to 10). Vowel space area showed a marginal expansion under negative emotion compared to neutral (beta = 1.07, p = .057). Emotion did not yield significant main effects on word duration, and the interaction between interlocutor identity and emotion was non-significant.

## Limitations

The study relies on a relatively small sample size of 17 speakers and 20 target words, which limits statistical power and likely accounts for the marginal significance observed in vowel space area. The emotional manipulation utilized brief 6-turn dialogues with rapid neutral-to-negative shifts, which may have introduced transient conversational dynamics that attenuated sustained emotional adaptation effects. The scope is restricted to Hong Kong Cantonese, and findings may not generalize to other tone languages or unscripted, spontaneous human-AI dialogue tasks.

## Why read this

This paper is essential reading for speech scientists and dialogue system engineers interested in human-AI interaction in tone languages, demonstrating that users make fine-grained, word-level phonetic and tonal adjustments to synthetic voices when audio-visual confounds are rigorously controlled.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Design of more natural and emotionally responsive conversational agents, voice user interface evaluation, and speech synthesis systems for tone languages.

## Institutions / 機構

Chinese University of Hong Kong, University College Dublin, Chinese University of Hong Kong, Shenzhen

**Funding / 經費:** Hong Kong RGC GRF, CUHK Research Committee Postdoctoral Fellowship Scheme, Hong Kong RGC Postdoctoral Fellowship

## Related

- [L2 Speakers Accommodate Differently to AI and Human Voices Across Phonetic Features](gan26_interspeech.md) — same problem · relatedness 2.2/3
- [Bilingual Speaker Phonetic Alignment to Voice Assistants](allen26_interspeech.md) — same problem · relatedness 2.2/3
- [Amadea: An AI Companion for Pitch-Aware Spoken Language Practice](agrawal26_interspeech.md) — complementary · relatedness 1.9/3
- [A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning](xu26i_interspeech.md) — same problem · relatedness 1.9/3
- [Speech Entrainment in Multi-Party Conversations with a Digital Agent](mehlman26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
