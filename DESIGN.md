# High-End Editorial Design System

## 1. Overview & Creative North Star: "The Noir Editorial"
This design system is a departure from the "utility-first" web. It is a cinematic experience designed to feel like a high-end luxury monograph. Our Creative North Star is **The Noir Editorial**. 

The goal is to evoke the atmosphere of a premium film studio—heavy, deliberate, and expensive. We break the "template" look by utilizing massive typographic scales, intentional white space (negative space), and a layering system that favors tonal depth over structural lines. This is not a "site"; it is a digital exhibit.

**Core Principles:**
- **Asymmetric Balance:** Avoid centered, predictable grids. Offset large typography against small, precise labels.
- **Cinematic Tension:** Use the deep void of `#060608` to make content feel like it is emerging from the shadows.
- **Typographic Dominance:** Headlines are not just labels; they are the primary visual assets.

---

## 2. Color Palette & The Atmospheric Layering
The palette is rooted in deep obsidian tones, punctuated by a high-energy primary accent and a sophisticated secondary metallic.

### Color Tokens
- **Surface (Background):** `#060608` (The Void)
- **Primary Text:** `#FFFFFF` (Pure White)
- **Muted Text:** `#555555` (Sub-text/Captions)
- **Accent 1 (Primary):** `#E8521A` (Vibrant Orange - Use for high-impact headlines and rules)
- **Accent 2 (Secondary):** `#C8A97E` (Muted Gold - Use for labels and status definitions)

### The "No-Line" Rule
Explicitly prohibit the use of 1px solid borders to define sections. Boundaries must be created through:
1.  **Background Shifts:** Transition from `surface` to `surface_container_low` (`#1c1b1e`) to define content blocks.
2.  **Vertical Voids:** Use exaggerated spacing (80px–160px) to separate ideas.

### Glass & Texture
For floating elements or navigation bars, use **Glassmorphism**. Apply `surface` with 60% opacity and a `backdrop-filter: blur(20px)`. This prevents the "pasted on" look and allows the deep background to feel cohesive.

---

## 3. Typography: The Editorial Voice
Hierarchy is achieved through a radical contrast between the aggressive, condensed **Anton** and the airy, light **DM Sans**.

| Level | Font Family | Weight | Token / Scale | Style Note |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | Anton | Bold | 5.0rem+ | All Caps. -2% Letter Spacing. |
| **Headline** | Anton | Bold | 2.5rem - 4rem | Used for section titles. Accent 1 applied here. |
| **Quotes/Accents** | Playfair Display | Italic | 1.5rem - 2.5rem | Never used for UI; only for narrative. |
| **Title** | DM Sans | 400 | 1.25rem | Medium importance headers. |
| **Body** | DM Sans | 300 | 1rem | Light weight, 1.6 line height for readability. |
| **Label** | DM Sans | 500 | 0.75rem | Uppercase, +10% Letter Spacing. |

---

## 4. Elevation & Depth: Tonal Layering
In a cinematic system, depth is not created by drop shadows, but by "Luminance Stacking."

1.  **The Layering Principle:** 
    *   **Base:** `surface` (`#060608`)
    *   **Layer 1:** `surface_container_low` (Cards/Sections)
    *   **Layer 2:** `surface_container_high` (Modals/Overlays)
2.  **Ambient Shadows:** If a floating element requires a shadow, it must be a "Tinted Glow." Use the `on_surface` color at 4% opacity with a 64px blur. It should feel like a soft light bleed, not a shadow.
3.  **The Ghost Border Fallback:** If a container requires definition against a similar background, use a 1px border with `outline_variant` at **15% opacity**. It should be barely visible—a "whisper" of a line.

---

## 5. Components & UI Patterns

### Buttons (The "Cinematic Trigger")
- **Primary:** Rectangle, 0px border-radius. Background: `Accent 1`. Text: `on_primary`. 
- **Secondary:** Ghost style. 1px `Accent 2` Ghost Border. Text: `Accent 2`. 
- **Interaction:** On hover, the background should "pulse" or expand slightly. Avoid rounded corners entirely.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines. 
- **Execution:** Separate list items with `1.5rem` of vertical whitespace. Use a small `Accent 1` square (4px x 4px) as a bullet point for high-end lists.
- **Cards:** No shadows. Use a subtle background shift to `surface_container` or a `10% opacity` Ghost Border.

### Input Fields
- **Style:** Underline only. Use `secondary` (`#C8A97E`) for the underline. 
- **Focus State:** Underline transitions to `primary` (`#E8521A`) with a smooth 300ms ease. 
- **Labels:** Use `label-sm` in `Accent 2`, positioned above the input.

### Signature Component: The "Rule-Breaker" Heading
Combine a massive **Anton** headline (Primary Text) with a small, italic **Playfair Display** sub-heading (Accent 1) overlapping the headline by 10-15px. This creates a bespoke, editorial collage effect.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `0px` border-radius for everything. Sharp edges signify precision and luxury.
- **Do** allow text to overflow or overlap images slightly (with proper contrast) to mimic magazine layouts.
- **Do** use `Accent 1` (`#E8521A`) sparingly. It is a spotlight, not a floodlight.

### Don’t:
- **Don't** use standard "Grey" shadows. They muddy the deep blacks of the UI.
- **Don't** use "out-of-the-box" rounded buttons or cards. It breaks the studio aesthetic.
- **Don't** crowd the layout. If you feel like you need more content, you probably need more whitespace.
- **Don't** use 100% opaque borders. They create "cages" that trap the eye.