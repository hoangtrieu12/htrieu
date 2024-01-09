
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const config = {
  name: "rn",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};

const path = join(global.assetsPath, 'rep3.json');

function onLoad() {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({}), "utf-8");
  }
}

async function onCall({ message, args }) {
  const { threadID } = message;

  let data = JSON.parse(readFileSync(path, "utf-8"));
  if (!data[threadID]) data[threadID] = {
    enable: true,
    content: "",
    mention: ""
  };

  let content = args.join(" ");
  if (content == "off") {
    data[threadID].enable = false;
    data[threadID].index = 0;
    data[threadID].content = "";
    data[threadID].mention = "";
  } else {
    if (
      (Object.keys(message.mentions).length != 0 && message.isGroup) ||
      !message.isGroup
    ) {
      data[threadID].enable = true;
      data[threadID].index = 0;
      data[threadID].content = content.replace(`${Object.values(message.mentions)[0]}`, "");
      data[threadID].mention = message.isGroup ? Object.keys(message.mentions)[0] : "";
    } else return message.send("Thiếu tag")
  }

  writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

  message.send(`${(content == "off" ? "=)))" : ":))))")}`);
}

export {
  config,
  onCall,
  onLoad
}