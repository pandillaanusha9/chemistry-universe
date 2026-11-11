export const categories = [
  { name: "Haloalkanes", slug: "haloalkanes", accent: "#06b6d4", formula: "R-X", examples: ["CH3Cl", "C2H5Br"] },
  { name: "Haloarenes", slug: "haloarenes", accent: "#3b82f6", formula: "Ar-X", examples: ["C6H5Cl", "C6H5Br"] },
  { name: "Alcohols", slug: "alcohols", accent: "#10b981", formula: "R-OH", examples: ["CH3OH", "C2H5OH"] },
  { name: "Phenols", slug: "phenols", accent: "#8b5cf6", formula: "Ar-OH", examples: ["C6H5OH", "Cresol"] },
  { name: "Ethers", slug: "ethers", accent: "#14b8a6", formula: "R-O-R", examples: ["CH3OCH3", "C2H5OC2H5"] },
  { name: "Aldehydes", slug: "aldehydes", accent: "#f97316", formula: "R-CHO", examples: ["HCHO", "CH3CHO"] },
  { name: "Ketones", slug: "ketones", accent: "#eab308", formula: "R-CO-R", examples: ["CH3COCH3", "Butanone"] },
  { name: "Carboxylic Acids", slug: "carboxylic-acids", accent: "#ef4444", formula: "R-COOH", examples: ["HCOOH", "CH3COOH"] },
  { name: "Amines", slug: "amines", accent: "#ec4899", formula: "R-NH2", examples: ["CH3NH2", "Aniline"] },
  { name: "Azo Compounds", slug: "azo-compounds", accent: "#e879f9", formula: "Ar-N=N-Ar", examples: ["Azobenzene", "Methyl orange"] },
];

export const moleculeModels = {
  methane: `5
Methane
C 0.000 0.000 0.000
H 0.629 0.629 0.629
H -0.629 -0.629 0.629
H -0.629 0.629 -0.629
H 0.629 -0.629 -0.629`,
  chloromethane: `5
Chloromethane
C 0.000 0.000 0.000
Cl 1.760 0.000 0.000
H -0.520 0.900 0.000
H -0.520 -0.450 0.780
H -0.520 -0.450 -0.780`,
  iodomethane: `5
Iodomethane
C 0.000 0.000 0.000
I 2.140 0.000 0.000
H -0.520 0.900 0.000
H -0.520 -0.450 0.780
H -0.520 -0.450 -0.780`,
  ethanol: `9
Ethanol
C -0.748 0.015 0.024
C 0.748 -0.015 -0.024
O 1.322 1.168 0.511
H -1.153 -0.890 -0.430
H -1.147 0.087 1.042
H -1.151 0.858 -0.563
H 1.153 -0.858 0.563
H 1.147 -0.087 -1.042
H 1.981 1.084 1.118`,
  ethene: `6
Ethene
C -0.669 0.000 0.000
C 0.669 0.000 0.000
H -1.232 0.924 0.000
H -1.232 -0.924 0.000
H 1.232 0.924 0.000
H 1.232 -0.924 0.000`,
  benzene: `12
Benzene
C 1.396 0.000 0.000
C 0.698 1.209 0.000
C -0.698 1.209 0.000
C -1.396 0.000 0.000
C -0.698 -1.209 0.000
C 0.698 -1.209 0.000
H 2.479 0.000 0.000
H 1.240 2.148 0.000
H -1.240 2.148 0.000
H -2.479 0.000 0.000
H -1.240 -2.148 0.000
H 1.240 -2.148 0.000`,
  phenol: `13
Phenol
C 1.396 0.000 0.000
C 0.698 1.209 0.000
C -0.698 1.209 0.000
C -1.396 0.000 0.000
C -0.698 -1.209 0.000
C 0.698 -1.209 0.000
O 2.760 0.000 0.000
H 3.100 0.900 0.000
H 1.240 2.148 0.000
H -1.240 2.148 0.000
H -2.479 0.000 0.000
H -1.240 -2.148 0.000
H 1.240 -2.148 0.000`,
  aceticAcid: `8
Acetic acid
C -0.748 0.000 0.000
C 0.722 0.000 0.000
O 1.343 1.034 0.000
O 1.331 -1.128 0.000
H -1.136 -1.016 0.000
H -1.131 0.508 0.889
H -1.131 0.508 -0.889
H 2.272 -0.934 0.000`,
  chlorobenzene: `12
Chlorobenzene
Cl -2.671 0.000 -0.000
C -0.950 0.000 0.000
C -0.252 1.208 0.000
C -0.252 -1.208 0.000
C 1.143 1.208 0.000
C 1.143 -1.208 0.000
C 1.840 0.000 0.000
H -0.782 2.157 0.000
H -0.782 -2.157 -0.000
H 1.686 2.148 -0.000
H 1.686 -2.148 -0.000
H 2.926 0.000 -0.000`,
  diazonium: `13
Benzenediazonium
N 1.944 -0.000 -0.000
N 3.037 0.000 0.000
C 0.565 -0.000 -0.000
C -0.133 1.208 0.000
C -0.133 -1.208 0.000
C -1.527 1.208 0.000
C -1.528 -1.208 0.000
C -2.225 0.000 0.000
H 0.404 2.153 0.000
H 0.403 -2.154 0.000
H -2.070 2.149 0.000
H -2.071 -2.148 0.000
H -3.311 0.001 0.000`,
  toluene: `15
Toluene
C -0.983 0.000 0.000
C -0.285 1.208 0.000
C -0.285 -1.208 0.000
C -2.474 0.000 -0.000
C 1.110 1.208 -0.000
C 1.110 -1.208 0.000
C 1.807 0.000 -0.000
H -0.817 2.156 -0.002
H -0.817 -2.156 -0.002
H -2.869 -0.880 0.518
H -2.869 0.881 0.517
H -2.849 -0.000 -1.028
H 1.653 2.148 -0.001
H 1.653 -2.148 -0.001
H 2.893 -0.000 -0.000`,
  biphenyl: `22
Biphenyl
C -0.723 0.000 -0.000
C 0.723 -0.000 -0.000
C -1.421 -0.959 0.735
C 1.421 0.735 0.959
C -1.421 0.959 -0.735
C 1.421 -0.735 -0.959
C -2.815 -0.959 0.735
C 2.816 0.735 0.959
C -2.816 0.959 -0.735
C 2.816 -0.735 -0.959
C -3.513 -0.000 0.000
C 3.513 0.000 0.000
H -0.892 -1.713 1.313
H 0.892 1.313 1.713
H -0.893 1.713 -1.313
H 0.893 -1.313 -1.713
H -3.358 -1.705 1.307
H 3.358 1.307 1.705
H -3.359 1.705 -1.307
H 3.359 -1.307 -1.705
H -4.599 -0.000 0.000
H 4.599 0.000 0.000`,
  dichlorobenzene: `12
1,4-dichlorobenzene
Cl 3.116 0.000 0.000
Cl -3.116 0.000 0.000
C 1.395 0.000 0.000
C -1.395 0.000 0.000
C 0.698 1.208 -0.000
C -0.697 1.208 0.000
C 0.697 -1.208 0.000
C -0.698 -1.208 0.000
H 1.228 2.157 -0.000
H -1.228 2.157 0.000
H 1.228 -2.157 0.000
H -1.228 -2.157 0.000`,
  nitrochlorobenzene: `14
1-chloro-4-nitrobenzene
Cl 3.770 -0.000 0.001
O -2.768 -1.098 0.000
O -2.769 1.097 0.000
N -2.160 0.000 0.000
C -0.741 0.000 -0.000
C -0.043 -1.208 -0.000
C -0.043 1.208 -0.000
C 1.352 -1.208 -0.000
C 1.352 1.208 -0.000
C 2.049 0.000 0.000
H -0.553 -2.168 -0.000
H -0.553 2.168 -0.000
H 1.882 -2.157 0.000
H 1.883 2.157 0.000`,
  chlorobenzenesulphonicAcid: `16
4-chlorobenzenesulfonic acid
Cl 4.093 -0.003 -0.052
S -2.162 0.003 0.087
O -2.625 -0.005 -1.481
O -2.601 -1.259 0.665
O -2.573 1.269 0.673
C -0.417 0.001 0.050
C 0.282 1.208 0.029
C 0.280 -1.208 0.039
C 1.676 1.207 -0.003
C 1.674 -1.209 0.007
C 2.372 -0.002 -0.014
H -0.239 2.162 0.029
H -0.243 -2.160 0.047
H 2.207 2.155 -0.021
H 2.204 -2.159 -0.003
H -2.342 -0.793 -2.002`,
  formaldehyde: `4
Formaldehyde
O 0.612 0.000 0.000
C -0.612 0.000 0.000
H -1.200 0.243 -0.900
H -1.200 -0.242 0.900`,
  acetaldehyde: `7
Acetaldehyde
O 1.144 0.241 0.000
C -1.257 0.181 0.000
C 0.113 -0.423 0.000
H -1.794 -0.149 0.892
H -1.187 1.272 0.002
H -1.793 -0.147 -0.894
H 0.148 -1.525 -0.001`,
  ethylAcetate: `14
Ethyl acetate
O -0.258 -0.478 -0.000
O 1.247 1.274 0.000
C -1.347 0.450 0.000
C -2.651 -0.320 0.000
C 0.987 0.079 -0.000
C 2.021 -1.005 0.000
H -1.289 1.080 0.894
H -1.290 1.081 -0.894
H -3.506 0.361 0.000
H -2.715 -0.969 -0.879
H -2.715 -0.969 0.879
H 1.916 -1.619 -0.898
H 1.917 -1.617 0.899
H 3.018 -0.555 -0.001`,
  methanol: `6
Methanol
O 0.708 0.000 0.000
C -0.708 0.000 0.000
H -1.073 -0.769 0.685
H -1.073 -0.195 -1.011
H -1.063 0.979 0.331
H 0.994 -0.880 -0.298`,
  chloroethane: `8
Chloroethane
Cl 1.417 0.265 0.000
C -0.126 -0.617 0.000
C -1.290 0.351 0.000
H -0.151 -1.254 -0.889
H -0.151 -1.254 0.888
H -2.237 -0.198 0.000
H -1.273 0.993 0.887
H -1.273 0.993 -0.887`,
  tribromophenol: `13
2,4,6-tribromophenol
Br 1.339 -2.872 0.000
Br 1.338 2.872 -0.000
Br -3.554 -0.000 -0.001
O 2.491 0.000 -0.000
C 1.126 0.000 0.000
C 0.428 -1.208 -0.000
C 0.428 1.208 0.000
C -0.966 -1.208 0.000
C -0.966 1.208 0.000
C -1.664 -0.000 0.000
H -1.512 -2.149 -0.000
H -1.512 2.149 0.000
H 2.800 0.923 0.000`,
  nitrophenol: `15
4-nitrophenol
O 3.446 -0.000 0.000
O -2.733 1.097 0.001
O -2.732 -1.098 -0.000
N -2.124 0.000 0.000
C -0.704 0.001 -0.001
C -0.007 1.208 -0.001
C -0.007 -1.208 -0.000
C 2.085 -0.000 0.000
C 1.388 1.208 -0.000
C 1.387 -1.208 0.000
H -0.516 2.168 -0.001
H -0.517 -2.167 0.000
H 1.920 2.155 -0.000
H 1.925 -2.152 0.001
H 3.762 0.920 0.000`,
  picricAcid: `19
Picric acid
O 2.597 0.002 -0.000
O 0.559 3.514 -0.001
O 0.567 -3.513 -0.001
O 2.477 2.447 0.000
O 2.483 -2.442 -0.000
O -3.588 1.094 0.000
O -3.586 -1.101 -0.000
N 1.224 2.452 -0.000
N 1.229 -2.449 0.000
N -2.979 -0.003 0.000
C 0.532 1.208 0.000
C 0.535 -1.208 0.001
C 1.231 0.001 0.001
C -1.559 -0.002 0.000
C -0.863 1.207 -0.000
C -0.860 -1.209 0.000
H -1.410 2.147 -0.000
H -1.406 -2.150 0.000
H 2.933 0.802 -0.433`,
  salicylicAcid: `16
Salicylic acid
O 0.263 -2.179 -0.187
O 2.232 1.395 -0.479
O 2.466 -0.656 0.473
C 0.279 0.209 0.034
C -0.409 -0.998 -0.081
C -0.427 1.407 0.140
C -1.804 -1.008 -0.091
C -1.822 1.398 0.130
C -2.511 0.190 0.015
C 1.735 0.242 0.045
H 0.080 2.363 0.244
H -2.354 -1.941 -0.180
H -2.373 2.330 0.215
H -3.597 0.183 0.008
H -0.381 -2.906 -0.257
H 3.213 1.408 -0.468`,
  salicylaldehyde: `15
Salicylaldehyde
O 0.096 -2.307 -0.000
O 2.822 0.724 -0.000
C 0.554 0.048 0.000
C -0.346 -1.017 0.000
C 0.082 1.361 0.000
C -1.718 -0.771 -0.000
C -1.291 1.607 0.000
C -2.191 0.542 -0.000
C 1.992 -0.187 0.000
H 0.763 2.208 0.000
H -2.431 -1.591 -0.000
H -1.659 2.629 -0.000
H -3.260 0.734 -0.000
H 2.333 -1.236 0.001
H -0.670 -2.905 -0.000`,
  sodiumPhenoxide: `13
Sodium phenoxide
C 1.396 0.000 0.000
C 0.698 1.209 0.000
C -0.698 1.209 0.000
C -1.396 0.000 0.000
C -0.698 -1.209 0.000
C 0.698 -1.209 0.000
O 2.760 0.000 0.000
Na 4.500 1.200 0.000
H 1.240 2.148 0.000
H -1.240 2.148 0.000
H -2.479 0.000 0.000
H -1.240 -2.148 0.000
H 1.240 -2.148 0.000`,
  sodiumEthoxide: `9
Sodium ethoxide
C -0.748 0.015 0.024
C 0.748 -0.015 -0.024
O 1.322 1.168 0.511
H -1.153 -0.890 -0.430
H -1.147 0.087 1.042
H -1.151 0.858 -0.563
H 1.153 -0.858 0.563
H 1.147 -0.087 -1.042
Na 3.000 1.000 1.500`,
  diethylEther: `15
Diethyl ether
C -2.368 -0.320 0.121
C -1.184 0.635 -0.158
O 0.000 -0.138 0.147
C 1.184 0.635 -0.158
C 2.368 -0.320 0.121
H -2.316 -1.240 -0.463
H -2.316 -0.569 1.184
H -3.308 0.190 -0.063
H -1.173 1.545 0.448
H -1.173 0.916 -1.218
H 1.173 1.545 0.448
H 1.173 0.916 -1.218
H 2.316 -1.240 -0.463
H 2.316 -0.569 1.184
H 3.308 0.190 -0.063`,
  methoxyethane: `12
Methoxyethane
C -1.758 -0.320 0.121
C -0.574 0.635 -0.158
O 0.610 -0.138 0.147
C 1.794 0.635 -0.158
H -1.706 -1.240 -0.463
H -1.706 -0.569 1.184
H -2.698 0.190 -0.063
H -0.563 1.545 0.448
H -0.563 0.916 -1.218
H 1.783 1.545 0.448
H 1.783 0.916 -1.218
H 2.684 0.010 0.111`,
  anisole: `16
Anisole
C 1.189 -0.000 0.000
C 0.490 1.209 0.000
C -0.887 1.209 0.000
C -1.576 0.000 0.000
C -0.887 -1.209 0.000
C 0.490 -1.209 0.000
O 2.553 0.000 0.000
C 3.250 -1.209 0.000
H 0.999 2.148 0.000
H -1.436 2.148 0.000
H -2.661 0.000 0.000
H -1.436 -2.148 0.000
H 0.999 -2.148 0.000
H 2.924 -1.821 0.880
H 2.924 -1.821 -0.880
H 4.314 -1.028 0.000`,
  bromoanisole: `15
4-Bromoanisole
C 1.189 -0.000 0.000
C 0.490 1.209 0.000
C -0.887 1.209 0.000
C -1.576 0.000 0.000
C -0.887 -1.209 0.000
C 0.490 -1.209 0.000
O 2.553 0.000 0.000
C 3.250 -1.209 0.000
Br -3.400 0.000 0.000
H 0.999 2.148 0.000
H -1.436 2.148 0.000
H -1.436 -2.148 0.000
H 0.999 -2.148 0.000
H 2.924 -1.821 0.880
H 2.924 -1.821 -0.880
H 4.314 -1.028 0.000`,
    acetylChloride: `7\nacetylChloride\nC -0.6591 -0.0348 -0.1459\nC 0.7933 0.2119 0.1605\nO 1.2681 1.3439 0.1671\nCl 1.6527 -1.2626 0.4860\nH -1.1575 0.9188 -0.3434\nH -0.7518 -0.6661 -1.0336\nH -1.1458 -0.5111 0.7093`,
  acetonitrile: `6\nacetonitrile\nC -0.4862 0.0076 -0.0088\nC 0.9753 -0.0152 0.0177\nN 2.1352 -0.0334 0.0388\nH -0.8935 0.0038 1.0065\nH -0.8517 0.9041 -0.5183\nH -0.8791 -0.8669 -0.5359`,
  lactonitrile: `10\nlactonitrile\nC -0.8258 -0.8337 -0.2050\nC 0.0644 0.2820 0.3195\nO -0.3602 1.5083 -0.2876\nC 1.4856 0.0038 0.0359\nN 2.6116 -0.1919 -0.1693\nH -1.8781 -0.6170 0.0088\nH -0.7391 -0.9293 -1.2938\nH -0.5690 -1.7982 0.2453\nH -0.0835 0.3855 1.3998\nH 0.2942 2.1906 -0.0536`,
  aldol: `14\naldol\nC -0.5593 -1.2686 0.4937\nC -0.6466 0.2450 0.3482\nO -1.4124 0.5715 -0.8092\nC 0.7135 0.9253 0.2550\nC 1.5000 0.4264 -0.9266\nO 2.6198 -0.0674 -0.8240\nH -0.1424 -1.7353 -0.4051\nH 0.0515 -1.5506 1.3565\nH -1.5604 -1.6941 0.6246\nH -1.1781 0.6561 1.2143\nH -2.2959 0.1758 -0.6986\nH 0.5901 2.0054 0.1184\nH 1.2950 0.7554 1.1672\nH 1.0253 0.5551 -1.9146`,
  acetone: `10\nacetone\nC -1.2660 0.2415 0.0924\nC 0.0685 0.1553 -0.5976\nO 0.2041 0.4627 -1.7809\nC 1.2289 -0.3255 0.2310\nH -2.0222 0.6012 -0.6109\nH -1.2009 0.9408 0.9296\nH -1.5583 -0.7490 0.4496\nH 1.0264 -1.3364 0.5933\nH 2.1358 -0.3438 -0.3798\nH 1.3838 0.3533 1.0732`,
  acetophenone: `17\nacetophenone\nC 2.6577 0.4300 -0.4027\nC 1.6892 -0.6212 0.0731\nO 2.0834 -1.7255 0.4430\nC 0.2296 -0.3048 0.0910\nC -0.6617 -1.2911 0.5358\nC -2.0346 -1.0399 0.5698\nC -2.5260 0.1978 0.1597\nC -1.6467 1.1846 -0.2842\nC -0.2713 0.9369 -0.3197\nH 3.6755 0.0309 -0.3496\nH 2.4514 0.6922 -1.4436\nH 2.6064 1.3119 0.2409\nH -0.2894 -2.2619 0.8587\nH -2.7182 -1.8110 0.9164\nH -3.5953 0.3932 0.1862\nH -2.0337 2.1496 -0.6036\nH 0.3838 1.7283 -0.6711`,
  benzoicAcid: `15\nbenzoicAcid\nO 2.8034 0.7764 -0.7244\nC 2.0942 -0.0321 -0.1543\nO 2.6204 -1.0978 0.4755\nC 0.6151 0.0198 -0.0638\nC -0.0506 1.0859 -0.6821\nC -1.4427 1.1732 -0.6213\nC -2.1733 0.1974 0.0563\nC -1.5157 -0.8665 0.6740\nC -0.1232 -0.9576 0.6155\nH 3.5850 -0.9993 0.3328\nH 0.5130 1.8509 -1.2127\nH -1.9562 2.0020 -1.1024\nH -3.2576 0.2662 0.1032\nH -2.0874 -1.6261 1.2018\nH 0.3755 -1.7924 1.1016`,
  isopropanol: `12\nisopropanol\nC 1.3205 -0.0306 -0.4345\nC 0.0143 -0.3805 0.2601\nO -0.5960 -1.4529 -0.4507\nC -0.9365 0.8064 0.2945\nH 1.8402 0.7827 0.0810\nH 1.1456 0.2671 -1.4743\nH 1.9819 -0.9033 -0.4652\nH 0.2222 -0.7241 1.2791\nH -1.4222 -1.6777 0.0103\nH -0.4961 1.6535 0.8289\nH -1.8738 0.5317 0.7902\nH -1.2001 1.1277 -0.7192`,
  nitroanisole: `18
4-Nitroanisole
C 1.189 -0.000 0.000
C 0.490 1.209 0.000
C -0.887 1.209 0.000
C -1.576 0.000 0.000
C -0.887 -1.209 0.000
C 0.490 -1.209 0.000
O 2.553 0.000 0.000
C 3.250 -1.209 0.000
N -3.000 0.000 0.000
O -3.500 1.050 0.000
O -3.500 -1.050 0.000
H 0.999 2.148 0.000
H -1.436 2.148 0.000
H -1.436 -2.148 0.000
H 0.999 -2.148 0.000
H 2.924 -1.821 0.880
H 2.924 -1.821 -0.880
H 4.314 -1.028 0.000`,
  propyne: `7\npropyne\nC -0.9036 -0.2893 0.1151\nC 0.4799 0.1537 -0.0611\nC 1.6151 0.5172 -0.2057\nH -1.6024 0.4426 -0.3010\nH -1.0731 -1.2455 -0.3891\nH -1.1386 -0.4184 1.1759\nH 2.6226 0.8398 -0.3341`,
  acetoneCyanohydrin: `13\nacetoneCyanohydrin\nC 0.9810 0.4997 0.7657\nC -0.0086 -0.2671 -0.1114\nC -0.9563 0.6985 -0.8202\nO 0.7426 -0.9493 -1.1276\nC -0.7796 -1.2298 0.7086\nN -1.3593 -1.9949 1.3622\nH 1.6898 -0.1844 1.2478\nH 1.5796 1.1941 0.1650\nH 0.4725 1.0688 1.5518\nH -1.5587 1.2744 -0.1090\nH -0.4001 1.4000 -1.4526\nH -1.6413 0.1578 -1.4846\nH 1.2384 -1.6679 -0.6957`,
  acetoxime: `12\nacetoxime\nC 1.5318 0.4888 0.1163\nC 0.0541 0.2043 0.0527\nC -0.3718 -1.1973 -0.3083\nN -0.7737 1.1726 0.3098\nO -2.1021 0.7456 0.2080\nH 1.9926 -0.1605 0.8656\nH 1.9807 0.2875 -0.8601\nH 1.7147 1.5325 0.3860\nH -0.9598 -1.6252 0.5082\nH 0.5037 -1.8296 -0.4785\nH -0.9717 -1.1760 -1.2221\nH -2.5986 1.5574 0.4222`,
  diacetoneAlcohol: `20\ndiacetoneAlcohol\nC -2.1558 -0.5682 0.6840\nC -0.9174 -0.4091 -0.2047\nC -1.1911 0.6599 -1.2667\nO -0.7176 -1.6673 -0.8514\nC 0.2981 -0.0715 0.6747\nC 1.6096 -0.0016 -0.0876\nO 1.7515 -0.5086 -1.2012\nC 2.7587 0.6728 0.6142\nH -2.3916 0.3578 1.2187\nH -3.0298 -0.8576 0.0890\nH -2.0079 -1.3664 1.4206\nH -1.3550 1.6430 -0.8135\nH -0.3681 0.7424 -1.9835\nH -2.0776 0.3997 -1.8569\nH 0.0953 -1.5827 -1.3947\nH 0.1391 0.8905 1.1756\nH 0.4343 -0.8438 1.4417\nH 3.6395 0.6700 -0.0338\nH 2.9927 0.1326 1.5347\nH 2.4931 1.7083 0.8408`,
  iodoform: `5\niodoform\nI 1.9652 -0.2298 -0.4784\nC -0.0057 0.0026 0.2434\nI -0.7694 1.7980 -0.5644\nI -1.1585 -1.5851 -0.5376\nH -0.0315 0.0142 1.3369`,
  propane: `11\npropane\nC 1.2108 -0.1749 -0.3716\nC 0.0339 -0.1891 0.5890\nC -1.2364 0.3176 -0.0729\nH 1.4119 0.8395 -0.7307\nH 2.1124 -0.5435 0.1276\nH 1.0171 -0.8142 -1.2389\nH -0.1270 -1.2097 0.9537\nH 0.2657 0.4350 1.4592\nH -2.0684 0.2978 0.6380\nH -1.5074 -0.3062 -0.9307\nH -1.1126 1.3475 -0.4225`,
  sodiumAcetate: `8\nsodiumAcetate\nC -0.6285 -0.0326 -0.1204\nC 0.8615 0.0504 0.1619\nO 1.3322 -0.9240 0.8133\nO 1.4391 1.0785 -0.2882\nNa 2.8000 0.0000 0.3000\nH -0.8457 -0.9330 -0.7027\nH -0.9763 0.8373 -0.6859\nH -1.1824 -0.0765 0.8221`,
  acetate: `7\nacetate\nC -0.6285 -0.0326 -0.1204\nC 0.8615 0.0504 0.1619\nO 1.3322 -0.9240 0.8133\nO 1.4391 1.0785 -0.2882\nH -0.8457 -0.9330 -0.7027\nH -0.9763 0.8373 -0.6859\nH -1.1824 -0.0765 0.8221`,
  methylmagnesiumBromide: `6\nmethylmagnesiumBromide\nC -0.9543 0.0082 -0.0137\nMg 1.2115 -0.0709 0.1034\nBr 3.7432 0.0259 -0.0328\nH -1.3941 -0.0126 0.9955\nH -1.2795 0.9482 -0.5129\nH -1.3268 -0.8988 -0.5396`,
  carbonDioxide: `3\ncarbonDioxide\nO -1.2956 0.1644 0.0000\nC -0.0000 -0.3792 0.0000\nO 1.2956 -0.9227 0.0000`,
  bromoaceticAcid: `8\nbromoaceticAcid\nO 1.4569 -0.6559 0.1564\nC 0.5009 0.3004 0.1114\nO 0.8113 1.4655 0.2876\nC -0.8515 -0.2939 -0.1656\nBr -2.1985 1.1032 -0.2235\nH 2.2804 -0.1545 0.3403\nH -0.8608 -0.7852 -1.1405\nH -1.1387 -0.9796 0.6339`,
  ethane: `8\nethane\nC -0.7558 0.0071 -0.0165\nC 0.7558 -0.0071 0.0165\nH -1.1634 -0.1004 0.9931\nH -1.1223 0.9481 -0.4375\nH -1.1346 -0.8156 -0.6303\nH 1.1346 0.8156 0.6303\nH 1.1634 0.1004 -0.9931\nH 1.1223 -0.9481 0.4375`,
  methylamine: `7
methylamine
C -0.5744 0.0038 0.0158
N 0.8405 0.1651 0.2994
H -1.0522 -0.5870 0.8022
H -0.7194 -0.5042 -0.9419
H -1.0647 0.9803 -0.0273
H 1.2908 -0.7491 0.3069
H 1.2794 0.6911 -0.4552`,
  dimethylamine: `10
dimethylamine
C 1.1924 0.1824 0.0405
N -0.0686 0.2399 -0.6864
C -1.1898 -0.0689 0.1906
H 1.3745 -0.8164 0.4506
H 2.0161 0.4227 -0.6389
H 1.2135 0.9136 0.8551
H -0.0458 -0.4336 -1.4516
H -2.1233 -0.0139 -0.3780
H -1.1080 -1.0783 0.6070
H -1.2611 0.6526 1.0111`,
  trimethylamine: `13
trimethylamine
C -1.2770 -0.5414 0.0417
N -0.0105 -0.0522 -0.5016
C 1.1073 -0.8362 0.0226
C 0.1672 1.3649 -0.1868
H -2.1188 0.0179 -0.3818
H -1.3208 -0.4562 1.1337
H -1.4312 -1.5921 -0.2285
H 0.9967 -1.8922 -0.2480
H 2.0531 -0.4978 -0.4152
H 1.1877 -0.7663 1.1136
H 0.1987 1.5494 0.8932
H 1.0958 1.7434 -0.6285
H -0.6482 1.9590 -0.6145`,
  aniline: `14
aniline
N 2.3127 0.1473 -0.1412
C 0.9157 0.0545 -0.1151
C 0.2955 -1.1812 0.0868
C -1.0917 -1.2688 0.2311
C -1.8679 -0.1124 0.2169
C -1.2539 1.1300 0.0773
C 0.1337 1.2115 -0.0666
H 2.6563 0.9883 -0.5937
H 2.7698 -0.6907 -0.4861
H 0.8892 -2.0900 0.1330
H -1.5620 -2.2385 0.3690
H -2.9461 -0.1777 0.3351
H -1.8510 2.0376 0.0949
H 0.5998 2.1901 -0.1413`,
  phthalimide: `16
phthalimide
O -2.2314 2.0963 0.1890
C -1.7581 0.9808 0.1143
N -2.4164 -0.2101 0.0768
C -1.5663 -1.2698 -0.0087
O -1.8441 -2.4506 -0.0595
C -0.2142 -0.7129 -0.0290
C -0.3317 0.6654 0.0463
C 0.7720 1.4947 0.0491
C 2.0279 0.8836 -0.0280
C 2.1476 -0.5206 -0.1047
C 1.0135 -1.3395 -0.1058
H -3.4192 -0.2972 0.1087
H 0.6654 2.5729 0.1085
H 2.9269 1.4979 -0.0289
H 3.1373 -0.9708 -0.1638
H 1.0908 -2.4203 -0.1643`,
  nPropylphthalimide: `25
nPropylphthalimide
C 3.1477 -0.1465 -0.8822
C 2.9529 -0.3943 0.6064
C 1.9216 0.5410 1.2414
N 0.5759 0.3093 0.7542
C -0.2249 -0.7155 1.1813
O 0.0030 -1.5783 2.0074
C -1.4768 -0.6022 0.4354
C -2.6194 -1.3767 0.4806
C -3.6698 -1.0149 -0.3691
C -3.5537 0.0959 -1.2311
C -2.3852 0.8641 -1.2582
C -1.3630 0.4869 -0.4095
C -0.0384 1.0697 -0.2038
O 0.3801 2.0413 -0.8035
H 3.9492 -0.7847 -1.2677
H 2.2393 -0.3758 -1.4474
H 3.4221 0.8955 -1.0747
H 3.9143 -0.2486 1.1127
H 2.6639 -1.4402 0.7616
H 1.9164 0.3748 2.3249
H 2.1963 1.5860 1.0598
H -2.6943 -2.2289 1.1482
H -4.5898 -1.5972 -0.3670
H -4.3856 0.3569 -1.8832
H -2.2816 1.7206 -1.9164`,
  placeholderAmine: `3
placeholder
C 0.0 0.0 0.0
N 0.0 0.0 1.4
H 0.0 1.0 1.9`,
  methylIsocyanide: `6
methylIsocyanide
C -0.4848 0.0052 -0.0118
N 0.9405 -0.0101 0.0229
C 2.1112 -0.0226 0.0515
H -0.8808 -0.0011 1.0073
H -0.8337 0.9050 -0.5258
H -0.8524 -0.8763 -0.5441`,
  acetamide: `9
acetamide
C -1.0157 -0.4347 -0.0749
C 0.2179 0.1539 0.5480
O 0.3648 0.2792 1.7577
N 1.1837 0.5513 -0.3257
H -1.8895 0.1317 0.2584
H -1.1100 -1.4786 0.2355
H -0.9727 -0.3953 -1.1669
H 1.1713 0.3019 -1.3043
H 2.0502 0.8906 0.0721`,
  methylammonium: `8
methylammonium
C -0.7531 0.0054 -0.0087
N 0.7225 -0.0052 0.0083
H -1.0998 -0.1142 1.0195
H -1.0754 0.9626 -0.4228
H -1.0857 -0.8250 -0.6343
H 1.0960 0.7597 0.5857
H 1.1090 0.1046 -0.9384
H 1.0865 -0.8878 0.3908`,
  nMethylacetamide: `12
nMethylacetamide
C -1.8897 -0.0552 0.0044
N -0.4988 -0.4202 0.0992
C 0.4902 0.4734 -0.2444
O 0.2727 1.5885 -0.7065
C 1.8865 -0.0269 0.0115
H -2.1470 0.5681 0.8648
H -2.0752 0.5022 -0.9177
H -2.4901 -0.9677 0.0158
H -0.2535 -1.2249 0.6605
H 2.2881 0.4705 0.8982
H 2.5127 0.2011 -0.8556
H 1.9042 -1.1088 0.1698`,
  azobenzene: `24
azobenzene
C -4.4831 -0.1070 -0.1253
C -3.8848 0.9857 0.5005
C -2.5002 1.0125 0.6835
C -1.7007 -0.0447 0.2362
C -2.3156 -1.1434 -0.3798
C -3.6998 -1.1733 -0.5645
N -0.3129 -0.0005 0.4640
N 0.3140 -0.0409 -0.6180
C 1.7015 0.0159 -0.3908
C 2.3743 -0.9754 0.3366
C 3.7575 -0.9090 0.5194
C 4.4820 0.1461 -0.0330
C 3.8262 1.1314 -0.7696
C 2.4428 1.0621 -0.9504
H -5.5606 -0.1289 -0.2682
H -4.4942 1.8160 0.8476
H -2.0362 1.8634 1.1753
H -1.7082 -1.9790 -0.7176
H -4.1643 -2.0283 -1.0486
H 1.8129 -1.8025 0.7632
H 4.2670 -1.6808 1.0904
H 5.5587 0.1989 0.1083
H 4.3899 1.9524 -1.2049
H 1.9339 1.8290 -1.5285`,
  hydrazobenzene: `26
hydrazobenzene
C 4.6379 0.2808 0.3441
C 3.9716 0.4549 1.5537
C 2.5756 0.4040 1.5950
C 1.8253 0.1596 0.4346
C 2.5105 0.0163 -0.7779
C 3.9078 0.0651 -0.8220
N 0.4088 0.1842 0.5253
N -0.4088 -0.1529 -0.5253
C -1.8253 -0.1284 -0.4346
C -2.5105 0.0150 0.7779
C -3.9078 -0.0338 0.8220
C -4.6379 -0.2496 -0.3441
C -3.9716 -0.4236 -1.5537
C -2.5756 -0.3727 -1.5950
H 5.7232 0.3212 0.3082
H 4.5352 0.6383 2.4645
H 2.0731 0.5649 2.5454
H 1.9726 -0.1541 -1.7043
H 4.4235 -0.0631 -1.7700
H 0.1306 -0.2360 1.4137
H -0.1306 0.2673 -1.4137
H -1.9726 0.1853 1.7043
H -4.4235 0.0944 1.7700
H -5.7232 -0.2899 -0.3082
H -4.5352 -0.6070 -2.4645
H -2.0731 -0.5336 -2.5454`,
  pHydroxyazobenzene: `25
pHydroxyazobenzene
O 5.5199 0.7340 -0.1184
C 4.1943 0.4170 -0.1299
C 3.6641 -0.5146 0.7569
C 2.2981 -0.8071 0.7062
C 1.4622 -0.1675 -0.2174
C 2.0210 0.7585 -1.1092
C 3.3849 1.0543 -1.0629
N 0.0984 -0.5092 -0.2607
N -0.6132 0.4874 -0.0044
C -1.9779 0.1461 -0.0376
C -2.5952 -0.3284 -1.2031
C -3.9590 -0.6297 -1.2143
C -4.7205 -0.4495 -0.0606
C -4.1210 0.0344 1.1013
C -2.7567 0.3346 1.1092
H 5.9568 0.2215 0.5814
H 4.2888 -1.0206 1.4857
H 1.8752 -1.5369 1.3920
H 1.3873 1.2512 -1.8417
H 3.8120 1.7767 -1.7525
H -2.0057 -0.4636 -2.1062
H -4.4250 -1.0021 -2.1228
H -5.7822 -0.6830 -0.0681
H -4.7140 0.1804 2.0004
H -2.2925 0.7162 2.0148`,
  pAminoazobenzene: `26
pAminoazobenzene
N 5.3035 0.4282 0.8171
C 3.9798 0.2204 0.4160
C 3.1890 -0.7313 1.0634
C 1.8319 -0.8636 0.7498
C 1.2288 -0.0096 -0.1806
C 2.0111 0.9726 -0.7925
C 3.3681 1.1027 -0.4773
N -0.1254 -0.1344 -0.5407
N -0.8653 0.0320 0.4543
C -2.2200 -0.0782 0.0905
C -3.0753 1.0077 0.3061
C -4.4319 0.9210 -0.0157
C -4.9467 -0.2599 -0.5487
C -4.1083 -1.3541 -0.7567
C -2.7523 -1.2642 -0.4337
H 5.8782 0.8898 0.1193
H 5.7520 -0.3972 1.2020
H 3.6214 -1.3827 1.8179
H 1.2373 -1.6269 1.2445
H 1.5558 1.6525 -1.5076
H 3.9425 1.9005 -0.9401
H -2.6767 1.9277 0.7256
H -5.0847 1.7737 0.1516
H -6.0024 -0.3285 -0.7992
H -4.5081 -2.2772 -1.1678
H -2.1024 -2.1209 -0.5909`,
  pBromoazobenzene: `24
p-Bromoazobenzene
C -4.4831 -0.1070 -0.1253
C -3.8848 0.9857 0.5005
C -2.5002 1.0125 0.6835
C -1.7007 -0.0447 0.2362
C -2.3156 -1.1434 -0.3798
C -3.6998 -1.1733 -0.5645
N -0.3129 -0.0005 0.4640
N 0.3140 -0.0409 -0.6180
C 1.7015 0.0159 -0.3908
C 2.3743 -0.9754 0.3366
C 3.7575 -0.9090 0.5194
C 4.4820 0.1461 -0.0330
C 3.8262 1.1314 -0.7696
C 2.4428 1.0621 -0.9504
H -5.5606 -0.1289 -0.2682
H -4.4942 1.8160 0.8476
H -2.0362 1.8634 1.1753
H -1.7082 -1.9790 -0.7176
H -4.1643 -2.0283 -1.0486
H 1.8129 -1.8025 0.7632
H 4.2670 -1.6808 1.0904
Br 6.38 0.23 0.12
H 4.3899 1.9524 -1.2049
H 1.9339 1.8290 -1.5285`,
  nitrobenzene: `14
nitrobenzene
O 2.9440 -1.0207 -0.1869
N 2.3423 0.0594 -0.0992
O 2.8938 1.1688 -0.0604
C 0.8761 0.0222 -0.0371
C 0.1548 1.2198 0.0625
C -1.2393 1.1781 0.1212
C -1.9053 -0.0483 0.0807
C -1.1838 -1.2395 -0.0185
C 0.2105 -1.2105 -0.0779
H 0.6588 2.1835 0.0951
H -1.8082 2.1021 0.1985
H -2.9920 -0.0759 0.1267
H -1.7097 -2.1913 -0.0495
H 0.7580 -2.1475 -0.1551`,
};

const sharedPhysical = [
  ["State", "Lower members are gases or volatile liquids; higher members become liquids or solids."],
  ["Odor", "Often characteristic and useful for quick laboratory recognition."],
  ["Solubility", "Depends on polarity and hydrogen bonding; organic chain length reduces water solubility."],
  ["Boiling point", "Increases with molecular mass and intermolecular attractions."],
  ["Polarity", "Functional groups create polar bonds and influence reactions."],
  ["Hydrogen bonding", "Strong in alcohols, phenols, acids, and amines; weak or absent in many halogen compounds."],
  ["Density", "Usually rises with heavier atoms and compact packing."],
];

const productNames = {
  chloroethane: "Chloroethane",
  bromoethane: "Bromoethane",
  ethanol: "Ethanol",
  diethylEther: "Diethyl ether",
  methoxyethane: "Methoxyethane (Methyl ethyl ether)",
  acetaldehyde: "Acetaldehyde",
  acetone: "Acetone (Propanone)",
  aceticAcid: "Acetic acid (Ethanoic acid)",
  ethylAcetate: "Ethyl acetate",
  acetylChloride: "Acetyl chloride",
  acetamide: "Acetamide",
  methylamine: "Methylamine (1° Amine)",
  dimethylamine: "Dimethylamine (2° Amine)",
  trimethylamine: "Trimethylamine (3° Amine)",
  nMethylacetamide: "N-Methylacetamide",
  elem: "Element",
  methylIsocyanide: "Methyl isocyanide",
  diazonium: "Benzenediazonium chloride salt",
  chlorobenzene: "Chlorobenzene",
  bromobenzene: "Bromobenzene",
  iodobenzene: "Iodobenzene",
  fluorobenzene: "Fluorobenzene",
  phenol: "Phenol",
  sodiumPhenoxide: "Sodium phenoxide",
  salicylicAcid: "Salicylic acid (2-Hydroxybenzoic acid)",
  salicylaldehyde: "Salicylaldehyde (2-Hydroxybenzaldehyde)",
  picricAcid: "Picric acid (2,4,6-trinitrophenol)",
  tribromophenol: "2,4,6-Tribromophenol",
  dichlorobenzene: "1,4-Dichlorobenzene (p-dichlorobenzene)",
  toluene: "Toluene (Methylbenzene)",
  biphenyl: "Biphenyl",
  chlorobenzenesulphonicAcid: "Chlorobenzenesulphonic acid (4-chlorobenzenesulfonic acid)",
  nitrobenzene: "Nitrobenzene",
  aniline: "Aniline (Phenylamine)",
  azobenzene: "Azobenzene",
  pHydroxyazobenzene: "p-Hydroxyazobenzene (Orange azo dye)",
  methylmagnesiumBromide: "Methylmagnesium bromide (Grignard)",
  formaldehyde: "Formaldehyde (Methanal)",
  methanol: "Methanol",
  isopropanol: "Isopropanol (2-Propanol)",
  methane: "Methane",
  bromoaceticAcid: "Bromoacetic acid",
  hydrazobenzene: "Hydrazobenzene",
  acetoxime: "Acetoxime",
  aldol: "3-Hydroxybutanal (Aldol)",
  iodoform: "Iodoform (Triiodomethane)",
  sodiumAcetate: "Sodium acetate",
  phthalimide: "Phthalimide",
  methylammonium: "Methylammonium chloride",
  bromoanisole: "4-Bromoanisole",
  nitroanisole: "4-Nitroanisole",
  acetophenone: "Acetophenone",
  iodomethane: "Iodomethane (Alkyl iodide)",
  pBromoazobenzene: "p-Bromoazobenzene",
  benzene: "Benzene",
  ethene: "Ethene",
  chloromethane: "Chloromethane",
  anisole: "Anisole (Methoxybenzene)",
  sodiumEthoxide: "Sodium ethoxide",
  ethylamine: "Ethylamine",
  nitrochlorobenzene: "Nitrochlorobenzene",
  acetonitrile: "Acetonitrile",
  benzaldehyde: "Benzaldehyde"
};

const minorProductNames = {
  dichlorobenzene: "1,2-Dichlorobenzene (o-dichlorobenzene)",
  bromoanisole: "2-Bromoanisole (o-bromoanisole)",
  nitroanisole: "2-Nitroanisole (o-nitroanisole)",
  salicylicAcid: "4-Hydroxybenzoic acid",
  salicylaldehyde: "4-Hydroxybenzaldehyde",
  picricAcid: "2-Nitrophenol / 4-Nitrophenol",
  chlorobenzenesulphonicAcid: "2-Chlorobenzenesulfonic acid",
  toluene: "Biphenyl / Ethane",
  dimethylamine: "Methylamine / Trimethylamine",
  chloroethane: "Ethanol",
  diethylEther: "Ethene",
  ethylAcetate: "Acetic acid / Ethanol",
  ethylammonium: "Ammonia",
  aldol: "Crotonaldehyde"
};

const formatMoleculeName = (modelKey) => {
  if (!modelKey) return "Organic substrate";
  if (productNames[modelKey]) return productNames[modelKey];
  return modelKey
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const makeReaction = (title, type, reactantModel, productModel, overrides = {}) => {
  const defaultMajor = productNames[productModel] || "Expected organic product";
  const defaultMinor = minorProductNames[productModel] || "None / Trace byproducts";
  return {
    title,
    type,
    equation: overrides.equation || "Reactant + reagent -> product",
    reactants: overrides.reactants || formatMoleculeName(reactantModel),
    reagent: overrides.reagent || "Heat",
    catalyst: overrides.catalyst || "As required",
    conditions: overrides.conditions || "Controlled laboratory conditions",
    temperature: overrides.temperature || "Room temperature to warm heating",
    majorProduct: overrides.majorProduct || defaultMajor,
    minorProduct: overrides.minorProduct || defaultMinor,
    sideProducts: overrides.sideProducts || "Inorganic salt or water",
    observations: overrides.observations || ["Reaction progresses under controlled conditions", "Product formation is observed"],
    colorChanges: overrides.colorChanges || [{ label: "Indicator", from: "Initial", to: "Final" }],
    mechanism: overrides.mechanism || ["Activation of substrate", "Reagent attacks reactive center", "Intermediate rearranges or stabilizes", "Final product forms"],
    reactantModel,
    productModel,
    majorProductModel: overrides.majorProductModel || productModel,
    minorProductModel: overrides.minorProductModel || null,
    sideProductModel: overrides.sideProductModel || null,
  };
};

const haloalkaneData = {
  preparation: [
    makeReaction("From Alcohols Using HX", "Substitution", "ethanol", "chloromethane", {
      equation: "ROH + HX -> RX + H2O",
      reactants: "Alcohol",
      reagent: "HCl, HBr, or HI",
      catalyst: "ZnCl2 for HCl",
      conditions: "Warm acidic medium",
      temperature: "Warm heating",
      majorProduct: "Haloalkane",
      minorProduct: "Ether sometimes",
      sideProducts: "Water",
      observations: ["Pungent acidic smell", "No major color change"],
      colorChanges: [{ label: "Medium", from: "Clear", to: "Clear" }],
      mechanism: ["Alcohol oxygen is protonated", "Water leaves as a better leaving group", "Halide attacks the carbocation or carbon center", "Haloalkane forms"],
    }),
    makeReaction("Thionyl Chloride Method", "Chlorination", "ethanol", "chloromethane", {
      equation: "ROH + SOCl2 -> RCl + SO2 + HCl",
      reagent: "SOCl2",
      catalyst: "Pyridine",
      conditions: "Dry conditions",
      temperature: "Room temperature",
      majorProduct: "Alkyl chloride",
      minorProduct: "Nil",
      sideProducts: "SO2 and HCl",
      observations: ["White fumes evolve", "Gaseous side products escape"],
      colorChanges: [{ label: "Reaction flask", from: "Clear", to: "Fuming" }],
      mechanism: ["Alcohol attacks sulfur of SOCl2", "Chlorosulfite intermediate forms", "Chloride attacks carbon", "SO2 and HCl leave"],
    }),
    makeReaction("Free Radical Halogenation", "Radical Substitution", "methane", "chloromethane", {
      equation: "CH4 + Cl2 -> CH3Cl + HCl",
      reactants: "Alkane and chlorine",
      reagent: "Cl2 or Br2",
      catalyst: "UV light",
      conditions: "Sunlight or heat",
      temperature: "High temperature or UV",
      majorProduct: "Haloalkane",
      minorProduct: "Polyhalogenated products",
      sideProducts: "HCl",
      observations: ["Greenish chlorine color disappears", "HCl fumes may form"],
      colorChanges: [{ label: "Chlorine", from: "Greenish yellow", to: "Colorless" }],
      mechanism: ["Initiation splits Cl2 into radicals", "Radical abstracts hydrogen", "Alkyl radical reacts with chlorine", "Radicals terminate by combination"],
    }),
  ],
  chemical: [
    makeReaction("SN2 Mechanism", "Nucleophilic Substitution", "chloromethane", "methanol", {
      equation: "CH3Cl + KOH(aq) -> CH3OH + KCl",
      reagent: "Aqueous KOH",
      conditions: "Heat",
      temperature: "Warm",
      majorProduct: "Methanol",
      sideProducts: "KCl",
      observations: ["Methanol formation", "KCl salt remains in solution"],
      colorChanges: [{ label: "Mixture", from: "Clear", to: "Clear" }],
      mechanism: ["Nucleophile approaches from the back", "Transition state forms with both partial bonds", "Leaving group departs and Walden inversion occurs", "Product forms"],
    }),
    makeReaction("SN1 Mechanism", "Nucleophilic Substitution", "chloromethane", "methanol", { // Using chloromethane as a placeholder base, conceptually it would be a tertiary halide
      equation: "R3C-X + H2O -> R3C-OH + HX",
      reagent: "Water (weak nucleophile)",
      conditions: "Polar protic solvent",
      temperature: "Room temperature",
      majorProduct: "Tertiary Alcohol",
      sideProducts: "HX",
      observations: ["Alcohol formation"],
      colorChanges: [{ label: "Mixture", from: "Clear", to: "Clear" }],
      mechanism: ["Leaving group detaches", "Planar carbocation forms", "Nucleophile attacks from either face", "Product forms with racemization"],
    }),
    makeReaction("Dehydrohalogenation", "Elimination", "chloroethane", "ethene", {
      equation: "C2H5Br + KOH(alc) -> C2H4 + KBr + H2O",
      reagent: "Alcoholic KOH",
      conditions: "Heat",
      temperature: "High",
      majorProduct: "Alkene",
      minorProduct: "Substitution product",
      sideProducts: "KBr and water",
      observations: ["Alkene gas evolves", "Base removes beta hydrogen"],
      colorChanges: [{ label: "Bromine water test", from: "Orange", to: "Colorless" }],
      mechanism: ["Base removes beta hydrogen", "Double bond begins forming", "Halide leaves", "Alkene product forms"],      
      majorProductModel: "ethene",
      minorProductModel: "ethanol",
    }),
    makeReaction("Nucleophilic Substitution", "General", "chloromethane", "ethanol", {
      equation: "RX + Nu- -> R-Nu + X-",
      reagent: "Nucleophile",
      conditions: "Solvent dependent",
      temperature: "Varies",
      majorProduct: "Substituted product",
      sideProducts: "Halide salt",
      observations: ["Substitution occurs"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Nucleophile approaches electrophilic carbon", "C-X bond weakens", "C-Nu bond forms", "Halide leaves"],
      mechanismId: "nucleophilic_substitution",
    }),
  ],
  named: [
    { name: "Finkelstein Reaction", summary: "Halogen exchange using NaI in acetone.", resultCards: [["Reactant", "Chloromethane"], ["Reagent", "NaI in acetone"], ["Product", "Iodomethane (Alkyl iodide)"]], reactantModel: "chloromethane", productModel: "iodomethane", majorProductModel: "iodomethane" },
    { name: "Wurtz Reaction", summary: "Coupling of haloalkanes using sodium metal in dry ether.", resultCards: [["Reactant", "Chloromethane"], ["Reagent", "Sodium / Dry ether"], ["Product", "Ethane (Coupled alkane)"]], reactantModel: "chloromethane", productModel: "ethane", majorProductModel: "ethane" },
  ],
  tests: [
    { name: "Silver Nitrate Test", reagent: "Alcoholic AgNO3", observation: "Precipitate forms", colorChange: "White -> pale yellow -> yellow", interpretation: "Chloride, bromide, and iodide form differently colored silver halides." },
    { name: "Beilstein Test", reagent: "Copper wire flame", observation: "Green flame", colorChange: "Blue flame -> green flame", interpretation: "Indicates presence of halogen." },
  ],
  importantOrders: [
    { title: "Reactivity in SN1", sequence: "3^∘ > 2^∘ > 1^∘" },
    { title: "Reactivity in SN2", sequence: "1^∘ > 2^∘ > 3^∘" },
    { title: "Leaving Group Ability", sequence: "I^- > Br^- > Cl^- > F^-" },
  ],
  conversions: [
    ["Haloalkane", "aq. KOH", "Alcohol"],
    ["Haloalkane", "alc. KOH", "Alkene"],
    ["Haloalkane", "KCN", "Nitrile"],
    ["Haloalkane", "NH3", "Amine"],
    ["Haloalkane", "NaOR", "Ether"],
  ],
};

const haloareneData = {
  preparation: [
    makeReaction("Direct Halogenation of Benzene", "Electrophilic Aromatic Substitution", "benzene", "chlorobenzene", {
      equation: "C6H6 + Cl2 -> C6H5Cl + HCl",
      reactants: "Benzene + Halogen",
      reagent: "Cl2 / Br2",
      catalyst: "FeCl3 / AlCl3",
      conditions: "Anhydrous",
      temperature: "Room temperature",
      majorProduct: "Haloarene",
      minorProduct: "Polyhalogenated product",
      sideProducts: "HCl",
      observations: ["Greenish-yellow chlorine color fades"],
      colorChanges: [{ label: "Chlorine", from: "Greenish-yellow", to: "Colorless" }],
      mechanism: ["Formation of electrophile (Cl+)", "Electrophilic attack forms sigma complex", "Resonance stabilization", "Deprotonation to restore aromaticity"],
    }),
    makeReaction("From Diazonium Salt (Sandmeyer Reaction)", "Radical Substitution", "diazonium", "chlorobenzene", {
      equation: "C6H5N2+Cl- + CuCl -> C6H5Cl + N2",
      reactants: "Benzene diazonium chloride",
      reagent: "CuCl / CuBr",
      catalyst: "Copper(I) salt",
      conditions: "Cold diazotization first",
      temperature: "0–5°C during diazotization",
      majorProduct: "Haloarene",
      minorProduct: "Nil",
      sideProducts: "N2 gas",
      observations: ["Nitrogen gas evolves"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Formation of diazonium salt", "CuCl donates electron", "Nitrogen gas leaves", "Aryl radical combines with Cl"],
    }),
    makeReaction("Gattermann Reaction", "Radical Substitution", "diazonium", "chlorobenzene", {
      equation: "C6H5N2+Cl- + HCl + Cu -> C6H5Cl + N2",
      reactants: "Diazonium salt",
      reagent: "HCl/HBr",
      catalyst: "Copper powder",
      conditions: "Cold conditions",
      temperature: "Low temperature",
      majorProduct: "Haloarene",
      sideProducts: "N2",
      observations: ["Nitrogen evolution"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Copper reduces diazonium ion", "Nitrogen leaves", "Aryl radical forms", "Halogen substitution occurs"],
    }),
  ],
  chemical: [
    makeReaction("Nitration", "Electrophilic Substitution", "chlorobenzene", "nitrochlorobenzene", {
      equation: "C6H5Cl + HNO3 -> o/p-Nitrochlorobenzene + H2O",
      reagent: "Conc. HNO3",
      catalyst: "Conc. H2SO4",
      conditions: "Warm",
      temperature: "50–60°C",
      majorProduct: "Para product",
      minorProduct: "Ortho product",
      sideProducts: "Water",
      observations: ["Yellow oily liquid forms"],
      colorChanges: [{ label: "Mixture", from: "Clear", to: "Pale yellow" }],
      mechanism: ["Formation of nitronium ion (NO2+)", "Electrophilic attack on ring", "Sigma complex forms", "Deprotonation restores aromaticity"],
    }),
    makeReaction("Sulphonation", "Electrophilic Substitution", "chlorobenzene", "chlorobenzenesulphonicAcid", {
      equation: "C6H5Cl + H2SO4 -> 4-Chlorobenzenesulphonic acid + H2O",
      reactants: "Chlorobenzene",
      reagent: "Conc. H2SO4",
      conditions: "Warm heating",
      temperature: "Warm",
      majorProduct: "Chlorobenzenesulphonic acid (4-chlorobenzenesulfonic acid)",
      minorProduct: "2-Chlorobenzenesulphonic acid",
      sideProducts: "Water",
      observations: ["Pungent acidic smell"],
      colorChanges: [{ label: "Mixture", from: "Clear", to: "Slightly yellow/brown" }],
      mechanism: [
        "Generation of SO3 electrophile from sulfuric acid",
        "Electrophilic attack at the para position of chlorobenzene",
        "Sigma complex intermediate formed",
        "Deprotonation restores aromaticity, yielding 4-chlorobenzenesulfonic acid (major product)"
      ]
    }),
    makeReaction("Halogenation", "Electrophilic Substitution", "chlorobenzene", "dichlorobenzene", {
      equation: "C6H5Cl + Cl2 -> o/p-Dichlorobenzene",
      reagent: "Cl2",
      catalyst: "FeCl3",
      observations: ["Chlorine color disappears"],
    }),
    makeReaction("Wurtz-Fittig Reaction", "Coupling", "chlorobenzene", "toluene", {
      equation: "C6H5Cl + CH3Cl + 2Na -> C6H5CH3 + 2NaCl",
      reagent: "Sodium",
      catalyst: "Dry ether",
      temperature: "Dry conditions",
      majorProduct: "Alkyl benzene",
      sideProducts: "NaCl",
      observations: ["Sodium disappears"],
      mechanism: ["Na forms radicals", "Aryl and alkyl radicals form", "Radicals combine"],
    }),
    makeReaction("Fittig Reaction", "Coupling", "chlorobenzene", "biphenyl", {
      equation: "2C6H5Cl + 2Na -> C6H5-C6H5 + 2NaCl",
      majorProduct: "Biphenyl",
    }),
    makeReaction("Nucleophilic Substitution (Dow's Process)", "Elimination-addition", "chlorobenzene", "phenol", {
      equation: "C6H5Cl + NaOH -> C6H5OH + NaCl",
      reagent: "NaOH",
      conditions: "High temperature & pressure",
      temperature: "623 K, 300 atm",
      majorProduct: "Phenol",
      sideProducts: "NaCl",
      observations: ["Formation of phenol"],
      mechanism: ["Base removes proton", "Cl leaves forming benzyne", "OH- attacks benzyne", "Phenol forms after protonation"],
    }),
  ],
  named: [
    { name: "Sandmeyer Reaction", summary: "Conversion of diazonium salt into haloarene using CuCl/CuBr.", resultCards: [["Reactant", "Diazonium salt"], ["Conditions", "CuCl/CuBr"], ["Observation", "N2 gas evolves"]], reactantModel: "diazonium", productModel: "chlorobenzene", majorProductModel: "chlorobenzene" },
    { name: "Gattermann Reaction", summary: "Diazonium salt reacts with HX in presence of copper powder.", resultCards: [["Reactant", "Diazonium salt"], ["Conditions", "Cu powder/HX"], ["Observation", "N2 gas"]], reactantModel: "diazonium", productModel: "chlorobenzene", majorProductModel: "chlorobenzene" },
    { name: "Fittig Reaction", summary: "Coupling of haloarenes using sodium in dry ether.", resultCards: [["Reactant", "Haloarene"], ["Conditions", "Na/dry ether"], ["Product", "Biphenyl"]], reactantModel: "chlorobenzene", productModel: "biphenyl", majorProductModel: "biphenyl" },
    { name: "Wurtz-Fittig Reaction", summary: "Haloarene + haloalkane combine using sodium.", resultCards: [["Reactants", "Haloarene + Haloalkane"], ["Conditions", "Na/dry ether"], ["Product", "Alkyl benzene"]], reactantModel: "chlorobenzene", productModel: "toluene", majorProductModel: "toluene" },
    { name: "Dow's Process", summary: "Preparation of phenol from chlorobenzene under drastic conditions.", resultCards: [["Reactant", "Chlorobenzene"], ["Conditions", "623K, 300atm, NaOH"], ["Product", "Phenol"]], reactantModel: "chlorobenzene", productModel: "phenol", majorProductModel: "phenol" },
  ],
  tests: [
    { name: "Silver Nitrate Test", reagent: "AgNO3", observation: "Negative or very slow", colorChange: "White -> White (None)", interpretation: "Haloarenes generally do NOT give AgNO3 test easily due to strong C-X bond." },
    { name: "Beilstein Test", reagent: "Copper wire flame test", observation: "Green flame", colorChange: "Blue -> Green flame", interpretation: "Indicates presence of halogen." },
    { name: "Ignition Test", reagent: "Flame", observation: "Sooty flame", colorChange: "Normal -> Sooty", interpretation: "Burning with sooty flame due to high carbon content and aromatic ring." },
  ],
  importantOrders: [
    { title: "Bond Strength", sequence: "C-F > C-Cl > C-Br > C-I" },
    { title: "Leaving Group Ability", sequence: "I^- > Br^- > Cl^- > F^-" }
  ],
  conversions: [
    ["Haloarene", "NaOH, high T/P", "Phenol"],
    ["Haloarene", "NH3", "Aniline"],
    ["Haloarene", "Na/dry ether", "Biphenyl"],
    ["Haloarene", "Wurtz-Fittig", "Alkyl benzene"],
  ],
};

const haloarenePhysical = [
  ["State", "Mostly liquids"],
  ["Odor", "Aromatic smell"],
  ["Solubility in water", "Insoluble"],
  ["Solubility in organic solvents", "Soluble"],
  ["Boiling Point", "Higher than benzene"],
  ["Density", "Generally higher than water"],
  ["Polarity", "Polar"],
];

const alcoholData = {
  preparation: [
    makeReaction("Hydration of Alkenes", "Electrophilic Addition", "ethene", "ethanol", {
      equation: "CH2=CH2 + H2O ->[H+] CH3CH2OH",
      reactants: "Alkene + Water",
      reagent: "Dilute H2SO4",
      catalyst: "Acid catalyst",
      conditions: "Heat",
      temperature: "300 K approx",
      majorProduct: "Alcohol",
      minorProduct: "Ether (sometimes)",
      sideProducts: "Nil",
      observations: ["Sweet alcoholic smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Protonation of alkene", "Water attacks carbocation", "Deprotonation", "Catalyst regenerates"],
    }),
    makeReaction("Hydrolysis of Haloalkanes", "Nucleophilic Substitution (SN2)", "chloroethane", "ethanol", {
      equation: "RX + KOH(aq) -> ROH + KX",
      reactants: "Haloalkane",
      reagent: "Aqueous KOH",
      catalyst: "None",
      conditions: "Heating",
      temperature: "Warm",
      majorProduct: "Alcohol",
      minorProduct: "Alkene (sometimes)",
      sideProducts: "KX",
      observations: ["Formation of alcohol"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["OH⁻ approaches carbon", "Backside attack occurs", "Leaving group departs", "Alcohol forms"],
    }),
    makeReaction("Reduction of Carbonyl Compounds", "Reduction", "acetaldehyde", "ethanol", {
      equation: "RCHO + [H] -> RCH2OH",
      reactants: "Aldehyde/Ketone",
      reagent: "NaBH4 / LiAlH4",
      catalyst: "Dry ether for LiAlH4",
      conditions: "Controlled temperature",
      temperature: "Low temperature",
      majorProduct: "Alcohol",
      minorProduct: "Nil",
      sideProducts: "Salts",
      observations: ["Mild heat evolved"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Hydride ion attacks carbonyl carbon", "Alkoxide ion forms", "Protonation occurs", "Alcohol produced"],
    }),
    makeReaction("Grignard Reagent Reaction", "Nucleophilic Addition", "formaldehyde", "ethanol", {
      equation: "RMgX + HCHO -> RCH2OH",
      reactants: "Grignard reagent",
      reagent: "Formaldehyde",
      catalyst: "Dry ether",
      conditions: "Moisture-free",
      temperature: "Low temperature",
      majorProduct: "Primary alcohol",
      minorProduct: "Nil",
      sideProducts: "Mg salts",
      observations: ["Vigorous reaction"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Carbanion attacks carbonyl carbon", "Alkoxide intermediate forms", "Hydrolysis occurs", "Alcohol forms"],
    }),
  ],
  chemical: [
    makeReaction("Reaction with Sodium", "Redox", "ethanol", "sodiumEthoxide", {
      equation: "2ROH + 2Na -> 2RONa + H2",
      reagent: "Sodium metal",
      conditions: "Dry conditions",
      temperature: "Room temperature",
      majorProduct: "Sodium alkoxide",
      sideProducts: "Hydrogen gas",
      observations: ["Effervescence"],
      colorChanges: [{ label: "Sodium", from: "Silvery", to: "Disappears" }],
      mechanism: ["Na loses electron", "Alcohol loses proton", "Alkoxide forms", "Hydrogen gas evolves"],
    }),
    makeReaction("Esterification", "Nucleophilic Acyl Substitution", "aceticAcid", "ethylAcetate", {
      equation: "RCOOH + ROH ->[H+] RCOOR + H2O",
      reactants: "Carboxylic acid + Alcohol",
      catalyst: "Conc. H2SO4",
      conditions: "Heating",
      temperature: "Heat",
      majorProduct: "Ester",
      sideProducts: "Water",
      observations: ["Fruity smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Carbonyl oxygen protonated", "Alcohol attacks carbonyl carbon", "Intermediate rearranges", "Water eliminated forming ester"],
    }),
    makeReaction("Dehydration", "Elimination (E1/E2)", "ethanol", "ethene", {
      equation: "CH3CH2OH ->[Conc. H2SO4] CH2=CH2 + H2O",
      reagent: "Conc. H2SO4",
      conditions: "Heat",
      temperature: "443 K",
      majorProduct: "Alkene",
      minorProduct: "Ether",
      sideProducts: "Water",
      observations: ["Gas evolution"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Protonation of alcohol", "Water leaves", "β-Hydrogen removed", "Double bond forms"],
    }),
    makeReaction("Oxidation (Primary)", "Oxidation", "ethanol", "aceticAcid", {
      equation: "RCH2OH + [O] -> RCHO -> RCOOH",
      reagent: "KMnO4 / K2Cr2O7",
      conditions: "Acidic medium",
      temperature: "Warm",
      majorProduct: "Carboxylic Acid",
      sideProducts: "Water",
      observations: ["Color changes based on reagent"],
      colorChanges: [{ label: "KMnO4", from: "Purple", to: "Colorless" }, { label: "K2Cr2O7", from: "Orange", to: "Green" }],
      mechanism: ["Formation of chromate ester", "Hydrogen abstraction", "Carbonyl compound forms", "Further oxidation possible"],
    }),
  ],
  named: [
    { name: "Lucas Test", summary: "Distinguishes 1°, 2°, 3° alcohols based on turbidity time.", resultCards: [["Reactant", "Alcohol"], ["Reagent", "Conc. HCl + ZnCl2"], ["Observation", "3° fast, 2° slow, 1° none"]], reactantModel: "ethanol", productModel: "chloroethane", majorProductModel: "chloroethane" },
    { name: "Victor Meyer Test", summary: "Differentiates alcohols by color.", resultCards: [["1° Alcohol", "Red color"], ["2° Alcohol", "Blue color"], ["3° Alcohol", "Colorless"]], reactantModel: "ethanol", productModel: "ethanol", majorProductModel: "ethanol" },
  ],
  tests: [
    { name: "Sodium Metal Test", reagent: "Sodium metal", observation: "Hydrogen gas bubbles evolve.", colorChange: "Sodium -> disappears", interpretation: "Confirms presence of active hydrogen (e.g. -OH group)." },
    { name: "Ester Test", reagent: "Carboxylic acid + conc. H2SO4", observation: "Fruity smell obtained.", colorChange: "None", interpretation: "Confirms hydroxyl group via ester formation." },
    { name: "Ceric Ammonium Nitrate Test", reagent: "Ceric ammonium nitrate", observation: "Red color forms.", colorChange: "Yellow -> Red", interpretation: "Confirms presence of alcohol." },
    { name: "Chromic Acid Test", reagent: "CrO3 / H2SO4", observation: "Orange to green color change for 1°/2°.", colorChange: "Orange -> Green", interpretation: "Primary and secondary alcohols are oxidized; tertiary are not." },
  ],
  importantOrders: [
    { title: "Acidity of Alcohols", sequence: "CH_3 OH > 1^∘ > 2^∘ > 3^∘" },
    { title: "Ease of Dehydration", sequence: "3^∘ > 2^∘ > 1^∘" },
    { title: "Lucas Test Reactivity", sequence: "3^∘ > 2^∘ > 1^∘" }
  ],
  conversions: [
    ["Alcohol", "HX/SOCl2", "Haloalkane"],
    ["Alcohol", "Conc. H2SO4", "Alkene"],
    ["Alcohol", "PCC", "Aldehyde"],
    ["Alcohol", "KMnO4", "Acid"],
    ["Alcohol", "Carboxylic acid", "Ester"],
    ["Alcohol", "Conc. H2SO4 at 413 K", "Ether"],
  ],
};

const alcoholPhysical = [
  ["State", "Lower members are liquids"],
  ["Odor", "Characteristic smell"],
  ["Solubility", "Lower alcohols soluble in water"],
  ["Boiling Point", "Higher than alkanes"],
  ["Polarity", "Polar"],
  ["Hydrogen Bonding", "Strong"],
  ["Density", "Lower than water (except some)"],
  ["Reason for High Boiling Point", "Alcohols form intermolecular hydrogen bonds (R-OH⋯OH-R)"],
];

const phenolData = {
  preparation: [
    makeReaction("From Haloarenes (Dow’s Process)", "Nucleophilic Aromatic Substitution", "chlorobenzene", "phenol", {
      equation: "C6H5Cl + NaOH ->[623K, 300 atm] C6H5OH + NaCl",
      reactants: "Chlorobenzene",
      reagent: "NaOH",
      catalyst: "None",
      conditions: "623 K, 300 atm",
      temperature: "High",
      majorProduct: "Phenol",
      minorProduct: "Nil",
      sideProducts: "NaCl",
      observations: ["Phenolic smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["OH⁻ removes proton adjacent to Cl", "Cl leaves forming benzyne intermediate", "OH⁻ attacks benzyne", "Protonation forms phenol"],
    }),
    makeReaction("From Benzene Sulphonic Acid", "Nucleophilic Substitution", "chlorobenzenesulphonicAcid", "phenol", {
      equation: "C6H5SO3Na + NaOH -> C6H5OH",
      reactants: "Sodium benzene sulphonate",
      reagent: "NaOH",
      catalyst: "None",
      conditions: "Fusion with NaOH",
      temperature: "High temperature",
      majorProduct: "Phenol",
      minorProduct: "Nil",
      sideProducts: "Na2SO3",
      observations: ["Phenolic odor"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["OH⁻ attacks aromatic carbon", "Sulphonate group leaves", "Sodium phenoxide forms", "Acidification gives phenol"],
    }),
    makeReaction("From Diazonium Salt", "Hydrolysis", "diazonium", "phenol", {
      equation: "C6H5N2+Cl- + H2O -> C6H5OH + N2 + HCl",
      reactants: "Benzene diazonium chloride",
      reagent: "Water",
      catalyst: "None",
      conditions: "Warm",
      temperature: "Warm",
      majorProduct: "Phenol",
      minorProduct: "Nil",
      sideProducts: "N2",
      observations: ["Nitrogen gas evolves"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Diazonium ion loses nitrogen gas", "Phenyl cation forms", "Water attacks phenyl cation", "Deprotonation forms phenol"],
    }),
  ],
  chemical: [
    makeReaction("Reaction with Sodium", "Redox", "phenol", "sodiumPhenoxide", {
      equation: "2C6H5OH + 2Na -> 2C6H5ONa + H2",
      reagent: "Sodium metal",
      conditions: "Dry conditions",
      temperature: "Room temperature",
      majorProduct: "Sodium phenoxide",
      sideProducts: "H2 gas",
      observations: ["Effervescence"],
      colorChanges: [{ label: "Sodium", from: "Silvery", to: "Disappears" }],
      mechanism: ["Phenol loses proton", "Na donates electron", "Phenoxide ion forms", "Hydrogen gas evolves"],
    }),
    makeReaction("Reaction with NaOH", "Acid-Base", "phenol", "sodiumPhenoxide", {
      equation: "C6H5OH + NaOH -> C6H5ONa + H2O",
      reagent: "NaOH",
      conditions: "Aqueous",
      temperature: "Room temperature",
      majorProduct: "Sodium phenoxide",
      sideProducts: "Water",
      observations: ["Phenol dissolves forming sodium phenoxide"],
      colorChanges: [{ label: "Reaction", from: "Cloudy", to: "Clear solution" }],
      mechanism: ["Acid-base neutralization"],
    }),
    makeReaction("Bromination", "Electrophilic Aromatic Substitution", "phenol", "tribromophenol", {
      equation: "C6H5OH + 3Br2 -> 2,4,6-Tribromophenol + 3HBr",
      reagent: "Bromine water",
      conditions: "Room temperature",
      temperature: "Room temperature",
      majorProduct: "2,4,6-Tribromophenol",
      sideProducts: "HBr",
      observations: ["White precipitate"],
      colorChanges: [{ label: "Bromine water", from: "Orange/Brown", to: "Colorless" }],
      mechanism: ["OH activates benzene ring", "Br⁺ electrophile forms", "Electrophilic attack at ortho/para positions", "White precipitate forms"],
    }),
    makeReaction("Nitration", "Electrophilic Aromatic Substitution", "phenol", "picricAcid", {
      equation: "C6H5OH + 3HNO3 -> 2,4,6-Trinitrophenol",
      reagent: "HNO3",
      catalyst: "H2SO4",
      conditions: "Controlled temperature",
      temperature: "Low to moderate",
      majorProduct: "Nitro phenol / Picric Acid",
      sideProducts: "Water",
      observations: ["Yellow coloration"],
      colorChanges: [{ label: "Product", from: "Clear", to: "Yellow crystals" }],
      mechanism: ["NO2⁺ electrophile forms", "Electrophilic attack on activated ring", "Sigma complex forms", "Aromaticity restored"],
    }),
    makeReaction("Kolbe’s Reaction", "Electrophilic Aromatic Substitution", "sodiumPhenoxide", "salicylicAcid", {
      equation: "C6H5ONa + CO2 -> Salicylic acid",
      reactants: "Sodium phenoxide",
      reagent: "CO2",
      conditions: "400 K, pressure",
      temperature: "400 K",
      majorProduct: "Salicylic acid",
      sideProducts: "Nil",
      observations: ["White solid"],
      colorChanges: [{ label: "Product", from: "Clear", to: "White crystals" }],
      mechanism: ["Phenoxide ion attacks CO2", "Carboxylate intermediate forms", "Acidification occurs", "Salicylic acid obtained"],
    }),
    makeReaction("Reimer-Tiemann Reaction", "Electrophilic Substitution", "phenol", "salicylaldehyde", {
      equation: "C6H5OH + CHCl3 + 3NaOH -> Salicylaldehyde",
      reagent: "CHCl3 + NaOH",
      conditions: "Heat",
      temperature: "Warm",
      majorProduct: "Salicylaldehyde",
      sideProducts: "NaCl",
      observations: ["Characteristic odor"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Pale yellow" }],
      mechanism: ["CHCl3 forms dichlorocarbene", "Electrophilic attack on phenoxide ring", "Hydrolysis occurs", "Aldehyde forms"],
    }),
  ],
  named: [
    { name: "Kolbe’s Reaction", summary: "Preparation of salicylic acid from sodium phenoxide and CO2.", resultCards: [["Reactant", "Sodium phenoxide"], ["Reagent", "CO2"], ["Product", "Salicylic acid"]], reactantModel: "sodiumPhenoxide", productModel: "salicylicAcid", majorProductModel: "salicylicAcid" },
    { name: "Reimer-Tiemann Reaction", summary: "Formation of salicylaldehyde using CHCl3 and NaOH.", resultCards: [["Reactant", "Phenol"], ["Reagents", "CHCl3, NaOH"], ["Product", "Salicylaldehyde"]], reactantModel: "phenol", productModel: "salicylaldehyde", majorProductModel: "salicylaldehyde" },
    { name: "Dow’s Process", summary: "Preparation of phenol from chlorobenzene.", resultCards: [["Reactant", "Chlorobenzene"], ["Conditions", "NaOH, 623K"], ["Product", "Phenol"]], reactantModel: "chlorobenzene", productModel: "phenol", majorProductModel: "phenol" },
  ],
  tests: [
    { name: "Ferric Chloride Test", reagent: "FeCl3", observation: "Violet complex forms.", colorChange: "Yellow -> Violet", interpretation: "Confirms presence of phenol." },
    { name: "Bromine Water Test", reagent: "Bromine water", observation: "White ppt forms and bromine decolorizes.", colorChange: "Orange -> Colorless + White ppt", interpretation: "Confirms highly activated aromatic ring." },
    { name: "Liebermann’s Test", reagent: "NaNO2 + H2SO4", observation: "Blue/green coloration forms.", colorChange: "Red -> Blue/Green", interpretation: "Confirms presence of phenol." },
  ],
  importantOrders: [
    { title: "Acidity", sequence: "Phenol > Alcohol" },
    { title: "Activating Effect", sequence: "-OH = Strong ortho/para director" }
  ],
  conversions: [
    ["Phenol", "Conc. HNO3", "Picric acid"],
    ["Phenol", "CO2 / NaOH", "Salicylic acid"],
    ["Phenol", "CHCl3 / NaOH", "Salicylaldehyde"],
    ["Phenol", "CH3I", "Anisole"],
    ["Phenol", "Zn dust", "Benzene"],
  ],
};

const phenolPhysical = [
  ["State", "Colorless crystalline solid"],
  ["Odor", "Characteristic medicinal smell"],
  ["Solubility", "Slightly soluble in water"],
  ["Boiling Point", "High"],
  ["Acidity", "Weakly acidic"],
  ["Hydrogen Bonding", "Present"],
  ["Toxicity", "Corrosive and poisonous"],
  ["Reason for Acidity", "Phenoxide ion is resonance stabilized."],
];

const ethersData = {
  preparation: [
    makeReaction("Williamson Ether Synthesis", "Nucleophilic Substitution (SN2)", "sodiumEthoxide", "methoxyethane", {
      equation: "RONa + R'X -> ROR' + NaX",
      reactants: "Sodium alkoxide + Haloalkane",
      reagent: "Haloalkane",
      catalyst: "None",
      conditions: "Dry medium",
      temperature: "Mild heating",
      majorProduct: "Ether",
      minorProduct: "Alkene (sometimes)",
      sideProducts: "NaX",
      observations: ["Ether smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Alkoxide ion acts as nucleophile", "Backside attack on alkyl halide", "Leaving group departs", "Ether forms"],
    }),
    makeReaction("Dehydration of Alcohols", "Dehydration", "ethanol", "diethylEther", {
      equation: "2C2H5OH ->[413K, Conc. H2SO4] C2H5OC2H5 + H2O",
      reactants: "Alcohol",
      reagent: "Conc. H2SO4",
      catalyst: "Acid catalyst",
      conditions: "413 K",
      temperature: "413 K",
      majorProduct: "Ether",
      minorProduct: "Alkene",
      sideProducts: "Water",
      observations: ["Sweet smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Alcohol protonation occurs", "Second alcohol attacks carbon", "Water molecule leaves", "Ether forms after deprotonation"],
    }),
    makeReaction("From Diazomethane", "Methylation", "ethanol", "methoxyethane", {
      equation: "ROH + CH2N2 -> ROCH3 + N2",
      reactants: "Alcohol",
      reagent: "Diazomethane",
      conditions: "Mild",
      temperature: "Low temperature",
      majorProduct: "Methyl ether",
      sideProducts: "N2",
      observations: ["Nitrogen gas evolution"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Alcohol proton transfers", "Methoxy intermediate forms", "Nitrogen leaves", "Ether forms"],
    }),
  ],
  chemical: [
    makeReaction("Cleavage with HX", "Nucleophilic Substitution (SN1/SN2)", "diethylEther", "chloroethane", {
      equation: "ROR' + HX -> RX + R'OH",
      reagent: "HI/HBr",
      conditions: "Heat",
      temperature: "Warm",
      majorProduct: "Haloalkane",
      minorProduct: "Alcohol",
      sideProducts: "Water",
      observations: ["Pungent fumes"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Ether oxygen protonated", "C–O bond weakens", "Halide attacks carbon", "Alcohol or alkyl halide forms"],
    }),
    makeReaction("Halogenation", "Electrophilic Aromatic Substitution", "anisole", "bromoanisole", {
      equation: "C6H5OCH3 + Br2 -> o/p Bromoanisole",
      reactants: "Anisole",
      reagent: "Br2",
      catalyst: "FeBr3 (sometimes not needed)",
      conditions: "Room temperature",
      temperature: "Room temperature",
      majorProduct: "Para product",
      minorProduct: "Ortho product",
      sideProducts: "HBr",
      observations: ["Bromine decolorizes"],
      colorChanges: [{ label: "Bromine", from: "Reddish-brown", to: "Disappears" }],
      mechanism: ["Methoxy activates ring", "Br⁺ electrophile forms", "Electrophilic attack occurs", "Deprotonation restores aromaticity"],
    }),
    makeReaction("Nitration", "Electrophilic Aromatic Substitution", "anisole", "nitroanisole", {
      equation: "C6H5OCH3 + HNO3 -> o/p Nitroanisole",
      reagent: "Conc. HNO3",
      catalyst: "H2SO4",
      conditions: "Controlled temperature",
      temperature: "Low temperature",
      majorProduct: "Para nitroanisole",
      minorProduct: "Ortho nitroanisole",
      sideProducts: "Water",
      observations: ["Yellow oily liquid"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Pale yellow" }],
      mechanism: ["NO2⁺ electrophile forms", "Activated ring attacks electrophile", "Sigma complex forms", "Aromaticity restored"],
    }),
    makeReaction("Autooxidation", "Free Radical", "diethylEther", "diethylEther", {
      equation: "ROR + O2 -> Peroxides",
      reagent: "Atmospheric oxygen",
      conditions: "Long storage",
      temperature: "Room temperature",
      majorProduct: "Peroxides",
      sideProducts: "Hydroperoxides",
      observations: ["Explosive nature"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Radical formation", "Oxygen radical attack", "Peroxide radical forms", "Peroxide product obtained"],
    }),
  ],
  named: [
    { name: "Williamson Ether Synthesis", summary: "Preparation of ethers using sodium alkoxide and haloalkanes.", resultCards: [["Reactant", "Sodium alkoxide"], ["Reagent", "Haloalkane"], ["Product", "Ether"]], reactantModel: "sodiumEthoxide", productModel: "methoxyethane", majorProductModel: "methoxyethane" },
    { name: "Claisen Rearrangement", summary: "Thermal rearrangement of allyl phenyl ether to o-allylphenol.", resultCards: [["Reactant", "Allyl aryl ether"], ["Conditions", "Heating"], ["Product", "Ortho allyl phenol"]], reactantModel: "anisole", productModel: "phenol", majorProductModel: "phenol" },
  ],
  tests: [
    { name: "HI Cleavage Test", reagent: "HI", observation: "Formation of alkyl iodide.", colorChange: "Clear -> Pungent fumes", interpretation: "Cleavage of ether linkage." },
    { name: "Peroxide Test", reagent: "KI/starch paper", observation: "Blue coloration forms.", colorChange: "White -> Blue", interpretation: "Confirms presence of peroxides in old ethers." },
    { name: "Ignition Test", reagent: "Flame", observation: "Highly inflammable flame.", colorChange: "Normal -> Smoky flame", interpretation: "Indicates high flammability." },
  ],
  importantOrders: [
    { title: "Boiling Point", sequence: "Alcohol > Ether > Alkane" },
    { title: "Reactivity with HX", sequence: "HI > HBr > HCl" },
    { title: "Activating Effect in Aromatic Ethers", sequence: "-OCH_3 = ortho/para director" }
  ],
  conversions: [
    ["Ether", "Dilute acid", "Alcohol"],
    ["Ether", "HI/HBr", "Haloalkane"],
    ["Alcohol", "Conc. H2SO4", "Ether"],
    ["Phenol", "CH3I/NaOH", "Anisole"],
    ["Ether", "O2", "Peroxide"],
  ],
};

const ethersPhysical = [
  ["State", "Volatile liquids"],
  ["Odor", "Pleasant sweet smell"],
  ["Solubility", "Slightly soluble in water"],
  ["Boiling Point", "Lower than alcohols"],
  ["Polarity", "Polar"],
  ["Hydrogen Bonding", "No intermolecular H-bonding"],
  ["Density", "Lower than water"],
  ["Reason for Lower Boiling Point", "Ethers do not form intermolecular hydrogen bonding like alcohols."],
];


const aldehydeData = {
  preparation: [
    makeReaction("Oxidation of Primary Alcohols", "Oxidation", "ethanol", "acetaldehyde", {
      equation: "RCH2OH + [O] -> RCHO + H2O",
      reactants: "Primary alcohol",
      reagent: "PCC / Cu at 573 K",
      catalyst: "Acidic medium (sometimes)",
      conditions: "Controlled oxidation",
      temperature: "Moderate",
      majorProduct: "Aldehyde",
      minorProduct: "Carboxylic acid",
      sideProducts: "Water",
      observations: ["Fruity/pungent smell"],
      colorChanges: [{ label: "Depends on oxidizing agent", from: "Varies", to: "Varies" }],
      mechanism: ["Alcohol oxygen attacks oxidizing agent", "Chromate ester/intermediate forms", "Hydrogen removal occurs", "Carbonyl compound forms"],
    }),
    makeReaction("Rosenmund Reduction", "Reduction", "acetylChloride", "acetaldehyde", {
      equation: "RCOCl + H2 ->[Pd/BaSO4] RCHO + HCl",
      reactants: "Acid chloride",
      reagent: "Hydrogen gas",
      catalyst: "Pd/BaSO4",
      conditions: "Controlled reduction",
      temperature: "Mild heating",
      majorProduct: "Aldehyde",
      minorProduct: "Alcohol (if over-reduced)",
      sideProducts: "HCl",
      observations: ["Heat evolved"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Hydrogen adsorbs on catalyst", "Acid chloride activated", "Partial reduction occurs", "Aldehyde released"],
    }),
    makeReaction("Stephen Reaction", "Reduction", "acetonitrile", "acetaldehyde", {
      equation: "RCN ->[SnCl2/HCl] RCH=NH ->[H2O] RCHO + NH3",
      reactants: "Nitrile",
      reagent: "SnCl2/HCl",
      conditions: "Acidic hydrolysis",
      temperature: "Warm",
      majorProduct: "Aldehyde",
      sideProducts: "NH3",
      observations: ["Ammonia smell during hydrolysis"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Nitrile reduction occurs", "Imine salt forms", "Hydrolysis occurs", "Aldehyde produced"],
    }),
    makeReaction("Ozonolysis of Alkenes", "Ozonolysis", "ethene", "formaldehyde", {
      equation: "RCH=CHR ->[O3] ->[Zn/H2O] Aldehydes/Ketones",
      reactants: "Alkene",
      reagent: "Ozone",
      catalyst: "Zn/H2O",
      conditions: "Low temperature",
      temperature: "Low",
      majorProduct: "Aldehyde",
      minorProduct: "Ketones possible",
      sideProducts: "Nil",
      observations: ["Ozonide formation", "Ozone smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Ozone attacks double bond", "Molozonide forms", "Rearrangement to ozonide", "Reductive cleavage gives aldehyde"],
    }),
  ],
  chemical: [
    makeReaction("Oxidation", "Oxidation", "acetaldehyde", "aceticAcid", {
      equation: "RCHO + [O] -> RCOOH",
      reagent: "KMnO4 / K2Cr2O7",
      conditions: "Acidic medium",
      temperature: "Warm",
      majorProduct: "Carboxylic acid",
      sideProducts: "Water",
      observations: ["Color changes"],
      colorChanges: [{ label: "KMnO4", from: "Purple", to: "Colorless" }, { label: "K2Cr2O7", from: "Orange", to: "Green" }],
      mechanism: ["Oxidizing agent attacks carbonyl carbon", "Hydrated intermediate forms", "Hydrogen removal occurs", "Carboxylic acid forms"],
    }),
    makeReaction("Reduction", "Reduction", "acetaldehyde", "ethanol", {
      equation: "RCHO + [H] -> RCH2OH",
      reagent: "NaBH4 / LiAlH4",
      conditions: "Dry medium",
      temperature: "Low",
      majorProduct: "Primary alcohol",
      sideProducts: "Salts",
      observations: ["Mild heat"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Hydride attacks carbonyl carbon", "Alkoxide ion forms", "Protonation occurs", "Alcohol produced"],
    }),
    makeReaction("Addition of HCN", "Nucleophilic Addition", "acetaldehyde", "lactonitrile", {
      equation: "RCHO + HCN -> RCH(OH)CN",
      reagent: "HCN",
      catalyst: "KCN",
      conditions: "Cold",
      temperature: "Low",
      majorProduct: "Cyanohydrin",
      sideProducts: "Nil",
      observations: ["Oily liquid"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["CN⁻ attacks carbonyl carbon", "Alkoxide intermediate forms", "Protonation occurs", "Cyanohydrin forms"],
    }),
    makeReaction("Aldol Condensation", "Nucleophilic Addition", "acetaldehyde", "aldol", {
      equation: "2CH3CHO ->[Dil. NaOH] CH3CH(OH)CH2CHO",
      reagent: "Dilute NaOH",
      conditions: "Low temperature",
      temperature: "Cold initially",
      majorProduct: "Aldol (β-Hydroxy aldehyde)",
      minorProduct: "Crotonaldehyde on heating",
      sideProducts: "Water",
      observations: ["Thick oily liquid"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["α-Hydrogen removed", "Enolate ion forms", "Enolate attacks another aldehyde", "β-Hydroxy aldehyde forms"],
    }),
    makeReaction("Cannizzaro Reaction", "Disproportionation", "formaldehyde", "methanol", {
      equation: "2HCHO + NaOH -> HCOONa + CH3OH",
      reagent: "Concentrated NaOH",
      conditions: "Strongly basic",
      temperature: "Room temperature",
      majorProduct: "Alcohol + carboxylate",
      sideProducts: "Nil",
      observations: ["Heat evolved"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["OH⁻ attacks aldehyde", "Hydride transfer occurs", "One molecule oxidized", "Another reduced to alcohol"],
    }),
  ],
  named: [
    { name: "Aldol Condensation", summary: "Formation of β-hydroxy aldehyde from aldehydes with α-H.", resultCards: [["Reactant", "Aldehyde"], ["Reagent", "Dil. NaOH"], ["Observation", "Thick oily liquid"]], reactantModel: "acetaldehyde", productModel: "aldol", majorProductModel: "aldol" },
    { name: "Cannizzaro Reaction", summary: "Disproportionation of aldehydes without α-H.", resultCards: [["Reactant", "Aldehyde (no α-H)"], ["Reagent", "Conc. NaOH"], ["Products", "Alcohol + Carboxylate"]], reactantModel: "formaldehyde", productModel: "methanol", majorProductModel: "methanol" },
    { name: "Rosenmund Reduction", summary: "Reduction of acid chloride to aldehyde.", resultCards: [["Reactant", "Acid chloride"], ["Reagent", "H2, Pd/BaSO4"], ["Product", "Aldehyde"]], reactantModel: "acetylChloride", productModel: "acetaldehyde", majorProductModel: "acetaldehyde" },
    { name: "Stephen Reaction", summary: "Reduction of nitrile to aldehyde.", resultCards: [["Reactant", "Nitrile"], ["Reagent", "SnCl2/HCl"], ["Product", "Aldehyde"]], reactantModel: "acetonitrile", productModel: "acetaldehyde", majorProductModel: "acetaldehyde" },
  ],
  tests: [
    { name: "Tollens’ Test", reagent: "Tollens' reagent (Ag+)", observation: "Silver mirror forms.", colorChange: "Clear -> Silver mirror", interpretation: "Confirms presence of aldehyde group." },
    { name: "Fehling’s Test", reagent: "Fehling's solution", observation: "Brick-red precipitate of Cu2O forms.", colorChange: "Blue -> Brick-red ppt", interpretation: "Confirms presence of aliphatic aldehyde." },
    { name: "Schiff’s Test", reagent: "Schiff's reagent", observation: "Pink/magenta color develops.", colorChange: "Colorless -> Pink", interpretation: "Confirms presence of aldehyde." },
    { name: "Benedict’s Test", reagent: "Benedict's solution", observation: "Red precipitate forms.", colorChange: "Blue -> Red ppt", interpretation: "Positive for aliphatic aldehydes." },
  ],
  importantOrders: [
    { title: "Reactivity Towards Nucleophilic Addition", sequence: "HCHO > RCHO > R_2 CO" },
    { title: "Oxidation Ease", sequence: "Aldehydes > Ketones" }
  ],
  conversions: [
    ["Aldehyde", "NaBH4", "Alcohol"],
    ["Aldehyde", "KMnO4", "Acid"],
    ["Aldehyde", "HCN", "Cyanohydrin"],
    ["Aldehyde", "Zn-Hg/HCl", "Alkane"],
    ["Aldehyde", "NH3", "Imine"],
  ],
};

const aldehydePhysical = [
  ["State", "Lower members are liquids/gases"],
  ["Odor", "Sharp pungent smell"],
  ["Solubility", "Lower aldehydes soluble in water"],
  ["Boiling Point", "Higher than hydrocarbons, lower than alcohols"],
  ["Polarity", "Polar"],
  ["Hydrogen Bonding", "No intermolecular H-bonding"],
  ["Density", "Generally less than water"],
  ["Reason for Boiling Point", "Due to polar carbonyl group (>C=O), dipole-dipole interactions increase boiling point."],
];

const ketoneData = {
  preparation: [
    makeReaction("Oxidation of Secondary Alcohols", "Oxidation", "isopropanol", "acetone", {
      equation: "R2CHOH + [O] -> R2CO + H2O",
      reactants: "Secondary alcohol",
      reagent: "K2Cr2O7 / KMnO4",
      catalyst: "Acidic medium",
      conditions: "Heating",
      temperature: "Warm",
      majorProduct: "Ketone",
      sideProducts: "Water",
      observations: ["Characteristic smell"],
      colorChanges: [{ label: "Reagent", from: "Orange", to: "Green" }],
      mechanism: ["Alcohol oxygen attacks oxidizing agent", "Chromate ester forms", "Hydrogen abstraction occurs", "Ketone forms"],
    }),
    makeReaction("Friedel–Crafts Acylation", "Electrophilic Aromatic Substitution", "benzene", "acetophenone", {
      equation: "C6H6 + RCOCl ->[AlCl3] C6H5COR + HCl",
      reactants: "Benzene",
      reagent: "Acid chloride",
      catalyst: "AlCl3",
      conditions: "Anhydrous",
      temperature: "Room temperature",
      majorProduct: "Aromatic ketone",
      minorProduct: "Polyacylated products",
      sideProducts: "HCl",
      observations: ["HCl fumes"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Acylium ion forms", "Electrophilic attack on benzene", "Sigma complex forms", "Deprotonation restores aromaticity"],
    }),
    makeReaction("Hydration of Alkynes", "Electrophilic Addition", "propyne", "acetone", {
      equation: "RC≡CH + H2O ->[HgSO4/H2SO4] Ketone",
      reactants: "Alkyne",
      reagent: "Water",
      catalyst: "HgSO4/H2SO4",
      conditions: "Acidic medium",
      temperature: "Warm",
      majorProduct: "Ketone",
      minorProduct: "Enol intermediate",
      sideProducts: "Nil",
      observations: ["No major visible change"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Electrophilic addition of H⁺", "Water attacks carbocation", "Enol forms", "Tautomerization gives ketone"],
    }),
    makeReaction("Dry Distillation of Calcium Salts", "Decomposition", "sodiumAcetate", "acetone", {
      equation: "(RCOO)2Ca ->[Δ] R-CO-R + CaCO3",
      reactants: "Calcium carboxylate",
      conditions: "Strong heating",
      temperature: "High",
      majorProduct: "Ketone",
      sideProducts: "CaCO3",
      observations: ["Vapors evolve"],
      colorChanges: [{ label: "Reaction", from: "Solid", to: "Solid + Vapors" }],
      mechanism: ["Thermal decomposition starts", "Decarboxylation occurs", "Carbon-carbon bond forms", "Ketone produced"],
    }),
  ],
  chemical: [
    makeReaction("Reduction", "Reduction", "acetone", "isopropanol", {
      equation: "R2CO + [H] -> R2CHOH",
      reagent: "NaBH4 / LiAlH4",
      conditions: "Dry ether",
      temperature: "Low",
      majorProduct: "Secondary alcohol",
      sideProducts: "Salts",
      observations: ["Mild heat evolved"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Hydride attacks carbonyl carbon", "Alkoxide intermediate forms", "Protonation occurs", "Alcohol produced"],
    }),
    makeReaction("Addition of HCN", "Nucleophilic Addition", "acetone", "acetoxime", {
      equation: "R2CO + HCN -> R2C(OH)CN",
      reagent: "HCN",
      catalyst: "KCN",
      conditions: "Cold",
      temperature: "Low",
      majorProduct: "Cyanohydrin",
      sideProducts: "Nil",
      observations: ["Oily liquid"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["CN⁻ attacks carbonyl carbon", "Alkoxide ion forms", "Protonation occurs", "Cyanohydrin forms"],
    }),
    makeReaction("Formation of Oxime", "Addition-Elimination", "acetone", "acetoxime", {
      equation: "R2CO + NH2OH -> R2C=NOH + H2O",
      reagent: "Hydroxylamine",
      conditions: "Mild acidic medium",
      temperature: "Room temperature",
      majorProduct: "Oxime",
      sideProducts: "Water",
      observations: ["Crystalline solid forms"],
      colorChanges: [{ label: "Product", from: "Clear", to: "White crystals" }],
      mechanism: ["Nitrogen attacks carbonyl carbon", "Intermediate forms", "Water eliminated", "Oxime produced"],
    }),
    makeReaction("Aldol Condensation", "Nucleophilic Addition", "acetone", "acetoxime", {
      equation: "2CH3COCH3 ->[Dil. NaOH] Diacetone alcohol",
      reagent: "Dilute NaOH",
      conditions: "Cold",
      temperature: "Low",
      majorProduct: "β-Hydroxy ketone",
      sideProducts: "Water",
      observations: ["Thick liquid"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["α-Hydrogen removed", "Enolate ion forms", "Enolate attacks another ketone", "β-Hydroxy ketone forms"],
    }),
    makeReaction("Haloform Reaction", "Oxidation / Cleavage", "acetone", "iodoform", {
      equation: "CH3CO-R + 3I2 + 4NaOH -> CHI3 + RCOONa",
      reagent: "I2 / NaOH",
      conditions: "Warm",
      temperature: "Warm",
      majorProduct: "Iodoform",
      minorProduct: "Sodium carboxylate",
      sideProducts: "NaI + H2O",
      observations: ["Yellow precipitate forms"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Yellow ppt" }],
      mechanism: ["α-Hydrogen replaced by iodine", "Triiodo ketone forms", "OH⁻ attacks carbonyl carbon", "CHI3 precipitates"],
    }),
  ],
  named: [
    { name: "Friedel–Crafts Acylation", summary: "Preparation of aromatic ketones using acid chloride.", resultCards: [["Reactant", "Benzene"], ["Reagent", "Acid Chloride, AlCl3"], ["Observation", "HCl fumes"]], reactantModel: "benzene", productModel: "acetophenone", majorProductModel: "acetophenone" },
    { name: "Haloform Reaction", summary: "Identification of methyl ketones producing iodoform.", resultCards: [["Reactant", "Methyl ketone"], ["Reagent", "I2 / NaOH"], ["Observation", "Yellow ppt (CHI3)"]], reactantModel: "acetone", productModel: "iodoform", majorProductModel: "iodoform" },
    { name: "Clemmensen Reduction", summary: "Reduction of ketones to hydrocarbons using Zn-Hg/HCl.", resultCards: [["Reactant", "Ketone"], ["Reagent", "Zn-Hg / HCl"], ["Product", "Hydrocarbon"]], reactantModel: "acetone", productModel: "propane", majorProductModel: "propane" },
    { name: "Wolff–Kishner Reduction", summary: "Reduction of ketones to hydrocarbons using Hydrazine/KOH.", resultCards: [["Reactant", "Ketone"], ["Reagent", "NH2NH2 / KOH"], ["Product", "Hydrocarbon"]], reactantModel: "acetone", productModel: "propane", majorProductModel: "propane" },
  ],
  tests: [
    { name: "2,4-DNP Test", reagent: "2,4-Dinitrophenylhydrazine", observation: "Orange/yellow precipitate forms.", colorChange: "Clear -> Orange ppt", interpretation: "Confirms presence of carbonyl group." },
    { name: "Iodoform Test", reagent: "I2 and NaOH", observation: "Yellow precipitate of CHI3.", colorChange: "Clear -> Yellow ppt", interpretation: "Positive for methyl ketones." },
    { name: "Sodium Bisulfite Test", reagent: "NaHSO3", observation: "White crystalline addition product.", colorChange: "Clear -> White crystals", interpretation: "Confirms presence of carbonyl group." },
  ],
  importantOrders: [
    { title: "Reactivity Towards Nucleophilic Addition", sequence: "HCHO > Aldehydes > Ketones" },
    { title: "Ease of Oxidation", sequence: "Aldehydes > Ketones" }
  ],
  conversions: [
    ["Ketone", "NaBH4", "Alcohol"],
    ["Ketone", "Zn-Hg/HCl", "Hydrocarbon"],
    ["Ketone", "NH2OH", "Oxime"],
    ["Ketone", "HCN", "Cyanohydrin"],
    ["Ketone", "Wittig reagent", "Alkene"],
  ],
};

const ketonePhysical = [
  ["State", "Colorless liquids (lower members)"],
  ["Odor", "Sweet smell"],
  ["Solubility", "Lower ketones soluble in water"],
  ["Boiling Point", "Higher than hydrocarbons, lower than alcohols"],
  ["Polarity", "Polar"],
  ["Hydrogen Bonding", "No intermolecular H-bonding"],
  ["Density", "Less than water"],
  ["Reason for Boiling Point", "Strong dipole-dipole interaction due to >C=O group."],
];

const carboxylicAcidData = {
  preparation: [
    makeReaction("Oxidation of Primary Alcohols", "Oxidation", "ethanol", "aceticAcid", {
      equation: "RCH2OH + 2[O] -> RCOOH + H2O",
      reactants: "Primary alcohol",
      reagent: "KMnO4 / K2Cr2O7",
      catalyst: "Acidic medium",
      conditions: "Heating",
      temperature: "Warm",
      majorProduct: "Carboxylic acid",
      minorProduct: "Aldehyde intermediate",
      sideProducts: "Water",
      observations: ["Pungent acidic smell"],
      colorChanges: [{ label: "KMnO4", from: "Purple", to: "Colorless" }],
      mechanism: ["Alcohol oxidized to aldehyde", "Hydrated aldehyde forms", "Further oxidation occurs", "Carboxylic acid produced"],
    }),
    makeReaction("Oxidation of Aldehydes", "Oxidation", "acetaldehyde", "aceticAcid", {
      equation: "RCHO + [O] -> RCOOH",
      reactants: "Aldehyde",
      reagent: "KMnO4 / Tollens’ reagent",
      conditions: "Mild oxidation",
      temperature: "Mild heating",
      majorProduct: "Carboxylic acid",
      sideProducts: "Water",
      observations: ["Color change"],
      colorChanges: [{ label: "Reaction", from: "Varies", to: "Varies" }],
      mechanism: ["Nucleophilic addition of water", "Gem-diol intermediate forms", "Oxidation removes hydrogen", "Acid forms"],
    }),
    makeReaction("Hydrolysis of Nitriles", "Hydrolysis", "acetonitrile", "aceticAcid", {
      equation: "RCN + 2H2O ->[H+] RCOOH + NH3",
      reactants: "Nitrile",
      reagent: "Water",
      catalyst: "Acid/base",
      conditions: "Heating",
      temperature: "Warm",
      majorProduct: "Carboxylic acid",
      sideProducts: "NH3",
      observations: ["Ammonia smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Water attacks nitrile carbon", "Amide intermediate forms", "Further hydrolysis occurs", "Carboxylic acid forms"],
    }),
    makeReaction("Grignard Reagent with CO2", "Nucleophilic Addition", "methylmagnesiumBromide", "aceticAcid", {
      equation: "RMgX + CO2 -> RCOOMgX ->[H3O+] RCOOH",
      reactants: "Grignard reagent",
      reagent: "CO2",
      conditions: "Dry ether",
      temperature: "Low",
      majorProduct: "Carboxylic acid",
      sideProducts: "Mg salts",
      observations: ["Heat evolved"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Carbanion attacks CO2", "Carboxylate intermediate forms", "Acid hydrolysis occurs", "Carboxylic acid obtained"],
    }),
  ],
  chemical: [
    makeReaction("Reaction with Metals", "Acid-Base / Redox", "aceticAcid", "sodiumAcetate", {
      equation: "2RCOOH + 2Na -> 2RCOONa + H2",
      reagent: "Sodium metal",
      conditions: "Room temperature",
      temperature: "Room temperature",
      majorProduct: "Sodium carboxylate",
      sideProducts: "H2 gas",
      observations: ["Effervescence"],
      colorChanges: [{ label: "Sodium", from: "Silvery", to: "Disappears" }],
      mechanism: ["Acid loses proton", "Na donates electron", "Salt forms", "Hydrogen gas evolves"],
    }),
    makeReaction("Esterification", "Nucleophilic Acyl Substitution", "aceticAcid", "ethylAcetate", {
      equation: "RCOOH + R'OH ->[H2SO4] RCOOR' + H2O",
      reactants: "Acid + alcohol",
      catalyst: "Conc. H2SO4",
      conditions: "Heating",
      temperature: "Warm",
      majorProduct: "Ester",
      sideProducts: "Water",
      observations: ["Fruity smell"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["Carbonyl oxygen protonated", "Alcohol attacks carbonyl carbon", "Intermediate rearranges", "Water eliminated forming ester"],
    }),
    makeReaction("Formation of Acid Chloride", "Substitution", "aceticAcid", "acetylChloride", {
      equation: "RCOOH + SOCl2 -> RCOCl + SO2 + HCl",
      reagent: "SOCl2",
      conditions: "Dry conditions",
      temperature: "Room temperature",
      majorProduct: "Acid chloride",
      sideProducts: "SO2, HCl",
      observations: ["White fumes"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Clear" }],
      mechanism: ["OH attacks sulfur atom", "Intermediate forms", "Chloride substitution occurs", "Acid chloride forms"],
    }),
    makeReaction("Decarboxylation", "Elimination", "sodiumAcetate", "methane", {
      equation: "RCOONa + NaOH ->[CaO, Δ] RH + Na2CO3",
      reagent: "Soda lime (NaOH + CaO)",
      conditions: "Heating",
      temperature: "High",
      majorProduct: "Alkane",
      sideProducts: "Na2CO3",
      observations: ["Gas evolution"],
      colorChanges: [{ label: "Reaction", from: "Solid", to: "Solid" }],
      mechanism: ["Carboxylate ion activated", "CO2 removed", "Alkyl anion forms", "Protonation gives alkane"],
    }),
    makeReaction("Hell–Volhard–Zelinsky (HVZ) Reaction", "α-Halogenation", "aceticAcid", "bromoaceticAcid", {
      equation: "RCH2COOH + Br2 ->[P] RCHBrCOOH",
      reagent: "Br2",
      catalyst: "Red phosphorus",
      conditions: "Heat",
      temperature: "Warm",
      majorProduct: "α-Bromo acid",
      sideProducts: "HBr",
      observations: ["Bromine decolorizes"],
      colorChanges: [{ label: "Bromine", from: "Brown", to: "Colorless" }],
      mechanism: ["Acid chloride intermediate forms", "Enolization occurs", "Bromination at α-carbon", "Hydrolysis regenerates acid"],
    }),
  ],
  named: [
    { name: "Hell–Volhard–Zelinsky Reaction", summary: "α-Halogenation of carboxylic acids.", resultCards: [["Reactant", "Acid with α-H"], ["Reagent", "Br2 / Red P"], ["Observation", "Bromine decolorizes"]], reactantModel: "aceticAcid", productModel: "bromoaceticAcid", majorProductModel: "bromoaceticAcid" },
    { name: "Esterification", summary: "Formation of esters from acids and alcohols.", resultCards: [["Reactant", "Acid + Alcohol"], ["Reagent", "H2SO4"], ["Observation", "Fruity smell"]], reactantModel: "aceticAcid", productModel: "ethylAcetate", majorProductModel: "ethylAcetate" },
    { name: "Decarboxylation", summary: "Removal of CO2 from carboxylic acids/salts.", resultCards: [["Reactant", "Sodium carboxylate"], ["Reagent", "Soda lime"], ["Product", "Alkane"]], reactantModel: "sodiumAcetate", productModel: "methane", majorProductModel: "methane" },
    { name: "Kolbe Electrolysis", summary: "Electrolysis of sodium carboxylates to alkanes.", resultCards: [["Reactant", "Sodium carboxylate"], ["Conditions", "Electrolysis"], ["Product", "Alkane + CO2"]], reactantModel: "sodiumAcetate", productModel: "ethane", majorProductModel: "ethane" },
  ],
  tests: [
    { name: "Litmus Test", reagent: "Blue litmus paper", observation: "Blue litmus turns red.", colorChange: "Blue -> Red", interpretation: "Confirms acidic nature." },
    { name: "Sodium Bicarbonate Test", reagent: "NaHCO3", observation: "Brisk effervescence due to CO2.", colorChange: "Clear -> Bubbling", interpretation: "Confirms presence of carboxylic acid group." },
    { name: "Ester Test", reagent: "Alcohol + H2SO4", observation: "Fruity smell.", colorChange: "Clear -> Clear", interpretation: "Confirms carboxylic acid through esterification." },
  ],
  importantOrders: [
    { title: "Acidity", sequence: "HCOOH > CH_3 COOH > C_2 H_5 COOH" },
    { title: "Boiling Point", sequence: "Carboxylic Acid > Alcohol > Aldehyde/Ketone > Ether" }
  ],
  conversions: [
    ["Acid", "Alcohol/H2SO4", "Ester"],
    ["Acid", "SOCl2", "Acid chloride"],
    ["Acid", "LiAlH4", "Alcohol"],
    ["Acid", "Soda lime", "Alkane"],
    ["Acid", "NH3", "Amine"],
  ],
};

const carboxylicAcidPhysical = [
  ["State", "Lower members are liquids"],
  ["Odor", "Pungent sour smell"],
  ["Solubility", "Lower acids soluble in water"],
  ["Boiling Point", "Very high (higher than alcohols)"],
  ["Polarity", "Highly polar"],
  ["Hydrogen Bonding", "Strong dimer formation (RCOOH⋯HOOC-R)"],
  ["Acidity", "Weak acids"],
  ["Reason for High Boiling Point", "Carboxylic acids form strong intermolecular hydrogen bonds, creating dimers."],
];

const genericData = (category) => ({
  preparation: [
    makeReaction(`Preparation of ${category.name}`, "Functional Group Formation", "benzene", "phenol", {
      equation: `${category.formula} precursor + reagent -> ${category.name}`,
      reactants: `${category.name} precursor`,
      reagent: "Chapter-specific reagent",
      catalyst: "As specified in notes",
      majorProduct: category.name,
      observations: ["Clean product formation", "Characteristic functional group behavior observed"],
      colorChanges: [{ label: "Reaction mixture", from: "Initial", to: "Characteristic appearance" }],
    }),
  ],
  chemical: [
    makeReaction(`${category.name} Characteristic Reaction`, "Chemical Property", "phenol", "aceticAcid", {
      equation: `${category.formula} + reagent -> product`,
      reactants: category.name,
      reagent: "Diagnostic reagent",
      majorProduct: "Characteristic derivative",
      minorProduct: "Trace by-product",
      observations: ["Functional group reaction observed", "Result supports identification"],
      colorChanges: [{ label: "Test reagent", from: "Before reaction", to: "After reaction" }],
    }),
  ],
  named: [
    { name: `${category.name} Named Reaction`, summary: "A compact named reaction card for this category.", resultCards: [["Focus", category.formula], ["Output", "Named product"], ["Observation", "Diagnostic change"]], reactantModel: "benzene", productModel: "phenol", majorProductModel: "phenol" },
  ],
  tests: [
    { name: `${category.name} Identification Test`, reagent: "Suitable laboratory reagent", observation: "Positive observation appears", colorChange: "Initial -> positive result", interpretation: `Confirms ${category.name.toLowerCase()} behavior.` },
  ],
  conversions: [
    [category.name, "oxidation / reduction", "Related functional group"],
    [category.name, "substitution", "Derivative"],
    ["Precursor", "specific reagent", category.name],
  ],
});

const amineData = {
  customIntro: {
    title: "Amino Compounds (Amines)",
    molecule: "aniline",
    description: [
      "Amines are organic compounds derived from ammonia (NH₃) by replacement of one or more hydrogen atoms by alkyl or aryl groups.",
      "They are classified into Primary (1°, RNH₂), Secondary (2°, R₂NH), and Tertiary (3°, R₃N) amines based on the number of alkyl/aryl groups.",
      "Amines play a crucial role in biology (amino acids), dyes, medicines, and synthetic polymers."
    ],
    generalFormula: "R-NH₂, R₂NH, R₃N"
  },
  customPhysical: [
    ["State", "Lower amines are gases or liquids; higher amines are solids."],
    ["Odor", "Characteristic fishy smell for lower aliphatic amines."],
    ["Solubility", "Lower amines are highly soluble in water due to hydrogen bonding (RNH₂ ··· H₂O)."],
    ["Boiling Point", "Higher than corresponding non-polar hydrocarbons due to intermolecular H-bonding."],
    ["Polarity", "Amines are polar molecules."],
    ["Basic Nature", "Weak bases because of the lone pair of electrons on the nitrogen atom."]
  ],
  preparation: [
    makeReaction("Ammonolysis of Haloalkanes", "Nucleophilic Substitution (SN2)", "chloromethane", "methylamine", {
      equation: "CH3Cl + NH3 -> CH3NH2 + HCl",
      reactants: "Chloromethane + Ammonia",
      reagent: "Alcoholic Ammonia (NH3)",
      catalyst: "None",
      conditions: "Heating in a sealed tube under pressure",
      temperature: "373 K (100°C)",
      majorProduct: "Methylamine (1° Amine)",
      sideProducts: "HCl, and secondary/tertiary amines",
      observations: ["Characteristic fishy smell of methylamine evolves", "Increase in pressure in the sealed tube"],
      colorChanges: [{ label: "Reaction mixture", from: "Clear colorless", to: "Clear colorless" }],
      mechanism: [
        "Nucleophilic nitrogen of NH3 attacks electrophilic carbon of chloromethane",
        "Transition state forms with partial bonds",
        "Chloride ion leaves to form methylammonium chloride salt",
        "Amine is deprotonated by excess ammonia to yield free methylamine"
      ]
    }),
    makeReaction("Reduction of Nitro Compounds", "Reduction", "nitrobenzene", "aniline", {
      equation: "C6H5NO2 + 6[H] -> C6H5NH2 + 2H2O",
      reactants: "Nitrobenzene",
      reagent: "Sn / HCl or Fe / HCl",
      catalyst: "Acid catalyst (HCl)",
      conditions: "Refluxing in acidic medium",
      temperature: "Warm heating",
      majorProduct: "Aniline (Phenylamine)",
      sideProducts: "Water and Sn/Fe salts",
      observations: ["Oily yellow nitrobenzene layer dissolves", "Darker yellow/brown liquid forms", "Aromatic amine smell"],
      colorChanges: [{ label: "Reaction mixture", from: "Light yellow oil", to: "Dark yellow/amber solution" }],
      mechanism: [
        "Protonation of nitro oxygen by acid",
        "Single-electron transfer from metal (Fe/Sn)",
        "Elimination of water to form nitroso intermediate",
        "Further reduction steps yield aniline product"
      ]
    }),
    makeReaction("Gabriel Phthalimide Synthesis", "Nucleophilic Substitution", "phthalimide", "methylamine", {
      equation: "Phthalimide + KOH + CH3Cl -> N-Methylphthalimide -> CH3NH2 + Phthalic Acid",
      reactants: "Phthalimide + Chloromethane",
      reagent: "KOH followed by Hydrazine or aq. NaOH",
      catalyst: "None",
      conditions: "Alkaline medium",
      temperature: "Moderate heating",
      majorProduct: "Methylamine (1° Aliphatic Amine)",
      sideProducts: "Phthalic acid / Phthalhydrazide",
      observations: ["Formation of potassium phthalimide salt precipitate", "Yields pure primary amine without secondary/tertiary contamination"],
      colorChanges: [{ label: "Precipitation", from: "Clear solution", to: "White solid precipitate" }],
      mechanism: [
        "Deprotonation of phthalimide nitrogen by KOH to form potassium salt",
        "Nucleophilic substitution (SN2) where phthalimide ion attacks chloromethane",
        "N-Methylphthalimide intermediate forms",
        "Hydrolysis or hydrazinolysis cleaves the imide bonds to release primary amine"
      ],
      majorProductModel: "methylamine",
      minorProductModel: null,
      sideProductModel: null
    }),
    makeReaction("Hoffmann Bromamide Reaction", "Rearrangement", "acetamide", "methylamine", {
      equation: "CH3CONH2 + Br2 + 4NaOH -> CH3NH2 + Na2CO3 + 2NaBr + 2H2O",
      reactants: "Acetamide",
      reagent: "Bromine (Br2) in aqueous/alcoholic NaOH",
      catalyst: "None",
      conditions: "Alkaline solution",
      temperature: "340-350 K (Warm heating)",
      majorProduct: "Methylamine (1° Amine with one less carbon)",
      sideProducts: "Na2CO3, NaBr, Water",
      observations: ["Brown color of bromine fades rapidly", "Evolution of amine gas with characteristic odor"],
      colorChanges: [{ label: "Bromine color", from: "Reddish-brown", to: "Colorless" }],
      mechanism: [
        "Base removes a proton from amide nitrogen",
        "Bromination of nitrogen forms N-bromoacetamide",
        "Deprotonation followed by loss of bromide induces alkyl shift (isocyanide rearrangement)",
        "Hydrolysis of isocyanate yields primary amine and carbonate ion"
      ]
    })
  ],
  chemical: [
    makeReaction("Basic Nature", "Acid-Base", "methylamine", "methylammonium", {
      equation: "CH3NH2 + HCl -> CH3NH3+ Cl-",
      reactants: "Methylamine",
      reagent: "Hydrochloric acid (HCl)",
      catalyst: "None",
      conditions: "Room temperature",
      temperature: "298 K (Room Temp)",
      majorProduct: "Methylammonium chloride salt",
      sideProducts: "None",
      observations: ["Formation of dense white fumes on mixing with gaseous HCl", "Litmus turns from red to blue"],
      colorChanges: [{ label: "Litmus", from: "Red", to: "Blue" }],
      mechanism: [
        "Lone pair of nitrogen on methylamine acts as a Brønsted-Lowry base",
        "Attacks the acidic proton of HCl",
        "Salt is formed through electrostatic attraction between methylammonium cation and chloride anion"
      ]
    }),
    makeReaction("Alkylation", "Nucleophilic Substitution", "methylamine", "dimethylamine", {
      equation: "CH3NH2 + CH3Cl -> (CH3)2NH + HCl",
      reactants: "Methylamine",
      reagent: "Chloromethane",
      catalyst: "None",
      conditions: "Warm heating",
      temperature: "Warm",
      majorProduct: "Dimethylamine (2° Amine)",
      sideProducts: "Trimethylamine, Tetramethylammonium chloride",
      observations: ["Progressive change in amine fishy smell", "Consumption of alkyl halide"],
      colorChanges: [{ label: "Reaction flask", from: "Clear", to: "Clear" }],
      mechanism: [
        "Nitrogen lone pair of methylamine attacks carbon of chloromethane",
        "Chloride ion leaves",
        "Intermediate dimethylammonium cation is deprotonated by excess amine to yield dimethylamine"
      ]
    }),
    makeReaction("Acylation", "Nucleophilic Acyl Substitution", "methylamine", "nMethylacetamide", {
      equation: "CH3NH2 + CH3COCl -> CH3CONHCH3 + HCl",
      reactants: "Methylamine",
      reagent: "Acetyl chloride or Acetic anhydride",
      catalyst: "Base (e.g. Pyridine to absorb HCl)",
      conditions: "Anhydrous medium",
      temperature: "Room temperature",
      majorProduct: "N-Methylacetamide (substituted amide)",
      sideProducts: "HCl (or acetic acid)",
      observations: ["Vigorous reaction with release of heat", "White precipitate of pyridine-HCl salt if base is used"],
      colorChanges: [{ label: "Reaction", from: "Clear liquid", to: "Clear or cloudy solid salt" }],
      mechanism: [
        "Amine nitrogen attacks carbonyl carbon of acetyl chloride",
        "Tetrahedral intermediate forms",
        "Carbonyl double bond reforms, chlorine leaves as chloride ion",
        "Deprotonation of nitrogen yields stable N-methylacetamide"
      ]
    }),
    makeReaction("Carbylamine Reaction", "Carbene Mechanism", "methylamine", "methylIsocyanide", {
      equation: "CH3NH2 + CHCl3 + 3KOH -> CH3NC + 3KCl + 3H2O",
      reactants: "Methylamine",
      reagent: "Chloroform (CHCl3) + alcoholic KOH",
      catalyst: "None",
      conditions: "Heating in alkaline solution",
      temperature: "Warm heating",
      majorProduct: "Methyl isocyanide (foul-smelling compound)",
      sideProducts: "KCl, Water",
      observations: ["Development of extremely offensive, characteristic foul smell", "Positive test for primary amines only"],
      colorChanges: [{ label: "Reaction", from: "Clear", to: "Slightly cloudy" }],
      mechanism: [
        "Base deprotonates chloroform to generate highly reactive dichlorocarbene (:CCl2) intermediate",
        "Primary amine nitrogen attacks dichlorocarbene",
        "Sequential dehydrochlorination steps occur",
        "Highly polar, foul-smelling methyl isocyanide is formed"
      ]
    }),
    makeReaction("Diazotization", "Electrophilic Substitution", "aniline", "diazonium", {
      equation: "C6H5NH2 + NaNO2 + 2HCl -> C6H5N2+ Cl- + NaCl + 2H2O",
      reactants: "Aniline",
      reagent: "Sodium nitrite (NaNO2) + Hydrochloric acid (HCl)",
      catalyst: "None",
      conditions: "Ice-cold conditions to prevent diazonium decomposition",
      temperature: "273-278 K (0-5°C)",
      majorProduct: "Benzenediazonium chloride salt",
      sideProducts: "NaCl, Water",
      observations: ["Dissolution of aniline to form a clear yellow-tinged diazonium solution", "No gas evolution (evolution of gas indicates decomposition)"],
      colorChanges: [{ label: "Aniline solution", from: "Milky suspension/pale oil", to: "Clear light yellow solution" }],
      mechanism: [
        "Acid reacts with NaNO2 to form nitrous acid (HNO2), which is protonated to form nitrosonium ion (NO+)",
        "Nucleophilic attack of aniline nitrogen on nitrosonium ion",
        "Proton transfer and dehydration forms diazonium cation",
        "Resonance stabilization keeps it stable at low temperatures"
      ]
    })
  ],
  namedReactions: [
    { name: "Hoffmann Bromamide Reaction", summary: "Preparation of amines from amides with one carbon less.", resultCards: [["Reactant", "Acetamide"], ["Reagent", "Br₂/NaOH"], ["Product", "Methylamine"]], reactantModel: "acetamide", productModel: "methylamine", majorProductModel: "methylamine" },
    { name: "Gabriel Phthalimide Synthesis", summary: "Preparation of primary aliphatic amines from phthalimide.", resultCards: [["Reactant", "Phthalimide"], ["Reagent", "CH₃Cl + Base"], ["Product", "Methylamine"]], reactantModel: "phthalimide", productModel: "methylamine", majorProductModel: "methylamine" },
    { name: "Carbylamine Reaction", summary: "Test for primary amines yielding a foul-smelling isocyanide.", resultCards: [["Reactant", "Methylamine"], ["Reagent", "CHCl₃/KOH"], ["Observation", "Foul Smell"]], reactantModel: "methylamine", productModel: "methylIsocyanide", majorProductModel: "methylIsocyanide" },
    { name: "Diazotization", summary: "Formation of diazonium salts from primary aromatic amines.", resultCards: [["Reactant", "Aniline"], ["Reagent", "NaNO₂/HCl (Cold)"], ["Product", "Benzenediazonium Cl⁻"]], reactantModel: "aniline", productModel: "diazonium", majorProductModel: "diazonium" },
    { name: "Sandmeyer Reaction", summary: "Diazonium salt converted into halo compounds.", resultCards: [["Reactant", "Benzenediazonium chloride"], ["Reagent", "CuCl/HCl"], ["Product", "Chlorobenzene"]], reactantModel: "diazonium", productModel: "chlorobenzene", majorProductModel: "chlorobenzene" }
  ],
  tests: [
    { name: "Carbylamine Test", reagent: "Chloroform (CHCl3) + alcoholic KOH", observation: "Extremely offensive, foul smell of isocyanide is evolved.", colorChange: "Clear colorless -> Slightly turbid liquid with strong smell", interpretation: "Positive only for primary (1°) aliphatic and aromatic amines. Confirms presence of -NH2 group." },
    { name: "Hinsberg Test", reagent: "Benzenesulfonyl chloride + aq. NaOH", observation: "1° amine forms a precipitate soluble in NaOH. 2° amine forms a precipitate insoluble in NaOH. 3° amine does not react.", colorChange: "Clear solution -> Precipitate behaves differently in base", interpretation: "Differentiates between primary, secondary, and tertiary amines." },
    { name: "Nitrous Acid Test", reagent: "Nitrous acid (NaNO2 + dilute HCl) cold", observation: "1° aliphatic amine: brisk effervescence of N2 gas. 1° aromatic amine: stable diazonium salt (no gas). 2° amine: yellow oily nitrosamine.", colorChange: "Clear -> Bubbling gas (1°) or Yellow oily layer (2°)", interpretation: "Confirms amine class based on aromaticity and degree (1° vs 2°)." },
    { name: "Litmus Test", reagent: "Red litmus paper", observation: "Red litmus paper turns blue immediately upon contact with the amine solution.", colorChange: "Red -> Blue", interpretation: "Indicates the basic nature of amines due to the lone pair of electrons on the nitrogen atom." }
  ],
  importantOrders: [
    { title: "Basic Strength (Aqueous)", sequence: "2^∘ > 1^∘ > 3^∘ > NH_3" },
    { title: "Basicity", sequence: "Aliphatic amines > Aromatic amines" }
  ],
  conversions: [
    ["Nitro compound", "Sn/HCl", "Amine"],
    ["Amine", "HNO₂", "Alcohol"],
    ["Amine", "NaNO₂/HCl", "Diazonium salt"],
    ["Amine", "Acid chloride", "Amide"],
    ["Amine", "CHCl₃/KOH", "Isocyanide"]
  ]
};

const azoData = {
  customIntro: {
    title: "Azo Compounds",
    molecule: "azobenzene",
    description: [
      "Azo compounds are organic compounds containing the azo functional group (-N=N-) connecting two carbon-containing groups, usually aromatic rings.",
      "The extended conjugation through the nitrogen double bond creates highly colored compounds, typically yellow, orange, or red.",
      "They are extensively used as textile dyes, acid-base indicators (like methyl orange), food colorants, and printing inks."
    ],
    generalFormula: "Ar-N=N-Ar'"
  },
  customPhysical: [
    ["State", "Colored crystalline solids."],
    ["Color", "Yellow, orange, or red due to the -N=N- chromophore absorbing visible light."],
    ["Odor", "Mild aromatic odor."],
    ["Solubility", "Insoluble in water, soluble in organic solvents."],
    ["Polarity", "Moderately polar molecules."]
  ],
  preparation: [
    makeReaction("Diazotization followed by Coupling", "Electrophilic Aromatic Substitution", "diazonium", "pHydroxyazobenzene", {
      equation: "C6H5N2+Cl- + C6H5OH -> p-C6H5-N=N-C6H5-OH + HCl",
      reactants: "Benzenediazonium chloride + Phenol",
      reagent: "Sodium hydroxide (NaOH) for alkaline medium",
      catalyst: "Base",
      conditions: "Ice-cold alkaline solution",
      temperature: "273-278 K (0-5°C)",
      majorProduct: "p-Hydroxyazobenzene (Orange dye)",
      sideProducts: "NaCl, Water",
      observations: ["Immediate formation of a bright orange-red crystalline precipitate", "Highly characteristic of coupling test"],
      colorChanges: [{ label: "Coupling reaction", from: "Clear yellow solution", to: "Intense orange/red precipitate" }],
      mechanism: [
        "Phenol is converted to highly activated phenoxide ion by NaOH",
        "Electrophilic diazonium ion attacks the para position of the phenoxide ring",
        "Sigma complex intermediate forms",
        "Deprotonation restores aromaticity, yielding the conjugated orange azo dye"
      ]
    }),
    makeReaction("Oxidation of Hydrazobenzene", "Oxidation", "hydrazobenzene", "azobenzene", {
      equation: "C6H5-NH-NH-C6H5 + [O] -> C6H5-N=N-C6H5 + H2O",
      reactants: "Hydrazobenzene",
      reagent: "Sodium hypochlorite (NaOCl) or air oxidation",
      catalyst: "None",
      conditions: "Mild basic conditions",
      temperature: "Room temperature",
      majorProduct: "Azobenzene",
      sideProducts: "Water",
      observations: ["Colorless or white hydrazobenzene solid turns into bright orange-red crystals", "Precipitation of azobenzene"],
      colorChanges: [{ label: "Reaction", from: "Colorless", to: "Bright orange-red" }],
      mechanism: [
        "Base abstracts proton from hydrazine nitrogen of hydrazobenzene",
        "Oxidizing agent abstracts hydride or accepts electrons",
        "Formation of nitrogen-nitrogen double bond (N=N)",
        "Highly stable, conjugated azobenzene forms"
      ]
    }),
    makeReaction("Controlled Reduction of Nitro Compounds", "Reduction", "nitrobenzene", "azobenzene", {
      equation: "2C6H5NO2 + 4Zn + 8NaOH -> C6H5-N=N-C6H5 + 4Na2ZnO2 + 4H2O",
      reactants: "Nitrobenzene",
      reagent: "Zinc dust in aqueous/alcoholic NaOH",
      catalyst: "None",
      conditions: "Alkaline reduction medium",
      temperature: "Boiling / Refluxing",
      majorProduct: "Azobenzene",
      sideProducts: "Sodium zincate, Water",
      observations: ["Yellow nitrobenzene oil react with zinc and dissolves", "Formation of orange crystals on cooling"],
      colorChanges: [{ label: "Reaction mixture", from: "Yellow oil + grey zinc", to: "Deep orange solution/solid" }],
      mechanism: [
        "Nitrobenzene is partially reduced to nitrosobenzene and phenylhydroxylamine",
        "In alkaline medium, these two intermediates rapidly condense to form azoxybenzene",
        "Further reduction of azoxybenzene by Zinc/NaOH removes the oxygen to yield azobenzene"
      ]
    })
  ],
  chemical: [
    makeReaction("Reduction", "Reductive Cleavage", "azobenzene", "aniline", {
      equation: "C6H5-N=N-C6H5 + 4[H] -> 2 C6H5NH2",
      reactants: "Azobenzene",
      reagent: "Tin (Sn) / HCl or Zinc / HCl or Na2S2O4",
      catalyst: "Acid catalyst",
      conditions: "Boiling acidic medium",
      temperature: "Heat",
      majorProduct: "Aniline (Phenylamine)",
      sideProducts: "None",
      observations: ["Decolorization of the orange azobenzene solution", "Disappearance of the bright dye color"],
      colorChanges: [{ label: "Cleavage reaction", from: "Orange-red solution", to: "Colorless solution" }],
      mechanism: [
        "Protonation of azo nitrogens by acid",
        "Reduction of the N=N double bond to N-N single bond (hydrazobenzene)",
        "Further reduction protonates the nitrogen atoms and cleaves the single N-N bond",
        "Produces two molecules of protonated aniline"
      ]
    }),
    makeReaction("Electrophilic Substitution", "Electrophilic Substitution", "azobenzene", "pBromoazobenzene", {
      equation: "C6H5-N=N-C6H5 + Br2 -> p-Bromoazobenzene + HBr",
      reactants: "Azobenzene",
      reagent: "Bromine in acetic acid",
      catalyst: "FeBr3 or Lewis Acid",
      conditions: "Warm heating",
      temperature: "Warm",
      majorProduct: "p-Bromoazobenzene",
      sideProducts: "HBr",
      observations: ["Bromine reddish-brown color slowly fades", "Formation of brominated dye product"],
      colorChanges: [{ label: "Bromine solution", from: "Reddish-brown", to: "Light orange" }],
      mechanism: [
        "Generation of Br+ electrophile by catalyst",
        "Electrophilic attack at the para position of one of the benzene rings of azobenzene",
        "Sigma complex intermediate formed",
        "Deprotonation restores aromaticity, yielding p-bromoazobenzene"
      ]
    }),
    makeReaction("Azo Coupling", "Electrophilic Aromatic Substitution", "diazonium", "pHydroxyazobenzene", {
      equation: "C6H5N2+Cl- + C6H5OH -> p-C6H5-N=N-C6H5-OH + HCl",
      reactants: "Benzenediazonium chloride + Phenol",
      reagent: "NaOH",
      catalyst: "Base",
      conditions: "Ice-cold alkaline solution",
      temperature: "273-278 K (0-5°C)",
      majorProduct: "p-Hydroxyazobenzene (Orange dye)",
      sideProducts: "NaCl, Water",
      observations: ["Immediate precipitation of a bright orange-red dye solid", "Fading of the diazonium pale yellow color"],
      colorChanges: [{ label: "Coupling", from: "Pale yellow solution", to: "Intense orange-red precipitate" }],
      mechanism: [
        "Phenol reacts with NaOH to form phenoxide ion",
        "Electrophilic benzenediazonium ion attacks the nucleophilic para carbon of phenoxide",
        "Resonance-stabilized intermediate loses a proton",
        "Highly conjugated orange-red p-hydroxyazobenzene precipitate is formed"
      ]
    })
  ],
  namedReactions: [
    { name: "Diazotization Reaction", summary: "Formation of diazonium salts from aromatic amines.", resultCards: [["Reactant", "Aniline"], ["Reagent", "NaNO₂/HCl (Cold)"], ["Product", "Benzenediazonium chloride"]], reactantModel: "aniline", productModel: "diazonium", majorProductModel: "diazonium" },
    { name: "Azo Coupling Reaction", summary: "Coupling of diazonium salts with activated rings.", resultCards: [["Reactant", "Benzenediazonium Cl + Phenol"], ["Conditions", "Cold, alkaline"], ["Product", "p-Hydroxyazobenzene"]], reactantModel: "diazonium", productModel: "pHydroxyazobenzene", majorProductModel: "pHydroxyazobenzene" }
  ],
  tests: [
    { name: "Dye Test", reagent: "Cold Diazotization followed by coupling with Alkaline β-naphthol", observation: "Formation of a highly brilliant, intense red/scarlet dye precipitate.", colorChange: "Pale yellow solution -> Bright scarlet red precipitate", interpretation: "Confirms the presence of a primary aromatic amine group, forming an azo dye." },
    { name: "Reduction Test", reagent: "Strong reducing agents (Sn/HCl or zinc dust)", observation: "The vibrant orange-red color of the azo compound disappears entirely upon heating.", colorChange: "Orange-red -> Colorless solution", interpretation: "Confirms presence of -N=N- azo bond which is reductively cleaved to colorless aniline." },
    { name: "Coupling Test", reagent: "Benzenediazonium chloride + Phenol in dilute NaOH", observation: "Immediate formation of a bright orange precipitate of p-hydroxyazobenzene.", colorChange: "Clear yellow diazonium solution -> Intense orange precipitate", interpretation: "Confirms coupling capability and presence of azo chromophore." }
  ],
  importantOrders: [
    { title: "Coupling Reactivity", sequence: "Phenol > Aniline > Benzene", note: "Because phenol and aniline strongly activate the aromatic ring." }
  ],
  conversions: [
    ["Aniline", "NaNO₂/HCl", "Diazonium salt"],
    ["Diazonium salt", "Phenol/aniline", "Azo dye"],
    ["Azo compound", "Sn/HCl", "Amine"],
    ["Nitrobenzene", "Zn/NaOH", "Azobenzene"]
  ]
};


export const getCategoryContent = (slug) => {
  const category = categories.find((item) => item.slug === slug) || categories[0];
  let specific;
  let customIntro = null;
  let customPhysical = sharedPhysical;

  if (slug === "haloalkanes") {
    specific = haloalkaneData;
    customIntro = {
      definition: "Haloalkanes are organic compounds in which one or more hydrogen atoms of an alkane are replaced by a halogen atom (F, Cl, Br, I).",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Contains an alkyl group bonded to a halogen", "Polar C–X bond", "Undergoes substitution and elimination reactions"],
      importance: ["Used as solvents", "Refrigerants", "Chemical intermediates", "Pharmaceuticals", "Pesticides"],
      molecule: "chloromethane",
    };
  } else if (slug === "haloarenes") {
    specific = haloareneData;
    customPhysical = haloarenePhysical;
    customIntro = {
      definition: "Haloarenes are aromatic compounds in which one or more hydrogen atoms attached directly to an aromatic ring are replaced by halogens (F, Cl, Br, I).",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Features: Halogen directly attached to sp² carbon", "Lone pair participates in resonance", "Result: Partial double bond character", "Stronger bond, less reactivity"],
      importance: ["Used in pharmaceuticals", "Dyes", "Pesticides", "Organic synthesis", "Solvents"],
      molecule: "chlorobenzene",
    };
  } else if (slug === "alcohols") {
    specific = alcoholData;
    customPhysical = alcoholPhysical;
    customIntro = {
      definition: "Alcohols are organic compounds containing one or more hydroxyl groups (-OH) attached to a saturated carbon atom.",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Monohydric, Dihydric, Trihydric", "Primary (1°), Secondary (2°), Tertiary (3°)"],
      importance: ["Solvents", "Fuels", "Medicines", "Sanitizers", "Perfumes", "Antifreeze"],
      molecule: "ethanol",
    };
  } else if (slug === "phenols") {
    specific = phenolData;
    customPhysical = phenolPhysical;
    customIntro = {
      definition: "Phenols are aromatic organic compounds in which the hydroxyl group (-OH) is directly attached to an aromatic benzene ring.",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Oxygen lone pair participates in resonance with benzene ring", "O–H bond becomes more polar", "Phenol becomes more acidic than alcohols"],
      importance: ["Disinfectants", "Dyes", "Explosives", "Pharmaceuticals", "Bakelite plastic manufacture"],
      molecule: "phenol",
    };
  } else if (slug === "ethers") {
    specific = ethersData;
    customPhysical = ethersPhysical;
    customIntro = {
      definition: "Ethers are organic compounds in which an oxygen atom is bonded to two alkyl or aryl groups.",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Simple ether", "Mixed ether", "Aromatic ether"],
      importance: ["Solvents", "Anesthetics", "Organic synthesis", "Perfumes", "Fuel additives"],
      molecule: "diethylEther",
    };
  } else if (slug === "aldehydes") {
    specific = aldehydeData;
    customPhysical = aldehydePhysical;
    customIntro = {
      definition: "Aldehydes are organic compounds containing the aldehydic functional group (-CHO).",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Carbonyl carbon is bonded to one hydrogen atom and one alkyl/aryl group"],
      importance: ["Preservatives", "Perfumes", "Resins", "Pharmaceuticals", "Organic synthesis"],
      molecule: "formaldehyde",
    };
  } else if (slug === "ketones") {
    specific = ketoneData;
    customPhysical = ketonePhysical;
    customIntro = {
      definition: "Ketones are organic compounds containing the carbonyl functional group (>C=O) bonded to two alkyl or aryl groups.",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Less reactive than aldehydes due to steric hindrance and +I effect of two alkyl groups"],
      importance: ["Solvents", "Nail polish remover", "Pharmaceuticals", "Perfumes", "Organic synthesis"],
      molecule: "acetone",
    };
  } else if (slug === "carboxylic-acids") {
    specific = carboxylicAcidData;
    customPhysical = carboxylicAcidPhysical;
    customIntro = {
      definition: "Carboxylic acids are organic compounds containing the carboxyl functional group (-COOH), consisting of a carbonyl group and a hydroxyl group attached to the same carbon atom.",
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Aliphatic acid", "Aromatic acid", "Dicarboxylic acid"],
      importance: ["Vinegar manufacture", "Food preservatives", "Pharmaceuticals", "Polymers", "Dyes"],
      molecule: "benzoicAcid",
    };
  } else if (slug === "amines") {
    specific = { 
      preparation: amineData.preparation, 
      chemical: amineData.chemical, 
      named: amineData.namedReactions, 
      tests: amineData.tests,
      conversions: amineData.conversions,
      importantOrders: amineData.importantOrders,
    };
    customPhysical = amineData.customPhysical;
    customIntro = {
      definition: amineData.customIntro.description.join(" "),
      generalFormula: amineData.customIntro.generalFormula,
      examples: category.examples,
      classifications: ["Primary (1°)", "Secondary (2°)", "Tertiary (3°)"],
      importance: ["Medicines", "Dyes", "Explosives", "Amino acids", "Pharmaceuticals", "Synthetic polymers"],
      molecule: amineData.customIntro.molecule,
    };
  } else if (slug === "azo-compounds") {
    specific = { 
      preparation: azoData.preparation, 
      chemical: azoData.chemical, 
      named: azoData.namedReactions, 
      tests: azoData.tests,
      conversions: azoData.conversions,
      importantOrders: azoData.importantOrders,
    };
    customPhysical = azoData.customPhysical;
    customIntro = {
      definition: azoData.customIntro.description.join(" "),
      generalFormula: azoData.customIntro.generalFormula,
      examples: category.examples,
      classifications: ["Highly colored compounds", "Contains -N=N- chromophore"],
      importance: ["Textile dyes", "Acid-base indicators", "Food colorants", "Printing inks", "Pharmaceuticals"],
      molecule: azoData.customIntro.molecule,
    };
  } else {
    specific = genericData(category);
  }

  return {
    ...category,
    introduction: customIntro || {
      definition: `${category.name} are organic compounds identified by the ${category.formula} functional pattern.`,
      generalFormula: category.formula,
      examples: category.examples,
      classifications: ["Primary", "Secondary", "Tertiary", "Aromatic or aliphatic variants"],
      importance: ["Organic synthesis", "Laboratory identification", "Industrial and pharmaceutical relevance"],
      molecule: slug === "haloarenes" || slug === "phenols" || slug === "azo-compounds" ? "benzene" : "ethanol",
    },
    physical: customPhysical,
    ...specific,
  };
};

export const applyCustomBondOrders = (model) => {
  if (!model || !model.atoms) return;
  const atoms = model.atoms;
  
  const getDistance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  // Helper to find all unique 6-membered carbon rings
  const findBenzeneRings = (atomList) => {
    const rings = [];
    const carbons = atomList.map((atom, i) => atom.elem === "C" ? i : -1).filter(i => i !== -1);
    const cNeighbors = {};
    carbons.forEach(idx => {
      cNeighbors[idx] = atomList[idx].bonds.filter(bondedIdx => atomList[bondedIdx].elem === "C");
    });

    const visited = new Set();
    
    const dfs = (start, current, path) => {
      if (path.length === 6) {
        if (cNeighbors[current] && cNeighbors[current].includes(start)) {
          const cycle = [...path];
          const minVal = Math.min(...cycle);
          const minIdx = cycle.indexOf(minVal);
          let normalized = [...cycle.slice(minIdx), ...cycle.slice(0, minIdx)];
          if (normalized[1] > normalized[5]) {
            normalized = [normalized[0], ...normalized.slice(1).reverse()];
          }
          const key = normalized.join(",");
          if (!visited.has(key)) {
            visited.add(key);
            rings.push(normalized);
          }
        }
        return;
      }

      if (!cNeighbors[current]) return;
      for (const neighbor of cNeighbors[current]) {
        if (!path.includes(neighbor)) {
          dfs(start, neighbor, [...path, neighbor]);
        }
      }
    };

    for (const c of carbons) {
      dfs(c, c, [c]);
    }
    return rings;
  };

  // 1. Existing distance-based custom bond orders
  atoms.forEach((atom, idx) => {
    if (!atom.bonds) return;
    
    atom.bonds.forEach((bondedIdx, bListIdx) => {
      if (idx >= bondedIdx) return;
      
      const partner = atoms[bondedIdx];
      const dist = getDistance(atom, partner);
      let order = 1;

      const elementPair = [atom.elem, partner.elem].sort().join("");

      if (elementPair === "CC") {
        if (dist < 1.25) {
          order = 3; // Triple bond C#C
        } else if (dist < 1.35) {
          order = 2; // Double bond C=C
        }
      } else if (elementPair === "CO") {
        if (dist < 1.26) {
          order = 2; // Double bond C=O
        }
      } else if (elementPair === "CN") {
        if (dist < 1.18) {
          order = 3; // Triple bond C#N
        } else if (dist < 1.32) {
          order = 2; // Double bond C=N
        }
      } else if (elementPair === "NN") {
        if (dist < 1.15) {
          order = 3; // Triple bond N#N
        } else if (dist < 1.30) {
          order = 2; // Double bond N=N
        }
      } else if (elementPair === "NO") {
        if (dist < 1.26) {
          order = 2; // Double bond N=O
        }
      } else if (elementPair === "OS") {
        if (dist < 1.48) {
          order = 2; // Double bond S=O
        }
      }

      if (order > 1) {
        atom.bondOrder[bListIdx] = order;
        const partnerBListIdx = partner.bonds.indexOf(idx);
        if (partnerBListIdx !== -1) {
          partner.bondOrder[partnerBListIdx] = order;
        }
      }
    });
  });

  // 2. Dynamic alternate double bonds for all 6-membered carbon rings
  const rings = findBenzeneRings(atoms);
  rings.forEach(ring => {
    // Alternating double (2) and single (1) bonds along the cycle
    for (let i = 0; i < 6; i++) {
      const u = ring[i];
      const v = ring[(i + 1) % 6];
      const order = (i % 2 === 0) ? 2 : 1;

      const uBondIdx = atoms[u].bonds.indexOf(v);
      if (uBondIdx !== -1) {
        atoms[u].bondOrder[uBondIdx] = order;
      }

      const vBondIdx = atoms[v].bonds.indexOf(u);
      if (vBondIdx !== -1) {
        atoms[v].bondOrder[vBondIdx] = order;
      }
    }
  });
};

export const getSerializedTopicContent = (slug) => {
  try {
    const content = getCategoryContent(slug);
    if (!content) return `Topic: ${slug}`;
    
    let text = `Topic: ${content.name || slug}\n`;
    if (content.formula) text += `General Formula: ${content.formula}\n`;
    
    if (content.introduction) {
      const intro = content.introduction;
      text += `Introduction: ${intro.definition || ""}\n`;
      if (intro.classifications) text += `Classifications: ${intro.classifications.join(", ")}\n`;
      if (intro.importance) text += `Importance: ${intro.importance.join(", ")}\n`;
    }
    
    if (content.preparation && Array.isArray(content.preparation)) {
      text += `Preparation Methods:\n`;
      content.preparation.forEach(p => {
        text += `- ${p.title}: ${p.equation || ""} | Description: ${p.description || ""}\n`;
      });
    }
    
    if (content.physical) {
      text += `Physical Properties: ${content.physical.state || ""} | Boiling Point: ${content.physical.boilingPoint || ""} | Solubility: ${content.physical.solubility || ""}\n`;
    }
    
    if (content.chemical && Array.isArray(content.chemical)) {
      text += `Chemical Properties:\n`;
      content.chemical.forEach(c => {
        text += `- ${c.title}: ${c.equation || ""} | Description: ${c.description || ""}\n`;
      });
    }
    
    if (content.importantOrders && Array.isArray(content.importantOrders)) {
      text += `Important Properties and Reactivity Orders:\n`;
      content.importantOrders.forEach(o => {
        text += `- ${o.title}: Trend: ${o.trend || ""} | Explanation: ${o.explanation || ""}\n`;
      });
    }
    
    if (content.named && Array.isArray(content.named)) {
      text += `Named Reactions:\n`;
      content.named.forEach(n => {
        text += `- ${n.title}: ${n.reaction || ""} | Mechanism: ${n.mechanism || ""}\n`;
      });
    }
    
    if (content.tests && Array.isArray(content.tests)) {
      text += `Diagnostic Tests:\n`;
      content.tests.forEach(t => {
        text += `- ${t.name}: Reagent: ${t.reagent || ""} | Observation: ${t.observation || ""}\n`;
      });
    }
    
    if (content.conversions && Array.isArray(content.conversions)) {
      text += `Organic Conversions:\n`;
      content.conversions.forEach(cv => {
        text += `- ${cv.title}: ${cv.steps || ""}\n`;
      });
    }
    
    return text;
  } catch (e) {
    return `Topic: ${slug}`;
  }
};


