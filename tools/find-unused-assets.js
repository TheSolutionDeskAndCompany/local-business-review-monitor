#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const ROOT_DIR = path.join(__dirname, '..');
const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.git/**',
  '**/build/**',
  '**/dist/**',
  '**/coverage/**',
  '**/.next/**',
  '**/.vercel/**',
  '**/.github/**',
  '**/tools/**',
  '**/*.md',
  '**/*.mdx',
  '**/*.json',
  '**/*.lock',
  '**/*.log',
  '**/*.env*',
  '**/.DS_Store',
  '**/README*',
  '**/LICENSE*',
  '**/CHANGELOG*',
  '**/vercel.json',
  '**/next.config.js',
  '**/server.js',
  '**/public/**',
];

// File extensions to check for imports
const SOURCE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Track all files and their usage
const allFiles = new Map();
const usedFiles = new Set();

async function findFiles() {
  console.log('\n🔍 Scanning for files...');
  
  const files = await glob('**/*', { 
    cwd: ROOT_DIR, 
    ignore: IGNORE_PATTERNS,
    nodir: true,
    absolute: true,
  });
  
  files.forEach(file => {
    allFiles.set(path.relative(ROOT_DIR, file), false);
  });
  
  console.log(`Found ${files.length} files to analyze.`);
  return files;
}

async function analyzeImports() {
  console.log('\n🔬 Analyzing imports...');
  
  const sourceFiles = [];
  
  // Find all source files
  for (const ext of SOURCE_EXTENSIONS) {
    const files = await glob(`**/*${ext}`, { 
      cwd: ROOT_DIR, 
      ignore: IGNORE_PATTERNS,
      absolute: true,
    });
    sourceFiles.push(...files);
  }
  
  // Mark entry points as used
  const entryPoints = [
    'server.js',
    'client/src/index.js',
    'client/src/App.js',
    'client/src/pages/**/*.js',
    'client/src/components/**/*.js',
  ];
  
  for (const entry of entryPoints) {
    const files = await glob(entry, { cwd: ROOT_DIR, absolute: true });
    files.forEach(file => markFileAsUsed(file));
  }
  
  // Analyze imports in source files
  for (const file of sourceFiles) {
    await analyzeFile(file);
  }
  
  // Mark all source files as used
  sourceFiles.forEach(file => markFileAsUsed(file));
}

async function analyzeFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const relativePath = path.relative(ROOT_DIR, filePath);
    
    // Mark this file as used
    markFileAsUsed(relativePath);
    
    // Find all import/require statements
    const importRegex = /(?:import|from|require)\s*(?:\{[^}]*\}\s*from\s*)?['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1] || match[2];
      if (!importPath) continue;
      
      // Skip node modules and built-ins
      if (importPath.startsWith('.') || importPath.startsWith('/')) {
        const resolvedPath = resolveImportPath(filePath, importPath);
        if (resolvedPath) {
          markFileAsUsed(resolvedPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
  }
}

function resolveImportPath(fromFile, importPath) {
  const fromDir = path.dirname(fromFile);
  
  try {
    // Try to resolve the import
    const resolved = require.resolve(importPath, { paths: [fromDir] });
    return path.relative(ROOT_DIR, resolved);
  } catch (error) {
    // If resolution fails, try to find the file manually
    const possiblePaths = [
      path.resolve(fromDir, importPath),
      path.resolve(fromDir, `${importPath}.js`),
      path.resolve(fromDir, importPath, 'index.js'),
      path.resolve(ROOT_DIR, importPath),
      path.resolve(ROOT_DIR, `${importPath}.js`),
      path.resolve(ROOT_DIR, importPath, 'index.js'),
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        return path.relative(ROOT_DIR, p);
      }
    }
  }
  
  return null;
}

function markFileAsUsed(filePath) {
  if (typeof filePath !== 'string') return;
  
  // Normalize path separators
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Mark as used in our tracking
  if (allFiles.has(normalizedPath)) {
    allFiles.set(normalizedPath, true);
  }
  
  // Add to used files set
  usedFiles.add(normalizedPath);
}

async function findUnusedFiles() {
  console.log('\n🔎 Finding unused files...');
  
  const unusedFiles = [];
  
  for (const [file, isUsed] of allFiles.entries()) {
    if (!isUsed) {
      unusedFiles.push(file);
    }
  }
  
  return unusedFiles;
}

async function main() {
  try {
    await findFiles();
    await analyzeImports();
    
    const unusedFiles = await findUnusedFiles();
    
    console.log('\n📊 Results:');
    console.log(`Total files: ${allFiles.size}`);
    console.log(`Used files: ${usedFiles.size}`);
    console.log(`Unused files: ${unusedFiles.length}`);
    
    if (unusedFiles.length > 0) {
      console.log('\n🚨 Unused files found:');
      unusedFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
      
      // Write unused files to a report
      const reportPath = path.join(ROOT_DIR, 'unused-files-report.txt');
      await fs.promises.writeFile(
        reportPath, 
        `Unused files report (${new Date().toISOString()})\n` +
        '='.repeat(50) + '\n\n' +
        unusedFiles.join('\n')
      );
      
      console.log(`\n📝 Report saved to: ${reportPath}`);
      
      // Exit with error code if there are unused files
      process.exit(1);
    } else {
      console.log('\n✅ No unused files found!');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
main();
