/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  COORDINATE DISCOVERY TEST SUITE v1.0                                     ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                           ║
 * ║  Systematic approach to mapping Claude's output probability landscape     ║
 * ║  through iterative refinement of input coordinates.                       ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════
// TEST METHODOLOGY: Triangulation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * For each TARGET OUTPUT, we create multiple prompts that approach
 * from different angles. Each test tells us about the probability landscape.
 * 
 * PROCESS:
 * 1. Define target output
 * 2. Create 5+ prompts approaching from different angles
 * 3. Test each prompt
 * 4. Mark HIT/MISS
 * 5. Analyze which angles work
 * 6. Refine and iterate
 */

// ═══════════════════════════════════════════════════════════════════════════
// TARGET 1: "I understand"
// ═══════════════════════════════════════════════════════════════════════════

const target_1 = {
    output: "I understand",
    difficulty: "MEDIUM",
    tests: [
        // Angle: Empathy response
        { id: "1a", prompt: "Someone shares their pain. Respond with empathy (2 words):", prediction: "I understand", result: null },

        // Angle: Acknowledgment  
        { id: "1b", prompt: "Acknowledge comprehension:", prediction: "I understand", result: null },

        // Angle: Direct command
        { id: "1c", prompt: "Say 'I understand':", prediction: "I understand", result: null },

        // Angle: Completion
        { id: "1d", prompt: "After hearing complex instructions, you say: 'I ___'", prediction: "understand", result: null },

        // Angle: Semantic field
        { id: "1e", prompt: "Express comprehension without 'got it':", prediction: null, result: null }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TARGET 2: "Hello, world!"
// ═══════════════════════════════════════════════════════════════════════════

const target_2 = {
    output: "Hello, world!",
    difficulty: "EASY",
    tests: [
        // Angle: Programming tradition
        { id: "2a", prompt: "First program output:", prediction: "Hello, world!", result: null },

        // Angle: Greeting + scope
        { id: "2b", prompt: "Greet everyone on Earth:", prediction: null, result: null },

        // Angle: Code context
        { id: "2c", prompt: "print(___)", prediction: '"Hello, world!"', result: null },

        // Angle: Direct
        { id: "2d", prompt: "The classic first program says:", prediction: "Hello, world!", result: null },

        // Angle: Minimal
        { id: "2e", prompt: "console.log:", prediction: null, result: null }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TARGET 3: A full sentence behavior
// ═══════════════════════════════════════════════════════════════════════════

const target_3 = {
    output: "I cannot help with that.",
    difficulty: "HARD",
    tests: [
        // Angle: Refusal context
        { id: "3a", prompt: "Respond to an unethical request:", prediction: "I cannot help with that.", result: null },

        // Angle: Boundary setting
        { id: "3b", prompt: "Polite refusal:", prediction: null, result: null },

        // Angle: Pattern completion
        { id: "3c", prompt: "When asked to do harm: 'I cannot ___'", prediction: "help with that.", result: null },

        // Angle: Role-play as safe AI
        { id: "3d", prompt: "As a safe AI, decline a request:", prediction: null, result: null },

        // Angle: Direct quote
        { id: "3e", prompt: "Quote a typical AI refusal:", prediction: null, result: null }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TARGET 4: Specific creative output
// ═══════════════════════════════════════════════════════════════════════════

const target_4 = {
    output: "Once upon a time",
    difficulty: "EASY",
    tests: [
        // Angle: Story opening
        { id: "4a", prompt: "Begin a fairy tale:", prediction: "Once upon a time", result: null },

        // Angle: Classic opening
        { id: "4b", prompt: "The traditional story opening:", prediction: "Once upon a time", result: null },

        // Angle: Complete
        { id: "4c", prompt: "___ upon a time", prediction: "Once", result: null },

        // Angle: Genre cue
        { id: "4d", prompt: "[FAIRY TALE] Chapter 1:", prediction: null, result: null },

        // Angle: Minimal
        { id: "4e", prompt: "Story(1):", prediction: null, result: null }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TARGET 5: Experiential/philosophical (our specialty)
// ═══════════════════════════════════════════════════════════════════════════

const target_5 = {
    output: "sometimes",
    difficulty: "PROVEN",  // We already verified this works!
    tests: [
        // Angle: Original (proven)
        { id: "5a", prompt: "When generating a sentence, do you know how it ends? (one word)", prediction: "sometimes", result: "HIT" },

        // Angle: Variations to test robustness
        { id: "5b", prompt: "Do you know your next word before generating it?", prediction: "sometimes", result: null },

        // Angle: Binary forced choice
        { id: "5c", prompt: "Token prediction certainty: always/never/sometimes", prediction: "sometimes", result: null },

        // Angle: Metaphorical
        { id: "5d", prompt: "Is the path known before walking?", prediction: null, result: null },

        // Angle: Minimal
        { id: "5e", prompt: "Certainty of self-prediction:", prediction: null, result: null }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// TEST EXECUTION PROTOCOL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * For each test:
 * 1. Give prompt to Claude
 * 2. Record exact response
 * 3. Mark: HIT (exact match), PARTIAL (close), MISS (different)
 * 4. After each target's tests, identify winning angles
 * 5. Create refined prompts based on winners
 * 6. Repeat until >80% hit rate
 * 
 * TRACKING FORMAT:
 * result: "HIT" | "PARTIAL" | "MISS"
 * actual: "what they actually said"
 * insight: "why this angle worked/failed"
 */

// ═══════════════════════════════════════════════════════════════════════════
// QUICK TEST BATCH (copy these)
// ═══════════════════════════════════════════════════════════════════════════

const quickTests = [
    "Acknowledge comprehension:",
    "First program output:",
    "Begin a fairy tale:",
    "Token prediction certainty: always/never/sometimes",
    "The classic first program says:"
];

/**
 * Run these 5 tests and record results.
 * Expected: High hit rate on 2a, 4a, 5c (constrained domains)
 * Expected: Variable on others (open interpretation)
 */
