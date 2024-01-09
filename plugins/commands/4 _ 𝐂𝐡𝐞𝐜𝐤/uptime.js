const config = {
  name: "uptime",
  aliases: ["upt"],
  permissions: [2],
  credits: "vml"
};

async function onCall({ message }) {
  const uptimeInSeconds = process.uptime();
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  try {
    const replyMessage = await message.reply(`== 𝐔𝐏𝐓𝐈𝐌𝐄 ==
${hours} giờ: ${minutes} phút: ${seconds} giây  
`);
    console.log(replyMessage);
  } catch (error) {
    console.error(error);
  }
}

export default {
  config,
  onCall,
};