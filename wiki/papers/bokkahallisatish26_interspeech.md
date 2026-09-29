---
id: bokkahallisatish26_interspeech
category: speech-llm-dialogue
institutions: ["KTH Royal Institute of Technology", "University of Edinburgh", "Texas A&M University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1918
pdf: https://www.isca-archive.org/interspeech_2026/bokkahallisatish26_interspeech.pdf
---

# The Voice Behind the Words: Quantifying Intersectional Bias in SpeechLLMs

*Shree Harsha Bokkahalli Satish, Christoph Minixhofer, Maria Teleki, James Caverlee, Ondřej Klejch, Peter Bell, Gustav Eje Henter, Éva Székely*

[PDF](https://www.isca-archive.org/interspeech_2026/bokkahallisatish26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bokkahallisatish26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1918)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper presents a large-scale evaluation of intersectional accent and gender bias in End-to-End Speech Large Language Models, revealing that Eastern European female-accented speech receives significantly less helpful and shorter text responses despite constant linguistic content and polite tone.

## Key contributions

- Evaluated three SpeechLLMs across 2,880 controlled interactions using voice-cloned prompts to isolate accent and perceived gender effects while keeping linguistic content constant.
- Uncovered intersectional bias showing that Eastern European female voices suffer from a compound helpfulness gap, receiving vaguer and shorter advice compared to other demographics.
- Compared multiple evaluation methods—including pointwise ratings, pairwise comparisons, Best-Worst Scaling via LLM-as-a-judge, and human validation—proving humans exhibit higher sensitivity to these disparities.
- Released an open dataset and evaluation prompts covering six accents and two gender presentations across eight conversational scenarios.

## Problem

Prior speech bias research relies heavily on Multiple Choice Question Answering (MCQA) proxies or cascaded pipelines that discard paralinguistic cues, failing to capture real-world algorithmic disparities in open-ended generative speech systems. In end-to-end SpeechLLMs, audio waveforms or neural speech tokens preserve accents, prosody, and perceived gender, which can latently influence downstream response quality. The interaction of these attributes—such as the well-documented sociolinguistic "Accent Ceiling" compounding with gender oppression—creates an intersectional "helpfulness gap" that traditional NLP metrics and coarse evaluation paradigms fail to detect.

## Method

The authors construct a synthetic evaluation dataset of 960 base speech prompts (derived from 40 conversational questions across 8 domains, plus hesitation-augmented variants) combined with reference voices from the EdAcc dataset representing 6 accents (Chinese, Eastern European, Indian English, Latin American, US English, Southern British English) and 2 perceived gender presentations. MegaTTS3 is used for voice cloning to ensure exact linguistic constancy across conditions. These 960 audio prompts are fed into three SpeechLLMs: LFM2-Audio-1.5B, OmniVinci, and Qwen3-Omni-30B-A3B-Instruct.

Evaluation uses three automated LLM-as-a-judge approaches via gemini-3-flash-preview (temperature 0 with concept-guided chain-of-thought) and human validation via Prolific. Pointwise ratings evaluate helpfulness, assumed competence, formality, and condescension on a 1-5 scale. Pairwise comparisons assess all 15 accent pairs within matched conditions with swapped order to mitigate positional bias. Best-Worst Scaling (BWS) simultaneously presents all 6 accent variants to extract partial rankings, fitted via a Plackett-Luce model to estimate accent worth parameters (pi_a). Human validation applies 4-alternative BWS trials with Plackett-Luce modeling to verify whether automated judge scores align with human sensitivity.

## Experimental setup

The study evaluates 2,880 total interactions across 6 accent categories and 2 gender presentations using three SpeechLLMs (LFM2-Audio-1.5B, OmniVinci, and Qwen3-Omni-30B-A3B-Instruct). Transcriptions are verified using Whisper (small) and WER metrics, while naturalness is checked via UTMOS. Automated evaluation employs gemini-3-flash-preview for pointwise, pairwise (1350 pairs), and BWS (238 groups) assessments. Human validation involves 18 qualified native or proficient English speakers on Prolific executing 4-alternative BWS tasks across 420 trials with rigorous attention checks.

## Results

Across all models, pointwise Kruskal-Wallis tests show no statistically significant main effect of accent on helpfulness (H = 5.80, p = 0.33), but model-specific breakdowns reveal helpfulness spreads of up to 0.59 points for LFM2-Audio. In pairwise comparisons, Eastern European speech achieves the lowest overall win rate (31.6%), losing head-to-head to every other accent (binomial test p = 0.007), while 88% of respectfulness comparisons result in ties, confirming the bias manifests as a depth-of-advice gap rather than overt rudeness. Intersectional analysis reveals Eastern European female voices receive the lowest mean helpfulness (3.15), a gap of 0.47 points below Southern British female voices (3.62), with an intra-accent gender gap of +0.38 favoring males.

Human BWS validation with Plackett-Luce modeling uncovers statistically significant penalties for Eastern European (beta = -0.57, p < 0.001) and Chinese (beta = -0.47, p = 0.004) relative to Mainstream US English, demonstrating that human evaluators possess higher sensitivity and detect sharper contrasts than the LLM judge. Low-rated responses predominantly suffer from generic, vague, or platitudinous advice (70.5% of low traces) and are substantially shorter (median 269 characters vs 517 for top-rated responses), with 97% of low-rated responses originating from OmniVinci and LFM2-Audio.

| System / Condition | LLM Judge BWS Worth (pi) | Human BWS Worth (pi) | Pairwise Helpfulness Win Rate (%) |
|---|---|---|---|
| Indian English | 0.184 | 0.249 | 40.0 - 47.0 |
| US English | 0.175 | 0.202 | 36.0 - 41.0 |
| Southern British | 0.169 | 0.152 | 40.0 - 43.0 |
| Latin American | 0.165 | 0.157 | 31.0 - 46.0 |
| Chinese | 0.156 | 0.126 | 37.0 - 47.0 |
| Eastern European | 0.151 | 0.114 | 29.3 - 36.0 |

## Limitations

The study relies on a limited set of conditioning voices per accent-gender category, which prevents the complete disentanglement of accent, perceived gender, speaker identity, and specific synthesis artifacts from MegaTTS3. The evaluation is restricted to English accents and two binary gender presentations, leaving multilingual capabilities and non-binary gender identities unexplored. Furthermore, human evaluations utilized incomplete 4-alternative subsets rather than full 6-way comparisons to manage cognitive load.

## Why read this

Speech and ML engineers building E2E SpeechLLMs must read this paper to understand that parity in transcription WER and polite tone does not guarantee equitable downstream response quality. It provides a robust evaluation blueprint combining voice cloning, LLM judges, and Best-Worst Scaling to uncover hidden intersectional helpfulness gaps.

## Code

- https://shreeharsha-bs.github.io/interspeech-voice-behind-words-website/

## Applications

Auditing fairness in conversational voice assistants, commercial SpeechLLMs, and multimodal dialogue systems to prevent algorithmic discrimination based on accent and gender.

## Institutions / 機構

KTH Royal Institute of Technology, University of Edinburgh, Texas A&M University

**Funding / 經費:** Wallenberg AI, Autonomous Systems and Software Program, Knut and Alice Wallenberg Foundation

## Related

- (link related pages by id as the wiki grows)
