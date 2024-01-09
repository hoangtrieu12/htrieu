import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const config = {
  name: "chuyen",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};
async function chuyen() {
  let data = JSON.parse(readFileSync(join(global.assetsPath, 'chuyen.json'), "utf-8"));
  return new Promise((resolve) => {
    for (let [key, value] of Object.entries(data)) {
      if (value.enable) {
        for (let tid of value.tids) {
          global.api.sendMessage(value.content, tid, (err) => {
            if (err) {
              data[key].tids.splice(data[key].tids.findIndex(e => e == tid), 1);
              writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");
            }
          })
        }
      }
    }
    resolve();
  })
}

await chuyen();

setInterval(async () => {
  await chuyen();
}, 1000 * 28)

const path = join(global.assetsPath, 'chuyen.json');

function onLoad() {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({}), "utf-8");
  }
}

async function onCall({ message, args }) {
  const { threadID, messageReply } = message;

  let data = JSON.parse(readFileSync(path, "utf-8"));
  if (!data[threadID]) data[threadID] = {
    enable: true,
    content: "",
    tids: []
  };
  let input = args.join(" ");
  if (input == "off" && message.type == "message") {
    data[threadID].enable = false;
    data[threadID].content = "";
    data[threadID].tids = [];
  } else if (args.length == 0) {
    return message.send("Vui lòng nhập id")
  } else {
    data[threadID].enable = true;
    data[threadID].content = "> " + messageReply.body;
    data[threadID].tids = args;
  }
  writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

  message.send(`Đã ${(input == "off" ? "tắt" : "bật")}`);
}

export {
  config,
  onCall,
  onLoad
}