import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');

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
    gif: "dog_walk.gif",
    activity: "happily walking around the yard 🐾"
  },
  {
    gif: "dog_idle.gif",
    activity: "sitting politely and waiting for a bone 🦴"
  },
  {
    gif: "dog_lie.gif",
    activity: "fast asleep, dreaming about chasing squirrels 💤"
  },
  {
    gif: "dog_ball.gif",
    activity: "happily playing fetch with a ball 🥎"
  }
];

const CRAB_STATES = [
  {
    gif: "crab_walk.gif",
    activity: "crawling sideways across the grass 🦀"
  },
  {
    gif: "crab_idle.gif",
    activity: "waving its little pincers friendly ✌️"
  },
  {
    gif: "crab_run.gif",
    activity: "scuttling fast like a speedster ⚡"
  },
  {
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
  console.log("Updating README pets...");

  // Randomize activities
  const catActivity = CAT_ACTIVITIES[Math.floor(Math.random() * CAT_ACTIVITIES.length)];
  const dogState = DOG_STATES[Math.floor(Math.random() * DOG_STATES.length)];
  const crabState = CRAB_STATES[Math.floor(Math.random() * CRAB_STATES.length)];
  const lastUpdated = getFormattedDateTime();

  const petWidgetMarkdown = `
<div align="center">
  <h3>🏡 Welcome to the Pixel Playroom!</h3>
  <p>Here are my tiny pixel friends who live in this README. They do random activities every time this page updates!</p>
  <br />
  <table border="0">
    <tr>
      <td align="center" width="180">
        <img src="assets/cat.svg" width="64" height="64" alt="Cat" />
        <br />
        <strong>Luna</strong> (Cat)
        <br />
        <sub><i>is ${catActivity}</i></sub>
      </td>
      <td align="center" width="180">
        <img src="assets/${dogState.gif}" width="64" height="64" alt="Dog" />
        <br />
        <strong>Buster</strong> (Dog)
        <br />
        <sub><i>is ${dogState.activity}</i></sub>
      </td>
      <td align="center" width="180">
        <img src="assets/${crabState.gif}" width="64" height="64" alt="Crab" />
        <br />
        <strong>Ferris</strong> (Crab)
        <br />
        <sub><i>is ${crabState.activity}</i></sub>
      </td>
    </tr>
  </table>
  <br />
  <p><sub>Last updated: ${lastUpdated} (GMT+7)</sub></p>
</div>
`;

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
