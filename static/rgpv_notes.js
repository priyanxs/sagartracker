// =============================================================================
// APERTU — OFFICIAL RGPV B.TECH CSE SEMESTER NOTES & QUESTION BANK VAULT
// Curated for Priyanshu Kushwaha (CSE Core • SISTec Bhopal)
// Styled to match the Apertu Notebook / Scrapbook Aesthetic
// =============================================================================

const RGPV_NOTES_DATABASE = [
  {
    "code": "BT-101",
    "title": "Engineering Chemistry",
    "year": 1,
    "sem": 1,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Water Analysis & Softening (Hardness, EDTA titration, Zeolite & Ion-exchange)",
      "Unit II: Boiler Troubles & Treatment (Scale & Sludge, Priming & Foaming, Caustic Embrittlement)",
      "Unit III: Lubricants & Lubrication (Viscosity Index, Flash & Fire point, Mechanism)",
      "Unit IV: Polymers & Polymerization (Thermosetting vs Thermoplastic, Conducting Polymers)",
      "Unit V: Phase Rule & Spectroscopy (One component water system, UV-Vis, Beer-Lambert's Law)"
    ],
    "formulas": [
      "Total Hardness (ppm as CaCO3 eq) = (Vol of EDTA x M of EDTA x 100 x 1000) / Vol of water sample",
      "Viscosity Index (V.I.) = [(L - U) / (L - H)] x 100 (where L=low VI oil, H=high VI oil, U=sample oil)",
      "Beer-Lambert's Law: A = log10(I0 / I) = \u03b5 x c x l (where \u03b5=molar absorptivity, c=concentration, l=path length)",
      "Gibbs Phase Rule: F = C - P + 2 (Condensed system: F = C - P + 1)"
    ],
    "qa": [
      {
        "q": "Explain the Zeolite (Permutit) process for water softening with a neat diagram, chemical reactions, and its advantages & disadvantages. [7 Marks]",
        "a": "<b>Principle:</b> Zeolite is hydrated sodium alumino silicate, Na2O.Al2O3.xSiO2.yH2O, denoted as Na2Ze. When hard water passes through a bed of sodium zeolite, Ca2+ and Mg2+ ions replace Na+ ions.<br><b>Reactions:</b><br>\u2022 Na2Ze + Ca(HCO3)2 \u2192 CaZe + 2NaHCO3<br>\u2022 Na2Ze + MgSO4 \u2192 MgZe + Na2SO4<br>\u2022 Na2Ze + CaCl2 \u2192 CaZe + 2NaCl<br><b>Regeneration:</b> Once exhausted, the zeolite bed is regenerated using a 10% brine (NaCl) solution:<br>CaZe / MgZe + 2NaCl \u2192 Na2Ze + CaCl2 / MgCl2 (washings led to drain).<br><b>Advantages:</b> (1) Hardness reduced to <10 ppm, (2) Compact equipment, (3) No sludge formation.<br><b>Disadvantages:</b> (1) High sodium content in softened water, (2) Cannot treat turbid or acidic water without pretreatment."
      },
      {
        "q": "What are boiler troubles? Differentiate between Scales and Sludges. What are the methods of scale prevention? [7 Marks]",
        "a": "<b>Boiler Troubles:</b> Impurities in feed water precipitate inside boilers causing operational failure.<br><b>Comparison:</b><br>\u2022 <i>Sludge:</i> Soft, loose, slimy precipitate formed in colder boiler zones (caused by MgCO3, MgCl2, CaCl2). Easily removed by blow-down.<br>\u2022 <i>Scale:</i> Hard, adherent coating formed on inner heated surfaces (caused by CaSO4, CaSiO3, Mg(OH)2). Difficult to remove and acts as a thermal insulator causing tube explosion.<br><b>Prevention Methods:</b><br>1. <i>Internal Treatment:</i> Calgon conditioning (Na2[Na4(PO3)6]), Phosphate conditioning (forming loose calcium phosphate), Colloidal conditioning (tannin, agar-agar).<br>2. <i>External Treatment:</i> Lime-soda, Ion-exchange demineralization."
      },
      {
        "q": "Explain the mechanism of Thin-Film (Boundary) and Thick-Film (Hydrodynamic) lubrication. [7 Marks]",
        "a": "<b>1. Thick-Film (Fluid Film/Hydrodynamic) Lubrication:</b> Moving surfaces are separated by a thick lubricant layer (>1000 \u00c5). Friction is solely due to internal viscosity of the lubricant. Applied in heavy machines with low loads and high speeds (e.g. steam turbines, journal bearings).<br><b>2. Thin-Film (Boundary) Lubrication:</b> Under high load or slow speed, the liquid film breaks and a monomolecular or bimolecular layer adsorbs onto metal asperities via physical adsorption or chemical bonding. Lubricants must have high oiliness and active polar groups (e.g., vegetable oils, graphite, molybdenum disulfide)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Describe the Ion-Exchange (Demineralization) process with ion-exchange reactions and bed regeneration."
      },
      {
        "year": "June 2024",
        "q": "State Beer-Lambert's law. What are its limitations in spectrophotometric estimation?"
      },
      {
        "year": "Dec 2023",
        "q": "Write short notes on: (a) Conducting polymers (Polyacetylene), (b) Caustic embrittlement and its prevention."
      },
      {
        "year": "June 2023",
        "q": "Explain proximate and ultimate analysis of coal and derive Dulong's formula for calorific value."
      },
      {
        "year": "Dec 2022",
        "q": "Apply Gibbs Phase Rule to single-component water system and explain triple point."
      }
    ]
  },
  {
    "code": "BT-102",
    "title": "Engineering Mathematics - I",
    "year": 1,
    "sem": 1,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Differential Calculus (Maclaurin's & Taylor's expansion, Indeterminate forms, Asymptotes)",
      "Unit II: Partial Differentiation & Applications (Euler's Theorem for homogeneous functions, Maxima & Minima, Jacobians)",
      "Unit III: Integral Calculus (Definite integrals, Beta & Gamma functions, Multiple Integrals, Dirichlet's Integral)",
      "Unit IV: Vector Calculus (Gradient, Divergence, Curl, Line & Surface integrals, Gauss Divergence & Stokes Theorem)",
      "Unit V: Linear Algebra & Matrices (Rank by Echelon form, System of linear equations, Eigenvalues & Eigenvectors, Cayley-Hamilton Theorem)"
    ],
    "formulas": [
      "Maclaurin Series: f(x) = f(0) + x f'(0) + (x^2 / 2!) f''(0) + ... + (x^n / n!) f^(n)(0)",
      "Euler's Theorem: x(\u2202u/\u2202x) + y(\u2202u/\u2202y) = n u (for homogeneous function u of degree n)",
      "Jacobian: J = \u2202(u,v)/\u2202(x,y) = |(\u2202u/\u2202x, \u2202u/\u2202y); (\u2202v/\u2202x, \u2202v/\u2202y)|",
      "Beta-Gamma Relation: B(m, n) = [\u0393(m) \u0393(n)] / \u0393(m + n); \u0393(1/2) = \u221a\u03c0",
      "Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation |A - \u03bbI| = 0",
      "Gauss Divergence Theorem: \u222c_S (F \u00b7 n\u0302) dS = \u222d_V (\u2207 \u00b7 F) dV"
    ],
    "qa": [
      {
        "q": "State and prove Cayley-Hamilton Theorem. Verify it for matrix A = [[1, 4], [2, 3]] and hence find A^-1. [7 Marks]",
        "a": "<b>Statement:</b> Every square matrix satisfies its own characteristic equation, i.e., if p(\u03bb) = det(A - \u03bbI) = 0 is the characteristic polynomial, then p(A) = 0.<br><b>Verification for A = [[1, 4], [2, 3]]:</b><br>Characteristic Equation: |A - \u03bbI| = (1 - \u03bb)(3 - \u03bb) - (4)(2) = \u03bb^2 - 4\u03bb - 5 = 0.<br>Compute A^2: A^2 = [[1, 4], [2, 3]] x [[1, 4], [2, 3]] = [[9, 16], [8, 17]].<br>Check A^2 - 4A - 5I:<br>[[9, 16], [8, 17]] - 4[[1, 4], [2, 3]] - 5[[1, 0], [0, 1]] = [[9-4-5, 16-16-0], [8-8-0, 17-12-5]] = [[0, 0], [0, 0]]. Hence verified!<br><b>Finding A^-1:</b> Multiply by A^-1: A - 4I - 5A^-1 = 0 \u21d2 A^-1 = (1/5)(A - 4I) = (1/5)[[-3, 4], [2, -1]] = [[-0.6, 0.8], [0.4, -0.2]]."
      },
      {
        "q": "Find the maximum and minimum values of the function f(x, y) = x^3 + y^3 - 3axy. [7 Marks]",
        "a": "<b>Step 1 (First Partial Derivatives):</b><br>\u2202f/\u2202x = 3x^2 - 3ay = 0 \u21d2 y = x^2 / a.<br>\u2202f/\u2202y = 3y^2 - 3ax = 0 \u21d2 x = y^2 / a.<br><b>Step 2 (Stationary Points):</b><br>Substitute y into second eq: x = (x^4) / a^3 \u21d2 x(x^3 - a^3) = 0.<br>Points: (0, 0) and (a, a).<br><b>Step 3 (Second Partial Derivatives):</b><br>r = \u2202^2f/\u2202x^2 = 6x, s = \u2202^2f/\u2202x\u2202y = -3a, t = \u2202^2f/\u2202y^2 = 6y.<br>\u2022 At (0, 0): rt - s^2 = 0 - 9a^2 = -9a^2 < 0 \u21d2 <b>Saddle Point</b> (neither max nor min).<br>\u2022 At (a, a): r = 6a, s = -3a, t = 6a. rt - s^2 = 36a^2 - 9a^2 = 27a^2 > 0.<br>If a > 0: r = 6a > 0 \u21d2 <b>Local Minimum</b> at (a, a) with value f(a, a) = -a^3."
      },
      {
        "q": "Evaluate \u222c_S F \u00b7 n\u0302 dS using Gauss Divergence Theorem where F = 4xz i - y^2 j + yz k and S is the surface of the cube bounded by x=0, x=1, y=0, y=1, z=0, z=1. [7 Marks]",
        "a": "<b>By Gauss Divergence Theorem:</b><br>\u222c_S F \u00b7 n\u0302 dS = \u222d_V (\u2207 \u00b7 F) dV.<br>Compute \u2207 \u00b7 F:<br>\u2207 \u00b7 F = \u2202(4xz)/\u2202x + \u2202(-y^2)/\u2202y + \u2202(yz)/\u2202z = 4z - 2y + y = 4z - y.<br><b>Volume Integral:</b><br>\u222b_{0}^{1} \u222b_{0}^{1} \u222b_{0}^{1} (4z - y) dx dy dz = \u222b_{0}^{1} \u222b_{0}^{1} (4z - y) [x]_0^1 dy dz<br>= \u222b_{0}^{1} [4zy - y^2 / 2]_0^1 dz = \u222b_{0}^{1} (4z - 1/2) dz = [2z^2 - z/2]_0^1 = 2 - 0.5 = <b>1.5 (or 3/2)</b>."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Test the consistency of the linear system: x + y + z = 6, x + 2y + 3z = 10, x + 2y + \u03bbz = \u03bc for unique, infinite, and no solution."
      },
      {
        "year": "June 2024",
        "q": "Verify Stokes' Theorem for F = (x^2 + y^2) i - 2xy j taken around the rectangle bounded by x = \u00b1a, y = 0, y = b."
      },
      {
        "year": "Dec 2023",
        "q": "Find the asymptotes of the curve x^3 + 2x^2y - xy^2 - 2y^3 + 4y^2 + 2xy + y - 1 = 0."
      },
      {
        "year": "June 2023",
        "q": "If u = log(x^3 + y^3 + z^3 - 3xyz), prove that (\u2202/\u2202x + \u2202/\u2202y + \u2202/\u2202z)^2 u = -9 / (x + y + z)^2."
      },
      {
        "year": "Dec 2022",
        "q": "Evaluate \u222b_0^1 x^4 (1 - \u221ax)^5 dx using Beta and Gamma functions."
      }
    ]
  },
  {
    "code": "BT-104",
    "title": "Basic Electrical & Electronics Engg. (BEEE)",
    "year": 1,
    "sem": 1,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: DC Circuits (Kirchhoff's Laws, Mesh & Nodal analysis, Thevenin's, Norton's & Superposition Theorem)",
      "Unit II: Single-Phase AC Circuits (Phasor representation, RMS & Average values, R-L-C series & parallel resonance)",
      "Unit III: Three-Phase AC Circuits & Magnetic Circuits (Star-Delta connections, Power measurement by two-wattmeter method, B-H curve)",
      "Unit IV: Electrical Machines (Transformer EMF equation, Losses & Efficiency, DC Motor working principle & Characteristics)",
      "Unit V: Basic Electronics (P-N junction diode, Half-wave & Full-wave rectifiers, Zener diode regulator, BJT configurations)"
    ],
    "formulas": [
      "Ohm's & Kirchhoff's: \u03a3 I_in = \u03a3 I_out (KCL); \u03a3 V = \u03a3 (I x R) (KVL)",
      "Thevenin Equivalent: I_L = V_th / (R_th + R_L)",
      "AC Power: Active P = V x I x cos(\u03c6) (W); Reactive Q = V x I x sin(\u03c6) (VAR); Apparent S = V x I (VA)",
      "Transformer EMF: E1 = 4.44 x f x N1 x \u03a6_m; E2 = 4.44 x f x N2 x \u03a6_m",
      "Transformer Efficiency: \u03b7 = (V2 x I2 x cos\u03c6) / (V2 x I2 x cos\u03c6 + P_i + P_cu) x 100%",
      "Resonance Frequency: f_r = 1 / [2\u03c0 \u221a(LC)]"
    ],
    "qa": [
      {
        "q": "State and prove Thevenin's Theorem. Explain the step-by-step procedure to determine V_th and R_th across load terminals. [7 Marks]",
        "a": "<b>Statement:</b> Any linear bilateral active two-terminal network containing voltage sources and resistors can be replaced by an equivalent circuit consisting of a single voltage source V_th in series with a resistance R_th.<br><b>Step-by-Step Procedure:</b><br>1. Remove load resistance R_L from output terminals A-B.<br>2. <b>Determine V_th (Open Circuit Voltage):</b> Calculate the open-circuit voltage across terminals A-B using Mesh or Nodal analysis (V_th = V_AB).<br>3. <b>Determine R_th (Thevenin Resistance):</b> Deactivate all independent sources (replace ideal voltage sources by short circuits and ideal current sources by open circuits). Look into terminals A-B and calculate equivalent resistance R_th.<br>4. Reconnect load resistor R_L across the Thevenin equivalent circuit.<br>5. Calculate Load Current: <b>I_L = V_th / (R_th + R_L)</b> and Load Voltage <b>V_L = I_L x R_L</b>."
      },
      {
        "q": "Explain the construction and working principle of a single-phase transformer. Derive its EMF equation. [7 Marks]",
        "a": "<b>Working Principle:</b> A transformer operates on Faraday's Law of Mutual Electromagnetic Induction. An alternating voltage V1 applied to primary winding N1 sets up alternating magnetic flux \u03a6 in the silicon steel laminated core. This flux links secondary winding N2 and induces an EMF E2.<br><b>Derivation of EMF Equation:</b><br>Let flux be sinusoidal: \u03a6 = \u03a6_m sin(\u03c9t).<br>Induced EMF per turn in primary: e1 = - d\u03a6/dt = - d(\u03a6_m sin \u03c9t)/dt = - \u03c9 \u03a6_m cos(\u03c9t) = 2\u03c0 f \u03a6_m sin(\u03c9t - 90\u00b0).<br>Maximum EMF per turn: E_m = 2\u03c0 f \u03a6_m.<br>RMS value of induced EMF per turn: E_rms = E_m / \u221a2 = (2\u03c0 / \u221a2) f \u03a6_m = <b>4.44 f \u03a6_m</b>.<br>For primary winding (N1 turns): <b>E1 = 4.44 f N1 \u03a6_m</b>.<br>For secondary winding (N2 turns): <b>E2 = 4.44 f N2 \u03a6_m</b>."
      },
      {
        "q": "Draw and explain the circuit diagram of a Full-Wave Bridge Rectifier with input and output waveforms. What is its ripple factor and efficiency? [7 Marks]",
        "a": "<b>Circuit:</b> Consists of four diodes (D1, D2, D3, D4) connected in bridge configuration across a secondary step-down transformer and load resistor R_L.<br><b>Working:</b><br>\u2022 <i>Positive Half Cycle:</i> Upper secondary terminal is positive. Diodes D1 and D2 are forward biased (conducting), while D3 and D4 are reverse biased. Current flows through D1 \u2192 R_L \u2192 D2.<br>\u2022 <i>Negative Half Cycle:</i> Lower terminal is positive. Diodes D3 and D4 are forward biased, while D1 and D2 are reverse biased. Current flows through D3 \u2192 R_L \u2192 D4 in the SAME direction through R_L.<br><b>Performance Parameters:</b><br>\u2022 Ripple Factor (\u03b3) = \u221a[(I_rms / I_dc)^2 - 1] = <b>0.482</b> (vs 1.21 for half-wave).<br>\u2022 Maximum Rectification Efficiency (\u03b7) = 81.2%.<br>\u2022 Peak Inverse Voltage (PIV) = V_m."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain the working principle of a Zener diode as a shunt voltage regulator with circuit diagram and calculations."
      },
      {
        "year": "June 2024",
        "q": "Show that the power in a 3-phase balanced system can be measured using two wattmeters: P = W1 + W2 and tan \u03c6 = \u221a3 (W1 - W2) / (W1 + W2)."
      },
      {
        "year": "Dec 2023",
        "q": "Explain the torque-speed characteristics of DC series and shunt motors and their industrial applications."
      },
      {
        "year": "June 2023",
        "q": "A series RLC circuit with R=10\u03a9, L=0.1H, C=50\u03bcF is connected to 230V, 50Hz AC. Find impedance, current, power factor, and resonant frequency."
      },
      {
        "year": "Dec 2022",
        "q": "Explain open-circuit (OC) and short-circuit (SC) tests on a transformer to determine equivalent circuit parameters."
      }
    ]
  },
  {
    "code": "BT-105",
    "title": "Basic Computer Engineering (BCE)",
    "year": 1,
    "sem": 2,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Computer Architecture & Basics (Von Neumann architecture, Motherboard, Memory hierarchy)",
      "Unit II: Operating System Fundamentals (Process management, File systems, Shell scripting, Windows vs Linux)",
      "Unit III: C Programming Fundamentals (Data types, Control statements, Arrays, Functions, Recursion)",
      "Unit IV: Advanced C & Structures (Pointers, Dynamic memory allocation, Structures vs Unions, File handling)",
      "Unit V: Object-Oriented Concepts & Database Basics (Class, Object, Inheritance, Polymorphism, SQL basics)"
    ],
    "formulas": [
      "Amdahl's Law (Speedup): S = 1 / [(1 - P) + (P / N)] (where P=parallel fraction, N=processors)",
      "Von Neumann Bottleneck: CPU Processing Speed >> Memory Bus Transfer Bandwidth",
      "Pointer Arithmetic: Address of arr[i] = Base_Address + (i x sizeof(DataType))",
      "Dynamic Allocation: malloc() [uninitialized], calloc() [zero-initialized], realloc(), free()"
    ],
    "qa": [
      {
        "q": "Explain the Von Neumann Architecture with a block diagram and explain the machine instruction cycle. [7 Marks]",
        "a": "<b>Von Neumann Architecture:</b> Proposed in 1945 based on the Stored Program Concept, where both program instructions and data share the same unified memory space.<br><b>Core Subsystems:</b><br>1. <i>Central Processing Unit (CPU):</i> Contains ALU (Arithmetic Logic Unit), Control Unit (CU), and Registers (PC, MAR, MDR, IR, Accumulator).<br>2. <i>Main Memory (RAM):</i> Stores programs and variables in sequential memory addresses.<br>3. <i>Input/Output (I/O) Interface:</i> Communication bridges between human/devices and CPU.<br>4. <i>System Buses:</i> Address Bus (unidirectional), Data Bus (bidirectional), Control Bus.<br><b>Machine Instruction Cycle:</b><br>\u2022 <i>Fetch:</i> PC puts address on Address Bus \u2192 Memory returns opcode to IR \u2192 PC increments.<br>\u2022 <i>Decode:</i> Control Unit decodes opcode into micro-operations.<br>\u2022 <i>Execute:</i> ALU performs calculation or data transfer."
      },
      {
        "q": "What is a Pointer in C? Explain pointer arithmetic and dynamic memory allocation functions (malloc, calloc, realloc, free) with code examples. [7 Marks]",
        "a": "<b>Pointer:</b> A variable that stores the direct memory address of another variable.<br><b>Dynamic Memory Allocation (stdlib.h):</b><br>\u2022 <code>malloc(size_t size)</code>: Allocates raw contiguous bytes; returns void* (contains garbage values).<br>\u2022 <code>calloc(num, size)</code>: Allocates memory and initializes all bytes to ZERO.<br>\u2022 <code>realloc(ptr, new_size)</code>: Resizes previously allocated dynamic heap block.<br>\u2022 <code>free(ptr)</code>: Deallocates heap memory back to OS to prevent Memory Leaks.<br><b>Example Code:</b><br><pre>int *arr = (int*) malloc(5 * sizeof(int));\nif (arr == NULL) { printf(\"Memory Full\"); return 1; }\nfor(int i=0; i<5; i++) *(arr + i) = (i + 1) * 10;\nfree(arr); arr = NULL; // Prevent Dangling Pointer</pre>"
      },
      {
        "q": "Explain the four pillars of Object-Oriented Programming (OOP) with real-world examples. [7 Marks]",
        "a": "<b>1. Encapsulation:</b> Bundling data members and member functions into a single unit (Class) and restricting direct access via access specifiers (private, protected, public). E.g., Capsule or Bank Account class with balance variable.<br><b>2. Data Abstraction:</b> Displaying only essential features to the user while hiding low-level implementation details. E.g., Car steering & accelerator (driver doesn't need to know fuel injection mechanics).<br><b>3. Inheritance:</b> Mechanism where a new class (derived/child) inherits properties and behaviors from an existing class (base/parent), promoting code reusability (Single, Multiple, Multilevel, Hierarchical).<br><b>4. Polymorphism:</b> Ability of an entity to take more than one form: Compile-time (Function & Operator Overloading) and Runtime (Virtual functions & Method Overriding)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Differentiate between Process and Program. Explain CPU scheduling algorithms (FCFS and Round Robin)."
      },
      {
        "year": "June 2024",
        "q": "Write a recursive C program for Tower of Hanoi and explain its time complexity O(2^n)."
      },
      {
        "year": "Dec 2023",
        "q": "Differentiate between Structure and Union in C with memory representation diagrams."
      },
      {
        "year": "June 2023",
        "q": "Explain OSI 7-layer reference model with functions of each layer."
      },
      {
        "year": "Dec 2022",
        "q": "Explain file handling in C with fopen, fclose, fread, fwrite, fseek, and ftell."
      }
    ]
  },
  {
    "code": "BT-201",
    "title": "Engineering Physics",
    "year": 1,
    "sem": 2,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Quantum Mechanics (Wave-particle duality, De Broglie, Schrodinger equation, Particle in 1D box)",
      "Unit II: Wave Optics (Interference in thin films, Newton's Rings, Diffraction grating, Polarization)",
      "Unit III: Laser & Fiber Optics (Spontaneous & stimulated emission, Population inversion, Optical fibers NA)",
      "Unit IV: Solid State & Semiconductor Physics (Band theory of solids, Fermi-Dirac distribution, Hall Effect)",
      "Unit V: Superconductivity & Nanotechnology (Meissner effect, Type-I & Type-II, Carbon nanotubes)"
    ],
    "formulas": [
      "Schrodinger 1D Wave Eq: (-\u0127^2 / 2m)(d^2\u03c8/dx^2) + V(x)\u03c8 = E\u03c8",
      "Particle in 1D Box Energy: E_n = (n^2 h^2) / (8 m L^2)",
      "Newton's Rings Diameter: D_n^2 = 4 n \u03bb R (for dark rings)",
      "Numerical Aperture (Fiber): NA = \u221a(n1^2 - n2^2) = n1 \u221a(2\u0394)",
      "Hall Coefficient: R_H = 1 / (n x e)"
    ],
    "qa": [
      {
        "q": "Derive the time-independent Schrodinger wave equation. Calculate the energy eigenvalues of a particle trapped in an infinite 1D potential well. [7 Marks]",
        "a": "<b>Derivation:</b> A moving particle has an associated de Broglie wave \u03c8(x) = A e^(i(kx - \u03c9t)). Differentiating twice with respect to x gives d^2\u03c8/dx^2 = -k^2 \u03c8 = -(p^2 / \u0127^2) \u03c8. Since Total Energy E = Kinetic Energy + Potential Energy = (p^2 / 2m) + V(x), we have p^2 = 2m(E - V(x)). Substituting yields <b>(-\u0127^2 / 2m)(d^2\u03c8/dx^2) + V(x)\u03c8 = E\u03c8</b>.<br><b>Particle in 1D Box (0 <= x <= L, V=0 inside, V=\u221e outside):</b> Boundary conditions \u03c8(0)=0 and \u03c8(L)=0 require k = n\u03c0/L. Normalization yields \u03c8_n(x) = \u221a(2/L) sin(n\u03c0x/L). Substituting k into energy relation gives <b>E_n = (n^2 h^2) / (8 m L^2)</b>, showing energy quantization!"
      },
      {
        "q": "Explain the construction and working of a Ruby Laser or He-Ne Laser with an energy level diagram. [7 Marks]",
        "a": "<b>He-Ne Laser:</b> A four-level gas laser producing continuous red light at 632.8 nm.<br>\u2022 <i>Active Medium:</i> Mixture of Helium and Neon gas in 10:1 ratio at low pressure in a quartz discharge tube.<br>\u2022 <i>Pumping:</i> Electric discharge excites He atoms to metastable states (20.61 eV).<br>\u2022 <i>Energy Transfer:</i> Excited He atoms collide with ground-state Ne atoms (resonant collision), transferring energy and creating <b>Population Inversion</b> in Ne atoms.<br>\u2022 <i>Stimulated Emission:</i> Transition from Ne 3s to 2p level emits coherent photons of wavelength <b>632.8 nm</b>. Optical resonator mirrors reflect photons to amplify the laser beam."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain the formation of Newton's rings by reflected light and derive expression for diameter of dark rings."
      },
      {
        "year": "June 2024",
        "q": "What is Hall Effect? Derive the expression for Hall coefficient and explain its engineering applications."
      },
      {
        "year": "Dec 2023",
        "q": "Explain Meissner Effect and differentiate between Type-I and Type-II superconductors."
      }
    ]
  },
  {
    "code": "CS-302",
    "title": "Discrete Mathematics",
    "year": 2,
    "sem": 3,
    "credits": 4,
    "branch": "CSE Core",
    "roadmap": {
      "strategy": "Mathematical logic proofs, Poset Hasse diagrams, and Graph Theory (Eulerian & Hamiltonian graphs) are repeated every session.",
      "pass_target": "Unit 1 (Sets, Relations & Functions) + Unit 4 (Graph Theory & Trees) guarantee 35+ marks.",
      "top_scorer_tip": "Draw Hasse diagrams neatly with upward directed lines omitting transitive and reflexive edges.",
      "blueprint": "Q1 Equivalence Relations & Partition (7M), Q2 Poset & Hasse Diagrams (7M), Q3 Propositional Logic & Tautology (7M), Q4 Pigeonhole Principle & Permutations (7M), Q5 Groups & Subgroups Lagrange's Theorem (7M), Q6 Rings & Fields (7M), Q7 Graph Isomorphism & Planar Graphs (7M), Q8 Eulerian vs Hamiltonian Graphs (7M)."
    },
    "repeated_topics": [
      "Hasse Diagram of a Poset (e.g. Divisibility relation D\u2083\u2086 or D\u2082\u2084) with maximal/minimal elements",
      "Lagrange's Theorem for finite groups: Order of subgroup divides order of group",
      "Euler's formula for connected planar graphs: V - E + R = 2"
    ],
    "units": [
      "Unit I: Set Theory & Relations (Sets, Power set, Cartesian product, Relations, Equivalence relations, Closures Reflexive/Symmetric/Transitive, Partial ordering Poset, Hasse diagram, Lattices)",
      "Unit II: Propositional & Predicate Logic (Propositions, Connectives truth tables, Tautology, Contradiction, Normal forms DNF and CNF, Predicates and Quantifiers, Rules of inference)",
      "Unit III: Combinatorics & Recurrence (Pigeonhole principle, Permutations and Combinations, Generating functions, Linear recurrence relations with constant coefficients)",
      "Unit IV: Algebraic Structures (Semigroups, Monoids, Groups, Abelian groups, Subgroups, Cyclic groups, Cosets, Lagrange's Theorem, Rings, Integral Domains, Fields)",
      "Unit V: Graph Theory & Trees (Graphs, Degree Handshaking lemma, Paths and circuits, Eulerian & Hamiltonian paths, Planar graphs, Euler's formula V - E + R = 2, Graph coloring, Trees, Spanning trees)"
    ],
    "formulas": [
      "Handshaking Lemma: \u2211 deg(v) = 2 \u00b7 |E|",
      "Euler's Planar Graph Formula: V - E + R = 2",
      "Lagrange's Theorem: |G| = [G : H] \u00b7 |H| (Order of subgroup divides order of finite group)",
      "Pigeonhole Principle: If n items are put into k containers, at least one container has \u2308n/k\u2309 items",
      "Lattice Distributive Law: a \u2227 (b \u2228 c) = (a \u2227 b) \u2228 (a \u2227 c)"
    ],
    "diagram_svg": "<svg viewBox=\"0 0 520 180\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-lg mx-auto my-3 border border-stone-800 rounded-lg bg-stone-50 p-2\">\n  <rect x=\"20\" y=\"20\" width=\"480\" height=\"140\" rx=\"8\" fill=\"#fdf4ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"260\" y=\"42\" font-family=\"monospace\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">HASSE DIAGRAM OF POSET (D\u2081\u2082, |) (DIVISIBILITY ON 12)</text>\n  <!-- Node 12 -->\n  <circle cx=\"260\" cy=\"65\" r=\"12\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"260\" y=\"69\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">12</text>\n  <!-- Level 2: 4 and 6 -->\n  <circle cx=\"190\" cy=\"100\" r=\"12\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"190\" y=\"104\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">4</text>\n  <circle cx=\"330\" cy=\"100\" r=\"12\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"330\" y=\"104\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">6</text>\n  <!-- Level 3: 2 and 3 -->\n  <circle cx=\"190\" cy=\"135\" r=\"12\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"190\" y=\"139\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">2</text>\n  <circle cx=\"330\" cy=\"135\" r=\"12\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"330\" y=\"139\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">3</text>\n  <!-- Level 4: 1 -->\n  <circle cx=\"260\" cy=\"155\" r=\"10\" fill=\"#fae8ff\" stroke=\"#a21caf\" stroke-width=\"2\"/>\n  <text x=\"260\" y=\"159\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#701a75\">1</text>\n  <!-- Connecting Edges -->\n  <line x1=\"260\" y1=\"77\" x2=\"198\" y2=\"92\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"260\" y1=\"77\" x2=\"322\" y2=\"92\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"190\" y1=\"112\" x2=\"190\" y2=\"123\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"330\" y1=\"112\" x2=\"198\" y2=\"128\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"330\" y1=\"112\" x2=\"330\" y2=\"123\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"190\" y1=\"147\" x2=\"252\" y2=\"152\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <line x1=\"330\" y1=\"147\" x2=\"268\" y2=\"152\" stroke=\"#a21caf\" stroke-width=\"1.5\"/>\n  <!-- Labels -->\n  <text x=\"80\" y=\"65\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#701a75\">Greatest: 12 (Maximal)</text>\n  <text x=\"80\" y=\"155\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#701a75\">Least: 1 (Minimal)</text>\n</svg>",
    "qa": [
      {
        "q": "State and prove Lagrange's Theorem for finite groups. What is its corollary for prime order groups? [7 Marks]",
        "a": "<b>1. Theorem Statement:</b> The order of each subgroup H of a finite group G divides the order of G. That is, <code>|G| = [G : H] \u00b7 |H|</code>.<br><b>2. Proof:</b><br>\u2022 Let H = {h\u2081, h\u2082, ..., h_m} be a subgroup of G of order m.<br>\u2022 For any a \u2208 G, the left coset aH = {ah\u2081, ah\u2082, ..., ah_m}.<br>\u2022 All m elements of aH are distinct (if ah_i = ah_j, left cancellation implies h_i = h_j).<br>\u2022 Any two left cosets are either disjoint or identical.<br>\u2022 Since every element g \u2208 G belongs to some coset gH, the distinct left cosets partition the group G.<br>\u2022 If there are k distinct left cosets, then |G| = k \u00b7 |H|.<br>\u2022 Therefore, |H| divides |G|.<br><b>3. Corollary:</b> Any group of prime order p is cyclic and has no non-trivial proper subgroups."
      },
      {
        "q": "State Euler's Formula for connected planar graphs. Prove that for any simple planar graph with V \u2265 3, E \u2264 3V - 6. [7 Marks]",
        "a": "<b>1. Euler's Formula:</b> In any connected planar graph with V vertices, E edges, and R regions (faces), <code>V - E + R = 2</code>.<br><b>2. Proof of E \u2264 3V - 6:</b><br>\u2022 Every region in a simple planar graph is bounded by at least 3 edges (since there are no multiple edges or loops).<br>\u2022 Each edge separates at most 2 regions.<br>\u2022 Summing edge boundaries over all regions gives: <code>2E = \u2211 degree(Region) \u2265 3R \u21d2 R \u2264 (2/3) E</code>.<br>\u2022 Substitute into Euler's formula V - E + R = 2:<br><code>V - E + (2/3) E \u2265 2  \u21d2  V - (1/3) E \u2265 2</code><br>Multiply by 3:<br><code>3V - E \u2265 6  \u21d2  E \u2264 3V - 6</code>. (Hence Proved)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Show that the proposition (p \u2227 (p \u2192 q)) \u2192 q is a tautology using truth tables."
      },
      {
        "year": "June 2024",
        "q": "Differentiate between Eulerian graph and Hamiltonian graph. State necessary and sufficient conditions for each."
      },
      {
        "year": "Dec 2023",
        "q": "Solve recurrence relation a_n = 5 a_{n-1} - 6 a_{n-2} with initial conditions a\u2080 = 1, a\u2081 = 4."
      },
      {
        "year": "June 2023",
        "q": "Show that the set G = {1, 2, 3, 4, 5, 6} forms an abelian group under multiplication modulo 7."
      },
      {
        "year": "Dec 2022",
        "q": "State Pigeonhole Principle. Show that among 13 people, at least two were born in the same month."
      }
    ]
  },
  {
    "code": "CS-303",
    "title": "Data Structures & Algorithms",
    "year": 2,
    "sem": 3,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Complexity & Linear Lists (Asymptotic notations Big-O, \u03a9, \u0398, Singly, Doubly & Circular Linked Lists)",
      "Unit II: Stacks & Queues (Array & Linked implementations, Infix to Postfix conversion, Circular & Priority Queue)",
      "Unit III: Trees & Binary Search Trees (Tree traversals Inorder/Preorder/Postorder, BST operations, AVL Tree balancing)",
      "Unit IV: Graphs & Graph Algorithms (Adjacency Matrix/List, BFS, DFS, Minimum Spanning Trees Prim's & Kruskal's)",
      "Unit V: Sorting & Searching (Quick Sort, Merge Sort, Heap Sort, Hashing techniques & Collision resolution)"
    ],
    "formulas": [
      "Master Theorem: T(n) = a T(n/b) + f(n); compare f(n) with n^(log_b a)",
      "AVL Balance Factor: BF(node) = Height(Left_Subtree) - Height(Right_Subtree) \u2208 {-1, 0, +1}",
      "Max nodes in Binary Tree of depth d: 2^(d+1) - 1",
      "Infix to Postfix Precedence: ^ (right-to-left) > *, / (left-to-right) > +, - (left-to-right)",
      "Average Time Complexities: Quick Sort O(n log n), Merge Sort O(n log n), BST Search O(log n)"
    ],
    "qa": [
      {
        "q": "Write an algorithm to convert an Infix expression into Postfix notation using a Stack. Convert: A + B * (C ^ D - E) / (F + G * H). [7 Marks]",
        "a": "<b>Algorithm:</b> Scan infix tokens from left to right:<br>1. If operand, output directly.<br>2. If '(', push to stack.<br>3. If ')', pop and output from stack until '(' is encountered; discard '('.<br>4. If operator: while stack non-empty and precedence(stack.top) >= precedence(operator) [or > if right-associative], pop and output. Then push current operator.<br>5. At end of expression, pop and output all remaining operators from stack.<br><b>Conversion of A + B * (C ^ D - E) / (F + G * H):</b><br>\u2022 C ^ D \u2192 <code>CD^</code><br>\u2022 (C ^ D - E) \u2192 <code>CD^E-</code><br>\u2022 B * (...) \u2192 <code>BCD^E-*</code><br>\u2022 (F + G * H) \u2192 <code>FGH*+</code><br>\u2022 / term \u2192 <code>BCD^E-*FGH*+/</code><br>\u2022 Final Result: <b>A B C D ^ E - * F G H * + / +</b>"
      },
      {
        "q": "Explain AVL Tree rotations (LL, RR, LR, RL) with diagrams. Insert keys: 10, 20, 30, 40, 50, 25 into an empty AVL tree. [7 Marks]",
        "a": "<b>AVL Tree:</b> Self-balancing Binary Search Tree where Balance Factor = Height(L) - Height(R) is -1, 0, or +1 for every node.<br><b>Rotations:</b><br>\u2022 <i>LL Rotation:</i> Single right rotation about node A when insertion in left subtree of left child.<br>\u2022 <i>RR Rotation:</i> Single left rotation about node A when insertion in right subtree of right child.<br>\u2022 <i>LR Rotation:</i> Double rotation: Left rotation on left child, then Right rotation on root.<br>\u2022 <i>RL Rotation:</i> Double rotation: Right rotation on right child, then Left rotation on root.<br><b>Step-by-Step Insertion:</b><br>1. Insert 10, 20, 30: Node 10 has BF = -2 (Right-Right heavy) \u2192 RR rotation at 10. Root becomes <b>20</b> with children 10 and 30.<br>2. Insert 40, 50: Node 30 has BF = -2 \u2192 RR rotation at 30. Subtree becomes 40 with children 30 and 50.<br>3. Insert 25: Unbalances root 20 (BF = -2, left of right is heavy) \u2192 RL rotation. Tree balances into root <b>30</b> with left child 20 (children 10, 25) and right child 40 (child 50)."
      },
      {
        "q": "Explain Quick Sort with partition algorithm and solve its recurrence relation for Best, Average, and Worst cases. [7 Marks]",
        "a": "<b>Divide & Conquer Principle:</b> Picks a pivot element, partitions array such that all elements < pivot are to the left and > pivot are to the right, then recursively sorts sub-arrays.<br><b>Recurrence Relations:</b><br>\u2022 <b>Best Case (Balanced split):</b> T(n) = 2T(n/2) + O(n). By Master Theorem: a=2, b=2, k=1 \u21d2 <b>T(n) = O(n log n)</b>.<br>\u2022 <b>Average Case:</b> Random splits yield <b>T(n) = O(n log n)</b>.<br>\u2022 <b>Worst Case (Already sorted/reverse sorted with first/last pivot):</b> T(n) = T(n-1) + T(0) + O(n) = T(n-1) + cn \u21d2 T(n) = c(n + n-1 + ... + 1) = <b>O(n^2)</b>.<br><i>Prevention:</i> Randomized Quick Sort or Median-of-Three pivot selection."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Differentiate between BFS and DFS. Find the Minimum Spanning Tree using Prim's and Kruskal's algorithms."
      },
      {
        "year": "June 2024",
        "q": "Explain Hashing and collision resolution techniques: Linear Probing, Quadratic Probing, and Chaining."
      },
      {
        "year": "Dec 2023",
        "q": "Write C functions for inserting and deleting an element from a Circular Queue using an array."
      },
      {
        "year": "June 2023",
        "q": "Explain Binary Heap (Min Heap & Max Heap) construction and Heap Sort algorithm with time complexity."
      },
      {
        "year": "Dec 2022",
        "q": "Construct a binary tree from Inorder: D B E A F C and Preorder: A B D E C F."
      }
    ]
  },
  {
    "code": "CS-402",
    "title": "Analysis & Design of Algorithms (ADA)",
    "year": 2,
    "sem": 4,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Algorithm Analysis & Recurrences (Asymptotic bounds, Master Theorem, Substitution, Recursion tree)",
      "Unit II: Divide & Conquer (Strassen's matrix multiplication, Convex Hull, Binary search analysis)",
      "Unit III: Greedy Method (Knapsack problem, Huffman coding, Job sequencing with deadlines)",
      "Unit IV: Dynamic Programming (0/1 Knapsack, Matrix Chain Multiplication, Longest Common Subsequence LCS, Floyd-Warshall)",
      "Unit V: Backtracking, Branch & Bound, NP-Completeness (N-Queens, Graph Coloring, Travelling Salesperson, P vs NP, NP-Hard)"
    ],
    "formulas": [
      "Master Theorem: T(n) = a T(n/b) + \u0398(n^k log^p n); compare a with b^k",
      "Strassen's Multiplication: T(n) = 7 T(n/2) + O(n^2) \u21d2 O(n^log2 7) \u2248 O(n^2.81)",
      "Dynamic Programming 0/1 Knapsack: V[i, w] = max(V[i-1, w], val[i] + V[i-1, w - wt[i]])",
      "LCS Recurrence: c[i, j] = c[i-1, j-1] + 1 if X[i]==Y[j] else max(c[i-1, j], c[i, j-1])"
    ],
    "qa": [
      {
        "q": "Explain the 0/1 Knapsack problem using Dynamic Programming. Solve for capacity W=5, items with weights [2, 3, 4] and profits [3, 4, 5]. [7 Marks]",
        "a": "<b>DP Formulation:</b> Let V[i, w] be the maximum profit with first i items and capacity w.<br><b>Recurrence:</b><br>\u2022 If wt[i] > w: V[i, w] = V[i-1, w]<br>\u2022 Else: V[i, w] = max(V[i-1, w], profit[i] + V[i-1, w - wt[i]])<br><b>Table Computation (W=0 to 5):</b><br>\u2022 Row 1 (Item 1, wt=2, p=3): V[1, 0..1]=0, V[1, 2..5]=3.<br>\u2022 Row 2 (Item 2, wt=3, p=4): V[2, 0..1]=0, V[2, 2]=3, V[2, 3]=4, V[2, 4]=4, V[2, 5]=max(3, 4+V[1, 2]) = <b>7</b> (Items 1 and 2).<br>\u2022 Row 3 (Item 3, wt=4, p=5): V[3, 5]=max(V[2, 5], 5 + V[2, 1]) = max(7, 5+0) = 7.<br><b>Optimal Profit:</b> <b>7</b> (Select Item 1 and Item 2, Total Weight = 2 + 3 = 5 <= 5)."
      },
      {
        "q": "Differentiate between P, NP, NP-Complete, and NP-Hard classes with a neat Euler diagram. [7 Marks]",
        "a": "<b>Class Definitions:</b><br>\u2022 <b>P (Polynomial time):</b> Set of decision problems solvable by a Deterministic Turing Machine in polynomial time O(n^k). E.g. Sorting, Shortest Path.<br>\u2022 <b>NP (Nondeterministic Polynomial):</b> Decision problems whose proposed solutions can be VERIFIED in polynomial time by a DTM.<br>\u2022 <b>NP-Hard:</b> A problem X is NP-Hard if every problem Y in NP can be reduced to X in polynomial time (Y <=_p X). It does not need to be in NP itself.<br>\u2022 <b>NP-Complete (NPC):</b> A problem X is NP-Complete if (1) X \u2208 NP, and (2) X is NP-Hard. (Hardest problems in NP, e.g. 3-SAT, Clique, Hamiltonian Cycle, Traveling Salesperson Decision)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Solve Matrix Chain Multiplication for dimensions [40, 20, 30, 10, 30] using dynamic programming."
      },
      {
        "year": "June 2024",
        "q": "Explain Huffman Coding algorithm and construct optimal prefix code tree for given frequencies."
      },
      {
        "year": "Dec 2023",
        "q": "Solve 4-Queens problem using Backtracking state-space tree."
      }
    ]
  },
  {
    "code": "CS-403",
    "title": "Operating Systems",
    "year": 2,
    "sem": 4,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: OS Overview & Process Management (Process states, PCB, Context switching, System calls)",
      "Unit II: CPU Scheduling & Synchronization (FCFS, SJF, SRTF, Round Robin, Critical Section, Semaphores)",
      "Unit III: Deadlocks (Four Coffman conditions, Resource Allocation Graph, Banker's Algorithm, Detection & Recovery)",
      "Unit IV: Memory Management (Contiguous allocation, Paging, Segmentation, Virtual Memory, Page replacement FIFO/LRU/Optimal)",
      "Unit V: Storage & File Management (Disk scheduling FCFS/SSTF/SCAN/C-SCAN, File allocation methods)"
    ],
    "formulas": [
      "Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT)",
      "Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT)",
      "Effective Memory Access Time (EMAT) = Hit_Ratio x (TLB + Mem) + (1 - Hit_Ratio) x (TLB + 2 x Mem)",
      "Banker's Algorithm Safety condition: Need[i] <= Available, where Need[i] = Max[i] - Allocation[i]",
      "Belady's Anomaly: For FIFO page replacement, increasing page frames can increase page faults!"
    ],
    "qa": [
      {
        "q": "What is a Deadlock? State the four necessary Coffman conditions for a deadlock to occur. Explain Banker's Algorithm for deadlock avoidance. [7 Marks]",
        "a": "<b>Deadlock:</b> A condition where a set of processes are blocked because each process holds resources and waits for resources held by others in the set.<br><b>Four Necessary Conditions (Coffman):</b><br>1. <i>Mutual Exclusion:</i> At least one non-shareable resource.<br>2. <i>Hold and Wait:</i> A process holds resources while requesting additional ones.<br>3. <i>No Preemption:</i> Resources cannot be forcibly taken from a process until released voluntarily.<br>4. <i>Circular Wait:</i> A circular chain of processes P0 \u2192 P1 \u2192 ... \u2192 Pn \u2192 P0 waiting for resources.<br><b>Banker's Algorithm:</b> Safe state detection algorithm where the system checks whether granting a resource request leaves enough available resources to fulfill at least one process's maximum need, letting it finish and release its resources, continuing recursively."
      },
      {
        "q": "Explain Virtual Memory and Paging hardware with a TLB diagram. What is Belady's Anomaly? [7 Marks]",
        "a": "<b>Virtual Memory:</b> A storage allocation scheme that allows execution of processes that are not completely in physical memory, providing an illusion of infinite RAM.<br><b>Paging Hardware:</b> CPU generates a Logical Address divided into Page Number (p) and Page Offset (d).<br>1. CPU checks <b>Translation Lookaside Buffer (TLB)</b> for page number p.<br>2. <i>TLB Hit:</i> Frame number f retrieved in 1-2 ns.<br>3. <i>TLB Miss:</i> Access Page Table in main memory to get frame f, update TLB.<br>4. Physical Address = (f x Frame_Size) + d.<br><b>Belady's Anomaly:</b> The phenomenon where increasing the number of page frames allocated to a process results in an INCREASE in the number of page faults. Observed in <b>FIFO</b> replacement (e.g. reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 has 9 faults with 3 frames, but 10 faults with 4 frames). Optimal and LRU are stack algorithms and NEVER suffer from Belady's Anomaly."
      },
      {
        "q": "Given 5 processes with Arrival and Burst Times: P1 (AT=0, BT=4), P2 (AT=1, BT=3), P3 (AT=2, BT=1), P4 (AT=3, BT=2), P5 (AT=4, BT=5). Calculate Average Waiting Time and Turnaround Time using Preemptive Shortest Remaining Time First (SRTF). [7 Marks]",
        "a": "<b>Gantt Chart (SRTF):</b><br>\u2022 At t=0: P1 arrives (rem=4). Runs [0\u20131].<br>\u2022 At t=1: P2 arrives (rem=3). P1 rem=3. P1 continues or P2 runs. P2 runs [1\u20132].<br>\u2022 At t=2: P3 arrives (rem=1). Shorter than P2 (rem=2). P3 runs [2\u20133]. (P3 completes at t=3).<br>\u2022 At t=3: P4 arrives (rem=2). Available: P2 (rem=2), P4 (rem=2), P1 (rem=3). P2 runs [3\u20135]. (P2 completes at t=5).<br>\u2022 At t=5: P4 runs [5\u20137]. (P4 completes at t=7).<br>\u2022 At t=7: P1 runs [7\u201310]. (P1 completes at t=10).<br>\u2022 At t=10: P5 runs [10\u201315]. (P5 completes at t=15).<br><b>Calculations:</b><br>\u2022 P1: CT=10, TAT=10-0=10, WT=10-4=6<br>\u2022 P2: CT=5, TAT=5-1=4, WT=4-3=1<br>\u2022 P3: CT=3, TAT=3-2=1, WT=1-1=0<br>\u2022 P4: CT=7, TAT=7-3=4, WT=4-2=2<br>\u2022 P5: CT=15, TAT=15-4=11, WT=11-5=6<br><b>Averages:</b><br>\u2022 Average TAT = (10 + 4 + 1 + 4 + 11) / 5 = <b>6.0 ms</b><br>\u2022 Average WT = (6 + 1 + 0 + 2 + 6) / 5 = <b>3.0 ms</b>"
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain Producer-Consumer problem using Semaphores (wait and signal) with pseudo-code."
      },
      {
        "year": "June 2024",
        "q": "Compare Disk Scheduling algorithms: FCFS, SSTF, SCAN, and C-SCAN for a given track request string."
      },
      {
        "year": "Dec 2023",
        "q": "Differentiate between Monolithic and Microkernel OS architectures with examples."
      },
      {
        "year": "June 2023",
        "q": "Explain contiguous, linked, and indexed file allocation methods with pros and cons."
      },
      {
        "year": "Dec 2022",
        "q": "Calculate page faults for reference string using FIFO, LRU, and Optimal algorithms with 3 frames."
      }
    ]
  },
  {
    "code": "CS-501",
    "title": "Theory of Computation (TOC / Automata)",
    "year": 3,
    "sem": 5,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Finite Automata (DFA, NFA, \u03b5-NFA, Minimization of DFA using Myhill-Nerode / Table filling method)",
      "Unit II: Regular Languages & Grammars (Regular Expressions, Arden's Theorem, Pumping Lemma for Regular Languages)",
      "Unit III: Context-Free Languages & Grammars (CFG, Derivation Trees, Ambiguity, Chomsky Normal Form CNF, GNF)",
      "Unit IV: Pushdown Automata (DPDA vs NPDA, Equivalence of PDA and CFG, Pumping Lemma for CFL)",
      "Unit V: Turing Machines & Computability (Standard TM design, Halting Problem, Chomsky Hierarchy of Languages, Decidability)"
    ],
    "formulas": [
      "Arden's Theorem: If P and Q are regular expressions and \u03b5 \u2209 P, then R = Q + RP has unique solution R = QP*",
      "Pumping Lemma (Regular): For w \u2208 L with |w| >= p, w = xyz such that |y| > 0, |xy| <= p, and x y^i z \u2208 L for all i >= 0",
      "Chomsky Normal Form (CNF): All productions of the form A \u2192 BC or A \u2192 a",
      "Chomsky Hierarchy: Type 3 (Regular) \u2282 Type 2 (CFL) \u2282 Type 1 (CSL) \u2282 Type 0 (Unrestricted / Recursively Enumerable)"
    ],
    "qa": [
      {
        "q": "Design a Deterministic Finite Automata (DFA) that accepts all binary strings containing '010' as a substring. Show transition table and state diagram. [7 Marks]",
        "a": "<b>Alphabet:</b> \u03a3 = {0, 1}. Substring required: '010'.<br><b>States Definition:</b><br>\u2022 q0 (Start): No relevant prefix seen.<br>\u2022 q1: Just seen '0'.<br>\u2022 q2: Just seen '01'.<br>\u2022 q3 (Accepting/Trap): Substring '010' matched successfully.<br><b>Transitions:</b><br>\u2022 From q0: on '0' \u2192 q1; on '1' \u2192 q0.<br>\u2022 From q1: on '0' \u2192 q1 (still ends in '0'); on '1' \u2192 q2.<br>\u2022 From q2: on '0' \u2192 q3 (found '010'); on '1' \u2192 q0.<br>\u2022 From q3: on '0' \u2192 q3; on '1' \u2192 q3 (once found, stays accepted)."
      },
      {
        "q": "State and prove the Pumping Lemma for Regular Languages. Prove that L = {0^n 1^n | n >= 0} is NOT regular. [7 Marks]",
        "a": "<b>Proof by Contradiction:</b><br>1. Assume L is regular. Then there exists a pumping length p.<br>2. Choose string s = 0^p 1^p \u2208 L. Note |s| = 2p >= p.<br>3. By Pumping Lemma, s can be split into s = xyz such that:<br>   (a) |xy| <= p,<br>   (b) |y| > 0,<br>   (c) x y^i z \u2208 L for all i >= 0.<br>4. Since |xy| <= p and s starts with 0^p, y must consist entirely of 0's (y = 0^k where 1 <= k <= p).<br>5. Pump down (i = 0): x y^0 z = x z. The number of 0's decreases by k, but number of 1's remains p.<br>6. Resulting string has (p - k) zeros and p ones. Since p - k \u2260 p, x z \u2209 L.<br>7. Contradiction! Hence L = {0^n 1^n} is NOT regular."
      },
      {
        "q": "What is the Halting Problem of a Turing Machine? Prove that it is undecidable. [7 Marks]",
        "a": "<b>Definition:</b> Given a description of a Turing Machine M and an input w, determine whether M will eventually halt on w or run forever in an infinite loop.<br><b>Proof of Undecidability (Turing 1936, by Diagonalization):</b><br>1. Suppose there exists a decider TM H such that:<br>   H(<M, w>) = Accept if M halts on w; Reject if M loops.<br>2. Construct a new TM D that takes <M> as input and calls H(<M, <M>>):<br>   \u2022 If H accepts (M halts on its own code), D intentionally enters an infinite loop.<br>   \u2022 If H rejects (M loops), D immediately halts and accepts.<br>3. Now pass D to itself: D(<D>):<br>   \u2022 If D halts on <D>, by definition D enters an infinite loop (contradiction!).<br>   \u2022 If D loops on <D>, by definition D halts (contradiction!).<br>4. Hence no such decider H can exist. The Halting Problem is <b>Undecidable</b>."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Convert the following NFA with \u03b5-transitions into an equivalent DFA without \u03b5-moves."
      },
      {
        "year": "June 2024",
        "q": "Convert CFG into Chomsky Normal Form (CNF): S \u2192 aSa | bSb | a | b | \u03b5."
      },
      {
        "year": "Dec 2023",
        "q": "Design a Pushdown Automata (PDA) for language L = {w c w^R | w \u2208 {0, 1}*} by empty store."
      },
      {
        "year": "June 2023",
        "q": "State Post Correspondence Problem (PCP) and Modified PCP with example of unsolvability."
      },
      {
        "year": "Dec 2022",
        "q": "Design a Turing Machine to compute 2's complement of a binary string."
      }
    ]
  },
  {
    "code": "CS-502",
    "title": "Database Management Systems (DBMS)",
    "year": 3,
    "sem": 5,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: DBMS Architecture & ER Modeling (3-tier architecture, ER to Relational mapping, Extended ER features)",
      "Unit II: Relational Algebra & SQL (Relational algebra operators, Complex SQL queries, Joins, Triggers, Views)",
      "Unit III: Normalization & Functional Dependency (Armstrong's axioms, 1NF, 2NF, 3NF, BCNF, Lossless join, Dependency preservation)",
      "Unit IV: Transaction Processing & Concurrency (ACID properties, Serializability, 2-Phase Locking 2PL, Deadlock handling)",
      "Unit V: Storage & Indexing (B-Trees, B+ Trees, Primary vs Secondary Indexing, Query Optimization basics)"
    ],
    "formulas": [
      "Lossless Decomposition: R1 \u2229 R2 \u2192 R1 OR R1 \u2229 R2 \u2192 R2 must be in F+",
      "B-Tree Order m: Each node has max m children, min \u2308m/2\u2309 children; max m-1 keys, min \u2308m/2\u2309-1 keys",
      "ACID: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (serializable), Durability (persisted)",
      "Armstrong's Axioms: Reflexivity (Y \u2286 X \u21d2 X \u2192 Y), Augmentation (X \u2192 Y \u21d2 XZ \u2192 YZ), Transitivity (X \u2192 Y, Y \u2192 Z \u21d2 X \u2192 Z)"
    ],
    "qa": [
      {
        "q": "What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF with suitable examples and functional dependencies. [7 Marks]",
        "a": "<b>Normalization:</b> Systematic approach of decomposing tables to eliminate data redundancy and anomalies (Insertion, Deletion, Update).<br>\u2022 <b>1NF:</b> Each column must contain atomic (indivisible) values. No multi-valued attributes.<br>\u2022 <b>2NF:</b> Must be in 1NF and NO Partial Dependency (no non-prime attribute should depend on a proper subset of any candidate key).<br>\u2022 <b>3NF:</b> Must be in 2NF and NO Transitive Dependency. For every non-trivial FD X \u2192 Y, either X is a super key or Y is a prime attribute.<br>\u2022 <b>BCNF (Boyce-Codd NF):</b> Stricter version of 3NF. For every non-trivial FD X \u2192 Y, X MUST be a Super Key."
      },
      {
        "q": "Explain ACID properties of a transaction and how the DBMS guarantees each property. [7 Marks]",
        "a": "<b>1. Atomicity:</b> Either all operations of a transaction execute successfully or none do. Managed by <b>Recovery Manager</b> using Write-Ahead Logging (WAL) and Undo logs.<br><b>2. Consistency:</b> Database must transform from one valid state satisfying all integrity constraints (FK, checks) to another valid state. Maintained by application code and DBMS constraint checking.<br><b>3. Isolation:</b> Concurrent transactions execute without interfering with one another. Enforced by <b>Concurrency Control Manager</b> using Two-Phase Locking (2PL) and Timestamp Ordering.<br><b>4. Durability:</b> Once a transaction commits, its updates persist permanently even in case of system power crash. Guaranteed by Redo logs flushed to non-volatile disk."
      },
      {
        "q": "Differentiate between B-Tree and B+ Tree indexing. Why are B+ Trees preferred for database storage? [7 Marks]",
        "a": "<b>Comparison:</b><br>\u2022 <i>B-Tree:</i> Search keys and data records/pointers are stored in both internal nodes and leaf nodes.<br>\u2022 <i>B+ Tree:</i> Data records/pointers are stored ONLY in leaf nodes. Internal nodes store only router keys.<br>\u2022 <i>Leaf Linking:</i> In B+ Tree, leaf nodes are linked sequentially as a doubly linked list, enabling ultra-fast range queries (e.g. <code>WHERE age BETWEEN 20 AND 30</code>). In B-Trees, range queries require expensive tree traversal.<br>\u2022 <i>Fan-Out:</i> Because internal nodes in B+ Tree don't store data pointers, more keys fit per disk page, resulting in higher fan-out, smaller height, and fewer disk I/O operations."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain Conflict Serializability and precedence graph (serialization graph) cycle detection."
      },
      {
        "year": "June 2024",
        "q": "Write SQL queries for nested subqueries, GROUP BY with HAVING, and LEFT vs FULL OUTER JOIN."
      },
      {
        "year": "Dec 2023",
        "q": "Explain Two-Phase Locking (2PL) protocol: Growing phase, Shrinking phase, and Strict 2PL."
      },
      {
        "year": "June 2023",
        "q": "Decompose relation R(A, B, C, D, E) with FDs into BCNF and check for dependency preservation."
      },
      {
        "year": "Dec 2022",
        "q": "Explain ARIES recovery algorithm (Analysis, Redo, Undo phases) with checkpointing."
      }
    ]
  },
  {
    "code": "CS-601",
    "title": "Computer Networks",
    "year": 3,
    "sem": 6,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Physical & Data Link Layer (OSI vs TCP/IP, Framing, Error detection CRC, Flow control Sliding Window, HDLC)",
      "Unit II: Medium Access Control (Pure & Slotted ALOHA, CSMA/CD, Ethernet IEEE 802.3, Wireless LAN 802.11)",
      "Unit III: Network Layer & Routing (IPv4 addressing & subnetting, CIDR, Distance Vector Routing, Link State OSPF, BGP)",
      "Unit IV: Transport Layer (TCP 3-way handshake, Flow control, TCP Congestion control Slow Start, UDP vs TCP)",
      "Unit V: Application Layer & Network Security (DNS, HTTP/HTTPS, SMTP, Public key cryptography RSA, Firewalls)"
    ],
    "formulas": [
      "Maximum ALOHA Throughput: Pure ALOHA = 1/(2e) \u2248 18.4%; Slotted ALOHA = 1/e \u2248 36.8%",
      "Cyclic Redundancy Check (CRC): Transmitted Frame = (Message << r) + Remainder[ (M << r) / Generator ]",
      "Subnet Masking: Usable Hosts = 2^(32 - Prefix) - 2 (subtract Network & Broadcast addresses)",
      "TCP Congestion Window: Threshold reached \u21d2 Switch from Exponential Growth to Linear Additive Increase"
    ],
    "qa": [
      {
        "q": "Explain IPv4 Classless Inter-Domain Routing (CIDR) and Subnetting. An organization is granted block 200.16.0.0/16. Divide it into 4 equal subnets. [7 Marks]",
        "a": "<b>Subnetting Solution:</b><br>\u2022 Original Block: <code>200.16.0.0/16</code> (Mask: 255.255.0.0).<br>\u2022 We need 4 subnets: 2^2 = 4, so borrow <b>2 bits</b> from host ID.<br>\u2022 New Prefix: 16 + 2 = <b>/18</b> (Subnet Mask: 255.255.192.0).<br>\u2022 Block increment = 256 - 192 = 64 in the 3rd octet.<br><b>Subnets:</b><br>1. <b>Subnet 1:</b> 200.16.0.0/18 (Host Range: 200.16.0.1 to 200.16.63.254, Broadcast: 200.16.63.255)<br>2. <b>Subnet 2:</b> 200.16.64.0/18 (Host Range: 200.16.64.1 to 200.16.127.254, Broadcast: 200.16.127.255)<br>3. <b>Subnet 3:</b> 200.16.128.0/18 (Host Range: 200.16.128.1 to 200.16.191.254, Broadcast: 200.16.191.255)<br>4. <b>Subnet 4:</b> 200.16.192.0/18 (Host Range: 200.16.192.1 to 200.16.255.254, Broadcast: 200.16.255.255)"
      },
      {
        "q": "Explain TCP 3-Way Handshake connection establishment and TCP Congestion Control mechanisms (Slow Start, Congestion Avoidance, Fast Retransmit). [7 Marks]",
        "a": "<b>TCP 3-Way Handshake:</b><br>1. <i>SYN:</i> Client sends <code>SYN=1, seq=x</code> to Server.<br>2. <i>SYN-ACK:</i> Server responds with <code>SYN=1, ACK=1, seq=y, ack=x+1</code>.<br>3. <i>ACK:</i> Client sends <code>ACK=1, ack=y+1</code>. Connection established.<br><b>Congestion Control:</b><br>\u2022 <b>Slow Start:</b> cwnd starts at 1 MSS and doubles every RTT (exponential growth: 1, 2, 4, 8...) until <code>ssthresh</code>.<br>\u2022 <b>Congestion Avoidance:</b> Once cwnd >= ssthresh, growth switches to Additive Increase (increases by 1 MSS per RTT).<br>\u2022 <b>On Timeout:</b> ssthresh = cwnd / 2, cwnd reset to 1 MSS (Multiplicative Decrease).<br>\u2022 <b>Fast Retransmit & Fast Recovery:</b> Upon 3 duplicate ACKs, retransmits immediately without waiting for timeout, sets ssthresh = cwnd / 2 and cwnd = ssthresh + 3."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Compare Distance Vector Routing (Bellman-Ford & Count-to-Infinity) with Link State Routing (Dijkstra)."
      },
      {
        "year": "June 2024",
        "q": "Explain RSA public key encryption algorithm with a numerical example: p=3, q=11, e=7."
      },
      {
        "year": "Dec 2023",
        "q": "Explain CSMA/CD protocol with binary exponential back-off algorithm and collision window."
      }
    ]
  },
  {
    "code": "CS-701",
    "title": "Cloud Computing & Virtualization",
    "year": 4,
    "sem": 7,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Cloud Architecture & Service Models (NIST characteristics, IaaS, PaaS, SaaS, Public/Private/Hybrid)",
      "Unit II: Virtualization Technologies (Hypervisors Type-1 & Type-2, Full vs Para-virtualization, Containerization Docker)",
      "Unit III: Cloud Storage & Distributed File Systems (GFS, HDFS, Object storage S3, Consistency models)",
      "Unit IV: Cloud Programming Models (MapReduce algorithm, Hadoop architecture, Serverless computing AWS Lambda)",
      "Unit V: Cloud Security & SLA (Shared responsibility model, IAM, Data encryption, Multi-tenancy isolation)"
    ],
    "formulas": [
      "Cloud Availability: A = MTBF / (MTBF + MTTR) x 100% (e.g. 99.99% 'four nines' = 52.6 min downtime/yr)",
      "MapReduce Pipeline: Input \u2192 Splitting \u2192 Mapping \u2192 Shuffling & Sorting \u2192 Reducing \u2192 Final Output",
      "NIST 5 Essential Cloud Characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service"
    ],
    "qa": [
      {
        "q": "Explain the NIST Cloud Computing reference architecture. Compare IaaS, PaaS, and SaaS with examples. [7 Marks]",
        "a": "<b>NIST Definition:</b> A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (networks, servers, storage, applications).<br><b>Service Models Comparison:</b><br>1. <b>IaaS (Infrastructure as a Service):</b> Provides raw virtual machines, storage, and networking. User manages OS, middleware, and apps. E.g., AWS EC2, Google Compute Engine, Azure VMs.<br>2. <b>PaaS (Platform as a Service):</b> Provides runtime environment and deployment tools without managing underlying OS. E.g., AWS Elastic Beanstalk, Heroku, Google App Engine.<br>3. <b>SaaS (Software as a Service):</b> Complete end-user application running on cloud. E.g., Gmail, Google Docs, Salesforce, Microsoft 365."
      },
      {
        "q": "What is Virtualization? Compare Type-1 (Bare Metal) and Type-2 (Hosted) Hypervisors. Differentiate between Virtual Machines and Docker Containers. [7 Marks]",
        "a": "<b>Virtualization:</b> Technology that allows creation of multiple simulated environments or dedicated resources from a single physical hardware system.<br><b>Hypervisor Comparison:</b><br>\u2022 <i>Type-1 (Bare-Metal):</i> Runs directly on physical host hardware (e.g., VMware ESXi, KVM, Xen, Hyper-V). High performance, enterprise standard.<br>\u2022 <i>Type-2 (Hosted):</i> Runs as software application on top of an existing host OS (e.g., VirtualBox, VMware Workstation). Slower due to host OS overhead.<br><b>VMs vs Containers:</b><br>\u2022 <i>VM:</i> Virtualizes hardware; each VM carries a full Guest OS (heavy, gigabytes, minutes to boot).<br>\u2022 <i>Docker Container:</i> Virtualizes OS kernel; containers share the host Linux kernel (lightweight, megabytes, starts in milliseconds)."
      },
      {
        "q": "Explain the Hadoop MapReduce computational model with the Word Count problem step-by-step. [7 Marks]",
        "a": "<b>MapReduce:</b> A software framework for distributed processing of massive datasets across clusters of commodity hardware.<br><b>Word Count Example Execution:</b><br>1. <i>Input:</i> Text file split into chunks across HDFS nodes.<br>2. <i>Map Phase:</i> Reads lines, outputs key-value pairs (word, 1).<br>   Example: 'Deer Bear River' \u2192 ('Deer', 1), ('Bear', 1), ('River', 1).<br>3. <i>Shuffle & Sort Phase:</i> Network framework groups all identical keys together across nodes.<br>   ('Bear', [1, 1]), ('Deer', [1]), ('River', [1, 1, 1]).<br>4. <i>Reduce Phase:</i> Aggregates values per key.<br>   ('Bear', 2), ('Deer', 1), ('River', 3).<br>5. <i>Output:</i> Written back to HDFS with replication factor 3."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain AWS Shared Responsibility Model for cloud security between provider and customer."
      },
      {
        "year": "June 2024",
        "q": "Explain Google File System (GFS) architecture: Master, Chunkservers, and 64MB chunk replication."
      },
      {
        "year": "Dec 2023",
        "q": "Explain Serverless computing architecture and cold-start latency mitigation in AWS Lambda."
      },
      {
        "year": "June 2023",
        "q": "Explain Service Level Agreements (SLA) metrics: RTO (Recovery Time Objective) and RPO (Recovery Point Objective)."
      },
      {
        "year": "Dec 2022",
        "q": "Explain Cloud identity and access management (IAM) role-based access control (RBAC)."
      }
    ]
  },
  {
    "code": "CS-702",
    "title": "Artificial Intelligence & Expert Systems",
    "year": 4,
    "sem": 7,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: AI Fundamentals & Intelligent Agents (PEAS model, Agent architectures, State space search)",
      "Unit II: Heuristic Search Techniques (Generate-and-Test, Hill Climbing, Best-First Search, A* and AO* algorithms)",
      "Unit III: Game Playing & Knowledge Representation (Minimax algorithm, Alpha-Beta pruning, First-Order Predicate Logic, Unification)",
      "Unit IV: Expert Systems & Rule-Based Reasoning (Forward vs Backward chaining, Inference engine, Knowledge acquisition)",
      "Unit V: Uncertainty & Probabilistic Reasoning (Bayes' Theorem, Bayesian Belief Networks, Dempster-Shafer theory)"
    ],
    "formulas": [
      "A* Evaluation Function: f(n) = g(n) + h(n) (where g(n)=actual cost from start, h(n)=heuristic estimate to goal)",
      "Admissibility of A*: If h(n) <= h*(n) (never overestimates true cost), A* is guaranteed to find optimal path!",
      "Bayes' Theorem: P(A | B) = [P(B | A) x P(A)] / P(B)",
      "Alpha-Beta Pruning: Prune when \u03b1 >= \u03b2 (\u03b1 = highest value found by MAX, \u03b2 = lowest value found by MIN)"
    ],
    "qa": [
      {
        "q": "Explain the A* Search algorithm with an example. Prove that A* is complete and optimal if the heuristic is admissible. [7 Marks]",
        "a": "<b>A* Algorithm:</b> An informed (heuristic) best-first search algorithm that combines Dijkstra's shortest path with greedy heuristic search.<br><b>Evaluation Function:</b> <code>f(n) = g(n) + h(n)</code><br>\u2022 <b>g(n):</b> Actual exact cost incurred to reach node n from start node.<br>\u2022 <b>h(n):</b> Estimated heuristic cost from node n to nearest goal state.<br><b>Optimality Proof:</b><br>Suppose a suboptimal goal G2 is picked while optimal goal G1 is unexpanded.<br>\u2022 Since G2 is a goal, h(G2) = 0 \u21d2 f(G2) = g(G2) > g(G1).<br>\u2022 For an ancestor n of G1 on the open list: f(n) = g(n) + h(n) <= g(G1) (since h is admissible).<br>\u2022 Therefore f(n) <= g(G1) < f(G2).<br>\u2022 The priority queue will always expand n before G2. Hence G2 can never be chosen before G1. <b>A* is Optimal!</b>"
      },
      {
        "q": "Explain Minimax Algorithm and Alpha-Beta Pruning with a game tree diagram. How does Alpha-Beta pruning optimize search? [7 Marks]",
        "a": "<b>Minimax:</b> A decision-making algorithm for two-player zero-sum adversarial games (e.g. Chess, Tic-Tac-Toe). MAX tries to maximize utility; MIN tries to minimize utility.<br><b>Alpha-Beta Pruning:</b> Optimizes Minimax by discarding branches that cannot possibly influence the final decision:<br>\u2022 <b>\u03b1 (Alpha):</b> Best choice (maximum utility) found so far along the path for MAX.<br>\u2022 <b>\u03b2 (Beta):</b> Best choice (minimum utility) found so far along the path for MIN.<br>\u2022 <b>Pruning Condition:</b> If at any node <b>\u03b1 >= \u03b2</b>, remaining child branches can be safely pruned!<br><b>Complexity:</b> Reduces effective branching factor from b to \u221ab, doubling the searchable search depth (from depth d to 2d in chess)."
      },
      {
        "q": "Explain the architecture of an Expert System with a neat diagram. Differentiate between Forward Chaining and Backward Chaining. [7 Marks]",
        "a": "<b>Expert System Architecture:</b><br>1. <i>User Interface:</i> Queries user and presents advice.<br>2. <i>Inference Engine:</i> Brain of the system that applies logical deduction rules to facts.<br>3. <i>Knowledge Base:</i> Contains domain-specific domain heuristics and IF-THEN production rules.<br>4. <i>Working Memory:</i> Stores temporary facts of the current session.<br>5. <i>Explanation Subsystem:</i> Explains 'HOW' a conclusion was reached and 'WHY' a question is asked.<br><b>Comparison:</b><br>\u2022 <b>Forward Chaining (Data-Driven):</b> Starts from known facts and applies rules to infer new conclusions until a goal is reached (used in diagnostics, planning).<br>\u2022 <b>Backward Chaining (Goal-Driven):</b> Starts with a hypothesis (goal) and searches backwards for supporting facts (used in medical diagnosis, debugging)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Construct a Bayesian Belief Network for a Medical Diagnostic scenario and calculate joint probability."
      },
      {
        "year": "June 2024",
        "q": "Explain Unification algorithm and Resolution Refutation in First-Order Predicate Logic."
      },
      {
        "year": "Dec 2023",
        "q": "Explain Hill Climbing search algorithm and its limitations: Local Maxima, Plateau, and Ridge."
      },
      {
        "year": "June 2023",
        "q": "Explain PEAS (Performance, Environment, Actuators, Sensors) specification for an Automated Taxi Driver."
      },
      {
        "year": "Dec 2022",
        "q": "Explain Genetic Algorithm operators: Selection, Crossover, and Mutation with example."
      }
    ]
  },
  {
    "code": "CS-801",
    "title": "Deep Learning & Neural Networks",
    "year": 4,
    "sem": 8,
    "credits": 4,
    "branch": "CSE Core",
    "units": [
      "Unit I: Biological & Artificial Neurons (Perceptron, Activation functions Sigmoid, ReLU, Softmax, Loss functions)",
      "Unit II: Multi-Layer Perceptrons & Backpropagation (Gradient descent, SGD, Adam optimizer, Vanishing gradients)",
      "Unit III: Convolutional Neural Networks (CNN) (Convolution kernel, Pooling layers, Padding, ResNet, VGG)",
      "Unit IV: Recurrent Neural Networks (RNN) (Sequence modeling, LSTM cell architecture, GRU, Vanishing gradient in time)",
      "Unit V: Generative AI & Transformers (Attention mechanism, Self-attention, Transformer encoder-decoder, GANs)"
    ],
    "formulas": [
      "Cross-Entropy Loss: L = - \u03a3 y_i log(\u0177_i)",
      "Softmax Function: \u03c3(z)_i = e^(z_i) / \u03a3_j e^(z_j)",
      "CNN Output Dimension: O = \u230a(W - K + 2P) / S\u230b + 1 (where W=input, K=kernel, P=padding, S=stride)",
      "Scaled Dot-Product Attention: Attention(Q, K, V) = softmax( (Q K^T) / \u221ad_k ) V"
    ],
    "qa": [
      {
        "q": "Derive the Backpropagation weight update rule using the chain rule of partial derivatives for a 2-layer Neural Network. [7 Marks]",
        "a": "<b>Formulation:</b> Consider input x, hidden layer h = \u03c3(W1 x + b1), output \u0177 = \u03c3(W2 h + b2), and loss E = 0.5 (y - \u0177)^2.<br><b>Chain Rule Derivation:</b><br>1. Gradient for Output Weights W2:<br>   \u2202E/\u2202W2 = (\u2202E/\u2202\u0177) x (\u2202\u0177/\u2202z2) x (\u2202z2/\u2202W2) = -(y - \u0177) x \u03c3'(z2) x h.<br>   Let error term \u03b42 = (\u0177 - y) \u03c3'(z2). Then <b>\u2202E/\u2202W2 = \u03b42 \u00b7 h^T</b>.<br>2. Gradient for Hidden Weights W1:<br>   \u2202E/\u2202W1 = (\u2202E/\u2202z2) x (\u2202z2/\u2202h) x (\u2202h/\u2202z1) x (\u2202z1/\u2202W1) = (\u03b42 \u00b7 W2^T) \u2299 \u03c3'(z1) \u00b7 x^T.<br>   Let error term \u03b41 = (W2^T \u03b42) \u2299 \u03c3'(z1). Then <b>\u2202E/\u2202W1 = \u03b41 \u00b7 x^T</b>.<br>3. <b>Weight Update Rule:</b> W_new = W_old - \u03b7 (\u2202E/\u2202W), where \u03b7 is the learning rate."
      },
      {
        "q": "Explain the architecture and working of a Convolutional Neural Network (CNN). Differentiate between Valid and Same padding. [7 Marks]",
        "a": "<b>CNN Architecture:</b><br>1. <b>Convolution Layer:</b> Slides learnable filter kernels across the input image to compute dot products, producing Feature Maps that extract local spatial features (edges, textures, shapes).<br>2. <b>Activation (ReLU):</b> Introduces non-linearity: f(x) = max(0, x), mitigating vanishing gradients.<br>3. <b>Pooling Layer (Max/Avg Pooling):</b> Downsamples spatial dimensions (reduces computation and parameters) while providing translation invariance.<br>4. <b>Fully Connected (FC) Layer:</b> Flattens pooled feature maps into a vector and performs final class classification via Softmax.<br><b>Padding:</b><br>\u2022 <i>Valid Padding (P=0):</i> No padding added. Output dimension shrinks: O = (W - K)/S + 1.<br>\u2022 <i>Same Padding:</i> Zero-padding added around image edges such that output dimension equals input dimension (when S=1)."
      }
    ],
    "pyq": [
      {
        "year": "Dec 2024",
        "q": "Explain Long Short-Term Memory (LSTM) cell architecture: Forget Gate, Input Gate, and Output Gate."
      },
      {
        "year": "June 2024",
        "q": "Explain Self-Attention mechanism in Transformer architecture and compare with RNNs."
      },
      {
        "year": "Dec 2023",
        "q": "Explain Generative Adversarial Networks (GANs): Generator vs Discriminator minimax game."
      }
    ]
  }
];

let currentNotesYear = 'all';
let currentNotesSem = 'all';
let currentSearchQuery = '';

function initNotesVault() {
  renderNotesCards();
}

function switchNotesYear(year) {
  currentNotesYear = year;
  currentNotesSem = 'all';
  document.querySelectorAll('.notes-year-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-stone-900', 'text-white');
    btn.classList.add('bg-white', 'text-stone-900');
  });
  const activeBtn = document.getElementById('notes-year-' + year);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-stone-900');
    activeBtn.classList.add('active', 'bg-stone-900', 'text-white');
  }
  renderNotesCards();
}

function filterNotesBySem(sem) {
  currentNotesSem = sem;
  document.querySelectorAll('.notes-sem-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-amber-300', 'font-black');
    btn.classList.add('bg-stone-100', 'font-bold');
  });
  const activeBtn = document.getElementById('notes-sem-' + sem);
  if (activeBtn) {
    activeBtn.classList.remove('bg-stone-100', 'font-bold');
    activeBtn.classList.add('active', 'bg-amber-300', 'font-black');
  }
  renderNotesCards();
}

function filterNotesSearch(query) {
  currentSearchQuery = (query || '').toLowerCase().trim();
  renderNotesCards();
}

function renderNotesCards() {
  const container = document.getElementById('notes-grid-container');
  if (!container) return;

  const filtered = RGPV_NOTES_DATABASE.filter(sub => {
    const matchYear = (currentNotesYear === 'all' || sub.year.toString() === currentNotesYear.toString());
    const matchSem = (currentNotesSem === 'all' || sub.sem.toString() === currentNotesSem.toString());
    const matchSearch = (!currentSearchQuery || 
      sub.code.toLowerCase().includes(currentSearchQuery) || 
      sub.title.toLowerCase().includes(currentSearchQuery) ||
      sub.units.some(u => u.toLowerCase().includes(currentSearchQuery))
    );
    return matchYear && matchSem && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-12 text-center bg-white border-2 border-stone-800 rounded-2xl shadow-[4px_4px_0px_#18181b]">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-xl font-black text-stone-900">No RGPV Subjects Found</h3>
        <p class="text-xs text-stone-600 mt-1">Try adjusting your year, semester, or search query.</p>
        <button onclick="switchNotesYear('all'); filterNotesBySem('all');" class="mt-4 tactile-btn bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-lg">
          Reset Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(sub => `
    <div class="bg-white border-2 border-stone-900 rounded-2xl p-5 shadow-[4px_4px_0px_#18181b] flex flex-col justify-between hover:-translate-y-1 transition duration-200 relative">
      <div class="washi-tape washi-yellow tape-tr"></div>
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-mono text-xs font-black bg-stone-900 text-white px-2 py-0.5 rounded shadow-sm">
            ${sub.code}
          </span>
          <div class="flex items-center gap-1.5">
            <span class="stamp-pill bg-amber-100 text-amber-900 border-amber-300 text-[10px] py-0.2">
              Yr ${sub.year} • Sem ${sub.sem}
            </span>
            <span class="stamp-pill bg-emerald-100 text-emerald-900 border-emerald-300 text-[10px] py-0.2 font-mono">
              ${sub.credits} Credits
            </span>
          </div>
        </div>
        <h3 class="text-lg font-black text-stone-900 leading-tight mb-2">
          ${sub.title}
        </h3>
        
        <!-- Strategy Pill -->
        <div class="bg-amber-50/80 border border-amber-300/80 rounded-lg p-2.5 mb-3 text-[11px] text-amber-950">
          <span class="font-bold block text-[10px] uppercase font-mono tracking-wider text-amber-800">Exam Strategy Blueprint</span>
          <span class="line-clamp-2">${sub.roadmap ? sub.roadmap.strategy : 'Complete 5-unit high-yield curriculum with solved derivations and past year PYQs.'}</span>
        </div>

        <div class="space-y-1 mb-4 text-[11px] text-stone-600 font-medium">
          <div class="flex items-center gap-1.5 text-stone-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <b>5 RGPV Units Covered</b> (Complete Syllabus)
          </div>
          <div class="flex items-center gap-1.5 text-stone-800">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <b>${sub.qa.length} Detailed 7/14M Q&A</b> + Vector Flowcharts
          </div>
          <div class="flex items-center gap-1.5 text-stone-800">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <b>${sub.pyq.length} Past Years PYQ (2020–2024)</b>
          </div>
        </div>
      </div>
      <div class="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
        <button onclick="openNotesModal('${sub.code}')" class="tactile-btn flex-1 bg-stone-900 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5">
          <span>Read Roadmap & Notes</span>
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
        </button>
        <button onclick="printNotesPDF('${sub.code}')" class="tactile-btn bg-amber-400 hover:bg-amber-500 text-stone-900 border border-stone-800 text-xs font-black py-2 px-3 rounded-lg flex items-center gap-1 shadow-[2px_2px_0px_#18181b]" title="Download / Print Aesthetic PDF">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span>Themed PDF</span>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function openNotesModal(code) {
  const sub = RGPV_NOTES_DATABASE.find(s => s.code === code);
  if (!sub) return;

  const modal = document.getElementById('notes-reader-modal');
  const content = document.getElementById('notes-reader-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <!-- Top Modal Header -->
    <div class="sticky top-0 z-20 bg-stone-900 text-white p-4 rounded-t-xl flex items-center justify-between shadow-lg print:hidden">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 font-pixel font-bold flex items-center justify-center text-sm shadow">A</div>
        <div>
          <span class="text-[10px] font-mono uppercase text-amber-400 block font-bold">Apertu Academic OS • RGPV Study Vault</span>
          <h3 class="text-base font-black text-white">${sub.code} — ${sub.title}</h3>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="printNotesPDF('${sub.code}')" class="tactile-btn bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[2px_2px_0px_#18181b]">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span>Save Themed PDF</span>
        </button>
        <button onclick="closeNotesModal()" class="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center font-bold">✕</button>
      </div>
    </div>

    <!-- Modal Body Content -->
    <div id="printable-notes-doc" class="bg-[#fcfbf7] p-6 sm:p-10 space-y-8 font-sans text-stone-900 border-x-2 border-b-2 border-stone-800 rounded-b-xl">
      
      <!-- Top Branding -->
      <div class="border-b-4 border-stone-900 pb-6">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-amber-300 border-2 border-stone-900 flex items-center justify-center font-pixel text-xl font-black text-stone-900 shadow-[2px_2px_0px_#18181b]">APERTU</div>
            <div>
              <h1 class="text-2xl font-black text-stone-900 tracking-tight">APERTU — ACADEMIC VAULT</h1>
              <p class="text-xs text-stone-600 font-mono">Official RGPV Semester Notes & Question Bank • Curated for Priyanshu Kushwaha (CS-3)</p>
            </div>
          </div>
          <div class="text-right">
            <span class="stamp-pill bg-stone-900 text-white font-mono text-xs">${sub.code}</span>
            <span class="block text-[10px] font-bold text-stone-500 mt-1">B.Tech CSE • Year ${sub.year} (Sem ${sub.sem}) • ${sub.credits} Credits</span>
          </div>
        </div>

        <div class="bg-amber-100/70 border-2 border-stone-900 rounded-xl p-4 shadow-[3px_3px_0px_#18181b]">
          <h2 class="text-xl font-black text-stone-900 mb-1">${sub.title}</h2>
          <p class="text-xs text-stone-700 font-medium">Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV) Bhopal • Complete Examination Booster Note</p>
        </div>
      </div>

      <!-- STRATEGIC STUDY ROADMAP (HOW TO STUDY) -->
      ${sub.roadmap ? `
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">🗺️</span>
          <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
            Subject Study Roadmap &amp; Exam Strategy (70/70 Blueprint)
          </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white border-2 border-stone-900 rounded-xl p-4 shadow-[3px_3px_0px_#18181b]">
            <span class="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              Pass Guarantee Strategy (35+ Marks)
            </span>
            <p class="text-xs text-stone-700 mt-2 leading-relaxed">
              ${sub.roadmap.pass_target}
            </p>
          </div>
          <div class="bg-white border-2 border-stone-900 rounded-xl p-4 shadow-[3px_3px_0px_#18181b]">
            <span class="text-[10px] font-mono font-bold uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">
              Top Scorer / 9+ CGPA Tip
            </span>
            <p class="text-xs text-stone-700 mt-2 leading-relaxed">
              ${sub.roadmap.top_scorer_tip}
            </p>
          </div>
        </div>
        <div class="bg-stone-100 border border-stone-300 rounded-xl p-3 text-xs text-stone-700 font-mono">
          <b class="text-stone-900">RGPV Question Blueprint:</b> ${sub.roadmap.blueprint}
        </div>
      </div>
      ` : ''}

      <!-- VECTOR SVG FLOWCHART / ARCHITECTURE DIAGRAM -->
      ${sub.diagram_svg ? `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">📐</span>
            <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
              High-Resolution Concept Architecture &amp; Flowchart
            </h3>
          </div>
          <span class="stamp-pill bg-blue-100 text-blue-900 border-blue-400 font-mono text-[10px]">
            Vector SVG • 300 DPI Ready
          </span>
        </div>
        <div class="bg-white border-2 border-stone-900 rounded-xl p-3 shadow-[3px_3px_0px_#18181b] overflow-x-auto">
          ${sub.diagram_svg}
        </div>
      </div>
      ` : ''}

      <!-- 1. SYLLABUS -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">📋</span>
          <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
            1. Complete 5-Unit RGPV Syllabus Coverage
          </h3>
        </div>
        <div class="bg-white border-2 border-stone-900 rounded-xl p-4 shadow-[3px_3px_0px_#18181b] space-y-2">
          ${sub.units.map(u => `
            <div class="text-xs text-stone-800 font-medium pb-2 border-b border-stone-100 last:border-b-0">
              ${u}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 2. HIGH-YIELD FORMULAS -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">⚡</span>
          <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
            2. High-Yield Formulas, Laws &amp; Cheat Sheet
          </h3>
        </div>
        <div class="bg-stone-900 text-amber-300 font-mono text-xs p-5 rounded-xl border-2 border-stone-900 space-y-2 shadow-[4px_4px_0px_#18181b]">
          ${sub.formulas.map(f => `
            <div class="flex items-start gap-2">
              <span class="text-amber-400 font-bold">▶</span>
              <span class="leading-relaxed">${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. DETAILED 7M / 14M UNIVERSITY QUESTIONS & ANSWERS -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">🎯</span>
            <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
              3. Most Frequent 7-Mark &amp; 14-Mark University Questions &amp; Answers
            </h3>
          </div>
          <span class="stamp-pill bg-purple-100 text-purple-900 border-purple-400 font-mono text-[10px]">Step-by-Step Model Solutions</span>
        </div>
        
        <div class="space-y-4">
          ${sub.qa.map((item, idx) => `
            <div class="bg-white border-2 border-stone-900 rounded-xl p-5 shadow-[4px_4px_0px_#18181b] relative">
              <div class="flex items-start justify-between gap-3 mb-3 border-b border-stone-200 pb-2">
                <h4 class="font-bold text-stone-900 text-sm leading-snug">
                  Q${idx + 1}: ${item.q}
                </h4>
                <span class="shrink-0 stamp-pill bg-emerald-100 text-emerald-900 border-emerald-400 text-[10px] font-mono">
                  7M / 14M Target
                </span>
              </div>
              <div class="text-xs text-stone-700 leading-relaxed font-sans space-y-2 bg-stone-50/70 p-3.5 rounded-lg border border-stone-200">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. PAST 5 YEARS PYQ BANK -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">📚</span>
            <h3 class="text-base font-black text-stone-900 uppercase font-mono tracking-wider">
              4. Previous 5 Years RGPV Question Bank (2020–2024)
            </h3>
          </div>
          <span class="stamp-pill bg-amber-100 text-amber-900 border-amber-400 font-mono text-[10px]">Official Exam Papers</span>
        </div>

        <div class="bg-white border-2 border-stone-900 rounded-xl p-4 shadow-[3px_3px_0px_#18181b] divide-y divide-stone-200">
          ${sub.pyq.map((p, idx) => `
            <div class="py-2.5 flex items-start justify-between gap-4 text-xs">
              <div class="text-stone-800">
                <span class="font-bold text-stone-900 font-mono">Q${idx + 1}.</span> ${p.q}
              </div>
              <span class="shrink-0 font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded text-[10px] border border-purple-300">
                ${p.year}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- FOOTER NOTEBOOK BRANDING -->
      <div class="pt-6 border-t-2 border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-600">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Apertu Academic OS • SISTec Gandhi Nagar Bhopal</span>
        </div>
        <div class="text-right">
          <span>Student: Priyanshu Kushwaha (CS-3) • Roll: 6523402</span>
        </div>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  if (window.lucide) lucide.createIcons();
}

function closeNotesModal() {
  const modal = document.getElementById('notes-reader-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// =============================================================================
// APERTU AESTHETIC THEMED PDF & PRINT GENERATOR
// Renders notebook lined background, washi tape, stamp badges, vector diagrams
// =============================================================================
function printNotesPDF(code) {
  const sub = RGPV_NOTES_DATABASE.find(s => s.code === code);
  if (!sub) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download or print your aesthetic RGPV notes PDF.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Apertu Notes — ${sub.code} ${sub.title} (RGPV B.Tech)</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Silkscreen:wght@700&family=Space+Grotesk:wght@500;700&display=swap');

        @page {
          size: A4;
          margin: 12mm 12mm 12mm 12mm;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #18181b;
          background-color: #fcfbf7;
          background-image: 
            linear-gradient(to right, #f1ede4 1px, transparent 1px),
            linear-gradient(to bottom, #f1ede4 1px, transparent 1px);
          background-size: 20px 20px;
          line-height: 1.5;
          font-size: 10pt;
        }

        .print-toolbar {
          position: sticky;
          top: 0;
          z-index: 9999;
          background: #18181b;
          color: #ffffff;
          padding: 10px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #27272a;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }

        .print-toolbar-btn {
          background: #facc15;
          color: #18181b;
          border: 1.5px solid #18181b;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          font-size: 9pt;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.15s;
        }
        .print-toolbar-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #000000;
        }

        .container {
          max-width: 820px;
          margin: 0 auto;
          padding: 20px 25px;
          background: #fdfcf9;
          border: 2px solid #18181b;
          box-shadow: 5px 5px 0px #18181b;
          border-radius: 12px;
          position: relative;
        }

        .washi-tape {
          position: absolute;
          top: -10px;
          right: 35px;
          width: 110px;
          height: 24px;
          background: rgba(254, 240, 138, 0.9);
          border: 1px dashed rgba(202, 138, 4, 0.6);
          transform: rotate(2deg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 3px solid #18181b;
          padding-bottom: 12px;
          margin-bottom: 18px;
        }

        .brand-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-logo {
          background: #facc15;
          border: 2px solid #18181b;
          box-shadow: 2px 2px 0px #18181b;
          border-radius: 8px;
          font-family: 'Silkscreen', monospace;
          font-weight: 700;
          font-size: 13pt;
          padding: 6px 10px;
          color: #18181b;
        }

        .brand-text h1 {
          margin: 0;
          font-size: 15pt;
          font-weight: 900;
          letter-spacing: -0.3px;
        }
        .brand-text p {
          margin: 2px 0 0 0;
          font-size: 8pt;
          color: #52525b;
          font-family: monospace;
        }

        .stamp-badge {
          background: #18181b;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 9pt;
          font-weight: bold;
        }

        .sub-meta {
          font-size: 8pt;
          color: #52525b;
          margin-top: 4px;
          font-family: monospace;
          text-align: right;
        }

        .title-card {
          background: #fef08a;
          border: 2px solid #18181b;
          box-shadow: 3px 3px 0px #18181b;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }
        .title-card h2 {
          margin: 0 0 3px 0;
          font-size: 14pt;
          font-weight: 900;
        }
        .title-card p {
          margin: 0;
          font-size: 8.5pt;
          color: #44403c;
          font-weight: 600;
        }

        .section-head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5pt;
          font-weight: 900;
          text-transform: uppercase;
          font-family: monospace;
          border-bottom: 1.5px solid #18181b;
          padding-bottom: 3px;
          margin: 18px 0 10px 0;
        }

        .roadmap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 12px;
        }

        .roadmap-box {
          background: #ffffff;
          border: 1.5px solid #18181b;
          box-shadow: 2px 2px 0px #18181b;
          border-radius: 6px;
          padding: 10px;
          font-size: 8.5pt;
        }
        .roadmap-tag {
          display: inline-block;
          font-family: monospace;
          font-weight: bold;
          font-size: 7.5pt;
          padding: 2px 6px;
          border-radius: 3px;
          margin-bottom: 4px;
        }

        .tag-green { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
        .tag-purple { background: #f3e8ff; color: #6b21a8; border: 1px solid #d8b4fe; }
        .tag-yellow { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }

        .diagram-container {
          background: #ffffff;
          border: 2px solid #18181b;
          box-shadow: 3px 3px 0px #18181b;
          border-radius: 8px;
          padding: 10px;
          margin: 12px 0;
          text-align: center;
        }

        .formula-box {
          background: #18181b;
          color: #fde047;
          border-radius: 8px;
          padding: 12px 14px;
          font-family: monospace;
          font-size: 8.5pt;
          margin-bottom: 14px;
          line-height: 1.6;
        }

        .qa-card {
          background: #ffffff;
          border: 1.5px solid #18181b;
          box-shadow: 2px 2px 0px #18181b;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
          page-break-inside: avoid;
        }
        .qa-title {
          font-weight: 800;
          font-size: 9.5pt;
          margin-bottom: 6px;
          color: #18181b;
          border-bottom: 1px dashed #d4d4d8;
          padding-bottom: 4px;
        }
        .qa-answer {
          background: #fafaf9;
          border-left: 3px solid #facc15;
          padding: 8px 10px;
          border-radius: 4px;
          font-size: 8.5pt;
          line-height: 1.45;
          color: #27272a;
        }

        .pyq-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 8pt;
          background: #ffffff;
          border: 1.5px solid #18181b;
          border-radius: 6px;
          overflow: hidden;
        }
        .pyq-table th {
          background: #18181b;
          color: #ffffff;
          text-align: left;
          padding: 6px 10px;
          font-family: monospace;
        }
        .pyq-table td {
          padding: 6px 10px;
          border-bottom: 1px solid #e4e4e7;
        }

        .footer {
          border-top: 2px solid #18181b;
          margin-top: 20px;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 7.5pt;
          color: #52525b;
        }

        .page-break {
          page-break-before: always;
          break-before: page;
        }

        @media print {
          .print-toolbar {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            background-image: none !important;
          }
          .container {
            border: 1.5px solid #18181b !important;
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-toolbar">
        <div style="font-family: monospace; font-size: 9pt; font-weight: bold; display: flex; align-items: center; gap: 8px;">
          <span>APERTU ACADEMIC OS — AESTHETIC RGPV NOTES VAULT</span>
          <span style="background: #facc15; color: #18181b; padding: 2px 6px; border-radius: 4px;">A4 PRINT READY</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="window.print()" class="print-toolbar-btn">🖨️ Print / Save as PDF</button>
          <button onclick="window.close()" class="print-toolbar-btn" style="background: #e4e4e7;">✕ Close</button>
        </div>
      </div>

      <div style="padding: 15px 10px;">
        <div class="container">
          <div class="washi-tape"></div>

          <!-- Header -->
          <div class="header">
            <div class="brand-box">
              <div class="brand-logo">APERTU</div>
              <div class="brand-text">
                <h1>APERTU — ACADEMIC OS</h1>
                <p>Curated for Priyanshu Kushwaha (CSE Core • SISTec Bhopal • Roll: 6523402 • OBC Category)</p>
              </div>
            </div>
            <div>
              <div class="stamp-badge">${sub.code}</div>
              <div class="sub-meta">Year ${sub.year} • Sem ${sub.sem} (${sub.credits} Credits)</div>
            </div>
          </div>

          <!-- Title Card -->
          <div class="title-card">
            <h2>${sub.title}</h2>
            <p>Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV) Bhopal • Complete Examination Booster Note</p>
          </div>

          <!-- STRATEGIC ROADMAP -->
          ${sub.roadmap ? `
            <div class="section-head">🗺️ 1. Exam Blueprint &amp; Strategic Roadmap</div>
            <div class="roadmap-grid">
              <div class="roadmap-box">
                <span class="roadmap-tag tag-green">PASS GUARANTEE (35+ MARKS)</span>
                <div>${sub.roadmap.pass_target}</div>
              </div>
              <div class="roadmap-box">
                <span class="roadmap-tag tag-purple">TOP SCORER TIP (9+ CGPA)</span>
                <div>${sub.roadmap.top_scorer_tip}</div>
              </div>
            </div>
            <div class="roadmap-box" style="margin-bottom: 12px; font-family: monospace; font-size: 8pt; background: #f4f4f5;">
              <b>RGPV Marking Blueprint:</b> ${sub.roadmap.blueprint}
            </div>
          ` : ''}

          <!-- SVG DIAGRAM -->
          ${sub.diagram_svg ? `
            <div class="section-head">📐 2. High-Yield Architectural Diagram / Flowchart</div>
            <div class="diagram-container">
              ${sub.diagram_svg}
            </div>
          ` : ''}

          <!-- FORMULAS CHEAT SHEET -->
          <div class="section-head">⚡ 3. High-Yield Formulas, Laws &amp; Cheat Sheet</div>
          <div class="formula-box">
            ${sub.formulas.map(f => `<div>▶ ${f}</div>`).join('')}
          </div>

          <div class="page-break"></div>

          <!-- 7M / 14M SOLVED QUESTIONS -->
          <div class="section-head">🎯 4. Most Frequent 7-Mark &amp; 14-Mark University Questions &amp; Answers</div>
          ${sub.qa.map((item, idx) => `
            <div class="qa-card">
              <div class="qa-title">Q${idx + 1}: ${item.q}</div>
              <div class="qa-answer">${item.a}</div>
            </div>
          `).join('')}

          <!-- PREVIOUS 5 YEARS PYQS -->
          <div class="section-head">📚 5. Previous 5 Years RGPV Question Bank (2020–2024)</div>
          <table class="pyq-table">
            <thead>
              <tr>
                <th style="width: 40px;">No.</th>
                <th>RGPV University Exam Question</th>
                <th style="width: 90px; text-align: center;">Session</th>
              </tr>
            </thead>
            <tbody>
              ${sub.pyq.map((p, idx) => `
                <tr>
                  <td style="font-family: monospace; font-weight: bold;">Q${idx + 1}</td>
                  <td>${p.q}</td>
                  <td style="text-align: center; font-family: monospace; font-weight: bold; color: #6b21a8;">${p.year}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Footer -->
          <div class="footer">
            <span>APERTU ACADEMIC OS • OFFICIAL RGPV CSE NOTES</span>
            <span>VERIFIED FOR PRIYANSHU KUSHWAHA (SISTEC BHOPAL)</span>
            <span>PRINTED VIA SAGARTRACKER / APERTU</span>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
