# Myhtra Next.js

A Next.js application with rich text editing capabilities using Lexical editor.

## 🚀 Features

- Rich text editor with Lexical
- Image upload and management
- Tab-based interface for better UX
- Docker deployment ready

## 📝 To Do

- Add Tabs component to ui-components
- Check if Input component is broken after changing the classname order

### High Priority

- [ ] **Lexical Rich Text Extensions**
  - [ ] Image support
  - [ ] Select components
  - [ ] Code blocks
  - [ ] Bullet points
  - [ ] Header formatting (BlockFormatDropdown)

### UI/UX Improvements

- [ ] Standardize border radius across components
- [ ] Update Tabs component styling
- [ ] Complete ImagePlugin drag and drop functionality

## 🚀 Deployment

To update the site, run the following commands:

```bash
# Build Docker image
sudo docker build . -t icanjump/myhtra-nextjs

# Push to registry
sudo docker push icanjump/myhtra-nextjs

# Restart Kubernetes deployment
k rollout restart deployment myhtra-deployment
```

> **Note**: Consider creating a deployment script to automate these steps.

## 📅 Development Log

### June 26, 2025

- Started using turbopack

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
