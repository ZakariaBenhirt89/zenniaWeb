# 📁 **Exact Files to Copy for Export**

## 🎯 **Core Files** (Copy these exactly as they are)

### **1. Main Components**
```
✅ /App.tsx
✅ /components/LoginScreen.tsx  
✅ /components/AnimatedBackground.tsx
✅ /styles/globals.css
```

### **2. UI Component Library** (Copy entire folder)
```
✅ /components/ui/button.tsx
✅ /components/ui/input.tsx
✅ /components/ui/label.tsx
✅ /components/ui/checkbox.tsx
✅ /components/ui/separator.tsx
✅ /components/ui/utils.ts
```

**Optional UI Components** (Copy if you plan to extend):
```
/components/ui/card.tsx
/components/ui/dialog.tsx
/components/ui/form.tsx
/components/ui/tabs.tsx
/components/ui/toast.tsx
... (any others you might need)
```

---

## 📦 **Dependencies You Need**

```bash
npm install motion lucide-react
npm install -D tailwindcss@next postcss autoprefixer typescript
```

---

## 🔄 **Import Paths to Update**

When copying, make sure these imports work:

**In your new project:**
```tsx
import { LoginScreen } from "./components/LoginScreen";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
// etc...
```

---

## ✨ **That's It!**

Copy these files + install dependencies = **Working animated login screen** 🚀

The code is **100% portable** and ready to use in any React project!