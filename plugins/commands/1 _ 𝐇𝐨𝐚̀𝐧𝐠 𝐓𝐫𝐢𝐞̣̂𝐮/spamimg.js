
import { join } from "node:path"

const config = {
  name: "img",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};



function onLoad() {
  if (!global.spa_888) {
    global.spa_888 = new Map();
  }
}

async function onCall({ message, args }) {
  //if (!message.isGroup) return;

  const { threadID, messageReply } = message;

  let content = args.join(" ");
  if (content == "off" && message.type == "message") {
    global.spa_888.delete(threadID);
  } else {
    let obj = {
      content
    }
    if (messageReply.attachments.length != 0) {
      if (messageReply.attachments[0].type == "photo") {
        obj.path = join(global.assetsPath, `${threadID}.png`);
        obj.url = messageReply.attachments[0].previewUrl;
      } else if (messageReply.attachments[0].type == "animated_image") {
        obj.path = join(global.assetsPath, `${threadID}.gif`);
        obj.url = messageReply.attachments[0].url;
      } else if (messageReply.attachments[0].type == "video") {
        obj.path = join(global.assetsPath, `${threadID}.mp4`);
        obj.url = messageReply.attachments[0].url;
      } else return;
      await global.downloadFile(obj.path, obj.url);
    }

    global.spa_888.set(threadID, obj);
  }

  message.react(`${(content == "off" ? "❌" : "✅")}`);

  //message.react("🃏");
}

export {
  config,
  onLoad,
  onCall
}