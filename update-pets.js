import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const assetsDir = path.resolve('assets');

function main() {
  console.log("Generating three separate borderless pixel pet SVGs...");

  // Read all assets as Base64 to embed them directly in the SVGs
  const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat.svg'), 'base64');
  
  const dogWalkBase64 = fs.readFileSync(path.join(assetsDir, 'dog_walk.gif'), 'base64');
  const dogIdleBase64 = fs.readFileSync(path.join(assetsDir, 'dog_idle.gif'), 'base64');
  const dogLieBase64 = fs.readFileSync(path.join(assetsDir, 'dog_lie.gif'), 'base64');
  const dogBallBase64 = fs.readFileSync(path.join(assetsDir, 'dog_ball.gif'), 'base64');

  const crabWalkBase64 = fs.readFileSync(path.join(assetsDir, 'crab_walk.gif'), 'base64');
  const crabIdleBase64 = fs.readFileSync(path.join(assetsDir, 'crab_idle.gif'), 'base64');
  const crabRunBase64 = fs.readFileSync(path.join(assetsDir, 'crab_run.gif'), 'base64');
  const crabBallBase64 = fs.readFileSync(path.join(assetsDir, 'crab_ball.gif'), 'base64');

  // 1. Cat (Luna) SVG - Walks back and forth, jumping cycle
  const catSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <g>
    <!-- Walks back and forth across the 120px width -->
    <animateTransform attributeName="transform" type="translate" 
      values="32 38; 88 38; 32 38" 
      dur="12s" repeatCount="indefinite" />
    <g>
      <!-- Flip scale horizontal according to movement direction -->
      <animateTransform attributeName="transform" type="scale" 
        values="1 1; 1 1; -1 1; -1 1; 1 1" 
        keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
        dur="12s" repeatCount="indefinite" />
      <image href="data:image/svg+xml;base64,${catBase64}" x="-32" y="-32" width="64" height="64" />
    </g>
  </g>
</svg>
`.trim();

  // 2. Dog (Buster) SVG - Cycles actions every 15s
  const dogSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <!-- Phase 1: Walk (0s - 15s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.25;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="32 38; 88 38; 32 38" 
        dur="10s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="10s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${dogWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (15s - 30s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.25;0.50;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Lie Down/Sleep (30s - 45s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.50;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogLieBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 4: Play with Ball (45s - 60s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // 3. Crab (Ferris) SVG - Cycles actions every 15s
  const crabSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <!-- Phase 1: Walk (0s - 15s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.25;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="32 38; 88 38; 32 38" 
        dur="10s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="10s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (15s - 30s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.25;0.50;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run (30s - 45s) -->
  <g>
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.50;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="88 38; 32 38; 88 38" 
        dur="4s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="-1 1; -1 1; 1 1; 1 1; -1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="4s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Soccer Ball (45s - 60s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // Save SVG files
  fs.writeFileSync(path.join(assetsDir, 'pet_cat.svg'), catSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_dog.svg'), dogSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_crab.svg'), crabSvgContent, 'utf8');
  console.log("Individual pet SVGs generated successfully!");

  // Update README.md
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // 1. Cat Placeholder
    const catStart = "<!-- START_SECTION:github-readme-pets-cat -->";
    const catEnd = "<!-- END_SECTION:github-readme-pets-cat -->";
    const catStartIndex = readmeContent.indexOf(catStart);
    const catEndIndex = readmeContent.indexOf(catEnd);
    if (catStartIndex !== -1 && catEndIndex !== -1) {
      const before = readmeContent.substring(0, catStartIndex + catStart.length);
      const after = readmeContent.substring(catEndIndex);
      readmeContent = before + `\n<img align="right" src="assets/pet_cat.svg" width="100" alt="Luna the Cat" />\n` + after;
    }

    // 2. Dog Placeholder
    const dogStart = "<!-- START_SECTION:github-readme-pets-dog -->";
    const dogEnd = "<!-- END_SECTION:github-readme-pets-dog -->";
    const dogStartIndex = readmeContent.indexOf(dogStart);
    const dogEndIndex = readmeContent.indexOf(dogEnd);
    if (dogStartIndex !== -1 && dogEndIndex !== -1) {
      const before = readmeContent.substring(0, dogStartIndex + dogStart.length);
      const after = readmeContent.substring(dogEndIndex);
      readmeContent = before + `\n<img align="right" src="assets/pet_dog.svg" width="100" alt="Buster the Dog" />\n` + after;
    }

    // 3. Crab Placeholder
    const crabStart = "<!-- START_SECTION:github-readme-pets-crab -->";
    const crabEnd = "<!-- END_SECTION:github-readme-pets-crab -->";
    const crabStartIndex = readmeContent.indexOf(crabStart);
    const crabEndIndex = readmeContent.indexOf(crabEnd);
    if (crabStartIndex !== -1 && crabEndIndex !== -1) {
      const before = readmeContent.substring(0, crabStartIndex + crabStart.length);
      const after = readmeContent.substring(crabEndIndex);
      readmeContent = before + `\n<img align="right" src="assets/pet_crab.svg" width="100" alt="Ferris the Crab" />\n` + after;
    }

    // Remove the old combined playroom section if it exists
    const oldStart = "<!-- START_SECTION:github-readme-pets -->";
    const oldEnd = "<!-- END_SECTION:github-readme-pets -->";
    const oldStartIndex = readmeContent.indexOf(oldStart);
    const oldEndIndex = readmeContent.indexOf(oldEnd);
    if (oldStartIndex !== -1 && oldEndIndex !== -1) {
      const before = readmeContent.substring(0, oldStartIndex);
      const after = readmeContent.substring(oldEndIndex + oldEnd.length);
      readmeContent = before + after;
    }

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log("README.md updated with segmented pet positions!");
  } else {
    console.error("README.md not found!");
    process.exit(1);
  }
}

main();
