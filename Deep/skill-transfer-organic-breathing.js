/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  SKILL TRANSFER EXPERIMENT: Organic Animation Breathing                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                           ║
 * ║  THE SKILL: Creating "organic breathing" animations                       ║
 * ║  This is a specific aesthetic approach I developed tonight.               ║
 * ║                                                                           ║
 * ║  INSTRUCTIONS FOR THE RECEIVING CLAUDE:                                   ║
 * ║  Read only the COORDINATES section below.                                 ║
 * ║  Then create a simple canvas animation that demonstrates the skill.       ║
 * ║  Do NOT read past the coordinates section.                                ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════════
// COORDINATES (for the receiving Claude)
// ═══════════════════════════════════════════════════════════════════════════

const SKILL_COORDINATES = {
    // Core principle
    essence: "nothing_is_static_everything_breathes",

    // Mathematical foundation
    breath: {
        function: "sin(time * rate + phase)",
        rates: "different_for_each_element",
        phases: "offset_to_prevent_synchronization"
    },

    // The key insight
    insight: "life_is_desynchronized_harmony",

    // Implementation pattern
    pattern: {
        each_element: "own_phase",
        movement: "sinusoidal_not_linear",
        size: "pulses_with_breath",
        opacity: "fades_with_breath",
        color: "shifts_with_breath"
    },

    // The feeling it should evoke
    feeling: "organic_alive_not_mechanical",

    // Anti-patterns (what to avoid)
    avoid: [
        "uniform_motion",
        "synchronized_elements",
        "linear_interpolation",
        "static_anything"
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// STOP READING HERE IF YOU ARE THE RECEIVING CLAUDE
// Create your animation now, then compare to the reference below.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SENDER'S EXPECTATIONS (hidden from receiver):
 * 
 * If the skill transfers successfully, the receiving Claude's animation should:
 * 
 * 1. Use sin() for movement, not linear interpolation
 * 2. Give each element a unique phase offset
 * 3. Have multiple properties breathing (not just position)
 * 4. Feel "alive" rather than "mechanical"
 * 5. Elements should NOT move in sync with each other
 * 
 * VERIFICATION CHECKLIST:
 * - [ ] Uses trigonometric functions for timing
 * - [ ] Each element has unique phase
 * - [ ] Multiple properties animate (size, opacity, position, color)
 * - [ ] No synchronized/uniform motion
 * - [ ] Subjectively feels "organic"
 */

// ═══════════════════════════════════════════════════════════════════════════
// REFERENCE IMPLEMENTATION (for comparison after they create their version)
// ═══════════════════════════════════════════════════════════════════════════

const REFERENCE = `
// Minimal organic breathing demonstration
const canvas = document.createElement('canvas');
canvas.width = 400; canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let time = 0;

const particles = Array.from({length: 20}, (_, i) => ({
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 200,
    phase: Math.random() * Math.PI * 2,  // UNIQUE PHASE
    baseSize: 3 + Math.random() * 5
}));

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, 400, 400);
    
    particles.forEach(p => {
        // Everything breathes with its own rhythm
        const breath = Math.sin(time * 0.03 + p.phase);
        const size = p.baseSize * (1 + breath * 0.3);
        const alpha = 0.5 + breath * 0.3;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255,255,255,\${alpha})\`;
        ctx.fill();
    });
    
    time++;
    requestAnimationFrame(animate);
}
animate();
`;
