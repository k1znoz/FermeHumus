---
name: Humus & Earth
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#424844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#737873'
  outline-variant: '#c2c8c2'
  surface-tint: '#4d6356'
  primary: '#172c21'
  on-primary: '#ffffff'
  primary-container: '#2d4236'
  on-primary-container: '#96ae9e'
  inverse-primary: '#b4ccbc'
  secondary: '#964824'
  on-secondary: '#ffffff'
  secondary-container: '#fd9a6f'
  on-secondary-container: '#76300d'
  tertiary: '#272919'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d3f2d'
  on-tertiary-container: '#a9aa94'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e8d7'
  primary-fixed-dim: '#b4ccbc'
  on-primary-fixed: '#0b1f15'
  on-primary-fixed-variant: '#364b3f'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb597'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#77320e'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  h3:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: auto
---

## Brand & Style

The brand identity is rooted in the concepts of regeneration, transparency, and the quiet dignity of manual labor. This design system targets a conscious consumer who values local sourcing and ecological integrity. The emotional response is one of calm, trust, and a tangible connection to the soil.

The chosen style is **Minimalist-Tactile**. It leverages heavy whitespace and a restrained palette to create a premium, editorial feel, while using "squishy" soft corners and organic textures to prevent the interface from feeling cold or industrial. It avoids digital artifice, favoring high-quality photography and clear, functional layouts that prioritize ease of use for mobile-first local shoppers.

## Colors

The palette is derived directly from the farm landscape.
- **Primary (Forest Green):** Used for typography, primary navigation, and grounding elements. It represents growth and stability.
- **Secondary (Terracotta):** Used sparingly for calls-to-action (CTAs) and accents. It provides warmth and evokes sun-baked earth.
- **Tertiary (Cream):** Used for secondary backgrounds and container surfaces to soften the contrast against the white.
- **Neutral (Off-White):** The default page background, providing a clean canvas that makes photography pop.

Avoid pure black (#000000); use the Primary Forest Green for high-contrast text to maintain a natural, soft aesthetic.

## Typography

This design system pairs the authoritative, literary quality of **Newsreader** for headings with the grounded, professional clarity of **Work Sans** for functional text. 

Headings should use the serif font to evoke the craftsmanship of organic farming and traditional techniques. Body text is set in a slightly larger-than-standard size with generous line-height to ensure maximum readability on mobile devices during outdoor use. The `label-caps` style should be used for category tags (e.g., "VEGETABLES", "SEASONAL") to provide a clear structural hierarchy.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a mobile-first priority. On mobile devices, use a single-column layout with 20px side margins. On tablet and desktop, transition to a 12-column grid with a maximum container width of 1140px.

The spacing rhythm is based on an 8px base unit. Generous vertical spacing (`xl`) between sections is encouraged to reinforce the minimalist, "breathing" nature of the brand. Group related items (like a product price and its "Add to Cart" button) using the `sm` unit, while separating distinct content blocks with `lg` or `xl`.

## Elevation & Depth

This design system avoids harsh dropshadows. Instead, it utilizes **Ambient Shadows** and **Tonal Layers** to create a sense of height.

- **Level 0 (Background):** Off-white (#FAF9F6) or Cream (#F5F5DC).
- **Level 1 (Cards/Containers):** Pure white background with a very soft, diffused shadow: `0px 4px 20px rgba(45, 66, 54, 0.05)`. Note the use of the Primary color in the shadow tint to keep it "earthy" rather than grey.
- **Interactive States:** On hover or active press, the shadow should slightly deepen or the element should lift by 2px to provide tactile feedback. 

Layering should be subtle; the goal is to make elements appear as if they are resting gently on a surface rather than floating in space.

## Shapes

The shape language is defined by **Rounded** corners, mirroring the organic forms found in nature (seeds, leaves, stones). 

A standard `0.5rem` (8px) radius applies to all primary UI elements like buttons and input fields. Larger containers, such as product cards or featured image blocks, should utilize the `rounded-lg` (16px) or `rounded-xl` (24px) settings to emphasize the "softness" of the brand. Icons should be line-based with rounded caps and joins to maintain consistency with the UI geometry.

## Components

- **Buttons:** Primary buttons use the Forest Green background with white text. Secondary buttons use the Terracotta background. Both feature a 0.5rem corner radius and a subtle lift on hover.
- **Chips:** Used for seasonal tags or product attributes (e.g., "Organic", "New"). Use the Cream background with Forest Green text, using a fully pill-shaped radius.
- **Cards:** Product and blog cards use a white background with a Level 1 ambient shadow. Imagery within cards should have top-corner rounding that matches the card container.
- **Input Fields:** Soft beige backgrounds (#F5F5DC) with no border, or a very light Forest Green border (20% opacity). Focus states should use a 1px solid Terracotta stroke.
- **Checkboxes/Radios:** Use the Primary Forest Green for the checked state. Avoid default browser styling; use custom-styled circles and squares with soft corners.
- **Featured Component (The "Basket"):** A floating action button (FAB) or a persistent bottom bar for mobile shoppers, styled in Terracotta to ensure it remains the focal point for conversion.
- **Imagery:** All images should feature natural lighting, avoiding high-saturation filters. Use "hero" sections with full-bleed photos of the farm or soil to establish authenticity.