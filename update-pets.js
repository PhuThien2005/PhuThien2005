import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const assetsDir = path.resolve('assets');

function main() {
  console.log("Generating three separate borderless pixel pet SVGs (Duck, Dog, Panda)...");

  // Read all GIF assets as Base64
  const duckWalkBase64 = fs.readFileSync(path.join(assetsDir, 'duck_walk.gif'), 'base64');
  const duckIdleBase64 = fs.readFileSync(path.join(assetsDir, 'duck_idle.gif'), 'base64');
  const duckRunBase64 = fs.readFileSync(path.join(assetsDir, 'duck_run.gif'), 'base64');
  const duckSwipeBase64 = fs.readFileSync(path.join(assetsDir, 'duck_swipe.gif'), 'base64');
  const duckBallBase64 = fs.readFileSync(path.join(assetsDir, 'duck_ball.gif'), 'base64');

  const dogWalkBase64 = fs.readFileSync(path.join(assetsDir, 'dog_walk.gif'), 'base64');
  const dogIdleBase64 = fs.readFileSync(path.join(assetsDir, 'dog_idle.gif'), 'base64');
  const dogRunBase64 = fs.readFileSync(path.join(assetsDir, 'dog_run.gif'), 'base64');
  const dogLieBase64 = fs.readFileSync(path.join(assetsDir, 'dog_lie.gif'), 'base64');
  const dogSwipeBase64 = fs.readFileSync(path.join(assetsDir, 'dog_swipe.gif'), 'base64');
  const dogBallBase64 = fs.readFileSync(path.join(assetsDir, 'dog_ball.gif'), 'base64');

  const pandaWalkBase64 = fs.readFileSync(path.join(assetsDir, 'panda_walk.gif'), 'base64');
  const pandaIdleBase64 = fs.readFileSync(path.join(assetsDir, 'panda_idle.gif'), 'base64');
  const pandaRunBase64 = fs.readFileSync(path.join(assetsDir, 'panda_run.gif'), 'base64');
  const pandaLieBase64 = fs.readFileSync(path.join(assetsDir, 'panda_lie.gif'), 'base64');
  const pandaSwipeBase64 = fs.readFileSync(path.join(assetsDir, 'panda_swipe.gif'), 'base64');
  const pandaBallBase64 = fs.readFileSync(path.join(assetsDir, 'panda_ball.gif'), 'base64');

  // 1. Duck SVG - Cycles 5 actions every 5s (Total 25s loop)
  // Added default opacity="0" to prevent stacking
  const duckSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80" style="background: transparent;">
  <!-- Phase 1: Walk/Float (0s - 5s) -->
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
        <image href="data:image/gif;base64,${duckWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (5s - 10s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.20;0.40;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${duckIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run (10s - 15s) -->
  <g opacity="0">
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
        <image href="data:image/gif;base64,${duckRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Swipe (15s - 20s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.60;0.80;0.8001;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${duckSwipeBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 5: Ball (20s - 25s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.80;0.8001;1" calcMode="discrete" dur="25s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${duckBallBase64}" x="-32" y="-32" width="64" height="64" />
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
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.1667;0.3333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run Fast (10s - 15s) -->
  <g opacity="0">
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
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.5000;0.6667;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogLieBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 5: Swipe Paw (20s - 25s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.6667;0.8333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogSwipeBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 6: Play with Ball (25s - 30s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8333;0.8334;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // 3. Panda SVG - Cycles 6 actions every 5s (Total 30s loop)
  const pandaSvgContent = `
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
        <image href="data:image/gif;base64,${pandaWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (5s - 10s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.1667;0.3333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${pandaIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run (10s - 15s) -->
  <g opacity="0">
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
        <image href="data:image/gif;base64,${pandaRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Lie Down/Sleep (15s - 20s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.5000;0.6667;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${pandaLieBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 5: Swipe (20s - 25s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.6667;0.8333;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${pandaSwipeBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 6: Play with Ball (25s - 30s) -->
  <g transform="translate(60 38)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8333;0.8334;1" calcMode="discrete" dur="30s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${pandaBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
</svg>
`.trim();

  // Save SVG files
  fs.writeFileSync(path.join(assetsDir, 'pet_duck.svg'), duckSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_dog.svg'), dogSvgContent, 'utf8');
  fs.writeFileSync(path.join(assetsDir, 'pet_panda.svg'), pandaSvgContent, 'utf8');
  console.log("Individual pet SVGs generated successfully!");

  // Update README.md
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // 1. Duck Placeholder (inline next to header)
    const duckStart = "<!-- START_SECTION:github-readme-pets-duck -->";
    const duckEnd = "<!-- END_SECTION:github-readme-pets-duck -->";
    const duckStartIndex = readmeContent.indexOf(duckStart);
    const duckEndIndex = readmeContent.indexOf(duckEnd);
    if (duckStartIndex !== -1 && duckEndIndex !== -1) {
      const before = readmeContent.substring(0, duckStartIndex + duckStart.length);
      const after = readmeContent.substring(duckEndIndex);
      readmeContent = before + `<img src="assets/pet_duck.svg" width="60" align="center" alt="Rubber Duck" />` + after;
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

    // 3. Panda Placeholder (inline next to header)
    const pandaStart = "<!-- START_SECTION:github-readme-pets-panda -->";
    const pandaEnd = "<!-- END_SECTION:github-readme-pets-panda -->";
    const pandaStartIndex = readmeContent.indexOf(pandaStart);
    const pandaEndIndex = readmeContent.indexOf(pandaEnd);
    if (pandaStartIndex !== -1 && pandaEndIndex !== -1) {
      const before = readmeContent.substring(0, pandaStartIndex + pandaStart.length);
      const after = readmeContent.substring(pandaEndIndex);
      readmeContent = before + `<img src="assets/pet_panda.svg" width="60" align="center" alt="Panda" />` + after;
    }

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log("README.md updated with segmented pet positions!");
  } else {
    console.error("README.md not found!");
    process.exit(1);
  }
}

main();
