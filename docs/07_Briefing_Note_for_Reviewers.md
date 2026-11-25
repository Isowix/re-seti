# RE-SETI: Briefing Note for Reviewers

*Would today's methods find what earlier searches missed?*  
*Trust but verify.*

*Reviewer briefing v1.3 · 24 November 2026 · Prepared by Phil Rail*

> **Stage: proposal in review.** An early-stage, independent proposal by Phil Rail, seeking reviewers and scientific or technical collaborators. Not a request for a business co-founder, for funding, or for incorporation.

RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute.

## Purpose of this note

This is a short, plain-language summary of a proposed project to reanalyze existing radio SETI data with modern AI techniques. It is intended for human reviewers who will perform a sanity check before any significant commitment of time, money or public attention. It is not a funding request and not an operational plan.

## Core idea

SETI@home (1999–2020; volunteer computing paused in March 2020) and related surveys such as Breakthrough Listen collected large volumes of radio data over many years and found no confirmed technosignatures [1, 2, 3]. Modern machine-learning methods have become substantially more capable at finding weak or unusual patterns in large datasets. The proposal is to reprocess publicly available or previously analyzed SETI radio archives with these newer tools, under a strict "trust but verify" protocol.

The project is a reanalysis, not a new observational campaign. It aims to answer: "Given what we already recorded, would today's pattern-recognition methods surface candidates that earlier methods missed?" The first, falsifiable version of that question is narrower: can an anomaly-detection stage recover narrowband signals whose frequency drift is not constant — a class turboSETI's constant-drift-rate search is not designed to catch, and that Ma et al. (2023) explicitly set aside [4]? Published injection tests have mostly used linear drift, so the evidence for this claim is thin. That is why it is the Phase 0/1 pilot test, with go/kill criteria, and not a premise.

Either way, the work would leave behind labelled data, injected-signal test sets and benchmarks that future radio-telescope surveys can use for training and testing.

## Technical approach (high level)

- Focus on existing archives, including Breakthrough Listen's public archive and the original SETI@home corpus where its custodians agree to share it.
- Apply modern unsupervised and semi-supervised techniques: cadence-aware variational autoencoders, GLOBULAR clustering (HDBSCAN on turboSETI hits [5]), and a conventional Doppler-drift search as a baseline.
- **Wrap injection-recovery around the whole pipeline.** Plant synthetic signals, including the non-linear-drift test class, in the data *before* RFI flagging, detection and ranking, and measure what survives.
- Handle training-set RFI the way Ma et al. (2023) did: "normal" means the empirical archive, including ordinary interference; training is cadence-aware (ON versus OFF); known dirty bands are held out [4].
- **Control false discoveries.** Register score thresholds and a false-discovery-rate rule (for example Benjamini–Hochberg) before any large run, using empty and shuffled-cadence controls [6].
- Start with a single-GPU pilot that reproduces the published turboSETI event toward HIP 100064 in Price et al. (2020) [7], then tests the non-linear-drift claim on that public cadence. Throughput, data volume and cost are measured. A volunteer network is used only if those numbers justify it.
- Use compact detection models that fit on any consumer GPU. Large language models are not part of the detection pipeline or any volunteer client.
- **Confirmation:** archival cross-matches (the same sky position in other datasets or epochs) come first. New observations on a second telescope are out of scope until a partner exists.
- If volunteers are used, cross-check results across different hardware (document 05).

No claim is made that this will discover extraterrestrial intelligence. Machine-learning searches have already been applied to parts of these archives, including Ma et al. (2023) [4] and later Breakthrough Listen anomaly work [5, 8]. Ma et al.'s eight signals of interest were not re-detected in follow-up observations on 21 May 2022, were reported as not persistent, and were not claimed as detections [4]; a later commentary by Ma called unusual interference the most likely explanation [9]. RE-SETI does not treat them as open candidates. A re-reduction of the public data can still be a methods check.

What RE-SETI would add, in short: the end-to-end injection test and the non-linear-drift claim; pre-registered FDR control; conventional, β-VAE and GLOBULAR methods compared on identical data; an open, rerunnable pipeline; and a labelled benchmark. Reviewers are asked to test whether that addition is real.

## "Trust but verify" stance

Every stage of the pipeline is designed to be reproducible and auditable. Candidate signals must survive automated filters, a registered FDR rule, archival cross-match where the data allow, and human review. Negative results, including a negative methods result on the pilot claim, are considered valuable and will be reported.

## What this is not

- Not a request for funding, incorporation, or a business co-founder.
- Not an assertion that earlier SETI work was flawed.
- Not a plan to operate telescopes or collect new data in the near term.
- Not dependent on any single AI model or vendor.
- Not affiliated with or endorsed by the original SETI@home project or any SETI organization.

## Open questions for reviewers

1. Is the scientific premise sound — and is the non-linear-drift claim the right first test?
2. Are end-to-end injections, pre-registered FDR control, archival cross-matches and human review sufficient to keep the effort credible, given that new telescope time is out of scope for now?
3. What are the most important technical, statistical or sociological risks that the current outline underweights?
4. Which parts of the existing public archives are realistically accessible and worth prioritizing?
5. Does the overall framing avoid overclaiming while still being clear enough to attract competent collaborators?

## Related materials

- Project page: https://isowix.github.io/re-seti/
- Briefing note (this document): also as PDF in the archive, and at https://github.com/Isowix/re-seti/releases/download/v1.3/07_Briefing_Note_for_Reviewers.pdf
- Full proposal archive (secondary to this briefing): https://github.com/Isowix/re-seti/releases/download/v1.3/RE-SETI_Proposal_Archive_v1.3.zip
- Repository: https://github.com/Isowix/re-seti
- Comments: https://github.com/Isowix/re-seti/issues (public). Enabling GitHub Discussions is proposed, not yet done. Private comments: hello@axiom-mmf.ca

## References

1. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting UC Berkeley's announcement of 2 March 2020). https://www.seti.org/news/seti-at-home-going-into-hibernation/
2. Anderson, D. P., Cobb, J., Korpela, E., Lebofsky, M., and Werthimer, D., "SETI@home: an experiment in public-resource computing", *Communications of the ACM* 45(11), 56–61 (2002). https://doi.org/10.1145/581571.581573
3. Anderson, D. P., et al., "SETI@home: Data Analysis and Findings", *AJ* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab
4. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z
5. Jacobson-Bell, B., et al., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). https://doi.org/10.3847/1538-3881/adb8e7
6. Benjamini, Y., and Hochberg, Y., "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", *JRSS-B* 57(1), 289–300 (1995). https://doi.org/10.1111/j.2517-6161.1995.tb02031.x
7. Price, D. C., et al., "The Breakthrough Listen Search for Intelligent Life: Observations of 1327 Nearby Stars Over 1.10–3.45 GHz", *AJ* 159, 86 (2020). https://doi.org/10.3847/1538-3881/ab65f1
8. Pardo, S., et al., "Using Anomaly Detection to Search for Technosignatures in Breakthrough Listen Observations", *The Astronomical Journal* 170, 12 (2025). https://doi.org/10.3847/1538-3881/add52b
9. Ma, P., "AI is helping us search for intelligent alien life – and we've found 8 strange new signals", *The Conversation*, 30 January 2023. https://theconversation.com/ai-is-helping-us-search-for-intelligent-alien-life-and-weve-found-8-strange-new-signals-198754
