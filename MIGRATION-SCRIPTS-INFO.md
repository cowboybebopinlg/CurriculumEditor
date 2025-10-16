# Migration Scripts Available

## 📦 Scripts in Project Root

Your project now includes PowerShell scripts to move the React app to a unique folder:

### Files Created

1. **Move-ReactApp.ps1** - Basic migration script
2. **Move-ReactApp-Advanced.ps1** - Advanced script with options
3. **Move-ReactApp.bat** - Windows batch wrapper
4. **MIGRATION-SCRIPTS-README.md** - Complete documentation
5. **QUICK-MIGRATION-GUIDE.txt** - Quick reference

### Why Use These Scripts?

- Keep your Blazor and React versions separate
- Automatic timestamped folder names
- Safe migration with confirmations
- Optional backup creation
- Easy rollback if needed

### Quick Start

**Easiest way (Windows):**
```
Double-click: Move-ReactApp.bat
```

**PowerShell way:**
```powershell
.\Move-ReactApp.ps1
```

**Custom name:**
```powershell
.\Move-ReactApp-Advanced.ps1 -CustomName "Production-React"
```

### What Gets Moved

```
react-app/  →  CurriculumBuilder-React_2024-12-19_143022/
```

All your React files stay intact, just in a new location!

### After Migration

```bash
cd CurriculumBuilder-React_2024-12-19_143022
npm install
npm run dev
```

---

**See MIGRATION-SCRIPTS-README.md in project root for full documentation**
