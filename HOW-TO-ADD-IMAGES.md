# How to Add Images to Your Project Case Studies

## Overview

Your portfolio uses a minimalistic approach where images are naturally integrated within the text content, creating a balanced narrative between visuals and explanations.

## Adding Images to Projects

### Step 1: Prepare Your Images

1. **Export your designs** from Figma, Sketch, or your design tool
   - Recommended format: PNG for screenshots, JPG for photos
   - Aspect ratio: **16:9** (e.g., 1920×1080, 1600×900, 1200×675)
   - File size: Keep under 500KB (use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/))

2. **Create a folder** for your project:
   ```
   portfolio/
   └── public/
       └── images/
           └── projects/
               └── your-project-name/
                   ├── user-flow.png
                   ├── before-after.png
                   ├── final-design.png
                   └── ...
   ```

### Step 2: Add Images Within Your MDX Content

Open your project file (e.g., `content/projects/your-project.mdx`) and add images using standard Markdown syntax:

```markdown
## Research

We conducted user interviews and analyzed the current flow...

![User flow analysis showing key pain points](data:image/svg+xml,%3Csvg...)

### Key Findings

Based on our research, we identified...
```

**The format:**
```markdown
![Caption text that describes the image](/images/projects/your-project/filename.png)
```

### Step 3: Strategic Placement

**Best practices for image placement:**

✅ **DO**:
- Place images **after** explaining the context
- Use images to **illustrate specific points** in your narrative
- Aim for **2-4 images per case study** (not overwhelming)
- Add images at natural breaks in the content

❌ **DON'T**:
- Dump all images at once
- Add images without context
- Use more than 1 image per section (unless comparing)
- Place images in the middle of a paragraph

## Example Structure

Here's a recommended flow:

```markdown
## Research

We analyzed user behavior and identified drop-off points...

![Analytics showing 43% drop-off at signup](/ images/projects/onboarding/analytics.png)

### Key Insights

Based on the data, we discovered that...

## Solution

We redesigned the signup flow from 7 steps to 3 steps...

![Before and after comparison of signup flow](/images/projects/onboarding/before-after.png)

### Design System

We created new components to support the flow...

## Results

The new onboarding increased activation by 27%...

![A/B test results dashboard](/images/projects/onboarding/results.png)
```

## Image Features

Your images will automatically have:
- **Rounded corners** and subtle border
- **Hover effect** - slight zoom on mouse over
- **Responsive sizing** - adapts to screen size
- **Caption text** displayed below (from alt text)
- **Proper spacing** - generous margins for clean layout

## Real Example

From the Design System project:

```markdown
**Benefits**:
- Easy theme switching (light/dark mode)
- Consistent color usage
- Accessible contrast ratios enforced at token level

![Token-based color system showing primitive, semantic, and component token hierarchy](/images/projects/design-system/color-tokens.png)

### Typography Scale

Implemented fluid type system using `clamp()`...
```

## Tips for Great Case Study Images

1. **Screenshots**: Show your actual work
   - Figma designs
   - User flows
   - Prototypes
   - Final products

2. **Before/After**: Demonstrate improvements
   - Side-by-side comparisons
   - Annotated changes

3. **Data visualizations**: Show impact
   - Analytics dashboards
   - A/B test results
   - Metrics charts

4. **Wireframes/Mockups**: Show process
   - Early concepts
   - Iterations
   - Final designs

## Replacing Placeholder Images

The example projects currently use placeholder SVG images. To replace them:

1. Find the placeholder in your MDX file:
   ```markdown
   ![Description](data:image/svg+xml,...)
   ```

2. Replace with your actual image path:
   ```markdown
   ![Description](/images/projects/your-project/your-image.png)
   ```

## Quality Checklist

Before adding images, ensure:
- [ ] Image is relevant and adds value to the narrative
- [ ] File size is optimized (< 500KB)
- [ ] Image has a descriptive caption/alt text
- [ ] Aspect ratio is 16:9 (looks best)
- [ ] Image is clear and high-resolution
- [ ] Placed after explanatory text, not before

## Need Help?

The image styling is defined in:
- `portfolio/mdx-components.tsx` - The `img` component

Happy showcasing! 📸



