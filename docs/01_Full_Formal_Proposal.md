# RE-SETI: Formal Proposal

*Would today's methods find what earlier searches missed?*  
*Trust but verify.*

*RE-SETI proposal archive v1.3 · 24 November 2026 · Prepared by Phil Rail*

> **Stage: proposal in review.** This is an early-stage, independent proposal by Phil Rail. No organization has been formed, no funding has been raised, and no infrastructure has been built. It is being circulated to find reviewers and scientific or technical collaborators. It is not a request for a business co-founder, for funding, or for incorporation.
>
> **Not affiliated.** RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute. The name refers to re-examining earlier SETI data; RE-SETI is not a continuation of SETI@home.

## 1. Executive summary

RE-SETI proposes a systematic, documented reanalysis of archival radio SETI data with modern machine-learning methods. It is a reanalysis effort, not a new observing campaign. The first step is a single-GPU pilot on a public Breakthrough Listen cadence; whether a volunteer computing network is used at all depends on what that pilot measures.

The project would:

- **revisit** prioritized, reduced subsets of the public Breakthrough Listen archive and, if its custodians agree, the SETI@home Arecibo data;
- **test one specific claim** the conventional search is not built for: that an anomaly-detection stage can recover narrowband signals whose frequency drift is not constant, a class that turboSETI's constant-drift-rate search is not designed to catch, and that Ma et al. (2023) explicitly set aside [9];
- **measure completeness end to end**, by injecting those test signals into the data *before* RFI flagging, detection and ranking, not after;
- **control false discoveries** with thresholds and a false-discovery-rate procedure registered before any large run; and
- **publish reusable outputs**: labelled interference catalogues, injected-signal test sets, benchmarks and trained models that future radio-telescope surveys can use.

Computing is the cheap part of this work. Moving the data is the expensive part, so the design processes data in tiers, as close to the archive as possible, and sends only reduced or prioritized subsets onward (section 4.7 and document 05).

New telescope time to confirm candidates is out of scope until a partner exists. Until then, any candidate is checked first against other archival observations of the same sky position. The most likely scientific outcome is a stronger, better-measured null result, including a measured answer on the non-linear-drift claim. The proposal makes no claim that this work will detect extraterrestrial intelligence.

## 2. Background

### 2.1 SETI@home

SETI@home ran from 1999 to 2020, distributing radio data recorded commensally at the Arecibo Observatory to volunteers' home computers through what became the BOINC volunteer-computing platform [1, 2, 3]. Volunteer computing stopped on 31 March 2020 so the team could finish the back-end analysis [1]. The final results were published in two papers in *The Astronomical Journal* in 2025 [4, 5]. According to UC Berkeley, the volunteer computers produced about 12 billion detections; the back-end analysis reduced these to roughly a million candidates and then to about 100 targets for re-observation with China's FAST telescope, which began in 2025 [3]. No confirmed signal has been reported.

The SETI@home team has been candid about the limits of its own design. It measured its sensitivity by inserting about 3,000 blinded synthetic signals ("birdies") into the pipeline, and its members have said a reanalysis that fixed early design choices would be worthwhile [3].

### 2.2 Breakthrough Listen

Breakthrough Listen was announced in July 2015 as a 10-year, US$100 million program funded by the Breakthrough Prize Foundation, with a commitment to make its data public [6]. Its first public data release in 2019 contained almost 1 PB of raw and reduced data [7]; the second release in 2020 roughly doubled what was available [8]. A 2026 review reports that Breakthrough Listen's storage systems held about 31 PB of data (of about 42 PB capacity) across seven systems as of March 2026 [10]. Only part of that is in the public archive; the publicly downloadable volume today is something reviewers and data holders will need to confirm. Price et al. (2020) state that the data products of their 1,327-star search, totalling about 219 TB, are available for download as part of Data Release 1 [11].

### 2.3 Machine learning in SETI so far

Machine learning is already being applied to this data, and this proposal builds on that work rather than claiming to be first. A notable example is Ma et al. (2023), who applied a cadence-aware β-convolutional variational autoencoder to 480 hours of Green Bank Telescope observations of 820 stars, cut false positives by about two orders of magnitude compared with earlier analyses of the same data, and identified eight signals of interest [9]. Re-observations of those five stars on 21 May 2022, with the same setup and the same pipeline, did not re-detect anything like the eight signals. Ma et al. reported that the signals are not persistent in time, and they did not claim a detection [9]. In a later commentary, Ma wrote that unusual radio interference is the most likely explanation [12]. RE-SETI does not treat those eight signals as open technosignature candidates.

Since then, Breakthrough Listen teams have run unsupervised anomaly-detection and interference-classification searches over Green Bank archive data [13, 14], use the open `setigen` framework for injection-and-recovery testing [15], and report real-time deep-learning pipelines in newer instruments [10]. One of these searches introduced GLOBULAR clustering (Jacobson-Bell et al. 2025), which applies HDBSCAN to turboSETI hits before event filtering. On a 97-galaxy L-band dataset it cut false-positive hits by 93.1% and false-positive events from 288 to 2, while recovering 69 of 100 injected events, against 86 for turboSETI alone [14, 17].

Two limits of this published work matter for what RE-SETI would actually test. First, turboSETI searches a grid of *constant* drift rates [11, 16]. Second, Ma et al. explicitly excluded signals whose drift rate changed from one ON scan to the next, calling that an intrinsic limitation of their search [9]. Most published injection tests, including those, have used linear-drift injections. The evidence that today's anomaly detectors recover *non-linear* drift better than turboSETI is therefore thin. That is the hypothesis the pilot is built to test, not a result already in hand.

### 2.4 What RE-SETI would add

RE-SETI does not propose a new detection method. It proposes these additions, each of which reviewers are asked to test:

1. **A single, falsifiable methods claim.** That an anomaly-detection stage, wrapped in end-to-end injection-recovery, can recover narrowband signals with time-varying (non-linear) drift that a constant-drift-rate search misses, at a pre-registered false-discovery rate. If the pilot cannot show this, the claim is dropped or narrowed before any larger run.
2. **Completeness measured on the whole pipeline.** Signals are injected into the data before RFI flagging, detection and ranking, so the recovery rate measures what the pipeline as a whole keeps, not what a late-stage scorer can find in already-cleaned data.
3. **Side-by-side methods on identical data.** Run the conventional turboSETI search, a Ma-style cadence-aware β-VAE, and GLOBULAR clustering (HDBSCAN on turboSETI hits [14]) on the same inputs, and publish where they agree and disagree.
4. **Broader coverage, where data allows.** Extend beyond the 820-star Green Bank set to other public Breakthrough Listen subsets as access and transfer budgets permit.
5. **An open, reproducible package.** A containerized pipeline, pinned model weights and processing logs that an outside group can rerun to reproduce any published number.
6. **A labelled benchmark for future telescopes.** Interference labels, injected-signal sets and scored results released as training and test material for the next generation of surveys.
7. **A methods check on earlier public data, not a reopening of closed candidates.** The public cadences from Ma et al. (2023) can be re-reduced as a software test. The eight signals themselves are not treated as outstanding candidates: they were not re-detected in 2022 and were not claimed as detections [9, 12].

If reviewers find that these have already been done, the proposal should shrink to whatever is left.

## 3. Objectives

1. **Archive reanalysis.** Process prioritized, reduced subsets of the accessible public Breakthrough Listen archive, chosen by scientific value, data quality and transfer cost, and, subject to agreement with its custodians, the SETI@home Arecibo data.
2. **A measured answer on non-linear drift.** Run the Phase 0/1 pilot on the claim in section 2.4, with go/kill criteria (document 02).
3. **Measured end-to-end sensitivity.** Inject synthetic signals at the start of the pipeline and publish recovery rates as a function of signal strength, drift behaviour and interference environment.
4. **Controlled false-discovery rates.** Register score thresholds and an FDR procedure before any large-archive run (section 4.5).
5. **Ranked, reviewed candidates.** Produce a ranked candidate list in which every high-ranking item has been reviewed by a person and, where the public archive allows, cross-matched against other observations of the same position.
6. **Reusable benchmarks.** Release labelled interference catalogues, injected-signal datasets, trained models and evaluation code under open licences.
7. **Sustainable operation.** Show that a small team, supported by automation, can run a project of this kind without the staffing that limited earlier efforts.

## 4. Methodology

### 4.1 Data ingestion and preprocessing

- Download data in the standard formats used by Breakthrough Listen (filterbank and HDF5 spectrograms, with selected raw-voltage data), using the open tools the community already maintains, such as `blimpy` [18].
- Record provenance for every file: source, checksum, observation metadata and processing version.
- Flag known interference bands and bad data, and normalize spectra so that observations from different telescopes and receivers can be compared.

### 4.2 Injection-recovery wraps the whole pipeline

Completeness is measured by planting synthetic signals in the data *before* RFI flagging, detection and ranking, then asking whether those signals survive the entire chain. Injecting after cleaning, or only into a late scoring stage, would overstate recovery: a flagger or a hit finder might already have discarded the signal.

- Injections use standard tools such as setigen [15], into raw or lightly preprocessed spectrograms (header and calibration metadata retained; no RFI mask or detector applied yet).
- The injection set is pre-registered and includes: (a) constant-drift narrowband signals, as a baseline comparison with turboSETI; (b) narrowband signals whose drift rate changes during the cadence — the target class; (c) empty controls, with nothing planted, and shuffled-cadence controls, to estimate the false-positive rate.
- Recovery is reported for the whole pipeline and for each stage, so it is clear where signals are lost.
- Some injections are used as "canaries" in later volunteer or cloud work (document 05, section 6). They are not a substitute for the end-to-end test.

### 4.3 Baseline search

Run a conventional Doppler-drift search with established tools such as `turboSETI` [16, 18] on every dataset processed. This gives a like-for-like baseline, so any difference in results can be attributed to the new methods rather than to changes in data handling.

### 4.4 Machine-learning analysis

- **Representation learning.** Train variational autoencoders and related models on spectrogram snippets to learn what ordinary data, including ordinary interference, looks like.
- **What "normal" means, and how RFI in the training set is handled.** "Normal" is the empirical structure of the archive, including ordinary RFI, not a clean sky. Following Ma et al. (2023), the model is cadence-aware: a genuine on-sky signal is expected in the ON pointings and not in the OFF pointings, whereas near-field RFI is expected to appear irrespective of pointing [9]. Training uses real backgrounds plus synthetic labels (RFI-like and ETI-like injections via setigen), as Ma et al. did, rather than pretending the backgrounds are empty. Frequency bands and cadences with known, dense interference are held out of the training set and reserved for testing. The residual risk, which Ma et al. also noted, is that an unknown real signal in a "background" snippet would be mislabelled; a large, diverse training set reduces but does not remove that risk [9].
- **Density-based clustering.** Apply GLOBULAR clustering, the published method that runs HDBSCAN on turboSETI hits before event filtering [14, 17], and test the same density-clustering idea on the learned representations [19].
- **Anomaly scoring.** Combine reconstruction error, cluster isolation and the ON/OFF cadence pattern into a single ranked score.
- **Model comparison.** Run more than one model family, so that a candidate found by only one method is treated with extra caution.

The detection models are compact and run on a single consumer GPU. Large language models, and layer-by-layer loading tools such as AirLLM, are not part of the detection pipeline or the volunteer client. A language model may help with low-volume secondary tasks, such as drafting candidate summaries for reviewers, always with human sign-off (see document 05).

### 4.5 Multiple comparisons and pre-registered false-discovery-rate control

A large archive, several methods, and many frequency channels create a multiple-comparisons problem: some high scores will appear by chance. Before any run on the full agreed dataset, RE-SETI would register, in the public repository:

- the score threshold rule for each method;
- the false-discovery-rate procedure, using Benjamini–Hochberg [20] or an equivalent, with the empirical null taken from empty and shuffled-cadence injection controls (section 4.2);
- the injection grid (strengths, drift behaviours, frequency ranges) used to estimate completeness and the trials factor.

Those choices would not be tuned after looking at the search results. The Phase 0/1 pilot is the place to test the procedure on a small public set. If the registered rule cannot keep the false-discovery rate at the agreed level in the pilot, the large run does not start.

### 4.6 Confirmation: archival cross-matches first; new observations later

A hit in one archive file is not an astrophysical detection. The first check is an archival cross-match: the same sky position, in other public datasets or at other epochs, looking for a repeat or a contradicting OFF-like appearance. New observations on a second telescope are out of scope until an observatory partner exists and agrees to take them. No discovery claim is made without independent confirmation. Until that partner exists, the honest product is a ranked, cross-matched, human-reviewed list, plus the measured sensitivity of the search.

### 4.7 Computing: pilot first, volunteers only if the numbers justify it

The project starts with one consumer GPU. The Phase 0 pilot (document 02) reproduces a published Breakthrough Listen result on a public data subset — specifically, the published turboSETI event toward HIP 100064 in Price et al. (2020), Fig. 7c, using the corresponding public Data Release 1 cadence [11] — and then tests the non-linear-drift claim with end-to-end injections. It measures throughput per gigabyte and per hour, data volume per target, and cost. Only if those numbers show that volunteer computing would help, and that the data can be delivered to volunteers affordably, does a volunteer network follow.

If it does, work units would be distributed through BOINC, which supports container-based ("Docker") applications on Linux, macOS and Windows (via WSL) [21]. Containers keep the software identical on every machine. They do not make GPU arithmetic identical: different cards can return slightly different numbers, so results are compared within tolerances rather than bit for bit (document 05, section 6). A cloud-hosted coordination service (the "Master Node") schedules work, checks returned results and keeps the candidate database.

### 4.8 Data transfer budget

Data movement, not computation, is expected to be the dominant cost. Breakthrough Listen reports about 31 PB of data in use across its storage systems [10]. At a sustained 10 Gb/s, moving 31 PB would take about 287 days; at 1 Gb/s, about 7.9 years. If that volume left a commercial cloud at Amazon Web Services' published internet rates (US$0.05–0.09 per GB), the egress bill would be roughly US$1.5–2.8 million, doubling if every work unit is sent to two volunteers [22]. A full rerun of everything is therefore not the plan.

The plan instead is tiered: select targets using existing metadata and hit lists; reduce and filter data at or near the archive with cheap first-pass processing; and send only reduced, prioritized snippets to GPUs for the machine-learning stage. For scale, the reduced filterbank products of two major Breakthrough Listen surveys were 180 TB and 142 TB [10]. Moving 142 TB takes about 13 days at 1 Gb/s and would cost roughly US$10,700 at the same list egress rates, if egress fees apply at all. Where the data is actually hosted, and on what terms, is an open question for the data holders. The full arithmetic and assumptions are in document 05, section 5.

## 5. Expected outputs

- A pilot report answering the non-linear-drift claim, including a null or a negative methods result if that is what it is.
- A reanalysis report for each later data subset, including measured end-to-end sensitivity and the registered FDR.
- A public, versioned candidate database with full provenance and archival cross-match status.
- Labelled interference and injected-signal datasets, trained models and benchmark code under open licences.
- Peer-reviewed publications in collaboration with domain scientists, if and when those collaborators join.

## 6. Risks and limitations

| Risk | Mitigation |
|---|---|
| The non-linear-drift claim fails in the pilot | Pre-registered go/kill criteria; drop or narrow the claim before any large run (document 02) |
| Training-set RFI contamination of the VAE | Cadence-aware training, held-out RFI bands, synthetic labels on real backgrounds, following Ma et al. 2023; residual risk stated (section 4.4) |
| Injection tests that skip early stages overstate recovery | Injections go in before RFI flagging, detection and ranking (section 4.2) |
| Multiple comparisons produce chance candidates | Pre-registered thresholds and FDR control (section 4.5) |
| Interference overwhelms the candidate list | Density clustering, ON/OFF cadence checks, frequency-band flagging; publish false-positive rates |
| SETI@home raw data is not accessible (Arecibo collapsed in 2020; the data are held by UC Berkeley) | Start with the public Breakthrough Listen archive; approach custodians only with a reviewed plan |
| Data transfer volume and cost (expected to be the dominant cost) | Tiered processing near the archive; send only reduced, prioritized subsets; transfer budget set from pilot measurements before any volunteer network (section 4.8) |
| No telescope partner for new observations | Archival cross-matches first; new observations out of scope until a partner exists (section 4.6) |
| Overclaiming or public misunderstanding | Fixed communication rules: no claims without independent confirmation; negative results published |
| Volunteer network not worth its transfer cost, or too few volunteers | Volunteer network is conditional on Phase 0 pilot numbers; the design runs on one or a few GPUs at small scale |
| GPU results differ between volunteer cards, or clients return bad results | Tolerance-based comparison of replicated work, canary signals, reference re-runs on trusted hardware (document 05, section 6) |
| Personnel: a project run by one person is fragile | No operational steps beyond the public-data pilot until at least one more committed person joins (see document 07) |
| Confusion with the original SETI@home | Distinct project name (RE-SETI) and a non-affiliation statement on all materials |
| The proposer's gaps in radio astronomy and formal signal processing | Stated in document 10; expert collaborators are invited to fill them |

## 7. Governance and status

**Stage: proposal in review.** The next steps run in parallel: independent review, recruitment of scientific or technical collaborators (not a business co-founder), and the low-cost single-GPU pilot on public data (Phase 0, document 02). Formal structure, funding applications and data-access requests would follow only after that.

Feedback: https://github.com/Isowix/re-seti/issues (GitHub issues are public). Email: hello@axiom-mmf.ca

## References

1. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting UC Berkeley's announcement of 2 March 2020). https://www.seti.org/news/seti-at-home-going-into-hibernation/
2. Anderson, D. P., Cobb, J., Korpela, E., Lebofsky, M., and Werthimer, D., "SETI@home: an experiment in public-resource computing", *Communications of the ACM* 45(11), 56–61 (2002). https://doi.org/10.1145/581571.581573
3. Sanders, R., *Berkeley News*, 12 January 2026. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/
4. Anderson, D. P., et al., "SETI@home: Data Analysis and Findings", *AJ* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab (arXiv:2506.14737)
5. Korpela, E. J., et al., "SETI@home: Data Acquisition and Front-End Processing", *AJ* 170, 112 (2025). https://doi.org/10.3847/1538-3881/ade5a7 (arXiv:2506.14718)
6. Breakthrough Initiatives, announcement of Breakthrough Listen, 20 July 2015. https://breakthroughinitiatives.org/news/1
7. Lebofsky, M., et al., *PASP* 131, 124505 (2019). https://doi.org/10.1088/1538-3873/ab3e82
8. Berkeley SETI Research Center, "Breakthrough Listen: Data Release 2", February 2020. https://seti.berkeley.edu/bldr2/
9. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z
10. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint). https://arxiv.org/abs/2610.07482
11. Price, D. C., et al., "The Breakthrough Listen Search for Intelligent Life: Observations of 1327 Nearby Stars Over 1.10–3.45 GHz", *AJ* 159, 86 (2020). All data products, totalling ~219 TB, are stated to be available in Data Release 1. https://doi.org/10.3847/1538-3881/ab65f1 · arXiv:1906.07750
12. Ma, P., "AI is helping us search for intelligent alien life – and we've found 8 strange new signals", *The Conversation*, 30 January 2023. Commentary by a co-author of reference 9. https://theconversation.com/ai-is-helping-us-search-for-intelligent-alien-life-and-weve-found-8-strange-new-signals-198754
13. Pardo, S., et al., "Using Anomaly Detection to Search for Technosignatures in Breakthrough Listen Observations", *The Astronomical Journal* 170, 12 (2025). https://doi.org/10.3847/1538-3881/add52b · arXiv:2505.03927
14. Jacobson-Bell, B., et al., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). Introduces GLOBULAR clustering. https://doi.org/10.3847/1538-3881/adb8e7 · arXiv:2411.16556
15. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
16. Enriquez, J. E., et al., "The Breakthrough Listen Search for Intelligent Life: 1.1–1.9 GHz Observations of 692 Nearby Stars", *ApJ* 849, 104 (2017). https://doi.org/10.3847/1538-4357/aa8d1b
17. GLOBULAR clustering code (Jacobson-Bell). https://github.com/bjacobell/gbt-hdbscan
18. Breakthrough Listen open-source tools: blimpy https://github.com/UCBerkeleySETI/blimpy and turboSETI https://github.com/UCBerkeleySETI/turbo_seti
19. HDBSCAN documentation. https://hdbscan.readthedocs.io/
20. Benjamini, Y., and Hochberg, Y., "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", *Journal of the Royal Statistical Society: Series B* 57(1), 289–300 (1995). https://doi.org/10.1111/j.2517-6161.1995.tb02031.x
21. BOINC, "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
22. Amazon Web Services, EC2 On-Demand pricing, "Data Transfer" (internet egress tiers US$0.09/GB for the first 10 TB a month, down to US$0.05/GB above 150 TB a month, US and EU regions; checked November 2026). https://aws.amazon.com/ec2/pricing/on-demand/
