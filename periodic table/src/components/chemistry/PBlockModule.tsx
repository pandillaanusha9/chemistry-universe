import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { FloatingParticlesBackground } from '../landing/FloatingParticlesBackground';
import { ApplicationCard } from './ApplicationCard';
import { AtomViewer } from './AtomViewer';
import { CompoundCard } from './CompoundCard';
import { ElementSelector } from './ElementSelector';
import { VoiceNarrator } from './VoiceNarrator';
import { CompoundData, SBlockElement } from './sblockData';

interface PBlockChapter {
  title: string;
  subtitle: string;
}

interface ConfigToken {
  label: string;
  shellIndex: number | null;
}

interface TrendItem {
  id: string;
  label: string;
  direction: 'increase' | 'decrease';
  explanation: string;
}

interface ApplicationData {
  title: string;
  image: string;
  explanation: string;
  narration: string;
}

interface FamilyData {
  groupLabel: string;
  familyName: string;
  description: string;
  outerConfiguration: string;
  elements: SBlockElement[];
  trends: TrendItem[];
  increaseItems: string[];
  decreaseItems: string[];
  trendSummary: string;
  compounds: CompoundData[];
  applications: ApplicationData[];
}

const chapters: PBlockChapter[] = [
  { title: 'Group 13', subtitle: 'Boron family patterns, ns2 np1 configuration, +3 oxidation state, compounds, and materials uses.' },
  { title: 'Group 14', subtitle: 'Carbon family structures, catenation, oxidation states, compounds, preparations, and applications.' },
  { title: 'Group 15', subtitle: 'Nitrogen family bonding, hydrides, oxides, preparations, and biological-industrial relevance.' },
  { title: 'Group 16', subtitle: 'Oxygen family trends, allotropes, oxoacids, preparations, and environmental applications.' },
  { title: 'Group 17', subtitle: 'Halogen reactivity, interhalogens, acid strength, preparations, and disinfection/material uses.' },
  { title: 'Group 18', subtitle: 'Noble gas behavior, rare compounds, isolation methods, lighting, cryogenics, and shielding uses.' }
];

const familyDataByIndex: Record<number, FamilyData> = {
  0: {
    groupLabel: 'Group 13',
    familyName: 'Boron Family',
    description: 'Elements with outer electronic configuration ns²np¹ and common +3 oxidation state.',
    outerConfiguration: 'ns² np¹',
    elements: [
      { symbol: 'B', name: 'Boron', atomicNumber: 5, fullConfiguration: '1s² 2s² 2p¹', shells: [2, 3], valenceElectrons: 3, oxidationState: '+3', narration: 'Boron has ns2 np1 valence configuration and commonly shows plus three oxidation state.' },
      { symbol: 'Al', name: 'Aluminium', atomicNumber: 13, fullConfiguration: '1s² 2s² 2p⁶ 3s² 3p¹', shells: [2, 8, 3], valenceElectrons: 3, oxidationState: '+3', narration: 'Aluminium has three valence electrons and forms stable aluminium three plus ions.' },
      { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, fullConfiguration: '[Ar] 3d¹⁰ 4s² 4p¹', shells: [2, 8, 18, 3], valenceElectrons: 3, oxidationState: '+3, +1', narration: 'Gallium shows plus three oxidation state, with plus one becoming more relevant down the group.' },
      { symbol: 'In', name: 'Indium', atomicNumber: 49, fullConfiguration: '[Kr] 4d¹⁰ 5s² 5p¹', shells: [2, 8, 18, 18, 3], valenceElectrons: 3, oxidationState: '+3, +1', narration: 'Indium shows plus three and plus one oxidation states due to increasing inert pair effect.' },
      { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, fullConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', shells: [2, 8, 18, 32, 18, 3], valenceElectrons: 3, oxidationState: '+1, +3', narration: 'Thallium stabilizes plus one strongly because the ns2 pair becomes less available for bonding.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Down the group, atomic size increases due to the addition of new shells.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy generally decreases because valence electrons are farther from the nucleus and more shielded.' },
      { id: 'electronegativity', label: 'Electronegativity', direction: 'decrease', explanation: 'Electronegativity decreases down the family as atomic radius and shielding increase.' },
      { id: 'metallic-character', label: 'Metallic Character', direction: 'increase', explanation: 'Metallic nature increases because valence electrons are lost more easily down the group.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density generally increases because atomic mass rises significantly down the group.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'decrease', explanation: 'Melting points show irregularity, but the broad learning trend is a decrease from boron to heavier members.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'decrease', explanation: 'Boiling points generally decrease down the group with changes in bonding and metallic character.' },
      { id: 'oxidation-state-stability', label: 'Oxidation State Stability', direction: 'decrease', explanation: 'The plus three state becomes less stable down the group, while plus one becomes more stable due to inert pair effect.' },
      { id: 'covalent-character', label: 'Covalent Character', direction: 'decrease', explanation: 'Covalent character is highest for boron compounds and generally decreases as metallic character increases.' }
    ],
    increaseItems: ['Atomic Radius', 'Metallic Character', 'Density'],
    decreaseItems: ['Ionization Enthalpy', 'Electronegativity'],
    trendSummary: 'Down the group, atomic size increases due to additional shells. Metallic nature increases because valence electrons are farther from the nucleus and more easily lost.',
    compounds: [
      { id: 'B2O3', name: 'Boron Trioxide', formula: 'B2O3', description: 'Acidic oxide of boron used in glass and ceramic industries.', prepSteps: [{ equation: '4B + 3O2 -> 2B2O3', detail: 'Boron burns in oxygen to form boron trioxide.' }] },
      { id: 'Borax', name: 'Borax', formula: 'Na2B4O7·10H2O', description: 'Important boron mineral used in glass, detergents, and fluxes.', prepSteps: [{ equation: 'Colemanite + Na2CO3 -> Na2B4O7', detail: 'Borax is prepared from boron minerals by treatment with sodium carbonate.' }] },
      { id: 'H3BO3', name: 'Boric Acid', formula: 'H3BO3', description: 'Weak monobasic acid used as antiseptic and in heat-resistant glass.', prepSteps: [{ equation: 'Na2B4O7 + HCl + H2O -> H3BO3 + NaCl', detail: 'Acidification of borax solution gives boric acid crystals.' }] },
      { id: 'Al2O3', name: 'Aluminium Oxide', formula: 'Al2O3', description: 'Hard amphoteric oxide used in abrasives and refractory materials.', prepSteps: [{ equation: '4Al + 3O2 -> 2Al2O3', detail: 'Aluminium reacts with oxygen forming a protective oxide layer.' }] },
      { id: 'AlCl3', name: 'Aluminium Chloride', formula: 'AlCl3', description: 'Lewis acid catalyst widely used in Friedel-Crafts reactions.', prepSteps: [{ equation: '2Al + 3Cl2 -> 2AlCl3', detail: 'Aluminium combines with chlorine to form aluminium chloride.' }] },
      { id: 'Alum', name: 'Potash Alum', formula: 'KAl(SO4)2·12H2O', description: 'Double salt used in water purification and dyeing.', prepSteps: [{ equation: 'K2SO4 + Al2(SO4)3 + 24H2O -> 2KAl(SO4)2·12H2O', detail: 'Crystallization of potassium and aluminium sulfates forms alum.' }] }
    ],
    applications: [
      { title: 'Borosilicate glass', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=80', explanation: 'Boron compounds increase thermal resistance and reduce glass expansion during heating.', narration: 'Boron compounds increase thermal resistance and reduce glass expansion during heating.' },
      { title: 'Aluminium in aircrafts', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80', explanation: 'Aluminium alloys are lightweight, corrosion resistant, and mechanically strong.', narration: 'Aluminium alloys are lightweight, corrosion resistant, and mechanically strong.' },
      { title: 'Water purification', image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=900&q=80', explanation: 'Potash alum coagulates suspended impurities allowing easier filtration.', narration: 'Potash alum coagulates suspended impurities allowing easier filtration.' },
      { title: 'Aluminium foil and packaging', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80', explanation: 'Aluminium forms a protective oxide layer making it suitable for food storage and packaging.', narration: 'Aluminium forms a protective oxide layer making it suitable for food storage and packaging.' },
      { title: 'Catalysts in organic chemistry', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Aluminium chloride acts as a Lewis acid catalyst in electrophilic substitution reactions.', narration: 'Aluminium chloride acts as a Lewis acid catalyst in electrophilic substitution reactions.' }
    ]
  },
  1: {
    groupLabel: 'Group 14',
    familyName: 'Carbon Family',
    description: 'Elements with outer electronic configuration ns²np² and common oxidation states +4 and +2.',
    outerConfiguration: 'ns² np²',
    elements: [
      { symbol: 'C', name: 'Carbon', atomicNumber: 6, fullConfiguration: '1s² 2s² 2p²', shells: [2, 4], valenceElectrons: 4, oxidationState: '+4, +2', narration: 'Carbon has four valence electrons and forms strong covalent bonds.' },
      { symbol: 'Si', name: 'Silicon', atomicNumber: 14, fullConfiguration: '1s² 2s² 2p⁶ 3s² 3p²', shells: [2, 8, 4], valenceElectrons: 4, oxidationState: '+4, +2', narration: 'Silicon has ns2 np2 configuration and commonly forms plus four covalent compounds.' },
      { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, fullConfiguration: '[Ar] 3d¹⁰ 4s² 4p²', shells: [2, 8, 18, 4], valenceElectrons: 4, oxidationState: '+4, +2', narration: 'Germanium bridges nonmetallic and metallic behavior in Group fourteen.' },
      { symbol: 'Sn', name: 'Tin', atomicNumber: 50, fullConfiguration: '[Kr] 4d¹⁰ 5s² 5p²', shells: [2, 8, 18, 18, 4], valenceElectrons: 4, oxidationState: '+4, +2', narration: 'Tin shows both plus two and plus four states, with plus two gaining stability.' },
      { symbol: 'Pb', name: 'Lead', atomicNumber: 82, fullConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', shells: [2, 8, 18, 32, 18, 4], valenceElectrons: 4, oxidationState: '+2, +4', narration: 'Lead strongly stabilizes plus two due to inert pair effect.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Atomic radius increases down the group due to addition of new shells.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy generally decreases as shielding and atomic size increase.' },
      { id: 'electronegativity', label: 'Electronegativity', direction: 'decrease', explanation: 'Electronegativity decreases down the group as bonding electrons are held less strongly.' },
      { id: 'metallic-character', label: 'Metallic Character', direction: 'increase', explanation: 'Metallic character increases down the group from carbon to lead.' },
      { id: 'catenation', label: 'Catenation Tendency', direction: 'decrease', explanation: 'Catenation decreases down the group as element-element bond strength decreases.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density generally increases down the group with increasing atomic mass.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'decrease', explanation: 'Melting point generally decreases down the family from network covalent carbon and silicon to heavier metals.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'decrease', explanation: 'Boiling point generally decreases down the group as bonding character changes.' },
      { id: 'oxidation-state-stability', label: 'Oxidation State Stability', direction: 'increase', explanation: 'The plus two state becomes more stable down the group, while plus four becomes less stable.' }
    ],
    increaseItems: ['Atomic Radius', 'Metallic Character', 'Density', '+2 Oxidation State Stability'],
    decreaseItems: ['Electronegativity', 'Catenation Tendency', '+4 Oxidation State Stability'],
    trendSummary: 'Down the group, atomic size and metallic character increase due to additional shells. The inert pair effect makes the +2 oxidation state more stable in heavier elements like lead.',
    compounds: [
      { id: 'CO2', name: 'Carbon Dioxide', formula: 'CO2', description: 'Colorless gas produced during respiration and combustion.', prepSteps: [{ equation: 'CaCO3 + 2HCl -> CaCl2 + CO2 + H2O', detail: 'Reaction of carbonate with acid liberates carbon dioxide gas.' }] },
      { id: 'CO', name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas and important reducing agent in metallurgy.', prepSteps: [{ equation: 'C + CO2 -> 2CO', detail: 'Hot carbon reduces carbon dioxide to carbon monoxide.' }] },
      { id: 'SiO2', name: 'Silicon Dioxide', formula: 'SiO2', description: 'Major constituent of sand and quartz with giant covalent structure.', prepSteps: [{ equation: 'Si + O2 -> SiO2', detail: 'Silicon reacts with oxygen forming silicon dioxide.' }] },
      { id: 'SiC', name: 'Silicon Carbide', formula: 'SiC', description: 'Extremely hard material used as abrasive and refractory.', prepSteps: [{ equation: 'SiO2 + 3C -> SiC + 2CO', detail: 'Silica is reduced with carbon in electric furnace to form silicon carbide.' }] },
      { id: 'PbO', name: 'Lead Oxide', formula: 'PbO', description: 'Amphoteric oxide used in batteries and glass manufacturing.', prepSteps: [{ equation: '2Pb + O2 -> 2PbO', detail: 'Lead reacts with oxygen to produce lead oxide.' }] },
      { id: 'SnCl2', name: 'Stannous Chloride', formula: 'SnCl2', description: 'Reducing agent used in electroplating and dyeing industries.', prepSteps: [{ equation: 'Sn + 2HCl -> SnCl2 + H2', detail: 'Tin dissolves in hydrochloric acid forming stannous chloride.' }] },
      { id: 'CH4', name: 'Methane', formula: 'CH4', description: 'Simplest hydrocarbon and major component of natural gas.', prepSteps: [{ equation: 'Al4C3 + 12H2O -> 4Al(OH)3 + 3CH4', detail: 'Hydrolysis of aluminium carbide produces methane gas.' }] }
    ],
    applications: [
      { title: 'Silicon in semiconductors', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', explanation: 'Silicon has controlled electrical conductivity making it useful in electronic chips and transistors.', narration: 'Silicon has controlled electrical conductivity making it useful in electronic chips and transistors.' },
      { title: 'Carbon dioxide in fire extinguishers', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80', explanation: 'Carbon dioxide displaces oxygen and helps suppress combustion.', narration: 'Carbon dioxide displaces oxygen and helps suppress combustion.' },
      { title: 'Methane as fuel', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80', explanation: 'Methane burns cleanly with high calorific value producing less soot.', narration: 'Methane burns cleanly with high calorific value producing less soot.' },
      { title: 'Silicon carbide abrasives', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', explanation: 'Its extreme hardness makes it suitable for grinding and cutting tools.', narration: 'Its extreme hardness makes it suitable for grinding and cutting tools.' },
      { title: 'Lead-acid batteries', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=900&q=80', explanation: 'Lead compounds participate in reversible electrochemical reactions for energy storage.', narration: 'Lead compounds participate in reversible electrochemical reactions for energy storage.' }
    ]
  },
  2: {
    groupLabel: 'Group 15',
    familyName: 'Nitrogen Family',
    description: 'Elements with outer electronic configuration ns²np³ and common oxidation states −3, +3, and +5.',
    outerConfiguration: 'ns² np³',
    elements: [
      { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, fullConfiguration: '1s² 2s² 2p³', shells: [2, 5], valenceElectrons: 5, oxidationState: '−3, +3, +5', narration: 'Nitrogen has five valence electrons and commonly shows minus three, plus three, and plus five states.' },
      { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, fullConfiguration: '1s² 2s² 2p⁶ 3s² 3p³', shells: [2, 8, 5], valenceElectrons: 5, oxidationState: '−3, +3, +5', narration: 'Phosphorus forms important plus three and plus five compounds.' },
      { symbol: 'As', name: 'Arsenic', atomicNumber: 33, fullConfiguration: '[Ar] 3d¹⁰ 4s² 4p³', shells: [2, 8, 18, 5], valenceElectrons: 5, oxidationState: '−3, +3, +5', narration: 'Arsenic is a metalloid with Group fifteen valence configuration.' },
      { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, fullConfiguration: '[Kr] 4d¹⁰ 5s² 5p³', shells: [2, 8, 18, 18, 5], valenceElectrons: 5, oxidationState: '−3, +3, +5', narration: 'Antimony shows increasing metallic character and stable plus three behavior.' },
      { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, fullConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', shells: [2, 8, 18, 32, 18, 5], valenceElectrons: 5, oxidationState: '+3, +5', narration: 'Bismuth strongly stabilizes plus three due to the inert pair effect.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Atomic radius increases down the group due to addition of new shells.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy decreases down the group because shielding increases.' },
      { id: 'electronegativity', label: 'Electronegativity', direction: 'decrease', explanation: 'Electronegativity decreases down the group as atoms become larger and more metallic.' },
      { id: 'metallic-character', label: 'Metallic Character', direction: 'increase', explanation: 'Metallic character increases from nitrogen to bismuth.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density generally increases down the group with increasing atomic mass.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'increase', explanation: 'Melting point shows irregularity, but heavier members have stronger metallic and lattice contributions.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'increase', explanation: 'Boiling point generally increases from molecular nitrogen toward heavier condensed elements.' },
      { id: 'catenation', label: 'Catenation Tendency', direction: 'decrease', explanation: 'Catenation tendency decreases down the group as element-element bond strength decreases.' },
      { id: 'oxidation-state-stability', label: 'Oxidation State Stability', direction: 'increase', explanation: 'The plus three state becomes more stable down the group because of inert pair effect.' }
    ],
    increaseItems: ['Atomic Radius', 'Metallic Character', 'Density', '+3 Oxidation State Stability'],
    decreaseItems: ['Electronegativity', 'Ionization Enthalpy', 'Catenation Tendency', '−3 Oxidation State Stability'],
    trendSummary: 'Down the group, atomic size and metallic character increase due to addition of new shells. The inert pair effect makes the +3 oxidation state more stable in heavier elements like bismuth.',
    compounds: [
      { id: 'NH3', name: 'Ammonia', formula: 'NH3', description: 'Colorless basic gas widely used in fertilizers and chemical industries.', prepSteps: [{ equation: 'N2 + 3H2 -> 2NH3', detail: 'Haber process synthesizes ammonia using iron catalyst under high pressure.' }] },
      { id: 'HNO3', name: 'Nitric Acid', formula: 'HNO3', description: 'Strong oxidizing acid used in fertilizers, explosives, and nitration reactions.', prepSteps: [{ equation: '4NH3 + 5O2 -> 4NO + 6H2O', detail: 'Catalytic oxidation of ammonia forms nitric oxide in Ostwald process.' }, { equation: '2NO + O2 -> 2NO2', detail: 'Nitric oxide oxidizes further to nitrogen dioxide.' }, { equation: '3NO2 + H2O -> 2HNO3 + NO', detail: 'Absorption of nitrogen dioxide in water produces nitric acid.' }] },
      { id: 'P4O10', name: 'Phosphorus Pentoxide', formula: 'P4O10', description: 'Powerful dehydrating agent and acidic oxide of phosphorus.', prepSteps: [{ equation: 'P4 + 5O2 -> P4O10', detail: 'Phosphorus burns in excess oxygen producing phosphorus pentoxide.' }] },
      { id: 'H3PO4', name: 'Phosphoric Acid', formula: 'H3PO4', description: 'Moderately strong acid used in fertilizers and soft drinks.', prepSteps: [{ equation: 'Ca3(PO4)2 + H2SO4 -> H3PO4 + CaSO4', detail: 'Phosphate rock reacts with sulfuric acid to produce phosphoric acid.' }] },
      { id: 'PCl5', name: 'Phosphorus Pentachloride', formula: 'PCl5', description: 'Chlorinating agent used in organic and inorganic synthesis.', prepSteps: [{ equation: 'PCl3 + Cl2 -> PCl5', detail: 'Further chlorination of phosphorus trichloride gives phosphorus pentachloride.' }] },
      { id: 'BiCl3', name: 'Bismuth Chloride', formula: 'BiCl3', description: 'Compound used in pharmaceuticals and analytical chemistry.', prepSteps: [{ equation: '2Bi + 3Cl2 -> 2BiCl3', detail: 'Bismuth reacts with chlorine forming bismuth chloride.' }] },
      { id: 'NO2', name: 'Nitrogen Dioxide', formula: 'NO2', description: 'Brown toxic gas and important atmospheric pollutant.', prepSteps: [{ equation: '2Pb(NO3)2 -> 2PbO + 4NO2 + O2', detail: 'Thermal decomposition of lead nitrate produces nitrogen dioxide.' }] }
    ],
    applications: [
      { title: 'Fertilizer production', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80', explanation: 'Ammonia and phosphates provide essential nitrogen and phosphorus nutrients for plant growth.', narration: 'Ammonia and phosphates provide essential nitrogen and phosphorus nutrients for plant growth.' },
      { title: 'Nitric acid in explosives', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Nitric acid is used in nitration reactions for manufacturing explosives and dyes.', narration: 'Nitric acid is used in nitration reactions for manufacturing explosives and dyes.' },
      { title: 'Soft drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80', explanation: 'Phosphoric acid provides acidity and flavor stabilization in beverages.', narration: 'Phosphoric acid provides acidity and flavor stabilization in beverages.' },
      { title: 'Dehydrating agents', image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=900&q=80', explanation: 'Phosphorus pentoxide removes water from compounds and gases efficiently.', narration: 'Phosphorus pentoxide removes water from compounds and gases efficiently.' },
      { title: 'Matchstick industry', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', explanation: 'Red phosphorus is used on safety match striking surfaces due to controlled reactivity.', narration: 'Red phosphorus is used on safety match striking surfaces due to controlled reactivity.' }
    ]
  },
  3: {
    groupLabel: 'Group 16',
    familyName: 'Oxygen Family (Chalcogens)',
    description: 'Elements with outer electronic configuration ns2 np4 and common oxidation states -2, +4, and +6.',
    outerConfiguration: 'ns2 np4',
    elements: [
      { symbol: 'O', name: 'Oxygen', atomicNumber: 8, fullConfiguration: '1s2 2s2 2p4', shells: [2, 6], valenceElectrons: 6, oxidationState: '-2, +2', narration: 'Oxygen has six valence electrons and commonly shows minus two oxidation state, with plus two in compounds with fluorine.' },
      { symbol: 'S', name: 'Sulfur', atomicNumber: 16, fullConfiguration: '1s2 2s2 2p6 3s2 3p4', shells: [2, 8, 6], valenceElectrons: 6, oxidationState: '-2, +4, +6', narration: 'Sulfur has ns2 np4 valence configuration and commonly forms minus two, plus four, and plus six compounds.' },
      { symbol: 'Se', name: 'Selenium', atomicNumber: 34, fullConfiguration: '[Ar] 3d10 4s2 4p4', shells: [2, 8, 18, 6], valenceElectrons: 6, oxidationState: '-2, +4, +6', narration: 'Selenium follows the chalcogen valence pattern and shows increasing metallic character compared with sulfur.' },
      { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, fullConfiguration: '[Kr] 4d10 5s2 5p4', shells: [2, 8, 18, 18, 6], valenceElectrons: 6, oxidationState: '-2, +4, +6', narration: 'Tellurium is a metalloid chalcogen with stable plus four and plus six oxidation states.' },
      { symbol: 'Po', name: 'Polonium', atomicNumber: 84, fullConfiguration: '[Xe] 4f14 5d10 6s2 6p4', shells: [2, 8, 18, 32, 18, 6], valenceElectrons: 6, oxidationState: '+2, +4', narration: 'Polonium is the heaviest common chalcogen and shows strong metallic character.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Atomic radius increases down the group because each element adds a new electron shell.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy decreases as shielding and atomic size increase down the group.' },
      { id: 'electronegativity', label: 'Electronegativity', direction: 'decrease', explanation: 'Electronegativity decreases because larger atoms attract shared electrons less strongly.' },
      { id: 'metallic-character', label: 'Metallic Character', direction: 'increase', explanation: 'Metallic character increases from oxygen toward polonium as valence electrons become less tightly held.' },
      { id: 'electron-affinity', label: 'Electron Affinity', direction: 'decrease', explanation: 'Electron affinity generally becomes less favorable down the group as incoming electrons are added farther from the nucleus.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density increases down the group as atomic mass rises strongly.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'increase', explanation: 'Melting point generally increases from oxygen to heavier chalcogens due to stronger intermolecular or metallic interactions.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'increase', explanation: 'Boiling point generally increases down the group as particle size and dispersion forces increase.' },
      { id: 'oxidation-state-stability', label: 'Oxidation State Stability', direction: 'increase', explanation: 'Higher positive oxidation states such as +4 and +6 become important from sulfur onward, while the oxidizing nature decreases down the group.' }
    ],
    increaseItems: ['Atomic Radius', 'Metallic Character', 'Density', 'Melting Point', 'Boiling Point'],
    decreaseItems: ['Electronegativity', 'Ionization Enthalpy', 'Oxidizing Nature'],
    trendSummary: 'Down the group, atomic size and metallic character increase due to additional electron shells. Oxidizing ability decreases because larger atoms attract electrons less strongly.',
    compounds: [
      { id: 'H2O', name: 'Water', formula: 'H2O', description: 'Universal solvent essential for biological and industrial processes.', prepSteps: [{ equation: '2H2 + O2 -> 2H2O', detail: 'Hydrogen burns in oxygen producing water.' }] },
      { id: 'H2O2', name: 'Hydrogen Peroxide', formula: 'H2O2', description: 'Strong oxidizing and bleaching agent.', prepSteps: [{ equation: 'BaO2 + H2SO4 -> H2O2 + BaSO4', detail: 'Hydrogen peroxide is prepared by treating barium peroxide with sulfuric acid.' }] },
      { id: 'SO2', name: 'Sulfur Dioxide', formula: 'SO2', description: 'Acidic gas used in bleaching and sulfuric acid manufacture.', prepSteps: [{ equation: 'S + O2 -> SO2', detail: 'Sulfur burns in air producing sulfur dioxide.' }] },
      { id: 'SO3', name: 'Sulfur Trioxide', formula: 'SO3', description: 'Acidic oxide used in sulfuric acid production.', prepSteps: [{ equation: '2SO2 + O2 -> 2SO3', detail: 'Catalytic oxidation of sulfur dioxide forms sulfur trioxide.' }] },
      { id: 'H2SO4', name: 'Sulfuric Acid', formula: 'H2SO4', description: 'Highly important industrial acid used in fertilizers, batteries, and petroleum refining.', prepSteps: [{ equation: 'SO3 + H2O -> H2SO4', detail: 'Sulfur trioxide reacts vigorously with water producing sulfuric acid.' }] },
      { id: 'Na2S2O3', name: 'Sodium Thiosulfate', formula: 'Na2S2O3', description: 'Photographic fixing agent and reducing compound.', prepSteps: [{ equation: 'Na2SO3 + S -> Na2S2O3', detail: 'Sulfur reacts with sodium sulfite producing sodium thiosulfate.' }] },
      { id: 'SF6', name: 'Sulfur Hexafluoride', formula: 'SF6', description: 'Dense inert gas used as electrical insulator.', prepSteps: [{ equation: 'S + 3F2 -> SF6', detail: 'Sulfur reacts directly with fluorine to form sulfur hexafluoride.' }] }
    ],
    applications: [
      { title: 'Sulfuric acid in industries', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=900&q=80', explanation: 'Sulfuric acid is widely used in fertilizer production, petroleum refining, and chemical synthesis.', narration: 'Sulfuric acid is widely used in fertilizer production, petroleum refining, and chemical synthesis.' },
      { title: 'Water in biological systems', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', explanation: 'Water acts as solvent, temperature regulator, and reaction medium in living organisms.', narration: 'Water acts as solvent, temperature regulator, and reaction medium in living organisms.' },
      { title: 'Hydrogen peroxide as disinfectant', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80', explanation: 'Hydrogen peroxide releases oxygen that destroys microorganisms by oxidation.', narration: 'Hydrogen peroxide releases oxygen that destroys microorganisms by oxidation.' },
      { title: 'Sulfur dioxide bleaching', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80', explanation: 'Sulfur dioxide acts as reducing bleach for wool, silk, and delicate materials.', narration: 'Sulfur dioxide acts as reducing bleach for wool, silk, and delicate materials.' },
      { title: 'SF6 in electrical equipment', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80', explanation: 'Sulfur hexafluoride prevents electrical discharge due to high dielectric strength.', narration: 'Sulfur hexafluoride prevents electrical discharge due to high dielectric strength.' }
    ]
  },
  4: {
    groupLabel: 'Group 17',
    familyName: 'Halogen Family',
    description: 'Highly reactive non-metals with outer electronic configuration ns2 np5 and common -1 oxidation state.',
    outerConfiguration: 'ns2 np5',
    elements: [
      { symbol: 'F', name: 'Fluorine', atomicNumber: 9, fullConfiguration: '1s2 2s2 2p5', shells: [2, 7], valenceElectrons: 7, oxidationState: '-1', narration: 'Fluorine has seven valence electrons and is the most reactive halogen, commonly forming the minus one state.' },
      { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, fullConfiguration: '1s2 2s2 2p6 3s2 3p5', shells: [2, 8, 7], valenceElectrons: 7, oxidationState: '-1, +1, +3, +5, +7', narration: 'Chlorine has ns2 np5 valence configuration and forms chloride ions as well as positive oxidation states in oxo compounds.' },
      { symbol: 'Br', name: 'Bromine', atomicNumber: 35, fullConfiguration: '[Ar] 3d10 4s2 4p5', shells: [2, 8, 18, 7], valenceElectrons: 7, oxidationState: '-1, +1, +3, +5', narration: 'Bromine is a liquid halogen with seven valence electrons and reactivity lower than chlorine.' },
      { symbol: 'I', name: 'Iodine', atomicNumber: 53, fullConfiguration: '[Kr] 4d10 5s2 5p5', shells: [2, 8, 18, 18, 7], valenceElectrons: 7, oxidationState: '-1, +1, +5, +7', narration: 'Iodine is a violet-black solid halogen and forms iodide ions by gaining one electron.' },
      { symbol: 'At', name: 'Astatine', atomicNumber: 85, fullConfiguration: '[Xe] 4f14 5d10 6s2 6p5', shells: [2, 8, 18, 32, 18, 7], valenceElectrons: 7, oxidationState: '-1, +1, +3, +5', narration: 'Astatine is the heaviest halogen and has the greatest metallic character in the family.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Atomic radius increases down the group because each successive halogen has an additional electron shell.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy decreases down the group as shielding increases and valence electrons are held less tightly.' },
      { id: 'electronegativity', label: 'Electronegativity', direction: 'decrease', explanation: 'Electronegativity decreases down the group because larger atoms attract bonding electrons less strongly.' },
      { id: 'electron-affinity', label: 'Electron Affinity', direction: 'decrease', explanation: 'Electron affinity generally decreases down the group as the added electron enters a larger, more shielded shell.' },
      { id: 'oxidizing-power', label: 'Oxidizing Power', direction: 'decrease', explanation: 'Oxidizing power decreases from fluorine to iodine because larger halogen atoms gain electrons less effectively.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density increases down the halogen family with increasing atomic mass.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'increase', explanation: 'Melting point increases down the group as molecular size and dispersion forces increase.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'increase', explanation: 'Boiling point increases down the group due to stronger intermolecular attractions in larger halogen molecules.' },
      { id: 'reactivity', label: 'Reactivity', direction: 'decrease', explanation: 'Reactivity decreases down the group because the tendency to gain an electron becomes weaker.' }
    ],
    increaseItems: ['Atomic Radius', 'Density', 'Melting Point', 'Boiling Point'],
    decreaseItems: ['Electronegativity', 'Oxidizing Power', 'Reactivity'],
    trendSummary: 'Down the group, atomic size increases due to additional shells. Oxidizing power decreases because larger atoms attract electrons less effectively.',
    compounds: [
      { id: 'HCl', name: 'Hydrochloric Acid', formula: 'HCl', description: 'Strong acid used in laboratories, cleaning, and chemical industries.', prepSteps: [{ equation: 'NaCl + H2SO4 -> HCl + NaHSO4', detail: 'Heating sodium chloride with sulfuric acid releases hydrogen chloride gas.' }] },
      { id: 'NaCl', name: 'Sodium Chloride', formula: 'NaCl', description: 'Common salt essential in food and chemical industries.', prepSteps: [{ equation: '2Na + Cl2 -> 2NaCl', detail: 'Sodium reacts vigorously with chlorine to form sodium chloride.' }] },
      { id: 'CaOCl2', name: 'Bleaching Powder', formula: 'CaOCl2', description: 'Disinfectant and bleaching agent used for water treatment.', prepSteps: [{ equation: 'Ca(OH)2 + Cl2 -> CaOCl2 + H2O', detail: 'Chlorine reacts with dry slaked lime producing bleaching powder.' }] },
      { id: 'HF', name: 'Hydrofluoric Acid', formula: 'HF', description: 'Weak acid capable of dissolving glass.', prepSteps: [{ equation: 'CaF2 + H2SO4 -> 2HF + CaSO4', detail: 'Fluorspar reacts with sulfuric acid to produce hydrofluoric acid.' }] },
      { id: 'KClO3', name: 'Potassium Chlorate', formula: 'KClO3', description: 'Strong oxidizing agent used in fireworks and match industry.', prepSteps: [{ equation: '3Cl2 + 6KOH -> 5KCl + KClO3 + 3H2O', detail: 'Hot concentrated alkali reacts with chlorine producing potassium chlorate.' }] },
      { id: 'I2', name: 'Iodine', formula: 'I2', description: 'Shiny violet-black solid used as antiseptic and in analytical chemistry.', prepSteps: [{ equation: '2KI + Cl2 -> 2KCl + I2', detail: 'Chlorine displaces iodine from potassium iodide solution.' }] },
      { id: 'PVC', name: 'Polyvinyl Chloride', formula: 'PVC', description: 'Important plastic material used in pipes, insulation, and packaging.', prepSteps: [{ equation: 'nCH2=CHCl -> (-CH2-CHCl-)n', detail: 'Polymerization of vinyl chloride forms PVC.' }] }
    ],
    applications: [
      { title: 'Water purification', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80', explanation: 'Chlorine and bleaching powder destroy harmful microorganisms in drinking water.', narration: 'Chlorine and bleaching powder destroy harmful microorganisms in drinking water.' },
      { title: 'PVC pipes and insulation', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', explanation: 'PVC is durable, chemically resistant, and electrically insulating.', narration: 'PVC is durable, chemically resistant, and electrically insulating.' },
      { title: 'Dental care', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80', explanation: 'Fluoride compounds strengthen tooth enamel and reduce decay.', narration: 'Fluoride compounds strengthen tooth enamel and reduce decay.' },
      { title: 'Antiseptic iodine', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80', explanation: 'Iodine kills bacteria and fungi by oxidation and protein disruption.', narration: 'Iodine kills bacteria and fungi by oxidation and protein disruption.' },
      { title: 'Match and fireworks industry', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', explanation: 'Potassium chlorate acts as oxidizer supporting rapid combustion.', narration: 'Potassium chlorate acts as oxidizer supporting rapid combustion.' }
    ]
  },
  5: {
    groupLabel: 'Group 18',
    familyName: 'Noble Gases',
    description: 'Chemically inert gases with completely filled valence shells and very low reactivity.',
    outerConfiguration: 'He: 1s2; others: ns2 np6',
    elements: [
      { symbol: 'He', name: 'Helium', atomicNumber: 2, fullConfiguration: '1s2', shells: [2], valenceElectrons: 2, oxidationState: '0', narration: 'Helium has a completely filled first shell with two electrons and is chemically inert.' },
      { symbol: 'Ne', name: 'Neon', atomicNumber: 10, fullConfiguration: '1s2 2s2 2p6', shells: [2, 8], valenceElectrons: 8, oxidationState: '0', narration: 'Neon has a filled outer shell and emits bright red-orange light in discharge tubes.' },
      { symbol: 'Ar', name: 'Argon', atomicNumber: 18, fullConfiguration: '1s2 2s2 2p6 3s2 3p6', shells: [2, 8, 8], valenceElectrons: 8, oxidationState: '0', narration: 'Argon has a stable octet and provides an inert atmosphere in welding.' },
      { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, fullConfiguration: '[Ar] 3d10 4s2 4p6', shells: [2, 8, 18, 8], valenceElectrons: 8, oxidationState: '0, +2', narration: 'Krypton is a heavier noble gas with greater polarizability than argon.' },
      { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, fullConfiguration: '[Kr] 4d10 5s2 5p6', shells: [2, 8, 18, 18, 8], valenceElectrons: 8, oxidationState: '0, +2, +4, +6', narration: 'Xenon is polarizable enough to form compounds such as xenon fluorides and oxides.' },
      { symbol: 'Rn', name: 'Radon', atomicNumber: 86, fullConfiguration: '[Xe] 4f14 5d10 6s2 6p6', shells: [2, 8, 18, 32, 18, 8], valenceElectrons: 8, oxidationState: '0, +2', narration: 'Radon is a radioactive noble gas with increased polarizability and rare compound formation.' }
    ],
    trends: [
      { id: 'atomic-radius', label: 'Atomic Radius', direction: 'increase', explanation: 'Atomic radius increases down the group because each noble gas has an additional electron shell.' },
      { id: 'ionization-enthalpy', label: 'Ionization Enthalpy', direction: 'decrease', explanation: 'Ionization enthalpy decreases down the group as outer electrons are farther from the nucleus.' },
      { id: 'electron-affinity', label: 'Electron Affinity', direction: 'decrease', explanation: 'Electron affinity remains very low because filled valence shells resist gaining electrons.' },
      { id: 'density', label: 'Density', direction: 'increase', explanation: 'Density increases down the group as atomic mass increases.' },
      { id: 'melting-point', label: 'Melting Point', direction: 'increase', explanation: 'Melting points rise down the group as dispersion forces become stronger.' },
      { id: 'boiling-point', label: 'Boiling Point', direction: 'increase', explanation: 'Boiling points increase down the group due to stronger London dispersion forces.' },
      { id: 'polarizability', label: 'Polarizability', direction: 'increase', explanation: 'Polarizability increases as atoms become larger and electron clouds distort more easily.' },
      { id: 'reactivity', label: 'Reactivity', direction: 'increase', explanation: 'Reactivity increases slightly for heavier noble gases because lower ionization enthalpy and greater polarizability make compound formation possible.' }
    ],
    increaseItems: ['Atomic Radius', 'Density', 'Boiling Point', 'Polarizability'],
    decreaseItems: ['Ionization Enthalpy', 'Chemical Inertness'],
    trendSummary: 'Down the group, atomic size and polarizability increase because of additional electron shells. Ionization enthalpy decreases, making heavier noble gases like xenon capable of forming compounds.',
    compounds: [
      { id: 'XeF2', name: 'Xenon Difluoride', formula: 'XeF2', description: 'Colorless xenon compound used as fluorinating agent.', prepSteps: [{ equation: 'Xe + F2 -> XeF2', detail: 'Direct reaction of xenon with fluorine under controlled conditions forms xenon difluoride.' }] },
      { id: 'XeF4', name: 'Xenon Tetrafluoride', formula: 'XeF4', description: 'Stable xenon fluoride with square planar molecular shape.', prepSteps: [{ equation: 'Xe + 2F2 -> XeF4', detail: 'Xenon reacts with excess fluorine under high pressure and temperature.' }] },
      { id: 'XeF6', name: 'Xenon Hexafluoride', formula: 'XeF6', description: 'Highly reactive xenon fluoride and strong fluorinating agent.', prepSteps: [{ equation: 'Xe + 3F2 -> XeF6', detail: 'Further fluorination of xenon produces xenon hexafluoride.' }] },
      { id: 'XeO3', name: 'Xenon Trioxide', formula: 'XeO3', description: 'Explosive oxidizing compound of xenon.', prepSteps: [{ equation: 'XeF6 + H2O -> XeO3 + HF', detail: 'Hydrolysis of xenon fluorides forms xenon trioxide.' }] },
      { id: 'NobleGasClathrate', name: 'Clathrate Compounds', formula: 'Noble Gas Clathrates', description: 'Physical inclusion compounds where noble gas atoms are trapped inside crystal cavities.', prepSteps: [{ equation: 'Gas + Host lattice -> Clathrate', detail: 'Noble gas atoms become enclosed within molecular cavities without chemical bonding.' }] },
      { id: 'RnF2', name: 'Radon Difluoride', formula: 'RnF2', description: 'Rare radioactive compound formed under special conditions.', prepSteps: [{ equation: 'Rn + F2 -> RnF2', detail: 'Radon reacts weakly with fluorine due to increased polarizability.' }] }
    ],
    applications: [
      { title: 'Helium in balloons', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80', explanation: 'Helium is lighter than air and non-flammable, making it safe for balloons and airships.', narration: 'Helium is lighter than air and non-flammable, making it safe for balloons and airships.' },
      { title: 'Neon lighting', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80', explanation: 'Excited neon atoms emit bright red-orange light in discharge tubes.', narration: 'Excited neon atoms emit bright red-orange light in discharge tubes.' },
      { title: 'Argon in welding', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', explanation: 'Argon provides inert atmosphere preventing oxidation during welding.', narration: 'Argon provides inert atmosphere preventing oxidation during welding.' },
      { title: 'Krypton and xenon lamps', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', explanation: 'These gases produce intense bright light used in flash lamps and headlights.', narration: 'Krypton and xenon produce intense bright light used in flash lamps and headlights.' },
      { title: 'Liquid helium in cryogenics', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=900&q=80', explanation: 'Liquid helium has extremely low boiling point useful for superconductors and MRI cooling.', narration: 'Liquid helium has extremely low boiling point useful for superconductors and MRI cooling.' }
    ]
  }
};

const getConfigTokens = (configuration: string): ConfigToken[] => (
  configuration.split(/\s+/).filter(Boolean).map((label) => {
    const shell = label.match(/^(\d)/);
    return { label, shellIndex: shell ? Number(shell[1]) - 1 : null };
  })
);

const Section: React.FC<{ index: number; title: string; actions?: React.ReactNode; children: React.ReactNode }> = ({ index, title, actions, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className="rounded-2xl border border-slate-700/65 bg-slate-950/62 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6"
  >
    <div className="mb-5 flex flex-col gap-3 border-b border-cyan-400/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/40 bg-cyan-400/10 font-mono text-sm font-black text-cyan-200">{index}</span>
        <h2 className="font-mono text-lg font-black uppercase tracking-[0.16em] text-white">{title}</h2>
      </div>
      {actions}
    </div>
    {children}
  </motion.section>
);

const CategoryCard: React.FC<{ chapter: PBlockChapter; index: number; onClick: () => void }> = ({ chapter, index, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.035, y: -6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group min-h-[240px] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.035] p-7 text-left shadow-[0_0_30px_rgba(34,211,238,0.09)] backdrop-blur-xl transition hover:border-cyan-300/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]"
  >
    <div className="mb-8 flex items-center justify-between">
      <span className="rounded-full border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
        Category {String(index + 1).padStart(2, '0')}
      </span>
      <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
    </div>
    <h2 className="text-3xl font-black text-white">{chapter.title}</h2>
    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{chapter.subtitle}</p>
  </motion.button>
);

const TrendGroup: React.FC<{ title: string; items: string[]; tone: 'green' | 'red' }> = ({ title, items, tone }) => (
  <div className={`rounded-lg border p-4 ${tone === 'green' ? 'border-lime-400/25 bg-lime-400/[0.035]' : 'border-red-400/25 bg-red-400/[0.035]'}`}>
    <div className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] ${tone === 'green' ? 'text-lime-300' : 'text-red-300'}`}>
      Group top to bottom: {title}
    </div>
    <div className="mt-3 space-y-2">
      {items.map((item) => (
        <div key={item} className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-xs font-semibold text-slate-200">{item}</div>
      ))}
    </div>
  </div>
);

const TrendVisualizer: React.FC<{ family: FamilyData }> = ({ family }) => {
  const [activeTrendId, setActiveTrendId] = useState(family.trends[0].id);
  const activeTrend = family.trends.find((trend) => trend.id === activeTrendId) ?? family.trends[0];
  const increasing = activeTrend.direction === 'increase';
  const arrowStyle = increasing
    ? { body: 'from-lime-700 via-green-500 to-emerald-900 shadow-[0_0_18px_rgba(16,185,129,0.48)]', head: 'border-t-emerald-500 drop-shadow-[0_0_12px_#10b981]', label: 'text-lime-300 border-lime-400/40 shadow-[0_0_16px_rgba(132,204,22,0.22)]' }
    : { body: 'from-rose-800 via-red-500 to-red-900 shadow-[0_0_18px_rgba(220,38,38,0.48)]', head: 'border-t-red-500 drop-shadow-[0_0_12px_#ef4444]', label: 'text-red-300 border-red-400/40 shadow-[0_0_16px_rgba(239,68,68,0.22)]' };

  useEffect(() => {
    setActiveTrendId(family.trends[0].id);
  }, [family]);

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {family.trends.map((trend) => (
          <button
            key={trend.id}
            type="button"
            onClick={() => setActiveTrendId(trend.id)}
            className={`shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition ${
              activeTrendId === trend.id
                ? 'border-cyan-300 bg-cyan-400/14 text-white shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                : 'border-cyan-400/15 bg-white/[0.025] text-cyan-100/70 hover:border-cyan-300/50'
            }`}
          >
            {trend.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-cyan-400/20 bg-slate-950/50 p-5 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTrend.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <div className={`rounded-full border bg-gray-950/90 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.22em] ${arrowStyle.label}`}>
                Group top to bottom: {activeTrend.direction}
              </div>
              <VoiceNarrator label="Explain Trend" text={`${activeTrend.label}. ${activeTrend.explanation} ${family.trendSummary}`} className="rounded-full py-2 text-[10px]" />
            </div>
            <div className="grid w-full gap-4 xl:grid-cols-[1fr_240px]">
              <div className="relative flex min-h-[360px] items-center justify-center">
                <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="absolute left-1/2 top-7 bottom-7 z-0 w-4 origin-top -translate-x-1/2 rounded-full">
                  <div className={`h-full w-full rounded-full bg-gradient-to-b ${arrowStyle.body}`} />
                  <div className={`absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[19px] border-t-[30px] border-x-transparent ${arrowStyle.head}`} />
                </motion.div>
                <div className="relative z-10 flex flex-col items-center gap-5">
                  {family.elements.map((element, index) => (
                    <motion.div key={element.symbol} layout initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="grid h-14 w-28 place-items-center rounded-full border border-cyan-300/40 bg-black/80 font-mono text-lg font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.22)] backdrop-blur-md">
                      {element.symbol}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <TrendGroup title="Increase" items={family.increaseItems} tone="green" />
                <TrendGroup title="Decrease" items={family.decreaseItems} tone="red" />
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-center text-sm leading-6 text-slate-300">{activeTrend.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const FamilyDashboard: React.FC<{ family: FamilyData; onBack: () => void }> = ({ family, onBack }) => {
  const [activeSymbol, setActiveSymbol] = useState(family.elements[0].symbol);
  const [valenceOnly, setValenceOnly] = useState(false);
  const [activeShell, setActiveShell] = useState<number | null>(null);
  const [activeConfigToken, setActiveConfigToken] = useState<number | null>(null);
  const [activeApplication, setActiveApplication] = useState<number | null>(null);
  const [applicationSpeechState, setApplicationSpeechState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const applicationIndexRef = useRef(0);
  const applicationSessionRef = useRef(0);
  const applicationPausedRef = useRef(false);
  const activeElement = useMemo(() => family.elements.find((element) => element.symbol === activeSymbol) ?? family.elements[0], [activeSymbol, family]);
  const configTokens = useMemo(() => getConfigTokens(activeElement.fullConfiguration), [activeElement.fullConfiguration]);

  const stopApplications = () => {
    applicationSessionRef.current += 1;
    applicationPausedRef.current = false;
    applicationIndexRef.current = 0;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
    }
    setApplicationSpeechState('stopped');
    setActiveApplication(null);
  };

  const speakApplicationStep = (sessionId: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
    const index = applicationIndexRef.current;
    if (index >= family.applications.length) {
      setApplicationSpeechState('stopped');
      setActiveApplication(null);
      applicationIndexRef.current = 0;
      return;
    }
    const application = family.applications[index];
    setActiveApplication(index);
    const utterance = new SpeechSynthesisUtterance(`${application.title}. ${application.narration}`);
    utterance.rate = 0.92;
    utterance.pitch = 1.08;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices() || [];
    const voice =
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().replace('_', '-').includes('en-in')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /(female|heera|priya|neerja|veena|zira|woman|girl|natural|google)/i.test(v.name || '')) ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
      voices[0];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'en-IN';
    } else {
      utterance.lang = 'en-IN';
    }
    utterance.onend = () => {
      if (sessionId !== applicationSessionRef.current || applicationPausedRef.current) return;
      applicationIndexRef.current += 1;
      speakApplicationStep(sessionId);
    };
    utterance.onerror = utterance.onend;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setActiveSymbol(family.elements[0].symbol);
    setValenceOnly(false);
    setActiveShell(null);
    setActiveConfigToken(null);
    stopApplications();
  }, [family]);

  useEffect(() => stopApplications, []);

  useEffect(() => {
    setActiveShell(null);
    setActiveConfigToken(null);
    setValenceOnly(false);
  }, [activeSymbol]);

  const readApplications = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (applicationSpeechState === 'playing') {
      applicationPausedRef.current = true;
      window.speechSynthesis.cancel();
      setApplicationSpeechState('paused');
      return;
    }
    if (applicationSpeechState === 'paused') {
      applicationPausedRef.current = false;
      setApplicationSpeechState('playing');
      speakApplicationStep(applicationSessionRef.current);
      return;
    }
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    applicationSessionRef.current += 1;
    applicationIndexRef.current = 0;
    applicationPausedRef.current = false;
    setActiveApplication(null);
    setApplicationSpeechState('playing');
    speakApplicationStep(applicationSessionRef.current);
  };

  const handleConfigStep = (step: number | null) => {
    setActiveConfigToken(step);
    setValenceOnly(false);
    setActiveShell(step === null ? null : configTokens[step]?.shellIndex ?? null);
  };

  const resetConfigFocus = () => {
    setActiveConfigToken(null);
    setActiveShell(null);
    setValenceOnly(false);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-28 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{family.groupLabel}</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">{family.familyName}</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">{family.description}</p>
      </div>

      <Section index={1} title="Outer Electronic Configuration">
        <ElementSelector elements={family.elements} activeSymbol={activeSymbol} onSelect={setActiveSymbol} />
        <AnimatePresence mode="wait">
          <motion.div key={activeElement.symbol} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <AtomViewer element={activeElement} valenceOnly={valenceOnly} activeShell={activeShell} />
            <div className="rounded-lg border border-cyan-400/20 bg-slate-950/60 p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">{activeElement.name}</div>
              <h3 className="mt-2 text-3xl font-black text-white">{activeElement.symbol}</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Full electronic configuration</dt>
                  <dd className="mt-2 flex flex-wrap gap-2 font-mono text-cyan-100">
                    {configTokens.map((token, index) => (
                      <motion.span key={`${token.label}-${index}`} animate={{ opacity: activeConfigToken === null || activeConfigToken === index ? 1 : 0.16, scale: activeConfigToken === index ? 1.08 : 1 }} className={`rounded border px-2 py-1 transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.34)]' : activeConfigToken === null ? 'border-cyan-400/10 bg-cyan-400/5' : 'border-slate-800 bg-black text-slate-600'}`}>{token.label}</motion.span>
                    ))}
                  </dd>
                </div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Shells</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.shells.join(',')}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Valence Electrons</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.valenceElectrons}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Oxidation State</dt><dd className="mt-1 font-mono text-cyan-100">{activeElement.oxidationState}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Outer Electronic Configuration</dt><dd className="mt-1 font-mono text-cyan-100">{family.outerConfiguration}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {configTokens.map((token, index) => (
                  <button key={`focus-${token.label}-${index}`} type="button" onClick={() => handleConfigStep(index)} className={`rounded-md border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${activeConfigToken === index ? 'border-cyan-200 bg-cyan-300/20 text-white shadow-[0_0_18px_rgba(34,211,238,0.22)]' : 'border-cyan-400/25 text-cyan-200 hover:bg-cyan-400/10'}`}>{token.label}</button>
                ))}
                <button type="button" onClick={resetConfigFocus} className="rounded-md border border-slate-500/40 bg-slate-500/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-300 hover:bg-slate-500/15">Show All</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section index={2} title="Periodic Trends">
        <TrendVisualizer family={family} />
      </Section>

      <Section index={3} title="Important Compounds">
        <div className="grid gap-5 lg:grid-cols-2">
          {family.compounds.map((compound) => <CompoundCard key={compound.id} compound={compound} />)}
        </div>
      </Section>

      <Section index={4} title="Real World Applications" actions={
        <button type="button" onClick={readApplications} className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)] transition hover:border-cyan-300 hover:bg-cyan-400/15">
          <span className="inline-flex items-center gap-2">
            {applicationSpeechState === 'playing' ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
            {applicationSpeechState === 'playing' ? 'Pause Applications' : applicationSpeechState === 'paused' ? 'Resume Applications' : 'Read All Applications'}
          </span>
        </button>
      }>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {family.applications.map((application, index) => <ApplicationCard key={application.title} application={application} active={activeApplication === index} />)}
        </div>
      </Section>
    </div>
  );
};

const PlaceholderDashboard: React.FC<{ chapter: PBlockChapter; index: number; onBack: () => void }> = ({ chapter, index, onBack }) => (
  <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-28 md:px-8">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Category {String(index + 1).padStart(2, '0')}</p>
        <h1 className="mt-2 text-4xl font-black text-white md:text-5xl">{chapter.title}</h1>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-400">{chapter.subtitle}</p>
    </div>
    {['Periodic Trends', 'Important Compounds', 'Preparation Animations', 'Real World Applications'].map((title, stageIndex) => (
      <Section key={title} index={stageIndex + 1} title={title}>
        <div className="rounded-lg border border-cyan-400/15 bg-white/[0.025] p-5">
          <h3 className="text-2xl font-black text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{chapter.title} keeps the same visual learning rhythm and can be expanded with dedicated data like Groups 13 and 14.</p>
        </div>
      </Section>
    ))}
  </div>
);

export const PBlockModule: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedChapter = selectedIndex === null ? null : chapters[selectedIndex];
  const selectedFamily = selectedIndex === null ? null : familyDataByIndex[selectedIndex];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <FloatingParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg-cyan opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,#000_88%)]" />

      <AnimatePresence mode="wait">
        {selectedChapter !== null && selectedIndex !== null ? (
          <motion.div key={selectedChapter.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" onClick={() => setSelectedIndex(null)} className="fixed left-5 top-5 z-30 rounded-md border border-cyan-400/30 bg-black/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10">
              All p-block sections
            </button>
            {selectedFamily ? <FamilyDashboard family={selectedFamily} onBack={() => setSelectedIndex(null)} /> : <PlaceholderDashboard chapter={selectedChapter} index={selectedIndex} onBack={() => setSelectedIndex(null)} />}
          </motion.div>
        ) : (
          <motion.main key="p-block-home" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-28 md:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">/inorganic/p-block</p>
              <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">p-Block Visualization Flow</h1>
              <p className="mt-4 text-base leading-7 text-slate-400">Groups 13 through 18 arranged as a clear cinematic sequence with each family following the same visual learning rhythm.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {chapters.map((chapter, index) => <CategoryCard key={chapter.title} chapter={chapter} index={index} onClick={() => setSelectedIndex(index)} />)}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PBlockModule;
