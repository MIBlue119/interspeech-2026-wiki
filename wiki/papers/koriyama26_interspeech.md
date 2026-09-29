---
id: koriyama26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1800
pdf: https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.pdf
---

# Benchmarking Large Language Models for Grapheme-to-Phoneme Conversion: A Japanese Case Study

*Tomoki Koriyama*

[PDF](https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koriyama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1800)

**Category:** `tts`

**TL;DR** — This paper benchmarks over 30 LLMs for Japanese grapheme-to-phoneme (G2P) conversion across 3,000 manually annotated sentences, showing that proprietary models achieve a kana character error rate (CER) below 0.52%, outperforming conventional morphological analyzers (1.03%).

## Key contributions

- Conducts the first large-scale G2P benchmark covering 30+ LLMs (proprietary and open-weight from 2B to 1T parameters) alongside traditional morphological analyzers.
- Compares parse mode (LLM morphological analysis + rule-based kana conversion) versus direct mode (end-to-end LLM prediction), demonstrating that parse mode yields superior accuracy for most models.
- Proves that feeding LLM-predicted kana into a kana-input TTS system yields lower pronunciation error rates than direct text-to-waveform end-to-end TTS while maintaining equivalent naturalness.
- Releases a manually annotated kana reading dataset of 3,000 sentences (derived from the JVS nonpara30 subset) and evaluation scripts.

## Problem

While end-to-end text-to-speech (TTS) models implicitly learn pronunciation, explicit G2P conversion remains vital for practical applications requiring controllability, robustness, and accurate handling of proper nouns and heteronyms. Japanese G2P is particularly challenging because text lacks word boundaries, kanji are polyphonic depending on context, and numeral-counter expressions follow irregular phonological rules. Conventional dictionary-based morphological analyzers (e.g., OpenJTalk, MeCab with UniDic) fail on out-of-vocabulary words, loanwords, and proper nouns, while direct LLM prompting often struggles with complex language-specific pronunciation rules.

## Method

The paper investigates two operational pipelines: parse mode and direct mode. In parse mode, an LLM performs morphological analysis and outputs a JSON array containing surface forms, katakana readings, and parts of speech, while a deterministic rule-based post-processor handles particle conversions (e.g., は to ワ) and long-vowel normalizations. In direct mode, the LLM maps raw text directly to a full katakana string in a single step, requiring the model to internally handle all phonological exceptions. 

Evaluated open-weight models range from 2B to 1T parameters (including Gemma, Qwen, Llama, GLM, gpt-oss, and Kimi families, with Japanese-specialized 'Swallow' continual pretraining variants) alongside proprietary APIs (Claude, Gemini, OpenAI GPT). Most experiments run with LLM reasoning (thinking mode) disabled, though the effect of reasoning effort is explored. For downstream evaluation, CosyVoice 2 is fine-tuned with LoRA on the Corpus of Spontaneous Japanese (CSJ) to accept kana inputs.

## Experimental setup

Evaluated on 3,000 manually annotated sentences from the nonpara30 subset of the JVS corpus, containing 6.0% kanji proper nouns, 8.5% katakana proper nouns, and 14.2% numeral-counter expressions. Metrics include kana Character Error Rate (CER) and UTMOS for speech naturalness, alongside a kana-output Whisper ASR model (2.22% CER on CSJ test) to evaluate synthesized speech. Baselines comprise 7 conventional morphological analyzers: KWJA, KyTea, MeCab+IPAdic, MeCab+UniDic, OpenJTalk, Sudachi, and Vaporetto.

## Results

Claude Opus 4.6 in parse mode achieved the best proprietary API CER of 0.52%, and Gemini 3.1 Pro in direct mode achieved 0.53%, both outperforming the best conventional tool, OpenJTalk (1.03%). For open-weight local models, Llama3.3-Swallow-70B reached 2.85% CER, outperforming its base model (6.58%) and confirming that Japanese-specialized continual pretraining reduces CER. Parse mode outperformed direct mode for smaller and local models (e.g., Gemma3-4B scored 34.82% in parse vs. 56.69% in direct mode) because rule-based post-processing relieves the LLM from executing complex particle and vowel-lengthening rules. However, direct mode occasionally won on numeral-counter expressions where morphological analysers incorrectly split tokens (e.g., separating 2 and 人). In downstream TTS evaluations, G2P-based synthesis using Gemini 3.1 Pro achieved 2.38% CER compared to 3.96% for Gemini 2.5 Flash TTS and 12.08% for baseline CosyVoice 2.

| System / Condition | Mode | Kana CER (%) | UTMOS |
|---|---|---|---|
| OpenJTalk (Best Conventional) | Parse | 1.03 | - |
| Claude Opus 4.6 (Best Proprietary) | Parse | 0.52 | - |
| Gemini 3.1 Pro (Best Proprietary) | Direct | 0.53 | - |
| Llama3.3-Swallow-70B (Best Open-Weight) | Parse | 2.85 | - |
| Gemini 3.1 Pro G2P + CosyVoice 2 | TTS | 2.38 | 3.82 |
| Gemini 2.5 Flash TTS (End-to-End) | Text | 3.96 | 3.75 |

## Limitations

The evaluation dataset is limited to 3,000 sentences from a single Japanese speech corpus (JVS nonpara30), which may underrepresent niche dialects, highly technical domains, or rare edge cases. The study relies primarily on non-thinking LLM configurations, though reasoning modes show isolated benefits. Computationally heavy proprietary APIs and ultra-large open-weight models (up to 1T parameters) are required to surpass traditional rules, making on-device deployment challenging for top-tier CER levels.

## Why read this

Speech synthesis researchers and engineers building controllable Japanese TTS systems should read this paper to understand when and how to replace legacy morphological dictionaries with modern LLMs for lower pronunciation error rates.

## Code

- https://github.com/CyberAgentAILab/jvs_nonpara_kana

## Applications

Controllable text-to-speech (TTS) systems, robust proper-noun pronunciation engines, and Japanese language preprocessing pipelines.

## Institutions / 機構

CyberAgent

## Related

- (link related pages by id as the wiki grows)
