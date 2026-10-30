exports.default = {
   tags: 'owner',
   help: ['updatesc', 'updatescript', 'update'],
   command: ['updatesc', 'updatescript', 'update'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`
apa kamu yakin ingin update script ?
- update ini akan memperbarui script lama ini dengan yang terbaru.
- beberapa file yg sudah kamu buat atau edit mungkin akan menjadi script bawaan (default github).
- update ini tidak akan menghapus database dan configurasi kamu.
setuju dan lanjut ketik
*${prefix + command} y* atau *${prefix + command} yes*
`.trim());
      if (text == 'y' || text == 'yes') {
         m.reply(`tunggu sedang backup script saat ini terlebih dahulu . . .`)
         const data = await Utils.backupScript()
         await conn.sendFile(m.sender, data, 'ini file backup script sekarang jika ada file yg sudah kamu buat atau edit kamu bisa ambil dan restore lagi', m, {
            asDocument: true,
            fileName: 'script_backup.zip',
            mimetype: 'application/zip'
         });
         await sleep(2000)
         m.reply('updating script .  .  .')
         const update = await Utils.updateScript()
         if (update) return await m.reply('update script selesai rebooting . . .'), await sleep(1000), reset()
      }
   },
   owner: true
}
