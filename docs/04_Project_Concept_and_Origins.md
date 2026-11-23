# Project Concept and Origins

*RE-SETI proposal archive v1.1 · 23 November 2026 · Prepared by Phil Rail*

## Where the idea came from

RE-SETI began as a conversation about why the older radio SETI data has not been fully reanalyzed with modern methods. Two barriers came up again and again: **funding** and **personnel**. The SETI@home team has said the same. In a January 2026 interview, project director Eric Korpela noted that the biggest issue with a new crowd-sourced SETI project "is that it requires personnel, and personnel means salaries", and that, with funding, he would reanalyze the SETI@home data "the right way" [1].

The question behind this proposal is whether today's tools change that equation.

## The core idea

- **Revisit the old data.** Large archives of radio SETI data already exist. Reprocessing them costs far less than observing again.
- **Test the null result with modern methods.** Earlier searches found no confirmed technosignature. Present-day machine learning can check that conclusion in ways that were not possible in 1999, and with measured sensitivity.
- **Build training material for the future.** Labelled interference, injected test signals and benchmark results from this work can help train and test the analysis systems for the next generation of radio telescopes.
- **Fresh compute and modern infrastructure.** Consumer GPUs, rented cloud capacity and container-based volunteer computing (BOINC) are cheaper and far more capable than in SETI@home's early years.
- **AI does the inference work.** Machine-learning models do the bulk of the signal analysis, and AI agents and workflow automation handle routine coordination such as scheduling work, checking results, monitoring systems and drafting reports, so that a small team can run the project. People make the decisions that matter: what counts as a candidate, what gets published, and what gets referred to a telescope team.

## How it addresses the barriers

| Barrier | Proposed approach |
|---|---|
| Personnel | Automation and AI agents for routine operations; people kept for review and decisions |
| Compute cost | Volunteer computers through BOINC, plus modest rented cloud capacity |
| Data cost | Start with public archives; prioritize high-value subsets |
| Credibility | Injected-signal testing, human review, independent confirmation, published null results |
| Vendor lock-in | Open-source tools; no dependence on any single AI model or provider |

## What it is not

It is not a claim that earlier work was flawed, not a plan to operate telescopes, and not a funding request at this stage. See the briefing note (document 07) for the full list.

## References

1. Sanders, R., *Berkeley News*, 12 January 2026. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/
