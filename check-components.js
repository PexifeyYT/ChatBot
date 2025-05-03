const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

function getFiles(dir, recursive = true) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents
    .filter(dirent => dirent.isFile() && (dirent.name.endsWith('.tsx') || dirent.name.endsWith('.ts')))
    .map(dirent => path.join(dir, dirent.name));
  
  if (recursive) {
    const folders = dirents.filter(dirent => dirent.isDirectory());
    return [...files, ...folders.flatMap(folder => getFiles(path.join(dir, folder.name)))];
  }
  
  return files;
}

function checkForCommonIssues(files) {
  const issues = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const relPath = path.relative(__dirname, file);
    
    // Check for mismatched braces
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push(`${relPath}: Mismatched braces (${openBraces} open, ${closeBraces} close)`);
    }
    
    // Check for potential import issues
    if (content.includes("import {") && content.includes("} from")) {
      const importMatches = content.match(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]/g) || [];
      for (const importStmt of importMatches) {
        if (importStmt.includes(" as ")) continue; // Skip renamed imports
        
        const importedItems = importStmt
          .replace(/import\s+\{|\}\s+from\s+['"][^'"]+['"]/g, '')
          .split(',')
          .map(item => item.trim())
          .filter(item => item);
          
        for (const item of importedItems) {
          const regex = new RegExp(`\\b${item}\\b`, 'g');
          const allMatches = content.match(regex) || [];
          if (allMatches.length === 1) { // Only appears in import
            issues.push(`${relPath}: Potentially unused import "${item}"`);
          }
        }
      }
    }
    
    // Check for missing exports
    if (content.includes("export ") && !content.includes("export default") && !content.includes("export {") && !content.includes("export function") && !content.includes("export const") && !content.includes("export class") && !content.includes("export interface") && !content.includes("export type")) {
      issues.push(`${relPath}: Missing default export or named export`);
    }
    
    // Check for missing client directive
    if ((content.includes("useState") || content.includes("useEffect") || content.includes("useContext") || content.includes("useRef")) && !content.includes("'use client'")) {
      issues.push(`${relPath}: Uses React hooks but missing 'use client' directive`);
    }
  }
  
  return issues;
}

const files = getFiles(componentsDir);
const issues = checkForCommonIssues(files);

if (issues.length > 0) {
  console.log("Potential issues found:");
  issues.forEach(issue => console.log(`- ${issue}`));
} else {
  console.log("No common issues found in component files.");
} 