---
id: turetzky26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2743
pdf: https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.pdf
---

# Knowing What to Stress: A Discourse-Conditioned Text-to-Speech Benchmark

[PDF](https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2743)

**TL;DR** — The paper introduces CAST, a text-to-speech benchmark for context-conditioned word-level stress, revealing that state-of-the-art TTS systems frequently fail to realize discourse-appropriate emphasis in speech despite text models recovering it easily.

## Problem

Spoken meaning depends heavily on which words are emphasized based on discourse context, yet modern expressive text-to-speech (TTS) systems are rarely evaluated on whether they infer and produce context-appropriate stress without explicit markup. While text-only language models easily capture these semantic shifts, it remains unclear if neural TTS can actually realize them in audio. Without a controlled evaluation framework, developers cannot isolate whether a model understands discourse-level pragmatic cues or merely relies on sentence-internal prosody.

## Method

The authors propose CAST (Context-Aware Stress TTS), a benchmark featuring 113 contrastive context pairs (226 items) where identical target sentences are paired with distinct preceding contexts requiring different semantic stress targets. The dataset construction uses GPT-5-mini with multi-judge consistency filtering (using GPT-5-nano and Gemini-2.5-flash) and human validation. They evaluate six diverse TTS architectures (Kokoro, Chatterbox, CosyVoice3, HiggsAudio V2, Qwen3-TTS, and GPT-4o-mini-tts) across multiple input conditioning modes: Concat (prepending context to text), Instruct (natural language prompting), and Explicit (oracle stress markup). Additionally, they release an extended synthetic corpus of ~10k context-sentence-audio triples generated via an automated pipeline and evaluate stress realization using WHISTRESS, an automatic stress detection model.

## Results

Across evaluation on the CAST benchmark using WHISTRESS, evaluated systems show a severe lack of context-appropriate stress realization, with Pair-Correct scores remaining extremely low (e.g., CosyVoice3 scores 0.9% to 10.6% depending on conditioning mode, and Qwen3-TTS scores around 2.7% to 3.5%). Hit rates for correctly stressing the intended word range from 23.0% to 52.2% across systems. Even under Explicit oracle stress conditioning, performance is far from perfect (e.g., GPT-4o-mini-tts achieves 11.5% Pair-Correct), indicating significant headroom in both contextual inference and explicit realization. Human validation on a subset showed high inter-annotator agreement (79% pairwise) and strong correlation with the benchmark labels and automatic stress detector.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing conversational agents, expressive audiobook narrators, or dialogue systems can use this benchmark and training recipe to evaluate and improve discourse-level prosodic control in TTS models.

## Limitations

The automatic stress detector (WHISTRESS) relies primarily on acoustic prominence cues like loudness which may miss subtle pitch-based shifts, and the evaluation scope is currently restricted to lexical word-level stress rather than broader prosodic elements like intonation contours.

## Related

- (link related pages by id as the wiki grows)
