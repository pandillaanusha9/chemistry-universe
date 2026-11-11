/**
 * Maps a specific electron index inside a given Bohr shell index (0 = K, 1 = L, etc.)
 * to its chemical subshell type (s, p, d, f) according to standard orbital capacities.
 */
export function getSubshellType(shellIndex: number, electronIndex: number): 's' | 'p' | 'd' | 'f' {
  // Shell K (n=1): holds max 2 electrons, all in 's' (1s)
  if (shellIndex === 0) return 's';

  // Shell L (n=2): holds max 8 electrons. First 2 are 's' (2s), remaining 6 are 'p' (2p)
  if (shellIndex === 1) {
    if (electronIndex < 2) return 's';
    return 'p';
  }

  // Shell M (n=3): holds max 18 electrons. First 2 are 's' (3s), next 6 are 'p' (3p), next 10 are 'd' (3d)
  if (shellIndex === 2) {
    if (electronIndex < 2) return 's';
    if (electronIndex < 8) return 'p';
    return 'd';
  }

  // Shell N (n=4) and larger: s=2, p=6, d=10, f=14
  if (electronIndex < 2) return 's';
  if (electronIndex < 8) return 'p';
  if (electronIndex < 18) return 'd';
  return 'f';
}

/**
 * Parses the electronic configuration string (supporting noble gas shorthands)
 * and returns the cumulative electron counts for s, p, d, and f subshells.
 */
export function getSubshellCounts(configStr: string): { s: number; p: number; d: number; f: number } {
  const counts = { s: 0, p: 0, d: 0, f: 0 };
  
  // Expand noble gas core shorthands
  if (configStr.includes('[He]')) {
    counts.s += 2;
  } else if (configStr.includes('[Ne]')) {
    counts.s += 4;
    counts.p += 6;
  } else if (configStr.includes('[Ar]')) {
    counts.s += 6;
    counts.p += 12;
  } else if (configStr.includes('[Kr]')) {
    counts.s += 8;
    counts.p += 18;
    counts.d += 10;
  } else if (configStr.includes('[Xe]')) {
    counts.s += 10;
    counts.p += 24;
    counts.d += 20;
  } else if (configStr.includes('[Rn]')) {
    counts.s += 12;
    counts.p += 30;
    counts.d += 30;
    counts.f += 14;
  }

  // Find subshell expressions like 3s², 4d¹⁰, 5f¹⁴, 2p²
  const termRegex = /(\d)(s|p|d|f)([¹²³⁴⁵⁶⁷⁸⁹⁰]+)/g;
  let match;
  
  const superscriptMap: Record<string, number> = {
    '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁰': 0
  };

  while ((match = termRegex.exec(configStr)) !== null) {
    const type = match[2] as 's' | 'p' | 'd' | 'f';
    const superscriptChars = match[3];
    
    // Parse superscript value
    let value = 0;
    for (const char of superscriptChars) {
      value = value * 10 + (superscriptMap[char] ?? 0);
    }
    counts[type] += value;
  }

  return counts;
}

/**
 * Returns details about selected main shell
 */
export function getShellDetails(index: number) {
  const names = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  return {
    name: names[index] || '?',
    level: `n = ${index + 1}`,
    type: 'Principal Energy Shell'
  };
}

/**
 * Returns details about selected subshell
 */
export function getSubshellDetails(type: 's' | 'p' | 'd' | 'f') {
  const names = {
    s: { name: 's subshell', description: 'Sharp / Spherical Orbital', l: 'l = 0' },
    p: { name: 'p subshell', description: 'Principal / Dumbbell Orbital', l: 'l = 1' },
    d: { name: 'd subshell', description: 'Diffuse / Cloverleaf Orbital', l: 'l = 2' },
    f: { name: 'f subshell', description: 'Fundamental / Complex Orbital', l: 'l = 3' }
  };
  return names[type];
}
