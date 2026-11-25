# RE-SETI: An AI Reanalysis of the SETI@home-Era Radio Archives

*Would today's methods find what earlier searches missed?*  
*Trust but verify.*

*RE-SETI proposal archive v1.3 · 24 November 2026 · Prepared by Phil Rail*

> **Stage: proposal in review.** An early-stage, independent proposal by Phil Rail, seeking reviewers and scientific or technical collaborators. It is not a request for a business co-founder, for funding, or for incorporation.
>
> **Not affiliated.** RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute. The name refers to re-examining earlier SETI data; RE-SETI is not a continuation of SETI@home.

## Cover letter

To prospective reviewers and collaborators,

From 1999 to 2020, millions of volunteers lent their home computers to UC Berkeley's SETI@home project, which searched radio data recorded at the Arecibo Observatory for signals from other civilizations. The volunteer computing side of the project went into hibernation on 31 March 2020 [1, 2], and the team has since published its final analysis [3, 4]. The original experiment was described in 2002 [5]. No confirmed technosignature was found. Breakthrough Listen, launched in 2015, has gone on to build one of the largest SETI data collections ever assembled and has made a large part of it publicly available [7, 8, 9].

Those searches were designed around the computers and algorithms of their day. The SETI@home team has said so plainly: in a January 2026 interview, project director Eric Korpela said that with funding he would "reanalyze it the right way", fixing choices that were made "because of how fast computers were in 1999" [6].

RE-SETI proposes exactly that kind of second look, using fresh compute, modern infrastructure, and machine-learning models doing the bulk of the inference work. The aims are:

1. **Revisit the old data.** Re-process archival radio SETI data that is publicly available, or that its custodians agree to share, with present-day methods.
2. **Test one specific claim, then the broader null.** First, measure whether an anomaly-detection stage can recover narrowband signals whose drift is not constant — a class earlier pipelines were not built to catch — with end-to-end injection tests and a pre-registered false-discovery-rate rule. Then, if that work holds, apply the same discipline to prioritized public archives.
3. **Leave something useful behind.** Whatever the outcome, publish the labelled data, injected test signals, benchmarks and trained models so that future radio-telescope surveys can be analyzed faster and more reliably.

This archive sets out the scientific case, the proposed method, a phased plan, an architecture sketch, and possible funding avenues. It is written for critical reading. The briefing note (document 07) is the shortest route in; the rest gives the detail behind it. A short note about me is in document 10.

I would value your honest assessment, especially where you think the idea is wrong.

Sincerely,  
Phil Rail  
Proposer, RE-SETI  

Project page: https://isowix.github.io/re-seti/  
Repository: https://github.com/Isowix/re-seti  
Feedback (public GitHub issues): https://github.com/Isowix/re-seti/issues  
Email: hello@axiom-mmf.ca

## Foreword: "trust but verify"

A search for technosignatures is a search for something that has never been seen. That makes false positives the main hazard. Radio interference from satellites, aircraft, phones and the observatory's own electronics produces signals that can look artificial, because they are. Any project in this field earns credibility only through the discipline of its checks.

This proposal adopts "trust but verify" as its working rule:

- **Trust** the automation to do the heavy lifting: sifting billions of detections and ranking what is left.
- **Verify** every step independently: hide synthetic signals of known strength in the real data *before* flagging and detection, so the test measures the whole pipeline; control false discoveries with a rule registered in advance; require that any candidate survive human review and, first, an archival cross-match at the same sky position. New observations on a second telescope are out of scope until a partner exists.

Negative results will be reported with the same care as positive ones. A well-measured "nothing found, down to this sensitivity" is a real scientific result, and it is the most likely outcome.

## References

1. SETI@home, "SETI@home hibernation", project news, 2 March 2020. https://setiathome.berkeley.edu/old_news.php
2. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020. https://www.seti.org/news/seti-at-home-going-into-hibernation/
3. Anderson, D. P., et al., "SETI@home: Data Analysis and Findings", *The Astronomical Journal* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab
4. Korpela, E. J., et al., "SETI@home: Data Acquisition and Front-End Processing", *The Astronomical Journal* 170, 112 (2025). https://doi.org/10.3847/1538-3881/ade5a7
5. Anderson, D. P., Cobb, J., Korpela, E., Lebofsky, M., and Werthimer, D., "SETI@home: an experiment in public-resource computing", *Communications of the ACM* 45(11), 56–61 (2002). https://doi.org/10.1145/581571.581573
6. Sanders, R., "For 21 years, enthusiasts used their home computers to search for ET…", *Berkeley News*, 12 January 2026. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/
7. Breakthrough Initiatives, announcement of Breakthrough Listen, 20 July 2015. https://breakthroughinitiatives.org/news/1
8. Lebofsky, M., et al., "The Breakthrough Listen Search for Intelligent Life: Public Data, Formats, Reduction, and Archiving", *PASP* 131, 124505 (2019). https://doi.org/10.1088/1538-3873/ab3e82
9. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint). https://arxiv.org/abs/2610.07482

See 09_References.md for the full source list.
