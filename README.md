# Myhtra Next.js

A Next.js application with rich text editing capabilities using Lexical editor.

## 🚀 Features

- Rich text editor with Lexical
- Image upload and management
- Tab-based interface for better UX
- Docker deployment ready

## 📝 To Do

- Update UI-components page to show the available components, and how to use them, with light + dark themes
- Continue implementing more radix components
- Add Tabs component to ui-components
- Check if Input component is broken after changing the classname order

### High Priority

- [ ] **Lexical Rich Text Extensions**
  - [ ] Select components
  - [ ] Code blocks
  - [ ] Bullet points
  - [ ] Header formatting (BlockFormatDropdown)

### UI/UX Improvements

- [ ] Standardize border radius across components
- [ ] Update Tabs component styling
- [ ] Complete ImagePlugin drag and drop functionality

## 🛠 Development

Uses pnpm (version pinned in `package.json`), installed through corepack:

```bash
corepack enable pnpm
pnpm install
pnpm dev     # https://localhost:3000
pnpm lint
pnpm build
```

## 🚀 Deployment

Run `./deploy.sh` from a clean working tree. It builds the image, tags it with the git commit SHA (plus `latest`), pushes both, and rolls the Kubernetes deployment to that exact tag.

## 📅 Development Log

### June 27, 2025

- Updated dialog component

### June 26, 2025

- Started using turbopack
- Seems like URL image upload is not working, which I didn't test before
- Tested and fixed the issue can't use Next/Image instead we need to use native image, I tried my chances

### June 19, 2025

- ImagePlugin development nearly complete
- Working on drag and drop functionality improvements
- Tabs component added
- File Input improved

### June 18, 2025

- Added Tabs component for better image handling
- Identified styling updates needed

### June 17, 2025

- Lexical Image component needs customization
- Planning to remove unused features

### June 16, 2025

- Fixed CSS order issue on deployment ([Next.js Issue #64921](https://github.com/vercel/next.js/issues/64921))
- Updated next.config.js
- Moved shared component styles to globals.css

## 🔧 Technical Notes

- CSS order issues resolved by updating shared styles location
- Deployment uses Docker containerization with Kubernetes


## Oct 23, 2025 
- Need to update next-auth to v5, updated next to 16