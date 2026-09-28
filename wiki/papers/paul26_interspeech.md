---
id: paul26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2760
---

# PROGRESS: Coverage-guided RL to Train Search-augmented LLM Agent

**TL;DR** — An RL training method for search-augmented LLM agents that adds a teacher-guided "coverage reward" to explicitly shape how the agent decomposes complex queries, not just whether the final answer is right.

## Problem

Search-augmented LLM agents trained with RL mostly use outcome-level rewards, which give little supervision over search behavior and overlook whether the agent decomposes complex queries properly.

## Method

PROGRESS uses frozen teacher models to decompose complex queries into essential search queries during training, then applies a coverage reward to guide the policy model's own query decomposition and search behavior, integrated into an R1-style training framework as lightweight guidance rather than dense process-level supervision.

## Results

Experiments show coverage-guided RL improves overall task performance, highlighting the value of explicitly supervising search strategy rather than only outcomes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training more reliable search-augmented conversational and voice assistant agents that need to break down complex spoken queries.

## Related

- (link related pages by id as the wiki grows)
