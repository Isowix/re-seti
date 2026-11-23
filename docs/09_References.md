# References and Sources

*RE-SETI proposal archive v1.2.1 · 23 November 2026*

Every figure quoted in this archive is taken from one of the sources below. Links were checked on 23 November 2026. Reference numbers in this list are archive-wide; individual documents number their own short lists.

## SETI@home

1. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting UC Berkeley's announcement of 2 March 2020 that volunteer computing would stop on 31 March 2020). https://www.seti.org/news/seti-at-home-going-into-hibernation/
2. Korpela, E. J., Anderson, D. P., Cobb, J., Lebofsky, M., Liu, W., and Werthimer, D., "SETI@home: Data Acquisition and Front-End Processing", *The Astronomical Journal* 170, 112 (2025). https://doi.org/10.3847/1538-3881/ade5a7 · arXiv:2506.14718
3. Anderson, D. P., Korpela, E. J., Werthimer, D., Cobb, J., and Allen, B., "SETI@home: Data Analysis and Findings", *The Astronomical Journal* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab · arXiv:2506.14737
4. Sanders, R., "For 21 years, enthusiasts used their home computers to search for ET. UC Berkeley scientists are homing in on 100 signals they found", *Berkeley News*, 12 January 2026. Source for the ~12 billion detections, ~100 re-observation targets, FAST follow-up, ~3,000 injected "birdies", and the Korpela quotations. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/

## Breakthrough Listen

5. Breakthrough Initiatives, "Yuri Milner and Stephen Hawking Announce $100 Million Breakthrough Initiative…", 20 July 2015. Source for the 10-year, US$100 million commitment and the open-data pledge. https://breakthroughinitiatives.org/news/1
6. Lebofsky, M., et al., "The Breakthrough Listen Search for Intelligent Life: Public Data, Formats, Reduction, and Archiving", *PASP* 131, 124505 (2019). Source for Data Release 1 (~1 PB), the ~2% filterbank-to-raw size ratio, and the 11 public archive servers with 10 Gb/s links. https://doi.org/10.1088/1538-3873/ab3e82
7. Berkeley SETI Research Center, "Breakthrough Listen: Data Release 2", February 2020. https://seti.berkeley.edu/bldr2/
8. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint, IAC-26). Source for ~31 PB of data in use across ~42 PB of Breakthrough Listen storage as of March 2026, the Berkeley data center archive, and the 180 TB and 142 TB reduced filterbank products of two surveys. https://arxiv.org/abs/2610.07482
9. Breakthrough Listen open data search. https://breakthroughinitiatives.org/opendatasearch

## Machine learning in SETI

10. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z · arXiv:2301.12670
11. Pardo, S., et al., "Using Anomaly Detection to Search for Technosignatures in Breakthrough Listen Observations", *The Astronomical Journal* 170, 12 (2025). https://doi.org/10.3847/1538-3881/add52b · arXiv:2505.03927
12. Jacobson-Bell, B., Croft, S., Choza, C., Andersson, A., Bautista, D., Gajjar, V., Lebofsky, M., MacMahon, D. H. E., Painter, C., and Siemion, A. P. V., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). https://doi.org/10.3847/1538-3881/adb8e7 · arXiv:2411.16556. Introduces GLOBULAR (Grouping Low-frequency Observations By Unsupervised Learning After Reduction) clustering, which applies HDBSCAN to turboSETI FindDoppler hits before FindEvent. Benchmarked on the Choza et al. (2024) turboSETI search of 97 nearby galaxies at L band: 93.1% reduction in false-positive hits and 99.3% in false-positive events (288 to 2); 69 of 100 injected events recovered, against 86 for turboSETI alone.
13. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
14. Berkeley SETI Research Center, "Breakthrough Listen: 1327 Star Analysis and Public Data Release 1". https://seti.berkeley.edu/listen2019/

## Funding precedents

15. SETI Institute, "$200m Gift Propels Scientific Research in the Search for Life Beyond Earth", 8 November 2023 (Franklin Antonio bequest). https://www.seti.org/news/200m-gift-propels-scientific-research-in-the-search-for-life-beyond-earth/
16. SETI Institute, "SETI Institute Awards Its First Research and Education Innovation Grants", 8 July 2024. https://www.seti.org/news/seti-institute-awards-its-first-research-and-education-innovation-grants/

## Software

17. BOINC (Berkeley Open Infrastructure for Network Computing), "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
18. blimpy. https://github.com/UCBerkeleySETI/blimpy
19. turboSETI. https://github.com/UCBerkeleySETI/turbo_seti
20. HDBSCAN. https://hdbscan.readthedocs.io/
21. AirLLM. https://github.com/lyogavin/airllm
22. GLOBULAR clustering code (Jacobson-Bell). https://github.com/bjacobell/gbt-hdbscan
23. BOINC, "Job replication". https://github.com/BOINC/boinc/wiki/Job-replication
24. BOINC, "Validators". https://github.com/BOINC/boinc/wiki/Validators
25. BOINC, "Homogeneous Redundancy". https://github.com/BOINC/boinc/wiki/Homogeneous-Redundancy
26. PyTorch documentation, "Reproducibility". https://docs.pytorch.org/docs/stable/notes/randomness.html

## Data transfer costs and bandwidth

27. Amazon Web Services, EC2 On-Demand pricing, "Data Transfer": internet egress US$0.09/GB for the first 10 TB a month, US$0.085/GB next 40 TB, US$0.07/GB next 100 TB, US$0.05/GB above 150 TB; first 100 GB a month free (US and EU regions; checked November 2026). https://aws.amazon.com/ec2/pricing/on-demand/
28. Statista, "Median mobile and fixed broadband download and upload speeds worldwide as of September 2026", citing Ookla Speedtest Global Index (fixed broadband median download ~135 Mb/s). https://www.statista.com/statistics/896779/average-mobile-fixed-broadband-download-upload-speeds/
