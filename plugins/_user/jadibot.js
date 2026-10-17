exports.default = {
   tags: 'user',
   help: ['jadibot', 'stopjadibot', 'listjadibot', 'deletejadibot', 'deljadibot'],
   command: ['jadibot', 'stopjadibot', 'listjadibot', 'deletejadibot', 'deljadibot'],
   start: async (m, {
      text,
      command
   }) => {
      if (/stopjadibot/g.test(command)) {
         return await stopjadibot(m)
      } else if (/listjadibot/g.test(command)) {
         return await listjadibot(m)
      } else if (/deljadibot|deletejadibot/g.test(command)) {
         if (!m.isOwner) return m.reply(mess.owner)
         return await deletejadibot(m, text)
      } else if (/jadibot/g.test(command)) {
         if (!db.users[m.sender].registered) {
            let user = db.users[m.sender]
            user.autoreg = {
               state: true,
               number: m.sender
            };
            return m.reply(mess.register + `\n\ndaftar otomatis silahkan balas ketik *y*`)
         }
         return await jadibot(m)
      }
   }
}