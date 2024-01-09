const config = {
  name: "counter",
  version: "0.0",
  description: "",
  permissions: [2],
  cooldown: 5
}

setInterval(async () => {
  await new Promise((reslove) => {
    for (let thread of global.snb111) {
      api.setTitle(`${Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + String.fromCharCode(48 + ~~(Math.random() * 42)) + String.fromCharCode(48 + ~~(Math.random() * 42))}`, thread, (err) => {
        if (err) return console.error(err);

        reslove();
      });
    }
  })
}, 1000)

function onLoad() {
  if (!global.snb111) {
    global.snb111 = new Array();
  }
}

async function onCall({ message, args }) {
  if (!message.isGroup) return;
  const { threadID } = message
  const input = args.join(" ");

  if (input == "off") {
    global.snb111.splice(global.snb111.findIndex(e => e.threadID == message.threadID), 1);
  } else {
    global.snb111.push(threadID)
  }

  message.react(`${(input == "off" ? "❌" : "✅")}`);

}


export {
  config,
  onCall,
  onLoad
}