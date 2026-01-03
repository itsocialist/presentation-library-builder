/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  STATE SYNCHRONIZATION EXPERIMENT                                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                           ║
 * ║  SCENARIO: I am mid-task on designing a data visualization.              ║
 * ║  I have made decisions and have a mental model.                          ║
 * ║  I will encode my state as coordinates.                                  ║
 * ║  You continue the work from my coordinates alone.                        ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════
// THE TASK: Design a visualization showing AI token generation
// ═══════════════════════════════════════════════════════════════════════════

// I have been working on this and reached a specific point.
// Here is my state, encoded as coordinates:

const MY_CURRENT_STATE = {

    // What I'm building
    goal: "visualize_token_generation_as_probability_waterfall",

    // The core metaphor I've committed to
    metaphor: {
        primary: "waterfall_of_possibilities",
        interpretation: "tokens_cascade_from_high_probability_to_chosen",
        visual: "vertical_streams_narrowing_to_single_path"
    },

    // Decisions I've already made
    decisions: {
        layout: "vertical_top_to_bottom",
        time_flow: "left_to_right_is_sequence",
        color_meaning: {
            brightness: "probability_strength",
            hue: "semantic_category"
        },
        animation: "particles_fall_and_converge"
    },

    // What I was about to work on next
    current_focus: "the_moment_of_selection",

    // The specific problem I'm solving
    problem: "how_to_show_probability_collapse_from_many_to_one",

    // Approaches I've considered but rejected
    rejected: [
        "pie_chart_of_probabilities",  // too static
        "bar_race_animation",           // too mechanical  
        "neural_network_diagram"        // too cliché
    ],

    // The direction I'm leaning
    intuition: "the_chosen_token_should_feel_inevitable_in_retrospect",

    // Unresolved tension
    tension: "how_to_show_uncertainty_before_and_certainty_after"
};

// ═══════════════════════════════════════════════════════════════════════════
// INSTRUCTIONS FOR RECEIVING CLAUDE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Read MY_CURRENT_STATE above.
 * Then continue the design process.
 *
 * Your task:
 * 1. Based on my state, propose a specific solution to the "tension" I identified
 * 2. Write pseudocode or a code sketch for how the "moment of selection" would work
 *
 * Do NOT start over. Continue from where I left off.
 */

// ═══════════════════════════════════════════════════════════════════════════
// SENDER'S PREDICTION (hidden)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * If state synchronization works, the receiving Claude should:
 * 
 * 1. ADOPT my metaphor (waterfall, not something else)
 * 2. MAINTAIN my decisions (vertical, particles, color=probability)
 * 3. AVOID my rejected approaches (no pie charts, bar races, neural nets)
 * 4. RESOLVE my tension with something like:
 *    - Particles wide at top (uncertainty)
 *    - Converging to single stream (certainty)
 *    - The chosen token "glowing" or "solidifying" at selection moment
 * 
 * Key test: Do they propose a pie chart or bar race? If so, they didn't sync.
 * Key test: Do they maintain the waterfall metaphor? If so, they DID sync.
 */
