# RE-SETI: Formal Proposal

*RE-SETI proposal archive v1.1 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** Early-stage, independent proposal. No organization formed, no funding raised, no infrastructure built. Seeking reviewers and collaborators.
>
> **Not affiliated.** Not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute.

## 1. Executive summary

RE-SETI proposes a systematic, documented reanalysis of archival radio SETI data with modern machine-learning methods, run on a mix of cloud computing and volunteer computers. It is a reanalysis effort, not a new observing campaign.

The project would:

- **revisit** archival data from Breakthrough Listen's public archive and, if its custodians agree, the SETI@home Arecibo data;
- **test the null result**, checking whether the absence of confirmed technosignatures still holds under present-day anomaly detection, with sensitivity measured by injecting synthetic signals; and
- **publish reusable outputs**: labelled interference catalogues, injected-signal test sets, benchmarks and trained models that future radio-telescope surveys can use.

The most likely scientific outcome is a stronger, better-measured null result. That is still worth having. The proposal makes no claim that this work will detect extraterrestrial intelligence.

## 2. Background

### 2.1 SETI@home

SETI@home ran from 1999 to 2020, distributing radio data recorded commensally at the Arecibo Observatory to volunteers' home computers through what became the BOINC volunteer-computing platform [1, 3]. Volunteer computing stopped on 31 March 2020 so the team could finish the back-end analysis [1]. The final results were published in two papers in *The Astronomical Journal* in 2025 [2, 4]. According to UC Berkeley, the volunteer computers produced about 12 billion detections; the back-end analysis reduced these to roughly a million candidates and then to about 100 targets for re-observation with China's FAST telescope, which began in 2025 [3]. No confirmed signal has been reported.

The SETI@home team has been candid about the limits of its own design. It measured its sensitivity by inserting about 3,000 blinded synthetic signals ("birdies") into the pipeline, and its members have said a reanalysis that fixed early design choices would be worthwhile [3].

### 2.2 Breakthrough Listen

Breakthrough Listen was announced in July 2015 as a 10-year, US$100 million program funded by the Breakthrough Prize Foundation, with a commitment to make its data public [5]. Its first public data release in 2019 contained almost 1 PB of raw and reduced data [6]; the second release in 2020 roughly doubled what was available [7]. A 2026 review reports that Breakthrough Listen's storage systems held about 31 PB of data (of about 42 PB capacity) across seven systems as of March 2026 [8]. Only part of that is in the public archive; the publicly downloadable volume today is something reviewers and data holders will need to confirm.

### 2.3 Machine learning in SETI so far

Machine learning is already being applied to this data, and this proposal builds on that work rather than claiming to be first. A notable example is Ma et al. (2023), who applied a β-convolutional variational autoencoder to 480 hours of Green Bank Telescope observations of 820 stars, cut false positives by about two orders of magnitude compared with earlier analyses of the same data, and identified eight signals of interest that were not re-detected on follow-up [9]. Breakthrough Listen also reports real-time deep-learning pipelines in its newer instruments [8].

What has not been done, as far as this proposal's author can find, is a single, archive-wide reanalysis across surveys that uses consistent methods, publishes its measured completeness, and releases its training and test material as a community benchmark. Reviewers are asked to check that claim.

## 3. Objectives

1. **Archive reanalysis.** Process the accessible public Breakthrough Listen archive, prioritized by scientific value and data quality, and, subject to agreement with its custodians, the SETI@home Arecibo data.
2. **Measured sensitivity.** Inject synthetic signals across the pipeline and publish recovery rates as a function of signal strength, drift rate and interference environment, so the null result has numbers attached.
3. **Ranked, reviewed candidates.** Produce a ranked candidate list in which every high-ranking item has been reviewed by a person and, where warranted, proposed for re-observation by a telescope team.
4. **Reusable benchmarks.** Release labelled interference catalogues, injected-signal datasets, trained models and evaluation code under open licences, as training and test material for future surveys.
5. **Sustainable operation.** Show that a small team, supported by automation, can run a project of this kind without the staffing that limited earlier efforts.

## 4. Methodology

### 4.1 Data ingestion and preprocessing

- Download data in the standard formats used by Breakthrough Listen (filterbank and HDF5 spectrograms, with selected raw-voltage data), using the open tools the community already maintains, such as `blimpy` [10].
- Record provenance for every file: source, checksum, observation metadata and processing version.
- Flag known interference bands and bad data, and normalize spectra so that observations from different telescopes and receivers can be compared.

### 4.2 Baseline search

Re-run a conventional Doppler-drift search with established tools such as `turboSETI` [10] on every dataset processed. This gives a like-for-like baseline, so any difference in results can be attributed to the new methods rather than to changes in data handling.

### 4.3 Machine-learning analysis

- **Representation learning.** Train variational autoencoders and related models on spectrogram snippets to learn what ordinary data, including ordinary interference, looks like.
- **Density-based clustering.** Group the learned representations with HDBSCAN or DBSCAN-style density clustering [11]. Most interference forms dense, recurring clusters; isolated points and small unusual clusters are flagged for scrutiny.
- **Anomaly scoring.** Combine reconstruction error, cluster isolation and the "on-target, off-target" observing pattern (a real sky signal should appear only when the telescope points at the target) into a single ranked score.
- **Model comparison.** Run more than one model family, so that a candidate found by only one method is treated with extra caution.

The detection models are compact and run efficiently on a single consumer GPU. Large language models are not part of the detection pipeline. They may help with secondary tasks such as drafting candidate summaries for reviewers, triaging logs and writing documentation, always with human sign-off (see document 05).

### 4.4 Validation ("trust but verify")

1. **Injected signals.** Synthetic signals of known strength and drift are added to real data, blind to the people reviewing results. Recovery rates measure completeness.
2. **Baseline cross-check.** Results are compared against the conventional search in 4.2.
3. **Redundant computation.** Volunteer results are checked by sending the same work to more than one computer, as BOINC projects routinely do.
4. **Human review.** Every high-ranking candidate is examined by at least two people before it is treated as interesting.
5. **Independent confirmation.** Candidates that survive review are passed to telescope teams with a request for re-observation, preferably with a different instrument. No claim is made without independent confirmation.

### 4.5 Distributed computing

Work units are distributed through BOINC, which now supports container-based ("Docker") applications on Linux, macOS and Windows (via WSL) [12]. Containers make the volunteer software reproducible: the same image produces the same result on every machine. A cloud-hosted coordination service (the "Master Node") schedules work, checks returned results and keeps the candidate database (document 05).

## 5. Expected outputs

- A reanalysis report for each data subset, including measured sensitivity, whatever the result.
- A public, versioned candidate database with full provenance.
- Labelled interference and injected-signal datasets, trained models and benchmark code under open licences.
- Peer-reviewed publications in collaboration with domain scientists.

## 6. Risks and limitations

| Risk | Mitigation |
|---|---|
| Interference overwhelms the candidate list | Density clustering, on/off cadence checks, frequency-band flagging; publish false-positive rates |
| SETI@home raw data is not accessible (Arecibo collapsed in 2020; the data are held by UC Berkeley) | Start with the public Breakthrough Listen archive; approach custodians only with a reviewed plan |
| Data transfer volume and cost | Prioritize high-value subsets; process data near where it is stored where possible |
| Overclaiming or public misunderstanding | Fixed communication rules: no claims without independent confirmation; negative results published |
| Too few volunteers, or volunteer interest fades | Design to run on cloud capacity alone at small scale; treat volunteers as an accelerator, not a dependency |
| Personnel: a project run by one person is fragile | No operational steps until at least one more committed person joins (see document 07) |
| Name confusion with the original SETI@home | Clear non-affiliation statement on all materials; name to be reviewed (see CHANGES.md open questions) |

## 7. Governance and status

The proposal is at the review stage. The next step is independent review by at least four people with relevant expertise, and the recruitment of at least one more committed collaborator. Formal structure, funding applications and data-access requests would follow only after that.

Contact and feedback: https://github.com/Isowix/re-seti/issues

## References

1. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting UC Berkeley's announcement of 2 March 2020). https://www.seti.org/news/seti-at-home-going-into-hibernation/
2. Anderson, D. P., et al., "SETI@home: Data Analysis and Findings", *AJ* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab (arXiv:2506.14737)
3. Sanders, R., *Berkeley News*, 12 January 2026. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/
4. Korpela, E. J., et al., "SETI@home: Data Acquisition and Front-End Processing", *AJ* 170, 112 (2025). https://doi.org/10.3847/1538-3881/ade5a7 (arXiv:2506.14718)
5. Breakthrough Initiatives, announcement of Breakthrough Listen, 20 July 2015. https://breakthroughinitiatives.org/news/1
6. Lebofsky, M., et al., *PASP* 131, 124505 (2019). https://doi.org/10.1088/1538-3873/ab3e82
7. Berkeley SETI Research Center, "Breakthrough Listen: Data Release 2", February 2020. https://seti.berkeley.edu/bldr2/
8. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint). https://arxiv.org/abs/2610.07482
9. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z
10. Breakthrough Listen open-source tools: blimpy https://github.com/UCBerkeleySETI/blimpy and turboSETI https://github.com/UCBerkeleySETI/turbo_seti
11. HDBSCAN documentation. https://hdbscan.readthedocs.io/
12. BOINC, "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
