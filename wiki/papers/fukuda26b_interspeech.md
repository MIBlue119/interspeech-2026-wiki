---
id: fukuda26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2923
pdf: https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.pdf
---

# Evaluating Large Language Models Abilities for Addressee, Turn-change, and Next Speaker Prediction in Meetings

*Ryo Fukuda, Takatomo Kano, Siddhant Arora, Marc Delcroix, Naohiro Tawara, Atsunori Ogawa, Yuya Chiba, Atsushi Ando, William Chen, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2923)

**TL;DR** — This paper establishes a unified online evaluation framework for multi-party conversation turn-taking—comprising addressee detection, turn-change prediction, and next speaker prediction—and discovers that text-based LLMs outperform both supervised models and humans in next speaker prediction while multimodal LLMs struggle to effectively leverage raw audiovisual signals.

## Key contributions

- Constructs a unified evaluation protocol on the AMI corpus covering addressee detection, turn-change prediction, and next speaker prediction under realistic online constraints (using only past/current context).
- Provides a direct performance benchmark comparing human subjects, conventional supervised models (SVM, Random Forest, MLP, Naive Bayes), text-based LLMs (Qwen3 series), and multimodal LLMs (Qwen-Omni, Gemini 2.5 Pro).
- Demonstrates that text-based LLMs (e.g., Qwen3-14B) outperform humans and supervised models on next speaker prediction (reaching ~69.4 F1 vs. human 60.1 F1) by leveraging extensive conversational history.
- Reveals through feature and modality ablations that raw audiovisual signals provide limited complementary benefit in current MM-LLMs, whereas explicit focus-of-attention (gaze) labels consistently boost performance.

## Problem

In multi-party conversations (MPCs) involving more than two speakers, conversational agents must predict addressee identity, turn-change timing, and the next speaker dynamically without future information. Prior work has evaluated these tasks in isolated silos, lacked comprehensive cross-paradigm comparisons under unified protocols, and failed to quantify human performance under identical online constraints. Furthermore, it remained unclear whether multimodal LLMs can genuinely exploit raw audio-visual streams for turn-taking or if they simply rely on textual shortcuts.

## Method

The study evaluates three core conversational tasks using an online prediction paradigm where models and human participants process dialogue utterance by utterance without access to future context. The testbed primarily utilizes the AMI meeting corpus (4-speaker design-team scenarios, 10 sessions, ~4051 utterances), alongside a human evaluation subset tested by 12 non-native speakers using a custom web interface. Evaluated systems include four traditional supervised classifiers (SVM, MLP, Random Forest, Naive Bayes) using manual transcripts and speaker features; text-based Qwen3 decoders (8B, 14B, 32B) processing speaker-transcription conversation histories; and end-to-end multimodal LLMs (Qwen2.5-Omni-7B, Qwen3-Omni-30B, and Gemini 2.5 Pro) processing synchronized headset audio, video clips with bounding-box speaker labels, and text.

The models leverage internal reasoning mechanisms (e.g., Qwen's thinking mode) conditioned on multi-turn history lengths ranging from local context to 160 preceding utterances. Ablations isolate the impact of ASR transcriptions (Whisper large-v3 with 24.12% WER), focus-of-attention (FOA/gaze) annotations, context window sizes, and individual input modalities (stripping audio, video, or text) to pinpoint architectural bottlenecks and cue integration failures.

## Experimental setup

Evaluations are conducted on 10 sessions of the AMI corpus (~262 minutes, 4051 utterances) plus a human-evaluation subset (2 sessions, 347 utterances, 29 minutes). Systems are compared against naive baselines (majority class or random selection), traditional supervised models via 5-fold GroupKFold cross-validation, and human annotators. Metrics include classification accuracy (Acc), macro-averaged F1 (F1ma), precision, and recall. Implementations use bfloat16 precision with greedy decoding for local models and temperature 1.0 for Gemini 2.5 Pro API calls.

## Results

On the full AMI set, the traditional SVM achieved the highest addressee detection accuracy (56.4%) and strong turn-change accuracy (66.5%), while Qwen3-14B led text-based LLMs in next speaker prediction with an F1 score of 51.1%. Among multimodal models, Gemini 2.5 Pro achieved the highest turn-change accuracy (68.3%) but trailed text-based models in next speaker prediction (47.7 F1). In human-to-model subset comparisons, Qwen3-14B significantly outperformed humans on next speaker prediction (69.4 F1 vs. 60.1 F1), whereas humans dominated addressee detection (66.6% Acc vs. Qwen3's 51.5%). Context-ablation experiments proved that conversational history is critical: dropping context cratered Qwen3-14B next speaker F1 from 51.1% down to 36.9%.

| System / Condition | Addressee (Acc) | Turn-Change (Acc) | Next Speaker (F1) |
|---|---|---|---|
| Naive Baseline | 47.6 | 63.7 | 25.0 |
| SVM (Supervised) | 56.4 | 66.5 | 40.1 |
| Qwen3-14B (Text LLM) | 52.3 | 66.4 | 51.1 |
| Gemini 2.5 Pro (MM-LLM) | 55.7 | 68.3 | 47.7 |
| Human Baseline (Subset) | 66.6 | 75.0 | 60.1 |
| Qwen3-14B (Subset) | 51.5 | 67.4 | 69.4 |

## Limitations

Human evaluators were non-native English speakers relying on recorded third-person camera angles rather than first-person immersion, potentially underestimating human capability. The dataset is limited to the AMI corpus—four-speaker role-playing meeting scenarios—and results may not generalize to casual multi-party chats, unscripted domains, or different languages. Finally, raw audio-visual integration in current MM-LLMs is weak, failing to outperform text-only baselines unless explicit gaze/FOA labels are provided.

## Why read this

Speech and ML engineers building conversational agents or meeting assistants should read this to understand how state-of-the-art text and multimodal LLMs handle complex multi-party turn-taking dynamics compared to humans and classical models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building real-time conversational agents, meeting assistant bots, and multi-party dialogue management systems that require turn prediction and addressee tracking.

## Related

- (link related pages by id as the wiki grows)
