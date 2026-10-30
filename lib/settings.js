global.moment = require("moment-timezone")
global.setting = require('../config.json');
global.mess = require('./message.js');
global.wait = mess.wait
global.self = setting.self
global.group_welcome = '*Selamat Datang Babi 🐷*\n*%user* \n*Di %subject*\n*Kenalan dulu yuk*\n*Nama:*\n*Umur:*\n*Asal Kota:*\n*Hoby:*\n*Merek HP:*\n'
global.group_bye = '*Bye 🐽*\n*%user* \n*Has Left The %subject Group*'
global.logo_premium = 'Ⓟ'
global.logo_limit = 'Ⓛ'
// adReply is message with photo (cover)
global.adReply = true
// untuk owner limit akan tetap di kenakan fitur .addlimit dan lainya biar ga lupa ajah cheat ajh .addlimitowner 999999 atau .cheatlimit
global.use_limit_message = true
global.limit_message = '%limit limit terpakai ✅'
// limit_adReply = send message limit with photo or cover 
global.limit_adReply = false
// mystery box true untuk menyalakan misteri box kalo dari bot ketik .on misteri on atau off
global.mystery_box = false
// ini 5 menit delay pengiriman kotak misteri ke group jangan di bawah 3 menit takut spam nantinya 
global.delay_box = 300000 //3 menit = 180 rb , kalo ganti dari bot ketik .setdelaybox
// untuk pengingat sholat, false untuk matikan, kalo dari boty ketik .off sholat
global.auto_sholat = true
/**
 * there's some places cloud to backup database
 * backup_supabase if u wanna use supabasedb change configuration on lib/src/cloud/supabase-db.js
 * setting langsung dari bot ketik .set atau .on atau lihat di menunya ketik .menu owner cobain satu satu biar paham 🐽
 * pilih ajh salah satu atau dua atau kalo kalian mau backup semua nya langsung juga bisa atau palaler jalan bersamaan
 * saran aku sih semua ajh kalo misalnya salah satu web cloud nya ada yg eror kan bisa ada cadangan 
 **/
global.backup_supabase = false
global.backup_turso = false
global.backup_mongo = false
/** self response only this bot and owner or premium **/
global.group_mode = false
global.anticall = true
//untuk jadi bot kalo panel ram 1 GB maximal 4 
global.jadibot_maximum = 4
/** sc ini cocok untuk dipake .self (nomor pribadi utama) dan public bot group **/

global.isTime = () => {
   const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss');
   const tanggal = moment().tz('Asia/Jakarta').format('ll');
   const suasana = moment().tz('Asia/Jakarta').locale('id').format('a');
   const time = moment().tz('Asia/Jakarta').format('HH:mm');
   return global.waktu = { tanggal, jam, suasana, time };
};
global.data_base = { 
   users: {}, 
   chats: {}, 
   settings: {}, 
   menfess: {}
};
global.isBot = ["CLUTCH", "JAG", "Z4PH","ILSYM","NARUYA","7EPP","SUK","SANKA","TIX","IZUMI","24","AD","META","RMC","Laurine","FTG","RYZEN","Fiz","SSA","FELZ","BAE5","3EB0","B1EY","NXR","NEO","AKIRA"]
global.caklontong = {}, caklontong_desc = {}, boom = {}, family100 = {}, tebakkata = {}, tekateki = {}, tictactoe = {}, gift = {}, kuismath = {}, siapakahaku = {}, susunkata = {}, tebakbendera = {}, tebakgambar = {}, tebakgame = {}, tebakkalimat = {}, tebaktebakan = {};
const fn = '0@s.whatsapp.net'
global.fake_wa = {
   key: {
      remoteJid: fn,
      fromMe: false,
      id: 'CAK_LONTONG'
   },
   pushName: 'WhatsApp',
   broadcast: true,
   sender: fn,
   message: {
      extendedTextMessage: {
         text: setting.botName,
         contextInfo: {
            mentionedJid: [fn],
            remoteJid: fn
         }
      }
   }
};
global.prayerTimes = {
   '04:37': 'Subuh',
   '11:57': 'Zuhur',
   '15:13': 'Ashar',
   '17:47': 'Maghrib',
   '19:10': 'Isya'
};