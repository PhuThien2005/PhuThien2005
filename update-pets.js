import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const assetsDir = path.resolve('assets');
const playroomSvgPath = path.join(assetsDir, 'playroom.svg');

function getFormattedDateTime() {
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date().toLocaleString('vi-VN', options);
}

function main() {
  console.log("Generating dynamic 15s switching SVG Playroom...");

  // Read all assets as Base64 to embed them directly in the SVG
  const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat.svg'), 'base64');
  
  const dogWalkBase64 = fs.readFileSync(path.join(assetsDir, 'dog_walk.gif'), 'base64');
  const dogIdleBase64 = fs.readFileSync(path.join(assetsDir, 'dog_idle.gif'), 'base64');
  const dogLieBase64 = fs.readFileSync(path.join(assetsDir, 'dog_lie.gif'), 'base64');
  const dogBallBase64 = fs.readFileSync(path.join(assetsDir, 'dog_ball.gif'), 'base64');

  const crabWalkBase64 = fs.readFileSync(path.join(assetsDir, 'crab_walk.gif'), 'base64');
  const crabIdleBase64 = fs.readFileSync(path.join(assetsDir, 'crab_idle.gif'), 'base64');
  const crabRunBase64 = fs.readFileSync(path.join(assetsDir, 'crab_run.gif'), 'base64');
  const crabBallBase64 = fs.readFileSync(path.join(assetsDir, 'crab_ball.gif'), 'base64');

  const lastUpdated = getFormattedDateTime();

  // 1. Cat (Luna) - 60s continuous 2D animation cycle (walks, jumps on shelf, sits, jumps down, walks back)
  const catSvg = `
  <g>
    <!-- Translate cat in 2D space: walks on ground, jumps to shelf (x: 250, y: 80), sits, jumps down, walks back -->
    <animateTransform attributeName="transform" type="translate" 
      values="82 138; 232 138; 282 80; 282 80; 312 138; 82 138" 
      keyTimes="0; 0.25; 0.28; 0.58; 0.61; 1.0" 
      dur="60s" repeatCount="indefinite" />
    <g>
      <!-- Flip scale horizontal according to movement direction -->
      <animateTransform attributeName="transform" type="scale" 
        values="1 1; 1 1; -1 1; -1 1; 1 1; 1 1; -1 1; -1 1; 1 1" 
        keyTimes="0; 0.249; 0.25; 0.579; 0.58; 0.609; 0.61; 0.999; 1.0" 
        dur="60s" repeatCount="indefinite" />
      <image href="data:image/svg+xml;base64,${catBase64}" x="-32" y="-32" width="64" height="64" />
    </g>
  </g>
  `;

  // 2. Dog (Buster) - 60s state switching (15s walk -> 15s idle -> 15s lie -> 15s ball)
  const dogSvg = `
  <!-- Phase 1: Walk (0s - 15s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.25;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="132 138; 432 138; 132 138" 
        dur="15s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="15s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${dogWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (15s - 30s) -->
  <g transform="translate(432 138)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.25;0.50;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Lie Down/Sleep (30s - 45s) -->
  <g transform="translate(332 138)">
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.50;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogLieBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 4: Play with Ball (45s - 60s) -->
  <g transform="translate(532 138)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${dogBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
  `;

  // 3. Crab (Ferris) - 60s state switching (15s walk -> 15s idle -> 15s run -> 15s ball)
  const crabSvg = `
  <!-- Phase 1: Walk (0s - 15s) -->
  <g>
    <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.25;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="432 138; 732 138; 432 138" 
        dur="15s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="15s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabWalkBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 2: Idle (15s - 30s) -->
  <g transform="translate(732 138)">
    <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.25;0.50;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabIdleBase64}" x="-32" y="-32" width="64" height="64" />
  </g>

  <!-- Phase 3: Run (30s - 45s) -->
  <g>
    <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.50;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="732 138; 232 138; 732 138" 
        dur="5s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="-1 1; -1 1; 1 1; 1 1; -1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="5s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabRunBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
  </g>

  <!-- Phase 4: Soccer Ball (45s - 60s) -->
  <g transform="translate(232 138)">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.75;0.7501;1" calcMode="discrete" dur="60s" repeatCount="indefinite" />
    <image href="data:image/gif;base64,${crabBallBase64}" x="-32" y="-32" width="64" height="64" />
  </g>
  `;

  // Build the complete animated SVG playroom banner
  const playroomSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="100%" height="200" style="background: transparent; font-family: monospace;">
  <!-- Room background decorations -->
  <!-- Cozy Rug -->
  <ellipse cx="400" cy="170" rx="120" ry="14" fill="#808080" opacity="0.15" />
  
  <!-- Window -->
  <rect x="480" y="30" width="80" height="60" fill="#add8e6" opacity="0.15" rx="4" />
  <rect x="480" y="30" width="80" height="60" fill="none" stroke="#cccccc" stroke-width="2" opacity="0.4" rx="4" />
  <line x1="520" y1="30" x2="520" y2="90" stroke="#cccccc" stroke-width="2" opacity="0.4" />
  <line x1="480" y1="60" x2="560" y2="60" stroke="#cccccc" stroke-width="2" opacity="0.4" />

  <!-- Ledge/Shelf for the Cat -->
  <rect x="250" y="112" width="64" height="6" fill="#8B4513" opacity="0.5" rx="2" />
  <line x1="260" y1="118" x2="260" y2="135" stroke="#8B4513" stroke-width="2" opacity="0.5" />
  <line x1="304" y1="118" x2="304" y2="135" stroke="#8B4513" stroke-width="2" opacity="0.5" />

  <!-- Room floor line -->
  <line x1="0" y1="170" x2="800" y2="170" stroke="#cccccc" stroke-width="2" stroke-dasharray="8 6" opacity="0.6" />
  
  <!-- Pets -->
  ${catSvg.trim()}
  ${dogSvg.trim()}
  ${crabSvg.trim()}
</svg>
`.trim();

  // Save SVG file
  fs.writeFileSync(playroomSvgPath, playroomSvg, 'utf8');
  console.log("playroom.svg generated successfully!");

  // Construct updated widget content for README.md
  const petWidgetMarkdown = `
<div align="center">
  <h3>🏡 Welcome to the Pixel Playroom!</h3>
  <p>Here are my tiny pixel friends walking around! They automatically change their activities and movements every 15 seconds.</p>
  <br />
  <img src="assets/playroom.svg" width="800" alt="Pixel Playroom" />
  <br />
  
  <table>
    <tr>
      <td>🐱 <b>Luna (Cat)</b> loves to explore the playroom, jump onto her shelf, and take quick naps.</td>
    </tr>
    <tr>
      <td>🐶 <b>Buster (Dog)</b> alternates between walking around, sitting for treats, sleeping, and playing fetch.</td>
    </tr>
    <tr>
      <td>🦀 <b>Ferris (Crab)</b> scuttles around sideways, waves his claws, and plays soccer with his ball.</td>
    </tr>
  </table>
  <br />
  <p><sub>Last updated: ${lastUpdated} (GMT+7)</sub></p>
</div>
`;

  // Update README.md
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    const startTag = "<!-- START_SECTION:github-readme-pets -->";
    const endTag = "<!-- END_SECTION:github-readme-pets -->";

    const startIndex = readmeContent.indexOf(startTag);
    const endIndex = readmeContent.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1) {
      console.error("Could not find matching placeholders in README.md");
      process.exit(1);
    } else {
      const before = readmeContent.substring(0, startIndex + startTag.length);
      const after = readmeContent.substring(endIndex);
      const updatedReadme = before + "\n" + petWidgetMarkdown.trim() + "\n" + after;
      fs.writeFileSync(readmePath, updatedReadme, 'utf8');
      console.log("README.md updated with new pet states!");
    }
  } else {
    console.error("README.md not found!");
    process.exit(1);
  }
}

main();
