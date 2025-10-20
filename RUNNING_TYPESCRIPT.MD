# 🚀 Running TypeScript Files

This comprehensive guide explains how to **run TypeScript files** in different ways, covering setup, compilation, and execution methods.

---

## 🧩 Prerequisites

Before running TypeScript files, ensure you have:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor (VS Code, WebStorm, etc.)

### Verify Installation

Check your installations:

```bash
node --version
npm --version
```

---

## ⚙️ Quick Setup

### Install TypeScript Dependencies

```bash
# Install TypeScript and ts-node globally
npm install -g typescript ts-node

# Or install locally in your project
npm install typescript ts-node @types/node --save-dev
```

### Create TypeScript Configuration (Optional)

```bash
# Generate tsconfig.json
npx tsc --init
```

---

## ▶️ Methods to Run TypeScript

### Method 1: Direct Execution with ts-node (Recommended)

**Run TypeScript files directly without compilation:**

```bash
# Run a single file
npx ts-node filename.ts

# Run with watch mode (auto-restart on changes)
npx ts-node --watch filename.ts

# Run with debugging
npx ts-node --inspect filename.ts
```

**Example:**
```bash
npx ts-node typescript.dsa.ts
```

### Method 2: Compile Then Run

**Step 1: Compile TypeScript to JavaScript**
```bash
# Compile single file
npx tsc filename.ts

# Compile with specific options
npx tsc filename.ts --target ES2020 --module CommonJS

# Compile with tsconfig.json
npx tsc
```

**Step 2: Run the compiled JavaScript**
```bash
node filename.js
```

**Example:**
```bash
npx tsc typescript.dsa.ts
node typescript.dsa.js
```

### Method 3: Using npm Scripts

**Add to package.json:**
```json
{
  "scripts": {
    "start": "ts-node filename.ts",
    "dev": "ts-node --watch filename.ts",
    "build": "tsc",
    "build:run": "tsc && node dist/filename.js"
  }
}
```

**Run with npm:**
```bash
npm start          # Run once
npm run dev        # Run with auto-reload
npm run build      # Compile only
npm run build:run  # Compile and run
```

### Method 4: Using Node.js with TypeScript Loader

**Run with tsx (modern alternative to ts-node):**
```bash
# Install tsx
npm install -g tsx

# Run TypeScript files
tsx filename.ts
```

---

## 🔧 Advanced Running Options

### TypeScript Compiler Options

```bash
# Compile with specific target
npx tsc --target ES2020 filename.ts

# Compile with source maps
npx tsc --sourceMap filename.ts

# Compile with declaration files
npx tsc --declaration filename.ts

# Compile with strict mode
npx tsc --strict filename.ts
```

### Environment Variables

```bash
# Set Node environment
NODE_ENV=development npx ts-node filename.ts

# Set TypeScript options
TS_NODE_PROJECT=./tsconfig.json npx ts-node filename.ts
```

### Running with Arguments

```bash
# Pass arguments to your TypeScript file
npx ts-node filename.ts arg1 arg2 arg3

# Example
npx ts-node typescript.dsa.ts --verbose --debug
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "ts-node not found" error**
```bash
# Install globally
npm install -g ts-node

# Or use npx
npx ts-node filename.ts
```

**2. TypeScript compilation errors**
```bash
# Check TypeScript version
npx tsc --version

# Install missing dependencies
npm install @types/node
```

**3. Module resolution issues**
```bash
# Check tsconfig.json
npx tsc --showConfig

# Use specific module resolution
npx tsc --moduleResolution node filename.ts
```

**4. Performance issues with large files**
```bash
# Use transpile-only mode
npx ts-node --transpile-only filename.ts

# Or use tsx for better performance
npx tsx filename.ts
```

### Debug Mode

```bash
# Run with Node.js debugger
npx ts-node --inspect filename.ts

# Run with breakpoints
npx ts-node --inspect-brk filename.ts
```

---

## 📁 Project Structure Examples

**Simple TypeScript file:**
```
project/
├── main.ts
└── package.json
```

**With TypeScript configuration:**
```
project/
├── src/
│   └── main.ts
├── dist/
│   └── main.js
├── tsconfig.json
└── package.json
```

---

## 🎯 Best Practices

1. **Use ts-node for development** - Fast iteration
2. **Compile for production** - Better performance
3. **Use npm scripts** - Consistent commands
4. **Configure tsconfig.json** - Consistent settings
5. **Use watch mode** - Auto-restart on changes

---

## 📚 Quick Reference

| Command | Purpose |
|---------|---------|
| `npx ts-node file.ts` | Run TypeScript directly |
| `npx tsc file.ts` | Compile to JavaScript |
| `node file.js` | Run compiled JavaScript |
| `npx ts-node --watch file.ts` | Run with auto-reload |
| `npx tsc --init` | Create tsconfig.json |

---

*Happy TypeScript coding! 🚀*
