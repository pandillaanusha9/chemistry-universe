/**
 * Catalyst AI - Chemistry Quiz Service
 * Handles offline dynamic generation of premium chemistry quizzes and modular interface for future AI API integration.
 */

import { generateAIQuiz } from "../../services/apiService";

// A comprehensive pool of high-quality, scientifically accurate Organic Chemistry questions.
// Each category contains 10 rigorous, AP/Undergraduate level MCQs with rich mechanist explanations.
const questionPool = {
  "haloalkanes": [
    {
      id: "ha_1",
      question: "Which of the following alkyl halides undergoes the fastest SN2 reaction with sodium hydroxide?",
      options: [
        "Methyl chloride (CH3Cl)",
        "Ethyl chloride (CH3CH2Cl)",
        "Isopropyl chloride ((CH3)2CHCl)",
        "tert-Butyl chloride ((CH3)3CCl)"
      ],
      correctAnswer: "Methyl chloride (CH3Cl)",
      explanation: "SN2 reactions proceed via a backside attack of the nucleophile on the carbon bearing the leaving group. The reaction is highly sensitive to steric hindrance. Since methyl chloride has the least steric crowding (only three small hydrogens surrounding the carbon), it undergoes SN2 substitution at the fastest rate, whereas tertiary halides like tert-butyl chloride are virtually inert to SN2 due to steric block."
    },
    {
      id: "ha_2",
      question: "What stereochemical outcome is expected when a chiral primary alkyl halide undergoes an SN2 substitution?",
      options: [
        "Complete retention of configuration",
        "Complete inversion of configuration (Walden Inversion)",
        "Racemization (50% inversion, 50% retention)",
        "Loss of optical activity due to elimination"
      ],
      correctAnswer: "Complete inversion of configuration (Walden Inversion)",
      explanation: "The SN2 mechanism is concerted and involves a backside attack. The nucleophile attacks from the side opposite to the leaving group, causing a simultaneous transition state where the other three groups invert like an umbrella in a strong wind. This leads to a 100% inversion of the stereochemical configuration, known as the Walden Inversion."
    },
    {
      id: "ha_3",
      question: "Which solvent is most suitable for promoting an SN1 reaction of an alkyl halide?",
      options: [
        "Acetone (polar aprotic)",
        "Dimethyl sulfoxide (DMSO, polar aprotic)",
        "Water/Ethanol mixture (polar protic)",
        "Hexane (non-polar)"
      ],
      correctAnswer: "Water/Ethanol mixture (polar protic)",
      explanation: "SN1 reactions involve the rate-determining formation of a carbocation intermediate. Polar protic solvents (like water and ethanol) are highly effective because they can stabilize both the cation (via lone pair donation from oxygen) and the anion/leaving group (via hydrogen bonding). Polar aprotic solvents, on the other hand, do not solvate anions well, which favors SN2 by keeping the nucleophile highly active."
    },
    {
      id: "ha_4",
      question: "What is the primary role of dry acetone in the Finkelstein reaction?",
      options: [
        "It acts as a strong nucleophile to attack the alkyl halide.",
        "It precipitates NaCl or NaBr, driving the reaction forward via Le Chatelier's principle.",
        "It protonates the alkyl halide to make it a better leaving group.",
        "It stabilizes the carbocation intermediate."
      ],
      correctAnswer: "It precipitates NaCl or NaBr, driving the reaction forward via Le Chatelier's principle.",
      explanation: "The Finkelstein reaction is an SN2 halogen exchange reaction where an alkyl chloride or bromide reacts with Sodium Iodide (NaI). NaI is highly soluble in acetone, but NaCl and NaBr are insoluble and precipitate out. The precipitation of NaCl/NaBr removes them from the solution, shifting the equilibrium completely to the product side (alkyl iodide) according to Le Chatelier's principle."
    },
    {
      id: "ha_5",
      question: "Which reaction is best suited for the synthesis of alkyl fluorides?",
      options: [
        "Finkelstein Reaction",
        "Swarts Reaction",
        "Wurtz Reaction",
        "Sandmeyer Reaction"
      ],
      correctAnswer: "Swarts Reaction",
      explanation: "Alkyl fluorides are best prepared by heating alkyl chlorides or bromides in the presence of metallic fluorides such as AgF, Hg2F2, CoF3, or SbF3. This is known as the Swarts reaction, which is a key halide exchange method to synthesize organic fluorine compounds that are otherwise difficult to prepare due to the explosive nature of direct fluorination."
    },
    {
      id: "ha_6",
      question: "Why must Grignard reagents (RMgX) be prepared under strictly anhydrous conditions?",
      options: [
        "Water decomposes the ether solvent required for the reaction.",
        "Grignard reagents are highly basic and react instantly with water to form alkanes.",
        "Water oxidizes the magnesium metal, preventing coordination.",
        "Water isomerizes the alkyl group of the reagent."
      ],
      correctAnswer: "Grignard reagents are highly basic and react instantly with water to form alkanes.",
      explanation: "Grignard reagents are highly polar organometallic compounds where the carbon bonded to magnesium carries a strong partial negative charge (carbanion character). Consequently, they are extremely strong bases and nucleophiles. If even a trace of water (or any proton source) is present, the Grignard reagent acts as a base and reacts instantly with the proton to yield a stable alkane (R-H + Mg(OH)X), destroying the reagent."
    },
    {
      id: "ha_7",
      question: "During dehydrohalogenation of 2-bromobutane with alcoholic KOH, what is the major organic product and why?",
      options: [
        "1-Butene, according to Hoffmann's Rule",
        "2-Butene, according to Saytzeff's Rule",
        "Butan-2-ol, according to Markovnikov's Rule",
        "Diethyl ether, via nucleophilic substitution"
      ],
      correctAnswer: "2-Butene, according to Saytzeff's Rule",
      explanation: "Elimination of 2-bromobutane with alcoholic KOH (a strong base) proceeds via the E2 mechanism. According to Saytzeff's (Zaitsev's) rule, in dehydrohalogenation reactions, the preferred product is the highly substituted alkene because it is thermodynamically more stable due to hyperconjugation and resonance. Here, 2-butene (disubstituted) is the major product (~80%) over 1-butene (monosubstituted)."
    },
    {
      id: "ha_8",
      question: "What happens when an alkyl halide is treated with aqueous KOH instead of alcoholic KOH?",
      options: [
        "Substitution takes place to form an alcohol.",
        "Elimination takes place to form an alkene.",
        "No reaction takes place.",
        "A Wurtz coupling reaction is initiated."
      ],
      correctAnswer: "Substitution takes place to form an alcohol.",
      explanation: "Aqueous KOH is highly hydrated. The hydroxide ion (OH-) is strongly solvated by water molecules, which reduces its basic strength but leaves it as an effective nucleophile. Therefore, nucleophilic substitution (forming an alcohol) is the dominant pathway. In contrast, alcoholic KOH contains alkoxide ions (RO-) which are extremely strong bases, favoring beta-elimination (alkene formation)."
    },
    {
      id: "ha_9",
      question: "Which of the following compounds has the highest dipole moment?",
      options: [
        "Methyl fluoride (CH3F)",
        "Methyl chloride (CH3Cl)",
        "Methyl bromide (CH3Br)",
        "Methyl iodide (CH3I)"
      ],
      correctAnswer: "Methyl chloride (CH3Cl)",
      explanation: "Dipole moment (μ) is the product of charge (q) and distance (d). Although fluorine is more electronegative than chlorine (meaning CH3F has a larger partial charge separation), the C-Cl bond length is significantly longer than the C-F bond length. This greater bond distance in CH3Cl outweighs the slightly smaller charge difference, resulting in a higher net dipole moment for CH3Cl (1.86 D) compared to CH3F (1.82 D)."
    },
    {
      id: "ha_10",
      question: "The reaction of ethyl bromide with sodium in dry ether to form n-butane is known as which of the following?",
      options: [
        "Fittig Reaction",
        "Wurtz-Fittig Reaction",
        "Wurtz Reaction",
        "Kolbe's Electrolysis"
      ],
      correctAnswer: "Wurtz Reaction",
      explanation: "The Wurtz reaction involves the coupling of two molecules of alkyl halides when treated with sodium metal in the presence of dry ether. It yields symmetrical alkanes containing twice the number of carbon atoms as the parent halide (2 RX + 2 Na -> R-R + 2 NaX). Here, ethyl bromide (C2H5Br) couples to form n-butane (C4H10)."
    }
  ],
  "haloarenes": [
    {
      id: "har_1",
      question: "Why are haloarenes significantly less reactive than haloalkanes towards nucleophilic substitution?",
      options: [
        "The halogen atom in haloarenes is bonded to an sp3 carbon.",
        "Partial double bond character of the C-X bond due to resonance.",
        "The benzene ring acts as a strong electrophile, shielding the halogen.",
        "Phenyl carbocations are extremely stable, preventing nucleophilic attack."
      ],
      correctAnswer: "Partial double bond character of the C-X bond due to resonance.",
      explanation: "In haloarenes, the lone pairs of electrons on the halogen atom are in conjugation with the pi-electrons of the benzene ring. This resonance results in delocalization, imparting a partial double-bond character to the C-X bond. A double bond is shorter and much stronger than a single bond, making C-X cleavage in haloarenes extremely difficult under ordinary conditions compared to haloalkanes."
    },
    {
      id: "har_2",
      question: "Which of the following compounds will undergo nucleophilic substitution most readily when heated with aqueous NaOH?",
      options: [
        "Chlorobenzene",
        "o-Nitrochlorobenzene",
        "p-Nitrochlorobenzene",
        "2,4,6-Trinitrochlorobenzene (Picryl chloride)"
      ],
      correctAnswer: "2,4,6-Trinitrochlorobenzene (Picryl chloride)",
      explanation: "Nucleophilic substitution in haloarenes is greatly accelerated by the presence of strong electron-withdrawing groups (EWGs) like -NO2 at the ortho and para positions. These groups stabilize the intermediate Meisenheimer complex by delocalizing the negative charge onto the oxygens of the nitro groups. Picryl chloride, having three nitro groups at both ortho and para positions, is so reactive that it undergoes substitution to form picric acid simply by warming with water!"
    },
    {
      id: "har_3",
      question: "What is the role of anhydrous FeCl3 in the electrophilic chlorination of benzene?",
      options: [
        "It acts as a nucleophile to attack the benzene ring.",
        "It acts as a Lewis acid catalyst to generate the electrophile Cl+.",
        "It acts as a reducing agent.",
        "It solvates the benzene molecules."
      ],
      correctAnswer: "It acts as a Lewis acid catalyst to generate the electrophile Cl+.",
      explanation: "Chlorination of benzene is an electrophilic aromatic substitution (EAS). Chlorine molecules (Cl2) are not strong enough electrophiles to disrupt the aromatic stability of benzene on their own. Anhydrous FeCl3 acts as a Lewis acid catalyst by coordinating with one chlorine atom, polarizing the Cl-Cl bond and generating a highly electrophilic chloronium-like species (Cl+ [FeCl4]-) which readily attacks the benzene ring."
    },
    {
      id: "har_4",
      question: "Although chlorine is an electron-withdrawing group via its inductive effect, it directs incoming electrophiles to which positions on a benzene ring?",
      options: [
        "Meta position only",
        "Ortho and para positions only",
        "Equally to all positions",
        "It completely deactivates the ring, blocking all substitutions"
      ],
      correctAnswer: "Ortho and para positions only",
      explanation: "Chlorine has two opposing effects: (1) a strong electron-withdrawing inductive effect (-I) which deactivates the benzene ring, and (2) a weak electron-donating resonance effect (+M) due to its lone pairs. When an electrophile attacks at the ortho or para positions, resonance structures place the positive charge directly on the carbon bearing the chlorine, allowing chlorine to donate its lone pair and share the positive charge. This resonance stabilization is not possible for meta-attack, making chlorine an ortho/para director despite being deactivating."
    },
    {
      id: "har_5",
      question: "The reaction of chlorobenzene with sodium metal and methyl chloride in dry ether to yield toluene is called:",
      options: [
        "Fittig Reaction",
        "Wurtz Reaction",
        "Wurtz-Fittig Reaction",
        "Frankland Reaction"
      ],
      correctAnswer: "Wurtz-Fittig Reaction",
      explanation: "When a mixture of an aryl halide (chlorobenzene) and an alkyl halide (methyl chloride) is treated with sodium metal in dry ether, they couple to form an alkyl-arene (toluene). This variation of the coupling reaction, combining one alkyl and one aryl component, is known as the Wurtz-Fittig reaction."
    },
    {
      id: "har_6",
      question: "Which of the following describes the Gattermann reaction?",
      options: [
        "Reaction of aniline with chloroform and KOH.",
        "Treatment of arenediazonium chloride with copper powder and HCl to form chlorobenzene.",
        "Reaction of chlorobenzene with cuprous cyanide.",
        "Preparation of fluorobenzene using fluoroboric acid."
      ],
      correctAnswer: "Treatment of arenediazonium chloride with copper powder and HCl to form chlorobenzene.",
      explanation: "The Gattermann reaction is a modification of the Sandmeyer reaction. In the Gattermann reaction, an arenediazonium salt is treated with hydrochloric acid (or hydrobromic acid) in the presence of copper powder (instead of cuprous halides) to yield chlorobenzene (or bromobenzene). The yield is generally slightly lower than the Sandmeyer reaction."
    },
    {
      id: "har_7",
      question: "What is the final organic product of the Sandmeyer reaction when benzenediazonium chloride is treated with CuCN/KCN?",
      options: [
        "Chlorobenzene",
        "Benzene",
        "Benzonitrile",
        "Aniline"
      ],
      correctAnswer: "Benzonitrile",
      explanation: "In the Sandmeyer reaction, arenediazonium salts act as excellent precursors for substitution. When benzenediazonium chloride is treated with Cuprous Cyanide (CuCN) in a potassium cyanide solution, the diazonium group (-N2+) is successfully replaced by a cyano group (-CN), yielding Benzonitrile. This is an important conversion because the cyano group can be subsequently hydrolyzed into a carboxylic acid."
    },
    {
      id: "har_8",
      question: "Heating benzenediazonium fluoroborate to yield fluorobenzene is known as which reaction?",
      options: [
        "Swarts Reaction",
        "Finkelstein Reaction",
        "Balz-Schiemann Reaction",
        "Sandmeyer Reaction"
      ],
      correctAnswer: "Balz-Schiemann Reaction",
      explanation: "Direct fluorination of aromatic rings is extremely violent. The Balz-Schiemann reaction is the standard synthetic pathway: aniline is converted to arenediazonium chloride, which is treated with fluoroboric acid (HBF4) to precipitate arenediazonium fluoroborate (ArN2+BF4-). Upon dry heating, this solid salt decomposes thermally to yield fluorobenzene, nitrogen gas, and boron trifluoride (BF3)."
    },
    {
      id: "har_9",
      question: "What intermediate is formed when chlorobenzene is treated with extremely strong bases like sodamide (NaNH2) in liquid ammonia?",
      options: [
        "Benzyne (dehydrobenzene)",
        "Phenyl carbocation",
        "Meisenheimer complex",
        "Phenyl radical"
      ],
      correctAnswer: "Benzyne (dehydrobenzene)",
      explanation: "In the absence of electron-withdrawing groups, nucleophilic substitution on haloarenes can occur via an elimination-addition mechanism under extremely basic conditions (e.g., NaNH2 in liquid NH3). The strong base abstract an ortho-proton, leading to the elimination of the halide ion and forming a highly reactive, short-lived triple-bond intermediate called Benzyne. The nucleophile then adds to either carbon of this triple bond."
    },
    {
      id: "har_10",
      question: "Compare the C-Cl bond lengths of chlorobenzene and cyclohexyl chloride. Which statement is correct?",
      options: [
        "Both bonds are of equal length because they both contain chlorine.",
        "The C-Cl bond in chlorobenzene is shorter due to sp2 hybridization and resonance.",
        "The C-Cl bond in chlorobenzene is longer because of aromatic ring expansion.",
        "The C-Cl bond in cyclohexyl chloride is shorter due to steric ring compression."
      ],
      correctAnswer: "The C-Cl bond in chlorobenzene is shorter due to sp2 hybridization and resonance.",
      explanation: "The C-Cl bond in chlorobenzene is shorter (~1.69 Å) than that in cyclohexyl chloride (~1.77 Å) due to two key factors: (1) Resonance: the delocalization of chlorine's lone pairs creates partial double-bond character. (2) Hybridization: chlorobenzene's carbon is sp2 hybridized (having more s-character, making it smaller and holding electrons closer), while cyclohexyl chloride's carbon is sp3 hybridized."
    }
  ],
  "alcohols": [
    {
      id: "al_1",
      question: "A colorless alcohol reacts immediately with Lucas reagent (conc. HCl + anhydrous ZnCl2) at room temperature to produce turbidity. The alcohol is:",
      options: [
        "Primary (1°)",
        "Secondary (2°)",
        "Tertiary (3°)",
        "Methanol"
      ],
      correctAnswer: "Tertiary (3°)",
      explanation: "Lucas reagent tests for the ease of carbocation formation in an SN1 pathway. Tertiary alcohols form highly stable tertiary carbocations, allowing them to react instantly with conc. HCl to produce insoluble tertiary alkyl chlorides, which appear as immediate turbidity. Secondary alcohols react within 5-10 minutes, while primary alcohols require heating to show any turbidity."
    },
    {
      id: "al_2",
      question: "Which reagent is highly selective for oxidizing a primary alcohol to an aldehyde, preventing further oxidation to a carboxylic acid?",
      options: [
        "Acidified Potassium Dichromate (K2Cr2O7/H2SO4)",
        "Pyridinium Chlorochromate (PCC)",
        "Alkaline Potassium Permanganate (KMnO4)",
        "Hot concentrated Nitric Acid (HNO3)"
      ],
      correctAnswer: "Pyridinium Chlorochromate (PCC)",
      explanation: "PCC is a mild anhydrous oxidizing agent. It oxidizes primary alcohols to aldehydes and secondary alcohols to ketones. Unlike strong aqueous chromium reagents (like Jones reagent) which hydrate the intermediate aldehyde into a gem-diol and oxidize it further to a carboxylic acid, PCC in anhydrous dichloromethane (CH2Cl2) stops cleanly at the aldehyde stage."
    },
    {
      id: "al_3",
      question: "Hydroboration-Oxidation of propene (CH3-CH=CH2) yields which major organic product?",
      options: [
        "Propan-2-ol (Isopropyl alcohol)",
        "Propan-1-ol (n-Propyl alcohol)",
        "1,2-Propanediol",
        "Propionaldehyde"
      ],
      correctAnswer: "Propan-1-ol (n-Propyl alcohol)",
      explanation: "Hydroboration-oxidation is a key method for the synthesis of alcohols. Borane (BH3) adds across the double bond of propene in a concerted syn-addition, with boron adding to the less substituted carbon. Subsequent oxidation with H2O2/NaOH replaces the boron with an -OH group. The net result is the syn-addition of water across the double bond with anti-Markovnikov regioselectivity, yielding Propan-1-ol."
    },
    {
      id: "al_4",
      question: "What is the correct order of acidic strength among the following alcohols?",
      options: [
        "Methanol > Primary > Secondary > Tertiary",
        "Tertiary > Secondary > Primary > Methanol",
        "Secondary > Tertiary > Primary > Methanol",
        "Methanol > Tertiary > Secondary > Primary"
      ],
      correctAnswer: "Methanol > Primary > Secondary > Tertiary",
      explanation: "The acidity of alcohols depends on the stability of the conjugate base, the alkoxide ion (R-O-). Alkyl groups are electron-donating via the inductive effect (+I). As the number of alkyl groups increases (from primary to tertiary), they increase the electron density on the negative oxygen, destabilizing the alkoxide ion and making the parent alcohol less acidic. Thus, methanol is the most acidic, and tertiary alcohols are the least acidic."
    },
    {
      id: "al_5",
      question: "Which alcohol will give a positive iodoform test (yellow precipitate of CHI3 upon warming with I2 and NaOH)?",
      options: [
        "Propan-1-ol",
        "Ethanol",
        "Methanol",
        "Butan-1-ol"
      ],
      correctAnswer: "Ethanol",
      explanation: "The iodoform test is positive for alcohols containing the specific CH3-CH(OH)- grouping (methyl carbinols). Sodium hypoiodite (NaOI, formed from I2 + NaOH) oxidizes the alcohol to a methyl carbonyl (CH3-CO-), which then undergoes halogenation and cleavage to yield a yellow precipitate of Iodoform (CHI3). Among the options, only Ethanol (CH3-CH2-OH) is oxidized to acetaldehyde (CH3-CHO) and satisfies this structural requirement."
    },
    {
      id: "al_6",
      question: "What is the major organic product when ethanol is heated with concentrated H2SO4 at 443 K (170°C)?",
      options: [
        "Diethyl ether",
        "Ethene",
        "Ethyl hydrogen sulfate",
        "Acetaldehyde"
      ],
      correctAnswer: "Ethene",
      explanation: "Dehydration of ethanol with conc. H2SO4 is highly temperature-dependent. At 443 K (170°C), intramolecular dehydration occurs via a carbocation intermediate (E1 pathway), eliminating water to form Ethene as the major product. If the temperature is kept lower at 413 K (140°C) with excess ethanol, intermolecular dehydration dominates, yielding Diethyl ether."
    },
    {
      id: "al_7",
      question: "Which method prepares alcohols from alkenes with Markovnikov orientation but WITHOUT any carbocation rearrangements?",
      options: [
        "Acid-catalyzed hydration",
        "Oxymercuration-Demercuration",
        "Hydroboration-Oxidation",
        "Hydrolysis with aqueous KOH"
      ],
      correctAnswer: "Oxymercuration-Demercuration",
      explanation: "Oxymercuration-Demercuration uses mercuric acetate [Hg(OAc)2] in THF-water to form a cyclic mercurinium ion intermediate. Nucleophilic attack by water occurs at the more substituted carbon (Markovnikov). Because the intermediate is a bridged mercurinium ion rather than a free carbocation, no hydride or methyl shifts (rearrangements) can occur, making it superior to acid-catalyzed hydration for highly branched alkenes."
    },
    {
      id: "al_8",
      question: "During the Victor Meyer test, primary, secondary, and tertiary alcohols produce what colors, respectively?",
      options: [
        "Blue, Red, Colorless",
        "Red, Blue, Colorless",
        "Red, Colorless, Blue",
        "Colorless, Red, Blue"
      ],
      correctAnswer: "Red, Blue, Colorless",
      explanation: "In the Victor Meyer test, the alcohol is converted to an alkyl iodide, reacted with AgNO2 to form a nitroalkane, treated with nitrous acid (HNO2), and made alkaline with NaOH. Primary alcohols form nitrolic acids which dissolve in NaOH to yield a blood-red solution. Secondary alcohols form pseudonitroles which dissolve to give a dark-blue solution. Tertiary alcohols do not react with HNO2 and remain colorless."
    },
    {
      id: "al_9",
      question: "Esterification of an alcohol with a carboxylic acid in the presence of an acid catalyst involves which of the following?",
      options: [
        "Cleavage of the C-O bond of the alcohol.",
        "Cleavage of the O-H bond of the alcohol.",
        "Elimination of hydrogen gas from the acid.",
        "Nucleophilic attack of the carboxylate anion on the alcohol carbon."
      ],
      correctAnswer: "Cleavage of the O-H bond of the alcohol.",
      explanation: "Esterification (Fischer Esterification) is a nucleophilic acyl substitution. Isotopic labeling studies (using Oxygen-18 in the alcohol) prove that the oxygen of the ester product comes entirely from the alcohol. The mechanism involves the nucleophilic attack of the alcohol's oxygen on the protonated carbonyl carbon of the carboxylic acid, meaning the O-H bond of the alcohol undergoes cleavage, while the C-O bond of the acid is cleaved."
    },
    {
      id: "al_10",
      question: "Which of the following compounds has the highest boiling point?",
      options: [
        "Ethanol (CH3CH2OH)",
        "Dimethyl ether (CH3OCH3)",
        "Propane (CH3CH2CH3)",
        "Chloromethane (CH3Cl)"
      ],
      correctAnswer: "Ethanol (CH3CH2OH)",
      explanation: "Ethanol has a significantly higher boiling point (78°C) than its isomer dimethyl ether (-24°C) or propane (-42°C), despite having similar molecular masses. This is due to the presence of the highly polar hydroxyl (-OH) group in ethanol, which allows its molecules to engage in extensive intermolecular hydrogen bonding, forming a strong associative network that requires significant thermal energy to break."
    }
  ],
  "phenols": [
    {
      id: "ph_1",
      question: "Why is phenol significantly more acidic than ethanol?",
      options: [
        "Phenol has a higher molecular weight.",
        "The phenoxide ion is stabilized by resonance, whereas the ethoxide ion is not.",
        "Ethanol has an sp2 hybridized carbon supporting the OH group.",
        "Phenol contains an intramolecular hydrogen bond that releases the proton."
      ],
      correctAnswer: "The phenoxide ion is stabilized by resonance, whereas the ethoxide ion is not.",
      explanation: "When phenol loses a proton, it forms the Phenoxide ion. The negative charge on the phenoxide oxygen is conjugated with the pi-system of the aromatic ring, delocalizing the negative charge over the ortho and para positions of the benzene ring. This resonance makes the phenoxide ion highly stable. In contrast, the conjugate base of ethanol (ethoxide ion) cannot undergo resonance, and the +I effect of the ethyl group destabilizes it, making phenol much more acidic."
    },
    {
      id: "ph_2",
      question: "What is the major product of Kolbe's reaction when sodium phenoxide is heated with carbon dioxide under pressure, followed by acidification?",
      options: [
        "Salicylaldehyde",
        "Salicylic acid (2-hydroxybenzoic acid)",
        "Benzoic acid",
        "Picric acid"
      ],
      correctAnswer: "Salicylic acid (2-hydroxybenzoic acid)",
      explanation: "In Kolbe's (Kolbe-Schmitt) reaction, sodium phenoxide is treated with carbon dioxide (a weak electrophile) under pressure (4-7 atm) at 400 K. The phenoxide ion, being highly activated, undergoes electrophilic substitution at the ortho position. Acidification of the resulting sodium salicylate yields Salicylic acid, which is a key industrial precursor for Aspirin."
    },
    {
      id: "ph_3",
      question: "In the Reimer-Tiemann reaction of phenol with chloroform and aqueous NaOH, what is the active electrophile?",
      options: [
        "Carbocation (CH3+)",
        "Dichlorocarbene (:CCl2)",
        "Trichloromethyl radical (.CCl3)",
        "Carbonate ion (CO3 2-)"
      ],
      correctAnswer: "Dichlorocarbene (:CCl2)",
      explanation: "The Reimer-Tiemann reaction converts phenol to salicylaldehyde. Under highly basic conditions, aqueous NaOH deprotonates chloroform (CHCl3) to form a trichloromethyl carbanion (-CCl3), which rapidly eliminates a chloride ion to generate Dichlorocarbene (:CCl2). Dichlorocarbene is an uncharged but highly electrophilic species with an incomplete carbon octet, which selectively attacks the activated phenoxide ring."
    },
    {
      id: "ph_4",
      question: "What color is produced when phenol is treated with a neutral solution of ferric chloride (FeCl3)?",
      options: [
        "Deep blue/violet",
        "Bright yellow",
        "Cherry red",
        "Emerald green"
      ],
      correctAnswer: "Deep blue/violet",
      explanation: "Phenols form characteristic colored coordination complexes when treated with neutral ferric chloride solution. The reaction involves the coordination of phenoxide ligands to the iron core, yielding a soluble, intensely colored iron-phenoxide complex, typically violet or deep blue. Alcohols do not produce this color, making it a standard diagnostic test for phenols."
    },
    {
      id: "ph_5",
      question: "Which of the following substituents will decrease the acidity of phenol when present at the para-position?",
      options: [
        "Nitro group (-NO2)",
        "Methyl group (-CH3)",
        "Chlorine (-Cl)",
        "Cyano group (-CN)"
      ],
      correctAnswer: "Methyl group (-CH3)",
      explanation: "Substituents that donate electrons via inductive (+I) or hyperconjugative effects (like the methyl group, -CH3) increase the negative charge density on the oxygen of the phenoxide ion, destabilizing it and decreasing the acidity of the parent phenol. Electron-withdrawing groups (like -NO2, -Cl, -CN) stabilize the negative charge and increase phenol acidity."
    },
    {
      id: "ph_6",
      question: "What is the product obtained when phenol is distilled with zinc dust?",
      options: [
        "Benzene",
        "Cyclohexanol",
        "Benzoquinone",
        "Toluene"
      ],
      correctAnswer: "Benzene",
      explanation: "Heating phenol with zinc dust is a classic reduction reaction. Zinc acts as a reducing agent, removing the oxygen from phenol to form zinc oxide (ZnO) and reducing the aromatic system to Benzene. This reaction is extremely useful for converting oxygenated aromatic compounds back to parent hydrocarbons."
    },
    {
      id: "ph_7",
      question: "What is the IUPAC name and structure of Picric Acid?",
      options: [
        "2-Nitrophenol",
        "2,4-Dinitrophenol",
        "2,4,6-Trinitrophenol",
        "3,5-Dinitrobenzoic acid"
      ],
      correctAnswer: "2,4,6-Trinitrophenol",
      explanation: "Picric acid is 2,4,6-trinitrophenol. It is formed by heating phenol with concentrated sulfuric acid (to form phenol-2,4-disulfonic acid) followed by concentrated nitric acid. The three strongly electron-withdrawing nitro groups stabilize the conjugate base to such an extent that Picric Acid is exceptionally acidic (pKa = 0.38), behaving like a strong mineral acid despite containing a phenolic -OH."
    },
    {
      id: "ph_8",
      question: "The coupling reaction of benzenediazonium chloride with phenol in a weakly alkaline medium (pH 9-10) yields what colored dye?",
      options: [
        "p-Aminoazobenzene (yellow dye)",
        "p-Hydroxyazobenzene (orange dye)",
        "Aniline black (black dye)",
        "Methyl orange (red-yellow dye)"
      ],
      correctAnswer: "p-Hydroxyazobenzene (orange dye)",
      explanation: "Arenediazonium salts undergo electrophilic coupling with highly activated aromatic rings like phenols. Under mild alkaline conditions (pH 9-10), phenol is converted to the more nucleophilic phenoxide ion. Benzenediazonium chloride attacks the para-position of the phenoxide to yield p-hydroxyazobenzene, which is a brilliant orange azo dye."
    },
    {
      id: "ph_9",
      question: "Phenol undergoes oxidation with chromic acid (Na2Cr2O7/H2SO4) to yield which conjugated diketone?",
      options: [
        "Catechol",
        "Resorcinol",
        "p-Benzoquinone",
        "Phthalic acid"
      ],
      correctAnswer: "p-Benzoquinone",
      explanation: "Oxidation of phenol is highly sensitive. Under strong oxidizing conditions using chromic acid or sodium dichromate in sulfuric acid, phenol undergoes oxidation to yield a dark-colored, conjugated diketone known as para-Benzoquinone (or simply benzoquinone). Exposed to air, phenol slowly turns pink/red due to the slow formation of benzoquinone mixtures."
    },
    {
      id: "ph_10",
      question: "Which statement is true regarding the physical properties of o-nitrophenol and p-nitrophenol?",
      options: [
        "o-Nitrophenol has a higher boiling point because of intermolecular hydrogen bonding.",
        "o-Nitrophenol is steam volatile due to intramolecular hydrogen bonding.",
        "p-Nitrophenol is steam volatile due to ring stabilization.",
        "Both isomers have identical solubilities in water."
      ],
      correctAnswer: "o-Nitrophenol is steam volatile due to intramolecular hydrogen bonding.",
      explanation: "o-Nitrophenol contains an -OH group and a -NO2 group on adjacent carbons, allowing them to form a stable 6-membered ring via Intramolecular hydrogen bonding. This prevents it from forming hydrogen bonds with other molecules, making it relatively non-associated and highly steam volatile. In contrast, p-nitrophenol forms Intermolecular hydrogen bonds, binding its molecules together into a strong network with a high boiling point, making it non-volatile in steam."
    }
  ],
  "ethers": [
    {
      id: "et_1",
      question: "In the Williamson ether synthesis, what type of reaction mechanism is involved?",
      options: [
        "SN1 nucleophilic substitution",
        "SN2 nucleophilic substitution",
        "E2 elimination",
        "Electrophilic addition"
      ],
      correctAnswer: "SN2 nucleophilic substitution",
      explanation: "Williamson ether synthesis is an organic reaction forming an ether from an organohalide and a deprotonated alcohol (alkoxide). It proceeds via a classic SN2 pathway where the nucleophilic alkoxide ion attacks the primary carbon of the alkyl halide, displacing the halide leaving group in a concerted step. Hence, the alkyl halide must be primary to avoid competing E2 elimination."
    },
    {
      id: "et_2",
      question: "What is the major organic product when an unsymmetrical ether like tert-butyl methyl ether is cleaved with 1 equivalent of cold hydroiodic acid (HI)?",
      options: [
        "tert-Butyl iodide and Methanol",
        "Methanol and Isobutene",
        "tert-Butanol and Methyl iodide",
        "tert-Butyl iodide and Methyl iodide"
      ],
      correctAnswer: "tert-Butyl iodide and Methanol",
      explanation: "The cleavage of unsymmetrical ethers with HI depends on the stability of carbocations. Ethers are first protonated. If one of the alkyl groups is tertiary (like tert-butyl), the reaction proceeds via an SN1 pathway because a highly stable tertiary carbocation can form. The iodide nucleophile selectively attacks this stable tertiary carbocation to yield tert-butyl iodide, leaving the methyl group as Methanol. If only primary/secondary groups were present, the reaction would go via SN2, yielding methyl iodide and the larger alcohol."
    },
    {
      id: "et_3",
      question: "What is the expected product when diethyl ether is prepared by heating excess ethanol with conc. H2SO4? What temperature is required?",
      options: [
        "443 K (170°C)",
        "413 K (140°C)",
        "383 K (110°C)",
        "273 K (0°C)"
      ],
      correctAnswer: "413 K (140°C)",
      explanation: "The bimolecular dehydration of ethanol to form diethyl ether occurs at 413 K (140°C) with excess ethanol under sulfuric acid catalysis. At this temperature, nucleophilic attack of a second ethanol molecule on a protonated ethanol molecule dominates (SN2). Raising the temperature to 443 K (170°C) shifts the reaction completely to unimolecular beta-elimination (E1), yielding ethene gas."
    },
    {
      id: "et_4",
      question: "Ethers slowly react with atmospheric oxygen in the presence of light to form hazardous, highly explosive compounds called:",
      options: [
        "Ozonides",
        "Hydroperoxides/Peroxides",
        "Epoxides",
        "Esters"
      ],
      correctAnswer: "Hydroperoxides/Peroxides",
      explanation: "Ethers containing alpha-hydrogens (like diethyl ether or tetrahydrofuran) undergo autoxidation when exposed to air and light. This free-radical reaction leads to the insertion of oxygen into the C-H bond adjacent to the ether oxygen, forming ether hydroperoxides. These peroxides are highly unstable and can explode violently when heated or concentrated during distillation, which is why ethers must be tested for peroxides regularly."
    },
    {
      id: "et_5",
      question: "What is the product of the electrophilic nitration of Anisole (methoxybenzene) with a mixture of conc. HNO3 and conc. H2SO4?",
      options: [
        "m-Nitroanisole",
        "o-Nitroanisole and p-Nitroanisole",
        "Nitrobenzene",
        "2,4,6-Trinitrophenol"
      ],
      correctAnswer: "o-Nitroanisole and p-Nitroanisole",
      explanation: "In Anisole, the methoxy group (-OCH3) is highly activating and ortho/para-directing. Methoxy oxygen donates its lone pair into the aromatic ring via resonance (+M effect), greatly increasing electron density at the ortho and para positions. Consequently, electrophilic nitration yields a mixture of o-nitroanisole and p-nitroanisole, with the para isomer typically dominating due to reduced steric hindrance."
    },
    {
      id: "et_6",
      question: "Epoxides undergo ring-opening reactions very easily compared to open-chain ethers. What is the driving force behind this high reactivity?",
      options: [
        "High electronegativity of the epoxide oxygen.",
        "Ring strain (angle strain) in the three-membered ring.",
        "The presence of highly acidic alpha-hydrogens.",
        "Epoxides are strongly basic."
      ],
      correctAnswer: "Ring strain (angle strain) in the three-membered ring.",
      explanation: "Unlike open-chain ethers, epoxides are three-membered heterocyclic rings containing bond angles of approximately 60°. This deviates significantly from the ideal tetrahedral angle of 109.5° for sp3 hybridized carbons, resulting in extreme ring strain (angle strain). Ring opening relieves this strain, providing a highly favorable thermodynamic driving force that allows epoxides to react under mild nucleophilic conditions where normal ethers are inert."
    },
    {
      id: "et_7",
      question: "Which of the following reagents is used in the Zeisel method to estimate the number of methoxy groups in an organic compound?",
      options: [
        "Sodium metal in liquid ammonia",
        "Concentrated Hydroiodic Acid (HI)",
        "Lucas Reagent",
        "Alkaline KMnO4"
      ],
      correctAnswer: "Concentrated Hydroiodic Acid (HI)",
      explanation: "The Zeisel method is a classic analytical procedure. Methoxy compounds are heated with concentrated Hydroiodic acid (HI) to cleave the ether linkage, yielding methyl iodide (CH3I). The volatile methyl iodide is passed into an ethanolic silver nitrate solution, precipitating silver iodide (AgI). Measuring the mass of AgI allows for the quantitative determination of methoxy groups."
    },
    {
      id: "et_8",
      question: "Crown ethers are cyclic polyethers that are famous for their ability to do what?",
      options: [
        "Act as explosive catalysts in paint manufacturing.",
        "Selectively complex and solvate specific alkali metal cations inside their cavity.",
        "Directly reduce ketones to secondary alcohols.",
        "Dehydrate carboxylic acids into anhydrides."
      ],
      correctAnswer: "Selectively complex and solvate specific alkali metal cations inside their cavity.",
      explanation: "Crown ethers (such as 18-crown-6) have a unique hydrophilic cavity surrounded by oxygen lone pairs, while the exterior is lipophilic. They can selectively complex specific metal cations via ion-dipole interactions. For example, 18-crown-6 selectively complexes potassium ions (K+). This allows inorganic salts to dissolve in non-polar organic solvents, creating highly active 'naked' anions for synthetic organic chemistry (phase-transfer catalysis)."
    },
    {
      id: "et_9",
      question: "Why do ethers have significantly lower boiling points than their isomeric alcohols?",
      options: [
        "Ethers have a linear geometry.",
        "Ethers cannot engage in intermolecular hydrogen bonding.",
        "The C-O-C bond is highly non-polar.",
        "Ethers always have lower molecular weights."
      ],
      correctAnswer: "Ethers cannot engage in intermolecular hydrogen bonding.",
      explanation: "Ethers lack a hydrogen atom bonded to an electronegative oxygen (no -OH group). Consequently, ether molecules cannot form hydrogen bonds with one another. They are held together only by weak dipole-dipole attractions. Isomeric alcohols (like diethyl ether vs butan-1-ol), having similar molecular formulas, form strong intermolecular hydrogen bonds, resulting in much higher boiling points."
    },
    {
      id: "et_10",
      question: "What is the major product when methyl phenyl ether (Anisole) reacts with HI?",
      options: [
        "Iodobenzene and Methanol",
        "Phenol and Methyl iodide",
        "Iodobenzene and Methyl iodide",
        "Phenol and Methanol"
      ],
      correctAnswer: "Phenol and Methyl iodide",
      explanation: "Anisole contains a methyl-oxygen bond and a phenyl-oxygen bond. The phenyl-oxygen bond has partial double-bond character due to resonance with the benzene ring and is extremely strong. Furthermore, nucleophilic attack on an sp2 carbon of a benzene ring is highly unfavorable. Thus, the cleavage occurs exclusively at the alkyl-oxygen bond via an SN2 mechanism: the iodide ion attacks the methyl group, forming Methyl Iodide and Phenol."
    }
  ],
  "aldehydes": [
    {
      id: "ald_1",
      question: "Which of the following compounds will give a positive result (silver mirror) with Tollen's reagent?",
      options: [
        "Propanone (Acetone)",
        "Propanal (Propionaldehyde)",
        "Benzophenone",
        "Ethyl acetate"
      ],
      correctAnswer: "Propanal (Propionaldehyde)",
      explanation: "Tollen's test is a selective oxidation reaction. Tollen's reagent (ammoniacal silver nitrate, [Ag(NH3)2]+) is a mild oxidizing agent that readily oxidizes aldehydes (both aliphatic and aromatic) to carboxylate ions. During this redox reaction, silver ions (Ag+) are reduced to metallic silver, which deposits on the inner wall of the test tube as a brilliant silver mirror. Ketones (like acetone and benzophenone) do not react."
    },
    {
      id: "ald_2",
      question: "What is the active copper species in Fehling's solution, and what is the red precipitate formed upon reaction with an aldehyde?",
      options: [
        "Cu2+ complexed with tartrate; Copper(I) oxide (Cu2O)",
        "Cu+ complexed with citrate; Copper(II) oxide (CuO)",
        "Metallic Copper (Cu); Copper hydroxide (Cu(OH)2)",
        "Cu2+ complexed with EDTA; Copper sulfate (CuSO4)"
      ],
      correctAnswer: "Cu2+ complexed with tartrate; Copper(I) oxide (Cu2O)",
      explanation: "Fehling's solution contains Copper(II) sulfate complexed with sodium potassium tartrate (Rochelle salt) in an alkaline medium. The tartrate ligands prevent the precipitation of Cu(OH)2. When heated with an aliphatic aldehyde, the aldehyde is oxidized, and the blue Cu2+ complex is reduced to insoluble Copper(I) oxide (Cu2O), which precipitates as a distinctive red solid. Aromatic aldehydes do not reduce Fehling's solution."
    },
    {
      id: "ald_3",
      question: "What product is formed when benzaldehyde is treated with concentrated NaOH solution (Cannizzaro Reaction)?",
      options: [
        "Benzyl alcohol only",
        "Sodium benzoate only",
        "A mixture of Benzyl alcohol and Sodium benzoate",
        "A cinnamic acid derivative"
      ],
      correctAnswer: "A mixture of Benzyl alcohol and Sodium benzoate",
      explanation: "The Cannizzaro reaction is a base-catalyzed disproportionation (self-redox) of aldehydes that lack an alpha-hydrogen (like benzaldehyde or formaldehyde). When treated with concentrated alkali, one molecule of benzaldehyde is reduced to Benzyl alcohol, while another molecule is oxidized to Sodium benzoate. Aliphatic aldehydes with alpha-hydrogens undergo aldol condensation instead."
    },
    {
      id: "ald_4",
      question: "Nucleophilic addition of HCN to acetaldehyde yields a cyanohydrin. What type of isomerism is shown by the product?",
      options: [
        "Geometrical Isomerism",
        "Optical Isomerism",
        "Functional Isomerism",
        "Metamerism"
      ],
      correctAnswer: "Optical Isomerism",
      explanation: "Acetaldehyde (CH3-CHO) is planar. When the nucleophilic cyanide ion (CN-) attacks the carbonyl carbon, it forms an intermediate that is protonated to yield acetaldehyde cyanohydrin (CH3-CH(OH)-CN). In this product, the central carbon is bonded to four different groups: -H, -CH3, -OH, and -CN. This carbon is chiral (asymmetric), and the product exists as a racemic mixture of enantiomers, displaying optical isomerism."
    },
    {
      id: "ald_5",
      question: "Stephen's reduction involves the reduction of nitriles to aldehydes using which reagent combination?",
      options: [
        "LiAlH4 in dry ether",
        "SnCl2 and HCl, followed by hydrolysis",
        "H2 gas in the presence of Pd/BaSO4 (Rosenmund)",
        "Sodium amalgam and water"
      ],
      correctAnswer: "SnCl2 and HCl, followed by hydrolysis",
      explanation: "Stephen's reduction is a selective synthesis of aldehydes from nitriles (R-CN). The nitrile is reduced using stannous chloride (SnCl2) and hydrochloric acid (HCl) in ether solvent to form an aldimine hydrochloride intermediate [R-CH=NH.HCl]. Subsequent hydrolysis of this imine intermediate with warm water yields the corresponding aldehyde (R-CHO) along with ammonium chloride."
    },
    {
      id: "ald_6",
      question: "What is the product when acetaldehyde is reduced using Clemmensen reduction conditions (Zn-Hg / conc. HCl)?",
      options: [
        "Ethanol",
        "Ethane",
        "Ethene",
        "Acetic acid"
      ],
      correctAnswer: "Ethane",
      explanation: "Clemmensen reduction is a chemical reaction used to reduce aldehydes or ketones to alkanes. It employs zinc amalgam (Zn-Hg) and concentrated hydrochloric acid (HCl). The carbonyl group (>C=O) is completely reduced to a methylene group (>CH2). For acetaldehyde (CH3CHO), this complete reduction transforms it into Ethane (CH3CH3)."
    },
    {
      id: "ald_7",
      question: "Why are aldehydes generally more reactive than ketones towards nucleophilic addition reactions?",
      options: [
        "Aldehydes are highly basic compared to ketones.",
        "Steric hindrance is lower in aldehydes, and ketones have two electron-donating alkyl groups that reduce carbonyl electrophilicity.",
        "Aldehydes have a higher molecular weight.",
        "Ketones have a stable enol form that blocks nucleophilic attack."
      ],
      correctAnswer: "Steric hindrance is lower in aldehydes, and ketones have two electron-donating alkyl groups that reduce carbonyl electrophilicity.",
      explanation: "Aldehydes have only one alkyl group attached to the carbonyl carbon, whereas ketones have two. (1) Steric: The presence of only one alkyl group makes the carbonyl carbon of aldehydes more accessible to incoming nucleophiles. (2) Electronic: Alkyl groups are electron-donating (+I). Ketones have two alkyl groups that donate electron density, reducing the partial positive charge on the carbonyl carbon and making it less electrophilic than that of an aldehyde."
    },
    {
      id: "ald_8",
      question: "Acetaldehyde reacts with 2,4-Dinitrophenylhydrazine (2,4-DNP) to form a hydrazone that precipitates as what color?",
      options: [
        "Yellow-orange or red solid",
        "Deep blue solution",
        "Colorless gas",
        "Violet complex"
      ],
      correctAnswer: "Yellow-orange or red solid",
      explanation: "2,4-Dinitrophenylhydrazine (Brady's reagent) reacts with carbonyl groups (both aldehydes and ketones) via nucleophilic addition-elimination, condensing to form 2,4-dinitrophenylhydrazones. These products are highly conjugated crystalline solids that precipitate out as brilliant yellow, orange, or red colors. This is a standard qualitative test to confirm the presence of a carbonyl group."
    },
    {
      id: "ald_9",
      question: "What is the product when an aldehyde is reacted with excess alcohol in the presence of dry HCl gas?",
      options: [
        "Hemiacetal",
        "Acetal",
        "Ester",
        "Ether"
      ],
      correctAnswer: "Acetal",
      explanation: "Aldehydes react with one equivalent of alcohol in the presence of dry HCl gas to form an unstable intermediate called a Hemiacetal (containing one ether and one alcohol group on the same carbon). In the presence of excess alcohol, the reaction proceeds further: the hemiacetal reacts with a second molecule of alcohol, eliminating water to form a stable Acetal (containing two ether groups on the same carbon)."
    },
    {
      id: "ald_10",
      question: "Which aldehyde does NOT undergo the Aldol Condensation reaction?",
      options: [
        "Acetaldehyde (CH3CHO)",
        "Benzaldehyde (C6H5CHO)",
        "Propanal (CH3CH2CHO)",
        "Butanal (CH3CH2CH2CHO)"
      ],
      correctAnswer: "Benzaldehyde (C6H5CHO)",
      explanation: "Aldol condensation requires the presence of at least one alpha-hydrogen (a hydrogen atom on the carbon adjacent to the carbonyl group). The base abstracts this acidic proton to form a nucleophilic enolate ion. Benzaldehyde (C6H5CHO) has its carbonyl group attached directly to an aromatic sp2 carbon which has no hydrogen atom. Lacking alpha-hydrogens, it cannot undergo self-aldol condensation."
    }
  ],
  "ketones": [
    {
      id: "ket_1",
      question: "Which of the following ketones will give a positive Iodoform test?",
      options: [
        "Pentan-3-one (Diethyl ketone)",
        "Pentan-2-one (Methyl propyl ketone)",
        "Benzophenone (Diphenyl ketone)",
        "Cyclohexanone"
      ],
      correctAnswer: "Pentan-2-one (Methyl propyl ketone)",
      explanation: "The iodoform test is highly specific for compounds containing a methyl carbonyl group (CH3-CO-). When treated with iodine (I2) and sodium hydroxide (NaOH), the three alpha-hydrogens of the methyl group are replaced by iodine, followed by nucleophilic cleavage by hydroxide to yield yellow iodoform (CHI3) and a carboxylate salt. Pentan-2-one (CH3-CO-CH2-CH2-CH3) has this methyl carbonyl group, whereas pentan-3-one does not."
    },
    {
      id: "ket_2",
      question: "Reaction of Acetone (Propanone) with a Grignard reagent (R-MgX), followed by acid hydrolysis, yields what class of alcohol?",
      options: [
        "Primary (1°) Alcohol",
        "Secondary (2°) Alcohol",
        "Tertiary (3°) Alcohol",
        "Dihydric Alcohol"
      ],
      correctAnswer: "Tertiary (3°) Alcohol",
      explanation: "Nucleophilic addition of a Grignard reagent to a carbonyl group builds carbon chains. Grignard reagents add a nucleophilic carbon (R-) to the carbonyl carbon. (1) Formaldehyde yields a primary alcohol. (2) Other aldehydes yield secondary alcohols. (3) Ketones (having two alkyl groups already attached to the carbonyl carbon, like Acetone) receive a third alkyl group, resulting in a Tertiary alcohol upon acidic workup."
    },
    {
      id: "ket_3",
      question: "The oxidation of ketones with peroxyacids (like mCPBA) to insert an oxygen atom next to the carbonyl, yielding an ester, is known as:",
      options: [
        "Aldol Condensation",
        "Baeyer-Villiger Oxidation",
        "Clemmensen Reduction",
        "Perkin Reaction"
      ],
      correctAnswer: "Baeyer-Villiger Oxidation",
      explanation: "The Baeyer-Villiger oxidation is an organic reaction that oxidizes ketones into esters (or cyclic ketones into lactones) using peroxyacids (such as peracetic acid or meta-chloroperoxybenzoic acid, mCPBA). The mechanism involves the nucleophilic addition of the peroxyacid to the carbonyl carbon, followed by a concerted rearrangement where one of the ketone's alkyl groups migrates onto the adjacent peroxy oxygen, eliminating a carboxylic acid."
    },
    {
      id: "ket_4",
      question: "What intermediate is formed when acetone is treated with magnesium amalgam and water, coupling two acetone molecules together?",
      options: [
        "Pinacol (2,3-dimethylbutane-2,3-diol)",
        "Acetone cyanohydrin",
        "Mesityl oxide",
        "Phorone"
      ],
      correctAnswer: "Pinacol (2,3-dimethylbutane-2,3-diol)",
      explanation: "When acetone is reduced with magnesium amalgam (Mg-Hg) in benzene solvent, magnesium acts as a divalent metal donor, initiating a free-radical pinacol coupling. Two radical-anion intermediates coordinate with the magnesium ion and couple together at their carbonyl carbons. Subsequent hydrolysis of this magnesium bidentate complex yields a vicinal diol called Pinacol (2,3-dimethylbutane-2,3-diol)."
    },
    {
      id: "ket_5",
      question: "What cyclic product is formed when acetone reacts with ethylene glycol (ethane-1,2-diol) in the presence of dry HCl gas?",
      options: [
        "A cyclic Hemiacetal",
        "A cyclic Ketal (dioxolane derivative)",
        "A polyester",
        "An epoxide"
      ],
      correctAnswer: "A cyclic Ketal (dioxolane derivative)",
      explanation: "Ketones do not form acyclic ketals easily with simple alcohols due to unfavorable thermodynamics. However, they react readily with 1,2-diols (like ethylene glycol) in the presence of an acid catalyst to form stable, 5-membered cyclic Ketals (1,3-dioxolanes). This reaction is highly favored due to chelation (entropic advantage). Cyclic ketals are widely used in organic synthesis as protecting groups for carbonyls because they are stable to bases but easily hydrolyzed back by dilute acids."
    },
    {
      id: "ket_6",
      question: "According to Popoff's rule, during the vigorous oxidation of unsymmetrical ketones with strong oxidizing agents (like conc. HNO3), how does the carbonyl group cleave?",
      options: [
        "The carbonyl group remains preferentially with the smaller alkyl group.",
        "The carbonyl group remains preferentially with the larger alkyl group.",
        "The carbonyl group is oxidized entirely to carbon dioxide gas.",
        "The ketone undergoes carbon-carbon cleavage to form two symmetrical alcohols."
      ],
      correctAnswer: "The carbonyl group remains preferentially with the smaller alkyl group.",
      explanation: "Popoff's rule governs the vigorous oxidation of unsymmetrical ketones. Since ketones do not have a hydrogen atom attached to the carbonyl carbon, oxidation requires C-C bond cleavage. Popoff's rule states that during cleavage of an unsymmetrical ketone (R-CO-R'), the carbonyl carbon stays preferentially with the smaller alkyl group, forming a mixture of carboxylic acids representing the oxidized fragments."
    },
    {
      id: "ket_7",
      question: "Which of the following methods CANNOT be used to prepare a ketone?",
      options: [
        "Oxidation of a secondary alcohol.",
        "Ozonolysis of an alkene containing a tetrasubstituted double bond.",
        "Rosenmund Reduction.",
        "Reaction of a nitrile with a Grignard reagent, followed by hydrolysis."
      ],
      correctAnswer: "Rosenmund Reduction.",
      explanation: "The Rosenmund reduction is a selective catalytic hydrogenation process that converts acyl chlorides (acid chlorides) into aldehydes using hydrogen gas and palladium on barium sulfate catalyst, poisoned with sulfur or quinoline. Since acyl chlorides have only one carbon-chlorine bond at the terminus, this reduction always yields an aldehyde and cannot produce a ketone."
    },
    {
      id: "ket_8",
      question: "What product is formed when three molecules of acetone undergo condensation in the presence of concentrated sulfuric acid?",
      options: [
        "Mesityl oxide",
        "Mesitylene (1,3,5-trimethylbenzene)",
        "Phorone",
        "Acetonitrile"
      ],
      correctAnswer: "Mesitylene (1,3,5-trimethylbenzene)",
      explanation: "In the presence of concentrated H2SO4, acetone undergoes acid-catalyzed condensation. If three molecules of acetone condense and undergo cyclic dehydration, they eliminate three molecules of water and trimerize to form the aromatic hydrocarbon Mesitylene (1,3,5-trimethylbenzene). If only two molecules condense under mild acid or base, they form Mesityl oxide."
    },
    {
      id: "ket_9",
      question: "Which ketone is a naturally occurring cyclic ketone used in perfumes and famous for its highly stable 15-membered ring?",
      options: [
        "Muskone (3-methylcyclopentadecanone)",
        "Camphor",
        "Menthol",
        "Acetophenone"
      ],
      correctAnswer: "Muskone (3-methylcyclopentadecanone)",
      explanation: "Muskone is the key active fragrance component of natural musk. Chemically, it is 3-methylcyclopentadecanone, which is a macrocyclic ketone containing a 15-membered ring. Despite the large ring size, muskone has virtually no ring strain, showing that large rings are highly flexible and stable, confirming the coordinate flexibility predicted by Sachse-Mohr theory."
    },
    {
      id: "ket_10",
      question: "What is the product when benzoyl chloride is treated with diethylcadmium [(C2H5)2Cd]?",
      options: [
        "Benzaldehyde",
        "Propiophenone (1-phenylpropan-1-one)",
        "Acetophenone",
        "Ethyl benzoate"
      ],
      correctAnswer: "Propiophenone (1-phenylpropan-1-one)",
      explanation: "Organocadmium reagents (R2Cd) are moderately reactive nucleophiles. They are active enough to react with highly electrophilic acyl chlorides (like benzoyl chloride, C6H5COCl) but are too weak to react with ketones. Therefore, the reaction stops cleanly at the ketone stage without undergoing further addition. Reacting benzoyl chloride with diethylcadmium replaces the chlorine with an ethyl group, yielding Propiophenone."
    }
  ],
  "carboxylic-acids": [
    {
      id: "ca_1",
      question: "Why are carboxylic acids stronger acids than phenols?",
      options: [
        "Carboxylic acids are more soluble in water.",
        "The negative charge in the carboxylate ion is delocalized over two highly electronegative oxygen atoms.",
        "Phenols cannot undergo resonance delocalization.",
        "The carboxyl group contains an sp3 carbon that releases protons."
      ],
      correctAnswer: "The negative charge in the carboxylate ion is delocalized over two highly electronegative oxygen atoms.",
      explanation: "In a carboxylate ion (R-COO-), the negative charge is shared equally between two highly electronegative oxygen atoms via resonance, meaning the negative charge is concentrated on electronegative atoms. In the phenoxide ion, the negative charge is delocalized over one oxygen and three carbon atoms of the benzene ring. Because carbon is much less electronegative than oxygen, carbon resonance structures are less stable, making the carboxylate ion significantly more stable and its parent acid stronger."
    },
    {
      id: "ca_2",
      question: "Which of the following halogenated carboxylic acids is the strongest acid?",
      options: [
        "Monochloroacetic acid (CH2ClCOOH)",
        "Dichloroacetic acid (CHCl2COOH)",
        "Trichloroacetic acid (CCl3COOH)",
        "Trifluoroacetic acid (CF3COOH)"
      ],
      correctAnswer: "Trifluoroacetic acid (CF3COOH)",
      explanation: "The acidity of carboxylic acids is greatly enhanced by electron-withdrawing groups (EWGs) on the alpha-carbon via the inductive (-I) effect, which stabilizes the conjugate carboxylate ion. Fluorine is the most electronegative element, producing a exceptionally strong -I effect. Trifluoroacetic acid (CF3COOH), having three highly electronegative fluorine atoms, exhibits a massive inductive stabilization of its conjugate base, making it a very strong organic acid (pKa ≈ 0.23)."
    },
    {
      id: "ca_3",
      question: "What reaction takes place when carboxylic acids containing alpha-hydrogens are treated with red phosphorus and chlorine (or bromine), followed by water?",
      options: [
        "Clemmensen Reduction",
        "Hell-Volhard-Zelinsky (HVZ) Reaction",
        "Hunsdiecker Reaction",
        "Decarboxylation"
      ],
      correctAnswer: "Hell-Volhard-Zelinsky (HVZ) Reaction",
      explanation: "The Hell-Volhard-Zelinsky (HVZ) reaction selectively halogenates the alpha-carbon of carboxylic acids. The reaction requires at least one alpha-hydrogen. Under catalysis by a small amount of red phosphorus, phosphorus trihalide (PX3) is formed in situ, converting the acid to an acyl halide which enolizes easily. Halogenation occurs at the alpha-carbon, and subsequent hydrolysis of the acyl halide yields an alpha-halo carboxylic acid."
    },
    {
      id: "ca_4",
      question: "What gaseous products are formed when sodium acetate is heated with soda lime (NaOH + CaO)?",
      options: [
        "Methane gas",
        "Carbon dioxide gas",
        "Ethane gas",
        "Hydrogen gas"
      ],
      correctAnswer: "Methane gas",
      explanation: "Heating sodium salts of carboxylic acids with soda lime (a mixture of Sodium Hydroxide and Calcium Oxide) initiates a thermal Decarboxylation reaction. The carboxyl group is eliminated as sodium carbonate (Na2CO3), and the remaining alkyl group is protonated to form an alkane containing one less carbon than the parent carboxylate. For sodium acetate (CH3COONa), decarboxylation yields Methane gas (CH4)."
    },
    {
      id: "ca_5",
      question: "Which reagent is most suitable for selectively reducing a carboxylic acid directly to a primary alcohol, without reducing esters or nitro groups present in the same molecule?",
      options: [
        "Lithium Aluminum Hydride (LiAlH4)",
        "Diboran (B2H6)",
        "Sodium Borohydride (NaBH4)",
        "Hydrogen gas with Raney Nickel"
      ],
      correctAnswer: "Diboran (B2H6)",
      explanation: "Diborane (B2H6 or BH3-THF) is a highly selective reducing agent. It reduces carboxylic acids to primary alcohols at a very rapid rate. Crucially, diborane does not easily reduce other functional groups such as esters, nitro groups, amides, or halogens. This selectivity makes it superior to LiAlH4, which is extremely powerful and would non-selectively reduce esters and nitro groups as well."
    },
    {
      id: "ca_6",
      question: "Why is thionyl chloride (SOCl2) preferred over PCl5 or PCl3 for converting carboxylic acids into acyl chlorides?",
      options: [
        "SOCl2 is a much stronger acid.",
        "The by-products (SO2 and HCl) are gases and escape easily, leaving the pure product.",
        "SOCl2 does not require heating.",
        "PCl5 produces highly toxic phosphorus gas."
      ],
      correctAnswer: "The by-products (SO2 and HCl) are gases and escape easily, leaving the pure product.",
      explanation: "Reacting a carboxylic acid with thionyl chloride (SOCl2) forms an acyl chloride (R-COCl). The chemical equation is: R-COOH + SOCl2 -> R-COCl + SO2(g) + HCl(g). Because the by-products (sulfur dioxide and hydrogen chloride) are volatile gases at room temperature, they instantly bubble out of the reaction mixture, leaving behind the crude acyl chloride in a highly pure state without requiring complex distillation."
    },
    {
      id: "ca_7",
      question: "The reaction of silver salts of carboxylic acids with bromine in refluxing carbon tetrachloride to yield alkyl bromides is known as:",
      options: [
        "Hunsdiecker Reaction",
        "HVZ Reaction",
        "Kolbe's Electrolysis",
        "Hoffmann Degradation"
      ],
      correctAnswer: "Hunsdiecker Reaction",
      explanation: "The Hunsdiecker reaction is a decarboxylative bromination. A silver carboxylate (R-COOAg) reacts with bromine (Br2) in anhydrous CCl4 to form an unstable acyl hypobromite intermediate. Upon heating, this intermediate undergoes homolytic cleavage to generate an acyl radical, which rapidly loses carbon dioxide to form an alkyl radical (R.). The alkyl radical abstracts a bromine atom to yield an alkyl bromide (R-Br) containing one less carbon."
    },
    {
      id: "ca_8",
      question: "What is the product when phthalic acid (benzene-1,2-dicarboxylic acid) is heated strongly?",
      options: [
        "Benzene",
        "Phthalic anhydride",
        "Benzoic acid",
        "Salicylic acid"
      ],
      correctAnswer: "Phthalic anhydride",
      explanation: "Phthalic acid is a dicarboxylic acid where the two carboxyl groups are on adjacent aromatic carbons (ortho position). When heated, the two carboxyl groups are held close together in space, allowing them to undergo easy intramolecular dehydration. Eliminating a molecule of water creates a stable, five-membered ring structure called Phthalic anhydride."
    },
    {
      id: "ca_9",
      question: "Carboxylic acids exist as stable cyclic dimers even in the vapor phase. What intermolecular force holds these dimers together?",
      options: [
        "Strong covalent ester bonds",
        "Two symmetrical hydrogen bonds",
        "Dipole-dipole coordination with metal ions",
        "Hydrophobic tail-to-tail interactions"
      ],
      correctAnswer: "Two symmetrical hydrogen bonds",
      explanation: "Carboxylic acids form highly stable cyclic dimers due to the perfect spatial arrangement of their acidic -OH proton and their basic carbonyl oxygen. Two molecules align tail-to-head, establishing two highly cooperative, symmetrical hydrogen bonds. This dimeric structure is so strong that it persists in non-polar solvents and even in the gas/vapor phase, which explains the high boiling points of carboxylic acids."
    },
    {
      id: "ca_10",
      question: "Which of the following compounds is formed when dry ice (solid carbon dioxide) is reacted with a Grignard reagent, followed by acidification?",
      options: [
        "A ketone",
        "A primary alcohol",
        "A carboxylic acid",
        "An ester"
      ],
      correctAnswer: "A carboxylic acid",
      explanation: "Reacting a Grignard reagent (R-MgX) with solid carbon dioxide (dry ice) involves the nucleophilic attack of the carbanion (R-) on the highly electrophilic carbon of CO2, forming a halomagnesium carboxylate intermediate (R-COOMgX). Because the carboxylate intermediate carries a negative charge, it is resistant to further nucleophilic attack by another Grignard molecule. Subsequent hydrolysis with dilute mineral acid yields a Carboxylic acid (R-COOH)."
    }
  ],
  "amines": [
    {
      id: "am_1",
      question: "What is the correct order of basic strength of methyl-substituted amines in an aqueous medium?",
      options: [
        "Tertiary > Secondary > Primary > Ammonia",
        "Secondary > Primary > Tertiary > Ammonia",
        "Secondary > Tertiary > Primary > Ammonia",
        "Primary > Secondary > Tertiary > Ammonia"
      ],
      correctAnswer: "Secondary > Primary > Tertiary > Ammonia",
      explanation: "In aqueous solution, the basicity of aliphatic amines depends on three competing factors: (1) Inductive effect (+I of alkyl groups increases electron density on N), (2) Solvation effect (smaller protonated cations form more H-bonds with water, stabilizing them), and (3) Steric hindrance (crowding around nitrogen). For methyl-substituted amines, the balance of these forces results in: Dimethylamine (2°) > Methylamine (1°) > Trimethylamine (3°) > Ammonia."
    },
    {
      id: "am_2",
      question: "Which method is specifically designed for the preparation of pure primary aliphatic amines, completely avoiding secondary or tertiary amine by-products?",
      options: [
        "Hoffmann's ammonolysis of alkyl halides",
        "Gabriel Phthalimide Synthesis",
        "Reduction of nitro compounds",
        "Schmidt Reaction"
      ],
      correctAnswer: "Gabriel Phthalimide Synthesis",
      explanation: "Gabriel Phthalimide synthesis is a highly selective method. Potassium phthalimide (a nucleophile) reacts with a primary alkyl halide in an SN2 reaction to form N-alkylphthalimide. Because there are no acidic protons left on the nitrogen after monoalkylation, no further alkylation can occur (preventing secondary/tertiary amines). Hydrolysis of N-alkylphthalimide yields a pure primary aliphatic amine and phthalic acid."
    },
    {
      id: "am_3",
      question: "What product is formed when an primary amide (R-CONH2) is heated with bromine and aqueous sodium hydroxide (Hoffmann Bromamide Degradation)?",
      options: [
        "An amine containing one MORE carbon atom than the amide.",
        "An amine containing one LESS carbon atom than the amide.",
        "A nitrile with the same number of carbons.",
        "An imine intermediate."
      ],
      correctAnswer: "An amine containing one LESS carbon atom than the amide.",
      explanation: "The Hoffmann Bromamide degradation is a method for shortening carbon chains. A primary amide reacts with Br2 and NaOH. The reaction proceeds via N-bromoamide and isocyanate intermediates. During the rearrangement, the alkyl group migrations directly to the nitrogen atom, eliminating the carbonyl carbon as sodium carbonate (Na2CO3). This yields a primary amine containing exactly one less carbon atom than the parent amide."
    },
    {
      id: "am_4",
      question: "Which test is used as a highly sensitive diagnostic tool for primary amines, producing a highly offensive, foul-smelling gas?",
      options: [
        "Hinsberg Test",
        "Carbylamine Reaction (Isocyanide Test)",
        "Mustard Oil Reaction",
        "Dye Coupling Test"
      ],
      correctAnswer: "Carbylamine Reaction (Isocyanide Test)",
      explanation: "The Carbylamine reaction is a diagnostic test for primary amines (both aliphatic and aromatic). When warmed with chloroform (CHCl3) and alcoholic KOH, primary amines undergo condensation to form alkyl/aryl Isocyanides (carbylamines). Isocyanides have an extremely foul, characteristic disagreeable odor. Secondary and tertiary amines do not react, making it highly selective."
    },
    {
      id: "am_5",
      question: "How do primary, secondary, and tertiary amines behave when treated with Hinsberg reagent (Benzenesulfonyl chloride)?",
      options: [
        "Primary dissolves in alkali, secondary is insoluble in alkali, tertiary does not react.",
        "Primary does not react, secondary dissolves in alkali, tertiary is insoluble.",
        "All three dissolve completely in alkaline solutions.",
        "Primary is insoluble in alkali, secondary dissolves, tertiary does not react."
      ],
      correctAnswer: "Primary dissolves in alkali, secondary is insoluble in alkali, tertiary does not react.",
      explanation: "Hinsberg reagent is benzenesulfonyl chloride. (1) Primary amines react to form N-alkylbenzenesulfonamide. This product has an acidic hydrogen on the nitrogen (due to the strong EWG sulfonyl group), allowing it to dissolve in NaOH to form a soluble sodium salt. (2) Secondary amines react to form N,N-dialkylbenzenesulfonamide. Lacking an acidic hydrogen on the nitrogen, it is completely insoluble in alkali and remains as a precipitate. (3) Tertiary amines do not react at all."
    },
    {
      id: "am_6",
      question: "Why is aniline significantly less basic than cyclohexylamine?",
      options: [
        "Aniline has a higher steric hindrance.",
        "The lone pair of electrons on nitrogen in aniline is delocalized into the aromatic ring via resonance.",
        "Aniline is a secondary amine.",
        "The sp3 hybridization of the aniline nitrogen stabilizes the lone pair."
      ],
      correctAnswer: "The lone pair of electrons on nitrogen in aniline is delocalized into the aromatic ring via resonance.",
      explanation: "In aniline, the lone pair of electrons on the nitrogen atom is in conjugation with the pi-electron cloud of the benzene ring. Resonance structures show this lone pair being delocalized over the ortho and para positions of the ring. This makes aniline's lone pair much less available to accept a proton (behave as a base) compared to cyclohexylamine, where the nitrogen is attached to a non-aromatic cyclohexyl ring and the lone pair remains highly localized."
    },
    {
      id: "am_7",
      question: "What is the major organic product when aniline is treated with excess bromine water at room temperature?",
      options: [
        "A mixture of o-bromoaniline and p-bromoaniline",
        "2,4,6-Tribromoaniline (white precipitate)",
        "Bromobenzene",
        "Aniline hydrochloride"
      ],
      correctAnswer: "2,4,6-Tribromoaniline (white precipitate)",
      explanation: "The amino group (-NH2) is an exceptionally powerful activating and ortho/para-directing group due to resonance. When aniline is treated with bromine water (a highly polar medium), the ring is activated to such an extent that electrophilic substitution occurs rapidly at all available ortho and para positions, yielding a white precipitate of 2,4,6-Tribromoaniline. Monobromination requires acetylation of aniline first to temper the nitrogen lone pair."
    },
    {
      id: "am_8",
      question: "What are the reagents and conditions used to convert aniline into benzenediazonium chloride (Diazotization)?",
      options: [
        "HNO3 and H2SO4 at 373 K (100°C)",
        "NaNO2 and excess HCl at 273-278 K (0-5°C)",
        "NaNH2 in liquid ammonia",
        "NOCl gas at room temperature"
      ],
      correctAnswer: "NaNO2 and excess HCl at 273-278 K (0-5°C)",
      explanation: "Diazotization is the conversion of a primary aromatic amine (like aniline) into a diazonium salt. It is carried out by treating aniline with nitrous acid (generated in situ from Sodium Nitrite, NaNO2, and excess hydrochloric acid, HCl) at ice-cold temperatures (273-278 K or 0-5°C). Maintaining a low temperature is critical because benzenediazonium salts are thermally unstable and decompose to phenol at higher temperatures."
    },
    {
      id: "am_9",
      question: "Which of the following reduction methods converts a nitrile (R-CN) into a primary amine containing the same number of carbons?",
      options: [
        "Reduction with LiAlH4 or H2/Ni",
        "Reaction with soda lime",
        "Hoffmann degradation",
        "Victor Meyer reduction"
      ],
      correctAnswer: "Reduction with LiAlH4 or H2/Ni",
      explanation: "Reduction of nitriles (R-CN) is an important conversion. Using powerful reducing agents like Lithium Aluminum Hydride (LiAlH4) or catalytic hydrogenation (H2 gas over active Nickel or Platinum catalysts) completely reduces the carbon-nitrogen triple bond into a carbon-nitrogen single bond, yielding a primary amine (R-CH2-NH2) containing the exact same number of carbon atoms."
    },
    {
      id: "am_10",
      question: "What is the product when a secondary amine (like diethylamine) reacts with nitrous acid (HNO2)?",
      options: [
        "A highly stable diazonium salt.",
        "An insoluble, yellow oil called N-nitrosodiethylamine.",
        "An alcohol and nitrogen gas.",
        "No reaction occurs."
      ],
      correctAnswer: "An insoluble, yellow oil called N-nitrosodiethylamine.",
      explanation: "Nitrous acid (HNO2) is used to differentiate classes of amines. Primary aliphatic amines react to form highly unstable diazonium salts that instantly decompose to release nitrogen gas and alcohols. Secondary amines (aliphatic or aromatic) react with HNO2 to form N-nitroso compounds (like N-nitrosodiethylamine) which separate from the aqueous solution as a characteristic insoluble, yellow oil (Libermann's nitroso test)."
    }
  ],
  "azo-compounds": [
    {
      id: "azo_1",
      question: "What is the structural characteristic of all azo compounds?",
      options: [
        "A triple bond between carbon and nitrogen (-C≡N).",
        "A double bond between two nitrogen atoms linking two organic groups (-N=N-).",
        "A nitro group bonded to an aromatic ring (-NO2).",
        "A hydrazine bridge (-NH-NH-)."
      ],
      correctAnswer: "A double bond between two nitrogen atoms linking two organic groups (-N=N-).",
      explanation: "Azo compounds are organic compounds containing the functional group R-N=N-R', where R and R' can be either alkyl or aryl groups. The nitrogen-nitrogen double bond (-N=N-) is known as the Azo group. In most stable azo compounds, both R and R' are aromatic rings, which conjugates the azo group with the pi-systems of the rings, stabilizing the bond and giving rise to brilliant colors."
    },
    {
      id: "azo_2",
      question: "The coupling reaction of benzenediazonium chloride with aniline in a mildly acidic medium (pH 4-5) yields which product?",
      options: [
        "p-Hydroxyazobenzene (orange dye)",
        "p-Aminoazobenzene (yellow dye)",
        "Benzene",
        "Chlorobenzene"
      ],
      correctAnswer: "p-Aminoazobenzene (yellow dye)",
      explanation: "Benzenediazonium chloride acts as an electrophile. When reacted with Aniline in a weakly acidic medium (pH 4-5), aniline acts as the nucleophile. The diazonium ion attacks the para-position of the aniline ring, yielding a coupling product called p-aminoazobenzene, which is a bright yellow azo dye."
    },
    {
      id: "azo_3",
      question: "Why do aromatic azo compounds exhibit intense colors, making them highly valuable as dyes?",
      options: [
        "They contain highly toxic heavy metals in their core.",
        "Extended conjugation across the azo group linking two aromatic systems, which absorbs visible light.",
        "They reflect all light that falls on them.",
        "They have extremely low molecular weights."
      ],
      correctAnswer: "Extended conjugation across the azo group linking two aromatic systems, which absorbs visible light.",
      explanation: "The -N=N- group in aromatic azo compounds connects two benzene rings into a single, highly continuous conjugated pi-electron system. This extended delocalization lowers the HOMO-LUMO energy gap, allowing the molecules to absorb specific wavelengths of visible light (exciting pi-electrons to pi* orbitals). The non-absorbed wavelengths are reflected, resulting in intense, vibrant colors such as yellows, oranges, and reds."
    },
    {
      id: "azo_4",
      question: "Which of the following compounds is a widely used pH indicator that is an azo dye?",
      options: [
        "Phenolphthalein",
        "Methyl Orange",
        "Fluorescein",
        "Indigo"
      ],
      correctAnswer: "Methyl Orange",
      explanation: "Methyl orange is a classic acid-base pH indicator. Structurally, it is an azo dye containing a sulfonate group on one ring and a dimethylamino group on the other, linked by an azo bridge. In acidic solutions (pH < 3.1), it protonates to a red quinonoid form, and in basic solutions (pH > 4.4), it deprotonates to a yellow azo form, showing its transition clearly."
    },
    {
      id: "azo_5",
      question: "What is the active electrophile in diazonium coupling reactions?",
      options: [
        "Arenediazonium ion (Ar-N2+)",
        "Nitronium ion (NO2+)",
        "Nitrosyl cation (NO+)",
        "Aryl radical (Ar.)"
      ],
      correctAnswer: "Arenediazonium ion (Ar-N2+)",
      explanation: "Diazonium coupling is an electrophilic aromatic substitution reaction. The arenediazonium cation (Ar-N2+) acts as a weak electrophile due to the positive charge shared across the nitrogen atoms. Because it is a weak electrophile, it can only attack highly activated aromatic rings that are rich in electrons, such as phenols (phenoxide form) and aniline derivatives."
    },
    {
      id: "azo_6",
      question: "Which diazotization by-product is minimized by maintaining a temperature below 5°C (278 K) during the reaction?",
      options: [
        "Aniline hydrochloride",
        "Phenol",
        "Chlorobenzene",
        "Nitrobenzene"
      ],
      correctAnswer: "Phenol",
      explanation: "Arenediazonium salts are thermally unstable in aqueous solution. If the temperature during preparation rises above 5°C (278 K), the diazonium ion undergoes rapid nucleophilic attack by water, eliminating nitrogen gas to form Phenol. Thus, keeping the reaction in an ice bath (0-5°C) is mandatory to prevent this hydrolysis."
    },
    {
      id: "azo_7",
      question: "What is the product when benzenediazonium chloride is reduced using a mild reducing agent like hypophosphorous acid (H3PO2) or hot ethanol?",
      options: [
        "Benzene",
        "Aniline",
        "Phenylhydrazine",
        "Chlorobenzene"
      ],
      correctAnswer: "Benzene",
      explanation: "Reduction of arenediazonium salts is an important synthetic tool to remove amino groups from aromatic rings. When benzenediazonium chloride is treated with hypophosphorous acid (H3PO2) in the presence of water, or heated with ethanol, the diazonium group is replaced by hydrogen, reducing it to Benzene. H3PO2 is oxidized to phosphorous acid (H3PO3), and ethanol is oxidized to acetaldehyde."
    },
    {
      id: "azo_8",
      question: "Replacing the diazo group (-N2+) with an iodine atom does NOT require copper catalysts. How is this reaction performed?",
      options: [
        "Heating with solid Iodine (I2).",
        "Simply shaking the diazonium salt solution with Potassium Iodide (KI).",
        "Reacting with hydroiodic acid and zinc.",
        "Passing through a column of warm sodium iodide."
      ],
      correctAnswer: "Simply shaking the diazonium salt solution with Potassium Iodide (KI).",
      explanation: "While introducing chlorine or bromine requires copper catalysts (Sandmeyer/Gattermann), introducing iodine is exceptionally easy. Due to the high nucleophilicity of the iodide ion (I-), simply shaking the aqueous benzenediazonium chloride solution with Potassium Iodide (KI) at room temperature initiates a rapid nucleophilic substitution, replacing the diazo group with iodine to yield Iodobenzene."
    },
    {
      id: "azo_9",
      question: "What is the chemical name and color of the dye obtained from arenediazonium coupling with beta-naphthol (2-naphthol)?",
      options: [
        "p-Aminoazobenzene (yellow)",
        "1-Phenylazo-2-naphthol (Sudan I, intense red-orange dye)",
        "Aniline black (black)",
        "Fluorescein (yellow-green)"
      ],
      correctAnswer: "1-Phenylazo-2-naphthol (Sudan I, intense red-orange dye)",
      explanation: "Coupling of benzenediazonium chloride with beta-naphthol (2-naphthol) in an alkaline solution is a classic laboratory synthesis. The electrophilic diazonium ion attacks the active 1-position of 2-naphthol, forming a highly stable conjugated azo compound named 1-phenylazo-2-naphthol (commonly known as Sudan I). It precipitates as a vibrant, intense red-orange dye."
    },
    {
      id: "azo_10",
      question: "Upon vigorous reduction of an azo compound with strong reducing agents like Sn and HCl, what products are formed?",
      options: [
        "A mixture of the parent primary amines (cleavage of the azo bond).",
        "A stable diazonium salt.",
        "Nitrobenzene.",
        "An alkane gas."
      ],
      correctAnswer: "A mixture of the parent primary amines (cleavage of the azo bond).",
      explanation: "Azo compounds contain a nitrogen-nitrogen double bond (-N=N-). When treated with strong reducing agents such as Tin (Sn) and hydrochloric acid (HCl), the azo bond undergoes complete hydrogenative cleavage. The -N=N- double bond is reduced through a hydrazo intermediate (-NH-NH-) and cleaved completely, yielding two molecules of primary amines representing the two original fragments."
    }
  ],
  "named-reactions": [
    {
      id: "nr_1",
      question: "Which of the following aldehydes will undergo the Cannizzaro reaction when treated with concentrated aqueous NaOH?",
      options: [
        "Acetaldehyde (CH3CHO)",
        "Formaldehyde (HCHO)",
        "Propanal (CH3CH2CHO)",
        "2-Methylpropanal ((CH3)2CHCHO)"
      ],
      correctAnswer: "Formaldehyde (HCHO)",
      explanation: "The Cannizzaro reaction is a base-catalyzed disproportionation (self-redox) restricted to aldehydes that lack alpha-hydrogens. If an aldehyde has an alpha-hydrogen (like acetaldehyde or propanal), it undergoes the rapid Aldol Condensation instead. Formaldehyde (HCHO) has no alpha-hydrogens, so it undergoes the Cannizzaro reaction to yield methanol (reduced product) and sodium formate (oxidized product)."
    },
    {
      id: "nr_2",
      question: "In the Aldol condensation, what is the role of the dilute base (such as dilute NaOH)?",
      options: [
        "It acts as an electrophile to attack the carbonyl carbon.",
        "It abstracts an alpha-proton to generate a highly nucleophilic enolate ion.",
        "It hydrolyzes the aldehyde into an alcohol.",
        "It coordinates with the carbonyl oxygen to polarize it."
      ],
      correctAnswer: "It abstracts an alpha-proton to generate a highly nucleophilic enolate ion.",
      explanation: "The first step of the Aldol condensation involves enolate formation. The dilute base (OH-) abstracts a weakly acidic proton from the alpha-carbon of the carbonyl compound. This creates a resonance-stabilized enolate anion (carbanion character), which then acts as a strong nucleophile to attack the carbonyl carbon of a second, neutral aldehyde molecule, forming a beta-hydroxy carbonyl compound."
    },
    {
      id: "nr_3",
      question: "What is the key organic product of the Perkin reaction when benzaldehyde is heated with acetic anhydride in the presence of sodium acetate?",
      options: [
        "Benzyl alcohol",
        "Cinnamic acid (3-phenylprop-2-enoic acid)",
        "Benzoin",
        "Salicylic acid"
      ],
      correctAnswer: "Cinnamic acid (3-phenylprop-2-enoic acid)",
      explanation: "The Perkin reaction is an organic reaction used to prepare alpha,beta-unsaturated aromatic acids. It involves heating an aromatic aldehyde (like benzaldehyde) with an aliphatic acid anhydride (like acetic anhydride) in the presence of the sodium salt of that carboxylic acid (sodium acetate). Condensation and subsequent dehydration/hydrolysis yields Cinnamic acid."
    },
    {
      id: "nr_4",
      question: "What rearrangement occurs when cyclohexanone oxime is treated with an acid catalyst (like conc. H2SO4) to yield Caprolactam?",
      options: [
        "Beckmann Rearrangement",
        "Hofmann Rearrangement",
        "Pinacol-Pinacolone Rearrangement",
        "Claisen Rearrangement"
      ],
      correctAnswer: "Beckmann Rearrangement",
      explanation: "The Beckmann rearrangement is an acid-catalyzed isomerization of oximes into amides. For cyclic ketones, the oxime undergoes ring expansion. When cyclohexanone oxime is treated with sulfuric acid, the hydroxyl group is protonated and leaves as water, initiating the migration of a ring carbon onto the nitrogen. Hydrolysis yields the cyclic amide Caprolactam, which is a key industrial monomer for Nylon-6."
    },
    {
      id: "nr_5",
      question: "Which named reaction couples aromatic aldehydes in the presence of a cyanide catalyst (KCN/NaCN) to yield a beta-hydroxy ketone?",
      options: [
        "Aldol Condensation",
        "Benzoin Condensation",
        "Cannizzaro Reaction",
        "Perkin Reaction"
      ],
      correctAnswer: "Benzoin Condensation",
      explanation: "The Benzoin condensation is a reaction between two molecules of aromatic aldehydes (typically benzaldehyde) catalyzed by cyanide ions (KCN). Cyanide acts as a unique catalyst because it is a good nucleophile, stabilizes the carbanion intermediate via its electron-withdrawing nature, and is an excellent leaving group. The reaction yields a beta-hydroxy ketone known as Benzoin."
    },
    {
      id: "nr_6",
      question: "Which named reaction involves the conversion of a methyl ketone to a carboxylic acid and iodoform using iodine and sodium hydroxide?",
      options: [
        "Hoffmann Degradation",
        "Haloform Reaction (Iodoform Test)",
        "Kolbe's Reaction",
        "Finkelstein Reaction"
      ],
      correctAnswer: "Haloform Reaction (Iodoform Test)",
      explanation: "The Haloform reaction is a classic organic reaction where a methyl ketone is treated with a halogen in the presence of a base. When Iodine (I2) and NaOH are used, it is specifically called the Iodoform reaction. The three alpha-hydrogens are replaced by iodine, and subsequent nucleophilic cleavage by hydroxide yields a yellow precipitate of Iodoform (CHI3) and a sodium carboxylate salt."
    },
    {
      id: "nr_7",
      question: "What is the product of the Clemmensen reduction of Acetone?",
      options: [
        "Propan-2-ol",
        "Propane",
        "Propanal",
        "Pinacol"
      ],
      correctAnswer: "Propane",
      explanation: "The Clemmensen reduction reduces the carbonyl group (>C=O) of aldehydes and ketones into a methylene group (>CH2) using zinc amalgam (Zn-Hg) and concentrated HCl. For Acetone (CH3-CO-CH3), this complete reduction removes the oxygen and adds two hydrogen atoms, yielding Propane (CH3-CH2-CH3)."
    },
    {
      id: "nr_8",
      question: "The conversion of salicylic acid to acetylsalicylic acid (Aspirin) using acetic anhydride is an example of which reaction?",
      options: [
        "Esterification / Acetylation",
        "Decarboxylation",
        "Kolbe's Reaction",
        "Reimer-Tiemann Reaction"
      ],
      correctAnswer: "Esterification / Acetylation",
      explanation: "Converting salicylic acid to Aspirin is an acetylation reaction. The phenolic -OH group of salicylic acid acts as a nucleophile, attacking acetic anhydride in the presence of an acid catalyst (like conc. H2SO4 or phosphoric acid). This replaces the hydrogen of the phenolic group with an acetyl group (-COCH3), producing Acetylsalicylic acid (Aspirin) and acetic acid as a by-product."
    },
    {
      id: "nr_9",
      question: "Which named reaction describes the synthesis of symmetrical biaryls (like biphenyl) by heating aryl iodides with copper powder?",
      options: [
        "Ullmann Reaction",
        "Wurtz Reaction",
        "Fittig Reaction",
        "Frankland Reaction"
      ],
      correctAnswer: "Ullmann Reaction",
      explanation: "The Ullmann condensation/reaction is a classic coupling reaction. Heating an aryl iodide (like iodobenzene) with copper powder at high temperatures (often > 200°C) initiates a copper-mediated radical coupling, forming a symmetrical biaryl compound (like Biphenyl, C6H5-C6H5) along with copper(I) iodide. The Fittig reaction achieves a similar coupling but uses sodium metal."
    },
    {
      id: "nr_10",
      question: "The Hoffmann bromamide degradation of acetamide yields which amine?",
      options: [
        "Methylamine",
        "Ethylamine",
        "Dimethylamine",
        "Aniline"
      ],
      correctAnswer: "Methylamine",
      explanation: "Hoffmann bromamide degradation converts primary amides to primary amines containing one less carbon atom, using Br2 and NaOH. Acetamide (CH3-CONH2) has two carbons. Undergoing this degradation, the carbonyl carbon is lost as carbonate, yielding Methylamine (CH3-NH2), which has exactly one carbon."
    }
  ],
  "organic-conversions": [
    {
      id: "oc_1",
      question: "How can you convert Methylamine (CH3NH2) to Ethylamine (CH3CH2NH2) (Ascent of Series)?",
      options: [
        "Treat with NaNO2/HCl, oxidize to acid, convert to amide, then Hoffmann degrade.",
        "React with HNO2 to form methanol, convert to methyl iodide, react with KCN to form acetonitrile, then reduce with LiAlH4.",
        "Heat directly with methyl chloride and sodium.",
        "Treat with sodamide in liquid ammonia."
      ],
      correctAnswer: "React with HNO2 to form methanol, convert to methyl iodide, react with KCN to form acetonitrile, then reduce with LiAlH4.",
      explanation: "To increase the carbon chain length (Ascent of Series) for an amine: (1) Treat methylamine with nitrous acid (HNO2) to convert it to Methanol. (2) Convert methanol to Methyl Iodide (CH3I) using P/I2. (3) React CH3I with Potassium Cyanide (KCN) to introduce a new carbon, forming Acetonitrile (CH3CN). (4) Reduce acetonitrile using LiAlH4 to yield Ethylamine (CH3CH2NH2)."
    },
    {
      id: "oc_2",
      question: "Which synthetic route converts Phenol into Aspirin?",
      options: [
        "Reduce to benzene, nitrate, reduce to aniline, then acetylate.",
        "React with NaOH and CO2 under pressure (Kolbe's reaction) to get salicylic acid, then acetylate with acetic anhydride.",
        "React with chloroform and NaOH (Reimer-Tiemann) to get salicylaldehyde, then oxidize.",
        "Brominate phenol, then treat with acetyl chloride."
      ],
      correctAnswer: "React with NaOH and CO2 under pressure (Kolbe's reaction) to get salicylic acid, then acetylate with acetic anhydride.",
      explanation: "The standard industrial synthesis of Aspirin from Phenol: (1) Treat phenol with aqueous NaOH to form sodium phenoxide. (2) Heat under pressure with CO2 (Kolbe's reaction) to form salicylic acid (2-hydroxybenzoic acid). (3) Acetylate the phenolic hydroxyl group of salicylic acid using acetic anhydride in the presence of an acid catalyst, yielding acetylsalicylic acid (Aspirin)."
    },
    {
      id: "oc_3",
      question: "How is Benzene converted into Benzoic acid?",
      options: [
        "Nitrate to nitrobenzene, reduce, then hydrolyze.",
        "Friedel-Crafts alkylation with CH3Cl/AlCl3 to form Toluene, followed by oxidation with alkaline KMnO4.",
        "React directly with carbon dioxide and hydrochloric acid.",
        "Ozonolysis followed by zinc reduction."
      ],
      correctAnswer: "Friedel-Crafts alkylation with CH3Cl/AlCl3 to form Toluene, followed by oxidation with alkaline KMnO4.",
      explanation: "To convert benzene to benzoic acid: (1) Perform a Friedel-Crafts alkylation by reacting benzene with methyl chloride (CH3Cl) in the presence of anhydrous AlCl3 to form Toluene (methylbenzene). (2) Oxidize the side-chain of toluene by boiling with a strong oxidizing agent like alkaline Potassium Permanganate (KMnO4). Acidification of the potassium benzoate salt yields Benzoic acid."
    },
    {
      id: "oc_4",
      question: "Passing Acetylene gas through a red-hot iron tube at 873 K yields which compound?",
      options: [
        "Ethene",
        "Benzene",
        "Toluene",
        "Butadiene"
      ],
      correctAnswer: "Benzene",
      explanation: "Passing Acetylene (ethyne, HC≡CH) through a red-hot iron tube at 873 K initiates a cyclic trimerization reaction. Three molecules of acetylene combine under thermal catalysis to form one molecule of Benzene (C6H6). This is a classic conversion to form aromatic compounds from simple aliphatic alkynes."
    },
    {
      id: "oc_5",
      question: "Which of the following reactions converts aniline into nitrobenzene?",
      options: [
        "Oxidation with Na2Cr2O7/H2SO4.",
        "Diazotization to form diazonium fluoroborate, followed by heating with aqueous NaNO2 in the presence of copper powder.",
        "Direct nitration of aniline using fuming nitric acid.",
        "Heating aniline with zinc dust."
      ],
      correctAnswer: "Diazotization to form diazonium fluoroborate, followed by heating with aqueous NaNO2 in the presence of copper powder.",
      explanation: "Direct oxidation of aniline destroys the ring. Nitrobenzene is prepared from aniline indirectly: (1) Aniline is diazotized to benzenediazonium chloride, then treated with fluoroboric acid (HBF4) to form insoluble benzenediazonium fluoroborate (ArN2+BF4-). (2) Heating this fluoroborate salt with aqueous Sodium Nitrite (NaNO2) in the presence of copper powder replaces the diazonium group with a nitro group, yielding Nitrobenzene."
    },
    {
      id: "oc_6",
      question: "To convert Ethanol (C2H5OH) to Acetone (CH3COCH3), which synthetic pathway is most practical?",
      options: [
        "Oxidize ethanol to acetic acid, react with calcium hydroxide to form calcium acetate, then dry distill.",
        "Dehydrate ethanol to ethene, then react with carbon monoxide.",
        "Oxidize ethanol to acetaldehyde, then treat with methyl iodide.",
        "React ethanol with sodamide."
      ],
      correctAnswer: "Oxidize ethanol to acetic acid, react with calcium hydroxide to form calcium acetate, then dry distill.",
      explanation: "To synthesize Acetone from Ethanol: (1) Oxidize ethanol to Acetic acid (CH3COOH) using K2Cr2O7/H2SO4. (2) Neutralize the acid with calcium hydroxide (Ca(OH)2) to form Calcium acetate [(CH3COO)2Ca]. (3) Dry distill (thermal pyrolysis) the solid calcium acetate. This decomposes it into Acetone (CH3COCH3) and calcium carbonate (CaCO3)."
    },
    {
      id: "oc_7",
      question: "How can you convert Propene (CH3-CH=CH2) into Allyl chloride (CH2=CH-CH2Cl)?",
      options: [
        "Add hydrochloric acid (HCl) at room temperature.",
        "Treat with chlorine gas at extremely high temperatures (773 K / 500°C) or use NBS.",
        "Treat with aqueous chlorine (HOCl).",
        "Perform oxymercuration-demercuration."
      ],
      correctAnswer: "Treat with chlorine gas at extremely high temperatures (773 K / 500°C) or use NBS.",
      explanation: "Addition of halogen (Cl2) to propene at room temperature occurs across the double bond, yielding 1,2-dichloropropane. However, at extremely high temperatures (773 K / 500°C), halogen addition is unfavorable, and instead, a free-radical substitution selectively occurs at the allylic C-H bond, replacing it with chlorine to yield Allyl chloride (CH2=CH-CH2Cl). Using N-Bromosuccinimide (NBS) also achieves allylic substitution."
    },
    {
      id: "oc_8",
      question: "Which reduction reaction converts Acetic acid (CH3COOH) into Acetaldehyde (CH3CHO) via an acyl chloride intermediate?",
      options: [
        "Convert to acetyl chloride using SOCl2, followed by Rosenmund Reduction (H2 / Pd-BaSO4).",
        "Direct reduction with LiAlH4.",
        "Clemmensen reduction.",
        "Wolff-Kishner reduction."
      ],
      correctAnswer: "Convert to acetyl chloride using SOCl2, followed by Rosenmund Reduction (H2 / Pd-BaSO4).",
      explanation: "Direct reduction of carboxylic acids to aldehydes is difficult because aldehydes are more reactive than acids and reduce instantly to alcohols. To stop at the aldehyde: (1) Convert acetic acid to Acetyl chloride (CH3COCl) using thionyl chloride (SOCl2). (2) Reduce acetyl chloride using hydrogen gas over a poisoned palladium catalyst (Pd-BaSO4 poisoned with sulfur, known as Rosenmund Reduction) to yield Acetaldehyde."
    },
    {
      id: "oc_9",
      question: "Converting Ethyl chloride (C2H5Cl) into Diethyl ether (C2H5OC2H5) is best accomplished by which reaction?",
      options: [
        "Heating with aqueous KOH.",
        "Reacting with Sodium ethoxide (C2H5ONa) (Williamson Ether Synthesis).",
        "Dry distillation.",
        "Wurtz coupling."
      ],
      correctAnswer: "Reacting with Sodium ethoxide (C2H5ONa) (Williamson Ether Synthesis).",
      explanation: "The best method to convert ethyl chloride to diethyl ether is the Williamson Ether Synthesis. Reacting ethyl chloride (a primary alkyl halide) with Sodium Ethoxide (C2H5ONa) initiates a rapid SN2 substitution, where the ethoxide ion nucleophilically attacks the ethyl carbon, displacing the chloride ion to yield Diethyl ether."
    },
    {
      id: "oc_10",
      question: "How can you convert Phenol to Benzene?",
      options: [
        "Distill with Zinc dust.",
        "Oxidize with chromic acid.",
        "Treat with soda lime.",
        "Diazotize followed by KI reduction."
      ],
      correctAnswer: "Distill with Zinc dust.",
      explanation: "Phenol is easily reduced back to Benzene by heating or distilling it with metallic Zinc dust. The zinc acts as a strong reducing agent, removing the oxygen from phenol to form solid zinc oxide (ZnO) and releasing the parent aromatic hydrocarbon Benzene."
    }
  ],
  "reaction-mechanisms": [
    {
      id: "rm_1",
      question: "What is the structure of the transition state in a bimolecular nucleophilic substitution (SN2) reaction?",
      options: [
        "A planar, sp2 hybridized carbocation intermediate.",
        "A pentacoordinate carbon with a trigonal bipyramidal geometry.",
        "A transient carbanion intermediate.",
        "A tetrahedral radical intermediate."
      ],
      correctAnswer: "A pentacoordinate carbon with a trigonal bipyramidal geometry.",
      explanation: "The SN2 reaction is a single-step, concerted process with no intermediates. In the transition state, the nucleophile is partially bonded to the backside of the carbon while the leaving group's bond is partially broken. The carbon atom is temporarily bonded to five groups (pentacoordinate) with a trigonal bipyramidal geometry, where the three non-reacting groups lie in a single plane."
    },
    {
      id: "rm_2",
      question: "In a unimolecular nucleophilic substitution (SN1) of a chiral alkyl halide, what is the typical stereochemical outcome and why?",
      options: [
        "Complete inversion of configuration due to backside attack.",
        "Complete retention of configuration due to frontside attack.",
        "Racemization (50% inversion, 50% retention) due to a planar carbocation intermediate.",
        "Formation of a meso compound."
      ],
      correctAnswer: "Racemization (50% inversion, 50% retention) due to a planar carbocation intermediate.",
      explanation: "The first step of an SN1 reaction is the slow loss of the leaving group to form a carbocation intermediate. Carbocations are sp2 hybridized and possess a flat, planar geometry. Since the planar intermediate is symmetrical, the incoming nucleophile has an equal probability of attacking from either the front side or the back side, resulting in an equal mixture of both enantiomers (Racemization)."
    },
    {
      id: "rm_3",
      question: "During electrophilic addition of Bromine (Br2) to Ethene, what key cyclic intermediate is formed?",
      options: [
        "A primary carbocation",
        "A cyclic Bromonium ion",
        "A cyclic carbanion",
        "A bromomethyl radical"
      ],
      correctAnswer: "A cyclic Bromonium ion",
      explanation: "Electrophilic addition of Bromine does not proceed via a simple open carbocation. As the ethene pi-cloud polarizes the Br-Br bond, a bromine atom adds while sharing its lone pairs with the other carbon, forming a stable three-membered heterocyclic intermediate called a cyclic Bromonium ion. The bromide ion then attacks this strained ring from the backside, resulting in anti-addition."
    },
    {
      id: "rm_4",
      question: "What spatial configuration must the beta-hydrogen and the leaving group adopt for an E2 elimination reaction to occur?",
      options: [
        "Syn-coplanar orientation",
        "Anti-periplanar (180° dihedral angle) orientation",
        "Gauche orientation",
        "Eclipsed orientation"
      ],
      correctAnswer: "Anti-periplanar (180° dihedral angle) orientation",
      explanation: "E2 elimination is a concerted reaction. For the base to abstract the beta-proton while the leaving group leaves, orbital overlap must be maximized. This requires the C-H bond and the C-X bond to be in a single plane and pointing in opposite directions (dihedral angle of 180°), known as the Anti-periplanar conformation. This minimizes electronic repulsion and allows a smooth transition into the new pi-bond."
    },
    {
      id: "rm_5",
      question: "What intermediate is formed during electrophilic aromatic substitution (EAS) of benzene?",
      options: [
        "A benzyne triple bond",
        "A resonance-stabilized arenium ion (sigma complex / Wheland intermediate)",
        "A planar phenyl carbocation",
        "A cyclohexadienyl radical"
      ],
      correctAnswer: "A resonance-stabilized arenium ion (sigma complex / Wheland intermediate)",
      explanation: "In an EAS reaction, the electrophile attacks the benzene ring, breaking the aromatic system to form a non-aromatic carbocation intermediate. This intermediate is named the Sigma Complex, Wheland intermediate, or Arenium ion. The positive charge in the arenium ion is delocalized over the remaining five sp2 carbons of the ring via resonance, stabilizing it until a proton is eliminated to restore aromaticity."
    },
    {
      id: "rm_6",
      question: "What is the rate-determining step in the nucleophilic addition of HCN to a carbonyl compound?",
      options: [
        "Protonation of the carbonyl oxygen.",
        "Nucleophilic attack of the cyanide ion (CN-) on the electrophilic carbonyl carbon.",
        "Dissociation of HCN into ions.",
        "Elimination of water."
      ],
      correctAnswer: "Nucleophilic attack of the cyanide ion (CN-) on the electrophilic carbonyl carbon.",
      explanation: "Nucleophilic addition to carbonyls is a two-step mechanism. The rate-determining (slow) step is the nucleophilic attack of the cyanide ion (CN-) on the partially positive carbonyl carbon, breaking the carbon-oxygen pi-bond to form a tetrahedral alkoxide intermediate. The subsequent protonation of this alkoxide oxygen by a proton is extremely rapid."
    },
    {
      id: "rm_7",
      question: "Which ester hydrolysis mechanism describes the base-catalyzed saponification of simple esters?",
      options: [
        "AAC2 (Acid-catalyzed, acyl-oxygen cleavage, bimolecular)",
        "BAC2 (Base-catalyzed, acyl-oxygen cleavage, bimolecular)",
        "ALK1 (Acid-catalyzed, alkyl-oxygen cleavage, unimolecular)",
        "BAL2 (Base-catalyzed, alkyl-oxygen cleavage, bimolecular)"
      ],
      correctAnswer: "BAC2 (Base-catalyzed, acyl-oxygen cleavage, bimolecular)",
      explanation: "Base-catalyzed ester hydrolysis (saponification) proceeds via the BAC2 mechanism. The 'B' stands for base-catalyzed, 'AC' for acyl-oxygen cleavage (the bond between the carbonyl carbon and oxygen is broken), and '2' for bimolecular. The hydroxide ion (base) attacks the carbonyl carbon to form a tetrahedral intermediate, which then collapses, cleaving the acyl-oxygen bond."
    },
    {
      id: "rm_8",
      question: "What are the three sequential stages in the free-radical halogenation of methane?",
      options: [
        "Addition, Elimination, Rearrangement",
        "Initiation, Propagation, Termination",
        "Protonation, Coordination, Dehydration",
        "Oxidation, Reduction, Neutralization"
      ],
      correctAnswer: "Initiation, Propagation, Termination",
      explanation: "Free-radical halogenation is a chain reaction. (1) Initiation: homolytic cleavage of a halogen molecule (using light/heat) to create two active halogen radicals. (2) Propagation: radicals react with stable molecules to form new radicals, maintaining the chain (e.g., Cl. + CH4 -> CH3. + HCl). (3) Termination: any two radicals combine together to form a stable molecule, ending the chain."
    },
    {
      id: "rm_9",
      question: "Why does the electrophilic addition of HBr to propene yield 2-bromopropane (Markovnikov) rather than 1-bromopropane?",
      options: [
        "1-Bromopropane is sterically hindered.",
        "The mechanism goes through a highly stable secondary carbocation rather than a less stable primary carbocation.",
        "Fluorine contamination favors 2-bromopropane.",
        "The E2 pathway blocks 1-bromopropane."
      ],
      correctAnswer: "The mechanism goes through a highly stable secondary carbocation rather than a less stable primary carbocation.",
      explanation: "In electrophilic addition, H+ adds first to the alkene. If it adds to the terminal carbon, it creates a secondary carbocation (CH3-CH+-CH3). If it adds to the middle carbon, it creates a primary carbocation (CH3-CH2-CH2+). Secondary carbocations are much more stable than primary ones due to hyperconjugation and alkyl inductive effects (+I). The electrophilic attack proceeds via the lower activation energy path of the stable secondary cation, yielding 2-bromopropane."
    },
    {
      id: "rm_10",
      question: "In an SN1 reaction, what is a carbocation rearrangement, and when does it occur?",
      options: [
        "The leaving group re-attacks the substrate.",
        "A hydride or alkyl group shifts to an adjacent carbon to form a more stable carbocation.",
        "The carbon ring contracts to relieve strain.",
        "The reaction mechanism swaps to an SN2 pathway."
      ],
      correctAnswer: "A hydride or alkyl group shifts to an adjacent carbon to form a more stable carbocation.",
      explanation: "Carbocations are highly unstable intermediates that will rearrange if possible to gain stability. If a carbocation (such as a primary or secondary carbocation) has a hydrogen or alkyl group on an adjacent carbon that, upon shifting (1,2-hydride shift or 1,2-methyl shift), can create a more stable secondary or tertiary carbocation, this shift will occur spontaneously prior to nucleophilic attack."
    }
  ]
};

/**
 * Generates an organic chemistry quiz containing exactly 10 MCQs for the specified category.
 * If the category does not exist, a default one (e.g. haloalkanes or reaction-mechanisms) is used.
 * @param {string} categoryName - The human readable or slug category name.
 * @returns {Array} Array of 10 MCQ objects.
 */
// Pre-process the question pool to attach conceptTag and difficulty properties for competitive exam analysis
const questionMetadata = {
  // Haloalkanes
  "ha_1": { difficulty: "easy", conceptTag: "SN2 Substitution Kinetics" },
  "ha_2": { difficulty: "medium", conceptTag: "Walden Inversion" },
  "ha_3": { difficulty: "medium", conceptTag: "SN1 Solvation Stabilization" },
  "ha_4": { difficulty: "hard", conceptTag: "Finkelstein Equilibrium Bounds" },
  "ha_5": { difficulty: "easy", conceptTag: "Swarts Reaction Reagents" },
  "ha_6": { difficulty: "hard", conceptTag: "Grignard Water Sensitivity" },
  "ha_7": { difficulty: "medium", conceptTag: "Saytzeff Dehydrohalogenation" },
  "ha_8": { difficulty: "medium", conceptTag: "Aqueous vs Alcoholic KOH" },
  "ha_9": { difficulty: "hard", conceptTag: "C-X Bond Dipole Moments" },
  "ha_10": { difficulty: "easy", conceptTag: "Wurtz Coupling Synthesis" },

  // Haloarenes
  "har_1": { difficulty: "medium", conceptTag: "Aromatic C-X Resonance Stability" },
  "har_2": { difficulty: "hard", conceptTag: "Nucleophilic Aromatic Activation (EWG)" },
  "har_3": { difficulty: "easy", conceptTag: "Electrophilic Halogenation Catalyst" },
  "har_4": { difficulty: "hard", conceptTag: "Aromatic Halogen Ortho/Para Directing" },
  "har_5": { difficulty: "easy", conceptTag: "Wurtz-Fittig Coupling" },
  "har_6": { difficulty: "medium", conceptTag: "Gattermann Diazonium Conversion" },
  "har_7": { difficulty: "medium", conceptTag: "Sandmeyer Benzonitrile Route" },
  "har_8": { difficulty: "medium", conceptTag: "Balz-Schiemann Fluorination" },
  "har_9": { difficulty: "hard", conceptTag: "Benzyne Elimination-Addition Intermediate" },
  "har_10": { difficulty: "hard", conceptTag: "sp2 vs sp3 C-Cl Bond Lengths" },

  // Alcohols
  "al_1": { difficulty: "easy", conceptTag: "Lucas Turbidity Distinction" },
  "al_2": { difficulty: "medium", conceptTag: "Selective PCC Oxidation" },
  "al_3": { difficulty: "medium", conceptTag: "Hydroboration-Oxidation Regioselectivity" },
  "al_4": { difficulty: "medium", conceptTag: "Alcohol Inductive Acidic Strength" },
  "al_5": { difficulty: "hard", conceptTag: "Iodoform Methyl Carbinol Check" },
  "al_6": { difficulty: "easy", conceptTag: "Temperature-Dependent Dehydration" },
  "al_7": { difficulty: "hard", conceptTag: "Oxymercuration-Demercuration Mechanisms" },
  "al_8": { difficulty: "medium", conceptTag: "Victor Meyer Red-Blue-Colorless Test" },
  "al_9": { difficulty: "hard", conceptTag: "Fischer Esterification O-H Cleavage" },
  "al_10": { difficulty: "easy", conceptTag: "Alcohol Intermolecular H-Bonding" },

  // Phenols
  "ph_1": { difficulty: "medium", conceptTag: "Phenoxide Resonance Stability" },
  "ph_2": { difficulty: "medium", conceptTag: "Kolbe's Salicylic Synthesis" },
  "ph_3": { difficulty: "hard", conceptTag: "Reimer-Tiemann Dichlorocarbene Intermediate" },
  "ph_4": { difficulty: "easy", conceptTag: "Neutral FeCl3 Violet Complex" },
  "ph_5": { difficulty: "medium", conceptTag: "Phenolic Substituted Acidic Trends" },
  "ph_6": { difficulty: "easy", conceptTag: "Zinc Dust Aromatic Reduction" },
  "ph_7": { difficulty: "medium", conceptTag: "Picric Acid Synthesis & Acidity" },
  "ph_8": { difficulty: "easy", conceptTag: "Diazonium Azo Coupling pH Bounds" },
  "ph_9": { difficulty: "medium", conceptTag: "Chromic Acid Benzoquinone Oxidation" },
  "ph_10": { difficulty: "hard", conceptTag: "Intra vs Intermolecular H-Bonding" },

  // Ethers
  "et_1": { difficulty: "easy", conceptTag: "Williamson SN2 Substitution Kinetics" },
  "et_2": { difficulty: "hard", conceptTag: "Unsymmetrical Ether HI Cleavage" },
  "et_3": { difficulty: "medium", conceptTag: "Aliphatic Ether Dehydration Temperatures" },
  "et_4": { difficulty: "medium", conceptTag: "Ether Light-Activated Peroxidation" },
  "et_5": { difficulty: "medium", conceptTag: "Anisole Activating Resonance Directing" },
  "et_6": { difficulty: "hard", conceptTag: "Epoxide Angle Strain Ring Opening" },
  "et_7": { difficulty: "easy", conceptTag: "Zeisel Methoxy Quantitative Estimation" },
  "et_8": { difficulty: "medium", conceptTag: "Crown Ether Cavity Solvation" },
  "et_9": { difficulty: "easy", conceptTag: "Ether Intermolecular H-Bonding Deficiency" },
  "et_10": { difficulty: "hard", conceptTag: "Anisole sp2 Cleavage Resistance" },

  // Aldehydes
  "ald_1": { difficulty: "easy", conceptTag: "Tollen's Silver Mirror Oxidation" },
  "ald_2": { difficulty: "easy", conceptTag: "Fehling's Tartrate Rochelle Precipitation" },
  "ald_3": { difficulty: "medium", conceptTag: "Cannizzaro Disproportionation Self-Redox" },
  "ald_4": { difficulty: "hard", conceptTag: "Cyanohydrin Chiral Addition Geometry" },
  "ald_5": { difficulty: "medium", conceptTag: "Stephen's Aldimine Reduction" },
  "ald_6": { difficulty: "easy", conceptTag: "Clemmensen Carbonyl Deoxygenation" },
  "ald_7": { difficulty: "medium", conceptTag: "Carbonyl Steric & Inductive Reactivity" },
  "ald_8": { difficulty: "easy", conceptTag: "2,4-DNP Brady Carbonyl Detection" },
  "ald_9": { difficulty: "hard", conceptTag: "Hemiacetal to Acetal Dry HCl Equilibrium" },
  "ald_10": { difficulty: "medium", conceptTag: "Alpha-Hydrogen Enolate Condensation Requirement" },

  // Ketones
  "ket_1": { difficulty: "easy", conceptTag: "Iodoform Methyl Ketone Cleavage" },
  "ket_2": { difficulty: "medium", conceptTag: "Grignard Tertiary Alcohol Synthesis" },
  "ket_3": { difficulty: "hard", conceptTag: "Baeyer-Villiger Ester Rearrangement" },
  "ket_4": { difficulty: "medium", conceptTag: "Pinacol Radical Divalent Coupling" },
  "ket_5": { difficulty: "hard", conceptTag: "Cyclic Ketal Dioxolane Protection" },
  "ket_6": { difficulty: "medium", conceptTag: "Popoff's Carbonyl Cleavage Distribution" },
  "ket_7": { difficulty: "easy", conceptTag: "Rosenmund Catalytic Reduction Scope" },
  "ket_8": { difficulty: "hard", conceptTag: "Acetone Trimerization Mesitylene Cycle" },
  "ket_9": { difficulty: "medium", conceptTag: "Macrocyclic Muskone Sachse-Mohr Stability" },
  "ket_10": { difficulty: "hard", conceptTag: "Organocadmium Carbonyl-Selective Coupling" },

  // Carboxylic Acids
  "ca_1": { difficulty: "medium", conceptTag: "Carboxylate vs Phenoxide Charge Delocalization" },
  "ca_2": { difficulty: "easy", conceptTag: "Acidity Inductive Halogen Directives" },
  "ca_3": { difficulty: "hard", conceptTag: "HVZ Alpha-Carbon Halogenation" },
  "ca_4": { difficulty: "easy", conceptTag: "Soda Lime Decarboxylation Cycles" },
  "ca_5": { difficulty: "hard", conceptTag: "Diborane Chemoselective Reduction" },
  "ca_6": { difficulty: "medium", conceptTag: "SOCl2 Acyl Chloride Volatile Isolation" },
  "ca_7": { difficulty: "hard", conceptTag: "Hunsdiecker Decarboxylative Bromination" },
  "ca_8": { difficulty: "easy", conceptTag: "Phthalic Cyclic Anhydride Dehydration" },
  "ca_9": { difficulty: "easy", conceptTag: "Carboxylic Cyclic Hydrogen-Bonding Dimers" },
  "ca_10": { difficulty: "medium", conceptTag: "Grignard Dry Ice Carbonation" },

  // Amines
  "am_1": { difficulty: "hard", conceptTag: "Aqueous Amine Basicity Solvation Counterbalance" },
  "am_2": { difficulty: "medium", conceptTag: "Gabriel Phthalimide Pure Monoalkylation" },
  "am_3": { difficulty: "hard", conceptTag: "Hoffmann Bromamide Degradation Rearrangement" },
  "am_4": { difficulty: "easy", conceptTag: "Carbylamine Isocyanide Diagnostic Test" },
  "am_5": { difficulty: "medium", conceptTag: "Hinsberg Sulfonamide Basicity Separation" },
  "am_6": { difficulty: "medium", conceptTag: "Aniline Aromatic Resonance Basicity Reduction" },
  "am_7": { difficulty: "easy", conceptTag: "Aniline Activator Bromine Water Synthesis" },
  "am_8": { difficulty: "easy", conceptTag: "Aniline Low-Temperature Diazotization" },
  "am_9": { difficulty: "easy", conceptTag: "Nitrile Hydride Chain Reductions" },
  "am_10": { difficulty: "medium", conceptTag: "Secondary Amine Yellow Nitroso Oil Test" },

  // Azo Compounds
  "azo_1": { difficulty: "easy", conceptTag: "Azo Nitrogen-Nitrogen Conjugation" },
  "azo_2": { difficulty: "medium", conceptTag: "Aniline Mild Acidic Azo Coupling" },
  "azo_3": { difficulty: "easy", conceptTag: "Chromophore pi-pi* HOMO-LUMO Gap Colors" },
  "azo_4": { difficulty: "easy", conceptTag: "Methyl Orange Quinonoid pH Transition" },
  "azo_5": { difficulty: "medium", conceptTag: "Diazonium Electrophilic Coupling Directives" },
  "azo_6": { difficulty: "medium", conceptTag: "Diazonium Low Temperature Bounds" },
  "azo_7": { difficulty: "medium", conceptTag: "H3PO2 Decarbonative Diazonium Reduction" },
  "azo_8": { difficulty: "easy", conceptTag: "Diazonium KI Halide Exchange" },
  "azo_9": { difficulty: "medium", conceptTag: "beta-Naphthol Sudan Azo Coupling" },
  "azo_10": { difficulty: "hard", conceptTag: "Azo Tin-Acid Hydrogenative Cleavage" },

  // Named Reactions
  "nr_1": { difficulty: "easy", conceptTag: "Cannizzaro Alpha-Hydrogen Check" },
  "nr_2": { difficulty: "medium", conceptTag: "Aldol Enolate Formation Basicity" },
  "nr_3": { difficulty: "medium", conceptTag: "Perkin Cinnamic Condensation Cycle" },
  "nr_4": { difficulty: "hard", conceptTag: "Beckmann Oxime Caprolactam Rearrangement" },
  "nr_5": { difficulty: "medium", conceptTag: "Benzoin Cyanide-Catalyzed Condensation" },
  "nr_6": { difficulty: "easy", conceptTag: "Iodoform Haloform Cleavage Bounds" },
  "nr_7": { difficulty: "easy", conceptTag: "Clemmensen Carbonyl Complete Deoxygenation" },
  "nr_8": { difficulty: "easy", conceptTag: "Salicylic Phenolic Acetylation" },
  "nr_9": { difficulty: "medium", conceptTag: "Ullmann Biaryl Copper Coupling" },
  "nr_10": { difficulty: "easy", conceptTag: "Hoffmann Bromamide Degradation Limits" },

  // Organic Conversions
  "oc_1": { difficulty: "hard", conceptTag: "Amine Nitrile Chain Ascent Route" },
  "oc_2": { difficulty: "medium", conceptTag: "Phenol Aspirin Kolbe Route" },
  "oc_3": { difficulty: "medium", conceptTag: "Benzene Toluene Benzoic Oxidation Route" },
  "oc_4": { difficulty: "easy", conceptTag: "Acetylene Aromatic Cyclotrimerization" },
  "oc_5": { difficulty: "hard", conceptTag: "Aniline Diazonium Nitrobenzene Conversion" },
  "oc_6": { difficulty: "medium", conceptTag: "Ethanol Acetic Acid Calcium Distillation" },
  "oc_7": { difficulty: "medium", conceptTag: "Propene High-Temperature Allylic Halogenation" },
  "oc_8": { difficulty: "hard", conceptTag: "Rosenmund Poisoned Aldehyde Reduction" },
  "oc_9": { difficulty: "easy", conceptTag: "Williamson Aliphatic Ether Synthesis" },
  "oc_10": { difficulty: "easy", conceptTag: "Phenol Zinc Dust Reduction Route" },

  // Reaction Mechanisms
  "rm_1": { difficulty: "easy", conceptTag: "SN2 Trigonal Bipyramidal Transition State" },
  "rm_2": { difficulty: "medium", conceptTag: "SN1 Planar Racemization Stereochemistry" },
  "rm_3": { difficulty: "medium", conceptTag: "Alkene Electrophilic Cyclic Bromonium Ion" },
  "rm_4": { difficulty: "hard", conceptTag: "E2 Anti-Periplanar Conformation Needs" },
  "rm_5": { difficulty: "medium", conceptTag: "EAS Sigma Wheland Resonance Complex" },
  "rm_6": { difficulty: "medium", conceptTag: "Carbonyl Nucleophilic Cyanide Addition Step" },
  "rm_7": { difficulty: "hard", conceptTag: "BAC2 Ester Hydrolysis Saponification Cleavage" },
  "rm_8": { difficulty: "easy", conceptTag: "Free Radical Halogenation Propagation Stages" },
  "rm_9": { difficulty: "medium", conceptTag: "Alkene Markovnikov Carbocation Hyperconjugation" },
  "rm_10": { difficulty: "hard", conceptTag: "SN1 Carbocation Shift Rearrangement Paths" }
};

// Augment the questionPool with metadata properties
for (const category in questionPool) {
  questionPool[category].forEach(question => {
    const meta = questionMetadata[question.id] || { difficulty: "medium", conceptTag: "Organic Chemistry Core" };
    question.difficulty = meta.difficulty;
    question.conceptTag = meta.conceptTag;
    question.topic = category;
    question.answer = question.correctAnswer;
    
    // Determine questionType based on text content and keywords
    let qType = "MCQ";
    const qText = question.question.toLowerCase();
    if (qText.includes("assert") || qText.includes("reason")) {
      qType = "ASSERTION_REASON";
    } else if (qText.includes("product") || qText.includes("yield") || qText.includes("form")) {
      qType = "REACTION_PREDICTION";
    } else if (qText.includes("reagent") || qText.includes("catalyst")) {
      qType = "REAGENT_IDENTIFICATION";
    } else if (qText.includes("convert") || qText.includes("pathway")) {
      qType = "ORGANIC_CONVERSIONS";
    } else if (qText.includes("mechanism") || qText.includes("sn1") || qText.includes("sn2") || qText.includes("e2")) {
      qType = "MECHANISM_BASED";
    }
    question.questionType = qType;

    // Determine or assign visual reactionData representation
    let rxData = null;
    const eqRegex = /([A-Za-z0-9\(\)\-\+=#]+(?:\s*[\+\-]\s*[A-Za-z0-9\(\)\-\+=#]+)*\s*(?:->|-->|=>|-->|\\rightarrow)\s*[A-Za-z0-9\(\)\-\+=#\s\/\(\)]+)/i;
    const match = question.question.match(eqRegex) || (question.explanation && question.explanation.match(eqRegex));
    if (match) {
      rxData = match[0];
    } else {
      if (qText.includes("sn2")) rxData = "OH- + CH3-Cl -> [HO...CH3...Cl]‡ -> CH3-OH + Cl-";
      else if (qText.includes("sn1")) rxData = "(CH3)3C-Cl -> (CH3)3C+ + Cl-  ---(OH-)--->  (CH3)3C-OH";
      else if (qText.includes("grignard")) rxData = "CH3-CH2-Br + Mg ---(dry ether)---> CH3-CH2-MgBr";
      else if (qText.includes("finkelstein")) rxData = "CH3-CH2-Cl + NaI ---(dry acetone)---> CH3-CH2-I + NaCl (ppt)";
      else if (qText.includes("swarts")) rxData = "CH3-CH2-Br + AgF ---(heat)---> CH3-CH2-F + AgBr";
      else if (qText.includes("wurtz")) rxData = "2 CH3-Cl + 2 Na ---(dry ether)---> CH3-CH3 + 2 NaCl";
      else if (qText.includes("kolbe")) rxData = "C6H5-OH + CO2 ---(1. NaOH / 2. H+)---> C6H4(OH)(COOH)";
      else if (qText.includes("reimer-tiemann")) rxData = "C6H5-OH + CHCl3 + NaOH ---(60°C)---> C6H4(OH)(CHO)";
      else if (qText.includes("dehydration")) rxData = "CH3-CH2-OH ---(conc. H2SO4 / 170°C)---> CH2=CH2 + H2O";
      else if (qText.includes("stephen")) rxData = "CH3-CN ---(1. SnCl2/HCl / 2. H2O)---> CH3-CHO";
      else if (qText.includes("clemmensen")) rxData = "CH3-CO-CH3 ---(Zn-Hg / conc. HCl)---> CH3-CH2-CH3";
      else if (qText.includes("cannizzaro")) rxData = "2 C6H5-CHO ---(conc. NaOH)---> C6H5-CH2OH + C6H5-COONa";
    }
    question.reactionData = rxData;
  });
}

/**
 * Generates an organic chemistry quiz containing exactly 10 MCQs for the specified category,
 * dynamically filtered by chosen difficulty.
 * @param {string} categoryName - The human readable or slug category name.
 * @param {string} difficulty - The chosen exam difficulty ("easy", "medium", "hard").
 * @returns {Array} Array of exactly 10 MCQ objects.
 */
export function generateQuiz(categoryName, difficulty = "medium") {
  // Normalize the category string to match the keys of our questionPool
  let key = String(categoryName).toLowerCase().trim();
  
  // Custom mapping for slugs or conversational queries
  if (key.includes("haloalkane")) key = "haloalkanes";
  else if (key.includes("haloarene")) key = "haloarenes";
  else if (key.includes("alcohol")) key = "alcohols";
  else if (key.includes("phenol")) key = "phenols";
  else if (key.includes("ether")) key = "ethers";
  else if (key.includes("aldehyde")) key = "aldehydes";
  else if (key.includes("ketone")) key = "ketones";
  else if (key.includes("carboxylic") || key.includes("acid")) key = "carboxylic-acids";
  else if (key.includes("amine")) key = "amines";
  else if (key.includes("azo")) key = "azo-compounds";
  else if (key.includes("named") || key.includes("reaction")) {
    if (key.includes("mechanism")) {
      key = "reaction-mechanisms";
    } else {
      key = "named-reactions";
    }
  }
  else if (key.includes("conversion")) key = "organic-conversions";
  else if (key.includes("mechanism")) key = "reaction-mechanisms";

  // Fallback to a default pool if the key is not found
  const pool = questionPool[key] || questionPool["reaction-mechanisms"];
  
  // Filter by difficulty (e.g. easy, medium, hard)
  const targetDifficulty = String(difficulty).toLowerCase();
  let filtered = pool.filter(q => q.difficulty === targetDifficulty);
  
  // Fallback to the whole pool if no matching questions exist for that difficulty
  if (filtered.length === 0) {
    filtered = pool;
  }
  
  // Shuffle filtered set
  let shuffled = [...filtered].sort(() => 0.5 - Math.random());
  
  // If the filtered list contains less than 10 questions, fill the remainder with other questions from the general pool
  if (shuffled.length < 10) {
    const remaining = pool.filter(q => !shuffled.some(sq => sq.id === q.id));
    const extra = [...remaining].sort(() => 0.5 - Math.random());
    shuffled = [...shuffled, ...extra];
  }

  // Return exactly 10 questions, deep cloning and shuffling option slots
  const selectedQuestions = shuffled.slice(0, 10).map(q => {
    const clone = JSON.parse(JSON.stringify(q));
    if (clone.options && clone.options.length > 0) {
      clone.options = [...clone.options].sort(() => Math.random() - 0.5);
    }
    return clone;
  });

  return selectedQuestions;
}

/**
 * Retrieves the human-readable title for a given category key or slug
 * @param {string} categoryKey 
 * @returns {string} Human title
 */
export function getCategoryTitle(categoryKey) {
  const mapping = {
    "haloalkanes": "Haloalkanes",
    "haloarenes": "Haloarenes",
    "alcohols": "Alcohols",
    "phenols": "Phenols",
    "ethers": "Ethers",
    "aldehydes": "Aldehydes",
    "ketones": "Ketones",
    "carboxylic-acids": "Carboxylic Acids",
    "amines": "Amines",
    "azo-compounds": "Azo Compounds",
    "named-reactions": "Named Reactions",
    "organic-conversions": "Organic Conversions",
    "reaction-mechanisms": "Reaction Mechanisms"
  };
  
  let key = String(categoryKey).toLowerCase().trim();
  if (key.includes("haloalkane")) return mapping["haloalkanes"];
  if (key.includes("haloarene")) return mapping["haloarenes"];
  if (key.includes("alcohol")) return mapping["alcohols"];
  if (key.includes("phenol")) return mapping["phenols"];
  if (key.includes("ether")) return mapping["ethers"];
  if (key.includes("aldehyde")) return mapping["aldehydes"];
  if (key.includes("ketone")) return mapping["ketones"];
  if (key.includes("carboxylic") || key.includes("acid")) return mapping["carboxylic-acids"];
  if (key.includes("amine")) return mapping["amines"];
  if (key.includes("azo")) return mapping["azo-compounds"];
  if (key.includes("named") || key.includes("reaction")) {
    if (key.includes("mechanism")) return mapping["reaction-mechanisms"];
    return mapping["named-reactions"];
  }
  if (key.includes("conversion")) return mapping["organic-conversions"];
  if (key.includes("mechanism")) return mapping["reaction-mechanisms"];
  
  return categoryKey;
}

/**
 * Modular AI service layer.
 * Generates an organic chemistry quiz by analyzing a chapter's text content.
 * 
 * Supports future API integrations (Gemini, Groq, OpenAI) without hardcoding credentials.
 * Falls back to our high-yield syllabus-accurate offline database for local development.
 * 
 * @param {string} topicContent - The full serialized educational text content of the active page/chapter.
 * @param {string} difficulty - The difficulty tier ("easy", "medium", "hard").
 * @returns {Promise<Array>|Array} 10 competitive MCQs matching the requested JSON structure.
 */
export async function generateQuizFromContent(topicContent, difficulty = "medium") {
  console.log("Catalyst AI Engine: Analyzing active chapter content...");
  
  try {
    // Attempt live generation via Node/Express proxy backend
    const result = await generateAIQuiz(topicContent, difficulty);
    if (result.success && Array.isArray(result.quiz) && result.quiz.length === 10) {
      console.log("Catalyst AI: Live quiz generated successfully.");
      return result.quiz;
    }
  } catch (e) {
    console.warn("Catalyst AI: Live API call failed, falling back to local pool.", e.message);
  }

  // FALLBACK OFFLINE ALGORITHM (Strictly reads current topic from content, and pulls from local database):
  let categorySlug = "reaction-mechanisms";
  const contentLower = topicContent.toLowerCase();
  
  if (contentLower.includes("haloalkane")) categorySlug = "haloalkanes";
  else if (contentLower.includes("haloarene")) categorySlug = "haloarenes";
  else if (contentLower.includes("alcohol")) categorySlug = "alcohols";
  else if (contentLower.includes("phenol")) categorySlug = "phenols";
  else if (contentLower.includes("ether")) categorySlug = "ethers";
  else if (contentLower.includes("aldehyde")) categorySlug = "aldehydes";
  else if (contentLower.includes("ketone")) categorySlug = "ketones";
  else if (contentLower.includes("carboxylic") || contentLower.includes("acid")) categorySlug = "carboxylic-acids";
  else if (contentLower.includes("amine")) categorySlug = "amines";
  else if (contentLower.includes("azo")) categorySlug = "azo-compounds";
  else if (contentLower.includes("named") || contentLower.includes("reaction")) {
    if (contentLower.includes("mechanism")) {
      categorySlug = "reaction-mechanisms";
    } else {
      categorySlug = "named-reactions";
    }
  }
  else if (contentLower.includes("conversion")) categorySlug = "organic-conversions";
  else if (contentLower.includes("mechanism")) categorySlug = "reaction-mechanisms";

  // Generate standard quiz based on mapped category
  return generateQuiz(categorySlug, difficulty);
}


