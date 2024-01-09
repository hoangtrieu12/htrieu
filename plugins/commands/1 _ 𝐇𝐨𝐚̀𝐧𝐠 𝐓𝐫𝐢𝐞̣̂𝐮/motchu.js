
//thay ngôn tùy thích
const config = {
  "name": "motchu",
  "aliases": ["mc"],
  "description": "",
  "usage": "",
  "cooldown": 3,
  "permissions": [2],
  "credits": "vml",
  "extra": {}
};

const list = [
  "cang",
  "di",
  "cay",
  "a",
  "nhanh",
  "de",
  "cn",
  "ngu",
  "kak",
  "cay",
  "lm",
  "r",
  "t",
  "manh",
  "ma",
  "alo",
  "m",
  "ngu",
  "a",
  "oc",
  "kia",
  "akkaka",
  "cay",
  "alo",
  "suaa",
  "eii",
  "oc",
  "kia",
  "nhay",
  "ei",
  "cay",
  "cu",
  "a",
  "t",
  "ba",
  "v",
  "ak",
  "ui",
  "cay",
  "lam",
  "r",
  "kaka", 
  "em",
  "ei",
  "s4a",
  "manh",
  "de",
  "cay",
  "ak",
  "cu",
  "s4ua",
  "ne",
  "di",
  "me",
  "may",
  "kaka",
  "a",
  "em",
  "t",
  "ba",
  "kiki",
  "sao",
  "do",
  "sao",
  "ngu",
  "da",
  "oc",
  "kia",
  "keke",
  "alo",
  "con",
  "ngu",
  "kia",
  "di",
  "me",
  "may",
];

let index = 0;
let isStopped = false;

export function onCall({ message }) {
  const args = message.body.split(" ").slice(1); 
  if (args[0] === "stop") {
    isStopped = true; 
    message.send("alo");
    return;
  }
  
  if (isStopped) {
    isStopped = false;
  }
  
  const sendText = () => {
    message.send(list[index]);
    index = (index + 1) % list.length;
    if (!isStopped) {
      setTimeout(sendText, 2000); 
    }
  };
  sendText();
}

export default {
  config,
  onCall
};