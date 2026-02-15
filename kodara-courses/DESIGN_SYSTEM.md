# Kodara Design System

> Comprehensive visual specification for pixel-accurate reproduction of the Kodara platform.
> Covers three core screens: **Landing Page**, **App Home**, and **App Chat**.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography](#2-typography)
3. [Spacing System](#3-spacing-system)
4. [Border Radii, Dividers & Container Styles](#4-border-radii-dividers--container-styles)
5. [Button Styles](#5-button-styles)
6. [Input Fields & Form Elements](#6-input-fields--form-elements)
7. [Navigation & Layout Structure](#7-navigation--layout-structure)
8. [Icon Style & Sizing](#8-icon-style--sizing)
9. [Chat UI Specifics](#9-chat-ui-specifics)
10. [Card & Container Patterns](#10-card--container-patterns)
11. [Header & Footer Patterns](#11-header--footer-patterns)
12. [Landing Page Specifics](#12-landing-page-specifics)
13. [Responsive Behavior](#13-responsive-behavior)
14. [Animation & Transitions](#14-animation--transitions)
15. [UX Patterns](#15-ux-patterns)

---

## 1. Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--green-primary` | `#2E7D52` | Landing page CTA buttons, logo dot, text highlights, accent elements |
| `--blue-primary` | `#3B82F6` | App accent color - chips, send button, AI icon ring, active states |
| `--navy` | `#1A1A2E` | Deep dark text on members area, admin sidebar |

### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-white` | `#FFFFFF` | Landing page background, sidebar background, card backgrounds, input fields |
| `--bg-app` | `#E8F0FE` | App main content area background (light blue wash) |
| `--bg-gray-light` | `#F7F7F7` | Alternate landing page section backgrounds (every other section) |
| `--bg-user-bubble` | `#DBEAFE` | User chat message bubble background |
| `--bg-ai-message` | `#FFFFFF` | AI message area background (no bubble - open white) |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#18181B` | Headings, primary body text, sidebar nav labels |
| `--text-secondary` | `#52525B` | Body paragraphs, descriptions |
| `--text-tertiary` | `#71717A` | Subtle labels, placeholders in active state |
| `--text-muted` | `#A1A1AA` | Timestamps, metadata, placeholder text, disabled text |
| `--text-green` | `#2E7D52` | Green highlighted inline text on landing page |
| `--text-white` | `#FFFFFF` | Text on green buttons, dark backgrounds |

### Border & Divider Colors

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| `--border-light` | `#E5E5E8` | Card borders, input borders, sidebar right border, divider lines |
| `--border-subtle` | `#F0F0F2` | Very light dividers between list items (e.g., suggested questions grid) |
| `--border-input-focus` | `#3B82F6` | Input focus ring color (app) |

### Shadow Values

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards, input containers |
| `--shadow-elevated` | `0 4px 12px rgba(0,0,0,0.08)` | Elevated cards, chat input container on home |
| `--shadow-subtle` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth on containers |

### Gradient Colors

| Usage | Value |
|-------|-------|
| AI sparkle icon background | Radial gradient: center `#60A5FA` to edge `#3B82F6` (blue glow) |
| Landing page step number badges | Soft gold/amber `#D4A843` or `#B8860B` accent |

---

## 2. Typography

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-serif` | `'Playfair Display', 'Georgia', serif` | Landing page headings, section titles, italic quote blocks |
| `--font-sans` | `'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | All app UI text, body text, nav, buttons, chat messages |

### Type Scale - Landing Page

| Element | Font | Size | Weight | Line Height | Letter Spacing | Color | Style |
|---------|------|------|--------|-------------|----------------|-------|-------|
| Hero heading | Serif | 42px | 700 | 1.15 | -0.5px | `#18181B` | Normal, centered |
| Section heading ("3 Steps...") | Serif | 32px | 700 | 1.2 | -0.3px | `#18181B` | Normal, centered |
| Italic body quote | Serif | 18px | 400 | 1.6 | 0 | `#18181B` | Italic |
| Body paragraph | Sans | 15px | 400 | 1.7 | 0 | `#52525B` | Normal |
| Step card title | Sans | 16px | 700 | 1.3 | 0 | `#18181B` | Normal |
| Nav logo text | Sans | 14px | 600 | 1 | 0 | `#2E7D52` | Normal |
| Nav link ("Account") | Sans | 14px | 500 | 1 | 0 | `#71717A` | Normal |
| Button text | Sans | 14px | 600 | 1 | 0 | `#FFFFFF` | Normal |
| Green highlighted text | Serif | 18px | 400 | 1.6 | 0 | `#2E7D52` | Italic, inline |

### Type Scale - App (Home & Chat)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|------|--------|-------------|----------------|-------|
| Greeting heading ("Hey Lucas...") | Sans | 28px | 700 | 1.2 | -0.5px | `#18181B` |
| Sidebar app name ("Eddie AI v1") | Sans | 14px | 600 | 1 | 0 | `#18181B` |
| Sidebar nav item ("New Chat", "Chats") | Sans | 14px | 500 | 1 | 0 | `#52525B` |
| Top bar text ("New task") | Sans | 14px | 500 | 1 | 0 | `#71717A` |
| Input placeholder | Sans | 15px | 400 | 1.5 | 0 | `#A1A1AA` |
| Chip/tag text ("+ Eddie AI v1") | Sans | 13px | 500 | 1 | 0 | `#3B82F6` |
| Suggested questions label | Sans | 12px | 500 | 1 | 0 | `#A1A1AA` |
| Suggested question text | Sans | 14px | 400 | 1.4 | 0 | `#52525B` |
| Chat user message | Sans | 15px | 400 | 1.6 | 0 | `#18181B` |
| AI message sender + timestamp | Sans | 13px | 500 | 1 | 0 | `#A1A1AA` |
| AI message body text | Sans | 15px | 400 | 1.7 | 0 | `#3F3F46` |
| AI message bold headers | Sans | 15px | 700 | 1.7 | 0 | `#18181B` |
| "Get the App" title | Sans | 13px | 600 | 1.3 | 0 | `#18181B` |
| "Get the App" subtitle | Sans | 11px | 400 | 1.3 | 0 | `#A1A1AA` |
| "Settings" link | Sans | 13px | 500 | 1 | 0 | `#71717A` |

---

## 3. Spacing System

### Base Unit
`4px` (all spacing values are multiples of 4)

### Scale

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-1` | `4px` | Icon-to-text gaps, tight internal padding |
| `--space-2` | `8px` | Small gaps between inline elements |
| `--space-3` | `12px` | Between nav items, between sidebar items, card internal gaps |
| `--space-4` | `16px` | Standard padding inside cards, between sections |
| `--space-5` | `20px` | Sidebar padding (left/right), container padding |
| `--space-6` | `24px` | Between major sections |
| `--space-8` | `32px` | Large section padding, between landing page sections |
| `--space-10` | `40px` | Page-level horizontal padding |
| `--space-12` | `48px` | Major vertical section spacing on landing page |
| `--space-16` | `64px` | Large vertical gaps between landing page sections |

### Specific Measurements

| Element | Property | Value |
|---------|----------|-------|
| App sidebar | Width | `200px` |
| App sidebar | Padding top | `16px` |
| App sidebar | Padding left/right | `16px` |
| App sidebar | Nav item padding | `8px 12px` |
| App sidebar | Gap between nav items | `4px` |
| Chat input container (home) | Padding | `16px 20px` |
| Chat input container (home) | Max width | `640px` |
| Chat messages | Max width | `720px` |
| Chat message content | Padding | `0 16px` (no bubble for AI, padded bubble for user) |
| User chat bubble | Padding | `10px 16px` |
| AI message area | Margin bottom between messages | `24px` |
| Suggested questions grid | Gap between items | `0px` (dividers only, no gap) |
| Landing page content | Max width | `960px` (centered) |
| Landing page nav | Height | `56px` |
| Landing page nav | Horizontal padding | `40px` |

---

## 4. Border Radii, Dividers & Container Styles

### Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements, tags |
| `--radius` | `8px` | Default: inputs, small cards |
| `--radius-lg` | `12px` | Cards, modals, containers |
| `--radius-xl` | `16px` | Chat input container, large cards |
| `--radius-2xl` | `20px` | Chat message bubbles (user) |
| `--radius-full` | `9999px` | Pills, buttons, avatar circles, chips |

### Dividers

| Context | Style |
|---------|-------|
| Sidebar right border | `1px solid #E5E5E8` |
| Suggested questions grid dividers | `1px solid #F0F0F2` (horizontal and vertical between items) |
| Between AI message sections | No visible divider - spacing only (`24px` vertical gap) |
| Landing page section dividers | No explicit lines - background color change serves as divider |
| Chat input bar top border | `1px solid #E5E5E8` |

### Container Styles

| Container | Background | Border | Shadow | Radius |
|-----------|------------|--------|--------|--------|
| Chat input container (home) | `#FFFFFF` | `1px solid #E5E5E8` | `0 4px 12px rgba(0,0,0,0.08)` | `16px` |
| Suggested questions box | `#FFFFFF` | `1px solid #E5E5E8` | none | `12px` |
| User message bubble | `#DBEAFE` | none | none | `20px` |
| AI message area | transparent/`#FFFFFF` | none | none | none |
| Landing page step cards | `#FFFFFF` | none | `0 1px 3px rgba(0,0,0,0.08)` | `12px` |
| Sidebar "Get the App" card | `#FFFFFF` | `1px solid #E5E5E8` | none | `12px` |
| Bottom input bar (chat) | `#FFFFFF` | top: `1px solid #E5E5E8` | none | `0` (full width) |

---

## 5. Button Styles

### Primary Button (Landing Page - Green)

| Property | Value |
|----------|-------|
| Background | `#2E7D52` |
| Text color | `#FFFFFF` |
| Font size | `14px` |
| Font weight | `600` |
| Padding | `10px 24px` |
| Border radius | `9999px` (pill) |
| Border | none |
| Hover background | `#256B45` (slightly darker) |
| Hover transform | `translateY(-1px)` |
| Transition | `all 0.2s ease` |

### Send Button (App - Blue Circle)

| Property | Value |
|----------|-------|
| Background | `#3B82F6` |
| Shape | Circle |
| Size | `36px` diameter |
| Icon | White arrow/send icon, `16px` |
| Border radius | `50%` |
| Hover background | `#2563EB` |

### Ghost/Text Button

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | `#3B82F6` (app) or `#2E7D52` (landing) |
| Font size | `14px` |
| Font weight | `500` |
| Padding | `6px 12px` |
| Hover | `background: rgba(59,130,246,0.08)` (subtle tint) |

### Chip/Tag Button (" Eddie AI v1")

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | `#3B82F6` |
| Font size | `13px` |
| Font weight | `500` |
| Padding | `4px 8px` |
| Border | none |
| Prefix icon | Small sparkle/star icon (`12px`, `#3B82F6`) before "Eddie AI v1" text |
| Hover | `background: rgba(59,130,246,0.08)` |

### Add Button (+ Circle)

| Property | Value |
|----------|-------|
| Shape | Circle |
| Size | `28px` diameter |
| Background | transparent |
| Border | `1px solid #E5E5E8` |
| Icon | `+` symbol, `14px`, `#71717A` |
| Position | Standalone, left of the chip row |
| Hover | `background: #F7F7F7`, `border-color: #D1D1D6` |

---

## 6. Input Fields & Form Elements

### Chat Input (Home Screen - Card Style)

```
┌──────────────────────────────────────────────────┐
│  How can I help you today?                        │  ← placeholder text
│                                                    │
│  [+]  [✦ Eddie AI v1]                     [🎤]    │  ← action row
└──────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Container background | `#FFFFFF` |
| Container border | `1px solid #E5E5E8` |
| Container border-radius | `16px` |
| Container shadow | `0 4px 12px rgba(0,0,0,0.08)` |
| Container padding | `16px 20px` |
| Container max-width | `640px` centered |
| **Input area** (top of card) | |
| Input text color | `#18181B` |
| Input placeholder color | `#A1A1AA` |
| Input placeholder text | `"How can I help you today?"` |
| Input font size | `15px` |
| Input line-height | `1.5` |
| Input border | none (borderless within card) |
| **Action row** (below input) | |
| Row gap above | `12px` separator from input area |
| Row border-top | `1px solid #F0F0F2` |
| Row padding-top | `12px` |
| Row layout | Flex row, `justify-content: space-between` |
| Left items | `[+]` circle button (`28px`) + `[✦ Eddie AI v1]` chip, gap `8px` |
| Right item | Microphone icon, `20px`, color `#A1A1AA` |

### Chat Input (Chat Screen - Bottom Bar)

```
┌─────────────────────────────────────────────────────────────┐
│  [+]  How can I help you today?                      [🔵→]  │  ← input + send
│  [←]  [✦ Eddie AI v1]                                        │  ← sub-row
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Container background | `#FFFFFF` |
| Container position | Fixed to bottom of main content area |
| Container padding | `12px 24px` |
| Container top border | `1px solid #E5E5E8` |
| **Input row** (top) | |
| Layout | Flex row: `[+]` button + input field + `[send]` button |
| `+` button | Left, `28px` circle, same style as home screen |
| Input field | Flex: 1, no border (or subtle `1px solid #E5E5E8`) |
| Input border-radius | `12px` |
| Input padding | `10px 14px` |
| Input placeholder | `"How can I help you today?"` |
| Send button | Right, blue circle `36px` diameter, white arrow icon |
| **Sub-row** (below input) | |
| Gap above | `8px` |
| Left: back arrow | `←` icon, `16px`, color `#A1A1AA` |
| Center: chip | `[✦ Eddie AI v1]` blue chip |
| Gap between elements | `8px` |

---

## 7. Navigation & Layout Structure

### Landing Page Layout

```
┌──────────────────────────────────────────────────────────┐
│ NAV: [green dot + logo text]              [Account link] │  56px height
├──────────────────────────────────────────────────────────┤
│                                                          │
│          HERO: Centered serif heading                    │
│          Centered body text                              │
│          [Green CTA Button]                              │
│          [App screenshot preview]                        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ITALIC TEXT SECTION (serif, left or center aligned)    │
│   "Imagine taking your brain..."                         │
│   With green highlighted inline text                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│          "3 Steps To Your Own Digital Labor AI"          │
│          [Step Card 1] [Step Card 2] [Step Card 3]      │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   BOTTOM CTA: Landscape painting bg + white card         │
│   with text and green button                             │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ FOOTER: [green dot logo] centered                        │
└──────────────────────────────────────────────────────────┘
```

- Content max-width: `960px`, centered
- Horizontal padding: `40px` at edges
- Each section separated by `48-64px` vertical spacing
- Alternating backgrounds: white and `#F7F7F7`

### App Layout (Home & Chat)

**Home Screen:**
```
┌──────────┬─────────────────────────────────────────────────┐
│ SIDEBAR  │  TOP BAR: [pencil] New task                     │  48px
│ 200px    │─────────────────────────────────────────────────│
│          │                                                 │
│ Logo     │                                                 │
│ New Chat │            [sparkle icon]                       │
│ Chats    │       Hey Lucas, what's up?                     │  ← vertically centered
│          │                                                 │     in available space
│          │     ┌──────────────────────────┐                │
│          │     │ How can I help you today?│                │
│          │     │ [+] [✦ Eddie AI v1] [🎤] │                │
│          │     └──────────────────────────┘                │
│          │     Commonly questions for Eddie AI v1:         │
│          │     ┌─────────────┬─────────────┐              │
│ Get App  │     │ question 1  │ question 2  │              │
│ Settings │     │ question 3  │ question 4  │              │
└──────────┴─────┴─────────────┴─────────────┴──────────────┘
```

**Chat Screen:**
```
┌──────────┬─────────────────────────────────────────────────┐
│ SIDEBAR  │  TOP BAR: [pencil] New task                     │  48px
│ 200px    │─────────────────────────────────────────────────│
│          │                            Hello, who are you?  │  ← user msg
│ Logo     │                                                 │
│ New Chat │  [avatar] Eddie AI v1 · 11 sec                  │  ← AI msg
│ Chats    │  I'm Ashraf Eddie...                            │
│          │  ...long response text...                       │
│          │  [👍][👎][📋]                                    │
│          │                                                 │
│          │          What are the biggest problems...?      │  ← follow-up
│          │                                                 │
│          │  [avatar] Eddie AI v1 · 11 sec                  │  ← AI msg 2
│          │  My clients face five core challenges...        │
│ Get App  │  ...continued response...                       │
│ Settings │  [+] How can I help you today?        [🔵send]  │  ← input bar
└──────────┴──[←][✦ Eddie AI v1]─────────────────────────────┘
```

### Sidebar Structure

| Property | Value |
|----------|-------|
| Width | `200px` |
| Background | `#FFFFFF` |
| Border right | `1px solid #E5E5E8` |
| Padding | `16px` |
| Position | Fixed/sticky, full height |

#### Sidebar Elements (top to bottom):

```
┌─────────────────────────┐
│ [●] Eddie AI v1    [⊞][≡]│  ← Logo row + toggle icons
│                          │
│ [✏] New Chat             │  ← Active nav item
│ [💬] Chats               │  ← Inactive nav item
│                          │
│                          │
│                          │  ← flex spacer
│                          │
│ ┌──────────────────────┐ │
│ │ [⬇] Get the App      │ │  ← App download card
│ │     Download for Mac  │ │
│ └──────────────────────┘ │
│ [⚙] Settings             │  ← Bottom link
└──────────────────────────┘
```

1. **Logo row**: Colored gradient circle icon (`16px`) + "Eddie AI v1" text (`14px`, `600` weight). Right side: two small icon buttons - sidebar panel toggle (`16px`) and layout/columns icon (`16px`), both `#A1A1AA` color, gap `4px`
2. **Gap**: `16px`
3. **"New Chat"**: Pen/pencil icon (`18px`) + text. Active state: subtle background `#F0F0F2`, border-radius `8px`, text color `#18181B`
4. **"Chats"**: Chat bubble icon (`18px`) + text. Inactive state: text color `#52525B`
5. **Spacer**: `flex-grow: 1` to push bottom items down
6. **"Get the App" card**: Bordered card with small colored download icon (`20px`), title text "Get the App" (`13px`, `600`), subtitle "Download for Mac" (`11px`, `#A1A1AA`)
7. **"Settings"**: Gear icon (`16px`) + text (`13px`, `500`, `#71717A`), at very bottom with `12px` gap above

#### Sidebar Nav Item

| Property | Value |
|----------|-------|
| Padding | `8px 12px` |
| Border radius | `8px` |
| Font size | `14px` |
| Font weight | `500` |
| Icon size | `18px` |
| Icon-text gap | `10px` |
| Active background | `#F0F0F2` |
| Active text color | `#18181B` |
| Inactive text color | `#52525B` |
| Hover background | `#F7F7F7` |

---

## 8. Icon Style & Sizing

### Icon Conventions

| Property | Value |
|----------|-------|
| Style | Outlined / stroke-based (Lucide or similar) |
| Stroke width | `1.5px - 2px` |
| Default color | `#A1A1AA` (muted) or `#71717A` (secondary) |
| Active color | `#3B82F6` (blue for app) or `#18181B` (dark) |

### Icon Sizes

| Context | Size |
|---------|------|
| Sidebar nav icons | `18px` |
| Top bar icons | `18px` |
| Chat action buttons (like, dislike, copy) | `16px` |
| Microphone icon | `20px` |
| Send button arrow | `16px` (inside 36px circle) |
| AI sparkle icon (home greeting) | `28px` icon inside `52px` circle |
| Sidebar logo icon | `16px` colored circle |
| Settings gear icon | `16px` |
| Pencil/edit icon (New task) | `16px` |

### AI Sparkle Icon (Home Screen Greeting)

The sparkle icon is the primary visual element above the greeting heading. It represents the AI assistant.

| Property | Value |
|----------|-------|
| Container shape | Circle |
| Container size | `52px` |
| Container background | Soft blue gradient - `radial-gradient(circle, #93C5FD 0%, #60A5FA 50%, #3B82F6 100%)` |
| Container border | none |
| Glow effect | Subtle blue glow: `0 0 24px rgba(59,130,246,0.25)` |
| Icon inside | 4-pointed sparkle/star shape (like a compass rose or asterisk with tapered points) |
| Icon color | White (`#FFFFFF`) |
| Icon size | `24px` |
| Icon style | Filled, with small radiating lines at the tips (2-3 small accent lines) |

### AI Avatar (Chat Messages)

The same sparkle icon appears smaller next to the AI sender name in chat messages.

| Property | Value |
|----------|-------|
| Size | `24px` circle |
| Background | Same blue gradient as home sparkle icon |
| Icon | Same sparkle, scaled to fit `24px` |
| Margin right | `8px` (gap to sender name text) |

### Sidebar Logo Icon

The sidebar displays a branded icon for the AI assistant.

| Property | Value |
|----------|-------|
| Shape | Circle |
| Size | `16px` diameter |
| Appearance | Multicolor/gradient circle - appears to have green, blue, and warm tones blended |
| Style | Solid filled, not outlined |
| Margin right to text | `8px` |

### Landing Page Logo Icon

| Property | Value |
|----------|-------|
| Shape | Filled circle |
| Size | `10px` diameter |
| Color | `#2E7D52` (green primary) |
| Margin right to text | `6px` |

---

## 9. Chat UI Specifics

### Message Layout

```
AI MESSAGE:
┌──────────────────────────────────────────────────────────┐
│ [avatar 28px]  Eddie AI v1 · 11 sec                      │
│                                                          │
│ Message body text here. Can be multiple paragraphs.      │
│                                                          │
│ **Bold section header**                                  │
│ Regular paragraph text continues...                      │
│                                                          │
│ [👍] [👎] [📋]                   ← reaction bar          │
└──────────────────────────────────────────────────────────┘

USER MESSAGE:
                               ┌──────────────────────────┐
                               │ Hello, who are you?       │
                               └──────────────────────────┘
```

### AI Message

| Property | Value |
|----------|-------|
| Alignment | Left |
| Max width | `720px` |
| Background | None (transparent, sits directly on the app `#E8F0FE` background) |
| **Sender Header** | |
| Avatar | `24px` colored circle icon (sparkle icon, blue gradient), inline-left of sender name |
| Avatar-to-name gap | `8px` |
| Sender text | "Eddie AI v1" - `13px`, `600` weight, `#3F3F46` |
| Timestamp | "· 11 sec" - `13px`, `400` weight, `#A1A1AA`, separated by `·` dot |
| Sender-to-body gap | `12px` |
| **Body Text** | |
| Regular text | `15px`, `400` weight, `#3F3F46`, line-height `1.7` |
| Bold headers | `15px`, `700` weight, `#18181B` (used for section titles in numbered lists) |
| Italic text | `15px`, `400` weight, italic, `#3F3F46` |
| Paragraph spacing | `12px` margin-bottom between paragraphs |
| **Numbered Section Format** | |
| Pattern | `"#N"` prefix in quotes + bold title on same line, then body text below |
| Example | `"#1 Confusing Sales with Business Development"` (bold), then regular paragraph |
| Number style | Bold, no ordered-list markup - inline text with `#` prefix in quotes |
| Section spacing | `16px` between numbered sections |
| **Reaction bar** | |
| Position | Below message body, `12px` gap above |
| Icons | Thumbs up, Thumbs down, Copy - stroke-based, `16px`, `#A1A1AA` |

### AI Message Multi-Turn Pattern

When the AI sends multiple messages (e.g., after a follow-up prompt):

```
[AI Avatar] Eddie AI v1 · 11 sec
First message body text...
[👍] [👎] [📋]

                        "What are the biggest problems..."  ← follow-up prompt (right-aligned, user bubble style)

[AI Avatar] Eddie AI v1 · 11 sec
Second message body text...
[👍] [👎] [📋]
```

- Each AI message has its own sender header + timestamp
- Each AI message has its own reaction bar
- Follow-up prompts appear between AI messages, styled identically to user messages (right-aligned, `#DBEAFE` bubble)

### AI Message Reaction Bar

| Property | Value |
|----------|-------|
| Icon size | `16px` |
| Icon color | `#A1A1AA` |
| Icon hover color | `#52525B` |
| Icons displayed | Thumbs up, Thumbs down, Copy |
| Gap between icons | `8px` |
| Margin top from message | `8px` |

### User Message

| Property | Value |
|----------|-------|
| Alignment | Right |
| Background | `#DBEAFE` |
| Text color | `#18181B` |
| Font size | `15px` |
| Font weight | `400` |
| Padding | `10px 16px` |
| Border radius | `20px` (more rounded - pill-like) |
| Max width | `480px` |
| Shadow | none |

### Follow-up Prompt (appears between messages)

| Property | Value |
|----------|-------|
| Alignment | Right (same as user messages) |
| Background | `#DBEAFE` |
| Text style | Same as user message |
| Purpose | System-inserted clarifying question |

### App Home Main Content Positioning

| Property | Value |
|----------|-------|
| Vertical alignment | Content is vertically centered (or slightly above center) in the viewport |
| Technique | `display: flex; flex-direction: column; align-items: center; justify-content: center;` on the main area |
| Horizontal alignment | All content is horizontally centered |
| Content flow | Sparkle icon → Greeting heading → Input card → Label → Suggestions grid |
| Gap between sparkle and heading | `16px` |
| Gap between heading and input card | `24px` |
| Gap between input card and label | `16px` |
| Gap between label and suggestions | `12px` |
| Min padding top | `80px` (ensures content doesn't touch top bar) |

### Chat Scroll Area

| Property | Value |
|----------|-------|
| Layout | Scrollable column, messages stacked vertically |
| Padding top | `24px` |
| Padding bottom | `100px` (to clear fixed input bar) |
| Horizontal padding | `24px` |
| Max content width | `720px` (messages constrained, area itself is full width) |
| Horizontal centering | Messages centered in the main content area |
| Message gap | `24px` between message groups |
| Background | `#E8F0FE` (app background, scrolls under input bar) |
| Scroll behavior | `overflow-y: auto; scroll-behavior: smooth;` |

### Chat Bottom Input Bar

```
┌─────────────────────────────────────────────────────────┐
│  [+]  How can I help you today?              [🔵 send]   │
│  [←]  ✦ Eddie AI v1                                      │
└─────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Position | Fixed to bottom of main content area (not the full window - only the right panel) |
| Background | `#FFFFFF` |
| Top border | `1px solid #E5E5E8` |
| Padding | `12px 24px` |
| Width | `100%` of main content area (excludes sidebar) |
| **Input row** | |
| Layout | Flex row: `[+ button]` `[input field (flex:1)]` `[send button]` |
| `+` button | `28px` circle, left side |
| Input field | Flexible width, borderless or subtle border |
| Send button | `36px` blue circle (`#3B82F6`), white up-arrow icon |
| Gaps | `8px` between `+` and input, `8px` between input and send |
| **Sub-row** (below input) | |
| Margin top | `8px` |
| Layout | Flex row, left-aligned |
| Back arrow | `←` icon, `16px`, `#A1A1AA` |
| Chip | `✦ Eddie AI v1` in blue (`#3B82F6`), `8px` left margin |

---

## 10. Card & Container Patterns

### Landing Page Step Cards

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | none |
| Shadow | `0 2px 8px rgba(0,0,0,0.06)` |
| Border radius | `12px` |
| Padding | `0` (image fills top, text area has `16px 20px` padding) |
| Image area | Top of card, full width, shows app screenshot, `~200px` height |
| Title | Right-aligned or below image, serif or bold sans, `16px`, `700` weight |
| Description | Below title, `13px`, `#71717A` |
| CTA element | Small green button or text link |
| Step number | Gold/amber accent number or label |

### Landing Page Screenshot Preview Card

| Property | Value |
|----------|-------|
| Appearance | Browser window mockup showing app interface |
| Border | `1px solid #E5E5E8` |
| Border radius | `12px` |
| Shadow | `0 4px 16px rgba(0,0,0,0.08)` |
| Top bar | Simulated browser chrome with dots |

### Suggested Questions Container (App Home)

```
          Commonly questions for Eddie AI v1:
┌───────────────────────────┬───────────────────────────┐
│ What can you help me with?│ Tell me about your        │
│                           │ capabilities              │
├───────────────────────────┼───────────────────────────┤
│ How do I get started?     │ What are some examples of │
│                           │ tasks you can do?         │
└───────────────────────────┴───────────────────────────┘
```

| Property | Value |
|----------|-------|
| **Label above grid** | |
| Text | `"Commonly questions for Eddie AI v1:"` (exact text as shown) |
| Font | `12px`, `400` weight, `#A1A1AA` |
| Alignment | Center |
| Margin bottom | `12px` |
| **Grid container** | |
| Layout | 2 columns x 2 rows (CSS grid or table) |
| Container border | `1px solid #E5E5E8` |
| Container border-radius | `12px` |
| Container overflow | `hidden` (clips corners) |
| Max width | `640px` centered |
| **Internal dividers** | |
| Horizontal divider | `1px solid #F0F0F2` between rows |
| Vertical divider | `1px solid #F0F0F2` between columns |
| **Cells** | |
| Padding | `14px 20px` |
| Background | transparent |
| Hover background | `#F7F7F7` |
| Cursor | `pointer` |
| Text | `14px`, `400` weight, `#52525B` |
| **Exact question texts** | |
| Top-left | "What can you help me with?" |
| Top-right | "Tell me about your capabilities" |
| Bottom-left | "How do I get started?" |
| Bottom-right | "What are some examples of tasks you can do?" |

### "Get the App" Sidebar Card

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid #E5E5E8` |
| Border radius | `12px` |
| Padding | `12px` |
| Icon | Small colored download icon, `20px` |
| Title | "Get the App" - `13px`, `600` weight |
| Subtitle | "Download for Mac" - `11px`, `#A1A1AA` |

---

## 11. Header & Footer Patterns

### Landing Page Header/Nav

| Property | Value |
|----------|-------|
| Height | `56px` |
| Background | `#FFFFFF` |
| Position | Sticky, top: 0, z-index: 1000 |
| Border bottom | none visible (or very subtle `1px solid #F0F0F2`) |
| Content max-width | `960px` centered |
| Padding | `0 40px` |
| Left: Logo | Green dot (`10px` circle, `#2E7D52`) + logo text (`14px`, `600`, `#2E7D52`) |
| Right: Account | "Account" text link (`14px`, `500`, `#71717A`) |

### Landing Page Footer

| Property | Value |
|----------|-------|
| Height | `~60px` |
| Background | `#FFFFFF` |
| Content | Centered green dot logo (`10px` circle, `#2E7D52`) |
| Padding | `20px 0` |
| Border top | `1px solid #F0F0F2` (subtle) |

### App Top Bar

The top bar spans the full width of the app (both sidebar and main area share the same vertical top edge).

```
┌──────────┬──────────────────────────────────────────────┐
│ Logo row │  [pencil icon] New task                       │  ← 48px height
│ (sidebar)│                                              │
└──────────┴──────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | `48px` |
| Background | `#FFFFFF` (same as sidebar, seamless) |
| Border bottom | none (no separator between top bar and content) |
| **Sidebar portion** | Logo row: `[icon] Eddie AI v1 [toggles]` |
| **Main area portion** | Left-aligned: pencil/edit icon (`16px`, `#71717A`) + "New task" text (`14px`, `500`, `#71717A`) |
| Main area padding-left | `24px` from the sidebar border |
| Vertical alignment | All items vertically centered |

---

## 12. Landing Page Specifics

### Hero Section

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Vertical padding | `64px` top, `48px` bottom |
| Content alignment | Center |
| Heading | "Turn Your Expertise Into Digital Labor" |
| Heading font | Serif, `42px`, `700`, line-height `1.15`, `#18181B` |
| Subtext | 2 lines centered, sans-serif, `15px`, `#71717A`, max-width `520px` |
| CTA button | Green pill button, centered below text, `16px` gap above |
| App preview | Browser mockup screenshot below button, `24px` gap above |

### Italic Quote / Value Proposition Section

```
"Imagine taking your brain,
 shrinking it down, and putting it
 into a box your clients can keep on
 their desk."

 When they have [questions] and
 [need your advice]... your digital labor
 work for them.

 Digital Labor gives your leads &
 clients an AI version of you that can
 think, advise, and take action the
 way you would, without requiring
 a single minute of your time.
```

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Vertical padding | `48px` top, `48px` bottom |
| Content alignment | Left-aligned within centered container |
| Max content width | `560px`, centered on page |
| **Italic opening quote** | |
| Font | Serif italic, `20px`, `400`, line-height `1.5`, `#18181B` |
| Style | Italic (font-style: italic) |
| **"When they have" section** | |
| Font | Serif italic, `18px`, `400`, `#18181B` |
| Green highlighted words | Specific words/phrases are colored `#2E7D52` inline (not background highlight) |
| Green text examples | Words like "questions", "need your advice", "digital labor" appear in green |
| **"Digital Labor gives..." paragraph** | |
| Font | Serif regular (not italic), `16px`, `400`, `#3F3F46`, line-height `1.7` |
| This paragraph is | The main value proposition, not italicized |
| **Vertical spacing between blocks** | `24px` between the italic quote, transition text, and value prop |

### 3 Steps Section

| Property | Value |
|----------|-------|
| Background | `#F7F7F7` (light gray section) |
| Vertical padding | `64px` top, `64px` bottom |
| Section heading | "3 Steps To Your Own Digital Labor AI" - centered, serif, `32px`, `700`, `#18181B` |
| Heading margin-bottom | `48px` |
| Cards layout | Vertical stack, each card is a full-width row, `40px` gap between cards |
| Card width | Full content width (max `960px`) |

#### Step Card Layout Pattern

Each step card is a two-column row with an image and text side:

```
Step 1: [  IMAGE (60%)  ] [ TEXT (40%) ]   ← Image left, text right
Step 2: [ TEXT (40%) ] [  IMAGE (60%)  ]   ← Text left, image right (alternating)
Step 3: [  IMAGE (60%)  ] [ TEXT (40%) ]   ← Image left, text right (alternating)
```

| Step Card Property | Value |
|----------|-------|
| Image area | ~60% width, shows app screenshot mockup in a browser/window frame |
| Image border | `1px solid #E5E5E8` |
| Image border-radius | `12px` |
| Image shadow | `0 2px 8px rgba(0,0,0,0.06)` |
| Text area | ~40% width, vertically centered |
| Step title | Sans-serif, `18px`, `700`, `#18181B` (e.g., "Build Your 'AI 2nd Brain'") |
| Step title formatting | Title wraps with quotation marks for emphasis |
| Step description | `14px`, `400`, `#71717A`, line-height `1.6`, max 2-3 lines |
| Green CTA button | Small green pill button or link below description, same style as hero CTA but smaller: `12px` font, `8px 16px` padding |
| Column gap | `32px` |
| Vertical alignment | Text vertically centered relative to image |

### Bottom CTA Section

| Property | Value |
|----------|-------|
| **Background image** | Full-width landscape painting - atmospheric/moody scene with mountains, water, and warm sky tones. Painterly/artistic style (not photo). |
| Image height | `~400px` or responsive based on content |
| **White CTA card** | |
| Card background | `#FFFFFF` |
| Card border-radius | `16px` |
| Card padding | `32px` |
| Card shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Card position | Overlaid on the painting, centered horizontally, offset vertically toward top |
| Card max-width | `520px` |
| Card heading | Descriptive text about the Digital Labor product, sans-serif, `18px`, `700`, `#18181B` |
| Card body text | `14px`, `400`, `#71717A`, line-height `1.6` |
| Card additional element | May include a small progress/loading indicator or form element (green accent) |
| Card CTA | Green pill button (same as hero CTA), below body text, `16px` gap above |
| **Section vertical spacing** | `0` padding - image bleeds full width, card overlaps |

---

## 13. Responsive Behavior

### Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Desktop `>1024px` | Full sidebar (200px) + main content area, landing page full width cards |
| Tablet `768-1024px` | Sidebar collapses or becomes overlay, landing page stack vertically |
| Mobile `<768px` | Sidebar hidden (hamburger menu), single column layout, full-width chat |

### App Responsive Cues

- Sidebar appears fixed on desktop, likely slides in as overlay on mobile
- Chat input bar stays fixed at bottom at all sizes
- Main content area fills available width
- Messages maintain max-width but center in available space

### Landing Page Responsive Cues

- Content max-width constrains to `960px`
- On narrower screens, padding reduces to `20px`
- Step cards stack vertically instead of side-by-side
- Hero heading scales down to `28-32px` on mobile
- Navigation collapses to hamburger menu on mobile

---

## 14. Animation & Transitions

### Global Transition

```css
--transition: 0.2s ease;
```

### Specific Animations

| Element | Animation |
|---------|-----------|
| Button hover | `transform: translateY(-1px)`, `background` color darken, `0.2s ease` |
| Card hover | `box-shadow` increase + `translateY(-2px)`, `0.25s ease` |
| Nav link hover | Color change to darker, `0.2s ease` |
| Chat messages appearing | Fade in from bottom (suggested: `opacity 0→1`, `translateY(8px→0)`, `0.3s ease`) |
| AI sparkle icon | Subtle pulse/glow animation on the blue circle (suggested: `pulse 2s ease infinite`) |
| Sidebar items | `background-color` change on hover, `0.15s ease` |
| Input focus | Border color change to `#3B82F6`, `0.2s ease` |
| Modal overlay | `opacity 0→1`, `0.2s ease` |
| Modal content | `translateY(10px→0)`, `0.2s ease` |
| Send button | `background-color` darken on hover, `0.15s ease` |
| Suggested question hover | `background-color` to `#F7F7F7`, `0.15s ease` |

### Elevation Levels

| Level | Shadow | Usage |
|-------|--------|-------|
| Level 0 | none | Flat elements, inline text |
| Level 1 | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth - sidebar, nav |
| Level 2 | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards |
| Level 3 | `0 4px 12px rgba(0,0,0,0.08)` | Elevated cards - chat input container |
| Level 4 | `0 10px 25px rgba(0,0,0,0.12)` | Modals, overlays |

---

## 15. UX Patterns

### Visual Hierarchy

1. **Primary focus**: Greeting heading (app) / Hero heading (landing) - largest text, center of viewport
2. **Secondary focus**: Input area / CTA button - draws action
3. **Tertiary**: Supporting content - suggestions, step cards, sidebar
4. **Background**: Chrome - nav, footer, borders

### Interaction Affordances

| Element | Affordance |
|---------|------------|
| Green buttons | Clear CTA - pill shape signals clickability |
| Blue send circle | High contrast against white, icon indicates action |
| Suggested questions | Bordered cells with hover state signal clickability |
| Sidebar nav items | Hover background + icon provides tap/click target |
| Chat input | Placeholder text guides user, card-like container draws focus |
| Chips ("+ Eddie AI v1") | `+` prefix signals additive action, blue color indicates interactive |
| Reaction icons | Familiar thumbs up/down pattern, small but accessible |

### Content Patterns

| Pattern | Description |
|---------|-------------|
| Empty state (home) | Greeting + centered input + suggestions = warm, guided entry point |
| Active chat | Clean left/right message flow, AI responses are long-form with structure |
| AI response formatting | Uses bold headers, numbered sections, regular paragraphs, italic emphasis |
| Landing page flow | Problem → Solution → Steps → CTA (classic conversion funnel) |
| Landing page italic block | Emotional/empathetic hook using serif italic for warmth |

### Accessibility Considerations

| Aspect | Implementation |
|--------|---------------|
| Contrast | All text meets WCAG AA (dark text on light bg, white on green/blue buttons) |
| Focus states | Input focus ring: `2px solid #3B82F6` with `2px` offset |
| Touch targets | Minimum `44px` height for buttons and nav items |
| Semantic structure | Headings follow hierarchy (h1 > h2 > h3) |
| Icon + text | All icons paired with text labels for clarity |

---

## Quick Reference: Screen-by-Screen

### Landing Page Key Values
- **Background**: White (`#FFFFFF`) with occasional `#F7F7F7` sections
- **Accent**: Green `#2E7D52`
- **Heading font**: Serif (Playfair Display / Georgia)
- **Body font**: Sans-serif (Instrument Sans)
- **Max-width**: `960px`
- **Nav height**: `56px`

### App Home Key Values
- **Sidebar**: `200px` wide, white, right border `#E5E5E8`
- **Main bg**: `#E8F0FE` (light blue)
- **Accent**: Blue `#3B82F6`
- **Greeting**: `28px`, `700` weight, centered
- **Input container**: White card with shadow, `16px` radius
- **Suggestions**: 2x2 grid, bordered cells

### App Chat Key Values
- **User messages**: Right-aligned, `#DBEAFE` bg, `20px` radius
- **AI messages**: Left-aligned, no bg, avatar + name + timestamp header
- **AI text**: `15px`, line-height `1.7`, bold headers inline
- **Reactions**: 3 icons (thumbs up, down, copy), `16px`, gray
- **Input bar**: Fixed bottom, white bg, blue send button
- **Message max-width**: `720px`
