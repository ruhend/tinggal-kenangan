const { backupSupabase, restoreSupabase } = require('../../lib/src/cloud/supabase-db.js');
const { backupTurso, restoreTurso } = require('../../lib/src/cloud/turso-db.js');
const { backupMongo, restoreMongo } = require('../../lib/src/cloud/mongo-db.js');
exports.default = {
   tags: ['owner'],
   help: ['backup', 'restore', 'backupall'],
   command: ['backup', 'restore', 'backupall'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
   }) => {
      if (!text && !(/backupall/.test(command))) {
         const backup = `masukan cloud penyimpanan database nya\ncontoh: ${prefix + command} mongo\n\nterdapat 3 penyimpanan database cloud:\n\nsupabase\nturso\nmongo\n\npilih salah satunya saja yang mau kamu ${command}\n\n`;
         const restore =  `(optional) jika ingin backup semua ke tempat cloud database yang sudah kamu daftar ketik .backupall`;      
         return (/backup/g.test(command)) ? m.reply(backup + restore) : m.reply(backup.trim());
      };
      if (!['supabase', 'turso', 'mongo'].includes(text) && !(/backupall/.test(command))) {
         const backup = 'hanya ada yang tersedia: \n\nsupabase\nturso\nmongo\n\n';
         const restore = '(optional) jika ingin backup semua ke tempat cloud database yang sudah kamu daftar ketik .backupall'
         return (/backup/g.test(command)) ? m.reply(backup + restore) : m.reply(backup.trim());
      };
      if (command == 'backup' && text == 'supabase') {
         m.reply('Tunggu sedang backup to supabase...');
         const response = await backupSupabase();
         if (!response.status) return await m.reply('Gagal Backup Database'), m.reply(obj(response));
         return await m.reply(obj(response))
      } else if (command == 'restore' && text == 'supabase') {
         m.reply('Tunggu sedang restore from supabase...');
         const response = await restoreSupabase();
         if (!response.status) return await m.reply('Gagal Restore Database'), m.reply(obj(response));         
         if (response.status) return await m.reply(obj(response))
      } else if (command == 'backup' && text == 'turso') {
         m.reply('Tunggu sedang backup to turso...');
         const response = await backupTurso();
         if (!response.status) return await m.reply('Gagal Backup Database'), m.reply(obj(response));
         return await m.reply(obj(response))
      } else if (command == 'restore' && text == 'turso') {
         m.reply('Tunggu sedang restore from turso...');
         const response = await restoreTurso();
         if (!response.status) return await m.reply('Gagal Restore Database'), m.reply(obj(response));
         if (response.status) return await m.reply(obj(response))
      } else if (command == 'backup' && text == 'mongo') {
         m.reply('Tunggu sedang backup to mongo...');
         const response = await backupMongo();
         if (!response.status) return await m.reply('Gagal Backup Database'), m.reply(obj(response));
         return await m.reply(obj(response))
      } else if (command == 'restore' && text == 'mongo') {
         m.reply('Tunggu sedang restore from mongo...');
         const response = await restoreMongo();
         if (!response.status) return await m.reply('Gagal Restore Database'), m.reply(obj(response));
         if (response.status) return await m.reply(obj(response))
      }
      if (/backupall/.test(command)) {
         const order = ['supabase', 'turso', 'mongo'];
         if (!text) return m.reply('masukan main / yang utama tempat backup andalan kamu terlebih dahulu\ncontoh: .backupall mongo');
         if (!order.includes(text)) return m.reply('main / yang utama harus salah satu dari, supabase, turso, mongo');
         const list = [text, ...order.filter(x => x !== text)];
         m.reply(`Memulai backup semua...`);
         await Utils.backupAllDB(m, list, backupSupabase, backupTurso, backupMongo);
         return m.reply('Backup semua selesai ✅');
      }
   },
   owner: true
}