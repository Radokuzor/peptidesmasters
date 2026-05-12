export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  relatedLink?: string;
  relatedLinkText?: string;
}

const faqs: FAQItem[] = [
  // Basics
  {
    question: "What are peptides?",
    answer:
      "Peptides are short chains of amino acids — the building blocks of proteins. When a chain has fewer than 50 amino acids, it's called a peptide; longer chains are proteins. Your body naturally produces thousands of peptides that act as signaling molecules, regulating everything from hormone release to tissue repair.",
    category: "Basics",
    relatedLink: "/guide",
    relatedLinkText: "Read the full Beginner's Guide",
  },
  {
    question: "What is peptide therapy?",
    answer:
      "Peptide therapy refers to the use of specific peptides — either naturally occurring or synthetic — to trigger desired biological responses in the body. These range from FDA-approved treatments (like semaglutide for weight loss) to experimental research compounds (like BPC-157 for tissue healing). Peptide therapy always requires medical supervision when used clinically.",
    category: "Basics",
    relatedLink: "/guide#what-are-peptides",
    relatedLinkText: "Learn more about peptide therapy",
  },
  {
    question: "What is the difference between peptides and proteins?",
    answer:
      "The distinction is size. Peptides are chains of 2–50 amino acids; proteins are chains longer than 50 amino acids. Biologically, peptides typically act as signaling molecules (hormones, neurotransmitters, growth factors), while proteins perform structural and enzymatic functions. Many peptides used in research are fragments of larger proteins.",
    category: "Basics",
  },
  {
    question: "Are peptides different from steroids?",
    answer:
      "Yes, fundamentally. Steroids are lipid-based molecules derived from cholesterol that act on androgen, estrogen, or glucocorticoid receptors. Peptides are amino acid chains that act on peptide-specific receptors. They have different mechanisms, different side effect profiles, and different legal categories. Peptides do not have the same androgenic effects as anabolic steroids.",
    category: "Basics",
    relatedLink: "/guide#peptides-vs-steroids",
    relatedLinkText: "Peptides vs steroids: full breakdown",
  },
  {
    question: "What is a peptide bond?",
    answer:
      "A peptide bond is the covalent chemical bond that links two amino acids together in a peptide chain. It forms between the carboxyl group (-COOH) of one amino acid and the amino group (-NH2) of another, releasing a water molecule in the process. The peptide backbone of a protein is the repeating sequence of these N-C-C bonds along the chain.",
    category: "Basics",
  },
  {
    question: "How are peptides different from SARMs?",
    answer:
      "SARMs (Selective Androgen Receptor Modulators) are small molecules designed to selectively bind androgen receptors to produce anabolic effects. Peptides are amino acid chains that work through peptide-specific receptors (like GH receptors, melanocortin receptors, or tissue-specific repair pathways). Most peptides do not interact with androgen receptors at all.",
    category: "Basics",
  },
  // Legality
  {
    question: "Are peptides legal?",
    answer:
      "It depends on the peptide. FDA-approved peptides (semaglutide, bremelanotide) are legal with a prescription. Most research peptides (BPC-157, TB-500, CJC-1295) are legal to purchase as research chemicals but cannot legally be sold for human use. Athletes should check WADA's prohibited list — many peptides are banned in competition.",
    category: "Legality",
    relatedLink: "/articles/are-peptides-legal-us-2026",
    relatedLinkText: "The 2026 legal breakdown",
  },
  {
    question: "Are peptides illegal for athletes?",
    answer:
      "Many peptides are prohibited in competitive sports. WADA's Prohibited List includes growth hormone-releasing peptides (GHRPs), growth hormone-releasing hormones (GHRHs), TB-500, BPC-157, and many others. Athletes subject to drug testing should check the current WADA list and consult their sport's governing body before using any compound.",
    category: "Legality",
  },
  {
    question: "What does 'research use only' mean for peptides?",
    answer:
      "'Research use only' (RUO) is a legal classification indicating that a compound is intended for laboratory research, not for human or veterinary use. Sellers use this label to comply with FDA regulations — they can sell the compound legally as a research chemical while avoiding the drug approval process. This does not mean the compound is safe or effective for human use.",
    category: "Legality",
    relatedLink: "/legal",
    relatedLinkText: "See our full legal and regulatory breakdown",
  },
  {
    question: "Can I get peptides through a doctor?",
    answer:
      "For FDA-approved peptides (semaglutide, sermorelin, bremelanotide), yes — a physician can prescribe them. For research peptides, some anti-aging clinics and telemedicine providers operate in gray areas. The FDA has restricted compounding pharmacies from producing many popular research peptides. Always consult a licensed healthcare provider before using any compound.",
    category: "Legality",
  },
  // Safety
  {
    question: "Are peptides safe?",
    answer:
      "Safety varies dramatically by peptide and form. FDA-approved peptides have documented safety profiles from large clinical trials. Research peptides lack human clinical trial data, so their safety in humans is not scientifically established. 'Natural origin' or 'low dose' does not equal safe. Always consult a healthcare provider and do not rely on anecdotal reports for safety decisions.",
    category: "Safety",
    relatedLink: "/guide#safety-basics",
    relatedLinkText: "Safety section of the Beginner's Guide",
  },
  {
    question: "Are peptides bad for you?",
    answer:
      "For FDA-approved peptides used as directed by a physician, the risk-benefit profile is established by clinical trials. For research peptides, we simply don't have sufficient human data to answer this definitively. Known risks include injection site reactions, potential hormonal disruption, and unknown long-term effects. The absence of documented harm is not the same as proven safety.",
    category: "Safety",
  },
  {
    question: "How long does reconstituted peptide last in the fridge?",
    answer:
      "This is a research-context question: most reconstituted peptides (mixed with bacteriostatic water) remain stable in the refrigerator for 4–6 weeks when stored properly (2–8°C, away from light). Stability varies by peptide. For long-term storage, peptide powder should remain lyophilized (freeze-dried) until use.",
    category: "Safety",
  },
  {
    question: "Can you cycle different peptides?",
    answer:
      "Cycling peptide protocols is common in research communities to prevent receptor desensitization and allow natural hormonal rhythms to normalize. Common approaches include on/off cycles (e.g., 12 weeks on, 4 weeks off) or rotating between different compounds. There is no standardized clinical guidance on cycling protocols — this is anecdotal practice.",
    category: "Safety",
  },
  // Sourcing
  {
    question: "Where to inject peptides?",
    answer:
      "In research contexts, most injectable peptides are administered subcutaneously (under the skin, typically in abdominal fat) or intramuscularly. Subcutaneous injection is most common for research peptides. Site selection, technique, and sterility are critical safety considerations for injectable compounds.",
    category: "Sourcing",
  },
  {
    question: "How to find research-grade peptides?",
    answer:
      "Research-grade peptides should come with third-party COAs (Certificates of Analysis) confirming purity, molecular weight, and absence of contaminants. Look for HPLC purity >98%, mass spectrometry confirmation, and endotoxin testing. The COA should be from an independent, verifiable laboratory.",
    category: "Sourcing",
    relatedLink: "/articles/how-to-read-coa",
    relatedLinkText: "How to read a peptide COA",
  },
  {
    question: "Is creatine a peptide?",
    answer:
      "No. Creatine (creatine monohydrate) is a naturally occurring compound made from three amino acids (glycine, arginine, methionine), but it is not a peptide — the amino acids are not linked in a peptide chain. Creatine is classified as a nitrogenous organic acid. It is one of the most extensively studied performance supplements with strong clinical safety and efficacy data.",
    category: "Basics",
  },
  {
    question: "Is tirzepatide a peptide?",
    answer:
      "Yes. Tirzepatide (Mounjaro/Zepbound) is a dual GIP/GLP-1 receptor agonist — a peptide that activates both the GIP and GLP-1 hormone receptors simultaneously. It is FDA-approved for type 2 diabetes and weight management and shows even greater weight loss in trials than semaglutide alone (average ~20-22% body weight loss in SURMOUNT-1).",
    category: "Basics",
    relatedLink: "/compare/semaglutide-vs-tirzepatide",
    relatedLinkText: "Semaglutide vs Tirzepatide comparison",
  },
  {
    question: "What are the best peptides for skin?",
    answer:
      "GHK-Cu (Copper Peptide) has the strongest evidence for topical skin improvement — clinical studies show improvements in skin firmness, elasticity, and wound healing. Argireline (Acetyl hexapeptide-3) has modest evidence for wrinkle reduction. For more aggressive anti-aging, some practitioners explore BPC-157 topically, though evidence for this use is limited.",
    category: "Basics",
    relatedLink: "/articles/peptides-for-skin-what-science-says",
    relatedLinkText: "Peptides for skin: what science says",
  },
  {
    question: "What are peptides good for?",
    answer:
      "Research peptides are studied across a wide range of applications: tissue repair and injury recovery (BPC-157, TB-500), weight loss (semaglutide, tirzepatide), growth hormone optimization (CJC-1295, ipamorelin), longevity (epithalon, NAD+, MOTS-c), cognitive performance (semax, selank), and skin health (GHK-Cu). The strength of evidence varies dramatically by peptide and application.",
    category: "Basics",
    relatedLink: "/peptides",
    relatedLinkText: "Browse the full peptide library",
  },
];

export default faqs;

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqs.filter((f) => f.category === category);
}

export function getAllFAQCategories(): string[] {
  return [...new Set(faqs.map((f) => f.category))];
}
