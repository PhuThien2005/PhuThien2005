import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const assetsDir = path.resolve('assets');
const playroomSvgPath = path.join(assetsDir, 'playroom.svg');

const CAT_ACTIVITIES = [
  "chasing a mysterious red laser dot 🔴",
  "taking a cozy nap in the warm sun ☀️",
  "playing with a colorful ball of yarn 🧶",
  "stretching its tiny pixel paws 🐾",
  "watching birds outside the window 🐦",
  "grooming its beautiful pixel fur ✨"
];

const DOG_STATES = [
  {
    state: "walk",
    gif: "dog_walk.gif",
    activity: "happily walking around the playroom 🐾"
  },
  {
    state: "idle",
    gif: "dog_idle.gif",
    activity: "sitting politely and waiting for a bone 🦴"
  },
  {
    state: "lie",
    gif: "dog_lie.gif",
    activity: "fast asleep, dreaming about chasing squirrels 💤"
  },
  {
    state: "ball",
    gif: "dog_ball.gif",
    activity: "happily playing fetch with a ball 🥎"
  }
];

const CRAB_STATES = [
  {
    state: "walk",
    gif: "crab_walk.gif",
    activity: "crawling sideways across the floor 🦀"
  },
  {
    state: "idle",
    gif: "crab_idle.gif",
    activity: "waving its little pincers friendly ✌️"
  },
  {
    state: "run",
    gif: "crab_run.gif",
    activity: "scuttling fast like a speedster ⚡"
  },
  {
    state: "ball",
    gif: "crab_ball.gif",
    activity: "clinging onto a tiny ball ⚽"
  }
];

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
  console.log("Generating SVG Playroom and updating README...");

  // Randomize states and activities
  const catActivity = CAT_ACTIVITIES[Math.floor(Math.random() * CAT_ACTIVITIES.length)];
  const dogState = DOG_STATES[Math.floor(Math.random() * DOG_STATES.length)];
  const crabState = CRAB_STATES[Math.floor(Math.random() * CRAB_STATES.length)];
  const lastUpdated = getFormattedDateTime();

  // Read assets as Base64 to embed them directly in the SVG
  const catBase64 = fs.readFileSync(path.join(assetsDir, 'cat.svg'), 'base64');
  const dogBase64 = fs.readFileSync(path.join(assetsDir, dogState.gif), 'base64');
  const crabBase64 = fs.readFileSync(path.join(assetsDir, crabState.gif), 'base64');

  // Randomize movements
  // Cat: walking range [50, 350]
  const catDuration = Math.floor(Math.random() * 8) + 12; // 12s - 20s
  const catXStart = Math.floor(Math.random() * 80) + 50;  // 50 - 130
  const catXEnd = Math.floor(Math.random() * 100) + 250;  // 250 - 350

  // Dog: walking range [200, 600]
  const dogDuration = Math.floor(Math.random() * 8) + 12;
  const dogXStart = Math.floor(Math.random() * 100) + 200; // 200 - 300
  const dogXEnd = Math.floor(Math.random() * 150) + 450;   // 450 - 600

  // Crab: walking range [400, 750]
  const crabDuration = Math.floor(Math.random() * 6) + 8;  // 8s - 14s
  const crabXStart = Math.floor(Math.random() * 100) + 400; // 400 - 500
  const crabXEnd = Math.floor(Math.random() * 150) + 600;   // 600 - 750

  // Construct SVG Elements with SMIL Animations
  // Cat (Luna) - always walks
  const catSvgElement = `
  <g>
    <animateTransform attributeName="transform" type="translate" 
      values="${catXStart + 32} 138; ${catXEnd + 32} 138; ${catXStart + 32} 138" 
      dur="${catDuration}s" repeatCount="indefinite" />
    <g>
      <animateTransform attributeName="transform" type="scale" 
        values="1 1; 1 1; -1 1; -1 1; 1 1" 
        keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
        dur="${catDuration}s" repeatCount="indefinite" />
      <image href="data:image/svg+xml;base64,${catBase64}" x="-32" y="-32" width="64" height="64" />
    </g>
  </g>
  `;

  // Dog (Buster) - walks if state is "walk", otherwise stays in place or plays
  let dogSvgElement = "";
  if (dogState.state === "walk") {
    dogSvgElement = `
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="${dogXStart + 32} 138; ${dogXEnd + 32} 138; ${dogXStart + 32} 138" 
        dur="${dogDuration}s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="${dogDuration}s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${dogBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
    `;
  } else {
    // Static state (sitting, sleeping, playing with ball)
    dogSvgElement = `
    <g transform="translate(${dogXStart + 32} 138)">
      <image href="data:image/gif;base64,${dogBase64}" x="-32" y="-32" width="64" height="64" />
    </g>
    `;
  }

  // Crab (Ferris) - walks/runs if state is "walk" or "run", otherwise stays in place
  let crabSvgElement = "";
  if (crabState.state === "walk" || crabState.state === "run") {
    const duration = crabState.state === "run" ? crabDuration / 1.5 : crabDuration;
    crabSvgElement = `
    <g>
      <animateTransform attributeName="transform" type="translate" 
        values="${crabXStart + 32} 138; ${crabXEnd + 32} 138; ${crabXStart + 32} 138" 
        dur="${duration}s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="scale" 
          values="1 1; 1 1; -1 1; -1 1; 1 1" 
          keyTimes="0; 0.49; 0.50; 0.99; 1.0" 
          dur="${duration}s" repeatCount="indefinite" />
        <image href="data:image/gif;base64,${crabBase64}" x="-32" y="-32" width="64" height="64" />
      </g>
    </g>
    `;
  } else {
    // Static state
    crabSvgElement = `
    <g transform="translate(${crabXStart + 32} 138)">
      <image href="data:image/gif;base64,${crabBase64}" x="-32" y="-32" width="64" height="64" />
    </g>
    `;
  }

  // Build the complete animated SVG playroom banner
  const playroomSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="100%" height="200" style="background: transparent; font-family: monospace;">
  <!-- Room floor line -->
  <line x1="0" y1="170" x2="800" y2="170" stroke="#cccccc" stroke-width="2" stroke-dasharray="8 6" opacity="0.6" />
  
  <!-- Pets -->
  ${catSvgElement.trim()}
  ${dogSvgElement.trim()}
  ${crabSvgElement.trim()}
</svg>
`.trim();

  // Save SVG file
  fs.writeFileSync(playroomSvgPath, playroomSvg, 'utf8');
  console.log("playroom.svg generated successfully!");

  // Construct updated widget content for README.md
  const petWidgetMarkdown = `
<div align="center">
  <h3>🏡 Welcome to the Pixel Playroom!</h3>
  <p>Here are my tiny pixel friends walking around! They change their activities and movement speeds once in a while.</p>
  <br />
  <img src="assets/playroom.svg" width="800" alt="Pixel Playroom" />
  <br />
  
  <table>
    <tr>
      <td>🐱 <b>Luna (Cat)</b> is ${catActivity}</td>
    </tr>
    <tr>
      <td>🐶 <b>Buster (Dog)</b> is ${dogState.activity}</td>
    </tr>
    <tr>
      <td>🦀 <b>Ferris (Crab)</b> is ${crabState.activity}</td>
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
