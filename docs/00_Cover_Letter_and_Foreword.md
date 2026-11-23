# RE-SETI: An AI Reanalysis of the SETI@home-Era Radio Archives

*RE-SETI proposal archive v1.2 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** This is an early-stage, independent proposal. No organization has been formed, no funding has been raised, and no computing infrastructure has been built. It is being circulated to find reviewers and collaborators.
>
> **Not affiliated.** RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute. The name refers to re-examining earlier SETI data; RE-SETI is not a continuation of SETI@home.

## Cover letter

To prospective reviewers, collaborators and supporters,

From 1999 to 2020, millions of volunteers lent their home computers to UC Berkeley's SETI@home project, which searched radio data recorded at the Arecibo Observatory for signals from other civilizations. The volunteer computing side of the project went into hibernation on 31 March 2020, and the team has since published its final analysis [1, 2, 3]. No confirmed technosignature was found. Breakthrough Listen, launched in 2015, has gone on to build one of the largest SETI data collections ever assembled and has made a large part of it publicly available [4, 5, 6].

Those searches were designed around the computers and algorithms of their day. The SETI@home team has said so plainly: in a January 2026 interview, project director Eric Korpela said that with funding he would "reanalyze it the right way", fixing choices that were made "because of how fast computers were in 1999" [3].

RE-SETI proposes exactly that kind of second look, using fresh compute, modern infrastructure, and machine-learning models doing the bulk of the inference work. The aims are:

1. **Revisit the old data.** Re-process archival radio SETI data that is publicly available, or that its custodians agree to share, with present-day methods.
2. **Test the null result.** Check, with documented and measurable sensitivity, whether the "no technosignature found" result still holds when modern anomaly-detection methods are applied.
3. **Leave something useful behind.** Whatever the outcome, publish the labelled data, injected test signals, benchmarks and trained models so that future radio-telescope surveys can be analyzed faster and more reliably.

This archive sets out the scientific case, the proposed method, a phased plan, an architecture sketch, and possible funding avenues. It is written for critical reading. The briefing note (document 07) is the shortest route in; the rest gives the detail behind it.

I would value your honest assessment, especially where you think the idea is wrong.

Sincerely,  
Phil Rail  
Proposer, RE-SETI  

Project page: https://isowix.github.io/re-seti/  
Repository: https://github.com/Isowix/re-seti  
Feedback (public GitHub issues): https://github.com/Isowix/re-seti/issues

## Foreword: "trust but verify"

A search for technosignatures is a search for something that has never been seen. That makes false positives the main hazard. Radio interference from satellites, aircraft, phones and the observatory's own electronics produces signals that can look artificial, because they are. Any project in this field earns credibility only through the discipline of its checks.

This proposal adopts "trust but verify" as its working rule:

- **Trust** the automation to do the heavy lifting: sifting billions of detections and ranking what is left.
- **Verify** every step independently: hide synthetic signals of known strength in the real data to measure what the pipeline can and cannot find; require that any candidate survive human review; and, where possible, seek re-observation with a different telescope before calling it interesting.

Negative results will be reported with the same care as positive ones. A well-measured "nothing found, down to this sensitivity" is a real scientific result, and it is the most likely outcome.

## References

1. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting UC Berkeley's announcement of 2 March 2020). https://www.seti.org/news/seti-at-home-going-into-hibernation/
2. Anderson, D. P., et al., "SETI@home: Data Analysis and Findings", *The Astronomical Journal* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab
3. Sanders, R., "For 21 years, enthusiasts used their home computers to search for ET…", *Berkeley News*, 12 January 2026. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/
4. Breakthrough Initiatives, announcement of Breakthrough Listen, 20 July 2015. https://breakthroughinitiatives.org/news/1
5. Lebofsky, M., et al., "The Breakthrough Listen Search for Intelligent Life: Public Data, Formats, Reduction, and Archiving", *PASP* 131, 124505 (2019). https://doi.org/10.1088/1538-3873/ab3e82
6. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint). https://arxiv.org/abs/2610.07482

See 09_References.md for the full source list.
