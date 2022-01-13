TELEGRAM_BOT_TOKEN = '5099922790:AAHoZ_3dfP_plXlR_KnBb7xcGy2-fxMl2sU';
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
let date = new Date()
let hours = date.getHours();
let minutes = date.getMinutes();
const CronJob = require('cron').CronJob;
const job = new CronJob('0/5 * * * * *', function() {
  console.log('You will see this message every second');
  chatIds.forEach((chatId) => {
      bot.sendMessage(chatId, `${hours+5}-${minutes}`)
  })
}, null, true);

bot.on('text', (msg) => msg.reply.text(' kelgan habar :'+msg.text));
bot.on(['/start'], (msg) =>{
    console.log(msg.text);
    let chatId = msg.chat.id;
    if(!chatIds.includes(chatId)){
        chatIds.push(chatId)
        msg.reply.text('Boshladik')
        job.start();
    }
});
bot.on(['/stop'], (msg) =>{
    let chatId = msg.chat.id;
    chatIds.pop(chatId)
    msg.reply.text('Yakunladik')
})
bot.start();