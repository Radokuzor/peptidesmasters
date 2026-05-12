export type ResearchLevel = "Well-Studied" | "Emerging" | "Experimental";
export type PeptideForm = "Injectable" | "Oral" | "Topical" | "Nasal" | "Injectable / Oral";
export type Goal =
  | "Fat Loss"
  | "Muscle Recovery"
  | "Longevity"
  | "Cognitive Performance"
  | "Injury Healing"
  | "Skin & Beauty"
  | "Hormonal Health";

export interface Study {
  title: string;
  source: string;
  url: string;
  year: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Peptide {
  slug: string;
  name: string;
  alsoKnownAs: string[];
  tagline: string;
  description: string;
  primaryUses: Goal[];
  form: PeptideForm;
  researchLevel: ResearchLevel;
  legalStatus: string;
  fdaStatus: string;
  mechanismOfAction: string;
  whatItIs: string[];
  whatResearchSays: string[];
  commonUseCases: string[];
  reportedBenefits: string[];
  reportedRisks: string[];
  humanStudies: number;
  animalStudies: number;
  commonlyStackedWith: string[];
  faqs: FAQ[];
  studies: Study[];
  affiliatePlaceholder: string;
  lastUpdated: string;
}

const peptides: Peptide[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    alsoKnownAs: ["Body Protection Compound 157", "PL 14736"],
    tagline: "A gut-derived peptide showing remarkable healing properties in preclinical research",
    description:
      "BPC-157 is a synthetic pentadecapeptide derived from a protective protein found in human gastric juice. It is one of the most researched peptides for tissue healing and injury recovery.",
    primaryUses: ["Injury Healing", "Muscle Recovery"],
    form: "Injectable",
    researchLevel: "Emerging",
    legalStatus:
      "Research use only in the US. Not FDA-approved for human use. Banned in competitive sports by WADA.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Upregulates growth hormone receptors, promotes angiogenesis (new blood vessel formation), and modulates nitric oxide synthesis to accelerate tissue repair.",
    whatItIs: [
      "BPC-157 stands for Body Protection Compound-157 — a sequence of 15 amino acids originally isolated from human gastric juice.",
      "It is a synthetic analog of a naturally occurring protein fragment in the stomach lining. Despite its origin, researchers have studied its effects far beyond the gut — including tendons, ligaments, muscles, and the nervous system.",
      "It is strictly classified as a research peptide and has not been approved by the FDA for human therapeutic use.",
    ],
    whatResearchSays: [
      "Animal studies show accelerated healing of tendon, ligament, and muscle injuries compared to controls.",
      "Research in rats demonstrates significant reduction in inflammation and improved recovery from surgical cuts and tears.",
      "Preclinical models suggest neuroprotective effects, with some studies showing improved recovery after traumatic brain injury.",
      "Studies in rodents indicate it may protect against NSAID-induced gut damage and promote gut healing.",
      "No completed double-blind human clinical trials exist as of 2026 — all human evidence is anecdotal.",
    ],
    commonUseCases: [
      "Research into accelerated tendon and ligament repair",
      "Gut healing and intestinal permeability studies",
      "Post-surgical recovery in preclinical models",
      "Neurological injury research",
    ],
    reportedBenefits: [
      "Faster recovery from muscle and tendon injuries",
      "Reduced joint pain and inflammation",
      "Improved gut health and reduced GI symptoms",
      "Potential neuroprotective effects",
    ],
    reportedRisks: [
      "No long-term human safety data available",
      "Unknown interactions with medications",
      "Injection site reactions possible",
      "Banned in competitive sports",
    ],
    humanStudies: 0,
    animalStudies: 80,
    commonlyStackedWith: ["TB-500", "CJC-1295", "Ipamorelin"],
    faqs: [
      {
        question: "What is BPC-157 used for?",
        answer:
          "BPC-157 is primarily studied for its potential to accelerate healing of tendons, ligaments, muscles, and gut tissue. All current evidence comes from animal studies — no human clinical trials have been completed.",
      },
      {
        question: "Is BPC-157 legal?",
        answer:
          "BPC-157 is legal to purchase as a research chemical in the US but is not FDA-approved for human use. It is banned by WADA in competitive sports.",
      },
      {
        question: "How is BPC-157 administered?",
        answer:
          "In research settings, BPC-157 is most commonly administered via subcutaneous or intramuscular injection. Oral forms exist but bioavailability may differ.",
      },
      {
        question: "Is BPC-157 a steroid?",
        answer:
          "No. BPC-157 is a peptide — a short chain of amino acids. It has a completely different mechanism of action from anabolic steroids and does not interact with androgen receptors.",
      },
      {
        question: "How long does BPC-157 take to work?",
        answer:
          "Animal studies suggest effects on tissue healing can be observed within days to weeks. Individual human experiences vary widely and there is no standardized human dosing protocol.",
      },
    ],
    studies: [
      {
        title: "BPC 157 effect on healing: a review",
        source: "Curr Pharm Des",
        url: "https://pubmed.ncbi.nlm.nih.gov/24099640/",
        year: 2014,
      },
      {
        title: "Stable gastric pentadecapeptide BPC 157 heals cysteamine-induced duodenal ulcers",
        source: "J Physiol Paris",
        url: "https://pubmed.ncbi.nlm.nih.gov/11000357/",
        year: 2000,
      },
    ],
    affiliatePlaceholder: "BPC_157",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    alsoKnownAs: ["Thymosin Beta-4", "Tβ4"],
    tagline: "A naturally occurring peptide with strong evidence for tissue repair and inflammation reduction",
    description:
      "TB-500 is a synthetic version of Thymosin Beta-4 — a protein present in virtually all human and animal cells. It plays a critical role in building new blood vessels, muscle tissue, and regulating wound healing.",
    primaryUses: ["Injury Healing", "Muscle Recovery"],
    form: "Injectable",
    researchLevel: "Emerging",
    legalStatus:
      "Research use only. Not FDA-approved for human therapeutic use. Prohibited in sports by WADA.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Promotes actin polymerization, facilitates cell migration, modulates inflammation, and promotes angiogenesis — all of which are critical to tissue repair processes.",
    whatItIs: [
      "TB-500 is the synthetic version of a fragment of Thymosin Beta-4 (Tβ4) — a naturally occurring peptide found in high concentrations in blood platelets, wound fluid, and various tissues throughout the body.",
      "Unlike many research peptides, Thymosin Beta-4 is an endogenous compound, meaning your body already produces it. TB-500 mimics the active region of this naturally occurring protein.",
      "It has been used in veterinary medicine (particularly in horse racing) and is currently under investigation for human applications including cardiac repair.",
    ],
    whatResearchSays: [
      "Human trials are underway for cardiac repair — Thymosin Beta-4 has shown promise in protecting heart muscle after myocardial infarction.",
      "Animal studies demonstrate significant acceleration of wound healing, muscle repair, and tendon recovery.",
      "Research shows anti-inflammatory effects in multiple animal models.",
      "Some studies show potential for hair follicle activation and hair regrowth.",
      "Veterinary use (especially in horses) provides a larger body of practical application data than most research peptides.",
    ],
    commonUseCases: [
      "Muscle and tendon injury recovery research",
      "Cardiac repair investigation",
      "Wound healing studies",
      "Hair restoration research",
    ],
    reportedBenefits: [
      "Reduced recovery time from soft tissue injuries",
      "Improved flexibility and range of motion",
      "Potential cardiac protective effects",
      "Anti-inflammatory properties",
    ],
    reportedRisks: [
      "Limited long-term human safety data",
      "Potential for cancer promotion (theoretical — actively researched)",
      "Injection site reactions",
      "Banned in competitive sports",
    ],
    humanStudies: 3,
    animalStudies: 60,
    commonlyStackedWith: ["BPC-157", "CJC-1295"],
    faqs: [
      {
        question: "What is the difference between TB-500 and Thymosin Beta-4?",
        answer:
          "TB-500 is a synthetic analog of the active region of Thymosin Beta-4. They share the same core mechanism but TB-500 is typically shorter and used as a research compound.",
      },
      {
        question: "Is TB-500 FDA-approved?",
        answer:
          "No. TB-500 is not FDA-approved for human use. Thymosin Beta-4 is being studied in human cardiac repair trials, but has not received approval.",
      },
      {
        question: "Can I stack TB-500 with BPC-157?",
        answer:
          "Many researchers and users report stacking these two peptides. BPC-157 and TB-500 have complementary mechanisms, though no human clinical data exists on the combination.",
      },
    ],
    studies: [
      {
        title: "Thymosin beta4 and its role in tissue repair and regeneration",
        source: "Ann N Y Acad Sci",
        url: "https://pubmed.ncbi.nlm.nih.gov/22992320/",
        year: 2012,
      },
    ],
    affiliatePlaceholder: "TB_500",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    alsoKnownAs: ["Ozempic", "Wegovy", "Rybelsus"],
    tagline: "An FDA-approved GLP-1 receptor agonist — the most-studied peptide for weight loss",
    description:
      "Semaglutide is an FDA-approved GLP-1 receptor agonist used for type 2 diabetes management and chronic weight management. It is the active ingredient in Ozempic, Wegovy, and Rybelsus — among the most prescribed drugs in the US.",
    primaryUses: ["Fat Loss", "Hormonal Health"],
    form: "Injectable / Oral",
    researchLevel: "Well-Studied",
    legalStatus:
      "FDA-approved prescription medication. Legal with a valid prescription. Compounded versions exist in a regulatory gray area.",
    fdaStatus: "FDA-Approved (Prescription)",
    mechanismOfAction:
      "Activates GLP-1 receptors in the pancreas (increasing insulin secretion), brain (reducing appetite), and gut (slowing gastric emptying) — creating a powerful multi-system effect on blood sugar and body weight.",
    whatItIs: [
      "Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist — a class of drugs that mimic the hormone GLP-1, which is naturally released after eating.",
      "Developed by Novo Nordisk, semaglutide was first approved by the FDA in 2017 for type 2 diabetes (as Ozempic) and later at a higher dose for chronic weight management (as Wegovy) in 2021.",
      "Unlike most peptides on this site, semaglutide has extensive clinical trial data from large-scale human studies involving tens of thousands of participants.",
    ],
    whatResearchSays: [
      "The SUSTAIN clinical trial program showed semaglutide significantly reduced HbA1c in type 2 diabetes patients.",
      "The STEP trial program demonstrated an average 14.9% body weight reduction over 68 weeks in the STEP 1 trial.",
      "SURMOUNT-3 trial showed up to 17.4% weight loss when combined with intensive behavioral intervention.",
      "Cardiovascular outcome trials (SELECT) showed 20% reduction in major cardiovascular events in overweight/obese patients without diabetes.",
      "Emerging research suggests potential benefits for fatty liver disease (MASH), kidney disease, and neurological conditions.",
    ],
    commonUseCases: [
      "Type 2 diabetes management",
      "Chronic weight management",
      "Cardiovascular risk reduction",
      "Non-alcoholic fatty liver disease (MASH) research",
    ],
    reportedBenefits: [
      "Significant and sustained weight loss",
      "Improved blood sugar control",
      "Reduced cardiovascular events",
      "Reduced appetite and food cravings",
    ],
    reportedRisks: [
      "Nausea, vomiting, diarrhea (common, especially at initiation)",
      "Pancreatitis (rare)",
      "Thyroid C-cell tumor risk (seen in rodents — clinical significance unclear)",
      "Muscle mass loss alongside fat loss",
      "Rebound weight gain upon discontinuation",
    ],
    humanStudies: 200,
    animalStudies: 100,
    commonlyStackedWith: ["Tirzepatide"],
    faqs: [
      {
        question: "What is semaglutide and how does it work?",
        answer:
          "Semaglutide is a GLP-1 receptor agonist that mimics the gut hormone GLP-1. It slows digestion, reduces appetite signals in the brain, and increases insulin release — resulting in lower blood sugar and significant weight loss.",
      },
      {
        question: "Is semaglutide the same as Ozempic?",
        answer:
          "Yes. Ozempic, Wegovy, and Rybelsus all contain semaglutide as their active ingredient. The difference is dosage and formulation: Ozempic is weekly injection for diabetes, Wegovy is weekly injection at higher dose for weight loss, and Rybelsus is a daily oral tablet.",
      },
      {
        question: "How much weight can you lose on semaglutide?",
        answer:
          "In the STEP 1 clinical trial, participants lost an average of 14.9% of body weight over 68 weeks. Individual results vary based on diet, exercise, and adherence.",
      },
      {
        question: "Is semaglutide legal?",
        answer:
          "Yes, with a valid prescription from a licensed healthcare provider. Compounded semaglutide exists in a regulatory gray area — the FDA has taken action against some compounders.",
      },
    ],
    studies: [
      {
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
        source: "N Engl J Med",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
        year: 2021,
      },
      {
        title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT)",
        source: "N Engl J Med",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563",
        year: 2023,
      },
    ],
    affiliatePlaceholder: "SEMAGLUTIDE",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    alsoKnownAs: ["DAC:GRF", "Drug Affinity Complex: Growth Hormone-Releasing Factor"],
    tagline: "A modified GHRH analog designed for sustained growth hormone release",
    description:
      "CJC-1295 is a synthetic analog of Growth Hormone-Releasing Hormone (GHRH) with a Drug Affinity Complex (DAC) modification that extends its half-life dramatically, enabling sustained growth hormone stimulation.",
    primaryUses: ["Muscle Recovery", "Longevity", "Fat Loss"],
    form: "Injectable",
    researchLevel: "Emerging",
    legalStatus: "Research use only. Not FDA-approved for human use.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Binds to GHRH receptors in the pituitary gland, stimulating pulsatile GH release. The DAC modification allows it to bind to albumin in the blood, extending its half-life from minutes to approximately 7–8 days.",
    whatItIs: [
      "CJC-1295 is a modified version of the first 29 amino acids of Growth Hormone-Releasing Hormone (GHRH) — the hormone your hypothalamus naturally uses to signal the pituitary to release growth hormone.",
      "The key modification is the Drug Affinity Complex (DAC) — a chemical addition that allows the peptide to bind to albumin (a blood protein), dramatically extending its half-life from roughly 7 minutes to approximately 7–8 days.",
      "This extended half-life means CJC-1295 stimulates sustained, elevated GH and IGF-1 levels rather than a brief pulse — which is its main distinguishing feature.",
    ],
    whatResearchSays: [
      "Phase 1 and 2 clinical trials showed CJC-1295 significantly increased serum GH levels (2 to 10-fold) in healthy adults.",
      "Studies show dose-dependent increases in IGF-1 levels lasting several weeks after a single injection.",
      "Research suggests sustained GH elevation improves body composition (reduced fat, increased lean mass) in clinical settings.",
      "No large-scale phase 3 trials have been completed.",
    ],
    commonUseCases: [
      "Growth hormone optimization research",
      "Body composition improvement",
      "Anti-aging protocols",
      "Muscle recovery enhancement",
    ],
    reportedBenefits: [
      "Increased growth hormone and IGF-1 levels",
      "Improved body composition (more muscle, less fat)",
      "Enhanced recovery from training",
      "Improved sleep quality",
    ],
    reportedRisks: [
      "Water retention",
      "Tingling or numbness (carpal tunnel-like symptoms)",
      "Potential insulin resistance with prolonged use",
      "Disruption of natural GH pulsatility",
    ],
    humanStudies: 5,
    animalStudies: 15,
    commonlyStackedWith: ["Ipamorelin", "TB-500"],
    faqs: [
      {
        question: "What is the difference between CJC-1295 with DAC and without DAC?",
        answer:
          "CJC-1295 with DAC has a half-life of 7–8 days, creating sustained GH elevation. Without DAC (sometimes called Modified GRF 1-29), the half-life is only 30 minutes, creating a GH pulse similar to natural patterns.",
      },
      {
        question: "Why do people stack CJC-1295 with Ipamorelin?",
        answer:
          "The combination targets two different pathways of GH release simultaneously. CJC-1295 stimulates GHRH receptors while Ipamorelin stimulates ghrelin receptors — together producing a larger GH release than either alone.",
      },
    ],
    studies: [
      {
        title:
          "Long-acting growth hormone-releasing factor (CJC-1295) stimulates GH release in healthy adults",
        source: "J Clin Endocrinol Metab",
        url: "https://pubmed.ncbi.nlm.nih.gov/16822960/",
        year: 2006,
      },
    ],
    affiliatePlaceholder: "CJC_1295",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    alsoKnownAs: ["NNC 26-0161"],
    tagline: "A selective growth hormone secretagogue known for its clean, targeted GH release",
    description:
      "Ipamorelin is a pentapeptide growth hormone secretagogue that selectively stimulates growth hormone release from the pituitary with minimal impact on cortisol and prolactin — making it one of the cleaner GH-releasing peptides in research.",
    primaryUses: ["Muscle Recovery", "Fat Loss", "Longevity"],
    form: "Injectable",
    researchLevel: "Emerging",
    legalStatus: "Research use only. Not FDA-approved for human use.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Mimics ghrelin and binds to the GH secretagogue receptor (GHSR) in the pituitary, triggering GH release. Unlike GHRP-6, it does not significantly elevate cortisol or prolactin.",
    whatItIs: [
      "Ipamorelin is a synthetic pentapeptide (5 amino acid chain) that belongs to the growth hormone secretagogue family — compounds that stimulate GH release from the pituitary gland.",
      "What distinguishes Ipamorelin from other GH secretagogues like GHRP-6 is its selectivity: it causes clean GH release without the significant cortisol, prolactin, or appetite-stimulating side effects common to other compounds in its class.",
      "It is frequently studied in combination with CJC-1295 for a synergistic GH-releasing effect.",
    ],
    whatResearchSays: [
      "Animal studies confirm Ipamorelin's selective GH release without significant cortisol or prolactin elevation.",
      "Research shows dose-dependent GH increases with good safety profile in animal models.",
      "Combination with CJC-1295 in studies shows synergistic GH release greater than either compound alone.",
      "Limited human clinical trial data available.",
    ],
    commonUseCases: [
      "Growth hormone optimization research",
      "Post-workout recovery",
      "Sleep quality improvement",
      "Anti-aging protocols",
    ],
    reportedBenefits: [
      "Increased GH secretion without cortisol spike",
      "Improved recovery and sleep quality",
      "Mild fat loss and lean mass improvements",
      "Well-tolerated in research settings",
    ],
    reportedRisks: [
      "Water retention (mild)",
      "Headaches",
      "Flushing",
      "Limited long-term human safety data",
    ],
    humanStudies: 2,
    animalStudies: 20,
    commonlyStackedWith: ["CJC-1295", "BPC-157"],
    faqs: [
      {
        question: "What makes Ipamorelin different from GHRP-6?",
        answer:
          "Ipamorelin is more selective — it stimulates GH release without the significant cortisol elevation, prolactin increase, or strong appetite stimulation seen with GHRP-6. This selectivity makes it a cleaner research tool.",
      },
      {
        question: "Should Ipamorelin be taken before bed?",
        answer:
          "Many researchers time Ipamorelin to coincide with the body's natural nocturnal GH pulse. Taking it before sleep may align with and amplify this natural pattern, though optimal timing in humans remains unstudied.",
      },
    ],
    studies: [
      {
        title: "Ipamorelin, the first selective growth hormone secretagogue",
        source: "Eur J Endocrinol",
        url: "https://pubmed.ncbi.nlm.nih.gov/9425098/",
        year: 1998,
      },
    ],
    affiliatePlaceholder: "IPAMORELIN",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    alsoKnownAs: ["Nicotinamide Adenine Dinucleotide", "NAD", "β-NAD+"],
    tagline: "A critical coenzyme found in every cell — central to energy production and longevity research",
    description:
      "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays a central role in energy metabolism and is being intensively studied for its role in aging, cellular repair, and longevity.",
    primaryUses: ["Longevity", "Cognitive Performance"],
    form: "Injectable / Oral",
    researchLevel: "Well-Studied",
    legalStatus: "Legal. Available as a dietary supplement (oral precursors NMN, NR). IV NAD+ requires clinical setting.",
    fdaStatus: "Dietary Supplement (precursors) / Not FDA-approved as drug",
    mechanismOfAction:
      "Serves as a substrate for sirtuins (SIRT1–SIRT7) and PARPs — enzymes critical for DNA repair, gene expression, and cellular stress response. NAD+ declines with age; supplementation aims to restore youthful levels.",
    whatItIs: [
      "NAD+ is not technically a peptide, but is included here because of its significant overlap with the longevity and biohacking research communities and its frequent discussion alongside peptide protocols.",
      "It is a coenzyme present in every cell in your body, essential for converting nutrients into ATP (cellular energy) through the Krebs cycle and electron transport chain.",
      "NAD+ levels naturally decline by roughly 50% between age 40 and 60. This decline is associated with reduced energy, cognitive decline, and many hallmarks of aging.",
    ],
    whatResearchSays: [
      "Multiple human trials show oral NAD+ precursors (NMN, NR) safely increase blood NAD+ levels.",
      "The ENVISAGE trial showed NR supplementation raised NAD+ levels in skeletal muscle.",
      "Animal studies show dramatic lifespan extension and reversal of aging markers with NAD+ restoration.",
      "Human trials show modest but real improvements in muscle function and metabolic markers in older adults.",
      "David Sinclair's lab (Harvard) research has been influential in establishing NAD+'s role in aging biology.",
    ],
    commonUseCases: [
      "Longevity and anti-aging research",
      "Energy optimization",
      "Cognitive performance support",
      "Metabolic health",
    ],
    reportedBenefits: [
      "Increased energy levels",
      "Improved cognitive clarity",
      "Enhanced cellular repair",
      "Improved sleep quality",
    ],
    reportedRisks: [
      "Mild GI discomfort with oral forms",
      "IV NAD+ can cause flushing, nausea during infusion",
      "Theoretical concern about NAD+ fueling cancer cells (under research)",
      "Cost of IV treatments is high",
    ],
    humanStudies: 40,
    animalStudies: 200,
    commonlyStackedWith: ["Epithalon", "MOTS-c"],
    faqs: [
      {
        question: "What is NAD+ and why does it matter?",
        answer:
          "NAD+ is a coenzyme essential for cellular energy production and DNA repair. Its levels decline with age, and researchers believe this decline contributes to many aspects of aging and age-related disease.",
      },
      {
        question: "What is the difference between NAD+, NMN, and NR?",
        answer:
          "NMN (Nicotinamide Mononucleotide) and NR (Nicotinamide Riboside) are precursors that the body converts into NAD+. Direct NAD+ supplementation is less bioavailable orally; NMN and NR are the more commonly used oral supplements.",
      },
      {
        question: "Is IV NAD+ better than oral NMN?",
        answer:
          "IV NAD+ bypasses digestion and delivers NAD+ directly into the bloodstream. However, the evidence that this produces meaningfully better outcomes than oral precursors (at the cost of much higher expense and clinical time) remains limited.",
      },
    ],
    studies: [
      {
        title: "Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women",
        source: "Science",
        url: "https://www.science.org/doi/10.1126/science.abe9985",
        year: 2021,
      },
    ],
    affiliatePlaceholder: "NAD_PLUS",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "mk-677",
    name: "MK-677",
    alsoKnownAs: ["Ibutamoren", "Nutrobal", "L-163,191"],
    tagline: "An oral growth hormone secretagogue — one of the few that doesn't require injection",
    description:
      "MK-677 (Ibutamoren) is an orally active, non-peptide growth hormone secretagogue that mimics ghrelin to stimulate GH and IGF-1 release. It is notable for being effective when taken orally, unlike most GH-releasing compounds.",
    primaryUses: ["Muscle Recovery", "Longevity", "Fat Loss"],
    form: "Oral",
    researchLevel: "Emerging",
    legalStatus:
      "Research chemical. Not FDA-approved for human use. Often sold as a SARM (mislabeled). Not a SARM — it is a GH secretagogue.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Binds to the ghrelin receptor (GHSR) in the pituitary and hypothalamus, stimulating GH release. Its oral bioavailability and long half-life (~24 hours) distinguish it from injectable GH secretagogues.",
    whatItIs: [
      "MK-677 is technically not a peptide — it is a small molecule that mimics ghrelin (the 'hunger hormone') to stimulate GH release from the pituitary. It is commonly discussed alongside peptides in research and biohacking communities.",
      "Its most notable feature is oral bioavailability. Most GH-releasing compounds must be injected because they are destroyed in the digestive tract. MK-677 remains active when taken orally.",
      "It was originally developed by Merck for conditions like muscle wasting, osteoporosis, and growth hormone deficiency, but was never brought to market for these indications.",
    ],
    whatResearchSays: [
      "Human trials show MK-677 significantly increases GH pulse amplitude and IGF-1 levels.",
      "A 2-year trial in elderly adults showed increased lean mass and reduced fat mass.",
      "Studies in hip fracture patients showed improved recovery and muscle strength.",
      "Ongoing research for Alzheimer's disease (based on its effects on sleep architecture).",
      "Concerns raised in one study about insulin resistance with long-term use.",
    ],
    commonUseCases: [
      "GH optimization without injections",
      "Muscle mass and recovery research",
      "Bone density improvement",
      "Sleep quality improvement",
    ],
    reportedBenefits: [
      "Increased GH and IGF-1 levels orally",
      "Improved sleep quality and REM",
      "Muscle mass gains",
      "Improved recovery",
    ],
    reportedRisks: [
      "Significant increase in appetite (ghrelin mimetic effect)",
      "Water retention and bloating",
      "Potential insulin resistance",
      "Elevated cortisol in some studies",
      "Long-term safety unknown",
    ],
    humanStudies: 8,
    animalStudies: 30,
    commonlyStackedWith: ["CJC-1295", "Ipamorelin"],
    faqs: [
      {
        question: "Is MK-677 a SARM?",
        answer:
          "No. MK-677 is frequently mislabeled as a SARM (Selective Androgen Receptor Modulator), but it has no activity at androgen receptors. It is a growth hormone secretagogue that works through the ghrelin receptor.",
      },
      {
        question: "Does MK-677 require a prescription?",
        answer:
          "MK-677 is not an FDA-approved medication and is not available by prescription. It is sold as a research chemical. Purchasing it for personal human use exists in a legal gray area in the US.",
      },
    ],
    studies: [
      {
        title: "Effects of an oral ghrelin mimetic on body composition and clinical outcomes",
        source: "Ann Intern Med",
        url: "https://pubmed.ncbi.nlm.nih.gov/18591579/",
        year: 2008,
      },
    ],
    affiliatePlaceholder: "MK_677",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    alsoKnownAs: ["Copper Peptide", "Glycyl-L-histidyl-L-lysine copper"],
    tagline: "A naturally occurring copper peptide with strong skin regeneration and wound healing research",
    description:
      "GHK-Cu is a naturally occurring tripeptide that complexes with copper ions. It is found in human blood, saliva, and urine and has been studied extensively for skin regeneration, wound healing, and anti-aging applications.",
    primaryUses: ["Skin & Beauty", "Injury Healing", "Longevity"],
    form: "Topical",
    researchLevel: "Emerging",
    legalStatus: "Legal as cosmetic ingredient. Available in topical skincare products.",
    fdaStatus: "Cosmetic Ingredient (topical)",
    mechanismOfAction:
      "Activates tissue remodeling, stimulates collagen and glycosaminoglycan synthesis, promotes wound healing via chemoattraction, and has antioxidant and anti-inflammatory effects.",
    whatItIs: [
      "GHK-Cu is a tripeptide (three amino acids: glycine, histidine, lysine) complexed with a copper ion. It is naturally present in human blood plasma at concentrations that decline with age.",
      "Discovered in the 1970s by Dr. Loren Pickart, GHK-Cu has since accumulated a substantial body of research demonstrating its role in skin regeneration, wound healing, and collagen synthesis.",
      "It is legally available in topical skincare products as a cosmetic ingredient and has a strong safety profile through decades of cosmetic use.",
    ],
    whatResearchSays: [
      "In vitro and in vivo studies show GHK-Cu stimulates collagen, elastin, and glycosaminoglycan production.",
      "Clinical studies demonstrate improvement in skin texture, fine lines, and firmness with topical application.",
      "Wound healing studies show accelerated closure and improved tissue quality.",
      "Research suggests potential anti-tumor and gene-regulating effects — an active area of investigation.",
      "Animal studies indicate possible effects on hair follicle size and hair growth.",
    ],
    commonUseCases: [
      "Skincare and anti-aging topical applications",
      "Wound healing acceleration",
      "Hair restoration research",
      "Collagen stimulation",
    ],
    reportedBenefits: [
      "Improved skin texture and firmness",
      "Reduced appearance of fine lines",
      "Accelerated wound healing",
      "Potential hair growth stimulation",
    ],
    reportedRisks: [
      "Skin irritation in sensitive individuals",
      "Temporary skin discoloration (blue/green from copper — rare)",
      "Generally considered well-tolerated topically",
    ],
    humanStudies: 10,
    animalStudies: 50,
    commonlyStackedWith: ["Epithalon"],
    faqs: [
      {
        question: "What is GHK-Cu used for in skincare?",
        answer:
          "GHK-Cu is used in anti-aging skincare for its ability to stimulate collagen and elastin production, improve skin firmness, and accelerate wound and scar healing. Multiple clinical studies support its topical efficacy.",
      },
      {
        question: "Is GHK-Cu safe to use on skin?",
        answer:
          "Yes. GHK-Cu has been used in cosmetic formulations for decades with a strong safety record. It is FDA-compliant as a cosmetic ingredient. Rare cases of skin irritation have been reported.",
      },
      {
        question: "What's the difference between GHK-Cu and copper peptides in general?",
        answer:
          "GHK-Cu (glycyl-L-histidyl-L-lysine-copper) is the most extensively researched copper peptide complex. 'Copper peptide' is a broader term that includes other peptide-copper complexes, but GHK-Cu has the most clinical evidence.",
      },
    ],
    studies: [
      {
        title: "Copper-GHK peptide stimulates collagen mRNA and skin regeneration",
        source: "Int J Cosmet Sci",
        url: "https://pubmed.ncbi.nlm.nih.gov/1490439/",
        year: 1993,
      },
    ],
    affiliatePlaceholder: "GHK_CU",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    alsoKnownAs: ["Anti-Obesity Drug 9604", "Tyr-hGH Fragment 176-191"],
    tagline: "A fragment of human growth hormone studied specifically for fat metabolism",
    description:
      "AOD-9604 is a modified fragment of human growth hormone (hGH) amino acids 176–191, designed to retain hGH's fat-burning properties while avoiding its effects on blood sugar and growth.",
    primaryUses: ["Fat Loss"],
    form: "Injectable",
    researchLevel: "Experimental",
    legalStatus: "Research chemical. Not FDA-approved. Previously had FDA Investigational New Drug (IND) status.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Mimics the way natural growth hormone regulates fat metabolism — stimulating lipolysis (fat breakdown) and inhibiting lipogenesis (fat formation) without affecting IGF-1 levels or blood glucose.",
    whatItIs: [
      "AOD-9604 is a synthetic peptide fragment derived from the C-terminal region of human growth hormone. It was developed by Metabolic Pharmaceuticals in Australia specifically to isolate the fat-burning properties of GH.",
      "The idea behind AOD-9604 is to capture the lipolytic effects of human growth hormone without its downsides — particularly the insulin resistance and acromegaly concerns associated with full-length hGH use.",
      "It briefly held FDA Investigational New Drug status and progressed to Phase 2 clinical trials before Metabolic Pharmaceuticals discontinued development.",
    ],
    whatResearchSays: [
      "Phase 2 trials showed AOD-9604 did not significantly outperform placebo for weight loss in obese adults.",
      "Animal studies (obese rodents) show significant fat loss with AOD-9604.",
      "Does not affect IGF-1 levels or blood glucose — distinguishing it from full-length hGH.",
      "The gap between animal data and human trial data remains unresolved.",
    ],
    commonUseCases: [
      "Fat loss research",
      "Body composition optimization",
      "Research into GH fragment effects",
    ],
    reportedBenefits: [
      "Potential fat reduction without IGF-1 or blood sugar effects",
      "May complement other GH peptides",
      "Well-tolerated in trials",
    ],
    reportedRisks: [
      "Clinical evidence of efficacy in humans is weak",
      "Injection site reactions",
      "Limited long-term data",
    ],
    humanStudies: 4,
    animalStudies: 15,
    commonlyStackedWith: ["CJC-1295", "Ipamorelin"],
    faqs: [
      {
        question: "Does AOD-9604 actually work for fat loss?",
        answer:
          "Animal studies show promising fat loss effects, but the Phase 2 human trials did not demonstrate significant weight loss versus placebo. Its use for fat loss in humans lacks strong clinical support.",
      },
    ],
    studies: [
      {
        title: "The use of a fragment of human growth hormone in obesity treatment",
        source: "Obes Res",
        url: "https://pubmed.ncbi.nlm.nih.gov/11173926/",
        year: 2001,
      },
    ],
    affiliatePlaceholder: "AOD_9604",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "selank",
    name: "Selank",
    alsoKnownAs: ["TP-7"],
    tagline: "A Russian-developed anxiolytic peptide with nootropic and immune-modulating properties",
    description:
      "Selank is a synthetic analog of tuftsin — an endogenous tetrapeptide derived from IgG immunoglobulin — developed by the Institute of Molecular Genetics (Russian Academy of Sciences) and approved in Russia for anxiety and cognitive enhancement.",
    primaryUses: ["Cognitive Performance"],
    form: "Nasal",
    researchLevel: "Emerging",
    legalStatus: "Approved in Russia. Research chemical status in the US.",
    fdaStatus: "Research Only (US)",
    mechanismOfAction:
      "Modulates the expression of BDNF (brain-derived neurotrophic factor) and serotonin, influences GABAergic transmission (like benzodiazepines but without dependence), and modulates the immune system through IL-6.",
    whatItIs: [
      "Selank is a heptapeptide (7 amino acid) analog of tuftsin, a naturally occurring peptide fragment of the heavy chain of IgG immunoglobulin.",
      "Developed in Russia in the 1990s and approved there as a prescription drug for anxiety and depression, Selank has a longer track record of clinical use in Russia than almost any peptide on this list.",
      "It is typically administered as a nasal spray, which provides rapid CNS delivery without injection.",
    ],
    whatResearchSays: [
      "Russian clinical trials show anxiolytic effects comparable to benzodiazepines without sedation or dependence potential.",
      "Studies indicate improved cognitive function, memory, and attention in healthy volunteers.",
      "Research shows upregulation of BDNF — a neuroprotective growth factor.",
      "Immune-modulating effects shown in multiple studies.",
      "Western peer-reviewed literature is limited; most research originates from Russian institutions.",
    ],
    commonUseCases: [
      "Anxiety reduction without sedation",
      "Cognitive performance enhancement",
      "Immune system modulation",
      "Neuroprotective research",
    ],
    reportedBenefits: [
      "Reduced anxiety without drowsiness",
      "Improved memory and focus",
      "Enhanced mood stability",
      "Immune modulation",
    ],
    reportedRisks: [
      "Limited Western clinical data",
      "Unknown long-term safety profile",
      "Nasal irritation possible",
      "Research chemical status in US",
    ],
    humanStudies: 6,
    animalStudies: 25,
    commonlyStackedWith: ["Semax"],
    faqs: [
      {
        question: "Is Selank like a benzodiazepine?",
        answer:
          "Selank acts on some of the same GABAergic pathways as benzodiazepines but is not a benzodiazepine. Russian studies suggest it produces anxiolytic effects without the sedation, tolerance, or dependence associated with benzos.",
      },
    ],
    studies: [
      {
        title: "Selank, a synthetic peptide, modulates BDNF and immune gene expression",
        source: "Bull Exp Biol Med",
        url: "https://pubmed.ncbi.nlm.nih.gov/17369891/",
        year: 2007,
      },
    ],
    affiliatePlaceholder: "SELANK",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "semax",
    name: "Semax",
    alsoKnownAs: ["ACTH(4-10) Pro-Gly-Pro", "N-Pro-Gly-Pro"],
    tagline: "A Russian neuropeptide approved for stroke recovery and cognitive enhancement",
    description:
      "Semax is a synthetic analog of the ACTH (adrenocorticotropic hormone) fragment 4-7, extended with a Pro-Gly-Pro sequence. It is approved in Russia for stroke treatment and used for cognitive enhancement.",
    primaryUses: ["Cognitive Performance"],
    form: "Nasal",
    researchLevel: "Emerging",
    legalStatus: "Approved in Russia for stroke. Research chemical in the US.",
    fdaStatus: "Research Only (US)",
    mechanismOfAction:
      "Increases BDNF and NGF (nerve growth factor) expression in the brain, enhances dopaminergic and serotonergic neurotransmission, and improves cerebral blood flow.",
    whatItIs: [
      "Semax is a heptapeptide derived from a fragment of ACTH (adrenocorticotropic hormone). The natural ACTH fragment provides short-lived cognitive effects; Semax adds a Pro-Gly-Pro extension that dramatically increases stability and duration of action.",
      "Approved in Russia as a prescription drug for the treatment of ischemic stroke and traumatic brain injury, Semax has a clinical track record in stroke rehabilitation settings.",
      "Like Selank, it is typically administered as a nasal spray for rapid CNS delivery.",
    ],
    whatResearchSays: [
      "Russian clinical trials show improvements in neurological recovery post-stroke.",
      "Studies demonstrate increased BDNF levels in brain tissue — a key neuroprotective marker.",
      "Research in healthy subjects shows improved attention, working memory, and learning speed.",
      "Animal studies show neuroprotection in ischemia models.",
      "Western peer-reviewed evidence is sparse.",
    ],
    commonUseCases: [
      "Post-stroke neurological recovery",
      "Cognitive enhancement and focus",
      "Neuroprotection research",
      "ADHD symptom management (anecdotal)",
    ],
    reportedBenefits: [
      "Significantly improved focus and mental clarity",
      "Enhanced memory consolidation",
      "Neuroprotective effects",
      "Fast onset via nasal delivery",
    ],
    reportedRisks: [
      "Nasal irritation",
      "Potential overstimulation/anxiety at higher doses",
      "Limited Western safety data",
      "Research chemical in US",
    ],
    humanStudies: 8,
    animalStudies: 30,
    commonlyStackedWith: ["Selank"],
    faqs: [
      {
        question: "What does Semax feel like?",
        answer:
          "Users commonly report a noticeable improvement in focus, motivation, and mental clarity within 30–60 minutes of nasal application. Effects are described as clean (without stimulant side effects) and lasting 6–12 hours.",
      },
    ],
    studies: [
      {
        title:
          "Semax (ACTH(4-10) analogue) stimulates BDNF expression in rat brain structures",
        source: "Peptides",
        url: "https://pubmed.ncbi.nlm.nih.gov/11179749/",
        year: 2001,
      },
    ],
    affiliatePlaceholder: "SEMAX",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    alsoKnownAs: ["Bremelanotide", "Vyleesi"],
    tagline: "An FDA-approved melanocortin agonist for sexual dysfunction — available by prescription",
    description:
      "PT-141 (Bremelanotide) is a synthetic analog of alpha-MSH (alpha-melanocyte-stimulating hormone) that acts on melanocortin receptors in the brain to increase sexual desire. It is FDA-approved as Vyleesi for hypoactive sexual desire disorder (HSDD) in premenopausal women.",
    primaryUses: ["Hormonal Health"],
    form: "Injectable",
    researchLevel: "Well-Studied",
    legalStatus: "FDA-approved as Vyleesi (prescription). Research chemical as PT-141.",
    fdaStatus: "FDA-Approved as Vyleesi (Prescription)",
    mechanismOfAction:
      "Activates melanocortin 3 and 4 receptors (MC3R, MC4R) in the brain — particularly in the hypothalamus and limbic system — to increase sexual motivation and arousal through central (brain-based) rather than peripheral (vascular) mechanisms.",
    whatItIs: [
      "PT-141 is a cyclic heptapeptide that acts on melanocortin receptors in the central nervous system. Its mechanism is fundamentally different from PDE5 inhibitors like sildenafil (Viagra) — it works on the brain rather than on blood vessels.",
      "Originally developed from Melanotan II, PT-141 was isolated for its sexual effects when Melanotan II users reported unexpected increases in sexual arousal.",
      "FDA approved Bremelanotide (Vyleesi) in 2019 specifically for premenopausal women with acquired, generalized HSDD.",
    ],
    whatResearchSays: [
      "Phase 3 trials for Vyleesi (RECONNECT study) showed significant improvement in sexual desire and reduction in distress related to HSDD in premenopausal women.",
      "Studies in men show increased erectile function and sexual desire, though it is not FDA-approved for this indication.",
      "Mechanism is distinct from Viagra — works on brain receptors, not vascular smooth muscle.",
      "More effective for psychological/desire component of sexual dysfunction.",
    ],
    commonUseCases: [
      "Hypoactive sexual desire disorder (HSDD) in women",
      "Male sexual dysfunction research",
      "Sexual motivation and desire enhancement",
    ],
    reportedBenefits: [
      "Increased sexual desire and arousal",
      "Effective for psychological sexual dysfunction",
      "Works in both men and women (studied)",
      "Fast-acting (45–90 minutes onset)",
    ],
    reportedRisks: [
      "Nausea (very common — ~40% in trials)",
      "Flushing",
      "Transient hypertension",
      "Hyperpigmentation with repeated use",
    ],
    humanStudies: 15,
    animalStudies: 20,
    commonlyStackedWith: [],
    faqs: [
      {
        question: "Is PT-141 the same as Vyleesi?",
        answer:
          "Yes. Vyleesi is the brand name for bremelanotide, the same compound as PT-141. The FDA-approved version (Vyleesi) is specifically indicated for premenopausal women with HSDD at a controlled dose.",
      },
      {
        question: "How does PT-141 differ from Viagra?",
        answer:
          "PT-141 works in the brain on melanocortin receptors to increase sexual desire and motivation. Viagra works in the genitals on PDE5 enzymes to increase blood flow. PT-141 targets the psychological component; Viagra targets the physical/vascular component.",
      },
    ],
    studies: [
      {
        title: "Bremelanotide for Hypoactive Sexual Desire Disorder (RECONNECT)",
        source: "Obstet Gynecol",
        url: "https://pubmed.ncbi.nlm.nih.gov/30306888/",
        year: 2019,
      },
    ],
    affiliatePlaceholder: "PT_141",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    alsoKnownAs: ["Epitalon", "Epithalamin", "Ala-Glu-Asp-Gly"],
    tagline: "A tetrapeptide studied for telomere extension and anti-aging effects",
    description:
      "Epithalon is a synthetic tetrapeptide (4 amino acids) derived from the pineal gland extract Epithalamin. It is most studied for its ability to activate telomerase — the enzyme that extends telomere length — making it a central focus of longevity research.",
    primaryUses: ["Longevity"],
    form: "Injectable",
    researchLevel: "Experimental",
    legalStatus: "Research chemical. Not FDA-approved for human use.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Activates telomerase enzyme, which can extend telomeres (the protective caps on chromosomes that shorten with each cell division). Also shown to regulate melatonin secretion via the pineal gland and restore circadian rhythm.",
    whatItIs: [
      "Epithalon is derived from Epithalamin — a polypeptide extract from bovine pineal gland that has been studied since the 1980s by Professor Vladimir Khavinson and colleagues at the Institute of Bioregulation and Gerontology in St. Petersburg, Russia.",
      "The primary claim to fame for Epithalon is its ability to activate telomerase — the enzyme responsible for rebuilding telomeres. Telomere shortening is one of the hallmarks of cellular aging described in the seminal aging biology literature.",
      "Most of the research comes from Russian institutions, and the quality and replication of studies varies.",
    ],
    whatResearchSays: [
      "In vitro studies show Epithalon activates telomerase and extends telomere length in human somatic cells.",
      "Animal studies show increased maximum lifespan and reduced tumor incidence in treated mice.",
      "Research demonstrates restoration of melatonin secretion in elderly subjects (small human studies).",
      "Some human studies show normalization of immune function in elderly patients.",
      "Western replication of many findings is lacking.",
    ],
    commonUseCases: [
      "Longevity and anti-aging research",
      "Telomere extension investigation",
      "Sleep and circadian rhythm research",
      "Immune function in aging",
    ],
    reportedBenefits: [
      "Potential telomere lengthening",
      "Improved sleep quality (melatonin regulation)",
      "Enhanced immune function in elderly",
      "Possible cancer-protective effects",
    ],
    reportedRisks: [
      "Theoretical concerns about cancer risk (telomerase activation — under debate)",
      "Limited Western safety data",
      "Most human research from single research group",
      "Injection site reactions",
    ],
    humanStudies: 5,
    animalStudies: 30,
    commonlyStackedWith: ["NAD+", "GHK-Cu"],
    faqs: [
      {
        question: "Does Epithalon actually extend telomeres?",
        answer:
          "In vitro studies show Epithalon activates telomerase and extends telomere length in human cells. Whether this translates to meaningful anti-aging effects in living humans has not been established by large-scale clinical trials.",
      },
      {
        question: "Is Epithalon safe?",
        answer:
          "The available Russian research suggests a good safety profile in older subjects. However, there is a theoretical concern that activating telomerase could promote cancer cell survival. Western safety data is limited.",
      },
    ],
    studies: [
      {
        title: "Effect of Epithalon on telomere length in human fetal fibroblasts",
        source: "Bull Exp Biol Med",
        url: "https://pubmed.ncbi.nlm.nih.gov/12515023/",
        year: 2003,
      },
    ],
    affiliatePlaceholder: "EPITHALON",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    alsoKnownAs: ["Tα1", "Thymalfasin", "Zadaxin"],
    tagline: "An immunomodulating peptide approved in 40+ countries for immune support",
    description:
      "Thymosin Alpha-1 is a naturally occurring 28-amino acid peptide derived from the thymus gland. It is approved in over 40 countries (as Zadaxin) for hepatitis B, hepatitis C, and immune deficiency — and has been studied for COVID-19 and cancer immunotherapy.",
    primaryUses: ["Longevity", "Injury Healing"],
    form: "Injectable",
    researchLevel: "Well-Studied",
    legalStatus:
      "Approved in 40+ countries as Zadaxin. Not FDA-approved in the US — available as research chemical.",
    fdaStatus: "Approved internationally (Zadaxin). Research Only in US.",
    mechanismOfAction:
      "Enhances T-cell development and differentiation, upregulates MHC class I expression, promotes cytokine production (IL-2, INF-γ), and restores immune function in immunocompromised patients.",
    whatItIs: [
      "Thymosin Alpha-1 (Tα1) is a naturally occurring peptide produced by the thymus gland — the organ responsible for T-cell maturation. It was first isolated by Dr. Allan Goldstein in the 1970s.",
      "Unlike most peptides on this list, Tα1 has extensive clinical trial data and regulatory approval in over 40 countries. It is sold as Zadaxin (SciClone Pharmaceuticals) for chronic hepatitis B and C treatment and immune deficiency.",
      "During COVID-19, thymosin alpha-1 was used in China as part of treatment protocols with reported benefits in severe cases.",
    ],
    whatResearchSays: [
      "Multiple RCTs support Tα1's efficacy in improving immune response in chronic hepatitis B and C.",
      "Studies show restoration of T-cell function in elderly and immunocompromised patients.",
      "Cancer research shows improved outcomes when combined with conventional chemotherapy.",
      "Studies in COVID-19 patients suggest reduced severity and mortality.",
      "The IRCT trial showed improved survival in septic shock patients.",
    ],
    commonUseCases: [
      "Immune system restoration",
      "Chronic viral infection treatment (hepatitis B/C)",
      "Cancer immunotherapy adjunct",
      "General immune enhancement",
    ],
    reportedBenefits: [
      "Enhanced T-cell function and immune response",
      "Improved outcomes in chronic infections",
      "Potential anti-cancer effects",
      "Better immune recovery post-illness",
    ],
    reportedRisks: [
      "Generally well-tolerated in clinical trials",
      "Injection site reactions",
      "Rare allergic reactions",
      "Not FDA-approved (US)",
    ],
    humanStudies: 40,
    animalStudies: 80,
    commonlyStackedWith: ["BPC-157"],
    faqs: [
      {
        question: "Is Thymosin Alpha-1 FDA-approved?",
        answer:
          "Not in the US. It is FDA-designated as an Orphan Drug and has been studied in US trials but is not currently FDA-approved. It is approved as Zadaxin in over 40 other countries for hepatitis and immune conditions.",
      },
    ],
    studies: [
      {
        title: "Thymalfasin (thymosin alpha-1) treatment in chronic hepatitis B",
        source: "Hepatology",
        url: "https://pubmed.ncbi.nlm.nih.gov/10022436/",
        year: 1999,
      },
    ],
    affiliatePlaceholder: "THYMOSIN_ALPHA_1",
    lastUpdated: "2026-05-01",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    alsoKnownAs: ["Mitochondrial ORF of the 12S rRNA type-c"],
    tagline: "A mitochondria-derived peptide that regulates metabolism and may extend healthy lifespan",
    description:
      "MOTS-c is a mitochondrial-derived peptide (MDP) encoded in the mitochondrial genome. It was discovered in 2015 and is being studied for its role in metabolic regulation, exercise mimicry, and longevity.",
    primaryUses: ["Longevity", "Fat Loss"],
    form: "Injectable",
    researchLevel: "Experimental",
    legalStatus: "Research chemical. Very new — no regulatory status.",
    fdaStatus: "Research Only",
    mechanismOfAction:
      "Activates AMPK (AMP-activated protein kinase) — the master metabolic regulator — promotes glucose metabolism, improves insulin sensitivity, and translocates to the nucleus during stress to regulate adaptive gene expression.",
    whatItIs: [
      "MOTS-c is a recently discovered class of peptide — a mitochondrial-derived peptide (MDP) — encoded in the mitochondrial genome's 12S rRNA region. This makes it unique: unlike nuclear-encoded peptides, MOTS-c is produced by mitochondria themselves.",
      "Discovered in 2015 by Dr. Changhan David Lee at USC, MOTS-c has rapidly attracted significant scientific interest because of its broad metabolic effects and potential role in the biology of aging.",
      "It is one of the newest peptides in research circles with the least amount of human data — but the mechanistic data is compelling.",
    ],
    whatResearchSays: [
      "Animal studies demonstrate MOTS-c prevents age-related weight gain and metabolic dysfunction.",
      "Research shows MOTS-c mimics some effects of exercise on metabolism — earning it the label 'exercise in a bottle' in popular science coverage.",
      "Studies show improved insulin sensitivity and glucose metabolism in obese and diabetic mouse models.",
      "MOTS-c levels decline with age in humans — a correlation that is actively researched.",
      "No completed human clinical trials as of 2026.",
    ],
    commonUseCases: [
      "Metabolic health and insulin sensitivity research",
      "Longevity and anti-aging protocols",
      "Exercise performance research",
      "Obesity research",
    ],
    reportedBenefits: [
      "Improved metabolic efficiency",
      "Potential insulin sensitizing effects",
      "Enhanced physical performance",
      "Possible longevity benefits",
    ],
    reportedRisks: [
      "Extremely limited human safety data",
      "Research is very early-stage",
      "Injection only (not orally bioavailable)",
      "Unknown long-term effects",
    ],
    humanStudies: 1,
    animalStudies: 15,
    commonlyStackedWith: ["NAD+", "Epithalon"],
    faqs: [
      {
        question: "What makes MOTS-c different from other peptides?",
        answer:
          "MOTS-c is encoded in the mitochondrial genome — not the nuclear genome like most peptides. This makes it a truly mitochondrial-derived signal that regulates metabolism in a fundamentally different way from most other research peptides.",
      },
    ],
    studies: [
      {
        title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline",
        source: "Nature Communications",
        url: "https://pubmed.ncbi.nlm.nih.gov/33795675/",
        year: 2021,
      },
    ],
    affiliatePlaceholder: "MOTS_C",
    lastUpdated: "2026-05-01",
  },
];

export default peptides;

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

export function getAllPeptideSlugs(): string[] {
  return peptides.map((p) => p.slug);
}

export function getPeptidesByGoal(goal: Goal): Peptide[] {
  return peptides.filter((p) => p.primaryUses.includes(goal));
}

export function getPeptidesByResearchLevel(level: ResearchLevel): Peptide[] {
  return peptides.filter((p) => p.researchLevel === level);
}

export function getPeptidesByForm(form: PeptideForm): Peptide[] {
  return peptides.filter((p) => p.form === form || p.form.includes(form));
}
