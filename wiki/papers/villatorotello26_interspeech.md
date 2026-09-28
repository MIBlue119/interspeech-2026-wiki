---
id: villatorotello26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3326
pdf: https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.pdf
---

# Context Projector: Complementary Keyword and Dialogue Context Embeddings for LLM-based ASR

[PDF](https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3326)

**TL;DR** — A hybrid context projector for LLM-based ASR combines compact dialogue-history embeddings with automatically extracted keywords, achieving average relative improvements of up to 2.5% in overall word error rate and 7.2% in bias-word error rate.

## Problem

Spoken dialogue systems in contact centers require precise recognition of business-critical entities, but standard LLM-based ASR models relying on fixed prompts struggle with multi-turn conversation history. While injecting raw dialogue history into prompts could help, it increases computational cost and degrades overall transcription reliability due to prompt clutter and context distraction.

## Method

The architecture builds on a base SLAM-ASR model using a WavLM-Large encoder and a Llama 3.2 3B Instruct decoder with a frozen backbone, training only lightweight linear projection modules. Sentence-level dialogue history utterances are mapped into a latent space via Dialog2Flow (D2F) joint-bert-base embeddings to capture functional dialogue actions, which are then compressed through a drop-in context projector (cp). Salient keywords extracted from previous turns using a zero-shot Gemma 3 (27B) model (chosen for its 90.6% entity recall) are appended alongside the projected context tokens into the prompt template. The speech projector and context projector share a single hidden layer of dimension 2048 and are optimized using AdamW with a learning rate of 1e-4.

## Results

Evaluated on a multi-domain Defined.ai contact-center corpus containing 107,941 utterances across Banking, Healthcare, Insurance, Retail, and Telecommunications domains (totaling 246.4 hours). Compared to a base model without context, naive raw-context prompting degrades overall WER, whereas the proposed hybrid keyword and context projection approach reduces average WER by 2.5%, reduces BWER by 7.2%, and improves entity-level F1 score by up to 3.7%. Using a history window of the 10 previous dialogue turns generally yields optimal saturation before performance plateaus.

## Code

- https://github.com/idiap/llm-asr-context-projector

## Applications

Engineers building spoken dialogue systems, contact-center transcription pipelines, agent-assist tools, or downstream dialogue state tracking applications requiring high entity accuracy.

## Limitations

Context window saturation occurs around 10 turns, beyond which additional history provides marginal gains or introduces variability.

## Related

- (link related pages by id as the wiki grows)
