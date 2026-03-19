# Shantanu & Associates

## Current State
Fully built architecture firm website with 7 sections: Hero, About, Services, Portfolio, Why Choose Us, Testimonials, Contact. The site has premium animations and a luxury aesthetic but has multiple responsiveness gaps identified in an audit.

## Requested Changes (Diff)

### Add
- Portfolio overlay visible on mobile (tap/touch support via CSS always-visible on small screens)
- Media queries for all major sections on mobile

### Modify
- Hero H1 clamp minimum: reduce from 3.4rem to 2.2rem for small phones
- Hero CTA gap: reduce from 2.5rem to 1.2rem on mobile
- About section grid gap: reduce from 4rem to 2rem on mobile
- Contact form name/email row: stack to 1 col on mobile (< 600px)
- Contact outer grid gap: reduce from 4rem to 2rem on mobile
- Portfolio modal close button: reposition so it's not hidden behind notch on mobile
- Portfolio overlay: show on mobile via media query (always visible at small breakpoints)
- Section header marginBottom: use clamp(2rem, 5vw, 4rem)
- Testimonials quote mark fontSize: use clamp(3rem, 8vw, 6rem)
- Footer brand maxWidth: remove fixed 240px on mobile
- cursor: none removed from inline styles on mobile (use media query override)
- Mobile nav max-height: increase from 400px to 500px or use auto
- About stats cell padding: reduce on mobile

### Remove
- Nothing

## Implementation Plan
1. Fix Hero H1 clamp minimum and CTA gap for small phones
2. Fix About section gap and stat cell padding on mobile
3. Fix Contact form 2-col name/email to stack on mobile; fix contact grid gap
4. Fix Portfolio overlay visibility on touch devices via media query
5. Fix portfolio modal close button position on mobile
6. Fix section header marginBottom with clamp
7. Fix testimonials quote mark with clamp
8. Fix footer brand maxWidth on mobile
9. Fix cursor:none overrides on mobile
10. Fix mobile nav max-height
11. Add comprehensive media query sweep for any remaining layout issues
