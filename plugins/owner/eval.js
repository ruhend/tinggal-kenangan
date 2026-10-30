const { runUserCode } = socket
exports.default = {
   tags: 'owner',
   help: ['>', 'eval', 'ev', '=>', '!!', 'alay'],
   command: ['>', 'eval', 'ev', '=>', '!!', 'alay'],
   start: async (m, { 
      conn, 
      sock 
   }) => {
      const code = m.text.slice(m.prefix.length + m.command.length).trim();
      if (!code) return m.reply('*Masukkan kode setelah prefix eval!*');
      try {
         m.react('🔍')
         return await m.reply(await (0, runUserCode)(code, m, sock, conn));
      } catch (err) {
         return await m.reply(`❌ Kode gagal dijalankan: ${err?.message || err}`);
      }
   },
   owner: true
}