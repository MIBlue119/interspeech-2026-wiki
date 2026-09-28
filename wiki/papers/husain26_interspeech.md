---
id: husain26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-786
pdf: https://www.isca-archive.org/interspeech_2026/husain26_interspeech.pdf
---

# Beyond WER: Entity and Disfluency Recall in Accented Conversational ASR

*Fiza Husain, Ankit Pandey, Yash Singh*

[PDF](https://www.isca-archive.org/interspeech_2026/husain26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/husain26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-786)

**TL;DR** — A three-stage data-centric pipeline combining heuristic SQL data curation and per-region LoRA adaptation on Qwen2.5-Omni-3B improves entity recall to 80-85% and filler recall to 76-86% for accented conversational English, matching a zero-shot 30B model with 10× fewer parameters.

## Key contributions

- Heuristic entity-rich data curation using SQL filters (consecutive capitalized words, acronyms, honorifics, mid-sentence capitalization) yielding ~2.8× higher entity density and statistically significant 2.8–4.2 pp entity recall gains (p < 0.0001).
- Dual-output training format for Qwen2.5-Omni-3B that generates both verbatim transcripts (preserving filled pauses and pronunciation variants) and corrected transcripts (proper entity spelling) in a single forward pass.
- Per-region LoRA adaptation (rank r=32, scaling factor alpha=32) trained on 10k samples per region, reducing WER to 6–10% and achieving 80–85% entity recall.
- A six-category error taxonomy validated by an LLM judge (Claude Sonnet 4.5, 83.8% exact accuracy) to systematically diagnose acoustic, phonetic, and entity errors.

## Problem

Standard ASR systems are optimized for aggregate Word Error Rate (WER) and fail on conversational English from non-native speaker populations (such as India, Indonesia, and Latin America). While baseline systems report seemingly acceptable 13–21% WER, their entity recall collapses to 53–55% and filler recall drops below 5%, failing language-learning feedback loops where capturing proper nouns and disfluencies is critical. Prior post-hoc correction methods like vector database lookups, N-best re-ranking, or auxiliary LLM wrappers add inference-time latency and complexity without addressing upstream acoustic-level failures.

## Method

The pipeline consists of three sequential stages: data curation, reference transcription, and regional model adaptation. Stage 1 applies lightweight SQL lexical filters to production transcripts to surface utterances rich in proper nouns, acronyms, and honorifics, achieving 70–78% entity density (~2.8× random sampling) and reducing annotation costs by ~65%. Stage 2 utilizes Gemini 2.5 Pro to generate reference transcripts directly from raw audio, avoiding annotator bias for region-specific cultural references and slang.

Stage 3 fine-tunes Qwen2.5-Omni-3B using parameter-efficient LoRA adapters (rank r=32, scaling factor alpha=32 applied to attention projection matrices) separately for each target region. Training runs for 2 epochs on 9k curated utterances per region using the AdamW-8bit optimizer, cosine learning rate scheduling (lr = 5×10⁻⁵, 10% warmup), weight decay of 0.01, and batch size 4 via the SFTTrainer framework with Unsloth memory-efficiency patches. The model is trained to output a structured JSON containing a verbatim transcript (retaining fillers like um, uh, ah, er, hm), a corrected transcript (fixing entity spelling and grammar), and a comprehensibility flag. Adapters are served at inference via vLLM with a P95 latency of ~800 ms.

## Experimental setup

Evaluated on held-out regional test sets of ~2k utterances per region (India, Indonesia, Latin America) drawn from production logs. Compared against five baselines: Parakeet TDT-CTC 110M, Whisper, un-fine-tuned Qwen2.5-Omni-3B, AssemblyAI Universal-3Pro, and zero-shot Qwen3-Omni-30B (MoE with 3B active parameters). Metrics include WER, CER, Entity Recall (exact string match), and Filler Recall. Statistical significance is validated via 10,000 paired bootstrap iterations.

## Results

On Indian English, the curated fine-tuned model (Qwen-ft-eh) achieves 5.95% WER, 79.52% entity recall, and 76.79% filler recall, outperforming Parakeet (13.01% WER, 53.59% entity recall) and beating Universal-3-Pro's entity recall (78.64%). In Indonesia, Qwen-ft-eh records 7.36% WER and 84.60% entity recall (vs Universal-3-Pro's 80.95% and Whisper's 79.16%). In Latin America, it reaches 10.00% WER and 81.87% entity recall.

Ablation tests isolating data curation demonstrate that entity-heuristic (EH) sampling outperforms random-sample (RS) training by +4.19 pp in India, +2.84 pp in Indonesia, and +2.76 pp in Latin America (p < 0.0001). While the 30B zero-shot model achieves higher filler recall (82.5–93.0% vs 76–86%), the proposed 3B fine-tuned model matches or exceeds its entity recall with 10× fewer parameters.

| System | WER (%) ↓ | CER (%) ↓ | Entity Recall (%) ↑ | Filler Recall (%) ↑ |
|---|---|---|---|---|
| Parakeet (India) | 13.01 | 7.11 | 53.59 | 0.37 |
| Universal-3-Pro (India) | 7.22 | 3.58 | 78.64 | 25.37 |
| Whisper (India) | 9.63 | 5.97 | 78.59 | 1.63 |
| Qwen3-Omni-30B (India) | 7.13 | 4.02 | 76.60 | 91.27 |
| Qwen-ft-rs (India) | 6.51 | 3.46 | 74.42 | 87.94 |
| Qwen-ft-eh (India) | 5.95 | 3.18 | 79.52 | 76.79 |

## Limitations

Reference transcripts used for evaluation are silver-standard generated by Gemini 2.5 Pro rather than fully human-verified, which may introduce minor bias despite high spot-check agreement. The approach currently exhibits a slight filler-recall gap compared to the much larger 30B model. Evaluation is restricted to English, leaving multilingual and code-switching scenarios unaddressed.

## Why read this

Speech and ML engineers building spoken dialogue or language-learning applications should read this paper to learn how targeted data curation and lightweight LoRA adapters can outperform commercial APIs and rival massive 30B models on entity recall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational language-learning platforms, automated fluency assessment tools, and speech-to-text pipelines requiring precise named entity recognition and disfluency tracking.

## Related

- (link related pages by id as the wiki grows)
