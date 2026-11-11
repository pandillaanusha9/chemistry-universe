import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ----------------------------------------------------
// Element Atom Styles (Colors & Radii)
// ----------------------------------------------------
const ATOM_STYLES: Record<string, { color: string; radius: number; fullName: string }> = {
  H: { color: '#ffffff', radius: 0.35, fullName: 'Hydrogen' },
  He: { color: '#67e8f9', radius: 0.46, fullName: 'Helium' },
  B: { color: '#ffb3e6', radius: 0.65, fullName: 'Boron' },
  C: { color: '#4b5563', radius: 0.60, fullName: 'Carbon' },
  Si: { color: '#facc15', radius: 0.72, fullName: 'Silicon' },
  Ge: { color: '#38bdf8', radius: 0.76, fullName: 'Germanium' },
  Sn: { color: '#94a3b8', radius: 0.82, fullName: 'Tin' },
  Pb: { color: '#64748b', radius: 0.88, fullName: 'Lead' },
  N: { color: '#3b82f6', radius: 0.58, fullName: 'Nitrogen' },
  O: { color: '#ef4444', radius: 0.55, fullName: 'Oxygen' },
  F: { color: '#06b6d4', radius: 0.50, fullName: 'Fluorine' },
  Br: { color: '#92400e', radius: 0.82, fullName: 'Bromine' },
  I: { color: '#7c3aed', radius: 0.90, fullName: 'Iodine' },
  At: { color: '#64748b', radius: 0.94, fullName: 'Astatine' },
  Ne: { color: '#fb7185', radius: 0.58, fullName: 'Neon' },
  Ar: { color: '#38bdf8', radius: 0.72, fullName: 'Argon' },
  Kr: { color: '#a78bfa', radius: 0.82, fullName: 'Krypton' },
  Na: { color: '#a855f7', radius: 0.85, fullName: 'Sodium (Na⁺)' },
  Mg: { color: '#10b981', radius: 0.80, fullName: 'Magnesium (Mg²⁺)' },
  Al: { color: '#9ca3af', radius: 0.75, fullName: 'Aluminum' },
  P: { color: '#f97316', radius: 0.70, fullName: 'Phosphorus' },
  As: { color: '#a78bfa', radius: 0.76, fullName: 'Arsenic' },
  Sb: { color: '#f472b6', radius: 0.82, fullName: 'Antimony' },
  Bi: { color: '#60a5fa', radius: 0.90, fullName: 'Bismuth' },
  S: { color: '#eab308', radius: 0.72, fullName: 'Sulfur' },
  Cl: { color: '#22c55e', radius: 0.78, fullName: 'Chlorine (Cl⁻)' },
  K: { color: '#db2777', radius: 0.95, fullName: 'Potassium (K⁺)' },
  Ca: { color: '#6366f1', radius: 0.90, fullName: 'Calcium (Ca²⁺)' },
  Sc: { color: '#94a3b8', radius: 0.74, fullName: 'Scandium' },
  Ti: { color: '#a3a3a3', radius: 0.74, fullName: 'Titanium' },
  V: { color: '#22c55e', radius: 0.74, fullName: 'Vanadium' },
  Cr: { color: '#f97316', radius: 0.74, fullName: 'Chromium' },
  Mn: { color: '#fb7185', radius: 0.74, fullName: 'Manganese' },
  Fe: { color: '#b45309', radius: 0.76, fullName: 'Iron' },
  Co: { color: '#2563eb', radius: 0.75, fullName: 'Cobalt' },
  Ni: { color: '#16a34a', radius: 0.75, fullName: 'Nickel' },
  Cu: { color: '#0d9488', radius: 0.75, fullName: 'Copper' },
  Zn: { color: '#71717a', radius: 0.76, fullName: 'Zinc' },
  Ag: { color: '#d1d5db', radius: 0.84, fullName: 'Silver' },
  Pt: { color: '#c4b5fd', radius: 0.82, fullName: 'Platinum' },
  Xe: { color: '#8b5cf6', radius: 0.90, fullName: 'Xenon' },
  Rn: { color: '#94a3b8', radius: 0.98, fullName: 'Radon' },
  La: { color: '#22c55e', radius: 0.90, fullName: 'Lanthanum' },
  Ce: { color: '#f59e0b', radius: 0.88, fullName: 'Cerium' },
  Pr: { color: '#84cc16', radius: 0.88, fullName: 'Praseodymium' },
  Nd: { color: '#c084fc', radius: 0.88, fullName: 'Neodymium' },
  Eu: { color: '#ef4444', radius: 0.87, fullName: 'Europium' },
  Gd: { color: '#60a5fa', radius: 0.87, fullName: 'Gadolinium' },
  Ac: { color: '#22d3ee', radius: 0.92, fullName: 'Actinium' },
  Th: { color: '#ec4899', radius: 0.92, fullName: 'Thorium' },
  Pa: { color: '#f97316', radius: 0.93, fullName: 'Protactinium' },
  U: { color: '#10b981', radius: 0.95, fullName: 'Uranium' },
  Np: { color: '#38bdf8', radius: 0.94, fullName: 'Neptunium' },
  Pu: { color: '#ef4444', radius: 0.94, fullName: 'Plutonium' },
  Am: { color: '#a855f7', radius: 0.93, fullName: 'Americium' },
  Cm: { color: '#84cc16', radius: 0.93, fullName: 'Curium' },
};

export interface AtomNode {
  symbol: string;
  position: [number, number, number];
  charge?: string;
  note?: string;
}

export interface BondLine {
  from: number;
  to: number;
  type: 'single' | 'double' | 'triple' | 'coordination' | 'lattice';
}

export interface LonePairLobe {
  position: [number, number, number];
  rotation?: [number, number, number];
}

interface MoleculeData {
  name: string;
  formula: string;
  geometry: string;
  description: string;
  atoms: AtomNode[];
  bonds: BondLine[];
  lonePairs?: LonePairLobe[];
}

// ----------------------------------------------------
// Static Molecule Configurations
// ----------------------------------------------------
const MOLECULES: Record<string, MoleculeData> = {
  // s-Block
  NaCl: {
    name: 'Sodium Chloride Lattice',
    formula: 'NaCl (Crystalline)',
    geometry: 'Face-Centered Cubic (FCC) Lattice',
    description: 'NCERT: Giant ionic 3D lattice showing alternating small Na⁺ cations and large Cl⁻ anions in octahedrally coordinated nodes.',
    atoms: [
      // Alternating 3x3x3 grid centered around (0,0,0)
      // Layer 1 (z = -1)
      { symbol: 'Na', position: [-1.2, -1.2, -1.2] }, { symbol: 'Cl', position: [0, -1.2, -1.2] }, { symbol: 'Na', position: [1.2, -1.2, -1.2] },
      { symbol: 'Cl', position: [-1.2, 0, -1.2] },   { symbol: 'Na', position: [0, 0, -1.2] },   { symbol: 'Cl', position: [1.2, 0, -1.2] },
      { symbol: 'Na', position: [-1.2, 1.2, -1.2] },  { symbol: 'Cl', position: [0, 1.2, -1.2] },  { symbol: 'Na', position: [1.2, 1.2, -1.2] },
      // Layer 2 (z = 0)
      { symbol: 'Cl', position: [-1.2, -1.2, 0] },    { symbol: 'Na', position: [0, -1.2, 0] },    { symbol: 'Cl', position: [1.2, -1.2, 0] },
      { symbol: 'Na', position: [-1.2, 0, 0] },      { symbol: 'Cl', position: [0, 0, 0] },      { symbol: 'Na', position: [1.2, 0, 0] },
      { symbol: 'Cl', position: [-1.2, 1.2, 0] },    { symbol: 'Na', position: [0, 1.2, 0] },    { symbol: 'Cl', position: [1.2, 1.2, 0] },
      // Layer 3 (z = 1)
      { symbol: 'Na', position: [-1.2, -1.2, 1.2] },  { symbol: 'Cl', position: [0, -1.2, 1.2] },  { symbol: 'Na', position: [1.2, -1.2, 1.2] },
      { symbol: 'Cl', position: [-1.2, 0, 1.2] },    { symbol: 'Na', position: [0, 0, 1.2] },    { symbol: 'Cl', position: [1.2, 0, 1.2] },
      { symbol: 'Na', position: [-1.2, 1.2, 1.2] },   { symbol: 'Cl', position: [0, 1.2, 1.2] },   { symbol: 'Na', position: [1.2, 1.2, 1.2] },
    ],
    bonds: [
      // Connect adjacent lattice points
      { from: 0, to: 1, type: 'lattice' }, { from: 1, to: 2, type: 'lattice' },
      { from: 3, to: 4, type: 'lattice' }, { from: 4, to: 5, type: 'lattice' },
      { from: 6, to: 7, type: 'lattice' }, { from: 7, to: 8, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' }, { from: 3, to: 6, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' }, { from: 4, to: 7, type: 'lattice' },
      { from: 2, to: 5, type: 'lattice' }, { from: 5, to: 8, type: 'lattice' },
      
      { from: 9, to: 10, type: 'lattice' }, { from: 10, to: 11, type: 'lattice' },
      { from: 12, to: 13, type: 'lattice' }, { from: 13, to: 14, type: 'lattice' },
      { from: 15, to: 16, type: 'lattice' }, { from: 16, to: 17, type: 'lattice' },
      { from: 9, to: 12, type: 'lattice' }, { from: 12, to: 15, type: 'lattice' },
      { from: 10, to: 13, type: 'lattice' }, { from: 13, to: 16, type: 'lattice' },
      { from: 11, to: 14, type: 'lattice' }, { from: 14, to: 17, type: 'lattice' },

      { from: 18, to: 19, type: 'lattice' }, { from: 19, to: 20, type: 'lattice' },
      { from: 21, to: 22, type: 'lattice' }, { from: 22, to: 23, type: 'lattice' },
      { from: 24, to: 25, type: 'lattice' }, { from: 25, to: 26, type: 'lattice' },
      { from: 18, to: 21, type: 'lattice' }, { from: 21, to: 24, type: 'lattice' },
      { from: 19, to: 22, type: 'lattice' }, { from: 22, to: 25, type: 'lattice' },
      { from: 20, to: 23, type: 'lattice' }, { from: 23, to: 26, type: 'lattice' },

      // Inter-layer connections
      { from: 0, to: 9, type: 'lattice' }, { from: 9, to: 18, type: 'lattice' },
      { from: 1, to: 10, type: 'lattice' }, { from: 10, to: 19, type: 'lattice' },
      { from: 2, to: 11, type: 'lattice' }, { from: 11, to: 20, type: 'lattice' },
      { from: 3, to: 12, type: 'lattice' }, { from: 12, to: 21, type: 'lattice' },
      { from: 4, to: 13, type: 'lattice' }, { from: 13, to: 22, type: 'lattice' },
      { from: 5, to: 14, type: 'lattice' }, { from: 14, to: 23, type: 'lattice' },
      { from: 6, to: 15, type: 'lattice' }, { from: 15, to: 24, type: 'lattice' },
      { from: 7, to: 16, type: 'lattice' }, { from: 16, to: 25, type: 'lattice' },
      { from: 8, to: 17, type: 'lattice' }, { from: 17, to: 26, type: 'lattice' },
    ]
  },
  NaOH: {
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    geometry: 'Linear Ionic Coordinate',
    description: 'Strong alkaline base containing Na⁺ cation ionically attracted to linear OH⁻ anion.',
    atoms: [
      { symbol: 'Na', position: [-1.2, 0, 0], note: 'Sodium Cation (Na⁺)' },
      { symbol: 'O', position: [0.4, 0, 0], note: 'Oxygen' },
      { symbol: 'H', position: [1.3, 0.3, 0], note: 'Hydrogen' }
    ],
    bonds: [
      { from: 1, to: 2, type: 'single' }
    ]
  },
  NaHCO3: {
    name: 'Sodium Bicarbonate',
    formula: 'NaHCO3',
    geometry: 'Planar Anion w/ Cation',
    description: 'Baking soda, showing a planar bicarbonate (HCO3⁻) anion stabilized by a floating Na⁺ cation.',
    atoms: [
      { symbol: 'C', position: [0, 0, 0] },
      { symbol: 'O', position: [1.2, 0, 0], note: 'Double Bond Oxygen' },
      { symbol: 'O', position: [-0.6, 1.0, 0], note: 'Single Bond Oxygen' },
      { symbol: 'O', position: [-0.6, -1.0, 0], note: 'Hydroxide Oxygen' },
      { symbol: 'H', position: [-1.4, -0.8, 0] },
      { symbol: 'Na', position: [0.5, 2.0, 0.5], note: 'Na⁺ Cation' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 3, to: 4, type: 'single' }
    ]
  },
  Na2CO3: {
    name: 'Sodium Carbonate',
    formula: 'Na2CO3',
    geometry: 'Planar Carbonate Anion w/ Sodium Cations',
    description: 'Soda ash, represented by a trigonal carbonate ion stabilized by two sodium cations.',
    atoms: [
      { symbol: 'C', position: [0, 0, 0] },
      { symbol: 'O', position: [0, 1.15, 0] },
      { symbol: 'O', position: [1.0, -0.62, 0] },
      { symbol: 'O', position: [-1.0, -0.62, 0] },
      { symbol: 'Na', position: [1.7, 0.85, 0.55], note: 'Na+ Cation' },
      { symbol: 'Na', position: [-1.7, 0.85, -0.55], note: 'Na+ Cation' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ]
  },
  KNO3: {
    name: 'Potassium Nitrate',
    formula: 'KNO3',
    geometry: 'Trigonal Planar Nitrate w/ Potassium Cation',
    description: 'Nitrate fertilizer and oxidizer, shown as planar nitrate with a nearby K+ ion.',
    atoms: [
      { symbol: 'N', position: [0, 0, 0] },
      { symbol: 'O', position: [0, 1.15, 0] },
      { symbol: 'O', position: [1.0, -0.58, 0] },
      { symbol: 'O', position: [-1.0, -0.58, 0] },
      { symbol: 'K', position: [0, 0.2, 1.9], note: 'Potassium Cation (K+)' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ]
  },
  CaCO3: {
    name: 'Calcium Carbonate',
    formula: 'CaCO3',
    geometry: 'Trigonal Planar Anion w/ Cation',
    description: 'Limestone / Marble, containing a planar carbonate ion (CO3²⁻) ionically linked with Ca²⁺.',
    atoms: [
      { symbol: 'C', position: [0, -0.4, 0] },
      { symbol: 'O', position: [0, 0.8, 0] },
      { symbol: 'O', position: [1.0, -1.0, 0] },
      { symbol: 'O', position: [-1.0, -1.0, 0] },
      { symbol: 'Ca', position: [0, 1.8, 0.8], note: 'Calcium Cation (Ca²⁺)' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ]
  },
  CaO: {
    name: 'Calcium Oxide',
    formula: 'CaO',
    geometry: 'Ionic Rocksalt Sub-unit',
    description: 'Quicklime, represented as a compact ionic Ca2+ and O2- coordination cluster.',
    atoms: [
      { symbol: 'Ca', position: [0, 0, 0], note: 'Calcium Cation (Ca2+)' },
      { symbol: 'O', position: [1.35, 0, 0], note: 'Oxide Ion (O2-)' },
      { symbol: 'O', position: [-1.35, 0, 0], note: 'Oxide Ion (O2-)' },
      { symbol: 'O', position: [0, 1.35, 0], note: 'Oxide Ion (O2-)' },
      { symbol: 'O', position: [0, -1.35, 0], note: 'Oxide Ion (O2-)' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  'Ca(OH)2': {
    name: 'Calcium Hydroxide',
    formula: 'Ca(OH)2',
    geometry: 'Linear Coordination',
    description: 'Slaked lime, featuring a central Ca²⁺ cation flanked by two detached OH⁻ hydroxide anions.',
    atoms: [
      { symbol: 'Ca', position: [0, 0, 0], note: 'Ca²⁺ ion' },
      { symbol: 'O', position: [-1.5, 0.2, 0] },
      { symbol: 'H', position: [-2.2, 0.6, 0] },
      { symbol: 'O', position: [1.5, -0.2, 0] },
      { symbol: 'H', position: [2.2, -0.6, 0] }
    ],
    bonds: [
      { from: 1, to: 2, type: 'single' },
      { from: 3, to: 4, type: 'single' }
    ]
  },
  MgSO4: {
    name: 'Magnesium Sulfate',
    formula: 'MgSO4',
    geometry: 'Tetrahedral Sulfate w/ Magnesium Cation',
    description: 'Epsom salt unit showing a sulfate tetrahedron coordinated near Mg2+.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0] },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] },
      { symbol: 'Mg', position: [0, 0, 2.35], note: 'Magnesium Cation (Mg2+)' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' }
    ]
  },
  PlasterOfParis: {
    name: 'Plaster of Paris',
    formula: 'CaSO4.1/2H2O',
    geometry: 'Hydrated Calcium Sulfate Unit',
    description: 'Hemihydrate calcium sulfate, approximated as calcium near a sulfate group with bound water.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0] },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] },
      { symbol: 'Ca', position: [0, 0, 2.35], note: 'Calcium Cation (Ca2+)' },
      { symbol: 'O', position: [1.7, 1.55, 0], note: 'Water Oxygen' },
      { symbol: 'H', position: [2.25, 1.9, 0.25] },
      { symbol: 'H', position: [1.15, 1.95, -0.25] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 6, to: 7, type: 'single' },
      { from: 6, to: 8, type: 'single' }
    ]
  },

  // p-Block
  B2O3: {
    name: 'Boron Trioxide',
    formula: 'B2O3',
    geometry: 'Trigonal Planar Boron-Oxygen Network',
    description: 'Acidic oxide of boron represented as a planar B-O network fragment.',
    atoms: [
      { symbol: 'B', position: [-0.95, 0, 0], note: 'Trigonal planar boron' },
      { symbol: 'B', position: [0.95, 0, 0], note: 'Trigonal planar boron' },
      { symbol: 'O', position: [0, 0, 0], note: 'Bridging oxygen' },
      { symbol: 'O', position: [-1.65, 1.0, 0] },
      { symbol: 'O', position: [-1.65, -1.0, 0] },
      { symbol: 'O', position: [1.65, 1.0, 0] },
      { symbol: 'O', position: [1.65, -1.0, 0] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'single' },
      { from: 1, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 1, to: 5, type: 'single' },
      { from: 1, to: 6, type: 'single' }
    ]
  },
  Borax: {
    name: 'Borax',
    formula: 'Na2B4O7.10H2O',
    geometry: 'Tetraborate Ionic Structure',
    description: 'Important boron mineral represented as a tetraborate core with sodium ions and water nodes.',
    atoms: [
      { symbol: 'B', position: [-0.9, 0.75, 0] },
      { symbol: 'B', position: [0.9, 0.75, 0] },
      { symbol: 'B', position: [-0.9, -0.75, 0] },
      { symbol: 'B', position: [0.9, -0.75, 0] },
      { symbol: 'O', position: [0, 0, 0], note: 'Shared oxygen bridge' },
      { symbol: 'O', position: [-1.75, 1.2, 0] },
      { symbol: 'O', position: [1.75, 1.2, 0] },
      { symbol: 'O', position: [-1.75, -1.2, 0] },
      { symbol: 'O', position: [1.75, -1.2, 0] },
      { symbol: 'O', position: [0, 1.55, 0.45] },
      { symbol: 'O', position: [0, -1.55, -0.45] },
      { symbol: 'Na', position: [-2.25, 0, 0.8], note: 'Na+ ion' },
      { symbol: 'Na', position: [2.25, 0, -0.8], note: 'Na+ ion' }
    ],
    bonds: [
      { from: 0, to: 4, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 2, to: 4, type: 'single' },
      { from: 3, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 1, to: 6, type: 'single' },
      { from: 2, to: 7, type: 'single' },
      { from: 3, to: 8, type: 'single' },
      { from: 0, to: 9, type: 'single' },
      { from: 1, to: 9, type: 'single' },
      { from: 2, to: 10, type: 'single' },
      { from: 3, to: 10, type: 'single' }
    ]
  },
  H3BO3: {
    name: 'Boric Acid',
    formula: 'H3BO3',
    geometry: 'Planar Boric Acid Structure',
    description: 'Weak monobasic acid with trigonal planar boron bonded to three hydroxyl groups.',
    atoms: [
      { symbol: 'B', position: [0, 0, 0], note: 'Trigonal planar boron' },
      { symbol: 'O', position: [0, 1.15, 0] },
      { symbol: 'O', position: [1.0, -0.58, 0] },
      { symbol: 'O', position: [-1.0, -0.58, 0] },
      { symbol: 'H', position: [0, 1.95, 0] },
      { symbol: 'H', position: [1.7, -1.0, 0] },
      { symbol: 'H', position: [-1.7, -1.0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 2, to: 5, type: 'single' },
      { from: 3, to: 6, type: 'single' }
    ]
  },
  Al2O3: {
    name: 'Aluminium Oxide',
    formula: 'Al2O3',
    geometry: 'Giant Ionic-Covalent Lattice',
    description: 'Hard amphoteric oxide represented as an Al-O lattice fragment.',
    atoms: [
      { symbol: 'Al', position: [-0.95, 0, 0], note: 'Al3+ center' },
      { symbol: 'Al', position: [0.95, 0, 0], note: 'Al3+ center' },
      { symbol: 'O', position: [0, 0.95, 0] },
      { symbol: 'O', position: [0, -0.95, 0] },
      { symbol: 'O', position: [0, 0, 1.15] },
      { symbol: 'O', position: [0, 0, -1.15] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 0, to: 5, type: 'lattice' },
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' },
      { from: 1, to: 5, type: 'lattice' }
    ]
  },
  AlCl3: {
    name: 'Aluminium Chloride',
    formula: 'AlCl3',
    geometry: 'Dimeric Covalent Structure (Al2Cl6)',
    description: 'Lewis acid shown as the dimeric Al2Cl6 covalent structure.',
    atoms: [
      { symbol: 'Al', position: [-0.8, 0, 0], note: 'Electron deficient Al' },
      { symbol: 'Al', position: [0.8, 0, 0], note: 'Electron deficient Al' },
      { symbol: 'Cl', position: [-1.75, 0.95, 0] },
      { symbol: 'Cl', position: [-1.75, -0.95, 0] },
      { symbol: 'Cl', position: [1.75, 0.95, 0] },
      { symbol: 'Cl', position: [1.75, -0.95, 0] },
      { symbol: 'Cl', position: [0, 0.65, 0.55], note: 'Bridging chloride' },
      { symbol: 'Cl', position: [0, -0.65, -0.55], note: 'Bridging chloride' }
    ],
    bonds: [
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 1, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'coordination' },
      { from: 1, to: 6, type: 'coordination' },
      { from: 0, to: 7, type: 'coordination' },
      { from: 1, to: 7, type: 'coordination' }
    ]
  },
  Alum: {
    name: 'Potash Alum',
    formula: 'KAl(SO4)2.12H2O',
    geometry: 'Octahedral Hydrated Ionic Crystal',
    description: 'Double salt represented by hydrated aluminium, sulfate groups, and potassium ion.',
    atoms: [
      { symbol: 'Al', position: [0, 0, 0], note: 'Hydrated Al3+ center' },
      { symbol: 'O', position: [1.15, 0, 0] },
      { symbol: 'O', position: [-1.15, 0, 0] },
      { symbol: 'O', position: [0, 1.15, 0] },
      { symbol: 'O', position: [0, -1.15, 0] },
      { symbol: 'O', position: [0, 0, 1.15] },
      { symbol: 'O', position: [0, 0, -1.15] },
      { symbol: 'S', position: [2.35, 0.95, 0] },
      { symbol: 'S', position: [-2.35, -0.95, 0] },
      { symbol: 'K', position: [0, 2.4, 1.2], note: 'K+ ion' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 4, type: 'coordination' },
      { from: 0, to: 5, type: 'coordination' },
      { from: 0, to: 6, type: 'coordination' },
      { from: 7, to: 1, type: 'single' },
      { from: 8, to: 2, type: 'single' }
    ]
  },
  CO2: {
    name: 'Carbon Dioxide',
    formula: 'CO2',
    geometry: 'Linear Molecular Geometry',
    description: 'Colorless gas produced during respiration and combustion.',
    atoms: [
      { symbol: 'O', position: [-1.2, 0, 0], note: 'Double bonded oxygen' },
      { symbol: 'C', position: [0, 0, 0], note: 'Linear carbon center' },
      { symbol: 'O', position: [1.2, 0, 0], note: 'Double bonded oxygen' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 1, to: 2, type: 'double' }
    ]
  },
  CO: {
    name: 'Carbon Monoxide',
    formula: 'CO',
    geometry: 'Linear Triple-Bonded Molecule',
    description: 'Toxic gas and important reducing agent in metallurgy.',
    atoms: [
      { symbol: 'C', position: [-0.6, 0, 0], note: 'Carbon' },
      { symbol: 'O', position: [0.6, 0, 0], note: 'Oxygen' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'triple' }
    ]
  },
  SiO2: {
    name: 'Silicon Dioxide',
    formula: 'SiO2',
    geometry: 'Three-Dimensional Covalent Network',
    description: 'Major constituent of sand and quartz with giant covalent structure.',
    atoms: [
      { symbol: 'Si', position: [0, 0, 0], note: 'Tetrahedral silicon' },
      { symbol: 'O', position: [1.05, 1.05, 1.05] },
      { symbol: 'O', position: [-1.05, -1.05, 1.05] },
      { symbol: 'O', position: [-1.05, 1.05, -1.05] },
      { symbol: 'O', position: [1.05, -1.05, -1.05] },
      { symbol: 'Si', position: [2.05, 1.55, 1.25] },
      { symbol: 'Si', position: [-2.05, -1.55, 1.25] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 1, to: 5, type: 'single' },
      { from: 2, to: 6, type: 'single' }
    ]
  },
  SiC: {
    name: 'Silicon Carbide',
    formula: 'SiC',
    geometry: 'Tetrahedral Covalent Network',
    description: 'Extremely hard covalent network material used as abrasive and refractory.',
    atoms: [
      { symbol: 'Si', position: [0, 0, 0], note: 'Silicon node' },
      { symbol: 'C', position: [1, 1, 1], note: 'Carbon node' },
      { symbol: 'C', position: [-1, -1, 1] },
      { symbol: 'C', position: [-1, 1, -1] },
      { symbol: 'C', position: [1, -1, -1] },
      { symbol: 'Si', position: [2, 1.7, 1.2] },
      { symbol: 'Si', position: [-2, -1.7, 1.2] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 1, to: 5, type: 'single' },
      { from: 2, to: 6, type: 'single' }
    ]
  },
  PbO: {
    name: 'Lead Oxide',
    formula: 'PbO',
    geometry: 'Ionic Oxide Structure',
    description: 'Amphoteric oxide used in batteries and glass manufacturing.',
    atoms: [
      { symbol: 'Pb', position: [0, 0, 0], note: 'Pb2+ ion' },
      { symbol: 'O', position: [1.35, 0, 0], note: 'Oxide ion' },
      { symbol: 'O', position: [-1.35, 0, 0], note: 'Oxide ion' },
      { symbol: 'O', position: [0, 1.35, 0], note: 'Oxide ion' },
      { symbol: 'Pb', position: [0, 0, 1.35], note: 'Layered lead node' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  SnCl2: {
    name: 'Stannous Chloride',
    formula: 'SnCl2',
    geometry: 'Bent Covalent Molecule',
    description: 'Reducing agent used in electroplating and dyeing industries.',
    atoms: [
      { symbol: 'Sn', position: [0, 0, 0], note: 'Tin(II) center with lone pair' },
      { symbol: 'Cl', position: [-1.05, -0.85, 0] },
      { symbol: 'Cl', position: [1.05, -0.85, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' }
    ]
  },
  CH4: {
    name: 'Methane',
    formula: 'CH4',
    geometry: 'Tetrahedral Covalent Molecule',
    description: 'Simplest hydrocarbon and major component of natural gas.',
    atoms: [
      { symbol: 'C', position: [0, 0, 0], note: 'sp3 carbon' },
      { symbol: 'H', position: [0.9, 0.9, 0.9] },
      { symbol: 'H', position: [-0.9, -0.9, 0.9] },
      { symbol: 'H', position: [-0.9, 0.9, -0.9] },
      { symbol: 'H', position: [0.9, -0.9, -0.9] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' }
    ]
  },
  BF3: {
    name: 'Boron Trifluoride',
    formula: 'BF3',
    geometry: 'Trigonal Planar (sp²)',
    description: 'NCERT: Classic Lewis acid. The central Boron atom undergoes sp² hybridization, forming three highly polar covalent bonds at exactly 120° angles, with zero lone pairs.',
    atoms: [
      { symbol: 'B', position: [0, 0, 0], note: 'sp² Hybridized Boron' },
      { symbol: 'F', position: [0, 1.3, 0], note: 'Fluorine (120°)' },
      { symbol: 'F', position: [1.12, -0.65, 0] },
      { symbol: 'F', position: [-1.12, -0.65, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ]
  },
  NH3: {
    name: 'Ammonia',
    formula: 'NH3',
    geometry: 'Trigonal Pyramidal (sp³)',
    description: 'NCERT: Nitrogen is sp³ hybridized, but the presence of one highly repulsive lone pair compresses the H-N-H bond angle from the ideal tetrahedral 109.5° down to 107°.',
    atoms: [
      { symbol: 'N', position: [0, 0.2, 0], note: 'sp³ Nitrogen with Lone Pair' },
      { symbol: 'H', position: [0.94, -0.25, 0.54] },
      { symbol: 'H', position: [-0.94, -0.25, 0.54] },
      { symbol: 'H', position: [0, -0.25, -1.08] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ],
    lonePairs: [
      { position: [0, 1.1, 0] } // Lone pair sticking up along the z-axis
    ]
  },
  HNO3: {
    name: 'Nitric Acid',
    formula: 'HNO3',
    geometry: 'Planar Nitrate Structure',
    description: 'Strong oxidizing acid used in fertilizers, explosives, and nitration reactions.',
    atoms: [
      { symbol: 'N', position: [0, 0, 0], note: 'Planar nitrogen center' },
      { symbol: 'O', position: [0, 1.18, 0], note: 'Double bonded oxygen' },
      { symbol: 'O', position: [1.03, -0.6, 0], note: 'Nitrate oxygen' },
      { symbol: 'O', position: [-1.03, -0.6, 0], note: 'Hydroxyl oxygen' },
      { symbol: 'H', position: [-1.75, -1.02, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 3, to: 4, type: 'single' }
    ]
  },
  P4O10: {
    name: 'Phosphorus Pentoxide',
    formula: 'P4O10',
    geometry: 'Tetrahedral Phosphorus-Oxygen Cage',
    description: 'Powerful dehydrating agent and acidic oxide of phosphorus.',
    atoms: [
      { symbol: 'P', position: [1, 1, 1], note: 'Phosphorus cage node' },
      { symbol: 'P', position: [-1, -1, 1] },
      { symbol: 'P', position: [-1, 1, -1] },
      { symbol: 'P', position: [1, -1, -1] },
      { symbol: 'O', position: [0, 0, 1.25], note: 'Bridging oxygen' },
      { symbol: 'O', position: [0, 1.25, 0] },
      { symbol: 'O', position: [1.25, 0, 0] },
      { symbol: 'O', position: [-1.25, 0, 0] },
      { symbol: 'O', position: [0, -1.25, 0] },
      { symbol: 'O', position: [0, 0, -1.25] },
      { symbol: 'O', position: [1.75, 1.75, 1.75], note: 'Terminal oxygen' },
      { symbol: 'O', position: [-1.75, -1.75, 1.75] },
      { symbol: 'O', position: [-1.75, 1.75, -1.75] },
      { symbol: 'O', position: [1.75, -1.75, -1.75] }
    ],
    bonds: [
      { from: 0, to: 4, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 2, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'single' },
      { from: 3, to: 6, type: 'single' },
      { from: 1, to: 7, type: 'single' },
      { from: 2, to: 7, type: 'single' },
      { from: 1, to: 8, type: 'single' },
      { from: 3, to: 8, type: 'single' },
      { from: 2, to: 9, type: 'single' },
      { from: 3, to: 9, type: 'single' },
      { from: 0, to: 10, type: 'double' },
      { from: 1, to: 11, type: 'double' },
      { from: 2, to: 12, type: 'double' },
      { from: 3, to: 13, type: 'double' }
    ]
  },
  H3PO4: {
    name: 'Phosphoric Acid',
    formula: 'H3PO4',
    geometry: 'Tetrahedral Phosphate Structure',
    description: 'Moderately strong acid used in fertilizers and soft drinks.',
    atoms: [
      { symbol: 'P', position: [0, 0, 0], note: 'Tetrahedral phosphorus' },
      { symbol: 'O', position: [0, 1.25, 0], note: 'Double bonded oxygen' },
      { symbol: 'O', position: [1.1, -0.45, 0.55], note: 'Hydroxyl oxygen' },
      { symbol: 'O', position: [-1.1, -0.45, 0.55], note: 'Hydroxyl oxygen' },
      { symbol: 'O', position: [0, -0.45, -1.2], note: 'Hydroxyl oxygen' },
      { symbol: 'H', position: [1.75, -0.72, 0.88] },
      { symbol: 'H', position: [-1.75, -0.72, 0.88] },
      { symbol: 'H', position: [0, -0.72, -1.95] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 2, to: 5, type: 'single' },
      { from: 3, to: 6, type: 'single' },
      { from: 4, to: 7, type: 'single' }
    ]
  },
  XeF4: {
    name: 'Xenon Tetrafluoride',
    formula: 'XeF4',
    geometry: 'Square Planar (sp³d²)',
    description: 'NCERT: Xenon has 8 valence electrons. In XeF4, it forms 4 single bonds with Fluorine and has 2 remaining lone pairs. The lone pairs occupy opposing axial positions, minimizing repulsion in a square planar shape.',
    atoms: [
      { symbol: 'Xe', position: [0, 0, 0], note: 'sp³d² Xenon' },
      { symbol: 'F', position: [1.2, 0, 1.2] },
      { symbol: 'F', position: [-1.2, 0, 1.2] },
      { symbol: 'F', position: [1.2, 0, -1.2] },
      { symbol: 'F', position: [-1.2, 0, -1.2] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' }
    ],
    lonePairs: [
      { position: [0, 1.2, 0] },
      { position: [0, -1.2, 0] }
    ]
  },
  XeF2: {
    name: 'Xenon Difluoride',
    formula: 'XeF2',
    geometry: 'Linear Covalent Molecule',
    description: 'Colorless xenon compound with three equatorial lone pairs and two axial Xe-F bonds.',
    atoms: [
      { symbol: 'Xe', position: [0, 0, 0], note: 'Xenon center' },
      { symbol: 'F', position: [-1.45, 0, 0] },
      { symbol: 'F', position: [1.45, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' }
    ],
    lonePairs: [
      { position: [0, 0.95, 0] },
      { position: [0, -0.48, 0.82] },
      { position: [0, -0.48, -0.82] }
    ]
  },
  XeF6: {
    name: 'Xenon Hexafluoride',
    formula: 'XeF6',
    geometry: 'Distorted Octahedral Structure',
    description: 'Reactive xenon fluoride with six Xe-F bonds and one lone pair causing distortion.',
    atoms: [
      { symbol: 'Xe', position: [0, 0, 0], note: 'Xenon center' },
      { symbol: 'F', position: [1.25, 0, 0] },
      { symbol: 'F', position: [-1.25, 0, 0] },
      { symbol: 'F', position: [0, 1.25, 0] },
      { symbol: 'F', position: [0, -1.1, 0.35] },
      { symbol: 'F', position: [0, 0.2, 1.3] },
      { symbol: 'F', position: [0, 0.2, -1.3] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'single' }
    ],
    lonePairs: [
      { position: [0, -0.9, -0.6] }
    ]
  },
  XeO3: {
    name: 'Xenon Trioxide',
    formula: 'XeO3',
    geometry: 'Trigonal Pyramidal Molecule',
    description: 'Explosive oxidizing xenon compound with a pyramidal XeO3 arrangement.',
    atoms: [
      { symbol: 'Xe', position: [0, 0.25, 0], note: 'Xenon center' },
      { symbol: 'O', position: [0, -1.0, 0.55] },
      { symbol: 'O', position: [1.05, 0.4, -0.45] },
      { symbol: 'O', position: [-1.05, 0.4, -0.45] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' },
      { from: 0, to: 3, type: 'double' }
    ],
    lonePairs: [
      { position: [0, 1.25, 0] }
    ]
  },
  NobleGasClathrate: {
    name: 'Noble Gas Clathrate',
    formula: 'Gas@Host',
    geometry: 'Cage-Like Inclusion Structure',
    description: 'Noble gas atom trapped inside a host lattice cavity without ordinary chemical bonding.',
    atoms: [
      { symbol: 'Xe', position: [0, 0, 0], note: 'Trapped noble gas atom' },
      { symbol: 'O', position: [1.25, 1.25, 1.25], note: 'Host cage node' },
      { symbol: 'O', position: [-1.25, 1.25, 1.25] },
      { symbol: 'O', position: [1.25, -1.25, 1.25] },
      { symbol: 'O', position: [-1.25, -1.25, 1.25] },
      { symbol: 'O', position: [1.25, 1.25, -1.25] },
      { symbol: 'O', position: [-1.25, 1.25, -1.25] },
      { symbol: 'O', position: [1.25, -1.25, -1.25] },
      { symbol: 'O', position: [-1.25, -1.25, -1.25] }
    ],
    bonds: [
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 2, to: 4, type: 'lattice' },
      { from: 3, to: 4, type: 'lattice' },
      { from: 5, to: 6, type: 'lattice' },
      { from: 5, to: 7, type: 'lattice' },
      { from: 6, to: 8, type: 'lattice' },
      { from: 7, to: 8, type: 'lattice' },
      { from: 1, to: 5, type: 'lattice' },
      { from: 2, to: 6, type: 'lattice' },
      { from: 3, to: 7, type: 'lattice' },
      { from: 4, to: 8, type: 'lattice' }
    ]
  },
  RnF2: {
    name: 'Radon Difluoride',
    formula: 'RnF2',
    geometry: 'Weakly Bound Radioactive Species',
    description: 'Rare radioactive radon fluoride represented as a weakly bound linear species.',
    atoms: [
      { symbol: 'Rn', position: [0, 0, 0], note: 'Radioactive radon center' },
      { symbol: 'F', position: [-1.5, 0, 0] },
      { symbol: 'F', position: [1.5, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' }
    ]
  },
  PCl5: {
    name: 'Phosphorus Pentachloride',
    formula: 'PCl5',
    geometry: 'Trigonal Bipyramidal (sp³d)',
    description: 'NCERT: Standard sp³d orbital hybrid. Features three equatorial P-Cl bonds (120°) and two longer, weaker axial P-Cl bonds (90° to the equator) which suffer more repulsion.',
    atoms: [
      { symbol: 'P', position: [0, 0, 0], note: 'sp³d Phosphorus' },
      { symbol: 'Cl', position: [0, 1.6, 0], note: 'Axial Chlorine (Weak Bond)' },
      { symbol: 'Cl', position: [0, -1.6, 0], note: 'Axial Chlorine (Weak Bond)' },
      { symbol: 'Cl', position: [0, 0, 1.45], note: 'Equatorial Chlorine (120°)' },
      { symbol: 'Cl', position: [1.25, 0, -0.725] },
      { symbol: 'Cl', position: [-1.25, 0, -0.725] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' }
    ]
  },
  BiCl3: {
    name: 'Bismuth Chloride',
    formula: 'BiCl3',
    geometry: 'Pyramidal Covalent Structure',
    description: 'Compound used in pharmaceuticals and analytical chemistry.',
    atoms: [
      { symbol: 'Bi', position: [0, 0.28, 0], note: 'Bismuth center with lone pair' },
      { symbol: 'Cl', position: [1.1, -0.55, 0.55] },
      { symbol: 'Cl', position: [-1.1, -0.55, 0.55] },
      { symbol: 'Cl', position: [0, -0.55, -1.1] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ]
  },
  NO2: {
    name: 'Nitrogen Dioxide',
    formula: 'NO2',
    geometry: 'Bent Molecular Geometry',
    description: 'Brown toxic gas and important atmospheric pollutant.',
    atoms: [
      { symbol: 'N', position: [0, 0, 0], note: 'Bent nitrogen center' },
      { symbol: 'O', position: [-0.95, -0.78, 0] },
      { symbol: 'O', position: [0.95, -0.78, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' }
    ]
  },
  H2O: {
    name: 'Water',
    formula: 'H2O',
    geometry: 'Bent Molecular Geometry',
    description: 'Universal solvent with a bent shape caused by two lone pairs on oxygen.',
    atoms: [
      { symbol: 'O', position: [0, 0, 0], note: 'Oxygen center' },
      { symbol: 'H', position: [-0.85, -0.55, 0], note: 'Hydrogen' },
      { symbol: 'H', position: [0.85, -0.55, 0], note: 'Hydrogen' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' }
    ],
    lonePairs: [
      { position: [-0.45, 0.72, 0] },
      { position: [0.45, 0.72, 0] }
    ]
  },
  H2O2: {
    name: 'Hydrogen Peroxide',
    formula: 'H2O2',
    geometry: 'Non-Planar Peroxide Structure',
    description: 'Peroxide molecule with an O-O single bond and a non-planar open-book arrangement.',
    atoms: [
      { symbol: 'O', position: [-0.62, 0, 0], note: 'Peroxide oxygen' },
      { symbol: 'O', position: [0.62, 0, 0], note: 'Peroxide oxygen' },
      { symbol: 'H', position: [-1.22, 0.65, 0.42] },
      { symbol: 'H', position: [1.22, -0.65, -0.42] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 1, to: 3, type: 'single' }
    ]
  },
  SO2: {
    name: 'Sulfur Dioxide',
    formula: 'SO2',
    geometry: 'Bent Covalent Molecule',
    description: 'Acidic sulfur oxide with bent geometry and resonance between S-O bonds.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0], note: 'Sulfur center' },
      { symbol: 'O', position: [-1.08, -0.72, 0] },
      { symbol: 'O', position: [1.08, -0.72, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' }
    ],
    lonePairs: [
      { position: [0, 0.95, 0] }
    ]
  },
  SO3: {
    name: 'Sulfur Trioxide',
    formula: 'SO3',
    geometry: 'Trigonal Planar Molecule',
    description: 'Acidic oxide of sulfur with trigonal planar geometry around sulfur.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0], note: 'Sulfur center' },
      { symbol: 'O', position: [0, 1.25, 0] },
      { symbol: 'O', position: [1.08, -0.62, 0] },
      { symbol: 'O', position: [-1.08, -0.62, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' },
      { from: 0, to: 3, type: 'double' }
    ]
  },
  H2SO4: {
    name: 'Sulfuric Acid',
    formula: 'H2SO4',
    geometry: 'Tetrahedral Coordination',
    description: 'King of chemicals. Central Sulfur is hexavalent, forming two double bonds with terminal oxygen and two single bonds to hydroxyl (OH) groups.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0] },
      { symbol: 'O', position: [0, 1.35, 0], note: 'Double Bond O' },
      { symbol: 'O', position: [1.2, -0.5, 0.4], note: 'Double Bond O' },
      { symbol: 'O', position: [-0.8, -0.8, 0.6], note: 'Acidic OH' },
      { symbol: 'H', position: [-1.6, -0.6, 0.9] },
      { symbol: 'O', position: [-0.4, -0.4, -1.2], note: 'Acidic OH' },
      { symbol: 'H', position: [-0.8, -0.2, -1.9] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' },
      { from: 0, to: 3, type: 'single' },
      { from: 3, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 5, to: 6, type: 'single' }
    ]
  },
  Na2S2O3: {
    name: 'Sodium Thiosulfate',
    formula: 'Na2S2O3',
    geometry: 'Tetrahedral Thiosulfate Structure',
    description: 'Thiosulfate ion represented as a sulfate-like tetrahedron with one sulfur replacing oxygen, stabilized by sodium ions.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0], note: 'Central sulfur' },
      { symbol: 'O', position: [0.95, 0.95, 0.75] },
      { symbol: 'O', position: [-0.95, 0.95, -0.75] },
      { symbol: 'O', position: [0.95, -0.95, -0.75] },
      { symbol: 'S', position: [-0.95, -0.95, 0.75], note: 'Terminal sulfur' },
      { symbol: 'Na', position: [1.8, 0.1, 1.45], note: 'Sodium cation' },
      { symbol: 'Na', position: [-1.8, -0.1, -1.45], note: 'Sodium cation' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' }
    ]
  },
  SF6: {
    name: 'Sulfur Hexafluoride',
    formula: 'SF6',
    geometry: 'Octahedral Covalent Molecule',
    description: 'Dense inert gas with six fluorine atoms arranged octahedrally around sulfur.',
    atoms: [
      { symbol: 'S', position: [0, 0, 0], note: 'Sulfur center' },
      { symbol: 'F', position: [1.35, 0, 0] },
      { symbol: 'F', position: [-1.35, 0, 0] },
      { symbol: 'F', position: [0, 1.35, 0] },
      { symbol: 'F', position: [0, -1.35, 0] },
      { symbol: 'F', position: [0, 0, 1.35] },
      { symbol: 'F', position: [0, 0, -1.35] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'single' }
    ]
  },
  HCl: {
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    geometry: 'Polar Covalent Linear Molecule',
    description: 'Hydrogen chloride is a polar covalent molecule that forms hydrochloric acid in water.',
    atoms: [
      { symbol: 'H', position: [-0.72, 0, 0], note: 'Hydrogen' },
      { symbol: 'Cl', position: [0.72, 0, 0], note: 'Chlorine' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' }
    ]
  },
  HF: {
    name: 'Hydrogen Fluoride',
    formula: 'HF',
    geometry: 'Hydrogen-Bonded Covalent Molecule',
    description: 'Hydrogen fluoride is a polar covalent molecule whose strong hydrogen bonding gives unusual properties.',
    atoms: [
      { symbol: 'H', position: [-0.62, 0, 0], note: 'Hydrogen' },
      { symbol: 'F', position: [0.55, 0, 0], note: 'Fluorine' },
      { symbol: 'H', position: [1.45, 0.55, 0], note: 'Neighbor HF hydrogen bond' },
      { symbol: 'F', position: [2.35, 0.55, 0], note: 'Neighbor HF unit' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 2, to: 3, type: 'single' },
      { from: 1, to: 2, type: 'coordination' }
    ]
  },
  CaOCl2: {
    name: 'Bleaching Powder',
    formula: 'CaOCl2',
    geometry: 'Mixed Ionic Structure',
    description: 'Bleaching powder represented as calcium linked with oxychloride and chloride centers.',
    atoms: [
      { symbol: 'Ca', position: [0, 0, 0], note: 'Calcium cation' },
      { symbol: 'O', position: [1.15, 0.5, 0], note: 'Oxychloride oxygen' },
      { symbol: 'Cl', position: [2.2, 0.5, 0], note: 'O-Cl group' },
      { symbol: 'Cl', position: [-1.2, -0.45, 0], note: 'Chloride ion' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 1, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'lattice' }
    ]
  },
  KClO3: {
    name: 'Potassium Chlorate',
    formula: 'KClO3',
    geometry: 'Trigonal Pyramidal Chlorate Structure',
    description: 'Chlorate ion shown with trigonal pyramidal geometry stabilized by potassium cation.',
    atoms: [
      { symbol: 'Cl', position: [0, 0, 0], note: 'Chlorine center' },
      { symbol: 'O', position: [0, 1.15, 0.25] },
      { symbol: 'O', position: [1.02, -0.58, 0.25] },
      { symbol: 'O', position: [-1.02, -0.58, 0.25] },
      { symbol: 'K', position: [0, 0, 2.0], note: 'Potassium cation' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ],
    lonePairs: [
      { position: [0, 0, -0.9] }
    ]
  },
  I2: {
    name: 'Iodine',
    formula: 'I2',
    geometry: 'Diatomic Molecular Crystal',
    description: 'Iodine is represented as paired diatomic I2 molecules in a simple molecular crystal fragment.',
    atoms: [
      { symbol: 'I', position: [-0.8, 0, 0], note: 'Iodine atom' },
      { symbol: 'I', position: [0.8, 0, 0], note: 'Iodine atom' },
      { symbol: 'I', position: [-0.8, 1.15, 0.45] },
      { symbol: 'I', position: [0.8, 1.15, 0.45] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 2, to: 3, type: 'single' }
    ]
  },
  PVC: {
    name: 'Polyvinyl Chloride',
    formula: '(-CH2-CHCl-)n',
    geometry: 'Polymeric Chlorinated Hydrocarbon',
    description: 'PVC shown as a short repeating chain segment with pendant chlorine atoms.',
    atoms: [
      { symbol: 'C', position: [-1.8, 0, 0], note: 'Polymer backbone carbon' },
      { symbol: 'C', position: [-0.6, 0, 0], note: 'Chlorinated carbon' },
      { symbol: 'C', position: [0.6, 0, 0], note: 'Polymer backbone carbon' },
      { symbol: 'C', position: [1.8, 0, 0], note: 'Chlorinated carbon' },
      { symbol: 'Cl', position: [-0.6, 1.05, 0], note: 'Pendant chlorine' },
      { symbol: 'Cl', position: [1.8, -1.05, 0], note: 'Pendant chlorine' },
      { symbol: 'H', position: [-1.8, 0.85, 0.45] },
      { symbol: 'H', position: [-1.8, -0.85, -0.45] },
      { symbol: 'H', position: [-0.6, -0.85, 0.45] },
      { symbol: 'H', position: [0.6, 0.85, -0.45] },
      { symbol: 'H', position: [0.6, -0.85, 0.45] },
      { symbol: 'H', position: [1.8, 0.85, -0.45] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 1, to: 2, type: 'single' },
      { from: 2, to: 3, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 3, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'single' },
      { from: 0, to: 7, type: 'single' },
      { from: 1, to: 8, type: 'single' },
      { from: 2, to: 9, type: 'single' },
      { from: 2, to: 10, type: 'single' },
      { from: 3, to: 11, type: 'single' }
    ]
  },

  // d-Block
  KMnO4: {
    name: 'Potassium Permanganate',
    formula: 'KMnO4',
    geometry: 'Tetrahedral MnO4⁻ Anion',
    description: 'Powerful purple oxidizer. Represents Mn in its highest +7 oxidation state forming a resonant tetrahedral permanganate anion.',
    atoms: [
      { symbol: 'Mn', position: [0, 0, 0], note: 'Manganese (+7)' },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] },
      { symbol: 'K', position: [0, 0.2, 2.3], note: 'Potassium Cation (K⁺)' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'double' },
      { from: 0, to: 2, type: 'double' },
      { from: 0, to: 3, type: 'double' },
      { from: 0, to: 4, type: 'double' }
    ]
  },
  K2Cr2O7: {
    name: 'Potassium Dichromate',
    formula: 'K2Cr2O7',
    geometry: 'Bridged Double Tetrahedral',
    description: 'Immersive Cr₂O₇²⁻ dichromate orange ion showing two chromium d³s tetrahedrons bridged by a shared oxygen node, stabilized by potassium cations.',
    atoms: [
      { symbol: 'O', position: [0, 0.7, 0], note: 'Bridging Oxygen (Cr-O-Cr)' },
      { symbol: 'Cr', position: [-1.2, 0, 0], note: 'Chromium (+6)' },
      { symbol: 'Cr', position: [1.2, 0, 0], note: 'Chromium (+6)' },
      // Terminal O on Cr1
      { symbol: 'O', position: [-2.0, 0.8, -0.7] },
      { symbol: 'O', position: [-1.7, -1.2, -0.2] },
      { symbol: 'O', position: [-1.2, 0.4, 1.2] },
      // Terminal O on Cr2
      { symbol: 'O', position: [2.0, -0.8, 0.7] },
      { symbol: 'O', position: [1.7, 1.2, 0.2] },
      { symbol: 'O', position: [1.2, -0.4, -1.2] },
      // Floating K+
      { symbol: 'K', position: [-0.1, -1.8, 1.2], note: 'K⁺' },
      { symbol: 'K', position: [0.1, 1.8, -1.2], note: 'K⁺' }
    ],
    bonds: [
      { from: 1, to: 0, type: 'single' },
      { from: 2, to: 0, type: 'single' },
      { from: 1, to: 3, type: 'double' },
      { from: 1, to: 4, type: 'double' },
      { from: 1, to: 5, type: 'double' },
      { from: 2, to: 6, type: 'double' },
      { from: 2, to: 7, type: 'double' },
      { from: 2, to: 8, type: 'double' }
    ]
  },
  CuSO4: {
    name: 'Copper Sulfate Complex',
    formula: 'CuSO4 (Hydrated)',
    geometry: 'Square Planar / Octahedral Coordination',
    description: 'Sleek visual coordination node showing Cu²⁺ d⁹ transition metal center, showing blue color due to d-d electronic transition splits.',
    atoms: [
      { symbol: 'Cu', position: [0, 0, 0], note: 'Cu²⁺ Center (d⁹)' },
      { symbol: 'O', position: [1.3, 0, 0], note: 'Aquo Ligand' },
      { symbol: 'O', position: [-1.3, 0, 0] },
      { symbol: 'O', position: [0, 1.3, 0] },
      { symbol: 'O', position: [0, -1.3, 0] },
      // Sulfates floating
      { symbol: 'S', position: [2.5, 2.5, 0] },
      { symbol: 'O', position: [2.5, 1.4, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 4, type: 'coordination' },
      { from: 5, to: 6, type: 'single' }
    ]
  },
  Fe2O3: {
    name: 'Ferric Oxide',
    formula: 'Fe2O3',
    geometry: 'Ionic Metal Oxide Lattice',
    description: 'Reddish iron(III) oxide represented as a compact hematite-like lattice fragment.',
    atoms: [
      { symbol: 'Fe', position: [-0.8, 0, 0], note: 'Fe3+ center' },
      { symbol: 'Fe', position: [0.8, 0, 0], note: 'Fe3+ center' },
      { symbol: 'O', position: [0, 1.0, 0] },
      { symbol: 'O', position: [0, -1.0, 0] },
      { symbol: 'O', position: [0, 0, 1.05] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' }
    ]
  },
  TiO2: {
    name: 'Titanium Dioxide',
    formula: 'TiO2',
    geometry: 'Octahedral Oxide Lattice',
    description: 'White pigment represented as titanium in octahedral oxide coordination.',
    atoms: [
      { symbol: 'Ti', position: [0, 0, 0], note: 'Titanium(IV)' },
      { symbol: 'O', position: [1.25, 0, 0] },
      { symbol: 'O', position: [-1.25, 0, 0] },
      { symbol: 'O', position: [0, 1.25, 0] },
      { symbol: 'O', position: [0, -1.25, 0] },
      { symbol: 'O', position: [0, 0, 1.25] },
      { symbol: 'O', position: [0, 0, -1.25] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 0, to: 5, type: 'lattice' },
      { from: 0, to: 6, type: 'lattice' }
    ]
  },
  NiCO4: {
    name: 'Nickel Tetracarbonyl',
    formula: 'Ni(CO)4',
    geometry: 'Tetrahedral Covalent Complex',
    description: 'Volatile nickel carbonyl complex with four carbon monoxide ligands arranged tetrahedrally.',
    atoms: [
      { symbol: 'Ni', position: [0, 0, 0], note: 'Nickel(0)' },
      { symbol: 'C', position: [0.9, 0.9, 0.9], note: 'Carbonyl carbon' },
      { symbol: 'O', position: [1.55, 1.55, 1.55], note: 'Carbonyl oxygen' },
      { symbol: 'C', position: [-0.9, -0.9, 0.9] },
      { symbol: 'O', position: [-1.55, -1.55, 1.55] },
      { symbol: 'C', position: [-0.9, 0.9, -0.9] },
      { symbol: 'O', position: [-1.55, 1.55, -1.55] },
      { symbol: 'C', position: [0.9, -0.9, -0.9] },
      { symbol: 'O', position: [1.55, -1.55, -1.55] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 1, to: 2, type: 'triple' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 3, to: 4, type: 'triple' },
      { from: 0, to: 5, type: 'coordination' },
      { from: 5, to: 6, type: 'triple' },
      { from: 0, to: 7, type: 'coordination' },
      { from: 7, to: 8, type: 'triple' }
    ]
  },
  FeCN6: {
    name: 'Potassium Ferrocyanide',
    formula: '[Fe(CN)6]4-',
    geometry: 'Octahedral Low-Spin Complex',
    description: 'Ferrocyanide complex with six strong-field cyanide ligands arranged octahedrally around Fe(II).',
    atoms: [
      { symbol: 'Fe', position: [0, 0, 0], note: 'Fe(II) low-spin center' },
      { symbol: 'C', position: [1.05, 0, 0], note: 'Cyanide carbon donor' },
      { symbol: 'N', position: [1.85, 0, 0], note: 'Cyanide nitrogen' },
      { symbol: 'C', position: [-1.05, 0, 0] },
      { symbol: 'N', position: [-1.85, 0, 0] },
      { symbol: 'C', position: [0, 1.05, 0] },
      { symbol: 'N', position: [0, 1.85, 0] },
      { symbol: 'C', position: [0, -1.05, 0] },
      { symbol: 'N', position: [0, -1.85, 0] },
      { symbol: 'C', position: [0, 0, 1.05] },
      { symbol: 'N', position: [0, 0, 1.85] },
      { symbol: 'C', position: [0, 0, -1.05] },
      { symbol: 'N', position: [0, 0, -1.85] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 1, to: 2, type: 'triple' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 3, to: 4, type: 'triple' },
      { from: 0, to: 5, type: 'coordination' },
      { from: 5, to: 6, type: 'triple' },
      { from: 0, to: 7, type: 'coordination' },
      { from: 7, to: 8, type: 'triple' },
      { from: 0, to: 9, type: 'coordination' },
      { from: 9, to: 10, type: 'triple' },
      { from: 0, to: 11, type: 'coordination' },
      { from: 11, to: 12, type: 'triple' }
    ]
  },
  CuNH3: {
    name: 'Tetraammine Copper(II) Sulfate',
    formula: '[Cu(NH3)4]2+',
    geometry: 'Square Planar / Distorted Octahedral Complex',
    description: 'Deep blue copper-ammonia complex with four ammonia ligands around Cu(II).',
    atoms: [
      { symbol: 'Cu', position: [0, 0, 0], note: 'Cu(II) center' },
      { symbol: 'N', position: [1.2, 0, 0], note: 'Ammonia ligand' },
      { symbol: 'N', position: [-1.2, 0, 0] },
      { symbol: 'N', position: [0, 1.2, 0] },
      { symbol: 'N', position: [0, -1.2, 0] },
      { symbol: 'H', position: [1.65, 0.38, 0.25] },
      { symbol: 'H', position: [-1.65, -0.38, -0.25] },
      { symbol: 'H', position: [0.38, 1.65, 0.25] },
      { symbol: 'H', position: [-0.38, -1.65, -0.25] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 4, type: 'coordination' },
      { from: 1, to: 5, type: 'single' },
      { from: 2, to: 6, type: 'single' },
      { from: 3, to: 7, type: 'single' },
      { from: 4, to: 8, type: 'single' }
    ]
  },
  CoNH3: {
    name: 'Hexaammine Cobalt(III) Chloride',
    formula: '[Co(NH3)6]3+',
    geometry: 'Octahedral Low-Spin Complex',
    description: 'Classic Werner complex with six ammonia ligands around Co(III).',
    atoms: [
      { symbol: 'Co', position: [0, 0, 0], note: 'Co(III) low-spin center' },
      { symbol: 'N', position: [1.2, 0, 0] },
      { symbol: 'N', position: [-1.2, 0, 0] },
      { symbol: 'N', position: [0, 1.2, 0] },
      { symbol: 'N', position: [0, -1.2, 0] },
      { symbol: 'N', position: [0, 0, 1.2] },
      { symbol: 'N', position: [0, 0, -1.2] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 4, type: 'coordination' },
      { from: 0, to: 5, type: 'coordination' },
      { from: 0, to: 6, type: 'coordination' }
    ]
  },
  AgNH3: {
    name: 'Diammine Silver Complex',
    formula: '[Ag(NH3)2]+',
    geometry: 'Linear Coordination Complex',
    description: 'Tollens reagent silver complex with two ammonia ligands in linear coordination.',
    atoms: [
      { symbol: 'Ag', position: [0, 0, 0], note: 'Ag(I) center' },
      { symbol: 'N', position: [-1.15, 0, 0], note: 'Ammonia ligand' },
      { symbol: 'N', position: [1.15, 0, 0], note: 'Ammonia ligand' },
      { symbol: 'H', position: [-1.65, 0.35, 0.25] },
      { symbol: 'H', position: [1.65, -0.35, -0.25] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 1, to: 3, type: 'single' },
      { from: 2, to: 4, type: 'single' }
    ]
  },
  Cisplatin: {
    name: 'Cisplatin',
    formula: 'cis-[Pt(NH3)2Cl2]',
    geometry: 'Square Planar Platinum Complex',
    description: 'Anticancer platinum compound where cis arrangement of chloride and ammine ligands is essential.',
    atoms: [
      { symbol: 'Pt', position: [0, 0, 0], note: 'Pt(II) square planar center' },
      { symbol: 'Cl', position: [1.25, 0, 0], note: 'Chloride ligand' },
      { symbol: 'Cl', position: [0, 1.25, 0], note: 'Chloride ligand cis' },
      { symbol: 'N', position: [-1.25, 0, 0], note: 'Ammine ligand' },
      { symbol: 'N', position: [0, -1.25, 0], note: 'Ammine ligand cis' },
      { symbol: 'H', position: [-1.75, 0.35, 0.2] },
      { symbol: 'H', position: [0.35, -1.75, -0.2] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'coordination' },
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 4, type: 'coordination' },
      { from: 3, to: 5, type: 'single' },
      { from: 4, to: 6, type: 'single' }
    ]
  },
  FeSO4: {
    name: 'Ferrous Sulfate',
    formula: 'FeSO4.7H2O',
    geometry: 'Hydrated Ionic Structure',
    description: 'Green ferrous sulfate represented as hydrated Fe2+ near a sulfate tetrahedron.',
    atoms: [
      { symbol: 'Fe', position: [-1.4, 0, 0], note: 'Fe2+ hydrated center' },
      { symbol: 'S', position: [0.7, 0, 0], note: 'Sulfate sulfur' },
      { symbol: 'O', position: [1.6, 0.85, 0.55] },
      { symbol: 'O', position: [1.6, -0.85, 0.55] },
      { symbol: 'O', position: [1.6, 0.85, -0.55] },
      { symbol: 'O', position: [1.6, -0.85, -0.55] },
      { symbol: 'O', position: [-1.4, 1.15, 0], note: 'Water ligand' },
      { symbol: 'O', position: [-1.4, -1.15, 0], note: 'Water ligand' }
    ],
    bonds: [
      { from: 1, to: 2, type: 'double' },
      { from: 1, to: 3, type: 'single' },
      { from: 1, to: 4, type: 'single' },
      { from: 1, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'coordination' },
      { from: 0, to: 7, type: 'coordination' }
    ]
  },

  // f-Block
  CeO2: {
    name: 'Cerium(IV) Oxide',
    formula: 'CeO2',
    geometry: 'Fluorite Crystal Sub-unit',
    description: 'Cerium oxide, showing a localized fluorite lattice structure representing high-valent lanthanide oxide coordination.',
    atoms: [
      { symbol: 'Ce', position: [0, 0, 0], note: 'Cerium (+4)' },
      { symbol: 'O', position: [0.9, 0.9, 0.9] },
      { symbol: 'O', position: [-0.9, -0.9, 0.9] },
      { symbol: 'O', position: [-0.9, 0.9, -0.9] },
      { symbol: 'O', position: [0.9, -0.9, -0.9] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  La2O3: {
    name: 'Lanthanum Oxide',
    formula: 'La2O3',
    geometry: 'Ionic Oxide Lattice',
    description: 'Basic lanthanide oxide represented as lanthanum ions bridged by oxide ions.',
    atoms: [
      { symbol: 'La', position: [-0.85, 0, 0], note: 'Lanthanum(III)' },
      { symbol: 'La', position: [0.85, 0, 0], note: 'Lanthanum(III)' },
      { symbol: 'O', position: [0, 1.0, 0] },
      { symbol: 'O', position: [0, -1.0, 0] },
      { symbol: 'O', position: [0, 0, 1.05] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' }
    ]
  },
  Nd2O3: {
    name: 'Neodymium Oxide',
    formula: 'Nd2O3',
    geometry: 'Hexagonal Oxide Structure',
    description: 'Neodymium oxide represented as a compact oxide lattice fragment.',
    atoms: [
      { symbol: 'Nd', position: [-0.85, 0, 0], note: 'Neodymium(III)' },
      { symbol: 'Nd', position: [0.85, 0, 0], note: 'Neodymium(III)' },
      { symbol: 'O', position: [0, 1.0, 0.25] },
      { symbol: 'O', position: [0, -1.0, 0.25] },
      { symbol: 'O', position: [0, 0, -1.05] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' }
    ]
  },
  EuCl2: {
    name: 'Europium(II) Chloride',
    formula: 'EuCl2',
    geometry: 'Ionic Chloride Structure',
    description: 'Europium chloride represented as Eu(II) coordinated by chloride ions.',
    atoms: [
      { symbol: 'Eu', position: [0, 0, 0], note: 'Europium(II)' },
      { symbol: 'Cl', position: [1.2, 0, 0] },
      { symbol: 'Cl', position: [-1.2, 0, 0] },
      { symbol: 'Cl', position: [0, 1.2, 0] },
      { symbol: 'Cl', position: [0, -1.2, 0] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  Gd2O3: {
    name: 'Gadolinium Oxide',
    formula: 'Gd2O3',
    geometry: 'Cubic Oxide Lattice',
    description: 'Magnetic lanthanide oxide represented as a cubic oxide lattice fragment.',
    atoms: [
      { symbol: 'Gd', position: [-0.9, 0, 0], note: 'Gadolinium(III)' },
      { symbol: 'Gd', position: [0.9, 0, 0], note: 'Gadolinium(III)' },
      { symbol: 'O', position: [0, 1.05, 0] },
      { symbol: 'O', position: [0, -1.05, 0] },
      { symbol: 'O', position: [0, 0, 1.05] }
    ],
    bonds: [
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 1, to: 2, type: 'lattice' },
      { from: 1, to: 3, type: 'lattice' },
      { from: 1, to: 4, type: 'lattice' }
    ]
  },
  Mischmetal: {
    name: 'Mischmetal',
    formula: 'Ln alloy',
    geometry: 'Alloy Mixture Structure',
    description: 'Mixed lanthanide alloy fragment containing cerium, lanthanum, neodymium, and praseodymium atoms.',
    atoms: [
      { symbol: 'Ce', position: [0, 0, 0], note: 'Cerium-rich alloy node' },
      { symbol: 'La', position: [1.15, 0, 0] },
      { symbol: 'Nd', position: [-1.15, 0, 0] },
      { symbol: 'Pr', position: [0, 1.15, 0] },
      { symbol: 'Ce', position: [0, -1.15, 0] },
      { symbol: 'La', position: [0, 0, 1.15] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' },
      { from: 0, to: 5, type: 'lattice' }
    ]
  },
  UO2: {
    name: 'Uranium Dioxide',
    formula: 'UO2',
    geometry: 'Fluorite-Type Ionic Lattice',
    description: 'Major nuclear fuel represented as uranium in fluorite-type oxide coordination.',
    atoms: [
      { symbol: 'U', position: [0, 0, 0], note: 'Uranium(IV)' },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  UF6: {
    name: 'Uranium Hexafluoride',
    formula: 'UF6',
    geometry: 'Octahedral Geometry (d²sp³)',
    description: 'Highly volatile, symmetric covalent actinide compound used in isotope separation for nuclear energy fuel cycle.',
    atoms: [
      { symbol: 'U', position: [0, 0, 0], note: 'Uranium Hexavalent' },
      { symbol: 'F', position: [0, 1.45, 0], note: 'Axial F' },
      { symbol: 'F', position: [0, -1.45, 0] },
      { symbol: 'F', position: [1.45, 0, 0], note: 'Equatorial F' },
      { symbol: 'F', position: [-1.45, 0, 0] },
      { symbol: 'F', position: [0, 0, 1.45] },
      { symbol: 'F', position: [0, 0, -1.45] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' },
      { from: 0, to: 5, type: 'single' },
      { from: 0, to: 6, type: 'single' }
    ]
  },
  PuO2: {
    name: 'Plutonium Dioxide',
    formula: 'PuO2',
    geometry: 'Fluorite Crystal Structure',
    description: 'Radioactive plutonium oxide represented as a fluorite-type oxide fragment.',
    atoms: [
      { symbol: 'Pu', position: [0, 0, 0], note: 'Plutonium(IV)' },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  ThO2: {
    name: 'Thorium Dioxide',
    formula: 'ThO2',
    geometry: 'Cubic Oxide Lattice',
    description: 'High-melting thorium oxide represented as a cubic oxide coordination fragment.',
    atoms: [
      { symbol: 'Th', position: [0, 0, 0], note: 'Thorium(IV)' },
      { symbol: 'O', position: [1.05, 1.05, 1.05] },
      { symbol: 'O', position: [-1.05, -1.05, 1.05] },
      { symbol: 'O', position: [-1.05, 1.05, -1.05] },
      { symbol: 'O', position: [1.05, -1.05, -1.05] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  AmO2: {
    name: 'Americium Dioxide',
    formula: 'AmO2',
    geometry: 'Fluorite-Type Oxide',
    description: 'Radioactive americium oxide represented with fluorite-type actinide oxide coordination.',
    atoms: [
      { symbol: 'Am', position: [0, 0, 0], note: 'Americium center' },
      { symbol: 'O', position: [0.95, 0.95, 0.95] },
      { symbol: 'O', position: [-0.95, -0.95, 0.95] },
      { symbol: 'O', position: [-0.95, 0.95, -0.95] },
      { symbol: 'O', position: [0.95, -0.95, -0.95] }
    ],
    bonds: [
      { from: 0, to: 1, type: 'lattice' },
      { from: 0, to: 2, type: 'lattice' },
      { from: 0, to: 3, type: 'lattice' },
      { from: 0, to: 4, type: 'lattice' }
    ]
  },
  PuNO3: {
    name: 'Plutonium(IV) Nitrate',
    formula: 'Pu(NO3)4',
    geometry: 'Hydrated Coordination Structure',
    description: 'Plutonium nitrate represented as a Pu(IV) center coordinated by nitrate oxygen donors.',
    atoms: [
      { symbol: 'Pu', position: [0, 0, 0], note: 'Pu(IV) center' },
      { symbol: 'N', position: [1.35, 0, 0] },
      { symbol: 'O', position: [2.1, 0.62, 0] },
      { symbol: 'O', position: [2.1, -0.62, 0] },
      { symbol: 'N', position: [-1.35, 0, 0] },
      { symbol: 'O', position: [-2.1, 0.62, 0] },
      { symbol: 'O', position: [-2.1, -0.62, 0] },
      { symbol: 'O', position: [0, 1.35, 0], note: 'Hydrated oxygen donor' },
      { symbol: 'O', position: [0, -1.35, 0], note: 'Hydrated oxygen donor' }
    ],
    bonds: [
      { from: 0, to: 2, type: 'coordination' },
      { from: 0, to: 3, type: 'coordination' },
      { from: 0, to: 5, type: 'coordination' },
      { from: 0, to: 6, type: 'coordination' },
      { from: 1, to: 2, type: 'double' },
      { from: 1, to: 3, type: 'single' },
      { from: 4, to: 5, type: 'double' },
      { from: 4, to: 6, type: 'single' },
      { from: 0, to: 7, type: 'coordination' },
      { from: 0, to: 8, type: 'coordination' }
    ]
  }
};

// ----------------------------------------------------
// 3D Lone Pair Electron Lobe Sub-component
// ----------------------------------------------------
const LonePairMesh: React.FC<LonePairLobe> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing of the orbital cloud
      const time = state.clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 3) * 0.05;
      meshRef.current.scale.set(pulse * 0.5, pulse * 0.8, pulse * 0.5);
    }
  });

  return (
    <group position={position}>
      {/* Translucent tear-drop lobe shape */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#bd00ff"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Small orbiting dots showing electron density */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#bd00ff" />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#bd00ff" />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// 3D Bond Cylinder Sub-component
// ----------------------------------------------------
interface BondMeshProps {
  start: [number, number, number];
  end: [number, number, number];
  type: BondLine['type'];
  themeColor?: string;
}

const BondMesh: React.FC<BondMeshProps> = ({ start, end, type, themeColor = '#00f3ff' }) => {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const distance = p1.distanceTo(p2);
  const position = p1.clone().add(p2).multiplyScalar(0.5);

  const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Vector3().subVectors(p2, p1).normalize();
  
  // Custom rotation matrix to align cylinder along the bond path
  const alignRotation = () => {
    const quaternion = new THREE.Quaternion();
    const mx = new THREE.Matrix4().lookAt(p1, p2, up);
    quaternion.setFromRotationMatrix(mx);
    const rotateX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    quaternion.multiply(rotateX);
    return quaternion;
  };

  const isDouble = type === 'double';
  const isTriple = type === 'triple';
  const isLattice = type === 'lattice';

  const cylinderRadius = isLattice ? 0.025 : 0.06;
  const cylinderColor = isLattice ? 'rgba(255,255,255,0.08)' : '#374151';

  return (
    <group position={position} quaternion={alignRotation()}>
      {isDouble ? (
        <>
          <mesh position={[-0.1, 0, 0]}>
            <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
            <meshStandardMaterial color={themeColor} roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
            <meshStandardMaterial color={themeColor} roughness={0.3} metalness={0.8} />
          </mesh>
        </>
      ) : isTriple ? (
        <>
          <mesh position={[-0.15, 0, 0]}>
            <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
            <meshStandardMaterial color={themeColor} roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
            <meshStandardMaterial color={themeColor} roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0.15, 0, 0]}>
            <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
            <meshStandardMaterial color={themeColor} roughness={0.3} metalness={0.8} />
          </mesh>
        </>
      ) : (
        <mesh>
          <cylinderGeometry args={[cylinderRadius, cylinderRadius, distance, 8]} />
          <meshStandardMaterial 
            color={type === 'coordination' ? '#a855f7' : cylinderColor} 
            transparent={isLattice}
            opacity={isLattice ? 0.15 : 1}
            roughness={0.4} 
            metalness={0.6} 
          />
        </mesh>
      )}
    </group>
  );
};

// ----------------------------------------------------
// Main Canvas Scene Component
// ----------------------------------------------------
interface SceneProps {
  molecule: MoleculeData;
  activeAtom: number | null;
  setActiveAtom: (idx: number | null) => void;
  accentColor: string;
}

const Scene: React.FC<SceneProps> = ({ molecule, activeAtom, setActiveAtom, accentColor }) => {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.58} />
      <directionalLight position={[10, 10, 10]} intensity={1.25} />
      <directionalLight position={[-10, -8, -6]} intensity={0.48} />
      <pointLight position={[0, 5, 0]} intensity={1.1} color={accentColor} />

      {/* Render Bonds */}
      {molecule.bonds.map((bond, idx) => {
        const startNode = molecule.atoms[bond.from];
        const endNode = molecule.atoms[bond.to];
        if (!startNode || !endNode) return null;
        return (
          <BondMesh
            key={`bond-${idx}`}
            start={startNode.position}
            end={endNode.position}
            type={bond.type}
            themeColor={accentColor}
          />
        );
      })}

      {/* Render Atoms */}
      {molecule.atoms.map((atom, idx) => {
        const config = ATOM_STYLES[atom.symbol] || { color: '#ffffff', radius: 0.5, fullName: 'Unknown' };
        const isHovered = activeAtom === idx;

        return (
          <group 
            key={`atom-${idx}`} 
            position={atom.position}
            onClick={(e) => {
              e.stopPropagation();
              setActiveAtom(idx);
            }}
          >
            <mesh>
              <sphereGeometry args={[config.radius, 32, 32]} />
              <meshStandardMaterial
                color={config.color}
                roughness={0.2}
                metalness={isHovered ? 0.9 : 0.4}
                emissive={isHovered ? config.color : '#000000'}
                emissiveIntensity={isHovered ? 0.6 : 0}
              />
            </mesh>

            {/* Glowing neon halo for selected / active atom */}
            {isHovered && (
              <mesh>
                <sphereGeometry args={[config.radius * 1.3, 16, 16]} />
                <meshBasicMaterial
                  color={config.color}
                  transparent
                  opacity={0.15}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* In-Scene Hover / Selection Labels */}
            {isHovered && (
              <Html distanceFactor={6} position={[0, config.radius + 0.3, 0]} center>
                <div className="bg-gray-950/95 border border-cyan-500/50 text-white px-2.5 py-1.5 rounded shadow-[0_0_15px_rgba(0,243,255,0.4)] backdrop-blur-md select-none font-mono text-[9px] min-w-[120px] text-center z-50">
                  <div className="font-black text-cyan-400">{config.fullName}</div>
                  {atom.note ? (
                    <div className="text-[8px] text-gray-400 mt-1 uppercase leading-tight">{atom.note}</div>
                  ) : (
                    <div className="text-[8px] text-gray-500 mt-1">NODE #{idx} // STATE:OK</div>
                  )}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Render Lone Pair Density Lobes if present */}
      {molecule.lonePairs?.map((lp, idx) => (
        <LonePairMesh key={`lp-${idx}`} position={lp.position} />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={2}
        maxDistance={12}
        autoRotate={true}
        autoRotateSpeed={activeAtom !== null ? 0 : 0.2} // Stop rotation when inspecting atom
      />

      {/* Futuristic bloom glows */}
      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.8}
          mipmapBlur={true}
        />
      </EffectComposer>
    </>
  );
};

// ----------------------------------------------------
// Exported Interactive MoleculeViewer Component
// ----------------------------------------------------
interface MoleculeViewerProps {
  moleculeId: string;
  accentColor?: string;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  moleculeId,
  accentColor = '#00f3ff'
}) => {
  const molecule = useMemo(() => MOLECULES[moleculeId] || MOLECULES['BF3'], [moleculeId]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return undefined;

    let viewer: any;
    let cancelled = false;
    containerRef.current.innerHTML = '';

    const xyz = `${molecule.atoms.length}\n${molecule.name}\n${molecule.atoms
      .map((atom) => `${atom.symbol} ${atom.position[0]} ${atom.position[1]} ${atom.position[2]}`)
      .join('\n')}`;

    const load3Dmol = () => {
      const existing3Dmol = (window as any)['3Dmol'];
      if (existing3Dmol?.createViewer) return Promise.resolve(existing3Dmol);

      return new Promise<any>((resolve, reject) => {
        const existingScript = document.querySelector('script[data-chemistry-universe-3dmol]');
        const finish = () => {
          const loaded3Dmol = (window as any)['3Dmol'];
          if (loaded3Dmol?.createViewer) resolve(loaded3Dmol);
          else reject(new Error('3Dmol browser bundle did not initialize'));
        };

        if (existingScript) {
          existingScript.addEventListener('load', finish, { once: true });
          existingScript.addEventListener('error', reject, { once: true });
          finish();
          return;
        }

        const script = document.createElement('script');
        script.src = '/vendor/3Dmol-min.js';
        script.async = true;
        script.dataset.chemistryUniverse3dmol = 'true';
        script.onload = finish;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    load3Dmol()
      .then(($3Dmol) => {
        if (cancelled || !containerRef.current) return;
        viewer = $3Dmol.createViewer(containerRef.current, { backgroundColor: 'rgba(0,0,0,0)' });
        viewer.addModel(xyz, 'xyz');
        viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: 'Jmol' }, sphere: { scale: 0.26, colorscheme: 'Jmol' } });

        viewer.setStyle({ elem: 'C' }, { stick: { radius: 0.15, color: '#8A8A8A' }, sphere: { scale: 0.26, color: '#8A8A8A' } });
        viewer.setStyle({ elem: 'H' }, { stick: { radius: 0.15, color: '#FFFFFF' }, sphere: { scale: 0.32, color: '#FFFFFF' } });
        viewer.setStyle({ elem: 'He' }, { stick: { radius: 0.15, color: '#67E8F9' }, sphere: { scale: 0.24, color: '#67E8F9' } });
        viewer.setStyle({ elem: 'Ne' }, { stick: { radius: 0.15, color: '#FB7185' }, sphere: { scale: 0.28, color: '#FB7185' } });
        viewer.setStyle({ elem: 'Ar' }, { stick: { radius: 0.15, color: '#38BDF8' }, sphere: { scale: 0.32, color: '#38BDF8' } });
        viewer.setStyle({ elem: 'Kr' }, { stick: { radius: 0.15, color: '#A78BFA' }, sphere: { scale: 0.35, color: '#A78BFA' } });
        viewer.setStyle({ elem: 'O' }, { stick: { radius: 0.15, color: '#FF3B30' }, sphere: { scale: 0.26, color: '#FF3B30' } });
        viewer.setStyle({ elem: 'N' }, { stick: { radius: 0.15, color: '#2F80FF' }, sphere: { scale: 0.26, color: '#2F80FF' } });
        viewer.setStyle({ elem: 'F' }, { stick: { radius: 0.15, color: '#06B6D4' }, sphere: { scale: 0.24, color: '#06B6D4' } });
        viewer.setStyle({ elem: 'P' }, { stick: { radius: 0.15, color: '#FF9500' }, sphere: { scale: 0.30, color: '#FF9500' } });
        viewer.setStyle({ elem: 'S' }, { stick: { radius: 0.15, color: '#FFD60A' }, sphere: { scale: 0.28, color: '#FFD60A' } });
        viewer.setStyle({ elem: 'Br' }, { stick: { radius: 0.15, color: '#92400E' }, sphere: { scale: 0.34, color: '#92400E' } });
        viewer.setStyle({ elem: 'I' }, { stick: { radius: 0.15, color: '#7C3AED' }, sphere: { scale: 0.38, color: '#7C3AED' } });
        viewer.setStyle({ elem: 'Si' }, { stick: { radius: 0.15, color: '#FACC15' }, sphere: { scale: 0.30, color: '#FACC15' } });
        viewer.setStyle({ elem: 'Cl' }, { stick: { radius: 0.15, color: '#32D74B' }, sphere: { scale: 0.26, color: '#32D74B' } });
        viewer.setStyle({ elem: 'Na' }, { stick: { radius: 0.15, color: '#00E5FF' }, sphere: { scale: 0.35, color: '#00E5FF' } });
        viewer.setStyle({ elem: 'K' }, { stick: { radius: 0.15, color: '#C77DFF' }, sphere: { scale: 0.38, color: '#C77DFF' } });
        viewer.setStyle({ elem: 'Mg' }, { stick: { radius: 0.15, color: '#00D68F' }, sphere: { scale: 0.30, color: '#00D68F' } });
        viewer.setStyle({ elem: 'Ca' }, { stick: { radius: 0.15, color: '#FFB26B' }, sphere: { scale: 0.35, color: '#FFB26B' } });
        viewer.setStyle({ elem: 'Ti' }, { stick: { radius: 0.15, color: '#A3A3A3' }, sphere: { scale: 0.32, color: '#A3A3A3' } });
        viewer.setStyle({ elem: 'Cr' }, { stick: { radius: 0.15, color: '#F97316' }, sphere: { scale: 0.32, color: '#F97316' } });
        viewer.setStyle({ elem: 'Mn' }, { stick: { radius: 0.15, color: '#FB7185' }, sphere: { scale: 0.32, color: '#FB7185' } });
        viewer.setStyle({ elem: 'Fe' }, { stick: { radius: 0.15, color: '#B45309' }, sphere: { scale: 0.34, color: '#B45309' } });
        viewer.setStyle({ elem: 'Ni' }, { stick: { radius: 0.15, color: '#16A34A' }, sphere: { scale: 0.33, color: '#16A34A' } });
        viewer.setStyle({ elem: 'Co' }, { stick: { radius: 0.15, color: '#2563EB' }, sphere: { scale: 0.33, color: '#2563EB' } });
        viewer.setStyle({ elem: 'Ag' }, { stick: { radius: 0.15, color: '#D1D5DB' }, sphere: { scale: 0.36, color: '#D1D5DB' } });
        viewer.setStyle({ elem: 'Pt' }, { stick: { radius: 0.15, color: '#C4B5FD' }, sphere: { scale: 0.36, color: '#C4B5FD' } });
        viewer.setStyle({ elem: 'Sn' }, { stick: { radius: 0.15, color: '#94A3B8' }, sphere: { scale: 0.36, color: '#94A3B8' } });
        viewer.setStyle({ elem: 'Pb' }, { stick: { radius: 0.15, color: '#64748B' }, sphere: { scale: 0.40, color: '#64748B' } });
        viewer.setStyle({ elem: 'Bi' }, { stick: { radius: 0.15, color: '#60A5FA' }, sphere: { scale: 0.42, color: '#60A5FA' } });
        viewer.setStyle({ elem: 'Xe' }, { stick: { radius: 0.15, color: '#8B5CF6' }, sphere: { scale: 0.38, color: '#8B5CF6' } });
        viewer.setStyle({ elem: 'Rn' }, { stick: { radius: 0.15, color: '#94A3B8' }, sphere: { scale: 0.42, color: '#94A3B8' } });
        viewer.setStyle({ elem: 'La' }, { stick: { radius: 0.15, color: '#22C55E' }, sphere: { scale: 0.40, color: '#22C55E' } });
        viewer.setStyle({ elem: 'Ce' }, { stick: { radius: 0.15, color: '#F59E0B' }, sphere: { scale: 0.40, color: '#F59E0B' } });
        viewer.setStyle({ elem: 'Pr' }, { stick: { radius: 0.15, color: '#84CC16' }, sphere: { scale: 0.40, color: '#84CC16' } });
        viewer.setStyle({ elem: 'Nd' }, { stick: { radius: 0.15, color: '#C084FC' }, sphere: { scale: 0.40, color: '#C084FC' } });
        viewer.setStyle({ elem: 'Eu' }, { stick: { radius: 0.15, color: '#EF4444' }, sphere: { scale: 0.40, color: '#EF4444' } });
        viewer.setStyle({ elem: 'Gd' }, { stick: { radius: 0.15, color: '#60A5FA' }, sphere: { scale: 0.40, color: '#60A5FA' } });
        viewer.setStyle({ elem: 'Th' }, { stick: { radius: 0.15, color: '#EC4899' }, sphere: { scale: 0.42, color: '#EC4899' } });
        viewer.setStyle({ elem: 'U' }, { stick: { radius: 0.15, color: '#10B981' }, sphere: { scale: 0.44, color: '#10B981' } });
        viewer.setStyle({ elem: 'Pu' }, { stick: { radius: 0.15, color: '#EF4444' }, sphere: { scale: 0.43, color: '#EF4444' } });
        viewer.setStyle({ elem: 'Am' }, { stick: { radius: 0.15, color: '#A855F7' }, sphere: { scale: 0.43, color: '#A855F7' } });

        viewer.zoomTo();
        viewer.rotate(16, 'y');
        viewer.render();
        setError('');
      })
      .catch(() => setError('3D unavailable'));

    return () => {
      cancelled = true;
      if (viewer) viewer.clear();
    };
  }, [molecule]);

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-transparent">
      <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-full border border-cyan-200/50 bg-white/80 px-3 py-1 text-xs font-semibold text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-500/25 dark:bg-slate-950/70 dark:text-cyan-100">
        {molecule.formula}
      </div>
      {error && <div className="grid h-full place-items-center text-sm text-slate-400">{error}</div>}
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/65 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-cyan-100/80 opacity-80 backdrop-blur-md transition group-hover:opacity-100">
        {molecule.geometry}
      </div>
    </div>
  );
};

export default MoleculeViewer;
