-- ============================================================
-- PeptidesMasters — Supabase Schema
-- Run this entire file in the Supabase SQL Editor (one shot)
-- ============================================================

-- ── Articles table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            text        UNIQUE NOT NULL,
  title           text        NOT NULL,
  category        text        NOT NULL,
  summary         text        NOT NULL,
  published_at    date        NOT NULL,
  read_time       integer     NOT NULL,
  tags            text[]      NOT NULL DEFAULT '{}',
  content         jsonb       NOT NULL DEFAULT '[]',
  related_slugs   text[]      NOT NULL DEFAULT '{}',
  affiliate_peptide text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ── Emails table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS emails (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email           text        UNIQUE NOT NULL,
  welcome_sent    boolean     DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails   ENABLE ROW LEVEL SECURITY;

-- Anyone can read articles (public site)
CREATE POLICY "articles_public_read"  ON articles FOR SELECT USING (true);
-- Only authenticated users (admin) can write articles
CREATE POLICY "articles_admin_write"  ON articles FOR ALL    USING (auth.role() = 'authenticated');

-- Emails are server-only (service role only — no RLS policy needed for anon)
CREATE POLICY "emails_admin_only"     ON emails   FOR ALL    USING (auth.role() = 'authenticated');

-- ── Auto-update updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Seed: migrate existing 10 articles
-- ============================================================

INSERT INTO articles (slug, title, category, summary, published_at, read_time, tags, content, related_slugs, affiliate_peptide) VALUES

(
  'bpc-157-complete-research-review',
  'BPC-157: Everything the Research Says About This Peptide',
  'Research Deep Dives',
  'BPC-157 is one of the most-discussed peptides in research communities. Here''s an objective look at what the science actually says — animal models, mechanisms, and the evidence gap.',
  '2026-04-15', 12,
  ARRAY['BPC-157','Injury Healing','Research'],
  '[
    {"heading":"What Is BPC-157?","body":"BPC-157 stands for Body Protection Compound-157 — a 15-amino acid peptide derived from a protective protein found in human gastric juice. It is entirely synthetic and does not occur naturally at the concentrations used in research. Researchers became interested in BPC-157 after observing that the stomach''s inner lining (which is constantly exposed to acid) has a remarkable ability to repair itself. The thinking: what if the protein responsible for that self-repair could be isolated and applied elsewhere in the body?"},
    {"heading":"What the Animal Research Shows","body":"The majority of BPC-157 research has been conducted in rodents. Studies consistently show accelerated healing of tendons, ligaments, and muscles — with some of the most dramatic results seen in surgically severed Achilles tendons in rats. Researchers have also documented reduced inflammation, improved blood vessel formation (angiogenesis), and protective effects on gut tissue, including protection against NSAID-induced ulcers. The breadth of effects across different tissue types is part of what makes BPC-157 so interesting to researchers.","sources":[{"label":"Sikiric et al. (2014) - BPC 157 healing review","url":"https://pubmed.ncbi.nlm.nih.gov/24099640/"}]},
    {"heading":"The Evidence Gap: No Human Clinical Trials","body":"Here is the most important fact about BPC-157 that any responsible source must state clearly: there are no completed, published, double-blind, placebo-controlled human clinical trials for BPC-157 as of 2026. All efficacy data comes from animal studies. The anecdotal reports from humans who have used it — often compelling — are not a substitute for clinical evidence. This doesn''t mean BPC-157 doesn''t work in humans; it means we don''t have the scientific tools yet to confirm or refute its effects in people."},
    {"heading":"Legal and Regulatory Status","body":"BPC-157 is classified as a research chemical in the United States. It is not FDA-approved for human use. It cannot legally be sold as a dietary supplement or drug. It is banned by WADA for competitive athletes. The FDA has taken enforcement action against some peptide sellers who made therapeutic claims. Purchasing BPC-157 as a research chemical exists in a legal gray area — technically legal to buy, but it cannot be legally sold for human consumption."}
  ]'::jsonb,
  ARRAY['are-peptides-legal-us-2026','bpc-157-vs-tb-500'],
  'BPC_157'
),

(
  'are-peptides-legal-us-2026',
  'Are Peptides Legal in the US? The 2026 Breakdown',
  'Legal & Regulatory',
  'The legality of peptides in the US is complex — it depends on the peptide, the claim being made, and how it''s being sold. Here''s a plain-English breakdown of where things stand.',
  '2026-03-20', 8,
  ARRAY['Legal','FDA','Research Chemicals'],
  '[
    {"heading":"The Short Answer","body":"Most research peptides (BPC-157, TB-500, CJC-1295, etc.) are legal to purchase in the US as research chemicals but are not legal to sell for human use. FDA-approved peptides (semaglutide, PT-141/Vyleesi, thymosin alpha-1 variants) are legal with a valid prescription. The line between legal and illegal is drawn by what claims are made, how the product is sold, and whether it''s been approved by the FDA for human therapeutic use."},
    {"heading":"The Research Chemical Classification","body":"Most peptides on this site fall under what is commonly called ''research chemical'' status. This means they are legal to purchase and possess for scientific research purposes but cannot legally be marketed, sold, or labeled for human consumption. The FDA''s position is that selling these compounds with claims like ''for muscle recovery'' or ''take 200mcg before bed'' constitutes selling an unapproved drug — which is a regulatory violation."},
    {"heading":"Compounded Peptides: The Gray Area","body":"Compounding pharmacies have historically been able to produce certain peptides for prescriptions. However, in 2023–2024, the FDA added many popular peptides (including BPC-157 and TB-500) to its Category 2 list of ''Difficult to Compound'' substances, effectively preventing compounding pharmacies from making them. This significantly affected the availability of high-quality compounded peptides through legitimate medical channels."},
    {"heading":"FDA-Approved Peptides","body":"Some peptides have full FDA approval and are legal with a prescription. These include: Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), PT-141/Bremelanotide (Vyleesi), Sermorelin (various brands), and several others. For these, the legal pathway is clear: see a licensed healthcare provider, get a prescription, fill it at a licensed pharmacy."}
  ]'::jsonb,
  ARRAY['legal-disclaimer','how-to-read-coa'],
  NULL
),

(
  'bpc-157-vs-tb-500',
  'BPC-157 vs TB-500: Which Does What?',
  'Comparisons',
  'BPC-157 and TB-500 are often stacked together — but they work differently. Here''s a clear breakdown of each, where the research points, and why people combine them.',
  '2026-04-01', 9,
  ARRAY['BPC-157','TB-500','Injury Healing','Comparison'],
  '[
    {"heading":"Two Different Mechanisms","body":"BPC-157 and TB-500 are frequently discussed together because both are researched for healing and recovery — but they work through entirely different pathways. BPC-157 is derived from a gastric protective protein and works by upregulating growth hormone receptors and promoting angiogenesis locally at the injury site. TB-500 (Thymosin Beta-4) works more systemically — it promotes actin polymerization, cell migration, and tissue remodeling throughout the body."},
    {"heading":"BPC-157: Local Healing Powerhouse","body":"The animal data on BPC-157 is particularly strong for tendon and ligament healing. Rat studies show it accelerates recovery from surgically severed Achilles tendons significantly faster than controls. It also shows gut-protective effects and potential neuroprotective properties. Its mechanism appears to be more locally directed — working at or near the site of injury or administration."},
    {"heading":"TB-500: Systemic Repair and Inflammation","body":"TB-500''s Thymosin Beta-4 is naturally present throughout the body and has been studied in human cardiac repair trials. Its effects appear more systemic — reducing inflammation body-wide, promoting cell migration to injury sites, and supporting tissue remodeling. It has the most clinical human trial data of the two, primarily from cardiac applications."},
    {"heading":"Why People Stack Them","body":"The reasoning behind combining BPC-157 and TB-500 is that their complementary mechanisms may produce additive or synergistic effects: BPC-157 drives local angiogenesis and growth factor upregulation while TB-500 manages systemic inflammation and promotes cell migration. There is no clinical data on the combination — but the theoretical rationale is logical based on each compound''s individual mechanism."}
  ]'::jsonb,
  ARRAY['bpc-157-complete-research-review','are-peptides-legal-us-2026'],
  'BPC_157'
),

(
  'what-is-semaglutide',
  'What Is Semaglutide and How Does It Work?',
  'Research Deep Dives',
  'Semaglutide is the most clinically validated peptide for weight loss, with human trial data involving tens of thousands of participants. Here''s everything the research says.',
  '2026-04-10', 10,
  ARRAY['Semaglutide','Fat Loss','FDA-Approved'],
  '[
    {"heading":"The GLP-1 System","body":"Semaglutide works by mimicking a hormone called GLP-1 (glucagon-like peptide-1) — a naturally occurring hormone released by your gut in response to eating. GLP-1 does several things: it tells your pancreas to release insulin, it slows digestion so nutrients absorb more slowly, and critically, it sends satiety signals to your brain. Semaglutide mimics GLP-1 but lasts much longer — the natural hormone degrades in 2 minutes; semaglutide lasts approximately one week."},
    {"heading":"The STEP Trials: Clinical Evidence","body":"The STEP trial program is the most comprehensive weight loss clinical trial data available for any peptide. In STEP 1, 1,961 adults with obesity received weekly semaglutide 2.4mg or placebo for 68 weeks. The semaglutide group lost an average of 14.9% of body weight; placebo group lost 2.4%. In STEP 4, stopping semaglutide resulted in regaining two-thirds of the lost weight within one year — highlighting the chronic nature of treatment.","sources":[{"label":"Wilding et al. (2021) - STEP 1 Trial, NEJM","url":"https://www.nejm.org/doi/full/10.1056/NEJMoa2032183"}]},
    {"heading":"Cardiovascular Benefits: The SELECT Trial","body":"In 2023, the SELECT trial published results showing semaglutide 2.4mg reduced major cardiovascular events (heart attack, stroke, cardiovascular death) by 20% in overweight or obese adults without diabetes. This was a landmark finding that expanded semaglutide''s evidence base beyond weight loss alone and prompted the FDA to approve this cardiovascular indication."}
  ]'::jsonb,
  ARRAY['nad-vs-nmn-difference','are-peptides-legal-us-2026'],
  NULL
),

(
  'best-peptides-muscle-recovery-2026',
  'The Best-Researched Peptides for Muscle Recovery in 2026',
  'Goal Guides',
  'Not all recovery peptides are created equal. This guide ranks peptides by quality of evidence for muscle recovery, from well-studied to experimental.',
  '2026-03-01', 11,
  ARRAY['Muscle Recovery','BPC-157','TB-500','CJC-1295','Ipamorelin'],
  '[
    {"heading":"How We Ranked These","body":"Peptides are ranked here by quality and quantity of relevant evidence — prioritizing human clinical data where it exists, then animal models, with anecdotal reports noted but not used for ranking. We also consider legal status and practical accessibility."},
    {"heading":"Tier 1: Strong Evidence (Human Trials)","body":"Sermorelin and semaglutide both have significant human trial data relevant to body composition. While semaglutide is primarily studied for fat loss, its lean mass preservation effects are documented. Thymosin Alpha-1 has human data for immune support that may complement recovery in immunocompromised individuals."},
    {"heading":"Tier 2: Strong Animal Evidence, Limited Human Data","body":"BPC-157 and TB-500 both have compelling animal research for tissue repair and recovery. The animal data is extensive and mechanistically plausible, but neither has completed human trials specifically for muscle recovery. CJC-1295 has human trial data for GH elevation, with body composition as a secondary endpoint."},
    {"heading":"Tier 3: Emerging and Experimental","body":"Ipamorelin, MK-677, and MOTS-c round out the list. Ipamorelin and MK-677 have limited human data on GH elevation. MOTS-c is the most experimental — compelling animal data, essentially no human trial data yet."}
  ]'::jsonb,
  ARRAY['bpc-157-vs-tb-500','cjc-1295-vs-ipamorelin'],
  'BPC_157'
),

(
  'peptides-for-skin-what-science-says',
  'Peptides for Skin: What the Science Actually Says',
  'Goal Guides',
  'Skincare brands make big claims about peptides. Here''s what the peer-reviewed literature actually supports — and what''s marketing hype.',
  '2026-02-15', 9,
  ARRAY['Skin & Beauty','GHK-Cu','Collagen','Topical'],
  '[
    {"heading":"Peptides in Skincare: The Hype vs. Reality","body":"The skincare industry loves peptides — partly because they work, and partly because ''peptide complex'' sounds impressive on a label. The truth is more nuanced: some peptides have genuine, peer-reviewed clinical evidence for skin improvement; many do not. The key variables are: which peptide, what concentration, how it''s formulated, and whether it actually penetrates the skin barrier."},
    {"heading":"GHK-Cu: The Best Evidence","body":"GHK-Cu (Copper Peptide) has the strongest evidence base of any cosmetic peptide. Multiple in vitro and small clinical studies show it stimulates collagen production, improves skin elasticity, and accelerates wound healing. A landmark study in the International Journal of Cosmetic Science showed significant improvements in skin density and firmness. It also has decades of cosmetic safety use without significant adverse events.","sources":[{"label":"Pickart & Margolina (2018) - GHK-Cu review","url":"https://pubmed.ncbi.nlm.nih.gov/30083275/"}]},
    {"heading":"Other Peptides Worth Noting","body":"Argireline (Acetyl hexapeptide-3) has modest clinical evidence for wrinkle reduction, though much less than GHK-Cu. Palmitoyl pentapeptide-4 (Matrixyl) has some in vitro evidence for collagen stimulation. The challenge with most skincare peptides is that formulation matters enormously — a peptide that can''t penetrate the stratum corneum won''t reach the dermis where collagen-producing fibroblasts live."}
  ]'::jsonb,
  ARRAY['bpc-157-complete-research-review','epithalon-telomeres'],
  'GHK_CU'
),

(
  'how-to-read-coa',
  'How to Read a Peptide Certificate of Analysis (COA)',
  'Education',
  'A COA is your primary tool for evaluating peptide purity. Here''s exactly what to look for — and what red flags mean.',
  '2026-01-20', 7,
  ARRAY['Sourcing','COA','Purity','Safety'],
  '[
    {"heading":"What Is a COA?","body":"A Certificate of Analysis (COA) is a document issued by a laboratory (ideally independent and third-party) that certifies the identity, purity, and quantity of a compound. For research peptides, a COA should confirm: the peptide is what the seller claims it is, the purity percentage, the absence of contaminants (endotoxins, heavy metals, residual solvents), and the quantity per vial."},
    {"heading":"What to Look For","body":"Key elements of a trustworthy COA: (1) Issued by a third-party lab (not the manufacturer''s own lab). (2) Purity >98% by HPLC (High-Performance Liquid Chromatography). (3) Correct molecular weight confirmed by mass spectrometry. (4) Endotoxin testing (Limulus Amebocyte Lysate or recombinant Factor C) — critical for injectable peptides. (5) The COA should be dated and reference a specific lot number that matches the product you received."},
    {"heading":"Red Flags","body":"Red flags on or around a COA: No third-party testing. COA is a generic document with no lot number. Purity listed below 95%. No endotoxin testing for injectables. COA is undated or from years ago. The lab name is vague or not independently verifiable. Sellers who refuse to share COAs or make them difficult to find."}
  ]'::jsonb,
  ARRAY['are-peptides-legal-us-2026','red-flags-peptide-suppliers'],
  NULL
),

(
  'nad-vs-nmn-difference',
  'NAD+ vs NMN: What''s the Difference?',
  'Comparisons',
  'NAD+, NMN, NR — the longevity supplement world is full of acronyms. Here''s a clear breakdown of what each is, how they relate, and what the research says about each.',
  '2026-03-10', 8,
  ARRAY['NAD+','NMN','Longevity','Comparison'],
  '[
    {"heading":"The NAD+ Pathway","body":"NAD+ (Nicotinamide Adenine Dinucleotide) is the end product — the active coenzyme your cells use. NMN (Nicotinamide Mononucleotide) and NR (Nicotinamide Riboside) are precursors that your body converts into NAD+. Think of NAD+ as the destination and NMN/NR as two different roads to get there. You can also supplement NAD+ directly, but it has poor oral bioavailability — most is broken down before reaching cells."},
    {"heading":"What Does the Research Say?","body":"NMN and NR have the strongest human trial evidence for raising blood NAD+ levels — both work. A landmark 2021 Science study showed NMN increased NAD+ levels in skeletal muscle of premenopausal women and improved insulin sensitivity. A 2022 Cell Reports Medicine study showed NMN improved aerobic capacity in amateur runners. NR has been shown in multiple trials to raise whole blood NAD+ levels safely.","sources":[{"label":"Yoshino et al. (2021) - NMN trial, Science","url":"https://www.science.org/doi/10.1126/science.abe9985"}]},
    {"heading":"NMN vs NR: Which Is Better?","body":"Both raise NAD+ levels, but the question of which raises levels more effectively in which tissues remains actively debated. NMN appears to have better cellular uptake through a specific transporter (Slc12a8 — discovered in mouse studies). NR is older, has more published human trial data, and is cheaper. For most people starting longevity protocols, NR is a reasonable starting point given its established safety and efficacy profile."}
  ]'::jsonb,
  ARRAY['epithalon-telomeres','best-peptides-muscle-recovery-2026'],
  NULL
),

(
  'cjc-1295-vs-ipamorelin',
  'CJC-1295 and Ipamorelin: Why People Stack Them',
  'Comparisons',
  'The CJC-1295 + Ipamorelin stack is one of the most popular GH-optimizing combinations in research communities. Here''s the science behind why they''re used together.',
  '2026-02-01', 8,
  ARRAY['CJC-1295','Ipamorelin','Growth Hormone','Stacks'],
  '[
    {"heading":"Two Different Pathways","body":"The pituitary gland''s growth hormone output is regulated by two primary inputs: GHRH (Growth Hormone-Releasing Hormone) signals the pituitary to release GH; ghrelin (and its receptor GHSR) amplifies the GH pulse. CJC-1295 mimics GHRH. Ipamorelin mimics ghrelin. Using them together simultaneously activates both stimulatory pathways — producing a larger GH release than either compound alone."},
    {"heading":"CJC-1295 with DAC: The Sustained Release Element","body":"CJC-1295 with DAC has a half-life of approximately 7–8 days, meaning it provides a sustained background stimulation of the pituitary''s GHRH receptors. Human trials published in the Journal of Clinical Endocrinology & Metabolism showed a 2–10 fold increase in GH levels that persisted for over 6 days after a single injection.","sources":[{"label":"Ionescu & Frohman (2006) - CJC-1295 Phase 2 trial","url":"https://pubmed.ncbi.nlm.nih.gov/16822960/"}]},
    {"heading":"Ipamorelin: The Clean Pulse","body":"Ipamorelin adds the ghrelin receptor stimulation component — triggering a pulse of GH release. What makes it particularly suitable for stacking is its selectivity: unlike GHRP-6 (another ghrelin mimetic), Ipamorelin does not significantly raise cortisol or prolactin, which can blunt the anabolic effects of GH release."}
  ]'::jsonb,
  ARRAY['bpc-157-vs-tb-500','best-peptides-muscle-recovery-2026'],
  'CJC_1295'
),

(
  'ftc-peptide-marketing',
  'What the FTC Says About Peptide Marketing (And Why It Matters)',
  'Legal & Regulatory',
  'Peptide supplement and research chemical sellers operate under strict FTC and FDA rules. Understanding these rules helps you spot compliant sellers — and avoid the ones that aren''t.',
  '2026-01-10', 7,
  ARRAY['FTC','Legal','Affiliate','Marketing'],
  '[
    {"heading":"The FTC''s Role","body":"The Federal Trade Commission (FTC) regulates advertising and marketing claims in the US. For peptide sellers, this means all marketing claims must be truthful, not misleading, and substantiated by competent and reliable scientific evidence. Claims like ''heals injuries'' or ''guaranteed to burn fat'' without clinical trial evidence would violate FTC regulations."},
    {"heading":"Research-Only Claims","body":"Legitimate peptide research chemical sellers restrict their marketing to ''for research purposes only'' language and avoid specific therapeutic claims. This is not just a disclaimer — it''s a legal necessity. When a seller makes specific health claims while selling a non-FDA-approved compound, they are potentially selling an unapproved drug, which carries significant legal liability."},
    {"heading":"Affiliate Disclosure Requirements","body":"The FTC''s Endorsement Guides (16 CFR Part 255) require that any material connection between a content creator and the products they recommend be clearly disclosed. This includes affiliate relationships. Content sites like this one are required by law to disclose affiliate relationships in a clear and conspicuous manner. PeptidesMasters.com complies with this requirement — all affiliate links are clearly labeled."}
  ]'::jsonb,
  ARRAY['are-peptides-legal-us-2026','how-to-read-coa'],
  NULL
)

ON CONFLICT (slug) DO NOTHING;
