# Target Cursor Animation System

A sophisticated, production-ready cursor animation system for React applications that provides smooth, interactive cursor effects with smart target detection and corner animations.

## ✨ Features

- **Smart Target Detection**: Automatically detects buttons, links, and interactive elements
- **Corner Animation**: Animated corners that frame clickable elements
- **Spinning Animation**: Continuous rotation when not hovering over targets
- **Visual Effects**: Mix-blend-difference for high contrast
- **Performance Optimized**: Throttled mouse events and GPU acceleration
- **Customizable**: Configurable selectors, animation duration, and behavior

## 🚀 Quick Start

### 1. Installation

The required dependency is already installed:

```bash
pnpm add gsap
```

### 2. Basic Usage

```tsx
import TargetCursor from '@/components/TargetCursor';

function App() {
  return (
    <div>
      <TargetCursor />
      {/* Your app content */}
    </div>
  );
}
```

### 3. Advanced Configuration

```tsx
<TargetCursor 
  targetSelector="button, a, [role='button'], .custom-target"
  spinDuration={3}
  hideDefaultCursor={true}
/>
```

## 📋 Props Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetSelector` | `string` | `"button, a, [role='button'], img[alt*='logo' i], .logo, [data-logo='true'], .cursor-target"` | CSS selector for elements that should trigger the cursor animation |
| `spinDuration` | `number` | `2` | Duration in seconds for one complete rotation |
| `hideDefaultCursor` | `boolean` | `true` | Whether to hide the default browser cursor |

## 🎯 Target Detection

The cursor automatically detects and animates around:

- **Buttons**: `<button>`, `<input type="button">`, etc.
- **Links**: `<a href="...">`
- **Role buttons**: `[role="button"]`
- **Logos**: Images with "logo" in alt text, `.logo` class, or `data-logo="true"`
- **Custom targets**: Elements with `.cursor-target` class

### Custom Target Examples

```tsx
// Using data attribute
<div data-logo="true">Custom Logo</div>

// Using class
<div className="cursor-target">Custom Target</div>

// Using role
<div role="button" tabIndex={0}>Custom Button</div>

// Image with logo in alt
<img src="logo.png" alt="Company Logo" />
```

## 🎨 Visual Effects

### Cursor States

1. **Default State**: Spinning white circle with mix-blend-difference
2. **Hover State**: Static cursor with animated corner frame around target
3. **Corner Animation**: Four corners that smoothly frame the hovered element

### Animation Details

- **Smooth Movement**: GSAP-powered smooth cursor following
- **Corner Framing**: Animated corners that adapt to element size
- **Parallax Effect**: Subtle movement based on mouse position
- **Performance**: GPU-accelerated with `will-change` properties

## 🔧 CSS Classes

The component automatically manages these CSS classes:

```css
.tcursor-hide {
  cursor: none !important;
}

.tcursor-hide * {
  cursor: none !important;
}

.tcursor-main {
  will-change: transform;
}

.tcursor-corners {
  will-change: transform, opacity;
}

.tcursor-corner {
  will-change: transform;
}
```

## 📱 Browser Support

- **Modern browsers** with CSS transforms support
- **ES6+ features** required (use Babel for older browsers)
- **GSAP 3.x** compatibility

## 🚀 Performance Tips

1. **Throttled Events**: Mouse movement is throttled using `requestAnimationFrame`
2. **GPU Acceleration**: Uses `will-change` for optimal performance
3. **Efficient Cleanup**: Proper cleanup of animations and event listeners
4. **Memory Management**: Automatic cleanup on component unmount

## 🛠️ Troubleshooting

### Common Issues

**Cursor not appearing:**
- Ensure GSAP is properly installed and imported
- Check that the component is rendered in your app

**Corners not animating:**
- Verify your target elements match the `targetSelector`
- Check browser console for any JavaScript errors

**Performance issues:**
- Ensure you're using the latest version of GSAP
- Check that animations are properly cleaned up

### Debug Mode

Add this to see target detection in action:

```tsx
<TargetCursor 
  targetSelector="button, a, [role='button'], .cursor-target"
  spinDuration={2}
  hideDefaultCursor={true}
  // Add debug logging
  onTargetChange={(target) => console.log('Target changed:', target)}
/>
```

## 📚 Examples

See `CursorExamples.tsx` for comprehensive usage examples including:
- Basic button interactions
- Link hover effects
- Custom target elements
- Interactive cards
- Logo animations

## 🎯 Integration with Triada Trade

The cursor animation is already integrated into the Triada Trade website and will work with:

- All navigation buttons and links
- Service cards and CTAs
- Team member avatars
- Partner logos
- Contact forms
- Blog post cards

## 🔄 Customization

### Custom Animation Duration

```tsx
<TargetCursor spinDuration={1.5} />
```

### Custom Target Selectors

```tsx
<TargetCursor 
  targetSelector=".my-button, .my-link, [data-interactive]"
/>
```

### Disable Default Cursor Hiding

```tsx
<TargetCursor hideDefaultCursor={false} />
```

## 📈 Future Enhancements

Potential future improvements:
- Custom cursor shapes
- Sound effects on hover
- Particle effects
- Gesture recognition
- Mobile touch support

---

**Note**: This cursor animation system is production-ready and optimized for the Triada Trade website. It provides a professional, engaging user experience that enhances the overall design aesthetic.
