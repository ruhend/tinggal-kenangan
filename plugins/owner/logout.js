exports.default = {
   tags: 'owner',
   help: ['logout', 'unlink'],
   command: ['logout', 'unlink'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (setting?.jadibot) return m.reply('Perintah ini hanya untuk bot utama. Untuk kamu jadibot pakai *.stopjadibot*');
      if (!/^(ya|y|yes|ok)$/i.test((text || '').trim())) {
         return m.reply(
            `⚠️ *Logout bot?*\n\n` +
            `Device bot akan di-unlink dari WhatsApp (hilang dari "Perangkat tertaut" di HP), ` +
            `sesi dihapus, dan bot mati. Perlu pairing ulang setelahnya.\n\n` +
            `Lanjut: *${prefix + command} ya*`
         )
      }
      await m.reply('Device From WhatsApp Removed √')
      conn.__stopping = true
      try {
         await conn.logout()
      } catch (err) {
         conn.__stopping = false
         return m.reply(`❌ Gagal logout: ${err?.message || err}`)
      }
      setTimeout(() => {
         try {
            if (typeof conn.isLogout === 'function') conn.isLogout()
            else process.exit(0)
         } catch {
            process.exit(0)
         }
      }, 10000).unref?.()
   },
   owner: true
}
