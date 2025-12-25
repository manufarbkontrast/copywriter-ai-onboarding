// Quick test to verify components
const fs = require('fs');

const files = [
  'App.tsx',
  'components/ErrorBoundary.tsx',
  'components/OnboardingForm.tsx',
  'components/ContactForm.tsx',
  'components/AnalysisView.tsx',
  'components/StepIndicator.tsx',
  'index.html',
  'vite.config.ts'
];

console.log('📋 Testing file structure...\n');

let allOk = true;
files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allOk = false;
  }
});

console.log('\n📦 Checking build output...\n');
if (fs.existsSync('dist')) {
  const distFiles = fs.readdirSync('dist');
  console.log(`✅ dist/ directory exists with ${distFiles.length} files`);
  distFiles.forEach(file => {
    const stats = fs.statSync(`dist/${file}`);
    if (stats.isFile()) {
      const size = (stats.size / 1024).toFixed(2);
      console.log(`   - ${file} (${size} KB)`);
    }
  });
} else {
  console.log('❌ dist/ directory not found');
  allOk = false;
}

console.log('\n🎨 Checking design elements...\n');
const appContent = fs.readFileSync('App.tsx', 'utf8');
const hasBlackWhite = appContent.includes('bg-black') || appContent.includes('text-black');
const hasErrorBoundary = appContent.includes('ErrorBoundary');
const hasUseCallback = appContent.includes('useCallback');

console.log(hasBlackWhite ? '✅ Schwarz-Weiß Design' : '❌ Schwarz-Weiß Design fehlt');
console.log(hasErrorBoundary ? '✅ Error Boundary' : '❌ Error Boundary fehlt');
console.log(hasUseCallback ? '✅ useCallback Optimierung' : '❌ useCallback fehlt');

console.log('\n' + (allOk ? '✅ All checks passed!' : '❌ Some checks failed'));
