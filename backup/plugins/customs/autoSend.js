import cron from 'node-cron'

// learn more about cron time here:
// https://www.npmjs.com/package/node-cron?activeTab=readme
const jobs = [
  {
        time: "00 6 * * *", 
        message: () => "𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ : 𝟔 𝐠𝐢𝐨̛̀ 𝟎𝟎 𝐩𝐡𝐮́𝐭 𝟎𝟎 𝐠𝐢𝐚̂𝐲\n💌𝗟𝗼̛̀𝗶 𝗻𝗵𝗮̆́𝗻 : 𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗼́ 𝗺𝗼̣̂𝘁 𝗻𝗴𝗮̀𝘆 𝗺𝗼̛́𝗶 𝗱𝗮̂̀𝘆 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴 :𝟯\n[❗] Đây là tin nhắn tự động",
  },
  {
        time: "00 22 * * *", 
        message: () => `𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ : 𝟐𝟐 𝐠𝐢𝐨̛̀ 𝟎𝟎 𝐩𝐡𝐮́𝐭 𝟎𝟎 𝐠𝐢𝐚̂𝐲\n💌𝗟𝗼̛̀𝗶 𝗻𝗵𝗮̆́𝗻 : 𝗡𝗴𝘂̉ 𝗱𝗶 𝗺𝗮̂́𝘆 𝗰𝗼𝗻 𝗹𝗼̛̣𝗻\n[❗] Đây là tin nhắn tự động`,
    }
]

export default function autoSend() {
    cron.getTasks().forEach(task => task.stop());

    const timezone = global.config?.timezone || "Asia/Ho_Chi_Minh";
    if (!timezone) return;

    for (const job of jobs) {
        cron.schedule(job.time, () => {
            let i = 0;
            for (const tid of job.targetIDs || Array.from(global.data.threads.keys()) || []) {
                setTimeout(() => {
                    global.api.sendMessage({
                        body: job.message()
                    }, tid);
                }, (i++) * 300)
            }
        }, {
            timezone: timezone
        })
    }
}
