---
id: martin26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-777
---

# Acoustic Biomarkers of Sleep Deprivation on French Read Speech: Interpretable and Frugal Modeling of Sleep Deprivation and Its Symptoms

**TL;DR** — Simple, interpretable acoustic features and classic classifiers can estimate sleep deprivation and its symptoms from French read speech, with SHAP analysis pointing to which features matter and an explicit accounting of the models' energy footprint.

## Problem

Sleep deprivation is a major public health issue, and the paper aims to estimate it and its symptoms (sleepiness, fatigue, performance loss) from speech while prioritizing interpretability and computational frugality over black-box accuracy.

## Method

Using the SOMVOICE corpus, the authors apply simple, validated acoustic features (eGeMAPS and Snack) with SVM, Random Forest, and Gradient Boost classifiers, evaluate sex- and age-related bias, report energy consumption and carbon footprint, and use SHAP values to interpret feature importance and a symptom network for cross-task evaluation.

## Results

The interpretable, frugal pipeline can estimate sleep deprivation and related symptoms from speech, with SHAP analysis revealing which acoustic features drive classification and cross-task evaluation probing whether classifiers learn general versus task-specific constructs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-cost, explainable, and environmentally frugal voice-based screening tools for sleep deprivation and fatigue in occupational health or clinical settings.

## Related

- (link related pages by id as the wiki grows)
