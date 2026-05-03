const { execSync } = require('child_process');
try {
  const output = execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' });
  require('fs').writeFileSync('build-error.txt', output);
} catch (error) {
  require('fs').writeFileSync('build-error.txt', error.stdout + '\n' + error.stderr);
}
