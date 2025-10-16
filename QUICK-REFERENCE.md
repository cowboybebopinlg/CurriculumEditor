# Quick Reference - React Curriculum Builder

## 🚀 Run the App

```bash
cd react-app
npm install
npm run dev
```

Opens at **http://localhost:3000**

---

## 📁 File Structure

```
react-app/
├── src/
│   ├── components/          # All 27 React components ✅
│   │   ├── App.tsx
│   │   ├── SystemHeader.tsx
│   │   ├── SystemBody.tsx
│   │   ├── NavPanel.tsx
│   │   ├── ContentPanel.tsx
│   │   ├── ContextPanel.tsx
│   │   ├── CurriculumTable.tsx
│   │   ├── CurriculumBuilder.tsx
│   │   ├── ModuleComponent.tsx
│   │   ├── CreateProcedureModal.tsx
│   │   ├── LessonsHeader.tsx
│   │   ├── HeaderTitle.tsx
│   │   ├── LessonsHeaderButtons.tsx
│   │   ├── CreateCurriculumButton.tsx
│   │   ├── SaveCurriculumButton.tsx
│   │   ├── DeleteCurriculumButton.tsx
│   │   ├── NavTab.tsx
│   │   ├── NavIcon.tsx
│   │   ├── CurriculumIcon.tsx
│   │   ├── HelpIcon.tsx
│   │   ├── ChevronDownIcon.tsx
│   │   ├── SaveIcon.tsx
│   │   ├── DeleteIcon.tsx
│   │   ├── ColorHorizontalTag.tsx
│   │   ├── HeaderButtons.tsx
│   │   ├── SearchBar.tsx
│   │   └── ProfileButton.tsx
│   ├── types/
│   │   └── curriculum.ts    # TypeScript interfaces
│   ├── styles/
│   │   └── globals.css      # Tailwind + custom CSS
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── README.md                 # Full documentation
├── CONVERSION-STATUS.md      # Detailed conversion status
├── FINAL-STATUS.md           # Completion summary
└── QUICK-REFERENCE.md        # This file
```

---

## 🎯 Key Features

### 1. View Curricula
- See table of existing curricula
- Search bar (UI ready)

### 2. Create Curriculum
```typescript
// Click "Create Curriculum" button
// → Header shows "Curriculum > Untitled Curriculum"
// → Middle panel shows curriculum builder
// → Right panel shows outline
```

### 3. Manage Modules
- Add modules (unlimited)
- Edit module names
- Upload images (placeholder)
- Expand/collapse
- Delete with confirmation

### 4. Add Content
- Add lessons from library modal
- Add media files (Video/Audio/PDF/Image)
- Reorder items (UI ready)
- Delete individual items

### 5. AI Draft
- Open modal with prompt input
- Suggested prompts
- Upload reference documents
- Generate procedures

---

## 📝 TypeScript Interfaces

```typescript
interface Curriculum {
  name: string
  image?: string
  modules: Module[]
}

interface Module {
  id: string
  name: string
  image?: string
  isExpanded: boolean
  lessons: Lesson[]
  mediaFiles: MediaFile[]
}

interface Lesson {
  id: string
  name: string
  thumbnail?: string
  orderNumber: number
}

interface MediaFile {
  id: string
  name: string
  type: MediaFileType
  thumbnail?: string
  orderNumber: number
}

enum MediaFileType {
  Video = 'Video',
  Audio = 'Audio',
  Image = 'Image',
  Pdf = 'Pdf'
}
```

---

## 🎨 Component Hierarchy

```
App
├── SystemHeader
│   ├── ColorHorizontalTag
│   └── HeaderButtons
│       ├── SearchBar
│       └── ProfileButton
└── SystemBody
    ├── NavPanel
    │   ├── NavIcon
    │   └── NavTab[]
    │       ├── CurriculumIcon
    │       └── HelpIcon
    ├── ContentPanel
    │   ├── LessonsHeader
    │   │   ├── HeaderTitle
    │   │   └── LessonsHeaderButtons
    │   │       ├── CreateCurriculumButton
    │   │       ├── SaveCurriculumButton
    │   │       └── DeleteCurriculumButton
    │   ├── SearchBar (when !editMode)
    │   ├── CurriculumTable (when !editMode)
    │   └── CurriculumBuilder (when editMode)
    │       ├── ModuleComponent[]
    │       │   └── Lesson/Media items
    │       └── AddModuleButton
    └── ContextPanel
        ├── OpenButton (when !editMode)
        ├── DetailField[] (when !editMode)
        └── CurriculumOutliner (when editMode)
└── CreateProcedureModal (when open)
```

---

## 🔧 Common Tasks

### Add a New Component

```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
  onClick: () => void
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
    </div>
  )
}
```

### Use State

```typescript
import { useState } from 'react'

const [count, setCount] = useState(0)

const increment = () => setCount(count + 1)
```

### Handle Events

```typescript
const handleClick = () => {
  console.log('Clicked!')
}

<button onClick={handleClick}>Click Me</button>
```

### Conditional Rendering

```typescript
{isVisible && <div>Visible</div>}
{isActive ? <div>Active</div> : <div>Inactive</div>}
```

### Lists

```typescript
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## 🎓 React vs Blazor Cheat Sheet

| Blazor | React |
|--------|-------|
| `[Parameter]` | `interface Props` |
| `EventCallback` | `() => void` |
| `@bind` | `value={x} onChange={(e) => setX(e.target.value)}` |
| `@if (condition)` | `{condition && <div/>}` |
| `@foreach (var x in list)` | `{list.map(x => <div key={x.id}/>)}` |
| `@onclick` | `onClick` |
| `StateHasChanged()` | Automatic with `setState` |

---

## 🐛 Common Issues

### "Module not found"
```bash
# Make sure you're in react-app directory
cd react-app
npm install
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

### Types not working
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Styles not applying
```bash
# Check Tailwind is working
npm run dev
# Should see Tailwind classes applied
```

---

## 📦 NPM Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🔍 Testing Workflow

1. **Start App**: `npm run dev`
2. **View Curricula**: See table view
3. **Create Curriculum**: Click button
4. **Add Module**: Click "Add Module"
5. **Add Lesson**: Click "Add Lesson" → Select from modal
6. **Add Media**: Click "Add Media File"
7. **Save**: Click "Save" (logs to console)
8. **Delete**: Click "Delete" → Confirms → Clears

---

## 📚 Resources

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## ✅ Status: 100% Complete

All 27 components converted and working!

**Last Updated**: December 2024
