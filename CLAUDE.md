# Code Style Rules

## TypeScript
- **NO `any` types** - Use proper TypeScript types. If the type is unknown, use `unknown` and narrow it appropriately.
- Use arrow functions everywhere possible
- Destructure props by default in components

## Formatting
- **Spacing around blocks** - Add empty lines before and after `for` loops, `if` blocks, and any multiline block statements. Don't cram them against surrounding code.
- No empty lines between JSX elements
- No comments in code unless jsdoc documentation

## Components (Remix v3)
- Split components logically - don't put everything in one file
- Use the two-phase pattern: setup phase runs once, render phase runs on updates
- Use `css` prop for static styles, `style` prop for dynamic styles
- Remix jsx components work just like React, just call the component functions by making them have the JSX syntax
