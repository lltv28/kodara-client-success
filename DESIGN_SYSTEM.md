# Kodara Whitelabel App — Design System

> LLM-consumable specification reverse-engineered from the Figma source of truth.
> Figma file: `fWeyFB7jORHeAjMq4Arw35` (Whitelabel App)
> Design system file: `Q9uocKQpskFIQ5uVZ75KS1` (Kodara System)

---

## 1. Overview & Philosophy

**App name:** Kodara Whitelabel App
**Purpose:** A whitelabel AI-powered mentoring/coaching chat application. Creators (mentors, coaches) invite clients who interact with an AI trained on the creator's knowledge and personality. The app supports text chat, image prompts, voice input, multi-specialist agents, and feedback collection.

**Design principles:**
- **Minimal & airy** — Generous whitespace, subtle backgrounds, extremely light UI chrome
- **Glass-morphism** — Frosted-glass surfaces with `backdrop-blur`, translucent whites, and layered transparency
- **Soft depth** — Multi-layer box shadows that feel almost invisible; no harsh drop shadows
- **Warm neutrality** — Nearly all UI is grayscale with alpha-based colors on a `#1A1A1A` base; the only hue is a muted green brand accent
- **Content-first** — The chat conversation is the hero; all other UI recedes

**Key constraints:**
- All colors are defined as alpha channels over `rgba(26,26,26,...)` (light theme) or `rgba(255,255,255,...)` (dark-on-light surfaces), NOT as flat hex values — this is essential for the glass-morphism layering
- The brand color is a deep green `rgb(16, 104, 68)` (`#106844`) used exclusively in alpha-tinted form
- Corners are generous (16px–24px on containers, 999px on pills)
- The app is designed as a desktop-first experience with a responsive mobile adaptation

---

## 2. Color System

### 2.1 Base Colors

| Token | Value | Usage |
|---|---|---|
| `--b&w/white` | `#FFFFFF` | Page background, card surfaces, sidebar bg |
| `--b&w/black` | `#1A1A1A` | Base for all alpha/light colors (never used raw) |

### 2.2 Alpha/Light Scale (dark text/borders on light backgrounds)

These are the primary UI colors. All are `rgba(26, 26, 26, <alpha>)`:

| Token | Alpha | Hex Approx. | Usage |
|---|---|---|---|
| `--alpha/light/25` | 0.04 | ~`#f7f7f7` | Settings info card background |
| `--alpha/light/50` | 0.06 | ~`#f5f5f5` | Subtle borders, dividers, faint backgrounds |
| `--alpha/light/100` | 0.09 | ~`#f0f0f0` | Card borders, input borders |
| `--alpha/light/200` | 0.20 | ~`#d5d5d5` | Send button gradient bottom |
| `--alpha/light/300` | 0.28 | ~`#c5c5c5` | Inset shadows, medium emphasis |
| `--alpha/light/400` | 0.36 | ~`#b5b5b5` | Disabled button text |
| `--alpha/light/500` | 0.48 | ~`#999999` | Placeholder text, muted icons |
| `--alpha/light/600` | 0.60 | ~`#808080` | **Primary body text color**, sidebar labels, icon default |
| `--alpha/light/900` | 0.80 | ~`#4d4d4d` | **High-emphasis text**: headings in settings, user messages, bold labels |

### 2.3 Alpha/Dark Scale (light text/surfaces on translucent backgrounds)

These are `rgba(255, 255, 255, <alpha>)`:

| Token | Alpha | Usage |
|---|---|---|
| `--alpha/dark/300` | 0.28 | Glass card backgrounds (suggestion cards, user chat bubbles) |
| `--alpha/dark/600` | 0.60 | Modal/dialog container background |
| `--alpha/dark/800` | 0.75 | Top bar background, frosted header |
| `--alpha/dark/900` | 0.80 | Modal overlay backdrop, primary button text color |

### 2.4 Brand Colors (Green)

Base: `rgb(16, 104, 68)` / `#106844`

| Token | Value | Usage |
|---|---|---|
| `--alpha/brand/50` | `rgba(16,104,68,0.06)` | Agent selector chip bg, subtle brand tint |
| `--alpha/brand/100` | `rgba(16,104,68,0.08)` | Active sidebar item highlight |
| `--alpha/brand/950` | `rgba(16,104,68,0.92)` | Agent selector text, brand text on light bg |

### 2.5 Neutral Scale (Tailwind-standard)

| Token | Value | Usage |
|---|---|---|
| `--neutral/50` | `#FAFAFA` | Button group background |
| `--neutral/200` | `#E5E5E5` | Disabled button gradient start |
| `--neutral/300` | `#D4D4D4` | Disabled button gradient end |
| `--neutral/500` | `#737373` | Primary (active) button gradient start |
| `--neutral/700` | `#404040` | Primary (active) button gradient end |
| `--neutrals/300` | `#B7B8C5` | Mobile home indicator bar |

### 2.6 Semantic Colors

| Purpose | Value | Usage |
|---|---|---|
| Error text | `--red/600` = `#DC2626` | Error messages, validation errors |
| Error icon | Warning triangle icon + `#DC2626` text | Error state in chat |
| Success | [NEEDS VERIFICATION] | Not observed in current screens |
| Info | [NEEDS VERIFICATION] | Not observed in current screens |
| Sidebar tint | `rgba(0, 180, 212, 0.05)` | Very subtle cyan tint on sidebar inner container |

### 2.7 Color Usage Rules

1. **Never use flat gray hex values** for UI elements — always use the `--alpha/light/*` scale so colors blend naturally with glass surfaces
2. **Body text is always `--alpha/light/600`** (60% opacity) — NOT solid black
3. **High-emphasis text uses `--alpha/light/900`** (80% opacity) — for headings, user input, strong labels
4. **Brand green is only used in alpha form** — never as a solid fill for backgrounds or buttons
5. **Backgrounds layer transparency** — cards use `--alpha/dark/300` to `--alpha/dark/900` with `backdrop-blur`
6. **Borders are nearly invisible** — `--alpha/light/50` (6%) or `--alpha/light/100` (9%)

---

## 3. Typography

### 3.1 Font Families

| Role | Family | Notes |
|---|---|---|
| Primary | `Instrument Sans` | Variable font (width axis `wdth: 100`). Used for ALL UI text. |
| Custom/Override | `Montserrat` | Used selectively for hero headings in some screens (font-family var: `--family/custom-font-mont`) |
| Monospace | [NEEDS VERIFICATION] | Not observed |

### 3.2 Type Scale

| Level | Size | Line Height | Letter Spacing | Weight | Usage / Component |
|---|---|---|---|---|---|
| `heading/h4` | `32px` | `40px` | `-0.5px` | 400 (Regular) | **Hero Greeting** component on Dashboard, Onboarding welcome |
| `heading/h6` | `20px` | `28px` | — | 500 (Medium) | **Settings Dialog** title, **AI Response** text line-height, **Registration Modal** heading |
| `body/body-2` | `16px` | `24px` | — | 500 (Medium) | **Mobile Bottom Sheet** menu items ("Select specialist", "Upload file", "Upload image") |
| `body/body-3` | `14px` | `20px` | `-0.15px` | 400 / 500 | **Most common**: Sidebar labels, Chat input, Buttons, Suggestion Cards, Action Chips, Settings Rows, Text Fields |
| `body/body-4` | `12px` | `16px` | `-0.15px` | 500 (Medium) | **Agent Selector Chip** text, section sub-headers ("Commonly questions for Leanne") |
| `label/label-2` | `14px` | `20px` | — | 600 (SemiBold) | **Settings Dialog** section headers ("Account"), "Edit" action links |

### 3.3 Font Weight Tokens

| Token | Value | Usage |
|---|---|---|
| `--weights/regular` | 400 | Hero headings, body text, placeholder text |
| `--weights/medium` | 500 | Most UI text: labels, buttons, sidebar items |
| `--weights/semibold` | 600 | Section headers, emphasis text in settings |

### 3.4 Typography Rules

1. **`fontVariationSettings: "'wdth' 100"`** must be applied to all Instrument Sans text
2. **Letter spacing of `-0.15px`** is standard for body-3 and body-4 sizes
3. **Hero headings use `-0.5px`** letter spacing
4. **No uppercase transforms** observed anywhere — all text is sentence case
5. **Text truncation** uses `text-ellipsis` + `overflow-hidden` + `whitespace-nowrap` on sidebar items

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Base unit: `4px`. Tokens are named by their pixel value:

| Token | Value | Common Usage |
|---|---|---|
| `--0` | `0px` | Reset spacing |
| `--1` | `1px` | Minimal gap (sidebar section divider) |
| `--2` | `2px` | Tight padding (icon button wrapper) |
| `--4` | `4px` | Inline gaps, chip padding-y, close button padding |
| `--6` | `6px` | Icon-to-label gaps, input padding-y, small gaps |
| `--8` | `8px` | Standard gap, sidebar padding, input padding-x, chip padding-x |
| `--10` | `10px` | List item right padding, settings row gap |
| `--12` | `12px` | Container inner padding, grid gap, card padding |
| `--16` | `16px` | Card padding, section gaps, standard container padding |
| `--20` | `20px` | Top bar horizontal padding, button padding-x |
| `--24` | `24px` | Large section gaps, dialog padding, sidebar vertical gaps |
| `--28` | `28px` | Modal inner padding (registration screens) |
| `--32` | `32px` | [NEEDS VERIFICATION] |

### 4.2 Page-Level Layout

| Property | Desktop | Mobile |
|---|---|---|
| Outer container | `1280px` wide, `800px` tall (macOS window frame) | `390px` wide (iPhone viewport) |
| Sidebar width | `316px` (with 8px left padding = 232px visible + 84px padding area) | Full-width drawer overlay |
| Main content area | `1032px` (1280 - 248 sidebar) | Full width |
| Content max-width | `704px` (centered in main area) | Full width with `24px` side padding |
| Container border-radius | `24px` (outer window frame) | `58px` (mobile container, large pill shape) |

### 4.3 Key Layout Patterns

- **Sidebar**: Fixed left, `316px` wide, white background, inner container has `backdrop-blur: 6px` with subtle cyan tint, `16px` border-radius
- **Top bar**: Sticky, full main-area width, `backdrop-blur: 4px`, `pt-24 px-20`, frosted glass effect
- **Chat area**: Centered, `max-width: 704px` (desktop) / `600px` (content), vertical flex
- **Modal overlay**: Full viewport, `bg: alpha/dark/900` (80% white), centered content
- **Suggestion cards grid**: `2 columns`, `12px` gap, auto-height rows

---

## 5. Border Radius & Shadows

### 5.1 Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `--4` | `4px` | Small chips, count badges |
| `--6` | `6px` | Attachment button wrapper |
| `--8` | `8px` | Text input fields, buttons, sidebar active item, settings cards |
| `--12` | `12px` | Action chips ("Try again", "Emotional Support") |
| `--16` | `16px` | Suggestion cards, modals, dialogs, sidebar inner container, settings info cards |
| `--24` | `24px` | Chat input card, outer window frame, agent selector pill |
| `--full` / `999px` | `999px` | Avatar, send button, mic button, pill shapes |

### 5.2 Shadow Levels

**Level 1 — Subtle card** (chat input, mic button):
```
0px 22px 6px rgba(0,0,0,0),
0px 14px 6px rgba(0,0,0,0),
0px 8px 5px rgba(0,0,0,0.01),
0px 4px 4px rgba(0,0,0,0.02),
0px 1px 2px rgba(0,0,0,0.02)
```

**Level 2 — Modal/dialog**:
```
0px 67px 19px rgba(0,0,0,0),
0px 43px 17px rgba(0,0,0,0.01),
0px 24px 15px rgba(0,0,0,0.02),
0px 11px 11px rgba(0,0,0,0.03),
0px 3px 6px rgba(0,0,0,0.04)
```

**Level 3 — Avatar/ball** (deeper, blue-tinted):
```
0px 20px 6px rgba(12,48,70,0),
0px 13px 5px rgba(12,48,70,0.02),
0px 7px 4px rgba(12,48,70,0.07),
0px 3px 3px rgba(12,48,70,0.12),
0px 1px 2px rgba(12,48,70,0.14)
```

**Send button outer**:
```
0px 2px 1px -1px rgba(0,0,0,0.08)
```

**Send button inset**:
```
inset 0px 0px 3px rgba(26,26,26,0.28)
```

### 5.3 Shadow vs Border Rules

- **Cards and inputs**: Use both a `1px` border (`--alpha/light/100`) AND shadow level 1
- **Glass surfaces** (suggestion cards, chat bubbles): Border only (`--alpha/light/50`), no shadow
- **Modals/dialogs**: Border (`--alpha/light/100`) AND shadow level 2
- **Avatars**: Border (`--alpha/light/50`) AND shadow level 3

---

## 6. Iconography & Imagery

### 6.1 Icon System

| Property | Value |
|---|---|
| Style | Custom outlined/line icons (not a standard library) |
| Large size | `20px` container, artwork fills ~75–80% |
| Small size | `20px` container, artwork fills ~50% (e.g., chevrons) |
| Color | Inherits from parent text color (typically `--alpha/light/600`) |
| Named icons observed | Pen sparkle, Plus, Sidebar, chatAI, Settings, Arrow up, Mic, Dots vertical, Warning triangle, Chevron right, X mark, File plus, User circle, Envelope, Phone, Locked, Reload, User group, Sparkle, Artwork |

### 6.2 Avatar

| Property | Value |
|---|---|
| Large (hero) | `64px` with decorative glow ellipse behind |
| Small (sidebar, chat) | `20px–24px`, `border-radius: 999px` |
| Border | `1px solid --alpha/light/50` |
| Shadow | Level 3 (blue-tinted depth shadow) |
| Fallback | Gradient sphere ("Ball") with inner image |

### 6.3 Logo

- The app logo appears as a `64px` circular element in the center of the dashboard
- It has a decorative glow/halo behind it (large blurred ellipse)
- On mobile, it appears at the top of the onboarding/registration flow

---

## 7. Component Library

### 7.1 Buttons

#### Primary Button
- **Background**: `linear-gradient(to bottom, --neutral/500, --neutral/700)` (gray 500 → 700)
- **Text**: `--alpha/dark/900` (white at 80%), 14px medium, centered
- **Border radius**: `8px`
- **Padding**: `8px 20px`
- **Overlay**: `1.5px` white border inset with `blur: 0.2px` for a subtle light/bevel effect
- **Usage**: "Save changes", "Send feedback", "Get started" (when form is filled)
- **States**:
  - *Hover*: Lighten gradient slightly — `from-neutral-400 to-neutral-600`; `cursor: pointer`
  - *Focus*: `outline: 2px solid --alpha/brand/950` with `2px` offset; or `ring-2 ring-green-800/90`
  - *Pressed/Active*: Darken gradient — `from-neutral-600 to-neutral-800`
  - *Loading*: Replace text with a small spinner (14px), keep same dimensions, disable pointer events
  - *Disabled*: See Disabled Button variant below

#### Disabled Button
- **Background**: `linear-gradient(to bottom, --neutral/200, --neutral/300)` (gray 200 → 300)
- **Text**: `--alpha/light/400` (36% opacity), 14px medium
- **Border radius**: `8px`
- **Overlay**: Same `1.5px` white border inset
- **Usage**: "Get started" (when form is empty)

#### Send Button (Pill)
- **Background**: `linear-gradient(180deg, transparent 0%, --alpha/light/200 100%)` over white
- **Border radius**: `999px` (pill)
- **Padding**: `8px`
- **Shadow**: `0px 2px 1px -1px rgba(0,0,0,0.08)` outer + `inset 0px 0px 3px rgba(26,26,26,0.28)`
- **Icon**: Arrow up, 20px
- **Usage**: Chat send action
- **States**:
  - *Hover*: Increase outer shadow opacity slightly; `cursor: pointer`
  - *Disabled (empty input)*: Reduce icon opacity to 40% (`--alpha/light/400`), remove inset shadow
  - *Active/Pressed*: Darken gradient overlay

#### Mic Button
- **Background**: `white`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `24px`
- **Padding**: `8px`
- **Shadow**: Level 1 (subtle card)
- **Usage**: Voice input toggle
- **States**:
  - *Hover*: `bg: --neutral/50`; `cursor: pointer`
  - *Active (recording)*: Pulsing ring animation around button, icon color change to `--red/600`
  - *Focus*: `outline: 2px solid --alpha/light/300` with `2px` offset

#### Icon Button (Ghost)
- **Background**: transparent (or `--neutral/50` in button group)
- **Border radius**: `24px`
- **Padding**: `8px`
- **Usage**: More options (dots), attachment actions
- **States**:
  - *Hover*: `bg: --alpha/light/50` (6%); `cursor: pointer`
  - *Active/Pressed*: `bg: --alpha/light/100` (9%)
  - *Focus*: `outline: 2px solid --alpha/light/300` with `2px` offset

#### Close Button
- **Background**: `--alpha/light/50` (6%)
- **Border radius**: `999px`
- **Padding**: `4px`
- **Icon**: X mark, 20px
- **Usage**: Modal close
- **States**:
  - *Hover*: `bg: --alpha/light/100` (9%); `cursor: pointer`
  - *Active*: `bg: --alpha/light/200` (20%)
  - *Focus*: `outline: 2px solid --alpha/light/300` with `2px` offset

### 7.2 Text Fields

#### Standard Text Input
- **Background**: `white`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `8px`
- **Padding**: `6px 8px`
- **Placeholder text**: `--alpha/light/500`, 14px medium
- **Value text**: `--alpha/light/900`, 14px medium
- **Usage**: Email input, registration forms
- **States**:
  - *Focus*: `border-color: --alpha/light/300` (28%); `outline: none`; optionally add subtle `box-shadow: 0 0 0 2px rgba(26,26,26,0.06)`
  - *Error*: `border-color: --red/600` (#DC2626); error message below in `--red/600`, 12px
  - *Disabled*: `bg: --neutral/50`, `opacity: 0.6`, `cursor: not-allowed`
  - *Filled*: Placeholder disappears, value text at `--alpha/light/900`

#### Chat Input (Global Input Text)
- **Background**: `white`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `24px`
- **Padding**: `12px 12px 12px 16px`
- **Shadow**: Level 1
- **Placeholder**: `--alpha/light/600`, 14px regular
- **Multi-line**: Grows vertically
- **Bottom bar**: Contains attachment (+), agent selector, mic button, send button
- **Width**: `704px` (desktop), full-width (mobile)
- **States**:
  - *Focus*: Border strengthens to `--alpha/light/200`; shadow slightly more pronounced
  - *With content*: Text replaces placeholder at `--alpha/light/900` weight 400; send button becomes active
  - *Empty*: Placeholder visible, send button in disabled state

### 7.3 Cards

#### Suggestion Card
- **Background**: `--alpha/dark/300` (28% white) OR `--alpha/dark/900` (80% white, first card highlighted)
- **Border**: `1px solid --alpha/light/50`
- **Border radius**: `16px`
- **Padding**: `12px 16px`
- **Backdrop filter**: `blur(4px)`
- **Text**: `--alpha/light/600`, 14px medium
- **Layout**: 2-column grid, 12px gap
- **States**:
  - *Hover*: `bg: --alpha/dark/600` (60% white); `border-color: --alpha/light/100`; `cursor: pointer`
  - *Active/Pressed*: `bg: --alpha/dark/800` (75% white)

#### Settings Info Card
- **Background**: `--alpha/light/25` = `rgba(26,26,26,0.04)` (4% black)
- **Border radius**: `16px`
- **Padding**: `12px`
- **Rows**: Flex column with `10px` gap, bottom-bordered rows (except last)
- **Row border**: `--alpha/light/50`

#### User Message Bubble
- **Background**: `--alpha/dark/300` (28% white)
- **Border**: `1px solid --alpha/light/50`
- **Border radius**: `16px`
- **Padding**: `16px`
- **Backdrop filter**: `blur(4px)`
- **Alignment**: Right side of chat area
- **Max width**: ~`480px`

### 7.4 Navigation

#### Sidebar (Desktop)
- **Outer**: `316px` wide, white bg, `8px` left padding
- **Inner container**: `backdrop-blur: 6px`, `bg: rgba(0,180,212,0.05)`, `border-radius: 16px`
- **Sections**: User info (top), nav items (middle), settings (bottom, pinned)
- **User display**: `20px` avatar + name text, `6px` gap

#### Sidebar List Item (Default)
- **Height**: `32px`
- **Padding**: `8px 10px 8px 8px`
- **Border radius**: `8px`
- **Icon**: `20px`, `6px` gap to label
- **Label**: 14px medium, `--alpha/light/600`, truncated with ellipsis
- **States**:
  - *Hover*: `bg: --alpha/light/50` (6%); `cursor: pointer`
  - *Active*: See Sidebar List Item (Active) below
  - *Focus*: `outline: 2px solid --alpha/light/200` with `-2px` inset offset

#### Sidebar List Item (Active)
- Same as default PLUS:
- **Background overlay**: `--alpha/brand/100` (8% green) with `mix-blend-multiply`
- **No text/icon color change** — stays `--alpha/light/600`

#### Top Bar
- **Position**: Sticky top of main content area
- **Background**: `--alpha/dark/800` (75% white) with `backdrop-blur: 4px`
- **Padding**: `24px 20px 0 20px`, inner has `pb-16`
- **Content**: Icon + label on left (e.g., "New task"), settings icon on right (sometimes)

#### Mobile Navigation
- **Bottom area**: Sidepanel content becomes a bottom sheet or drawer
- **Top bar**: Same pattern adapted to mobile width

### 7.5 Modals & Dialogs

#### Settings Dialog
- **Overlay**: Full screen, `--alpha/dark/900` background
- **Container**: `480px` wide, `--alpha/dark/600` bg, `backdrop-blur: 10px`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `16px`
- **Shadow**: Level 2
- **Header**: "Settings" in 20px medium weight, close button top-right
- **Sections**: Labeled groups ("Account") with "Edit" action link
- **Footer**: Primary button full width ("Save changes")

#### Registration/Invite Modal
- **Background**: `--alpha/dark/900` (80% white) with `backdrop-blur: 4px`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `16px`
- **Shadow**: Level 2
- **Content**: Avatar (64px), bold title (14px semibold), subtitle (14px regular, 60% alpha), email input, action button
- **Padding**: `28px` all sides
- **Button width**: Full width

#### Feedback Modal
- **Contains**: Title, description, checkbox list, "Other" checkbox, textarea, full-width submit button
- **Close button**: Top-right, X icon
- **Checkboxes**: Standard browser checkboxes (not custom styled)
- **Textarea label**: "Tell us more"
- **Submit**: Primary button ("Send feedback")

### 7.6 Chat Components

#### Hero Greeting (Dashboard Empty State)
- **Layout**: Centered vertically in main content area, flex column, `16px` gap
- **Avatar**: `64px` circular with decorative glow behind, level 3 shadow
- **Heading**: `heading/h4` — 32px regular, `--b&w/black` (#1A1A1A), line-height 40px, letter-spacing -0.5px, centered
- **Font**: `Instrument Sans Regular` (or `Montserrat Medium` variant in some screens)
- **Example text**: "Hey Marcos, what's up?"
- **Appears**: When chat is empty, above the chat input

#### AI Response
- **Layout**: Left-aligned, max-width `600px`
- **Text**: 14px regular, `--alpha/light/900`, line-height `28px` (heading/h6 lineheight for readability)
- **Paragraphs**: Standard spacing
- **Action suggestions**: Appear below response as chips

#### Loading State ("Thinking")
- **Layout**: Horizontal flex, `8px` gap
- **Avatar**: `24px` with level 3 shadow
- **Text**: "{Name} is thinking" in 14px medium, `--alpha/light/900`
- **Dots animation**: 3 dots (2px each), `4px` gap

#### Error State
- **Icon**: Warning triangle, 20px
- **Text**: `--red/600` (#DC2626), 14px medium
- **Message**: "We have find an error processing your request. Please try again."
- **Action**: "Try again" chip below

#### Action Chip (Suggestion/Tag)
- **Background**: `--alpha/light/50` (6%) with `backdrop-blur: 4px`
- **Border**: `1px solid --alpha/light/50`
- **Border radius**: `12px`
- **Padding**: `8px 16px 8px 12px`
- **Icon**: Optional 20px icon left
- **Text**: 14px medium, `--alpha/light/900`
- **States**:
  - *Hover*: `bg: --alpha/light/100` (9%); `border-color: --alpha/light/100`; `cursor: pointer`
  - *Active/Pressed*: `bg: --alpha/light/200` (20%)
  - *Focus*: `outline: 2px solid --alpha/light/200` with `2px` offset

#### Agent Selector Chip
- **Background**: `--alpha/brand/50` (6% green)
- **Border radius**: `24px`
- **Padding**: `4px 8px`
- **Icon**: 12px custom icon
- **Text**: 12px medium, `--alpha/brand/950`
- **Badge**: Count badge (`+2`) in nested green tint container, `4px` radius
- **States**:
  - *Hover*: `bg: --alpha/brand/100` (8% green); `cursor: pointer`
  - *Active/Expanded*: Opens agent selection dropdown/popover
  - *Focus*: `outline: 2px solid --alpha/brand/950` with `2px` offset

### 7.7 Form Components

#### Checkbox (Feedback Form)
- Default browser checkbox with custom label styling
- Label: 14px regular/medium, `--alpha/light/600`
- **States**:
  - *Checked*: Filled checkbox indicator; label stays same color
  - *Focus*: Browser default focus ring
  - *Disabled*: `opacity: 0.5`, `cursor: not-allowed`

#### Settings Row
- **Layout**: Flex row, space-between
- **Left**: Icon (20px) + label (14px medium, `--alpha/light/600`), `8px` gap
- **Right**: Value text (14px medium, `--alpha/light/900`)
- **Divider**: `1px` bottom border `--alpha/light/50`
- **Padding bottom**: `10px`
- **States** (when clickable, e.g., in mobile bottom sheet with chevron):
  - *Hover*: `bg: --alpha/light/50` (6%); `cursor: pointer`
  - *Active*: `bg: --alpha/light/100` (9%)

### 7.8 Mobile Bottom Sheet

- **Background**: `--alpha/dark/600` (60% white) with `backdrop-blur: 10px`
- **Border**: `1px solid --alpha/light/100`
- **Border radius**: `58px` (top corners only effectively, very pill-like)
- **Shadow**: Level 2
- **Home indicator**: `36px` wide, `4px` tall, `--neutrals/300` color, centered, `border-radius: 100px`
- **Content padding**: `16px 24px 24px`

---

## 8. Animation & Transitions

Based on the design patterns (no explicit animation specs in static Figma):

| Property | Recommended Value |
|---|---|
| Default transition | `150ms ease-out` |
| Hover transitions | `background-color 150ms, opacity 150ms` |
| Modal enter | Fade in + scale from 0.95 → 1.0, `200ms ease-out` |
| Modal exit | Fade out + scale to 0.95, `150ms ease-in` |
| Backdrop enter | Opacity 0 → 1, `200ms ease-out` |
| Loading dots | Pulsing opacity animation on 3 dots, staggered by `150ms` |
| Sidebar item hover | Background opacity transition, `100ms` |
| Mobile bottom sheet | Slide up from bottom, `250ms ease-out` |

---

## 9. Responsive Behavior

### 9.1 Breakpoints

| Name | Width | Behavior |
|---|---|---|
| Desktop | `≥ 1024px` | Full layout: sidebar + main content area |
| Mobile | `< 768px` | Single column, sidebar becomes drawer, bottom sheet for actions |

### 9.2 Desktop → Mobile Changes

| Element | Desktop | Mobile |
|---|---|---|
| Sidebar | Fixed left panel, always visible | Hidden drawer, hamburger toggle |
| Chat input | `704px` centered in main area | Full width with side padding |
| Top bar | Above main content area only | Full width, sticky |
| Suggestion cards | 2-column grid below input | 2-column grid, full width |
| Settings | Centered dialog overlay | Full-screen bottom sheet |
| Chat messages | Max-width `600px` | Full width with padding |
| Modals | Centered card | Full-height bottom sheet |
| Keyboard | N/A | Push-up layout with input above keyboard |

### 9.3 Touch Targets

- Minimum `36px` for interactive elements on mobile
- Sidebar list items: `32px` height (desktop), should be `44px` on mobile
- Icon buttons: `36px` minimum tap target (8px padding + 20px icon = 36px)

---

## 10. LLM Implementation Rules

### Top 20 Rules

1. **Use alpha-based colors, not flat hex.** All UI grays must be `rgba(26,26,26,<alpha>)`. Never use `#808080` — use `rgba(26,26,26,0.6)` instead. This is critical for glass surfaces to work correctly.

2. **Primary text color is 60% opacity.** Set body text to `rgba(26,26,26,0.6)`. High-emphasis text uses `rgba(26,26,26,0.8)`. Never use solid black (`#000000`) for text.

3. **Always apply `backdrop-blur` with transparent backgrounds.** Any surface using `alpha/dark/*` colors MUST have `backdrop-filter: blur(Xpx)` to create the frosted glass effect. Without blur, the transparency looks broken.

4. **Font is Instrument Sans with `fontVariationSettings: "'wdth' 100"`.** This must be on every text element. The font also needs weights 400, 500, 600.

5. **Default text size is 14px/20px.** Unless specifically larger (headings) or smaller (captions at 12px), use `font-size: 14px; line-height: 20px; letter-spacing: -0.15px`.

6. **Border radius follows the hierarchy:** Inputs/buttons = `8px`, chips = `12px`, cards/modals = `16px`, chat input = `24px`, pills/avatars = `999px`.

7. **Shadows are multi-layer and extremely subtle.** Use the exact shadow stacks from Section 5.2. Never use a single `box-shadow` layer — the design uses 5-layer stacks where most layers are nearly invisible.

8. **Borders are barely visible.** Use `1px solid rgba(26,26,26,0.09)` for card/input borders and `rgba(26,26,26,0.06)` for dividers. Never use `#ccc` or `#ddd`.

9. **Buttons use gradients, not flat colors.** Primary: gradient from `#737373` to `#404040`. Disabled: `#E5E5E5` to `#D4D4D4`. Both have a `1.5px` white border overlay with `blur: 0.2px`.

10. **The brand green (`#106844`) is only used in alpha form.** For backgrounds: `rgba(16,104,68,0.06)`. For active states: `rgba(16,104,68,0.08)`. For text: `rgba(16,104,68,0.92)`. Never use it as a solid fill.

11. **Sidebar uses a subtle cyan tint** — `rgba(0,180,212,0.05)` — not pure white. This is easy to miss.

12. **Chat input is its own card component** with `24px` radius, shadow, border, and a complex bottom toolbar. Don't simplify it to a plain `<input>`.

13. **User messages go right, AI responses go left.** User messages use glass cards (`28% white, blur, border`). AI responses are plain text with no background container.

14. **Settings uses grouped rows inside tinted cards.** `rgba(26,26,26,0.04)` background, `16px` radius, `12px` padding. Rows have icon + label + value with bottom dividers.

15. **Modal overlays use 80% white**, not black. `rgba(255,255,255,0.8)`. This keeps the light, airy feel.

16. **Spacing follows the 4px base grid.** Use only: 0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32px. No magic numbers.

17. **Icons are 20px containers.** Artwork inside is smaller (~13–16px). Don't scale icons to arbitrary sizes.

18. **The chat area has a maximum content width of 704px (desktop)** centered in the main area. Don't let it span full width.

19. **Desktop layout is fixed at 1280×800** (macOS app frame). The sidebar is 316px wide (including padding). Main content is the remainder.

20. **Glass surfaces need layering.** Background shapes (blurred ellipses) sit behind the main content. Cards float on top. The depth comes from transparency + blur + subtle shadows stacking.

### Common Mistakes to Avoid

- Using solid gray backgrounds instead of alpha-based transparency
- Forgetting `backdrop-filter: blur()` on translucent surfaces
- Using standard `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` instead of the 5-layer shadow stacks
- Making borders too visible (using `#ddd` instead of 6–9% alpha)
- Using solid black text instead of 60–80% alpha
- Setting button backgrounds to solid colors instead of gradients
- Using the brand green at full opacity
- Forgetting the `fontVariationSettings` on Instrument Sans text
- Making the modal backdrop dark (use 80% white, not black)
- Using `border-radius: 12px` everywhere — follow the hierarchy (8/12/16/24/999)

### Decision Tree

```
IF building a page layout:
  → Sidebar (316px) + Main area (rest) + Top bar (sticky, frosted)
  → Main content max-width: 704px, centered

IF building a button:
  → Primary action? → Gradient neutral/500→700, 8px radius, white overlay
  → Disabled? → Gradient neutral/200→300, 8px radius, white overlay
  → Icon-only (send)? → Pill shape (999px), gradient white+inset shadow
  → Close/dismiss? → Circle, alpha/light/50 bg, X icon

IF building a card:
  → Chat input? → White, 24px radius, shadow level 1, 1px border
  → Suggestion? → Glass (28% white), 16px radius, blur, thin border
  → Settings group? → 4% black bg, 16px radius, no shadow
  → Modal? → Glass (60% white), 16px radius, shadow level 2, blur 10px

IF building a text element:
  → Heading? → 20–32px, weight 400–500, alpha/light/900
  → Body text? → 14px/20px, weight 500, alpha/light/600
  → Caption? → 12px/16px, weight 500, alpha/light/600
  → Section label? → 14px/20px, weight 600, alpha/light/900

IF building a form field:
  → Standard input? → White bg, 1px border alpha/100, 8px radius, 6px 8px padding
  → Chat input? → Full card component (see Chat Input spec above)
  → Textarea? → Same as standard input but taller
```

### Example: Suggestion Card (Tailwind)

```html
<div class="backdrop-blur-[4px] bg-white/28 border border-black/[0.06] rounded-2xl px-4 py-3 overflow-hidden">
  <p class="font-['Instrument_Sans'] font-medium text-sm leading-5 tracking-[-0.15px] text-black/60"
     style="font-variation-settings: 'wdth' 100">
    What is your current fitness level and goals for 2026?
  </p>
</div>
```

### Example: Primary Button (Tailwind)

```html
<button class="relative bg-gradient-to-b from-neutral-500 to-neutral-700 rounded-lg px-5 py-2 overflow-hidden">
  <span class="font-['Instrument_Sans'] font-medium text-sm leading-5 tracking-[-0.15px] text-white/80"
        style="font-variation-settings: 'wdth' 100">
    Save changes
  </span>
  <div class="absolute inset-0 border-[1.5px] border-white rounded-lg blur-[0.2px] pointer-events-none"></div>
</button>
```

### Example: Settings Row (Tailwind)

```html
<div class="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
  <div class="flex items-center gap-2">
    <!-- 20px icon here -->
    <span class="font-['Instrument_Sans'] font-medium text-sm leading-5 text-black/60"
          style="font-variation-settings: 'wdth' 100">
      Email
    </span>
  </div>
  <span class="font-['Instrument_Sans'] font-medium text-sm leading-5 text-black/80"
        style="font-variation-settings: 'wdth' 100">
    marcus@email.com
  </span>
</div>
```

---

## Appendix: CSS Custom Properties Reference

```css
:root {
  /* Base */
  --b-w-white: #ffffff;

  /* Alpha Light (rgba 26,26,26) */
  --alpha-light-25: rgba(26, 26, 26, 0.04);
  --alpha-light-50: rgba(26, 26, 26, 0.06);
  --alpha-light-100: rgba(26, 26, 26, 0.09);
  --alpha-light-200: rgba(26, 26, 26, 0.20);
  --alpha-light-300: rgba(26, 26, 26, 0.28);
  --alpha-light-400: rgba(26, 26, 26, 0.36);
  --alpha-light-500: rgba(26, 26, 26, 0.48);
  --alpha-light-600: rgba(26, 26, 26, 0.60);
  --alpha-light-900: rgba(26, 26, 26, 0.80);

  /* Alpha Dark (rgba 255,255,255) */
  --alpha-dark-300: rgba(255, 255, 255, 0.28);
  --alpha-dark-600: rgba(255, 255, 255, 0.60);
  --alpha-dark-800: rgba(255, 255, 255, 0.75);
  --alpha-dark-900: rgba(255, 255, 255, 0.80);

  /* Brand (rgba 16,104,68) */
  --alpha-brand-50: rgba(16, 104, 68, 0.06);
  --alpha-brand-100: rgba(16, 104, 68, 0.08);
  --alpha-brand-950: rgba(16, 104, 68, 0.92);

  /* Neutrals */
  --neutral-50: #fafafa;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-500: #737373;
  --neutral-700: #404040;

  /* Semantic */
  --red-600: #dc2626;

  /* Spacing */
  --space-0: 0px;
  --space-1: 1px;
  --space-2: 2px;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-10: 10px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-28: 28px;

  /* Radii */
  --radius-4: 4px;
  --radius-6: 6px;
  --radius-8: 8px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-24: 24px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-card: 0px 22px 6px rgba(0,0,0,0), 0px 14px 6px rgba(0,0,0,0), 0px 8px 5px rgba(0,0,0,0.01), 0px 4px 4px rgba(0,0,0,0.02), 0px 1px 2px rgba(0,0,0,0.02);
  --shadow-modal: 0px 67px 19px rgba(0,0,0,0), 0px 43px 17px rgba(0,0,0,0.01), 0px 24px 15px rgba(0,0,0,0.02), 0px 11px 11px rgba(0,0,0,0.03), 0px 3px 6px rgba(0,0,0,0.04);
  --shadow-avatar: 0px 20px 6px rgba(12,48,70,0), 0px 13px 5px rgba(12,48,70,0.02), 0px 7px 4px rgba(12,48,70,0.07), 0px 3px 3px rgba(12,48,70,0.12), 0px 1px 2px rgba(12,48,70,0.14);
  --shadow-send-outer: 0px 2px 1px -1px rgba(0,0,0,0.08);
  --shadow-send-inset: inset 0px 0px 3px rgba(26,26,26,0.28);

  /* Typography */
  --font-primary: 'Instrument Sans', sans-serif;
  --font-custom: 'Montserrat', sans-serif;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
}
```
