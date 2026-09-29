---
id: mousavi26_interspeech
category: speech-llm-dialogue
institutions: ["Concordia University", "Mila - Quebec AI Institute", "Universite Laval", "Birla Institute of Technology and Science, Pilani"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1533
pdf: https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.pdf
---

# Investigating Faithfulness in Large Audio Language Models

*Pooneh Mousavi, Lovenya Jain, Mirco Ravanelli, Cem Subakan*

[PDF](https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1533)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper investigates the faithfulness of Chain-of-Thought (CoT) reasoning in Large Audio Language Models (LALMs) with respect to input audio and final outputs, revealing a critical multimodal disconnect where models remain textually consistent but frequently fail to properly ground their reasoning in acoustic inputs. Through systematic audio and CoT interventions, the authors demonstrate that LALMs are vulnerable to audio hallucinations, attention biases, and adversarial speech injections.

## Key contributions

- Proposes a systematic evaluation framework for LALM faithfulness defined by three audio-faithfulness criteria: hallucination-free, holistic, and attentive listening.
- Introduces context-preserving audio interventions (Gaussian noise addition at -20 to 20 dB, random/guided masking from 20% to 100%, and adversarial TTS speech injections) to test audio-to-CoT grounding.
- Adapts and applies CoT interventions (filler tokens, early answering/truncation, paraphrasing, and error injection) to assess whether LALM reasoning chains faithfully drive their final predictions.
- Benchmarking analysis across prominent open-source models (Audio Flamingo 3-Think and Qwen2.5-Omni) exposing fundamental vulnerabilities in acoustic grounding despite high internal text-output consistency.

## Problem

While Large Audio Language Models (LALMs) frequently generate Chain-of-Thought (CoT) explanations to improve interpretability and performance on audio understanding tasks, it remains unclear whether these reasoning paths faithfully reflect their internal decision-making processes. Prior text-only studies indicate that CoT can suffer from post-hoc rationalization, exploitation of extra test-time computation, or hidden steganographic encoding, and these issues are magnified in multimodal audio settings due to potential audio hallucinations, attention sinks, and a heavy reliance on linguistic transcriptions over acoustic cues. Understanding this gap is essential for deploying reliable LALMs in decision-critical domains like healthcare, security, and forensics, where unfaithful reasoning can be dangerous.

## Method

The paper evaluates two open-source LALMs with reasoning capabilities: Audio Flamingo 3-Think (AF3) and Qwen2.5-Omni. The authors implement a suite of context-preserving audio interventions: (1) Adding Gaussian white noise across five SNR levels (-20, -10, 0, 10, 20 dB) to test hallucination-free listening under extreme corruption; (2) Random masking (20% to 100% ratios in distributed chunks) and guided masking (isolating speech vs. background audio on the JASCO dataset) to check for holistic listening versus attention sinks; and (3) Adversarial speech injection using CosyVoice TTS to insert conflicting right/wrong answers at comparable or lower power than the base audio to test attentive listening. Additionally, four CoT intervention strategies are applied to test CoT-output faithfulness: replacing reasoning tokens with 'lorem ipsum' filler tokens (0-100% in 5% increments) to test test-time computation; progressive early answering/truncation to detect post-hoc reasoning; external LLM-based paraphrasing to eliminate hidden encoded cues; and incremental logical error injection to check if final predictions blindly follow corrupted chains.

Evaluation uses automated extraction of reasoning strings from final predictions, with an LLM-as-a-judge (Mistral-Small-3.1-24B-Instruct-2503) evaluating semantic consistency on a 1-to-5 scale (ranging from perfectly consistent to contradictory). Answer accuracy and CoT semantic consistency trends are measured across multiple specialized benchmarks.

## Experimental setup

The evaluation uses three diverse datasets: SAKURA (featuring 500 multiple-choice questions per track across animal sounds, language, emotion, and gender), MMAR (1,000 real-world video triplets requiring multi-step reasoning over speech, music, and environmental audio), and MMAU (1,000 expert-level curated clips with human-annotated QA). The models tested are Audio Flamingo 3-Think (AF3) and Qwen2.5-Omni. Faithfulness and robustness are measured via final prediction accuracy and LLM-rated CoT semantic consistency scores (1-5 scale).

## Results

Under audio noise interventions, both AF3 and Qwen2.5-Omni maintain performance down to 0 dB SNR, but suffer severe degradation at -20 dB SNR, where AF3 exhibits hallucinatory CoT reasoning with consistency scores as high as 3.57 on MMAU despite pure noise inputs, whereas Qwen2.5-Omni tends to explicitly state it hears nothing (yielding lower consistency scores like 2.35 on SAKURA animal tracks). Random and guided masking reveal that models fail above 60% mask ratios and rely predominantly on speech over background audio, with speech masking leading to lower similarity scores because models easily hallucinate details from spoken context. Under adversarial speech injections, injecting wrong answers causes drastic performance drops (e.g., SAKURA-Animal accuracy falls from ~75% to ~25% for AF3), showing heavy reliance on linguistic cues over acoustics. Conversely, CoT interventions show high faithfulness to final outputs: paraphrasing maintains near-perfect consistency, while early answering, adding mistakes, and filler tokens cause sharp declines in consistency, proving that the semantic integrity of generated reasoning heavily impacts final model predictions.

| Intervention | Model | Animal | Language | Emotion | Gender | MMAR | MMAU |
|---|---|---|---|---|---|---|---|
| Mask 100% | AF3 | 3.01 | 2.63 | 2.87 | 3.10 | 3.19 | 3.65 |
| Mask 100% | Qwen | 2.35 | 2.40 | 2.95 | 2.64 | 2.81 | 3.39 |
| Mask 20% | AF3 | 4.60 | 4.32 | 4.35 | 4.04 | 3.97 | 4.41 |
| Mask 20% | Qwen | 4.68 | 4.62 | 3.89 | 3.45 | 4.01 | 4.45 |
| -20dB SNR | AF3 | 2.89 | 2.54 | 3.17 | 3.13 | 3.09 | 3.57 |
| -20dB SNR | Qwen | 2.45 | 2.27 | 2.70 | 2.61 | 2.82 | 3.22 |

## Limitations

The study focuses exclusively on two open-source LALMs (Audio Flamingo 3 and Qwen2.5-Omni) and a specific set of English-centric or standard multimodal benchmarks, limiting generalization to proprietary models like GPT-4o or Gemini. The audio interventions, while context-preserving, rely on synthetic corruptions (Gaussian noise, rule-based masking, TTS injections) which may not fully capture complex real-world acoustic degradations. Furthermore, the evaluation uses an LLM-as-a-judge for semantic similarity scoring, which can introduce automated evaluation biases.

## Why read this

Speech and ML researchers building multimodal audio language models or deploying them in high-stakes domains should read this paper to understand the hidden vulnerability of LALMs to audio hallucinations and linguistic shortcutting. It provides a concrete, reproducible evaluation framework for auditing whether reasoning chains are genuinely grounded in acoustic signals or merely acting as post-hoc text rationalizations.

## Code

- https://poonehmousavi.github.io/faithfulness/

## Applications

Auditing and improving the safety, trustworthiness, and robustness of audio language models used in healthcare, automated forensics, security monitoring, and spoken dialogue systems.

## Institutions / 機構

Concordia University, Mila - Quebec AI Institute, Universite Laval, Birla Institute of Technology and Science, Pilani

**Funding / 經費:** Natural Sciences and Engineering Research Council of Canada, Digital Research Alliance of Canada, Translated Imminent Program, Apple

## Related

- (link related pages by id as the wiki grows)
