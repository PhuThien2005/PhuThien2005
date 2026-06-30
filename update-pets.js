import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const assetsDir = path.resolve('assets');

function main() {
  console.log("Generating three separate borderless pixel pet SVGs with raw SVG cat nesting...");

  // Read all GIF assets as Base64
  const dogWalkBase64 = fs.readFileSync(path.join(assetsDir, 'dog_walk.gif'), 'base64');
  const dogIdleBase64 = fs.readFileSync(path.join(assetsDir, 'dog_idle.gif'), 'base64');
  const dogRunBase64 = fs.readFileSync(path.join(assetsDir, 'dog_run.gif'), 'base64');
  const dogLieBase64 = fs.readFileSync(path.join(assetsDir, 'dog_lie.gif'), 'base64');
  const dogSwipeBase64 = fs.readFileSync(path.join(assetsDir, 'dog_swipe.gif'), 'base64');
  const dogBallBase64 = fs.readFileSync(path.join(assetsDir, 'dog_ball.gif'), 'base64');

  const crabWalkBase64 = fs.readFileSync(path.join(assetsDir, 'crab_walk.gif'), 'base64');
  const crabIdleBase64 = fs.readFileSync(path.join(assetsDir, 'crab_idle.gif'), 'base64');
  const crabRunBase64 = fs.readFileSync(path.join(assetsDir, 'crab_run.gif'), 'base64');
  const crabSwipeBase64 = fs.readFileSync(path.join(assetsDir, 'crab_swipe.gif'), 'base64');
  const crabBallBase64 = fs.readFileSync(path.join(assetsDir, 'crab_ball.gif'), 'base64');

  // Read and extract raw inner SVG content from cat.svg (to prevent nested scaling glitches)
  const catSvgRaw = fs.readFileSync(path.join(assetsDir, 'cat.svg'), 'utf8');
  const catStartIndexRaw = catSvgRaw.indexOf('>');
  const catEndIndexRaw = catSvgRaw.lastIndexOf('</svg>');
  if (catStartIndexRaw === -1 || catEndIndexRaw === -1) {
    console.error("Invalid cat.svg format");
    process.exit(1);
  }
  const catInnerContent = catSvgRaw.substring(catStartIndexRaw + 1, catEndIndexRaw).trim();

  // 1. Cat (Luna) - 20s loop (Walks right 0-6s, Jumps up & lands 6-9s, Sits 9-13s, Walks left 13-20s)
  // Scaled down to 64x64 by scale(0.3333) and centered around (0, 0) by translate(-96, -96)
  const catSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <g>
    <!-- Cat 2D coordinates loop (ground y=38, jump apex y=10) -->
    <animateTransform attributeName="transform" type="translate" 
      values="32 38; 88 38; 60 10; 60 38; 60 38; 32 38" 
      keyTimes="0; 0.30; 0.40; 0.45; 0.65; 1.0" 
      dur="20s" repeatCount="indefinite" />
    <g>
      <!-- Horizontal scale flip according to movement direction -->
      <animateTransform attributeName="transform" type="scale" 
        values="1 1; 1 1; -1 1; -1 1; 1 1" 
        keyTimes="0; 0.299; 0.30; 0.649; 1.0" 
        dur="20s" repeatCount="indefinite" />
      <g transform="scale(0.3333) translate(-96 -96)">
        ${catInnerContent}
      </g>
    </g>
  </g>
</svg>
`.trim();

  // 2. Dog (Buster) SVG - Cycles 6 actions every 5s (Total 30s loop)
  const dogSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <!-- Phase 1: Walk (0s - 5s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.1667;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="32 38; 88 38; 32 38" 
        dur="5s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="5s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${dogWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (5s - 10s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.1667;0.3333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run Fast (10s - 15s) -->
  <g>
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.3333;0.5000;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="32 38; 88 38; 32 38" 
        dur="2.5s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="2.5s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${dogRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Lie Down/Sleep (15s - 20s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.5000;0.6667;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogLieBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 5: Swipe Paw (20s - 25s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.6667;0.8333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogSwipeBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 6: Play with Ball (25s - 30s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8333;0.8334;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // 3. Crab (Ferris) SVG - Cycles 5 actions every 5s (Total 25s loop)
  const crabSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <!-- Phase 1: Walk (0s - 5s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.20;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="32 38; 88 38; 32 38" 
        dur="5s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="5s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (5s - 10s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.20;0.40;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run (10s - 15s) -->
  <g>
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.40;0.60;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="88 38; 32 38; 88 38" 
        dur="2.5s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="-1 1; -1 1; 1 1; 1 1; -1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="2.5s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Swipe Claws (15s - 20s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.60;0.80;0.8001;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabSwipeBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 5: Soccer Ball (20s - 25s) -->
  <g transform="translate(60 38)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.80;0.8001;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // Save SVG files
  fs.writeFileSync(path.join(assetsDir, 'pet_cat.svg'), catSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_dog.svg'), dogSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_crab.svg'), crabSvgContent, 'utf8');
  console.log("Individual pet SVGs updated!");

  // Update README.md
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // 1. Cat Placeholder (inline next to header)
    const catStart = "<!-- START_SECTION:github-readme-pets-cat -->";
    const catEnd = "<!-- END_SECTION:github-readme-pets-cat -->";
    const catStartIndex = readmeContent.indexOf(catStart);
    const catEndIndex = readmeContent.indexOf(catEnd);
    if (catStartIndex !== -1 && catEndIndex !== -1) {
      const before = readmeContent.substring(0, catStartIndex + catStart.length);
      const after = readmeContent.substring(catEndIndex);
      readmeContent = before + `<img src="assets/pet_cat.svg" width="60" align="center" alt="Luna the Cat" />` + after;
    }

    // 2. Dog Placeholder (inline next to header/badges)
    const dogStart = "<!-- START_SECTION:github-readme-pets-dog -->";
    const dogEnd = "<!-- END_SECTION:github-readme-pets-dog -->";
    const dogStartIndex = readmeContent.indexOf(dogStart);
    const dogEndIndex = readmeContent.indexOf(dogEnd);
    if (dogStartIndex !== -1 && dogEndIndex !== -1) {
      const before = readmeContent.substring(0, dogStartIndex + dogStart.length);
      const after = readmeContent.substring(dogEndIndex);
      readmeContent = before + `<img src="assets/pet_dog.svg" width="60" align="center" alt="Buster the Dog" />` + after;
    }

    // 3. Crab Placeholder (inline next to header)
    const crabStart = "<!-- START_SECTION:github-readme-pets-crab -->";
    const crabEnd = "<!-- END_SECTION:github-readme-pets-crab -->";
    const crabStartIndex = readmeContent.indexOf(crabStart);
    const crabEndIndex = readmeContent.indexOf(crabEnd);
    if (crabStartIndex !== -1 && crabEndIndex !== -1) {
      const before = readmeContent.substring(0, crabStartIndex + crabStart.length);
      const after = readmeContent.substring(crabEndIndex);
      readmeContent = before + `<img src="assets/pet_crab.svg" width="60" align="center" alt="Ferris the Crab" />` + after;
    }

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log("README.md updated with segmented pet positions!");
  } else {
    console.error("README.md not found!");
    process.exit(1);
  }
}

main();
