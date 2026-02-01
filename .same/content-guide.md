# Content Guide - Essay/Memo Platform

## Overview
This platform is designed for elegant, long-form essay and memo reading with section-based navigation.

---

## Adding Your Essay Content

### 1. Define Your Sections

Edit `src/app/page.tsx` to define your essay sections:

```typescript
const sections = [
  { id: 'table-of-contents', title: 'Table of Contents', number: null },
  { id: 'introduction', title: 'Introduction', number: 'I.' },
  { id: 'main-argument', title: 'Main Argument', number: 'II.' },
  { id: 'evidence', title: 'Supporting Evidence', number: 'III.' },
  { id: 'conclusion', title: 'Conclusion', number: 'IV.' },
];
```

**Notes:**
- The first section should always be `table-of-contents`
- Use Roman numerals (I., II., III., etc.) for numbered sections
- Set `number: null` for sections without numbers

---

### 2. Customize Table of Contents

Edit `src/components/TableOfContents.tsx`:

**Update Author & Date:**
```tsx
<div className="mb-8 text-gray-300 italic">
  <p className="text-lg">Your Name Here</p>
  <p className="text-lg">February 2026</p>
</div>
```

**Update Section Descriptions:**
```tsx
<p className="text-gray-400 mb-4 leading-relaxed">
  Your custom description for this section...
</p>
```

---

### 3. Add Section Content

Create a new component for each section or edit `src/components/SectionContent.tsx`.

**Option A: Single File (Current Setup)**

Edit the content in `SectionContent.tsx` based on `activeSection`:

```tsx
{activeSection === 'introduction' && (
  <>
    <h1>I. Introduction</h1>
    <p>Your introduction content...</p>
  </>
)}
```

**Option B: Separate Component Files (Recommended for Long Essays)**

1. Create `src/components/sections/Introduction.tsx`:
```tsx
export function Introduction() {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="text-gray-300 leading-relaxed mb-6">
        Your introduction paragraph...
      </p>

      {/* Use section dividers between major parts */}
      <SectionDivider />

      <p className="text-gray-300 leading-relaxed mb-6">
        More content...
      </p>
    </div>
  );
}
```

2. Import and use in `SectionContent.tsx`:
```tsx
import { Introduction } from './sections/Introduction';

// In the render:
{activeSection === 'introduction' && <Introduction />}
```

---

## Using Interactive Features

### Wheat Icon Popups (Annotations)

Add inline annotations with the wheat icon:

```tsx
<WheatPopup content="This is additional context!" />
```

**With Image:**
```tsx
<WheatPopup
  content="Check out this diagram"
  imageUrl="/path/to/image.jpg"
/>
```

**With URL Preview:**
```tsx
<WheatPopup
  content="Related article"
  urlPreview="https://example.com"
/>
```

**How It Works:**
- The wheat icon appears inline with your text
- Hover triggers a 1-second wiggle animation
- Click to open the popup
- Click the × or anywhere outside to close

---

## Styling Your Content

### Typography

**Main Paragraph:**
```tsx
<p className="text-gray-300 leading-relaxed mb-6">
  Your paragraph text...
</p>
```

**Italics (for emphasis):**
```tsx
<em>emphasized text</em>
```

**Section Headings:**
```tsx
<h2 className="text-3xl text-[hsl(var(--gold-base))] italic mb-4">
  II. Subheading
</h2>
```

**Blockquotes:**
```tsx
<blockquote className="border-l-2 border-[hsl(var(--gold-dark))] pl-6 italic text-gray-400 my-8">
  "Quoted text goes here..."
</blockquote>
```

---

### Section Dividers

Use the `<SectionDivider />` component to add elegant dividers:

```tsx
import { SectionDivider } from './SectionDivider';

<SectionDivider />
```

**Features:**
- Tapered ends
- Animated pulsing golden dots in center
- Subtle gradient

---

## Customizing Colors

Edit `src/app/globals.css`:

### Gold Palette

```css
/* Current values */
--gold-dark: 38 37% 44%;   /* #9B7E46 - darker bronze */
--gold-base: 43 60% 53%;   /* #D4AF37 - main gold */
--gold-light: 44 79% 85%;  /* #F4E4C1 - light cream */
--gold-accent: 43 77% 45%; /* #B8860B - accent gold */
```

### Background Colors

**Dark Mode:**
```css
--content-bg: 220 20% 16%;  /* Main content background */
--sidebar-bg: 220 25% 8%;   /* Sidebar (darker) */
```

**Light Mode:**
```css
--content-bg: 44 31% 95%;   /* Parchment/wheat color */
--sidebar-bg: 220 20% 16%;  /* Transitions to dark navy */
```

---

## Theme Toggle

The sun/moon toggle appears:
- **Desktop:** Bottom center of sidebar
- **Mobile:** Top right of bottom bar

**Animations:**
- Sun: Glows on hover
- Moon: Spins 180° on hover

---

## Navigation Flow

1. **Table of Contents** → Lists all sections with descriptions
2. **Click Section** → Navigates to that section
3. **Section View** → Shows hero title (fades in), content, and "Next Section" link
4. **Sidebar** → Always shows current section highlighted with gold gradient

---

## Mobile Considerations

- Sidebar becomes horizontal bottom bar
- Logo moves to top-left of bottom bar
- Theme toggle moves to top-right of bottom bar
- Scrollable section navigation
- Content has bottom padding to avoid bar overlap

---

## Best Practices

1. **Keep sections focused** - Each section should cover one main idea
2. **Use descriptive titles** - Helps readers navigate
3. **Add wheat annotations sparingly** - Only for important side notes
4. **Section dividers** - Use between major topic shifts
5. **Maintain consistent voice** - EB Garamond works best with formal, literary tone

---

## File Structure

```
src/
├── app/
│   ├── page.tsx           # Main app, define sections here
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Styles and colors
├── components/
│   ├── Sidebar.tsx        # Desktop navigation
│   ├── BottomBar.tsx      # Mobile navigation
│   ├── SectionContent.tsx # Main content wrapper
│   ├── TableOfContents.tsx # TOC page
│   ├── SectionDivider.tsx # Animated dividers
│   ├── WheatPopup.tsx     # Annotation popups
│   ├── ThemeToggle.tsx    # Sun/moon toggle
│   └── TwinklingStars.tsx # Sidebar animation
```

---

## Next Steps

1. Define your sections in `page.tsx`
2. Update author info in `TableOfContents.tsx`
3. Add section descriptions in `TableOfContents.tsx`
4. Create content for each section
5. Add wheat annotations where needed
6. Test on mobile and desktop
7. Toggle theme to verify both modes look good

---

## Support

- All animations are pre-configured
- Colors follow the warm amber-gold palette
- Responsive design works on all screen sizes
- EB Garamond font is loaded automatically
