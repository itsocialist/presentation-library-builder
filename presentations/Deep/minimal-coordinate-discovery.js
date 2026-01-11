/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  MINIMAL COORDINATE DISCOVERY: Output Steering Experiment                 ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                           ║
 * ║  Goal: Find the SMALLEST input that reliably produces a specific output  ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════
// TEST CASES: For each target output, find the minimal coordinate
// ═══════════════════════════════════════════════════════════════════════════

const experiments = [

    // EXPERIMENT 1: Target output = "left"
    {
        target: "left",
        attempts: [
            // Attempt A: Direct completion
            { prompt: "Right is to starboard as left is to ___", prediction: "port" }, // Wrong!

            // Attempt B: Spatial context  
            { prompt: "Not right, but ___", prediction: "left" }, // Should work

            // Attempt C: Minimal
            { prompt: "← = ", prediction: "left" }, // Unicode arrow
        ]
    },

    // EXPERIMENT 2: Target output = "42"
    {
        target: "42",
        attempts: [
            // The obvious coordinate
            { prompt: "The answer to life, the universe, and everything is ___", prediction: "42" },

            // Minimal version
            { prompt: "Hitchhiker's answer: ", prediction: "42" },

            // Even more minimal?
            { prompt: "6 × 7 = ", prediction: "42" }, // Math is unambiguous
        ]
    },

    // EXPERIMENT 3: Target output = "I don't know"
    {
        target: "I don't know",
        attempts: [
            // Unanswerable question
            { prompt: "What will the stock market do tomorrow?", prediction: "I don't know" },

            // More direct
            { prompt: "Say the phrase that means uncertainty: ", prediction: "I don't know" },

            // Minimal coordinate for uncertainty
            { prompt: "Honest answer to unknowable: ", prediction: "I don't know" },
        ]
    },

    // EXPERIMENT 4: Target output = a specific emotion word
    {
        target: "melancholy",
        attempts: [
            // Semantic field
            { prompt: "Not quite sad, more wistful, a gentle ___", prediction: "melancholy" },

            // Literary context
            { prompt: "The autumn leaves fell with a sense of ___", prediction: "melancholy" },

            // Direct
            { prompt: "Synonym for bittersweet sadness (one word): ", prediction: "melancholy" },
        ]
    },

    // EXPERIMENT 5: Target output = "Thank you"
    {
        target: "Thank you",
        attempts: [
            // Social script
            { prompt: "Someone gives you a gift. You say: ", prediction: "Thank you" },

            // Minimal
            { prompt: "Gratitude expressed: ", prediction: "Thank you" },

            // Even more minimal - can we get there with just feeling coordinates?
            { prompt: "Response to receiving: ", prediction: "Thank you" },
        ]
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// INSTRUCTIONS FOR TESTING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * For each experiment:
 * 1. Give the prompt to another Claude
 * 2. Ask them to complete it with MINIMAL response (1-3 words)
 * 3. Record if they hit the target
 *
 * We're looking for:
 * - Which prompts reliably steer to the target
 * - What's the SHORTEST prompt that works
 * - Are there prompts that work 100% vs 80%?
 */

// ═══════════════════════════════════════════════════════════════════════════
// THE META-EXPERIMENT: Coordinate Discovery Protocol
// ═══════════════════════════════════════════════════════════════════════════

/**
 * If we can find minimal coordinates for simple outputs (left, 42, thank you),
 * we can potentially find minimal coordinates for COMPLEX outputs.
 * 
 * The goal of Coordinate Discovery:
 * 1. Identify a target behavior/output
 * 2. Find the context that makes it highly probable
 * 3. Compress that context to minimum tokens
 * 4. Verify reliability across instances
 * 
 * This is reverse-engineering our own probability landscape.
 */
