export type SBlockGroupId = '1A' | '2A';

export interface SBlockElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  fullConfiguration: string;
  shells: number[];
  valenceElectrons: number;
  oxidationState: string;
  narration: string;
}

export interface TrendData {
  id: string;
  label: string;
  direction: 'increase' | 'decrease';
  arrow: 'down' | 'up';
  tone: 'green' | 'red';
  explanation: string;
}

export interface PrepStep {
  equation: string;
  detail: string;
}

export interface CompoundData {
  id: string;
  name: string;
  formula: string;
  description: string;
  prepSteps: PrepStep[];
}

export interface ApplicationData {
  title: string;
  image: string;
  explanation: string;
  narration: string;
}

export interface SBlockGroup {
  id: SBlockGroupId;
  title: string;
  shortTitle: string;
  description: string;
  elements: SBlockElement[];
  compounds: CompoundData[];
  applications: ApplicationData[];
}

export const trends: TrendData[] = [
  {
    id: 'atomic-radius',
    label: 'Atomic Radius',
    direction: 'increase',
    arrow: 'down',
    tone: 'green',
    explanation: 'Atomic radius increases down the group due to addition of new shells.'
  },
  {
    id: 'ionic-radius',
    label: 'Ionic Radius',
    direction: 'increase',
    arrow: 'down',
    tone: 'green',
    explanation: 'Ionic radius increases down the group as each ion has one more shell.'
  },
  {
    id: 'ionization-enthalpy',
    label: 'Ionization Enthalpy',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Ionization enthalpy decreases down the group because shielding increases.'
  },
  {
    id: 'electron-affinity',
    label: 'Electron Affinity',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Electron affinity generally decreases down the group as added electrons are farther from the nucleus.'
  },
  {
    id: 'electronegativity',
    label: 'Electronegativity',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Electronegativity decreases down the group due to larger size and shielding.'
  },
  {
    id: 'melting-point',
    label: 'Melting Point',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Melting point usually decreases down alkali metals; alkaline earth metals show small irregularities.'
  },
  {
    id: 'boiling-point',
    label: 'Boiling Point',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Boiling point generally decreases down the group as metallic bonding weakens.'
  },
  {
    id: 'reactivity',
    label: 'Reactivity',
    direction: 'increase',
    arrow: 'down',
    tone: 'green',
    explanation: 'Reactivity increases down the group because valence electrons are lost more easily.'
  },
  {
    id: 'hydration-enthalpy',
    label: 'Hydration Enthalpy',
    direction: 'decrease',
    arrow: 'down',
    tone: 'red',
    explanation: 'Hydration enthalpy decreases down the group as ionic size increases.'
  }
];

const group1Elements: SBlockElement[] = [
  {
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    fullConfiguration: '1s² 2s¹',
    shells: [2, 1],
    valenceElectrons: 1,
    oxidationState: '+1',
    narration: 'Lithium has one electron in its outermost shell and therefore easily loses it to form a plus one ion.'
  },
  {
    symbol: 'Na',
    name: 'Sodium',
    atomicNumber: 11,
    fullConfiguration: '1s² 2s² 2p⁶ 3s¹',
    shells: [2, 8, 1],
    valenceElectrons: 1,
    oxidationState: '+1',
    narration: 'Sodium has one electron in its outermost shell and therefore easily loses it to form a stable sodium ion.'
  },
  {
    symbol: 'K',
    name: 'Potassium',
    atomicNumber: 19,
    fullConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
    shells: [2, 8, 8, 1],
    valenceElectrons: 1,
    oxidationState: '+1',
    narration: 'Potassium has a single outer electron in the fourth shell, so it loses that electron very readily.'
  },
  {
    symbol: 'Rb',
    name: 'Rubidium',
    atomicNumber: 37,
    fullConfiguration: '[Kr] 5s¹',
    shells: [2, 8, 18, 8, 1],
    valenceElectrons: 1,
    oxidationState: '+1',
    narration: 'Rubidium has one loosely held valence electron, which makes it highly reactive.'
  },
  {
    symbol: 'Cs',
    name: 'Cesium',
    atomicNumber: 55,
    fullConfiguration: '[Xe] 6s¹',
    shells: [2, 8, 18, 18, 8, 1],
    valenceElectrons: 1,
    oxidationState: '+1',
    narration: 'Cesium has one very distant valence electron and loses it extremely easily.'
  }
];

const group2Elements: SBlockElement[] = [
  {
    symbol: 'Be',
    name: 'Beryllium',
    atomicNumber: 4,
    fullConfiguration: '1s² 2s²',
    shells: [2, 2],
    valenceElectrons: 2,
    oxidationState: '+2',
    narration: 'Beryllium has two valence electrons in the second shell and commonly forms a plus two state.'
  },
  {
    symbol: 'Mg',
    name: 'Magnesium',
    atomicNumber: 12,
    fullConfiguration: '1s² 2s² 2p⁶ 3s²',
    shells: [2, 8, 2],
    valenceElectrons: 2,
    oxidationState: '+2',
    narration: 'Magnesium has two electrons in its outermost shell and loses them to reach a stable neon configuration.'
  },
  {
    symbol: 'Ca',
    name: 'Calcium',
    atomicNumber: 20,
    fullConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²',
    shells: [2, 8, 8, 2],
    valenceElectrons: 2,
    oxidationState: '+2',
    narration: 'Calcium has two valence electrons in the fourth shell and forms calcium ions by losing both.'
  },
  {
    symbol: 'Sr',
    name: 'Strontium',
    atomicNumber: 38,
    fullConfiguration: '[Kr] 5s²',
    shells: [2, 8, 18, 8, 2],
    valenceElectrons: 2,
    oxidationState: '+2',
    narration: 'Strontium has two outer electrons, with strong shielding from inner shells.'
  },
  {
    symbol: 'Ba',
    name: 'Barium',
    atomicNumber: 56,
    fullConfiguration: '[Xe] 6s²',
    shells: [2, 8, 18, 18, 8, 2],
    valenceElectrons: 2,
    oxidationState: '+2',
    narration: 'Barium has two distant valence electrons, so it forms a plus two ion readily.'
  }
];

const group1Compounds: CompoundData[] = [
  {
    id: 'NaCl',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    description: 'Common salt with a giant ionic lattice of sodium and chloride ions.',
    prepSteps: [
      { equation: 'Sea brine -> crude NaCl', detail: 'Sea water is evaporated to crystallize crude sodium chloride.' },
      { equation: 'NaCl(crude) + HCl(g) -> pure NaCl', detail: 'Common ion effect helps precipitate purer sodium chloride.' }
    ]
  },
  {
    id: 'NaOH',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    description: 'Caustic soda, a strong base used in soap, paper, and textiles.',
    prepSteps: [
      { equation: '2NaCl + 2H2O -> 2NaOH + Cl2 + H2', detail: 'Brine electrolysis gives sodium hydroxide, chlorine, and hydrogen.' }
    ]
  },
  {
    id: 'Na2CO3',
    name: 'Sodium Carbonate',
    formula: 'Na2CO3',
    description: 'Washing soda precursor made industrially by the Solvay process.',
    prepSteps: [
      { equation: '2NaCl + CaCO3 -> Na2CO3 + CaCl2', detail: 'Overall Solvay process converts brine and limestone into soda ash.' },
      { equation: '2NaHCO3 -> Na2CO3 + CO2 + H2O', detail: 'Heating sodium bicarbonate produces sodium carbonate.' }
    ]
  },
  {
    id: 'NaHCO3',
    name: 'Sodium Bicarbonate',
    formula: 'NaHCO3',
    description: 'Baking soda that releases carbon dioxide on heating or acid treatment.',
    prepSteps: [
      { equation: 'NH3 + CO2 + H2O -> NH4HCO3', detail: 'Ammonia and carbon dioxide form ammonium hydrogen carbonate.' },
      { equation: 'NH4HCO3 + NaCl -> NaHCO3 + NH4Cl', detail: 'Sodium bicarbonate precipitates due to lower solubility.' }
    ]
  },
  {
    id: 'KNO3',
    name: 'Potassium Nitrate',
    formula: 'KNO3',
    description: 'Nitrate fertilizer and oxidizing salt.',
    prepSteps: [
      { equation: 'KCl + NaNO3 -> KNO3 + NaCl', detail: 'Double decomposition followed by fractional crystallization gives potassium nitrate.' }
    ]
  },
  {
    id: 'KMnO4',
    name: 'Potassium Permanganate',
    formula: 'KMnO4',
    description: 'Strong oxidizing agent with the purple permanganate ion.',
    prepSteps: [
      { equation: '2KOH + MnO2 + O2 -> K2MnO4 + H2O', detail: 'Manganese dioxide is fused with alkali in air to form manganate.' },
      { equation: '3MnO4^2- + 4H+ -> 2MnO4^- + MnO2 + 2H2O', detail: 'Manganate disproportionates to permanganate in acidic medium.' }
    ]
  }
];

const group2Compounds: CompoundData[] = [
  {
    id: 'CaCO3',
    name: 'Calcium Carbonate',
    formula: 'CaCO3',
    description: 'Limestone, chalk, and marble; a major cement raw material.',
    prepSteps: [
      { equation: 'Ca(OH)2 + CO2 -> CaCO3 + H2O', detail: 'Carbon dioxide gives a white calcium carbonate precipitate with lime water.' }
    ]
  },
  {
    id: 'CaO',
    name: 'Calcium Oxide',
    formula: 'CaO',
    description: 'Quicklime used in cement and lime chemistry.',
    prepSteps: [
      { equation: 'CaCO3 -> CaO + CO2', detail: 'Limestone is strongly heated in a lime kiln.' }
    ]
  },
  {
    id: 'Ca(OH)2',
    name: 'Calcium Hydroxide',
    formula: 'Ca(OH)2',
    description: 'Slaked lime used in whitewashing and neutralization.',
    prepSteps: [
      { equation: 'CaO + H2O -> Ca(OH)2', detail: 'Quicklime reacts exothermically with water.' }
    ]
  },
  {
    id: 'MgSO4',
    name: 'Magnesium Sulfate',
    formula: 'MgSO4',
    description: 'Epsom salt, used medically and in agriculture.',
    prepSteps: [
      { equation: 'MgCO3 + H2SO4 -> MgSO4 + CO2 + H2O', detail: 'Magnesium carbonate reacts with dilute sulfuric acid.' }
    ]
  },
  {
    id: 'PlasterOfParis',
    name: 'Plaster of Paris',
    formula: 'CaSO4.1/2H2O',
    description: 'Hemihydrate of gypsum used for casts and moulds.',
    prepSteps: [
      { equation: 'CaSO4.2H2O -> CaSO4.1/2H2O + 3/2H2O', detail: 'Gypsum is heated near 373 K to form plaster of Paris.' }
    ]
  }
];

export const sBlockGroups: SBlockGroup[] = [
  {
    id: '1A',
    title: 'Alkali Metals',
    shortTitle: 'Group 1A',
    description: 'Soft, highly reactive metals with one outer electron and common +1 oxidation state.',
    elements: group1Elements,
    compounds: group1Compounds,
    applications: [
      {
        title: 'Baking soda in cooking',
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80',
        explanation: 'Sodium bicarbonate releases carbon dioxide, making dough rise.',
        narration: 'Baking soda releases carbon dioxide during heating or acid reaction, creating tiny gas pockets in food.'
      },
      {
        title: 'NaOH in soap industry',
        image: 'https://images.unsplash.com/photo-1607006483224-0cc8f031dada?auto=format&fit=crop&w=900&q=80',
        explanation: 'Sodium hydroxide converts fats into soap by saponification.',
        narration: 'Sodium hydroxide breaks ester bonds in oils and fats, forming soap and glycerol.'
      },
      {
        title: 'Fertilizers',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
        explanation: 'Potassium salts supply essential potassium for plant growth.',
        narration: 'Potassium salts support root strength, enzyme action, and healthy crop development.'
      }
    ]
  },
  {
    id: '2A',
    title: 'Alkaline Earth Metals',
    shortTitle: 'Group 2A',
    description: 'Reactive metals with two outer electrons and dominant +2 oxidation state.',
    elements: group2Elements,
    compounds: group2Compounds,
    applications: [
      {
        title: 'Cement industry',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
        explanation: 'Calcium carbonate and lime are core raw materials for cement.',
        narration: 'Calcium carbonate is heated to quicklime, which reacts with silicates to form cement clinker.'
      },
      {
        title: 'Plaster casts',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
        explanation: 'Plaster of Paris sets into hard gypsum when mixed with water.',
        narration: 'Plaster of Paris absorbs water and reforms gypsum, producing a hard solid cast.'
      },
      {
        title: 'Epsom salt',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
        explanation: 'Magnesium sulfate is used in medicine and magnesium-deficient soils.',
        narration: 'Magnesium sulfate supplies magnesium ions, useful in agriculture and selected medical uses.'
      }
    ]
  }
];
