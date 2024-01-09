// khuyến cáo sử dụng để khè là chính:v cú pháp: sbd VML BÁ | VML TRÙM
const config = {
  name: "sbd",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};
setInterval(async () => {
  await new Promise(async (resolve) => {
    for (let [key, value] of global.abd_888) {
      let threadInfo = (await controllers.Threads.get(key)).info;
      if (value.index >= value.input.length) value.index = 0;
      await new Promise(async (rr) => {
        for (let member of threadInfo.members) {
          await new Promise(async (r) => {
            api.changeNickname(value.input[value.index], key, member.userID, async (err) => {
              if (err) console.error(err);
              await new Promise(res => setTimeout(res, 300));
              r();
            })
          })
        }
        rr();
      })
      value.index++;
    }
    resolve();
  })
}, 5000)


function onLoad() {
  if (!global.abd_888) {
    global.abd_888 = new Map();
  }
}

async function onCall({ message, args }) {
  if (!message.isGroup) return;

  let input = args.join(" ").split("|");

  if (input[0] == 'off' && input.length == 1) {
    global.abd_888.delete(message.threadID);
  } else {
    global.abd_888.set(message.threadID, { input, index: 0 });
  }

  return message.send(`Đã ${(input[0] == 'off' && input.length == 1) ? "tắt!" : "bật!"}`);
}

export {
  config,
  onLoad,
  onCall
}