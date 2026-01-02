# Brian Dawson - Professional Profile Website

A cinematic, liquid glass aesthetic profile website with Minority Report-inspired design.

## Package Contents

```
brian-dawson-profile-package/
├── index.html              # Main profile page
├── gallery.html            # Gallery/portfolio page
├── assets/
│   └── brian-dawson-headshot.jpg
└── README.md              # This file
```

## Features

- **Liquid Glass UI**: Frosted glass panels with backdrop blur
- **Particle Network**: Animated connected particle system background
- **3D Transforms**: Perspective-based depth effects on cards and panels
- **Viewport Fading**: Content fades in/out smoothly as you scroll
- **Data Streams**: Animated vertical streams in foreground
- **Rotating Rings**: Orbital animations around profile image
- **Holographic Effects**: Scanning light effects across surfaces
- **Mouse Tracking**: Radial glow follows cursor on cards
- **Company Logos**: SVG logos for CIQ, Ripple, Linux Foundation, CloudBees, PlayStation
- **Lucide Icons**: Professional icon library (no emojis)

## Installation Instructions

### Option 1: Upload to Web Host

1. Extract the entire `brian-dawson-profile-package` folder
2. Upload ALL files maintaining the folder structure:
   - `index.html` (root)
   - `gallery.html` (root)
   - `assets/brian-dawson-headshot.jpg`

3. Access via your domain: `yourdomain.com/index.html`

### Option 2: GitHub Pages

1. Create a new repository
2. Upload all files maintaining folder structure
3. Go to Settings → Pages
4. Select branch: `main`, folder: `/ (root)`
5. Save and wait for deployment
6. Access at: `https://yourusername.github.io/repo-name/`

### Option 3: Netlify/Vercel

1. Drag and drop the entire folder into Netlify or Vercel
2. Deploy automatically
3. Custom domain optional

## Technical Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No server-side requirements (pure HTML/CSS/JS)

## External Dependencies

- Google Fonts (Inter, JetBrains Mono) - loaded from CDN
- Lucide Icons - loaded from CDN

Both load from CDN, so internet connection required for fonts and icons.

## Customization

### Update Email
Edit `index.html` line with `mailto:brian@ciq.com` to your email.

### Update LinkedIn
Edit `index.html` line with `linkedin.com/in/bvdawson` to your profile.

### Change Colors
Edit CSS variables in `:root` section of both HTML files:
- `--cyan`: Primary accent color
- `--green`: Secondary accent
- `--amber`: Tertiary accent

### Replace Headshot
Replace `assets/brian-dawson-headshot.jpg` with your image (recommended: 800x800px minimum, square crop).

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (14+)
- Mobile: Fully responsive

## Performance Notes

- Particle system: ~90 particles with distance-based connections
- Animations: Hardware-accelerated (CSS transforms, canvas)
- Images: Optimize headshot to <500KB for fast loading

## License

Personal portfolio website. All code is yours to modify.
Company logos are property of their respective owners (used for reference only).

## Support

For questions or issues, contact: brian@ciq.com

---

**Version**: 1.0
**Created**: January 2025
**Design**: Liquid Glass / Minority Report aesthetic
