# RE-SETI: Formal Proposal

*RE-SETI proposal archive v1.2.1 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** Early-stage, independent proposal. No organization formed, no funding raised, no infrastructure built. Seeking reviewers and collaborators.
>
> **Not affiliated.** Not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute.

## 1. Executive summary

RE-SETI proposes a systematic, documented reanalysis of archival radio SETI data with modern machine-learning methods. It is a reanalysis effort, not a new observing campaign. The first step is a single-GPU pilot on a public Breakthrough Listen subset; whether a volunteer computing network is used at all depends on what that pilot measures.

The project would:

- **revisit** archival data from Breakthrough Listen's public archive and, if its custodians agree, the SETI@home Arecibo data;
- **test the null result**, checking whether the absence of confirmed technosignatures still holds under present-day anomaly detection, with sensitivity measured by injecting synthetic signals; and
- **publish reusable outputs**: labelled interference catalogues, injected-signal test sets, benchmarks and trained models that future radio-telescope surveys can use.

Computing is the cheap part of this work. Moving the data is the expensive part, so the design processes data in tiers, as close to the archive as possible, and sends only reduced or prioritized subsets onward (section 4.6 and document 05).

The most likely scientific outcome is a stronger, better-measured null result. That is still worth having. The proposal makes no claim that this work will detect extraterrestrial intelligence.

## 2. Background

### 2.1 SETI@home

SETI@home ran from 1999 to 2020, distributing radio data recorded commensally at the Arecibo Observatory to volunteers' home computers through what became the BOINC volunteer-computing platform [1, 3]. Volunteer computing stopped on 31 March 2020 so the team could finish the back-end analysis [1]. The final results were published in two papers in *The Astronomical Journal* in 2025 [2, 4]. According to UC Berkeley, the volunteer computers produced about 12 billion detections; the back-end analysis reduced these to roughly a million candidates and then to about 100 targets for re-observation with China's FAST telescope, which began in 2025 [3]. No confirmed signal has been reported.

The SETI@home team has been candid about the limits of its own design. It measured its sensitivity by inserting about 3,000 blinded synthetic signals ("birdies") into the pipeline, and its members have said a reanalysis that fixed early design choices would be worthwhile [3].

### 2.2 Breakthrough Listen

Breakthrough Listen was announced in July 2015 as a 10-year, US$100 million program funded by the Breakthrough Prize Foundation, with a commitment to make its data public [5]. Its first public data release in 2019 contained almost 1 PB of raw and reduced data [6]; the second release in 2020 roughly doubled what was available [7]. A 2026 review reports that Breakthrough Listen's storage systems held about 31 PB of data (of about 42 PB capacity) across seven systems as of March 2026 [8]. Only part of that is in the public archive; the publicly downloadable volume today is something reviewers and data holders will need to confirm.

### 2.3 Machine learning in SETI so far

Machine learning is already being applied to this data, and this proposal builds on that work rather than claiming to be first. A notable example is Ma et al. (2023), who applied a β-convolutional variational autoencoder to 480 hours of Green Bank Telescope observations of 820 stars, cut false positives by about two orders of magnitude compared with earlier analyses of the same data, and identified eight signals of interest that were not re-detected on follow-up [9]. Since then, Breakthrough Listen teams have run unsupervised anomaly-detection and interference-classification searches over Green Bank archive data [13, 14], use the open `setigen` framework for injection-and-recovery testing [15], and report real-time deep-learning pipelines in newer instruments [8]. One of these searches introduced GLOBULAR clustering (Jacobson-Bell et al. 2025), which applies HDBSCAN to turboSETI hits before event filtering. On a 97-galaxy L-band dataset it cut false-positive hits by 93.1% and false-positive events from 288 to 2, while recovering 69 of 100 injected events, against 86 for turboSETI alone [14, 17].

### 2.4 What RE-SETI would add

Given that work, RE-SETI has to say concretely what it adds. It does not propose a new detection method. It proposes these additions, each of which reviewers are asked to test:

1. **Independent re-verification of earlier candidates.** Re-examine the eight Ma et al. (2023) signals of interest and the top candidates of later anomaly searches [13, 14], with a different pipeline and team, using the public data, and publish the outcome for each.
2. **Completeness measured across the whole reanalyzed set.** Injection-and-recovery tests exist in the field, but RE-SETI would report recovery rates for every data subset it processes, broken down by signal strength, drift rate and interference environment, so every "nothing found" comes with numbers.
3. **Side-by-side methods on identical data.** Run the conventional turboSETI search, a Ma-style β-VAE, and GLOBULAR clustering (HDBSCAN on turboSETI hits [14]) on the same inputs, and publish where they agree and disagree.
4. **Broader coverage, where data allows.** Extend beyond the 820-star Green Bank set to other public Breakthrough Listen subsets (for example the Parkes observations in Data Release 2 [7]) as access and transfer budgets permit.
5. **An open, reproducible package.** A containerized pipeline, pinned model weights and processing logs that an outside group can rerun to reproduce any published number.
6. **A labelled benchmark for future telescopes.** Interference labels, injected-signal sets and scored results released as training and test material for the next generation of surveys.

If reviewers find that these have already been done, the proposal should shrink to whatever is left.

## 3. Objectives

1. **Archive reanalysis.** Process prioritized, reduced subsets of the accessible public Breakthrough Listen archive, chosen by scientific value, data quality and transfer cost, and, subject to agreement with its custodians, the SETI@home Arecibo data.
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
- **Density-based clustering.** Apply GLOBULAR clustering, the published method that runs HDBSCAN on turboSETI hits before event filtering [14, 17], and test the same density-clustering idea on the learned representations [11]. Most interference forms dense, recurring clusters; isolated points and small unusual clusters are flagged for scrutiny.
- **Anomaly scoring.** Combine reconstruction error, cluster isolation and the "on-target, off-target" observing pattern (a real sky signal should appear only when the telescope points at the target) into a single ranked score.
- **Model comparison.** Run more than one model family, so that a candidate found by only one method is treated with extra caution.

The detection models are compact and run on a single consumer GPU. Large language models, and layer-by-layer loading tools such as AirLLM, are not part of the detection pipeline or the volunteer client. A language model may help with low-volume secondary tasks, such as drafting candidate summaries for reviewers, always with human sign-off (see document 05).

### 4.4 Validation ("trust but verify")

1. **Injected signals.** Synthetic signals of known strength and drift are added to real data, blind to the people reviewing results. Recovery rates measure completeness.
2. **Baseline cross-check.** Results are compared against the conventional search in 4.2.
3. **Cross-checked computation.** If volunteers are used, each work unit goes to at least two machines on different hardware, results are compared within numeric tolerances, planted "canary" signals catch faulty or dishonest clients, and a sample is re-run on trusted hardware (document 05, section 6).
4. **Human review.** Every high-ranking candidate is examined by at least two people before it is treated as interesting.
5. **Independent confirmation.** Candidates that survive review are passed to telescope teams with a request for re-observation, preferably with a different instrument. No claim is made without independent confirmation.

### 4.5 Computing: pilot first, volunteers only if the numbers justify it

The project starts with one consumer GPU. The Phase 0 pilot (document 02) reproduces a published Breakthrough Listen result on a public data subset and measures throughput per gigabyte and per hour, data volume per target, and cost. Only if those numbers show that volunteer computing would help, and that the data can be delivered to volunteers affordably, does a volunteer network follow.

If it does, work units would be distributed through BOINC, which supports container-based ("Docker") applications on Linux, macOS and Windows (via WSL) [12]. Containers keep the software identical on every machine. They do not make GPU arithmetic identical: different cards can return slightly different numbers, so results are compared within tolerances rather than bit for bit (document 05, section 6). A cloud-hosted coordination service (the "Master Node") schedules work, checks returned results and keeps the candidate database.

### 4.6 Data transfer budget

Data movement, not computation, is expected to be the dominant cost. Breakthrough Listen reports about 31 PB of data in use across its storage systems [8]. At a sustained 10 Gb/s, moving 31 PB would take about 287 days; at 1 Gb/s, about 7.9 years. If that volume left a commercial cloud at Amazon Web Services' published internet rates (US$0.05–0.09 per GB), the egress bill would be roughly US$1.5–2.8 million, doubling if every work unit is sent to two volunteers [16]. A full rerun of everything is therefore not the plan.

The plan instead is tiered: select targets using existing metadata and hit lists; reduce and filter data at or near the archive with cheap first-pass processing; and send only reduced, prioritized snippets to GPUs for the machine-learning stage. For scale, the reduced filterbank products of two major Breakthrough Listen surveys were 180 TB and 142 TB [8]. Moving 142 TB takes about 13 days at 1 Gb/s and would cost roughly US$10,700 at the same list egress rates, if egress fees apply at all. Where the data is actually hosted, and on what terms, is an open question for the data holders. The full arithmetic and assumptions are in document 05, section 5.

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
| Data transfer volume and cost (expected to be the dominant cost) | Tiered processing near the archive; send only reduced, prioritized subsets; transfer budget set from pilot measurements before any volunteer network (section 4.6) |
| Overclaiming or public misunderstanding | Fixed communication rules: no claims without independent confirmation; negative results published |
| Volunteer network not worth its transfer cost, or too few volunteers | Volunteer network is conditional on Phase 0 pilot numbers; the design runs on one or a few GPUs at small scale |
| GPU results differ between volunteer cards, or clients return bad results | Tolerance-based comparison of replicated work, canary signals, reference re-runs on trusted hardware (document 05, section 6) |
| Personnel: a project run by one person is fragile | No operational steps until at least one more committed person joins (see document 07) |
| Confusion with the original SETI@home | Distinct project name (RE-SETI) and a non-affiliation statement on all materials |

## 7. Governance and status

The proposal is at the review stage. The next steps run in parallel: independent review by at least four people with relevant expertise, recruitment of at least one more committed collaborator, and the low-cost single-GPU pilot on public data (Phase 0, document 02). Formal structure, funding applications and data-access requests would follow only after that.

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
13. Pardo, S., et al., "Using Anomaly Detection to Search for Technosignatures in Breakthrough Listen Observations", *The Astronomical Journal* 170, 12 (2025). https://doi.org/10.3847/1538-3881/add52b · arXiv:2505.03927
14. Jacobson-Bell, B., et al., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). Introduces GLOBULAR clustering. https://doi.org/10.3847/1538-3881/adb8e7 · arXiv:2411.16556
15. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
16. Amazon Web Services, EC2 On-Demand pricing, "Data Transfer" (internet egress tiers US$0.09/GB for the first 10 TB a month, down to US$0.05/GB above 150 TB a month, US and EU regions; checked November 2026). https://aws.amazon.com/ec2/pricing/on-demand/
17. GLOBULAR clustering code (Jacobson-Bell). https://github.com/bjacobell/gbt-hdbscan
